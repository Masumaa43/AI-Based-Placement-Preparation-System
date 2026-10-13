import React, { useState } from 'react';
import { Bell, LogIn, LogOut, Check, Cloud, User as UserIcon, ChevronDown, RotateCw, ShieldCheck } from 'lucide-react';
import { User } from 'firebase/auth';

interface HeaderBarProps {
  user?: User | null;
  onSignIn?: () => Promise<void> | void;
  onSignOut?: () => Promise<void> | void;
  isSyncing?: boolean;
}

const GoogleIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export const HeaderBar: React.FC<HeaderBarProps> = ({
  user,
  onSignIn,
  onSignOut,
  isSyncing = false
}) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignInClick = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    try {
      await onSignIn?.();
    } finally {
      setIsSigningIn(false);
    }
  };

  // Derive display name only from actual authenticated user
  const displayName = user
    ? (user.displayName || (user.email ? user.email.split('@')[0] : 'User'))
    : null;

  const initials = user
    ? (user.displayName
        ? user.displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
        : (user.email ? user.email.slice(0, 2).toUpperCase() : 'U'))
    : null;

  return (
    <header className="px-5 sm:px-8 py-3.5 flex items-center justify-between border-b border-slate-100 bg-white">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <a
          href="/logo.png"
          target="_blank"
          rel="noopener noreferrer"
          title="PrepPulse AI Logo - Click to view public image"
          className="cursor-pointer transition-transform hover:scale-105 block flex-shrink-0"
        >
          <img
            src="/logo.png"
            alt="PrepPulse AI Logo"
            className="w-9 h-9 rounded-xl object-contain bg-white p-0.5 shadow-2xs border border-slate-200/80"
            referrerPolicy="no-referrer"
          />
        </a>
        <div className="flex items-baseline gap-1.5">
          <span className="text-slate-900 font-bold text-lg tracking-tight">PrepPulse AI</span>
        </div>
      </div>

      {/* Right User & Notifications Section */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Sync Indicator */}
        {user && isSyncing && (
          <div className="hidden md:flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
            <span>Cloud Syncing</span>
          </div>
        )}

        {/* Notifications Bell */}
        <div 
          className="relative w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4 text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500" />
        </div>

        {/* Authentication Section */}
        {user ? (
          /* LOGGED IN STATE */
          <div className="relative flex items-center gap-2 pl-3 border-l border-slate-200">
            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={displayName || 'User profile'}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-100"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs ring-2 ring-blue-100 shadow-2xs">
                  {initials}
                </div>
              )}

              <div className="hidden sm:block text-left leading-tight">
                <span className="text-xs font-bold text-slate-800 block truncate max-w-[130px]">
                  {displayName}
                </span>
                <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                  <Cloud className="w-2.5 h-2.5" />
                  <span>Synced</span>
                </span>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {/* Direct Logout Button */}
            <button
              onClick={() => onSignOut?.()}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-200 hover:border-rose-200"
              title="Sign Out of your account"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span>Sign Out</span>
            </button>

            {/* User Details Dropdown */}
            {isMenuOpen && (
              <div className="absolute right-0 top-12 w-64 bg-white border border-slate-200 rounded-2xl p-3 shadow-xl z-50 animate-fadeIn space-y-2">
                <div className="p-2 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-900 truncate">{displayName}</div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5">{user.email}</div>
                </div>

                <div className="p-2 text-[11px] text-emerald-700 bg-emerald-50 rounded-xl flex items-center gap-1.5 font-medium border border-emerald-100">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Signed in with Google Auth</span>
                </div>

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onSignOut?.();
                  }}
                  className="w-full p-2.5 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 transition-colors cursor-pointer border border-rose-100"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Sign Out of Account</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* LOGGED OUT / GUEST STATE */
          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">
              <UserIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>Guest Mode</span>
            </div>

            <button
              onClick={handleSignInClick}
              disabled={isSigningIn}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 hover:border-slate-400 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-[0.98] disabled:opacity-50"
              title="Sign in with Google to save your study progress"
            >
              {isSigningIn ? (
                <RotateCw className="w-4 h-4 animate-spin text-blue-600" />
              ) : (
                <GoogleIcon />
              )}
              <span>{isSigningIn ? 'Signing in...' : 'Sign In with Google'}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
