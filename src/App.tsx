/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Layers, 
  Search, 
  BookOpen, 
  Upload, 
  BookmarkCheck, 
  Sparkles,
  HelpCircle,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import { 
  CurriculumIndicator, 
  FilterState, 
  LessonBinderItem 
} from './types/curriculum';
import { 
  buildHierarchy, 
  filterIndicators, 
  loadStoredCurriculum, 
  saveStoredCurriculum, 
  resetStoredCurriculum,
  loadLessonBinder,
  saveLessonBinder
} from './utils/curriculumUtils';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { CurriculumTree } from './components/CurriculumTree';
import { IndicatorCard } from './components/IndicatorCard';
import { IndicatorModal } from './components/IndicatorModal';
import { LessonNoteModal } from './components/LessonNoteModal';
import { LessonBinderDrawer } from './components/LessonBinderDrawer';
import { ImportModal } from './components/ImportModal';
import { GeminiChatbot } from './components/GeminiChatbot';

export default function App() {
  // Curriculum Items State
  const [indicators, setIndicators] = useState<CurriculumIndicator[]>(() => loadStoredCurriculum());

  // Lesson Binder State
  const [binderItems, setBinderItems] = useState<LessonBinderItem[]>(() => loadLessonBinder());

  // Navigation and Modal States
  const [activeTab, setActiveTab] = useState<'tree' | 'browse' | 'binder' | 'chat'>('tree');
  const [selectedIndicator, setSelectedIndicator] = useState<CurriculumIndicator | null>(null);
  const [lessonNoteIndicator, setLessonNoteIndicator] = useState<CurriculumIndicator | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedClasses: [],
    selectedSubjects: [],
    selectedCompetencies: [],
    viewMode: 'tree',
  });

  // Save to localStorage when changed
  useEffect(() => {
    saveStoredCurriculum(indicators);
  }, [indicators]);

  useEffect(() => {
    saveLessonBinder(binderItems);
  }, [binderItems]);

  // Derived hierarchy from current indicators
  const hierarchy = useMemo(() => {
    return buildHierarchy(indicators);
  }, [indicators]);

  // Filtered indicators based on search and filters
  const filteredIndicators = useMemo(() => {
    return filterIndicators(
      indicators,
      filters.searchQuery,
      filters.selectedClasses,
      filters.selectedSubjects,
      filters.selectedCompetencies,
      filters.selectedStrand
    );
  }, [indicators, filters]);

  // Filtered hierarchy for Tree View (so search also refines the tree)
  const filteredHierarchy = useMemo(() => {
    return buildHierarchy(filteredIndicators);
  }, [filteredIndicators]);

  // Unique list of all strands
  const allStrands = useMemo(() => {
    const set = new Set<string>();
    indicators.forEach((i) => set.add(i.strand));
    return Array.from(set).sort();
  }, [indicators]);

  // Count distinct content standards
  const totalStandardsCount = useMemo(() => {
    const set = new Set<string>();
    indicators.forEach((i) => set.add(i.csCode));
    return set.size;
  }, [indicators]);

  // Bookmark handlers
  const isIndicatorBookmarked = (indicator: CurriculumIndicator) => {
    return binderItems.some((b) => b.indicator.id === indicator.id);
  };

  const handleToggleBookmark = (indicator: CurriculumIndicator) => {
    if (isIndicatorBookmarked(indicator)) {
      setBinderItems((prev) => prev.filter((b) => b.indicator.id !== indicator.id));
    } else {
      const newItem: LessonBinderItem = {
        id: `binder_${Date.now()}_${indicator.id}`,
        indicator,
        addedAt: Date.now(),
        term: 'Term 1',
        week: 1,
      };
      setBinderItems((prev) => [newItem, ...prev]);
    }
  };

  // Import handler
  const handleImportSuccess = (newItems: CurriculumIndicator[], mode: 'merge' | 'replace') => {
    if (mode === 'replace') {
      setIndicators(newItems);
    } else {
      // Merge: replace matching ids, append novel ones
      const existingMap = new Map(indicators.map((i) => [i.id, i]));
      newItems.forEach((item) => existingMap.set(item.id, item));
      setIndicators(Array.from(existingMap.values()));
    }
  };

  const handleResetToDefault = () => {
    const defaults = resetStoredCurriculum();
    setIndicators(defaults);
  };

  const handleUpdateBinderItem = (id: string, updates: Partial<LessonBinderItem>) => {
    setBinderItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const handleRemoveBinderItem = (id: string) => {
    setBinderItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* 3-Zone Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenImport={() => setIsImportModalOpen(true)}
        totalIndicators={indicators.length}
        binderCount={binderItems.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Editorial Sub-hero Banner */}
        <section className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                Republic of Ghana · National Council for Curriculum and Assessment
              </span>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                Standard-Based Curriculum Browser
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                Explore the complete 6-level progression from <strong>Class &gt; Subject &gt; Strand &gt; Sub-strand &gt; Content Standard &gt; Indicator</strong>. Search outcomes, review suggested TLMs, and build weekly lesson notes.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto shrink-0 text-center">
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
                <span className="block text-2xl font-bold font-mono tabular-nums text-white">
                  {hierarchy.classes.length}
                </span>
                <span className="text-[11px] text-slate-300">Classes</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
                <span className="block text-2xl font-bold font-mono tabular-nums text-emerald-400">
                  {hierarchy.allSubjects.length}
                </span>
                <span className="text-[11px] text-slate-300">Subjects</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
                <span className="block text-2xl font-bold font-mono tabular-nums text-white">
                  {totalStandardsCount}
                </span>
                <span className="text-[11px] text-slate-300">Standards</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
                <span className="block text-2xl font-bold font-mono tabular-nums text-emerald-400">
                  {indicators.length}
                </span>
                <span className="text-[11px] text-slate-300">Indicators</span>
              </div>
            </div>
          </div>
        </section>

        {/* Global Filter & Search Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))}
          availableClasses={hierarchy.allClasses}
          availableSubjects={hierarchy.allSubjects}
          totalResults={filteredIndicators.length}
          totalAll={indicators.length}
        />

        {/* Primary View Switching */}
        {activeTab === 'tree' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500 font-medium">
                Structured Hierarchical View · Drill down through subjects and strands
              </div>
              <button
                onClick={() => setActiveTab('browse')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors"
              >
                <span>Switch to Card Explorer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <CurriculumTree
              hierarchy={filteredHierarchy}
              onSelectIndicator={setSelectedIndicator}
              onOpenLessonNote={setLessonNoteIndicator}
              isBookmarked={isIndicatorBookmarked}
              onToggleBookmark={handleToggleBookmark}
              searchFilter={filters.searchQuery}
            />
          </div>
        )}

        {activeTab === 'browse' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500 font-medium">
                Indicator Card Grid · {filteredIndicators.length} indicators found
              </div>
              <button
                onClick={() => setActiveTab('tree')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors"
              >
                <span>Switch to Hierarchy Tree</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {filteredIndicators.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-slate-800 mb-1">
                  No matching indicators
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  We could not find any curriculum indicators matching your active search or filters.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      searchQuery: '',
                      selectedClasses: [],
                      selectedSubjects: [],
                      selectedCompetencies: [],
                      viewMode: 'browse',
                    })
                  }
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIndicators.map((ind) => (
                  <IndicatorCard
                    key={ind.id}
                    indicator={ind}
                    onSelect={setSelectedIndicator}
                    onOpenLessonNote={setLessonNoteIndicator}
                    isBookmarked={isIndicatorBookmarked(ind)}
                    onToggleBookmark={handleToggleBookmark}
                    searchQuery={filters.searchQuery}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'binder' && (
          <LessonBinderDrawer
            items={binderItems}
            onRemoveItem={handleRemoveBinderItem}
            onUpdateItem={handleUpdateBinderItem}
            onClearAll={() => setBinderItems([])}
            onOpenLessonNote={setLessonNoteIndicator}
            onInspectIndicator={setSelectedIndicator}
            onClose={() => setActiveTab('tree')}
          />
        )}

        {activeTab === 'chat' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500 font-medium">
                Gemini Multi-Turn AI Pedagogical Assistant · NaCCA Standard-Based Curriculum Consultant
              </div>
              <button
                onClick={() => setActiveTab('tree')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors"
              >
                <span>Back to Hierarchy Tree</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <GeminiChatbot
              activeIndicator={selectedIndicator}
              onAddToBinder={handleToggleBookmark}
              onOpenLessonNote={(ind) => setLessonNoteIndicator(ind)}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      <IndicatorModal
        indicator={selectedIndicator}
        onClose={() => setSelectedIndicator(null)}
        onOpenLessonNote={(ind) => setLessonNoteIndicator(ind)}
        isBookmarked={selectedIndicator ? isIndicatorBookmarked(selectedIndicator) : false}
        onToggleBookmark={handleToggleBookmark}
        onAskAI={(ind) => {
          setSelectedIndicator(ind);
          setActiveTab('chat');
        }}
      />

      <LessonNoteModal
        indicator={lessonNoteIndicator}
        onClose={() => setLessonNoteIndicator(null)}
        onAddToBinder={handleToggleBookmark}
        isBookmarked={lessonNoteIndicator ? isIndicatorBookmarked(lessonNoteIndicator) : false}
      />

      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportSuccess={handleImportSuccess}
        onResetToDefault={handleResetToDefault}
        availableSubjects={hierarchy.allSubjects}
      />

      {/* Quiet Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            NaCCA Ghanaian Standard-Based Curriculum Browser · Designed for teachers, educators, and curriculum planners.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              Upload Curriculum JSON
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActiveTab('binder')}
              className="hover:text-slate-900 transition-colors"
            >
              Lesson Binder ({binderItems.length})
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
