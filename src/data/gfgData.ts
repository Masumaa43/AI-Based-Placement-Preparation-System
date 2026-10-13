import { GFGProblem, GFGArticle } from '../types';

export const GFG_PROBLEMS: GFGProblem[] = [
  // 1. Kadane's Algorithm
  {
    id: 'gfg-kadane',
    title: "Kadane's Algorithm (Max Subarray Sum)",
    slug: 'kadanes-algorithm-1587115620',
    difficulty: 'Medium',
    category: 'Arrays & Dynamic Programming',
    accuracy: '36.28%',
    points: 4,
    companies: ['Amazon', 'Microsoft', 'Samsung', 'Flipkart', 'Snapdeal', 'Walmart'],
    url: 'https://www.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1',
    description: `Given an integer array arr[]. Find the contiguous sub-array(containing at least one number) which has the maximum sum and return its sum.

Kadane's Algorithm is one of the most frequently asked array problems in product company coding assessments.`,
    example: {
      input: 'arr = [1, 2, 3, -2, 5]',
      output: '9',
      explanation: 'Max subarray sum is 9 of elements (1, 2, 3, -2, 5) which is a contiguous subarray.'
    },
    constraints: [
      '1 <= arr.size() <= 10^6',
      '-10^7 <= arr[i] <= 10^7'
    ],
    expectedTime: 'O(N)',
    expectedSpace: 'O(1)',
    tags: ['Arrays', 'Dynamic Programming', 'Must Do SDE Sheet', 'POTD Classic'],
    solutionCode: {
      cpp: `long long maxSubarraySum(vector<int> &arr) {
    long long maxi = LONG_MIN;
    long long sum = 0;
    for (int i = 0; i < arr.size(); i++) {
        sum += arr[i];
        if (sum > maxi) maxi = sum;
        if (sum < 0) sum = 0;
    }
    return maxi;
}`,
      java: `long maxSubarraySum(int[] arr) {
    long maxi = Long.MIN_VALUE;
    long sum = 0;
    for (int x : arr) {
        sum += x;
        if (sum > maxi) maxi = sum;
        if (sum < 0) sum = 0;
    }
    return maxi;
}`,
      python: `def maxSubArraySum(self, arr):
    max_so_far = float('-inf')
    curr_sum = 0
    for x in arr:
        curr_sum += x
        if curr_sum > max_so_far:
            max_so_far = curr_sum
        if curr_sum < 0:
            curr_sum = 0
    return max_so_far`
    }
  },

  // 2. Subarray with Given Sum
  {
    id: 'gfg-subarray-sum',
    title: 'Subarray with Given Sum',
    slug: 'subarray-with-given-sum-1587115621',
    difficulty: 'Medium',
    category: 'Arrays & Two Pointers',
    accuracy: '16.51%',
    points: 4,
    companies: ['Amazon', 'Facebook', 'Google', 'Visa', 'Flipkart'],
    url: 'https://www.geeksforgeeks.org/problems/subarray-with-given-sum-1587115621/1',
    description: `Given an unsorted array arr of size n that contains only non-negative integers, find a continuous sub-array that adds to a given number s and return the 1-based indices(left and right) of the subarray.

In case of multiple subarrays, return the subarray indexes which come first on moving from left to right. If no such subarray exists, return [-1].`,
    example: {
      input: 'n = 5, s = 12, arr = [1, 2, 3, 7, 5]',
      output: '[2, 4]',
      explanation: 'The sum of elements from 2nd position to 4th position is 2 + 3 + 7 = 12.'
    },
    constraints: [
      '1 <= n <= 10^5',
      '0 <= arr[i] <= 10^9',
      '0 <= s <= 10^9'
    ],
    expectedTime: 'O(N)',
    expectedSpace: 'O(1)',
    tags: ['Two Pointers', 'Sliding Window', 'Must Do SDE Sheet'],
    solutionCode: {
      cpp: `vector<int> subarraySum(vector<int> arr, int n, long long s) {
    int left = 0, right = 0;
    long long currentSum = 0;
    if (s == 0) {
        for (int i = 0; i < n; i++) if (arr[i] == 0) return {i + 1, i + 1};
        return {-1};
    }
    while (right < n) {
        currentSum += arr[right];
        while (currentSum > s && left < right) {
            currentSum -= arr[left];
            left++;
        }
        if (currentSum == s) {
            return {left + 1, right + 1};
        }
        right++;
    }
    return {-1};
}`,
      java: `static ArrayList<Integer> subarraySum(int[] arr, int n, int s) {
    ArrayList<Integer> res = new ArrayList<>();
    int left = 0, right = 0;
    long sum = 0;
    while (right < n) {
        sum += arr[right];
        while (sum > s && left < right) {
            sum -= arr[left++];
        }
        if (sum == s) {
            res.add(left + 1);
            res.add(right + 1);
            return res;
        }
        right++;
    }
    res.add(-1);
    return res;
}`,
      python: `def subArraySum(self, arr, n, s):
    left = 0
    curr_sum = 0
    for right in range(n):
        curr_sum += arr[right]
        while curr_sum > s and left < right:
            curr_sum -= arr[left]
            left += 1
        if curr_sum == s:
            return [left + 1, right + 1]
    return [-1]`
    }
  },

  // 3. Missing Number in Array
  {
    id: 'gfg-missing-number',
    title: 'Missing Number in Array',
    slug: 'missing-number-in-array1416',
    difficulty: 'Easy',
    category: 'Arrays & Math',
    accuracy: '29.59%',
    points: 2,
    companies: ['Flipkart', 'Morgan Stanley', 'Amazon', 'Microsoft', 'Paytm'],
    url: 'https://www.geeksforgeeks.org/problems/missing-number-in-array1416/1',
    description: `Given an array arr of size n-1 containing distinct integers in the range from 1 to n (inclusive), find the missing element.

A quintessential arithmetic / XOR trick question asked in initial screening rounds.`,
    example: {
      input: 'n = 5, arr = [1, 2, 3, 5]',
      output: '4',
      explanation: 'The numbers from 1 to 5 should total 15. The sum of [1,2,3,5] is 11. Missing number is 15 - 11 = 4.'
    },
    constraints: [
      '1 <= n <= 10^6',
      '1 <= arr[i] <= n'
    ],
    expectedTime: 'O(N)',
    expectedSpace: 'O(1)',
    tags: ['Arrays', 'Bit Magic', 'Math'],
    solutionCode: {
      cpp: `int missingNumber(int n, vector<int>& arr) {
    long long total = (long long)n * (n + 1) / 2;
    long long sum = 0;
    for (int num : arr) sum += num;
    return total - sum;
}`,
      java: `int missingNumber(int n, int arr[]) {
    long total = (long)n * (n + 1) / 2;
    long sum = 0;
    for (int num : arr) sum += num;
    return (int)(total - sum);
}`,
      python: `def missingNumber(self, n, arr):
    total = n * (n + 1) // 2
    return total - sum(arr)`
    }
  },

  // 4. Leaders in an Array
  {
    id: 'gfg-leaders-in-array',
    title: 'Leaders in an Array',
    slug: 'leaders-in-an-array-1587115620',
    difficulty: 'Easy',
    category: 'Arrays',
    accuracy: '29.94%',
    points: 2,
    companies: ['Paytm', 'Ola Cabs', 'Amazon', 'Adobe', 'TCS'],
    url: 'https://www.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1',
    description: `Given an array arr of n positive integers. An element of array is a leader if it is greater than or equal to all the elements to its right side. The rightmost element is always a leader. Find all the leaders in the array.`,
    example: {
      input: 'n = 6, arr = [16, 17, 4, 3, 5, 2]',
      output: '[17, 5, 2]',
      explanation: '17 is greater than 4, 3, 5, 2. 5 is greater than 2. 2 is rightmost.'
    },
    constraints: [
      '1 <= n <= 10^7',
      '0 <= arr[i] <= 10^7'
    ],
    expectedTime: 'O(N)',
    expectedSpace: 'O(1)',
    tags: ['Arrays', 'Traversal'],
    solutionCode: {
      cpp: `vector<int> leaders(int n, int arr[]) {
    vector<int> ans;
    int maxFromRight = arr[n - 1];
    ans.push_back(maxFromRight);
    for (int i = n - 2; i >= 0; i--) {
        if (arr[i] >= maxFromRight) {
            maxFromRight = arr[i];
            ans.push_back(maxFromRight);
        }
    }
    reverse(ans.begin(), ans.end());
    return ans;
}`,
      java: `static ArrayList<Integer> leaders(int arr[], int n) {
    ArrayList<Integer> ans = new ArrayList<>();
    int maxFromRight = arr[n - 1];
    ans.add(maxFromRight);
    for (int i = n - 2; i >= 0; i--) {
        if (arr[i] >= maxFromRight) {
            maxFromRight = arr[i];
            ans.add(maxFromRight);
        }
    }
    Collections.reverse(ans);
    return ans;
}`,
      python: `def leaders(self, A, N):
    ans = []
    max_right = A[-1]
    ans.append(max_right)
    for i in range(N - 2, -1, -1):
        if A[i] >= max_right:
            max_right = A[i]
            ans.append(max_right)
    ans.reverse()
    return ans`
    }
  },

  // 5. Parenthesis Checker
  {
    id: 'gfg-parenthesis-checker',
    title: 'Parenthesis Checker',
    slug: 'parenthesis-checker2744',
    difficulty: 'Easy',
    category: 'Stack',
    accuracy: '28.56%',
    points: 2,
    companies: ['Flipkart', 'Amazon', 'Microsoft', 'Oracle', 'Walmart'],
    url: 'https://www.geeksforgeeks.org/problems/parenthesis-checker2744/1',
    description: `Given an expression string x. Examine whether the pairs and the orders of "{","}","(",")","[","]" are correct in exp.
For example, the function should return 'true' for exp = "[()]{}{[()()]()}" and 'false' for exp = "[(])".`,
    example: {
      input: 'x = {([])}',
      output: 'true',
      explanation: '{([])} - the brackets are well balanced.'
    },
    constraints: [
      '1 <= |x| <= 10^5'
    ],
    expectedTime: 'O(|X|)',
    expectedSpace: 'O(|X|)',
    tags: ['Stack', 'Strings', 'Must Do SDE Sheet'],
    solutionCode: {
      cpp: `bool ispar(string x) {
    stack<char> s;
    for (char c : x) {
        if (c == '{' || c == '(' || c == '[') {
            s.push(c);
        } else {
            if (s.empty()) return false;
            char top = s.top();
            if ((c == '}' && top == '{') || (c == ')' && top == '(') || (c == ']' && top == '[')) {
                s.pop();
            } else {
                return false;
            }
        }
    }
    return s.empty();
}`,
      java: `static boolean ispar(String x) {
    Stack<Character> stack = new Stack<>();
    for (char ch : x.toCharArray()) {
        if (ch == '(' || ch == '{' || ch == '[') {
            stack.push(ch);
        } else {
            if (stack.isEmpty()) return false;
            char top = stack.pop();
            if (ch == ')' && top != '(') return false;
            if (ch == '}' && top != '{') return false;
            if (ch == ']' && top != '[') return false;
        }
    }
    return stack.isEmpty();
}`,
      python: `def ispar(self, x):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in x:
        if char in mapping.values():
            stack.append(char)
        elif char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
    return len(stack) == 0`
    }
  },

  // 6. Next Greater Element
  {
    id: 'gfg-next-greater-element',
    title: 'Next Greater Element',
    slug: 'next-larger-element-1587115620',
    difficulty: 'Medium',
    category: 'Stack',
    accuracy: '32.95%',
    points: 4,
    companies: ['Flipkart', 'Amazon', 'Microsoft', 'Samsung', 'Adobe'],
    url: 'https://www.geeksforgeeks.org/problems/next-larger-element-1587115620/1',
    description: `Given an array arr[ ] of integers, the task is to find the next greater element for each element of the array in order of their appearance in the array. Next greater element of an element in the array is the nearest element on the right which is greater than the current element. If there does not exist next greater of current element, then next greater element for current element is -1.`,
    example: {
      input: 'n = 4, arr = [1, 3, 2, 4]',
      output: '[3, 4, 4, -1]',
      explanation: 'In the array, the next larger element to 1 is 3, 3 is 4, 2 is 4 and for 4, there is no larger element on the right so -1.'
    },
    constraints: [
      '1 <= n <= 10^6',
      '0 <= arr[i] <= 10^18'
    ],
    expectedTime: 'O(N)',
    expectedSpace: 'O(N)',
    tags: ['Stack', 'Monotonic Stack', 'Must Do SDE Sheet'],
    solutionCode: {
      cpp: `vector<long long> nextLargerElement(vector<long long> &arr, int n) {
    vector<long long> res(n, -1);
    stack<long long> st;
    for (int i = n - 1; i >= 0; i--) {
        while (!st.empty() && st.top() <= arr[i]) {
            st.pop();
        }
        if (!st.empty()) {
            res[i] = st.top();
        }
        st.push(arr[i]);
    }
    return res;
}`,
      java: `public static long[] nextLargerElement(long[] arr, int n) {
    long[] res = new long[n];
    Stack<Long> st = new Stack<>();
    for (int i = n - 1; i >= 0; i--) {
        while (!st.isEmpty() && st.peek() <= arr[i]) {
            st.pop();
        }
        res[i] = st.isEmpty() ? -1 : st.peek();
        st.push(arr[i]);
    }
    return res;
}`,
      python: `def nextLargerElement(self, arr, n):
    res = [-1] * n
    stack = []
    for i in range(n - 1, -1, -1):
        while stack and stack[-1] <= arr[i]:
            stack.pop()
        if stack:
            res[i] = stack[-1]
        stack.append(arr[i])
    return res`
    }
  },

  // 7. Reverse a Linked List
  {
    id: 'gfg-reverse-linked-list',
    title: 'Reverse a Linked List',
    slug: 'reverse-a-linked-list',
    difficulty: 'Easy',
    category: 'Linked List',
    accuracy: '73.11%',
    points: 2,
    companies: ['Paytm', 'VMWare', 'Zoho', 'Amazon', 'Microsoft', 'Samsung'],
    url: 'https://www.geeksforgeeks.org/problems/reverse-a-linked-list/1',
    description: `Given a linked list of N nodes. The task is to reverse this list.
Follow up: Can you do it in both iterative and recursive manners?`,
    example: {
      input: 'LinkedList: 1->2->3->4->5->6',
      output: '6->5->4->3->2->1',
      explanation: 'Reversing the links transforms 1->2->3->4->5->6 into 6->5->4->3->2->1.'
    },
    constraints: [
      '1 <= N <= 10^4'
    ],
    expectedTime: 'O(N)',
    expectedSpace: 'O(1)',
    tags: ['Linked List', 'Pointers', 'Must Do SDE Sheet'],
    solutionCode: {
      cpp: `Node* reverseList(struct Node *head) {
    Node* prev = NULL;
    Node* curr = head;
    Node* next = NULL;
    while (curr != NULL) {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
      java: `Node reverseList(Node head) {
    Node prev = null;
    Node curr = head;
    while (curr != null) {
        Node next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
      python: `def reverseList(self, head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev`
    }
  },

  // 8. Detect Loop in Linked List
  {
    id: 'gfg-detect-loop-linked-list',
    title: 'Detect Loop in Linked List (Floyd Cycle)',
    slug: 'detect-loop-in-linked-list',
    difficulty: 'Medium',
    category: 'Linked List',
    accuracy: '43.49%',
    points: 4,
    companies: ['Paytm', 'Amazon', 'Microsoft', 'Samsung', 'Oracle'],
    url: 'https://www.geeksforgeeks.org/problems/detect-loop-in-linked-list/1',
    description: `Given a linked list of N nodes. The task is to check if the linked list has a loop. Linked list can contain self loop.
Uses Floyd's Cycle-Finding Algorithm (Tortoise and Hare algorithm).`,
    example: {
      input: 'N = 3, value[] = {1,3,4}, x(pos) = 2',
      output: 'True',
      explanation: 'A loop exists in the linked list where the tail connects back to the 2nd node.'
    },
    constraints: [
      '1 <= N <= 10^4',
      '1 <= Data on Node <= 10^3'
    ],
    expectedTime: 'O(N)',
    expectedSpace: 'O(1)',
    tags: ['Linked List', 'Two Pointers', 'Floyd Cycle'],
    solutionCode: {
      cpp: `bool detectLoop(Node* head) {
    Node* slow = head;
    Node* fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
      java: `public static boolean detectLoop(Node head){
    Node slow = head;
    Node fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}`,
      python: `def detectLoop(self, head):
    slow = head
    fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`
    }
  },

  // 9. Lowest Common Ancestor in a BST
  {
    id: 'gfg-lca-bst',
    title: 'Lowest Common Ancestor in a BST',
    slug: 'lowest-common-ancestor-in-a-bst',
    difficulty: 'Easy',
    category: 'Tree & BST',
    accuracy: '65.2%',
    points: 2,
    companies: ['Amazon', 'Microsoft', 'Flipkart', 'Paytm', 'Google'],
    url: 'https://www.geeksforgeeks.org/problems/lowest-common-ancestor-in-a-bst/1',
    description: `Given a Binary Search Tree (with all values unique) and two node values n1 and n2 (n1!=n2). Find the Lowest Common Ancestor of the two nodes in the BST.`,
    example: {
      input: 'BST: 5 / \\ 4 6 / \\ 3 7 / 8, n1 = 7, n2 = 8',
      output: '7',
      explanation: '7 is the lowest common ancestor of 7 and 8.'
    },
    constraints: [
      '1 <= Number of nodes <= 10^4',
      '1 <= node->data <= 10^4'
    ],
    expectedTime: 'O(Height of the BST)',
    expectedSpace: 'O(Height of the BST)',
    tags: ['Binary Search Tree', 'Recursion', 'Must Do SDE Sheet'],
    solutionCode: {
      cpp: `Node* LCA(Node *root, int n1, int n2) {
    if (root == NULL) return NULL;
    if (root->data > n1 && root->data > n2)
        return LCA(root->left, n1, n2);
    if (root->data < n1 && root->data < n2)
        return LCA(root->right, n1, n2);
    return root;
}`,
      java: `Node LCA(Node root, int n1, int n2) {
    if (root == null) return null;
    if (root.data > n1 && root.data > n2)
        return LCA(root.left, n1, n2);
    if (root.data < n1 && root.data < n2)
        return LCA(root.right, n1, n2);
    return root;
}`,
      python: `def LCA(self, root, n1, n2):
    if not root:
        return None
    if root.data > n1 and root.data > n2:
        return self.LCA(root.left, n1, n2)
    if root.data < n1 and root.data < n2:
        return self.LCA(root.right, n1, n2)
    return root`
    }
  },

  // 10. BFS of Graph
  {
    id: 'gfg-bfs-graph',
    title: 'BFS of Graph',
    slug: 'bfs-traversal-of-graph',
    difficulty: 'Easy',
    category: 'Graph',
    accuracy: '44.09%',
    points: 2,
    companies: ['Samsung', 'Adobe', 'Amazon', 'Flipkart', 'Microsoft'],
    url: 'https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1',
    description: `Given a directed graph. The task is to do Breadth First Traversal of this graph starting from 0.
Note: One can move from node u to node v only if there's an edge from u to v. Find the BFS traversal of the graph starting from the 0th vertex, from left to right according to the input graph.`,
    example: {
      input: 'V = 5, E = 4, edges: 0->1, 0->2, 0->3, 2->4',
      output: '[0, 1, 2, 3, 4]',
      explanation: '0 is visited first, then neighbors 1, 2, 3, then neighbor of 2 which is 4.'
    },
    constraints: [
      '1 <= V, E <= 10^4'
    ],
    expectedTime: 'O(V + E)',
    expectedSpace: 'O(V)',
    tags: ['Graph', 'BFS', 'Queue', 'Must Do SDE Sheet'],
    solutionCode: {
      cpp: `vector<int> bfsOfGraph(int V, vector<int> adj[]) {
    vector<int> bfs;
    vector<int> vis(V, 0);
    queue<int> q;
    q.push(0);
    vis[0] = 1;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        bfs.push_back(node);
        for (auto it : adj[node]) {
            if (!vis[it]) {
                vis[it] = 1;
                q.push(it);
            }
        }
    }
    return bfs;
}`,
      java: `public ArrayList<Integer> bfsOfGraph(int V, ArrayList<ArrayList<Integer>> adj) {
    ArrayList<Integer> bfs = new ArrayList<>();
    boolean[] vis = new boolean[V];
    Queue<Integer> q = new LinkedList<>();
    q.add(0);
    vis[0] = true;
    while (!q.isEmpty()) {
        int node = q.poll();
        bfs.add(node);
        for (int it : adj.get(node)) {
            if (!vis[it]) {
                vis[it] = true;
                q.add(it);
            }
        }
    }
    return bfs;
}`,
      python: `def bfsOfGraph(self, V: int, adj: List[List[int]]) -> List[int]:
    bfs = []
    vis = [0] * V
    from collections import deque
    q = deque([0])
    vis[0] = 1
    while q:
        node = q.popleft()
        bfs.append(node)
        for it in adj[node]:
            if not vis[it]:
                vis[it] = 1
                q.append(it)
    return bfs`
    }
  },

  // 11. 0 - 1 Knapsack Problem
  {
    id: 'gfg-01-knapsack',
    title: '0 - 1 Knapsack Problem',
    slug: '0-1-knapsack-problem0945',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    accuracy: '31.76%',
    points: 4,
    companies: ['Amazon', 'Directi', 'Flipkart', 'Microsoft', 'Paytm'],
    url: 'https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1',
    description: `You are given weights and values of N items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack. Note that we have only one quantity of each item.
In other words, given two integer arrays val[0..N-1] and wt[0..N-1] which represent values and weights associated with N items respectively. Also given an integer W which represents knapsack capacity, find out the maximum value subset of val[] such that sum of the weights of this subset is smaller than or equal to W. You cannot break an item, either pick the complete item or dont pick it (0-1 property).`,
    example: {
      input: 'N = 3, W = 4, values[] = {1,2,3}, weight[] = {4,5,1}',
      output: '3',
      explanation: 'Choose the last item that weighs 1 unit and gives value 3.'
    },
    constraints: [
      '1 <= N <= 1000',
      '1 <= W <= 1000',
      '1 <= wt[i] <= 1000',
      '1 <= val[i] <= 1000'
    ],
    expectedTime: 'O(N*W)',
    expectedSpace: 'O(N*W)',
    tags: ['Dynamic Programming', 'Knapsack', 'Must Do SDE Sheet'],
    solutionCode: {
      cpp: `int knapSack(int W, int wt[], int val[], int n) {
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++) {
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}`,
      java: `static int knapSack(int W, int wt[], int val[], int n) {
    int[] dp = new int[W + 1];
    for (int i = 0; i < n; i++) {
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = Math.max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}`,
      python: `def knapSack(self, W, wt, val, n):
    dp = [0] * (W + 1)
    for i in range(n):
        for w in range(W, wt[i] - 1, -1):
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]])
    return dp[W]`
    }
  },

  // 12. Longest Common Subsequence
  {
    id: 'gfg-lcs',
    title: 'Longest Common Subsequence',
    slug: 'longest-common-subsequence-1587115620',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    accuracy: '34.98%',
    points: 4,
    companies: ['Amazon', 'Microsoft', 'Citrix', 'Paytm', 'MakeMyTrip'],
    url: 'https://www.geeksforgeeks.org/problems/longest-common-subsequence-1587115620/1',
    description: `Given two strings, find the length of longest subsequence present in both of them. Both strings are in uppercase alphabets.`,
    example: {
      input: 'n = 6, m = 6, s1 = "ABCDGH", s2 = "AEDFHR"',
      output: '3',
      explanation: 'LCS for input Sequences "ABCDGH" and "AEDFHR" is "ADH" of length 3.'
    },
    constraints: [
      '1 <= n, m <= 10^3'
    ],
    expectedTime: 'O(|s1| * |s2|)',
    expectedSpace: 'O(|s1| * |s2|)',
    tags: ['Dynamic Programming', 'Strings', 'Must Do SDE Sheet'],
    solutionCode: {
      cpp: `int lcs(int n, int m, string s1, string s2) {
    vector<int> prev(m + 1, 0), curr(m + 1, 0);
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (s1[i - 1] == s2[j - 1]) curr[j] = 1 + prev[j - 1];
            else curr[j] = max(prev[j], curr[j - 1]);
        }
        prev = curr;
    }
    return prev[m];
}`,
      java: `static int lcs(int n, int m, String s1, String s2) {
    int[] prev = new int[m + 1];
    int[] curr = new int[m + 1];
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (s1.charAt(i - 1) == s2.charAt(j - 1)) curr[j] = 1 + prev[j - 1];
            else curr[j] = Math.max(prev[j], curr[j - 1]);
        }
        prev = curr.clone();
    }
    return prev[m];
}`,
      python: `def lcs(self, n, m, s1, s2):
    prev = [0] * (m + 1)
    curr = [0] * (m + 1)
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if s1[i - 1] == s2[j - 1]:
                curr[j] = 1 + prev[j - 1]
            else:
                curr[j] = max(prev[j], curr[j - 1])
        prev = curr[:]
    return prev[m]`
    }
  }
];

// Curated GeeksforGeeks Core CS Article Guides
export const GFG_ARTICLES: GFGArticle[] = [
  // DBMS Articles
  {
    id: 'gfg-art-acid',
    subjectId: 'dbms',
    subjectTitle: 'Database Management Systems',
    title: 'ACID Properties in DBMS with Real-World Examples',
    url: 'https://www.geeksforgeeks.org/acid-properties-in-dbms/',
    readTime: '8 min read',
    difficulty: 'Beginner',
    summary: 'Comprehensive breakdown of Atomicity, Consistency, Isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable), and Durability backed by transaction logs.',
    keyTakeaways: [
      'Dirty Reads are prevented by Read Committed',
      'Non-repeatable Reads are prevented by Repeatable Read',
      'Phantom Reads are prevented by Serializable (Next-Key Locking in InnoDB)',
      'Write-Ahead Logging (WAL) guarantees the Durability principle'
    ],
    companiesAsked: ['Amazon', 'Google', 'Microsoft', 'Oracle', 'Goldman Sachs']
  },
  {
    id: 'gfg-art-norm',
    subjectId: 'dbms',
    subjectTitle: 'Database Management Systems',
    title: 'Database Normalization: 1NF, 2NF, 3NF, BCNF & 4NF',
    url: 'https://www.geeksforgeeks.org/database-normalization-introduction/',
    readTime: '12 min read',
    difficulty: 'Intermediate',
    summary: 'Eliminate insertion, deletion, and update anomalies. Step-by-step mathematical definition of Functional Dependencies and Superkey rules.',
    keyTakeaways: [
      '1NF: Attributes must contain atomic values with no repeating groups',
      '2NF: 1NF + no partial dependency of non-prime attributes on candidate key',
      '3NF: 2NF + no transitive dependency (X -> Y where Y is non-prime)',
      'BCNF: For every functional dependency X -> Y, X must be a super key'
    ],
    companiesAsked: ['Flipkart', 'Samsung', 'Adobe', 'TCS', 'Infosys']
  },
  {
    id: 'gfg-art-btree',
    subjectId: 'dbms',
    subjectTitle: 'Database Management Systems',
    title: 'B-Tree and B+ Tree in DBMS Indexing',
    url: 'https://www.geeksforgeeks.org/b-tree-set-1-introduction-2/',
    readTime: '10 min read',
    difficulty: 'Advanced',
    summary: 'Why relational databases use B+ trees instead of Binary Search Trees for disk storage: high fan-out, sequential leaf scans, and logarithmic depth.',
    keyTakeaways: [
      'All leaf nodes in B+ Tree are doubly linked for O(1) range queries',
      'Internal nodes store only keys and pointers, maximizing fan-out per disk block',
      'Clustered indexes determine physical row order on disk'
    ],
    companiesAsked: ['Uber', 'Salesforce', 'Amazon', 'Microsoft']
  },
  {
    id: 'gfg-art-concurrency',
    subjectId: 'dbms',
    subjectTitle: 'Database Management Systems',
    title: 'Two Phase Locking (2PL) Protocol & Concurrency Control',
    url: 'https://www.geeksforgeeks.org/two-phase-locking-protocol/',
    readTime: '9 min read',
    difficulty: 'Intermediate',
    summary: 'Growing phase vs Shrinking phase, Strict 2PL vs Rigorous 2PL, and preventing cascading aborts.',
    keyTakeaways: [
      'Growing Phase: Locks may be acquired but cannot be released',
      'Shrinking Phase: Locks may be released but cannot be acquired',
      'Strict 2PL holds exclusive locks until commit/abort to prevent dirty reads'
    ],
    companiesAsked: ['Oracle', 'Paytm', 'Morgan Stanley']
  },

  // Operating Systems Articles
  {
    id: 'gfg-art-sched',
    subjectId: 'os',
    subjectTitle: 'Operating Systems',
    title: 'CPU Scheduling Algorithms in Operating Systems',
    url: 'https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/',
    readTime: '11 min read',
    difficulty: 'Beginner',
    summary: 'In-depth comparison of FCFS, SJF (Shortest Job First), Round Robin (RR), Priority Scheduling, and Multi-level Feedback Queue (MLFQ) with Gantt charts.',
    keyTakeaways: [
      'SJF gives minimum average waiting time among all scheduling algorithms',
      'Round Robin time quantum trade-off: large quantum becomes FCFS; small incurs context switch overhead',
      'Convoy effect occurs in non-preemptive FCFS when a CPU-bound process blocks I/O-bound processes'
    ],
    companiesAsked: ['Amazon', 'Microsoft', 'Qualcomm', 'Intel', 'Samsung']
  },
  {
    id: 'gfg-art-deadlock',
    subjectId: 'os',
    subjectTitle: 'Operating Systems',
    title: 'Deadlock, Coffman Conditions & Banker\'s Algorithm',
    url: 'https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/',
    readTime: '10 min read',
    difficulty: 'Intermediate',
    summary: 'Detailed explanation of the 4 Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait, plus Resource Allocation Graphs (RAG).',
    keyTakeaways: [
      'Breaking any single Coffman condition prevents deadlock occurrence',
      'Banker\'s Algorithm checks for Safe State before allocating requested resources',
      'Resource ordering breaks circular wait condition'
    ],
    companiesAsked: ['Google', 'VMware', 'Cisco', 'Adobe']
  },
  {
    id: 'gfg-art-virtual-mem',
    subjectId: 'os',
    subjectTitle: 'Operating Systems',
    title: 'Virtual Memory, Demand Paging & Page Replacement Algorithms',
    url: 'https://www.geeksforgeeks.org/virtual-memory-in-operating-system/',
    readTime: '12 min read',
    difficulty: 'Advanced',
    summary: 'Translation Lookaside Buffer (TLB), Page Faults, Thrashing, and comparison of FIFO (Belady\'s Anomaly), LRU, and Optimal Page Replacement.',
    keyTakeaways: [
      'Demand Paging loads pages into physical RAM only when referenced',
      'Belady\'s Anomaly: FIFO page replacement can cause MORE page faults with more memory frames',
      'Thrashing occurs when the system spends more time paging than executing processes'
    ],
    companiesAsked: ['Microsoft', 'Apple', 'NVIDIA', 'Amazon']
  },
  {
    id: 'gfg-art-sync',
    subjectId: 'os',
    subjectTitle: 'Operating Systems',
    title: 'Process Synchronization: Mutex vs Counting Semaphore',
    url: 'https://www.geeksforgeeks.org/process-synchronization-in-operating-system/',
    readTime: '9 min read',
    difficulty: 'Intermediate',
    summary: 'Critical Section Problem, Peterson\'s Algorithm, Binary vs Counting Semaphores, Spinlocks, and Reader-Writer / Producer-Consumer synchronization.',
    keyTakeaways: [
      'Mutex is a locking mechanism (ownership exists); Semaphore is a signaling mechanism',
      'wait() decrements semaphore; signal() increments semaphore',
      'Priority Inversion solved using Priority Inheritance protocol'
    ],
    companiesAsked: ['Bloomberg', 'Uber', 'Qualcomm']
  },

  // Computer Networks Articles
  {
    id: 'gfg-art-tcp-handshake',
    subjectId: 'cn',
    subjectTitle: 'Computer Networks',
    title: 'TCP 3-Way Handshake & 4-Way Connection Teardown',
    url: 'https://www.geeksforgeeks.org/tcp-3-way-handshake-process/',
    readTime: '8 min read',
    difficulty: 'Intermediate',
    summary: 'Detailed packet exchange: SYN, SYN-ACK, ACK with sequence numbers, SYN Flood attacks, and the reasoning behind TIME_WAIT (2*MSL).',
    keyTakeaways: [
      'SYN synchronizes initial sequence numbers (ISN) between client and server',
      'TIME_WAIT state lasts for 2 * Maximum Segment Lifetime (MSL) to drain delayed duplicate packets',
      'SYN Flood mitigated using SYN Cookies'
    ],
    companiesAsked: ['Cisco', 'Amazon', 'Cloudflare', 'Google', 'Akamai']
  },
  {
    id: 'gfg-art-osi-tcp',
    subjectId: 'cn',
    subjectTitle: 'Computer Networks',
    title: 'OSI 7-Layer Model vs TCP/IP Protocol Suite',
    url: 'https://www.geeksforgeeks.org/layers-of-osi-model/',
    readTime: '10 min read',
    difficulty: 'Beginner',
    summary: 'Encapsulation and decapsulation across Physical, Data Link (Ethernet/MAC), Network (IP), Transport (TCP/UDP), and Application layers.',
    keyTakeaways: [
      'Data Link layer deals with Frames and MAC addresses (Switches)',
      'Network layer deals with Packets and IP addresses (Routers)',
      'Transport layer deals with Segments/Datagrams and Port numbers'
    ],
    companiesAsked: ['Infosys', 'TCS', 'Wipro', 'Cognizant', 'HCL']
  },
  {
    id: 'gfg-art-dns',
    subjectId: 'cn',
    subjectTitle: 'Computer Networks',
    title: 'DNS Resolution Process: How Domain Name System Works',
    url: 'https://www.geeksforgeeks.org/working-of-domain-name-system-dns-server/',
    readTime: '7 min read',
    difficulty: 'Beginner',
    summary: 'Recursive resolvers, Root Servers, Top-Level Domain (TLD) servers, and Authoritative Nameservers with A, AAAA, CNAME, and MX record lookups.',
    keyTakeaways: [
      'DNS queries typically run over UDP port 53 for low latency',
      'CNAME maps an alias name to canonical domain name',
      'TTL (Time to Live) governs how long resolvers cache DNS records'
    ],
    companiesAsked: ['Amazon', 'Akamai', 'Microsoft']
  },

  // OOPs Articles
  {
    id: 'gfg-art-oops-pillars',
    subjectId: 'oops',
    subjectTitle: 'Object Oriented Programming',
    title: 'The 4 Pillars of OOPs: Real-World Architecture & Examples',
    url: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/',
    readTime: '9 min read',
    difficulty: 'Beginner',
    summary: 'Encapsulation, Data Abstraction, Inheritance, and Polymorphism (Compile-time Method Overloading vs Runtime Method Overriding).',
    keyTakeaways: [
      'Encapsulation bundles data with methods and restricts direct access using access modifiers',
      'Abstraction hides internal complexity through Abstract Classes and Interfaces',
      'Dynamic dispatch in C++ uses VTable (Virtual Table) and VPTR'
    ],
    companiesAsked: ['Adobe', 'Walmart', 'Morgan Stanley', 'Amazon', 'Intuit']
  },
  {
    id: 'gfg-art-solid',
    subjectId: 'oops',
    subjectTitle: 'Object Oriented Programming',
    title: 'SOLID Principles in Object Oriented Design with Clean Code',
    url: 'https://www.geeksforgeeks.org/solid-principle-in-programming-understand-with-real-life-examples/',
    readTime: '12 min read',
    difficulty: 'Intermediate',
    summary: 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion with bad vs refactored code.',
    keyTakeaways: [
      'Open-Closed: Software entities should be open for extension, but closed for modification',
      'Liskov Substitution: Subtypes must be substitutable for their base types without altering correctness',
      'Dependency Inversion: High-level modules should depend on abstractions, not concrete implementations'
    ],
    companiesAsked: ['Google', 'Microsoft', 'Uber', 'Atlassian']
  }
];

// GFG Problem of the Day (POTD)
export const GFG_POTD = {
  date: 'Today',
  problemId: 'gfg-kadane',
  title: "Kadane's Algorithm (Maximum Subarray Sum)",
  points: 4,
  streakReward: '+10 PrepPulse XP & Free Study Garden Watering',
  tagline: 'Featured GeeksforGeeks Daily Problem',
  solvedCountToday: 24912
};
