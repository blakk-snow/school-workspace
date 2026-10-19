import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  BookOpen, 
  Sparkles,
  Bookmark,
  FileDown
} from 'lucide-react';
import { CurriculumIndicator, LessonBinderItem } from '../types/curriculum';
import { generateNaccaLessonPlan } from '../utils/curriculumUtils';
import { exportLessonBinderToPdf } from '../utils/pdfExport';

interface LessonNoteModalProps {
  indicator: CurriculumIndicator | null;
  onClose: () => void;
  onAddToBinder?: (indicator: CurriculumIndicator) => void;
  isBookmarked?: boolean;
}

export const LessonNoteModal: React.FC<LessonNoteModalProps> = ({
  indicator,
  onClose,
  onAddToBinder,
  isBookmarked,
}) => {
  const [copied, setCopied] = useState(false);
  const [week, setWeek] = useState('1');
  const [term, setTerm] = useState('Term 1');
  const [duration, setDuration] = useState('60 mins');

  if (!indicator) return null;

  const rawPlan = generateNaccaLessonPlan(indicator);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawPlan);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const blob = new Blob([rawPlan], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Lesson_Plan_${indicator.code.replace(/\./g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    if (!indicator) return;
    const singleItem: LessonBinderItem = {
      id: `single_${indicator.id}`,
      indicator,
      addedAt: Date.now(),
      term: term as any,
      week: parseInt(week, 10) || 1,
    };
    exportLessonBinderToPdf([singleItem], {
      title: `Lesson Plan - ${indicator.code} (${indicator.subject})`,
      termFilter: term,
      format: 'lesson_notes',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 print:m-0 print:border-none print:shadow-none"
        role="dialog"
        aria-modal="true"
      >
        {/* Header - hide on print */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                NaCCA Standard Lesson Plan Template
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                {indicator.code} · {indicator.subject} ({indicator.className})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
              title="Download formatted PDF"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Text</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Lesson Plan Content */}
        <div className="p-6 md:p-8 space-y-6 max-h-[78vh] overflow-y-auto print:max-h-none print:p-0">
          {/* Institution Header */}
          <div className="text-center border-b pb-4 border-slate-200">
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 uppercase">
              Ghana Education Service / NaCCA
            </h1>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest mt-0.5">
              Standard-Based Curriculum Weekly Lesson Plan
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Class / Grade</span>
              <span className="font-semibold text-slate-900">{indicator.className}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Subject</span>
              <span className="font-semibold text-slate-900">{indicator.subject}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Term / Week</span>
              <span className="font-semibold text-slate-900">{term}, Week {week}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Duration</span>
              <span className="font-semibold text-slate-900">{duration}</span>
            </div>
            <div className="col-span-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Strand</span>
              <span className="font-medium text-slate-800">{indicator.strand}</span>
            </div>
            <div className="col-span-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Sub-Strand</span>
              <span className="font-medium text-slate-800">{indicator.subStrand}</span>
            </div>
          </div>

          {/* Standards & Indicator Callout */}
          <div className="space-y-3">
            <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs space-y-1">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                Content Standard ({indicator.csCode}):
              </span>
              <p className="text-slate-800">{indicator.csDesc}</p>
            </div>

            <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg text-xs space-y-1">
              <span className="font-bold text-emerald-800 uppercase tracking-wider text-[11px]">
                Indicator ({indicator.code}):
              </span>
              <p className="font-semibold text-slate-900">{indicator.indDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block mb-1">
                  Core Competencies:
                </span>
                <p className="text-slate-800">{indicator.competencies.join(', ') || 'N/A'}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block mb-1">
                  Key Vocabulary:
                </span>
                <p className="text-slate-800 italic font-mono">{indicator.keywords.join(', ') || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Resources / TLMs */}
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block mb-1.5">
              Teaching &amp; Learning Materials (TLMs):
            </span>
            <ul className="list-disc pl-5 space-y-1 text-slate-800">
              {indicator.resources.length > 0 ? (
                indicator.resources.map((res, i) => <li key={i}>{res}</li>)
              ) : (
                <li>Classroom chalkboard, charts, and pupil textbooks</li>
              )}
            </ul>
          </div>

          {/* 3-PHASE PEDAGOGY */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-1 border-slate-200">
              Teaching and Learning Sequence (3 Phases)
            </h3>

            {/* Phase 1: Starter */}
            <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>PHASE 1: STARTER (Engage / Elicit Prior Knowledge)</span>
                <span className="text-slate-500 font-mono">10 Mins</span>
              </div>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700 leading-relaxed">
                <li>Engage pupils in an active warm-up song or riddle connected to <em>{indicator.subStrand}</em>.</li>
                <li>Ask diagnostic questions to discover what learners already know about <em>{indicator.keywords.slice(0, 3).join(', ') || 'the topic'}</em>.</li>
                <li>Share the clear learning objective: <strong>"By the end of the lesson, pupils will be able to {indicator.indDesc.toLowerCase()}"</strong>.</li>
              </ul>
            </div>

            {/* Phase 2: Main Teaching & Learning */}
            <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>PHASE 2: MAIN ACTIVITIES (Explore, Explain, Elaborate)</span>
                <span className="text-slate-500 font-mono">40 Mins</span>
              </div>
              <div className="space-y-3 text-slate-700 leading-relaxed">
                <div>
                  <strong className="text-slate-900">Step 1 (Exploration &amp; Group Observation):</strong>
                  <p className="mt-0.5">
                    Divide learners into mixed-ability collaborative groups. Provide each group with: {indicator.resources.slice(0, 2).join('; ') || 'learning resources'}. Guide them to examine and write down or sketch what they observe.
                  </p>
                </div>
                <div>
                  <strong className="text-slate-900">Step 2 (Explanation &amp; Discussion):</strong>
                  <p className="mt-0.5">
                    Invite groups to present their findings. Facilitate a guided question-and-answer session to synthesize concepts. Introduce and reinforce key terms: <span className="font-mono font-medium">{indicator.keywords.join(', ')}</span>.
                  </p>
                </div>
                <div>
                  <strong className="text-slate-900">Step 3 (Practical Application &amp; Guided Practice):</strong>
                  <p className="mt-0.5">
                    Have pupils perform the target task: <em>{indicator.indDesc}</em>. Teacher walks around providing scaffolding, targeted questioning, and praise for effort.
                  </p>
                </div>
              </div>
            </div>

            {/* Phase 3: Plenary / Reflection */}
            <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>PHASE 3: PLENARY &amp; REFLECTION (Evaluate &amp; Wrap Up)</span>
                <span className="text-slate-500 font-mono">10 Mins</span>
              </div>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700 leading-relaxed">
                <li>Call on 2-3 learners from different groups to summarize key takeaways from today's lesson.</li>
                <li>Administer formative assessment check: <strong>{indicator.assessment[0] || 'Quick oral Q&A or thumbs-up reflection'}</strong>.</li>
                <li>Assign follow-up practice task or home exploration activity.</li>
              </ul>
            </div>
          </div>

          {/* Assessment Criteria */}
          <div className="p-3.5 bg-amber-50/50 rounded-lg border border-amber-200 text-xs">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1">
              Assessment Criteria / SBA Strategy:
            </span>
            <ul className="list-disc pl-5 space-y-1 text-slate-800">
              {indicator.assessment.map((ass, i) => <li key={i}>{ass}</li>)}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between print:hidden">
          {onAddToBinder && (
            <button
              onClick={() => onAddToBinder(indicator)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isBookmarked ? 'Saved to Lesson Binder' : 'Save to Lesson Binder'}</span>
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Print Lesson Plan
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
