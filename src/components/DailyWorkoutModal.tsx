import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  Trophy, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, SubjectId } from '../types';
import { INITIAL_QUESTIONS } from '../data/subjects';

interface DailyWorkoutProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCompleteWorkout: (score: number, total: number, results: { topicId: string; subjectId: SubjectId; isCorrect: boolean }[]) => void;
  onNavigateToTab: (tab: string) => void;
}

export const DailyWorkoutModal: React.FC<DailyWorkoutProps> = ({
  onCompleteWorkout,
  onNavigateToTab,
}) => {
  // Select 5 varied questions across different subjects
  const [workoutQuestions] = useState<Question[]>(() => {
    // Pick 1 from dbms, 1 from os, 1 from cn/oops, 1 from aptitude/reasoning, 1 from dsa
    const db = INITIAL_QUESTIONS.find(q => q.subjectId === 'dbms');
    const os = INITIAL_QUESTIONS.find(q => q.subjectId === 'os');
    const cn = INITIAL_QUESTIONS.find(q => q.subjectId === 'cn');
    const oops = INITIAL_QUESTIONS.find(q => q.subjectId === 'oops');
    const apt = INITIAL_QUESTIONS.find(q => q.subjectId === 'aptitude');
    const dsa = INITIAL_QUESTIONS.find(q => q.subjectId === 'dsa');
    return [db, os, cn || oops, apt, dsa].filter(Boolean) as Question[];
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(15 * 60); // 15 mins
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Timer tick
  useEffect(() => {
    if (!isTimerRunning || isFinished) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, isFinished]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIndex: number) => {
    if (isFinished) return;
    setUserAnswers(prev => ({ ...prev, [currentIndex]: optIndex }));
  };

  const handleFinish = () => {
    setIsFinished(true);
    setIsTimerRunning(false);

    // Calculate score
    let correctCount = 0;
    const results = workoutQuestions.map((q, idx) => {
      const isCorrect = userAnswers[idx] === q.correctIndex;
      if (isCorrect) correctCount++;
      return {
        topicId: q.topicId,
        subjectId: q.subjectId,
        isCorrect
      };
    });

    if (correctCount >= 3) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }

    onCompleteWorkout(correctCount, workoutQuestions.length, results);
  };

  const currentQ = workoutQuestions[currentIndex];
  const score = Object.keys(userAnswers).reduce((acc, idxStr) => {
    const idx = parseInt(idxStr);
    return acc + (userAnswers[idx] === workoutQuestions[idx].correctIndex ? 1 : 0);
  }, 0);

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-emerald-50/80 via-white to-slate-50 border border-emerald-100/90 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Daily 15-Minute Interview Workout</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Speed & Accuracy Blitz
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            5 multi-domain questions testing DBMS, OS, CN/OOPs, Aptitude, and DSA Logic.
          </p>
        </div>

        {/* Timer Widget */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3 self-start sm:self-auto shadow-xs">
          <Clock className={`w-5 h-5 ${timeLeftSeconds < 180 ? 'text-rose-500 animate-pulse' : 'text-emerald-600'}`} />
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Time Remaining</div>
            <div className="text-xl font-mono font-extrabold text-slate-900 tracking-wider">
              {formatTime(timeLeftSeconds)}
            </div>
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
          {/* Question Stepper */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-700">
                Question {currentIndex + 1} of {workoutQuestions.length}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase font-semibold">
                {currentQ.subjectId}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {workoutQuestions.map((_, qidx) => (
                <button
                  key={qidx}
                  onClick={() => setCurrentIndex(qidx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold font-mono transition-colors ${
                    currentIndex === qidx
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : userAnswers[qidx] !== undefined
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {qidx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Question Text */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-5 leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = userAnswers[currentIndex] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs ring-1 ring-emerald-500/40'
                      : 'bg-slate-50/60 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20 text-slate-700'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 ${
                    isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="flex-1">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Footer Controls */}
          <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              Previous
            </button>

            <div className="flex gap-2.5">
              {currentIndex < workoutQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Finish & Submit Workout</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Result Screen */
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-xs text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-100 to-emerald-200 p-0.5 mx-auto border border-emerald-300">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Trophy className="w-8 h-8 text-emerald-600" />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Workout Completed!
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Score: <span className="font-bold text-emerald-700 text-lg">{score}</span> / {workoutQuestions.length} ({Math.round((score / workoutQuestions.length) * 100)}%)
            </p>
          </div>

          {/* Breakdown list */}
          <div className="max-w-2xl mx-auto space-y-3 text-left">
            {workoutQuestions.map((q, idx) => {
              const isCorrect = userAnswers[idx] === q.correctIndex;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border text-xs ${
                    isCorrect
                      ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                      : 'bg-rose-50/70 border-rose-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 font-bold">
                    <span className="uppercase tracking-wider text-[10px] text-slate-500 font-mono">
                      {q.subjectId} • {q.topicName}
                    </span>
                    <span className={isCorrect ? 'text-emerald-700' : 'text-rose-600'}>
                      {isCorrect ? 'Correct (+1)' : 'Incorrect (Flagged as Weak)'}
                    </span>
                  </div>
                  <div className="font-semibold text-slate-900 mb-2">{q.question}</div>
                  <div className="text-[11px] text-slate-600 bg-white/70 p-2.5 rounded-lg border border-slate-100">
                    <span className="font-bold text-slate-800">Explanation: </span>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setUserAnswers({});
                setCurrentIndex(0);
                setIsFinished(false);
                setTimeLeftSeconds(15 * 60);
                setIsTimerRunning(true);
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Workout</span>
            </button>

            <button
              onClick={() => onNavigateToTab('dashboard')}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>View Updated AI Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
