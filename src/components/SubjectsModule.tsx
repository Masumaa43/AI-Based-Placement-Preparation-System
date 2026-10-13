import React, { useState } from 'react';
import { 
  Database, 
  Cpu, 
  Network, 
  Boxes, 
  Calculator, 
  Brain, 
  Code2, 
  CheckCircle, 
  AlertTriangle, 
  HelpCircle, 
  RotateCw, 
  ChevronRight, 
  Sparkles,
  BookOpen,
  Layers,
  Award,
  Filter,
  ExternalLink,
  BrainCircuit,
  Globe
} from 'lucide-react';
import { SubjectId, Question, UserTopicProgress, Flashcard } from '../types';
import { SUBJECT_METAS, INITIAL_QUESTIONS, FLASHCARDS } from '../data/subjects';

interface SubjectsModuleProps {
  initialSubjectId?: SubjectId;
  topicProgress: Record<string, UserTopicProgress>;
  onToggleTopicStatus: (topicId: string, subjectId: SubjectId) => void;
  onQuestionAnswered: (questionId: string, isCorrect: boolean, topicId: string, subjectId: SubjectId) => void;
  onNavigateToTab?: (tab: string, subjectId?: SubjectId) => void;
}

export const SubjectsModule: React.FC<SubjectsModuleProps> = ({
  initialSubjectId = 'dbms',
  topicProgress,
  onToggleTopicStatus,
  onQuestionAnswered,
  onNavigateToTab,
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>(initialSubjectId);
  const [activeSubTab, setActiveSubTab] = useState<'topics' | 'practice' | 'flashcards'>('topics');
  
  // Practice state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [customQuestions, setCustomQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [isGeneratingAIQuestion, setIsGeneratingAIQuestion] = useState(false);

  // Flashcards state
  const [activeFlashcardIdx, setActiveFlashcardIdx] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const selectedSubject = SUBJECT_METAS.find(s => s.id === selectedSubjectId) || SUBJECT_METAS[0];

  const getSubjectIcon = (id: SubjectId) => {
    switch (id) {
      case 'dbms': return Database;
      case 'os': return Cpu;
      case 'cn': return Network;
      case 'oops': return Boxes;
      case 'aptitude': return Calculator;
      case 'reasoning': return Brain;
      case 'dsa': return Code2;
      case 'ml': return BrainCircuit;
      case 'webdev': return Globe;
      default: return BookOpen;
    }
  };

  // Filter questions for active subject
  const subjectQuestions = customQuestions.filter(q => q.subjectId === selectedSubjectId);
  const currentQuestion = subjectQuestions[currentQuestionIdx] || subjectQuestions[0];

  // Filter flashcards for active subject
  const subjectFlashcards = FLASHCARDS.filter(fc => fc.subjectId === selectedSubjectId);
  const currentCard = subjectFlashcards[activeFlashcardIdx] || subjectFlashcards[0];

  const handleOptionSelect = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null || !currentQuestion) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQuestion.correctIndex;
    onQuestionAnswered(currentQuestion.id, isCorrect, currentQuestion.topicId, currentQuestion.subjectId);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    if (currentQuestionIdx < subjectQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setCurrentQuestionIdx(0);
    }
  };

  const handleGenerateAIQuestion = async () => {
    setIsGeneratingAIQuestion(true);
    try {
      const activeTopic = selectedSubject.topics[0]?.name || 'Core Concepts';
      const res = await fetch('/api/ai/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: selectedSubject.id,
          topic: activeTopic,
          difficulty: 'Medium'
        })
      });
      if (res.ok) {
        const newQ: Question = await res.json();
        setCustomQuestions(prev => [newQ, ...prev]);
        setCurrentQuestionIdx(0);
        setSelectedOption(null);
        setIsAnswerSubmitted(false);
      }
    } catch (e) {
      console.warn('AI question generator error', e);
    } finally {
      setIsGeneratingAIQuestion(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Subject Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {SUBJECT_METAS.map((subj) => {
          const Icon = getSubjectIcon(subj.id);
          const isSelected = selectedSubjectId === subj.id;

          const coveredInSub = subj.topics.filter(t => topicProgress[t.id]?.status === 'covered').length;
          const weakInSub = subj.topics.filter(t => topicProgress[t.id]?.status === 'weak').length;

          return (
            <button
              key={subj.id}
              onClick={() => {
                setSelectedSubjectId(subj.id);
                setCurrentQuestionIdx(0);
                setSelectedOption(null);
                setIsAnswerSubmitted(false);
                setActiveFlashcardIdx(0);
                setIsCardFlipped(false);
              }}
              className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-50 border-emerald-500 shadow-xs text-emerald-950 font-bold ring-1 ring-emerald-500/30'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold leading-tight truncate">{subj.title.split(' (')[0]}</div>
                <div className="text-[10px] text-slate-500 font-normal">
                  {coveredInSub}/{subj.topics.length} covered • {weakInSub > 0 && <span className="text-rose-600 font-semibold">{weakInSub} weak</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Subject Header & Sub-Tabs */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
              <span>Core Interview Curriculum</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {selectedSubject.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              {selectedSubject.shortDesc}
            </p>
          </div>

          {/* Sub Navigation: Topics vs Practice vs Flashcards */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80 self-start sm:self-auto">
            <button
              onClick={() => setActiveSubTab('topics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === 'topics'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Topics Checklist ({selectedSubject.topics.length})
            </button>
            <button
              onClick={() => setActiveSubTab('practice')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === 'practice'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Practice Quiz ({subjectQuestions.length})
            </button>
            <button
              onClick={() => setActiveSubTab('flashcards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === 'flashcards'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Flashcards
            </button>
          </div>
        </div>

        {/* Aptitude Arena Announcement Banner for Aptitude & Reasoning */}
        {(selectedSubjectId === 'aptitude' || selectedSubjectId === 'reasoning') && onNavigateToTab && (
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-50/90 via-white to-teal-50/80 border border-emerald-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                54+
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Aptitude & Logic Arena: Section A (Maths) & Section B (Logic)
                </span>
                <span className="text-xs text-slate-500">
                  Curated from R.S. Aggarwal & Arun Sharma competitive exam books with random test generator & timed mock exams.
                </span>
              </div>
            </div>
            <button
              onClick={() => onNavigateToTab('aptitude-arena')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              Open Full Arena
            </button>
          </div>
        )}

        {/* 1. TOPICS CHECKLIST VIEW */}
        {activeSubTab === 'topics' && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Interview Topics Matrix & Readiness Flags</span>
              <span>Click button to update your preparation status</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {selectedSubject.topics.map((topic) => {
                const prog = topicProgress[topic.id] || { status: 'not_started' };
                const isCovered = prog.status === 'covered';
                const isWeak = prog.status === 'weak';

                return (
                  <div
                    key={topic.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${
                      isCovered
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : isWeak
                        ? 'bg-rose-50/50 border-rose-200'
                        : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 text-sm">{topic.name}</span>
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                          topic.importance === 'Critical'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}>
                          {topic.importance} Yield
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        <span className="text-slate-800 font-semibold">Core Concepts: </span>
                        {topic.keyConcept}
                      </p>
                      {topic.gfgUrl && (
                        <div className="pt-1">
                          <a
                            href={topic.gfgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-100/70 hover:bg-emerald-200/80 px-2.5 py-1 rounded-lg border border-emerald-300 transition-colors cursor-pointer"
                            title={topic.gfgTitle || 'Read full tutorial on GeeksforGeeks'}
                          >
                            <span className="font-black text-[10px] px-1 py-0.2 bg-emerald-800 text-white rounded">GFG</span>
                            <span>Read on GeeksforGeeks</span>
                            <ExternalLink className="w-3 h-3 text-emerald-700" />
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Status Toggles */}
                    <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                      <button
                        onClick={() => onToggleTopicStatus(topic.id, selectedSubject.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isCovered
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : isWeak
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {isCovered && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                        {isWeak && <AlertTriangle className="w-3.5 h-3.5 text-white" />}
                        {!isCovered && !isWeak && <HelpCircle className="w-3.5 h-3.5 text-slate-400" />}
                        <span>
                          {isCovered ? 'Covered' : isWeak ? 'Weak (Needs Drill)' : 'Mark Status'}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveSubTab('practice');
                          const qIdx = subjectQuestions.findIndex(q => q.topicId === topic.id);
                          if (qIdx !== -1) setCurrentQuestionIdx(qIdx);
                        }}
                        className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
                      >
                        Quiz
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. PRACTICE QUIZ VIEW */}
        {activeSubTab === 'practice' && (
          <div className="mt-6 space-y-6">
            {currentQuestion ? (
              <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 shadow-xs">
                {/* Question Header */}
                <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-700">
                      Question {currentQuestionIdx + 1} of {subjectQuestions.length}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium">
                      {currentQuestion.topicName}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      currentQuestion.difficulty === 'Hard' ? 'text-rose-700 bg-rose-50 border border-rose-200' :
                      currentQuestion.difficulty === 'Medium' ? 'text-amber-800 bg-amber-50 border border-amber-200' :
                      'text-emerald-800 bg-emerald-50 border border-emerald-200'
                    }`}>
                      {currentQuestion.difficulty}
                    </span>
                  </div>

                  {currentQuestion.companyTags && (
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <span>Asked at:</span>
                      {currentQuestion.companyTags.map((tag, tidx) => (
                        <span key={tidx} className="font-semibold text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Question Text */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 leading-relaxed">
                  {currentQuestion.question}
                </h3>

                {currentQuestion.codeSnippet && (
                  <pre className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-mono text-emerald-300 overflow-x-auto mb-4">
                    {currentQuestion.codeSnippet}
                  </pre>
                )}

                {/* Options List */}
                <div className="space-y-2.5">
                  {currentQuestion.options.map((opt, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    const isCorrect = optIdx === currentQuestion.correctIndex;

                    let btnClass = 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 text-slate-800';
                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        btnClass = 'bg-emerald-100/80 border-emerald-500 text-emerald-950 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        btnClass = 'bg-rose-100/80 border-rose-500 text-rose-950 font-semibold';
                      }
                    } else if (isSelected) {
                      btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500/30';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswerSubmitted}
                        onClick={() => handleOptionSelect(optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center gap-3 cursor-pointer shadow-2xs ${btnClass}`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {isAnswerSubmitted && isCorrect && (
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box (when submitted) */}
                {isAnswerSubmitted && (
                  <div className="mt-5 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs leading-relaxed animate-fadeIn">
                    <div className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Interview Explanation & Mechanics</span>
                    </div>
                    <p className="text-slate-700">{currentQuestion.explanation}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <button
                    onClick={handleGenerateAIQuestion}
                    disabled={isGeneratingAIQuestion}
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer disabled:opacity-50"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${isGeneratingAIQuestion ? 'animate-spin' : ''}`} />
                    <span>Generate AI Question for this Topic</span>
                  </button>

                  <div className="flex gap-2">
                    {!isAnswerSubmitted ? (
                      <button
                        onClick={handleAnswerSubmit}
                        disabled={selectedOption === null}
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold transition-all cursor-pointer shadow-xs shadow-emerald-600/20"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                      >
                        <span>Next Question</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500">
                <p>No questions yet for this subject.</p>
                <button
                  onClick={handleGenerateAIQuestion}
                  className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
                >
                  Generate First Question
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. FLASHCARDS VIEW */}
        {activeSubTab === 'flashcards' && (
          <div className="mt-6 space-y-6">
            {currentCard ? (
              <div className="max-w-2xl mx-auto">
                <div
                  onClick={() => setIsCardFlipped(prev => !prev)}
                  className="relative min-h-[260px] bg-gradient-to-br from-white via-slate-50 to-emerald-50/30 border border-slate-200 hover:border-emerald-300 rounded-3xl p-6 sm:p-8 cursor-pointer shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between select-none group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <span className="font-mono text-emerald-700 font-semibold">
                        Card {activeFlashcardIdx + 1} of {subjectFlashcards.length}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium">
                        {currentCard.topic}
                      </span>
                    </div>

                    {!isCardFlipped ? (
                      <div className="space-y-4">
                        <div className="text-xs uppercase font-bold text-emerald-700 tracking-wider">
                          Question / Prompt
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
                          {currentCard.question}
                        </h4>
                        <p className="text-xs text-slate-400 italic">
                          (Click card or press flip to reveal answer & mnemonic)
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4 animate-fadeIn">
                        <div className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
                          Key Answer & Mental Model
                        </div>
                        <p className="text-sm sm:text-base text-slate-800 whitespace-pre-line leading-relaxed font-medium">
                          {currentCard.answer}
                        </p>

                        {currentCard.mnemonic && (
                          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                            <span className="font-bold text-emerald-950">Mnemonic / Memory Trick: </span>
                            {currentCard.mnemonic}
                          </div>
                        )}

                        {currentCard.code && (
                          <pre className="bg-slate-900 text-emerald-300 p-2.5 rounded-lg text-xs font-mono overflow-x-auto">
                            {currentCard.code}
                          </pre>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span className="group-hover:text-emerald-700 transition-colors">
                      {isCardFlipped ? 'Click to show question' : 'Click to flip card'}
                    </span>
                    <span className="text-xs text-slate-400">Spaced Repetition Active</span>
                  </div>
                </div>

                {/* Flashcard controls */}
                <div className="mt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsCardFlipped(false);
                      setActiveFlashcardIdx(prev => Math.max(0, prev - 1));
                    }}
                    disabled={activeFlashcardIdx === 0}
                    className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-30 text-slate-700 text-xs font-semibold transition-colors shadow-2xs"
                  >
                    Previous Card
                  </button>

                  <button
                    onClick={() => setIsCardFlipped(prev => !prev)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs"
                  >
                    {isCardFlipped ? 'Show Front' : 'Flip Answer'}
                  </button>

                  <button
                    onClick={() => {
                      setIsCardFlipped(false);
                      setActiveFlashcardIdx(prev => (prev < subjectFlashcards.length - 1 ? prev + 1 : 0));
                    }}
                    className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-2xs"
                  >
                    Next Card
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500">
                <p>No flashcards loaded for this subject yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
