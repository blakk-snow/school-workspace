import React from 'react';
import { Search, X, RotateCcw, Filter } from 'lucide-react';
import { FilterState } from '../types/curriculum';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  availableClasses: { id: string; name: string }[];
  availableSubjects: string[];
  totalResults: number;
  totalAll: number;
}

const COMMON_COMPETENCIES = [
  'Critical Thinking',
  'Communication & Collaboration',
  'Personal Development & Leadership',
  'Creativity & Innovation',
  'Cultural Identity & Global Citizenship',
  'Digital Literacy',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  availableClasses,
  availableSubjects,
  totalResults,
  totalAll,
}) => {
  const hasActiveFilters = Boolean(
    filters.searchQuery ||
    filters.selectedClasses.length > 0 ||
    filters.selectedSubjects.length > 0 ||
    filters.selectedCompetencies.length > 0 ||
    filters.selectedStrand
  );

  const handleReset = () => {
    onFilterChange({
      searchQuery: '',
      selectedClasses: [],
      selectedSubjects: [],
      selectedCompetencies: [],
      selectedStrand: undefined,
    });
  };

  const toggleClass = (classId: string) => {
    const next = filters.selectedClasses.includes(classId)
      ? filters.selectedClasses.filter((c) => c !== classId)
      : [...filters.selectedClasses, classId];
    onFilterChange({ selectedClasses: next });
  };

  const toggleSubject = (subject: string) => {
    const next = filters.selectedSubjects.includes(subject)
      ? filters.selectedSubjects.filter((s) => s !== subject)
      : [...filters.selectedSubjects, subject];
    onFilterChange({ selectedSubjects: next });
  };

  const toggleCompetency = (comp: string) => {
    const next = filters.selectedCompetencies.includes(comp)
      ? filters.selectedCompetencies.filter((c) => c !== comp)
      : [...filters.selectedCompetencies, comp];
    onFilterChange({ selectedCompetencies: next });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3.5">
      {/* Top row: Search input + View switcher + Results counter */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search indicator code, keywords, content standards, TLMs, assessment..."
            className="w-full pl-9.5 pr-9 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-xs text-slate-500 font-mono tabular-nums whitespace-nowrap">
            Showing <span className="font-semibold text-slate-900">{totalResults}</span> of {totalAll} indicators
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Filter rows */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
        {/* Class Row */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-16 shrink-0">
            Class:
          </span>
          <button
            onClick={() => onFilterChange({ selectedClasses: [] })}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              filters.selectedClasses.length === 0
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Classes
          </button>
          {availableClasses.map((cls) => {
            const isSelected = filters.selectedClasses.includes(cls.id);
            return (
              <button
                key={cls.id}
                onClick={() => toggleClass(cls.id)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cls.id}
                <span className="ml-1 opacity-75 font-normal text-[10px]">
                  ({cls.name.replace(/\(.*?\)/, '').trim()})
                </span>
              </button>
            );
          })}
        </div>

        {/* Subject Row */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-16 shrink-0">
            Subject:
          </span>
          <button
            onClick={() => onFilterChange({ selectedSubjects: [] })}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              filters.selectedSubjects.length === 0
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Subjects
          </button>
          {availableSubjects.map((sub) => {
            const isSelected = filters.selectedSubjects.includes(sub);
            return (
              <button
                key={sub}
                onClick={() => toggleSubject(sub)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>

        {/* Core Competencies Row */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-16 shrink-0">
            Competency:
          </span>
          {COMMON_COMPETENCIES.map((comp) => {
            const isSelected = filters.selectedCompetencies.includes(comp);
            return (
              <button
                key={comp}
                onClick={() => toggleCompetency(comp)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  isSelected
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {comp}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
