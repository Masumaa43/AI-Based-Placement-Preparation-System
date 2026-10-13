import React, { useState } from 'react';
import { 
  BarChart3, 
  Flame, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  RotateCw, 
  ArrowRight, 
  Sparkles, 
  ExternalLink,
  Target,
  Clock,
  Layers,
  Award,
  ChevronRight,
  BookOpen,
  TreePine,
  Compass
} from 'lucide-react';
import { AIDashboardReport, LeetCodeProfile, UserTopicProgress, SubjectId, GardenState } from '../types';
import { SUBJECT_METAS } from '../data/subjects';

interface AIDashboardProps {
  report: AIDashboardReport | null;
  leetcode: LeetCodeProfile | null;
  topicProgress: Record<string, UserTopicProgress>;
  isGeneratingAI: boolean;
  onRefreshAI: () => void;
  onNavigateToTab: (tab: string, subjectId?: SubjectId, topicId?: string) => void;
  onToggleTopicStatus: (topicId: string, subjectId: SubjectId) => void;
  garden?: GardenState;
}

export const AIDashboard: React.FC<AIDashboardProps> = ({
  report,
  leetcode,
  topicProgress,
  isGeneratingAI,
  onRefreshAI,
  onNavigateToTab,
  onToggleTopicStatus,
  garden
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'matrix' | 'sprint' | 'weaknesses'>('matrix');

  // Compute metrics across all topics
  let totalTopics = 0;
  let coveredCount = 0;
  let weakCount = 0;

  SUBJECT_METAS.forEach((sub) => {
    sub.topics.forEach((t) => {
      totalTopics++;
      const p = topicProgress[t.id];
      if (p?.status === 'covered') coveredCount++;
      if (p?.status === 'weak') weakCount++;
    });
  });

  const readinessScore = report?.readinessScore ?? 68;
  const readinessTier = report?.readinessTier ?? 'Intermediate Prep';

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Top Tier / FAANG Ready': return 'text-emerald-800 bg-emerald-100 border-emerald-300';
      case 'Interview Ready': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Intermediate Prep': return 'text-teal-800 bg-teal-50 border-teal-200';
      default: return 'text-slate-700 bg-slate-100 border-slate-300';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-50/80 via-white to-slate-50 border border-emerald-100/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>AI Performance Intelligence Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tech Interview Readiness Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {report?.summary || 
                `Comprehensive synthesis of your Core CS modules (DBMS, OS, CN, OOPs), Aptitude, Reasoning, and LeetCode problem-solving metrics.`}
            </p>
          </div>

          {/* Readiness Score Big Widget */}
          <div className="flex items-center gap-5 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex-shrink-0 shadow-xs">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500 transition-all duration-1000 ease-out"
                  strokeDasharray={`${readinessScore}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-xl font-extrabold text-slate-900">{readinessScore}%</span>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Readiness Index
              </div>
              <div className={`mt-1 inline-block text-xs font-bold px-2.5 py-1 rounded-md border ${getTierColor(readinessTier)}`}>
                {readinessTier}
              </div>
              <button
                onClick={onRefreshAI}
                disabled={isGeneratingAI}
                className="mt-2 text-xs flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-medium cursor-pointer"
              >
                <RotateCw className={`w-3 h-3 ${isGeneratingAI ? 'animate-spin text-emerald-600' : ''}`} />
                <span>Re-diagnose with AI</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Covered Topics */}
        <div 
          onClick={() => setActiveTab('matrix')}
          className="bg-white border border-slate-200 hover:border-emerald-300 rounded-2xl p-4 sm:p-5 transition-all cursor-pointer shadow-xs hover:shadow-sm"
        >
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Covered Topics</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {coveredCount} <span className="text-sm font-normal text-slate-400">/ {totalTopics}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${Math.round((coveredCount / Math.max(1, totalTopics)) * 100)}%` }} 
            />
          </div>
        </div>

        {/* Weak Topics Flagged */}
        <div 
          onClick={() => setActiveTab('weaknesses')}
          className="bg-white border border-slate-200 hover:border-rose-300 rounded-2xl p-4 sm:p-5 transition-all cursor-pointer shadow-xs hover:shadow-sm group"
        >
          <div className="flex items-center justify-between text-rose-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Weak Topics</span>
            <AlertTriangle className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {weakCount} <span className="text-xs font-normal text-rose-600">flagged for review</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            Needs high-yield formulas & drill
          </p>
        </div>

        {/* LeetCode Sync */}
        <div 
          onClick={() => onNavigateToTab('leetcode')}
          className="bg-white border border-slate-200 hover:border-emerald-300 rounded-2xl p-4 sm:p-5 transition-all cursor-pointer shadow-xs hover:shadow-sm"
        >
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">LeetCode Solved</span>
            <Target className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {leetcode ? leetcode.totalSolved : '312'} <span className="text-xs font-normal text-slate-400">Problems</span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
            <span className="text-emerald-700 font-semibold">{leetcode ? leetcode.easySolved : 145}E</span>
            <span>•</span>
            <span className="text-teal-700 font-semibold">{leetcode ? leetcode.mediumSolved : 139}M</span>
            <span>•</span>
            <span className="text-slate-600 font-semibold">{leetcode ? leetcode.hardSolved : 28}H</span>
          </div>
        </div>

        {/* Recommended Daily Goal */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-emerald-600 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Daily Target</span>
              <Award className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-xs text-slate-700 font-medium line-clamp-2 mt-1">
              {report?.recommendedDailyGoal || 'Complete 1 core CS quiz and fix 1 weak topic flag.'}
            </p>
          </div>
          <button 
            onClick={() => onNavigateToTab('workout')}
            className="mt-3 text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Start 15-Min Workout</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* AI Personalized Study Path Callout Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5 border border-slate-700/60">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-700/50">
                Personalized Study Path Ready
              </span>
              <span className="text-xs text-slate-300">
                Weakness-First AI Routing
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Targeted Review & LeetCode Practice Plan
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              We analyzed your {coveredCount} covered topics, {weakCount} flagged weak areas, and LeetCode performance. Follow an adaptive 3-phase curriculum prioritizing your biggest interview vulnerabilities.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateToTab('study-path')}
          className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm flex-shrink-0 group hover:scale-[1.02]"
        >
          <span>Open Personalized Study Path</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Study Garden Streak Card */}
      {garden && (
        <div className="bg-gradient-to-r from-emerald-50/80 via-white to-emerald-50/40 border border-emerald-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-300 flex-shrink-0 shadow-xs">
              <TreePine className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Study Streak: {garden.currentStreak} Days Active
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                  {garden.trees.length} Trees Planted 🌲
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Maintaining daily consistency grows your virtual study forest. Every active study day plants a new thriving tree in your meadow!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto flex-shrink-0">
            <button
              onClick={() => onNavigateToTab('garden')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
            >
              <span>Explore Study Garden</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Tabs navigation for In-Depth Views */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'matrix'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-600" />
          <span>Covered & Weak Topics (All-in-One View)</span>
        </button>

        <button
          onClick={() => setActiveTab('weaknesses')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'weaknesses'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-rose-500" />
          <span>Critical Weaknesses Diagnostics</span>
        </button>

        <button
          onClick={() => setActiveTab('sprint')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'sprint'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>7-Day AI Sprint Plan</span>
        </button>
      </div>

      {/* TAB 1: ALL-IN-ONE MATRIX (Covered, Weak, Solved in one go) */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-slate-500">
            <div>
              Click on any topic chip to cycle status:{' '}
              <span className="text-emerald-700 font-semibold">Covered</span> →{' '}
              <span className="text-rose-600 font-semibold">Weak</span> →{' '}
              <span className="text-slate-600 font-semibold">Not Started</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Covered</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Weak / Revision</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Pending</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUBJECT_METAS.map((subject) => {
              const subTopics = subject.topics;
              const subCovered = subTopics.filter(t => topicProgress[t.id]?.status === 'covered').length;
              const subWeak = subTopics.filter(t => topicProgress[t.id]?.status === 'weak').length;

              return (
                <div
                  key={subject.id}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-slate-900 text-base truncate">
                        {subject.title.split(' (')[0]}
                      </h3>
                      <button
                        onClick={() => onNavigateToTab('subjects', subject.id)}
                        className="text-xs text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <span>Practice</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 mb-3 line-clamp-1">
                      {subject.shortDesc}
                    </p>

                    {/* Subject Sub-Progress Bar */}
                    <div className="flex items-center gap-2 mb-4 text-xs">
                      <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden flex">
                        <div 
                          className="bg-emerald-500 h-full" 
                          style={{ width: `${(subCovered / subTopics.length) * 100}%` }}
                          title={`${subCovered} Covered`}
                        />
                        <div 
                          className="bg-rose-400 h-full" 
                          style={{ width: `${(subWeak / subTopics.length) * 100}%` }}
                          title={`${subWeak} Weak`}
                        />
                      </div>
                      <span className="font-mono text-slate-600 text-[11px] font-semibold">
                        {subCovered}/{subTopics.length}
                      </span>
                    </div>

                    {/* Topics Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {subTopics.map((topic) => {
                        const status = topicProgress[topic.id]?.status || 'not_started';
                        let chipStyle = 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300';
                        if (status === 'covered') {
                          chipStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100/70';
                        } else if (status === 'weak') {
                          chipStyle = 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100/70';
                        }

                        return (
                          <button
                            key={topic.id}
                            onClick={() => onToggleTopicStatus(topic.id, subject.id)}
                            title={`${topic.name} (${status.toUpperCase()}) - Click to toggle status`}
                            className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all cursor-pointer text-left flex items-center gap-1.5 ${chipStyle}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              status === 'covered' ? 'bg-emerald-500' :
                              status === 'weak' ? 'bg-rose-500' : 'bg-slate-300'
                            }`} />
                            <span className="truncate max-w-[140px]">{topic.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="text-emerald-700 font-semibold">{subCovered} Covered</span>
                    <span className="text-rose-600 font-semibold">{subWeak} Weak</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: CRITICAL WEAKNESSES DIAGNOSTICS */}
      {activeTab === 'weaknesses' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {report?.criticalWeaknesses.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-rose-200 rounded-2xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
                      {item.subject}
                    </span>
                    <h4 className="font-bold text-slate-900 text-base">{item.topic}</h4>
                  </div>

                  <div className="mt-3 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-rose-600 font-semibold">Identified Risk: </span>
                    {item.issue}
                  </div>

                  <div className="mt-3 text-xs text-emerald-900 bg-emerald-50/80 p-3 rounded-xl border border-emerald-200">
                    <span className="text-emerald-800 font-semibold">15-Min Remedy: </span>
                    {item.remedy}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => onNavigateToTab('subjects', item.subject.toLowerCase() as SubjectId)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                  >
                    <span>Drill Questions in {item.subject}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* High Yield Tips from AI */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>High-Yield Interview Secrets for Top Tech Firms</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(report?.highYieldTips || [
                "Always communicate brute force O(N^2) before coding the O(N log N) solution.",
                "In OS/DBMS rounds, draw diagrams for lock tables and page frames to impress the panel.",
                "Review the 4 SOLID principles with practical code examples (e.g. LSP with shapes).",
                "Keep a mental cheat sheet for sliding window and BFS shortest-path templates."
              ]).map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50/90 p-3.5 rounded-xl border border-slate-200/80">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 7-DAY SPRINT PLANNER */}
      {activeTab === 'sprint' && (
        <div className="space-y-6">
          {/* Day Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {(report?.sprintPlan || []).map((day) => {
              const isSelected = selectedDay === day.day;
              return (
                <button
                  key={day.day}
                  onClick={() => setSelectedDay(day.day)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl border transition-all text-xs font-semibold cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-[10px] uppercase opacity-80">Day {day.day}</div>
                  <div className="text-xs truncate max-w-[100px]">{day.subject}</div>
                </button>
              );
            })}
          </div>

          {/* Active Day Detail Card */}
          {(() => {
            const currentPlan = (report?.sprintPlan || []).find(p => p.day === selectedDay) || (report?.sprintPlan || [])[0];
            if (!currentPlan) return null;

            return (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Day {currentPlan.day} Focus • {currentPlan.subject}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      {currentPlan.focusArea}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Estimated: {currentPlan.estimatedHours} Hours</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5">
                  <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Target Tasks for Today:
                  </div>
                  {currentPlan.tasks.map((task, tidx) => (
                    <div 
                      key={tidx}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                    >
                      <input 
                        type="checkbox" 
                        id={`task-${currentPlan.day}-${tidx}`}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-white border-slate-300 cursor-pointer"
                      />
                      <label 
                        htmlFor={`task-${currentPlan.day}-${tidx}`}
                        className="flex-1 cursor-pointer select-none leading-relaxed"
                      >
                        {task}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Day {selectedDay} of 7 in Sprint
                  </span>
                  <div className="flex gap-2">
                    {selectedDay > 1 && (
                      <button
                        onClick={() => setSelectedDay(prev => Math.max(1, prev - 1))}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-medium text-slate-700 hover:bg-slate-200"
                      >
                        Previous Day
                      </button>
                    )}
                    {selectedDay < 7 && (
                      <button
                        onClick={() => setSelectedDay(prev => Math.min(7, prev + 1))}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-xs font-medium text-white hover:bg-emerald-500 shadow-2xs"
                      >
                        Next Day
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
