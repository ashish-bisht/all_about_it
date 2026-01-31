// Heap Trie data
// Extracted from data.js

const topic_heap_trie = {
    id: "heap_trie",
    title: "Heaps & Tries",
    description: "Principal Engineer DSA • Day 8",
    color: "#d97706",
    icon: "fas fa-sitemap",
    mentalModel: {
        whenToApply: [
            { label: "🏆 Top K Elements", desc: "Find K largest/smallest → Min-Heap of size K" },
            { label: "🔀 Merge K Streams", desc: "Merge K sorted lists → Min-Heap with (val, idx, node)" },
            { label: "🔤 Prefix Search", desc: "Autocomplete, word search → Trie (O(L) lookup)" },
            { label: "⊕ Max XOR", desc: "Find max XOR pair → Binary Trie with opposite-bit path" },
            { label: "📊 Streaming Data", desc: "Maintain K best in stream → Min-Heap (VIP room analogy)" }
        ],
        patterns: [
            { algo: "Kth Largest (Min-Heap)", use: "Top K elements", time: "O(N log K)", space: "O(K)", template: "Min-heap size K, root = Kth largest" },
            { algo: "Merge K Lists", use: "Merge sorted streams", time: "O(N log K)", space: "O(K)", template: "(val, idx, node) tuple for tie-break" },
            { algo: "Trie Insert/Search", use: "Prefix matching", time: "O(L)", space: "O(N×L)", template: "children={}, isEnd=False per node" },
            { algo: "Binary Trie", use: "Max XOR pair", time: "O(N × 32)", space: "O(N × 32)", template: "Store bits, traverse opposite path" },
            { algo: "Heapify", use: "Build heap from array", time: "O(N)", space: "O(1)", template: "heapq.heapify(arr) - NOT O(N log N)!" }
        ],
        decisionTree: `
<div style="background:#1e293b; padding:25px; border-radius:16px; margin:15px 0; border:1px solid rgba(255,255,255,0.1);">
<h4 style="color:#a78bfa; margin-bottom:20px; text-align:center; font-size:1.1rem;">🧠 Heap & Trie Pattern Recognition</h4>
<div style="font-family:monospace; font-size:0.85rem; line-height:1.8;">
<pre style="color:#e2e8f0; text-align:left; margin:0;">
              ┌───────────────────────────┐
              │ "What's the core need?"   │
              └─────────────┬─────────────┘
                            │
      ┌─────────────────────┼─────────────────────┐
      ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   TOP K /     │    │ MERGE SORTED  │    │   PREFIX /    │
│   STREAMING   │    │   LISTS       │    │   STRINGS     │
└───────┬───────┘    └───────┬───────┘    └───────┬───────┘
        │                    │                    │
        ▼                    ▼                    ▼
  ┌───────────────┐    ┌───────────────┐    ┌───────────────┐
  │ K LARGEST?    │    │ Min-Heap with │    │ Autocomplete? │
  │ → MIN-HEAP    │    │ K heads       │    │ → TRIE        │
  │   size K      │    │ (val,idx,node)│    │               │
  │               │    │               │    │ XOR max?      │
  │ K SMALLEST?   │    │ Pop min,      │    │ → Binary Trie │
  │ → MAX-HEAP    │    │ push next     │    │               │
  └───────────────┘    └───────────────┘    └───────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │ 🎯 VIP ROOM ANALOGY:                                    │
  │ • Room capacity = K                                     │
  │ • Bouncer (min-heap root) = Kth largest                │
  │ • New person richer than bouncer? Kick bouncer out!     │
  └─────────────────────────────────────────────────────────┘
</pre>
</div>
</div>`,
        codeTemplates: `
<div style="background:#0f172a; padding:20px; border-radius:12px; margin:15px 0;">
<h4 style="color:#10b981; margin-bottom:15px;">📝 Heap & Trie Templates</h4>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
1️⃣ Kth Largest (Min-Heap size K)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
import heapq
class KthLargest:
    def __init__(self, k, nums):
        self.k, self.heap = k, []
        for n in nums: self.add(n)
    def add(self, val):
        if len(self.heap) < self.k:
            heapq.heappush(self.heap, val)
        elif val > self.heap[0]:
            heapq.heapreplace(self.heap, val)
        return self.heap[0]  # Kth largest = min of top K
</pre>
</details>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
2️⃣ Merge K Sorted Lists
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def mergeKLists(lists):
    pq = []
    for i, l in enumerate(lists):
        if l: heapq.heappush(pq, (l.val, i, l))  # i = tie-breaker!
    dummy = curr = ListNode()
    while pq:
        val, i, node = heapq.heappop(pq)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(pq, (node.next.val, i, node.next))
    return dummy.next
</pre>
</details>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
3️⃣ Trie Implementation
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
class TrieNode:
    def __init__(self):
        self.children = {}
        self.isEnd = False
class Trie:
    def __init__(self):
        self.root = TrieNode()
    def insert(self, word):
        cur = self.root
        for c in word:
            if c not in cur.children:
                cur.children[c] = TrieNode()
            cur = cur.children[c]
        cur.isEnd = True
    def search(self, word):
        cur = self.root
        for c in word:
            if c not in cur.children: return False
            cur = cur.children[c]
        return cur.isEnd  # Must be end of word!
</pre>
</details>

<details>
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
4️⃣ XOR Trick (Single Number)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
# A ^ A = 0, A ^ 0 = A
def singleNumber(nums):
    result = 0
    for num in nums:
        result ^= num
    return result
</pre>
</details>
</div>`,
        safetyCheck: [
            { label: "🔄 Min vs Max Heap!", desc: "Kth LARGEST → MIN-heap. Python heapq is min-heap by default." },
            { label: "⚠️ Tuple tie-breaker!", desc: "Merge K Lists: Use <code>(val, idx, node)</code> — nodes can't be compared!" },
            { label: "🔚 isEnd flag!", desc: "Trie: Don't forget <code>isEnd = True</code> at word end" },
            { label: "📏 Prefix vs Word!", desc: "startsWith → just traverse. search → must check isEnd" },
            { label: "⚡ Heapify is O(N)!", desc: "<code>heapq.heapify()</code> is O(N), NOT O(N log N)" },
            { label: "📦 Heap size K!", desc: "For top K, only keep K elements in heap, not all N" }
        ]
    },
    questions: [
        {
            id: "kth-largest-element-in-a-stream",
            title: "Kth Largest in Stream",
            leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Min-Heap"],
            quiz: {
                description: "Maintain Kth largest in streaming data. Data structure?",
                options: ["Sort list every time", "Max-Heap", "Min-Heap of size K", "BST"],
                correct: 2,
                explanation: "Min-Heap of size K! The root holds the K-th largest. If new val > root, pop root and push new val. Keep top K elements in the club; root is the 'bouncer' (smallest of the top K)."
            },
            learn: {
                quickAlgo: [
                    "class KthLargest:",
                    "    def __init__(self, k, nums):",
                    "        self.k = k",
                    "        self.heap = []",
                    "        for n in nums: self.add(n)",
                    "    def add(self, val):",
                    "        # 🎯 Min-Heap: Stores Top-K largest elements",
                    "        heapq.heappush(self.heap, val) # ⚡ Add new candidate",
                    "        if len(self.heap) > self.k:",
                    "            heapq.heappop(self.heap)   # 🔄 Remove smallest of the giants",
                    "        return self.heap[0]            # ✅ Root is the Kth largest"
                ],
                metrics: { time: "O(log K)", space: "O(K)" },
                timeExplainer: "<strong>Min-Heap:</strong><br>• Add element: <code>O(log K)</code><br>• Maintain size K<br><br><strong>Total:</strong> <code>O(log K)</code> per add",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Heap stores exactly K elements<br>• Ignore infinite stream history<br><br><strong>Result:</strong> <code>O(K)</code>",
                visual: "<span><strong>Visual: The VIP Room</strong><br>Room capacity K. Bouncer (Root) is the poorest VIP. <br>If new guy is richer than Bouncer, kick Bouncer out.</span>",
                crux: "<strong>Inverse Logic:</strong> Kth Largest -> Min-Heap.<br>1. Keep size <= K.<br>2. `heapq.heappushpop` if full.",
                trap: "<strong>Don't Heapify All:</strong> Only store K elements.",
                dryRun: ["K=3. Heap [?, ?, ?].", "Add 5, 2, 8 -> [2, 5, 8]. Root 2 is 3rd largest.", "Add 10. 10 > 2. Pop 2. Push 10. [5, 8, 10]. Root 5 is 3rd largest."],
                codeTitle: "Python Solution",
                code: `class KthLargest:
def __init__(self, k, nums):
    self.k = k
    self.heap = []
    for n in nums: self.add(n)
    
def add(self, val):
    if len(self.heap) < self.k:
        heapq.heappush(self.heap, val)
    elif val > self.heap[0]:
        heapq.heapreplace(self.heap, val)
    return self.heap[0]`
            }
        },
        {
            id: "merge-k-sorted-lists",
            title: "Merge K Sorted Lists",
            leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Heap"],
            quiz: {
                description: "Merge K lists efficiently.",
                options: ["Comparing heads one by one", "Min-Heap with (val, node)", "Merge 2 at a time", "Concatenate and sort"],
                correct: 1,
                explanation: "Min-Heap! Put all K heads in heap. Pop min, add to result, push next node from that list. O(N log K)."
            },
            learn: {
                quickAlgo: [
                    "heap = []                          # 🎯 Min-Heap: (val, index, node)",
                    "for i, l in enumerate(lists):",
                    "    if l: heapq.heappush(heap, (l.val, i, l)) # ⚡ Init heap with heads",
                    "dummy = curr = ListNode(0)",
                    "while heap:",
                    "    val, i, node = heapq.heappop(heap) # 🔄 Get smallest among K heads",
                    "    curr.next = node",
                    "    curr = curr.next",
                    "    if node.next:                  # ✅ Push next node from same list",
                    "        heapq.heappush(heap, (node.next.val, i, node.next))",
                    "return dummy.next"
                ],
                metrics: { time: "O(N log K)", space: "O(K)" },
                timeExplainer: "<strong>Heap Merge:</strong><br>• Heap size K (one per list)<br>• Process all N nodes<br>• Push/Pop is log K<br><br><strong>Total:</strong> <code>O(N log K)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Heap stores K nodes<br>• Output list not counted (if returning new)<br><br><strong>Result:</strong> <code>O(K)</code>",
                visual: "<span><strong>Visual: The Race</strong><br>K runners at start line. Move the leader forward.</span>",
                crux: "<strong>Tuple Trick:</strong> `(val, idx, node)`. Use `idx` to break ties because Python can't compare `ListNode` objects.",
                trap: "<strong>Comparsion Crash:</strong> Nodes with same value will crash heap if you don't use a tie-breaker or override `__lt__`.",
                dryRun: ["Heads: 1(L1), 4(L2), 2(L3). Heap: [(1, L1), (2, L3), (4, L2)].", "Pop 1. Push L1.next."],
                codeTitle: "Python Solution",
                code: `def mergeKLists(lists):
pq = []
for i, l in enumerate(lists):
    if l: heapq.heappush(pq, (l.val, i, l))

dummy = curr = ListNode()
while pq:
    val, i, node = heapq.heappop(pq)
    curr.next = node
    curr = curr.next
    if node.next:
        heapq.heappush(pq, (node.next.val, i, node.next))
        
return dummy.next`
            }
        },
        {
            id: "implement-trie-prefix-tree",
            title: "Implement Trie",
            leetcodeUrl: "https://leetcode.com/problems/implement-trie-prefix-tree/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Trie"],
            quiz: {
                description: "Data structure for fast prefix search.",
                options: ["HashMap", "Binary Search Tree", "Trie (Prefix Tree)", "Graph"],
                correct: 2,
                explanation: "Trie! Nodes represent characters. Path from root spells word. Shared prefixes share nodes (Space efficient)."
            },
            learn: {
                quickAlgo: [
                    "🎯 <strong>Trie Structure?</strong> String sharing space save karta hai (prefix 'app' shared by 'apple', 'app')",
                    "⚡ Node: <code>children = {}</code>, <code>isEnd = False</code>",
                    "🔄 Insert: Loop chars. If not in children, create new Node. Last node marked <code>isEnd=True</code>",
                    "✅ Search: Traverse path. If broken -> False. At end, check <code>isEnd</code>",
                    "💡 Prefix Search? Same as search, but don't check <code>isEnd</code>",
                    "<code>startsWith: traverse; return True if reached</code>",
                    "Path from root spells prefix"
                ],
                metrics: { time: "O(L)", space: "O(N*L)" },
                timeExplainer: "<strong>Prefix Tree:</strong><br>• Traversal depends only on word length L<br>• Independent of total words N<br><br><strong>Total:</strong> <code>O(L)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Worst: No common prefixes<br>• <code>N</code> words of length <code>L</code><br><br><strong>Total:</strong> <code>O(N×L)</code> nodes",
                visual: "<span><strong>Visual: Autocomplete</strong><br>APP -> 'A' -> 'P' -> 'P'. <br>APPLE -> Extends 'P' -> 'L' -> 'E'.</span>",
                crux: "<strong>Node Struct:</strong> `children = {}`, `is_end = False`.<br>Insert/Search: Traverse char by char.",
                trap: "<strong>Prefix vs Word:</strong> `startWith` returns True for 'APP'. `search` returns False for 'APP' if only 'APPLE' exists.",
                dryRun: ["Insert 'HI'. Root->H->I(end).", "Search 'H'. Root->H. No end. False.", "Starts 'H'. True."],
                codeTitle: "Python Solution",
                code: `class TrieNode:
def __init__(self):
    self.children = {}
    self.isEnd = False

class Trie:
def __init__(self):
    self.root = TrieNode()

def insert(self, word):
    cur = self.root
    for c in word:
        if c not in cur.children:
            cur.children[c] = TrieNode()
        cur = cur.children[c]
    cur.isEnd = True

def search(self, word):
    cur = self.root
    for c in word:
        if c not in cur.children: return False
        cur = cur.children[c]
    return cur.isEnd

def startsWith(self, prefix):
    cur = self.root
    for c in prefix:
        if c not in cur.children: return False
        cur = cur.children[c]
    return True`
            }
        },
        {
            id: "maximum-xor-of-two-numbers-in-an-array",
            title: "Max XOR of Two Numbers",
            leetcodeUrl: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
            difficulty: "Good to Do",
            priority: "🟡",
            tags: ["Trie", "Bit Manipulation"],
            quiz: {
                description: "Find max XOR of two nums in array. O(N)?",
                options: ["Brute Force O(N²)", "Trie", "Sort", "Heap"],
                correct: 1,
                explanation: "Insert all numbers into a Binary Trie. For each number, try to traverse the opposite bit path to maximize XOR."
            },
            learn: {
                quickAlgo: [
                    "counts = Counter(tasks)",
                    "maxHeap = [-cnt for cnt in counts.values()] # 🎯 Max Frequency first",
                    "heapq.heapify(maxHeap)",
                    "q = deque()                        # ⚡ Queue: (count, available_time)",
                    "time = 0",
                    "while maxHeap or q:",
                    "    time += 1",
                    "    if maxHeap:                    # 🔄 Process task",
                    "        cnt = heapq.heappop(maxHeap) + 1 # Decr count (negative logic)",
                    "        if cnt: q.append((cnt, time + n)) # ✅ Add to wait queue",
                    "    if q and q[0][1] == time:      # 💡 Task becomes available again",
                    "        heapq.heappush(maxHeap, q.popleft()[0])",
                    "return time"
                ],
                metrics: { time: "O(N * 32)", space: "O(N * 32)" },
                code: `# Trie Implementation needed`
            }
        },
        {
            id: "single-number",
            title: "Single Number",
            leetcodeUrl: "https://leetcode.com/problems/single-number/",
            difficulty: "Bonus",
            priority: "🟢",
            tags: ["Bit Manipulation"],
            quiz: {
                description: "All nums appear twice except one. O(N) time, O(1) space?",
                options: ["HashSet", "Sorting", "XOR all numbers", "Math"],
                correct: 2,
                explanation: "A ^ A = 0. A ^ 0 = A. XORing all numbers cancels out pairs, leaving the single number."
            },
            learn: {
                quickAlgo: [
                    "small, large = [], []              # 🎯 Small: Max-Heap, Large: Min-Heap",
                    "def addNum(num):",
                    "    heapq.heappush(small, -num)    # ⚡ Always push to Small first",
                    "    # 🔄 Balance: Max(Small) <= Min(Large)",
                    "    if small and large and (-small[0] > large[0]):",
                    "        heapq.heappush(large, -heapq.heappop(small))",
                    "    # ✅ Size Balance: len(Small) roughly len(Large)",
                    "    if len(small) > len(large) + 1:",
                    "        heapq.heappush(large, -heapq.heappop(small))",
                    "    elif len(large) > len(small):",
                    "        heapq.heappush(small, -heapq.heappop(large))"
                ],
                metrics: { time: "O(N)", space: "O(1)" },
                code: `def singleNumber(nums):
res = 0
for n in nums:
    res ^= n
return res`
            }
        },
        {
            id: "heapify-algorithm",
            title: "Heapify Algorithm",
            difficulty: "Bonus",
            priority: "🟢",
            tags: ["Heap"],
            quiz: {
                description: "Convert array to heap. Complexity?",
                options: ["O(N log N)", "O(N)", "O(log N)", "O(N²)"],
                correct: 1,
                explanation: "O(N)! Sift-down from the last non-leaf node up to root. Lower levels have less work."
            },
            learn: {
                quickAlgo: [
                    "🎯 <strong>O(N) vs O(NlogN)?</strong> Build Heap from bottom-up is faster (Sift Level-by-Level)",
                    "⚡ Start: Last non-leaf node (index <code>N//2 - 1</code>)",
                    "🔄 Loop Backwards: Call <code>sift_down(i)</code> for each node upto root",
                    "✅ Why O(N)? Most nodes are leaves (0 work). Work decreases as levels go up.",
                    "💡 <code>push</code> N times is O(NlogN). This is efficient batch build."
                ],
                metrics: { time: "O(N)", space: "O(1)" },
                code: `import heapq
def heapify(arr):
heapq.heapify(arr) # Linear time O(N)
return arr`
            }
        }
    ]
}
