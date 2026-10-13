import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged as firebaseOnAuthStateChanged, 
  User,
  Auth
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDocFromServer,
  Firestore 
} from 'firebase/firestore';
import { firebaseConfig, isFirebaseConfigured } from './config/firebase.config';

// --------------------------------------------------------------------------
// Local Candidate / Offline Auth State Management
// --------------------------------------------------------------------------
const LOCAL_STORAGE_USER_KEY = 'preppulse_active_user';

type AuthListener = (user: User | null) => void;
const localAuthListeners = new Set<AuthListener>();

const getStoredLocalUser = (): User | null => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
};

const setStoredLocalUser = (user: User | null) => {
  try {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
  } catch (e) {}
};

let currentLocalUser: User | null = getStoredLocalUser();

const notifyLocalListeners = (user: User | null) => {
  currentLocalUser = user;
  setStoredLocalUser(user);
  localAuthListeners.forEach(fn => {
    try {
      fn(user);
    } catch (e) {
      console.warn('Error in auth state listener', e);
    }
  });
};

// --------------------------------------------------------------------------
// Safe Firebase Initialization
// --------------------------------------------------------------------------
let appInstance: FirebaseApp | null = null;
let realAuth: Auth | null = null;
let realDb: Firestore | null = null;
let isRealFirebaseActive = false;

if (isFirebaseConfigured) {
  try {
    appInstance = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    realAuth = getAuth(appInstance);
    realDb = firebaseConfig.firestoreDatabaseId 
      ? getFirestore(appInstance, firebaseConfig.firestoreDatabaseId)
      : getFirestore(appInstance);
    isRealFirebaseActive = true;
  } catch (error) {
    console.warn('Firebase initialization bypassed or failed, using local mode:', error);
    isRealFirebaseActive = false;
  }
}

// Fallback auth implementation conforming to Firebase Auth interface
const fallbackAuth: any = {
  get currentUser() {
    return currentLocalUser;
  },
  onAuthStateChanged: (callback: (user: User | null) => void) => {
    localAuthListeners.add(callback);
    setTimeout(() => callback(currentLocalUser), 0);
    return () => {
      localAuthListeners.delete(callback);
    };
  }
};

export const auth: Auth = (isRealFirebaseActive && realAuth ? realAuth : fallbackAuth) as Auth;
export const db: Firestore = (isRealFirebaseActive && realDb ? realDb : (null as any)) as Firestore;
export const googleProvider = new GoogleAuthProvider();

export { isFirebaseConfigured };

/**
 * Robust onAuthStateChanged helper that works both in real Firebase & offline local mode
 */
export const onAuthStateChanged = (
  _authInstance: any,
  nextOrObserver: (user: User | null) => void
): (() => void) => {
  if (isRealFirebaseActive && realAuth) {
    return firebaseOnAuthStateChanged(realAuth, nextOrObserver);
  }
  localAuthListeners.add(nextOrObserver);
  setTimeout(() => nextOrObserver(currentLocalUser), 0);
  return () => {
    localAuthListeners.delete(nextOrObserver);
  };
};

/**
 * Sign in with Google (via Firebase Auth if configured, or interactive local profile)
 */
export const signInWithGoogle = async (): Promise<User | null> => {
  if (isRealFirebaseActive && realAuth) {
    try {
      const result = await signInWithPopup(realAuth, googleProvider);
      const user = result.user;
      
      // Save/update user profile in Firestore
      if (user && realDb) {
        try {
          const userRef = doc(realDb, 'users', user.uid);
          await setDoc(userRef, {
            uid: user.uid,
            displayName: user.displayName || 'Tech Candidate',
            email: user.email || '',
            photoURL: user.photoURL || '',
            updatedAt: new Date().toISOString()
          }, { merge: true });
        } catch (dbErr) {
          console.warn('Profile write to Firestore skipped/failed:', dbErr);
        }
      }
      return user;
    } catch (error: any) {
      console.warn('Google Sign-In popup interrupted or unconfigured; falling back to local guest profile:', error);
    }
  }

  // Interactive Local / Guest Candidate mode
  const guestUser: User = {
    uid: 'candidate_local_' + Math.random().toString(36).substring(2, 9),
    displayName: 'Tech Candidate (Local Profile)',
    email: 'candidate@preppulse.local',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
    emailVerified: true,
    isAnonymous: false,
    metadata: {
      creationTime: new Date().toISOString(),
      lastSignInTime: new Date().toISOString()
    },
    providerData: [],
    refreshToken: '',
    tenantId: null,
    delete: async () => {},
    getIdToken: async () => 'local-jwt-token',
    getIdTokenResult: async () => ({} as any),
    reload: async () => {},
    toJSON: () => ({})
  } as unknown as User;

  notifyLocalListeners(guestUser);
  return guestUser;
};

/**
 * Sign out of account
 */
export const signOut = async (): Promise<void> => {
  if (isRealFirebaseActive && realAuth) {
    try {
      await firebaseSignOut(realAuth);
    } catch (e) {
      console.warn('Firebase sign-out error:', e);
    }
  }
  notifyLocalListeners(null);
};

/**
 * Validate Firestore connection on boot if configured
 */
export async function testConnection() {
  if (!isRealFirebaseActive || !realDb) return;
  try {
    await getDocFromServer(doc(realDb, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore connection check: please verify network or Firebase security rules.');
    }
  }
}

if (isRealFirebaseActive && realDb) {
  testConnection();
}
