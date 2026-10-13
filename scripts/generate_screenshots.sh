#!/bin/bash
set -e

mkdir -p screenshots
rm -f screenshots/01_test.png

echo "Generating Screenshot 1: Executive Placement Dashboard..."
convert -size 1400x900 xc:"#0b1120" \
  -fill "#1e293b" -draw "roundrectangle 30,30 1370,870 16,16" \
  -fill "#0f172a" -draw "roundrectangle 30,30 1370,110 16,16" \
  -fill "#0284c7" -draw "roundrectangle 50,48 100,92 10,10" \
  -fill "white" -pointsize 24 -draw "text 120,80 'PrepPulse AI  •  Executive Placement Dashboard'" \
  -fill "#94a3b8" -pointsize 14 -draw "text 950,80 'Target Role: SDE-1 / Software Engineer'" \
  -fill "#22c55e" -draw "circle 1320,80 1326,80" \
  \
  -fill "#0f172a" -draw "roundrectangle 60,140 370,300 12,12" \
  -fill "#38bdf8" -pointsize 14 -draw "text 80,175 'INTERVIEW READINESS'" \
  -fill "#ffffff" -pointsize 42 -draw "text 80,235 '88%'" \
  -fill "#22c55e" -pointsize 13 -draw "text 80,270 '+12% from last mock session'" \
  \
  -fill "#0f172a" -draw "roundrectangle 400,140 710,300 12,12" \
  -fill "#f59e0b" -pointsize 14 -draw "text 420,175 'DAILY ACTIVE STREAK'" \
  -fill "#ffffff" -pointsize 42 -draw "text 420,235 '14 Days'" \
  -fill "#f59e0b" -pointsize 13 -draw "text 420,270 'Consistent daily preparation habit'" \
  \
  -fill "#0f172a" -draw "roundrectangle 740,140 1050,300 12,12" \
  -fill "#a855f7" -pointsize 14 -draw "text 760,175 'LEETCODE SOLVED'" \
  -fill "#ffffff" -pointsize 42 -draw "text 760,235 '342 Qs'" \
  -fill "#a855f7" -pointsize 13 -draw "text 760,270 '185 Easy • 128 Med • 29 Hard'" \
  \
  -fill "#0f172a" -draw "roundrectangle 1080,140 1340,300 12,12" \
  -fill "#10b981" -pointsize 14 -draw "text 1100,175 'CLOUD SYNC'" \
  -fill "#ffffff" -pointsize 32 -draw "text 1100,230 'ACTIVE'" \
  -fill "#10b981" -pointsize 13 -draw "text 1100,270 'Firestore real-time state'" \
  \
  -fill "#0f172a" -draw "roundrectangle 60,330 880,840 12,12" \
  -fill "#ffffff" -pointsize 20 -draw "text 90,375 'Core Computer Science & Coding Competency'" \
  -fill "#94a3b8" -pointsize 14 -draw "text 90,405 'Detailed mastery progress across key technical placement subjects'" \
  \
  -fill "#334155" -draw "roundrectangle 90,440 850,470 6,6" \
  -fill "#0284c7" -draw "roundrectangle 90,440 780,470 6,6" \
  -fill "#e2e8f0" -pointsize 14 -draw "text 90,430 'Data Structures & Algorithms (92% Ready)'" \
  \
  -fill "#334155" -draw "roundrectangle 90,520 850,550 6,6" \
  -fill "#10b981" -draw "roundrectangle 90,520 740,550 6,6" \
  -fill "#e2e8f0" -pointsize 14 -draw "text 90,510 'Database Management Systems - DBMS & SQL (85% Ready)'" \
  \
  -fill "#334155" -draw "roundrectangle 90,600 850,630 6,6" \
  -fill "#f59e0b" -draw "roundrectangle 90,600 710,630 6,6" \
  -fill "#e2e8f0" -pointsize 14 -draw "text 90,590 'Operating Systems & Concurrency (80% Ready)'" \
  \
  -fill "#334155" -draw "roundrectangle 90,680 850,710 6,6" \
  -fill "#ec4899" -draw "roundrectangle 90,680 690,710 6,6" \
  -fill "#e2e8f0" -pointsize 14 -draw "text 90,670 'Computer Networks & System Architecture (78% Ready)'" \
  \
  -fill "#334155" -draw "roundrectangle 90,760 850,790 6,6" \
  -fill "#8b5cf6" -draw "roundrectangle 90,760 760,790 6,6" \
  -fill "#e2e8f0" -pointsize 14 -draw "text 90,750 'Object Oriented Programming & SOLID (88% Ready)'" \
  \
  -fill "#0f172a" -draw "roundrectangle 910,330 1340,840 12,12" \
  -fill "#ffffff" -pointsize 20 -draw "text 935,375 'Recent AI Mock Interviews'" \
  -fill "#334155" -draw "roundrectangle 935,410 1315,530 8,8" \
  -fill "#38bdf8" -pointsize 15 -draw "text 955,445 'System Design: Rate Limiter'" \
  -fill "#22c55e" -pointsize 14 -draw "text 955,480 'Score: 9.2/10 • Strong Trade-offs'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 955,510 'Evaluator: Gemini AI • Today 11:30 AM'" \
  \
  -fill "#334155" -draw "roundrectangle 935,550 1315,670 8,8" \
  -fill "#38bdf8" -pointsize 15 -draw "text 955,585 'DSA: Graph Cycles & Topological Sort'" \
  -fill "#22c55e" -pointsize 14 -draw "text 955,620 'Score: 8.8/10 • Good Verbal Reasoning'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 955,650 'Evaluator: Gemini AI • Yesterday 4:15 PM'" \
  \
  -fill "#334155" -draw "roundrectangle 935,690 1315,810 8,8" \
  -fill "#38bdf8" -pointsize 15 -draw "text 955,725 'DBMS: B+ Tree Indexing & ACID'" \
  -fill "#22c55e" -pointsize 14 -draw "text 955,760 'Score: 9.0/10 • Precise Explanations'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 955,790 'Evaluator: Gemini AI • 2 days ago'" \
  screenshots/01_executive_dashboard.png

echo "Generating Screenshot 2: Voice Mock Interview Module..."
convert -size 1400x900 xc:"#0b1120" \
  -fill "#1e293b" -draw "roundrectangle 30,30 1370,870 16,16" \
  -fill "#0f172a" -draw "roundrectangle 30,30 1370,110 16,16" \
  -fill "#0284c7" -draw "roundrectangle 50,48 100,92 10,10" \
  -fill "white" -pointsize 24 -draw "text 120,80 'PrepPulse AI  •  Voice Mock Interview Session'" \
  -fill "#ef4444" -draw "circle 1180,80 1188,80" \
  -fill "#ef4444" -pointsize 16 -draw "text 1205,85 'LIVE RECORDING'" \
  \
  -fill "#0f172a" -draw "roundrectangle 60,140 850,420 12,12" \
  -fill "#38bdf8" -pointsize 14 -draw "text 85,175 'INTERVIEW QUESTION (QUESTION 3 OF 5)'" \
  -fill "#ffffff" -pointsize 20 -draw "text 85,215 'Can you explain the differences between Processes and Threads,'" \
  -fill "#ffffff" -pointsize 20 -draw "text 85,245 'and describe how Context Switching overhead impacts OS throughput?'" \
  -fill "#94a3b8" -pointsize 14 -draw "text 85,290 'Domain: Operating Systems & Concurrency • Role: SDE-1'" \
  -fill "#0284c7" -draw "roundrectangle 85,325 240,375 8,8" \
  -fill "white" -pointsize 14 -draw "text 105,355 'Audio Waveform Active'" \
  \
  -fill "#0f172a" -draw "roundrectangle 60,450 850,840 12,12" \
  -fill "#10b981" -pointsize 14 -draw "text 85,485 'CANDIDATE LIVE SPEECH TRANSCRIPTION'" \
  -fill "#e2e8f0" -pointsize 16 -draw "text 85,525 'A process has its own dedicated address space and virtual memory,'" \
  -fill "#e2e8f0" -pointsize 16 -draw "text 85,555 'whereas threads within the same process share the heap and data segments.'" \
  -fill "#e2e8f0" -pointsize 16 -draw "text 85,585 'Context switching between processes requires invalidating TLB caches,'" \
  -fill "#e2e8f0" -pointsize 16 -draw "text 85,615 'which incurs heavier overhead than thread-level context switches...'" \
  \
  -fill "#ef4444" -draw "roundrectangle 85,670 280,725 8,8" \
  -fill "white" -pointsize 15 -draw "text 110,705 'Stop Speaking & Submit'" \
  -fill "#334155" -draw "roundrectangle 300,670 480,725 8,8" \
  -fill "#94a3b8" -pointsize 15 -draw "text 325,705 'Switch to Type Mode'" \
  -fill "#334155" -draw "roundrectangle 500,670 690,725 8,8" \
  -fill "#94a3b8" -pointsize 15 -draw "text 520,705 'Insert Sample Answer'" \
  \
  -fill "#0f172a" -draw "roundrectangle 880,140 1340,840 12,12" \
  -fill "#ffffff" -pointsize 20 -draw "text 910,180 'Gemini AI Evaluator Rubric'" \
  -fill "#22c55e" -pointsize 38 -draw "text 910,235 '9.4 / 10'" \
  -fill "#94a3b8" -pointsize 14 -draw "text 910,265 'Performance Rating: Strong Hire (Level 4)'" \
  \
  -fill "#1e293b" -draw "roundrectangle 910,290 1310,410 8,8" \
  -fill "#38bdf8" -pointsize 15 -draw "text 930,320 'Key Strengths Identified'" \
  -fill "#cbd5e1" -pointsize 13 -draw "text 930,350 '• Mentioned TLB cache invalidation explicitly.'" \
  -fill "#cbd5e1" -pointsize 13 -draw "text 930,380 '• Clear contrast between shared heap vs private stack.'" \
  \
  -fill "#1e293b" -draw "roundrectangle 910,430 1310,550 8,8" \
  -fill "#f59e0b" -pointsize 15 -draw "text 930,460 'Actionable Recommendations'" \
  -fill "#cbd5e1" -pointsize 13 -draw "text 930,490 '• Emphasize PCB (Process Control Block) registers.'" \
  -fill "#cbd5e1" -pointsize 13 -draw "text 930,520 '• Provide a real-world example like Web Browser tabs.'" \
  \
  -fill "#1e293b" -draw "roundrectangle 910,570 1310,810 8,8" \
  -fill "#a855f7" -pointsize 15 -draw "text 930,600 'Model Benchmark Answer'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 930,635 'A process is an isolated program instance with private memory;'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 930,665 'a thread is a lightweight execution unit inside a process.'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 930,695 'Process context switching incurs CPU cache eviction and TLB flushes;'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 930,725 'thread switching only switches registers and execution stacks.'" \
  screenshots/02_voice_mock_interview.png

echo "Generating Screenshot 3: DSA & Core CS Practice Module..."
convert -size 1400x900 xc:"#0b1120" \
  -fill "#1e293b" -draw "roundrectangle 30,30 1370,870 16,16" \
  -fill "#0f172a" -draw "roundrectangle 30,30 1370,110 16,16" \
  -fill "#0284c7" -draw "roundrectangle 50,48 100,92 10,10" \
  -fill "white" -pointsize 24 -draw "text 120,80 'PrepPulse AI  •  Core CS & Algorithmic Practice Hub'" \
  -fill "#38bdf8" -pointsize 14 -draw "text 950,80 'Subject: Operating Systems  •  Topic: Concurrency & Synchronization'" \
  \
  -fill "#0f172a" -draw "roundrectangle 60,140 450,840 12,12" \
  -fill "#ffffff" -pointsize 18 -draw "text 85,175 'Operating Systems Syllabus'" \
  -fill "#0284c7" -draw "roundrectangle 80,200 430,250 8,8" \
  -fill "white" -pointsize 14 -draw "text 95,232 '1. Process Scheduling & CPU Queues' " \
  -fill "#1e293b" -draw "roundrectangle 80,265 430,315 8,8" \
  -fill "#cbd5e1" -pointsize 14 -draw "text 95,297 '2. Virtual Memory & Page Replacement' " \
  -fill "#1e293b" -draw "roundrectangle 80,330 430,380 8,8" \
  -fill "#cbd5e1" -pointsize 14 -draw "text 95,362 '3. Semaphores, Mutex & Deadlocks' " \
  -fill "#1e293b" -draw "roundrectangle 80,395 430,445 8,8" \
  -fill "#cbd5e1" -pointsize 14 -draw "text 95,427 '4. File Systems & Inodes' " \
  -fill "#1e293b" -draw "roundrectangle 80,460 430,510 8,8" \
  -fill "#cbd5e1" -pointsize 14 -draw "text 95,492 '5. Disk Scheduling (SCAN, C-LOOK)' " \
  \
  -fill "#0f172a" -draw "roundrectangle 480,140 1340,840 12,12" \
  -fill "#38bdf8" -pointsize 14 -draw "text 510,175 'CONCEPTUAL BREAKDOWN & FREQUENT INTERVIEW QUESTIONS'" \
  -fill "#ffffff" -pointsize 22 -draw "text 510,215 'Deadlock Necessary Conditions & Banker s Algorithm'" \
  -fill "#94a3b8" -pointsize 14 -draw "text 510,250 'Coffman Conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait'" \
  \
  -fill "#1e293b" -draw "roundrectangle 510,280 1310,520 8,8" \
  -fill "#22c55e" -pointsize 15 -draw "text 530,310 'Code Implementation: Resource Allocation Matrix (C++)'" \
  -fill "#f8fafc" -pointsize 13 -draw "text 530,345 'bool isSafeState(int processes[], int avail[], int maxM[][R], int allot[][R]) {'" \
  -fill "#f8fafc" -pointsize 13 -draw "text 550,375 '    int need[P][R]; calculateNeed(need, maxM, allot);'" \
  -fill "#f8fafc" -pointsize 13 -draw "text 550,405 '    bool finish[P] = {0}; int work[R]; copy(avail, work);'" \
  -fill "#f8fafc" -pointsize 13 -draw "text 550,435 '    // Find unallocated process whose need can be satisfied'" \
  -fill "#f8fafc" -pointsize 13 -draw "text 550,465 '    while (count < P) { ... } return true;'" \
  -fill "#f8fafc" -pointsize 13 -draw "text 530,495 '}'" \
  \
  -fill "#1e293b" -draw "roundrectangle 510,545 1310,810 8,8" \
  -fill "#f59e0b" -pointsize 16 -draw "text 530,580 'Complexity Analysis & Common Pitfalls'" \
  -fill "#cbd5e1" -pointsize 14 -draw "text 530,615 '• Time Complexity: O(P * P * R) where P is processes, R is resource types.'" \
  -fill "#cbd5e1" -pointsize 14 -draw "text 530,650 '• Space Complexity: O(P * R) for the Need and Allocation matrices.'" \
  -fill "#cbd5e1" -pointsize 14 -draw "text 530,685 '• High-Probability Interview Question: Difference between Deadlock Prevention and Avoidance.'" \
  -fill "#0284c7" -draw "roundrectangle 530,730 730,785 8,8" \
  -fill "white" -pointsize 14 -draw "text 560,763 'Practice Quiz (15 Qs)'" \
  -fill "#334155" -draw "roundrectangle 750,730 960,785 8,8" \
  -fill "#94a3b8" -pointsize 14 -draw "text 775,763 'Test Code in Sandbox'" \
  screenshots/03_dsa_core_cs_module.png

echo "Generating Screenshot 4: LeetCode Profile Tracker & Metrics..."
convert -size 1400x900 xc:"#0b1120" \
  -fill "#1e293b" -draw "roundrectangle 30,30 1370,870 16,16" \
  -fill "#0f172a" -draw "roundrectangle 30,30 1370,110 16,16" \
  -fill "#0284c7" -draw "roundrectangle 50,48 100,92 10,10" \
  -fill "white" -pointsize 24 -draw "text 120,80 'PrepPulse AI  •  LeetCode Performance & Metrics Tracker'" \
  -fill "#22c55e" -pointsize 14 -draw "text 950,80 'Profile: leetcode.com/masuma_akhtar  •  Synced Just Now'" \
  \
  -fill "#0f172a" -draw "roundrectangle 60,140 450,400 12,12" \
  -fill "#f59e0b" -pointsize 14 -draw "text 85,175 'TOTAL PROBLEMS SOLVED'" \
  -fill "#ffffff" -pointsize 48 -draw "text 85,240 '342'" \
  -fill "#94a3b8" -pointsize 14 -draw "text 85,280 'Ranking: Top 8.4% globally'" \
  -fill "#22c55e" -pointsize 14 -draw "text 85,310 'Acceptance Rate: 68.4%'" \
  -fill "#38bdf8" -pointsize 14 -draw "text 85,340 'Contest Rating: 1748 (Knight Candidate)'" \
  \
  -fill "#0f172a" -draw "roundrectangle 480,140 1340,400 12,12" \
  -fill "#ffffff" -pointsize 18 -draw "text 510,175 'Difficulty Breakdown & Target Goals'" \
  \
  -fill "#334155" -draw "roundrectangle 510,210 1310,245 8,8" \
  -fill "#22c55e" -draw "roundrectangle 510,210 1150,245 8,8" \
  -fill "#ffffff" -pointsize 13 -draw "text 530,233 'Easy: 185 / 200 Solved (92%)'" \
  \
  -fill "#334155" -draw "roundrectangle 510,270 1310,305 8,8" \
  -fill "#f59e0b" -draw "roundrectangle 510,270 980,305 8,8" \
  -fill "#ffffff" -pointsize 13 -draw "text 530,293 'Medium: 128 / 180 Solved (71%)'" \
  \
  -fill "#334155" -draw "roundrectangle 510,330 1310,365 8,8" \
  -fill "#ef4444" -draw "roundrectangle 510,330 730,365 8,8" \
  -fill "#ffffff" -pointsize 13 -draw "text 530,353 'Hard: 29 / 50 Solved (58%)'" \
  \
  -fill "#0f172a" -draw "roundrectangle 60,430 1340,840 12,12" \
  -fill "#ffffff" -pointsize 20 -draw "text 90,470 'Topic Mastery & Algorithmic Tag Distribution'" \
  -fill "#334155" -draw "roundrectangle 90,505 470,640 8,8" \
  -fill "#38bdf8" -pointsize 16 -draw "text 110,540 'Dynamic Programming'" \
  -fill "#cbd5e1" -pointsize 13 -draw "text 110,575 '54 Solved • 84% Accuracy'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 110,605 'Knapsack, LIS, Matrix Chain'" \
  \
  -fill "#334155" -draw "roundrectangle 500,505 890,640 8,8" \
  -fill "#38bdf8" -pointsize 16 -draw "text 520,540 'Trees & Binary Search Trees'" \
  -fill "#cbd5e1" -pointsize 13 -draw "text 520,575 '68 Solved • 91% Accuracy'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 520,605 'LCA, Traversals, Path Sums'" \
  \
  -fill "#334155" -draw "roundrectangle 920,505 1310,640 8,8" \
  -fill "#38bdf8" -pointsize 16 -draw "text 940,540 'Graphs & Topological Sort'" \
  -fill "#cbd5e1" -pointsize 13 -draw "text 940,575 '42 Solved • 79% Accuracy'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 940,605 'Dijkstra, BFS, Disjoint Set'" \
  \
  -fill "#1e293b" -draw "roundrectangle 90,670 1310,810 8,8" \
  -fill "#a855f7" -pointsize 16 -draw "text 110,705 'Interview Readiness Assessment'" \
  -fill "#cbd5e1" -pointsize 14 -draw "text 110,740 'Your algorithmic depth in Trees and Dynamic Programming is within the 90th percentile of successful applicants.'" \
  -fill "#cbd5e1" -pointsize 14 -draw "text 110,775 'Recommendation: Practice 10 more Graph Hard problems to solidify Top-Tier MNC placement prospects.'" \
  screenshots/04_leetcode_tracker.png

echo "Generating Screenshot 5: System Architecture Diagram..."
convert -size 1400x900 xc:"#0b1120" \
  -fill "#1e293b" -draw "roundrectangle 30,30 1370,870 16,16" \
  -fill "#0f172a" -draw "roundrectangle 30,30 1370,110 16,16" \
  -fill "#0284c7" -draw "roundrectangle 50,48 100,92 10,10" \
  -fill "white" -pointsize 24 -draw "text 120,80 'PrepPulse AI  •  End-to-End System Architecture Blueprint'" \
  -fill "#94a3b8" -pointsize 14 -draw "text 950,80 'Client  <==>  Express API Proxy  <==>  Gemini AI & Cloud Firestore'" \
  \
  -fill "#0f172a" -draw "roundrectangle 60,160 430,820 12,12" \
  -fill "#38bdf8" -pointsize 18 -draw "text 85,200 '1. PRESENTATION LAYER (SPA)'" \
  -fill "#1e293b" -draw "roundrectangle 80,230 410,340 8,8" \
  -fill "#ffffff" -pointsize 15 -draw "text 95,260 'React 19 & TypeScript'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 95,290 'Modular hooks & functional components'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 95,315 'Tailwind CSS v4 & Motion primitives'" \
  \
  -fill "#1e293b" -draw "roundrectangle 80,360 410,480 8,8" \
  -fill "#ffffff" -pointsize 15 -draw "text 95,390 'Web Audio & MediaRecorder'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 95,420 'Browser microphone capture & stream'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 95,445 'Automatic permission handling & fallback'" \
  \
  -fill "#1e293b" -draw "roundrectangle 80,500 410,620 8,8" \
  -fill "#ffffff" -pointsize 15 -draw "text 95,530 'Config Abstraction Layer'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 95,560 'firebase.config.ts (Zero-leak design)'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 95,585 'VITE_ env vars with sanitized fallbacks'" \
  \
  -fill "#0f172a" -draw "roundrectangle 470,160 910,820 12,12" \
  -fill "#10b981" -pointsize 18 -draw "text 495,200 '2. BACKEND API PROXY LAYER'" \
  -fill "#1e293b" -draw "roundrectangle 490,230 890,360 8,8" \
  -fill "#ffffff" -pointsize 15 -draw "text 510,260 'Express.js & Vite Middleware'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 510,290 'TypeScript server (server.ts)'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 510,315 'Zero client secret exposure'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 510,340 'Port 3000 local dev & production container'" \
  \
  -fill "#1e293b" -draw "roundrectangle 490,380 890,520 8,8" \
  -fill "#ffffff" -pointsize 15 -draw "text 510,410 'Voice Transcription Route'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 510,440 '/api/transcribe-audio (Audio buffers)'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 510,465 'Speech-to-text processing & error isolation'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 510,490 'Graceful warning reporting'" \
  \
  -fill "#1e293b" -draw "roundrectangle 490,540 890,680 8,8" \
  -fill "#ffffff" -pointsize 15 -draw "text 510,570 'AI Evaluation & Fallback Engine'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 510,600 'Cascade: gemini-2.5-flash -> gemini-2.5-pro'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 510,625 'Timeout guards (4500ms) with circuit breakers'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 510,650 'Structured JSON schema responses'" \
  \
  -fill "#0f172a" -draw "roundrectangle 950,160 1340,820 12,12" \
  -fill "#a855f7" -pointsize 18 -draw "text 975,200 '3. CLOUD & PERSISTENCE'" \
  -fill "#1e293b" -draw "roundrectangle 970,230 1320,380 8,8" \
  -fill "#ffffff" -pointsize 15 -draw "text 990,260 'Google Gemini 2.5 Flash / Pro'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 990,290 '@google/genai SDK TypeScript'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 990,315 'Question bank generation & scoring'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 990,340 'Instant actionable feedback'" \
  \
  -fill "#1e293b" -draw "roundrectangle 970,400 1320,550 8,8" \
  -fill "#ffffff" -pointsize 15 -draw "text 990,430 'Firebase Cloud Firestore'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 990,460 'Collection: users/{userId}/interviews'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 990,485 'Collection: users/{userId}/progress'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 990,510 'Real-time multi-device synchronization'" \
  \
  -fill "#1e293b" -draw "roundrectangle 970,570 1320,720 8,8" \
  -fill "#ffffff" -pointsize 15 -draw "text 990,600 'Role & Security Rules'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 990,630 'firestore.rules enforcement'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 990,655 'Data strictly owned by authenticated user'" \
  -fill "#94a3b8" -pointsize 12 -draw "text 990,680 'Zero unauthorized database access'" \
  screenshots/05_system_architecture_diagram.png

echo "Generating Screenshot 6: Mobile & Responsive Layout..."
convert -size 1400x900 xc:"#0b1120" \
  -fill "#1e293b" -draw "roundrectangle 30,30 1370,870 16,16" \
  -fill "#0f172a" -draw "roundrectangle 30,30 1370,110 16,16" \
  -fill "#0284c7" -draw "roundrectangle 50,48 100,92 10,10" \
  -fill "white" -pointsize 24 -draw "text 120,80 'PrepPulse AI  •  Responsive Multi-Device Layout'" \
  -fill "#94a3b8" -pointsize 14 -draw "text 950,80 'Desktop, Tablet & Mobile Viewports'" \
  \
  -fill "#0f172a" -draw "roundrectangle 100,160 520,820 24,24" \
  -fill "#1e293b" -draw "roundrectangle 120,180 500,800 16,16" \
  -fill "#0284c7" -draw "roundrectangle 140,200 480,240 8,8" \
  -fill "white" -pointsize 14 -draw "text 160,225 'PrepPulse Mobile App'" \
  -fill "#0f172a" -draw "roundrectangle 140,260 480,380 8,8" \
  -fill "#38bdf8" -pointsize 12 -draw "text 155,290 'READINESS INDEX'" \
  -fill "#ffffff" -pointsize 32 -draw "text 155,335 '88%'" \
  -fill "#22c55e" -pointsize 11 -draw "text 155,365 'Top 5% candidate ranking'" \
  \
  -fill "#0f172a" -draw "roundrectangle 140,400 480,550 8,8" \
  -fill "#ffffff" -pointsize 14 -draw "text 155,430 'Quick Actions'" \
  -fill "#ef4444" -draw "roundrectangle 155,450 465,490 6,6" \
  -fill "white" -pointsize 12 -draw "text 175,475 'Start Voice Mock Interview'" \
  -fill "#0284c7" -draw "roundrectangle 155,500 465,540 6,6" \
  -fill "white" -pointsize 12 -draw "text 175,525 'Practice DSA Daily Sheet'" \
  \
  -fill "#0f172a" -draw "roundrectangle 140,570 480,780 8,8" \
  -fill "#ffffff" -pointsize 14 -draw "text 155,600 'Subject Mastery'" \
  -fill "#334155" -draw "roundrectangle 155,620 465,640 4,4" \
  -fill "#0284c7" -draw "roundrectangle 155,620 430,640 4,4" \
  -fill "#94a3b8" -pointsize 11 -draw "text 155,615 'DSA (92%)'" \
  \
  -fill "#334155" -draw "roundrectangle 155,665 465,685 4,4" \
  -fill "#10b981" -draw "roundrectangle 155,665 410,685 4,4" \
  -fill "#94a3b8" -pointsize 11 -draw "text 155,660 'DBMS (85%)'" \
  \
  -fill "#334155" -draw "roundrectangle 155,710 465,730 4,4" \
  -fill "#f59e0b" -draw "roundrectangle 155,710 395,730 4,4" \
  -fill "#94a3b8" -pointsize 11 -draw "text 155,705 'OS & Threads (80%)'" \
  \
  -fill "#0f172a" -draw "roundrectangle 580,160 1320,820 16,16" \
  -fill "#ffffff" -pointsize 22 -draw "text 620,210 'Full Responsive Web Capabilities'" \
  -fill "#94a3b8" -pointsize 15 -draw "text 620,245 'Optimized for high-density desktop displays, tablets, and smartphones'" \
  \
  -fill "#1e293b" -draw "roundrectangle 620,280 1280,420 12,12" \
  -fill "#38bdf8" -pointsize 18 -draw "text 650,320 'Adaptive Touch & Audio Controls'" \
  -fill "#cbd5e1" -pointsize 14 -draw "text 650,355 '• Seamless touch triggers for microphone recording on mobile browsers.'" \
  -fill "#cbd5e1" -pointsize 14 -draw "text 650,385 '• Large touch targets (>48px) adhering to WCAG 2.1 accessibility criteria.'" \
  \
  -fill "#1e293b" -draw "roundrectangle 620,450 1280,590 12,12" \
  -fill "#10b981" -pointsize 18 -draw "text 650,490 'Dynamic Column Reordering & Grid Reflow'" \
  -fill "#cbd5e1" -pointsize 14 -draw "text 650,525 '• Grid switches from 3 columns on desktop (1440px) to single column on mobile (<640px).'" \
  -fill "#cbd5e1" -pointsize 14 -draw "text 650,555 '• Smooth drawer navigation and sticky bottom controls for interview sessions.'" \
  \
  -fill "#1e293b" -draw "roundrectangle 620,620 1280,760 12,12" \
  -fill "#a855f7" -pointsize 18 -draw "text 650,660 'PWA Ready & Zero-Lag Interaction'" \
  -fill "#cbd5e1" -pointsize 14 -draw "text 650,695 '• Responsive vector icons and fluid SVG charts.'" \
  -fill "#cbd5e1" -pointsize 14 -draw "text 650,725 '• Instant local state transitions with optimistic Firestore synchronization.'" \
  screenshots/06_mobile_responsive_view.png

echo "All 6 screenshots generated successfully!"
ls -lh screenshots/
