import { SubjectMeta, Question, Flashcard } from '../types';
import { BOOK_APTITUDE_QUESTIONS } from './aptitudeQuestions';
import { EXPANDED_CORE_QUESTIONS, EXPANDED_FLASHCARDS } from './coreQuestions';

export const SUBJECT_METAS: SubjectMeta[] = [
  {
    id: 'dbms',
    title: 'Database Management Systems (DBMS)',
    shortDesc: 'ACID, Normalization, Transactions, B+ Tree Indexing, Query Tuning, MVCC & WAL',
    iconName: 'Database',
    accentColor: 'indigo',
    topics: [
      { id: 'db-acid', name: 'ACID Properties & Concurrency Control', importance: 'Critical', keyConcept: 'Atomicity, Consistency, Isolation levels (Dirty, Non-repeatable, Phantom Read), Durability', gfgUrl: 'https://www.geeksforgeeks.org/acid-properties-in-dbms/', gfgTitle: 'ACID Properties in DBMS - GeeksforGeeks' },
      { id: 'db-norm', name: 'Normalization (1NF, 2NF, 3NF, BCNF, 4NF)', importance: 'Critical', keyConcept: 'Functional dependencies, 1NF (atomicity), 2NF (no partial), 3NF (no transitive), BCNF (superkey rule)', gfgUrl: 'https://www.geeksforgeeks.org/database-normalization-introduction/', gfgTitle: 'Database Normalization - GeeksforGeeks' },
      { id: 'db-index', name: 'Indexing & B/B+ Trees vs Hash Indexing', importance: 'Critical', keyConcept: 'Clustered vs Non-Clustered index, B+ Tree high fan-out & linked leaves, search time O(log N)', gfgUrl: 'https://www.geeksforgeeks.org/b-tree-set-1-introduction-2/', gfgTitle: 'B-Tree & B+ Tree in DBMS - GeeksforGeeks' },
      { id: 'db-trans', name: 'Transaction Management, 2PL & Deadlocks', importance: 'Critical', keyConcept: 'Two-Phase Locking (2PL), Strict 2PL, Deadlock detection (Wait-For Graph) & prevention', gfgUrl: 'https://www.geeksforgeeks.org/two-phase-locking-protocol/', gfgTitle: 'Two Phase Locking (2PL) Protocol - GeeksforGeeks' },
      { id: 'db-sql', name: 'SQL Joins, Views, CTEs & Query Tuning', importance: 'High', keyConcept: 'Inner, Left, Right, Full Outer Joins, Group By vs Having, Window Functions, Execution Plans', gfgUrl: 'https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/', gfgTitle: 'SQL Joins Explained - GeeksforGeeks' },
      { id: 'db-mvcc', name: 'MVCC & Isolation Internals (PostgreSQL / InnoDB)', importance: 'Critical', keyConcept: 'Multi-Version Concurrency Control, Undo logs, xmin/xmax tuple visibility, snapshot isolation', gfgUrl: 'https://www.geeksforgeeks.org/concurrency-control-in-dbms/', gfgTitle: 'Concurrency Control in DBMS - GeeksforGeeks' },
      { id: 'db-recovery', name: 'Database Crash Recovery (WAL & Checkpoints)', importance: 'High', keyConcept: 'Write-Ahead Logging (WAL), ARIES recovery algorithm, dirty page table, redo/undo passes', gfgUrl: 'https://www.geeksforgeeks.org/recovery-system-in-dbms/', gfgTitle: 'Recovery System in DBMS - GeeksforGeeks' },
      { id: 'db-nosql', name: 'NoSQL Architectures, CAP Theorem & Data Modeling', importance: 'High', keyConcept: 'Consistency, Availability, Partition Tolerance, Document (MongoDB) vs Key-Value (Redis) vs Columnar (Cassandra)', gfgUrl: 'https://www.geeksforgeeks.org/the-cap-theorem-in-dbms/', gfgTitle: 'CAP Theorem - GeeksforGeeks' },
      { id: 'db-shard', name: 'Sharding, Partitioning & Replication', importance: 'High', keyConcept: 'Horizontal vs vertical sharding, consistent hashing, primary-replica replication, read replicas', gfgUrl: 'https://www.geeksforgeeks.org/database-sharding-a-system-design-concept/', gfgTitle: 'Database Sharding - GeeksforGeeks' },
      { id: 'db-security', name: 'Database Security & Injection Prevention', importance: 'Medium', keyConcept: 'Parameterized prepared statements, ORM security, principle of least privilege, role-based access', gfgUrl: 'https://www.geeksforgeeks.org/sql-injection-sqli/', gfgTitle: 'SQL Injection Prevention - GeeksforGeeks' }
    ]
  },
  {
    id: 'os',
    title: 'Operating Systems (OS)',
    shortDesc: 'Processes, Threads, CPU Scheduling, Deadlocks, Paging, Virtual Memory & IPC',
    iconName: 'Cpu',
    accentColor: 'blue',
    topics: [
      { id: 'os-proc', name: 'Process vs Thread & Context Switching', importance: 'Critical', keyConcept: 'PCB, TCB, Process memory layout (Code, Data, Heap, Stack), User vs Kernel threads, Context switch cost', gfgUrl: 'https://www.geeksforgeeks.org/difference-between-process-and-thread/', gfgTitle: 'Process vs Thread - GeeksforGeeks' },
      { id: 'os-sched', name: 'CPU Scheduling Algorithms', importance: 'High', keyConcept: 'FCFS, SJF (Preemptive SRTF), Round Robin, Priority Scheduling, Multi-level Feedback Queue (MLFQ)', gfgUrl: 'https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/', gfgTitle: 'CPU Scheduling Algorithms - GeeksforGeeks' },
      { id: 'os-sync', name: 'Process Synchronization, Mutex & Semaphores', importance: 'Critical', keyConcept: 'Critical section problem, Peterson algorithm, Counting vs Binary Semaphores, Spinlocks vs Mutexes', gfgUrl: 'https://www.geeksforgeeks.org/process-synchronization-in-operating-system/', gfgTitle: 'Process Synchronization - GeeksforGeeks' },
      { id: 'os-deadlock', name: 'Deadlocks, Coffman Conditions & Banker\'s Algorithm', importance: 'Critical', keyConcept: '4 Necessary Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait, Safe state sequence', gfgUrl: 'https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/', gfgTitle: 'Deadlocks in Operating Systems - GeeksforGeeks' },
      { id: 'os-mem', name: 'Memory Management, Paging & TLB', importance: 'Critical', keyConcept: 'Paging, Segmentation, TLB (Translation Lookaside Buffer), Multi-level page tables, Inverted page tables', gfgUrl: 'https://www.geeksforgeeks.org/paging-in-operating-system/', gfgTitle: 'Paging in OS - GeeksforGeeks' },
      { id: 'os-virt', name: 'Virtual Memory & Page Replacement', importance: 'Critical', keyConcept: 'Demand paging, Page fault handling, Thrashing & Working Set model, FIFO, LRU, Optimal page replacement', gfgUrl: 'https://www.geeksforgeeks.org/virtual-memory-in-operating-system/', gfgTitle: 'Virtual Memory in OS - GeeksforGeeks' },
      { id: 'os-ipc', name: 'Inter-Process Communication (IPC)', importance: 'High', keyConcept: 'Anonymous Pipes, Named Pipes (FIFOs), Shared Memory (mmap/shm), Message Queues, Unix Domain Sockets', gfgUrl: 'https://www.geeksforgeeks.org/inter-process-communication-ipc/', gfgTitle: 'Inter-Process Communication - GeeksforGeeks' },
      { id: 'os-file', name: 'File Systems, Inodes & Disk Scheduling', importance: 'Medium', keyConcept: 'Inode data structure, hard vs symbolic links, ext4, Disk scheduling (SCAN, C-SCAN, LOOK)', gfgUrl: 'https://www.geeksforgeeks.org/file-systems-in-operating-system/', gfgTitle: 'File Systems in OS - GeeksforGeeks' },
      { id: 'os-kernel', name: 'Kernel Architecture, System Calls & Interrupts', importance: 'High', keyConcept: 'Monolithic vs Microkernel, User mode vs Kernel mode (Ring 0 vs 3), Hardware interrupts vs Traps', gfgUrl: 'https://www.geeksforgeeks.org/difference-between-microkernel-and-monolithic-kernel/', gfgTitle: 'Microkernel vs Monolithic - GeeksforGeeks' },
      { id: 'os-concur', name: 'Concurrency Primitives & Thread Pools', importance: 'High', keyConcept: 'Race conditions, Atomic operations, compare-and-swap (CAS), Condition variables, Thread pools', gfgUrl: 'https://www.geeksforgeeks.org/thread-pools-in-java/', gfgTitle: 'Thread Pools & Concurrency - GeeksforGeeks' }
    ]
  },
  {
    id: 'cn',
    title: 'Computer Networks (CN)',
    shortDesc: 'OSI vs TCP/IP, Handshake, HTTP/1-2-3, DNS, Sockets, QUIC & Congestion Control',
    iconName: 'Network',
    accentColor: 'emerald',
    topics: [
      { id: 'cn-layers', name: 'OSI 7-Layer & TCP/IP Model', importance: 'High', keyConcept: 'Physical, Data Link (Ethernet/MAC), Network (IP), Transport (TCP/UDP), Application protocols & encapsulation', gfgUrl: 'https://www.geeksforgeeks.org/layers-of-osi-model/', gfgTitle: 'Layers of OSI Model - GeeksforGeeks' },
      { id: 'cn-tcp', name: 'TCP 3-Way Handshake & 4-Way Close', importance: 'Critical', keyConcept: 'SYN, SYN-ACK, ACK, Sequence numbers, FIN-ACK teardown, TIME_WAIT state (2*MSL justification)', gfgUrl: 'https://www.geeksforgeeks.org/tcp-3-way-handshake-process/', gfgTitle: 'TCP 3-Way Handshake Process - GeeksforGeeks' },
      { id: 'cn-transport', name: 'TCP vs UDP & Flow Control', importance: 'Critical', keyConcept: 'Reliable stream vs Datagram, Sliding Window Protocol, Receiver window (rwnd), Go-Back-N vs Selective Repeat', gfgUrl: 'https://www.geeksforgeeks.org/differences-between-tcp-and-udp/', gfgTitle: 'TCP vs UDP Differences - GeeksforGeeks' },
      { id: 'cn-cong', name: 'Congestion Control Algorithms', importance: 'Critical', keyConcept: 'Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery (AIMD, TCP Reno, CUBIC, BBR)', gfgUrl: 'https://www.geeksforgeeks.org/tcp-congestion-control/', gfgTitle: 'TCP Congestion Control - GeeksforGeeks' },
      { id: 'cn-dns-http', name: 'HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC)', importance: 'Critical', keyConcept: 'Head-of-line blocking, Binary multiplexing, HPACK, QUIC on UDP, zero-RTT connection resumption', gfgUrl: 'https://www.geeksforgeeks.org/difference-between-http-1-1-and-http-2/', gfgTitle: 'HTTP/1.1 vs HTTP/2 vs HTTP/3 - GeeksforGeeks' },
      { id: 'cn-ssl', name: 'SSL/TLS Handshake & Cryptography', importance: 'Critical', keyConcept: 'Public key infrastructure (PKI), TLS 1.3 1-RTT handshake, Diffie-Hellman key exchange, Symmetric session encryption', gfgUrl: 'https://www.geeksforgeeks.org/ssl-handshake-process-in-computer-network/', gfgTitle: 'SSL/TLS Handshake Process - GeeksforGeeks' },
      { id: 'cn-dns', name: 'DNS Resolution Hierarchy & Anycast', importance: 'High', keyConcept: 'Root nameservers, TLD, Authoritative nameservers, Recursive resolver, Caching, DNS records (A, AAAA, CNAME, MX)', gfgUrl: 'https://www.geeksforgeeks.org/working-of-domain-name-system-dns-server/', gfgTitle: 'How DNS Server Works - GeeksforGeeks' },
      { id: 'cn-routing', name: 'IP Addressing, Subnetting, CIDR & NAT', importance: 'High', keyConcept: 'IPv4 vs IPv6, Subnet masks (/24, /26), Network/Broadcast address calculation, NAT (PAT/SNAT/DNAT)', gfgUrl: 'https://www.geeksforgeeks.org/introduction-to-classless-inter-domain-routing-cidr/', gfgTitle: 'CIDR & Subnetting - GeeksforGeeks' },
      { id: 'cn-routing-alg', name: 'Routing Protocols & Autonomous Systems', importance: 'Medium', keyConcept: 'Intra-domain (OSPF, RIP Link-State) vs Inter-domain routing (BGP Distance-Vector), Dijkstra path routing', gfgUrl: 'https://www.geeksforgeeks.org/types-of-routing-protocols/', gfgTitle: 'Routing Protocols in Networks - GeeksforGeeks' },
      { id: 'cn-security', name: 'Network Security & WebSockets', importance: 'High', keyConcept: 'WebSockets full-duplex communication, Firewalls, DDoS mitigation, ARP Spoofing & SYN Flood attacks', gfgUrl: 'https://www.geeksforgeeks.org/what-is-web-socket-and-how-it-is-different-from-the-http/', gfgTitle: 'WebSockets vs HTTP - GeeksforGeeks' }
    ]
  },
  {
    id: 'oops',
    title: 'Object-Oriented Programming (OOPs)',
    shortDesc: '4 Pillars, SOLID Principles, Design Patterns, Virtual Functions & Memory Layout',
    iconName: 'Boxes',
    accentColor: 'purple',
    topics: [
      { id: 'oops-pillars', name: 'The 4 Pillars of OOP', importance: 'Critical', keyConcept: 'Encapsulation (data hiding), Abstraction (interfaces), Inheritance (reusability), Polymorphism (overloading vs overriding)', gfgUrl: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/', gfgTitle: 'OOP Concepts in Java / C++ - GeeksforGeeks' },
      { id: 'oops-solid', name: 'SOLID Design Principles with Refactoring', importance: 'Critical', keyConcept: 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion', gfgUrl: 'https://www.geeksforgeeks.org/solid-principle-in-programming-understand-with-real-life-examples/', gfgTitle: 'SOLID Principles - GeeksforGeeks' },
      { id: 'oops-poly', name: 'Virtual Functions, VTABLE & VPTR Internals', importance: 'Critical', keyConcept: 'Virtual table pointer (vptr), vtable resolution, pure virtual functions, Abstract classes, Dynamic dispatch', gfgUrl: 'https://www.geeksforgeeks.org/virtual-functions-and-runtime-polymorphism-in-cpp-set-1-introduction/', gfgTitle: 'Virtual Functions & VTABLE - GeeksforGeeks' },
      { id: 'oops-creational', name: 'Creational Patterns (Singleton, Factory, Builder)', importance: 'High', keyConcept: 'Singleton thread-safety (Double-checked locking), Factory Method, Abstract Factory, Builder pattern', gfgUrl: 'https://www.geeksforgeeks.org/singleton-design-pattern/', gfgTitle: 'Singleton Design Pattern - GeeksforGeeks' },
      { id: 'oops-structural', name: 'Structural Patterns (Adapter, Decorator, Facade)', importance: 'High', keyConcept: 'Adapter (wrapper), Decorator (dynamic behavior), Facade (simplified interface), Proxy pattern', gfgUrl: 'https://www.geeksforgeeks.org/adapter-pattern/', gfgTitle: 'Structural Design Patterns - GeeksforGeeks' },
      { id: 'oops-behavioral', name: 'Behavioral Patterns (Observer, Strategy, Command)', importance: 'High', keyConcept: 'Observer (pub-sub event bus), Strategy (interchangeable algorithms), Command (undo/redo logging)', gfgUrl: 'https://www.geeksforgeeks.org/observer-pattern-set-1-introduction/', gfgTitle: 'Observer Design Pattern - GeeksforGeeks' },
      { id: 'oops-diff', name: 'Composition vs Inheritance & Diamond Problem', importance: 'High', keyConcept: '"Has-a" vs "Is-a" relationship, Diamond inheritance conflict, Virtual base classes, Mixins & Traits', gfgUrl: 'https://www.geeksforgeeks.org/multiple-inheritance-in-c-and-diamond-problem/', gfgTitle: 'Diamond Problem in C++ - GeeksforGeeks' },
      { id: 'oops-mem', name: 'Memory Layout, Stack vs Heap & Garbage Collection', importance: 'High', keyConcept: 'Object layout in memory, stack allocation vs heap pointers, RAII, Reference counting vs Tracing GC', gfgUrl: 'https://www.geeksforgeeks.org/stack-vs-heap-memory-allocation/', gfgTitle: 'Stack vs Heap Memory - GeeksforGeeks' },
      { id: 'oops-exception', name: 'Exception Handling & Clean Code Practices', importance: 'Medium', keyConcept: 'Try-Catch-Finally semantics, Exception hierarchy, Custom exceptions, Fail-fast design principle', gfgUrl: 'https://www.geeksforgeeks.org/exceptions-in-java/', gfgTitle: 'Exceptions in Java - GeeksforGeeks' }
    ]
  },
  {
    id: 'aptitude',
    title: 'Quantitative Aptitude',
    shortDesc: 'Formulas, Speed Math, Time & Work, Profit & Loss, Probability & Permutations',
    iconName: 'Calculator',
    accentColor: 'amber',
    topics: [
      { id: 'apt-work', name: 'Time, Work & Efficiency', importance: 'High', keyConcept: 'Work = Efficiency × Time, Pipes & Cisterns, Negative work concept', gfgUrl: 'https://www.geeksforgeeks.org/time-and-work-quantitative-aptitude/', gfgTitle: 'Time and Work - GeeksforGeeks' },
      { id: 'apt-speed', name: 'Speed, Time & Distance', importance: 'High', keyConcept: 'Relative speed, Trains crossing poles/platforms, Boats & Streams (Upstream vs Downstream)', gfgUrl: 'https://www.geeksforgeeks.org/speed-time-and-distance-quantitative-aptitude/', gfgTitle: 'Speed, Time & Distance - GeeksforGeeks' },
      { id: 'apt-pl', name: 'Profit, Loss & Discount', importance: 'Medium', keyConcept: 'Cost Price, Selling Price, Marked Price, Successive discounts formula', gfgUrl: 'https://www.geeksforgeeks.org/profit-and-loss-in-quantitative-aptitude/', gfgTitle: 'Profit and Loss - GeeksforGeeks' },
      { id: 'apt-pnc', name: 'Permutations, Combinations & Probability', importance: 'Critical', keyConcept: 'nPr, nCr, Independent events, Bayes theorem, Coin/Dice/Card probability problems', gfgUrl: 'https://www.geeksforgeeks.org/permutations-and-combinations/', gfgTitle: 'Permutations & Combinations - GeeksforGeeks' },
      { id: 'apt-ratio', name: 'Ratios, Percentages & Averages', importance: 'High', keyConcept: 'Cross multiplication ratio trick, Weighted average, Percentage increase/decrease', gfgUrl: 'https://www.geeksforgeeks.org/percentages-quantitative-aptitude/', gfgTitle: 'Percentages & Ratios - GeeksforGeeks' },
      { id: 'apt-num', name: 'Number Systems & Divisibility Rules', importance: 'High', keyConcept: 'Remainder theorem, Divisibility tests (7, 9, 11), HCF & LCM properties', gfgUrl: 'https://www.geeksforgeeks.org/number-system-in-quantitative-aptitude/', gfgTitle: 'Number System - GeeksforGeeks' }
    ]
  },
  {
    id: 'reasoning',
    title: 'Logical & Analytical Reasoning',
    shortDesc: 'Syllogisms, Blood Relations, Seating Arrangement, Coding-Decoding & Critical Logic',
    iconName: 'Brain',
    accentColor: 'rose',
    topics: [
      { id: 'reas-syllogism', name: 'Syllogisms (Venn Diagrams)', importance: 'Critical', keyConcept: 'Statements (All, Some, No), Definite conclusions vs Possibility cases', gfgUrl: 'https://www.geeksforgeeks.org/syllogism-logical-reasoning/', gfgTitle: 'Syllogisms Reasoning - GeeksforGeeks' },
      { id: 'reas-blood', name: 'Blood Relations & Family Tree', importance: 'High', keyConcept: 'Generational hierarchy diagramming, Coded relations (+, -, ×, ÷ relations)', gfgUrl: 'https://www.geeksforgeeks.org/blood-relation-logical-reasoning/', gfgTitle: 'Blood Relations - GeeksforGeeks' },
      { id: 'reas-seating', name: 'Seating Arrangements (Linear & Circular)', importance: 'Critical', keyConcept: 'Facing center vs Facing outside, Linear arrangement with conditions', gfgUrl: 'https://www.geeksforgeeks.org/seating-arrangement-logical-reasoning/', gfgTitle: 'Seating Arrangements - GeeksforGeeks' },
      { id: 'reas-series', name: 'Coding-Decoding & Number Series', importance: 'High', keyConcept: 'Letter shifts, Reverse positions (A-Z to 1-26), Prime/Fibonacci/Double-difference series', gfgUrl: 'https://www.geeksforgeeks.org/coding-decoding-logical-reasoning/', gfgTitle: 'Coding & Decoding - GeeksforGeeks' },
      { id: 'reas-direction', name: 'Direction Sense & Distance', importance: 'Medium', keyConcept: 'Pythagoras theorem, Cardinal directions, Shadow at sunrise/sunset', gfgUrl: 'https://www.geeksforgeeks.org/direction-sense-test-logical-reasoning/', gfgTitle: 'Direction Sense Test - GeeksforGeeks' },
      { id: 'reas-critical', name: 'Critical Reasoning & Statement Assumptions', importance: 'High', keyConcept: 'Statement & Assumptions, Course of Action, Cause and Effect, Strong/Weak arguments', gfgUrl: 'https://www.geeksforgeeks.org/critical-reasoning-verbal-ability/', gfgTitle: 'Critical Reasoning - GeeksforGeeks' }
    ]
  },
  {
    id: 'dsa',
    title: 'DSA Core Logic & Problem Solving',
    shortDesc: 'Time-Space Complexity, Two Pointers, Sliding Window, DP Patterns & Graphs',
    iconName: 'Code2',
    accentColor: 'cyan',
    topics: [
      { id: 'dsa-complexity', name: 'Asymptotic Analysis & Big-O', importance: 'Critical', keyConcept: 'Worst, Average, Best case, Master Theorem, Recursive tree space complexity', gfgUrl: 'https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/', gfgTitle: 'Asymptotic Analysis - GeeksforGeeks' },
      { id: 'dsa-arrays', name: 'Arrays, Prefix Sums & Kadane\'s Algorithm', importance: 'Critical', keyConcept: 'Two Sum hash map, Maximum Subarray sum, Dutch National Flag partition, In-place manipulations', gfgUrl: 'https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/', gfgTitle: 'Kadane Algorithm - GeeksforGeeks' },
      { id: 'dsa-twoptr', name: 'Two Pointers & Sliding Window', importance: 'Critical', keyConcept: 'Fast & slow pointers (Floyd cycle), Opposite-direction pointers, Variable & fixed size window', gfgUrl: 'https://www.geeksforgeeks.org/two-pointers-technique/', gfgTitle: 'Two Pointers Technique - GeeksforGeeks' },
      { id: 'dsa-linkedlist', name: 'Linked Lists & Fast-Slow Pointers', importance: 'Critical', keyConcept: 'Reverse linked list, detect cycle entry, Merge two/K sorted lists, Reorder list', gfgUrl: 'https://www.geeksforgeeks.org/reverse-a-linked-list/', gfgTitle: 'Reverse Linked List - GeeksforGeeks' },
      { id: 'dsa-stack', name: 'Stacks, Queues & Monotonic Stack', importance: 'Critical', keyConcept: 'Valid Parentheses, Next Greater Element, Daily Temperatures, Largest Rectangle in Histogram', gfgUrl: 'https://www.geeksforgeeks.org/next-greater-element/', gfgTitle: 'Next Greater Element - GeeksforGeeks' },
      { id: 'dsa-binsearch', name: 'Binary Search & Search Space Reduction', importance: 'Critical', keyConcept: 'Search in Rotated Sorted Array, Find Peak Element, Binary Search on answer space', gfgUrl: 'https://www.geeksforgeeks.org/binary-search/', gfgTitle: 'Binary Search - GeeksforGeeks' },
      { id: 'dsa-trees', name: 'Binary Trees & BST Logic', importance: 'Critical', keyConcept: 'DFS (Pre/In/Postorder), BFS (Level order), LCA (Lowest Common Ancestor), BST Search/Insert', gfgUrl: 'https://www.geeksforgeeks.org/binary-tree-data-structure/', gfgTitle: 'Binary Tree - GeeksforGeeks' },
      { id: 'dsa-heap', name: 'Heaps & Priority Queues (Top K)', importance: 'High', keyConcept: 'Min/Max Heap properties, Top K Frequent elements, Kth Largest Element, Median in a Data Stream', gfgUrl: 'https://www.geeksforgeeks.org/heap-data-structure/', gfgTitle: 'Heap Data Structure - GeeksforGeeks' },
      { id: 'dsa-graphs', name: 'Graph Traversal & Shortest Path', importance: 'Critical', keyConcept: 'Adjacency list, BFS/DFS, Cycle detection (Directed vs Undirected), Dijkstra, Topological Sort', gfgUrl: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/', gfgTitle: 'Graph Data Structure - GeeksforGeeks' },
      { id: 'dsa-dsu', name: 'Disjoint Set Union (DSU / Union-Find)', importance: 'High', keyConcept: 'Path compression & Union by Rank, Kruskal\'s MST, Connected components in dynamic graphs', gfgUrl: 'https://www.geeksforgeeks.org/disjoint-set-data-structures/', gfgTitle: 'Disjoint Set (Union-Find) - GeeksforGeeks' },
      { id: 'dsa-dp', name: 'Dynamic Programming Patterns', importance: 'Critical', keyConcept: 'Overlapping subproblems & Optimal substructure, 0/1 Knapsack, Longest Common Subsequence (LCS)', gfgUrl: 'https://www.geeksforgeeks.org/dynamic-programming/', gfgTitle: 'Dynamic Programming - GeeksforGeeks' },
      { id: 'dsa-backtrack', name: 'Backtracking, Recursion & State Space Trees', importance: 'High', keyConcept: 'Subsets, Permutations, Combination Sum, N-Queens, Word Search DFS with backtracking', gfgUrl: 'https://www.geeksforgeeks.org/backtracking-algorithms/', gfgTitle: 'Backtracking Algorithms - GeeksforGeeks' },
      { id: 'dsa-trie', name: 'Tries (Prefix Tree) & String Matching', importance: 'High', keyConcept: 'Trie Insert/Search/StartsWith, Longest common prefix, Word Search II, KMP string matching', gfgUrl: 'https://www.geeksforgeeks.org/trie-insert-and-search/', gfgTitle: 'Trie Data Structure - GeeksforGeeks' },
      { id: 'dsa-bit', name: 'Bit Manipulation & Math Logic', importance: 'High', keyConcept: 'XOR properties (x ^ x = 0), Check power of 2 (n & (n-1) == 0), Set/Unset k-th bit', gfgUrl: 'https://www.geeksforgeeks.org/bits-manipulation-important-tactics/', gfgTitle: 'Bit Manipulation Tactics - GeeksforGeeks' }
    ]
  },
  {
    id: 'ml',
    title: 'Machine Learning & AI Engineering (ML)',
    shortDesc: 'Supervised, Unsupervised, Deep Learning, Transformers, LLMs, RAG, Metrics & System Design',
    iconName: 'BrainCircuit',
    accentColor: 'purple',
    topics: [
      { id: 'ml-supervised', name: 'Supervised Learning & Regularization (L1/L2)', importance: 'Critical', keyConcept: 'Linear/Logistic regression, Cost functions, L1 Lasso (sparsity) vs L2 Ridge (weight shrinkage), ElasticNet', gfgUrl: 'https://www.geeksforgeeks.org/supervised-machine-learning/', gfgTitle: 'Supervised Machine Learning - GeeksforGeeks' },
      { id: 'ml-trees', name: 'Decision Trees, Random Forests & Boosting (XGBoost)', importance: 'Critical', keyConcept: 'Gini Impurity vs Entropy, Information Gain, Bagging (Random Forest) vs Boosting (GBDT, XGBoost, LightGBM)', gfgUrl: 'https://www.geeksforgeeks.org/decision-tree/', gfgTitle: 'Decision Trees & Ensembles - GeeksforGeeks' },
      { id: 'ml-unsupervised', name: 'Unsupervised Learning, K-Means & PCA', importance: 'High', keyConcept: 'K-Means clustering (Lloyd algorithm), Elbow method, Silhouette score, PCA eigenvalue decomposition, t-SNE', gfgUrl: 'https://www.geeksforgeeks.org/k-means-clustering-introduction/', gfgTitle: 'K-Means Clustering - GeeksforGeeks' },
      { id: 'ml-deeplearn', name: 'Neural Networks, Backpropagation & Optimizers', importance: 'Critical', keyConcept: 'Feedforward, Vanishing/Exploding gradients, Activation functions (ReLU, GELU, Sigmoid), SGD, Adam, AdamW', gfgUrl: 'https://www.geeksforgeeks.org/backpropagation-in-neural-networks/', gfgTitle: 'Backpropagation in Neural Networks - GeeksforGeeks' },
      { id: 'ml-cnn-rnn', name: 'CNNs, Convolutions & Sequence Models (LSTM/GRU)', importance: 'High', keyConcept: 'Kernels, Strides, Padding, Pooling, Receptive field, RNN hidden state, LSTM forget/input/output gates', gfgUrl: 'https://www.geeksforgeeks.org/introduction-convolution-neural-network/', gfgTitle: 'Convolutional Neural Networks - GeeksforGeeks' },
      { id: 'ml-transformers', name: 'Transformers, Self-Attention & LLM Foundations', importance: 'Critical', keyConcept: 'Scaled Dot-Product Attention: Softmax(QK^T / sqrt(d_k))V, Multi-Head Attention, Positional Encoding, Encoder-Decoder vs Decoder-Only', gfgUrl: 'https://www.geeksforgeeks.org/getting-started-with-transformers/', gfgTitle: 'Transformer Architecture - GeeksforGeeks' },
      { id: 'ml-rag-agents', name: 'Generative AI, RAG & Vector Embeddings', importance: 'Critical', keyConcept: 'Dense embeddings, Vector Databases (HNSW indexing), Retrieval-Augmented Generation, Chunking, Cosine similarity, Re-ranking', gfgUrl: 'https://www.geeksforgeeks.org/what-is-retrieval-augmented-generation-rag-in-ai/', gfgTitle: 'RAG in AI Systems - GeeksforGeeks' },
      { id: 'ml-metrics', name: 'Model Evaluation: Precision, Recall, ROC-AUC & F1', importance: 'Critical', keyConcept: 'Type I vs Type II errors, Precision vs Recall tradeoff, ROC curve & AUC, PR curve for imbalanced data, Log Loss', gfgUrl: 'https://www.geeksforgeeks.org/metrics-for-machine-learning-model/', gfgTitle: 'ML Model Evaluation Metrics - GeeksforGeeks' },
      { id: 'ml-bias-var', name: 'Bias-Variance Tradeoff & Generalization', importance: 'High', keyConcept: 'Underfitting (high bias) vs Overfitting (high variance), Learning curves, Cross-validation (K-Fold), Early stopping', gfgUrl: 'https://www.geeksforgeeks.org/bias-and-variance-in-machine-learning/', gfgTitle: 'Bias and Variance Tradeoff - GeeksforGeeks' },
      { id: 'ml-sysdesign', name: 'ML System Design & Real-Time Inference', importance: 'Critical', keyConcept: 'Feature stores, Offline vs Online inference, KV Cache in LLMs, Quantization (INT8/FP16), Model drift & Canary deployments', gfgUrl: 'https://www.geeksforgeeks.org/machine-learning-system-design/', gfgTitle: 'Machine Learning System Design - GeeksforGeeks' }
    ]
  },
  {
    id: 'webdev',
    title: 'Fullstack Web Development & Architecture',
    shortDesc: 'Browser Rendering, Event Loop, React 19 / Hooks, REST / GraphQL / gRPC, Security & Performance',
    iconName: 'Globe',
    accentColor: 'teal',
    topics: [
      { id: 'web-browser', name: 'Browser Internals & Critical Rendering Path (CRP)', importance: 'Critical', keyConcept: 'HTML parsing, DOM Tree, CSSOM, Render Tree, Layout (Reflow), Paint, Compositing, GPU acceleration', gfgUrl: 'https://www.geeksforgeeks.org/critical-rendering-path-in-javascript/', gfgTitle: 'Critical Rendering Path - GeeksforGeeks' },
      { id: 'web-eventloop', name: 'JavaScript Engine, V8 & Event Loop Mechanics', importance: 'Critical', keyConcept: 'Call Stack, Memory Heap, Web APIs, Microtask Queue (Promises, queueMicrotask) vs Macrotask Queue (setTimeout, I/O)', gfgUrl: 'https://www.geeksforgeeks.org/what-is-an-event-loop-in-javascript/', gfgTitle: 'JavaScript Event Loop - GeeksforGeeks' },
      { id: 'web-js-deep', name: 'JS & TS Core: Closures, Prototypes, `this`, Async', importance: 'Critical', keyConcept: 'Lexical scoping, Closure memory retention, Prototype inheritance, `bind/call/apply`, Event bubbling/capturing, TS Generics & Utility types', gfgUrl: 'https://www.geeksforgeeks.org/closure-in-javascript/', gfgTitle: 'Closures & Prototypes in JS - GeeksforGeeks' },
      { id: 'web-react-core', name: 'React Internals: Fiber Architecture & Reconciliation', importance: 'Critical', keyConcept: 'Virtual DOM, Fiber tree nodes, 2-phase commit (Render vs Commit), Diffing heuristic (O(N) with keys), Concurrent rendering', gfgUrl: 'https://www.geeksforgeeks.org/reactjs-reconciliation-algorithm/', gfgTitle: 'React Reconciliation & Fiber - GeeksforGeeks' },
      { id: 'web-react-hooks', name: 'React Hooks, State Lifecycle & Custom Hooks', importance: 'Critical', keyConcept: 'Hook call order rules, Stale closures in useEffect, useMemo vs useCallback optimization, useRef instance variables', gfgUrl: 'https://www.geeksforgeeks.org/react-hooks/', gfgTitle: 'React Hooks Complete Guide - GeeksforGeeks' },
      { id: 'web-apis', name: 'API Paradigms: REST vs GraphQL vs gRPC & WebSockets', importance: 'High', keyConcept: 'REST idempotency & HTTP status codes, GraphQL over-fetching solution, gRPC Protobuf efficiency, WebSockets full-duplex, SSE unidirectional', gfgUrl: 'https://www.geeksforgeeks.org/rest-vs-graphql/', gfgTitle: 'REST vs GraphQL vs gRPC - GeeksforGeeks' },
      { id: 'web-security', name: 'Web Security: CORS, CSRF, XSS, CSP & Auth', importance: 'Critical', keyConcept: 'Cross-Origin Resource Sharing (Preflight OPTIONS), Cross-Site Scripting (Reflected/Stored/DOM), SameSite cookies, JWT vs Sessions, Content Security Policy', gfgUrl: 'https://www.geeksforgeeks.org/what-is-cross-site-scripting-xss/', gfgTitle: 'Web Security & XSS / CSRF - GeeksforGeeks' },
      { id: 'web-perf', name: 'Web Performance Optimization & Core Web Vitals', importance: 'High', keyConcept: 'Largest Contentful Paint (LCP), Interaction to Next Paint (INP), Cumulative Layout Shift (CLS), Code-splitting, Dynamic imports, CDN caching headers', gfgUrl: 'https://www.geeksforgeeks.org/core-web-vitals/', gfgTitle: 'Core Web Vitals & Optimization - GeeksforGeeks' },
      { id: 'web-backend', name: 'Node.js Internals, Express & Database ORMs', importance: 'High', keyConcept: 'Node.js libuv threadpool (default 4 threads), Clustering & Worker threads, Database connection pooling, Prisma/Drizzle N+1 query solving', gfgUrl: 'https://www.geeksforgeeks.org/introduction-to-nodejs/', gfgTitle: 'Node.js Architecture & libuv - GeeksforGeeks' },
      { id: 'web-deploy', name: 'Microservices, Docker Containers & CI/CD Basics', importance: 'Medium', keyConcept: 'Docker image layers, Container vs VM hypervisor, Reverse proxy (Nginx load balancing), Zero-downtime rolling deployments', gfgUrl: 'https://www.geeksforgeeks.org/docker-tutorial/', gfgTitle: 'Docker & Microservices - GeeksforGeeks' }
    ]
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  // DBMS
  {
    id: 'q-dbms-1',
    subjectId: 'dbms',
    topicId: 'db-acid',
    topicName: 'ACID Properties & Concurrency Control',
    difficulty: 'Medium',
    question: 'In database transaction management, which isolation level prevents Dirty Reads and Non-Repeatable Reads, but may still allow Phantom Reads in ANSI SQL?',
    options: [
      'Read Uncommitted',
      'Read Committed',
      'Repeatable Read',
      'Serializable'
    ],
    correctIndex: 2,
    explanation: 'Repeatable Read locks rows returned in queries to prevent non-repeatable reads, but standard SQL implementations may still allow new rows inserted by another concurrent transaction (Phantom Reads). Serializable prevents all three.',
    companyTags: ['Amazon', 'Microsoft', 'Oracle']
  },
  {
    id: 'q-dbms-2',
    subjectId: 'dbms',
    topicId: 'db-norm',
    topicName: 'Normalization (1NF to BCNF)',
    difficulty: 'Medium',
    question: 'A relation R(A, B, C, D) has candidate key (A, B). The functional dependency C -> D is present where C is not a candidate key and D is a non-prime attribute. Which normal form is violated?',
    options: [
      '1NF',
      '2NF',
      '3NF',
      'BCNF'
    ],
    correctIndex: 2,
    explanation: 'A relation is in 3NF if for every functional dependency X -> Y, either X is a superkey or Y is a prime attribute. Here C is not a superkey and D is non-prime, which represents a transitive dependency and violates 3NF.',
    companyTags: ['Google', 'Goldman Sachs']
  },
  {
    id: 'q-dbms-3',
    subjectId: 'dbms',
    topicId: 'db-index',
    topicName: 'Indexing & B/B+ Trees',
    difficulty: 'Hard',
    question: 'Why do relational databases predominantly use B+ Trees instead of standard B-Trees for disk-based indexing?',
    options: [
      'B+ Trees store data records only in leaf nodes, maximizing branching factor and fan-out of internal nodes',
      'B+ Trees require zero disk I/O operations for point queries',
      'B-Trees cannot store duplicate keys under any circumstance',
      'B+ Trees have lower worst-case algorithmic complexity than O(log N)'
    ],
    correctIndex: 0,
    explanation: 'In B+ Trees, internal nodes only hold keys and pointers, allowing each disk block to fit far more keys (higher fanout). This lowers tree height, minimizing disk I/O. Furthermore, leaf nodes are linked sequentially for rapid range scans.',
    companyTags: ['Uber', 'Salesforce', 'Adobe']
  },

  // OS
  {
    id: 'q-os-1',
    subjectId: 'os',
    topicId: 'os-deadlock',
    topicName: 'Deadlocks & Banker\'s Algorithm',
    difficulty: 'Medium',
    question: 'Which of the following is NOT one of the 4 Coffman conditions required for a deadlock to occur?',
    options: [
      'Mutual Exclusion',
      'Hold and Wait',
      'Preemptive Resource Allocation',
      'Circular Wait'
    ],
    correctIndex: 2,
    explanation: 'The Coffman condition is "No Preemption" (resources cannot be forcibly confiscated from a process). If preemption is allowed, deadlocks can be avoided or broken.',
    companyTags: ['Meta', 'Cisco', 'Qualcomm']
  },
  {
    id: 'q-os-2',
    subjectId: 'os',
    topicId: 'os-virt',
    topicName: 'Virtual Memory & Page Replacement',
    difficulty: 'Medium',
    question: 'What is Thrashing in an operating system?',
    options: [
      'When the CPU spends more time paging (swapping pages in and out) than executing user instructions',
      'When a thread enters an infinite recursive loop causing stack overflow',
      'When two processes attempt to write to shared memory without a lock',
      'When the disk hardware head collides with physical platters'
    ],
    correctIndex: 0,
    explanation: 'Thrashing occurs when the total working sets of active processes exceed available physical memory (RAM). The OS gets trapped in continuous page faults, degrading CPU utilization drastically.',
    companyTags: ['Apple', 'Microsoft', 'Intel']
  },
  {
    id: 'q-os-3',
    subjectId: 'os',
    topicId: 'os-sync',
    topicName: 'Process Synchronization & Mutex',
    difficulty: 'Hard',
    question: 'What is the critical difference between a Counting Semaphore and a Mutex?',
    options: [
      'A Mutex can be unlocked by any thread, whereas a Semaphore can only be unlocked by the thread that locked it',
      'A Mutex has ownership semantics (only the locking thread can unlock it), whereas a Semaphore is a signaling mechanism without ownership',
      'A Semaphore can only hold values 0 and 1, whereas a Mutex holds integers up to 256',
      'Semaphores run in user space while Mutexes run exclusively in hardware microcode'
    ],
    correctIndex: 1,
    explanation: 'A Mutex enforces strict ownership: the thread that acquires the lock must be the one to release it. A Semaphore is a signaling mechanism: any thread can post/signal a semaphore to awaken another waiting thread.',
    companyTags: ['Nvidia', 'Google', 'VMware']
  },

  // CN
  {
    id: 'q-cn-1',
    subjectId: 'cn',
    topicId: 'cn-tcp',
    topicName: 'TCP 3-Way Handshake & 4-Way Close',
    difficulty: 'Easy',
    question: 'During a TCP 3-Way Handshake to establish a reliable connection, what packets are exchanged in order?',
    options: [
      '1. ACK -> 2. SYN -> 3. SYN-ACK',
      '1. SYN -> 2. SYN-ACK -> 3. ACK',
      '1. SYN -> 2. ACK -> 3. FIN',
      '1. CONNECT -> 2. ACCEPT -> 3. READY'
    ],
    correctIndex: 1,
    explanation: 'The client sends SYN (with initial sequence number ISN_c), the server responds with SYN-ACK (acknowledging ISN_c + 1 and providing its own ISN_s), and the client replies with ACK.',
    companyTags: ['Amazon', 'Cisco', 'Cloudflare']
  },
  {
    id: 'q-cn-2',
    subjectId: 'cn',
    topicId: 'cn-dns-http',
    topicName: 'DNS, HTTP/1.1 vs HTTP/2/3, HTTPS',
    difficulty: 'Medium',
    question: 'Which core transport protocol does HTTP/3 utilize under the hood instead of standard TCP?',
    options: [
      'SCTP (Stream Control Transmission Protocol)',
      'QUIC (over UDP)',
      'Raw IP Packets',
      'WebRTC DataChannel'
    ],
    correctIndex: 1,
    explanation: 'HTTP/3 is built on QUIC, an encrypted-by-default transport protocol running on top of UDP. It eliminates TCP head-of-line blocking across multiple multiplexed streams and supports 0-RTT handshakes.',
    companyTags: ['Google', 'Meta', 'Netflix']
  },

  // OOPs
  {
    id: 'q-oops-1',
    subjectId: 'oops',
    topicId: 'oops-solid',
    topicName: 'SOLID Design Principles',
    difficulty: 'Medium',
    question: 'In SOLID principles, which principle states that "Subtypes must be substitutable for their base types without altering the correctness of the program"?',
    options: [
      'Single Responsibility Principle (SRP)',
      'Open-Closed Principle (OCP)',
      'Liskov Substitution Principle (LSP)',
      'Interface Segregation Principle (ISP)'
    ],
    correctIndex: 2,
    explanation: 'The Liskov Substitution Principle (LSP) ensures that derived classes honor the contracts, pre-conditions, and post-conditions of their parent classes without throwing unexpected exceptions or breaking invariant assumptions.',
    companyTags: ['Paypal', 'Microsoft', 'Atlassian']
  },
  {
    id: 'q-oops-2',
    subjectId: 'oops',
    topicId: 'oops-poly',
    topicName: 'Virtual Functions & VTABLE',
    difficulty: 'Hard',
    question: 'How does runtime polymorphism (dynamic dispatch) function under the hood in C++ / object-oriented compilers?',
    options: [
      'By recompiling function bodies every time a child object is instantiated',
      'Through a virtual method table (vtable) and a hidden pointer (vptr) inside each object instance pointing to the vtable',
      'By searching class names in ASCII strings in a global hash map during each method call',
      'Through CPU register swapping performed by the operating system kernel scheduler'
    ],
    correctIndex: 1,
    explanation: 'When a class declares virtual functions, the compiler creates a vtable containing function pointers. Each object holds a hidden vptr pointing to this table, enabling indirect function lookup at runtime.',
    companyTags: ['Bloomberg', 'Google', 'Electronic Arts']
  },

  // Aptitude
  {
    id: 'q-apt-1',
    subjectId: 'aptitude',
    topicId: 'apt-work',
    topicName: 'Time, Work & Efficiency',
    difficulty: 'Easy',
    question: 'Pipe A can fill a tank in 12 hours, and Pipe B can fill it in 15 hours. If both pipes are opened together, how long will they take to fill the tank?',
    options: [
      '6 hours 40 minutes (20/3 hours)',
      '7 hours 15 minutes',
      '5 hours 30 minutes',
      '8 hours'
    ],
    correctIndex: 0,
    explanation: 'Rate of A = 1/12, Rate of B = 1/15. Combined rate = 1/12 + 1/15 = (5+4)/60 = 9/60 = 3/20 per hour. Time required = 20/3 hours = 6 hours and (2/3 * 60) = 40 minutes.',
    companyTags: ['TCS', 'Infosys', 'Capgemini', 'Wipro']
  },
  {
    id: 'q-apt-2',
    subjectId: 'aptitude',
    topicId: 'apt-pnc',
    topicName: 'Permutations, Combinations & Probability',
    difficulty: 'Medium',
    question: 'Two fair 6-sided dice are rolled simultaneously. What is the probability that the sum of the numbers appearing on top is a prime number?',
    options: [
      '5/12',
      '15/36 (5/12)',
      '13/36',
      '7/18'
    ],
    correctIndex: 1,
    explanation: 'Possible prime sums are 2, 3, 5, 7, 11. Sum 2: (1,1)=1; Sum 3: (1,2),(2,1)=2; Sum 5: (1,4),(2,3),(3,2),(4,1)=4; Sum 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1)=6; Sum 11: (5,6),(6,5)=2. Total favorable outcomes = 1+2+4+6+2 = 15. Total outcomes = 36. Probability = 15/36 = 5/12.',
    companyTags: ['Cognizant', 'Accenture', 'Tech Mahindra']
  },

  // Reasoning
  {
    id: 'q-reas-1',
    subjectId: 'reasoning',
    topicId: 'reas-syllogism',
    topicName: 'Syllogisms (Venn Diagrams)',
    difficulty: 'Medium',
    question: 'Statements:\n1. All algorithms are programs.\n2. Some programs are bugs.\nConclusions:\nI. Some algorithms are bugs.\nII. Some programs are algorithms.\nWhich conclusions logically follow?',
    options: [
      'Only Conclusion I follows',
      'Only Conclusion II follows',
      'Both I and II follow',
      'Neither I nor II follows'
    ],
    correctIndex: 1,
    explanation: 'Since all algorithms are programs, the set of algorithms is entirely inside programs. Therefore, the overlapping part guarantees "Some programs are algorithms" (Conclusion II definitely follows). Conclusion I does not necessarily follow because the subset of bugs may only intersect non-algorithm programs.',
    companyTags: ['Deloitte', 'Amazon', 'EY']
  },
  {
    id: 'q-reas-2',
    subjectId: 'reasoning',
    topicId: 'reas-series',
    topicName: 'Coding-Decoding & Number Series',
    difficulty: 'Medium',
    question: 'Find the next number in the sequence: 2, 6, 12, 20, 30, 42, ?',
    options: [
      '52',
      '54',
      '56',
      '60'
    ],
    correctIndex: 2,
    explanation: 'Pattern 1: Differences are 4, 6, 8, 10, 12, so next difference is 14. 42 + 14 = 56. Pattern 2: Formula n*(n+1): 1*2=2, 2*3=6, 3*4=12, 4*5=20, 5*6=30, 6*7=42, 7*8=56.',
    companyTags: ['Wipro', 'TCS Ninja', 'IBM']
  },

  // DSA Core Logic
  {
    id: 'q-dsa-1',
    subjectId: 'dsa',
    topicId: 'dsa-twoptr',
    topicName: 'Two Pointers & Sliding Window',
    difficulty: 'Medium',
    question: 'In Floyd\'s Cycle Detection (Tortoise and Hare algorithm) for a linked list with a loop, if the slow pointer moves 1 step and the fast pointer moves 2 steps, what happens once they meet at point M?',
    options: [
      'The loop is immediately broken by assigning M.next = null',
      'Resetting slow to the head and moving both slow and fast 1 step at a time guarantees they meet at the cycle start node',
      'Both pointers must move backwards with negative stride',
      'The length of the linked list is proven to be an odd prime number'
    ],
    correctIndex: 1,
    explanation: 'By modular arithmetic, the distance from the head to cycle entry equals the distance from intersection point M around the loop to cycle entry. Advancing one pointer from head and one from M at 1 step/tick meets exactly at the entry node.',
    companyTags: ['Meta', 'Amazon', 'Apple', 'Google']
  },
  {
    id: 'q-dsa-2',
    subjectId: 'dsa',
    topicId: 'dsa-bit',
    topicName: 'Bit Manipulation & Math Logic',
    difficulty: 'Easy',
    question: 'Given a non-empty array of integers where every element appears twice except for one unique element, what single-pass bitwise operation finds the unique number in O(N) time and O(1) space?',
    options: [
      'Bitwise OR of all elements',
      'Bitwise AND of all elements',
      'Bitwise XOR (^) of all elements',
      'Bitwise NOT (~) inverted sum'
    ],
    correctIndex: 2,
    explanation: 'XOR properties: a ^ a = 0 and a ^ 0 = a. Because XOR is commutative and associative, all paired elements cancel out to 0, leaving only the unique solitary element.',
    companyTags: ['Google', 'Microsoft', 'Bloomberg']
  },
  {
    id: 'q-dsa-3',
    subjectId: 'dsa',
    topicId: 'dsa-dp',
    topicName: 'Dynamic Programming Patterns',
    difficulty: 'Hard',
    question: 'For the 0/1 Knapsack Problem with N items and capacity W, what are the optimal time and space complexities using 1D space optimization?',
    options: [
      'Time: O(N * W), Space: O(W)',
      'Time: O(2^N), Space: O(1)',
      'Time: O(N * log W), Space: O(W)',
      'Time: O(N + W), Space: O(N * W)'
    ],
    correctIndex: 0,
    explanation: 'Standard 2D DP uses dp[N+1][W+1]. By iterating capacity backwards from W down to weight[i], we can collapse the DP array to a single 1D row of size W+1, retaining O(N * W) time with only O(W) auxiliary space.',
    companyTags: ['Amazon', 'Uber', 'Goldman Sachs']
  },
  ...BOOK_APTITUDE_QUESTIONS,
  ...EXPANDED_CORE_QUESTIONS
];

export const FLASHCARDS: Flashcard[] = [
  ...EXPANDED_FLASHCARDS,
  {
    id: 'fc-1',
    subjectId: 'dbms',
    topic: 'ACID Properties',
    question: 'What are the 4 ACID properties in database management?',
    answer: 'Atomicity (All or nothing), Consistency (preserves schema/business rules), Isolation (concurrent transactions don\'t interfere), Durability (committed changes persist across crashes).',
    mnemonic: 'A-C-I-D: All transactions need a solid foundation.'
  },
  {
    id: 'fc-2',
    subjectId: 'os',
    topic: 'Deadlock Conditions',
    question: 'What are the 4 necessary conditions for a deadlock to exist?',
    answer: '1. Mutual Exclusion (non-shareable resources)\n2. Hold and Wait (holding one while waiting for another)\n3. No Preemption (cannot forcibly seize resource)\n4. Circular Wait (cycle of processes waiting on each other).',
    mnemonic: 'M-H-N-C: Men Hold No Circles'
  },
  {
    id: 'fc-3',
    subjectId: 'cn',
    topic: 'TCP vs UDP',
    question: 'When should you choose UDP over TCP?',
    answer: 'When low latency and real-time streaming are prioritized over guaranteed packet delivery. Examples: Live video streaming, VoIP audio calls, online multiplayer gaming, DNS queries.',
    code: '// TCP: Connection-oriented, Reliable, Flow & Congestion controlled\n// UDP: Connectionless, Lightweight datagrams, No retransmission overhead'
  },
  {
    id: 'fc-4',
    subjectId: 'oops',
    topic: 'Polymorphism',
    question: 'What is the difference between Method Overloading and Method Overriding?',
    answer: 'Overloading: Same method name with different parameter signatures in the same class (Resolved at compile-time / Static).\nOverriding: Child class redefines a parent class method with the exact same signature (Resolved at runtime / Dynamic dispatch via vtable).',
    mnemonic: 'Overload = Same Class, Diff Params | Override = Child Class, Same Signature'
  },
  {
    id: 'fc-5',
    subjectId: 'dsa',
    topic: 'Sliding Window',
    question: 'How do you detect when to use the Sliding Window pattern?',
    answer: 'Use Sliding Window when dealing with array/string problems asking for subarray/substring that satisfies a condition (e.g. max sum subarray of size k, longest substring without repeating characters, minimum window substring).',
    code: 'let left = 0;\nfor (let right = 0; right < n; right++) {\n  window.add(arr[right]);\n  while (windowInvalid()) {\n    window.remove(arr[left++]);\n  }\n  ans = update(ans, right - left + 1);\n}'
  },
  {
    id: 'fc-6',
    subjectId: 'ml',
    topic: 'Cross-Entropy Loss',
    question: 'Why is Cross-Entropy Loss preferred over Mean Squared Error (MSE) for classification?',
    answer: 'MSE with sigmoid/softmax causes vanishing gradients because its derivative saturates at 0 for confidently wrong predictions. Cross-Entropy loss (-log(p)) heavily penalizes wrong confident classifications and produces linear gradients that maintain strong backpropagation updates.',
    mnemonic: 'MSE for Regression | Cross-Entropy for Classification'
  },
  {
    id: 'fc-7',
    subjectId: 'webdev',
    topic: 'Debouncing vs Throttling',
    question: 'When should you choose Debounce vs Throttle in web applications?',
    answer: '• Debounce: Delays execution until user stops calling for X milliseconds. Ideal for Search Input Autocomplete or window resize.\n• Throttle: Guarantees execution at most once every X milliseconds. Ideal for scroll position tracking or gaming loop updates.',
    code: '// Debounce: waits for pause | Throttle: enforces steady rate limit'
  }
];

export const MOCK_LEETCODE_USERS: Record<string, any> = {
  'tech_candidate': {
    username: 'tech_candidate',
    totalSolved: 312,
    totalQuestions: 3420,
    easySolved: 145,
    totalEasy: 850,
    mediumSolved: 139,
    totalMedium: 1780,
    hardSolved: 28,
    totalHard: 790,
    ranking: 184520,
    acceptanceRate: 64.2,
    streakDays: 19,
    topTopics: [
      { topic: 'Arrays & Hashing', solved: 78, total: 100, percentage: 78, isWeak: false },
      { topic: 'Two Pointers', solved: 34, total: 45, percentage: 75, isWeak: false },
      { topic: 'Binary Search', solved: 26, total: 38, percentage: 68, isWeak: false },
      { topic: 'Trees & BST', solved: 42, total: 65, percentage: 64, isWeak: false },
      { topic: 'Dynamic Programming', solved: 21, total: 85, percentage: 24, isWeak: true },
      { topic: 'Graph & BFS/DFS', solved: 18, total: 60, percentage: 30, isWeak: true },
      { topic: 'Bit Manipulation', solved: 12, total: 35, percentage: 34, isWeak: true }
    ],
    weakTopics: ['Dynamic Programming', 'Graph & BFS/DFS', 'Bit Manipulation'],
    recentSubmissions: [
      { title: 'Lowest Common Ancestor of a Binary Search Tree', status: 'Accepted', timeAgo: '2 hours ago', difficulty: 'Medium' },
      { title: 'Coin Change', status: 'Time Limit Exceeded', timeAgo: '1 day ago', difficulty: 'Medium' },
      { title: 'Course Schedule II', status: 'Wrong Answer', timeAgo: '2 days ago', difficulty: 'Medium' },
      { title: 'Number of Islands', status: 'Accepted', timeAgo: '3 days ago', difficulty: 'Medium' }
    ]
  },
  'faang_grinder': {
    username: 'faang_grinder',
    totalSolved: 620,
    totalQuestions: 3420,
    easySolved: 210,
    totalEasy: 850,
    mediumSolved: 320,
    totalMedium: 1780,
    hardSolved: 90,
    totalHard: 790,
    ranking: 42100,
    acceptanceRate: 72.8,
    streakDays: 45,
    topTopics: [
      { topic: 'Arrays & Hashing', solved: 120, total: 120, percentage: 100, isWeak: false },
      { topic: 'Dynamic Programming', solved: 68, total: 85, percentage: 80, isWeak: false },
      { topic: 'Graph & BFS/DFS', solved: 52, total: 60, percentage: 86, isWeak: false },
      { topic: 'Trie & String Algorithms', solved: 15, total: 40, percentage: 37, isWeak: true }
    ],
    weakTopics: ['Trie & String Algorithms', 'Segment Trees'],
    recentSubmissions: [
      { title: 'Trapping Rain Water', status: 'Accepted', timeAgo: '4 hours ago', difficulty: 'Hard' },
      { title: 'Word Ladder II', status: 'Accepted', timeAgo: '1 day ago', difficulty: 'Hard' }
    ]
  }
};
