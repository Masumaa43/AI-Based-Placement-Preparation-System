export type MoodType = 'bad' | 'good' | 'better' | 'best';

export interface MoodQuote {
  quote: string;
  author: string;
  context: string;
  badge?: string;
}

export interface MoodResponse {
  mood: MoodType;
  tone: string;
  headline: string;
  quotes: MoodQuote[];
  mindsetTip: string;
  recommendedAction: string;
}

export type SubjectId = 'dbms' | 'os' | 'cn' | 'oops' | 'aptitude' | 'reasoning' | 'dsa' | 'ml' | 'webdev';

export interface GroundedSource {
  title: string;
  uri: string;
}

export interface GroundedSearchResult {
  answer: string;
  intuition: string;
  interviewModel: string;
  staffTip: string;
  codeSnippet?: string;
  sources: GroundedSource[];
  searchQueries: string[];
  groundedAt?: string;
}

export interface LivePlacementTrend {
  query: string;
  track: 'dsa' | 'ml' | 'core_cs' | 'webdev' | 'oops' | 'general';
  companyOrRole: string;
  summary: string;
  keyInsights: string[];
  trendingQuestions: Array<{
    question: string;
    round: string;
    difficulty: string;
    focusArea: string;
  }>;
  hiringBar: string;
  sources: GroundedSource[];
  searchQueries: string[];
}

export interface TopicInfo {
  id: string;
  name: string;
  importance: 'High' | 'Critical' | 'Medium';
  keyConcept: string;
  gfgUrl?: string;
  gfgTitle?: string;
}

export interface SubjectMeta {
  id: SubjectId;
  title: string;
  shortDesc: string;
  iconName: string;
  accentColor: string;
  topics: TopicInfo[];
}

export interface Question {
  id: string;
  subjectId: SubjectId;
  topicId: string;
  topicName: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  companyTags?: string[];
}

export interface UserTopicProgress {
  topicId: string;
  subjectId: SubjectId;
  status: 'not_started' | 'covered' | 'weak';
  timesTested: number;
  timesCorrect: number;
}

export interface LeetCodeExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface LeetCodeProblem {
  id: number;
  slug: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  examples: LeetCodeExample[];
  constraints: string[];
  companies: string[];
  starterCode?: string;
  solutionCode: {
    python: string;
    javascript: string;
    cpp: string;
    java: string;
  };
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  gfgReference?: string;
}

export interface LeetCodeTopicStat {
  topic: string;
  solved: number;
  total: number;
  percentage: number;
  isWeak: boolean;
}

export interface LeetCodeProfile {
  username: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  acceptanceRate: number;
  streakDays: number;
  topTopics: LeetCodeTopicStat[];
  weakTopics: string[];
  recentSubmissions: {
    title: string;
    status: 'Accepted' | 'Time Limit Exceeded' | 'Wrong Answer';
    timeAgo: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  }[];
  isMock?: boolean;
}

export interface SprintDayPlan {
  day: number;
  focusArea: string;
  subject: string;
  tasks: string[];
  estimatedHours: number;
}

export interface AIDashboardReport {
  readinessScore: number;
  readinessTier: 'Needs Foundation' | 'Intermediate Prep' | 'Interview Ready' | 'Top Tier / FAANG Ready';
  summary: string;
  criticalWeaknesses: {
    subject: string;
    topic: string;
    issue: string;
    remedy: string;
  }[];
  strongAreas: string[];
  sprintPlan: SprintDayPlan[];
  highYieldTips: string[];
  recommendedDailyGoal: string;
  analyzedAt: string;
}

export interface Flashcard {
  id: string;
  subjectId: SubjectId;
  topic: string;
  question: string;
  answer: string;
  code?: string;
  mnemonic?: string;
}

export type TreeStage = 'seed' | 'sprout' | 'sapling' | 'blooming' | 'ancient';

export type TreeSpecies = 
  | 'emerald_oak' 
  | 'binary_cypress' 
  | 'blossom_cherry' 
  | 'quantum_willow' 
  | 'golden_sequoia' 
  | 'zen_bonsai';

export interface PlantedTree {
  id: string;
  species: TreeSpecies;
  name: string;
  stage: TreeStage;
  plantedDate: string; // YYYY-MM-DD
  streakDay: number;
  subjectFocus: SubjectId | 'general';
  xpContributed: number;
  wateredToday: boolean;
  notes?: string;
}

export interface GardenState {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  trees: PlantedTree[];
  totalStudyMinutes: number;
  totalQuestionsAnswered: number;
  gardenLevel: number;
  streakFreezes: number;
  fertilizerCharges: number;
}

export interface InterviewRoundLog {
  roundNumber: number;
  question: string;
  spokenIntro?: string;
  candidateAnswer: string;
  score: number; // 0-100
  rating: string;
  spokenFeedback: string;
  strengths: string[];
  missingConcepts: string[];
  idealAnswer: string;
  keyPointsExpected?: string[];
}

export interface MockInterviewSession {
  id: string;
  userId?: string;
  timestamp: string; // ISO string
  formattedDate: string; // e.g. "Oct 1, 2026, 11:15 AM"
  subjectId: string;
  subjectTitle: string;
  difficulty: 'Entry-Level' | 'Mid-Level' | 'Senior';
  interviewerPersona: string;
  totalRounds: number;
  completedRounds: number;
  averageScore: number;
  verdict: 'Recommended to Onsite' | 'Borderline / Follow-Up Needed' | 'Needs Additional Practice';
  transcriptSummary: string;
  strengthsSummary: string[];
  growthAreas: string[];
  rounds: InterviewRoundLog[];
  durationSeconds?: number;
}

export interface RecommendedLeetCodeProblem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  slug: string;
  reason: string;
}

export interface StudyPathStep {
  id: string;
  priority: 'Critical' | 'High' | 'Medium';
  phase: 'Phase 1: Urgent Foundation' | 'Phase 2: Core Strengthening' | 'Phase 3: FAANG Mastery';
  title: string;
  subjectId: SubjectId;
  subjectTitle: string;
  topicId?: string;
  topicName?: string;
  whyAssigned: string;
  reviewSummary: string;
  keyTakeaways: string[];
  recommendedLeetCodeProblems: RecommendedLeetCodeProblem[];
  actionType: 'core_subject' | 'leetcode' | 'mock_interview' | 'quiz';
  estimatedMinutes: number;
  completed: boolean;
  notes?: string;
}

export interface PersonalizedStudyPath {
  id: string;
  generatedAt: string;
  studentLevel: string;
  summary: string;
  readinessScore: number;
  weakestSubject: string;
  totalEstimatedHours: number;
  steps: StudyPathStep[];
  weeklyMilestone: string;
}

export interface GFGProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: 'School' | 'Basic' | 'Easy' | 'Medium' | 'Hard';
  category: string;
  accuracy: string;
  points: number;
  companies: string[];
  url: string;
  description: string;
  example: {
    input: string;
    output: string;
    explanation?: string;
  };
  constraints: string[];
  expectedTime: string;
  expectedSpace: string;
  solutionCode?: {
    cpp: string;
    java: string;
    python: string;
  };
  tags: string[];
}

export interface GFGArticle {
  id: string;
  subjectId: SubjectId;
  subjectTitle: string;
  title: string;
  url: string;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  keyTakeaways: string[];
  companiesAsked: string[];
}


