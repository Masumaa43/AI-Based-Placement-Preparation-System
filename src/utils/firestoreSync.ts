import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, query, orderBy, limit } from 'firebase/firestore';
import { db, auth, isFirebaseConfigured } from '../firebase';
import { GardenState, UserTopicProgress, LeetCodeProfile, MockInterviewSession, PersonalizedStudyPath } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface UserCloudData {
  garden?: GardenState;
  topicProgress?: Record<string, UserTopicProgress>;
  leetcode?: LeetCodeProfile | null;
  studyPath?: PersonalizedStudyPath | null;
  updatedAt?: string;
}

export async function saveUserDataToFirestore(
  userId: string, 
  data: UserCloudData
): Promise<void> {
  if (!userId || !isFirebaseConfigured || !db) return;
  try {
    const studyDocRef = doc(db, 'users', userId, 'data', 'study');
    const payload: Record<string, any> = {
      uid: userId,
      updatedAt: new Date().toISOString()
    };

    if (data.garden) {
      payload.currentStreak = data.garden.currentStreak;
      payload.longestStreak = data.garden.longestStreak;
      payload.lastActiveDate = data.garden.lastActiveDate;
      payload.totalStudyMinutes = data.garden.totalStudyMinutes;
      payload.totalQuestionsAnswered = data.garden.totalQuestionsAnswered;
      payload.gardenLevel = data.garden.gardenLevel;
      payload.fertilizerCharges = data.garden.fertilizerCharges;
      payload.streakFreezes = data.garden.streakFreezes;
      payload.treesJson = JSON.stringify(data.garden.trees);
    }

    if (data.topicProgress) {
      payload.topicProgressJson = JSON.stringify(data.topicProgress);
    }

    if (data.leetcode) {
      payload.leetcodeJson = JSON.stringify(data.leetcode);
    }

    if (data.studyPath) {
      payload.studyPathJson = JSON.stringify(data.studyPath);
    }

    await setDoc(studyDocRef, payload, { merge: true });
  } catch (e) {
    console.warn('Failed to save to Firestore:', e);
  }
}

export async function loadUserDataFromFirestore(
  userId: string
): Promise<UserCloudData | null> {
  if (!userId || !isFirebaseConfigured || !db) return null;
  try {
    const studyDocRef = doc(db, 'users', userId, 'data', 'study');
    const snapshot = await getDoc(studyDocRef);
    if (!snapshot.exists()) return null;

    const raw = snapshot.data();
    const result: UserCloudData = {
      updatedAt: raw.updatedAt
    };

    if (raw.treesJson) {
      try {
        const trees = JSON.parse(raw.treesJson);
        result.garden = {
          currentStreak: raw.currentStreak ?? 1,
          longestStreak: raw.longestStreak ?? 1,
          lastActiveDate: raw.lastActiveDate || '',
          trees,
          totalStudyMinutes: raw.totalStudyMinutes ?? 0,
          totalQuestionsAnswered: raw.totalQuestionsAnswered ?? 0,
          gardenLevel: raw.gardenLevel ?? 1,
          streakFreezes: raw.streakFreezes ?? 1,
          fertilizerCharges: raw.fertilizerCharges ?? 1
        };
      } catch (err) {}
    }

    if (raw.topicProgressJson) {
      try {
        result.topicProgress = JSON.parse(raw.topicProgressJson);
      } catch (err) {}
    }

    if (raw.leetcodeJson) {
      try {
        result.leetcode = JSON.parse(raw.leetcodeJson);
      } catch (err) {}
    }

    if (raw.studyPathJson) {
      try {
        result.studyPath = JSON.parse(raw.studyPathJson);
      } catch (err) {}
    }

    return result;
  } catch (e) {
    console.warn('Failed to load from Firestore:', e);
    return null;
  }
}

// -------------------------------------------------------------
// Mock Interview Sessions Cloud Persistence
// -------------------------------------------------------------

export async function saveInterviewSessionToFirestore(
  userId: string,
  session: MockInterviewSession
): Promise<void> {
  if (!userId || !session || !session.id) return;
  if (!isFirebaseConfigured || !db) return;
  try {
    const sessionDocRef = doc(db, 'users', userId, 'interviews', session.id);
    const payload = {
      ...session,
      userId,
      roundsJson: JSON.stringify(session.rounds),
      updatedAt: new Date().toISOString()
    };
    await setDoc(sessionDocRef, payload, { merge: true });
  } catch (e) {
    console.warn('Failed to save interview session to Firestore:', e);
  }
}

export async function loadInterviewSessionsFromFirestore(
  userId: string
): Promise<MockInterviewSession[]> {
  if (!userId) return [];
  if (!isFirebaseConfigured || !db) return [];
  try {
    const interviewsColl = collection(db, 'users', userId, 'interviews');
    const q = query(interviewsColl, orderBy('timestamp', 'desc'), limit(50));
    const snapshot = await getDocs(q);

    const sessions: MockInterviewSession[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      let rounds = data.rounds;
      if (!rounds && data.roundsJson) {
        try {
          rounds = JSON.parse(data.roundsJson);
        } catch (err) {}
      }

      sessions.push({
        id: data.id || docSnap.id,
        userId: data.userId,
        timestamp: data.timestamp || new Date().toISOString(),
        formattedDate: data.formattedDate || 'Recent',
        subjectId: data.subjectId,
        subjectTitle: data.subjectTitle,
        difficulty: data.difficulty,
        interviewerPersona: data.interviewerPersona,
        totalRounds: data.totalRounds ?? (rounds ? rounds.length : 1),
        completedRounds: data.completedRounds ?? (rounds ? rounds.length : 1),
        averageScore: data.averageScore ?? 0,
        verdict: data.verdict || 'Needs Additional Practice',
        transcriptSummary: data.transcriptSummary || '',
        strengthsSummary: data.strengthsSummary || [],
        growthAreas: data.growthAreas || [],
        rounds: rounds || [],
        durationSeconds: data.durationSeconds
      });
    });

    return sessions;
  } catch (e) {
    console.warn('Failed to load interview sessions from Firestore:', e);
    return [];
  }
}

export async function deleteInterviewSessionFromFirestore(
  userId: string,
  sessionId: string
): Promise<void> {
  if (!userId || !sessionId) return;
  if (!isFirebaseConfigured || !db) return;
  try {
    const sessionDocRef = doc(db, 'users', userId, 'interviews', sessionId);
    await deleteDoc(sessionDocRef);
  } catch (e) {
    console.warn('Failed to delete interview session from Firestore:', e);
  }
}

