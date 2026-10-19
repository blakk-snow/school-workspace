import React, { useState } from 'react';
import { 
  X, 
  FileDown, 
  Printer, 
  FileText, 
  CheckCircle2, 
  Layers, 
  School,
  User,
  Calendar
} from 'lucide-react';
import { LessonBinderItem } from '../types/curriculum';
import { exportLessonBinderToPdf, PdfExportOptions } from '../utils/pdfExport';

interface ExportPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: LessonBinderItem[];
  defaultTerm?: string;
}

export const ExportPdfModal: React.FC<ExportPdfModalProps> = ({
  isOpen,
  onClose,
  items,
  defaultTerm = 'All',
}) => {
  const [title, setTitle] = useState('NaCCA Scheme of Work & Lesson Binder');
  const [schoolName, setSchoolName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [academicYear, setAcademicYear] = useState('2026/2027');
  const [termFilter, setTermFilter] = useState<string>(defaultTerm);
  const [format, setFormat] = useState<'both' | 'scheme' | 'lesson_notes'>('both');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const filteredCount = termFilter === 'All' 
    ? items.length 
    : items.filter((i) => i.term === termFilter).length;

  const handleDownloadPdf = () => {
    setIsGenerating(true);
    setTimeout(() => {
      try {
        const options: PdfExportOptions = {
          title,
          schoolName,
          teacherName,
          academicYear,
          termFilter,
          format,
        };
        exportLessonBinderToPdf(items, options);
      } catch (err) {
        console.error('Failed to export PDF:', err);
      } finally {
        setIsGenerating(false);
      }
    }, 150);
  };

  const handleBrowserPrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-6"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold">
              <FileDown className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Export Lesson Binder to PDF
              </h2>
              <p className="text-xs text-slate-500">
                Generate an official Ghana NaCCA printable document
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Summary Box */}
          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-semibold text-emerald-950 block">Ready to Export</span>
              <span className="text-emerald-800 text-[11px]">
                {filteredCount} {filteredCount === 1 ? 'lesson note' : 'lesson notes'} selected
              </span>
            </div>
            <span className="px-2.5 py-1 bg-white text-emerald-800 rounded-lg border border-emerald-300 font-mono font-bold">
              {filteredCount} items
            </span>
          </div>

          {/* Document Title */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Document Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Term 1 Scheme of Work - Science Basic 1"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* School Name & Teacher Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <School className="w-3.5 h-3.5 text-slate-400" />
                <span>School Name (Optional)</span>
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="e.g. Achimota Basic School"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Teacher Name (Optional)</span>
              </label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                placeholder="e.g. Kwame Mensah"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Term Filter & Academic Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Filter by Term:
              </label>
              <select
                value={termFilter}
                onChange={(e) => setTermFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
              >
                <option value="All">All Terms ({items.length} indicators)</option>
                <option value="Term 1">Term 1 Only</option>
                <option value="Term 2">Term 2 Only</option>
                <option value="Term 3">Term 3 Only</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Academic Year:
              </label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="2026/2027"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Export Content Format */}
          <div className="space-y-1.5 pt-1">
            <label className="block font-semibold text-slate-700">
              PDF Layout &amp; Content:
            </label>
            <div className="space-y-1.5">
              <label className="flex items-start gap-2 p-2 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  checked={format === 'both'}
                  onChange={() => setFormat('both')}
                  className="mt-0.5 text-emerald-700"
                />
                <div>
                  <span className="font-semibold text-slate-900 block">Complete Portfolio (Recommended)</span>
                  <span className="text-slate-500 text-[11px]">Includes weekly scheme summary table + full 3-phase lesson plans for every indicator.</span>
                </div>
              </label>

              <label className="flex items-start gap-2 p-2 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  checked={format === 'scheme'}
                  onChange={() => setFormat('scheme')}
                  className="mt-0.5 text-emerald-700"
                />
                <div>
                  <span className="font-semibold text-slate-900 block">Scheme of Work Overview Table Only</span>
                  <span className="text-slate-500 text-[11px]">A compact multi-week syllabus table with strands, standards, and learning outcomes.</span>
                </div>
              </label>

              <label className="flex items-start gap-2 p-2 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  checked={format === 'lesson_notes'}
                  onChange={() => setFormat('lesson_notes')}
                  className="mt-0.5 text-emerald-700"
                />
                <div>
                  <span className="font-semibold text-slate-900 block">Detailed Lesson Notes Only</span>
                  <span className="text-slate-500 text-[11px]">Step-by-step Phase 1, Phase 2, and Phase 3 lesson plans with TLMs and SBA tasks.</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={handleBrowserPrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Dialog</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isGenerating || filteredCount === 0}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:pointer-events-none rounded-lg shadow-sm transition-colors"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>{isGenerating ? 'Generating PDF...' : 'Download PDF Document'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
