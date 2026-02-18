// Auto-generated from data/ folder
// Run `python3 build_data.py` to regenerate
// Source: data/dsa/linked_list.js
// Topic: linked_list

// Linked List data
// Extracted from data.js

const topic_linked_list = {
    id: "linked_list",
    title: "Linked List Mastery",
            problem: "Goal: Solve the problem 'Linked List Mastery' and return the required output as per the prompt.",
    description: "Principal Engineer DSA • Day 4",
    color: "#059669",
    icon: "fas fa-network-wired",
    mentalModel: {
        whenToApply: [
            { label: "🎯 O(1) Cache", desc: "LRU/LFU Cache → HashMap + Doubly Linked List" },
            { label: "🔄 Cycle Detection", desc: "Find loop → Floyd's Slow/Fast pointers" },
            { label: "✂️ Reversal", desc: "Reverse K groups, halves → Use prev/curr/next pointers" },
            { label: "📋 Deep Copy", desc: "Clone with random → HashMap or Interleaving" },
            { label: "🏃 Two Pointers", desc: "Find middle, palindrome → Slow/Fast technique" }
        ],
        patterns: [
            { algo: "LRU Cache", use: "O(1) get/put with eviction", time: "O(1)", space: "O(N)", template: "HashMap{key→node} + DLL (head=recent, tail=old)" },
            { algo: "Floyd's Algorithm", use: "Cycle detection + start", time: "O(N)", space: "O(1)", template: "slow/fast meet, reset slow to head, both move 1" },
            { algo: "K-Group Reversal", use: "Reverse every K nodes", time: "O(N)", space: "O(1)", template: "get_kth, reverse inner, rewire anchors" },
            { algo: "Interleaving Clone", use: "Deep copy O(1) space", time: "O(N)", space: "O(1)", template: "Weave copies → link randoms → unweave" },
            { algo: "Palindrome Check", use: "O(1) space check", time: "O(N)", space: "O(1)", template: "Find mid → reverse 2nd half → compare" }
        ],
        decisionTree: `
<div style="background:#1e293b; padding:25px; border-radius:16px; margin:15px 0; border:1px solid rgba(255,255,255,0.1);">
<h4 style="color:#a78bfa; margin-bottom:20px; text-align:center; font-size:1.1rem;">🧠 Linked List Pattern Recognition</h4>
<div style="font-family:monospace; font-size:0.85rem; line-height:1.8;">
<pre style="color:#e2e8f0; text-align:left; margin:0;">
              ┌──────────────────────────────┐
              │ "Linked List problem type?"  │
              └──────────────┬───────────────┘
                             │
     ┌───────────────────────┼───────────────────────┐
     ▼                       ▼                       ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ CYCLE/LOOP   │      │  REVERSAL    │      │  CACHE/      │
│  Problems    │      │  Problems    │      │  DESIGN      │
└──────┬───────┘      └──────┬───────┘      └──────┬───────┘
       │                     │                     │
       ▼                     ▼                     ▼
 ┌───────────────┐    ┌───────────────┐    ┌───────────────┐
 │ Floyd's Algo  │    │ Use DUMMY!    │    │ HashMap +     │
 │               │    │               │    │ Doubly LL     │
 │ Slow = 1 step │    │ prev=None     │    │               │
 │ Fast = 2 step │    │ curr=head     │    │ _add() _del() │
 │               │    │ loop: swap    │    │ helpers       │
 │ Meet? → Reset │    │               │    │               │
 └───────────────┘    └───────────────┘    └───────────────┘

         "Need to find middle?"
              │
              ▼
      ┌───────────────────────┐
      │ SLOW/FAST pointers    │
      │ When fast reaches end │
      │ slow is at middle!    │
      └───────────────────────┘
</pre>
</div>
</div>`,
        codeTemplates: `
<div style="background:#0f172a; padding:20px; border-radius:12px; margin:15px 0;">
<h4 style="color:#10b981; margin-bottom:15px;">📝 Linked List Templates</h4>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
1️⃣ LRU Cache (DLL + HashMap)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
class LRUCache:
    def __init__(self, cap):
        self.cap, self.cache = cap, {}
        self.head, self.tail = Node(0,0), Node(0,0)
        self.head.next, self.tail.prev = self.tail, self.head
    def _remove(self, node):
        node.prev.next, node.next.prev = node.next, node.prev
    def _add(self, node):
        node.prev, node.next = self.head, self.head.next
        self.head.next.prev = node
        self.head.next = node
    def get(self, key):
        if key in self.cache:
            self._remove(self.cache[key])
            self._add(self.cache[key])
            return self.cache[key].val
        return -1
</pre>
</details>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
2️⃣ Floyd's Cycle Detection
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def detectCycle(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            slow = head  # Reset!
            while slow != fast:
                slow = slow.next
                fast = fast.next
            return slow  # Cycle start
    return None
</pre>
</details>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
3️⃣ Reverse Linked List
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def reverse(head):
    prev, curr = None, head
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    return prev
</pre>
</details>

<details>
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
4️⃣ Find Middle (Slow/Fast)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def findMiddle(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow  # Middle node
</pre>
</details>
</div>`,
        safetyCheck: [
            { label: "🔗 Use DUMMY!", desc: "<code>dummy = ListNode(0, head)</code> — Handles edge cases at head" },
            { label: "📍 Save next first!", desc: "Before changing <code>curr.next</code>, save <code>temp = curr.next</code>" },
            { label: "🔄 Check null!", desc: "<code>while fast and fast.next</code> — Both conditions needed!" },
            { label: "⚠️ Delete from map!", desc: "LRU: When evicting, <code>del cache[lru.key]</code> — Often forgotten!" },
            { label: "🔍 Phase 2 reset!", desc: "Floyd's: Reset <code>slow = head</code> AFTER meeting, not before" },
            { label: "↩️ Restore list!", desc: "After palindrome check, reverse back to restore original" }
        ]
    },
    questions: [
        {
            id: "lru-cache",
            title: "LRU Cache",
            leetcodeUrl: "https://leetcode.com/problems/lru-cache/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Design #1"],
            quiz: {
                description: "Implement get() and put() in O(1). Which data structures?",
                options: [
                    "HashMap only",
                    "Doubly Linked List + HashMap (key → node)",
                    "Array + HashMap",
                    "Queue + HashMap"
                ],
                correct: 1,
                explanation: "Doubly LL + HashMap! HashMap for O(1) lookup. DLL for O(1) removal/insertion at head/tail. Get: move to head. Put: if full, remove tail. Add to head. #1 design question!"
            },
            learn: {
                quickAlgo: [
                    "class Node: prev, next, key, val",
                    "def get(key):",
                    "    if key in map:",
                    "        node = map[key]; remove(node); add(node) # ⚡ Move to Head (Most Recent)",
                    "        return node.val",
                    "    return -1",
                    "def put(key, val):",
                    "    if key in map: remove(map[key])    # 🔄 Update existing",
                    "    node = Node(key, val); add(node)   # ✅ Add new to Head",
                    "    map[key] = node",
                    "    if len(map) > cap:",
                    "        lru = head.next; remove(lru)   # 💡 Evict Tail (Least Recent)",
                    "        del map[lru.key]"
                ],
                metrics: { time: "O(1)", space: "O(N)" },
                timeExplainer: "<strong>Time Analysis:</strong><br>• <code>get()</code>: HashMap lookup = <code>O(1)</code><br>• <code>put()</code>: Map + DLL operations = <code>O(1)</code><br><br><strong>All operations:</strong> <code>O(1)</code> average",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• HashMap: <code>O(N)</code> for N key-value pairs<br>• Doubly Linked List: <code>O(N)</code> nodes<br><br><strong>Total:</strong> <code>O(N)</code>",
                visual: `
                    <h4 style="color:#c026d3;">⚡ LRU Cache: HashMap + Doubly Linked List</h4>
                    <div style="display:flex; flex-direction:column; gap:15px; margin:15px 0; max-width:600px;">
                        <div style="background:#1e293b; padding:20px; border-radius:12px;">
                            <div style="font-size:0.8rem; color:#94a3b8; margin-bottom:10px; text-align:center;">HashMap: O(1) lookup → DLL: O(1) reorder</div>
                            <div style="display:flex; gap:20px; align-items:center; justify-content:center; flex-wrap:wrap;">
                                <div style="background:#0f172a; padding:12px; border-radius:8px; min-width:120px;">
                                    <div style="font-size:0.7rem; color:#fbbf24; font-weight:bold; margin-bottom:6px;">HashMap</div>
                                    <div style="font-family:monospace; font-size:0.8rem; color:#cbd5e1; line-height:1.8;">
                                        key1 → <span style="color:#4ade80;">●</span><br>
                                        key2 → <span style="color:#38bdf8;">●</span><br>
                                        key3 → <span style="color:#f87171;">●</span>
                                    </div>
                                </div>
                                <div style="color:#64748b;">→</div>
                                <div style="background:#0f172a; padding:12px; border-radius:8px;">
                                    <div style="font-size:0.7rem; color:#a78bfa; font-weight:bold; margin-bottom:6px;">DLL (MRU ← → LRU)</div>
                                    <div style="display:flex; align-items:center; gap:6px; font-family:monospace; font-size:0.8rem;">
                                        <span style="color:#475569;">H</span>
                                        <span style="color:#475569;">⇄</span>
                                        <span style="background:rgba(74,222,128,0.15); padding:4px 8px; border-radius:4px; color:#4ade80;">k1</span>
                                        <span style="color:#475569;">⇄</span>
                                        <span style="background:rgba(56,189,248,0.15); padding:4px 8px; border-radius:4px; color:#38bdf8;">k2</span>
                                        <span style="color:#475569;">⇄</span>
                                        <span style="background:rgba(248,113,113,0.15); padding:4px 8px; border-radius:4px; color:#f87171;">k3</span>
                                        <span style="color:#475569;">⇄</span>
                                        <span style="color:#475569;">T</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="display:flex; gap:10px; flex-wrap:wrap; font-size:0.8rem; justify-content:center;">
                            <span style="background:rgba(74,222,128,0.1); border:1px solid rgba(74,222,128,0.3); padding:6px 12px; border-radius:6px; color:#4ade80;">GET: remove → add to head</span>
                            <span style="background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.3); padding:6px 12px; border-radius:6px; color:#38bdf8;">PUT: if full, evict tail</span>
                            <span style="background:rgba(248,113,113,0.1); border:1px solid rgba(248,113,113,0.3); padding:6px 12px; border-radius:6px; color:#f87171;">⚠️ Delete from map too!</span>
                        </div>
                    </div>`,
                crux: "<strong>The Wire-Splicing Strategy:</strong><br>Helpers: <code>_remove(node)</code> (Unplug) and <code>_add(node)</code> (Plug at front).<br>Get: Remove -> Add.<br>Put: Remove Old -> Add New. If Full: Remove Tail.",
                trap: "<strong>Phantom Pointer:</strong> When evicting tail, you MUST delete it from the HashMap too! Often forgotten.",
                dryRun: [
                    "1. Put(1, 1): Map={1:N1}, List=[1].",
                    "2. Put(2, 2): Map={1:N1, 2:N2}, List=[2, 1].",
                    "3. Get(1): Remove 1, Add 1. List=[1, 2].",
                    "4. Put(3, 3) Cap=2: Evict Tail(2). Map={1:N1, 3:N3}. List=[3, 1]."
                ],
                codeTitle: "Python Solution",
                code: `class LRUCache:
def __init__(self, capacity: int):
    self.cap = capacity
    self.cache = {} 
    self.head, self.tail = Node(0, 0), Node(0, 0)
    self.head.next = self.tail
    self.tail.prev = self.head

def _remove(self, node):
    prev, nxt = node.prev, node.next
    prev.next, nxt.prev = nxt, prev

def _add(self, node):
    node.prev, node.next = self.head, self.head.next
    self.head.next.prev = node
    self.head.next = node

def get(self, key):
    if key in self.cache:
        self._remove(self.cache[key])
        self._add(self.cache[key])
        return self.cache[key].val
    return -1

def put(self, key, value):
    if key in self.cache:
        self._remove(self.cache[key])
    new_node = Node(key, value)
    self._add(new_node)
    self.cache[key] = new_node
    if len(self.cache) > self.cap:
        lru = self.tail.prev
        self._remove(lru)
        del self.cache[lru.key]`,
                strategy: `<strong>Wire-Splicing Strategy:</strong><br><strong>Step 1:</strong> Build HashMap (key → DLL node) + Doubly Linked List (head=MRU, tail=LRU).<br><strong>Step 2:</strong> <code>get(key)</code>: If in map, remove node from current position, add to head (most recent).<br><strong>Step 3:</strong> <code>put(key, val)</code>: If exists, remove old. Create new node at head. If over capacity, evict tail node AND delete from map.<br><br><strong>Why it works:</strong> HashMap gives O(1) lookup. DLL gives O(1) removal/insertion at any position.`,
                codeDetailed: `class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.cache = {}                # ← key → DLL node
        self.head, self.tail = Node(0,0), Node(0,0)  # ← Sentinel nodes
        self.head.next = self.tail     # ← head = most recent
        self.tail.prev = self.head     # ← tail = least recent

    def _remove(self, node):           # ← O(1) unplug from anywhere
        prev, nxt = node.prev, node.next
        prev.next, nxt.prev = nxt, prev

    def _add(self, node):              # ← O(1) plug right after head
        node.prev, node.next = self.head, self.head.next
        self.head.next.prev = node
        self.head.next = node

    def get(self, key):
        if key in self.cache:
            self._remove(self.cache[key])   # ← Unplug
            self._add(self.cache[key])      # ← Move to front (MRU)
            return self.cache[key].val
        return -1

    def put(self, key, value):
        if key in self.cache:
            self._remove(self.cache[key])   # ← Remove old
        new_node = Node(key, value)
        self._add(new_node)                 # ← Add to front
        self.cache[key] = new_node
        if len(self.cache) > self.cap:
            lru = self.tail.prev             # ← Least recent = before tail
            self._remove(lru)
            del self.cache[lru.key]          # ← MUST delete from map too!`
            }
        },
        {
            id: "reverse-linked-list-k-group",
            title: "Reverse in K Groups",
            problem: "Goal: Solve the problem 'Reverse in K Groups' and return the required output as per the prompt.",
            leetcodeUrl: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Pointer Mastery"],
            quiz: {
                description: "Reverse every K nodes. What's the challenge?",
                options: [
                    "Standard reversal works",
                    "Need to track: prev_group_end, curr_group, next_group_start",
                    "Use recursion only",
                    "Convert to array"
                ],
                correct: 1,
                explanation: "Pointer management! For each group: connect prev_group.next to new head. Connect new tail to next_group. Edge cases: < K nodes at end (don't reverse)."
            },
            learn: {
                quickAlgo: [
                    "dummy = ListNode(0, head)",
                    "groupPrev = dummy",
                    "while True:",
                    "    kth = getKth(groupPrev, k)     # 🎯 Check if K nodes exist",
                    "    if not kth: break",
                    "    groupNext = kth.next",
                    "    # ⚡ Reverse K nodes [curr ... kth]",
                    "    prev, curr = kth.next, groupPrev.next",
                    "    while curr != groupNext:",
                    "        tmp = curr.next; curr.next = prev; prev = curr; curr = tmp",
                    "    # 🔄 Connect reversed group",
                    "    tmp = groupPrev.next           # Old start is now end",
                    "    groupPrev.next = prev          # ✅ Connect start",
                    "    groupPrev = tmp                # 💡 Move pointer for next group"
                ],
                metrics: { time: "O(N)", space: "O(1)" },
                timeExplainer: "<strong>Time Analysis:</strong><br>• Visit each node once<br>• Reversal within groups is O(K)<br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Only pointers for manipulation<br>• No extra data structures<br><br><strong>Result:</strong> <code>O(1)</code>",
                visual: `
                    <h4 style="color:#c026d3;">🔧 Reverse in K-Groups: The Surgery</h4>
                    <div style="display:flex; flex-direction:column; gap:15px; margin:15px 0; max-width:600px;">
                        <div style="display:flex; flex-wrap:wrap; gap:15px; justify-content:center;">
                            <div style="background:#1e293b; padding:14px; border-radius:10px; min-width:200px;">
                                <div style="font-size:0.8rem; color:#94a3b8; margin-bottom:8px;">Before (K=3):</div>
                                <div style="display:flex; align-items:center; gap:6px; font-family:monospace; font-size:0.85rem;">
                                    <span style="background:rgba(251,191,36,0.15); padding:4px 8px; border-radius:4px; color:#fbbf24; border:1px solid rgba(251,191,36,0.3);">1</span>
                                    <span style="color:#475569;">→</span>
                                    <span style="background:rgba(251,191,36,0.15); padding:4px 8px; border-radius:4px; color:#fbbf24; border:1px solid rgba(251,191,36,0.3);">2</span>
                                    <span style="color:#475569;">→</span>
                                    <span style="background:rgba(251,191,36,0.15); padding:4px 8px; border-radius:4px; color:#fbbf24; border:1px solid rgba(251,191,36,0.3);">3</span>
                                    <span style="color:#475569;">→</span>
                                    <span style="background:rgba(74,222,128,0.15); padding:4px 8px; border-radius:4px; color:#4ade80;">4</span>
                                    <span style="color:#475569;">→</span>
                                    <span style="background:rgba(74,222,128,0.15); padding:4px 8px; border-radius:4px; color:#4ade80;">5</span>
                                </div>
                            </div>
                            <div style="display:flex; align-items:center; color:#64748b;">➞</div>
                            <div style="background:#1e293b; padding:14px; border-radius:10px; min-width:200px;">
                                <div style="font-size:0.8rem; color:#94a3b8; margin-bottom:8px;">After:</div>
                                <div style="display:flex; align-items:center; gap:6px; font-family:monospace; font-size:0.85rem;">
                                    <span style="background:rgba(251,191,36,0.15); padding:4px 8px; border-radius:4px; color:#fbbf24; border:1px solid rgba(251,191,36,0.3);">3</span>
                                    <span style="color:#475569;">→</span>
                                    <span style="background:rgba(251,191,36,0.15); padding:4px 8px; border-radius:4px; color:#fbbf24; border:1px solid rgba(251,191,36,0.3);">2</span>
                                    <span style="color:#475569;">→</span>
                                    <span style="background:rgba(251,191,36,0.15); padding:4px 8px; border-radius:4px; color:#fbbf24; border:1px solid rgba(251,191,36,0.3);">1</span>
                                    <span style="color:#475569;">→</span>
                                    <span style="background:rgba(74,222,128,0.15); padding:4px 8px; border-radius:4px; color:#4ade80;">4</span>
                                    <span style="color:#475569;">→</span>
                                    <span style="background:rgba(74,222,128,0.15); padding:4px 8px; border-radius:4px; color:#4ade80;">5</span>
                                </div>
                            </div>
                        </div>
                        <div style="background:#0f172a; padding:14px; border-radius:8px;">
                            <div style="display:grid; grid-template-columns:30px 1fr; gap:8px; font-size:0.82rem; color:#cbd5e1;">
                                <span style="color:#fbbf24; font-weight:bold;">1.</span><span>Find <code style="color:#38bdf8;">kth</code> node (is there a full group?)</span>
                                <span style="color:#fbbf24; font-weight:bold;">2.</span><span>Save <code style="color:#38bdf8;">nextGroup = kth.next</code>, snip</span>
                                <span style="color:#fbbf24; font-weight:bold;">3.</span><span>Reverse the K nodes (standard reversal)</span>
                                <span style="color:#fbbf24; font-weight:bold;">4.</span><span><code style="color:#f87171;">groupPrev.next = new head</code> (reconnect!)</span>
                            </div>
                        </div>
                    </div>`,
                crux: "<strong>Don't get lost.</strong><br>Use `get_kth` to find group end.<br>After reverse, your `groupPrev` is broken. Update it to the NEW tail.",
                trap: "<strong>Losing the Anchor:</strong> `groupPrev` must point to the new tail after each reversal to be ready for the next group.",
                dryRun: [
                    "Input: 1->2->3->4->5, K=2",
                    "1. Group [1,2]. Rev -> 2->1. Link dummy->2, 1->3. Prev=1.",
                    "2. Group [3,4]. Rev -> 4->3. Link 1->4, 3->5. Prev=3.",
                    "3. Group [5]. Len < K. Stop."
                ],
                codeTitle: "Python Solution",
                code: `def reverseKGroup(head, k):
dummy = ListNode(0, head)
groupPrev = dummy

while True:
    kth = get_kth(groupPrev, k)
    if not kth: break
    groupNext = kth.next
    
    # Reverse inner
    prev, curr = kth.next, groupPrev.next
    while curr != groupNext:
        tmp = curr.next
        curr.next = prev
        prev = curr
        curr = tmp
        
    # Re-wire
    tmp = groupPrev.next # Old start (new tail)
    groupPrev.next = prev # New head
    groupPrev = tmp # Move anchor
    
return dummy.next`,
                strategy: `<strong>K-Group Reversal Strategy:</strong><br><strong>Step 1:</strong> Use dummy node. Track <code>groupPrev</code> (anchor before group).<br><strong>Step 2:</strong> Find kth node from groupPrev. If < K nodes remain, stop.<br><strong>Step 3:</strong> Reverse K nodes using standard prev/curr reversal.<br><strong>Step 4:</strong> Rewire: connect groupPrev to new head, move groupPrev to new tail.<br><br><strong>Why it works:</strong> Each group is reversed independently and reconnected via anchor pointers.`,
                codeDetailed: `def reverseKGroup(head, k):
    dummy = ListNode(0, head)  # ← Dummy simplifies head edge cases
    groupPrev = dummy          # ← Anchor: last node before current group

    while True:
        kth = get_kth(groupPrev, k)  # ← Find end of group
        if not kth: break            # ← Less than K nodes = stop
        groupNext = kth.next         # ← Save start of next group

        # ← Standard reversal within group
        prev, curr = kth.next, groupPrev.next
        while curr != groupNext:
            tmp = curr.next
            curr.next = prev         # ← Reverse pointer
            prev = curr
            curr = tmp

        # ← Rewire connections
        tmp = groupPrev.next         # ← Old start = new tail
        groupPrev.next = prev        # ← Connect to reversed head
        groupPrev = tmp              # ← Move anchor forward

    return dummy.next`
            }
        },
        {
            id: "linked-list-cycle-ii",
            title: "Detect Loop Start",
            problem: "Goal: Solve the problem 'Detect Loop Start' and return the required output as per the prompt.",
            leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle-ii/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Floyd's Algo"],
            quiz: {
                description: "Find WHERE the cycle starts. What's the math?",
                options: [
                    "HashMap to find first revisited node",
                    "Slow/Fast meet, then reset slow to head, move both by 1",
                    "Mark nodes",
                    "Count nodes in cycle"
                ],
                correct: 1,
                explanation: "Floyd's Math! After slow/fast meet, reset slow to head. Move both by 1 step. They meet AT cycle start! Proven by math."
            },
            learn: {
                quickAlgo: [
                    "slow, fast = head, head",
                    "while fast and fast.next:",
                    "    slow = slow.next",
                    "    fast = fast.next.next",
                    "    if slow == fast:               # ⚡ Cycle Detected",
                    "        slow = head                # 🔄 Reset Slow to Head",
                    "        while slow != fast:        # 🎯 Move both 1 step",
                    "            slow = slow.next",
                    "            fast = fast.next",
                    "        return slow                # ✅ Meeting point is Start of Cycle",
                    "return None"
                ],
                metrics: { time: "O(N)", space: "O(1)" },
                timeExplainer: "<strong>Floyd's Algorithm:</strong><br>• Phase 1: Detect cycle = <code>O(N)</code><br>• Phase 2: Find start = <code>O(N)</code><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Only 2 pointers: slow, fast<br>• No HashSet needed!<br><strong>Result:</strong> <code>O(1)</code>",
                visual: `
                    <h4 style="color:#c026d3;">🔄 Floyd's Cycle Detection: The P Shape</h4>
                    <div style="display:flex; flex-direction:column; gap:15px; margin:15px 0; max-width:550px;">
                        <div style="background:#1e293b; padding:20px; border-radius:12px; text-align:center;">
                            <div style="font-family:monospace; font-size:0.85rem; color:#cbd5e1; line-height:2;">
                                <span style="color:#94a3b8;">1 → 2 → </span><span style="color:#fbbf24; font-weight:bold; text-decoration:underline;">3</span><span style="color:#94a3b8;"> → 4 → 5</span><br>
                                <span style="color:#94a3b8;">          ↑         ↓</span><br>
                                <span style="color:#94a3b8;">          8 ← 7 ← 6</span>
                            </div>
                            <div style="margin-top:10px; display:flex; gap:15px; justify-content:center; font-size:0.8rem;">
                                <span style="color:#fbbf24;">Start of cycle = node 3</span>
                            </div>
                        </div>
                        <div style="display:flex; gap:12px; flex-wrap:wrap; justify-content:center;">
                            <div style="background:rgba(74,222,128,0.08); border:1px solid rgba(74,222,128,0.3); padding:12px 16px; border-radius:8px; flex:1; min-width:200px;">
                                <div style="font-size:0.8rem; color:#4ade80; font-weight:bold; margin-bottom:4px;">Phase 1: Detect</div>
                                <div style="font-size:0.8rem; color:#94a3b8;">Slow (1 step) + Fast (2 steps)<br>They meet inside the cycle</div>
                            </div>
                            <div style="background:rgba(56,189,248,0.08); border:1px solid rgba(56,189,248,0.3); padding:12px 16px; border-radius:8px; flex:1; min-width:200px;">
                                <div style="font-size:0.8rem; color:#38bdf8; font-weight:bold; margin-bottom:4px;">Phase 2: Find Start</div>
                                <div style="font-size:0.8rem; color:#94a3b8;">Reset slow → head<br>Both move 1 step. Meet = start!</div>
                            </div>
                        </div>
                        <div style="background:#0f172a; padding:10px 14px; border-radius:8px; font-size:0.82rem; color:#94a3b8; text-align:center;">
                            <strong style="color:#a78bfa;">Math:</strong> dist(head → start) = dist(meeting → start)
                        </div>
                    </div>`,
                crux: "<strong>Phase 1:</strong> Intercept (do they collide?).<br><strong>Phase 2:</strong> Reset slow to head. Move both 1 step. Collision = Start.",
                trap: "<strong>The False Start:</strong> `slow` and `fast` equal at head initially. Don't return true immediately!",
                dryRun: [
                    "1. Slow moves 1, Fast 2.",
                    "2. Collision! Cycle found.",
                    "3. Slow = Head. Move both 1 step.",
                    "4. Second Collision = Loop Entry."
                ],
                codeTitle: "Python Solution",
                code: `def detectCycle(head):
slow, fast = head, head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow == fast:
        slow = head
        while slow != fast:
            slow = slow.next
            fast = fast.next
        return slow
return None`,
                strategy: `<strong>Floyd's Two-Phase Strategy:</strong><br><strong>Phase 1 (Detect):</strong> Slow moves 1 step, Fast moves 2 steps. If they meet, cycle exists.<br><strong>Phase 2 (Find Start):</strong> Reset slow to head. Move both 1 step. They meet at cycle start.<br><br><strong>Math proof:</strong> Distance from head to cycle start = distance from meeting point to cycle start (through the cycle).`,
                codeDetailed: `def detectCycle(head):
    slow, fast = head, head
    while fast and fast.next:          # ← Phase 1: Detect cycle
        slow = slow.next               # ← Tortoise: 1 step
        fast = fast.next.next          # ← Hare: 2 steps
        if slow == fast:               # ← Collision! Cycle confirmed
            slow = head                # ← Phase 2: Reset slow to head
            while slow != fast:        # ← Both move 1 step
                slow = slow.next
                fast = fast.next
            return slow                # ← Meeting point = cycle start
    return None                        # ← No cycle`
            }
        },
        {
            id: "copy-list-with-random-pointer",
            title: "Clone with Random Pointer",
            problem: "Goal: Solve the problem 'Clone with Random Pointer' and return the required output as per the prompt.",
            leetcodeUrl: "https://leetcode.com/problems/copy-list-with-random-pointer/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Deep Copy"],
            quiz: {
                description: "Deep copy with random pointers. Best approach?",
                options: [
                    "HashMap: old_node → new_node, then copy random",
                    "Interleaving: insert copies between originals",
                    "Recursion with memo",
                    "Modify original structure"
                ],
                correct: 0,
                explanation: "HashMap is cleaner! Interleaving works (O(1) space) but is trickier. Both are accepted."
            },
            learn: {
                quickAlgo: [
                    "map = {None: None}                 # 🎯 Map old_node -> new_node",
                    "cur = head",
                    "while cur:                         # ⚡ 1st Pass: Create copies",
                    "    map[cur] = Node(cur.val)",
                    "    cur = cur.next",
                    "cur = head",
                    "while cur:                         # 🔄 2nd Pass: Link pointers",
                    "    copy = map[cur]",
                    "    copy.next = map[cur.next]      # ✅ Link Next",
                    "    copy.random = map[cur.random]  # ✅ Link Random",
                    "    cur = cur.next",
                    "return map[head]"
                ],
                metrics: { time: "O(N)", space: "O(1) (Interleaving)" },
                timeExplainer: "<strong>3-Pass Algorithm:</strong><br>• Pass 1: Weave copies = <code>O(N)</code><br>• Pass 2: Link randoms = <code>O(N)</code><br>• Pass 3: Unweave = <code>O(N)</code><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Interleaving Method:</strong><br>• Insert copies inline<br>• No HashMap needed<br><strong>Result:</strong> <code>O(1)</code> extra space",
                visual: `
                    <h4 style="color:#c026d3;">🧬 DNA Replication: 3-Pass Interleaving</h4>
                    <div style="display:flex; flex-direction:column; gap:12px; margin:15px 0; max-width:600px;">
                        <div style="background:#1e293b; padding:14px; border-radius:10px;">
                            <div style="font-size:0.8rem; color:#fbbf24; font-weight:bold; margin-bottom:8px;">Pass 1: Weave copies</div>
                            <div style="display:flex; align-items:center; gap:4px; font-family:monospace; font-size:0.82rem; flex-wrap:wrap;">
                                <span style="background:rgba(74,222,128,0.15); padding:3px 8px; border-radius:4px; color:#4ade80;">A</span>
                                <span style="color:#475569;">→</span>
                                <span style="background:rgba(74,222,128,0.08); padding:3px 8px; border-radius:4px; color:#4ade80; border:1px dashed rgba(74,222,128,0.4);">A'</span>
                                <span style="color:#475569;">→</span>
                                <span style="background:rgba(56,189,248,0.15); padding:3px 8px; border-radius:4px; color:#38bdf8;">B</span>
                                <span style="color:#475569;">→</span>
                                <span style="background:rgba(56,189,248,0.08); padding:3px 8px; border-radius:4px; color:#38bdf8; border:1px dashed rgba(56,189,248,0.4);">B'</span>
                                <span style="color:#475569;">→</span>
                                <span style="background:rgba(248,113,113,0.15); padding:3px 8px; border-radius:4px; color:#f87171;">C</span>
                                <span style="color:#475569;">→</span>
                                <span style="background:rgba(248,113,113,0.08); padding:3px 8px; border-radius:4px; color:#f87171; border:1px dashed rgba(248,113,113,0.4);">C'</span>
                            </div>
                        </div>
                        <div style="background:#1e293b; padding:14px; border-radius:10px;">
                            <div style="font-size:0.8rem; color:#38bdf8; font-weight:bold; margin-bottom:8px;">Pass 2: Link random pointers</div>
                            <div style="font-family:monospace; font-size:0.82rem; color:#94a3b8;">
                                <code style="color:#4ade80;">copy.random = original.random.next</code>
                            </div>
                        </div>
                        <div style="background:#1e293b; padding:14px; border-radius:10px;">
                            <div style="font-size:0.8rem; color:#f87171; font-weight:bold; margin-bottom:8px;">Pass 3: Unweave (split lists)</div>
                            <div style="display:flex; gap:15px; font-family:monospace; font-size:0.82rem;">
                                <span style="color:#4ade80;">A → B → C</span>
                                <span style="color:#475569;">|</span>
                                <span style="color:#94a3b8; border:1px dashed #475569; padding:2px 8px; border-radius:4px;">A' → B' → C'</span>
                            </div>
                        </div>
                    </div>`,
                crux: "<strong>Interleaving Strategy:</strong><br>1. Insert Copy next to Original.<br>2. `copy.random = original.random.next`.<br>3. Extract Copy list.",
                trap: "<strong>Null Crash:</strong> Check `if curr.random:` before accessing `next`.",
                dryRun: ["1. Weave: 1->1'->2->2'.", "2. Rand: 1'.rand = 1.rand.next.", "3. Split: 1->2, 1'->2'."],
                codeTitle: "Python Solution",
                code: `def copyRandomList(head):
if not head: return None
curr = head
while curr: # Weave
    new_node = Node(curr.val, next=curr.next)
    curr.next = new_node
    curr = new_node.next
curr = head
while curr: # Random
    if curr.random:
        curr.next.random = curr.random.next
    curr = curr.next.next
old_head = head
new_head = head.next
curr_old = old_head
curr_new = new_head
while curr_old: # Unweave
    curr_old.next = curr_old.next.next
    if curr_new.next:
        curr_new.next = curr_new.next.next
    curr_old = curr_old.next
    curr_new = curr_new.next
return new_head`,
                strategy: `<strong>3-Pass Interleaving Strategy:</strong><br><strong>Pass 1 (Weave):</strong> Insert copy of each node right after original: A→A'→B→B'.<br><strong>Pass 2 (Link Randoms):</strong> <code>copy.random = original.random.next</code> (copy is always next to original).<br><strong>Pass 3 (Unweave):</strong> Separate interleaved list into original and copy lists.<br><br><strong>Why it works:</strong> Interleaving gives O(1) access to each node's copy without a HashMap.`,
                codeDetailed: `def copyRandomList(head):
    if not head: return None
    
    # ← Pass 1: Weave copies between originals
    curr = head
    while curr:
        new_node = Node(curr.val, next=curr.next)  # ← Create copy
        curr.next = new_node                        # ← Insert after original
        curr = new_node.next                        # ← Skip to next original
    
    # ← Pass 2: Link random pointers using interleaved structure
    curr = head
    while curr:
        if curr.random:
            curr.next.random = curr.random.next     # ← Copy's random = original's random's copy
        curr = curr.next.next                       # ← Skip to next original
    
    # ← Pass 3: Unweave into two separate lists
    old_head = head
    new_head = head.next
    curr_old, curr_new = old_head, new_head
    while curr_old:
        curr_old.next = curr_old.next.next          # ← Restore original list
        if curr_new.next:
            curr_new.next = curr_new.next.next      # ← Build copy list
        curr_old = curr_old.next
        curr_new = curr_new.next
    return new_head`
            }
        },
        {
            id: "palindrome-linked-list",
            title: "Palindrome Linked List",
            problem: "Goal: Solve the problem 'Palindrome Linked List' and return the required output as per the prompt.",
            leetcodeUrl: "https://leetcode.com/problems/palindrome-linked-list/",
            difficulty: "Good to Do",
            priority: "🟢",
            tags: ["Half-Reversal"],
            quiz: {
                description: "Check palindrome in O(n) time, O(1) space. How?",
                options: [
                    "Convert to array O(n) space",
                    "Find mid (slow/fast), reverse second half, compare",
                    "Recursion O(n) stack",
                    "Use stack O(n) space"
                ],
                correct: 1,
                explanation: "Find mid + Reverse! Use slow/fast to find middle. Reverse second half. Compare halves. Optional: reverse back."
            },
            learn: {
                quickAlgo: [
                    "🎯 <strong>Middle Reverse kyun?</strong> Array mein convert kiya toh O(N) space lagega",
                    "⚡ <code>fast/slow</code> se mid find karo",
                    "🔄 Reverse <code>slow.next</code> (second half)",
                    "✅ 2 pointers: <code>left=head, right=tail</code> — match karo",
                    "💡 Restore list (optional) — dobara reverse karke original state laao"
                ],
                metrics: { time: "O(N)", space: "O(1)" },
                timeExplainer: "<strong>Time Breakdown:</strong><br>• Find middle: <code>O(N/2)</code><br>• Reverse second half: <code>O(N/2)</code><br>• Compare: <code>O(N/2)</code><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• No extra array for reversal<br>• In-place manipulation<br><strong>Result:</strong> <code>O(1)</code>",
                visual: `
                    <h4 style="color:#c026d3;">🦋 The Butterfly: Find Mid → Reverse → Compare</h4>
                    <div style="display:flex; flex-direction:column; gap:12px; margin:15px 0; max-width:550px;">
                        <div style="display:flex; gap:12px; flex-wrap:wrap; justify-content:center;">
                            <div style="background:#1e293b; padding:14px; border-radius:10px; text-align:center; flex:1; min-width:180px;">
                                <div style="font-size:0.8rem; color:#94a3b8; margin-bottom:6px;">Original:</div>
                                <div style="font-family:monospace; font-size:0.85rem; display:flex; gap:4px; justify-content:center;">
                                    <span style="color:#4ade80;">1</span><span style="color:#475569;">→</span>
                                    <span style="color:#4ade80;">2</span><span style="color:#475569;">→</span>
                                    <span style="color:#fbbf24; font-weight:bold;">|</span><span style="color:#475569;">→</span>
                                    <span style="color:#f87171;">2</span><span style="color:#475569;">→</span>
                                    <span style="color:#f87171;">1</span>
                                </div>
                            </div>
                        </div>
                        <div style="display:flex; gap:12px; flex-wrap:wrap; justify-content:center;">
                            <div style="background:rgba(74,222,128,0.08); border:1px solid rgba(74,222,128,0.3); padding:12px; border-radius:10px; text-align:center; flex:1; min-width:140px;">
                                <div style="font-size:0.75rem; color:#4ade80; font-weight:bold; margin-bottom:4px;">Left Wing</div>
                                <div style="font-family:monospace; font-size:0.85rem; color:#4ade80;">1 → 2</div>
                            </div>
                            <div style="display:flex; align-items:center; font-size:1.2rem;">🔄</div>
                            <div style="background:rgba(248,113,113,0.08); border:1px solid rgba(248,113,113,0.3); padding:12px; border-radius:10px; text-align:center; flex:1; min-width:140px;">
                                <div style="font-size:0.75rem; color:#f87171; font-weight:bold; margin-bottom:4px;">Right Wing (reversed)</div>
                                <div style="font-family:monospace; font-size:0.85rem; color:#f87171;">1 → 2</div>
                            </div>
                        </div>
                        <div style="background:#0f172a; padding:10px; border-radius:8px; font-size:0.82rem; color:#94a3b8; text-align:center;">
                            Compare node by node: <span style="color:#4ade80;">1==1</span> ✓ <span style="color:#4ade80;">2==2</span> ✓ → <span style="color:#fbbf24; font-weight:bold;">Palindrome!</span>
                        </div>
                    </div>`,
                crux: "Singly lists only go forward. To read backward, we must <strong>Reverse the Second Half</strong>.",
                trap: "<strong>Destructive Read:</strong> You broke the list! Good engineers restore the list before returning.",
                dryRun: ["1. 1->2->2->1. Slow at 2nd 2.", "2. Reverse 2->1 to 1->2.", "3. Compare 1->2 with 1->2. Match."],
                codeTitle: "Python Solution",
                code: `def isPalindrome(head):
slow, fast = head, head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next

prev = None
curr = slow
while curr: # Reverse 2nd half
    tmp = curr.next
    curr.next = prev
    prev = curr
    curr = tmp
    
left, right = head, prev
while right:
    if left.val != right.val: return False
    left = left.next
    right = right.next
return True`,
                strategy: `<strong>Half-Reversal Strategy:</strong><br><strong>Step 1:</strong> Find middle using slow/fast pointers.<br><strong>Step 2:</strong> Reverse second half in-place.<br><strong>Step 3:</strong> Compare first half with reversed second half node by node.<br><br><strong>Why it works:</strong> Singly linked list can only go forward. Reversing second half lets us compare from both ends toward the center.`,
                codeDetailed: `def isPalindrome(head):
    # ← Step 1: Find middle (slow/fast)
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next               # ← Slow at middle
        fast = fast.next.next
    
    # ← Step 2: Reverse second half
    prev = None
    curr = slow
    while curr:
        tmp = curr.next
        curr.next = prev               # ← Reverse pointer
        prev = curr
        curr = tmp
    
    # ← Step 3: Compare both halves
    left, right = head, prev           # ← prev is reversed tail
    while right:
        if left.val != right.val:
            return False               # ← Mismatch = not palindrome
        left = left.next
        right = right.next
    return True                        # ← All matched!`
            }
        }
    ]
}

window.currentTopicData = topic_linked_list;
