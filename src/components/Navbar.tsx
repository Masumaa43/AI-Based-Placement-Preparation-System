import React, { useState } from 'react';
import { 
  BrainCircuit, 
  BarChart3, 
  BookOpen, 
  Code2, 
  HeartHandshake, 
  Zap,
  TreePine,
  Film,
  LogOut,
  Cloud,
  Check,
  Menu,
  X,
  Calculator,
  Mic,
  Compass,
  GraduationCap
} from 'lucide-react';
import { User } from 'firebase/auth';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  user?: User | null;
  onSignIn?: () => void;
  onSignOut?: () => void;
  isSyncing?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  user,
  onSignIn,
  onSignOut,
  isSyncing = false
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'dashboard', label: 'AI Dashboard', icon: BarChart3 },
    { id: 'study-path', label: 'AI Study Path', icon: Compass, badge: 'Adaptive' },
    { id: 'mock-interview', label: 'Mock Interview', icon: Mic, badge: 'Voice AI' },
    { id: 'aptitude-arena', label: 'Aptitude & Logic Arena', icon: Calculator, badge: 'Sec A & B' },
    { id: 'garden', label: 'Study Garden', icon: TreePine },
    { id: 'subjects', label: 'Core Subjects', icon: BookOpen },
    { id: 'gfg', label: 'GeeksforGeeks Hub', icon: GraduationCap, badge: 'SDE Sheet' },
    { id: 'leetcode', label: 'LeetCode Sync', icon: Code2 },
    { id: 'workout', label: '15-Min Workout', icon: Zap, badge: 'Daily' },
    { id: 'video', label: 'Veo 3 Video', icon: Film, badge: 'AI' },
    { id: 'mood', label: 'Mindset & Quotes', icon: HeartHandshake },
  ];

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      {/* 1. Top Brand & Account Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src="/logo.png"
              alt="PrepPulse AI Logo"
              className="w-10 h-10 rounded-xl object-contain bg-white p-0.5 shadow-xs border border-slate-200/80 group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors">
                  PrepPulse
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Tech Interview & Mindset Engine
              </p>
            </div>
          </div>

          {/* Right Action: Clean User Account / Google Sign-In */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(prev => !prev)}
                  className="flex items-center gap-2.5 p-1 sm:px-3 sm:py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all text-xs cursor-pointer shadow-2xs"
                >
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || 'User'} 
                      className="w-7 h-7 rounded-full object-cover border border-emerald-300"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                      {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                    </div>
                  )}
                  <div className="hidden sm:block text-left pr-1">
                    <div className="font-bold text-slate-800 truncate max-w-[120px] leading-tight text-xs">
                      {user.displayName?.split(' ')[0] || 'Candidate'}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                      <Cloud className="w-2.5 h-2.5" />
                      <span>{isSyncing ? 'Syncing...' : 'Firestore Synced'}</span>
                    </div>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white border border-slate-200 rounded-2xl p-2 shadow-xl z-50 animate-fadeIn space-y-1">
                    <div className="p-2.5 border-b border-slate-100">
                      <div className="font-bold text-xs text-slate-900 truncate">{user.displayName || 'Candidate'}</div>
                      <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                    </div>
                    <div className="p-2 text-[11px] text-emerald-700 bg-emerald-50 rounded-xl flex items-center gap-1.5 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>Firestore Cloud Sync Active</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onSignOut?.();
                      }}
                      className="w-full p-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onSignIn}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-300 hover:border-emerald-400 hover:bg-emerald-50/50 text-xs font-bold text-slate-700 transition-all shadow-2xs cursor-pointer"
                title="Sign in with Google to sync your study streaks, tree garden, and prep data to Firestore"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="hidden sm:inline">Sign In with Google</span>
                <span className="sm:hidden">Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Secondary Navigation Bar - Placed Cleanly One by One */}
      <div className="border-t border-slate-100 bg-slate-50/70 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 py-1.5 overflow-x-auto scrollbar-none">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Navigation (When open) */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1.5 shadow-lg animate-fadeIn">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
