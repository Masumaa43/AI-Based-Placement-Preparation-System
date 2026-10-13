# PrepPulse AI — System Architecture & Technical Specification

This document provides an in-depth technical analysis of the **PrepPulse AI** architecture, component interactions, security protocols, and data synchronization patterns.

---

## 1. High-Level Architectural Overview

PrepPulse AI employs a modern **3-Tier Full-Stack Architecture**:

```
+-------------------------------------------------------------------------+
|                        Tier 1: Client Application                       |
|               (React 19 + TypeScript + Tailwind CSS v4)                 |
|                                                                         |
|  - SPA Navigation & State Management (Custom Hooks, LocalStorage)       |
|  - Web Audio & MediaRecorder Stream Processing                          |
|  - Firebase Client SDK (Authentication & Firestore Real-Time Sync)      |
|  - Zero-Leak Configuration Layer (src/config/firebase.config.ts)        |
+-------------------------------------------------------------------------+
                                    |
          +-------------------------+-------------------------+
          | HTTPS REST Calls                                  | WebSocket / Firestore
          v                                                   v
+--------------------------------------+   +------------------------------+
|     Tier 2: Backend Proxy Server     |   |   Tier 3: Cloud & Database   |
|        (Express.js + Node.js)        |   |    (Google Cloud & Firebase) |
|                                      |   |                              |
| - Audio Transcription Endpoint       |   | - Google Gemini 2.5 API      |
| - Gemini AI Evaluator & Fallback     |   | - Cloud Firestore (Database) |
| - LeetCode Scraper & Metric Cache    |   | - Firebase Authentication    |
| - Static Asset Delivery (/logo.png)  |   | - firestore.rules Security   |
+--------------------------------------+   +------------------------------+
```

---

## 2. Component Hierarchy & Modular Structure

```
src/
├── App.tsx                     # Top-level orchestrator & state distributor
├── main.tsx                    # React DOM entry point
├── index.css                   # Global Tailwind CSS styles
├── types/                      # Universal TypeScript interfaces
│   └── index.ts                # Candidate, Interview, and Subject definitions
├── config/                     # Configuration Abstraction Layer
│   └── firebase.config.ts      # Zero-leak environment fallback system
├── firebase.ts                 # Initialized Firebase Auth & Firestore instances
├── components/                 # Presentation & feature modules
│   ├── HeaderBar.tsx           # Global header with single canonical logo
│   ├── Navbar.tsx              # Sidebar navigation and module switches
│   ├── ExecutiveDashboard.tsx  # Readiness Index, Streaks & Analytics
│   ├── MockInterviewModule.tsx # Voice capture, Audio waveform & Gemini rubric
│   ├── SubjectPracticeModule.tsx # Core CS (DSA, OS, DBMS, CN, OOP) Hub
│   ├── LeetCodeTracker.tsx     # LeetCode statistics scraper & charts
│   ├── AssessmentQuiz.tsx      # Subject MCQs and conceptual evaluation
│   └── MindsetTracker.tsx      # Interview anxiety management & quotes
└── utils/                      # Helper libraries and audio formatters
```

---

## 3. Audio & Voice Transcription Pipeline

The voice mock interview system captures raw spoken audio from the candidate and evaluates it without audio truncation:

```
[Candidate clicks 'Start Speaking']
               │
               ▼
[navigator.mediaDevices.getUserMedia({ audio: true })]
  ├── If Permission Granted:
  │     ├── Initialize MediaRecorder(stream, { mimeType: 'audio/webm' })
  │     ├── Capture audio chunks into Blob
  │     └── Animate live audio pulse waveform in UI
  └── If Permission Blocked / Denied:
        ├── Graceful notice via console.warn (No fatal exceptions)
        ├── Switch UI mode to 'Type Mode' immediately
        └── Render banner with one-click sample answer insertion
               │
[Candidate clicks 'Stop Speaking & Submit']
               │
               ▼
[Convert Blob to Base64 Audio Buffer]
               │
               ▼
[POST /api/transcribe-audio]
  ├── Express server decodes buffer
  ├── Calls speech-to-text transcription engine
  └── Returns clean JSON string: { transcript: "..." }
               │
               ▼
[Candidate Transcript Passed to Gemini AI Evaluator]
  ├── Multi-model cascade (Gemini 2.5 Flash -> Gemini 2.5 Pro)
  ├── Structured rubric evaluation (0–10 score, strengths, suggestions)
  └── Persist result in Firestore (users/{userId}/interviews)
```

---

## 4. Configuration Abstraction & GitHub Zero-Leak Design

To allow students and developers to clone and publish PrepPulse AI to public GitHub repositories without accidentally exposing private API keys:

1. **Hierarchy of Configuration**:
   - `VITE_FIREBASE_*` environment variables in production / CI/CD.
   - `firebase-applet-config.json` for local development (strictly ignored in `.gitignore`).
   - Default sanitized placeholders in `firebase.config.ts` ensuring the build never fails on missing modules.

2. **Template Provisioning**:
   - `.env.example`: Provides clear instructions for required environment variables.
   - `firebase-applet-config.example.json`: Provides a clean schema without private credentials.

---

## 5. Security Architecture (Firestore Rules)

Access control is enforced at the database level via `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /interviews/{interviewId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      match /progress/{progressId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

This ensures that candidates cannot access or modify each other's mock interview results or preparation metrics.
