import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Volume2, 
  RotateCw, 
  Lightbulb, 
  ArrowRight, 
  Send,
  Quote as QuoteIcon,
  Compass,
  Smile
} from 'lucide-react';
import { MoodType, MoodResponse } from '../types';
import { MOOD_CONFIG } from '../data/quotes';

interface MoodSectionProps {
  currentMood: MoodType;
  moodData: MoodResponse;
  isLoading: boolean;
  onSelectMood: (mood: MoodType, note?: string) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const MoodSection: React.FC<MoodSectionProps> = ({
  currentMood,
  moodData,
  isLoading,
  onSelectMood,
  onNavigateToTab,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [customNote, setCustomNote] = useState('');
  const [isSpeaking, setIsSpeaking] = useState<number | null>(null);

  const moods: MoodType[] = ['bad', 'good', 'better', 'best'];
  const activeConfig = MOOD_CONFIG[currentMood];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSpeak = (text: string, index: number) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isSpeaking === index) {
        setIsSpeaking(null);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(null);
      utterance.onerror = () => setIsSpeaking(null);
      setIsSpeaking(index);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectMood(currentMood, customNote);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 border border-emerald-100/80 p-6 sm:p-10 shadow-sm">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-200/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-64 h-64 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-4">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>Tech Mindset & Mental Resilience</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            How are you feeling today?
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            Tech interview prep is 50% technical mastery and 50% emotional stamina. Select your mood below to receive tailored quotes, mindset reframing, and an actionable gameplan.
          </p>

          {/* Mood Selectors */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {moods.map((mood) => {
              const config = MOOD_CONFIG[mood];
              const isSelected = currentMood === mood;
              return (
                <button
                  key={mood}
                  onClick={() => onSelectMood(mood, customNote)}
                  className={`relative text-left p-4 rounded-2xl transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20 scale-102'
                      : 'bg-white/80 border-slate-200 hover:border-emerald-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl filter drop-shadow-xs">{config.emoji}</span>
                    {isSelected && (
                      <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-sm sm:text-base text-slate-900">
                    {config.label.split(' / ')[0]}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                    {config.badge}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Optional context text */}
          <form onSubmit={handleSubmitCustom} className="mt-5 flex gap-2">
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="Optional: What is happening? (e.g. 'Stuck on DP', 'Failed an OA', 'Cracked a hard problem!')"
              className="flex-1 bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-colors shadow-2xs"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer shadow-sm shadow-emerald-600/20"
            >
              {isLoading ? (
                <RotateCw className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">Refresh Quotes</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main Quote Showcase */}
      <div className="space-y-6">
        {/* Dynamic Headline banner */}
        <div className="flex items-center justify-between flex-wrap gap-4 p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700">
              <QuoteIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                AI Mindset Directive • {activeConfig.label}
              </span>
              <p className="text-base sm:text-lg font-medium text-slate-800 mt-0.5">
                "{moodData.headline}"
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectMood(currentMood, customNote)}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all cursor-pointer shadow-2xs disabled:opacity-50"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-600' : 'text-slate-500'}`} />
            <span>Generate More Quotes</span>
          </button>
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {moodData.quotes.map((q, idx) => (
            <div
              key={idx}
              className="group relative bg-white hover:bg-slate-50/70 border border-slate-200 hover:border-emerald-300 rounded-2xl p-6 transition-all duration-200 shadow-xs hover:shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {q.badge && (
                    <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                      {q.badge}
                    </span>
                  )}
                  <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleSpeak(`"${q.quote}" - by ${q.author}. Context: ${q.context}`, idx)}
                      title="Read aloud"
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSpeaking === idx
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleCopy(`"${q.quote}" — ${q.author}`, idx)}
                      title="Copy quote"
                      className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <blockquote className="text-base sm:text-lg font-serif italic text-slate-900 leading-snug">
                  "{q.quote}"
                </blockquote>

                <div className="mt-2 text-right">
                  <span className="text-xs sm:text-sm font-semibold text-emerald-700 font-sans">
                    — {q.author}
                  </span>
                </div>
              </div>

              {/* Engineering Context Pill */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50/80 p-3 rounded-xl border border-slate-200/70">
                  <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <span className="font-semibold text-slate-900">Tech Prep Lens: </span>
                    {q.context}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mindset Coach Advice & Recommended Next Step */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          {/* 2-Minute Mindset Tip */}
          <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-sm mb-2">
              <Lightbulb className="w-4 h-4" />
              <span>2-Minute Mindset Calibration</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {moodData.mindsetTip}
            </p>
          </div>

          {/* Recommended Action */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-slate-800 font-bold text-sm mb-2">
                <Smile className="w-4 h-4 text-emerald-600" />
                <span>Recommended Study Action</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {moodData.recommendedAction}
              </p>
            </div>

            {onNavigateToTab && (
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => onNavigateToTab('subjects')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                >
                  <span>Go to Subjects & Practice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
