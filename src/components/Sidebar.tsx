import React from 'react';
import { 
  LayoutDashboard, 
  Code2, 
  CheckSquare, 
  Compass, 
  HelpCircle, 
  Mic, 
  BarChart3, 
  TreePine, 
  Zap, 
  HeartHandshake 
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  gardenStreak?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  gardenStreak = 12
}) => {
  const primaryNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'practice', label: 'Practice', icon: Code2 },
    { id: 'mock-tests', label: 'Mock Tests', icon: CheckSquare },
    { id: 'study-path', label: 'AI Study Plan', icon: Compass },
    { id: 'doubt-solver', label: 'AI Doubt Solver', icon: HelpCircle },
    { id: 'mock-interview', label: 'Mock Interview', icon: Mic },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const secondaryNavItems = [
    { id: 'garden', label: 'Study Garden', icon: TreePine, badge: `${gardenStreak}d` },
    { id: 'workout', label: '15-Min Workout', icon: Zap, badge: 'Daily' },
    { id: 'mood', label: 'Mindset & Quotes', icon: HeartHandshake },
  ];

  return (
    <aside className="w-full md:w-60 flex-shrink-0 p-4 sm:p-5 border-r border-slate-100 bg-white flex flex-col justify-between">
      {/* Primary Navigation List */}
      <div className="space-y-1.5">
        {primaryNavItems.map(item => {
          const isActive = currentTab === item.id || 
            (item.id === 'practice' && (currentTab === 'subjects' || currentTab === 'leetcode' || currentTab === 'gfg')) ||
            (item.id === 'mock-tests' && currentTab === 'aptitude-arena');

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full text-left flex items-center justify-between px-4 py-2.5 rounded-xl transition-all cursor-pointer text-sm ${
                isActive
                  ? 'bg-[#0f294a] text-white font-medium shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-normal'
              }`}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary Navigation Section */}
      <div className="pt-6 mt-6 border-t border-slate-100 space-y-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 block mb-2">
          Habits & Wellness
        </span>
        {secondaryNavItems.map(item => {
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full text-left flex items-center justify-between px-4 py-2 rounded-xl transition-all cursor-pointer text-xs ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-600">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
