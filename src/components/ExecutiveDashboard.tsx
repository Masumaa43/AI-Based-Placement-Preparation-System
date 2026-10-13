import React, { useState } from 'react';
import { 
  Target, 
  Flame, 
  Check, 
  Clock, 
  Mic, 
  ArrowRight, 
  CheckCircle2, 
  Circle,
  TrendingUp,
  Sparkles,
  LogIn
} from 'lucide-react';
import { 
  UserTopicProgress, 
  LeetCodeProfile, 
  AIDashboardReport, 
  GardenState, 
  PersonalizedStudyPath,
  SubjectId
} from '../types';
import { User } from 'firebase/auth';

interface ExecutiveDashboardProps {
  user?: User | null;
  report: AIDashboardReport | null;
  garden: GardenState;
  topicProgress: Record<string, UserTopicProgress>;
  leetcode: LeetCodeProfile | null;
  studyPath?: PersonalizedStudyPath;
  onNavigateToTab: (tab: string, subjectId?: SubjectId, topicId?: string) => void;
  onOpenWorkout?: () => void;
  onSignIn?: () => Promise<void> | void;
  onSignOut?: () => Promise<void> | void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  user,
  report,
  garden,
  topicProgress,
  leetcode,
  studyPath,
  onNavigateToTab,
  onOpenWorkout,
  onSignIn,
  onSignOut
}) => {
  // Determine dynamic greeting based on hour
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  
  // User name logic - strictly never set any person's name as default
  const userName = user?.displayName
    ? user.displayName.split(' ')[0]
    : user?.email
    ? user.email.split('@')[0]
    : null;

  // Metrics
  const readinessScore = report?.readinessScore ?? 72;
  const learningStreak = garden.currentStreak || 12;
  const longestStreak = garden.longestStreak || 18;
  const solvedCount = garden.totalQuestionsAnswered || 184;
  const studyHours = ((garden.totalStudyMinutes || 870) / 60).toFixed(1);

  // Today's priorities state
  const [priorities, setPriorities] = useState([
    { id: '1', title: 'Complete React component quiz', completed: true, tab: 'practice', subjectId: 'oops' },
    { id: '2', title: 'Practice 5 BFS/DFS questions', completed: false, tab: 'gfg', subjectId: 'dsa' },
    { id: '3', title: 'Review precision and classification metrics', completed: false, tab: 'study-path' },
    { id: '4', title: 'Solve GeeksforGeeks POTD (Kadane Algo)', completed: false, tab: 'gfg' },
  ]);

  const togglePriority = (id: string) => {
    setPriorities(prev => prev.map(p => p.id === id ? { ...p, completed: !p.completed } : p));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Greeting Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a
            href="/logo.png"
            target="_blank"
            rel="noopener noreferrer"
            title="PrepPulse AI Logo - Click to view public image"
            className="block flex-shrink-0 group cursor-pointer transition-transform hover:scale-105"
          >
            <img
              src="/logo.png"
              alt="PrepPulse AI Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shadow-xs border border-slate-200/90 object-contain bg-white p-1"
              referrerPolicy="no-referrer"
            />
          </a>
          <div>
            <span className="text-xs font-semibold text-blue-600 tracking-wide block mb-1">
              Dashboard
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f294a] tracking-tight">
              {userName ? `${timeGreeting}, ${userName}` : `${timeGreeting}!`}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Your personalized roadmap is ready. Keep building momentum.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateToTab('study-path')}
          className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-[#1e58ea] hover:bg-blue-700 text-white text-sm font-semibold transition-all cursor-pointer shadow-xs flex items-center gap-2 group"
        >
          <span>View AI study plan</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 2. Four Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Readiness Score */}
        <div 
          onClick={() => onNavigateToTab('analytics')}
          className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-500">Readiness score</span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0f294a]">
              {readinessScore}%
            </div>
            <div className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <span>↑ 8% this month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Learning Streak */}
        <div 
          onClick={() => onNavigateToTab('garden')}
          className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-500">Learning streak</span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0f294a]">
              {learningStreak} days
            </div>
            <div className="text-xs text-emerald-600 font-medium mt-1">
              Your best: {longestStreak} days
            </div>
          </div>
        </div>

        {/* Card 3: Questions Solved */}
        <div 
          onClick={() => onNavigateToTab('practice')}
          className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-500">Questions solved</span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0f294a]">
              {solvedCount}
            </div>
            <div className="text-xs text-emerald-600 font-medium mt-1">
              36 this week
            </div>
          </div>
        </div>

        {/* Card 4: Study Time */}
        <div 
          onClick={() => onNavigateToTab('garden')}
          className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-500">Study time</span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0f294a]">
              {studyHours}h
            </div>
            <div className="text-xs text-emerald-600 font-medium mt-1">
              This week
            </div>
          </div>
        </div>
      </div>

      {/* 3. Middle Row: Learning Path (Left) + Dark Navy Mock Interview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Your Learning Path (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs space-y-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0f294a]">Your learning path</h3>
            <p className="text-xs text-slate-500 mt-0.5">Focus areas selected by your AI coach</p>
          </div>

          <div className="space-y-4">
            {/* 1. Data Structures */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800">Data Structures & Algorithms</span>
                  <span className="text-slate-400 block sm:inline sm:ml-2">Two Pointers, Sliding Window & Graphs</span>
                </div>
                <span className="font-bold text-blue-600">76%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#1e58ea] h-full rounded-full" style={{ width: '76%' }} />
              </div>
              <button
                onClick={() => onNavigateToTab('practice', 'dsa')}
                className="text-xs text-slate-500 hover:text-blue-600 transition-colors cursor-pointer block font-medium"
              >
                Next: Solve Monotonic Stack & Kadane's →
              </button>
            </div>

            {/* 2. Machine Learning */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800">Machine Learning & AI Engineering</span>
                  <span className="text-slate-400 block sm:inline sm:ml-2">Transformers, RAG & Evaluation Metrics</span>
                </div>
                <span className="font-bold text-purple-600">65%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: '65%' }} />
              </div>
              <button
                onClick={() => onNavigateToTab('practice', 'ml')}
                className="text-xs text-slate-500 hover:text-purple-600 transition-colors cursor-pointer block font-medium"
              >
                Next: Master L1/L2 Regularization & Self-Attention →
              </button>
            </div>

            {/* 3. Core CS */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800">Core CS Systems</span>
                  <span className="text-slate-400 block sm:inline sm:ml-2">DBMS (2PL & B+ Tree), OS (Paging), CN (TCP 3-Way)</span>
                </div>
                <span className="font-bold text-emerald-600">72%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '72%' }} />
              </div>
              <button
                onClick={() => onNavigateToTab('practice', 'dbms')}
                className="text-xs text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer block font-medium"
              >
                Next: Revise Normalization & Deadlock Banker's Algorithm →
              </button>
            </div>

            {/* 4. Web Development */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800">Fullstack Web Development</span>
                  <span className="text-slate-400 block sm:inline sm:ml-2">Event Loop, React 19 Fiber, Web Security (CORS/CSRF)</span>
                </div>
                <span className="font-bold text-teal-600">82%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-teal-600 h-full rounded-full" style={{ width: '82%' }} />
              </div>
              <button
                onClick={() => onNavigateToTab('practice', 'webdev')}
                className="text-xs text-slate-500 hover:text-teal-600 transition-colors cursor-pointer block font-medium"
              >
                Next: Test Microtasks vs Macrotasks & Core Web Vitals →
              </button>
            </div>

            {/* 5. OOPs */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800">OOPs & System Design</span>
                  <span className="text-slate-400 block sm:inline sm:ml-2">SOLID Principles, Design Patterns, VTABLE Dynamic Dispatch</span>
                </div>
                <span className="font-bold text-amber-600">88%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: '88%' }} />
              </div>
              <button
                onClick={() => onNavigateToTab('practice', 'oops')}
                className="text-xs text-slate-500 hover:text-amber-600 transition-colors cursor-pointer block font-medium"
              >
                Next: Review Singleton Thread-Safety & Factory Pattern →
              </button>
            </div>
          </div>
        </div>

        {/* Right: Dark Navy AI Interview Card (5 cols) */}
        <div className="lg:col-span-5 bg-[#0d223a] text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Mic className="w-5 h-5 text-white" />
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              Practice with an AI interviewer and receive feedback on your technical and communication skills.
            </p>
          </div>

          <div>
            <button
              onClick={() => onNavigateToTab('mock-interview')}
              className="px-5 py-2.5 rounded-xl bg-white text-slate-900 text-xs sm:text-sm font-bold hover:bg-slate-100 transition-colors cursor-pointer shadow-xs"
            >
              Start interview
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: Performance Overview Bar Chart (Left) + Today's Priorities (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Performance Overview */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs space-y-5 flex flex-col justify-between">
          <h3 className="text-base font-bold text-[#0f294a]">Performance overview</h3>

          {/* Bar Chart Visualization */}
          <div className="h-32 flex items-end justify-between gap-2.5 px-2 pt-4">
            {[
              { height: '45%', day: 'M' },
              { height: '65%', day: 'T' },
              { height: '55%', day: 'W' },
              { height: '78%', day: 'T' },
              { height: '68%', day: 'F' },
              { height: '95%', day: 'S' },
              { height: '82%', day: 'S' },
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div 
                  className="w-full bg-[#2563eb] rounded-t-md hover:bg-blue-700 transition-all cursor-pointer"
                  style={{ height: bar.height }}
                  title={`Activity score: ${bar.height}`}
                />
                <span className="text-[10px] text-slate-400 font-medium">{bar.day}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 text-xs text-slate-600">
            <span>Strongest subject: </span>
            <strong className="text-slate-900">Web Development & Core CS</strong>
          </div>
        </div>

        {/* Right: Today's Priorities Checklist */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs space-y-4 flex flex-col justify-between">
          <h3 className="text-base font-bold text-[#0f294a]">Today&apos;s priorities</h3>

          <div className="space-y-3">
            {priorities.map(item => (
              <div
                key={item.id}
                onClick={() => togglePriority(item.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  item.completed
                    ? 'bg-emerald-50/40 border-emerald-100'
                    : 'bg-slate-50/60 border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 hover:stroke-slate-400 flex-shrink-0" />
                  )}
                  <span className={`text-xs font-medium ${
                    item.completed ? 'line-through text-slate-400' : 'text-slate-800'
                  }`}>
                    {item.title}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToTab(item.tab, item.subjectId as any);
                  }}
                  className="text-[11px] font-bold text-blue-600 hover:underline flex-shrink-0 cursor-pointer"
                >
                  Go →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
