import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Sparkles, 
  Play, 
  Download, 
  RotateCw, 
  CheckCircle2, 
  AlertCircle, 
  Film, 
  Smartphone, 
  Monitor, 
  Clock, 
  Layers
} from 'lucide-react';
import { User } from 'firebase/auth';

interface VideoStudioProps {
  user: User | null;
  onOpenAuthModal?: () => void;
}

interface VideoJob {
  id: string;
  operationName: string;
  prompt: string;
  aspectRatio: '16:9' | '9:16';
  status: 'generating' | 'completed' | 'error';
  videoBlobUrl?: string;
  createdAt: string;
  error?: string;
}

export const VideoStudioModule: React.FC<VideoStudioProps> = ({
  user
}) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [activeJob, setActiveJob] = useState<VideoJob | null>(null);
  const [jobHistory, setJobHistory] = useState<VideoJob[]>([]);

  const promptSuggestions = [
    {
      title: 'Distributed System Consensus',
      prompt: 'A sleek 3D visualization of server nodes reaching distributed consensus, glowing emerald data streams connecting databases with holographic transaction confirmations, cinematic lighting.'
    },
    {
      title: 'AVL Tree Self-Balancing',
      prompt: 'A glowing cyan and light green Binary Search Tree automatically rotating and self-balancing into an AVL tree with smooth mathematical node transitions in high-tech space.'
    },
    {
      title: 'Dream Tech Offer Celebration',
      prompt: 'A computer science student smiling with relief after finishing a challenging coding interview, celebratory confetti, modern glass office overlooking a green tech campus, cinematic 4K.'
    },
    {
      title: 'OS Process Scheduling',
      prompt: 'High-speed holographic animation of CPU cores processing multi-threaded tasks, round-robin time slices switching with soft emerald glow, clean tech aesthetic.'
    }
  ];

  // Poll active video job
  useEffect(() => {
    if (!activeJob || activeJob.status !== 'generating') return;

    let isSubscribed = true;
    let pollCount = 0;
    const messages = [
      'Sending prompt to Veo 3 Fast model...',
      'Synthesizing procedural motion vectors...',
      'Rendering cinematic lighting & geometry...',
      'Refining temporal stability & high-resolution frames...',
      'Finalizing video encoding...'
    ];

    const pollInterval = setInterval(async () => {
      pollCount++;
      setStatusMessage(messages[Math.min(pollCount, messages.length - 1)]);

      try {
        const res = await fetch('/api/video-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName: activeJob.operationName }),
        });

        if (!res.ok) throw new Error('Status polling failed');
        const data = await res.json();

        if (data.done) {
          clearInterval(pollInterval);
          if (data.error) {
            if (isSubscribed) {
              setActiveJob(prev => prev ? { ...prev, status: 'error', error: data.error.message || 'Generation failed' } : null);
              setIsLoading(false);
            }
          } else {
            // Fetch the completed video stream
            setStatusMessage('Streaming completed video...');
            const downloadRes = await fetch('/api/video-download', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ operationName: activeJob.operationName }),
            });

            if (!downloadRes.ok) throw new Error('Failed to retrieve video stream');
            const blob = await downloadRes.blob();
            const blobUrl = URL.createObjectURL(blob);

            if (isSubscribed) {
              const finished: VideoJob = {
                ...activeJob,
                status: 'completed',
                videoBlobUrl: blobUrl
              };
              setActiveJob(finished);
              setJobHistory(prev => [finished, ...prev]);
              setIsLoading(false);
              setStatusMessage('');
            }
          }
        }
      } catch (err: any) {
        console.warn('Poll error:', err);
      }
    }, 7000);

    return () => {
      isSubscribed = false;
      clearInterval(pollInterval);
    };
  }, [activeJob?.operationName, activeJob?.status]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setStatusMessage('Initiating Veo 3 Video Generation...');

    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          aspectRatio,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to start video generation');
      }

      const data = await res.json();
      const newJob: VideoJob = {
        id: `vid-${Date.now()}`,
        operationName: data.operationName,
        prompt: prompt.trim(),
        aspectRatio,
        status: 'generating',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setActiveJob(newJob);
    } catch (err: any) {
      console.error(err);
      setIsLoading(false);
      setStatusMessage('');
      alert(err.message || 'Could not generate video. Please try again.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-emerald-50/80 via-white to-slate-50 border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
              <Film className="w-3.5 h-3.5 text-emerald-600" />
              <span>Veo 3 AI Video Generation • veo-3.1-fast-generate-preview</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tech Concept & Motivation Video Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Generate cinematic AI videos from text using Google's Veo 3 model. Visualize complex distributed systems, algorithmic data flows, or inspire your study streak in 16:9 or 9:16 aspect ratio.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xs">
            <Video className="w-5 h-5 text-emerald-600" />
            <div className="text-xs">
              <div className="font-bold text-slate-800">Veo 3 Fast Model</div>
              <div className="text-[11px] text-slate-500">1080p / 720p HD Output</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Generator Form & Presets */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Prompt Your Video</span>
            </h3>

            {/* Prompt Textarea */}
            <div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the technical concept, algorithm simulation, or motivational study scene you want to visualize..."
                rows={4}
                className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all resize-none"
              />
            </div>

            {/* Aspect Ratio Selector (strictly 16:9 or 9:16) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAspectRatio('16:9')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                    aspectRatio === '16:9'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs ring-1 ring-emerald-500/40'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Monitor className="w-4 h-4 text-emerald-600" />
                  <span>16:9 (Landscape)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAspectRatio('9:16')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                    aspectRatio === '9:16'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs ring-1 ring-emerald-500/40'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>9:16 (Portrait / Reel)</span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Generating Video with Veo 3...</span>
                </>
              ) : (
                <>
                  <Film className="w-4 h-4" />
                  <span>Generate Video (Veo 3 Fast)</span>
                </>
              )}
            </button>

            {isLoading && (
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2.5 animate-pulse">
                <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-medium">{statusMessage || 'Processing video with Veo 3...'}</span>
              </div>
            )}
          </div>

          {/* Quick Idea Presets */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-slate-400">
              Quick Concept Presets
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {promptSuggestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(item.prompt)}
                  className="text-left p-3 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 text-xs transition-all cursor-pointer"
                >
                  <div className="font-bold text-slate-900 truncate mb-1">{item.title}</div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{item.prompt}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Active Video Player & Preview */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Play className="w-4 h-4 text-emerald-600" />
                  <span>Video Preview Screen</span>
                </h3>
                {activeJob && (
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md ${
                    activeJob.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : activeJob.status === 'generating'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200 animate-pulse'
                      : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}>
                    {activeJob.status}
                  </span>
                )}
              </div>

              {/* Player View */}
              {activeJob?.videoBlobUrl ? (
                <div className="space-y-4 animate-fadeIn">
                  <div className={`overflow-hidden rounded-2xl bg-black flex items-center justify-center mx-auto shadow-md ${
                    activeJob.aspectRatio === '9:16' ? 'max-w-[280px] aspect-[9/16]' : 'w-full aspect-[16/9]'
                  }`}>
                    <video
                      src={activeJob.videoBlobUrl}
                      controls
                      autoPlay
                      loop
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="font-bold text-slate-800 mb-1">Generated Prompt:</div>
                    <p className="text-slate-600 italic">"{activeJob.prompt}"</p>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={activeJob.videoBlobUrl}
                      download={`veo-concept-${Date.now()}.mp4`}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Video (.MP4)</span>
                    </a>
                  </div>
                </div>
              ) : isLoading ? (
                /* Generating Placeholder */
                <div className="h-64 rounded-2xl bg-gradient-to-b from-emerald-50/50 to-slate-50 border border-dashed border-emerald-300 flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs animate-bounce">
                    <Film className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Rendering with Veo 3</h4>
                  <p className="text-xs text-slate-500 max-w-xs">{statusMessage}</p>
                  <div className="w-36 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full animate-pulse w-2/3" />
                  </div>
                </div>
              ) : (
                /* Empty state */
                <div className="h-64 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-2">
                  <Video className="w-10 h-10 text-slate-300" />
                  <p className="text-xs font-medium text-slate-500">
                    No video generated yet. Choose an aspect ratio and enter a prompt to create your video clip!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
