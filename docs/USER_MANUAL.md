# PrepPulse AI — User & Evaluator Manual

This manual provides a quick-start walkthrough for students, interview candidates, and project evaluators demonstrating how to use all features of **PrepPulse AI**.

---

## 1. Quick Start Guide

### Step 1: Open the Application
Navigate to the hosted URL or run locally on `http://localhost:3000`.

### Step 2: Sign In / Profile Initialization
- Click the **Sign In** button in the top navigation bar to authenticate with Google or anonymous guest access.
- Your progress, daily streaks, and mock interview logs will automatically sync with Cloud Firestore.

---

## 2. Navigating Key Modules

### Module 1: Executive Dashboard
- **Location**: Top tab **Dashboard** or clicking the PrepPulse logo in the top-left corner.
- **Features**:
  - View your aggregate **Candidate Readiness Index** (percentage score).
  - Track your **Daily Preparation Streak** (consecutive days of practice).
  - Review mastery bars for Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, and Object-Oriented Programming.
  - Review your recent mock interview session history and average scores.

### Module 2: Voice Mock Interview
- **Location**: Tab **Mock Interview**.
- **How to Practice**:
  1. Select your target **Role** (e.g. SDE-1, Full-Stack Developer) and **Company Profile**.
  2. Click **Start Interview** to load the question set.
  3. Click **Start Speaking** (Microphone Icon) to speak your answer aloud.
     - *Note*: If browser microphone permissions are blocked, the system displays an amber notice banner and allows you to type your response or click **Insert Sample Answer** to test the AI evaluation immediately.
  4. Click **Stop Speaking & Submit**.
  5. Receive instant **Gemini AI Evaluation**:
     - Numerical score (0 to 10).
     - Breakdown of key technical strengths.
     - Actionable points for improvement.
     - Benchmark model answer.

### Module 3: Core CS & Algorithmic Practice Hub
- **Location**: Tab **Core CS & DSA**.
- **How to Study**:
  1. Choose a subject track: **DSA**, **Operating Systems**, **DBMS**, **Computer Networks**, or **OOP**.
  2. Click any subtopic (e.g. Deadlocks, B+ Trees, TCP/IP, Polymorphism).
  3. Study the deep conceptual breakdown, complexity analysis, and code implementations.
  4. Test your understanding with the self-assessment topic quiz.

### Module 4: LeetCode Performance Tracker
- **Location**: Tab **LeetCode Sync**.
- **How to Track**:
  1. Enter your LeetCode username and click **Sync Profile**.
  2. Inspect the breakdown of Easy, Medium, and Hard solved problems.
  3. View algorithmic tag distribution (Dynamic Programming, Trees, Graphs).

---

## 3. Evaluator Demonstration Checklist

For examiners and academic evaluators grading the Major Project:

| Feature to Test | Actions | Expected Result |
| :--- | :--- | :--- |
| **1. Voice Input** | Click "Start Speaking" in Mock Interview | Microphone audio wave animates |
| **2. Fallback Mode** | Deny mic permission or click "Type Mode" | Clean text input box appears; no crash |
| **3. AI Scoring** | Submit answer in Mock Interview | Instant rubric score (0-10) with suggestions |
| **4. Core CS Hub** | Navigate to OS -> Deadlocks | Interactive code & complexity displays |
| **5. LeetCode Stats** | Sync username on LeetCode tab | Progress bars and problem stats render |
| **6. Cloud Sync** | Check top bar status indicator | Displays active sync status |
