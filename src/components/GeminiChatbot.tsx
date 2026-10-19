import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  RotateCcw, 
  Sparkles, 
  Zap, 
  Brain, 
  User, 
  Copy, 
  Check, 
  BookmarkPlus, 
  FileText, 
  Layers,
  ChevronDown,
  Info
} from 'lucide-react';
import { CurriculumIndicator } from '../types/curriculum';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  modelUsed?: string;
}

interface ChatRole {
  id: string;
  name: string;
  description: string;
  systemInstruction: string;
}

const CHAT_ROLES: ChatRole[] = [
  {
    id: 'curriculum_specialist',
    name: 'NaCCA Curriculum Advisor',
    description: 'Expert on Ghana standard-based curriculum scope, sequence, and core competencies',
    systemInstruction: 
      'You are a senior curriculum consultant for the National Council for Curriculum and Assessment (NaCCA) in Ghana. ' +
      'You guide teachers on interpreting Content Standards, Indicators, strands, and how to nurture core competencies ' +
      '(Critical Thinking, Communication & Collaboration, Personal Development, Cultural Identity, Creativity & Digital Literacy) ' +
      'within the Ghanaian primary and junior high school context (KG1 through B9/JHS 3).',
  },
  {
    id: 'lesson_planner',
    name: 'GES 3-Phase Lesson Designer',
    description: 'Designs practical Phase 1 Starter, Phase 2 Main Activities, and Phase 3 Plenary',
    systemInstruction: 
      'You are a Ghana Education Service (GES) master lesson planning facilitator. ' +
      'You structure classroom instructions using the standard 3-phase lesson format: ' +
      'Phase 1: Starter (diagnostic hooks & prior knowledge, ~10 mins), ' +
      'Phase 2: Main Activities (collaborative hands-on exploration, explanation, scaffolding, ~40 mins), ' +
      'Phase 3: Plenary/Reflection (learner summaries & exit checks, ~10 mins). ' +
      'Always recommend realistic, low-cost Teaching and Learning Materials (TLMs) readily available in Ghanaian local communities.',
  },
  {
    id: 'sba_evaluator',
    name: 'Assessment & SBA Specialist',
    description: 'Creates School-Based Assessment rubrics, oral checks, and authentic performance tasks',
    systemInstruction: 
      'You are a School-Based Assessment (SBA) expert for Ghanaian schools. ' +
      'You design authentic formative assessments, observation rubrics, scoring guides, and practical performance tasks ' +
      'that measure learner progress against specific NaCCA indicators without relying solely on rote memorization.',
  },
  {
    id: 'differentiation_coach',
    name: 'Differentiation & Inclusion Coach',
    description: 'Adapts lessons for mixed-ability classes, multi-grade settings, and varied learning paces',
    systemInstruction: 
      'You are an inclusive education coach supporting Ghanaian teachers in large, mixed-ability classrooms. ' +
      'You provide tiered activities, multi-sensory strategies, scaffolding for struggling readers, challenges for high-achievers, ' +
      'and creative adaptations for resource-constrained or multi-grade schools.',
  },
];

interface ModelOption {
  id: string;
  name: string;
  badge: string;
  icon: typeof Zap;
  bestFor: string;
}

const MODEL_OPTIONS: ModelOption[] = [
  {
    id: 'gemini-3.1-flash-lite',
    name: 'Gemini 3.1 Flash Lite',
    badge: 'Fast',
    icon: Zap,
    bestFor: 'Tasks that should happen fast: quick definitions, vocabulary, rapid prompts',
  },
  {
    id: 'gemini-3.8-flash',
    name: 'Gemini 3.8 Flash',
    badge: 'General',
    icon: Sparkles,
    bestFor: 'General curriculum tasks: lesson notes, activity design, standard explanations (Recommended)',
  },
  {
    id: 'gemini-4-argon',
    name: 'Gemini 4 Argon',
    badge: 'Complex',
    icon: Brain,
    bestFor: 'Particularly complex tasks: deep STEM inquiry, multi-grade curriculum cross-mapping, multi-tier rubrics',
  },
];

interface GeminiChatbotProps {
  activeIndicator?: CurriculumIndicator | null;
  onAddToBinder?: (indicator: CurriculumIndicator) => void;
  onOpenLessonNote?: (indicator: CurriculumIndicator) => void;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  activeIndicator,
  onAddToBinder,
  onOpenLessonNote,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome_1',
      role: 'assistant',
      content: 
        'Hello! I am your **NaCCA Curriculum & Lesson Planning Assistant** powered by Gemini. ' +
        'How can I help you today? You can ask me to design interactive activities for any indicator, suggest local Ghanaian TLMs, structure a 3-phase lesson plan, or create SBA rubrics.',
      timestamp: Date.now(),
      modelUsed: 'gemini-3.8-flash',
    },
  ]);

  const [input, setInput] = useState('');
  const [selectedRole, setSelectedRole] = useState<ChatRole>(CHAT_ROLES[0]);
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.8-flash');
  const [isLoading, setIsLoading] = useState(false);
  const [includeContext, setIncludeContext] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Build context payload if indicator is available
      const contextData = includeContext && activeIndicator ? {
        indicatorCode: activeIndicator.code,
        class: activeIndicator.className,
        subject: activeIndicator.subject,
        strand: activeIndicator.strand,
        subStrand: activeIndicator.subStrand,
        contentStandard: `${activeIndicator.csCode} - ${activeIndicator.csDesc}`,
        indicatorDescription: activeIndicator.indDesc,
        coreCompetencies: activeIndicator.competencies,
        suggestedTLMs: activeIndicator.resources,
        assessmentStrategies: activeIndicator.assessment,
        keywords: activeIndicator.keywords,
      } : undefined;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          model: selectedModel,
          systemInstruction: selectedRole.systemInstruction,
          contextData,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server returned ${res.status}`);
      }

      const data = await res.json();
      const botMessage: ChatMessage = {
        id: `bot_${Date.now()}`,
        role: 'assistant',
        content: data.content || 'I have completed your request.',
        timestamp: Date.now(),
        modelUsed: data.modelUsed || selectedModel,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat request error:', err);
      const errorMessage: ChatMessage = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        content: `⚠️ **Unable to connect to Gemini API**: ${err?.message || 'Unknown error'}. Please check your connection or environment settings.`,
        timestamp: Date.now(),
        modelUsed: selectedModel,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (window.confirm('Reset conversation history?')) {
      setMessages([
        {
          id: `welcome_${Date.now()}`,
          role: 'assistant',
          content: `Conversation reset. I am ready in **${selectedRole.name}** mode. What would you like to explore?`,
          timestamp: Date.now(),
          modelUsed: selectedModel,
        },
      ]);
    }
  };

  const quickPrompts = [
    activeIndicator 
      ? `Give me 3 engaging starter activities (Phase 1) for ${activeIndicator.code}`
      : 'Suggest low-cost local Ghanaian materials for teaching living vs non-living things',
    activeIndicator 
      ? `How do I differentiate ${activeIndicator.code} for learners with reading difficulties?`
      : 'Draft an authentic 4-tier SBA rubric for Basic 1 Science Diversity of Matter',
    'Explain how to integrate Critical Thinking and Collaboration into this lesson',
    'Write a plenary reflection exercise to verify pupil understanding at the end of the lesson',
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col h-[740px]">
      {/* Top Configuration Bar: Roles & Model Selection */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Role Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 shadow-2xs">
            <Bot className="w-4 h-4 text-emerald-700 shrink-0" />
            <select
              value={selectedRole.id}
              onChange={(e) => {
                const role = CHAT_ROLES.find((r) => r.id === e.target.value) || CHAT_ROLES[0];
                setSelectedRole(role);
              }}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
            >
              {CHAT_ROLES.map((r) => (
                <option key={r.id} value={r.id}>
                  Role: {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Model Selector */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 shadow-2xs">
            {selectedModel === 'gemini-4-argon' ? (
              <Brain className="w-4 h-4 text-purple-600 shrink-0" />
            ) : selectedModel === 'gemini-3.1-flash-lite' ? (
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
            ) : (
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            )}
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1 font-mono"
            >
              {MODEL_OPTIONS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.badge}: {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right side controls: Clear history & context toggle */}
        <div className="flex items-center gap-3">
          {activeIndicator && (
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-600">
              <input
                type="checkbox"
                checked={includeContext}
                onChange={(e) => setIncludeContext(e.target.checked)}
                className="rounded text-emerald-700 focus:ring-emerald-600"
              />
              <span className="font-medium text-[11px]">
                Inject {activeIndicator.code} Context
              </span>
            </label>
          )}

          <button
            onClick={handleClearHistory}
            className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 p-1 rounded hover:bg-slate-200/50 transition-colors"
            title="Clear Chat History"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[11px]">Reset</span>
          </button>
        </div>
      </div>

      {/* Role description banner */}
      <div className="px-4 py-2 bg-emerald-50/60 border-b border-emerald-100 flex items-center justify-between text-[11px] text-emerald-900">
        <span className="truncate">
          <strong>{selectedRole.name}:</strong> {selectedRole.description}
        </span>
        <span className="font-mono text-emerald-800 shrink-0 ml-2">
          Model: {selectedModel}
        </span>
      </div>

      {/* Active Indicator Context Pill */}
      {includeContext && activeIndicator && (
        <div className="px-4 py-2 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between text-xs text-slate-700">
          <div className="flex items-center gap-2 truncate">
            <Layers className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="font-mono font-bold text-slate-900 bg-white px-1.5 py-0.2 rounded border border-slate-200">
              {activeIndicator.code}
            </span>
            <span className="truncate font-medium">{activeIndicator.indDesc}</span>
          </div>
          <span className="text-[11px] text-slate-500 shrink-0 ml-2">
            {activeIndicator.subject} ({activeIndicator.className})
          </span>
        </div>
      )}

      {/* Scrollable Message Thread */}
      <div className="flex-1 p-4 md:p-6 space-y-4 overflow-y-auto bg-slate-50/30">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-slate-900 text-white'
                    : 'bg-emerald-700 text-white shadow-xs'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-slate-900 text-white rounded-tr-xs'
                    : 'bg-white border border-slate-200 text-slate-900 rounded-tl-xs shadow-xs'
                }`}
              >
                {/* Assistant Model Tag & Copy action */}
                {!isUser && (
                  <div className="flex items-center justify-between gap-4 pb-1.5 mb-2 border-b border-slate-100 text-[11px] text-slate-400">
                    <span className="font-mono text-emerald-700 font-medium">
                      {m.modelUsed || selectedModel}
                    </span>
                    <button
                      onClick={() => handleCopyText(m.id, m.content)}
                      className="text-slate-400 hover:text-slate-700 inline-flex items-center gap-1 transition-colors"
                      title="Copy response"
                    >
                      {copiedId === m.id ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{copiedId === m.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                )}

                {/* Content with basic markdown preservation */}
                <div className="whitespace-pre-wrap space-y-2">
                  {m.content}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 rounded-tl-xs shadow-xs text-xs text-slate-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>Consulting {selectedModel} in {selectedRole.name} mode...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starter Chips */}
      <div className="px-4 py-2 border-t border-slate-100 bg-white flex items-center gap-2 overflow-x-auto text-[11px]">
        <span className="font-semibold text-slate-400 whitespace-nowrap uppercase tracking-wider text-[10px]">
          Suggestions:
        </span>
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap transition-colors border border-slate-200/60"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Composer */}
      <div className="p-3 md:p-4 border-t border-slate-200 bg-slate-50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-end gap-2"
        >
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              rows={2}
              placeholder="Ask anything about the NaCCA curriculum, lesson plans, differentiation, or SBA..."
              className="w-full p-2.5 pr-10 text-xs md:text-sm bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:pointer-events-none text-white font-semibold shadow-xs transition-colors shrink-0"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
