export interface RawIndicator {
  strand: string;
  sub_strand: string;
  cs_code: string;
  cs_desc: string;
  ind_desc: string;
  competencies?: string;
  resources?: string;
  keywords?: string;
  assessment?: string;
  subject?: string;
  class_id?: string;
}

export interface CurriculumIndicator {
  id: string; // e.g. "B1.1.1.1.1" or generated unique id
  code: string;
  classId: string; // e.g. "B1", "B2", "B7", "KG1"
  className: string; // e.g. "Basic 1 (Primary 1)"
  subject: string; // e.g. "Science", "Mathematics", "English Language"
  strand: string; // e.g. "1. DIVERSITY OF MATTER"
  subStrand: string; // e.g. "1. Living and Non-Living Things"
  csCode: string; // e.g. "B1.1.1.1"
  csDesc: string; // Content standard description
  indDesc: string; // Indicator description
  competencies: string[]; // parsed array
  competenciesRaw: string;
  resources: string[]; // parsed array
  resourcesRaw: string;
  keywords: string[]; // parsed array
  keywordsRaw: string;
  assessment: string[]; // parsed array
  assessmentRaw: string;
  isCustom?: boolean; // added via user upload
}

export interface ContentStandardNode {
  csCode: string;
  csDesc: string;
  indicators: CurriculumIndicator[];
}

export interface SubStrandNode {
  name: string;
  contentStandards: ContentStandardNode[];
  totalIndicators: number;
}

export interface StrandNode {
  name: string;
  subStrands: SubStrandNode[];
  totalIndicators: number;
}

export interface SubjectNode {
  name: string;
  strands: StrandNode[];
  totalIndicators: number;
}

export interface ClassNode {
  id: string;
  name: string;
  subjects: SubjectNode[];
  totalIndicators: number;
}

export interface CurriculumHierarchy {
  classes: ClassNode[];
  totalIndicators: number;
  allSubjects: string[];
  allClasses: { id: string; name: string }[];
}

export interface FilterState {
  searchQuery: string;
  selectedClasses: string[];
  selectedSubjects: string[];
  selectedCompetencies: string[];
  selectedStrand?: string;
  viewMode: 'tree' | 'browse' | 'binder';
}

export interface LessonBinderItem {
  id: string;
  indicator: CurriculumIndicator;
  addedAt: number;
  term?: 'Term 1' | 'Term 2' | 'Term 3';
  week?: number;
  notes?: string;
}
