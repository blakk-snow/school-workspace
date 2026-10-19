import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  FileCode, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  RotateCcw,
  Layers,
  ArrowRight
} from 'lucide-react';
import { CurriculumIndicator } from '../types/curriculum';
import { parseUploadedJson } from '../utils/curriculumUtils';
import { CLASS_NAMES } from '../data/initialData';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (newIndicators: CurriculumIndicator[], mode: 'merge' | 'replace') => void;
  onResetToDefault: () => void;
  availableSubjects: string[];
}

const SAMPLE_JSON_TEMPLATE = `{
  "B2.1.1.1.1": {
    "strand": "1. DIVERSITY OF MATTER",
    "sub_strand": "1. Living and Non-Living Things",
    "cs_code": "B2.1.1.1",
    "cs_desc": "Show understanding of the life processes of living things",
    "ind_desc": "Observe and describe how different animals move.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Animal locomotion videos; field study pictures",
    "keywords": "movement, locomotion, swim, fly, crawl",
    "assessment": "Locomotion classification table; oral Q&A"
  }
}`;

export const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess,
  onResetToDefault,
  availableSubjects,
}) => {
  const [activeMode, setActiveMode] = useState<'paste' | 'file'>('file');
  const [jsonText, setJsonText] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('Auto-detect');
  const [selectedClass, setSelectedClass] = useState<string>('Auto-detect');
  const [importMode, setImportMode] = useState<'merge' | 'replace'>('merge');
  const [parseResult, setParseResult] = useState<{
    success: boolean;
    items: CurriculumIndicator[];
    message: string;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleValidate = (text: string) => {
    if (!text.trim()) {
      setParseResult(null);
      return;
    }
    const subOverride = selectedSubject === 'Auto-detect' ? undefined : selectedSubject;
    const clsOverride = selectedClass === 'Auto-detect' ? undefined : selectedClass;
    const result = parseUploadedJson(text, subOverride, clsOverride);
    setParseResult(result);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonText(content);
      const subOverride = selectedSubject === 'Auto-detect' ? undefined : selectedSubject;
      const clsOverride = selectedClass === 'Auto-detect' ? undefined : selectedClass;
      setParseResult(parseUploadedJson(content, subOverride, clsOverride));
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setJsonText(content);
        const subOverride = selectedSubject === 'Auto-detect' ? undefined : selectedSubject;
        const clsOverride = selectedClass === 'Auto-detect' ? undefined : selectedClass;
        setParseResult(parseUploadedJson(content, subOverride, clsOverride));
      };
      reader.readAsText(file);
    }
  };

  const handleExecuteImport = () => {
    if (!parseResult || !parseResult.success || parseResult.items.length === 0) return;
    onImportSuccess(parseResult.items, importMode);
    onClose();
  };

  const handleDownloadSample = () => {
    const blob = new Blob([SAMPLE_JSON_TEMPLATE], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nacca_sample_curriculum_template.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Upload className="w-5 h-5 text-emerald-700" />
              <span>Import NaCCA Curriculum Files</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload your other NaCCA JSON subject files (or paste the JSON) to expand the browser.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setActiveMode('file')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeMode === 'file'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upload .json File
            </button>
            <button
              onClick={() => setActiveMode('paste')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeMode === 'paste'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Paste JSON Directly
            </button>
          </div>

          {/* Subject & Class Override Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Subject for Imported Items:
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  if (jsonText) {
                    const sub = e.target.value === 'Auto-detect' ? undefined : e.target.value;
                    const cls = selectedClass === 'Auto-detect' ? undefined : selectedClass;
                    setParseResult(parseUploadedJson(jsonText, sub, cls));
                  }
                }}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
              >
                <option value="Auto-detect">Auto-detect from file</option>
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English Language">English Language</option>
                <option value="Computing">Computing / ICT</option>
                <option value="Our World and Our People">Our World and Our People (OWOP)</option>
                <option value="Social Studies">Social Studies</option>
                <option value="Creative Arts">Creative Arts</option>
                <option value="Physical Education">Physical Education</option>
                <option value="Religious and Moral Education">Religious &amp; Moral Education (RME)</option>
                <option value="Ghanaian Language">Ghanaian Language</option>
                <option value="French">French</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Class / Grade Level:
              </label>
              <select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  if (jsonText) {
                    const sub = selectedSubject === 'Auto-detect' ? undefined : selectedSubject;
                    const cls = e.target.value === 'Auto-detect' ? undefined : e.target.value;
                    setParseResult(parseUploadedJson(jsonText, sub, cls));
                  }
                }}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
              >
                <option value="Auto-detect">Auto-detect from code (e.g. B1, B2...)</option>
                {Object.entries(CLASS_NAMES).map(([id, label]) => (
                  <option key={id} value={id}>
                    {id} - {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* File Upload Zone */}
          {activeMode === 'file' ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                isDragging
                  ? 'border-emerald-600 bg-emerald-50/50'
                  : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
              <FileCode className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-800">
                Click to browse or drag and drop your NaCCA JSON file here
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Accepts dictionary structure <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">"B1.1.1.1.1": {"{"} strand, ... {"}"}</code> or indicator arrays.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs">
                <label className="font-semibold text-slate-700">Paste JSON Content:</label>
                <button
                  type="button"
                  onClick={() => {
                    setJsonText(SAMPLE_JSON_TEMPLATE);
                    handleValidate(SAMPLE_JSON_TEMPLATE);
                  }}
                  className="text-emerald-700 hover:underline font-medium"
                >
                  Load sample format
                </button>
              </div>
              <textarea
                value={jsonText}
                onChange={(e) => {
                  setJsonText(e.target.value);
                  handleValidate(e.target.value);
                }}
                rows={7}
                placeholder="Paste your NaCCA curriculum JSON object here..."
                className="w-full font-mono text-xs p-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 text-slate-900"
              />
            </div>
          )}

          {/* Validation & Preview Card */}
          {parseResult && (
            <div
              className={`p-4 rounded-xl border text-xs ${
                parseResult.success
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50/70 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-semibold">
                {parseResult.success ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{parseResult.message}</span>
              </div>

              {parseResult.success && parseResult.items.length > 0 && (
                <div className="mt-2.5 pt-2.5 border-t border-emerald-200/80 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div>
                    <span className="text-[11px] text-emerald-800 block">Class:</span>
                    <span className="font-semibold font-mono">{parseResult.items[0].className}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-800 block">Subject:</span>
                    <span className="font-semibold">{parseResult.items[0].subject}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-800 block">First Code:</span>
                    <span className="font-mono font-semibold">{parseResult.items[0].code}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Merge vs Replace Mode */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-slate-800">Import Method:</span>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="importMode"
                  checked={importMode === 'merge'}
                  onChange={() => setImportMode('merge')}
                  className="text-emerald-700"
                />
                <span className="text-slate-700 font-medium">Merge with current database</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer ml-3">
                <input
                  type="radio"
                  name="importMode"
                  checked={importMode === 'replace'}
                  onChange={() => setImportMode('replace')}
                  className="text-emerald-700"
                />
                <span className="text-slate-700 font-medium">Replace current database</span>
              </label>
            </div>
          </div>

          {/* Sample Download & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
            <button
              type="button"
              onClick={handleDownloadSample}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Blank Starter Template (.json)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all curriculum data back to original starter files?')) {
                  onResetToDefault();
                  onClose();
                }
              }}
              className="inline-flex items-center gap-1.5 text-rose-600 hover:text-rose-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Factory Defaults</span>
            </button>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExecuteImport}
            disabled={!parseResult?.success || parseResult.items.length === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:pointer-events-none rounded-lg shadow-sm transition-colors"
          >
            <span>Import {parseResult?.items?.length || 0} Indicators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
