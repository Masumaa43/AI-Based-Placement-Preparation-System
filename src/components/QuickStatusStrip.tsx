import React from 'react';
import { 
  Flame, 
  TreePine, 
  Sparkles, 
  Zap, 
  HeartHandshake, 
  Film, 
  ArrowRight,
  TrendingUp,
  RotateCw
} from 'lucide-react';
import { MoodType, GardenState } from '../types';
import { MOOD_CONFIG } from '../data/quotes';

interface QuickStatusStripProps {
  currentMood: MoodType;
  onOpenMoodModal: () => void;
  readinessScore: number;
  readinessTier?: string;
  garden: GardenState;
  onNavigateToTab: (tab: string) => void;
  onOpenWorkout: () => void;
}

export const QuickStatusStrip: React.FC<QuickStatusStripProps> = ({
  currentMood,
  onOpenMoodModal,
  readinessScore,
  readinessTier = 'Intermediate Prep',
  garden,
  onNavigateToTab,
  onOpenWorkout,
}) => {
  const moodInfo = MOOD_CONFIG[currentMood];

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Live Pulse & Daily Overview
          </h2>
        </div>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          Independent status tracking placed one by one
        </span>
      </div>

      {/* Grid of Status Cards Placed One by One */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Item 1: Virtual Study Garden & Streak */}
        <div 
          onClick={() => onNavigateToTab('garden')}
          className="group relative bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl p-4 transition-all duration-200 shadow-2xs hover:shadow-sm cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <TreePine className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Study Garden
                </span>
                <span className="font-extrabold text-slate-900 text-base flex items-center gap-1.5">
                  {garden.currentStreak} Days Streak
                  <span className="text-sm">🔥</span>
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium text-[11px]">
              🌲 {garden.trees.length} Flourishing Trees
            </span>
            <span className="text-emerald-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
              Meadow <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Item 2: Interview Readiness Index */}
        <div 
          onClick={() => onNavigateToTab('dashboard')}
          className="group relative bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl p-4 transition-all duration-200 shadow-2xs hover:shadow-sm cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Interview Readiness
                </span>
                <span className="font-extrabold text-slate-900 text-base">
                  {readinessScore}% Ready
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium text-[11px] truncate max-w-[130px]">
              {readinessTier}
            </span>
            <span className="text-emerald-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
              Report <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Item 3: Mindset & Mental State */}
        <div 
          onClick={onOpenMoodModal}
          className="group relative bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl p-4 transition-all duration-200 shadow-2xs hover:shadow-sm cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
                {moodInfo.emoji}
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Mindset State
                </span>
                <span className="font-extrabold text-slate-900 text-base truncate block max-w-[140px]">
                  {moodInfo.label.split(' / ')[0]}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium text-[11px]">
              Quotes & Wisdom
            </span>
            <span className="text-emerald-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
              Check In <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Item 4: Daily 15-Minute Workout */}
        <div 
          onClick={onOpenWorkout}
          className="group relative bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl p-4 transition-all duration-200 shadow-2xs hover:shadow-sm cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Daily Challenge
                </span>
                <span className="font-extrabold text-slate-900 text-base">
                  15-Min Blitz
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium text-[11px]">
              5 Quick Questions
            </span>
            <span className="text-emerald-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
              Start <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
