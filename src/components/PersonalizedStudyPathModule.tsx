import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  Clock, 
  RotateCw, 
  ArrowRight, 
  BookOpen, 
  Code2, 
  Mic, 
  ShieldCheck, 
  Zap, 
  Target, 
  Filter, 
  ChevronRight, 
  Check, 
  Award,
  Database,
  Cpu,
  Network,
  Boxes,
  Layers,
  Flame,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { 
  PersonalizedStudyPath, 
  StudyPathStep, 
  SubjectId, 
  UserTopicProgress, 
  LeetCodeProfile, 
  MockInterviewSession 
} from '../types';
import { updateStudyPathStepStatus, savePersonalizedStudyPath } from '../utils/storage';
import { saveUserDataToFirestore } from '../utils/firestoreSync';
import { User } from 'firebase/auth';

interface PersonalizedStudyPathModuleProps {
  studyPath: PersonalizedStudyPath;
  onUpdateStudyPath: (updated: PersonalizedStudyPath) => void;
  topicProgress: Record<string, UserTopicProgress>;
  leetcodeProfile: LeetCodeProfile | null;
  interviewHistory?: MockInterviewSession[];
  onNavigateToTab: (tab: string, subjectId?: SubjectId, topicId?: string) => void;
  onNavigateToLeetCodeProblem?: (problemId: number) => void;
  user?: User | null;
  onRefreshPath?: () => void;
  isGenerating?: boolean;
}

export const PersonalizedStudyPathModule: React.FC<PersonalizedStudyPathModuleProps> = ({
  studyPath,
  onUpdateStudyPath,
  topicProgress,
  leetcodeProfile,
  interviewHistory = [],
  onNavigateToTab,
  onNavigateToLeetCodeProblem,
  user,
  onRefreshPath,
  isGenerating = false
}) => {
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<string>('all');
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [expandedStepId, setExpandedStepId] = useState<string | null>(studyPath?.steps[0]?.id || null);

  // Calculate metrics
  const totalSteps = studyPath.steps.length;
  const completedSteps = studyPath.steps.filter(s => s.completed).length;
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  
  const remainingHours = studyPath.steps
    .filter(s => !s.completed)
    .reduce((acc, curr) => acc + curr.estimatedMinutes, 0) / 60;

  // Filtered steps
  const filteredSteps = studyPath.steps.filter(step => {
    const matchPhase = selectedPhaseFilter === 'all' || step.phase.includes(selectedPhaseFilter);
    const matchPriority = selectedPriorityFilter === 'all' || step.priority === selectedPriorityFilter;
    const matchStatus = 
      selectedStatusFilter === 'all' ||
      (selectedStatusFilter === 'completed' && step.completed) ||
      (selectedStatusFilter === 'pending' && !step.completed);
    return matchPhase && matchPriority && matchStatus;
  });

  const handleToggleStep = (stepId: string, currentCompleted: boolean) => {
    const nextCompleted = !currentCompleted;
    const updated = updateStudyPathStepStatus(stepId, nextCompleted);
    if (updated) {
      onUpdateStudyPath(updated);
      if (user?.uid) {
        saveUserDataToFirestore(user.uid, { studyPath: updated });
      }
    }
  };

  const getSubjectIcon = (subId: string) => {
    switch (subId) {
      case 'dbms': return Database;
      case 'os': return Cpu;
      case 'cn': return Network;
      case 'oops': return Boxes;
      case 'dsa': return Code2;
      default: return Layers;
    }
  };

  const getPriorityBadgeStyle = (priority: 'Critical' | 'High' | 'Medium') => {
    switch (priority) {
      case 'Critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'High':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Medium':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Hero Diagnostic & Personalization Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-50/90 via-teal-50/40 to-slate-50 border border-emerald-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                <Compass className="w-3.5 h-3.5 text-emerald-700 animate-spin" style={{ animationDuration: '10s' }} />
                AI Personalized Study Path
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-semibold">
                Weakness-First Routing
              </span>
              {user ? (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                  Synced to Cloud
                </span>
              ) : (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-medium">
                  Local Tracking
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Adaptive Interview Study Path
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed">
              {studyPath.summary}
            </p>

            {/* Weekly Milestone Callout */}
            <div className="p-3.5 rounded-2xl bg-white/80 border border-emerald-200/80 flex items-start gap-3 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                  Current Weekly Milestone
                </span>
                <p className="text-xs text-slate-700 font-medium mt-0.5">
                  {studyPath.weeklyMilestone}
                </p>
              </div>
            </div>
          </div>

          {/* Readiness Score & Regenerate Action */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex-shrink-0">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Diagnostic Readiness
              </span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-extrabold text-emerald-700">
                  {studyPath.readinessScore}%
                </span>
                <span className="text-xs text-slate-400 font-semibold">/ 100%</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block mt-1">
                Target: 85%+ Onsite Ready
              </span>
            </div>

            <button
              onClick={onRefreshPath}
              disabled={isGenerating}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <RotateCw className={`w-3.5 h-3.5 text-emerald-400 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Analyzing Performance...' : 'Regenerate Study Path'}</span>
            </button>
          </div>
        </div>

        {/* Overall Progress Strip */}
        <div className="mt-6 pt-6 border-t border-emerald-100/90 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Path Completion
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-extrabold text-slate-900">{progressPercent}%</span>
              <span className="text-xs text-slate-500 font-medium">({completedSteps}/{totalSteps})</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div 
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Remaining Study Time
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span className="text-xl font-extrabold text-slate-900">
                {remainingHours.toFixed(1)} hrs
              </span>
            </div>
            <span className="text-[11px] text-slate-500 block mt-1">
              Targeted across {studyPath.steps.filter(s => !s.completed).length} open steps
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Targeted LeetCode Problems
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <Code2 className="w-4 h-4 text-teal-600" />
              <span className="text-xl font-extrabold text-slate-900">
                {studyPath.steps.reduce((acc, s) => acc + s.recommendedLeetCodeProblems.length, 0)} Problems
              </span>
            </div>
            <span className="text-[11px] text-slate-500 block mt-1">
              High-yield patterns linked
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Primary Vulnerability
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-bold text-slate-900 truncate">
                {studyPath.weakestSubject}
              </span>
            </div>
            <span className="text-[11px] text-rose-600 font-semibold block mt-1">
              Prioritized in Phase 1
            </span>
          </div>
        </div>
      </div>

      {/* 2. Filter & Navigation Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Phase Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {[
              { id: 'all', label: 'All Phases' },
              { id: 'Phase 1', label: 'Phase 1: Urgent' },
              { id: 'Phase 2', label: 'Phase 2: Core' },
              { id: 'Phase 3', label: 'Phase 3: FAANG' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPhaseFilter(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedPhaseFilter === p.id 
                    ? 'bg-white text-slate-900 shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Priority Filter */}
          <select
            value={selectedPriorityFilter}
            onChange={(e) => setSelectedPriorityFilter(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="all">All Priorities</option>
            <option value="Critical">Critical Only</option>
            <option value="High">High Only</option>
            <option value="Medium">Medium Only</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value as any)}
            className="text-xs py-1.5 px-3 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending Tasks</option>
            <option value="completed">Completed Tasks</option>
          </select>
        </div>

        <span className="text-xs text-slate-500 font-medium">
          Showing <strong>{filteredSteps.length}</strong> of {totalSteps} path steps
        </span>
      </div>

      {/* 3. Personalized Study Path Step Cards */}
      <div className="space-y-4">
        {filteredSteps.map((step, idx) => {
          const SubIcon = getSubjectIcon(step.subjectId);
          const isExpanded = expandedStepId === step.id;

          return (
            <div
              key={step.id}
              className={`bg-white border rounded-3xl transition-all shadow-xs overflow-hidden ${
                step.completed 
                  ? 'border-emerald-200/80 bg-emerald-50/20' 
                  : step.priority === 'Critical'
                  ? 'border-rose-200 hover:border-rose-300'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Step Header */}
              <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* Completion Toggle Button */}
                  <button
                    onClick={() => handleToggleStep(step.id, step.completed)}
                    className="mt-0.5 cursor-pointer text-slate-400 hover:text-emerald-600 transition-colors flex-shrink-0"
                    title={step.completed ? 'Mark as incomplete' : 'Mark as completed'}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-6 h-6 hover:stroke-emerald-500" />
                    )}
                  </button>

                  <div>
                    {/* Tags row */}
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getPriorityBadgeStyle(step.priority)}`}>
                        {step.priority} Priority
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {step.phase.split(':')[0]}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">
                        • ~{step.estimatedMinutes} mins
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className={`text-base sm:text-lg font-bold leading-snug ${
                      step.completed ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}>
                      {step.title}
                    </h3>

                    {/* Subject & Topic indicator */}
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <SubIcon className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{step.subjectTitle}</span>
                      {step.topicName && (
                        <>
                          <span>•</span>
                          <span className="font-semibold text-slate-700">{step.topicName}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                  <button
                    onClick={() => setExpandedStepId(prev => prev === step.id ? null : step.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'View Plan'}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Expanded Plan Details */}
              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/60 p-5 sm:p-6 space-y-6">
                  {/* Why this was assigned */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      <span>Diagnostic Analysis: Why This Step Is Crucial</span>
                    </div>
                    <p className="text-xs text-amber-950/90 leading-relaxed font-medium">
                      {step.whyAssigned}
                    </p>
                  </div>

                  {/* Core Review Guide & Key Concepts */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Theory Review & Mental Models
                      </h4>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      {step.reviewSummary}
                    </p>

                    {step.keyTakeaways && step.keyTakeaways.length > 0 && (
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                          Key Formulas & Interview Takeaways:
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {step.keyTakeaways.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2">
                              <span className="text-emerald-500 font-bold">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Recommended LeetCode Problems Grid */}
                  {step.recommendedLeetCodeProblems && step.recommendedLeetCodeProblems.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-teal-600" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            Targeted LeetCode Problems to Solve
                          </h4>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">
                          Reinforces theoretical pattern with code
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {step.recommendedLeetCodeProblems.map((prob) => (
                          <div 
                            key={prob.id}
                            className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-300 transition-all shadow-2xs"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                  prob.difficulty === 'Easy' 
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : prob.difficulty === 'Medium'
                                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                                }`}>
                                  {prob.difficulty}
                                </span>
                                <span className="text-[11px] font-semibold text-slate-400">
                                  #{prob.id}
                                </span>
                              </div>

                              <h5 className="text-sm font-bold text-slate-900 leading-snug">
                                {prob.title}
                              </h5>

                              <span className="text-[11px] text-slate-500 block mt-0.5">
                                Category: <strong>{prob.category}</strong>
                              </span>

                              <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                                {prob.reason}
                              </p>
                            </div>

                            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-end">
                              <button
                                onClick={() => {
                                  if (onNavigateToLeetCodeProblem) {
                                    onNavigateToLeetCodeProblem(prob.id);
                                  } else {
                                    onNavigateToTab('leetcode');
                                  }
                                }}
                                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                              >
                                <span>Solve Problem</span>
                                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step Action Hub */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
                    <div className="flex flex-wrap items-center gap-2">
                      {step.topicId && (
                        <button
                          onClick={() => onNavigateToTab('subjects', step.subjectId, step.topicId)}
                          className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Review Topic in Core Subjects</span>
                        </button>
                      )}

                      <button
                        onClick={() => onNavigateToTab('mock-interview')}
                        className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                      >
                        <Mic className="w-3.5 h-3.5 text-teal-600" />
                        <span>Practice in Voice Interview</span>
                      </button>
                    </div>

                    <button
                      onClick={() => handleToggleStep(step.id, step.completed)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                        step.completed 
                          ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{step.completed ? 'Mark Incomplete' : 'Complete Step & Claim XP'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
