import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Calendar, 
  Clock, 
  Award, 
  TrendingUp, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  RotateCw, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Mic, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  Database, 
  Cpu, 
  Network, 
  Boxes, 
  Code2, 
  Server,
  CloudCheck,
  ShieldCheck,
  Zap,
  BarChart2,
  BookOpen
} from 'lucide-react';
import { MockInterviewSession, InterviewRoundLog } from '../types';

interface InterviewHistoryProps {
  history: MockInterviewSession[];
  onDeleteSession: (sessionId: string) => void;
  onClearHistory: () => void;
  onRetakeSession: (subjectId: string, subjectTitle: string, difficulty: 'Entry-Level' | 'Mid-Level' | 'Senior') => void;
  onStartNewInterview: () => void;
  onRestoreSampleHistory?: () => void;
  isCloudSynced?: boolean;
}

export const InterviewHistory: React.FC<InterviewHistoryProps> = ({
  history,
  onDeleteSession,
  onClearHistory,
  onRetakeSession,
  onStartNewInterview,
  onRestoreSampleHistory,
  isCloudSynced = false
}) => {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(history.length > 0 ? history[0].id : null);
  const [activeRoundTab, setActiveRoundTab] = useState<Record<string, number>>({});
  const [copiedSessionId, setCopiedSessionId] = useState<string | null>(null);

  // Subject icon mapper
  const getSubjectIcon = (subId: string) => {
    switch (subId) {
      case 'dbms': return Database;
      case 'os': return Cpu;
      case 'cn': return Network;
      case 'oops': return Boxes;
      case 'dsa': return Code2;
      case 'system_design': return Server;
      default: return Sparkles;
    }
  };

  // Filtered and searched sessions
  const filteredSessions = useMemo(() => {
    return history.filter(session => {
      const matchSubject = selectedSubjectFilter === 'all' || session.subjectId === selectedSubjectFilter;
      const matchDiff = selectedDifficultyFilter === 'all' || session.difficulty === selectedDifficultyFilter;
      
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        session.subjectTitle.toLowerCase().includes(q) ||
        session.interviewerPersona.toLowerCase().includes(q) ||
        session.transcriptSummary.toLowerCase().includes(q) ||
        session.rounds.some(r => 
          r.question.toLowerCase().includes(q) || 
          r.candidateAnswer.toLowerCase().includes(q) ||
          r.strengths.some(s => s.toLowerCase().includes(q)) ||
          r.missingConcepts.some(m => m.toLowerCase().includes(q))
        );

      return matchSubject && matchDiff && matchSearch;
    });
  }, [history, selectedSubjectFilter, selectedDifficultyFilter, searchQuery]);

  // Aggregate Growth & Performance Metrics
  const metrics = useMemo(() => {
    if (history.length === 0) {
      return {
        total: 0,
        averageScore: 0,
        highestScore: 0,
        growthTrend: 0,
        strongestSubject: 'N/A',
        totalRoundsSpoken: 0
      };
    }

    const total = history.length;
    const totalScore = history.reduce((acc, s) => acc + s.averageScore, 0);
    const averageScore = Math.round(totalScore / total);
    const highestScore = Math.max(...history.map(s => s.averageScore));
    const totalRoundsSpoken = history.reduce((acc, s) => acc + (s.rounds?.length || s.completedRounds || 0), 0);

    // Calculate growth trend: compare oldest sessions vs newest sessions
    let growthTrend = 0;
    if (history.length >= 2) {
      const chronological = [...history].reverse();
      const firstScore = chronological[0].averageScore;
      const lastScore = chronological[chronological.length - 1].averageScore;
      growthTrend = Math.round(lastScore - firstScore);
    }

    // Determine strongest subject
    const subjectScores: Record<string, { total: number; count: number; name: string }> = {};
    history.forEach(s => {
      if (!subjectScores[s.subjectId]) {
        subjectScores[s.subjectId] = { total: 0, count: 0, name: s.subjectTitle };
      }
      subjectScores[s.subjectId].total += s.averageScore;
      subjectScores[s.subjectId].count += 1;
    });

    let bestAvg = -1;
    let strongestSubject = 'General';
    Object.values(subjectScores).forEach(sub => {
      const avg = sub.total / sub.count;
      if (avg > bestAvg) {
        bestAvg = avg;
        strongestSubject = sub.name.split('(')[0].trim();
      }
    });

    return {
      total,
      averageScore,
      highestScore,
      growthTrend,
      strongestSubject,
      totalRoundsSpoken
    };
  }, [history]);

  // Score Trajectory Data (chronological order)
  const scoreTrajectory = useMemo(() => {
    return [...history].reverse().slice(-7); // Last 7 sessions in timeline order
  }, [history]);

  const toggleExpandSession = (id: string) => {
    setExpandedSessionId(prev => prev === id ? null : id);
  };

  const handleCopyTranscript = (session: MockInterviewSession) => {
    let transcriptText = `--- PrepPulse AI Voice Mock Screening Report ---\n`;
    transcriptText += `Subject: ${session.subjectTitle}\n`;
    transcriptText += `Difficulty: ${session.difficulty} | Interviewer: ${session.interviewerPersona}\n`;
    transcriptText += `Date: ${session.formattedDate} | Score: ${session.averageScore}% (${session.verdict})\n\n`;
    transcriptText += `Summary: ${session.transcriptSummary}\n\n`;
    
    session.rounds.forEach((r, idx) => {
      transcriptText += `\n[Round ${idx + 1}] Score: ${r.score}/100 (${r.rating})\n`;
      transcriptText += `Question: ${r.question}\n`;
      transcriptText += `Candidate Answer: "${r.candidateAnswer}"\n`;
      transcriptText += `Interviewer Spoken Feedback: ${r.spokenFeedback}\n`;
      transcriptText += `Strengths: ${r.strengths.join(', ')}\n`;
      transcriptText += `Missing Concepts: ${r.missingConcepts.join(', ')}\n`;
      transcriptText += `Staff Benchmark: ${r.idealAnswer}\n`;
    });

    navigator.clipboard.writeText(transcriptText);
    setCopiedSessionId(session.id);
    setTimeout(() => setCopiedSessionId(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header Banner & Growth Analytics */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                Persistent Growth Log
              </span>
              {isCloudSynced ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-200">
                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                  Synced to Firebase
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium border border-slate-200">
                  <Zap className="w-3 h-3 text-slate-500" />
                  Local Persistence
                </span>
              )}
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Spoken Interview History & Growth Tracker
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl">
              Inspect verbatim speech transcripts, scoring breakdowns, technical strengths, and AI Staff Engineer benchmark answers across all your historical screening sessions.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              onClick={onStartNewInterview}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Mic className="w-4 h-4" />
              <span>Start New Voice Screen</span>
            </button>
          </div>
        </div>

        {/* 2. Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {/* Total Sessions */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Sessions Completed
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {metrics.total}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                ({metrics.totalRoundsSpoken} rounds)
              </span>
            </div>
          </div>

          {/* Average Score */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Average Score
            </span>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl sm:text-3xl font-extrabold ${
                metrics.averageScore >= 75 ? 'text-emerald-700' : metrics.averageScore >= 60 ? 'text-amber-600' : 'text-slate-800'
              }`}>
                {metrics.averageScore}%
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {metrics.averageScore >= 75 ? 'Onsite Ready' : 'In Progress'}
              </span>
            </div>
          </div>

          {/* Highest Score */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Personal Best
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-teal-700">
                {metrics.highestScore}%
              </span>
              <span className="text-xs text-teal-700 font-medium">
                Top Screen
              </span>
            </div>
          </div>

          {/* Growth Trend */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Growth Trajectory
            </span>
            <div className="flex items-center gap-1.5">
              <TrendingUp className={`w-5 h-5 ${metrics.growthTrend >= 0 ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span className={`text-2xl sm:text-3xl font-extrabold ${
                metrics.growthTrend > 0 ? 'text-emerald-700' : metrics.growthTrend === 0 ? 'text-slate-700' : 'text-amber-600'
              }`}>
                {metrics.growthTrend > 0 ? `+${metrics.growthTrend}%` : `${metrics.growthTrend}%`}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Visual Score Progression Timeline (if 2+ sessions) */}
        {scoreTrajectory.length > 1 && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Performance Progression Across Recent Sessions
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                FAANG Target Bar: 75%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 items-end h-28 pt-2">
              {scoreTrajectory.map((session, idx) => {
                const isSelected = expandedSessionId === session.id;
                const isPassing = session.averageScore >= 75;
                const heightPercent = Math.max(25, Math.min(100, session.averageScore));

                return (
                  <button
                    key={session.id}
                    onClick={() => setExpandedSessionId(session.id)}
                    className={`flex flex-col items-center justify-end h-full p-2 rounded-xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/80 ring-2 ring-emerald-500 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-[11px] font-extrabold text-slate-800 mb-1">
                      {session.averageScore}%
                    </span>
                    <div className="w-full bg-slate-200 rounded-t-md h-14 relative flex items-end">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-md transition-all ${
                          isPassing 
                            ? 'bg-emerald-500 hover:bg-emerald-400' 
                            : 'bg-amber-400 hover:bg-amber-300'
                        }`}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500 mt-1 truncate max-w-full">
                      {session.subjectId.toUpperCase()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4. Filter, Search & Action Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3.5">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Search Box */}
          <div className="relative min-w-[220px] flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transcript, topic, or question..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Subject Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedSubjectFilter}
              onChange={(e) => setSelectedSubjectFilter(e.target.value)}
              className="text-xs py-2 pl-3 pr-8 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none"
            >
              <option value="all">All Subjects</option>
              <option value="dbms">DBMS</option>
              <option value="os">Operating Systems</option>
              <option value="cn">Computer Networks</option>
              <option value="oops">OOPs & Design Patterns</option>
              <option value="dsa">DSA Logic</option>
              <option value="system_design">System Design</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Difficulty Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedDifficultyFilter}
              onChange={(e) => setSelectedDifficultyFilter(e.target.value)}
              className="text-xs py-2 pl-3 pr-8 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none"
            >
              <option value="all">All Difficulties</option>
              <option value="Entry-Level">Entry-Level</option>
              <option value="Mid-Level">Mid-Level</option>
              <option value="Senior">Senior</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Clear / Restore Actions */}
        <div className="flex items-center gap-2 justify-end">
          {history.length === 0 && onRestoreSampleHistory && (
            <button
              onClick={onRestoreSampleHistory}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load Sample Sessions</span>
            </button>
          )}

          {history.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all interview history logs?')) {
                  onClearHistory();
                }
              }}
              className="text-xs font-medium text-slate-400 hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1 px-2 py-1"
              title="Clear all logs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>
      </div>

      {/* 5. Session Logs List */}
      {filteredSessions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Mic className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No Interview Sessions Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
              {searchQuery || selectedSubjectFilter !== 'all' || selectedDifficultyFilter !== 'all'
                ? 'No recorded interview sessions match your current filter criteria. Try adjusting or clearing filters.'
                : 'You have not conducted any voice mock screening sessions yet. Complete your first technical screen to log questions, answers, and track your readiness growth over time!'}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onStartNewInterview}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              Launch Spoken Interview
            </button>
            {onRestoreSampleHistory && history.length === 0 && (
              <button
                onClick={onRestoreSampleHistory}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Restore Benchmark Examples
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSessions.map((session) => {
            const isExpanded = expandedSessionId === session.id;
            const SubIcon = getSubjectIcon(session.subjectId);
            const isPassing = session.averageScore >= 75;
            const isBorderline = session.averageScore >= 60 && session.averageScore < 75;
            const activeTab = activeRoundTab[session.id] ?? 0;
            const currentRoundData = session.rounds[activeTab] || session.rounds[0];

            return (
              <div
                key={session.id}
                className={`bg-white border rounded-3xl transition-all shadow-xs overflow-hidden ${
                  isExpanded ? 'border-emerald-300 ring-2 ring-emerald-500/10' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Session Card Header */}
                <div 
                  onClick={() => toggleExpandSession(session.id)}
                  className="p-5 sm:p-6 cursor-pointer select-none flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      isPassing ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <SubIcon className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-extrabold text-slate-900">
                          {session.subjectTitle}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {session.difficulty}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">
                          • {session.formattedDate}
                        </span>
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span>Interviewer: <strong>{session.interviewerPersona}</strong></span>
                        <span>•</span>
                        <span>{session.rounds.length} Questions Evaluated</span>
                        {session.durationSeconds && (
                          <>
                            <span>•</span>
                            <span>{Math.round(session.durationSeconds / 60)} mins</span>
                          </>
                        )}
                      </div>

                      {/* Brief Transcript Summary */}
                      {session.transcriptSummary && (
                        <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          &ldquo;{session.transcriptSummary}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Score & Verdict Banner */}
                  <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <div className="flex items-center md:justify-end gap-2">
                        <span className={`text-2xl font-extrabold ${
                          isPassing ? 'text-emerald-700' : isBorderline ? 'text-amber-600' : 'text-rose-600'
                        }`}>
                          {session.averageScore}%
                        </span>
                      </div>
                      <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        isPassing 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                          : isBorderline 
                          ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}>
                        {session.verdict}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Session Deep Dive Details */}
                {isExpanded && (
                  <div className="border-t border-slate-100 bg-slate-50/60 p-5 sm:p-6 space-y-6">
                    {/* Strengths & Growth Areas Pills */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Observed Strengths */}
                      <div className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-2xs">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Key Technical Strengths Demonstrated</span>
                        </div>
                        {session.strengthsSummary && session.strengthsSummary.length > 0 ? (
                          <ul className="space-y-1.5 text-xs text-slate-700">
                            {session.strengthsSummary.map((str, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-2">
                                <span className="text-emerald-500 font-bold">•</span>
                                <span>{str}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-slate-500 italic">No specific strengths captured.</p>
                        )}
                      </div>

                      {/* Growth Areas */}
                      <div className="bg-white border border-amber-100 rounded-2xl p-4 shadow-2xs">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          <span>Missing Concepts & Focus Areas</span>
                        </div>
                        {session.growthAreas && session.growthAreas.length > 0 ? (
                          <ul className="space-y-1.5 text-xs text-slate-700">
                            {session.growthAreas.map((area, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>{area}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-slate-500 italic">No critical missing concepts recorded.</p>
                        )}
                      </div>
                    </div>

                    {/* Question Rounds Navigation Tabs */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Spoken Transcripts & Feedback by Round
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          Question {activeTab + 1} of {session.rounds.length}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {session.rounds.map((round, rIdx) => {
                          const isTabActive = activeTab === rIdx;
                          return (
                            <button
                              key={rIdx}
                              onClick={() => setActiveRoundTab(prev => ({ ...prev, [session.id]: rIdx }))}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                                isTabActive
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              <span>Round {rIdx + 1}</span>
                              <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                                isTabActive ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-100 text-slate-500'
                              }`}>
                                {round.score}%
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Active Round Detail Card */}
                      {currentRoundData && (
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs">
                          {/* Question */}
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                Technical Question #{activeTab + 1}
                              </span>
                              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                {currentRoundData.score}/100 • {currentRoundData.rating}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 leading-snug">
                              {currentRoundData.question}
                            </h4>
                          </div>

                          {/* Candidate Verbatim Transcript */}
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
                              <Mic className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Candidate Spoken Response (Transcript):</span>
                            </div>
                            <p className="text-xs text-slate-700 italic leading-relaxed">
                              &ldquo;{currentRoundData.candidateAnswer}&rdquo;
                            </p>
                          </div>

                          {/* Spoken Feedback from Interviewer */}
                          <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/80">
                            <span className="text-xs font-bold text-emerald-900 block mb-1">
                              Interviewer Spoken Feedback:
                            </span>
                            <p className="text-xs text-emerald-900/90 leading-relaxed">
                              {currentRoundData.spokenFeedback}
                            </p>
                          </div>

                          {/* Round Strengths and Missing Concepts */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            {currentRoundData.strengths && currentRoundData.strengths.length > 0 && (
                              <div className="space-y-1">
                                <span className="font-bold text-slate-600 block">Round Strengths:</span>
                                {currentRoundData.strengths.map((str, i) => (
                                  <div key={i} className="text-slate-700 flex items-start gap-1.5">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    <span>{str}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {currentRoundData.missingConcepts && currentRoundData.missingConcepts.length > 0 && (
                              <div className="space-y-1">
                                <span className="font-bold text-slate-600 block">Missing Edge Cases:</span>
                                {currentRoundData.missingConcepts.map((mis, i) => (
                                  <div key={i} className="text-slate-700 flex items-start gap-1.5">
                                    <span className="text-amber-500 font-bold">!</span>
                                    <span>{mis}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Staff Engineer Model Answer */}
                          {currentRoundData.idealAnswer && (
                            <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-200/80">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900 mb-1">
                                <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                                <span>Staff Engineer Model Benchmark Answer:</span>
                              </div>
                              <p className="text-xs text-purple-950/90 leading-relaxed">
                                {currentRoundData.idealAnswer}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyTranscript(session)}
                          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          {copiedSessionId === session.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 font-bold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Full Transcript</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm('Delete this interview session log?')) {
                              onDeleteSession(session.id);
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>

                      <button
                        onClick={() => onRetakeSession(session.subjectId, session.subjectTitle, session.difficulty)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Retake This Subject</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
