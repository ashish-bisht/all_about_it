// Linked List data
// Extracted from data.js

const topic_linked_list = {
    id: "linked_list",
    title: "Linked List Mastery",
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
                    "🎯 <strong>DLL + Map kyun?</strong> O(1) delete/add chahiye (DLL) aur O(1) lookup (Map)",
                    "⚡ <code>get(k)</code>: Map lookup node OR return -1. Move node to Head (Most Recent)",
                    "🔄 <code>put(k, v)</code>: If exists, update val & move head. Else add new head. If full, delete tail",
                    "✅ Helper: <code>_remove(node)</code> removes from list, <code>_add(node)</code> adds to list head",
                    "💡 Tail = Least Recent, Head = Most Recent"
                ],
                metrics: { time: "O(1)", space: "O(N)" },
                timeExplainer: "<strong>Time Analysis:</strong><br>• <code>get()</code>: HashMap lookup = <code>O(1)</code><br>• <code>put()</code>: Map + DLL operations = <code>O(1)</code><br><br><strong>All operations:</strong> <code>O(1)</code> average",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• HashMap: <code>O(N)</code> for N key-value pairs<br>• Doubly Linked List: <code>O(N)</code> nodes<br><br><strong>Total:</strong> <code>O(N)</code>",
                visual: "<span><strong>Visual: The Hybrid Engine</strong><br>HashMap stores <code>{Key -> Node}</code> for speed.<br>DLL stores <code>Order</code> (Head=Recent, Tail=Old).</span>",
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
        del self.cache[lru.key]`
            }
        },
        {
            id: "reverse-linked-list-k-group",
            title: "Reverse in K Groups",
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
                    "🎯 <strong>Reverse per group kyun?</strong> Problem says 'k nodes' at a time",
                    "⚡ Check length: <code>kth = get_kth(group_prev, k)</code> — agar k nodes nahi, toh stop!",
                    "🔄 Reverse: Standard reverse logic inside the group range",
                    "✅ Rewire: <code>group_prev.next = kth</code> (new head); <code>group_start.next = next_group</code>",
                    "💡 Dummy Node bahut zaroori hai to handle head change easily"
                ],
                metrics: { time: "O(N)", space: "O(1)" },
                timeExplainer: "<strong>Time Analysis:</strong><br>• Visit each node once<br>• Reversal within groups is O(K)<br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Only pointers for manipulation<br>• No extra data structures<br><br><strong>Result:</strong> <code>O(1)</code>",
                visual: "<span><strong>Visual: The Surgery</strong><br>1. Identify K segment.<br>2. Snip wires.<br>3. Flip.<br>4. Reconnect Anchors.</span>",
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
    
return dummy.next`
            }
        },
        {
            id: "linked-list-cycle-ii",
            title: "Detect Loop Start",
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
                    "🎯 <strong>Floyd Cycle kyun?</strong> O(N) time aur O(1) space — HashSet O(N) space leta hai",
                    "⚡ Phase 1: <code>slow/fast</code> collision detect karo",
                    "🔄 Phase 2: <code>slow = head</code>, move both 1 step. Collision point = Cycle Start",
                    "✅ Why works? Math proves <code>dist(head, start) == dist(meet, start)</code>",
                    "💡 Start milne pe ruk jao, wahi loop entry hai"
                ],
                metrics: { time: "O(N)", space: "O(1)" },
                timeExplainer: "<strong>Floyd's Algorithm:</strong><br>• Phase 1: Detect cycle = <code>O(N)</code><br>• Phase 2: Find start = <code>O(N)</code><br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Only 2 pointers: slow, fast<br>• No HashSet needed!<br><br><strong>Result:</strong> <code>O(1)</code>",
                visual: "<span><strong>Visual: The P Shape</strong><br>Distance(Head to Start) = Distance(Meeting to Start).</span>",
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
return None`
            }
        },
        {
            id: "copy-list-with-random-pointer",
            title: "Clone with Random Pointer",
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
                    "🎯 <strong>Interleaving kyun?</strong> O(1) space trick! Node ke bagal mein copy rakho",
                    "⚡ Weave: <code>A -> A' -> B -> B'</code>",
                    "🔄 Random: <code>curr.next.random = curr.random.next</code> — easy navigation",
                    "✅ Unweave: <code>curr.next = curr.next.next</code> — restore original list",
                    "💡 HashMap approach is simpler (O(N) space) but interleaving is 'cool' optimization"
                ],
                metrics: { time: "O(N)", space: "O(1) (Interleaving)" },
                timeExplainer: "<strong>3-Pass Algorithm:</strong><br>• Pass 1: Weave copies = <code>O(N)</code><br>• Pass 2: Link randoms = <code>O(N)</code><br>• Pass 3: Unweave = <code>O(N)</code><br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Interleaving Method:</strong><br>• Insert copies inline<br>• No HashMap needed<br><br><strong>Result:</strong> <code>O(1)</code> extra space",
                visual: "<span><strong>Visual: DNA Replication</strong><br>Pass 1: Weave A->A'->B->B'.<br>Pass 2: Link Randoms.<br>Pass 3: Unweave.</span>",
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
return new_head`
            }
        },
        {
            id: "palindrome-linked-list",
            title: "Palindrome Linked List",
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
                timeExplainer: "<strong>Time Breakdown:</strong><br>• Find middle: <code>O(N/2)</code><br>• Reverse second half: <code>O(N/2)</code><br>• Compare: <code>O(N/2)</code><br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• No extra array for reversal<br>• In-place manipulation<br><br><strong>Result:</strong> <code>O(1)</code>",
                visual: "<span><strong>Visual: The Butterfly</strong><br>1. Find Body (Mid).<br>2. Flip Right Wing.<br>3. Compare Wings.</span>",
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
return True`
            }
        }
    ]
}
