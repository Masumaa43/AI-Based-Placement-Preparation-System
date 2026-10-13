# PrepPulse AI — Backend REST API Documentation

This document describes all server-side endpoints implemented in `server.ts` running on the Express backend.

---

## Base URL
```
Development: http://localhost:3000
Production:  https://your-domain.com
```

---

## Endpoints

### 1. Transcribe Audio
Converts user voice audio recordings into plain-text transcripts.

- **Endpoint**: `POST /api/transcribe-audio`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "audio": "base64_encoded_audio_data_string",
    "mimeType": "audio/webm;codecs=opus"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "transcript": "A process has its own address space, whereas threads share heap memory within the same process."
  }
  ```
- **Error Response (400 / 500)**:
  ```json
  {
    "error": "Transcription failed"
  }
  ```

---

### 2. Evaluate Candidate Interview Response
Evaluates a candidate's answer against a structured technical interview rubric.

- **Endpoint**: `POST /api/gemini/evaluate`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "question": "Explain Deadlock Coffman conditions and Banker's Algorithm.",
    "candidateAnswer": "Deadlock requires mutual exclusion, hold and wait, no preemption, and circular wait...",
    "category": "Operating Systems",
    "role": "SDE-1"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "score": 9.2,
    "rating": "Strong Hire",
    "strengths": [
      "Correctly enumerated all four Coffman conditions.",
      "Accurately differentiated between deadlock prevention and avoidance."
    ],
    "improvements": [
      "Could mention the space complexity of Banker's Algorithm matrices."
    ],
    "idealAnswer": "A deadlock occurs when a set of concurrent processes are blocked because each process holds a resource...",
    "modelUsed": "gemini-2.5-flash"
  }
  ```

---

### 3. Generate Interview Question Bank
Generates targeted mock interview questions for specific roles and company profiles.

- **Endpoint**: `POST /api/gemini/generate-questions`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "role": "Software Engineer",
    "companyType": "MNC / FAANG",
    "topics": ["DSA", "Operating Systems", "System Design"],
    "count": 5
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "questions": [
      {
        "id": "q1",
        "question": "How would you design a scalable distributed rate limiter?",
        "topic": "System Design",
        "difficulty": "Medium"
      }
    ]
  }
  ```

---

### 4. Fetch LeetCode Profile Statistics
Fetches live algorithmic problem stats for a user handle.

- **Endpoint**: `GET /api/leetcode/:username`
- **Success Response (200 OK)**:
  ```json
  {
    "username": "masuma_akhtar",
    "totalSolved": 342,
    "easySolved": 185,
    "mediumSolved": 128,
    "hardSolved": 29,
    "ranking": 84200,
    "acceptanceRate": 68.4
  }
  ```

---

### 5. Static Logo Asset Route
Provides the canonical official logo image.

- **Endpoint**: `GET /logo.png`
- **Aliases**: `/logo`, `/logo.jpg`, `/favicon.ico`
- **Response**: `image/png` binary stream of `/public/logo.png`.
