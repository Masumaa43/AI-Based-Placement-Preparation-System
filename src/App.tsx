import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { QuickStatusStrip } from './components/QuickStatusStrip';
import { MoodSection } from './components/MoodSection';
import { AIDashboard } from './components/AIDashboard';
import { SubjectsModule } from './components/SubjectsModule';
import { LeetCodeModule } from './components/LeetCodeModule';
import { DailyWorkoutModal } from './components/DailyWorkoutModal';
import { AptitudeArenaModule } from './components/AptitudeArenaModule';
import { MockInterviewModule } from './components/MockInterviewModule';
import { StudyGardenModule } from './components/StudyGardenModule';
import { VideoStudioModule } from './components/VideoStudioModule';
import { PersonalizedStudyPathModule } from './components/PersonalizedStudyPathModule';
import { GeeksforGeeksModule } from './components/GeeksforGeeksModule';
import { HeaderBar } from './components/HeaderBar';
import { Sidebar } from './components/Sidebar';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { PracticePortal } from './components/PracticePortal';
import { AIDoubtSolverModule } from './components/AIDoubtSolverModule';
import { MoodModal } from './components/MoodModal';
import { 
  MoodType, 
  MoodResponse, 
  UserTopicProgress, 
  LeetCodeProfile, 
  AIDashboardReport, 
  SubjectId,
  GardenState,
  PlantedTree,
  TreeSpecies,
  TreeStage,
  PersonalizedStudyPath
} from './types';
import { auth, signInWithGoogle, signOut, onAuthStateChanged } from './firebase';
import { User } from 'firebase/auth';
import { saveUserDataToFirestore, loadUserDataFromFirestore } from './utils/firestoreSync';
import { FALLBACK_MOOD_RESPONSES } from './data/quotes';
import { getTodayDateString, getPastDateString } from './data/garden';
import { 
  loadCurrentMood, 
  saveCurrentMood, 
  loadTopicProgress, 
  saveTopicProgress, 
  loadLeetCodeProfile, 
  saveLeetCodeProfile,
  loadAIReport,
  saveAIReport,
  loadGardenState,
  saveGardenState,
  loadPersonalizedStudyPath,
  savePersonalizedStudyPath,
  loadMockInterviewHistory
} from './utils/storage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [currentMood, setCurrentMood] = useState<MoodType>(() => loadCurrentMood());
  const [moodData, setMoodData] = useState<MoodResponse>(() => FALLBACK_MOOD_RESPONSES[loadCurrentMood()]);
  const [isMoodLoading, setIsMoodLoading] = useState<boolean>(false);
  const [isMoodModalOpen, setIsMoodModalOpen] = useState<boolean>(false);

  const [topicProgress, setTopicProgress] = useState<Record<string, UserTopicProgress>>(() => loadTopicProgress());
  const [leetcodeProfile, setLeetcodeProfile] = useState<LeetCodeProfile | null>(() => loadLeetCodeProfile());
  const [isLeetCodeLoading, setIsLeetCodeLoading] = useState<boolean>(false);

  const [aiReport, setAiReport] = useState<AIDashboardReport | null>(() => loadAIReport());
  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);

  const [studyPath, setStudyPath] = useState<PersonalizedStudyPath>(() => loadPersonalizedStudyPath());
  const [isGeneratingStudyPath, setIsGeneratingStudyPath] = useState<boolean>(false);
  const [selectedLeetCodeProblemId, setSelectedLeetCodeProblemId] = useState<number | undefined>(undefined);

  const [garden, setGarden] = useState<GardenState>(() => loadGardenState());
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const [activeSubjectId, setActiveSubjectId] = useState<SubjectId>('dbms');

  // Firebase Auth state listener and initial cloud sync
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setIsSyncing(true);
        try {
          const cloudData = await loadUserDataFromFirestore(user.uid);
          if (cloudData) {
            if (cloudData.garden) {
              setGarden(cloudData.garden);
              saveGardenState(cloudData.garden);
            }
            if (cloudData.topicProgress) {
              setTopicProgress(cloudData.topicProgress);
              saveTopicProgress(cloudData.topicProgress);
            }
            if (cloudData.leetcode) {
              setLeetcodeProfile(cloudData.leetcode);
              saveLeetCodeProfile(cloudData.leetcode);
            }
            if (cloudData.studyPath) {
              setStudyPath(cloudData.studyPath);
              savePersonalizedStudyPath(cloudData.studyPath);
            }
          } else {
            // First time login - seed Firestore with local progress
            await saveUserDataToFirestore(user.uid, {
              garden,
              topicProgress,
              leetcode: leetcodeProfile,
              studyPath
            });
          }
        } catch (e) {
          console.warn('Firestore load/seed error:', e);
        } finally {
          setIsSyncing(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Automatic debounced cloud sync to Firestore for logged-in user
  useEffect(() => {
    if (currentUser?.uid && !isSyncing) {
      const timer = setTimeout(() => {
        saveUserDataToFirestore(currentUser.uid, {
          garden,
          topicProgress,
          leetcode: leetcodeProfile,
          studyPath
        });
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentUser?.uid, isSyncing, garden, topicProgress, leetcodeProfile, studyPath]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (e) {
      console.warn('Google sign-in error:', e);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      console.warn('Sign-out error:', e);
    }
  };

  // Fetch Quotes for given mood
  const fetchMoodQuotes = useCallback(async (mood: MoodType, note = '') => {
    setIsMoodLoading(true);
    try {
      const res = await fetch('/api/mood-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, note }),
      });
      if (res.ok) {
        const data: MoodResponse = await res.json();
        setMoodData(data);
      } else {
        setMoodData(FALLBACK_MOOD_RESPONSES[mood]);
      }
    } catch (e) {
      setMoodData(FALLBACK_MOOD_RESPONSES[mood]);
    } finally {
      setIsMoodLoading(false);
    }
  }, []);

  // Fetch AI Performance Analysis
  const runAIDiagnostic = useCallback(async (
    currentTopics = topicProgress, 
    currentLC = leetcodeProfile
  ) => {
    setIsGeneratingAI(true);
    try {
      const weakTopics = Object.values(currentTopics)
        .filter(t => t.status === 'weak')
        .map(t => `${t.subjectId}: ${t.topicId}`);

      const coveredTopics = Object.values(currentTopics)
        .filter(t => t.status === 'covered')
        .map(t => t.topicId);

      const res = await fetch('/api/ai/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectsProgress: currentTopics,
          weakTopics,
          coveredTopics,
          leetcodeStats: currentLC
        })
      });

      if (res.ok) {
        const report: AIDashboardReport = await res.json();
        setAiReport(report);
        saveAIReport(report);
      }
    } catch (e) {
      console.warn('AI analysis request error', e);
    } finally {
      setIsGeneratingAI(false);
    }
  }, [topicProgress, leetcodeProfile]);

  // Initial setup: load default profile if none exists
  useEffect(() => {
    if (!leetcodeProfile) {
      // Sync default profile so app starts populated
      handleSyncLeetCode('tech_candidate');
    }
    fetchMoodQuotes(currentMood);
  }, []);

  // Handle Mood Selection
  const handleSelectMood = (mood: MoodType, note?: string) => {
    setCurrentMood(mood);
    saveCurrentMood(mood);
    fetchMoodQuotes(mood, note);
  };

  // Toggle topic status: not_started -> covered -> weak -> not_started
  const handleToggleTopicStatus = (topicId: string, subjectId: SubjectId) => {
    setTopicProgress(prev => {
      const current = prev[topicId]?.status || 'not_started';
      let next: 'not_started' | 'covered' | 'weak' = 'covered';
      if (current === 'covered') next = 'weak';
      else if (current === 'weak') next = 'not_started';

      const updated = {
        ...prev,
        [topicId]: {
          topicId,
          subjectId,
          status: next,
          timesTested: prev[topicId]?.timesTested || 0,
          timesCorrect: prev[topicId]?.timesCorrect || 0,
        }
      };
      saveTopicProgress(updated);
      return updated;
    });
  };

  // Handle Quiz question answered
  const handleQuestionAnswered = (
    questionId: string, 
    isCorrect: boolean, 
    topicId: string, 
    subjectId: SubjectId
  ) => {
    setTopicProgress(prev => {
      const existing = prev[topicId] || {
        topicId,
        subjectId,
        status: 'not_started',
        timesTested: 0,
        timesCorrect: 0
      };

      const timesTested = existing.timesTested + 1;
      const timesCorrect = existing.timesCorrect + (isCorrect ? 1 : 0);
      const status: 'not_started' | 'covered' | 'weak' = !isCorrect ? 'weak' : (existing.status === 'weak' ? 'weak' : 'covered');

      const updated: Record<string, UserTopicProgress> = {
        ...prev,
        [topicId]: {
          ...existing,
          status,
          timesTested,
          timesCorrect
        }
      };
      saveTopicProgress(updated);
      return updated;
    });
  };

  // Sync LeetCode Profile
  const handleSyncLeetCode = async (username: string) => {
    setIsLeetCodeLoading(true);
    try {
      const res = await fetch(`/api/leetcode/${encodeURIComponent(username)}`);
      if (res.ok) {
        const data: LeetCodeProfile = await res.json();
        setLeetcodeProfile(data);
        saveLeetCodeProfile(data);
        // Refresh AI analysis with new LeetCode data
        runAIDiagnostic(topicProgress, data);
      }
    } catch (e) {
      console.warn('LeetCode sync error', e);
    } finally {
      setIsLeetCodeLoading(false);
    }
  };

  // Plant Tree logic
  const handlePlantTree = (subject: SubjectId, customName?: string) => {
    const today = getTodayDateString();
    const nextStreak = garden.currentStreak + 1;

    // Pick species based on milestone streak
    let species: TreeSpecies = 'emerald_oak';
    if (nextStreak >= 10) species = 'golden_sequoia';
    else if (nextStreak >= 7) species = 'quantum_willow';
    else if (nextStreak >= 5) species = 'blossom_cherry';
    else if (nextStreak >= 3) species = 'binary_cypress';

    const defaultNames: Record<TreeSpecies, string> = {
      emerald_oak: `${subject.toUpperCase()} Core Oak`,
      binary_cypress: `${subject.toUpperCase()} AVL Cypress`,
      blossom_cherry: `${subject.toUpperCase()} Focus Sakura`,
      quantum_willow: `${subject.toUpperCase()} Stream Willow`,
      golden_sequoia: `${subject.toUpperCase()} Titan Sequoia`,
      zen_bonsai: `${subject.toUpperCase()} Zen Bonsai`
    };

    const newTree: PlantedTree = {
      id: `tree-${Date.now()}`,
      species,
      name: customName || defaultNames[species],
      stage: 'sapling',
      plantedDate: today,
      streakDay: nextStreak,
      subjectFocus: subject,
      xpContributed: 80,
      wateredToday: true,
      notes: `Cultivated during Day ${nextStreak} study streak.`
    };

    const updatedGarden: GardenState = {
      ...garden,
      currentStreak: nextStreak,
      longestStreak: Math.max(garden.longestStreak, nextStreak),
      lastActiveDate: today,
      trees: [newTree, ...garden.trees],
      fertilizerCharges: garden.fertilizerCharges + 1,
      totalStudyMinutes: garden.totalStudyMinutes + 20
    };

    setGarden(updatedGarden);
    saveGardenState(updatedGarden);
  };

  // Water Tree logic
  const handleWaterTree = (treeId: string) => {
    const nextStageMap: Record<TreeStage, TreeStage> = {
      seed: 'sprout',
      sprout: 'sapling',
      sapling: 'blooming',
      blooming: 'ancient',
      ancient: 'ancient'
    };

    setGarden(prev => {
      const updatedTrees = prev.trees.map(t => {
        if (t.id === treeId) {
          return {
            ...t,
            stage: nextStageMap[t.stage],
            xpContributed: t.xpContributed + 25,
            wateredToday: true
          };
        }
        return t;
      });

      const updated = {
        ...prev,
        trees: updatedTrees
      };
      saveGardenState(updated);
      return updated;
    });
  };

  // Fertilizer logic
  const handleUseFertilizer = (treeId: string) => {
    if (garden.fertilizerCharges <= 0) return;

    setGarden(prev => {
      const updatedTrees = prev.trees.map(t => {
        if (t.id === treeId) {
          return {
            ...t,
            stage: 'ancient' as TreeStage,
            xpContributed: t.xpContributed + 75,
            wateredToday: true
          };
        }
        return t;
      });

      const updated = {
        ...prev,
        fertilizerCharges: Math.max(0, prev.fertilizerCharges - 1),
        trees: updatedTrees
      };
      saveGardenState(updated);
      return updated;
    });
  };

  // Simulate Next Day for testing streak advancement
  const handleSimulateNextDay = () => {
    const yesterday = getPastDateString(1);
    setGarden(prev => {
      // Un-water today so student can test watering or planting
      const resetTrees = prev.trees.map(t => ({ ...t, wateredToday: false }));
      const updated = {
        ...prev,
        lastActiveDate: yesterday,
        trees: resetTrees
      };
      saveGardenState(updated);
      return updated;
    });
  };

  // Workout completed
  const handleWorkoutCompleted = (
    score: number, 
    total: number, 
    results: { topicId: string; subjectId: SubjectId; isCorrect: boolean }[]
  ) => {
    setTopicProgress(prev => {
      const updated = { ...prev };
      results.forEach(r => {
        const existing = updated[r.topicId] || {
          topicId: r.topicId,
          subjectId: r.subjectId,
          status: 'not_started',
          timesTested: 0,
          timesCorrect: 0
        };
        updated[r.topicId] = {
          ...existing,
          status: r.isCorrect ? 'covered' : 'weak',
          timesTested: existing.timesTested + 1,
          timesCorrect: existing.timesCorrect + (r.isCorrect ? 1 : 0)
        };
      });
      saveTopicProgress(updated);
      runAIDiagnostic(updated, leetcodeProfile);
      return updated;
    });

    // Also nurture the garden on workout completion
    setGarden(prev => {
      const updatedTrees = prev.trees.map((t, idx) => {
        if (idx === 0) {
          return {
            ...t,
            xpContributed: t.xpContributed + 40,
            wateredToday: true
          };
        }
        return t;
      });
      const updated: GardenState = {
        ...prev,
        totalStudyMinutes: prev.totalStudyMinutes + 15,
        totalQuestionsAnswered: prev.totalQuestionsAnswered + total,
        trees: updatedTrees
      };
      saveGardenState(updated);
      return updated;
    });
  };

  const handleMockInterviewCompleted = (score: number, subject: string, rounds: number) => {
    setGarden(prev => {
      const updatedTrees = prev.trees.map((t, idx) => {
        if (idx === 0) {
          return {
            ...t,
            xpContributed: t.xpContributed + Math.round(score * 0.8),
            wateredToday: true
          };
        }
        return t;
      });
      const updated: GardenState = {
        ...prev,
        totalStudyMinutes: prev.totalStudyMinutes + (rounds * 5),
        totalQuestionsAnswered: prev.totalQuestionsAnswered + rounds,
        trees: updatedTrees
      };
      saveGardenState(updated);
      return updated;
    });
  };

  const handleNavigateToLeetCodeProblem = (problemId: number) => {
    setSelectedLeetCodeProblemId(problemId);
    setCurrentTab('leetcode');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefreshStudyPath = async () => {
    setIsGeneratingStudyPath(true);
    try {
      const weakTopics = Object.values(topicProgress)
        .filter(p => p.status === 'weak')
        .map(p => p.topicId);
      const coveredTopics = Object.values(topicProgress)
        .filter(p => p.status === 'covered')
        .map(p => p.topicId);
      const mockHistory = loadMockInterviewHistory();

      const res = await fetch('/api/study-path/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicProgress,
          weakTopics,
          coveredTopics,
          leetcodeStats: leetcodeProfile,
          interviewHistory: mockHistory,
          solvedQuestionsCount: garden.totalQuestionsAnswered
        })
      });

      if (res.ok) {
        const data: PersonalizedStudyPath = await res.json();
        setStudyPath(data);
        savePersonalizedStudyPath(data);
        if (currentUser?.uid) {
          saveUserDataToFirestore(currentUser.uid, { studyPath: data });
        }
      }
    } catch (e) {
      console.warn('Failed to refresh study path:', e);
    } finally {
      setIsGeneratingStudyPath(false);
    }
  };

  const handleNavigateToTab = (tab: string, subjectId?: SubjectId, topicId?: string) => {
    setCurrentTab(tab);
    if (subjectId) {
      setActiveSubjectId(subjectId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f4f7fa] text-slate-800 p-2 sm:p-5 lg:p-7 flex justify-center items-start font-sans selection:bg-blue-200 selection:text-blue-950">
      {/* Outer Card with Rounded Corners & Shadow Matching Image */}
      <div className="w-full max-w-[1380px] bg-white rounded-[24px] sm:rounded-[32px] border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
        {/* Top Header Bar with PrepPulse AI logo, user auth & cloud sync status */}
        <HeaderBar
          user={currentUser}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
          isSyncing={isSyncing}
        />

        {/* Main Body Split: Left Sidebar + Right Main Content Area */}
        <div className="flex flex-col md:flex-row flex-1 min-h-[750px]">
          {/* Left Vertical Navigation Sidebar */}
          <Sidebar
            currentTab={currentTab}
            onSelectTab={(tab) => handleNavigateToTab(tab)}
            gardenStreak={garden.currentStreak}
          />

          {/* Right Main Content */}
          <main className="flex-1 p-5 sm:p-7 lg:p-8 bg-white overflow-y-auto">
            {currentTab === 'dashboard' && (
              <ExecutiveDashboard
                user={currentUser}
                report={aiReport}
                garden={garden}
                topicProgress={topicProgress}
                leetcode={leetcodeProfile}
                studyPath={studyPath}
                onNavigateToTab={handleNavigateToTab}
                onOpenWorkout={() => handleNavigateToTab('workout')}
                onSignIn={handleSignIn}
                onSignOut={handleSignOut}
              />
            )}

            {(currentTab === 'practice' || currentTab === 'gfg' || currentTab === 'leetcode' || currentTab === 'subjects') && (
              <PracticePortal
                initialSubTab={currentTab === 'leetcode' ? 'leetcode' : currentTab === 'subjects' ? 'subjects' : 'gfg'}
                activeSubjectId={activeSubjectId}
                topicProgress={topicProgress}
                onToggleTopicStatus={handleToggleTopicStatus}
                onQuestionAnswered={handleQuestionAnswered}
                leetcodeProfile={leetcodeProfile}
                isLeetCodeLoading={isLeetCodeLoading}
                onSyncLeetCode={handleSyncLeetCode}
                onNavigateToTab={handleNavigateToTab}
              />
            )}

            {(currentTab === 'mock-tests' || currentTab === 'aptitude-arena') && (
              <AptitudeArenaModule
                onQuestionAnswered={handleQuestionAnswered}
                onNavigateToTab={handleNavigateToTab}
              />
            )}

            {currentTab === 'study-path' && (
              <PersonalizedStudyPathModule
                studyPath={studyPath}
                onUpdateStudyPath={(updated) => {
                  setStudyPath(updated);
                  savePersonalizedStudyPath(updated);
                }}
                topicProgress={topicProgress}
                leetcodeProfile={leetcodeProfile}
                interviewHistory={loadMockInterviewHistory()}
                onNavigateToTab={handleNavigateToTab}
                onNavigateToLeetCodeProblem={handleNavigateToLeetCodeProblem}
                user={currentUser}
                onRefreshPath={handleRefreshStudyPath}
                isGenerating={isGeneratingStudyPath}
              />
            )}

            {currentTab === 'doubt-solver' && (
              <AIDoubtSolverModule
                onNavigateToTab={handleNavigateToTab}
              />
            )}

            {currentTab === 'mock-interview' && (
              <MockInterviewModule
                onInterviewCompleted={handleMockInterviewCompleted}
                onNavigateToTab={handleNavigateToTab}
                user={currentUser}
              />
            )}

            {currentTab === 'analytics' && (
              <AIDashboard
                report={aiReport}
                leetcode={leetcodeProfile}
                topicProgress={topicProgress}
                isGeneratingAI={isGeneratingAI}
                onRefreshAI={() => runAIDiagnostic()}
                onNavigateToTab={handleNavigateToTab}
                onToggleTopicStatus={handleToggleTopicStatus}
                garden={garden}
              />
            )}

            {currentTab === 'garden' && (
              <StudyGardenModule
                garden={garden}
                onPlantTree={handlePlantTree}
                onWaterTree={handleWaterTree}
                onUseFertilizer={handleUseFertilizer}
                onSimulateNextDay={handleSimulateNextDay}
                onNavigateToTab={handleNavigateToTab}
              />
            )}

            {currentTab === 'workout' && (
              <DailyWorkoutModal
                onCompleteWorkout={handleWorkoutCompleted}
                onNavigateToTab={handleNavigateToTab}
              />
            )}

            {currentTab === 'video' && (
              <VideoStudioModule
                user={currentUser}
                onOpenAuthModal={handleSignIn}
              />
            )}

            {currentTab === 'mood' && (
              <MoodSection
                currentMood={currentMood}
                moodData={moodData}
                isLoading={isMoodLoading}
                onSelectMood={handleSelectMood}
                onNavigateToTab={handleNavigateToTab}
              />
            )}
          </main>
        </div>
      </div>

      {/* Quick Mood Popup Modal */}
      <MoodModal
        isOpen={isMoodModalOpen}
        onClose={() => setIsMoodModalOpen(false)}
        currentMood={currentMood}
        onSelectMood={handleSelectMood}
        onGoToQuotesTab={() => {
          setCurrentTab('mood');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
