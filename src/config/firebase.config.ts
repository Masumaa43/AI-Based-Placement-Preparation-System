/**
 * Firebase Configuration Abstraction Layer
 * 
 * Safely resolves Firebase credentials according to standard abstraction practices:
 * 1. Environment variables (VITE_FIREBASE_*), recommended for CI/CD, production, and GitHub
 * 2. Optional local configuration file (/firebase-applet-config.json) when present in development
 * 3. Graceful fallback defaults to ensure zero build errors when sensitive files are omitted
 */

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  firestoreDatabaseId?: string;
  measurementId?: string;
  oAuthClientId?: string;
}

// Safely probe for optional local config file using Vite's glob import
// This avoids bundling failure when firebase-applet-config.json is git-ignored
const localConfigs = import.meta.glob<Record<string, any>>('/firebase-applet-config.json', {
  eager: true,
  import: 'default'
});

const localConfig = localConfigs['/firebase-applet-config.json'] || {};

const env = (import.meta as any).env || {};

export const firebaseConfig: FirebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || localConfig.apiKey || '',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || localConfig.authDomain || '',
  projectId: env.VITE_FIREBASE_PROJECT_ID || localConfig.projectId || '',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || localConfig.storageBucket || '',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || localConfig.messagingSenderId || '',
  appId: env.VITE_FIREBASE_APP_ID || localConfig.appId || '',
  firestoreDatabaseId: env.VITE_FIREBASE_DATABASE_ID || localConfig.firestoreDatabaseId || '',
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || localConfig.measurementId || '',
  oAuthClientId: env.VITE_FIREBASE_OAUTH_CLIENT_ID || localConfig.oAuthClientId || ''
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.apiKey !== 'YOUR_FIREBASE_API_KEY' &&
  !firebaseConfig.apiKey.includes('YOUR_') &&
  firebaseConfig.apiKey.trim().length > 20
);
