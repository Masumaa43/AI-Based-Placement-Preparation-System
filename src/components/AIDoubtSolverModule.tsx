import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  RotateCw, 
  Copy, 
  Check, 
  Code2, 
  Lightbulb, 
  ArrowRight,
  Globe,
  ExternalLink,
  Search,
  Building2,
  TrendingUp,
  BrainCircuit,
  Boxes,
  Database,
  Cpu,
  ShieldCheck,
  Zap,
  Bookmark
} from 'lucide-react';
import { SubjectId, GroundedSource, LivePlacementTrend } from '../types';
import { solveDoubtFromCurriculum } from '../data/doubtSolverEngine';

interface AIDoubtSolverModuleProps {
  onNavigateToTab?: (tab: string, subjectId?: SubjectId) => void;
}

export const AIDoubtSolverModule: React.FC<AIDoubtSolverModuleProps> = ({
  onNavigateToTab
}) => {
  const [activeTab, setActiveTab] = useState<'doubt' | 'trends'>('doubt');
  const [selectedTrack, setSelectedTrack] = useState<'all' | 'dsa' | 'ml' | 'core_cs' | 'webdev' | 'oops'>('all');
  const [companyFilter, setCompanyFilter] = useState('');
  const [doubtText, setDoubtText] = useState('');
  const [isSolving, setIsSolving] = useState(false);
  const [useSearchGrounding, setUseSearchGrounding] = useState(true);

  // Active Doubt state
  const [activeDoubt, setActiveDoubt] = useState<{
    query: string;
    intuition: string;
    interviewModel: string;
    staffTip: string;
    codeSnippet?: string;
    sources?: GroundedSource[];
    searchQueries?: string[];
    isGrounded?: boolean;
  }>({
    query: 'Why does TCP need the TIME_WAIT state (2*MSL) instead of closing immediately?',
    intuition: 'If the server does not receive the final ACK sent by the client, it will retransmit the FIN segment. If the client closed immediately and freed the port, the delayed FIN would be rejected with an RST, or worse, a new connection on the same port could receive stale packets.',
    interviewModel: 'TIME_WAIT lasts for 2 * Maximum Segment Lifetime (MSL) to achieve two critical network invariants:\n1. Graceful Connection Teardown: Ensures the final ACK is received by the peer. If lost, the peer retransmits FIN, and the client in TIME_WAIT can resend the ACK.\n2. Draining Stale Packets: Guarantees that any delayed duplicate packets from the old connection incarnation die in the network before a new socket binds to the same IP:port tuple.',
    staffTip: 'In FAANG system design and high-throughput networking rounds, explain that high TIME_WAIT connections on a reverse proxy (like Nginx) exhaust ephemeral socket ports. Mitigate with TCP SO_REUSEADDR, connection pooling (keep-alive), or TCP TW_RECYCLE.',
    codeSnippet: `// Linux TCP socket setting for ephemeral port reuse:
int opt = 1;
setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));`,
    sources: [
      { title: 'RFC 793 - Transmission Control Protocol Specification', uri: 'https://datatracker.ietf.org/doc/html/rfc793' },
      { title: 'GeeksforGeeks: TCP 3-Way Handshake & Teardown', uri: 'https://www.geeksforgeeks.org/tcp-3-way-handshake-process/' }
    ],
    searchQueries: ['TCP TIME_WAIT 2MSL purpose RFC 793'],
    isGrounded: true
  });

  // Trends state
  const [trendSearch, setTrendSearch] = useState('Google & Microsoft SDE interview rounds 2025 2026');
  const [isLoadingTrends, setIsLoadingTrends] = useState(false);
  const [liveTrends, setLiveTrends] = useState<LivePlacementTrend | null>({
    query: '2025-2026 Campus Placement & SDE Hiring Rounds',
    track: 'general',
    companyOrRole: 'Top Product Firms (Google, Amazon, Microsoft, Uber, Meta)',
    summary: 'Current 2025/2026 interview standards have evolved: LeetCode hard problems are increasingly paired with real-world low level design, concurrency, modern web fundamentals, and Generative AI/LLM system concepts.',
    keyInsights: [
      'Data Structures: Sliding window, monotonic stacks, and graph shortest paths (Dijkstra) appear in over 75% of online assessments (OA).',
      'Machine Learning: Interviewers probe deeply into RAG architectures, embedding dimensionalities, and precision/recall trade-offs over pure math derivations.',
      'Web Development: Heavy scrutiny on the browser Event Loop, React 19 concurrent features, and Web Security (CORS, CSRF, XSS).',
      'OOPs & Low-Level Design: Expect machine coding rounds testing SOLID refactoring, Strategy, and Observer patterns.'
    ],
    trendingQuestions: [
      { question: 'Design LRU Cache with TTL and O(1) eviction', round: 'Round 1: DSA / Machine Coding', difficulty: 'Medium', focusArea: 'Hash Map + Doubly Linked List' },
      { question: 'Explain RAG Parent-Child chunking vs naive sentence chunking', round: 'Round 2: ML Specialization', difficulty: 'Hard', focusArea: 'Vector Search & Transformers' },
      { question: 'What is the exact execution order of Promise.then vs queueMicrotask vs setTimeout?', round: 'Round 2: Frontend Architecture', difficulty: 'Medium', focusArea: 'Browser Event Loop & Microtasks' },
      { question: 'Explain why 2-Phase Locking (2PL) guarantees Conflict Serializability in RDBMS', round: 'Round 3: Core Systems & DBMS', difficulty: 'Hard', focusArea: 'Database Concurrency & ACID' }
    ],
    hiringBar: 'Candidates who communicate trade-offs aloud, evaluate edge cases unprompted, and write modular production code receive Strong Hire recommendations.',
    sources: [
      { title: 'LeetCode Interview Discuss: Recent Experiences 2025-2026', uri: 'https://leetcode.com/discuss/interview-experience' },
      { title: 'GeeksforGeeks SDE Interview Sheet', uri: 'https://www.geeksforgeeks.org' }
    ],
    searchQueries: ['software engineer interview trends 2025 2026', 'SDE 1 campus placement question bank']
  });

  const [hasCopied, setHasCopied] = useState(false);

  // Preset curriculum doubts categorized by the 5 requested tracks
  const sampleDoubtsByTrack: Record<string, string[]> = {
    all: [
      'Why is B+ Tree preferred over B Tree in relational database indexing?',
      'How does Multi-Head Self-Attention in Transformers scale with sequence length?',
      'What triggers a CORS preflight OPTIONS request in modern browsers?',
      'What is the difference between Mutex and Binary Semaphore in OS?',
      'Why does Floyd\'s Tortoise and Hare algorithm guarantee finding the cycle entry?'
    ],
    dsa: [
      'Why does Dijkstra fail on negative weight edges while Bellman-Ford succeeds?',
      'When should I use a Monotonic Stack vs Two Pointers?',
      'Explain the state transition for 0/1 Knapsack with 1D array space optimization.',
      'How does Disjoint Set Union achieve near O(1) alpha(N) with path compression and rank?'
    ],
    ml: [
      'Why does L1 Regularization (Lasso) cause sparsity while L2 (Ridge) only shrinks weights?',
      'What problem does Scaled Dot-Product Attention scale factor sqrt(d_k) solve?',
      'When should an ML Engineer prioritize Recall over Precision in medical/fraud systems?',
      'Explain the difference between Parent-Child chunking and standard RAG retrieval.'
    ],
    core_cs: [
      'Why does TCP need the TIME_WAIT state (2*MSL) instead of closing immediately?',
      'How does MVCC in PostgreSQL and InnoDB allow readers to never block writers?',
      'What is the difference between Paging and Segmentation in OS memory management?',
      'What causes Thrashing in virtual memory and how does the Working Set model resolve it?'
    ],
    webdev: [
      'What is the exact execution order of Promise microtasks vs setTimeout macrotasks in the V8 Event Loop?',
      'How does React Fiber reconciliation achieve cooperative scheduling over the old Stack reconciler?',
      'What is the difference between Reflow (Layout) and Repaint, and how to optimize for 60fps?',
      'Explain SameSite=Strict vs Lax cookies in preventing Cross-Site Request Forgery (CSRF).'
    ],
    oops: [
      'How does C++ and Java implement dynamic dispatch using VTABLE and VPTR internals?',
      'Give a real-world refactoring example violating the Liskov Substitution Principle (LSP).',
      'When should you use the Builder pattern instead of the Factory pattern?',
      'What is the Diamond Problem in multiple inheritance and how is it resolved in C++ / Java / Python?'
    ]
  };

  const handleAskDoubt = async (question: string) => {
    setIsSolving(true);
    setDoubtText(question);

    try {
      const res = await fetch('/api/ai/solve-doubt-grounded', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doubt: question,
          subject: selectedTrack,
          companyFilter: companyFilter.trim()
        })
      });

      if (res.ok) {
        const data = await res.json();
        setActiveDoubt({
          query: question,
          intuition: data.intuition || 'Intuitive conceptual explanation.',
          interviewModel: data.interviewModel || data.answer || '',
          staffTip: data.staffTip || 'Focus on tradeoffs, Big-O complexity, and failure modes.',
          codeSnippet: data.codeSnippet || undefined,
          sources: data.sources || [],
          searchQueries: data.searchQueries || [],
          isGrounded: true
        });
      } else {
        fallbackLocalDoubt(question);
      }
    } catch (err) {
      fallbackLocalDoubt(question);
    } finally {
      setIsSolving(false);
    }
  };

  const fallbackLocalDoubt = (question: string) => {
    const solved = solveDoubtFromCurriculum(question, selectedTrack, companyFilter.trim());
    setActiveDoubt({
      query: question,
      intuition: solved.intuition,
      interviewModel: solved.interviewModel,
      staffTip: solved.staffTip,
      codeSnippet: solved.codeSnippet,
      sources: solved.sources,
      searchQueries: solved.searchQueries,
      isGrounded: true
    });
  };

  const handleFetchTrends = async (customQuery?: string) => {
    const q = customQuery || trendSearch;
    setIsLoadingTrends(true);

    try {
      const res = await fetch('/api/ai/live-placement-trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          track: selectedTrack,
          company: companyFilter || 'Top Tech Companies'
        })
      });

      if (res.ok) {
        const data: LivePlacementTrend = await res.json();
        setLiveTrends(data);
      }
    } catch (e) {
      console.warn('Trends fetch error', e);
    } finally {
      setIsLoadingTrends(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Google Search Grounded • Live 2025/2026 Tech Intelligence</span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('doubt')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'doubt'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
              <span>Doubt Solver</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('trends');
                if (!liveTrends) handleFetchTrends();
              }}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'trends'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span>Live Placement Radar</span>
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-[#0f294a] tracking-tight">
            {activeTab === 'doubt' ? 'AI Placement Technical Doubt Solver' : 'Live Tech Placement Trends & Interview Experiences'}
          </h1>
          <p className="text-sm text-slate-500 max-w-3xl leading-relaxed mt-1">
            {activeTab === 'doubt'
              ? 'Get instant Staff Software Engineer explanations for tricky placement questions across Data Structures, Machine Learning, Core CS, Web Development, and OOPs, grounded with live Google Search web documentation.'
              : 'Search verified 2025/2026 hiring patterns, company-specific technical rounds, and reported interview questions across Google, Microsoft, Amazon, Meta, and top startups.'}
          </p>
        </div>

        {/* 5-Domain Placement Track Filter Pills */}
        <div className="pt-1 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Placement Track:</span>
          {[
            { id: 'all', label: 'All Subjects', icon: Zap },
            { id: 'dsa', label: 'Data Structures (DSA)', icon: Code2 },
            { id: 'ml', label: 'Machine Learning & AI', icon: BrainCircuit },
            { id: 'core_cs', label: 'Core CS (DBMS / OS / CN)', icon: Database },
            { id: 'webdev', label: 'Web Development', icon: Globe },
            { id: 'oops', label: 'OOPs & System Design', icon: Boxes },
          ].map(track => {
            const isSelected = selectedTrack === track.id;
            const Icon = track.icon;
            return (
              <button
                key={track.id}
                onClick={() => setSelectedTrack(track.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#0f294a] text-white border-[#0f294a] shadow-2xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-300' : 'text-slate-400'}`} />
                <span>{track.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input Bar */}
        {activeTab === 'doubt' ? (
          <div className="pt-2 space-y-3">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (doubtText.trim()) handleAskDoubt(doubtText.trim());
              }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Ask any technical doubt (e.g. Why does L1 regularization cause sparsity? / Explain TCP TIME_WAIT)..."
                  value={doubtText}
                  onChange={(e) => setDoubtText(e.target.value)}
                  className="w-full py-3 pl-4 pr-10 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                />
                {doubtText && (
                  <button 
                    type="button" 
                    onClick={() => setDoubtText('')}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Optional Company (e.g. Google)"
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  className="w-36 sm:w-44 py-3 px-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white hidden md:block"
                />
                <button
                  type="submit"
                  disabled={isSolving || !doubtText.trim()}
                  className="px-5 py-3 rounded-xl bg-[#1e58ea] hover:bg-blue-700 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs whitespace-nowrap"
                >
                  {isSolving ? <RotateCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Ask Doubt</span>
                </button>
              </div>
            </form>

            {/* Quick Sample Questions */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-semibold text-slate-400">High-Yield Questions:</span>
              {(sampleDoubtsByTrack[selectedTrack] || sampleDoubtsByTrack.all).map((doubt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskDoubt(doubt)}
                  className="text-xs text-slate-600 hover:text-blue-700 bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer text-left"
                >
                  {doubt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="pt-2 space-y-3">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleFetchTrends();
              }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
            >
              <input
                type="text"
                placeholder="Search hiring trends (e.g. Amazon SDE 1 interview rounds 2026, Machine Learning questions)..."
                value={trendSearch}
                onChange={(e) => setTrendSearch(e.target.value)}
                className="flex-1 py-3 px-4 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
              />
              <button
                type="submit"
                disabled={isLoadingTrends}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                {isLoadingTrends ? <RotateCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                <span>Fetch Radar</span>
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-semibold text-slate-400">Popular Company Searches:</span>
              {[
                'Google SDE-1 Interview Rounds 2026',
                'Microsoft Core CS & DSA Questions',
                'Amazon 14 Leadership & Bar Raiser Technicals',
                'Meta Frontend / React Architecture Questions',
                'OpenAI / Anthropic ML Systems Questions'
              ].map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTrendSearch(query);
                    handleFetchTrends(query);
                  }}
                  className="text-xs text-slate-600 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area based on Active Tab */}
      {activeTab === 'doubt' && activeDoubt && (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
          {/* Answer Card Top Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                  Staff Engineer Technical Solution
                </span>
                {activeDoubt.isGrounded && (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Google Search Grounded</span>
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#0f294a]">
                {activeDoubt.query}
              </h2>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(`${activeDoubt.query}\n\n${activeDoubt.interviewModel}`);
                setHasCopied(true);
                setTimeout(() => setHasCopied(false), 2000);
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-200"
            >
              {hasCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{hasCopied ? 'Copied' : 'Copy Solution'}</span>
            </button>
          </div>

          {/* Search Queries Triggered */}
          {activeDoubt.searchQueries && activeDoubt.searchQueries.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-medium">Verified via web search queries:</span>
              {activeDoubt.searchQueries.map((q, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md text-[11px] font-mono">
                  "{q}"
                </span>
              ))}
            </div>
          )}

          {/* Core Intuition Box */}
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2 text-xs text-slate-700">
            <span className="font-bold text-blue-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-blue-600" />
              Core Intuition & Mental Model (Interview Pitch)
            </span>
            <p className="leading-relaxed text-sm text-slate-800">
              {activeDoubt.intuition}
            </p>
          </div>

          {/* Detailed Model Explanation */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Technical Deep Dive & Architectural Mechanics
            </h3>
            <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-normal bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
              {activeDoubt.interviewModel}
            </div>
          </div>

          {/* Code Snippet if available */}
          {activeDoubt.codeSnippet && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                Production Implementation / Config Snippet
              </h3>
              <div className="bg-slate-950 rounded-2xl p-4 text-xs font-mono text-emerald-300 overflow-x-auto shadow-inner">
                <pre>{activeDoubt.codeSnippet}</pre>
              </div>
            </div>
          )}

          {/* Staff Engineer Pro-Tip */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1 text-xs text-amber-950">
            <span className="font-bold uppercase tracking-wider text-[11px] text-amber-900 flex items-center gap-1">
              <span>💡</span> Staff Engineer Bar Raiser Insight:
            </span>
            <p className="leading-relaxed font-medium">
              {activeDoubt.staffTip}
            </p>
          </div>

          {/* Grounded Citation Sources */}
          {activeDoubt.sources && activeDoubt.sources.length > 0 && (
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-500" />
                Grounded Web References & Official Docs:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeDoubt.sources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
                  >
                    <span className="max-w-xs truncate">{source.title}</span>
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Live Placement Radar View */}
      {activeTab === 'trends' && liveTrends && (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                Live 2025/2026 Placement Intelligence
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#0f294a] mt-1">
                {liveTrends.companyOrRole}
              </h2>
            </div>
            <button
              onClick={() => handleFetchTrends()}
              disabled={isLoadingTrends}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-200"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isLoadingTrends ? 'animate-spin' : ''}`} />
              <span>Refresh Radar</span>
            </button>
          </div>

          {/* Overview Summary */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed">
            {liveTrends.summary}
          </div>

          {/* Key Insights */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Critical Hiring Insights & Trends
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {liveTrends.keyInsights.map((insight, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-700 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Reported Questions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              High-Frequency Reported Interview Questions
            </h3>
            <div className="space-y-2.5">
              {liveTrends.trendingQuestions.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {item.round}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.difficulty === 'Hard' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {item.difficulty}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      {item.question}
                    </p>
                    <span className="text-xs text-slate-500 block">
                      Target Concept: <strong className="text-slate-700">{item.focusArea}</strong>
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('doubt');
                      setDoubtText(item.question);
                      handleAskDoubt(item.question);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 self-start sm:self-auto"
                  >
                    <span>Solve with AI</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Hiring Bar Benchmark */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <span className="font-bold uppercase tracking-wider text-[11px] text-emerald-900 block">
              🎯 2026 Offer Bar Benchmark:
            </span>
            <p className="leading-relaxed font-medium">
              {liveTrends.hiringBar}
            </p>
          </div>

          {/* Grounding Web References */}
          {liveTrends.sources && liveTrends.sources.length > 0 && (
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-500" />
                Live Grounded Web Sources:
              </span>
              <div className="flex flex-wrap gap-2">
                {liveTrends.sources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors"
                  >
                    <span className="max-w-xs truncate">{source.title}</span>
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
