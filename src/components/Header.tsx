import { Upload, BookOpen, Layers, BookmarkCheck, Bot } from 'lucide-react';

interface HeaderProps {
  activeTab: 'tree' | 'browse' | 'binder' | 'chat';
  onTabChange: (tab: 'tree' | 'browse' | 'binder' | 'chat') => void;
  onOpenImport: () => void;
  totalIndicators: number;
  binderCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenImport,
  totalIndicators,
  binderCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              N
            </div>
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); onTabChange('tree'); }} 
              className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap hover:text-emerald-700 transition-colors"
            >
              NaCCA Ghana Curriculum Navigator
            </a>
          </div>

          {/* Zone 2: 4 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => onTabChange('tree')}
              className={`flex items-center gap-2 whitespace-nowrap transition-colors pb-0.5 border-b-2 ${
                activeTab === 'tree'
                  ? 'border-emerald-600 text-emerald-800 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Hierarchy Tree</span>
            </button>

            <button
              onClick={() => onTabChange('browse')}
              className={`flex items-center gap-2 whitespace-nowrap transition-colors pb-0.5 border-b-2 ${
                activeTab === 'browse'
                  ? 'border-emerald-600 text-emerald-800 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Indicator Explorer</span>
              <span className="text-xs text-slate-400 font-mono tabular-nums">({totalIndicators})</span>
            </button>

            <button
              onClick={() => onTabChange('binder')}
              className={`flex items-center gap-2 whitespace-nowrap transition-colors pb-0.5 border-b-2 ${
                activeTab === 'binder'
                  ? 'border-emerald-600 text-emerald-800 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>Lesson Binder</span>
              {binderCount > 0 && (
                <span className="text-xs px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-mono font-medium">
                  {binderCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onTabChange('chat')}
              className={`flex items-center gap-2 whitespace-nowrap transition-colors pb-0.5 border-b-2 ${
                activeTab === 'chat'
                  ? 'border-emerald-600 text-emerald-800 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bot className="w-4 h-4 text-emerald-600" />
              <span>Gemini Assistant</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenImport}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-emerald-600 whitespace-nowrap"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import Files</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
