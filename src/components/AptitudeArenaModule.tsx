import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calculator, 
  Brain, 
  Shuffle, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCw, 
  BookOpen, 
  Award, 
  ArrowRight, 
  ArrowLeft, 
  Filter, 
  Layers, 
  Search,
  Flag,
  Trophy,
  Check,
  ChevronRight,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { BOOK_APTITUDE_QUESTIONS, BookAptitudeQuestion } from '../data/aptitudeQuestions';
import { SubjectId } from '../types';

interface AptitudeArenaModuleProps {
  onQuestionAnswered?: (questionId: string, isCorrect: boolean, topicId: string, subjectId: SubjectId) => void;
  onNavigateToTab?: (tab: string, subjectId?: SubjectId) => void;
}

export const AptitudeArenaModule: React.FC<AptitudeArenaModuleProps> = ({
  onQuestionAnswered,
  onNavigateToTab
}) => {
  // Mode: 'practice' (instant solution) | 'exam' (timed mock test)
  const [activeMode, setActiveMode] = useState<'practice' | 'exam'>('practice');
  
  // Section filter: 'all' | 'A' | 'B'
  const [selectedSection, setSelectedSection] = useState<'all' | 'A' | 'B'>('all');
  
  // Difficulty filter: 'all' | 'Easy' | 'Medium' | 'Hard'
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all');
  
  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Active question set (can be randomly generated or shuffled)
  const [activeQuestions, setActiveQuestions] = useState<BookAptitudeQuestion[]>(BOOK_APTITUDE_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);

  // User selections in practice mode
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  // Exam mode state
  const [examAnswers, setExamAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [examTimeRemaining, setExamTimeRemaining] = useState<number>(30 * 60); // 30 minutes
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [isExamTimerRunning, setIsExamTimerRunning] = useState(false);

  // Statistics
  const [answeredHistory, setAnsweredHistory] = useState<Record<string, boolean>>({});

  // Filtered list based on section, difficulty, search
  const filteredQuestions = useMemo(() => {
    return activeQuestions.filter(q => {
      const matchSection = selectedSection === 'all' || q.section === selectedSection;
      const matchDiff = difficultyFilter === 'all' || q.difficulty === difficultyFilter;
      const matchSearch = !searchQuery || 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.topicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.companyTags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchSection && matchDiff && matchSearch;
    });
  }, [activeQuestions, selectedSection, difficultyFilter, searchQuery]);

  // Current active question
  const currentQuestion = filteredQuestions[currentIndex] || filteredQuestions[0] || BOOK_APTITUDE_QUESTIONS[0];

  // Exam timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeMode === 'exam' && isExamTimerRunning && !isExamSubmitted && examTimeRemaining > 0) {
      interval = setInterval(() => {
        setExamTimeRemaining(prev => {
          if (prev <= 1) {
            setIsExamSubmitted(true);
            setIsExamTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeMode, isExamTimerRunning, isExamSubmitted, examTimeRemaining]);

  // Random Test Generators
  const handleGenerateRandomTest = (count: number, sectionFilter: 'all' | 'A' | 'B' = 'all') => {
    let pool = [...BOOK_APTITUDE_QUESTIONS];
    if (sectionFilter === 'A') {
      pool = pool.filter(q => q.section === 'A');
    } else if (sectionFilter === 'B') {
      pool = pool.filter(q => q.section === 'B');
    }

    if (sectionFilter === 'all') {
      // Balanced pick: half from Section A, half from Section B
      const poolA = pool.filter(q => q.section === 'A').sort(() => 0.5 - Math.random());
      const poolB = pool.filter(q => q.section === 'B').sort(() => 0.5 - Math.random());
      const half = Math.floor(count / 2);
      const selected = [...poolA.slice(0, half), ...poolB.slice(0, count - half)].sort(() => 0.5 - Math.random());
      setActiveQuestions(selected);
    } else {
      const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, count);
      setActiveQuestions(shuffled);
    }

    setSelectedSection('all');
    setDifficultyFilter('all');
    setSearchQuery('');
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);

    // If starting exam mode
    if (activeMode === 'exam') {
      setExamAnswers({});
      setFlaggedQuestions({});
      setExamTimeRemaining(Math.min(count * 90, 60 * 60)); // 1.5 min per question
      setIsExamSubmitted(false);
      setIsExamTimerRunning(true);
    }
  };

  // Shuffle all current questions
  const handleShuffleQuestions = () => {
    const shuffled = [...activeQuestions].sort(() => 0.5 - Math.random());
    setActiveQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
  };

  // Reset to all 54 questions
  const handleResetToAll = () => {
    setActiveQuestions(BOOK_APTITUDE_QUESTIONS);
    setSelectedSection('all');
    setDifficultyFilter('all');
    setSearchQuery('');
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
  };

  // Handle option select in practice mode
  const handleSelectOptionPractice = (optionIdx: number) => {
    if (isAnswerRevealed) return;
    setSelectedOption(optionIdx);
  };

  // Check answer in practice mode
  const handleCheckAnswerPractice = () => {
    if (selectedOption === null || !currentQuestion) return;
    setIsAnswerRevealed(true);
    const isCorrect = selectedOption === currentQuestion.correctIndex;
    setAnsweredHistory(prev => ({ ...prev, [currentQuestion.id]: isCorrect }));
    onQuestionAnswered?.(currentQuestion.id, isCorrect, currentQuestion.topicId, currentQuestion.subjectId);
  };

  // Exam mode selection
  const handleExamOptionSelect = (qId: string, optIdx: number) => {
    if (isExamSubmitted) return;
    setExamAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleToggleFlag = (qId: string) => {
    setFlaggedQuestions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSubmitExam = () => {
    setIsExamSubmitted(true);
    setIsExamTimerRunning(false);

    // Record answers to global progress
    activeQuestions.forEach(q => {
      const userChoice = examAnswers[q.id];
      if (userChoice !== undefined) {
        const isCorrect = userChoice === q.correctIndex;
        onQuestionAnswered?.(q.id, isCorrect, q.topicId, q.subjectId);
      }
    });
  };

  // Calculate exam score
  const examResults = useMemo(() => {
    let totalScore = 0;
    let secAScore = 0;
    let secBScore = 0;
    let secATotal = 0;
    let secBTotal = 0;

    activeQuestions.forEach(q => {
      if (q.section === 'A') secATotal++;
      if (q.section === 'B') secBTotal++;

      const ans = examAnswers[q.id];
      if (ans !== undefined && ans === q.correctIndex) {
        totalScore++;
        if (q.section === 'A') secAScore++;
        if (q.section === 'B') secBScore++;
      }
    });

    const totalQuestions = activeQuestions.length;
    const percentage = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;
    const secAPercent = secATotal > 0 ? Math.round((secAScore / secATotal) * 100) : 0;
    const secBPercent = secBTotal > 0 ? Math.round((secBScore / secBTotal) * 100) : 0;

    return {
      totalScore,
      totalQuestions,
      percentage,
      secAScore,
      secATotal,
      secAPercent,
      secBScore,
      secBTotal,
      secBPercent
    };
  }, [activeQuestions, examAnswers]);

  // Format timer seconds
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const secACount = BOOK_APTITUDE_QUESTIONS.filter(q => q.section === 'A').length;
  const secBCount = BOOK_APTITUDE_QUESTIONS.filter(q => q.section === 'B').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header with Textbook Citations & Overview */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-50/90 via-white to-slate-50 border border-emerald-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                Textbook-Accredited Question Bank
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-semibold">
                54 Verified Problems
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-semibold">
                Zero AI Hallucinations
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Aptitude & Logical Reasoning Examination Engine
            </h1>
            
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Curated directly from authoritative handbooks: <strong>R.S. Aggarwal&apos;s</strong> <em>&ldquo;Quantitative Aptitude for Competitive Examinations&rdquo;</em>, <strong>R.S. Aggarwal&apos;s</strong> <em>&ldquo;A Modern Approach to Verbal & Non-Verbal Reasoning&rdquo;</em> (S. Chand), and <strong>Arun Sharma&apos;s</strong> <em>&ldquo;How to Prepare for CAT&rdquo;</em> (McGraw Hill). Every question includes verified numerical calculations, textbook shortcut formulas, and step-by-step proofs.
            </p>

            {/* Section Badges */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-900 font-medium">
                <Calculator className="w-4 h-4 text-amber-600" />
                <span><strong>Section A:</strong> Maths & Quantitative ({secACount} Questions)</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-50/90 border border-teal-200 text-xs text-teal-900 font-medium">
                <Brain className="w-4 h-4 text-teal-600" />
                <span><strong>Section B:</strong> Deductive & Analytical Logic ({secBCount} Questions)</span>
              </div>
            </div>
          </div>

          {/* Quick Assessment Launcher */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex-shrink-0 shadow-xs flex flex-col gap-2.5 min-w-[260px]">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              ⚡ Random Assessment Generator
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleGenerateRandomTest(10)}
                className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold cursor-pointer transition-colors text-center"
              >
                Random 10 Qs
              </button>
              <button
                onClick={() => handleGenerateRandomTest(25)}
                className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold cursor-pointer transition-colors text-center"
              >
                Random 25 Qs
              </button>
            </div>
            <button
              onClick={() => handleGenerateRandomTest(50)}
              className="w-full px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Full 50-Question Grand Mock</span>
            </button>
            <button
              onClick={handleShuffleQuestions}
              className="w-full px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1.5"
            >
              <Shuffle className="w-3 h-3 text-slate-500" />
              <span>Shuffle Current Pool</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Controls & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Section Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80 overflow-x-auto scrollbar-none">
            <button
              onClick={() => { setSelectedSection('all'); setCurrentIndex(0); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedSection === 'all'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Sections ({activeQuestions.length})
            </button>
            <button
              onClick={() => { setSelectedSection('A'); setCurrentIndex(0); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                selectedSection === 'A'
                  ? 'bg-amber-100 text-amber-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-amber-600" />
              <span>Section A: Maths ({activeQuestions.filter(q => q.section === 'A').length})</span>
            </button>
            <button
              onClick={() => { setSelectedSection('B'); setCurrentIndex(0); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                selectedSection === 'B'
                  ? 'bg-teal-100 text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-teal-600" />
              <span>Section B: Logic ({activeQuestions.filter(q => q.section === 'B').length})</span>
            </button>
          </div>

          {/* Mode Switcher: Practice vs Timed Exam */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Mode:</span>
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => {
                  setActiveMode('practice');
                  setIsExamTimerRunning(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                  activeMode === 'practice'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Practice (Instant Solution)
              </button>
              <button
                onClick={() => {
                  setActiveMode('exam');
                  setIsExamTimerRunning(true);
                  setIsExamSubmitted(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1 ${
                  activeMode === 'exam'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Timed Exam Mode</span>
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Filters: Search & Difficulty */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by topic, chapter, company (e.g. TCS, Time & Work, Syllogism)..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentIndex(0); }}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400">Difficulty:</span>
            {(['all', 'Easy', 'Medium', 'Hard'] as const).map(diff => (
              <button
                key={diff}
                onClick={() => { setDifficultyFilter(diff); setCurrentIndex(0); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  difficultyFilter === diff
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {diff === 'all' ? 'All' : diff}
              </button>
            ))}

            <button
              onClick={handleResetToAll}
              title="Reset all filters and view all 54 questions"
              className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold px-2 py-1 cursor-pointer ml-1"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Workspace: Practice Mode OR Exam Mode */}
      {activeMode === 'practice' ? (
        /* ================= PRACTICE MODE ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Question Card (Left 8 Cols) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                  currentQuestion.section === 'A'
                    ? 'bg-amber-100 text-amber-900 border border-amber-200'
                    : 'bg-teal-100 text-teal-900 border border-teal-200'
                }`}>
                  {currentQuestion.sectionName.split(':')[0]}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Question {currentIndex + 1} of {filteredQuestions.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                  currentQuestion.difficulty === 'Easy'
                    ? 'bg-emerald-100 text-emerald-800'
                    : currentQuestion.difficulty === 'Medium'
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {currentQuestion.difficulty}
                </span>
                {answeredHistory[currentQuestion.id] !== undefined && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                    answeredHistory[currentQuestion.id]
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {answeredHistory[currentQuestion.id] ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    <span>{answeredHistory[currentQuestion.id] ? 'Solved' : 'Review'}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Book Reference Tag */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 bg-slate-50 rounded-xl p-2.5 border border-slate-200/80">
              <span className="font-semibold text-slate-700">Source:</span>
              <span className="font-mono text-emerald-800 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                {currentQuestion.bookSource}
              </span>
              <span>•</span>
              <span className="text-slate-600 font-medium">{currentQuestion.chapter}</span>
            </div>

            {/* Question Text */}
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correctIndex;
                let optionStyle = 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50/70 text-slate-700';

                if (isAnswerRevealed) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold ring-2 ring-rose-500/20';
                  } else {
                    optionStyle = 'border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-emerald-500 bg-emerald-50/50 text-emerald-900 font-semibold ring-2 ring-emerald-500/20';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOptionPractice(idx)}
                    disabled={isAnswerRevealed}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 flex items-start gap-3.5 cursor-pointer ${optionStyle}`}
                  >
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                      isAnswerRevealed && isCorrect
                        ? 'bg-emerald-600 text-white'
                        : isAnswerRevealed && isSelected && !isCorrect
                        ? 'bg-rose-600 text-white'
                        : isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm pt-0.5 leading-snug">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons: Check Answer / Next */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  if (currentIndex > 0) {
                    setCurrentIndex(prev => prev - 1);
                    setSelectedOption(null);
                    setIsAnswerRevealed(false);
                  }
                }}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {!isAnswerRevealed ? (
                  <button
                    onClick={handleCheckAnswerPractice}
                    disabled={selectedOption === null}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
                  >
                    Verify Answer
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (currentIndex < filteredQuestions.length - 1) {
                        setCurrentIndex(prev => prev + 1);
                        setSelectedOption(null);
                        setIsAnswerRevealed(false);
                      } else {
                        setCurrentIndex(0);
                        setSelectedOption(null);
                        setIsAnswerRevealed(false);
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <span>{currentIndex < filteredQuestions.length - 1 ? 'Next Question' : 'Start from Beginning'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Explanation & Shortcut Trick Card */}
            {isAnswerRevealed && (
              <div className="pt-6 border-t border-slate-100 space-y-4 animate-fadeIn">
                {/* Textbook Derivation */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    <span>Step-by-Step Textbook Derivation</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                    {currentQuestion.explanation}
                  </p>
                </div>

                {/* Speed Math / Shortcut Trick */}
                {currentQuestion.shortcutTrick && (
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 mb-1.5">
                      <Sparkles className="w-4 h-4 text-amber-700" />
                      <span>💡 Textbook Speed Math / Shortcut Rule</span>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-950 font-mono font-medium leading-relaxed">
                      {currentQuestion.shortcutTrick}
                    </p>
                  </div>
                )}

                {/* Company Appearances */}
                {currentQuestion.companyTags && currentQuestion.companyTags.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold">Frequently Asked In:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentQuestion.companyTags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Question Palette & Navigator (Right 4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Question Palette ({filteredQuestions.length})
                </span>
                <span className="text-xs font-semibold text-emerald-700">
                  {Object.keys(answeredHistory).length} Answered
                </span>
              </div>

              {/* Grid of question numbers */}
              <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-6 gap-2 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
                {filteredQuestions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const answered = answeredHistory[q.id];
                  let btnColor = 'bg-slate-100 text-slate-700 hover:bg-slate-200';

                  if (isCurrent) {
                    btnColor = 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-400 ring-offset-1';
                  } else if (answered === true) {
                    btnColor = 'bg-emerald-100 text-emerald-800 font-bold border border-emerald-300';
                  } else if (answered === false) {
                    btnColor = 'bg-rose-100 text-rose-800 font-bold border border-rose-300';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setSelectedOption(null);
                        setIsAnswerRevealed(false);
                      }}
                      className={`h-9 rounded-xl text-xs font-medium cursor-pointer transition-all flex items-center justify-center ${btnColor}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Correct</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>Review</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span>Pending</span>
                </div>
              </div>
            </div>

            {/* Quick Tips Box */}
            <div className="bg-gradient-to-br from-emerald-50/60 to-slate-50 border border-emerald-200/80 rounded-3xl p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                <Brain className="w-4 h-4 text-emerald-600" />
                <span>Interview Mastery Tip</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Most top tier tech companies (Amazon, Goldman Sachs, TCS Digital, Cognizant) require 60%+ accuracy across both <strong>Section A (Maths)</strong> and <strong>Section B (Logic)</strong>. Practice with the Random 25 or 50 Exam to simulate realistic time constraints.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ================= TIMED EXAM MODE ================= */
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Exam Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800">
                  Timed Examination
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {activeQuestions.length} Questions (Section A & B)
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Aptitude Assessment Mock
              </h2>
            </div>

            {/* Timer & Submit */}
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-mono text-sm font-bold ${
                examTimeRemaining < 300
                  ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}>
                <Clock className="w-4 h-4 text-slate-500" />
                <span>{formatTimer(examTimeRemaining)}</span>
              </div>

              {!isExamSubmitted ? (
                <button
                  onClick={handleSubmitExam}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
                >
                  Submit Assessment
                </button>
              ) : (
                <button
                  onClick={() => handleGenerateRandomTest(activeQuestions.length)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Retake with Fresh Set</span>
                </button>
              )}
            </div>
          </div>

          {/* Exam Results Scorecard if submitted */}
          {isExamSubmitted && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-50/90 via-white to-teal-50/80 border border-emerald-200 shadow-xs space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                    Assessment Performance Summary
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                    Score: {examResults.totalScore} / {examResults.totalQuestions} ({examResults.percentage}%)
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-[11px] font-bold text-slate-400 uppercase block">Section A (Maths)</span>
                    <span className="text-base font-extrabold text-amber-800">
                      {examResults.secAScore}/{examResults.secATotal} ({examResults.secAPercent}%)
                    </span>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-[11px] font-bold text-slate-400 uppercase block">Section B (Logic)</span>
                    <span className="text-base font-extrabold text-teal-800">
                      {examResults.secBScore}/{examResults.secBTotal} ({examResults.secBPercent}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Question View in Exam */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                Question {currentIndex + 1} of {activeQuestions.length} • {currentQuestion.sectionName}
              </span>
              <button
                onClick={() => handleToggleFlag(currentQuestion.id)}
                className={`text-xs px-3 py-1 rounded-lg border font-medium flex items-center gap-1.5 cursor-pointer transition-colors ${
                  flaggedQuestions[currentQuestion.id]
                    ? 'bg-amber-50 border-amber-300 text-amber-800 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Flag className="w-3.5 h-3.5 text-amber-500" />
                <span>{flaggedQuestions[currentQuestion.id] ? 'Flagged for Review' : 'Flag Question'}</span>
              </button>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed whitespace-pre-line">
              {currentQuestion.question}
            </h3>

            {/* Exam Options */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option, idx) => {
                const userChoice = examAnswers[currentQuestion.id];
                const isSelected = userChoice === idx;
                const isCorrect = idx === currentQuestion.correctIndex;
                let optClass = 'border-slate-200 hover:border-emerald-300 text-slate-700 bg-white';

                if (isExamSubmitted) {
                  if (isCorrect) {
                    optClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                  } else if (isSelected && !isCorrect) {
                    optClass = 'border-rose-400 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-500/20';
                  } else {
                    optClass = 'border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  optClass = 'border-emerald-500 bg-emerald-50/50 text-emerald-900 font-bold ring-2 ring-emerald-500/20';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleExamOptionSelect(currentQuestion.id, idx)}
                    disabled={isExamSubmitted}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${optClass}`}
                  >
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm pt-0.5 leading-snug">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Exam Navigation Buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => currentIndex > 0 && setCurrentIndex(prev => prev - 1)}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
              >
                Previous
              </button>
              <button
                onClick={() => currentIndex < activeQuestions.length - 1 && setCurrentIndex(prev => prev + 1)}
                disabled={currentIndex === activeQuestions.length - 1}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Next
              </button>
            </div>

            {/* If submitted, show solution below */}
            {isExamSubmitted && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 mt-4">
                <span className="text-xs font-bold text-slate-700 block">Textbook Solution & Proof:</span>
                <p className="text-xs sm:text-sm text-slate-700">{currentQuestion.explanation}</p>
                {currentQuestion.shortcutTrick && (
                  <p className="text-xs text-amber-900 font-mono font-medium pt-1">
                    Shortcut: {currentQuestion.shortcutTrick}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
