import React, { useState } from 'react';
import { 
  Code2, 
  BookOpen, 
  GraduationCap, 
  Layers 
} from 'lucide-react';
import { SubjectId, UserTopicProgress, LeetCodeProfile } from '../types';
import { GeeksforGeeksModule } from './GeeksforGeeksModule';
import { LeetCodeModule } from './LeetCodeModule';
import { SubjectsModule } from './SubjectsModule';

interface PracticePortalProps {
  initialSubTab?: 'gfg' | 'leetcode' | 'subjects';
  activeSubjectId: SubjectId;
  topicProgress: Record<string, UserTopicProgress>;
  onToggleTopicStatus: (topicId: string, subjectId: SubjectId) => void;
  onQuestionAnswered: (questionId: string, isCorrect: boolean, topicId: string, subjectId: SubjectId) => void;
  leetcodeProfile: LeetCodeProfile | null;
  isLeetCodeLoading: boolean;
  onSyncLeetCode: (username: string) => void;
  onNavigateToTab: (tab: string, subjectId?: SubjectId, topicId?: string) => void;
}

export const PracticePortal: React.FC<PracticePortalProps> = ({
  initialSubTab = 'gfg',
  activeSubjectId,
  topicProgress,
  onToggleTopicStatus,
  onQuestionAnswered,
  leetcodeProfile,
  isLeetCodeLoading,
  onSyncLeetCode,
  onNavigateToTab
}) => {
  const [subTab, setSubTab] = useState<'gfg' | 'leetcode' | 'subjects'>(initialSubTab);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Sub-Switch Bar */}
      <div className="bg-white border border-slate-100 rounded-2xl p-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-50 rounded-xl border border-slate-200/80">
          <button
            onClick={() => setSubTab('gfg')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === 'gfg'
                ? 'bg-[#0f294a] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>GeeksforGeeks SDE Sheet</span>
          </button>

          <button
            onClick={() => setSubTab('leetcode')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === 'leetcode'
                ? 'bg-[#0f294a] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            <span>LeetCode Sync & Explorer</span>
          </button>

          <button
            onClick={() => setSubTab('subjects')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === 'subjects'
                ? 'bg-[#0f294a] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span>Placement Subjects (DSA, ML, Core CS, Web Dev, OOPs)</span>
          </button>
        </div>

        <span className="text-xs text-slate-400 font-medium px-2 hidden sm:inline">
          Full-Stack Technical Interview Practice
        </span>
      </div>

      {/* Render Active Practice Component */}
      {subTab === 'gfg' && (
        <GeeksforGeeksModule
          onQuestionAnswered={onQuestionAnswered}
          onNavigateToTab={onNavigateToTab}
        />
      )}

      {subTab === 'leetcode' && (
        <LeetCodeModule
          profile={leetcodeProfile}
          isLoading={isLeetCodeLoading}
          onSyncUsername={onSyncLeetCode}
          onNavigateToDSA={() => setSubTab('subjects')}
        />
      )}

      {subTab === 'subjects' && (
        <SubjectsModule
          initialSubjectId={activeSubjectId}
          topicProgress={topicProgress}
          onToggleTopicStatus={onToggleTopicStatus}
          onQuestionAnswered={onQuestionAnswered}
          onNavigateToTab={onNavigateToTab}
        />
      )}
    </div>
  );
};
