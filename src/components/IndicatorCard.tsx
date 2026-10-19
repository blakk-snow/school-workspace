import React from 'react';
import { Bookmark, BookmarkCheck, FileText, ChevronRight } from 'lucide-react';
import { CurriculumIndicator } from '../types/curriculum';

interface IndicatorCardProps {
  indicator: CurriculumIndicator;
  onSelect: (ind: CurriculumIndicator) => void;
  onOpenLessonNote: (ind: CurriculumIndicator) => void;
  isBookmarked: boolean;
  onToggleBookmark: (ind: CurriculumIndicator) => void;
  searchQuery?: string;
}

function highlightMatch(text: string, query?: string) {
  if (!query || !query.trim()) return text;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-amber-100 text-amber-950 font-medium px-0.5 rounded-xs">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export const IndicatorCard: React.FC<IndicatorCardProps> = ({
  indicator,
  onSelect,
  onOpenLessonNote,
  isBookmarked,
  onToggleBookmark,
  searchQuery,
}) => {
  return (
    <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-5 transition-all shadow-xs hover:shadow-sm flex flex-col justify-between group">
      <div>
        {/* Card Kicker / Path hierarchy - Clean unboxed text with middle dot separators */}
        <div className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5 mb-2 font-medium">
          <span className="text-emerald-700 font-semibold">{indicator.className}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="text-slate-700">{indicator.subject}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="text-slate-500 truncate max-w-[220px]" title={indicator.strand}>
            {indicator.strand.replace(/^\d+\.\s*/, '')}
          </span>
        </div>

        {/* Indicator Code & Content Standard Reference */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                {indicator.code}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                CS: {indicator.csCode}
              </span>
            </div>
          </div>

          <button
            onClick={() => onToggleBookmark(indicator)}
            className={`p-1.5 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-transparent border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
            }`}
            title={isBookmarked ? 'Remove from Lesson Binder' : 'Add to Lesson Binder'}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-emerald-600" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Primary Indicator Description */}
        <p className="text-sm font-semibold text-slate-900 mb-2.5 leading-snug">
          {highlightMatch(indicator.indDesc, searchQuery)}
        </p>

        {/* Content Standard Summary */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <span className="font-medium text-slate-700">Standard: </span>
          {highlightMatch(indicator.csDesc, searchQuery)}
        </p>

        {/* Core Competencies - unboxed text */}
        {indicator.competencies.length > 0 && (
          <div className="text-xs text-slate-500 mb-2">
            <span className="font-medium text-slate-700">Competencies: </span>
            <span>{indicator.competencies.join(' · ')}</span>
          </div>
        )}

        {/* Keywords */}
        {indicator.keywords.length > 0 && (
          <div className="text-xs text-slate-500 mb-3 flex flex-wrap items-center gap-1">
            <span className="font-medium text-slate-700">Vocabulary: </span>
            <span className="italic text-slate-600">
              {indicator.keywords.slice(0, 5).join(', ')}
              {indicator.keywords.length > 5 ? '...' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
        <button
          onClick={() => onOpenLessonNote(indicator)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 hover:text-emerald-900 transition-colors py-1 px-1.5 -ml-1.5 rounded-md hover:bg-emerald-50"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Lesson Plan Template</span>
        </button>

        <button
          onClick={() => onSelect(indicator)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-emerald-700 transition-colors py-1 px-2 rounded-md hover:bg-slate-100"
        >
          <span>View Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
