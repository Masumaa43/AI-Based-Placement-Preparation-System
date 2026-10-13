import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { MoodType } from '../types';
import { MOOD_CONFIG } from '../data/quotes';

interface MoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMood: MoodType;
  onSelectMood: (mood: MoodType) => void;
  onGoToQuotesTab: () => void;
}

export const MoodModal: React.FC<MoodModalProps> = ({
  isOpen,
  onClose,
  currentMood,
  onSelectMood,
  onGoToQuotesTab,
}) => {
  if (!isOpen) return null;

  const moods: MoodType[] = ['bad', 'good', 'better', 'best'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-900 text-lg">Check-in: What's Your Mood?</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          How are you feeling right now with your interview prep? Select your state to receive curated wisdom and calibrate your study session.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {moods.map((mood) => {
            const config = MOOD_CONFIG[mood];
            const isSelected = currentMood === mood;

            return (
              <button
                key={mood}
                onClick={() => {
                  onSelectMood(mood);
                  onClose();
                  onGoToQuotesTab();
                }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50/80 border-emerald-500 shadow-xs ring-1 ring-emerald-500/50'
                    : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20'
                }`}
              >
                <div className="text-3xl mb-1">{config.emoji}</div>
                <div className="font-bold text-sm text-slate-900">{config.label.split(' / ')[0]}</div>
                <div className="text-[11px] text-slate-500 line-clamp-1">{config.badge}</div>
              </button>
            );
          })}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => {
              onClose();
              onGoToQuotesTab();
            }}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
          >
            Open Dedicated Quotes & Mindset Hub →
          </button>
        </div>
      </div>
    </div>
  );
};
