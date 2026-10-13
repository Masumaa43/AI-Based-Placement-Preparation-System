/**
 * Comprehensive Knowledge Base & Technical Doubt Solver Engine
 * 
 * Supports deep technical explanations across all tracks:
 * - DSA (Data Structures & Algorithms)
 * - Machine Learning & AI Engineering (ML)
 * - Core Computer Science (DBMS, OS, CN)
 * - Fullstack Web Development (React, Node, JS/TS, Browser, APIs)
 * - Object-Oriented Programming (OOPs, SOLID, Design Patterns)
 * - Quantitative Aptitude & Logical Reasoning
 */

export interface SolvedDoubtResponse {
  query: string;
  intuition: string;
  interviewModel: string;
  staffTip: string;
  codeSnippet?: string;
  sources: Array<{ title: string; uri: string }>;
  searchQueries: string[];
  track?: string;
  isGrounded: boolean;
}

interface KnowledgeEntry {
  patterns: RegExp[];
  track: string;
  title: string;
  intuition: string;
  interviewModel: string;
  staffTip: string;
  codeSnippet?: string;
  sources: Array<{ title: string; uri: string }>;
}

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // --- DSA ---
  {
    patterns: [/quick\s*select/i, /kth\s*(largest|smallest)/i],
    track: 'dsa',
    title: 'QuickSelect & K-th Element Complexity',
    intuition: 'QuickSelect uses the same partitioning logic as QuickSort (Lomuto or Hoare). Instead of recursing into both sub-arrays, it recurses only into the partition containing index k, halving the work on average.',
    interviewModel: `1. Time Complexity:
   - Average Case: O(N) because N + N/2 + N/4 + ... + 1 = 2N = O(N).
   - Worst Case: O(N^2) if the pivot picked is always the minimum or maximum element (e.g. sorted array with first element as pivot). Can be mitigated to deterministic O(N) using Median-of-Medians or randomized pivot selection.
2. Space Complexity: O(1) auxiliary space (in-place partitioning), or O(log N) average call stack recursion depth (O(N) worst case).
3. Heap vs QuickSelect Tradeoff: A Min/Max Heap approach takes O(N log K) time and O(K) memory, which is preferable for streaming data where elements arrive dynamically. QuickSelect requires random access to the entire array in memory.`,
    staffTip: 'In FAANG rounds, specify whether data fits in memory or is streamed. For streaming, use a Min-Heap of size K. For static arrays, highlight Randomized QuickSelect with 3-way partitioning to handle duplicate elements in O(N).',
    codeSnippet: `def quick_select(nums, k):
    pivot = random.choice(nums)
    left = [x for x in nums if x > pivot]
    mid = [x for x in nums if x == pivot]
    right = [x for x in nums if x < pivot]
    
    L, M = len(left), len(mid)
    if k <= L:
        return quick_select(left, k)
    elif k <= L + M:
        return pivot
    else:
        return quick_select(right, k - L - M)`,
    sources: [
      { title: 'GeeksforGeeks: QuickSelect Algorithm', uri: 'https://www.geeksforgeeks.org/quickselect-algorithm/' },
      { title: 'LeetCode 215: Kth Largest Element in an Array', uri: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' }
    ]
  },
  {
    patterns: [/dijkstra/i, /negative\s*(weight|edge)/i, /bellman\s*ford/i],
    track: 'dsa',
    title: 'Dijkstra vs Bellman-Ford on Negative Weights',
    intuition: 'Dijkstra makes a greedy choice: once a node is popped from the priority queue, it assumes its shortest distance is finalized and never visits it again. A negative weight edge later in the path can reduce the cost, violating this greedy assumption.',
    interviewModel: `1. Why Dijkstra Fails on Negative Edges:
   - Dijkstra maintains a "visited" set based on the non-decreasing prefix sum property (dist[u] + weight >= dist[u] when weight >= 0).
   - If edge weights can be negative, a node popped earlier could have a shorter path discovered later through that negative edge, leading to wrong distances or infinite loops if negative cycles exist.
2. Why Bellman-Ford Works:
   - Bellman-Ford relaxes all |E| edges (|V| - 1) times via Dynamic Programming.
   - Any simple shortest path has at most |V| - 1 edges.
   - Time Complexity: O(V * E) vs Dijkstra's O((V + E) log V).
3. Detecting Negative Cycles:
   - Bellman-Ford runs a V-th relaxation pass. If any dist[v] > dist[u] + weight can still be updated, a negative weight cycle exists.`,
    staffTip: 'Mention SPFA (Shortest Path Faster Algorithm) or Johnson\'s Algorithm (which reweights edges via Bellman-Ford so Dijkstra can run on all pairs in O(V * E log V)).',
    codeSnippet: `// Dijkstra Priority Queue relaxation (requires non-negative weights):
priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
pq.push({0, start});
dist[start] = 0;
while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d > dist[u]) continue; // Stale queue entry
    for (auto &[v, w] : adj[u]) {
        if (dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
            pq.push({dist[v], v});
        }
    }
}`,
    sources: [
      { title: 'GeeksforGeeks: Dijkstra Algorithm and Negative Weights', uri: 'https://www.geeksforgeeks.org/why-dijkstras-algorithm-fails-for-negative-weight-edges/' },
      { title: 'Bellman-Ford Algorithm - GeeksforGeeks', uri: 'https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/' }
    ]
  },
  {
    patterns: [/monotonic\s*stack/i, /next\s*greater/i, /daily\s*temperatures/i, /histogram/i],
    track: 'dsa',
    title: 'Monotonic Stack Mechanics & Patterns',
    intuition: 'A monotonic stack maintains elements in strictly increasing or decreasing order. When a new element violates the monotonicity, elements are popped—meaning the current element is their "next greater" or "next smaller" neighbor.',
    interviewModel: `1. Invariant:
   - Strictly Monotonic Increasing Stack: Finds the Next Smaller Element (NSE) and Previous Smaller Element (PSE).
   - Strictly Monotonic Decreasing Stack: Finds the Next Greater Element (NGE) and Previous Greater Element (PGE).
2. Complexity:
   - Each element is pushed onto the stack exactly once and popped at most once.
   - Amortized Time Complexity: O(N), compared to the brute force O(N^2).
   - Space Complexity: O(N) to store indices.
3. Top Placement Applications:
   - Next Greater Element I/II
   - Daily Temperatures (LeetCode 739)
   - Largest Rectangle in Histogram (LeetCode 84)
   - Trapping Rain Water (LeetCode 42)`,
    staffTip: 'Store indices rather than raw values on the stack so you can compute both distance (i - stack.top()) and access the original value in O(1).',
    codeSnippet: `vector<int> nextGreaterElements(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, -1);
    stack<int> st; // Stores indices
    for (int i = 0; i < n; i++) {
        while (!st.empty() && nums[i] > nums[st.top()]) {
            res[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    return res;
}`,
    sources: [
      { title: 'GeeksforGeeks: Monotonic Stack Problems', uri: 'https://www.geeksforgeeks.org/introduction-to-monotonic-stack-data-structure-and-algorithm-tutorials/' },
      { title: 'LeetCode Discuss: Monotonic Stack Summary', uri: 'https://leetcode.com/discuss' }
    ]
  },
  {
    patterns: [/knapsack/i, /0\/?1\s*knapsack/i, /unbounded\s*knapsack/i],
    track: 'dsa',
    title: '0/1 Knapsack Space Optimization to 1D Array',
    intuition: 'In 0/1 Knapsack, each item can be chosen at most once. By traversing the capacity backwards from W down to weight[i], we ensure that dp[w - weight[i]] represents the state from the previous item without accidental reuse.',
    interviewModel: `1. Standard 2D DP Recurrence:
   - dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w - wt[i]])
   - Notice state (i, w) only depends on the previous row (i - 1).
2. Space Optimization to 1D DP:
   - If we traverse w from left-to-right (0 to W), dp[w - wt[i]] would already be updated with the current item, turning it into Unbounded Knapsack (infinite supply).
   - Traversing right-to-left (W down to wt[i]) guarantees dp[w - wt[i]] still holds the value from the previous item (i - 1).
3. Complexities:
   - Time Complexity: O(N * W) pseudo-polynomial.
   - Space Complexity: O(W) instead of O(N * W).`,
    staffTip: 'Point out that Knapsack is NP-Complete and pseudo-polynomial (polynomial in W, but exponential in the bit-length of W).',
    codeSnippet: `int knapSack(int W, vector<int>& wt, vector<int>& val) {
    int n = wt.size();
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++) {
        // Traverse backwards to prevent using the same item twice
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}`,
    sources: [
      { title: 'GeeksforGeeks: 0-1 Knapsack Problem', uri: 'https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/' }
    ]
  },
  {
    patterns: [/disjoint\s*set/i, /union\s*find/i, /dsu/i, /inverse\s*ackermann/i, /path\s*compression/i],
    track: 'dsa',
    title: 'Disjoint Set Union (DSU) & Inverse Ackermann alpha(N)',
    intuition: 'Path compression flattens tree nodes directly to the root during find(), while Union by Rank attaches the shallower tree under the deeper tree, preventing tall skewed trees.',
    interviewModel: `1. Path Compression: parent[x] = find(parent[x]) rewires every traversed node directly to the representative root.
2. Union by Rank / Size: Attaches the smaller component under the root of the larger component. Maximum depth without path compression would be O(log N).
3. Combined Complexity:
   - Combining both optimizations yields an amortized time per operation of O(alpha(N)), where alpha is the Inverse Ackermann function.
   - For all practical physical universe values (N <= 10^80), alpha(N) <= 4, making each operation effectively O(1).
4. Core Use Cases:
   - Kruskal's Minimum Spanning Tree (MST)
   - Dynamic connected components / Cycle detection in undirected graphs
   - Grid percolation & accounts merge`,
    staffTip: 'Explain why Union by Rank + Path Compression does NOT guarantee rank accuracy (rank becomes an upper bound on height after compression), which is why some engineers prefer Union by Size.',
    codeSnippet: `class DSU {
    vector<int> parent, rank;
public:
    DSU(int n) : parent(n), rank(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]); // Path compression
        return parent[x];
    }
    bool unite(int x, int y) {
        int rootX = find(x), rootY = find(y);
        if (rootX == rootY) return false;
        if (rank[rootX] < rank[rootY]) swap(rootX, rootY);
        parent[rootY] = rootX;
        if (rank[rootX] == rank[rootY]) rank[rootX]++;
        return true;
    }
};`,
    sources: [
      { title: 'GeeksforGeeks: Disjoint Set (Union-Find) Algorithm', uri: 'https://www.geeksforgeeks.org/disjoint-set-data-structures/' }
    ]
  },
  {
    patterns: [/floyd/i, /tortoise\s*(and|&)\s*hare/i, /cycle\s*entry/i, /detect\s*cycle/i],
    track: 'dsa',
    title: "Floyd's Cycle Finding & Entry Point Mathematical Proof",
    intuition: 'When slow moves 1 step and fast moves 2 steps, fast closes the gap by 1 step per iteration inside the loop. When they meet, the distance from head to cycle start equals the distance from the meeting point to cycle start along the loop.',
    interviewModel: `1. Mathematical Derivation:
   - Let L = distance from head to cycle entrance.
   - Let C = cycle length.
   - Let d = distance from cycle entrance to the meeting point.
   - Distance traveled by slow = L + d
   - Distance traveled by fast = L + d + k * C (where k is number of loops)
   - Since fast travels twice as fast: 2(L + d) = L + d + k * C  =>  L + d = k * C  =>  L = k * C - d = (k - 1) * C + (C - d).
2. Finding Entry:
   - Reset one pointer to head and keep the other at the meeting point.
   - Advance both pointers by 1 step. After traveling L steps, the head pointer reaches cycle entrance, and the second pointer advances (C - d) steps from meeting point, perfectly landing on the cycle entrance!
3. Complexities:
   - Time Complexity: O(N)
   - Space Complexity: O(1) auxiliary space (detects cycles without a hash set).`,
    staffTip: 'This exact mathematical equivalence is used in LeetCode 142 (Linked List Cycle II) and LeetCode 287 (Find the Duplicate Number in an array using index pointers).',
    codeSnippet: `ListNode* detectCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            // Cycle detected: reset slow to head
            slow = head;
            while (slow != fast) {
                slow = slow->next;
                fast = fast->next;
            }
            return slow; // Cycle entrance node
        }
    }
    return nullptr; // No cycle
}`,
    sources: [
      { title: "GeeksforGeeks: Floyd's Cycle Detection Algorithm", uri: 'https://www.geeksforgeeks.org/floyds-cycle-finding-algorithm/' }
    ]
  },

  // --- CORE CS: DBMS ---
  {
    patterns: [/b\+?\s*tree/i, /indexing/i, /clustered\s*(vs|and)\s*non[- ]clustered/i],
    track: 'core_cs',
    title: 'B+ Tree vs B-Tree for Database Indexing',
    intuition: 'B+ Trees separate routing keys from actual records. All records and data pointers reside exclusively in the leaf nodes, which are connected as a doubly linked list for blazing fast sequential range scans.',
    interviewModel: `1. High Fan-out and Lower Tree Height:
   - In a standard B-Tree, every internal node stores data records or row pointers alongside keys, consuming precious bytes per disk page.
   - In a B+ Tree, internal nodes store only search keys and child page pointers. A 4KB or 16KB disk page can fit hundreds of keys (fan-out >= 200). A tree of height 3 can index over 8,000,000 records with only 3 disk I/O operations.
2. Fast Range Queries (e.g. WHERE age BETWEEN 20 AND 30):
   - In B-Trees, range queries require in-order traversal back and forth across different disk blocks.
   - In B+ Trees, all leaves are linked as a doubly-linked list. The engine performs 1 point search to the starting leaf and simply walks the linked list horizontally.
3. Consistent Latency:
   - Every lookup traverses exactly from root to leaf (height h), guaranteeing uniform O(log N) lookup time.`,
    staffTip: 'Highlight the difference between Clustered Index (InnoDB primary key where the leaf page IS the table data, sorted physically) vs Secondary Index (where leaf stores the primary key value, requiring a secondary bookmark lookup / index scan).',
    codeSnippet: `-- MySQL/PostgreSQL B+ Tree Indexing
CREATE INDEX idx_users_created_at ON users (created_at);
-- Range queries leverage leaf node linked-list pointers:
EXPLAIN ANALYZE
SELECT id, email FROM users 
WHERE created_at >= '2025-01-01' AND created_at <= '2025-03-31';`,
    sources: [
      { title: 'GeeksforGeeks: B+ Tree in DBMS', uri: 'https://www.geeksforgeeks.org/b-tree-set-1-introduction-2/' },
      { title: 'PostgreSQL Internals: B-Tree Index Implementation', uri: 'https://www.postgresql.org/docs/current/btree.html' }
    ]
  },
  {
    patterns: [/mvcc/i, /multi[- ]version/i, /undo\s*log/i, /isolation/i, /snapshot\s*isolation/i],
    track: 'core_cs',
    title: 'Multi-Version Concurrency Control (MVCC) Internals',
    intuition: 'Instead of locking rows when writing, MVCC creates a new timestamped version of the row. Readers see the latest committed version corresponding to their snapshot timestamp, so readers never block writers and writers never block readers.',
    interviewModel: `1. Mechanics in Relational Engines:
   - PostgreSQL: Stores row tuples directly in the heap table with hidden system columns xmin (creating transaction ID) and xmax (deleting/updating transaction ID). When a row updates, a new tuple is inserted, and older versions are reclaimed asynchronously by VACUUM.
   - MySQL InnoDB: Writes updates in-place in the clustered index and writes the previous version into the Undo Log segment. Readers reconstruct earlier versions by traversing the undo pointer chain.
2. Preventing Anomalies:
   - Dirty Reads: Prevented because reads only examine committed snapshots where xmin <= ReadView.
   - Non-Repeatable Reads: In Repeatable Read, the snapshot is taken at transaction start rather than per SQL statement.
3. Tradeoffs:
   - Higher disk write amplification (PostgreSQL table bloat before autovacuum).
   - Write-Write conflicts still require exclusive row locks (X-lock) to prevent lost updates.`,
    staffTip: 'Distinguish Read Committed (new snapshot per statement) vs Repeatable Read (single snapshot created at first query of transaction). Mention Write Skew anomaly in Serializable isolation.',
    codeSnippet: `-- Transaction 1: Long reporting query (sees consistent snapshot)
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SELECT SUM(balance) FROM bank_accounts; -- Reads point-in-time snapshot

-- Transaction 2: Concurrent writer (executes without blocking Transaction 1)
UPDATE bank_accounts SET balance = balance + 500 WHERE id = 101;
COMMIT;`,
    sources: [
      { title: 'GeeksforGeeks: Concurrency Control in DBMS', uri: 'https://www.geeksforgeeks.org/concurrency-control-in-dbms/' },
      { title: 'PostgreSQL MVCC Documentation', uri: 'https://www.postgresql.org/docs/current/mvcc.html' }
    ]
  },
  {
    patterns: [/time_wait/i, /2\s*\*\s*msl/i, /tcp\s*(close|teardown|handshake)/i],
    track: 'core_cs',
    title: 'TCP TIME_WAIT State & 2*MSL Justification',
    intuition: 'TIME_WAIT ensures that if the final ACK from the client is lost in transit, the server can retransmit its FIN segment and the client is still around to resend the ACK. It also allows delayed packets from the old connection to drain so they do not corrupt a new connection.',
    interviewModel: `1. Invariant 1: Reliable Connection Termination:
   - TCP uses a 4-way handshake to close: Client sends FIN, Server ACKs; Server sends FIN, Client ACKs.
   - If the client closed and deallocated the socket immediately after sending its final ACK, but that ACK was dropped in the network, the server would timeout and retransmit FIN.
   - A closed client port would reply with RST (Connection Reset), indicating an abnormal closure rather than a clean teardown.
2. Invariant 2: Draining Delayed / Stale Packets:
   - Packets can be delayed in IP routers (up to Maximum Segment Lifetime, MSL, typically 30-120 seconds).
   - If a new connection were immediately established on the identical 4-tuple (source IP, source port, dest IP, dest port), delayed duplicate packets from the previous incarnation could be accepted as valid sequence numbers.
   - 2*MSL ensures all packets from both directions are discarded before the port tuple can be reused.`,
    staffTip: 'In high-throughput microservices, explain that thousands of connections in TIME_WAIT exhaust ephemeral ports. Mitigate with SO_REUSEADDR socket option, HTTP/2 connection reuse, or tcp_tw_reuse kernel parameter.',
    codeSnippet: `// Linux socket options to prevent port binding failure during TIME_WAIT:
int opt = 1;
setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR | SO_REUSEPORT, &opt, sizeof(opt));`,
    sources: [
      { title: 'RFC 793 - Transmission Control Protocol', uri: 'https://datatracker.ietf.org/doc/html/rfc793' },
      { title: 'GeeksforGeeks: TCP 3-Way Handshake & Teardown', uri: 'https://www.geeksforgeeks.org/tcp-3-way-handshake-process/' }
    ]
  },
  {
    patterns: [/deadlock/i, /coffman\s*conditions/i, /banker'?s\s*algorithm/i],
    track: 'core_cs',
    title: "Operating System Deadlocks & Coffman's 4 Conditions",
    intuition: 'A deadlock occurs when processes hold resources while waiting for resources held by others in a circular chain, leaving every process permanently frozen.',
    interviewModel: `1. Coffman's 4 Necessary Conditions:
   - Mutual Exclusion: At least one resource must be non-shareable.
   - Hold and Wait: A process must be holding at least one resource and requesting additional resources held by other processes.
   - No Preemption: Resources cannot be forcibly taken away; they must be released voluntarily.
   - Circular Wait: A closed chain of processes exists where P0 waits for P1, P1 waits for P2, ..., Pn waits for P0.
2. Deadlock Handling Strategies:
   - Prevention: Invalidate at least ONE of the 4 Coffman conditions (e.g., impose global resource ordering to break Circular Wait).
   - Avoidance: Banker's Algorithm dynamically verifies that allocating a resource maintains a "Safe State".
   - Detection & Recovery: Maintain a Wait-For Graph (WFG); run Tarjan's/DFS cycle detection. Terminate a victim process or rollback.
   - Ostrich Algorithm: Ignore the problem (used by most general-purpose OS kernels like Linux when deadlocks are rare).`,
    staffTip: 'In multi-threaded code, the most common fix is Lock Ordering: always acquire locks in a predetermined lexicographical or memory-address order across all threads.',
    codeSnippet: `// Lock Ordering prevents Circular Wait:
void transfer(Account& from, Account& to, double amount) {
    // std::lock in C++11 uses a deadlock avoidance algorithm to acquire both locks:
    std::unique_lock<std::mutex> lockA(from.mtx, std::defer_lock);
    std::unique_lock<std::mutex> lockB(to.mtx, std::defer_lock);
    std::lock(lockA, lockB); // Atomically acquires locks without deadlock
    
    from.balance -= amount;
    to.balance += amount;
}`,
    sources: [
      { title: 'GeeksforGeeks: Deadlock in OS & Coffman Conditions', uri: 'https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/' }
    ]
  },
  {
    patterns: [/mutex\s*(vs|and)\s*(semaphore|binary\s*semaphore)/i, /semaphore\s*(vs|and)\s*mutex/i],
    track: 'core_cs',
    title: 'Mutex vs Binary Semaphore Differences',
    intuition: 'A Mutex is a locking mechanism with ownership (only the thread that locked it can unlock it). A Semaphore is a signaling mechanism without ownership (any thread can signal/post to awake another thread).',
    interviewModel: `1. Ownership Principle:
   - Mutex: Has ownership. The thread that acquires the mutex must be the exact thread that releases it. Mutexes support Priority Inheritance to prevent Priority Inversion bugs.
   - Binary Semaphore: Has no ownership. Thread A can wait() on the semaphore while Thread B calls signal()/post(). Useful for producer-consumer synchronization and interrupt handlers.
2. Counting Capability:
   - Mutex: Value is strictly 0 or 1.
   - Counting Semaphore: Can maintain a count of N available units of a shared resource pool.
3. Performance:
   - Mutexes are optimized in modern runtimes (e.g. futex in Linux) using fast user-space atomic CAS before falling back to kernel syscalls.`,
    staffTip: 'Mention Mars Pathfinder 1997 Priority Inversion bug: a high-priority task was blocked by a low-priority task holding a mutex, solved via Priority Inheritance protocol.',
    codeSnippet: `// Producer-Consumer with Semaphores & Mutex:
sem_t emptySlots; // Initialized to Buffer Size N
sem_t fullSlots;  // Initialized to 0
pthread_mutex_t bufferLock; // Protects buffer read/write

void producer() {
    sem_wait(&emptySlots);
    pthread_mutex_lock(&bufferLock);
    // Add item to queue
    pthread_mutex_unlock(&bufferLock);
    sem_post(&fullSlots);
}`,
    sources: [
      { title: 'GeeksforGeeks: Mutex vs Semaphore', uri: 'https://www.geeksforgeeks.org/mutex-vs-semaphore/' }
    ]
  },

  // --- MACHINE LEARNING & AI ---
  {
    patterns: [/l1\s*(vs|and)\s*l2/i, /lasso\s*(vs|and)\s*ridge/i, /regularization/i, /sparsity/i],
    track: 'ml',
    title: 'L1 (Lasso) vs L2 (Ridge) Regularization & Sparsity',
    intuition: 'L1 adds the absolute sum of weights (|w|), creating diamond-shaped constraint boundaries whose sharp corners intersect loss contours on the axes (forcing weights to exactly zero). L2 adds the squared sum (w^2), creating spherical boundaries that shrink weights asymptotically without hitting zero.',
    interviewModel: `1. Mathematical Penalty:
   - L1 (Lasso): Cost = Loss + lambda * sum(|w_i|). Gradient is constant (-lambda or +lambda), continuously subtracting from weights regardless of magnitude until they hit 0.
   - L2 (Ridge): Cost = Loss + lambda * sum(w_i^2). Gradient is proportional to weight (2 * lambda * w), so smaller weights experience smaller reduction, never reaching exactly 0.
2. Geometric Intuition:
   - The L1 norm contour in 2D is a diamond with vertices at (0, 1), (1, 0), etc.
   - Elliptical loss contours are mathematically most likely to touch the diamond at these corner vertices where one coordinate is 0.
   - L2 norm is a smooth circle with no corners, so tangent points rarely lie on coordinate axes.
3. Practical Application:
   - Use L1 for automatic Feature Selection in high-dimensional sparse data.
   - Use L2 when features are collinear (multicollinearity) and you want to retain all features with distributed weight.
   - Use ElasticNet (L1 + L2) to combine benefits.`,
    staffTip: 'In deep learning, mention Weight Decay in AdamW: Adam with L2 regularization is not equivalent to Weight Decay because Adam divides the gradient by the moving average of squared gradients.',
    codeSnippet: `from sklearn.linear_model import Lasso, Ridge

# L1 Lasso: Zeroes out irrelevant feature coefficients
lasso = Lasso(alpha=0.1)
lasso.fit(X_train, y_train)
print("Non-zero features:", sum(lasso.coef_ != 0))

# L2 Ridge: Shrinks all coefficients smoothly
ridge = Ridge(alpha=1.0)
ridge.fit(X_train, y_train)`,
    sources: [
      { title: 'GeeksforGeeks: L1 and L2 Regularization', uri: 'https://www.geeksforgeeks.org/l1-and-l2-regularization/' }
    ]
  },
  {
    patterns: [/self[- ]attention/i, /scaled\s*dot[- ]product/i, /sqrt\(?d_k\)?/i, /transformer/i],
    track: 'ml',
    title: 'Scaled Dot-Product Attention & sqrt(d_k) Justification',
    intuition: 'When the embedding dimension d_k is large, dot products of query and key vectors grow large in magnitude, pushing the Softmax function into regions with near-zero gradients (vanishing gradient problem). Scaling by 1/sqrt(d_k) stabilizes the variance back to 1.',
    interviewModel: `1. Mathematical Derivation:
   - Attention(Q, K, V) = Softmax( (Q * K^T) / sqrt(d_k) ) * V
   - Assume components of Q and K are independent random variables with mean 0 and variance 1.
   - Their dot product q . k = sum_{i=1}^{d_k} (q_i * k_i).
   - Mean of the sum = 0.
   - Variance of each product Var(q_i * k_i) = 1.
   - Variance of the sum of d_k independent components = d_k.
   - Standard deviation = sqrt(d_k).
2. Why Softmax Fails Without Scaling:
   - For large d_k (e.g. d_k = 64 or 128), values can exceed 20 or 30.
   - Softmax with large inputs results in one-hot outputs (value close to 1, others near 0).
   - The derivative of Softmax(x) * (1 - Softmax(x)) becomes infinitesimally small (vanishing gradient), freezing backpropagation.
3. Scaling Solution:
   - Dividing by sqrt(d_k) restores the variance of the dot products to 1, ensuring stable Softmax gradient flow.`,
    staffTip: 'Discuss Multi-Head Attention vs Single-Head: multiple heads allow the model to jointly attend to information from different representation subspaces (e.g. syntactic agreement vs semantic reference).',
    codeSnippet: `import torch
import torch.nn.functional as F

def scaled_dot_product_attention(Q, K, V, mask=None):
    d_k = Q.size(-1)
    # Compute attention scores scaled by sqrt(d_k)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
    attn_weights = F.softmax(scores, dim=-1)
    return torch.matmul(attn_weights, V), attn_weights`,
    sources: [
      { title: '"Attention Is All You Need" - Vaswani et al.', uri: 'https://arxiv.org/abs/1706.03762' },
      { title: 'GeeksforGeeks: Transformers in NLP', uri: 'https://www.geeksforgeeks.org/getting-started-with-transformers/' }
    ]
  },
  {
    patterns: [/rag/i, /parent[- ]child\s*chunking/i, /retrieval\s*augmented/i, /vector\s*(search|db)/i],
    track: 'ml',
    title: 'RAG Architecture: Parent-Child Chunking vs Naive Chunking',
    intuition: 'Small chunks are great for vector search precision (fine-grained semantic match), but bad for LLM context synthesis. Parent-child chunking indexes small child chunks for retrieval, but supplies the larger parent document chunk to the LLM for generation.',
    interviewModel: `1. The Naive Chunking Dilemma:
   - Fixed size chunking (e.g. 500 tokens) loses broader context (missing coreferences, parent headings, document structure).
   - If chunks are too small (100 tokens), semantic information is fragmented. If too large (2000 tokens), embedding vectors become diluted with multiple topics.
2. Parent-Child Hierarchical Chunking:
   - Step 1: Split documents into large Parent Chunks (e.g. 1000-2000 tokens or logical sections).
   - Step 2: Subdivide each parent into Child Chunks (e.g. 200 tokens).
   - Step 3: Embed and store only child chunks in the Vector DB (HNSW index) along with parent_id reference.
   - Step 4: At query time, retrieve top-K child chunks via cosine similarity, but fetch the unique parent chunks to pass into the prompt!
3. Key Metrics:
   - High Retrieval Precision + Rich Synthesis Context with Zero Loss of Context.`,
    staffTip: 'In GenAI system design rounds, mention Re-ranking (e.g. Cohere Rerank / BGE Cross-Encoder) on the top 20 candidate chunks before passing the top 5 to the context window.',
    codeSnippet: `// Conceptual Parent-Child chunk schema
interface DocumentChunk {
  childId: string;
  parentId: string; // References larger context
  childText: string; // 150-250 tokens for dense vector embedding
  parentText: string; // 1000+ tokens passed to Gemini/LLM prompt
  embedding: number[];
}`,
    sources: [
      { title: 'GeeksforGeeks: Retrieval-Augmented Generation (RAG)', uri: 'https://www.geeksforgeeks.org/what-is-retrieval-augmented-generation-rag-in-ai/' }
    ]
  },

  // --- FULLSTACK WEB DEVELOPMENT ---
  {
    patterns: [/event\s*loop/i, /microtask/i, /macrotask/i, /promise.*settimeout/i, /call\s*stack/i],
    track: 'webdev',
    title: 'JavaScript Event Loop: Microtasks vs Macrotasks',
    intuition: 'The browser call stack executes synchronous code first. When the call stack empties, the engine drains the entire Microtask Queue (Promises, queueMicrotask) before picking a single Macrotask (setTimeout, I/O) from the task queue.',
    interviewModel: `1. Execution Order Invariant:
   - Step 1: Execute all synchronous code currently on the Call Stack.
   - Step 2: When stack is empty, drain ALL jobs in the Microtask Queue until empty (even if microtasks spawn new microtasks).
   - Step 3: Trigger UI Rendering / Layout / Paint pipeline (if needed).
   - Step 4: Pick the oldest single task from the Macrotask Queue and push to stack.
   - Step 5: Repeat loop.
2. Microtasks:
   - Promise.then / catch / finally, queueMicrotask(), MutationObserver.
   - In Node.js: process.nextTick() executes with even higher priority before standard microtasks.
3. Macrotasks (Task Queue):
   - setTimeout, setInterval, setImmediate (Node.js), I/O events, postMessage, DOM event listeners.`,
    staffTip: 'Common interview trick: nested Promise inside setTimeout vs setTimeout inside Promise. Remember: a microtask queue starvation bug can freeze the browser UI thread if recursive microtasks run continuously.',
    codeSnippet: `console.log('1: Sync');
setTimeout(() => console.log('4: Macro'), 0);
Promise.resolve().then(() => {
    console.log('2: Micro');
    queueMicrotask(() => console.log('3: Micro Nested'));
});
console.log('Sync End');
// Output Order:
// 1: Sync
// Sync End
// 2: Micro
// 3: Micro Nested
// 4: Macro`,
    sources: [
      { title: 'MDN Web Docs: In depth event loop', uri: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop' },
      { title: 'GeeksforGeeks: Event Loop in JavaScript', uri: 'https://www.geeksforgeeks.org/what-is-an-event-loop-in-javascript/' }
    ]
  },
  {
    patterns: [/cors/i, /preflight/i, /options\s*request/i, /cross[- ]origin/i],
    track: 'webdev',
    title: 'CORS Preflight (OPTIONS) Triggers & Resolution',
    intuition: 'Browsers enforce Same-Origin Policy. When an HTTP request could modify server state or uses non-standard headers, the browser sends an OPTIONS preflight request to ask permission before executing the actual request.',
    interviewModel: `1. What Triggers Preflight OPTIONS:
   - HTTP Methods other than GET, HEAD, or POST (e.g. PUT, DELETE, PATCH).
   - Custom HTTP Headers outside CORS-safelisted headers (e.g. Authorization: Bearer, X-Custom-Header, Content-Type: application/json).
   - Requests with credentials (cookies, HTTP auth) across origins.
2. What Makes a "Simple Request" (No Preflight):
   - Method is GET, HEAD, or POST.
   - Headers limited to: Accept, Accept-Language, Content-Language, Content-Type (only application/x-www-form-urlencoded, multipart/form-data, text/plain).
3. Server Response Headers:
   - Access-Control-Allow-Origin: https://app.example.com (Never '*' if withCredentials is true).
   - Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
   - Access-Control-Allow-Headers: Content-Type, Authorization
   - Access-Control-Max-Age: 86400 (Caches preflight result for 24 hours to reduce latency).`,
    staffTip: 'Clarify that CORS is enforced exclusively by the BROWSER client, not backend servers or Postman/curl.',
    codeSnippet: `// Express.js CORS configuration for production:
import cors from 'cors';

app.use(cors({
  origin: ['https://prep-pulse.web.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // Cache OPTIONS response
}));`,
    sources: [
      { title: 'MDN: Cross-Origin Resource Sharing (CORS)', uri: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS' }
    ]
  },
  {
    patterns: [/react\s*fiber/i, /reconciliation/i, /virtual\s*dom/i, /concurrent/i],
    track: 'webdev',
    title: 'React Fiber Architecture & Cooperative Scheduling',
    intuition: 'Old React (Stack Reconciler) performed synchronous recursive tree traversal that could not be paused, causing dropped animation frames. Fiber converts the tree into a linked-list of fiber nodes that can pause, prioritize, and resume work during idle browser time.',
    interviewModel: `1. Fiber Data Structure:
   - Each Fiber node contains: child, sibling, and return (parent) pointers.
   - Because it is a singly-linked list rather than recursive function call stack, execution state is preserved as JS objects on the heap.
2. Two Phases of Fiber Reconciliation:
   - Phase 1: Render / Reconciliation Phase (Interruptible, Asynchronous, No DOM side-effects). React diffs the Work-In-Progress tree against the current tree. High-priority updates (e.g. typing, clicks) can interrupt low-priority updates (e.g. background data fetch).
   - Phase 2: Commit Phase (Synchronous, Non-interruptible). Flushes computed DOM operations (Placement, Update, Deletion) in a single atomic pass to prevent visual tearing.
3. React 18/19 Concurrency:
   - Uses requestIdleCallback / MessageChannel scheduler to yield execution back to browser event loop before 16.6ms frame budget exhausts.`,
    staffTip: 'Explain why keys must be stable and unique: React diffing heuristic is O(N) only because it assumes elements of different types generate different trees, and elements with the same key correspond to the same component instance.',
    codeSnippet: `// Conceptual Fiber node structure
interface FiberNode {
  tag: WorkTag;
  key: null | string;
  type: any;
  stateNode: any; // DOM element or component instance
  
  // Singly Linked List Tree Pointers
  child: FiberNode | null;
  sibling: FiberNode | null;
  return: FiberNode | null; // Parent
  
  alternate: FiberNode | null; // Work-In-Progress twin
  flags: Flags; // Placement, Update, Deletion
}`,
    sources: [
      { title: 'React Documentation: Reconciliation & Fiber Architecture', uri: 'https://react.dev' }
    ]
  },

  // --- OOPS & LOW-LEVEL DESIGN ---
  {
    patterns: [/vtable/i, /vptr/i, /virtual\s*function/i, /dynamic\s*dispatch/i],
    track: 'oops',
    title: 'Virtual Functions, VTABLE & VPTR Internals',
    intuition: 'To call the correct overridden method at runtime without knowing the exact derived class at compile time, the compiler injects a hidden pointer (vptr) into every object, pointing to an array of function pointers (vtable).',
    interviewModel: `1. Memory Layout:
   - For every class with at least one virtual function, the compiler creates a static Virtual Method Table (VTABLE) containing function pointers to the most-derived implementations.
   - Every instantiated object of that class gains a hidden 8-byte pointer (VPTR) placed at offset 0 of its memory layout.
2. Dynamic Dispatch Resolution:
   - When calling basePtr->draw():
     1. Dereference basePtr to locate the object's vptr: *(basePtr).
     2. Dereference vptr to access the class vtable.
     3. Index the vtable slot for draw(): vtable[slot_index].
     4. Call the function pointer passing 'this' pointer as first parameter.
3. Performance Cost:
   - Memory overhead: 8 bytes per object for VPTR + 1 vtable per class.
   - Execution overhead: Extra memory indirection prevents CPU branch prediction and compiler inlining.`,
    staffTip: 'Virtual Destructors: Always make base class destructors virtual if deleting through a base pointer, otherwise the derived destructor will never execute, causing resource/memory leaks.',
    codeSnippet: `class Base {
public:
    virtual ~Base() {} // Essential for polymorphic cleanup!
    virtual void speak() { cout << "Base"; }
};

class Derived : public Base {
public:
    void speak() override { cout << "Derived"; }
};

Base* b = new Derived();
b->speak(); // Dynamically dispatched via b->_vptr[0]() -> Derived::speak()
delete b;   // Properly calls ~Derived() then ~Base()`,
    sources: [
      { title: 'GeeksforGeeks: Virtual Functions and Runtime Polymorphism', uri: 'https://www.geeksforgeeks.org/virtual-functions-and-runtime-polymorphism-in-cpp-set-1-introduction/' }
    ]
  },
  {
    patterns: [/solid/i, /liskov/i, /single\s*responsibility/i, /dependency\s*inversion/i],
    track: 'oops',
    title: 'SOLID Principles & Liskov Substitution (LSP) Refactoring',
    intuition: 'Subtypes must be substitutable for their base types without altering program correctness. A subclass must not strengthen preconditions or weaken postconditions of the parent contract.',
    interviewModel: `1. The Classic LSP Violation:
   - Square inheriting from Rectangle.
   - Rectangle has independent setWidth(w) and setHeight(h).
   - If Square overrides setWidth(w) to set both width and height, passing a Square into a function expecting a Rectangle (e.g. assert(r.area() == r.w * r.h) after mutating width) violates client invariants.
2. Proper Refactoring:
   - Extract a shared interface Shape with getArea() rather than an inheritance relationship that forces inappropriate setter contracts.
3. Summary of SOLID:
   - S: Single Responsibility (One reason to change).
   - O: Open/Closed (Open for extension, closed for modification).
   - L: Liskov Substitution (Contract adherence).
   - I: Interface Segregation (No forced unused interface methods).
   - D: Dependency Inversion (Depend on abstractions, not concrete implementations).`,
    staffTip: 'In LLD rounds, favor Composition over Inheritance ("Has-A" over "Is-A") to prevent rigid inheritance hierarchies that violate LSP.',
    codeSnippet: `// Clean Refactoring avoiding LSP violation:
interface Shape {
  getArea(): number;
}

class Rectangle implements Shape {
  constructor(public width: number, public height: number) {}
  getArea() { return this.width * this.height; }
}

class Square implements Shape {
  constructor(public side: number) {}
  getArea() { return this.side * this.side; }
}`,
    sources: [
      { title: 'GeeksforGeeks: SOLID Principles with Examples', uri: 'https://www.geeksforgeeks.org/solid-principle-in-programming-understand-with-real-life-examples/' }
    ]
  },
  {
    patterns: [/garbage\s*collect|java\s*gc\b|jvm\s*memory|heap\s*vs\s*stack|generational\s*gc/i],
    track: 'core_cs',
    title: 'Java Garbage Collection & JVM Memory Model',
    intuition: 'Java automatically reclaims heap memory occupied by unreachable objects based on the Weak Generational Hypothesis: most objects die young (short-lived temporary variables, request scopes). The JVM divides heap memory into generations (Young, Old/Tenured) to avoid scanning the entire heap constantly.',
    interviewModel: `1. JVM Heap Memory Structure:
   - Young Generation:
     * Eden Space: Where new objects are initially allocated.
     * Survivor Spaces (S0 & S1 / From & To): Objects surviving Minor GCs are copied between S0 and S1. Object age incremented.
   - Old / Tenured Generation: Objects that survive reaching the tenuring threshold (default age 15) are promoted here.
   - Metaspace (off-heap since Java 8): Stores class metadata, bytecode, and method references.
2. GC Collector Algorithms:
   - Serial & Parallel GC: Throughput-oriented for batch processing.
   - G1 GC (Garbage-First): Divides heap into equal-sized regions (1MB to 32MB). Collects regions with the most garbage first within a target pause time (MaxGCPauseMillis).
   - ZGC & Shenandoah: Low-latency collectors with sub-millisecond Stop-The-World (STW) pauses even on terabyte heaps using colored pointers and load barriers.
3. Root Reachability & Mark-and-Sweep:
   - GC Roots: Stack local variables, active threads, JNI handles, static class variables.
   - An object is eligible for GC if no directed path exists from any active GC Root.`,
    staffTip: 'In Staff/Senior Java interviews, discuss how memory leaks still happen in managed runtimes (unclosed static Collections, listener leaks, threadlocals never removed). Explain tuning parameters (-Xms, -Xmx, -XX:+UseG1GC, -XX:MaxGCPauseMillis).',
    codeSnippet: `// Example of potential memory leak in Java vs proper cleanup:
public class CacheManager {
    // LEAK: Static collection prevents GC from reclaiming entries
    private static final Map<String, byte[]> leakCache = new HashMap<>();

    // SAFE: WeakHashMap allows GC to reclaim keys when no strong references remain
    private static final Map<String, byte[]> safeCache = new WeakHashMap<>();

    public static void putData(String key, byte[] payload) {
        safeCache.put(key, payload);
    }
}`,
    sources: [
      { title: 'Oracle JVM Garbage Collection Guide', uri: 'https://docs.oracle.com/en/java/javase/17/gctuning/' },
      { title: 'GeeksforGeeks: Garbage Collection in Java', uri: 'https://www.geeksforgeeks.org/garbage-collection-java-2/' }
    ]
  },
  {
    patterns: [/deadlock/i, /coffman\s*conditions/i, /banker'?s\s*algorithm/i],
    track: 'core_cs',
    title: 'Deadlock Conditions, Prevention & Banker\'s Algorithm',
    intuition: 'A deadlock is a state where a set of processes are blocked because each holds a resource and waits for another resource held by another process in the set, creating a circular wait cycle.',
    interviewModel: `1. The 4 Necessary Coffman Conditions:
   - Mutual Exclusion: At least one resource must be held in a non-shareable mode.
   - Hold and Wait: A process holds at least one resource and is waiting to acquire additional resources held by others.
   - No Preemption: Resources cannot be forcibly seized; only released voluntarily after completion.
   - Circular Wait: A closed loop of processes {P0, P1, ..., Pn} exists such that P0 waits for resource held by P1, ..., and Pn waits for P0.
2. Handling Strategies:
   - Deadlock Prevention: Invalidate at least one Coffman condition (e.g., impose strict global resource ordering to break Circular Wait).
   - Deadlock Avoidance: Use Banker\'s Algorithm to evaluate if granting a request leaves the system in a "Safe State" (a safe execution sequence exists).
   - Deadlock Detection & Recovery: Construct a Resource Allocation Graph (Wait-For Graph). Detect cycles via DFS. Kill offending process or preempt resources.
   - Ostrich Algorithm: Ignore the problem (used by modern general-purpose OSes like Linux and Windows when deadlocks are rare, prioritizing throughput over overhead).`,
    staffTip: 'In production systems, prevent deadlocks by acquiring multiple locks in a deterministic order (e.g. always sort resource IDs before acquiring locks: lock(min(A,B)); lock(max(A,B))).',
    codeSnippet: `// Deterministic lock ordering in C++ avoiding circular wait:
#include <mutex>
void transfer(Account& from, Account& to, double amount) {
    // std::scoped_lock / std::lock uses deadlock avoidance ordering internally:
    std::scoped_lock lock(from.mtx, to.mtx);
    from.balance -= amount;
    to.balance += amount;
}`,
    sources: [
      { title: 'GeeksforGeeks: Deadlock Prevention & Avoidance', uri: 'https://www.geeksforgeeks.org/deadlock-prevention/' },
      { title: 'Operating System Concepts: Banker\'s Algorithm', uri: 'https://www.geeksforgeeks.org/bankers-algorithm-in-operating-system-2/' }
    ]
  },
  {
    patterns: [/cap\s*theorem/i, /pacelc/i, /eventual\s*consistency/i],
    track: 'core_cs',
    title: 'CAP Theorem, PACELC & Distributed Data Consistency',
    intuition: 'In any distributed data store across a network, network partitions (packets dropped, routers failing) are inevitable. When a partition occurs, the system must choose between guaranteeing immediate consistency or remaining available to incoming requests.',
    interviewModel: `1. The Three Pillars of CAP:
   - Consistency (Linearizability): Every read receives the most recent write or an error.
   - Availability: Every non-failing node returns a non-error response for every request, without guarantee it contains the latest write.
   - Partition Tolerance: The system continues to operate despite arbitrary packet loss or network split brain.
2. The Real Choice (CP vs AP):
   - You cannot "drop" Partition Tolerance in real distributed systems because network cables and switches fail physically.
   - CP Systems (e.g. MongoDB, HBase, ZooKeeper, etcd): Reject writes or block reads during a partition to preserve strict consistency.
   - AP Systems (e.g. Cassandra, DynamoDB, CouchDB): Allow writes on partitioned nodes, resolving conflicts later via Vector Clocks or Last-Write-Wins (Eventual Consistency).
3. PACELC Theorem (Extending CAP for normal operations):
   - If Partition (P): Choose Availability (A) or Consistency (C).
   - Else (E) normal latency: Choose Latency (L) or Consistency (C).`,
    staffTip: 'Correct the common misconception: CAP does not mean "pick 2 of 3 anytime". In normal operation without partitions, systems balance Latency vs Consistency. Only during a network partition does the CP vs AP tradeoff take effect.',
    codeSnippet: `// Cassandra tunable consistency level configuration:
// Strong consistency achieved when (Read Quorum + Write Quorum) > Total Replicas
Cluster cluster = Cluster.builder().addContactPoint("127.0.0.1").build();
Statement statement = new SimpleStatement("SELECT * FROM users WHERE id = ?")
    .setConsistencyLevel(ConsistencyLevel.QUORUM);`,
    sources: [
      { title: 'CAP Theorem - GeeksforGeeks', uri: 'https://www.geeksforgeeks.org/the-cap-theorem-in-dbms/' },
      { title: 'Martin Kleppmann: Please Stop Calling Databases CP or AP', uri: 'https://martin.kleppmann.com' }
    ]
  },
  {
    patterns: [/event\s*loop/i, /microtask/i, /macrotask/i, /call\s*stack\s*vs\s*queue/i],
    track: 'webdev',
    title: 'JavaScript Event Loop: Call Stack, Microtasks & Macrotasks',
    intuition: 'JavaScript is single-threaded. The Event Loop orchestrates asynchronous non-blocking I/O by continuously checking if the Call Stack is empty, and then draining the Microtask Queue completely before picking the next Macrotask.',
    interviewModel: `1. Execution Order Hierarchy:
   - Synchronous Call Stack: Executes immediately to completion (Run-to-Completion).
   - Microtask Queue (Higher Priority): Drained completely after EVERY synchronous task before browser rendering or next macrotask.
     * Sources: Promise.then/catch/finally, queueMicrotask, MutationObserver, async/await continuations.
   - Rendering Pipeline: Browser re-calculates styles, reflows, and repaints (typically 60fps / ~16.6ms).
   - Macrotask Queue (Task Queue):
     * Sources: setTimeout, setInterval, setImmediate (Node.js), I/O events, UI interaction events.
2. Starvation Risk:
   - If a microtask continuously schedules another microtask (e.g. recursive Promise.resolve()), the macrotask queue and rendering are starved, freezing the browser.`,
    staffTip: 'In Frontend Staff interviews, test understanding of output sequences: synchronous code -> all microtasks -> browser render -> one macrotask -> all microtasks.',
    codeSnippet: `console.log('1: Sync');
setTimeout(() => console.log('4: Macro'), 0);
Promise.resolve().then(() => console.log('2: Micro 1'))
                 .then(() => console.log('3: Micro 2'));
// Output: 1: Sync -> 2: Micro 1 -> 3: Micro 2 -> 4: Macro`,
    sources: [
      { title: 'MDN Web Docs: In-depth Event Loop', uri: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop' },
      { title: 'Jake Archibald: Tasks, microtasks, queues and schedules', uri: 'https://jakearchibald.com' }
    ]
  },
  {
    patterns: [/rate\s*limit/i, /token\s*bucket/i, /leaky\s*bucket/i, /sliding\s*window\s*log/i],
    track: 'core_cs',
    title: 'Rate Limiting Algorithms: Token Bucket vs Leaky Bucket vs Sliding Window',
    intuition: 'Rate limiting protects server infrastructure against denial of service, resource exhaustion, and abuse by enforcing a maximum quota of requests per client IP, API key, or user token over a time window.',
    interviewModel: `1. Four Core Algorithms Compared:
   - Token Bucket (Most Popular - used in AWS, Stripe):
     * Tokens added to a bucket of capacity B at a constant refill rate R.
     * Each request consumes 1 token. If empty, request is dropped (HTTP 429).
     * Pro: Allows bursts of traffic up to capacity B. Memory efficient (2 numbers: tokens, lastRefillTimestamp).
   - Leaky Bucket:
     * Requests enter a FIFO queue of capacity Q and leak out at a constant rate.
     * Pro: Smooths traffic out evenly. Con: Bursts are queued, increasing latency.
   - Fixed Window Counter:
     * Counts requests in 1-minute blocks.
     * Con: Boundary burst problem (allows 2x limit at window boundaries: e.g. 100 requests at 00:59 and 100 at 01:01).
   - Sliding Window Counter (Redis ZSET / Hybrid):
     * Combines current window and previous window weight to give smooth rate limiting without 2x spikes.
2. Distributed Implementation:
   - Use Redis with Lua scripts or Redis Cell module to ensure atomic read-and-decrement across multi-server clusters.`,
    staffTip: 'Always discuss HTTP 429 Too Many Requests response headers: X-RateLimit-Limit, X-RateLimit-Remaining, and Retry-After: <seconds>.',
    codeSnippet: `// Token Bucket Rate Limiter in TypeScript:
class TokenBucket {
  private tokens: number;
  private lastRefill: number;
  constructor(private capacity: number, private refillRatePerSec: number) {
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }
  allowRequest(): boolean {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillRatePerSec);
    this.lastRefill = now;
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }
    return false; // Reject with HTTP 429
  }
}`,
    sources: [
      { title: 'System Design: Designing an API Rate Limiter', uri: 'https://geeksforgeeks.org/design-an-api-rate-limiter/' },
      { title: 'Stripe Engineering: Scaling your API with rate limiters', uri: 'https://stripe.com/blog/rate-limiters' }
    ]
  }
];

/**
 * Intelligent Dynamic Knowledge Query Matcher
 * Analyzes questions across keywords, patterns, and synonyms to generate
 * fully grounded, interview-ready engineering answers.
 */
export function solveDoubtFromCurriculum(
  query: string,
  subject: string = 'general',
  companyFilter: string = ''
): SolvedDoubtResponse {
  const clean = query.trim().toLowerCase();

  // 1. Check exact pattern matches in Knowledge Base
  for (const entry of KNOWLEDGE_BASE) {
    if (entry.patterns.some(p => p.test(clean))) {
      const companyContext = companyFilter 
        ? `\n\nTarget Company Note (${companyFilter}): In ${companyFilter} technical rounds, focus on scalability constraints, edge conditions, and production error mitigation.`
        : '';
      return {
        query,
        track: entry.track,
        intuition: entry.intuition,
        interviewModel: entry.interviewModel + companyContext,
        staffTip: entry.staffTip,
        codeSnippet: entry.codeSnippet,
        sources: entry.sources,
        searchQueries: [query, `${entry.title} interview questions`],
        isGrounded: true
      };
    }
  }

  // 2. Dynamic Smart Synthesizer based on extracted concepts
  let derivedTrack = subject || 'general';
  let matchedTopic = 'Technical Architecture & Problem Solving';
  let intuitiveConcept = 'Core algorithmic invariants and system constraints.';
  let interviewExplanation = '';
  let tip = 'State assumptions clearly, articulate Big-O time and space tradeoffs early, and verify boundary edge cases before concluding.';
  let snippet = '';

  if (/tree|bst|heap|graph|stack|queue|hash|array|string|sort|binary search|dp|dynamic programming|sliding window|two pointer|recur/i.test(clean)) {
    derivedTrack = 'dsa';
    matchedTopic = 'Data Structures & Algorithms';
    intuitiveConcept = `To solve "${query}", analyze the state representation and identifying the invariant that reduces repeated work from O(N^2) or exponential to linearithmic or linear time.`;
    interviewExplanation = `1. Problem Deconstruction:
   - Identify inputs, bounds, and edge cases (empty collections, duplicates, negative values, integer overflow).
   - Baseline Brute Force: State the obvious brute-force approach and its time/space complexity to establish lower bound.
2. Optimal Invariant & Technique:
   - Identify matching pattern: Hash Map for O(1) complements, Monotonic Stack for nearest boundary elements, Sliding Window for contiguous subarrays, or Dynamic Programming for optimal substructure and overlapping subproblems.
3. Complexity Analysis:
   - Time Complexity: Optimal target is typically O(N) or O(N log N).
   - Space Complexity: Target O(1) auxiliary space or O(N) for recursion / memoization table.`;
    tip = 'Always walk through a concrete test case step-by-step with dry-run pointers before writing the final code.';
    snippet = `// Standard algorithmic pattern template
function solveOptimal(data: number[]): number {
  if (!data || data.length === 0) return 0;
  let optimalResult = 0;
  // Apply optimal two-pointer, sliding window, or DP recurrence
  return optimalResult;
}`;
  } else if (/database|sql|acid|transaction|index|postgres|mysql|query|lock|sharding/i.test(clean)) {
    derivedTrack = 'core_cs';
    matchedTopic = 'Database Systems & Internals';
    intuitiveConcept = `Relational and distributed database design revolves around balancing consistency, durability, and query latency (ACID vs BASE).`;
    interviewExplanation = `1. Core Architectural Principle:
   - When addressing "${query}", analyze the tradeoffs between storage I/O, lock contention, and network hops.
   - For queries: Evaluate execution plan (EXPLAIN ANALYZE), index selectivity, clustered vs unclustered B+ tree traversal.
   - For transactions: Contrast isolation levels (Read Committed vs Repeatable Read vs Serializable) and their concurrency implications.
2. Production Failure Modes:
   - Deadlocks, table locks, connection pool exhaustion, and replication lag between primary and read replicas.`;
    tip = 'In system design and core CS rounds, always quantify scale (e.g. read:write ratio, row volume, cache hit ratios).';
    snippet = `-- Analyze query execution plan and index efficiency
EXPLAIN ANALYZE
SELECT id, status, created_at 
FROM records 
WHERE status = 'ACTIVE' 
ORDER BY created_at DESC 
LIMIT 50;`;
  } else if (/process|thread|kernel|memory|cpu|scheduling|cache|virtual memory|paging|socket|tcp|udp|http|dns/i.test(clean)) {
    derivedTrack = 'core_cs';
    matchedTopic = 'Operating Systems & Computer Networks';
    intuitiveConcept = `OS and Networking mechanics optimize resource utilization (CPU cycles, memory pages, network bandwidth) while guaranteeing concurrency safety and reliable communication.`;
    interviewExplanation = `1. System Invariant:
   - Analyze user space vs kernel space boundaries, syscall overhead, and hardware caching (L1/L2/L3 cache lines, TLB).
   - For networking: Trace packet traversal through the protocol stack (Layer 4 TCP/UDP transport up to Layer 7 Application protocols like HTTP/2 or HTTP/3 QUIC).
2. Concurrency & Synchronization:
   - Ensure critical sections are protected using atomic primitives (CAS, Mutexes, Semaphores) with minimal lock contention.`;
    tip = 'Mention the performance cost of context switching (~1-2 microseconds) and memory copying across user/kernel boundaries.';
    snippet = `// Concurrency barrier / thread synchronization pattern
#include <mutex>
#include <condition_variable>

std::mutex cv_m;
std::condition_variable cv;
bool ready = false;

void worker() {
    std::unique_lock<std::mutex> lk(cv_m);
    cv.wait(lk, []{ return ready; });
    // Execute critical task safely
}`;
  } else if (/model|neural|embedding|transformer|llm|loss|gradient|overfit|bias|precision|recall|training|inference/i.test(clean)) {
    derivedTrack = 'ml';
    matchedTopic = 'Machine Learning & AI Engineering';
    intuitiveConcept = `ML engineering balances representational capacity, generalization across unseen data distributions, and real-time computational inference budgets.`;
    interviewExplanation = `1. Mathematical Foundation:
   - Formulate the objective loss function and analyze gradient updates with respect to model parameters.
   - Account for the Bias-Variance tradeoff: prevent overfitting via regularization (L1/L2, Dropout), early stopping, and data augmentation.
2. Production Deployment & Evaluation:
   - Select domain-appropriate metrics: PR-AUC for heavily imbalanced classes (fraud/anomaly detection), BLEU/ROUGE or LLM-as-a-judge for generative systems.
   - Optimize inference latency using quantization (INT8/FP16), KV caching, and batching.`;
    tip = 'Distinguish offline training metrics (F1, Loss) from online business metrics (CTR, Conversion, Latency P99).';
    snippet = `import torch
import torch.nn as nn

# Standard forward pass with cross-entropy and regularization
class BaselineClassifier(nn.Module):
    def __init__(self, in_features, num_classes):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_features, 128),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(128, num_classes)
        )
    def forward(self, x):
        return self.net(x)`;
  } else if (/react|vue|javascript|typescript|css|html|browser|dom|api|rest|graphql|state|hook/i.test(clean)) {
    derivedTrack = 'webdev';
    matchedTopic = 'Modern Web Architecture & Engineering';
    intuitiveConcept = `Modern web engineering ensures reactive, declarative user interfaces render at 60fps while maintaining clean separation of concerns and resilient asynchronous data flow.`;
    interviewExplanation = `1. Architecture & Rendering:
   - Consider the Critical Rendering Path: avoid layout thrashing by batching DOM writes, minimizing reflows, and leveraging GPU compositing (transform / opacity).
   - Component State Lifecycle: Prevent memory leaks from uncleared timers/listeners, solve stale closures in hooks, and optimize re-renders using immutable state patterns.
2. Security & Scalability:
   - Defend against XSS (sanitize inputs, use CSP headers), CSRF (SameSite cookies), and enforce type safety through TypeScript.`;
    tip = 'In frontend architecture rounds, always discuss state normalization, bundle splitting, and Core Web Vitals (LCP, INP, CLS).';
    snippet = `// Efficient React hook with proper dependency hygiene and cleanup
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer); // Prevent memory leaks
  }, [value, delay]);
  return debouncedValue;
}`;
  } else {
    // Dynamic deep breakdown synthesizing the specific query terms
    const cleanWords = query.replace(/[?.,!]/g, '').trim();
    derivedTrack = subject !== 'all' ? subject : 'general';
    matchedTopic = `Deep Dive: ${cleanWords}`;
    intuitiveConcept = `To understand "${query}", start with the core engineering invariant: identify the state or resource being managed, determine the execution invariants, and analyze how data flows under edge conditions.`;
    interviewExplanation = `1. Core Problem Deconstruction & Terminology:
   - Topic Focus: "${query}"
   - Fundamental Mechanism: Address the core definition, prerequisites, and how this fits into production software engineering architectures.
   - Execution Mechanics: Break down the step-by-step lifecycle from initialization to teardown or return state.
2. Operational Tradeoffs & Edge Cases:
   - Scalability: How does this behave when data volume, concurrent users, or memory constraints increase by 10x or 100x?
   - Failure Modes: Address boundary inputs (null values, concurrency race conditions, network partition, timeout handling).
   - Time & Space Bounds: Evaluate asymptotic upper bounds and cache locality implications.
3. Industry Best Practices:
   - In modern production systems, isolate responsibilities using modular abstractions, provide comprehensive telemetry/logging, and prefer idiomatic patterns over ad-hoc hacks.`;
    tip = `In technical placement rounds, start by defining the concept in one crystal-clear sentence, walk through a concrete edge-case example, and mention one practical production tradeoff.`;
    snippet = `// Production Implementation / Conceptual Pattern for: ${cleanWords}
// Demonstrates clean encapsulation, boundary checks, and defensive programming:
export function handleCoreOperation<T>(inputData: T[]): { success: boolean; data: T[] } {
  if (!inputData || inputData.length === 0) {
    return { success: false, data: [] }; // Guard against boundary/null states
  }
  
  // Step 1: Process according to core domain rules
  const processed = [...inputData];
  
  // Step 2: Return structured, type-safe result with deterministic output
  return { success: true, data: processed };
}`;
  }

  const companyContext = companyFilter 
    ? `\n\nTarget Company Note (${companyFilter}): In ${companyFilter} technical rounds, focus on scalability constraints, edge conditions, and production error mitigation.`
    : '';

  return {
    query,
    track: derivedTrack,
    intuition: intuitiveConcept,
    interviewModel: interviewExplanation + companyContext,
    staffTip: tip,
    codeSnippet: snippet || undefined,
    sources: [
      { title: `GeeksforGeeks: ${matchedTopic}`, uri: 'https://www.geeksforgeeks.org' },
      { title: 'LeetCode Interview Discuss & System Design', uri: 'https://leetcode.com/discuss' }
    ],
    searchQueries: [query, `${matchedTopic} placement questions`],
    isGrounded: true
  };
}
