import { 
  CurriculumHierarchy, 
  CurriculumIndicator, 
  RawIndicator,
  LessonBinderItem
} from '../types/curriculum';
import { CLASS_NAMES, normalizeIndicator, getInitialCurriculum } from '../data/initialData';

const STORAGE_KEY_CURRICULUM = 'nacca_curriculum_items_v1';
const STORAGE_KEY_BINDER = 'nacca_lesson_binder_v1';

/**
 * Builds a strict 6-level hierarchy:
 * Class > Subject > Strand > Sub-strand > Content Standard > Indicator
 */
export function buildHierarchy(indicators: CurriculumIndicator[]): CurriculumHierarchy {
  const classMap = new Map<string, {
    id: string;
    name: string;
    subjectMap: Map<string, {
      name: string;
      strandMap: Map<string, {
        name: string;
        subStrandMap: Map<string, {
          name: string;
          csMap: Map<string, {
            csCode: string;
            csDesc: string;
            indicators: CurriculumIndicator[];
          }>;
        }>;
      }>;
    }>;
  }>();

  const allSubjectsSet = new Set<string>();
  const allClassesMap = new Map<string, string>();

  indicators.forEach(ind => {
    allSubjectsSet.add(ind.subject);
    allClassesMap.set(ind.classId, ind.className);

    // 1. Class level
    if (!classMap.has(ind.classId)) {
      classMap.set(ind.classId, {
        id: ind.classId,
        name: ind.className,
        subjectMap: new Map()
      });
    }
    const classNode = classMap.get(ind.classId)!;

    // 2. Subject level
    if (!classNode.subjectMap.has(ind.subject)) {
      classNode.subjectMap.set(ind.subject, {
        name: ind.subject,
        strandMap: new Map()
      });
    }
    const subjectNode = classNode.subjectMap.get(ind.subject)!;

    // 3. Strand level
    if (!subjectNode.strandMap.has(ind.strand)) {
      subjectNode.strandMap.set(ind.strand, {
        name: ind.strand,
        subStrandMap: new Map()
      });
    }
    const strandNode = subjectNode.strandMap.get(ind.strand)!;

    // 4. Sub-strand level
    if (!strandNode.subStrandMap.has(ind.subStrand)) {
      strandNode.subStrandMap.set(ind.subStrand, {
        name: ind.subStrand,
        csMap: new Map()
      });
    }
    const subStrandNode = strandNode.subStrandMap.get(ind.subStrand)!;

    // 5. Content standard level
    if (!subStrandNode.csMap.has(ind.csCode)) {
      subStrandNode.csMap.set(ind.csCode, {
        csCode: ind.csCode,
        csDesc: ind.csDesc,
        indicators: []
      });
    }
    const csNode = subStrandNode.csMap.get(ind.csCode)!;

    // 6. Indicator level
    csNode.indicators.push(ind);
  });

  // Convert maps to clean sorted arrays
  const classes = Array.from(classMap.values())
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
    .map(c => {
      const subjects = Array.from(c.subjectMap.values())
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(sub => {
          const strands = Array.from(sub.strandMap.values())
            .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
            .map(str => {
              const subStrands = Array.from(str.subStrandMap.values())
                .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
                .map(subStr => {
                  const contentStandards = Array.from(subStr.csMap.values())
                    .sort((a, b) => a.csCode.localeCompare(b.csCode, undefined, { numeric: true }));
                  
                  const totalInds = contentStandards.reduce((acc, curr) => acc + curr.indicators.length, 0);
                  return {
                    name: subStr.name,
                    contentStandards,
                    totalIndicators: totalInds
                  };
                });
              const totalInds = subStrands.reduce((acc, curr) => acc + curr.totalIndicators, 0);
              return {
                name: str.name,
                subStrands,
                totalIndicators: totalInds
              };
            });
          const totalInds = strands.reduce((acc, curr) => acc + curr.totalIndicators, 0);
          return {
            name: sub.name,
            strands,
            totalIndicators: totalInds
          };
        });
      const totalInds = subjects.reduce((acc, curr) => acc + curr.totalIndicators, 0);
      return {
        id: c.id,
        name: c.name,
        subjects,
        totalIndicators: totalInds
      };
    });

  const allClasses = Array.from(allClassesMap.entries())
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

  return {
    classes,
    totalIndicators: indicators.length,
    allSubjects: Array.from(allSubjectsSet).sort(),
    allClasses
  };
}

/**
 * Filter indicators based on multi-attribute criteria
 */
export function filterIndicators(
  indicators: CurriculumIndicator[],
  query: string,
  selectedClasses: string[],
  selectedSubjects: string[],
  selectedCompetencies: string[],
  selectedStrand?: string
): CurriculumIndicator[] {
  const cleanQuery = query.trim().toLowerCase();

  return indicators.filter(ind => {
    // 1. Class filter
    if (selectedClasses.length > 0 && !selectedClasses.includes(ind.classId)) {
      return false;
    }

    // 2. Subject filter
    if (selectedSubjects.length > 0 && !selectedSubjects.includes(ind.subject)) {
      return false;
    }

    // 3. Strand filter
    if (selectedStrand && ind.strand !== selectedStrand) {
      return false;
    }

    // 4. Competency filter (if any selected, indicator must contain at least one)
    if (selectedCompetencies.length > 0) {
      const hasMatch = selectedCompetencies.some(comp => 
        ind.competencies.some(c => c.toLowerCase().includes(comp.toLowerCase()))
      );
      if (!hasMatch) return false;
    }

    // 5. Query full-text search
    if (cleanQuery) {
      const matchInCode = ind.code.toLowerCase().includes(cleanQuery);
      const matchInCSCode = ind.csCode.toLowerCase().includes(cleanQuery);
      const matchInCSDesc = ind.csDesc.toLowerCase().includes(cleanQuery);
      const matchInIndDesc = ind.indDesc.toLowerCase().includes(cleanQuery);
      const matchInStrand = ind.strand.toLowerCase().includes(cleanQuery);
      const matchInSubStrand = ind.subStrand.toLowerCase().includes(cleanQuery);
      const matchInKeywords = ind.keywords.some(k => k.toLowerCase().includes(cleanQuery));
      const matchInResources = ind.resources.some(r => r.toLowerCase().includes(cleanQuery));
      const matchInAssessment = ind.assessment.some(a => a.toLowerCase().includes(cleanQuery));
      const matchInCompetencies = ind.competencies.some(c => c.toLowerCase().includes(cleanQuery));

      if (
        !matchInCode &&
        !matchInCSCode &&
        !matchInCSDesc &&
        !matchInIndDesc &&
        !matchInStrand &&
        !matchInSubStrand &&
        !matchInKeywords &&
        !matchInResources &&
        !matchInAssessment &&
        !matchInCompetencies
      ) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Parses NaCCA Indicator Code anatomy
 * e.g. "B1.1.1.2.3" ->
 * Class: Basic 1, Strand: 1, Sub-strand: 1, Content Standard: 2, Indicator: 3
 */
export function dissectIndicatorCode(code: string) {
  const parts = code.split('.');
  if (parts.length >= 5) {
    return {
      classPart: parts[0],
      strandNo: parts[1],
      subStrandNo: parts[2],
      csNo: parts[3],
      indicatorNo: parts[4],
      standardCode: `${parts[0]}.${parts[1]}.${parts[2]}.${parts[3]}`
    };
  }
  return {
    classPart: parts[0] || 'B1',
    strandNo: parts[1] || '1',
    subStrandNo: parts[2] || '1',
    csNo: parts[3] || '1',
    indicatorNo: parts[4] || '1',
    standardCode: code
  };
}

/**
 * Storage helpers
 */
export function loadStoredCurriculum(): CurriculumIndicator[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRICULUM);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load stored curriculum:', e);
  }
  return getInitialCurriculum();
}

export function saveStoredCurriculum(indicators: CurriculumIndicator[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_CURRICULUM, JSON.stringify(indicators));
  } catch (e) {
    console.error('Failed to save curriculum to localStorage:', e);
  }
}

export function resetStoredCurriculum(): CurriculumIndicator[] {
  localStorage.removeItem(STORAGE_KEY_CURRICULUM);
  return getInitialCurriculum();
}

/**
 * Lesson Binder helpers
 */
export function loadLessonBinder(): LessonBinderItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BINDER);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load lesson binder:', e);
  }
  return [];
}

export function saveLessonBinder(items: LessonBinderItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_BINDER, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save lesson binder:', e);
  }
}

/**
 * Parse an imported JSON string into CurriculumIndicator[]
 * Supports:
 * 1. Record<string, RawIndicator> (like the user's provided file)
 * 2. RawIndicator[]
 * 3. { subject: string, class: string, indicators: Record<string, RawIndicator> }
 */
export function parseUploadedJson(
  jsonString: string,
  overrideSubject?: string,
  overrideClass?: string
): { success: boolean; items: CurriculumIndicator[]; message: string } {
  try {
    const parsed = JSON.parse(jsonString);
    const newItems: CurriculumIndicator[] = [];

    // Case 1: Wrapped container with metadata
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && (parsed.indicators || parsed.data)) {
      const innerData = parsed.indicators || parsed.data;
      const detectedSubject = overrideSubject || parsed.subject || 'General';
      const detectedClass = overrideClass || parsed.class || parsed.class_id || 'B1';

      if (Array.isArray(innerData)) {
        innerData.forEach((item: any, idx: number) => {
          const code = item.code || item.id || `IND.${idx + 1}`;
          newItems.push({
            ...normalizeIndicator(code, item, detectedSubject, detectedClass),
            isCustom: true
          });
        });
      } else if (typeof innerData === 'object') {
        for (const [code, raw] of Object.entries(innerData)) {
          newItems.push({
            ...normalizeIndicator(code, raw as RawIndicator, detectedSubject, detectedClass),
            isCustom: true
          });
        }
      }
    }
    // Case 2: Array of objects
    else if (Array.isArray(parsed)) {
      parsed.forEach((item: any, idx: number) => {
        const code = item.code || item.id || `IND.${idx + 1}`;
        newItems.push({
          ...normalizeIndicator(code, item, overrideSubject || item.subject || 'General', overrideClass || item.class_id || 'B1'),
          isCustom: true
        });
      });
    }
    // Case 3: Dictionary keyed by indicator code (like user's provided file)
    else if (parsed && typeof parsed === 'object') {
      for (const [code, raw] of Object.entries(parsed)) {
        const rawObj = raw as RawIndicator;
        newItems.push({
          ...normalizeIndicator(
            code,
            rawObj,
            overrideSubject || rawObj.subject || 'Science',
            overrideClass || rawObj.class_id || 'B1'
          ),
          isCustom: true
        });
      }
    }

    if (newItems.length === 0) {
      return {
        success: false,
        items: [],
        message: 'No valid NaCCA indicators found in the uploaded JSON file.'
      };
    }

    return {
      success: true,
      items: newItems,
      message: `Successfully parsed ${newItems.length} indicators.`
    };
  } catch (err: any) {
    return {
      success: false,
      items: [],
      message: `Invalid JSON format: ${err?.message || 'Syntax error'}`
    };
  }
}

/**
 * Standard NaCCA / GES Lesson Plan Generator
 */
export function generateNaccaLessonPlan(ind: CurriculumIndicator): string {
  const anatomy = dissectIndicatorCode(ind.code);
  return `===============================================================
GHANA EDUCATION SERVICE (GES) / NaCCA LESSON PLAN TEMPLATE
===============================================================
Date / Week: Week ___, Term ___
Class: ${ind.className} (${ind.classId})
Subject: ${ind.subject}
Strand: ${ind.strand}
Sub-Strand: ${ind.subStrand}
Content Standard: ${ind.csCode} - ${ind.csDesc}
Indicator: ${ind.code} - ${ind.indDesc}
Performance Indicator: Learners can demonstrate understanding of ${ind.indDesc.toLowerCase()}
Core Competencies: ${ind.competencies.join(', ') || 'Critical Thinking & Problem Solving'}
Key Vocabulary: ${ind.keywords.join(', ') || 'N/A'}

TEACHING & LEARNING MATERIALS (TLMs) / RESOURCES:
${ind.resources.map(r => `- ${r}`).join('\n') || '- Classroom board and realia'}

---------------------------------------------------------------
PHASE 1: STARTER (10 mins)
---------------------------------------------------------------
- Greet learners and conduct warm-up activity related to the theme.
- Ask diagnostic questions to elicit prior knowledge about "${ind.keywords.slice(0, 3).join(', ') || ind.subStrand}".
- Share learning expectation: "Today we will learn to ${ind.indDesc.toLowerCase()}."

---------------------------------------------------------------
PHASE 2: MAIN TEACHING & LEARNING ACTIVITIES (40 mins)
---------------------------------------------------------------
Step 1 (Explore):
- Guide learners in small mixed-ability groups to observe the materials: ${ind.resources.slice(0, 2).join('; ') || 'visual charts'}.
- Prompt learners to describe what they see and interact with their peers.

Step 2 (Explain & Model):
- Facilitate whole-class discussion: clarify key concepts and address misconceptions.
- Introduce key vocabulary: ${ind.keywords.join(', ')}.

Step 3 (Elaborate & Practice):
- Engage learners in hands-on exploration and pair tasks based on:
  "${ind.indDesc}"
- Teacher circulates, giving supportive feedback and scaffolding for differentiated learning.

---------------------------------------------------------------
PHASE 3: PLENARY / REFLECTION (10 mins)
---------------------------------------------------------------
- Recap core ideas: have 2-3 learners summarize what they observed/learned.
- Administer formative exit check: ${ind.assessment[0] || 'Quick oral Q&A / thumbs up reflection'}.
- Assign follow-up task or homework.

ASSESSMENT STRATEGY:
${ind.assessment.map(a => `- ${a}`).join('\n') || '- Formative observation checklist'}
===============================================================`;
}
