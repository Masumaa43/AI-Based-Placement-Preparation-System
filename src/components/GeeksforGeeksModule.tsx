import React, { useState, useMemo } from 'react';
import { 
  Code2, 
  ExternalLink, 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle, 
  Flame, 
  Sparkles, 
  BookOpen, 
  Layers, 
  Copy, 
  Check, 
  Building2, 
  Clock, 
  Award, 
  ArrowRight, 
  ChevronRight,
  Database,
  Cpu,
  Network,
  Boxes,
  HelpCircle,
  Zap,
  TrendingUp,
  Tag
} from 'lucide-react';
import { GFGProblem, GFGArticle, SubjectId } from '../types';
import { GFG_PROBLEMS, GFG_ARTICLES, GFG_POTD } from '../data/gfgData';
import { loadGFGSolvedProblems, saveGFGSolvedProblems } from '../utils/storage';

interface GeeksforGeeksModuleProps {
  onQuestionAnswered?: (questionId: string, isCorrect: boolean, topicId: string, subjectId: SubjectId) => void;
  onNavigateToTab?: (tab: string, subjectId?: SubjectId, topicId?: string) => void;
}

export const GeeksforGeeksModule: React.FC<GeeksforGeeksModuleProps> = ({
  onQuestionAnswered,
  onNavigateToTab
}) => {
  const [activeTab, setActiveTab] = useState<'practice' | 'articles' | 'potd'>('practice');
  
  // Practice Filter States
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProblemId, setSelectedProblemId] = useState<string>(GFG_PROBLEMS[0]?.id || 'gfg-kadane');
  const [activeCodeLang, setActiveCodeLang] = useState<'cpp' | 'java' | 'python'>('cpp');
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const [solvedMap, setSolvedMap] = useState<Record<string, boolean>>(() => loadGFGSolvedProblems());

  // Article Filter States
  const [selectedArticleSubject, setSelectedArticleSubject] = useState<string>('all');
  const [articleSearchQuery, setArticleSearchQuery] = useState<string>('');

  // Companies List
  const companies = [
    'all',
    'Amazon',
    'Microsoft',
    'Flipkart',
    'Samsung',
    'Google',
    'Adobe',
    'Paytm',
    'TCS'
  ];

  // Categories List
  const categories = [
    'all',
    'Arrays & Dynamic Programming',
    'Arrays & Two Pointers',
    'Arrays & Math',
    'Arrays',
    'Stack',
    'Linked List',
    'Tree & BST',
    'Graph',
    'Dynamic Programming'
  ];

  // Filtered Problems
  const filteredProblems = useMemo(() => {
    return GFG_PROBLEMS.filter(p => {
      const matchCompany = selectedCompany === 'all' || p.companies.includes(selectedCompany);
      const matchCategory = selectedCategory === 'all' || p.category.includes(selectedCategory);
      const matchDifficulty = selectedDifficulty === 'all' || p.difficulty === selectedDifficulty;
      const matchSearch = !searchQuery || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.companies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCompany && matchCategory && matchDifficulty && matchSearch;
    });
  }, [selectedCompany, selectedCategory, selectedDifficulty, searchQuery]);

  const currentProblem = useMemo(() => {
    return GFG_PROBLEMS.find(p => p.id === selectedProblemId) || filteredProblems[0] || GFG_PROBLEMS[0];
  }, [selectedProblemId, filteredProblems]);

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    return GFG_ARTICLES.filter(art => {
      const matchSubject = selectedArticleSubject === 'all' || art.subjectId === selectedArticleSubject;
      const matchSearch = !articleSearchQuery ||
        art.title.toLowerCase().includes(articleSearchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(articleSearchQuery.toLowerCase()) ||
        art.keyTakeaways.some(k => k.toLowerCase().includes(articleSearchQuery.toLowerCase())) ||
        art.companiesAsked.some(c => c.toLowerCase().includes(articleSearchQuery.toLowerCase()));
      return matchSubject && matchSearch;
    });
  }, [selectedArticleSubject, articleSearchQuery]);

  const totalSolvedCount = Object.values(solvedMap).filter(Boolean).length;

  const handleToggleSolved = (problemId: string) => {
    const nextState = !solvedMap[problemId];
    const updated = { ...solvedMap, [problemId]: nextState };
    setSolvedMap(updated);
    saveGFGSolvedProblems(updated);

    if (nextState && onQuestionAnswered) {
      // Award progress in Study Garden and Readiness Index
      onQuestionAnswered(`gfg-${problemId}`, true, 'dsa-arrays', 'dsa');
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy':
      case 'Basic':
      case 'School':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Hard':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getSubjectIcon = (subId: string) => {
    switch (subId) {
      case 'dbms': return Database;
      case 'os': return Cpu;
      case 'cn': return Network;
      case 'oops': return Boxes;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 shadow-md border border-emerald-700/50">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                GeeksforGeeks Placement Integration
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-teal-300 border border-teal-500/30 font-semibold">
                Must-Do SDE Sheet
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-600/40 font-semibold">
                POTD Tracker
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              GeeksforGeeks Practice & Placement Knowledge Hub
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Curated coding problems from the famous <strong>GeeksforGeeks Must-Do SDE Sheet</strong>, high-yield company assessment archives (Amazon, Microsoft, Samsung, TCS), and authoritative Core CS tutorials.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>{GFG_PROBLEMS.length}+ Must-Do SDE Problems</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <BookOpen className="w-4 h-4 text-teal-400" />
                <span>{GFG_ARTICLES.length} Core CS Deep-Dives</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{totalSolvedCount} Solved on GFG</span>
              </div>
            </div>
          </div>

          {/* POTD Quick Badge */}
          <div 
            onClick={() => setActiveTab('potd')}
            className="cursor-pointer group bg-gradient-to-br from-emerald-800/80 to-slate-850 p-5 rounded-2xl border border-emerald-500/40 shadow-sm flex flex-col justify-between max-w-sm hover:border-emerald-400 transition-all flex-shrink-0"
          >
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">GFG Problem of the Day</span>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950">
                +4 Points
              </span>
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors">
              {GFG_POTD.title}
            </h3>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              Solve today's featured problem to water your Study Garden and earn streak XP!
            </p>
            <div className="mt-3 pt-2.5 border-t border-slate-700/80 flex items-center justify-between text-xs text-emerald-300 font-bold">
              <span>24,900+ coders solved today</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Solve POTD <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sub-Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'practice'
                ? 'bg-slate-900 text-teal-300 shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4 text-emerald-500" />
            <span>GFG Must-Do SDE Sheet & Practice</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 text-[10px]">
              {GFG_PROBLEMS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'articles'
                ? 'bg-slate-900 text-teal-300 shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-teal-500" />
            <span>Core CS Placement Articles</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-md bg-teal-100 text-teal-800 text-[10px]">
              {GFG_ARTICLES.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('potd')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'potd'
                ? 'bg-slate-900 text-teal-300 shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Problem of the Day</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-900 text-[10px]">
              Daily
            </span>
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Source: <strong className="text-slate-700">GeeksforGeeks Practice & Tutorial Portal</strong>
        </div>
      </div>

      {/* ================= TAB 1: PRACTICE & SDE SHEET ================= */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
            {/* Search and Dropdowns */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search problem name, company (Amazon, Samsung), or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Category Dropdown */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  {categories.filter(c => c !== 'all').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                {/* Difficulty Dropdown */}
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="all">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Company Tag Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
                <Building2 className="w-3.5 h-3.5" /> Company:
              </span>
              {companies.map(comp => (
                <button
                  key={comp}
                  onClick={() => setSelectedCompany(comp)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCompany === comp
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {comp === 'all' ? 'All Companies' : comp}
                </button>
              ))}
            </div>
          </div>

          {/* Problem Explorer Layout: Left List + Right Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Problem List (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-2.5 max-h-[750px] overflow-y-auto">
              <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100 text-xs font-bold text-slate-500">
                <span>Must-Do Problems ({filteredProblems.length})</span>
                <span>Accuracy</span>
              </div>

              {filteredProblems.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No problems match your current search filters.
                </div>
              ) : (
                filteredProblems.map((p) => {
                  const isSelected = p.id === currentProblem?.id;
                  const isSolved = Boolean(solvedMap[p.id]);

                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProblemId(p.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500/30'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleSolved(p.id);
                          }}
                          className="mt-0.5 text-slate-400 hover:text-emerald-600 cursor-pointer flex-shrink-0"
                          title={isSolved ? 'Mark as unsolved' : 'Mark as solved on GFG'}
                        >
                          {isSolved ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                          ) : (
                            <Circle className="w-5 h-5 hover:stroke-emerald-500" />
                          )}
                        </button>

                        <div className="min-w-0">
                          <h4 className={`text-xs font-bold leading-snug truncate ${
                            isSolved ? 'line-through text-slate-400' : 'text-slate-900'
                          }`}>
                            {p.title}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
                            <span className={`px-1.5 py-0.2 rounded border font-semibold ${getDifficultyBadge(p.difficulty)}`}>
                              {p.difficulty}
                            </span>
                            <span>•</span>
                            <span className="truncate">{p.category.split(' & ')[0]}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-[11px] font-mono text-slate-600 block">{p.accuracy}</span>
                        <span className="text-[10px] text-emerald-700 font-bold">+{p.points} pts</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Problem Detail (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
              {currentProblem && (
                <>
                  {/* Problem Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${getDifficultyBadge(currentProblem.difficulty)}`}>
                          {currentProblem.difficulty}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                          {currentProblem.category}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                          GFG Points: {currentProblem.points}
                        </span>
                      </div>

                      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                        {currentProblem.title}
                      </h2>

                      {/* Company Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className="text-[11px] font-semibold text-slate-400 mr-1">Asked in:</span>
                        {currentProblem.companies.map(c => (
                          <span key={c} className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleToggleSolved(currentProblem.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          solvedMap[currentProblem.id]
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {solvedMap[currentProblem.id] ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Solved on GFG</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Mark as Solved</span>
                          </>
                        )}
                      </button>

                      <a
                        href={currentProblem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <span>Open on GFG Practice</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Problem Description */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Problem Statement
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                      {currentProblem.description}
                    </p>
                  </div>

                  {/* Example Input / Output */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                      Example Test Case
                    </span>
                    <div className="font-mono text-slate-800 space-y-1">
                      <div><strong className="text-slate-500">Input: </strong> {currentProblem.example.input}</div>
                      <div><strong className="text-emerald-700">Output: </strong> {currentProblem.example.output}</div>
                      {currentProblem.example.explanation && (
                        <div className="text-slate-600 text-[11px] pt-1 border-t border-slate-200/80">
                          <strong className="text-slate-500">Explanation: </strong> {currentProblem.example.explanation}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Complexities */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">Expected Time Complexity</span>
                      <span className="font-mono font-bold text-slate-800 text-sm mt-0.5 block">{currentProblem.expectedTime}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">Expected Auxiliary Space</span>
                      <span className="font-mono font-bold text-slate-800 text-sm mt-0.5 block">{currentProblem.expectedSpace}</span>
                    </div>
                  </div>

                  {/* Solution Code Tabs */}
                  {currentProblem.solutionCode && (
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200">
                          {(['cpp', 'java', 'python'] as const).map(lang => (
                            <button
                              key={lang}
                              onClick={() => setActiveCodeLang(lang)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                activeCodeLang === lang
                                  ? 'bg-white text-slate-900 shadow-2xs'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              {lang === 'cpp' ? 'C++' : lang === 'java' ? 'Java' : 'Python 3'}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => handleCopyCode(currentProblem.solutionCode![activeCodeLang])}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          {hasCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{hasCopied ? 'Copied' : 'Copy Solution'}</span>
                        </button>
                      </div>

                      <div className="bg-slate-950 rounded-2xl p-4 overflow-x-auto text-xs font-mono text-emerald-300">
                        <pre>{currentProblem.solutionCode[activeCodeLang]}</pre>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: CORE CS PLACEMENT ARTICLES ================= */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          {/* Article Filters */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search Core CS topics (ACID, CPU scheduling, TCP handshake, SOLID)..."
                  value={articleSearchQuery}
                  onChange={(e) => setArticleSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 overflow-x-auto">
                {[
                  { id: 'all', label: 'All Subjects' },
                  { id: 'dbms', label: 'DBMS' },
                  { id: 'os', label: 'Operating Systems' },
                  { id: 'cn', label: 'Computer Networks' },
                  { id: 'oops', label: 'OOPs' }
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedArticleSubject(s.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedArticleSubject === s.id
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredArticles.map(article => {
              const SubIcon = getSubjectIcon(article.subjectId);

              return (
                <div
                  key={article.id}
                  className="bg-white border border-slate-200 hover:border-emerald-400 rounded-3xl p-6 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                          <SubIcon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          {article.subjectTitle}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {article.summary}
                    </p>

                    {/* Key Takeaways */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                      <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block">
                        Interview Cheat-Sheet Takeaways:
                      </span>
                      <ul className="space-y-1 text-slate-600">
                        {article.keyTakeaways.slice(0, 3).map((k, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{k}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Asked in Companies */}
                    <div className="flex flex-wrap items-center gap-1 text-[11px]">
                      <span className="text-slate-400 font-medium">Frequently asked at:</span>
                      {article.companiesAsked.map(c => (
                        <span key={c} className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Direct Link to GFG */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 border border-emerald-200"
                  >
                    <span>Read Full Tutorial on GeeksforGeeks</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 3: PROBLEM OF THE DAY (POTD) ================= */}
      {activeTab === 'potd' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-emerald-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-700 border border-amber-300 flex items-center justify-center">
                  <Flame className="w-7 h-7 animate-pulse text-amber-600" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                    GeeksforGeeks Daily Challenge
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {GFG_POTD.title}
                  </h2>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 block font-medium">Daily Streak Reward</span>
                <span className="text-sm font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-xl inline-block mt-0.5">
                  {GFG_POTD.streakReward}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs text-slate-700">
              <h4 className="font-bold text-slate-900 text-sm">Why This Problem is High-Yield Today:</h4>
              <p className="leading-relaxed">
                Kadane's algorithm is the benchmark linear-time dynamic programming pattern for continuous subarrays. Asked over 1,200 times at Amazon, Microsoft, and Samsung. Practicing it maintains your algorithmic reflexes.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleSolved(GFG_POTD.problemId)}
                  className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    solvedMap[GFG_POTD.problemId]
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                  }`}
                >
                  {solvedMap[GFG_POTD.problemId] ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>POTD Solved Today!</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Mark POTD Solved</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href="https://www.geeksforgeeks.org/problem-of-the-day"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 shadow-xs"
              >
                <span>Solve on GeeksforGeeks POTD Live</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
