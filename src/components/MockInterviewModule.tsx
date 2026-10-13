import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Play, 
  RotateCw, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Radio, 
  HelpCircle, 
  ChevronRight, 
  Trophy, 
  UserCheck, 
  RefreshCw,
  Brain,
  Database,
  Cpu,
  Network,
  Boxes,
  Code2,
  Server,
  StopCircle,
  History,
  TrendingUp,
  Clock,
  BrainCircuit,
  Globe,
  Edit3,
  MessageSquare,
  Timer,
  Pause,
  Lightbulb,
  Check,
  FileText
} from 'lucide-react';
import { User } from 'firebase/auth';
import { SubjectId, MockInterviewSession, InterviewRoundLog } from '../types';
import { InterviewHistory } from './InterviewHistory';
import { 
  loadMockInterviewHistory, 
  addMockInterviewSession, 
  deleteMockInterviewSession, 
  clearMockInterviewHistory,
  getSampleMockInterviewHistory,
  saveMockInterviewHistory
} from '../utils/storage';
import { 
  saveInterviewSessionToFirestore, 
  loadInterviewSessionsFromFirestore, 
  deleteInterviewSessionFromFirestore 
} from '../utils/firestoreSync';

interface MockInterviewModuleProps {
  onInterviewCompleted?: (score: number, subject: string, rounds: number) => void;
  onNavigateToTab?: (tab: string) => void;
  user?: User | null;
}

interface InterviewQuestion {
  questionNumber: number;
  totalRounds: number;
  subjectId: string;
  subjectTitle: string;
  difficulty: string;
  question: string;
  spokenIntro: string;
  keyPointsExpected: string[];
  hint: string;
  sampleAnswer?: string;
}

interface EvaluationResult {
  score: number;
  rating: string;
  spokenFeedback: string;
  strengths: string[];
  missingConcepts: string[];
  idealAnswer: string;
  followUpQuestion?: string;
  isInterviewComplete?: boolean;
}

interface QuestionHistoryItem {
  question: InterviewQuestion;
  candidateAnswer: string;
  evaluation: EvaluationResult;
}

export const MockInterviewModule: React.FC<MockInterviewModuleProps> = ({
  onInterviewCompleted,
  onNavigateToTab,
  user
}) => {
  // Navigation View: 'interview' | 'history'
  const [moduleView, setModuleView] = useState<'interview' | 'history'>('interview');
  const [interviewHistory, setInterviewHistory] = useState<MockInterviewSession[]>(() => loadMockInterviewHistory());
  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(false);
  const sessionSavedRef = useRef<boolean>(false);

  // Setup State
  const [selectedSubject, setSelectedSubject] = useState<{ id: string; title: string }>({
    id: 'dbms',
    title: 'Database Management Systems (DBMS)'
  });
  const [difficulty, setDifficulty] = useState<'Entry-Level' | 'Mid-Level' | 'Senior'>('Mid-Level');
  const [totalRounds, setTotalRounds] = useState<number>(3);
  const [interviewerPersona, setInterviewerPersona] = useState<string>('Alex (Staff Systems Engineer)');

  // Interview Session State
  const [sessionActive, setSessionActive] = useState(false);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState<boolean>(false);
  
  // Voice & Text Input State
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [micSupported, setMicSupported] = useState<boolean>(true);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);

  // Resilient Microphone & Audio Capture
  const [micPermissionDenied, setMicPermissionDenied] = useState<boolean>(false);
  const [micErrorMessage, setMicErrorMessage] = useState<string | null>(null);
  const [isTranscribingAudio, setIsTranscribingAudio] = useState<boolean>(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isMicTesting, setIsMicTesting] = useState<boolean>(false);
  const [micTestPassed, setMicTestPassed] = useState<boolean | null>(null);
  const [micTestVolume, setMicTestVolume] = useState<number>(0);

  // Response Timer State (2-minute countdown per question)
  const [timerSeconds, setTimerSeconds] = useState<number>(120);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Audio Output State
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);

  // Evaluation & Feedback State
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<EvaluationResult | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [sessionHistory, setSessionHistory] = useState<QuestionHistoryItem[]>([]);
  const [isInterviewFinished, setIsInterviewFinished] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const recordingTimerRef = useRef<any>(null);
  const isRecordingRef = useRef<boolean>(false);
  const liveTranscriptRef = useRef<string>('');

  // Timer countdown effect
  useEffect(() => {
    let interval: any = null;
    if (sessionActive && isTimerRunning && timerSeconds > 0 && !currentEvaluation && !isInterviewFinished) {
      interval = setInterval(() => {
        setTimerSeconds(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionActive, isTimerRunning, timerSeconds, currentEvaluation, isInterviewFinished]);

  // Cloud sync with Firestore for authenticated users
  useEffect(() => {
    if (user?.uid) {
      loadInterviewSessionsFromFirestore(user.uid).then(cloudSessions => {
        if (cloudSessions && cloudSessions.length > 0) {
          setInterviewHistory(prev => {
            const map = new Map<string, MockInterviewSession>();
            cloudSessions.forEach(s => map.set(s.id, s));
            prev.forEach(s => {
              if (!map.has(s.id)) map.set(s.id, s);
            });
            const merged = Array.from(map.values()).sort(
              (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
            saveMockInterviewHistory(merged);
            return merged;
          });
          setIsCloudSynced(true);
        } else {
          // If no cloud sessions exist yet, sync local sessions to cloud
          const local = loadMockInterviewHistory();
          local.forEach(s => saveInterviewSessionToFirestore(user.uid, s));
          setIsCloudSynced(true);
        }
      }).catch(err => {
        console.warn('Could not sync interview history with Firestore:', err);
      });
    } else {
      setIsCloudSynced(false);
    }
  }, [user]);

  // History action handlers
  const handleDeleteSession = (sessionId: string) => {
    const updated = deleteMockInterviewSession(sessionId);
    setInterviewHistory(updated);
    if (user?.uid) {
      deleteInterviewSessionFromFirestore(user.uid, sessionId);
    }
  };

  const handleClearHistory = () => {
    const updated = clearMockInterviewHistory();
    setInterviewHistory(updated);
  };

  const handleRestoreSampleHistory = () => {
    const samples = getSampleMockInterviewHistory();
    saveMockInterviewHistory(samples);
    setInterviewHistory(samples);
  };

  const handleRetakeSessionFromHistory = (subId: string, subTitle: string, diff: 'Entry-Level' | 'Mid-Level' | 'Senior') => {
    setSelectedSubject({ id: subId, title: subTitle });
    setDifficulty(diff);
    setSessionActive(false);
    setIsInterviewFinished(false);
    setModuleView('interview');
  };

  // Save interview session to history and cloud
  const saveCompletedSession = (historyItems: QuestionHistoryItem[]) => {
    if (historyItems.length === 0 || sessionSavedRef.current) return;
    sessionSavedRef.current = true;

    const avgScore = Math.round(
      historyItems.reduce((acc, curr) => acc + curr.evaluation.score, 0) / Math.max(1, historyItems.length)
    );

    const verdict = avgScore >= 75 
      ? 'Recommended to Onsite' 
      : avgScore >= 60 
      ? 'Borderline / Follow-Up Needed' 
      : 'Needs Additional Practice';

    const transcriptSummary = historyItems.map(h => h.evaluation.spokenFeedback).slice(0, 2).join(' ') ||
      `Candidate completed ${historyItems.length} screening questions in ${selectedSubject.title} with an average score of ${avgScore}%.`;

    const allStrengths = Array.from(new Set(historyItems.flatMap(h => h.evaluation.strengths || []))).slice(0, 5);
    const allGrowth = Array.from(new Set(historyItems.flatMap(h => h.evaluation.missingConcepts || []))).slice(0, 5);

    const roundsLog: InterviewRoundLog[] = historyItems.map((h, idx) => ({
      roundNumber: idx + 1,
      question: h.question.question,
      spokenIntro: h.question.spokenIntro,
      candidateAnswer: h.candidateAnswer,
      score: h.evaluation.score,
      rating: h.evaluation.rating,
      spokenFeedback: h.evaluation.spokenFeedback,
      strengths: h.evaluation.strengths || [],
      missingConcepts: h.evaluation.missingConcepts || [],
      idealAnswer: h.evaluation.idealAnswer,
      keyPointsExpected: h.question.keyPointsExpected
    }));

    const now = new Date();
    const newSession: MockInterviewSession = {
      id: `mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId: user?.uid,
      timestamp: now.toISOString(),
      formattedDate: now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      subjectId: selectedSubject.id,
      subjectTitle: selectedSubject.title,
      difficulty,
      interviewerPersona,
      totalRounds,
      completedRounds: historyItems.length,
      averageScore: avgScore,
      verdict,
      transcriptSummary,
      strengthsSummary: allStrengths,
      growthAreas: allGrowth,
      rounds: roundsLog,
      durationSeconds: Math.max(60, historyItems.length * 90)
    };

    const updated = addMockInterviewSession(newSession);
    setInterviewHistory(updated);

    if (user?.uid) {
      saveInterviewSessionToFirestore(user.uid, newSession);
    }
  };

  const SUBJECTS = [
    { id: 'dbms', title: 'Database Management Systems', icon: Database, desc: 'ACID, Indexing, B+ Trees, Normalization, Sharding' },
    { id: 'os', title: 'Operating Systems', icon: Cpu, desc: 'Deadlocks, Paging, Context Switch, Synchronization, Virtual Memory' },
    { id: 'cn', title: 'Computer Networks', icon: Network, desc: 'TCP/IP Handshake, DNS, HTTP/2/3, Socket I/O, Subnetting' },
    { id: 'oops', title: 'OOPs & Design Patterns', icon: Boxes, desc: 'SOLID, Polymorphism, Memory layout, Factory/Singleton' },
    { id: 'dsa', title: 'DSA Core Architectural Logic', icon: Code2, desc: 'Complexity tradeoffs, Dynamic Programming, Graph routing' },
    { id: 'ml', title: 'Machine Learning & AI Engineering', icon: BrainCircuit, desc: 'Transformers, RAG, Regularization, Precision/Recall, Loss functions' },
    { id: 'webdev', title: 'Fullstack Web Development', icon: Globe, desc: 'Event Loop, React Reconciliation, Security (CORS/CSRF), REST vs GraphQL' },
    { id: 'system_design', title: 'System Design & Scalability', icon: Server, desc: 'Caching, Load Balancers, Distributed Consistency, Rate Limiting' },
  ];

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Helper: Transcribe recorded audio with server-side Gemini
  const transcribeRecordedBlob = async (blob: Blob) => {
    setIsTranscribingAudio(true);
    setMicErrorMessage(null);
    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
      });
      reader.readAsDataURL(blob);
      const dataUrl = await base64Promise;

      const res = await fetch('/api/mock-interview/transcribe-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64: dataUrl,
          mimeType: blob.type || 'audio/webm'
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.text) {
          setTranscript(prev => {
            const trimmed = prev.trim();
            const combined = trimmed ? `${trimmed} ${data.text}` : data.text;
            liveTranscriptRef.current = combined;
            return combined;
          });
        }
      } else {
        const errJson = await res.json().catch(() => ({}));
        console.warn('Audio transcription error:', errJson);
      }
    } catch (err: any) {
      console.warn('Audio transcription failed:', err);
    } finally {
      setIsTranscribingAudio(false);
    }
  };

  // Hardware Microphone Test
  const handleTestMicrophone = async () => {
    setIsMicTesting(true);
    setMicTestPassed(null);
    setMicErrorMessage(null);
    setMicPermissionDenied(false);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone API not supported in this browser.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let count = 0;
      let maxVol = 0;

      const interval = setInterval(() => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
        const avg = Math.min(100, Math.round(((sum / dataArray.length) / 128) * 100));
        setMicTestVolume(avg);
        if (avg > maxVol) maxVol = avg;
        count++;

        if (count >= 24) {
          clearInterval(interval);
          stream.getTracks().forEach(t => t.stop());
          try { audioCtx.close(); } catch (e) {}
          setIsMicTesting(false);
          setMicTestPassed(true);
        }
      }, 125);
    } catch (err: any) {
      console.warn('Mic test error:', err);
      setIsMicTesting(false);
      setMicTestPassed(false);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setMicPermissionDenied(true);
        setMicErrorMessage('Microphone access was denied. Please allow microphone permissions in your browser URL bar (lock/camera icon).');
      } else {
        setMicErrorMessage(err.message || 'Microphone test failed.');
      }
    }
  };

  // Initialize Speech Recognition & Synthesis on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = 'en-US';

          recognition.onresult = (event: any) => {
            let currentText = '';
            for (let i = 0; i < event.results.length; i++) {
              currentText += event.results[i][0].transcript + ' ';
            }
            const clean = currentText.trim();
            if (clean) {
              setTranscript(clean);
              liveTranscriptRef.current = clean;
            }
          };

          recognition.onerror = (event: any) => {
            console.warn('Speech recognition status:', event.error);
            // If Web Speech API throws not-allowed inside iframe, MediaRecorder still records!
          };

          recognition.onend = () => {
            // If still actively recording, restart Web Speech recognition
            if (isRecordingRef.current) {
              try {
                recognition.start();
              } catch (e) {
                // MediaRecorder is capturing anyway
              }
            }
          };

          recognitionRef.current = recognition;
        } catch (e) {
          console.warn('SpeechRecognition initialization error:', e);
        }
      }
    }

    return () => {
      stopRecording();
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Voice output function
  const speakText = (text: string) => {
    if (!voiceEnabled || !synthRef.current) return;
    synthRef.current.cancel(); // cancel any active speech

    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick natural voice if available
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Start Voice Recording (Dual-Engine: Live Web Speech + MediaRecorder Audio Stream)
  const startRecording = async () => {
    stopSpeaking();
    setMicErrorMessage(null);
    setMicPermissionDenied(false);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setMicErrorMessage('Audio recording is not supported in this browser. Please type your answer below.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      audioStreamRef.current = stream;

      // Real audio visualizer
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const audioCtx = new AudioCtx();
          audioContextRef.current = audioCtx;
          const source = audioCtx.createMediaStreamSource(stream);
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          source.connect(analyser);
          analyserRef.current = analyser;

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          const updateAudioLevel = () => {
            if (!isRecordingRef.current) return;
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
            const avg = sum / dataArray.length;
            const normalized = Math.min(100, Math.round((avg / 128) * 100));
            setAudioLevel(normalized);
            animFrameRef.current = requestAnimationFrame(updateAudioLevel);
          };
          updateAudioLevel();
        }
      } catch (audioErr) {
        console.warn('AudioContext visualization setup warning:', audioErr);
      }

      // MediaRecorder setup
      audioChunksRef.current = [];
      let mimeType = '';
      if (typeof MediaRecorder !== 'undefined') {
        if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          mimeType = 'audio/webm;codecs=opus';
        } else if (MediaRecorder.isTypeSupported('audio/webm')) {
          mimeType = 'audio/webm';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        }
      }

      let recorder: MediaRecorder | null = null;
      if (typeof MediaRecorder !== 'undefined') {
        recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        recorder.onstop = async () => {
          if (audioChunksRef.current.length > 0) {
            const finalBlob = new Blob(audioChunksRef.current, {
              type: recorder?.mimeType || 'audio/webm'
            });
            const url = URL.createObjectURL(finalBlob);
            setRecordedAudioUrl(url);

            const words = liveTranscriptRef.current.trim().split(/\s+/).filter(Boolean).length;
            if (words < 3 && finalBlob.size > 1500) {
              await transcribeRecordedBlob(finalBlob);
            }
          }
        };

        recorder.start(250);
      }

      setIsRecording(true);
      isRecordingRef.current = true;
      setRecordingSeconds(0);

      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);

      // Start Web Speech API concurrently for live transcription
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (recErr) {
          console.warn('SpeechRecognition start warning (MediaRecorder active):', recErr);
        }
      }
    } catch (err: any) {
      console.warn('Microphone access notice:', err?.message || err);
      setIsRecording(false);
      isRecordingRef.current = false;
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setMicPermissionDenied(true);
        setMicErrorMessage('Microphone access was denied or is blocked by browser settings. Type mode is ready below, or click "Sample Answer" to test the AI evaluation.');
        setInputMode('text');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setMicErrorMessage('No microphone device found on your system. Switched to typing mode.');
        setInputMode('text');
      } else {
        setMicErrorMessage(`Microphone access note: ${err.message || 'Could not access mic'}. Switched to typing mode.`);
        setInputMode('text');
      }
    }
  };

  // Stop Voice Recording
  const stopRecording = () => {
    setIsRecording(false);
    isRecordingRef.current = false;

    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setAudioLevel(0);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        console.warn('Error stopping MediaRecorder:', e);
      }
    }

    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(t => t.stop());
      audioStreamRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        audioContextRef.current.close();
      } catch (e) {
        // ignore
      }
    }
  };

  // Fallback question generator if offline
  const useFallbackQuestion = (roundNumber: number) => {
    const list = [
      {
        questionNumber: roundNumber,
        totalRounds,
        subjectId: selectedSubject.id,
        subjectTitle: selectedSubject.title,
        difficulty,
        question: selectedSubject.id === 'os' 
          ? "How does a CPU context switch occur between threads versus processes, and what is the difference between user-level and kernel-level threads?"
          : selectedSubject.id === 'cn'
          ? "Walk me through the exact packet sequence in a TCP 3-way handshake and describe the role of the TIME_WAIT state during termination."
          : selectedSubject.id === 'dsa'
          ? "When should you choose QuickSelect over a Min-Heap for finding the K-th largest element in an array? Compare their time and space complexities."
          : selectedSubject.id === 'oops'
          ? "Explain the Liskov Substitution Principle (LSP) with a concrete violation example, and explain how VTABLE and VPTR enable dynamic dispatch under the hood."
          : selectedSubject.id === 'ml'
          ? "How does Multi-Head Self-Attention work in Transformers, and why does computational complexity scale quadratically with sequence length O(N^2)?"
          : selectedSubject.id === 'webdev'
          ? "Explain the difference between Reflow (Layout) and Repaint in browser rendering. How does the browser Event Loop coordinate microtasks versus rendering?"
          : selectedSubject.id === 'system_design'
          ? "How do you design a distributed Rate Limiter at scale? Compare Token Bucket with Sliding Window Counter, and address multi-server synchronization."
          : "Can you explain the difference between Clustered and Non-Clustered indexing in relational databases, and how B+ Trees optimize range queries?",
        spokenIntro: "Welcome! Let's examine a core technical screening question.",
        keyPointsExpected: [
          "State baseline definition and hardware/memory representation",
          "Identify execution lifecycle and step-by-step mechanics",
          "Contrast operational tradeoffs and edge failure modes"
        ],
        hint: "Focus on memory/disk layout, operational invariants, and time vs space tradeoffs.",
        sampleAnswer: selectedSubject.id === 'os'
          ? "A context switch saves the current CPU execution state—registers, stack pointer, program counter—into the PCB or TCB, and restores the next entity. Thread switching within the same process is fast because threads share the same virtual address space. Process switching requires changing memory mappings, which invalidates the TLB cache. User-level threads are scheduled in user space without kernel mode traps, whereas kernel-level threads are independently scheduled by the OS kernel."
          : selectedSubject.id === 'cn'
          ? "The TCP 3-way handshake begins when the client sends a SYN packet with a random initial sequence number X. The server responds with SYN-ACK with ACK X+1 and its own sequence number Y. The client completes the handshake by sending an ACK with Y+1. When closing, four FIN/ACK packets tear down the connection. The side initiating closure enters TIME_WAIT for 2 times Maximum Segment Lifetime, or roughly 2 to 4 minutes. This prevents stale packets in flight from corrupting a future connection on the same port."
          : "A clustered index determines the physical order of rows on disk, so you can only have one per table, usually the primary key. Non-clustered indexes are auxiliary structures that hold pointers back to the actual table rows. Modern databases use B+ trees where all data resides at the leaf nodes, which are linked together sequentially. This makes range queries like BETWEEN or greater-than extremely fast because you traverse to the first leaf node in O(log N) and then scan the linked leaves."
      }
    ];

    const q = list[0];
    setCurrentQuestion(q);
    setTimeout(() => speakText(`${q.spokenIntro} ${q.question}`), 300);
  };

  const handleLoadSampleAnswer = () => {
    if (!currentQuestion) return;
    const sample = currentQuestion.sampleAnswer || 
      `In ${selectedSubject.title}, this architectural component isolates memory, manages state transitions, and enforces deterministic invariants to optimize performance and prevent concurrency anomalies.`;
    setTranscript(sample);
    liveTranscriptRef.current = sample;
    setMicErrorMessage(null);
  };

  // Fetch question from Gemini server endpoint
  const fetchQuestion = async (roundNumber: number) => {
    stopRecording();
    setIsLoadingQuestion(true);
    setCurrentEvaluation(null);
    setShowHint(false);
    setTranscript('');
    liveTranscriptRef.current = '';
    setRecordedAudioUrl(null);
    setMicErrorMessage(null);
    setTimerSeconds(120);
    setIsTimerRunning(true);

    try {
      const res = await fetch('/api/mock-interview/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId: selectedSubject.id,
          subjectTitle: selectedSubject.title,
          difficulty,
          round: roundNumber,
          totalRounds,
          interviewerName: interviewerPersona,
          previousQuestions: sessionHistory.map(h => h.question.question)
        })
      });

      if (res.ok) {
        const data: InterviewQuestion = await res.json();
        setCurrentQuestion(data);
        // Automatically speak the question out loud if voice is enabled
        const speechContent = `${data.spokenIntro} ${data.question}`;
        setTimeout(() => speakText(speechContent), 300);
      } else {
        useFallbackQuestion(roundNumber);
      }
    } catch (err) {
      console.error('Failed to load question, using fallback:', err);
      useFallbackQuestion(roundNumber);
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  // Start whole interview
  const handleStartInterview = () => {
    setSessionActive(true);
    setCurrentRound(1);
    setSessionHistory([]);
    setIsInterviewFinished(false);
    sessionSavedRef.current = false;
    fetchQuestion(1);
  };

  // Evaluate candidate answer with Gemini
  const handleEvaluateAnswer = async () => {
    if (!currentQuestion || !transcript.trim()) return;
    stopRecording();
    stopSpeaking();
    setIsEvaluating(true);

    try {
      const res = await fetch('/api/mock-interview/evaluate-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId: selectedSubject.id,
          subjectTitle: selectedSubject.title,
          difficulty,
          question: currentQuestion.question,
          candidateAnswer: transcript,
          keyPointsExpected: currentQuestion.keyPointsExpected,
          round: currentRound,
          totalRounds,
          interviewerName: interviewerPersona
        })
      });

      if (res.ok) {
        const evalData: EvaluationResult = await res.json();
        setCurrentEvaluation(evalData);
        const updatedHistory = [
          ...sessionHistory,
          {
            question: currentQuestion,
            candidateAnswer: transcript,
            evaluation: evalData
          }
        ];
        setSessionHistory(updatedHistory);

        // Speak the evaluation out loud
        speakText(evalData.spokenFeedback);

        if (evalData.isInterviewComplete || currentRound >= totalRounds) {
          setIsInterviewFinished(true);
          saveCompletedSession(updatedHistory);
          onInterviewCompleted?.(evalData.score, selectedSubject.title, totalRounds);
        }
      }
    } catch (err) {
      console.error('Evaluation error:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Proceed to next round
  const handleNextRound = () => {
    stopSpeaking();
    if (currentRound < totalRounds) {
      const nextR = currentRound + 1;
      setCurrentRound(nextR);
      fetchQuestion(nextR);
    } else {
      setIsInterviewFinished(true);
      saveCompletedSession(sessionHistory);
    }
  };

  // Calculate final average score
  const finalAverageScore = Math.round(
    sessionHistory.reduce((acc, curr) => acc + curr.evaluation.score, 0) / Math.max(1, sessionHistory.length)
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-50/90 via-white to-slate-50 border border-emerald-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                <Radio className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
                Gemini 3.8 Flash Voice Engine
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-semibold">
                Real-Time Speech Screening
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 font-semibold">
                Instant FAANG Evaluation
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              AI Voice Mock Screening Interview
            </h1>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Practice authentic, spoken technical phone screening rounds with an AI Staff Engineer. Choose subjects like <strong>DBMS, Operating Systems, or Computer Networks</strong>, listen to the interviewer articulate the questions aloud, speak your response into your microphone, and receive instant, actionable feedback.
            </p>
          </div>

          {/* Voice Output Toggle */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-2.5 shadow-2xs flex-shrink-0">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Voice Synthesis</span>
              <button
                onClick={() => {
                  if (voiceEnabled) stopSpeaking();
                  setVoiceEnabled(prev => !prev);
                }}
                className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                  voiceEnabled
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 text-slate-500 border border-slate-200'
                }`}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4" />}
                <span>{voiceEnabled ? 'Voice Active' : 'Muted'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              {voiceEnabled ? 'AI speaks questions & feedback aloud' : 'Text transcript only'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Sub-Navigation View Toggle: Screening Room vs Interview History */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setModuleView('interview')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              moduleView === 'interview'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Mic className={`w-4 h-4 ${moduleView === 'interview' ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <span>Spoken Screening Room</span>
            {sessionActive && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setModuleView('history')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              moduleView === 'history'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <History className={`w-4 h-4 ${moduleView === 'history' ? 'text-teal-400' : 'text-teal-600'}`} />
            <span>Interview History & Logs</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
              moduleView === 'history' ? 'bg-slate-800 text-teal-300' : 'bg-slate-100 text-slate-600'
            }`}>
              {interviewHistory.length}
            </span>
          </button>
        </div>

        {moduleView === 'interview' && interviewHistory.length > 0 && (
          <button
            onClick={() => setModuleView('history')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Past Sessions Growth Log ({interviewHistory.length})</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* 3. Conditional View: InterviewHistory OR Active/Setup Screening */}
      {moduleView === 'history' ? (
        <InterviewHistory
          history={interviewHistory}
          onDeleteSession={handleDeleteSession}
          onClearHistory={handleClearHistory}
          onRetakeSession={handleRetakeSessionFromHistory}
          onStartNewInterview={() => {
            setModuleView('interview');
            setSessionActive(false);
            setIsInterviewFinished(false);
          }}
          onRestoreSampleHistory={handleRestoreSampleHistory}
          isCloudSynced={isCloudSynced}
        />
      ) : !sessionActive ? (
        /* ================= SETUP SCREEN ================= */
        <div className="space-y-6">
          {/* Visual 4-Step Interactive Guide */}
          <div className="bg-gradient-to-r from-emerald-50/80 via-white to-teal-50/80 border border-emerald-200/90 rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  How It Works • 4-Step Screening Walkthrough
                </h3>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Voice or Silent Text Mode Supported
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center">
                  1
                </div>
                <h4 className="text-xs font-bold text-slate-900">Choose Subject & Level</h4>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Select DBMS, Operating Systems, Networks, DSA, OOPs, ML, or Web Dev with target difficulty.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 font-extrabold text-xs flex items-center justify-center">
                  2
                </div>
                <h4 className="text-xs font-bold text-slate-900">Interviewer Asks Question</h4>
                <p className="text-[11px] text-slate-500 leading-snug">
                  The AI Staff Engineer articulates realistic technical phone screening questions verbally (or read on screen).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 font-extrabold text-xs flex items-center justify-center">
                  3
                </div>
                <h4 className="text-xs font-bold text-slate-900">Speak or Type Your Answer</h4>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Answer verbally via microphone or type directly. You can also click &ldquo;Try Sample Answer&rdquo; to test the evaluator!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 font-extrabold text-xs flex items-center justify-center">
                  4
                </div>
                <h4 className="text-xs font-bold text-slate-900">Instant AI Evaluation</h4>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Receive real-time 0–100 scoring, hire recommendation, concepts nailed, missing edge cases, and Staff model answers.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
            <div>
              <h2 className="text-lg font-bold text-slate-900">1. Select Screening Subject</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose the core technical domain for your screening round
              </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4">
              {SUBJECTS.map((sub) => {
                const Icon = sub.icon;
                const isSelected = selectedSubject.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubject({ id: sub.id, title: sub.title })}
                    className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900 block leading-snug">{sub.title}</span>
                      <span className="text-[11px] text-slate-500 mt-1 block line-clamp-2">{sub.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty & Rounds Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            {/* Difficulty */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                2. Experience Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Entry-Level', 'Mid-Level', 'Senior'] as const).map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setDifficulty(lvl)}
                    className={`py-2 px-1 text-center text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      difficulty === lvl
                        ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Rounds */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                3. Screening Depth
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[3, 5].map(r => (
                  <button
                    key={r}
                    onClick={() => setTotalRounds(r)}
                    className={`py-2 px-3 text-center text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      totalRounds === r
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {r} Screening Questions
                  </button>
                ))}
              </div>
            </div>

            {/* Persona */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                4. Interviewer Persona
              </label>
              <select
                value={interviewerPersona}
                onChange={(e) => setInterviewerPersona(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-400"
              >
                <option value="Alex (Staff Systems Engineer)">Alex (Staff Systems Engineer - Technical Rigor)</option>
                <option value="Sarah (Engineering Manager)">Sarah (Engineering Manager - Tradeoffs & Clarity)</option>
                <option value="David (Senior Backend Architect)">David (Senior Backend Architect - Scalability)</option>
              </select>
            </div>
          </div>

          {/* Launch & Test Microphone Button */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleTestMicrophone}
                disabled={isMicTesting}
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer transition-colors shadow-2xs"
              >
                <Mic className={`w-3.5 h-3.5 ${isMicTesting ? 'text-rose-600 animate-pulse' : 'text-emerald-600'}`} />
                <span>{isMicTesting ? 'Testing (Speak into mic)...' : 'Test Microphone'}</span>
              </button>

              {isMicTesting && (
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                  <div className="w-20 h-2 bg-slate-300 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-75" 
                      style={{ width: `${micTestVolume}%` }} 
                    />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-700">{micTestVolume}%</span>
                </div>
              )}

              {micTestPassed === true && !isMicTesting && (
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Mic verified & active
                </span>
              )}

              {micTestPassed === false && !isMicTesting && (
                <span className="text-xs font-semibold text-rose-600 flex items-center gap-1.5 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                  Mic blocked or unreadable
                </span>
              )}
            </div>

            <button
              onClick={handleStartInterview}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-md cursor-pointer transition-all flex items-center gap-2 group hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Voice Interview Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      ) : (
        /* ================= ACTIVE INTERVIEW SESSION ================= */
        <div className="space-y-6">
          {/* Top Session Progress Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                {selectedSubject.title}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Round {currentRound} of {totalRounds} • {difficulty}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSessionActive(false)}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                End Session
              </button>
            </div>
          </div>

          {/* Main Interview Chamber */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Question & Spoken Response (Left 8 Cols) */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              {isLoadingQuestion ? (
                <div className="py-16 text-center space-y-3">
                  <RotateCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
                  <p className="text-sm font-bold text-slate-700">
                    Interviewer is formulating your screening question...
                  </p>
                  <p className="text-xs text-slate-400">
                    Tailoring depth based on {selectedSubject.title} and {difficulty} standards
                  </p>
                </div>
              ) : currentQuestion ? (
                <>
                  {/* Interviewer Speech Bubble */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                          {interviewerPersona[0]}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block leading-tight">{interviewerPersona}</span>
                          <span className="text-[10px] text-slate-400">Technical Screening Interviewer</span>
                        </div>
                      </div>

                      {/* Listen Question Button */}
                      <button
                        onClick={() => speakText(`${currentQuestion.spokenIntro} ${currentQuestion.question}`)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                          isSpeaking
                            ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{isSpeaking ? 'Speaking...' : 'Listen Question'}</span>
                      </button>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 text-slate-800">
                      <p className="text-xs text-emerald-800 font-semibold mb-1 italic">
                        &ldquo;{currentQuestion.spokenIntro}&rdquo;
                      </p>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                        {currentQuestion.question}
                      </h3>
                    </div>

                    {/* Hint Toggle */}
                    <div className="flex items-center justify-between text-xs">
                      <button
                        onClick={() => setShowHint(prev => !prev)}
                        className="text-slate-500 hover:text-emerald-700 flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{showHint ? 'Hide Hint' : 'Request Interviewer Hint'}</span>
                      </button>
                    </div>

                    {showHint && (
                      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 animate-fadeIn">
                        <strong>Hint:</strong> {currentQuestion.hint}
                      </div>
                    )}
                  </div>

                  {/* Candidate Response Area */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    {/* Error Banner if microphone blocked or failed */}
                    {micErrorMessage && (
                      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
                        <div className="flex items-start gap-2.5">
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-amber-950">Microphone Notice</p>
                            <p className="text-amber-800 mt-0.5 leading-relaxed">{micErrorMessage}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            onClick={() => {
                              setInputMode('text');
                              setMicErrorMessage(null);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-amber-200/70 hover:bg-amber-200 text-amber-950 font-bold text-[11px] cursor-pointer transition-colors"
                          >
                            Type Answer
                          </button>
                          <button
                            onClick={() => {
                              handleLoadSampleAnswer();
                              setMicErrorMessage(null);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-[11px] cursor-pointer transition-colors"
                          >
                            Sample Answer
                          </button>
                          <button
                            onClick={() => setMicErrorMessage(null)}
                            className="text-amber-600 hover:text-amber-900 font-bold text-xs cursor-pointer px-1.5 py-0.5"
                            title="Dismiss"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Mode Selector & Quick Tools */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                        <button
                          onClick={() => setInputMode('voice')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            inputMode === 'voice'
                              ? 'bg-white text-slate-900 shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <Mic className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Voice Mode</span>
                        </button>
                        <button
                          onClick={() => setInputMode('text')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            inputMode === 'text'
                              ? 'bg-white text-slate-900 shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                          <span>Type Mode</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleLoadSampleAnswer}
                          className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                          title="Insert a realistic Staff Engineer response to test evaluation instantly"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                          <span>Insert Sample Answer</span>
                        </button>

                        {transcript && (
                          <button
                            onClick={() => {
                              setTranscript('');
                              liveTranscriptRef.current = '';
                              setRecordedAudioUrl(null);
                            }}
                            className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Primary Microphone Controls Bar */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={isRecording ? stopRecording : startRecording}
                          disabled={isTranscribingAudio}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition-all ${
                            isRecording
                              ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white hover:scale-[1.02]'
                          }`}
                        >
                          {isRecording ? <StopCircle className="w-4 h-4 fill-white" /> : <Mic className="w-4 h-4" />}
                          <span>
                            {isRecording 
                              ? `Stop Recording (${formatTime(recordingSeconds)})` 
                              : 'Speak via Microphone'}
                          </span>
                        </button>

                        {isRecording && (
                          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                            <span>Listening Live ({formatTime(recordingSeconds)})</span>
                          </div>
                        )}

                        {isTranscribingAudio && (
                          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                            <RotateCw className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                            <span>Transcribing audio with Gemini AI...</span>
                          </div>
                        )}
                      </div>

                      {/* Live Audio Activity Waveform */}
                      {isRecording ? (
                        <div className="flex items-center gap-1.5 h-8 bg-slate-900 rounded-xl px-4 py-1">
                          {[...Array(14)].map((_, i) => (
                            <span
                              key={i}
                              className="w-1 bg-emerald-400 rounded-full transition-all duration-75"
                              style={{ 
                                height: `${Math.max(4, Math.min(26, ((audioLevel * (i % 3 + 1.2)) % 26)))}px` 
                              }}
                            />
                          ))}
                          <span className="text-[10px] font-mono font-bold text-emerald-400 ml-1">
                            {audioLevel}%
                          </span>
                        </div>
                      ) : recordedAudioUrl ? (
                        <div className="flex items-center gap-2 text-xs text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
                          <Volume2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="text-[11px] font-medium text-slate-500">Recorded:</span>
                          <audio src={recordedAudioUrl} controls className="h-6 w-44" />
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-400 font-medium hidden sm:block">
                          Dual-engine: Live Speech + Gemini AI transcription
                        </div>
                      )}
                    </div>

                    {/* Transcript Box */}
                    <div className="relative">
                      <textarea
                        rows={4}
                        placeholder={
                          isRecording
                            ? 'Speaking into microphone... Your words will appear here in real-time.'
                            : inputMode === 'voice'
                            ? 'Click "Speak via Microphone" above and speak your answer verbally. Or click "Insert Sample Answer" to test.'
                            : 'Type your detailed technical response here...'
                        }
                        value={transcript}
                        onChange={(e) => {
                          setTranscript(e.target.value);
                          liveTranscriptRef.current = e.target.value;
                        }}
                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                      />
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 px-1">
                        <span>{transcript ? `${transcript.trim().split(/\s+/).filter(Boolean).length} words spoken/typed` : '0 words'}</span>
                        <span>{transcript.length} characters</span>
                      </div>
                    </div>

                    {/* Submit Answer Button */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={handleEvaluateAnswer}
                        disabled={isEvaluating || !transcript.trim() || isRecording}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-xs cursor-pointer transition-colors flex items-center gap-2"
                      >
                        {isEvaluating && <RotateCw className="w-3.5 h-3.5 animate-spin" />}
                        <span>{isEvaluating ? 'Evaluating with Gemini...' : 'Evaluate Answer'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Real-time Feedback Section */}
                  {currentEvaluation && (
                    <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 animate-fadeIn">
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                        <div className="flex items-center gap-2.5">
                          <div className={`px-3 py-1 rounded-xl text-xs font-extrabold ${
                            currentEvaluation.rating === 'Strong Hire'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : currentEvaluation.rating === 'Hire'
                              ? 'bg-teal-100 text-teal-800 border border-teal-300'
                              : 'bg-amber-100 text-amber-900 border border-amber-300'
                          }`}>
                            Verdict: {currentEvaluation.rating}
                          </div>
                          <span className="text-sm font-extrabold text-slate-900">
                            Score: {currentEvaluation.score}/100
                          </span>
                        </div>

                        {/* Re-listen Feedback Button */}
                        <button
                          onClick={() => speakText(currentEvaluation.spokenFeedback)}
                          className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Hear Feedback</span>
                        </button>
                      </div>

                      {/* Verbal Feedback Quote */}
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 italic">
                        &ldquo;{currentEvaluation.spokenFeedback}&rdquo;
                      </div>

                      {/* Strengths & Missing Concepts Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                          <span className="text-xs font-bold text-emerald-900 block mb-1.5 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Technical Concepts Nailed
                          </span>
                          <ul className="text-xs text-emerald-950 space-y-1 list-disc list-inside">
                            {currentEvaluation.strengths.map((str, i) => (
                              <li key={i}>{str}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200">
                          <span className="text-xs font-bold text-rose-900 block mb-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                            Missing Key Concepts
                          </span>
                          <ul className="text-xs text-rose-950 space-y-1 list-disc list-inside">
                            {currentEvaluation.missingConcepts.map((mis, i) => (
                              <li key={i}>{mis}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Staff Model Answer */}
                      <div className="p-4 rounded-xl bg-white border border-slate-200">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                          Staff Engineer Ideal Articulation
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed font-sans">
                          {currentEvaluation.idealAnswer}
                        </p>
                      </div>

                      {/* Next Question / Finish Action */}
                      <div className="pt-2 flex justify-end">
                        {currentRound < totalRounds ? (
                          <button
                            onClick={handleNextRound}
                            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors flex items-center gap-1.5"
                          >
                            <span>Proceed to Question {currentRound + 1}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setIsInterviewFinished(true)}
                            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors flex items-center gap-1.5"
                          >
                            <Trophy className="w-3.5 h-3.5" />
                            <span>View Final Screening Scorecard</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>

            {/* Session Roadmap & Sidebar (Right 4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  Screening Progress
                </span>

                <div className="space-y-2.5">
                  {[...Array(totalRounds)].map((_, i) => {
                    const rNum = i + 1;
                    const historyItem = sessionHistory[i];
                    const isCurrent = currentRound === rNum && !currentEvaluation;
                    const isDone = Boolean(historyItem);

                    return (
                      <div
                        key={i}
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                          isDone
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900 font-bold'
                            : isCurrent
                            ? 'bg-white border-emerald-500 font-bold ring-2 ring-emerald-500/20'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                            isDone ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {rNum}
                          </span>
                          <span>Question {rNum}</span>
                        </div>
                        {isDone && (
                          <span className="text-[11px] font-extrabold text-emerald-700">
                            {historyItem.evaluation.score}/100
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Real-Time Tips */}
              <div className="bg-gradient-to-br from-emerald-50/60 to-slate-50 border border-emerald-200 rounded-3xl p-5 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
                  <Brain className="w-4 h-4 text-emerald-700" />
                  <span>Screening Strategy</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  In technical phone screens, interviewers look for <strong>structured thinking</strong>:
                  state the definition first, explain the physical disk or memory mechanics, and mention at least one key tradeoff.
                </p>
              </div>
            </div>
          </div>

          {/* Final Screening Scorecard Modal / Panel */}
          {isInterviewFinished && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-emerald-300 shadow-lg space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Screening Complete
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                    Technical Screening Result: {finalAverageScore >= 75 ? 'Recommended to Onsite' : 'Additional Preparation Needed'}
                  </h2>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400 block">Overall Score</span>
                  <span className="text-3xl font-extrabold text-emerald-700">
                    {finalAverageScore}%
                  </span>
                </div>
              </div>

              {/* Question breakdown list */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Performance Breakdown
                </span>
                {sessionHistory.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>Q{idx + 1}: {item.question.question}</span>
                      <span className="text-emerald-700">{item.evaluation.score}/100 ({item.evaluation.rating})</span>
                    </div>
                    <p className="text-slate-600 italic">&ldquo;{item.candidateAnswer}&rdquo;</p>
                  </div>
                ))}
              </div>

              {/* Automatic Log Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-xs">
                <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Session, questions, and transcript recorded into your Interview History & Growth Log</span>
                </div>
                <button
                  onClick={() => {
                    setIsInterviewFinished(false);
                    setSessionActive(false);
                    setModuleView('history');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold transition-colors cursor-pointer flex items-center gap-1.5 flex-shrink-0 shadow-xs text-xs"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>View in Growth Log</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    setIsInterviewFinished(false);
                    setSessionActive(false);
                    setModuleView('history');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <History className="w-3.5 h-3.5 text-teal-400" />
                  <span>Open Interview History & Trends</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSessionActive(false);
                      setIsInterviewFinished(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Configure New Interview
                  </button>
                  <button
                    onClick={handleStartInterview}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retake Same Subject</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
