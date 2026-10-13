import { Question, Flashcard } from '../types';

export const EXPANDED_CORE_QUESTIONS: Question[] = [
  // DBMS Questions
  {
    id: 'q-dbms-3',
    subjectId: 'dbms',
    topicId: 'db-mvcc',
    topicName: 'MVCC & Isolation Internals',
    difficulty: 'Hard',
    question: 'How does Multi-Version Concurrency Control (MVCC) in PostgreSQL and MySQL InnoDB allow readers to never block writers and writers to never block readers?',
    options: [
      'By placing exclusive table locks on every SELECT query',
      'By creating snapshot versions (tuple visibility via transaction IDs xmin/xmax or undo log) so readers query point-in-time consistent snapshots',
      'By converting all writes into synchronous memory swaps',
      'By rejecting any read request that overlaps with an active write transaction'
    ],
    correctIndex: 1,
    explanation: 'MVCC creates multiple historical versions of data rows. When a row is updated, a new version is created with current transaction ID (xmin). Readers view the snapshot of committed data corresponding to when their transaction or statement started via undo logs or visibility maps, avoiding read-write lock contention.',
    companyTags: ['PostgreSQL', 'Meta', 'Amazon', 'Uber']
  },
  {
    id: 'q-dbms-4',
    subjectId: 'dbms',
    topicId: 'db-sql',
    topicName: 'SQL Joins, Views & Query Tuning',
    difficulty: 'Medium',
    question: 'Consider the SQL query: "SELECT dept_id, COUNT(*) FROM employees WHERE salary > 50000 GROUP BY dept_id HAVING COUNT(*) > 5;". In what order does the SQL query engine logically execute these clauses?',
    options: [
      'FROM -> WHERE -> GROUP BY -> HAVING -> SELECT',
      'SELECT -> FROM -> WHERE -> GROUP BY -> HAVING',
      'FROM -> SELECT -> WHERE -> HAVING -> GROUP BY',
      'WHERE -> FROM -> GROUP BY -> SELECT -> HAVING'
    ],
    correctIndex: 0,
    explanation: 'SQL logical execution order is: 1. FROM & JOINs (get table data), 2. WHERE (filter rows before grouping), 3. GROUP BY (aggregate), 4. HAVING (filter aggregated groups), 5. SELECT (project columns & evaluate expressions), 6. DISTINCT, 7. ORDER BY, 8. LIMIT / OFFSET.',
    companyTags: ['Goldman Sachs', 'Oracle', 'Microsoft']
  },
  {
    id: 'q-dbms-5',
    subjectId: 'dbms',
    topicId: 'db-index',
    topicName: 'Indexing & B/B+ Trees',
    difficulty: 'Hard',
    question: 'Why do relational databases (MySQL, Postgres, Oracle) predominantly choose B+ Trees over B-Trees for disk storage indexing?',
    options: [
      'B+ Trees have fewer nodes than B-Trees for the exact same data size',
      'In B+ Trees, internal nodes store only keys (maximizing fan-out and reducing tree height), and all leaf nodes are sequentially linked for fast O(log N) + sequential range scans',
      'B+ Trees can be stored in RAM without requiring disk I/O',
      'B-Trees cannot store strings or floating point numbers'
    ],
    correctIndex: 1,
    explanation: 'In B+ Trees, internal nodes only contain search keys (no data records), allowing hundreds of keys per disk block (high fan-out, usually height 3-4 for millions of rows). Furthermore, all leaf nodes contain data pointers and form a doubly-linked list, making range queries (BETWEEN x AND y) require just 1 point search followed by sequential leaf traversal.',
    companyTags: ['Google', 'Meta', 'Snowflake', 'Amazon']
  },
  {
    id: 'q-dbms-6',
    subjectId: 'dbms',
    topicId: 'db-recovery',
    topicName: 'Database Recovery & WAL',
    difficulty: 'Hard',
    question: 'In the Write-Ahead Logging (WAL) protocol used by database crash-recovery engines (like ARIES), what must occur BEFORE a modified database page can be written to disk?',
    options: [
      'The entire database must be flushed to tape storage',
      'The log record describing the modification must be securely flushed to non-volatile storage (disk/SSD)',
      'All concurrent transactions must commit and disconnect',
      'The garbage collector must reclaim all unused memory pages'
    ],
    correctIndex: 1,
    explanation: 'Write-Ahead Logging strictly enforces that the log record detailing the change must be persisted to stable storage (fsync) before the actual modified data page is allowed to overwrite the physical disk file. This guarantees Atomicity and Durability (the WAL can redo or undo changes during crash recovery).',
    companyTags: ['AWS', 'Stripe', 'Google Cloud']
  },

  // OS Questions
  {
    id: 'q-os-3',
    subjectId: 'os',
    topicId: 'os-sync',
    topicName: 'Process Synchronization & Mutex',
    difficulty: 'Medium',
    question: 'What is the primary difference between a Spinlock and a standard Mutex lock in operating system kernels?',
    options: [
      'A Mutex can only be used in single-threaded systems, whereas a Spinlock is distributed',
      'A Spinlock continuously polls (busy-waits in a CPU loop) without putting the thread to sleep, whereas a Mutex puts the waiting thread to sleep and yields the CPU core to other processes',
      'A Spinlock automatically prevents deadlocks under all circumstances',
      'A Mutex uses hardware interrupts while a Spinlock does not'
    ],
    correctIndex: 1,
    explanation: 'A spinlock executes a busy-wait loop (`while(test_and_set(&lock))`), which avoids the overhead of context switching and is optimal when the critical section is extremely short (e.g. in OS interrupt handlers). A mutex blocks the thread, triggering a context switch to save CPU cycles when waiting for long critical sections.',
    companyTags: ['Apple', 'Microsoft', 'NVIDIA', 'Qualcomm']
  },
  {
    id: 'q-os-4',
    subjectId: 'os',
    topicId: 'os-virt',
    topicName: 'Virtual Memory & Page Replacement',
    difficulty: 'Hard',
    question: 'What phenomenon causes "Thrashing" in an operating system, and how does the OS resolve it?',
    options: [
      'Too many hard drives connected to the motherboard; resolved by RAID mirroring',
      'The sum of the working sets of all active processes exceeds available physical RAM, causing the CPU to spend more time swapping pages in and out of disk than executing instructions; resolved by suspending/swapping out processes',
      'A stack overflow in kernel space; resolved by restarting the power supply',
      'A CPU cache miss on L1 instruction cache; resolved by branch prediction'
    ],
    correctIndex: 1,
    explanation: 'Thrashing occurs when total memory allocated to running processes exceeds physical RAM capacity. The system rapidly alternates between page faults and disk I/O, dropping CPU utilization to near 0%. The OS Working Set Model prevents this by monitoring page fault frequency and temporarily swapping entire suspended processes out to disk.',
    companyTags: ['Linux Foundation', 'Intel', 'Google']
  },
  {
    id: 'q-os-5',
    subjectId: 'os',
    topicId: 'os-ipc',
    topicName: 'Inter-Process Communication (IPC)',
    difficulty: 'Medium',
    question: 'Among Unix Inter-Process Communication (IPC) mechanisms (Pipes, Named Pipes/FIFOs, Message Queues, Sockets, Shared Memory), which provides the highest data throughput and lowest transfer latency, and why?',
    options: [
      'Unix Domain Sockets, because packets are compressed via gzip',
      'Shared Memory, because multiple processes map the same physical RAM pages into their virtual address spaces, eliminating kernel-to-user buffer copying',
      'Standard Anonymous Pipes, because they use CPU registers only',
      'Message Queues, because the kernel serializes them into JSON'
    ],
    correctIndex: 1,
    explanation: 'Shared Memory (`shmget`/`mmap`) is the fastest IPC because once the shared memory region is mapped into the address spaces of the participating processes, data is read and written directly in RAM without crossing the kernel boundary or copying buffers. Synchronization (via semaphores or mutexes) must be handled by the application.',
    companyTags: ['Bloomberg', 'Two Sigma', 'Citadel', 'Jane Street']
  },

  // Computer Networks Questions
  {
    id: 'q-cn-3',
    subjectId: 'cn',
    topicId: 'cn-dns-http',
    topicName: 'HTTP/1.1 vs HTTP/2 vs HTTP/3',
    difficulty: 'Hard',
    question: 'What critical limitation in HTTP/2 did HTTP/3 solve by replacing TCP with the UDP-based QUIC protocol?',
    options: [
      'HTTP/2 did not support SSL/TLS encryption',
      'TCP-level Head-of-Line (HoL) blocking: in HTTP/2, if a single packet is lost on the TCP connection, all multiplexed HTTP streams stall until that single packet is retransmitted and acknowledged',
      'HTTP/2 limited headers to 256 bytes total',
      'HTTP/2 could not transfer binary data images'
    ],
    correctIndex: 1,
    explanation: 'HTTP/2 multiplexes multiple streams over a single TCP connection. However, because TCP enforces an in-order byte stream, any lost TCP packet blocks ALL multiplexed streams until retransmitted (TCP Head-of-Line blocking). HTTP/3 operates over QUIC (built on UDP), where each stream has independent packet delivery and loss recovery.',
    companyTags: ['Cloudflare', 'Google', 'Meta', 'Akamai']
  },
  {
    id: 'q-cn-4',
    subjectId: 'cn',
    topicId: 'cn-tcp',
    topicName: 'TCP 3-Way Handshake & 4-Way Close',
    difficulty: 'Medium',
    question: 'In TCP connection teardown, why must the client enter the TIME_WAIT state and remain there for 2 * MSL (Maximum Segment Lifetime) before completely closing the socket?',
    options: [
      'To allow the computer fan to cool down the network interface card',
      'To ensure the final ACK sent by the client reaches the server (and retransmit if lost), and to allow any lingering duplicate packets in the network to expire so they do not contaminate future connections on the same port',
      'To compute the SHA-256 hash of the entire transferred payload',
      'To wait for the operating system to reboot'
    ],
    correctIndex: 1,
    explanation: 'TIME_WAIT serves two critical functions: 1. Reliability: If the client\'s final ACK is lost in transit, the server will retransmit its FIN. The client must be alive to re-send the ACK. 2. Quarantine: Lingering packets delayed by intermediate routers must drain out before a new connection reuses the same (IP, Port) tuple.',
    companyTags: ['Amazon', 'Cisco', 'Netflix']
  },
  {
    id: 'q-cn-5',
    subjectId: 'cn',
    topicId: 'cn-routing',
    topicName: 'IP Addressing, Subnetting & CIDR',
    difficulty: 'Medium',
    question: 'An enterprise network is allocated the CIDR block 192.168.10.0/26. How many total IP addresses are in this subnet, and how many can be assigned to valid host devices?',
    options: [
      '64 total, 62 usable host addresses',
      '128 total, 126 usable host addresses',
      '32 total, 30 usable host addresses',
      '64 total, 64 usable host addresses'
    ],
    correctIndex: 0,
    explanation: 'A /26 subnet has 32 - 26 = 6 host bits. Total IP addresses = 2^6 = 64. In any IPv4 subnet, 2 addresses are reserved: 1 for the Network ID (192.168.10.0) and 1 for the Broadcast address (192.168.10.63). Thus, usable host addresses = 64 - 2 = 62 (192.168.10.1 through 192.168.10.62).',
    companyTags: ['Cisco', 'Juniper', 'TCS']
  },

  // OOPs Questions
  {
    id: 'q-oops-3',
    subjectId: 'oops',
    topicId: 'oops-solid',
    topicName: 'SOLID Design Principles',
    difficulty: 'Hard',
    question: 'Which SOLID principle is violated if a derived class "Square" inherits from a base class "Rectangle", but overriding "setWidth(w)" also changes the height, breaking tests that treat it as a generic Rectangle?',
    options: [
      'Single Responsibility Principle (SRP)',
      'Open-Closed Principle (OCP)',
      'Liskov Substitution Principle (LSP)',
      'Interface Segregation Principle (ISP)'
    ],
    correctIndex: 2,
    explanation: 'Liskov Substitution Principle (LSP) states that objects of a superclass should be replaceable with objects of its subclasses without altering the correctness or invariants of the program. A Square cannot substitute for a Rectangle because altering width in a Rectangle does not alter height, whereas Square violates this assumption.',
    companyTags: ['Microsoft', 'Uber', 'Amazon', 'Spotify']
  },
  {
    id: 'q-oops-4',
    subjectId: 'oops',
    topicId: 'oops-poly',
    topicName: 'Virtual Functions & VTABLE',
    difficulty: 'Hard',
    question: 'In C++ and Java JVM internals, what is the exact mechanism that enables dynamic dispatch (runtime polymorphism) when calling a virtual method through a base class pointer?',
    options: [
      'The compiler embeds an if-else ladder comparing string class names at runtime',
      'Each object containing virtual methods has an invisible pointer (vptr) pointing to a Virtual Method Table (vtable) of function pointers; method calls are resolved via an indirect memory jump `vptr[offset]()`',
      'The operating system intercepts every function call with a software interrupt',
      'Dynamic dispatch uses a central SQL database to look up function addresses'
    ],
    correctIndex: 1,
    explanation: 'Every class with virtual methods has a compiler-generated `vtable` (an array of function pointers). Each object instance contains a hidden `vptr` pointing to its class\'s vtable. At runtime, `basePtr->virtualMethod()` translates to `basePtr->vptr[method_index]()`, achieving O(1) runtime method dispatch.',
    companyTags: ['Google', 'Apple', 'Meta', 'Game Engines (Unreal)']
  },
  {
    id: 'q-oops-5',
    subjectId: 'oops',
    topicId: 'oops-patterns',
    topicName: 'Essential Design Patterns',
    difficulty: 'Medium',
    question: 'You are designing an e-commerce checkout system where shipping fee calculations change dynamically based on whether the customer chooses Standard, Express, or Overnight delivery. Which design pattern should you apply?',
    options: [
      'Singleton Pattern',
      'Strategy Pattern',
      'Decorator Pattern',
      'Observer Pattern'
    ],
    correctIndex: 1,
    explanation: 'The Strategy Pattern defines a family of algorithms (e.g. StandardShippingStrategy, ExpressShippingStrategy), encapsulates each one in a separate class, and makes them interchangeable at runtime. The Context (Checkout) delegates the calculation to the injected strategy.',
    companyTags: ['Shopify', 'Amazon', 'PayPal']
  },

  // DSA Questions
  {
    id: 'q-dsa-4',
    subjectId: 'dsa',
    topicId: 'dsa-graphs',
    topicName: 'Graph Traversal & Shortest Path',
    difficulty: 'Medium',
    question: 'Why does Dijkstra\'s Shortest Path Algorithm fail or produce incorrect results on graphs with negative-weight edges, and which algorithm should be used instead?',
    options: [
      'Dijkstra uses too much RAM; use Breadth-First Search instead',
      'Dijkstra greedily assumes that once a node is extracted from the priority queue, its shortest distance is finalized; a negative edge can subsequently reduce this distance. Use Bellman-Ford or SPFA instead',
      'Dijkstra only works on directed graphs, never undirected graphs',
      'Negative edges cause integer overflow in the adjacency matrix'
    ],
    correctIndex: 1,
    explanation: 'Dijkstra relies on the greedy property that adding non-negative edges can never decrease a path length. With negative weights, an unvisited path could yield a lower total distance after a node has already been marked as visited. Bellman-Ford relaxes all E edges V-1 times, correctly handling negative edges and detecting negative cycles.',
    companyTags: ['Google Maps', 'Uber', 'Microsoft']
  },
  {
    id: 'q-dsa-5',
    subjectId: 'dsa',
    topicId: 'dsa-trees',
    topicName: 'Binary Trees & BST Logic',
    difficulty: 'Medium',
    question: 'What is the time complexity to find the in-order predecessor and successor of a given node in a balanced Binary Search Tree (AVL / Red-Black Tree) containing N nodes?',
    options: [
      'O(1)',
      'O(log N)',
      'O(N)',
      'O(N log N)'
    ],
    correctIndex: 1,
    explanation: 'In a balanced BST of height O(log N), finding the in-order predecessor (maximum in left subtree or deepest ancestor whose right child is also an ancestor) requires at most traveling down or up the height of the tree: O(log N) worst-case time.',
    companyTags: ['Amazon', 'Bloomberg', 'Goldman Sachs']
  },
  {
    id: 'q-dsa-6',
    subjectId: 'dsa',
    topicId: 'dsa-complexity',
    topicName: 'Asymptotic Analysis & Big-O',
    difficulty: 'Hard',
    question: 'Using the Master Theorem, what is the asymptotic runtime complexity of the recurrence relation T(N) = 2T(N/2) + O(N)?',
    options: [
      'O(N)',
      'O(N log N)',
      'O(N^2)',
      'O(log N)'
    ],
    correctIndex: 1,
    explanation: 'For T(N) = aT(N/b) + f(N): a = 2, b = 2, f(N) = O(N). log_b(a) = log_2(2) = 1. Since f(N) = Θ(N^(log_b(a)) * log^0(N)), this matches Case 2 of Master Theorem. Therefore, T(N) = Θ(N log N). This is the exact recurrence for Merge Sort.',
    companyTags: ['Google', 'Meta', 'Amazon']
  },
  {
    id: 'q-dsa-7',
    subjectId: 'dsa',
    topicId: 'dsa-graphs',
    topicName: 'Graph Traversal & Shortest Path',
    difficulty: 'Hard',
    question: 'Why does standard Dijkstra\'s algorithm fail to guarantee the shortest path on graphs containing negative edge weights, and which algorithm must be used instead?',
    options: [
      'Dijkstra uses recursion which overflows; use BFS instead',
      'Dijkstra operates greedily assuming once a node is marked visited/extracted its distance is finalized, which is violated by negative edges; use Bellman-Ford or Floyd-Warshall instead',
      'Negative edges cause memory allocation errors in adjacency lists',
      'Dijkstra requires undirected graphs; negative edges only occur in directed trees'
    ],
    correctIndex: 1,
    explanation: 'Dijkstra assumes optimal substructure with monotonically increasing path lengths. A negative edge can retroactively provide a cheaper path to an already processed node. Bellman-Ford relaxes all E edges V-1 times and detects negative cycles in O(V*E) time.',
    companyTags: ['Google', 'Uber', 'Microsoft', 'Atlassian']
  },
  {
    id: 'q-dsa-8',
    subjectId: 'dsa',
    topicId: 'dsa-dp',
    topicName: 'Dynamic Programming Patterns',
    difficulty: 'Hard',
    question: 'In the classic 0/1 Knapsack problem with weights W and values V and capacity C, what is the optimal space complexity if solved bottom-up iteratively?',
    options: [
      'O(N * C) 2D table only',
      'O(C) by updating a 1D array from right to left (backwards)',
      'O(N) by sorting weights greedily',
      'O(1) auxiliary space'
    ],
    correctIndex: 1,
    explanation: 'Since dp[i][w] depends only on values from the previous item dp[i-1][w] and dp[i-1][w - weight[i]], we can compress the DP table into a single 1D array of size C + 1 by iterating the capacity backwards (from C down to weight[i]) so previous-row values are not overwritten before being consumed.',
    companyTags: ['Amazon', 'Adobe', 'Bloomberg']
  },

  // Machine Learning (ML) Questions
  {
    id: 'q-ml-1',
    subjectId: 'ml',
    topicId: 'ml-supervised',
    topicName: 'Supervised Learning & Regularization',
    difficulty: 'Medium',
    question: 'Why does L1 Regularization (Lasso) produce sparse model weights (setting some coefficients to exactly zero), whereas L2 Regularization (Ridge) only shrinks weights towards zero without making them zero?',
    options: [
      'L1 uses squared loss while L2 uses absolute loss',
      'The L1 diamond-shaped constraint boundary has sharp corners along the coordinate axes where the loss contours frequently intersect at zero, whereas L2 has a circular/spherical smooth boundary',
      'L1 divides by the variance of the dataset while L2 multiplies by the mean',
      'L2 regularization is mathematically unstable for linear models'
    ],
    correctIndex: 1,
    explanation: 'L1 norm penalty is sum(|w_i|), producing a diamond/polytope constraint region with sharp corners on the parameter axes. The elliptical contours of the objective loss function typically intersect this constraint at the corners (where coordinate values are 0), acting as natural feature selection. L2 norm penalty is sum(w_i^2), a smooth hypersphere where intersections rarely land exactly on the axis.',
    companyTags: ['Google', 'Meta', 'Netflix', 'Amazon']
  },
  {
    id: 'q-ml-2',
    subjectId: 'ml',
    topicId: 'ml-trees',
    topicName: 'Decision Trees & Boosting (XGBoost)',
    difficulty: 'Hard',
    question: 'What is the foundational architectural difference between Bagging (e.g., Random Forests) and Boosting (e.g., Gradient Boosted Decision Trees / XGBoost)?',
    options: [
      'Bagging trains trees sequentially to fix errors, while Boosting trains trees independently in parallel',
      'Bagging trains independent deep trees in parallel on bootstrap samples to reduce variance, whereas Boosting trains shallow trees sequentially where each new tree fits the pseudo-residuals/gradients of the ensemble to reduce bias',
      'Bagging only works for classification, while Boosting only works for regression',
      'Boosting uses random feature subsets while Bagging uses all features at every split'
    ],
    correctIndex: 1,
    explanation: 'Random Forest (Bagging) builds independent deep trees (high variance, low bias) in parallel on bootstrap samples and averages predictions to reduce variance. Boosting (GBDT/XGBoost) trains shallow decision trees (stumps/high bias) sequentially, with each tree explicitly fitting the negative gradient of the loss function (residuals) of previous estimators to reduce bias.',
    companyTags: ['Uber', 'Meta', 'Stripe', 'Two Sigma']
  },
  {
    id: 'q-ml-3',
    subjectId: 'ml',
    topicId: 'ml-transformers',
    topicName: 'Transformers & Self-Attention',
    difficulty: 'Hard',
    question: 'In the Transformer Scaled Dot-Product Attention formula Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V, why is the dot-product divided by the scaling factor sqrt(d_k)?',
    options: [
      'To prevent the matrix multiplication from overflowing 64-bit floating point registers',
      'For large key dimensions d_k, the dot products grow large in magnitude, pushing the softmax function into regions with vanishingly small gradients; dividing by sqrt(d_k) keeps variance at 1',
      'To normalize the output length of the generated summary tokens',
      'To ensure that the attention matrix has an eigenvalue of exactly 1'
    ],
    correctIndex: 1,
    explanation: 'If Q and K have mean 0 and variance 1, their dot product has mean 0 and variance d_k. For large d_k, the dot products become extremely large, driving softmax into regions where gradients are near zero (saturating the softmax). Dividing by sqrt(d_k) scales the variance back to 1, ensuring stable backpropagation gradients.',
    companyTags: ['Google', 'OpenAI', 'Anthropic', 'Apple', 'Meta']
  },
  {
    id: 'q-ml-4',
    subjectId: 'ml',
    topicId: 'ml-metrics',
    topicName: 'Model Evaluation & Validation',
    difficulty: 'Medium',
    question: 'In a real-world Credit Card Fraud Detection model where only 0.1% of transactions are fraudulent, why is ROC-AUC often misleading, and which evaluation metric should be preferred?',
    options: [
      'ROC-AUC requires balanced classes to compute; accuracy should be used instead',
      'The False Positive Rate (FPR) in ROC curves has True Negatives in the denominator; with overwhelming non-fraud cases, FPR remains artificially tiny even with thousands of false alarms. Precision-Recall AUC (PR-AUC) should be preferred',
      'ROC-AUC cannot be calculated if there are false negatives',
      'Cross-entropy loss is strictly preferred over all visual curves'
    ],
    correctIndex: 1,
    explanation: 'FPR = FP / (FP + TN). When TN is in the millions, a huge spike in false positives (FP) barely changes FPR, making the ROC curve look deceptively optimistic. The Precision-Recall (PR) curve focuses solely on the minority positive class (Precision = TP / (TP+FP), Recall = TP / (TP+FN)), making PR-AUC far more informative for extreme class imbalances.',
    companyTags: ['Stripe', 'PayPal', 'Mastercard', 'Amazon']
  },
  {
    id: 'q-ml-5',
    subjectId: 'ml',
    topicId: 'ml-rag-agents',
    topicName: 'Generative AI, RAG & Vector Embeddings',
    difficulty: 'Hard',
    question: 'When implementing a Retrieval-Augmented Generation (RAG) pipeline for production enterprise search, why is "Chunking Strategy" critical, and what problem does "Small-to-Big" (or Parent-Child) retrieval solve?',
    options: [
      'Chunking encrypts vector embeddings to conform to GDPR',
      'Small chunks yield precise vector embeddings that match search queries cleanly without noise, while returning the larger parent chunk to the LLM provides complete context to avoid hallucinations',
      'Small chunks allow GPU tensors to avoid VRAM paging during cosine similarity',
      'Parent-child retrieval converts all text documents into binary decision trees'
    ],
    correctIndex: 1,
    explanation: 'Large chunks dilute embedding semantics, leading to poor semantic retrieval matches. Tiny chunks produce highly focused vector embeddings that easily match specific user queries, but lack enough context for an LLM to generate an accurate response. Parent-Child retrieval embeds small granular chunks for high-precision vector search, but retrieves and passes the enclosing parent document chunk to the LLM.',
    companyTags: ['Google', 'Microsoft', 'Databricks', 'Snowflake']
  },
  {
    id: 'q-ml-6',
    subjectId: 'ml',
    topicId: 'ml-deeplearn',
    topicName: 'Neural Networks & Optimizers',
    difficulty: 'Medium',
    question: 'What distinguishes the AdamW optimizer from the standard Adam optimizer in modern Deep Learning and Transformer training?',
    options: [
      'AdamW uses second-order Hessian matrix calculations instead of first-order gradients',
      'AdamW decouples L2 weight decay from gradient moment updates, applying weight decay directly to weights rather than treating it as added gradient in the moving averages',
      'AdamW works only on Windows workstations',
      'AdamW eliminates learning rate warmup completely'
    ],
    correctIndex: 1,
    explanation: 'In standard Adam with L2 regularization, the weight penalty is added directly into the gradient, meaning weights with large historical gradients receive disproportionately less decay. AdamW (Loshchilov & Hutter) decouples weight decay, applying decay directly to the parameters: w = w - lr * weight_decay * w - lr * m_hat / (sqrt(v_hat) + eps). This dramatically improves generalization in Transformers.',
    companyTags: ['Meta', 'OpenAI', 'Google DeepMind']
  },

  // Web Development Questions
  {
    id: 'q-web-1',
    subjectId: 'webdev',
    topicId: 'web-eventloop',
    topicName: 'JavaScript Engine & Event Loop',
    difficulty: 'Hard',
    question: 'What will be the exact logged sequence of numbers for the following JavaScript snippet?\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3)).then(() => console.log(4));\nqueueMicrotask(() => console.log(5));\nconsole.log(6);',
    options: [
      '1, 6, 3, 5, 4, 2',
      '1, 2, 3, 4, 5, 6',
      '1, 6, 2, 3, 4, 5',
      '1, 6, 3, 4, 5, 2'
    ],
    correctIndex: 0,
    explanation: 'Execution trace: Synchronous code runs first: logs 1, schedules timer in macrotask queue, enqueues Promise .then(3) in microtask queue, enqueues microtask(5), logs 6. Next, drain microtask queue before any macrotask: execute 3, which schedules microtask 4; execute 5; then execute 4. Microtask queue is now empty. Finally, execute macrotask from setTimeout: logs 2. Result: 1, 6, 3, 5, 4, 2.',
    companyTags: ['Google', 'Meta', 'Uber', 'Atlassian']
  },
  {
    id: 'q-web-2',
    subjectId: 'webdev',
    topicId: 'web-browser',
    topicName: 'Browser Internals & Critical Rendering Path',
    difficulty: 'Medium',
    question: 'What is the key performance difference between triggering a "Reflow" (Layout) versus triggering a "Repaint" in the browser?',
    options: [
      'Reflow only affects CSS transitions, whereas Repaint recalculates DOM nodes',
      'Reflow recalculates the geometric dimensions and positions of all affected elements on the page (computationally expensive and cascading), whereas Repaint only redraws visual pixels (e.g. background-color, visibility) without altering geometry',
      'Repaint stops JavaScript execution, whereas Reflow runs on a background Web Worker',
      'Reflow is accelerated by WebGPU, whereas Repaint is CPU-only'
    ],
    correctIndex: 1,
    explanation: 'Reflow (Layout) determines the physical dimensions and spatial positions of elements in the render tree; changing properties like width, height, margin, or reading offsetTop triggers a reflow that can cascade across child/parent elements. Repaint happens when visual appearance changes without altering geometry (color, background). Using CSS transforms (`transform: translate3d`) avoids both reflow and repaint by delegating directly to the GPU Compositor thread.',
    companyTags: ['Netflix', 'Airbnb', 'Amazon', 'Vercel']
  },
  {
    id: 'q-web-3',
    subjectId: 'webdev',
    topicId: 'web-react-core',
    topicName: 'React Internals: Fiber & Reconciliation',
    difficulty: 'Hard',
    question: 'Why did the React team rewrite the core reconciliation engine from Stack reconciler to React Fiber in React 16?',
    options: [
      'To replace HTML with WebGL rendering for faster mobile graphics',
      'The old Stack reconciler worked synchronously and could not interrupt or pause rendering, dropping animation frames on complex UIs; Fiber uses a linked-list work-in-progress tree that allows time-slicing and prioritized interruptions',
      'To support TypeScript types natively without a transpiler',
      'To prevent memory leaks from JavaScript closures'
    ],
    correctIndex: 1,
    explanation: 'The Stack reconciler processed tree updates recursively and synchronously. Large component trees would block the main thread for 50-100ms, causing jank and lagging input. Fiber reimagines a call stack frame as a JS object (a Fiber node in a singly-linked list). This enables cooperative multitasking (requestIdleCallback / MessageChannel), pausing work for high-priority user typing/clicks, and resuming low-priority rendering later.',
    companyTags: ['Meta', 'Vercel', 'Stripe', 'Microsoft']
  },
  {
    id: 'q-web-4',
    subjectId: 'webdev',
    topicId: 'web-security',
    topicName: 'Web Security: CORS, CSRF & XSS',
    difficulty: 'Hard',
    question: 'A malicious site tricks an authenticated user into visiting a page that submits a POST form to `https://bank.com/transfer` with attacker parameters. The user has a valid session cookie for `bank.com`. What security mechanism best prevents this Cross-Site Request Forgery (CSRF) attack?',
    options: [
      'CORS headers with Access-Control-Allow-Origin: *',
      'Setting `SameSite=Lax` or `SameSite=Strict` on session cookies, combined with anti-CSRF synchronizer tokens in request headers',
      'Encrypting the website source code with Webpack uglify',
      'Using HTTP Basic Authentication over HTTPS'
    ],
    correctIndex: 1,
    explanation: 'Simple HTML form POSTs do not trigger CORS preflight checks, and browsers automatically attach cookies by default to cross-site requests. Setting `SameSite=Strict` or `SameSite=Lax` ensures the browser will not send the session cookie on cross-site state-changing POST requests. Complementing this with anti-CSRF cryptographically signed tokens (or Custom Header checks in AJAX) completely prevents CSRF.',
    companyTags: ['Google', 'Coinbase', 'Stripe', 'PayPal']
  },
  {
    id: 'q-web-5',
    subjectId: 'webdev',
    topicId: 'web-apis',
    topicName: 'API Paradigms: REST vs GraphQL vs gRPC',
    difficulty: 'Medium',
    question: 'In HTTP REST API design, which HTTP method is required to be "Idempotent" but NOT "Safe"?',
    options: [
      'GET',
      'POST',
      'PUT',
      'PATCH'
    ],
    correctIndex: 2,
    explanation: 'An HTTP method is "Safe" if it does not alter server state (e.g. GET, HEAD, OPTIONS). A method is "Idempotent" if making N identical requests has the exact same side-effect on server state as making 1 request. PUT replaces a resource entirely with the provided payload, so executing it 10 times leaves the resource in the exact same state as executing once. POST is neither safe nor idempotent. GET is both safe and idempotent.',
    companyTags: ['Amazon', 'Salesforce', 'Shopify']
  },
  {
    id: 'q-web-6',
    subjectId: 'webdev',
    topicId: 'web-perf',
    topicName: 'Web Performance & Core Web Vitals',
    difficulty: 'Medium',
    question: 'Google\'s Core Web Vitals measure user experience. Which metric measures the visual stability of a webpage to prevent annoying layout shifts during page load?',
    options: [
      'Largest Contentful Paint (LCP)',
      'Interaction to Next Paint (INP)',
      'Cumulative Layout Shift (CLS)',
      'Time to First Byte (TTFB)'
    ],
    correctIndex: 2,
    explanation: 'Cumulative Layout Shift (CLS) scores unexpected layout movements of visible content (e.g. images without width/height aspect ratios or dynamic ads injecting late). Good score is <= 0.1. LCP measures perceived load speed (<= 2.5s). INP replaced FID to measure page interactivity responsiveness (<= 200ms).',
    companyTags: ['Google', 'Vercel', 'Meta']
  }
];

export const EXPANDED_FLASHCARDS: Flashcard[] = [
  // ML Flashcards
  {
    id: 'fc-ml-1',
    subjectId: 'ml',
    topic: 'L1 (Lasso) vs L2 (Ridge) Regularization',
    question: 'What is the core difference between L1 and L2 regularization in terms of weights?',
    answer: '• L1 (Lasso): Adds lambda * sum(|w|). Drives non-essential weights to EXACTLY ZERO, performing automatic feature selection and producing sparse models.\n• L2 (Ridge): Adds lambda * sum(w^2). Shrinks weights smoothly toward zero, preventing any single weight from dominating, but never drives weights strictly to zero.',
    mnemonic: 'L1 = Sparse / Zeros | L2 = Smooth Shrinkage'
  },
  {
    id: 'fc-ml-2',
    subjectId: 'ml',
    topic: 'Transformer Self-Attention Formula',
    question: 'What is the Scaled Dot-Product Attention formula and what does each term mean?',
    answer: 'Attention(Q, K, V) = Softmax( (Q * K^T) / sqrt(d_k) ) * V\n• Q (Query): What the current token is seeking.\n• K (Key): What all tokens offer.\n• V (Value): The actual information content.\n• sqrt(d_k): Scale factor to prevent vanishing gradients in softmax.',
    code: '// Scaled Dot-Product Attention:\nscores = (Q @ K.T) / np.sqrt(d_k)\nweights = softmax(scores, axis=-1)\noutput = weights @ V'
  },
  {
    id: 'fc-ml-3',
    subjectId: 'ml',
    topic: 'Precision vs Recall Tradeoff',
    question: 'When should an ML Engineer prioritize Recall over Precision?',
    answer: 'Prioritize Recall (TP / (TP + FN)) when the cost of a FALSE NEGATIVE is catastrophic (e.g., Cancer detection, fraud alerts, earthquake warnings). Prioritize Precision (TP / (TP + FP)) when the cost of a FALSE POSITIVE is annoying/costly (e.g., spam filter deleting critical emails).',
    mnemonic: 'Recall = Catch every bad case (Minimize FN).'
  },
  {
    id: 'fc-ml-4',
    subjectId: 'ml',
    topic: 'Bias vs Variance Tradeoff',
    question: 'How do High Bias vs High Variance manifest on Training and Validation errors?',
    answer: '• High Bias (Underfitting): High training error AND high validation error. Model is too simple to capture data patterns. Fix: Add features, increase model complexity, reduce regularization.\n• High Variance (Overfitting): Low training error but high validation error. Model memorized noise. Fix: Add training data, add L1/L2 regularization, dropout, prune trees.',
    mnemonic: 'High Bias = Underfit (Lazy) | High Variance = Overfit (Memorizer)'
  },
  {
    id: 'fc-ml-5',
    subjectId: 'ml',
    topic: 'RAG vs Fine-Tuning',
    question: 'When should you choose RAG over Fine-Tuning for enterprise LLM systems?',
    answer: '• Use RAG when data changes frequently, needs strict citations/auditability, or requires access-control filtering. Cheap to update via vector database.\n• Use Fine-Tuning when teaching the model a specific style, specialized vocabulary, domain syntax (e.g., code dialect), or removing few-shot latency.',
    mnemonic: 'RAG for Knowledge Access | Fine-Tuning for Behavior & Style'
  },

  // Web Development Flashcards
  {
    id: 'fc-web-1',
    subjectId: 'webdev',
    topic: 'JavaScript Event Loop Queues',
    question: 'In what order does the JS Event Loop execute tasks?',
    answer: '1. Synchronous Call Stack execution to completion.\n2. ALL Microtasks are drained completely (Promise callbacks, queueMicrotask, MutationObserver).\n3. Render / Paint cycle (requestAnimationFrame).\n4. ONE Macrotask is dequeued and executed (setTimeout, setInterval, setImmediate, I/O).\n5. Repeat.',
    mnemonic: 'Stack -> All Microtasks -> Paint -> One Macrotask'
  },
  {
    id: 'fc-web-2',
    subjectId: 'webdev',
    topic: 'React useEffect vs useLayoutEffect',
    question: 'What is the difference in execution timing between useEffect and useLayoutEffect?',
    answer: '• useLayoutEffect: Runs synchronously AFTER DOM mutations but BEFORE the browser paints screen pixels. Blocks painting; ideal for measuring DOM nodes or preventing visual flickers.\n• useEffect: Runs asynchronously AFTER the browser has painted the screen. Does not block UI updates; use for 95% of side effects (data fetching, subscriptions).',
    mnemonic: 'useLayoutEffect = Before Paint (Synchronous) | useEffect = After Paint (Async)'
  },
  {
    id: 'fc-web-3',
    subjectId: 'webdev',
    topic: 'CORS Preflight (OPTIONS request)',
    question: 'What triggers a CORS Preflight OPTIONS request in the browser?',
    answer: 'A preflight OPTIONS request is automatically sent if the request is NOT a "Simple Request". It triggers if:\n1. HTTP Method is PUT, DELETE, PATCH, or CONNECT.\n2. Custom headers are included (e.g., Authorization, Content-Type: application/json).\n3. Content-Type is anything other than text/plain, multipart/form-data, or application/x-www-form-urlencoded.',
    mnemonic: 'Custom Headers or PUT/DELETE = Preflight OPTIONS'
  },
  {
    id: 'fc-web-4',
    subjectId: 'webdev',
    topic: 'React 19 Actions & Server Components',
    question: 'What is the architectural benefit of React Server Components (RSC)?',
    answer: 'RSCs render exclusively on the server and stream serialized UI to the client with ZERO JavaScript bundle footprint. They allow direct backend database queries inside component functions without client-side waterfalls or exposing credentials.',
    code: '// React Server Component:\nasync function ProductList() {\n  const products = await db.products.findMany(); // direct DB call\n  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;\n}'
  },
  {
    id: 'fc-web-5',
    subjectId: 'webdev',
    topic: 'Core Web Vitals Thresholds',
    question: 'What are the 3 Core Web Vitals metrics and their "Good" target thresholds?',
    answer: '• LCP (Largest Contentful Paint): <= 2.5s (Loading performance)\n• INP (Interaction to Next Paint): <= 200ms (Page responsiveness to clicks/taps)\n• CLS (Cumulative Layout Shift): <= 0.1 (Visual stability during loading).',
    mnemonic: 'LCP <= 2.5s | INP <= 200ms | CLS <= 0.1'
  },
  // DBMS Flashcards
  {
    id: 'fc-db-1',
    subjectId: 'dbms',
    topic: 'Indexing: B+ Tree vs B-Tree',
    question: 'Why are B+ Trees preferred over B-Trees for database index files?',
    answer: '1. In B+ Trees, internal nodes only store keys (no records/pointers), allowing much higher fan-out and shallower tree depth.\n2. All leaf nodes are sequentially linked in a doubly linked list, enabling blazing fast range scans.',
    mnemonic: 'B+ Tree = Big Fan-out + Linked Leaves'
  },
  {
    id: 'fc-db-2',
    subjectId: 'dbms',
    topic: 'Isolation Levels (ANSI SQL)',
    question: 'What are the 4 standard SQL Transaction Isolation Levels from least to most strict?',
    answer: '1. Read Uncommitted (Dirty Read possible)\n2. Read Committed (Prevents Dirty Reads)\n3. Repeatable Read (Prevents Non-Repeatable Reads)\n4. Serializable (Prevents Phantom Reads via Range Locks / SSI).',
    mnemonic: 'U-C-R-S: Uncommitted, Committed, Repeatable, Serializable'
  },
  {
    id: 'fc-db-3',
    subjectId: 'dbms',
    topic: 'Normalization Forms',
    question: 'Quickly distinguish 1NF, 2NF, 3NF, and BCNF.',
    answer: '• 1NF: Atomic values only (no repeating groups/arrays).\n• 2NF: 1NF + No Partial Dependency (every non-prime attribute fully depends on entire candidate key).\n• 3NF: 2NF + No Transitive Dependency (X -> Y requires X is Superkey or Y is Prime).\n• BCNF: For every functional dependency X -> Y, X must be a Superkey.',
    mnemonic: 'The key, the whole key (2NF), and nothing but the key (3NF), so help me Codd (BCNF).'
  },
  {
    id: 'fc-db-4',
    subjectId: 'dbms',
    topic: 'CAP Theorem in Distributed DBs',
    question: 'What does the CAP theorem state regarding network partitions?',
    answer: 'In any asynchronous distributed data store, across a network partition (P), you can guarantee Consistency (C) OR Availability (A), but never both simultaneously.',
    mnemonic: 'Pick P first (networks fail), then choose either C (consistent reads) or A (always available).'
  },

  // OS Flashcards
  {
    id: 'fc-os-1',
    subjectId: 'os',
    topic: 'Process vs Thread Memory',
    question: 'What memory segments are shared vs private between threads of the same process?',
    answer: '• SHARED: Code segment, Data segment, Heap memory, Open file descriptors, Environment variables.\n• PRIVATE per thread: Program Counter (PC), CPU Register state, Call Stack (local variables, frame pointer).',
    mnemonic: 'Heap is Shared, Stack is Private.'
  },
  {
    id: 'fc-os-2',
    subjectId: 'os',
    topic: 'Virtual Memory Paging & TLB',
    question: 'What is a Translation Lookaside Buffer (TLB) and what happens on a TLB Miss?',
    answer: 'TLB is a fast hardware associative cache storing recent Virtual-to-Physical page number mappings. On TLB Hit: O(1) translation. On TLB Miss: Page table walk in RAM (or hardware MMU walk), retrieving physical frame number and updating TLB.',
    code: '// Virtual Address: [Virtual Page Number (VPN) | Offset]\n// Physical Address: [Physical Frame Number (PFN) | Offset]'
  },
  {
    id: 'fc-os-3',
    subjectId: 'os',
    topic: 'Deadlock: Banker\'s Algorithm',
    question: 'What safety condition must hold for Banker\'s Algorithm to grant a resource request?',
    answer: 'A state is SAFE if there exists a safe sequence <P1, P2, ... Pn> such that for each Pi, the remaining resources it needs can be satisfied by current Available resources + resources held by all preceding processes.',
    mnemonic: 'Safe State = Guaranteed exit sequence without deadlock.'
  },

  // CN Flashcards
  {
    id: 'fc-cn-1',
    subjectId: 'cn',
    topic: 'TCP 3-Way Handshake',
    question: 'What are the 3 packets in the TCP connection handshake?',
    answer: '1. Client -> Server: SYN (seq = x)\n2. Server -> Client: SYN-ACK (seq = y, ack = x + 1)\n3. Client -> Server: ACK (seq = x + 1, ack = y + 1)',
    mnemonic: 'SYN, SYN-ACK, ACK: Synchronize sequence numbers and confirm acknowledgment.'
  },
  {
    id: 'fc-cn-2',
    subjectId: 'cn',
    topic: 'HTTP/1.1 vs HTTP/2 vs HTTP/3',
    question: 'What major protocol advances occurred across HTTP generations?',
    answer: '• HTTP/1.1: Persistent TCP connections, chunked transfer, but HoL blocking.\n• HTTP/2: Binary framing, multiplexed streams on 1 TCP socket, HPACK header compression.\n• HTTP/3: Operates on UDP via QUIC, zero-RTT connection resumption, eliminates TCP HoL blocking.',
    mnemonic: '1.1 = Keep-Alive | 2 = Multiplexing | 3 = QUIC/UDP'
  },
  {
    id: 'fc-cn-3',
    subjectId: 'cn',
    topic: 'DNS Lookup Hierarchy',
    question: 'What is the step-by-step resolution order for resolving a domain name like "api.google.com"?',
    answer: '1. Browser cache -> OS hosts/DNS cache -> Local Resolver (ISP / 8.8.8.8).\n2. Root Nameserver (.) -> TLD Nameserver (.com) -> Authoritative Nameserver (google.com) returning IP address.',
    mnemonic: 'Local -> Root (.) -> TLD (.com) -> Authoritative (domain)'
  },

  // OOPs Flashcards
  {
    id: 'fc-oops-1',
    subjectId: 'oops',
    topic: 'SOLID Principles Summary',
    question: 'State the 5 SOLID software engineering principles.',
    answer: '• S - Single Responsibility (one reason to change)\n• O - Open/Closed (open for extension, closed for modification)\n• L - Liskov Substitution (subclasses replace parent without breakage)\n• I - Interface Segregation (small, focused interfaces)\n• D - Dependency Inversion (depend on abstractions, not concrete implementations).',
    mnemonic: 'S-O-L-I-D'
  },
  {
    id: 'fc-oops-2',
    subjectId: 'oops',
    topic: 'Design Patterns: Factory vs Builder',
    question: 'When should you use the Builder pattern instead of Factory pattern?',
    answer: '• Factory: Creates an object in a single method call when the object family or subclass is determined at runtime.\n• Builder: Constructs complex objects step-by-step with many optional parameters (avoiding telescoping constructors).',
    code: '// Builder: User.builder().name("Alice").role("Admin").build()'
  },

  // DSA Flashcards
  {
    id: 'fc-dsa-1',
    subjectId: 'dsa',
    topic: 'Floyd\'s Cycle Finding (Tortoise and Hare)',
    question: 'Why do slow (1 step) and fast (2 steps) pointers always meet if a linked list contains a cycle?',
    answer: 'Once both enter the cycle of length C, the relative distance between them decreases by exactly 1 node every step: (distance - 1) % C. Therefore, they must meet within at most C steps.',
    mnemonic: 'Fast closes the gap by 1 node per iteration.'
  },
  {
    id: 'fc-dsa-2',
    subjectId: 'dsa',
    topic: 'Kadane\'s Algorithm (Max Subarray)',
    question: 'What is the state transition for Kadane\'s algorithm?',
    answer: 'current_max = max(nums[i], current_max + nums[i])\nglobal_max = max(global_max, current_max)\nRuns in O(N) time and O(1) space.',
    code: 'for (let x of nums) {\n  cur = Math.max(x, cur + x);\n  maxSum = Math.max(maxSum, cur);\n}'
  },
  {
    id: 'fc-dsa-3',
    subjectId: 'dsa',
    topic: 'Monotonic Stack Pattern',
    question: 'When should you reach for a Monotonic Stack?',
    answer: 'Use a Monotonic Stack whenever you need to find the Next Greater Element, Next Smaller Element, or compute histogram areas (e.g. Daily Temperatures, Trapping Rain Water, Largest Rectangle in Histogram) in O(N) time.',
    mnemonic: 'Maintain sorted order inside stack; pop when monotonicity is broken.'
  }
];
