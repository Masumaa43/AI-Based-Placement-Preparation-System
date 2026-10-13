import React, { useState } from 'react';
import { 
  Code2, 
  ExternalLink, 
  RotateCw, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Flame, 
  Sparkles, 
  Target, 
  ArrowRight, 
  Copy, 
  Check, 
  BookOpen, 
  Layers, 
  Search, 
  Filter, 
  Clock, 
  ChevronRight,
  Database
} from 'lucide-react';
import { LeetCodeProfile } from '../types';
import { LEETCODE_PROBLEMS } from '../data/leetcodeProblems';

interface LeetCodeModuleProps {
  profile: LeetCodeProfile | null;
  isLoading: boolean;
  onSyncUsername: (username: string) => void;
  onNavigateToDSA: () => void;
  initialProblemId?: number;
}

export const LeetCodeModule: React.FC<LeetCodeModuleProps> = ({
  profile,
  isLoading,
  onSyncUsername,
  onNavigateToDSA,
  initialProblemId
}) => {
  const [activeTab, setActiveTab] = useState<'bank' | 'telemetry'>('bank');
  const [inputUsername, setInputUsername] = useState(profile?.username || '');

  // Problem bank states
  const [selectedProblemId, setSelectedProblemId] = useState<number>(initialProblemId || 1);

  React.useEffect(() => {
    if (initialProblemId) {
      setSelectedProblemId(initialProblemId);
      setActiveTab('bank');
    }
  }, [initialProblemId]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCodeLang, setActiveCodeLang] = useState<'javascript' | 'python' | 'cpp' | 'java'>('javascript');
  const [hasCopied, setHasCopied] = useState(false);
  const [solvedProblems, setSolvedProblems] = useState<Record<number, boolean>>({});

  const sampleUsers = ['tech_candidate', 'faang_grinder'];

  const categories = [
    'all',
    'Arrays & Hashing',
    'Two Pointers',
    'Sliding Window',
    'Stack',
    'Binary Search',
    'Linked List',
    'Trees',
    'Graphs',
    '1-D DP'
  ];

  const filteredProblems = LEETCODE_PROBLEMS.filter(p => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchDiff = selectedDifficulty === 'all' || p.difficulty === selectedDifficulty;
    const matchSearch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.companies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchDiff && matchSearch;
  });

  const currentProblem = LEETCODE_PROBLEMS.find(p => p.id === selectedProblemId) || LEETCODE_PROBLEMS[0];

  const handleSubmitSync = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUsername.trim()) {
      onSyncUsername(inputUsername.trim());
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const toggleSolved = (id: number) => {
    setSolvedProblems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Navigation Switcher between Problem Bank & Telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-3xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Code2 className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              LeetCode & DSA Technical Engine
            </h2>
            <p className="text-xs text-slate-500">
              Curated top interview problems with full explanations & multi-language solutions
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('bank')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'bank'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Curated Problem Bank ({LEETCODE_PROBLEMS.length})
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'telemetry'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Account Telemetry & Sync
          </button>
        </div>
      </div>

      {activeTab === 'bank' ? (
        /* ================= LEETCODE PROBLEM BANK VIEW ================= */
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Category pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat === 'all' ? 'All Patterns' : cat}
                  </button>
                ))}
              </div>

              {/* Difficulty selector */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {(['all', 'Easy', 'Medium', 'Hard'] as const).map(diff => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      selectedDifficulty === diff
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {diff === 'all' ? 'All Difficulties' : diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search LeetCode problems by name, pattern, or company (e.g. Two Sum, Google, Sliding Window)..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Master Detail Grid: List on Left (4 cols), Full Question on Right (8 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Problem List */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-2 max-h-[780px] overflow-y-auto scrollbar-thin">
              <div className="px-2 py-1 flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                <span>Problems ({filteredProblems.length})</span>
                <span>Status</span>
              </div>

              {filteredProblems.map(p => {
                const isSelected = p.id === currentProblem.id;
                const isSolved = Boolean(solvedProblems[p.id]);

                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProblemId(p.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-400">#{p.id}</span>
                        <span className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">{p.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.2 rounded-md ${
                          p.difficulty === 'Easy'
                            ? 'bg-emerald-100 text-emerald-800'
                            : p.difficulty === 'Medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {p.difficulty}
                        </span>
                        <span className="text-[11px] text-slate-500">{p.category}</span>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {isSolved ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Full Question Viewer */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-slate-400">LeetCode #{currentProblem.id}</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      currentProblem.difficulty === 'Easy'
                        ? 'bg-emerald-100 text-emerald-800'
                        : currentProblem.difficulty === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {currentProblem.difficulty}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                      {currentProblem.category}
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                    {currentProblem.title}
                  </h1>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSolved(currentProblem.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      solvedProblems[currentProblem.id]
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{solvedProblems[currentProblem.id] ? 'Solved' : 'Mark as Solved'}</span>
                  </button>

                  <a
                    href={`https://leetcode.com/problems/${currentProblem.slug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
                    title="Open on official LeetCode"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href={`https://www.geeksforgeeks.org/search/?q=${encodeURIComponent(currentProblem.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200 flex items-center gap-1"
                    title="Practice problem on GeeksforGeeks"
                  >
                    <span className="font-black text-[10px] px-1 py-0.2 bg-emerald-800 text-white rounded">GFG</span>
                    <span>Practice</span>
                    <ExternalLink className="w-3 h-3 text-emerald-700" />
                  </a>
                </div>
              </div>

              {/* Company Tags */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Asked by:</span>
                {currentProblem.companies.map(c => (
                  <span key={c} className="px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-700">
                    {c}
                  </span>
                ))}
              </div>

              {/* Problem Description */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Problem Statement</h3>
                <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-line font-sans">
                  {currentProblem.description}
                </div>
              </div>

              {/* Examples */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Examples</h3>
                <div className="space-y-2.5">
                  {currentProblem.examples.map((ex, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1 font-mono">
                      <div><strong className="text-slate-700 font-sans">Input:</strong> {ex.input}</div>
                      <div><strong className="text-slate-700 font-sans">Output:</strong> {ex.output}</div>
                      {ex.explanation && (
                        <div className="text-slate-500 font-sans mt-1 text-[11px]">
                          <strong>Explanation:</strong> {ex.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Constraints */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Constraints</h3>
                <ul className="list-disc list-inside text-xs text-slate-600 font-mono space-y-1">
                  {currentProblem.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* Approach & Complexity */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>Optimal Algorithm & Approach</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-sans">
                  {currentProblem.approach}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-emerald-900 font-bold border-t border-emerald-200/80">
                  <span>⏱️ Time: {currentProblem.timeComplexity}</span>
                  <span>💾 Space: {currentProblem.spaceComplexity}</span>
                </div>
              </div>

              {/* Solution Code Section with Multi-Language Tabs */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Optimal Solution Code
                  </h3>

                  <div className="flex items-center gap-2">
                    {/* Language selector tabs */}
                    <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs">
                      {(['javascript', 'python', 'cpp', 'java'] as const).map(lang => (
                        <button
                          key={lang}
                          onClick={() => setActiveCodeLang(lang)}
                          className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                            activeCodeLang === lang
                              ? 'bg-white text-emerald-800 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {lang === 'javascript' ? 'TypeScript' : lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    {/* Copy button */}
                    <button
                      onClick={() => handleCopyCode(currentProblem.solutionCode[activeCodeLang])}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {hasCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{hasCopied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Code Block */}
                <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md">
                  <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                    <code>{currentProblem.solutionCode[activeCodeLang]}</code>
                  </pre>
                </div>
              </div>

              {/* Reference Links (GeeksforGeeks & W3Schools) */}
              {currentProblem.gfgReference && (
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                  <span>In-depth GeeksforGeeks tutorial & edge case breakdown:</span>
                  <a
                    href={currentProblem.gfgReference}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Read on GeeksforGeeks</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ================= ACCOUNT TELEMETRY & SYNC VIEW ================= */
        <div className="space-y-6">
          {/* Top Sync Bar Card */}
          <div className="bg-gradient-to-r from-emerald-50/70 via-white to-slate-50 border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
                <Code2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>LeetCode Account Telemetry & Topic Diagnosis</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Link Your LeetCode Account
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sync solved problems, Easy/Medium/Hard breakdown, topic mastery, and automatically identify weak algorithmic patterns to feed the AI Interview Coach.
              </p>

              {/* Sync Form */}
              <form onSubmit={handleSubmitSync} className="mt-6 flex flex-col sm:flex-row gap-2.5 max-w-xl">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputUsername}
                    onChange={(e) => setInputUsername(e.target.value)}
                    placeholder="Enter LeetCode username (e.g. touristh or student)"
                    className="w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-colors shadow-2xs"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !inputUsername.trim()}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs shadow-emerald-600/20"
                >
                  <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>{isLoading ? 'Syncing...' : 'Sync LeetCode'}</span>
                </button>
              </form>

              {/* Sample quick buttons */}
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                <span>Or try sample candidate profiles:</span>
                {sampleUsers.map((u) => (
                  <button
                    key={u}
                    onClick={() => {
                      setInputUsername(u);
                      onSyncUsername(u);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-mono border border-slate-200 transition-colors cursor-pointer shadow-2xs"
                  >
                    @{u}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {profile && (
            <div className="space-y-6">
              {/* Main Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Solved */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">
                    <span>Total Solved</span>
                    <Code2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900">
                    {profile.totalSolved}
                    <span className="text-xs font-normal text-slate-400 ml-1">/ {profile.totalQuestions}</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    Acceptance Rate: <span className="text-slate-800 font-semibold">{profile.acceptanceRate}%</span>
                  </div>
                </div>

                {/* Easy Solved */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-emerald-700 uppercase font-bold tracking-wider mb-2">
                    <span>Easy Solved</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-extrabold text-emerald-700">
                    {profile.easySolved}
                    <span className="text-xs font-normal text-slate-400 ml-1">/ {profile.totalEasy}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full" 
                      style={{ width: `${Math.round((profile.easySolved / profile.totalEasy) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Medium Solved */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-teal-700 uppercase font-bold tracking-wider mb-2">
                    <span>Medium Solved</span>
                    <TrendingUp className="w-4 h-4 text-teal-600" />
                  </div>
                  <div className="text-3xl font-extrabold text-teal-700">
                    {profile.mediumSolved}
                    <span className="text-xs font-normal text-slate-400 ml-1">/ {profile.totalMedium}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div 
                      className="bg-teal-500 h-full rounded-full" 
                      style={{ width: `${Math.round((profile.mediumSolved / profile.totalMedium) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Hard Solved */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-600 uppercase font-bold tracking-wider mb-2">
                    <span>Hard Solved</span>
                    <Flame className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="text-3xl font-extrabold text-slate-700">
                    {profile.hardSolved}
                    <span className="text-xs font-normal text-slate-400 ml-1">/ {profile.totalHard}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div 
                      className="bg-slate-600 h-full rounded-full" 
                      style={{ width: `${Math.round((profile.hardSolved / profile.totalHard) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Topics Covered & Weak Topics Diagnosis */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Topic Mastery Matrix */}
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      <Target className="w-4 h-4 text-emerald-600" />
                      <span>Topic Coverage & Solve Rate</span>
                    </h3>
                    <span className="text-xs text-slate-500">
                      Profile: <span className="font-mono text-emerald-700 font-semibold">@{profile.username}</span>
                    </span>
                  </div>

                  <div className="space-y-4">
                    {profile.topTopics.map((top, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                            {top.isWeak && (
                              <span className="w-2 h-2 rounded-full bg-rose-500" title="Flagged as weak area" />
                            )}
                            {top.topic}
                          </span>
                          <span className="font-mono text-slate-500">
                            {top.solved} solved ({top.percentage}%)
                            {top.isWeak && <span className="text-rose-600 font-bold ml-1.5">[Weak Topic]</span>}
                          </span>
                        </div>

                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              top.isWeak ? 'bg-rose-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(100, top.percentage)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Weak Topics Callout */}
                  {profile.weakTopics.length > 0 && (
                    <div className="mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                        <div className="text-xs">
                          <span className="font-bold text-rose-800">Urgent AI Flag: </span>
                          <span className="text-slate-700">
                            {profile.weakTopics.join(', ')} show lower problem counts.
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={onNavigateToDSA}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-800 hover:text-rose-950 px-3 py-1.5 rounded-xl bg-white border border-rose-300 transition-colors cursor-pointer flex-shrink-0 shadow-2xs"
                      >
                        <span>Practice DSA Logic</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Recent Submissions Feed */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center justify-between">
                      <span>Recent Submissions</span>
                      <span className="text-xs text-slate-400 font-normal">Live Activity</span>
                    </h3>

                    <div className="space-y-3">
                      {profile.recentSubmissions.map((sub, sidx) => (
                        <div 
                          key={sidx}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 text-xs flex flex-col gap-1"
                        >
                          <div className="font-semibold text-slate-800 line-clamp-1">
                            {sub.title}
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span className={`font-semibold ${
                              sub.status === 'Accepted' ? 'text-emerald-700' : 'text-rose-600'
                            }`}>
                              {sub.status}
                            </span>
                            <span>{sub.timeAgo}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 text-center">
                    <a
                      href={`https://leetcode.com/u/${profile.username}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      <span>Open Official LeetCode Profile</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
