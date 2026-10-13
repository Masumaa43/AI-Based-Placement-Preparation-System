import { 
  UserTopicProgress, 
  MoodType, 
  AIDashboardReport, 
  LeetCodeProfile, 
  GardenState, 
  MockInterviewSession,
  PersonalizedStudyPath,
  StudyPathStep 
} from '../types';
import { SUBJECT_METAS } from '../data/subjects';
import { createInitialGardenState } from '../data/garden';

const STORAGE_KEYS = {
  TOPIC_PROGRESS: 'preppulse_topic_progress',
  CURRENT_MOOD: 'preppulse_current_mood',
  MOOD_HISTORY: 'preppulse_mood_history',
  LEETCODE_PROFILE: 'preppulse_leetcode_profile',
  AI_REPORT: 'preppulse_ai_report',
  QUIZ_HISTORY: 'preppulse_quiz_history',
  NOTES: 'preppulse_notes',
  GARDEN_STATE: 'preppulse_garden_state',
  MOCK_INTERVIEW_HISTORY: 'preppulse_mock_interview_history',
  STUDY_PATH: 'preppulse_personalized_study_path',
  GFG_SOLVED: 'preppulse_gfg_solved_problems'
};

// Initial default topic progress based on subjects
export function getInitialTopicProgress(): Record<string, UserTopicProgress> {
  const defaults: Record<string, UserTopicProgress> = {};
  
  SUBJECT_METAS.forEach(subject => {
    subject.topics.forEach((topic, idx) => {
      // Seed a few as covered and a few as weak so the dashboard has rich immediate visualization
      let status: 'not_started' | 'covered' | 'weak' = 'not_started';
      if (idx === 0) status = 'covered';
      if (idx === 1 && subject.id === 'dbms') status = 'weak';
      if (idx === 3 && subject.id === 'os') status = 'weak';
      if (idx === 4 && subject.id === 'dsa') status = 'weak';
      
      defaults[topic.id] = {
        topicId: topic.id,
        subjectId: subject.id,
        status,
        timesTested: status !== 'not_started' ? 2 : 0,
        timesCorrect: status === 'covered' ? 2 : (status === 'weak' ? 0 : 0)
      };
    });
  });

  return defaults;
}

export function loadTopicProgress(): Record<string, UserTopicProgress> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TOPIC_PROGRESS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load topic progress', e);
  }
  return getInitialTopicProgress();
}

export function saveTopicProgress(data: Record<string, UserTopicProgress>) {
  try {
    localStorage.setItem(STORAGE_KEYS.TOPIC_PROGRESS, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save topic progress', e);
  }
}

export function loadCurrentMood(): MoodType {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_MOOD);
    if (raw && ['bad', 'good', 'better', 'best'].includes(raw)) {
      return raw as MoodType;
    }
  } catch (e) {}
  return 'good';
}

export function saveCurrentMood(mood: MoodType) {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_MOOD, mood);
    
    // Also push to mood history
    const historyRaw = localStorage.getItem(STORAGE_KEYS.MOOD_HISTORY);
    const history = historyRaw ? JSON.parse(historyRaw) : [];
    history.unshift({
      mood,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEYS.MOOD_HISTORY, JSON.stringify(history.slice(0, 30)));
  } catch (e) {}
}

export function loadLeetCodeProfile(): LeetCodeProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEETCODE_PROFILE);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

export function saveLeetCodeProfile(profile: LeetCodeProfile) {
  try {
    localStorage.setItem(STORAGE_KEYS.LEETCODE_PROFILE, JSON.stringify(profile));
  } catch (e) {}
}

export function loadAIReport(): AIDashboardReport | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AI_REPORT);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

export function saveAIReport(report: AIDashboardReport) {
  try {
    localStorage.setItem(STORAGE_KEYS.AI_REPORT, JSON.stringify(report));
  } catch (e) {}
}

export function loadGardenState(): GardenState {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GARDEN_STATE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load garden state', e);
  }
  return createInitialGardenState();
}

export function saveGardenState(state: GardenState) {
  try {
    localStorage.setItem(STORAGE_KEYS.GARDEN_STATE, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save garden state', e);
  }
}

// Initial sample mock interview sessions for first-time visitors
export function getSampleMockInterviewHistory(): MockInterviewSession[] {
  return [
    {
      id: 'mock_sample_1',
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      formattedDate: '2 days ago',
      subjectId: 'dbms',
      subjectTitle: 'Database Management Systems (DBMS)',
      difficulty: 'Mid-Level',
      interviewerPersona: 'Alex (Staff Systems Engineer)',
      totalRounds: 3,
      completedRounds: 3,
      averageScore: 88,
      verdict: 'Recommended to Onsite',
      transcriptSummary: 'Strong articulate grasp of Write-Ahead Logging (WAL) and B+ Tree node splitting mechanics. Addressed crash recovery with checkpointing clearly.',
      strengthsSummary: [
        'Precise distinction between B-Tree and B+ Tree leaf pointer linking',
        'Accurately walked through ARIES recovery algorithm stages (Analysis, Redo, Undo)',
        'Clear articulation of ACID isolation anomaly trade-offs (Dirty reads vs Phantom reads)'
      ],
      growthAreas: [
        'Mention clustered vs non-clustered secondary index lookup cost (double-lookup / bookmark lookup)',
        'Quantify I/O disk block size considerations in page buffer pool management'
      ],
      rounds: [
        {
          roundNumber: 1,
          question: 'Can you explain why relational databases use B+ Trees instead of standard binary search trees or Hash Indexes for primary storage indexing?',
          spokenIntro: "Welcome! Let's kick off with an architectural storage engine question.",
          candidateAnswer: 'B+ Trees have a high branching factor, meaning high fanout which keeps the tree shallow. Because disk I/O is very slow compared to RAM, having a tree height of 3 or 4 allows searching millions of records in only 3 or 4 disk seeks. Furthermore, all leaf nodes in B+ Trees are linked sequentially, making range queries like BETWEEN 10 AND 50 extremely fast by just traversing the linked list at the leaf level, whereas hash indexes cannot do range queries at all.',
          score: 92,
          rating: 'Strong Hire',
          spokenFeedback: 'Exceptional answer. You hit the key architectural constraints: high fanout minimizes disk seeks, and leaf chaining optimizes range scans.',
          strengths: ['High fanout minimizing disk I/O seeks', 'Sequential linked list leaf structure for range queries', 'Contrasted against Hash index limitations'],
          missingConcepts: ['Mentioning node size matching OS filesystem page/block size (e.g. 4KB-16KB)'],
          idealAnswer: 'B+ Trees maximize fanout so node size matches filesystem disk page block sizes (typically 4KB-16KB). This bounds tree depth to 3-4 levels for billions of rows. All data pointers reside in leaf nodes connected by a doubly-linked list, enabling sequential range scans in O(log N + K) time.'
        },
        {
          roundNumber: 2,
          question: 'Walk me through how a database engine handles crash recovery while ensuring ACID durability using WAL (Write-Ahead Logging).',
          spokenIntro: "Great! Let's dive deeper into transaction durability and recovery.",
          candidateAnswer: 'With Write-Ahead Logging, any modification to a data page in memory must first be written sequentially to append-only log files on non-volatile disk before the modified buffer page is flushed to the actual table datafile. In case of sudden power failure, the engine runs the ARIES protocol: first Analysis to determine dirty pages and active transactions, then Redo to replay all committed transactions forward, and finally Undo to rollback all uncommitted transactions backwards.',
          score: 90,
          rating: 'Strong Hire',
          spokenFeedback: 'Very structured explanation of WAL and the ARIES phases. Appending to disk sequentially converts random I/O into fast sequential writes.',
          strengths: ['Sequential write guarantee prior to dirty page write', 'Clear explanation of ARIES Analysis, Redo, Undo phases', 'Understanding transaction commit boundaries'],
          missingConcepts: ['Checkpoints and how fuzzy checkpoints truncate the log window during recovery'],
          idealAnswer: 'Durability is achieved by forcing sequential log records (LSNs) to disk before dirty buffer pool pages are written (WAL protocol). Recovery uses ARIES: Analysis scans from the last checkpoint to identify active transactions and dirty pages; Redo brings state forward to crash time; Undo rolls back incomplete transactions in reverse chronological order.'
        },
        {
          roundNumber: 3,
          question: 'What is the difference between Repeatable Read and Serializable isolation levels in ANSI SQL, and how do modern engines like PostgreSQL handle Phantom Reads?',
          spokenIntro: "Final question for this screening round on concurrency control.",
          candidateAnswer: 'Repeatable Read guarantees that if you read a row once in a transaction, you will read the exact same values later even if another transaction updates or deletes it. However, it can still suffer from phantom reads where another transaction inserts a new row matching your WHERE clause. Serializable prevents all anomalies. Postgres avoids phantoms in Repeatable Read using MVCC snapshots, and for Serializable it uses SSI (Serializable Snapshot Isolation) which tracks rw-antidependency locks in memory without heavy table locking.',
          score: 82,
          rating: 'Hire',
          spokenFeedback: 'Good understanding of MVCC snapshotting and SSI in Postgres. Make sure to define phantom reads clearly before contrasting ANSI SQL standard definitions with actual engine implementations.',
          strengths: ['Accurate definition of Phantom Read anomaly', 'Differentiated ANSI SQL definition from PostgreSQL MVCC behavior', 'Mentioned Serializable Snapshot Isolation (SSI)'],
          missingConcepts: ['Two-Phase Locking (2PL) with next-key locks used in MySQL InnoDB compared to SSI'],
          idealAnswer: 'Repeatable Read locks or snapshots existing read rows, but in traditional 2PL can allow phantom records (new inserts matching predicate). Modern engines resolve this differently: MySQL InnoDB uses Next-Key Index Gap Locking to lock the index interval; PostgreSQL utilizes Multi-Version Concurrency Control (MVCC) snapshot isolation, elevating to SSI with SIREAD lock graphs to abort serialization cycles.'
        }
      ],
      durationSeconds: 385
    },
    {
      id: 'mock_sample_2',
      timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
      formattedDate: '5 days ago',
      subjectId: 'os',
      subjectTitle: 'Operating Systems (OS)',
      difficulty: 'Senior',
      interviewerPersona: 'Sarah (Director of Engineering)',
      totalRounds: 3,
      completedRounds: 3,
      averageScore: 74,
      verdict: 'Borderline / Follow-Up Needed',
      transcriptSummary: 'Solid intuitive grasp of virtual memory and page tables, but needed more depth on TLB shootdowns in multi-core SMP architectures.',
      strengthsSummary: [
        'Clear breakdown of inverted page tables and multi-level paging memory footprints',
        'Understood the hardware CPU context switch process (register spill, CR3 register reload)'
      ],
      growthAreas: [
        'Study TLB shootdown synchronization via Inter-Processor Interrupts (IPI)',
        'Review Linux CFS (Completely Fair Scheduler) red-black tree vruntime math'
      ],
      rounds: [
        {
          roundNumber: 1,
          question: 'What occurs at the CPU and OS kernel hardware boundary during a thread context switch versus a process context switch?',
          spokenIntro: 'Good afternoon. Let us evaluate low-level kernel mechanics.',
          candidateAnswer: 'A thread context switch only switches CPU registers, program counter, and stack pointer because threads within the same process share the same virtual address space. A process context switch is much heavier because the kernel must also switch the page table base pointer, which in x86 is the CR3 control register. Switching CR3 invalidates the CPU TLB cache entries, causing high translation latency until the TLB warms up again.',
          score: 85,
          rating: 'Strong Hire',
          spokenFeedback: 'Crisp, accurate answer highlighting the critical role of CR3 reload and TLB cache invalidation penalty.',
          strengths: ['Addressed CR3 control register reload', 'Explained TLB cache flush penalty for processes', 'Clarified shared virtual memory between threads'],
          missingConcepts: ['PCID (Process-Context Identifiers) which mitigate TLB flushes on modern CPUs'],
          idealAnswer: 'Thread switch preserves address space: only registers (RAX, RSP, RIP, etc.) are saved to kernel stack. Process switch reloads CR3 control register pointing to the new page directory. This flushes user-space TLB unless tagged with PCID (Process-Context Identifier), causing cold-cache memory stalls.'
        },
        {
          roundNumber: 2,
          question: 'Explain how multi-level page tables solve the memory overhead of a 64-bit address space, and how the TLB accelerates address translation.',
          spokenIntro: 'Moving on to memory management and paging architecture.',
          candidateAnswer: 'In a 64-bit system, a flat single-level page table would take petabytes of RAM just to store page table entries. Multi-level paging divides the virtual address into multiple offsets (like PML4, PDPT, PD, PT). Non-allocated address spaces do not need intermediate tables allocated, saving huge amounts of memory. The TLB is an on-chip hardware cache that caches virtual-to-physical address translations so the CPU does not have to perform 4 memory lookups on every single memory access.',
          score: 78,
          rating: 'Hire',
          spokenFeedback: 'Solid explanation of hierarchical paging and sparse tree allocations. Would like to see a deeper mention of page faults and demand paging.',
          strengths: ['Identified sparse allocation benefit of hierarchical tree paging', 'Described hardware TLB role in avoiding multi-hop translation memory lookups'],
          missingConcepts: ['Page fault handling routine if translation is not present in physical RAM (swap-in / copy-on-write)'],
          idealAnswer: 'Hierarchical paging forms a sparse tree (e.g. 4-level x86-64). Unmapped virtual address ranges omit lower-level tables entirely, dropping page table footprint from gigabytes to megabytes. The TLB caches recently resolved physical frame numbers (PFNs) with near single-cycle lookups, avoiding 4 serialized memory dereferences.'
        },
        {
          roundNumber: 3,
          question: 'In a multi-core SMP system, what is a TLB Shootdown, how is it coordinated across CPU cores, and why does it impact high-throughput server performance?',
          spokenIntro: 'Final challenge question on multi-core scalability.',
          candidateAnswer: 'When a process modifies page permissions or unmaps memory on one core, the other cores running threads of that process might still have the stale translation in their local CPU TLB caches. The OS must notify all other cores to invalidate their TLB. It does this with interrupts, which pauses execution on other cores until they acknowledge. This can slow down servers that do lots of memory mapping or unmapping.',
          score: 60,
          rating: 'Needs Practice',
          spokenFeedback: 'You have the right high-level picture, but were light on the exact kernel mechanism (Inter-Processor Interrupts / IPIs) and mitigation techniques like batching or lazy TLB invalidation.',
          strengths: ['Recognized core coherence issue with stale local TLB entries', 'Understood that other cores must pause to synchronize'],
          missingConcepts: ['Inter-Processor Interrupts (IPI)', 'Cost of cross-core pipeline stalls and IPI broadcast storms', 'Lazy TLB shootdown optimizations (holding off shootdowns until context switch)'],
          idealAnswer: 'When memory is unmapped or changed, the initiator core issues an Inter-Processor Interrupt (IPI) to all remote cores sharing the MMU context. Remote cores must halt user code, enter kernel interrupt context, execute INVLPG, and send an atomic ACK. This causes high CPU pipeline stalls. High-performance kernels mitigate this via batched shootdowns and lazy TLB management.'
        }
      ],
      durationSeconds: 420
    }
  ];
}

export function loadMockInterviewHistory(): MockInterviewSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MOCK_INTERVIEW_HISTORY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load mock interview history', e);
  }
  // If no saved history exists, return initial sample history
  const samples = getSampleMockInterviewHistory();
  saveMockInterviewHistory(samples);
  return samples;
}

export function saveMockInterviewHistory(history: MockInterviewSession[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.MOCK_INTERVIEW_HISTORY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save mock interview history', e);
  }
}

export function addMockInterviewSession(session: MockInterviewSession): MockInterviewSession[] {
  try {
    const current = loadMockInterviewHistory();
    // Add to beginning of array
    const updated = [session, ...current.filter(s => s.id !== session.id)];
    saveMockInterviewHistory(updated);
    return updated;
  } catch (e) {
    console.error('Failed to add mock interview session', e);
    return [];
  }
}

export function deleteMockInterviewSession(sessionId: string): MockInterviewSession[] {
  try {
    const current = loadMockInterviewHistory();
    const updated = current.filter(s => s.id !== sessionId);
    saveMockInterviewHistory(updated);
    return updated;
  } catch (e) {
    console.error('Failed to delete mock interview session', e);
    return [];
  }
}

export function clearMockInterviewHistory(): MockInterviewSession[] {
  try {
    localStorage.removeItem(STORAGE_KEYS.MOCK_INTERVIEW_HISTORY);
  } catch (e) {}
  return [];
}

// -------------------------------------------------------------
// Personalized Study Path Storage & Initial Generator
// -------------------------------------------------------------

export function generateInitialStudyPath(
  topicProgress?: Record<string, UserTopicProgress>
): PersonalizedStudyPath {
  const tp = topicProgress || loadTopicProgress();
  
  // Inspect weak and not-started topics
  const weakTopicIds = Object.values(tp).filter(p => p.status === 'weak').map(p => p.topicId);
  const coveredTopicIds = Object.values(tp).filter(p => p.status === 'covered').map(p => p.topicId);

  const initialSteps: StudyPathStep[] = [
    {
      id: 'step-1',
      priority: 'Critical',
      phase: 'Phase 1: Urgent Foundation',
      title: 'Master Database Concurrency & 2PL Locks',
      subjectId: 'dbms',
      subjectTitle: 'Database Management Systems',
      topicId: 'db-trans',
      topicName: 'Transaction Management, 2PL & Deadlocks',
      whyAssigned: 'Identified as a critical weak area in your diagnostic test (0/2 correct). Top FAANG interview bottleneck.',
      reviewSummary: 'Two-Phase Locking (2PL) guarantees conflict serializability by separating lock acquisition (growing phase) from lock release (shrinking phase). Strict 2PL prevents cascading rollbacks by holding exclusive write locks until transaction commit.',
      keyTakeaways: [
        'Rigorous distinction between Shared (S) and Exclusive (X) lock matrices.',
        'Wait-For Graph cycle detection for deadlocks vs Timestamp-based Wait-Die and Wound-Wait schemes.',
        '4 ANSI SQL Isolation Levels: Dirty Read, Non-Repeatable Read, Phantom Read.'
      ],
      recommendedLeetCodeProblems: [
        {
          id: 146,
          title: 'LRU Cache',
          difficulty: 'Medium',
          category: 'Linked List',
          slug: 'lru-cache',
          reason: 'Mirrors DB buffer pool eviction algorithms and thread-safe lock management.'
        },
        {
          id: 1,
          title: 'Two Sum',
          difficulty: 'Easy',
          category: 'Arrays & Hashing',
          slug: 'two-sum',
          reason: 'Foundational hash indexing pattern used in primary key lookups.'
        }
      ],
      actionType: 'core_subject',
      estimatedMinutes: 45,
      completed: false
    },
    {
      id: 'step-2',
      priority: 'Critical',
      phase: 'Phase 1: Urgent Foundation',
      title: 'Virtual Memory, Page Replacement & TLB Internals',
      subjectId: 'os',
      subjectTitle: 'Operating Systems',
      topicId: 'os-virt',
      topicName: 'Virtual Memory & Page Replacement',
      whyAssigned: 'Marked weak in OS evaluation. Candidates often struggle with thrashing and multi-level page table memory math.',
      reviewSummary: 'Demand paging loads physical pages into memory on demand via Page Fault Interrupts. TLB (Translation Lookaside Buffer) acts as an on-chip associative cache avoiding expensive 4-level page table lookups in RAM.',
      keyTakeaways: [
        'Page fault handling: Trap to OS kernel -> Save PCB -> Allocate frame -> Disk I/O -> Update PTE -> Resume.',
        'Thrashing occurs when the sum of process working sets exceeds total physical RAM.',
        'LRU, FIFO (Belady anomaly), and Optimal (OPT) page replacement tradeoffs.'
      ],
      recommendedLeetCodeProblems: [
        {
          id: 20,
          title: 'Valid Parentheses',
          difficulty: 'Easy',
          category: 'Stack',
          slug: 'valid-parentheses',
          reason: 'Reinforces call-stack mechanics and nested frame parsing in OS runtimes.'
        }
      ],
      actionType: 'core_subject',
      estimatedMinutes: 45,
      completed: false
    },
    {
      id: 'step-3',
      priority: 'High',
      phase: 'Phase 2: Core Strengthening',
      title: 'Sliding Window & Substring Algorithms',
      subjectId: 'dsa',
      subjectTitle: 'Data Structures & Algorithms',
      topicId: 'dsa-sliding',
      topicName: 'Sliding Window & Two Pointers',
      whyAssigned: 'High-frequency screening pattern across Google, Amazon, and Microsoft tech interviews.',
      reviewSummary: 'Sliding Window transforms brute force O(N^2) subarray checks into optimal O(N) passes by maintaining an expandable right bound and contractible left bound.',
      keyTakeaways: [
        'Dynamic window condition checks using Frequency HashMaps.',
        'Distinguish fixed-size windows (K elements) vs dynamic-size condition windows.'
      ],
      recommendedLeetCodeProblems: [
        {
          id: 121,
          title: 'Best Time to Buy and Sell Stock',
          difficulty: 'Easy',
          category: 'Sliding Window',
          slug: 'best-time-to-buy-and-sell-stock',
          reason: 'Classic single-pass sliding window profit optimization.'
        },
        {
          id: 3,
          title: 'Longest Substring Without Repeating Characters',
          difficulty: 'Medium',
          category: 'Sliding Window',
          slug: 'longest-substring-without-repeating-characters',
          reason: 'Core dynamic window template with last-seen character index tracking.'
        }
      ],
      actionType: 'leetcode',
      estimatedMinutes: 60,
      completed: false
    },
    {
      id: 'step-4',
      priority: 'High',
      phase: 'Phase 2: Core Strengthening',
      title: 'TCP 3-Way Handshake & Flow vs Congestion Control',
      subjectId: 'cn',
      subjectTitle: 'Computer Networks',
      topicId: 'cn-tcp',
      topicName: 'TCP 3-Way Handshake & 4-Way Close',
      whyAssigned: 'Core networking screening standard. Focus on why TIME_WAIT is 2*MSL and how SYN cookies mitigate flooding.',
      reviewSummary: 'TCP provides reliable byte stream transport with sequence numbers. Flow control prevents buffer overflow at receiver (rwnd), while Congestion Control prevents network link collapse (cwnd: Slow Start, AIMD, Fast Recovery).',
      keyTakeaways: [
        'Handshake: SYN -> SYN-ACK -> ACK. Close: FIN -> ACK -> FIN -> ACK (TIME_WAIT 2*MSL).',
        'Head-of-line blocking in HTTP/1.1 vs HTTP/2 binary framing vs HTTP/3 QUIC on UDP.'
      ],
      recommendedLeetCodeProblems: [
        {
          id: 11,
          title: 'Container With Most Water',
          difficulty: 'Medium',
          category: 'Two Pointers',
          slug: 'container-with-most-water',
          reason: 'Parallels sliding window flow bounding with opposite-direction pointers.'
        }
      ],
      actionType: 'core_subject',
      estimatedMinutes: 40,
      completed: false
    },
    {
      id: 'step-5',
      priority: 'Medium',
      phase: 'Phase 3: FAANG Mastery',
      title: 'Dynamic Programming: 1-D Memoization & Kadane',
      subjectId: 'dsa',
      subjectTitle: 'Data Structures & Algorithms',
      topicId: 'dsa-dp',
      topicName: '1-D Dynamic Programming',
      whyAssigned: 'Elevates problem-solving tier from intermediate candidate to FAANG onsite ready.',
      reviewSummary: 'Identify optimal substructure and overlapping subproblems. Define state dp[i] clearly and determine base cases before writing code.',
      keyTakeaways: [
        'Kadane algorithm: dp[i] = max(nums[i], dp[i-1] + nums[i]) optimizes space to O(1).',
        'State compression: reducing 2D DP matrices to 1D rolling rows.'
      ],
      recommendedLeetCodeProblems: [
        {
          id: 53,
          title: "Maximum Subarray (Kadane's Algorithm)",
          difficulty: 'Medium',
          category: '1-D DP',
          slug: 'maximum-subarray',
          reason: 'The ultimate template for local vs global optimum state propagation.'
        },
        {
          id: 42,
          title: 'Trapping Rain Water',
          difficulty: 'Hard',
          category: 'Two Pointers',
          slug: 'trapping-rain-water',
          reason: 'Advanced two-pointer / prefix-max state calculation asked at Google and Meta.'
        }
      ],
      actionType: 'leetcode',
      estimatedMinutes: 60,
      completed: false
    }
  ];

  return {
    id: `study-path-${Date.now()}`,
    generatedAt: new Date().toISOString(),
    studentLevel: 'Intermediate CS Candidate (Prioritizing High-Yield Core CS & DSA Patterns)',
    summary: `Personalized study path synthesized from your covered topics (${coveredTopicIds.length}) and ${weakTopicIds.length} flagged weak areas. Concentrates on Concurrency in DBMS, Virtual Memory in OS, and essential Two Pointers / DP patterns in LeetCode.`,
    readinessScore: 68,
    weakestSubject: 'DBMS & Operating Systems',
    totalEstimatedHours: 4.2,
    weeklyMilestone: 'Resolve 2 core theoretical weak spots and complete 4 targeted LeetCode pattern problems to boost interview readiness to 85%+.',
    steps: initialSteps
  };
}

export function loadPersonalizedStudyPath(): PersonalizedStudyPath {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDY_PATH);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.steps) && parsed.steps.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load personalized study path', e);
  }

  const initial = generateInitialStudyPath();
  savePersonalizedStudyPath(initial);
  return initial;
}

export function savePersonalizedStudyPath(path: PersonalizedStudyPath) {
  try {
    localStorage.setItem(STORAGE_KEYS.STUDY_PATH, JSON.stringify(path));
  } catch (e) {
    console.error('Failed to save personalized study path', e);
  }
}

export function updateStudyPathStepStatus(stepId: string, completed: boolean): PersonalizedStudyPath | null {
  try {
    const current = loadPersonalizedStudyPath();
    const updatedSteps = current.steps.map(step => 
      step.id === stepId ? { ...step, completed } : step
    );
    const updatedPath = { ...current, steps: updatedSteps };
    savePersonalizedStudyPath(updatedPath);
    return updatedPath;
  } catch (e) {
    console.error('Failed to update study path step status', e);
    return null;
  }
}

export function loadGFGSolvedProblems(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GFG_SOLVED);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load GFG solved problems', e);
  }
  return { 'gfg-missing-number': true };
}

export function saveGFGSolvedProblems(solved: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEYS.GFG_SOLVED, JSON.stringify(solved));
  } catch (e) {
    console.error('Failed to save GFG solved problems', e);
  }
}



