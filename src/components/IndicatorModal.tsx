import React from 'react';
import { 
  X, 
  Bookmark, 
  BookmarkCheck, 
  FileText, 
  Check, 
  Copy, 
  Layers, 
  Sparkles,
  BookMarked,
  PackageCheck,
  CheckCircle2,
  Bot
} from 'lucide-react';
import { CurriculumIndicator } from '../types/curriculum';
import { dissectIndicatorCode } from '../utils/curriculumUtils';

interface IndicatorModalProps {
  indicator: CurriculumIndicator | null;
  onClose: () => void;
  onOpenLessonNote: (indicator: CurriculumIndicator) => void;
  isBookmarked: boolean;
  onToggleBookmark: (indicator: CurriculumIndicator) => void;
  onAskAI?: (indicator: CurriculumIndicator) => void;
}

export const IndicatorModal: React.FC<IndicatorModalProps> = ({
  indicator,
  onClose,
  onOpenLessonNote,
  isBookmarked,
  onToggleBookmark,
  onAskAI,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!indicator) return null;

  const anatomy = dissectIndicatorCode(indicator.code);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(
      `${indicator.code}: ${indicator.indDesc}\nContent Standard: ${indicator.csCode} - ${indicator.csDesc}\nSubject: ${indicator.subject} (${indicator.className})\nStrand: ${indicator.strand} > ${indicator.subStrand}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
          <div>
            {/* Breadcrumb Hierarchy */}
            <div className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5 font-medium mb-1.5">
              <span className="text-emerald-700 font-semibold">{indicator.className}</span>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <span className="text-slate-800 font-semibold">{indicator.subject}</span>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <span className="text-slate-600">{indicator.strand}</span>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <span className="text-slate-600">{indicator.subStrand}</span>
            </div>

            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold font-mono text-slate-900">
                {indicator.code}
              </h2>
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-2 py-1 rounded-md transition-colors"
                title="Copy details to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Indicator Description (Hero callout) */}
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Curriculum Indicator (Learning Outcome)
            </span>
            <p className="text-base font-semibold text-slate-900 mt-1 leading-relaxed">
              {indicator.indDesc}
            </p>
          </div>

          {/* Code Anatomy Breakdown for NaCCA Teachers */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                NaCCA Code Structure Breakdown
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="block font-mono font-bold text-emerald-700 text-sm">{anatomy.classPart}</span>
                <span className="text-[11px] text-slate-500">Class</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="block font-mono font-bold text-slate-800 text-sm">{anatomy.strandNo}</span>
                <span className="text-[11px] text-slate-500">Strand No.</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="block font-mono font-bold text-slate-800 text-sm">{anatomy.subStrandNo}</span>
                <span className="text-[11px] text-slate-500">Sub-strand</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="block font-mono font-bold text-slate-800 text-sm">{anatomy.csNo}</span>
                <span className="text-[11px] text-slate-500">Content Standard</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="block font-mono font-bold text-emerald-700 text-sm">{anatomy.indicatorNo}</span>
                <span className="text-[11px] text-slate-500">Indicator No.</span>
              </div>
            </div>
          </div>

          {/* Content Standard Section */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                {indicator.csCode}
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Content Standard
              </h3>
            </div>
            <p className="text-sm text-slate-800 bg-white border border-slate-200 rounded-lg p-3 leading-relaxed">
              {indicator.csDesc}
            </p>
          </div>

          {/* Core Competencies */}
          {indicator.competencies.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Core Competencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {indicator.competencies.map((comp, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs font-medium text-blue-900"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Teaching & Learning Resources (TLMs) */}
          {indicator.resources.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Suggested Resources &amp; TLMs
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {indicator.resources.map((res, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2"
                  >
                    <PackageCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Assessment Strategies */}
          {indicator.assessment.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Pedagogical Assessment Strategies
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {indicator.assessment.map((ass, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 bg-amber-50/50 border border-amber-200 rounded-lg flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                    <span>{ass}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Vocabulary / Keywords */}
          {indicator.keywords.length > 0 && (
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Key Vocabulary &amp; Terminology
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {indicator.keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-mono"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onToggleBookmark(indicator)}
            className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isBookmarked ? (
              <>
                <BookmarkCheck className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                <span>In Lesson Binder</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Add to Lesson Binder</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            {onAskAI && (
              <button
                onClick={() => {
                  onClose();
                  onAskAI(indicator);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                title="Consult Gemini AI about this indicator"
              >
                <Bot className="w-3.5 h-3.5 text-emerald-700" />
                <span>Ask Gemini</span>
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                onOpenLessonNote(indicator);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Generate GES Lesson Plan</span>
            </button>

            <button
              onClick={onClose}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
