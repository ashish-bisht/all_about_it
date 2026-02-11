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
                visual: `
                    <h4 style="color:#c026d3;">🎪 VIP Room: Min-Heap of Size K</h4>
                    <div style="display:flex; flex-direction:column; gap:12px; margin:15px 0; max-width:550px;">
                        <div style="display:flex; flex-wrap:wrap; gap:12px; justify-content:center;">
                            <div style="background:#1e293b; padding:14px; border-radius:10px; text-align:center; min-width:160px;">
                                <div style="font-size:0.8rem; color:#94a3b8; margin-bottom:8px;">K=3, Heap:</div>
                                <div style="display:flex; gap:6px; justify-content:center;">
                                    <span style="width:36px; height:36px; border-radius:50%; background:rgba(248,113,113,0.15); border:2px solid #f87171; display:flex; align-items:center; justify-content:center; font-family:monospace; color:#f87171; font-weight:bold; font-size:0.85rem;">4</span>
                                    <span style="width:36px; height:36px; border-radius:50%; background:rgba(74,222,128,0.15); border:2px solid #4ade80; display:flex; align-items:center; justify-content:center; font-family:monospace; color:#4ade80; font-weight:bold; font-size:0.85rem;">5</span>
                                    <span style="width:36px; height:36px; border-radius:50%; background:rgba(74,222,128,0.15); border:2px solid #4ade80; display:flex; align-items:center; justify-content:center; font-family:monospace; color:#4ade80; font-weight:bold; font-size:0.85rem;">8</span>
                                </div>
                                <div style="font-size:0.75rem; color:#f87171; margin-top:6px;">↑ Root = Kth largest (min)</div>
                            </div>
                            <div style="display:flex; align-items:center; color:#64748b; font-size:0.85rem;">add(3)→</div>
                            <div style="background:#1e293b; padding:14px; border-radius:10px; text-align:center; min-width:160px;">
                                <div style="font-size:0.8rem; color:#94a3b8; margin-bottom:8px;">3 < root(4)? Skip!</div>
                                <div style="display:flex; gap:6px; justify-content:center;">
                                    <span style="width:36px; height:36px; border-radius:50%; background:rgba(248,113,113,0.15); border:2px solid #f87171; display:flex; align-items:center; justify-content:center; font-family:monospace; color:#f87171; font-weight:bold; font-size:0.85rem;">4</span>
                                    <span style="width:36px; height:36px; border-radius:50%; background:rgba(74,222,128,0.15); border:2px solid #4ade80; display:flex; align-items:center; justify-content:center; font-family:monospace; color:#4ade80; font-weight:bold; font-size:0.85rem;">5</span>
                                    <span style="width:36px; height:36px; border-radius:50%; background:rgba(74,222,128,0.15); border:2px solid #4ade80; display:flex; align-items:center; justify-content:center; font-family:monospace; color:#4ade80; font-weight:bold; font-size:0.85rem;">8</span>
                                </div>
                                <div style="font-size:0.75rem; color:#4ade80; margin-top:6px;">Kth largest = 4 ✓</div>
                            </div>
                        </div>
                        <div style="background:#0f172a; padding:10px 14px; border-radius:8px; font-size:0.82rem; color:#94a3b8; text-align:center;">
                            <strong style="color:#fbbf24;">Trick:</strong> Kth <em>largest</em> = <strong>min</strong>-heap of size K. Root is always the answer!
                        </div>
                    </div>`,
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
                visual: `
                    <h4 style="color:#c026d3;">🏁 K-Way Merge: Min-Heap Tournament</h4>
                    <div style="display:flex; flex-direction:column; gap:12px; margin:15px 0; max-width:550px;">
                        <div style="background:#1e293b; padding:16px; border-radius:12px;">
                            <div style="font-size:0.8rem; color:#94a3b8; margin-bottom:10px;">3 sorted lists → merge into 1:</div>
                            <div style="display:flex; flex-direction:column; gap:6px; font-family:monospace; font-size:0.82rem;">
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <span style="color:#4ade80; width:20px;">L1:</span>
                                    <span style="background:rgba(74,222,128,0.15); padding:3px 8px; border-radius:4px; color:#4ade80; border:2px solid #4ade80; font-weight:bold;">1</span>
                                    <span style="color:#475569;">→</span><span style="color:#94a3b8;">4 → 5</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <span style="color:#38bdf8; width:20px;">L2:</span>
                                    <span style="background:rgba(56,189,248,0.15); padding:3px 8px; border-radius:4px; color:#38bdf8;">1</span>
                                    <span style="color:#475569;">→</span><span style="color:#94a3b8;">3 → 4</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <span style="color:#f87171; width:20px;">L3:</span>
                                    <span style="background:rgba(248,113,113,0.15); padding:3px 8px; border-radius:4px; color:#f87171;">2</span>
                                    <span style="color:#475569;">→</span><span style="color:#94a3b8;">6</span>
                                </div>
                            </div>
                            <div style="margin-top:12px; padding-top:10px; border-top:1px solid #334155;">
                                <div style="font-size:0.75rem; color:#fbbf24; margin-bottom:4px;">Min-Heap: pop smallest, push its next</div>
                                <div style="font-family:monospace; font-size:0.82rem; color:#94a3b8;">
                                    Result: <span style="color:#4ade80;">1</span> → <span style="color:#38bdf8;">1</span> → <span style="color:#f87171;">2</span> → <span style="color:#38bdf8;">3</span> → <span style="color:#4ade80;">4</span> → ...
                                </div>
                            </div>
                        </div>
                        <div style="background:#0f172a; padding:10px 14px; border-radius:8px; font-size:0.82rem; color:#94a3b8; text-align:center;">
                            <strong style="color:#f87171;">Tuple:</strong> <code style="color:#38bdf8;">(val, list_idx, node)</code> — idx breaks ties (Python can't compare nodes)
                        </div>
                    </div>`,
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
                visual: `
                    <h4 style="color:#c026d3;">🌳 Trie: Shared Prefix Tree</h4>
                    <div style="display:flex; flex-direction:column; gap:12px; margin:15px 0; max-width:500px;">
                        <div style="background:#1e293b; padding:20px; border-radius:12px; text-align:center;">
                            <div style="font-size:0.8rem; color:#94a3b8; margin-bottom:12px;">Words: "app", "apple", "apt"</div>
                            <div style="font-family:monospace; font-size:0.85rem; line-height:2; color:#cbd5e1;">
                                <span style="color:#475569;">(root)</span><br>
                                <span style="color:#94a3b8;">  |</span><br>
                                <span style="color:#fbbf24; font-weight:bold;">  a</span><br>
                                <span style="color:#94a3b8;">  |</span><br>
                                <span style="color:#fbbf24; font-weight:bold;">  p</span><br>
                                <span style="color:#94a3b8;"> / \\</span><br>
                                <span style="color:#4ade80; font-weight:bold;">p</span><span style="color:#94a3b8;">   </span><span style="color:#f87171; font-weight:bold;">t</span><span style="color:#f87171; font-size:0.7rem;">✓</span><br>
                                <span style="color:#4ade80; font-size:0.7rem;">✓</span><span style="color:#94a3b8;"> |</span><br>
                                <span style="color:#94a3b8;">  </span><span style="color:#38bdf8;">l</span><br>
                                <span style="color:#94a3b8;">  |</span><br>
                                <span style="color:#38bdf8;">  e</span><span style="color:#38bdf8; font-size:0.7rem;">✓</span>
                            </div>
                        </div>
                        <div style="display:flex; gap:8px; justify-content:center; font-size:0.8rem; flex-wrap:wrap;">
                            <span style="background:rgba(74,222,128,0.1); padding:5px 10px; border-radius:6px; color:#4ade80;">✓ = is_end</span>
                            <span style="background:rgba(56,189,248,0.1); padding:5px 10px; border-radius:6px; color:#38bdf8;">children = {}</span>
                            <span style="background:rgba(251,191,36,0.1); padding:5px 10px; border-radius:6px; color:#fbbf24;">Shared prefix = a→p</span>
                        </div>
                    </div>`,
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
                    "root = Trie()                      # 🎯 Binary Trie (0/1)",
                    "for n in nums: insert(n)           # ⚡ Build Trie",
                    "max_xor = 0",
                    "for n in nums:                     # 🔄 Check max XOR for each",
                    "    curr = root, xor = 0",
                    "    for bit in 31..0:              # 💡 Greedy: Want opposite bit",
                    "        want = 1 - bit(n)",
                    "        if curr.has(want):         # ✅ Found opposite! XOR += 1<<bit",
                    "            curr = curr[want]",
                    "        else: curr = curr[bit]",
                    "    max_xor = max(max_xor, xor)"
                ],
                metrics: { time: "O(N * 32)", space: "O(N * 32)" },
                code: `class TrieNode:
    def __init__(self):
        self.children = {}

def findMaximumXOR(nums):
    root = TrieNode()
    
    # 1. Build Trie
    for num in nums:
        node = root
        for i in range(31, -1, -1):
            bit = (num >> i) & 1
            if bit not in node.children:
                node.children[bit] = TrieNode()
            node = node.children[bit]
            
    # 2. Find Max XOR
    max_xor = 0
    for num in nums:
        node = root
        current_xor = 0
        for i in range(31, -1, -1):
            bit = (num >> i) & 1
            toggled_bit = 1 - bit
            
            # Greedy: Try to go opposite path
            if toggled_bit in node.children:
                current_xor |= (1 << i)
                node = node.children[toggled_bit]
            else:
                node = node.children[bit]
        
        max_xor = max(max_xor, current_xor)
        
    return max_xor`,
                codeDetailed: `def findMaximumXOR(nums):
    """
    Maximum XOR of Two Numbers in an Array
    
    STRATEGY: Binary Trie + Greedy Parameter
    - To maximize XOR, we want bits to differ (0^1=1).
    - Insert all numbers into a Binary Trie (bits 31 to 0).
    - For each number 'X', traverse Trie trying to go to the OPPOSITE bit node.
    - If opposite exists: XOR bit becomes 1 (add 2^i).
    - If not: forced to take same bit, XOR bit becomes 0.
    
    Time: O(N * 32) -> O(N), Space: O(N * 32)
    """
    # ... (Implementation checks opposite bits greedily)
    pass`,
                visual: `<span><strong>Visual: Opposite Path</strong><br>Val: <code>101</code><br>Trie Path: Go <code>0 -> 1 -> 0</code> (Opposites).<br>Result: <code>111</code> (Maximized).</span>`,
                crux: "<strong>Greedy Bitwise:</strong> We want the 'Opposite Bit' at every step (MSB to LSB). Use Trie to check existence.",
                strategy: "Insert all binary strings. For each num, traverse trying to match <code>1-bit</code>. If yes, add <code>1<<i</code> to result.",
                trap: "<strong>MSB First:</strong> Must process from bit 31 down to 0 to maximize value (higher bits matter more).",
                dryRun: [
                    "Nums: [3 (011), 10 (1010), 5 (0101)].",
                    "Insert all into Trie.",
                    "Check 3 (00...011):",
                    "  Bit 2 (0) -> Want 1. Found in 5/10? Yes. Go 1.",
                    "  Bit 1 (1) -> Want 0. Found? Yes. Go 0.",
                    "  Bit 0 (1) -> Want 0. Found? Yes. Go 0.",
                    "  Max XOR path found."
                ]
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
                    "res = 0                            # 🎯 XOR Accumulator",
                    "for n in nums:                     # ⚡ Iterate all numbers",
                    "    res ^= n                       # 🔄 XOR cancels duplicates (A^A=0)",
                    "return res                         # ✅ Remaining value is the single number"
                ],
                metrics: { time: "O(N)", space: "O(1)" },
                code: `def singleNumber(nums):
    res = 0
    for n in nums:
        res ^= n
    return res`,
                codeDetailed: `def singleNumber(nums):
    """
    Single Number
    
    STRATEGY: XOR Properties
    - a ^ a = 0 (Self-cancellation)
    - a ^ 0 = a (Identity)
    - Order doesn't matter (Associative)
    
    [a, b, a, c, c] -> (a^a) ^ (c^c) ^ b -> 0 ^ 0 ^ b -> b
    
    Time: O(N), Space: O(1)
    """
    res = 0
    for n in nums:
        res ^= n
    return res`,
                visual: `<span><strong>Visual: Cancellation</strong><br><code>2 ^ 2 = 0</code><br><code>2 ^ 1 ^ 2</code> ➡ <code>(2^2) ^ 1</code> ➡ <code>0 ^ 1</code> ➡ <code>1</code></span>`,
                crux: "<strong>XOR Cancellation:</strong> Duplicates kill each other. The survivor is the answer.",
                strategy: "Initialize <code>res = 0</code>. XOR every element. Return <code>res</code>.",
                trap: "<strong>Input Validation:</strong> Assumes exactly one single number and all others appear twice. Will fail otherwise.",
                dryRun: [
                    "Nums: [4, 1, 2, 1, 2]",
                    "1. res=0^4 = 4",
                    "2. res=4^1 = 5",
                    "3. res=5^2 = 7",
                    "4. res=7^1 = 6 (Effectively 4^2)",
                    "5. res=6^2 = 4 (Effectively 4). Wait correct logic:",
                    "Real: 4 ^ (1^1) ^ (2^2) = 4 ^ 0 ^ 0 = 4."
                ]
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
    # In-place transform
    heapq.heapify(arr) 
    return arr`,
                codeDetailed: `def heapify(arr):
    """
    Heapify Algorithm (Build Heap)
    
    STRATEGY: Sift-Down from Bottom-Up
    - Leaves are already valid heaps.
    - Start from the last non-leaf node (n//2 - 1).
    - Sift down each node to its correct position.
    
    Time: O(N) - Tighter bound than O(N log N)
    Space: O(1) - In-place
    """
    import heapq
    heapq.heapify(arr)
    # Under user: it does sift-down logic`,
                visual: `
                    <h4 style="color:#c026d3;">🏗️ Bottom-Up Heapify: Fix from Leaves Up</h4>
                    <div style="display:flex; flex-direction:column; gap:12px; margin:15px 0; max-width:550px;">
                        <div style="display:flex; flex-wrap:wrap; gap:15px; justify-content:center;">
                            <div style="background:#1e293b; padding:14px; border-radius:10px; text-align:center;">
                                <div style="font-size:0.8rem; color:#f87171; margin-bottom:6px;">Before (unsorted)</div>
                                <div style="font-family:monospace; font-size:0.85rem; line-height:1.8; color:#cbd5e1;">
                                    <span style="color:#f87171;">    4</span><br>
                                    <span style="color:#94a3b8;">   / \\</span><br>
                                    <span style="color:#f87171;">  10</span>   <span style="color:#f87171;">3</span><br>
                                    <span style="color:#94a3b8;"> / \\</span><br>
                                    <span style="color:#94a3b8;">5   1</span>
                                </div>
                            </div>
                            <div style="display:flex; align-items:center; color:#64748b;">➞</div>
                            <div style="background:#1e293b; padding:14px; border-radius:10px; text-align:center;">
                                <div style="font-size:0.8rem; color:#4ade80; margin-bottom:6px;">After (min-heap) ✅</div>
                                <div style="font-family:monospace; font-size:0.85rem; line-height:1.8; color:#cbd5e1;">
                                    <span style="color:#4ade80; font-weight:bold;">    1</span><br>
                                    <span style="color:#94a3b8;">   / \\</span><br>
                                    <span style="color:#4ade80;">  4</span>   <span style="color:#4ade80;">3</span><br>
                                    <span style="color:#94a3b8;"> / \\</span><br>
                                    <span style="color:#94a3b8;">5   10</span>
                                </div>
                            </div>
                        </div>
                        <div style="background:#0f172a; padding:12px; border-radius:8px; font-size:0.82rem; color:#94a3b8;">
                            <strong style="color:#fbbf24;">Why O(N)?</strong> Most nodes are leaves (need 0 swaps). Only a few top nodes need to sift down far. Start from <code style="color:#38bdf8;">n//2 - 1</code> backwards.
                        </div>
                    </div>`,
                crux: "<strong>Linear Time Construction.</strong> processing non-leaves backwards works faster because most nodes (leaves) need 0 moves.",
                strategy: "Use Standard Library <code>heapq.heapify(arr)</code>. If manual: Loop <code>i</code> from <code>n//2</code> down to 0, call <code>siftDown(i)</code>.",
                trap: "<strong>Not N*logN!</strong> Building a heap via `heappush` N times is O(N log N). `heapify` is O(N) due to converging series.",
                dryRun: [
                    "Arr: [3, 9, 2, 1, 4, 5]",
                    "1. Start index 2 (val 2). Children 5. OK.",
                    "2. Index 1 (val 9). Children 1, 4. Swap 1. Arr: [3, 1, 2, 9, 4, 5].",
                    "3. Index 0 (val 3). Children 1, 2. Swap 1. Arr: [1, 3, 2, 9, 4, 5].",
                    "4. Sift down 3: Children 9, 4. OK. Done."
                ]
            }
        }
    ]
}
