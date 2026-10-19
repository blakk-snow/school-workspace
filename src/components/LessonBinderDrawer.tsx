import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Printer, 
  Download, 
  FileText, 
  BookMarked,
  Calendar,
  Layers,
  ChevronRight,
  ArrowRight,
  FileDown
} from 'lucide-react';
import { LessonBinderItem, CurriculumIndicator } from '../types/curriculum';
import { ExportPdfModal } from './ExportPdfModal';

interface LessonBinderDrawerProps {
  items: LessonBinderItem[];
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, updates: Partial<LessonBinderItem>) => void;
  onClearAll: () => void;
  onOpenLessonNote: (indicator: CurriculumIndicator) => void;
  onInspectIndicator: (indicator: CurriculumIndicator) => void;
  onClose: () => void;
}

export const LessonBinderDrawer: React.FC<LessonBinderDrawerProps> = ({
  items,
  onRemoveItem,
  onUpdateItem,
  onClearAll,
  onOpenLessonNote,
  onInspectIndicator,
  onClose,
}) => {
  const [selectedTerm, setSelectedTerm] = useState<string>('All');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  const filteredItems = items.filter((item) => {
    if (selectedTerm === 'All') return true;
    return item.term === selectedTerm;
  });

  const handleExportCsv = () => {
    if (items.length === 0) return;
    const headers = ['Term', 'Week', 'Class', 'Subject', 'Strand', 'Sub-Strand', 'Content Standard Code', 'Content Standard Desc', 'Indicator Code', 'Indicator Description', 'Competencies', 'Resources', 'Assessment'];
    const rows = items.map((i) => [
      `"${i.term || 'Term 1'}"`,
      `"${i.week || 1}"`,
      `"${i.indicator.className}"`,
      `"${i.indicator.subject}"`,
      `"${i.indicator.strand.replace(/"/g, '""')}"`,
      `"${i.indicator.subStrand.replace(/"/g, '""')}"`,
      `"${i.indicator.csCode}"`,
      `"${i.indicator.csDesc.replace(/"/g, '""')}"`,
      `"${i.indicator.code}"`,
      `"${i.indicator.indDesc.replace(/"/g, '""')}"`,
      `"${i.indicator.competencies.join('; ').replace(/"/g, '""')}"`,
      `"${i.indicator.resources.join('; ').replace(/"/g, '""')}"`,
      `"${i.indicator.assessment.join('; ').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nacca_scheme_of_work_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Binder Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-emerald-700" />
            <h2 className="text-base font-bold text-slate-900">
              Teacher Lesson Binder &amp; Scheme of Work
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-medium">
              {items.length} {items.length === 1 ? 'Indicator' : 'Indicators'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Collect indicators, assign them to school terms/weeks, generate lesson plans, and export your scheme of work.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {items.length > 0 && (
            <>
              <button
                onClick={() => setIsPdfModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
                title="Export Lesson Binder & Scheme of Work as PDF"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Export to PDF</span>
              </button>

              <button
                onClick={handleExportCsv}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
                title="Export Scheme of Work to Excel/CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Scheme</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Clear all items from your lesson binder?')) {
                    onClearAll();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filter by Term */}
      {items.length > 0 && (
        <div className="px-4 py-2.5 border-b border-slate-100 bg-white flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Filter by Term:</span>
            {['All', 'Term 1', 'Term 2', 'Term 3'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTerm(t)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  selectedTerm === t
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <span className="text-slate-400 font-mono text-[11px]">
            Showing {filteredItems.length} of {items.length} items
          </span>
        </div>
      )}

      {/* Item List / Empty State */}
      {items.length === 0 ? (
        <div className="p-12 text-center">
          <BookMarked className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800 mb-1">
            Your Lesson Binder is empty
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
            Browse through the curriculum hierarchy or search indicators and click the bookmark icon to save them to your term's scheme of work.
          </p>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
          >
            <span>Browse Curriculum</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-4 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              {/* Left Column: Metadata & Description */}
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {item.indicator.code}
                  </span>
                  <span className="font-semibold text-emerald-800">{item.indicator.className}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="font-medium text-slate-700">{item.indicator.subject}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-slate-500">{item.indicator.strand}</span>
                </div>

                <p className="text-sm font-semibold text-slate-900 leading-snug">
                  {item.indicator.indDesc}
                </p>

                <p className="text-xs text-slate-600 line-clamp-1">
                  <span className="font-medium text-slate-700">Standard: </span>
                  {item.indicator.csDesc}
                </p>
              </div>

              {/* Middle Column: Term & Week Assigners */}
              <div className="flex items-center gap-2 shrink-0 self-start md:self-center bg-slate-100/70 p-2 rounded-lg border border-slate-200/80 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block">Term</label>
                  <select
                    value={item.term || 'Term 1'}
                    onChange={(e) => onUpdateItem(item.id, { term: e.target.value as any })}
                    className="bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 font-medium focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Term 1">Term 1</option>
                    <option value="Term 2">Term 2</option>
                    <option value="Term 3">Term 3</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block">Week</label>
                  <select
                    value={item.week || 1}
                    onChange={(e) => onUpdateItem(item.id, { week: parseInt(e.target.value, 10) })}
                    className="bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 font-medium focus:outline-none focus:border-emerald-600"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((w) => (
                      <option key={w} value={w}>
                        Wk {w}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
                <button
                  onClick={() => onOpenLessonNote(item.indicator)}
                  className="px-2.5 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors flex items-center gap-1"
                  title="Generate Lesson Plan Template"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Plan</span>
                </button>

                <button
                  onClick={() => onInspectIndicator(item.indicator)}
                  className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-md transition-colors"
                >
                  Inspect
                </button>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                  title="Remove from binder"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PDF Export Modal */}
      <ExportPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        items={items}
        defaultTerm={selectedTerm}
      />
    </div>
  );
};
