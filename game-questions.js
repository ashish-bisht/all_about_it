        const questionBank = {
            arrays: [
                {
                    title: "Two Sum",
                    description: "Given an array and target, find two numbers that add up to target. What's the optimal approach?",
                    options: [
                        "Brute Force O(n²) - Check all pairs",
                        "HashMap O(n) - Store complements as you iterate",
                        "Two Pointers O(n log n) - Sort then scan",
                        "Binary Search O(n log n) - Sort and search for each element"
                    ],
                    correct: 1,
                    explanation: "HashMap is KING! As you iterate, check if (target - current) exists in map. If yes, found! If no, store current. One pass: O(n) time, O(n) space. Warm-up in 20% of interviews!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "3 Sum",
                    description: "Find all triplets that sum to zero. Best approach to avoid duplicates?",
                    options: [
                        "Three nested loops O(n³)",
                        "HashMap with pair sums O(n²) space",
                        "Sort + Two Pointers O(n²) time, O(1) space",
                        "Backtracking O(2ⁿ)"
                    ],
                    correct: 2,
                    explanation: "Sort first! Fix one element, use two pointers on rest. Skip duplicates by checking if current == previous. This is THE standard pattern for multi-pointer problems. O(n²) time!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Kadane's Algorithm (Max Subarray)",
                    description: "Find maximum sum of contiguous subarray. What's the DP optimization?",
                    options: [
                        "Check all subarrays O(n³)",
                        "Prefix sums O(n²)",
                        "Kadane's: currSum = max(arr[i], currSum + arr[i])",
                        "Divide and Conquer O(n log n)"
                    ],
                    correct: 2,
                    explanation: "Kadane's is GENIUS! Keep running sum. If it goes negative, reset to 0 (or current element). Track global max. O(n) time, O(1) space. Foundation for many DP problems!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Product of Array Except Self",
                    description: "Return array where output[i] = product of all except nums[i], WITHOUT division. How?",
                    options: [
                        "Divide total product by nums[i]",
                        "Prefix product from left × Suffix product from right",
                        "Nested loops O(n²)",
                        "Use logarithms to convert to addition"
                    ],
                    correct: 1,
                    explanation: "Prefix × Suffix magic! First pass: prefix[i] = product of all left elements. Second pass: suffix from right. Result[i] = prefix[i] × suffix[i]. O(n) time! Microsoft/Amazon favorite.",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Trapping Rain Water",
                    description: "Calculate water trapped between bars. What's the optimal pattern?",
                    options: [
                        "For each bar, find max left & right O(n²)",
                        "Pre-compute max arrays O(n) space",
                        "Two pointers from both ends O(1) space",
                        "Stack-based approach O(n)"
                    ],
                    correct: 2,
                    explanation: "Two pointers is ELITE! Start from both ends with left_max, right_max. Water at position = min(left_max, right_max) - height. Move smaller pointer inward. O(n) time, O(1) space!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Merge Intervals",
                    description: "Merge all overlapping intervals. What's the first critical step?",
                    options: [
                        "Use Union-Find",
                        "Sort by start time, then merge linearly",
                        "Build interval tree",
                        "Check every pair O(n²)"
                    ],
                    correct: 1,
                    explanation: "SORT FIRST by start time! Then iterate: if current.start <= last.end, they overlap - merge. Else, add current to result. O(n log n) for sort, O(n) for merge. Standard interval pattern!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Meeting Rooms II",
                    description: "Find minimum meeting rooms needed. Best data structure?",
                    options: [
                        "Sort by start time, count overlaps",
                        "Min Heap of end times",
                        "Interval tree",
                        "Greedy with sorting both start and end arrays"
                    ],
                    correct: 1,
                    explanation: "Min Heap FTW! Sort by start time. For each meeting, if heap top (earliest end) < current start, reuse room (pop heap). Always push current end time. Heap size = rooms needed. O(n log n)!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Longest Substring Without Repeating",
                    description: "Find longest substring with all unique characters. What's the sliding window logic?",
                    options: [
                        "Try all substrings O(n³)",
                        "HashMap + Sliding window with left pointer jump",
                        "Set + Two pointers expanding right",
                        "Binary search on length"
                    ],
                    correct: 1,
                    explanation: "HashMap + Sliding Window! Store char → index. When duplicate found, jump LEFT pointer to max(left, map[char] + 1). Track max length. This is THE 'Hello World' of sliding window! O(n).",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Substring with K Distinct Characters",
                    description: "Find longest substring with exactly K distinct chars. Pattern?",
                    options: [
                        "Fixed window sliding",
                        "Variable window: expand right, shrink when > K distinct",
                        "HashMap + Binary search",
                        "DP with memoization"
                    ],
                    correct: 1,
                    explanation: "Variable Sliding Window! HashMap tracks char count. Expand right always. When distinct > K, shrink from left until == K. Track max. Classic pattern for 'at most K' problems!",
                    difficulty: "Good to Do",
                    priority: "🟡"
                },
                {
                    title: "Maximum Product Subarray",
                    description: "Handle negative numbers in product. What's the trick?",
                    options: [
                        "Kadane's algorithm works directly",
                        "Track both max AND min products (negatives flip)",
                        "Divide and Conquer",
                        "Use logarithms"
                    ],
                    correct: 1,
                    explanation: "Track MAX and MIN! Negatives flip signs, so min can become max. At each step: new_max = max(num, num × max_prod, num × min_prod). Same for min. Tricky Kadane variation!",
                    difficulty: "Good to Do",
                    priority: "🟡"
                },
                {
                    title: "Subarrays with XOR K",
                    description: "Count subarrays with XOR = K. Which pattern applies?",
                    options: [
                        "Sliding window",
                        "HashMap + Prefix XOR (XOR is reversible!)",
                        "Two pointers",
                        "Segment tree"
                    ],
                    correct: 1,
                    explanation: "HashMap + Prefix XOR! Key insight: if prefix_xor[i] ⊕ K exists in map, we have a subarray. XOR property: a ⊕ b = c means a ⊕ c = b. Not just sliding window!",
                    difficulty: "Good to Do",
                    priority: "🟡"
                },
                {
                    title: "Sort Colors (Dutch National Flag)",
                    description: "Sort 0s, 1s, 2s in-place. Optimal approach?",
                    options: [
                        "Counting sort O(n) with two passes",
                        "QuickSort O(n log n)",
                        "3-way partitioning with low, mid, high pointers O(n) one pass",
                        "Bucket sort"
                    ],
                    correct: 2,
                    explanation: "Dutch Flag 3-pointer! low, mid, high. 0s go left (swap with low++), 2s go right (swap with high--), 1s stay mid (mid++). Single pass O(n), O(1) space. Beautiful partitioning!",
                    difficulty: "Bonus",
                    priority: "🟢"
                }
            ],
            
            binary_search: [
                {
                    title: "Search Rotated Sorted Array II",
                    description: "Array has duplicates. What breaks normal binary search?",
                    options: [
                        "Nothing, works normally",
                        "When nums[low] == nums[mid] == nums[high], can't determine sorted half",
                        "Pivot point becomes undefined",
                        "Multiple targets possible"
                    ],
                    correct: 1,
                    explanation: "Duplicates create 'fog'! When nums[low] == nums[mid] == nums[high], we can't tell which side is sorted. Solution: Shrink window (low++, high--) until fog clears. Worst case O(n)!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Koko Eating Bananas",
                    description: "Find minimum eating speed. What do we binary search on?",
                    options: [
                        "Binary search the piles array",
                        "Binary search the ANSWER (speed range [1, max_pile])",
                        "Greedy selection",
                        "DP on remaining piles"
                    ],
                    correct: 1,
                    explanation: "Binary Search on ANSWER! Search space = [1, max(piles)]. For each speed, calculate hours. If ≤ h, try slower (right = mid - 1). If > h, must go faster (left = mid + 1). Classic pattern!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Aggressive Cows (Min-Max Allocation)",
                    description: "Maximize minimum distance between cows. What's the first step?",
                    options: [
                        "Greedy placement",
                        "SORT stalls first! Then BS on distance",
                        "DP on positions",
                        "Try all combinations"
                    ],
                    correct: 1,
                    explanation: "SORT + BS on Answer! Sort stalls. Binary search on distance [1, max-min]. For each distance, greedily try to place K cows. If successful, try larger distance (left = mid + 1). Min-Max pattern!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Median of Two Sorted Arrays",
                    description: "Find median in O(log(min(m,n))). What's the trick?",
                    options: [
                        "Merge both arrays O(m+n)",
                        "Partition smaller array, calculate j automatically",
                        "Binary search both arrays",
                        "Two pointers"
                    ],
                    correct: 1,
                    explanation: "Partition + Virtual Infinity! BS on smaller array (cut at i). Calculate j for larger array: j = (m+n+1)/2 - i. Valid when maxLeft_X ≤ minRight_Y and maxLeft_Y ≤ minRight_X. Handle edges with ±∞!",
                    difficulty: "Good to Do",
                    priority: "🟡"
                }
            ],

            linked_list: [
                {
                    title: "LRU Cache",
                    description: "Implement get() and put() in O(1). Which data structures?",
                    options: [
                        "HashMap only",
                        "Doubly Linked List + HashMap (key → node)",
                        "Array + HashMap",
                        "Queue + HashMap"
                    ],
                    correct: 1,
                    explanation: "Doubly LL + HashMap! HashMap for O(1) lookup. DLL for O(1) removal/insertion at head/tail. Get: move to head. Put: if full, remove tail. Add to head. #1 design question!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Reverse Linked List in K Groups",
                    description: "Reverse every K nodes. What's the challenge?",
                    options: [
                        "Standard reversal works",
                        "Need to track: prev_group_end, curr_group, next_group_start",
                        "Use recursion only",
                        "Convert to array"
                    ],
                    correct: 1,
                    explanation: "Pointer management mastery! For each group: reverse K nodes internally. Connect prev_group.next to new head. Connect new tail to next_group. Edge cases: < K nodes at end (don't reverse).",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Detect Loop Start (Floyd's Cycle)",
                    description: "Find WHERE the cycle starts. What's the math?",
                    options: [
                        "HashMap to find first revisited node",
                        "Slow/Fast meet, then reset slow to head, move both by 1",
                        "Mark nodes (modify structure)",
                        "Count nodes in cycle"
                    ],
                    correct: 1,
                    explanation: "Floyd's Math! After slow/fast meet, reset slow to head. Move both by 1 step. They meet AT cycle start! Why? Distance from head to start = distance from meeting point to start (proven by math)!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Clone List with Random Pointer",
                    description: "Deep copy with random pointers. Best approach?",
                    options: [
                        "HashMap: old_node → new_node, then copy random",
                        "Interleaving: insert copies between originals, then separate",
                        "Recursion with memo",
                        "Modify original structure"
                    ],
                    correct: 0,
                    explanation: "HashMap approach is cleaner! First pass: create all new nodes in map. Second pass: copy next and random using map. Interleaving works but trickier. Both O(n) time/space.",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Palindrome Linked List",
                    description: "Check palindrome in O(n) time, O(1) space. How?",
                    options: [
                        "Convert to array O(n) space",
                        "Find mid (slow/fast), reverse second half, compare",
                        "Recursion O(n) stack",
                        "Use stack O(n) space"
                    ],
                    correct: 1,
                    explanation: "Find mid + Reverse! Use slow/fast to find middle. Reverse second half. Compare first and second halves. Optional: reverse back to restore. O(n) time, O(1) space!",
                    difficulty: "Bonus",
                    priority: "🟢"
                }
            ],

            stack: [
                {
                    title: "Next Greater Element",
                    description: "For each element, find next greater to the right. Pattern?",
                    options: [
                        "Nested loops O(n²)",
                        "Monotonic Decreasing Stack (traverse right to left)",
                        "Binary search O(n log n)",
                        "Heap-based"
                    ],
                    correct: 1,
                    explanation: "Monotonic Stack! Traverse right to left. If current > stack.top, current is NGE for top (pop and record). Push current. Stack maintains decreasing order. O(n) time and space!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Largest Rectangle in Histogram",
                    description: "Find max rectangle area. What's the boss-level trick?",
                    options: [
                        "Brute force all rectangles O(n²)",
                        "Monotonic Increasing Stack with index tracking",
                        "Divide and Conquer O(n log n)",
                        "DP O(n²)"
                    ],
                    correct: 1,
                    explanation: "Monotonic Stack MASTERY! Maintain increasing heights with indices. When current < stack top, pop and calculate area: height[top] × (current_idx - stack.peek() - 1). This is THE boss-level stack problem!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Trapping Rain Water (Stack Version)",
                    description: "Solve using stack instead of two pointers. How?",
                    options: [
                        "Monotonic decreasing stack",
                        "Store indices, calculate water when finding taller bar",
                        "Prefix max arrays",
                        "Greedy approach"
                    ],
                    correct: 1,
                    explanation: "Stack stores indices! When current > stack.top, water can be trapped. Pop top, calculate width × min(current, new_top) - popped_height. Different approach, same O(n) complexity!",
                    difficulty: "Good to Do",
                    priority: "🟡"
                },
                {
                    title: "Asteroid Collision",
                    description: "Asteroids collide if moving towards each other. Pattern?",
                    options: [
                        "Queue-based simulation",
                        "Stack: push right-moving, check collisions with left-moving",
                        "Greedy selection",
                        "DP"
                    ],
                    correct: 1,
                    explanation: "Stack simulation! Push positive (→). When negative (←) comes: while stack top is positive and smaller, pop (destroyed). If equal, both destroyed. If stack empty or top negative, push. Clean LIFO logic!",
                    difficulty: "Bonus",
                    priority: "🟢"
                }
            ],

            trees: [
                {
                    title: "Lowest Common Ancestor (Binary Tree)",
                    description: "Find LCA in general binary tree. Best approach?",
                    options: [
                        "Find paths to both, compare",
                        "Recursive: if root is p or q, return root. Combine left/right results",
                        "Level-order with parent tracking",
                        "Iterative with stack"
                    ],
                    correct: 1,
                    explanation: "Recursive DFS! Base: if root == p or q or null, return root. Recurse left and right. If both return non-null, root is LCA. If only one, return that. Elegant O(n) solution!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Serialize and Deserialize Binary Tree",
                    description: "Convert tree to string and back. Best traversal?",
                    options: [
                        "Inorder (loses structure)",
                        "Preorder with null markers",
                        "Postorder",
                        "Level-order with queue"
                    ],
                    correct: 1,
                    explanation: "Preorder + null markers! Serialize: '1,2,null,null,3,4,null,null,5'. Deserialize: use iterator/index. If 'null', return null. Else create node, recurse left, right. Very common in system design too!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Binary Tree Maximum Path Sum",
                    description: "Path can start/end anywhere. What's the trick?",
                    options: [
                        "Try all paths O(n²)",
                        "DFS: track global max, return single-path max upward",
                        "DP on tree",
                        "BFS level-wise"
                    ],
                    correct: 1,
                    explanation: "Global vs Local! At each node: global_max = max(global_max, node + left_max + right_max). But return upward: node + max(left_max, right_max, 0). Hard recursion pattern!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Construct Tree from Preorder + Inorder",
                    description: "Rebuild tree from two traversals. Key insight?",
                    options: [
                        "Preorder gives roots in order, Inorder gives left/right split",
                        "Hash inorder indices, recursively partition",
                        "Use stack-based iteration",
                        "Level-order construction"
                    ],
                    correct: 0,
                    explanation: "Preorder[0] = root! Find root in inorder → left subtree is inorder[0:root_idx], right is inorder[root_idx+1:]. Recurse. HashMap for O(1) inorder lookup. Master indexing!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Vertical Order Traversal",
                    description: "Print nodes by vertical column. Data structure?",
                    options: [
                        "BFS only",
                        "DFS with (row, col) coordinates + TreeMap/sorting",
                        "Inorder traversal",
                        "Level-order only"
                    ],
                    correct: 1,
                    explanation: "DFS + Coordinates! Track (row, col) for each node. Left child: col-1, Right: col+1. Store in map[col] → list of (row, val). Sort by col, then row, then val. Requires map + sorting!",
                    difficulty: "Good to Do",
                    priority: "🟡"
                },
                {
                    title: "LCA in BST",
                    description: "Optimize for BST property. How?",
                    options: [
                        "Same as general tree",
                        "If both < root, go left. If both > root, go right. Else root is LCA",
                        "Inorder traversal",
                        "Build parent pointers"
                    ],
                    correct: 1,
                    explanation: "BST property wins! No recursion needed - iterative O(h). If p and q both < root, LCA in left. Both > root, LCA in right. Otherwise, current root is LCA (split point)!",
                    difficulty: "Good to Do",
                    priority: "🟡"
                },
                {
                    title: "Largest BST in Binary Tree",
                    description: "Find size of largest BST subtree. Approach?",
                    options: [
                        "Check each subtree separately O(n²)",
                        "Bottom-up DP: return (isBST, size, min, max)",
                        "Top-down DFS",
                        "Level-order"
                    ],
                    correct: 1,
                    explanation: "Bottom-up DP on trees! Each node returns: is_valid_bst, size, min_val, max_val. Parent checks: left.max < root < right.min. If valid, combine sizes. Single O(n) pass!",
                    difficulty: "Bonus",
                    priority: "🟢"
                },
                {
                    title: "Burn a Binary Tree",
                    description: "Tree burns from a node. Time to burn all? Pattern?",
                    options: [
                        "BFS from start node",
                        "Convert to graph (parent pointers), multi-source BFS",
                        "DFS only",
                        "Level-order"
                    ],
                    correct: 1,
                    explanation: "Tree → Graph! Add parent pointers (or build adjacency). BFS from start node treating it as undirected graph. Track visited to avoid cycles. Distance = max level. Modified BFS/DFS on trees!",
                    difficulty: "Bonus",
                    priority: "🟢"
                }
            ],

            graphs: [
                {
                    title: "Rotten Oranges",
                    description: "Multi-source BFS. What's different from single-source?",
                    options: [
                        "Nothing, same algorithm",
                        "Add ALL rotten oranges to queue initially, then BFS",
                        "Run BFS from each rotten orange separately",
                        "DFS from each source"
                    ],
                    correct: 1,
                    explanation: "Multi-source BFS! Add all initial rotten oranges to queue at once. BFS spreads simultaneously. Track levels for time. Check if any fresh orange remains unreachable. Pattern for parallel spreading!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Course Schedule (Topological Sort)",
                    description: "Detect cycle in directed graph + find order. Algorithm?",
                    options: [
                        "BFS (Kahn's): in-degree tracking",
                        "DFS with recursion stack (detect cycle)",
                        "Both work! Kahn's gives topo order, DFS detects cycle",
                        "Union-Find"
                    ],
                    correct: 2,
                    explanation: "Both approaches! Kahn's: in-degree array, process 0-degree nodes, reduce neighbors. If processed < V, cycle exists. DFS: recursion stack for cycle detection. Master both for dependency resolution!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Dijkstra's Shortest Path",
                    description: "Find shortest path with positive weights. Data structure?",
                    options: [
                        "BFS (only works for unweighted)",
                        "Min Heap (Priority Queue) + distance array",
                        "DFS",
                        "Bellman-Ford"
                    ],
                    correct: 1,
                    explanation: "Min Heap + Greedy! Start with source (dist=0). Extract min, relax neighbors: if dist[u] + weight < dist[v], update and push to heap. Doesn't work with negative weights (use Bellman-Ford)!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Disjoint Set Union (DSU / Union-Find)",
                    description: "Optimize union and find operations. Techniques?",
                    options: [
                        "Simple parent array O(n) per operation",
                        "Path Compression + Union by Rank → α(n) amortized",
                        "BFS/DFS for each query",
                        "HashMap-based"
                    ],
                    correct: 1,
                    explanation: "Path Compression + Rank! Find: compress path to root during traversal. Union: attach smaller tree under larger (by rank/size). Nearly O(1) amortized! Critical for Kruskal's MST!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Clone Graph",
                    description: "Deep copy graph with references. Approach?",
                    options: [
                        "DFS/BFS with HashMap (old_node → new_node)",
                        "Just copy node values",
                        "Recursion without memo",
                        "Topological sort"
                    ],
                    correct: 0,
                    explanation: "HashMap + DFS/BFS! Map old nodes to new clones. Visit each node: if not in map, create clone. Recurse/iterate through neighbors, adding clones. Handles cycles with visited tracking!",
                    difficulty: "Good to Do",
                    priority: "🟡"
                },
                {
                    title: "Detect Cycle in Directed Graph",
                    description: "What's different from undirected cycle detection?",
                    options: [
                        "Same as undirected",
                        "DFS with recursion stack (in current path)",
                        "BFS only",
                        "Union-Find"
                    ],
                    correct: 1,
                    explanation: "Recursion Stack! Track 'visited' globally and 'rec_stack' for current path. Cycle if we reach a node in rec_stack (back edge). For undirected, simpler: cycle if neighbor is visited and not parent!",
                    difficulty: "Good to Do",
                    priority: "🟡"
                },
                {
                    title: "Bipartite Graph Check",
                    description: "Check if graph can be 2-colored. Algorithm?",
                    options: [
                        "DFS/BFS with color array (0/1)",
                        "Topological sort",
                        "Dijkstra's",
                        "MST algorithms"
                    ],
                    correct: 0,
                    explanation: "Graph Coloring! BFS/DFS with 2 colors. Start with color 0. Neighbors get opposite color. If neighbor already has same color, not bipartite. Works for undirected graphs!",
                    difficulty: "Bonus",
                    priority: "🟢"
                }
            ],

            dp: [
                {
                    title: "House Robber",
                    description: "Can't rob adjacent houses. Recurrence relation?",
                    options: [
                        "dp[i] = max(rob[i], rob[i-1])",
                        "dp[i] = max(arr[i] + dp[i-2], dp[i-1])",
                        "Greedy (pick max)",
                        "Backtracking all combinations"
                    ],
                    correct: 1,
                    explanation: "1D DP decision! At each house: either rob (add to dp[i-2]) or skip (take dp[i-1]). dp[i] = max(arr[i] + dp[i-2], dp[i-1]). Classic pick-or-skip pattern!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Longest Increasing Subsequence (LIS)",
                    description: "What's the O(n log n) optimization?",
                    options: [
                        "DP O(n²) is optimal",
                        "Binary Search + Patience Sort (tails array)",
                        "Greedy O(n)",
                        "Divide and Conquer"
                    ],
                    correct: 1,
                    explanation: "Patience Sort! Maintain 'tails' array where tails[i] = smallest ending element of LIS with length i+1. For each num, binary search position in tails. Replace or append. Brilliant O(n log n)!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Longest Common Subsequence (LCS)",
                    description: "LCS of two strings. Recurrence?",
                    options: [
                        "If s1[i] == s2[j]: 1 + dp[i-1][j-1], else: max(dp[i-1][j], dp[i][j-1])",
                        "Sliding window",
                        "Greedy matching",
                        "KMP algorithm"
                    ],
                    correct: 0,
                    explanation: "2D Grid DP! If chars match: 1 + diagonal. Else: max(top, left). Build table bottom-up. This is THE foundation for string DP problems. O(m×n) time/space!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Coin Change (Minimum Coins)",
                    description: "Make amount with fewest coins. Why does greedy fail?",
                    options: [
                        "Greedy always works",
                        "Greedy fails for coins like [1,3,4] making 6 (greedy: 4+1+1, optimal: 3+3)",
                        "DP not needed",
                        "Use backtracking"
                    ],
                    correct: 1,
                    explanation: "DP Bottom-up! dp[i] = min coins for amount i. For each amount, try each coin: dp[i] = min(dp[i], 1 + dp[i-coin]). Greedy fails! Classic unbounded knapsack. O(amount × coins).",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Word Break",
                    description: "Can string be segmented into dictionary words? Pattern?",
                    options: [
                        "Greedy matching",
                        "DP: dp[i] = can segment s[0:i], check all word endings",
                        "Backtracking only",
                        "Trie + DFS"
                    ],
                    correct: 1,
                    explanation: "String DP! dp[i] = true if s[0:i] can be segmented. For each i, check all j where s[j:i] is in dict and dp[j] is true. O(n² × avg_word_len). Google favorite!",
                    difficulty: "Good to Do",
                    priority: "🟡"
                },
                {
                    title: "0/1 Knapsack (Subset Sum)",
                    description: "Can we partition array into equal sums? Optimization?",
                    options: [
                        "Check all subsets O(2ⁿ)",
                        "DP: dp[i][sum] = can make sum with first i elements",
                        "Greedy",
                        "Sorting helps"
                    ],
                    correct: 1,
                    explanation: "2D DP Knapsack! dp[i][j] = can make sum j using first i elements. Choice: include arr[i] (dp[i-1][j-arr[i]]) or exclude (dp[i-1][j]). Space optimize to 1D!",
                    difficulty: "Good to Do",
                    priority: "🟡"
                },
                {
                    title: "Edit Distance (Levenshtein)",
                    description: "Min operations to convert s1 to s2. Recurrence?",
                    options: [
                        "If s1[i] == s2[j]: dp[i-1][j-1], else: 1 + min(insert, delete, replace)",
                        "LCS-based",
                        "Greedy character matching",
                        "KMP modification"
                    ],
                    correct: 0,
                    explanation: "2D DP String Manipulation! If chars match: take diagonal (no op). Else: 1 + min(dp[i-1][j] delete, dp[i][j-1] insert, dp[i-1][j-1] replace). Classic string DP!",
                    difficulty: "Good to Do",
                    priority: "🟡"
                }
            ],

            heap_trie: [
                {
                    title: "Kth Largest Element in Stream",
                    description: "Maintain kth largest as stream flows. Which heap?",
                    options: [
                        "Max Heap of all elements",
                        "Min Heap of size K (top is kth largest)",
                        "Array with sorting",
                        "BST"
                    ],
                    correct: 1,
                    explanation: "Min Heap of size K! Heap top = kth largest always. For new element: if > top, remove top and add new. Maintains K largest elements. O(log K) per insertion!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Merge K Sorted Lists",
                    description: "Merge K linked lists efficiently. Best approach?",
                    options: [
                        "Merge two at a time O(NK log K)",
                        "Min Heap of (value, list_idx, node) → O(N log K)",
                        "Divide and Conquer O(N log K)",
                        "Merge all into array then sort O(N log N)"
                    ],
                    correct: 1,
                    explanation: "Min Heap FTW! Push first node of each list. Extract min, add to result, push next node from that list. Heap size = K always. O(N log K) where N = total nodes!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Implement Trie (Prefix Tree)",
                    description: "Insert, search, startsWith operations. Node structure?",
                    options: [
                        "Array of children[26], isEnd flag",
                        "HashMap of children, isEnd flag",
                        "Both work! Array for lowercase only, HashMap for any chars",
                        "Binary tree"
                    ],
                    correct: 2,
                    explanation: "TrieNode = {children: [26] or HashMap, isEndOfWord}. Insert: traverse/create path. Search: check isEnd. StartsWith: just traverse path. O(word_length) for all ops!",
                    difficulty: "Must Do",
                    priority: "🔴"
                },
                {
                    title: "Maximum XOR of Two Numbers",
                    description: "Find max XOR of any two numbers in array. Optimize?",
                    options: [
                        "Brute force all pairs O(n²)",
                        "Trie of binary representations + Greedy bit selection",
                        "Sorting helps",
                        "HashMap"
                    ],
                    correct: 1,
                    explanation: "Trie + Bit Manipulation! Build trie of binary representations (32 bits). For each number, greedily select opposite bit at each level to maximize XOR. O(32n) = O(n)!",
                    difficulty: "Good to Do",
                    priority: "🟡"
                },
                {
                    title: "N-Queens",
                    description: "Place N queens on N×N board. Core technique?",
                    options: [
                        "Greedy placement",
                        "Backtracking with column, diagonal, anti-diagonal tracking",
                        "DP",
                        "BFS"
                    ],
                    correct: 1,
                    explanation: "Backtracking! Place queen row by row. Track attacked columns, diagonals (row-col), anti-diagonals (row+col). If safe, place and recurse. Standard backtracking with constraint checking!",
                    difficulty: "Good to Do",
                    priority: "🟡"
                },
                {
                    title: "Permutations",
                    description: "Generate all permutations. Backtracking approach?",
                    options: [
                        "Iterative generation",
                        "Backtracking with swap/unswap or used[] array",
                        "BFS with state",
                        "DP"
                    ],
                    correct: 1,
                    explanation: "Backtracking state tree! Method 1: Swap elements, recurse, swap back. Method 2: Use 'used' array, build permutation, backtrack. Both O(n!) time. Master state space exploration!",
                    difficulty: "Good to Do",
                    priority: "🟡"
                },
                {
                    title: "Single Number (XOR Trick)",
                    description: "Find the one number appearing once (others appear twice). How?",
                    options: [
                        "HashMap counting",
                        "XOR all numbers (A ⊕ A = 0, A ⊕ 0 = A)",
                        "Sorting",
                        "Set difference"
                    ],
                    correct: 1,
                    explanation: "XOR Magic! XOR all numbers. Duplicates cancel (A ⊕ A = 0). Result = unique number. O(n) time, O(1) space. Beautiful bit manipulation trick!",
                    difficulty: "Bonus",
                    priority: "🟢"
                },
                {
                    title: "Heapify Algorithm",
                    description: "Convert array to heap. Why O(N) not O(N log N)?",
                    options: [
                        "Start from leaves (no heapify needed)",
                        "Start from last non-leaf, heapify down. Most nodes are near leaves!",
                        "Both take O(N log N)",
                        "Magic"
                    ],
                    correct: 1,
                    explanation: "Bottom-up heapify! Start from n/2-1 (last non-leaf), heapify down. Leaves are already heaps. Math: most nodes at bottom, few at top. Total work = O(n), not O(n log n)!",
                    difficulty: "Bonus",
                    priority: "🟢"
                }
            ]
        };
