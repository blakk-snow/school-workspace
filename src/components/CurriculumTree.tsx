import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  BookOpen, 
  Folder, 
  FolderOpen, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck,
  FileText
} from 'lucide-react';
import { CurriculumHierarchy, CurriculumIndicator } from '../types/curriculum';

interface CurriculumTreeProps {
  hierarchy: CurriculumHierarchy;
  onSelectIndicator: (indicator: CurriculumIndicator) => void;
  onOpenLessonNote: (indicator: CurriculumIndicator) => void;
  isBookmarked: (indicator: CurriculumIndicator) => boolean;
  onToggleBookmark: (indicator: CurriculumIndicator) => void;
  searchFilter?: string;
}

export const CurriculumTree: React.FC<CurriculumTreeProps> = ({
  hierarchy,
  onSelectIndicator,
  onOpenLessonNote,
  isBookmarked,
  onToggleBookmark,
  searchFilter = '',
}) => {
  // Track open states for each level
  // Keys: "class:{classId}", "subject:{classId}:{subject}", "strand:{classId}:{subject}:{strand}", "substrand:...", "cs:..."
  const [openNodes, setOpenNodes] = useState<Record<string, boolean>>(() => {
    // Default open first class and first subject
    const initial: Record<string, boolean> = {};
    if (hierarchy.classes.length > 0) {
      const firstClass = hierarchy.classes[0];
      initial[`class:${firstClass.id}`] = true;
      if (firstClass.subjects.length > 0) {
        const firstSub = firstClass.subjects[0];
        initial[`subject:${firstClass.id}:${firstSub.name}`] = true;
        if (firstSub.strands.length > 0) {
          initial[`strand:${firstClass.id}:${firstSub.name}:${firstSub.strands[0].name}`] = true;
        }
      }
    }
    return initial;
  });

  const toggleNode = (key: string) => {
    setOpenNodes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    hierarchy.classes.forEach((c) => {
      all[`class:${c.id}`] = true;
      c.subjects.forEach((s) => {
        all[`subject:${c.id}:${s.name}`] = true;
        s.strands.forEach((st) => {
          all[`strand:${c.id}:${s.name}:${st.name}`] = true;
          st.subStrands.forEach((ss) => {
            all[`substrand:${c.id}:${s.name}:${st.name}:${ss.name}`] = true;
            ss.contentStandards.forEach((cs) => {
              all[`cs:${c.id}:${s.name}:${st.name}:${ss.name}:${cs.csCode}`] = true;
            });
          });
        });
      });
    });
    setOpenNodes(all);
  };

  const collapseAll = () => {
    setOpenNodes({});
  };

  if (hierarchy.classes.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
        <Folder className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-base font-semibold text-slate-800 mb-1">No curriculum nodes match</h3>
        <p className="text-sm text-slate-500">Try adjusting your filters or import your curriculum JSON files.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Hierarchy Controls Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Standard Curriculum Hierarchy</span>
            <span className="text-xs font-mono font-normal text-slate-500">
              Class &gt; Subject &gt; Strand &gt; Sub-strand &gt; Content Standard &gt; Indicator
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any level to expand. Select an indicator to view full standard details or generate lesson notes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Tree Content */}
      <div className="p-4 space-y-3 font-sans">
        {hierarchy.classes.map((cls) => {
          const classKey = `class:${cls.id}`;
          const isClassOpen = Boolean(openNodes[classKey] || searchFilter);

          return (
            <div key={cls.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white">
              {/* LEVEL 1: CLASS */}
              <button
                onClick={() => toggleNode(classKey)}
                className="w-full px-4 py-3 bg-slate-100/80 hover:bg-slate-100 flex items-center justify-between transition-colors text-left font-semibold text-slate-900"
              >
                <div className="flex items-center gap-2.5">
                  {isClassOpen ? (
                    <ChevronDown className="w-4 h-4 text-emerald-700 shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span className="text-sm font-bold text-emerald-800 font-mono">[{cls.id}]</span>
                  <span className="text-sm font-semibold text-slate-900">{cls.name}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono tabular-nums">
                  <span>{cls.subjects.length} subjects</span>
                  <span aria-hidden="true">·</span>
                  <span>{cls.totalIndicators} indicators</span>
                </div>
              </button>

              {/* LEVEL 2: SUBJECT */}
              {isClassOpen && (
                <div className="p-2 space-y-2.5 bg-slate-50/50">
                  {cls.subjects.map((sub) => {
                    const subjectKey = `subject:${cls.id}:${sub.name}`;
                    const isSubjectOpen = Boolean(openNodes[subjectKey] || searchFilter);

                    return (
                      <div key={sub.name} className="border border-slate-200/90 rounded-md bg-white overflow-hidden ml-2 sm:ml-4">
                        <button
                          onClick={() => toggleNode(subjectKey)}
                          className="w-full px-3.5 py-2.5 hover:bg-slate-50 flex items-center justify-between transition-colors text-left"
                        >
                          <div className="flex items-center gap-2">
                            {isSubjectOpen ? (
                              <ChevronDown className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                            )}
                            <BookOpen className="w-4 h-4 text-emerald-700 shrink-0" />
                            <span className="text-sm font-bold text-slate-900">{sub.name}</span>
                          </div>
                          <span className="text-xs text-slate-500 font-mono tabular-nums">
                            {sub.strands.length} strands · {sub.totalIndicators} indicators
                          </span>
                        </button>

                        {/* LEVEL 3: STRAND */}
                        {isSubjectOpen && (
                          <div className="px-3 pb-3 pt-1 space-y-2 border-t border-slate-100 bg-white">
                            {sub.strands.map((str) => {
                              const strandKey = `strand:${cls.id}:${sub.name}:${str.name}`;
                              const isStrandOpen = Boolean(openNodes[strandKey] || searchFilter);

                              return (
                                <div key={str.name} className="border border-slate-100 rounded-md bg-slate-50/30 overflow-hidden ml-2 sm:ml-3">
                                  <button
                                    onClick={() => toggleNode(strandKey)}
                                    className="w-full px-3 py-2 hover:bg-slate-100/60 flex items-center justify-between transition-colors text-left"
                                  >
                                    <div className="flex items-center gap-2">
                                      {isStrandOpen ? (
                                        <ChevronDown className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                                      ) : (
                                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                      )}
                                      <span className="text-xs font-semibold text-slate-800">
                                        Strand: {str.name}
                                      </span>
                                    </div>
                                    <span className="text-[11px] text-slate-500 font-mono tabular-nums">
                                      {str.totalIndicators} indicators
                                    </span>
                                  </button>

                                  {/* LEVEL 4: SUB-STRAND */}
                                  {isStrandOpen && (
                                    <div className="p-2 space-y-2 bg-white border-t border-slate-100">
                                      {str.subStrands.map((subStr) => {
                                        const subStrandKey = `substrand:${cls.id}:${sub.name}:${str.name}:${subStr.name}`;
                                        const isSubStrandOpen = Boolean(openNodes[subStrandKey] || searchFilter);

                                        return (
                                          <div key={subStr.name} className="border border-slate-200/70 rounded-md overflow-hidden ml-2 sm:ml-3">
                                            <button
                                              onClick={() => toggleNode(subStrandKey)}
                                              className="w-full px-3 py-2 bg-slate-50/70 hover:bg-slate-100/80 flex items-center justify-between transition-colors text-left"
                                            >
                                              <div className="flex items-center gap-2">
                                                {isSubStrandOpen ? (
                                                  <FolderOpen className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                                ) : (
                                                  <Folder className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                )}
                                                <span className="text-xs font-medium text-slate-900">
                                                  Sub-strand: {subStr.name}
                                                </span>
                                              </div>
                                              <span className="text-[11px] text-slate-500 font-mono tabular-nums">
                                                {subStr.contentStandards.length} standards · {subStr.totalIndicators} indicators
                                              </span>
                                            </button>

                                            {/* LEVEL 5: CONTENT STANDARD */}
                                            {isSubStrandOpen && (
                                              <div className="p-2 space-y-2 bg-slate-50/40">
                                                {subStr.contentStandards.map((cs) => {
                                                  const csKey = `cs:${cls.id}:${sub.name}:${str.name}:${subStr.name}:${cs.csCode}`;
                                                  const isCsOpen = Boolean(openNodes[csKey] || searchFilter);

                                                  return (
                                                    <div key={cs.csCode} className="border border-slate-200 rounded-md bg-white overflow-hidden">
                                                      <button
                                                        onClick={() => toggleNode(csKey)}
                                                        className="w-full px-3 py-2 bg-slate-100/50 hover:bg-slate-100 flex items-start justify-between gap-3 transition-colors text-left"
                                                      >
                                                        <div className="flex items-start gap-2">
                                                          {isCsOpen ? (
                                                            <ChevronDown className="w-3.5 h-3.5 text-emerald-700 mt-0.5 shrink-0" />
                                                          ) : (
                                                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                                                          )}
                                                          <div>
                                                            <div className="flex items-center gap-2">
                                                              <span className="text-xs font-mono font-bold text-slate-800 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                                                                {cs.csCode}
                                                               </span>
                                                              <span className="text-xs font-semibold text-slate-800">
                                                                Content Standard
                                                              </span>
                                                            </div>
                                                            <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                                                              {cs.csDesc}
                                                            </p>
                                                          </div>
                                                        </div>
                                                        <span className="text-[11px] text-slate-500 font-mono tabular-nums shrink-0 whitespace-nowrap mt-0.5">
                                                          {cs.indicators.length} {cs.indicators.length === 1 ? 'indicator' : 'indicators'}
                                                        </span>
                                                      </button>

                                                      {/* LEVEL 6: INDICATOR ITEMS */}
                                                      {isCsOpen && (
                                                        <div className="divide-y divide-slate-100 border-t border-slate-100 bg-white">
                                                          {cs.indicators.map((ind) => {
                                                            const bookmarked = isBookmarked(ind);
                                                            return (
                                                              <div
                                                                key={ind.id}
                                                                className="p-3 hover:bg-emerald-50/30 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                                                              >
                                                                <div className="space-y-1 flex-1">
                                                                  <div className="flex items-center gap-2">
                                                                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                                                      {ind.code}
                                                                    </span>
                                                                    <span className="text-xs text-slate-500">
                                                                      Indicator
                                                                    </span>
                                                                  </div>
                                                                  <p className="text-xs font-medium text-slate-900 leading-snug">
                                                                    {ind.indDesc}
                                                                  </p>
                                                                  <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-2 pt-0.5">
                                                                    <span>Competencies: {ind.competencies.join(', ') || 'N/A'}</span>
                                                                  </div>
                                                                </div>

                                                                {/* Indicator Action buttons */}
                                                                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                                                                  <button
                                                                    onClick={() => onToggleBookmark(ind)}
                                                                    className={`p-1.5 rounded-md border text-xs transition-colors ${
                                                                      bookmarked
                                                                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                                                        : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                                                                    }`}
                                                                    title={bookmarked ? 'Remove from Lesson Binder' : 'Add to Lesson Binder'}
                                                                  >
                                                                    {bookmarked ? (
                                                                      <BookmarkCheck className="w-3.5 h-3.5 fill-emerald-600" />
                                                                    ) : (
                                                                      <Bookmark className="w-3.5 h-3.5" />
                                                                    )}
                                                                  </button>

                                                                  <button
                                                                    onClick={() => onOpenLessonNote(ind)}
                                                                    className="px-2 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors flex items-center gap-1 whitespace-nowrap"
                                                                    title="Generate GES/NaCCA Lesson Plan"
                                                                  >
                                                                    <FileText className="w-3 h-3" />
                                                                    <span>Lesson Plan</span>
                                                                  </button>

                                                                  <button
                                                                    onClick={() => onSelectIndicator(ind)}
                                                                    className="px-2 py-1 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap"
                                                                  >
                                                                    Inspect
                                                                  </button>
                                                                </div>
                                                              </div>
                                                            );
                                                          })}
                                                        </div>
                                                      )}
                                                    </div>
                                                  );
                                                })}
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
