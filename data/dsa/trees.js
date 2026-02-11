// Trees data
// Extracted from data.js

const topic_trees = {
    id: "trees",
    title: "Tree Mastery",
    description: "Principal Engineer DSA • Day 5",
    color: "#16a34a",
    icon: "fas fa-tree",
    mentalModel: {
        whenToApply: [
            { label: "🔄 LCA Problems", desc: "Find common ancestor → Bubble-up DFS or BST property" },
            { label: "📈 Path Sum/Max", desc: "Track global vs local → Split (update global) + Flow (return)" },
            { label: "🏗️ Construction", desc: "Build from traversals → Preorder=root, Inorder=split" },
            { label: "📦 Serialize", desc: "Tree ↔ String → Preorder + null markers 'N'" },
            { label: "🔥 Multi-direction", desc: "Need to go UP? → Convert to Graph (parent pointers)" },
            { label: "🎯 BST Property", desc: "Sorted tree → left < root < right, use for O(H) search" }
        ],
        patterns: [
            { algo: "LCA (Binary Tree)", use: "Common ancestor", time: "O(N)", space: "O(H)", template: "if root==p or q: return root; combine L/R" },
            { algo: "LCA (BST)", use: "Common ancestor BST", time: "O(H)", space: "O(1)", template: "both < root: left; both > root: right; else: split!" },
            { algo: "Max Path Sum", use: "Any-to-any path", time: "O(N)", space: "O(H)", template: "global = split, return = flow" },
            { algo: "Serialize/Deserialize", use: "Tree to string", time: "O(N)", space: "O(N)", template: "preorder + 'N' markers + iterator" },
            { algo: "Construct Tree", use: "Pre+In to tree", time: "O(N)", space: "O(N)", template: "pre=root, inorder=split, use hashmap" },
            { algo: "Tree to Graph", use: "Burn tree, multi-dir", time: "O(N)", space: "O(N)", template: "Build adj list with parent links, BFS" }
        ],
        decisionTree: `
<div style="background:#1e293b; padding:25px; border-radius:16px; margin:15px 0; border:1px solid rgba(255,255,255,0.1);">
<h4 style="color:#a78bfa; margin-bottom:20px; text-align:center; font-size:1.1rem;">🧠 Tree Pattern Recognition</h4>
<div style="font-family:monospace; font-size:0.85rem; line-height:1.8;">
<pre style="color:#e2e8f0; text-align:left; margin:0;">
              ┌──────────────────────────────┐
              │ "What type of tree problem?" │
              └──────────────┬───────────────┘
                             │
     ┌───────────────────────┼───────────────────────┐
     ▼                       ▼                       ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│    SEARCH    │      │  CONSTRUCT   │      │  PATH/SUM    │
│  LCA/Find    │      │  Build Tree  │      │   Problems   │
└──────┬───────┘      └──────┬───────┘      └──────┬───────┘
       │                     │                     │
       ▼                     ▼                     ▼
  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
  │ BST?        │      │ Pre + In?   │      │ Global vs   │
  │ → O(H) walk │      │ → Pre=root  │      │ Local!      │
  │             │      │   In=split  │      │             │
  │ Binary?     │      │             │      │ Split: L+R  │
  │ → Bubble-up │      │ Serialize?  │      │ Flow: max() │
  └─────────────┘      │ → Pre + 'N' │      └─────────────┘
                       └─────────────┘

       "Need to go UP the tree?"
              │
              ▼
      ┌───────────────────┐
      │ Convert to Graph! │
      │ Parent pointers   │
      │ + BFS from start  │
      └───────────────────┘
</pre>
</div>
</div>`,
        codeTemplates: `
<div style="background:#0f172a; padding:20px; border-radius:12px; margin:15px 0;">
<h4 style="color:#10b981; margin-bottom:15px;">📝 Tree Templates</h4>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
1️⃣ LCA Binary Tree (Bubble-up)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def lowestCommonAncestor(root, p, q):
    if not root or root == p or root == q:
        return root
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)
    if left and right: return root  # I am LCA
    return left if left else right
</pre>
</details>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
2️⃣ Max Path Sum (Global vs Local)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def maxPathSum(root):
    max_sum = float('-inf')
    def dfs(node):
        nonlocal max_sum
        if not node: return 0
        left = max(dfs(node.left), 0)   # Clamp negatives!
        right = max(dfs(node.right), 0)
        # SPLIT: Update global (L + root + R)
        max_sum = max(max_sum, node.val + left + right)
        # FLOW: Return to parent (max path through me)
        return node.val + max(left, right)
    dfs(root)
    return max_sum
</pre>
</details>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
3️⃣ Serialize/Deserialize
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def serialize(root):
    vals = []
    def dfs(node):
        if not node: vals.append("N"); return
        vals.append(str(node.val))
        dfs(node.left); dfs(node.right)
    dfs(root)
    return ",".join(vals)

def deserialize(data):
    vals = iter(data.split(","))
    def build():
        val = next(vals)
        if val == "N": return None
        node = TreeNode(int(val))
        node.left, node.right = build(), build()
        return node
    return build()
</pre>
</details>

<details>
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
4️⃣ Tree to Graph (Burn Tree)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def burnTree(root, start):
    graph = defaultdict(list)
    def buildGraph(node):
        if not node: return
        if node.left:
            graph[node.val].append(node.left.val)
            graph[node.left.val].append(node.val)
            buildGraph(node.left)
        if node.right:
            graph[node.val].append(node.right.val)
            graph[node.right.val].append(node.val)
            buildGraph(node.right)
    buildGraph(root)
    # BFS from start
    return bfs_from(graph, start)
</pre>
</details>
</div>`,
        safetyCheck: [
            { label: "🔍 Base case!", desc: "<code>if not root: return None/0</code> — Always first!" },
            { label: "🌳 Height vs Nodes!", desc: "Space = O(H) for recursion. H = log N (balanced), H = N (skewed)" },
            { label: "📈 Clamp negatives!", desc: "Max path: <code>left = max(dfs(left), 0)</code> — Ignore negative subtrees" },
            { label: "🔄 Global vs Local!", desc: "Split updates global (L+R), Flow returns to parent (max one branch)" },
            { label: "📋 Use Iterator!", desc: "Deserialize: <code>iter()</code> not index — avoids O(N) slicing" },
            { label: "↕️ Need parent?", desc: "Tree only goes down. For UP: convert to graph or track parent" }
        ]
    },
    questions: [
        {
            id: "lca-binary-tree",
            title: "LCA in Binary Tree",
            leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["DFS Pattern"],
            quiz: {
                description: "Find LCA in general binary tree. Best approach?",
                options: [
                    "Find paths to both, compare",
                    "Recursive: if root is p or q, return root. Combine left/right results",
                    "Level-order",
                    "Iterative"
                ],
                correct: 1,
                explanation: "Recursive DFS! Base: if root == p or q or null, return root. Recurse left/right. If both return node, I am LCA. If one, return that."
            },
            learn: {
                quickAlgo: [
                    "if not root or root == p or root == q: # 🎯 Base Case: Found target or None",
                    "    return root",
                    "left = dfs(root.left, p, q)        # ⚡ Search Left Subtree",
                    "right = dfs(root.right, p, q)      # ⚡ Search Right Subtree",
                    "if left and right:                 # ✅ Both sides returned non-null?",
                    "    return root                    #    -> Current 'root' is the Split Point (LCA)",
                    "return left if left else right     # 🔄 Propagate found node upwards"
                ],
                metrics: { time: "O(N)", space: "O(H)" },
                timeExplainer: "<strong>DFS Traversal:</strong><br>• Visit every node once<br>• Recurse Left and Right<br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Recursion Stack depth = Tree Height<br>• Skewed Tree: <code>O(N)</code><br>• Balanced Tree: <code>O(log N)</code><br><br><strong>Result:</strong> <code>O(H)</code>",
                visual: `
                    <h4 style="color:#c026d3;">🤝 The Meeting Point</h4>
                    <div style="display:flex; flex-direction:column; align-items:center; gap:12px; margin:15px 0;">
                        <div style="background:#1e293b; padding:20px 30px; border-radius:12px; font-family:monospace; font-size:0.85rem; line-height:2; color:#cbd5e1; text-align:center;">
                            <span style="color:#fbbf24; font-weight:bold;">         3</span><br>
                            <span style="color:#94a3b8;">       /   \\</span><br>
                            <span style="color:#4ade80; font-weight:bold;">     5</span>       <span style="color:#f87171; font-weight:bold;">1</span><br>
                            <span style="color:#94a3b8;">   / \\     / \\</span><br>
                            <span style="color:#94a3b8;">  6   2   0   8</span>
                        </div>
                        <div style="display:flex; gap:15px; flex-wrap:wrap; justify-content:center;">
                            <div style="background:rgba(74,222,128,0.1); border:1px solid rgba(74,222,128,0.3); padding:10px 16px; border-radius:8px; font-size:0.85rem;">
                                <span style="color:#4ade80; font-weight:bold;">P = 5</span>
                                <span style="color:#64748b;"> → found in LEFT</span>
                            </div>
                            <div style="background:rgba(248,113,113,0.1); border:1px solid rgba(248,113,113,0.3); padding:10px 16px; border-radius:8px; font-size:0.85rem;">
                                <span style="color:#f87171; font-weight:bold;">Q = 1</span>
                                <span style="color:#64748b;"> → found in RIGHT</span>
                            </div>
                            <div style="background:rgba(251,191,36,0.1); border:1px solid rgba(251,191,36,0.3); padding:10px 16px; border-radius:8px; font-size:0.85rem;">
                                <span style="color:#fbbf24; font-weight:bold;">LCA = 3</span>
                                <span style="color:#64748b;"> → both sides returned!</span>
                            </div>
                        </div>
                        <div style="background:#0f172a; padding:12px 16px; border-radius:8px; font-size:0.85rem; color:#94a3b8; max-width:400px; text-align:center;">
                            <strong style="color:#a78bfa;">Rule:</strong> If left AND right both return non-null → current node is the LCA
                        </div>
                    </div>`,
                crux: "<strong>Bubbling Up:</strong><br>1. If I am P or Q, return Me.<br>2. If Left & Right both return something, I am LCA.<br>3. Else return non-null child.",
                trap: "<strong>Missing Node:</strong> Standard algo assumes both nodes exist.",
                dryRun: ["1. Found P in Left. Return P.", "2. Found Q in Right. Return Q.", "3. Root receives P and Q. Returns Root."],
                codeTitle: "Python Solution",
                code: `def lowestCommonAncestor(root, p, q):
if not root or root == p or root == q: return root
left = lowestCommonAncestor(root.left, p, q)
right = lowestCommonAncestor(root.right, p, q)
if left and right: return root
return left if left else right`
            }
        },
        {
            id: "serialize-deserialize-binary-tree",
            title: "Serialize & Deserialize",
            leetcodeUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["System Design Core"],
            quiz: {
                description: "Convert tree to string and back. Best traversal?",
                options: ["Inorder", "Preorder with null markers", "Postorder", "Level-order"],
                correct: 1,
                explanation: "Preorder + null markers! Serialize: '1,2,N,N,3'. Deserialize: Iterator. If 'N' return None. Else create node, recurse."
            },
            learn: {
                quickAlgo: [
                    "vals = []",
                    "def encode(node):                  # 🎯 Preorder Traversal (Root->Left->Right)",
                    "    if not node: vals.append('#')  # ⚡ Mark nulls to keep structure",
                    "    else:",
                    "        vals.append(str(node.val))",
                    "        encode(node.left); encode(node.right)",
                    "def decode(iter_vals):             # 🔄 Reconstruct matches Preorder",
                    "    val = next(iter_vals)",
                    "    if val == '#': return None     # ✅ Null marker -> Stop branch",
                    "    node = TreeNode(int(val))",
                    "    node.left = decode(iter_vals)  # 💡 Next val goes to left child",
                    "    node.right = decode(iter_vals)",
                    "    return node"
                ],
                metrics: { time: "O(N)", space: "O(H)" },
                timeExplainer: "<strong>Preorder Traversal:</strong><br>• Visit all nodes to serialize: <code>O(N)</code><br>• Deserialize visits all nodes: <code>O(N)</code><br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Recursion Stack: <code>O(H)</code><br>• Output String/Array: <code>O(N)</code><br><br><strong>Result:</strong> <code>O(N)</code>",
                visual: `
                    <h4 style="color:#c026d3;">📦 Serialize: Preorder + Null Markers</h4>
                    <div style="display:flex; flex-direction:column; gap:15px; margin:15px 0;">
                        <div style="display:flex; align-items:center; gap:20px; flex-wrap:wrap; justify-content:center;">
                            <div style="background:#1e293b; padding:20px; border-radius:12px; font-family:monospace; font-size:0.85rem; line-height:2; color:#cbd5e1; text-align:center;">
                                <span style="color:#fbbf24; font-weight:bold;">    1</span><br>
                                <span style="color:#94a3b8;">  /   \\</span><br>
                                <span style="color:#4ade80;">2</span>       <span style="color:#f87171;">3</span><br>
                                <span style="color:#94a3b8;">       / \\</span><br>
                                <span style="color:#94a3b8;">      4   5</span>
                            </div>
                            <div style="color:#64748b; font-size:1.5rem;">→</div>
                            <div style="background:#1e293b; padding:16px 20px; border-radius:12px;">
                                <div style="font-size:0.75rem; color:#94a3b8; margin-bottom:6px;">Serialized String:</div>
                                <div style="font-family:monospace; font-size:0.9rem;">
                                    <span style="color:#fbbf24; font-weight:bold;">1</span><span style="color:#475569;">,</span>
                                    <span style="color:#4ade80;">2</span><span style="color:#475569;">,</span>
                                    <span style="color:#f87171;">N</span><span style="color:#475569;">,</span>
                                    <span style="color:#f87171;">N</span><span style="color:#475569;">,</span>
                                    <span style="color:#4ade80;">3</span><span style="color:#475569;">,</span>
                                    <span style="color:#4ade80;">4</span><span style="color:#475569;">,</span>
                                    <span style="color:#f87171;">N</span><span style="color:#475569;">,</span>
                                    <span style="color:#f87171;">N</span><span style="color:#475569;">,</span>
                                    <span style="color:#4ade80;">5</span><span style="color:#475569;">,</span>
                                    <span style="color:#f87171;">N</span><span style="color:#475569;">,</span>
                                    <span style="color:#f87171;">N</span>
                                </div>
                            </div>
                        </div>
                        <div style="background:#0f172a; padding:12px 16px; border-radius:8px; display:flex; gap:20px; justify-content:center; font-size:0.85rem;">
                            <span><span style="color:#f87171; font-weight:bold;">N</span> <span style="color:#94a3b8;">= Null marker (preserves shape)</span></span>
                            <span><span style="color:#a78bfa; font-weight:bold;">Deser:</span> <span style="color:#94a3b8;">Use iterator, if "N" → return None</span></span>
                        </div>
                    </div>`,
                crux: "<strong>Preorder (Root-Left-Right):</strong><br>Ser: `vals.append(str(node.val))` or 'N'.<br>Deser: `next(iter)`. If 'N', return None.",
                trap: "<strong>Global Index:</strong> Don't use a global integer index. Use an <strong>Iterator</strong>.",
                dryRun: ["Ser: [1, 2, N, N, 3, N, N].", "Deser: 1 -> Left(2) -> Left(N), Right(N). 1 -> Right(3)."],
                codeTitle: "Python Solution",
                code: `class Codec:
def serialize(self, root):
    vals = []
    def dfs(node):
        if not node: vals.append("N"); return
        vals.append(str(node.val))
        dfs(node.left)
        dfs(node.right)
    dfs(root)
    return ",".join(vals)

def deserialize(self, data):
    vals = iter(data.split(","))
    def build():
        val = next(vals)
        if val == "N": return None
        node = TreeNode(int(val))
        node.left = build()
        node.right = build()
        return node
    return build()`
            }
        },
        {
            id: "binary-tree-maximum-path-sum",
            title: "Maximum Path Sum",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Global vs Local"],
            quiz: {
                description: "Path can start/end anywhere. What's the trick?",
                options: ["Try all paths", "DFS: track global max, return single-path max upward", "DP", "BFS"],
                correct: 1,
                explanation: "Global vs Local! At each node: global_max = max(global_max, node + left + right). Return upward: node + max(left, right)."
            },
            learn: {
                quickAlgo: [
                    "self.global_max = float('-inf')",
                    "def dfs(node):",
                    "    if not node: return 0",
                    "    L = max(dfs(node.left), 0)     # ⚡ Clamp negatives to 0 (Don't extend bad path)",
                    "    R = max(dfs(node.right), 0)",
                    "    self.global_max = max(self.global_max, node.val + L + R) # ✅ Split point potential",
                    "    return node.val + max(L, R)    # 🔄 Return max SINGLE branch to parent"
                ],
                metrics: { time: "O(N)", space: "O(H)" },
                timeExplainer: "<strong>DFS Postorder:</strong><br>• Compute max path for each node<br>• Visit every node exactly once<br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Recursion Stack depth = Tree Height<br>• Worst case (Skewed): <code>O(N)</code><br><br><strong>Result:</strong> <code>O(H)</code>",
                visual: `
                    <h4 style="color:#c026d3;">⛰️ Split (Arch) vs Flow (Straight)</h4>
                    <div style="display:flex; gap:20px; flex-wrap:wrap; justify-content:center; margin:15px 0;">
                        <div style="background:#1e293b; padding:20px; border-radius:12px; flex:1; min-width:220px; max-width:300px;">
                            <div style="text-align:center; margin-bottom:10px; font-size:0.85rem; color:#fbbf24; font-weight:bold;">🏔️ SPLIT (Update Global)</div>
                            <div style="font-family:monospace; font-size:0.85rem; line-height:2; color:#cbd5e1; text-align:center;">
                                <span style="color:#94a3b8;">  Left</span> ← <span style="color:#fbbf24; font-weight:bold;">Root</span> → <span style="color:#94a3b8;">Right</span><br>
                                <span style="color:#4ade80;">  15</span>   ← <span style="color:#fbbf24; font-weight:bold;">20</span>   → <span style="color:#4ade80;">7</span>
                            </div>
                            <div style="background:#0f172a; padding:10px; border-radius:6px; margin-top:10px; font-size:0.8rem; color:#94a3b8; text-align:center;">
                                Global = <span style="color:#fbbf24;">15 + 20 + 7 = <strong>42</strong></span>
                            </div>
                        </div>
                        <div style="background:#1e293b; padding:20px; border-radius:12px; flex:1; min-width:220px; max-width:300px;">
                            <div style="text-align:center; margin-bottom:10px; font-size:0.85rem; color:#38bdf8; font-weight:bold;">📤 FLOW (Return to Parent)</div>
                            <div style="font-family:monospace; font-size:0.85rem; line-height:2; color:#cbd5e1; text-align:center;">
                                <span style="color:#94a3b8;">  Left</span>   <span style="color:#38bdf8; font-weight:bold;">Root</span><br>
                                <span style="color:#4ade80;">  15</span>     + <span style="color:#38bdf8; font-weight:bold;">20</span>
                            </div>
                            <div style="background:#0f172a; padding:10px; border-radius:6px; margin-top:10px; font-size:0.8rem; color:#94a3b8; text-align:center;">
                                Return = <span style="color:#38bdf8;">20 + max(15, 7) = <strong>35</strong></span>
                            </div>
                        </div>
                    </div>
                    <div style="background:#0f172a; padding:12px 16px; border-radius:8px; font-size:0.85rem; color:#94a3b8; text-align:center;">
                        <strong style="color:#f87171;">Key:</strong> Clamp negative gains to 0 → <code style="color:#f87171;">max(gain, 0)</code>
                    </div>`,
                crux: "<strong>1. Split:</strong> `Root + Left + Right`. Update Global Max.<br><strong>2. Flow:</strong> `Root + max(Left, Right)`. Return to parent.<br><strong>3. Clamp:</strong> `max(gain, 0)`.",
                trap: "<strong>Negative Gain:</strong> If subtree sum is negative, ignore it (clamp to 0).",
                dryRun: ["Left gives 15. Right gives 7. Root is 20.", "Global update: 15+7+20 = 42.", "Return: 20 + 15 = 35."],
                codeTitle: "Python Solution",
                code: `class Solution:
def maxPathSum(self, root):
    self.max_sum = float('-inf')
    def get_max(node):
        if not node: return 0
        left = max(get_max(node.left), 0)
        right = max(get_max(node.right), 0)
        self.max_sum = max(self.max_sum, node.val + left + right)
        return node.val + max(left, right)
    get_max(root)
    return self.max_sum`
            }
        },
        {
            id: "construct-binary-tree-preorder-inorder",
            title: "Construct Tree (Pre+In)",
            leetcodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Index Mastery"],
            quiz: {
                description: "Rebuild tree from two traversals. Key insight?",
                options: ["Preorder gives roots, Inorder gives split", "Hash Inorder", "Stack", "Level order"],
                correct: 0,
                explanation: "Preorder[0] is Root. Find Root in Inorder. Left of it is LeftSubtree, Right is RightSubtree."
            },
            learn: {
                quickAlgo: [
                    "in_map = {val: idx for idx, val in enumerate(inorder)} # 🎯 O(1) lookup for root in inorder",
                    "pre_idx = 0                                            # ⚡ Global index for preorder (current root)",
                    "def build(in_start, in_end):",
                    "    nonlocal pre_idx",
                    "    if in_start > in_end: return None                 # ✅ Base Case: No elements left",
                    "    root_val = preorder[pre_idx]",
                    "    root = TreeNode(root_val)",
                    "    pre_idx += 1",
                    "    mid = in_map[root_val]                             # 🔄 Find root in inorder to split",
                    "    root.left = build(in_start, mid - 1)               # 💡 Build left subtree",
                    "    root.right = build(mid + 1, in_end)              # 💡 Build right subtree",
                    "    return root"
                ],
                metrics: { time: "O(N)", space: "O(N)" },
                timeExplainer: "<strong>Time Breakdown:</strong><br>• HashMap construction: <code>O(N)</code><br>• Recursive Tree Building: <code>O(N)</code><br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• HashMap stores N indices<br>• Recursion Stack: <code>O(H)</code><br><br><strong>Total:</strong> <code>O(N)</code>",
                visual: `
                    <h4 style="color:#c026d3;">🔪 The Knife: Root Slices Inorder</h4>
                    <div style="display:flex; flex-direction:column; gap:15px; margin:15px 0; max-width:600px;">
                        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
                            <div style="background:#1e293b; padding:12px 16px; border-radius:8px; flex:1; min-width:200px;">
                                <div style="font-size:0.75rem; color:#94a3b8; margin-bottom:6px;">Preorder (gives roots):</div>
                                <div style="font-family:monospace; font-size:0.9rem;">
                                    [<span style="color:#fbbf24; font-weight:bold; text-decoration:underline;">3</span>, 9, 20, 15, 7]
                                </div>
                                <div style="font-size:0.75rem; color:#fbbf24; margin-top:4px;">↑ First = Root!</div>
                            </div>
                            <div style="background:#1e293b; padding:12px 16px; border-radius:8px; flex:1; min-width:200px;">
                                <div style="font-size:0.75rem; color:#94a3b8; margin-bottom:6px;">Inorder (splits L/R):</div>
                                <div style="font-family:monospace; font-size:0.9rem;">
                                    [<span style="color:#4ade80;">9</span>, <span style="color:#fbbf24; font-weight:bold;">|3|</span>, <span style="color:#f87171;">20, 15, 7</span>]
                                </div>
                                <div style="font-size:0.75rem; color:#94a3b8; margin-top:4px;"><span style="color:#4ade80;">← Left</span> | <span style="color:#f87171;">Right →</span></div>
                            </div>
                        </div>
                        <div style="background:#1e293b; padding:16px; border-radius:12px; text-align:center;">
                            <div style="font-family:monospace; font-size:0.85rem; line-height:2; color:#cbd5e1;">
                                <span style="color:#fbbf24; font-weight:bold;">      3</span><br>
                                <span style="color:#94a3b8;">    /   \\</span><br>
                                <span style="color:#4ade80;">  9</span>     <span style="color:#f87171;">20</span><br>
                                <span style="color:#94a3b8;">        / \\</span><br>
                                <span style="color:#f87171;">      15   7</span>
                            </div>
                        </div>
                        <div style="background:#0f172a; padding:12px 16px; border-radius:8px; font-size:0.85rem; color:#94a3b8;">
                            <strong style="color:#a78bfa;">Steps:</strong> 1. Pop root from Preorder → 2. Find in Inorder (HashMap!) → 3. Left size = mid - start → 4. Recurse
                        </div>
                    </div>`,
                crux: "1. `root = pre.next()`<br>2. `mid = map[root]`<br>3. `size = mid - in_start`<br>4. Recurse.",
                trap: "<strong>Slicing:</strong> `pre[1:]` is O(N). Use indices or iterator!",
                dryRun: ["Pre: [3,9,20]. In: [9,3,20].", "Root=3. Mid=1. LeftSize=1.", "Left: Build([9]). Right: Build([20])."],
                codeTitle: "Python Solution",
                code: `def buildTree(preorder, inorder):
in_map = {v: i for i, v in enumerate(inorder)}
pre_iter = iter(preorder)

def build(l, r):
    if l > r: return None
    val = next(pre_iter)
    root = TreeNode(val)
    mid = in_map[val]
    root.left = build(l, mid - 1)
    root.right = build(mid + 1, r)
    return root
    
return build(0, len(inorder) - 1)`
            }
        },
        {
            id: "largest-bst-in-bt",
            title: "Largest BST in Binary Tree",
            leetcodeUrl: "https://practice.geeksforgeeks.org/problems/largest-bst/1",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Postorder"],
            quiz: {
                description: "Find size of largest BST subtree. Return type?",
                options: ["Boolean only", "Size only", "Generic Tuple (min, max, size, isBST)", "Void"],
                correct: 2,
                explanation: "Postorder Tuple! Each node needs from children: (Min_Val, Max_Val, Size, Is_BST). If Left is BST & Right is BST & MaxLeft < Node < MinRight -> Current is BST."
            },
            learn: {
                quickAlgo: [
                    "def validate(node, min_val, max_val):",
                    "    if not node: return True           # 🎯 Base Case: Empty tree is a valid BST",
                    "    if not (min_val < node.val < max_val): # ⚡ Check current node's value against range",
                    "        return False",
                    "    # ✅ Recursively check left and right subtrees with updated ranges",
                    "    return validate(node.left, min_val, node.val) and \\",
                    "           validate(node.right, node.val, max_val)"
                ],
                metrics: { time: "O(N)", space: "O(H)" },
                code: `def largestBST(root):
# Return: (min_val, max_val, size)
def postorder(node):
    if not node: return (float('inf'), float('-inf'), 0)
    
    l_min, l_max, l_size = postorder(node.left)
    r_min, r_max, r_size = postorder(node.right)
    
    if l_max < node.val < r_min:
        return (min(l_min, node.val), max(r_max, node.val), l_size + r_size + 1)
    
    return (float('-inf'), float('inf'), max(l_size, r_size))
    
    return (float('-inf'), float('inf'), max(l_size, r_size))
    
return postorder(root)[2]`,
                codeDetailed: `def largestBST(root):
    """
    Largest BST Subtree
    
    STRATEGY: Postorder Traversal (Bottom-Up)
    - Each node needs information from children to decide if it forms a BST.
    - Info needed: (Min_Val, Max_Val, Size)
    - Logic:
      - Valid BST if: MaxLeft < Node < MinRight
      - If Valid: Size = LeftSize + RightSize + 1
      - Update Return: (NewMin, NewMax, NewSize)
      - If Invalid: Return (-inf, inf, max(LeftSize, RightSize)) to propagate failure
      
    Time: O(N), Space: O(H)
    """
    # ... (Implementation uses tuple returns)
    pass`,
                visual: `
                    <h4 style="color:#c026d3;">🔺 Green Triangle: Bottom-Up BST Validation</h4>
                    <div style="display:flex; flex-direction:column; gap:15px; margin:15px 0; max-width:600px;">
                        <div style="display:flex; gap:15px; flex-wrap:wrap; justify-content:center;">
                            <div style="background:#1e293b; padding:16px; border-radius:12px; text-align:center; min-width:180px;">
                                <div style="font-size:0.8rem; color:#4ade80; font-weight:bold; margin-bottom:8px;">✅ Valid BST</div>
                                <div style="font-family:monospace; font-size:0.85rem; line-height:1.8; color:#cbd5e1;">
                                    <span style="color:#fbbf24; font-weight:bold;">  10</span><br>
                                    <span style="color:#94a3b8;"> /  \\</span><br>
                                    <span style="color:#4ade80;">5</span>    <span style="color:#4ade80;">15</span>
                                </div>
                                <div style="background:rgba(74,222,128,0.1); border:1px solid rgba(74,222,128,0.3); padding:6px 10px; border-radius:6px; margin-top:8px; font-size:0.78rem; color:#4ade80;">
                                    max(L)=5 < 10 < min(R)=15 ✓
                                </div>
                            </div>
                            <div style="background:#1e293b; padding:16px; border-radius:12px; text-align:center; min-width:180px;">
                                <div style="font-size:0.8rem; color:#f87171; font-weight:bold; margin-bottom:8px;">❌ Invalid BST</div>
                                <div style="font-family:monospace; font-size:0.85rem; line-height:1.8; color:#cbd5e1;">
                                    <span style="color:#fbbf24; font-weight:bold;">  10</span><br>
                                    <span style="color:#94a3b8;"> /  \\</span><br>
                                    <span style="color:#f87171;">5</span>    <span style="color:#f87171;">8</span>
                                </div>
                                <div style="background:rgba(248,113,113,0.1); border:1px solid rgba(248,113,113,0.3); padding:6px 10px; border-radius:6px; margin-top:8px; font-size:0.78rem; color:#f87171;">
                                    min(R)=8 < 10 ✗ (right too small)
                                </div>
                            </div>
                        </div>
                        <div style="background:#0f172a; padding:12px 16px; border-radius:8px; font-size:0.85rem; color:#94a3b8;">
                            <strong style="color:#a78bfa;">Return tuple:</strong> (min, max, size, isBST) — merge upward if both children are valid BSTs
                        </div>
                    </div>`,
                crux: "<strong>Bottom-Up info pass:</strong> Return `(min, max, size)` from children. Valid if `maxLeft < node < minRight`.",
                strategy: "Postorder Traversal. Return tuple `(min, max, size, isBST)`. If valid, merge. Else return generic failure tuple.",
                trap: "<strong>Validation Range:</strong> You need `Min` from Right subtree and `Max` from Left subtree. Don't just check immediate children!",
                dryRun: [
                    "Leaf: returns (val, val, 1).",
                    "Node 10. Left(5,5,1), Right(20,20,1).",
                    "5 < 10 < 20? Yes. New Tuple: (5, 20, 3).",
                    "Parent 8. Right is (5,20,3). 8 < 5? No. Invalid.",
                    "Return max size 3."
                ]
            }
        },
        {
            id: "burn-binary-tree",
            title: "Burn a Binary Tree",
            leetcodeUrl: "https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Graph on Tree"],
            quiz: {
                description: "Time to burn tree from target node. Approach?",
                options: ["Standard DFS", "Convert to Graph (Parent Pointers) + BFS", "Inorder", "DP"],
                correct: 1,
                explanation: "Convert to Graph! Tree nodes only point down. To burn UP, we need Parent pointers (or Adj List). Then run BFS from start node to find max distance."
            },
            learn: {
                quickAlgo: [
                    "🎯 <strong>Graph conversion kyun?</strong> Tree pointers only down jaate hain, burn UP bhi hota hai",
                    "⚡ Map: <code>parent_map[node] = parent</code> — backward edge create karo",
                    "🔄 BFS: Start from Target node, spread radially (Up, Left, Right)",
                    "✅ Max Distance: Level 0 se start karo, last reachable node time dega",
                    "💡 Visited Set zaroori hai cycle/revisit avoid karne ke liye"
                ],
                metrics: { time: "O(N)", space: "O(N)" },
                code: `def amountOfTime(root, start):
graph = defaultdict(list)
def dfs(node):
    if not node: return
    if node.left:
        graph[node.val].append(node.left.val)
        graph[node.left.val].append(node.val)
        dfs(node.left)
    if node.right:
        graph[node.val].append(node.right.val)
        graph[node.right.val].append(node.val)
        dfs(node.right)
dfs(root)

q = deque([(start, 0)])
visited = {start}
max_time = 0
while q:
    node, time = q.popleft()
    max_time = max(max_time, time)
    for nei in graph[node]:
        if nei not in visited:
            visited.add(nei)
            q.append((nei, time + 1))
return max_time`,
                codeDetailed: `def amountOfTime(root, start):
    """
    Amount of Time for Binary Tree to Be Infected (Burn Tree)
    
    STRATEGY: Tree -> Graph Conversion + BFS
    - The infection spreads to Parent, Left Child, and Right Child.
    - Standard tree only links to children.
    - Step 1: Convert Tree to Graph (Adjacency List) to enable upward movement.
    - Step 2: Run BFS from the 'start' node to find the furthest node distance.
    
    Time: O(N), Space: O(N)
    """
    # ... (Graph build + BFS)
    pass`,
                visual: `
                    <h4 style="color:#c026d3;">🔥 Forest Fire: BFS from Start Node</h4>
                    <div style="display:flex; flex-wrap:wrap; gap:20px; justify-content:center; margin:15px 0;">
                        <div>
                            <div style="text-align:center; margin-bottom:5px; font-size:0.85rem; color:#94a3b8;">T = 0</div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
                                <div style="width:36px; height:36px; border-radius:50%; background:#1e293b; border:2px solid #475569; display:flex; align-items:center; justify-content:center; font-size:0.8rem; color:#94a3b8;">1</div>
                                <div style="display:flex; gap:30px;">
                                    <div style="width:36px; height:36px; border-radius:50%; background:#1e293b; border:2px solid #475569; display:flex; align-items:center; justify-content:center; font-size:0.8rem; color:#94a3b8;">2</div>
                                    <div style="width:36px; height:36px; border-radius:50%; background:#7f1d1d; border:2px solid #f87171; display:flex; align-items:center; justify-content:center; font-size:0.8rem; color:#fbbf24; font-weight:bold;">3🔥</div>
                                </div>
                            </div>
                        </div>
                        <div style="display:flex; align-items:center; color:#64748b;">➞</div>
                        <div>
                            <div style="text-align:center; margin-bottom:5px; font-size:0.85rem; color:#94a3b8;">T = 1</div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
                                <div style="width:36px; height:36px; border-radius:50%; background:#7f1d1d; border:2px solid #f87171; display:flex; align-items:center; justify-content:center; font-size:0.8rem; color:#fbbf24; font-weight:bold;">1🔥</div>
                                <div style="display:flex; gap:30px;">
                                    <div style="width:36px; height:36px; border-radius:50%; background:#1e293b; border:2px solid #475569; display:flex; align-items:center; justify-content:center; font-size:0.8rem; color:#94a3b8;">2</div>
                                    <div style="width:36px; height:36px; border-radius:50%; background:#7f1d1d; border:2px solid #991b1b; display:flex; align-items:center; justify-content:center; font-size:0.75rem; color:#94a3b8;">3✓</div>
                                </div>
                            </div>
                        </div>
                        <div style="display:flex; align-items:center; color:#64748b;">➞</div>
                        <div>
                            <div style="text-align:center; margin-bottom:5px; font-size:0.85rem; color:#94a3b8;">T = 2 ✅</div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
                                <div style="width:36px; height:36px; border-radius:50%; background:#7f1d1d; border:2px solid #991b1b; display:flex; align-items:center; justify-content:center; font-size:0.75rem; color:#94a3b8;">1✓</div>
                                <div style="display:flex; gap:30px;">
                                    <div style="width:36px; height:36px; border-radius:50%; background:#7f1d1d; border:2px solid #f87171; display:flex; align-items:center; justify-content:center; font-size:0.8rem; color:#fbbf24; font-weight:bold;">2🔥</div>
                                    <div style="width:36px; height:36px; border-radius:50%; background:#7f1d1d; border:2px solid #991b1b; display:flex; align-items:center; justify-content:center; font-size:0.75rem; color:#94a3b8;">3✓</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="background:#0f172a; padding:12px 16px; border-radius:8px; font-size:0.85rem; color:#94a3b8;">
                        <strong style="color:#f87171;">Key:</strong> Convert tree → undirected graph (add parent edges), then BFS. Answer = number of BFS levels - 1
                    </div>`,
                crux: "<strong>Tree is a Graph!</strong> Convert to Adjacency List (add parent pointers). Run BFS.",
                strategy: "1. DFS/BFS to build Graph `adj[u].append(v)`.<br>2. BFS from `start` to find max distance (levels).",
                trap: "<strong>Start Node:</strong> The 'start' is given as an integer value, not a node reference. You must find it or index by value.",
                dryRun: [
                    "Tree: 1-5-3. Start=3.",
                    "Graph: {1:[5], 5:[1,3], 3:[5*]}",
                    "BFS Q: [(3, 0)]. Visited={3}",
                    "Pop 3. Time 0. Neighbors: [5]. Push (5, 1).",
                    "Pop 5. Time 1. Neighbors: [1, 3]. 3 visited. Push (1, 2).",
                    "Pop 1. Time 2. Max = 2."
                ]
            }
        },
        {
            id: "vertical-order-traversal",
            title: "Vertical Order Traversal",
            leetcodeUrl: "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
            difficulty: "Good to Do",
            priority: "🟡",
            tags: ["Coordinates"],
            quiz: {
                description: "Print nodes by vertical column. Data structure?",
                options: ["BFS only", "DFS with (row, col) + Sorting", "Inorder", "Level-order"],
                correct: 1,
                explanation: "Track (row, col). Store in `Map[col]`. Sort by Col, then Row, then Val."
            },
            learn: {
                quickAlgo: [
                    "q = deque([root]); res = []",
                    "while q:",
                    "    level = []",
                    "    for _ in range(len(q)):        # 🎯 Freeze size logic for Level Separation",
                    "        node = q.popleft()",
                    "        if not node: continue",
                    "        level.append(node.val)",
                    "        q.append(node.left)        # ⚡ Queue children for NEXT level",
                    "        q.append(node.right)",
                    "    if level: res.append(level)    # ✅ Add level if not empty (handles null children)"
                ],
                metrics: { time: "O(N log N)", space: "O(N)" },
                timeExplainer: "<strong>BFS + Sorting:</strong><br>• BFS Traversal: <code>O(N)</code><br>• Sorting nodes in same column: <code>O(N log N)</code><br><br><strong>Total:</strong> <code>O(N log N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Map stores all nodes<br>• Queue for BFS<br><br><strong>Result:</strong> <code>O(N)</code>",
                visual: `
                    <h4 style="color:#c026d3;">📊 Grid Overlay: Column Assignment</h4>
                    <div style="display:flex; flex-direction:column; gap:15px; margin:15px 0; max-width:550px;">
                        <div style="background:#1e293b; padding:20px; border-radius:12px;">
                            <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:4px; text-align:center;">
                                <div style="font-size:0.7rem; color:#64748b; padding:4px;">c=-2</div>
                                <div style="font-size:0.7rem; color:#64748b; padding:4px;">c=-1</div>
                                <div style="font-size:0.7rem; color:#fbbf24; padding:4px; font-weight:bold;">c=0</div>
                                <div style="font-size:0.7rem; color:#64748b; padding:4px;">c=1</div>
                                <div style="font-size:0.7rem; color:#64748b; padding:4px;">c=2</div>
                                <div></div><div></div>
                                <div style="background:rgba(251,191,36,0.15); border:1px solid rgba(251,191,36,0.3); border-radius:8px; padding:8px; font-weight:bold; color:#fbbf24;">1</div>
                                <div></div><div></div>
                                <div></div>
                                <div style="background:rgba(74,222,128,0.15); border:1px solid rgba(74,222,128,0.3); border-radius:8px; padding:8px; color:#4ade80;">2</div>
                                <div></div>
                                <div style="background:rgba(248,113,113,0.15); border:1px solid rgba(248,113,113,0.3); border-radius:8px; padding:8px; color:#f87171;">3</div>
                                <div></div>
                                <div style="background:rgba(74,222,128,0.15); border:1px solid rgba(74,222,128,0.3); border-radius:8px; padding:8px; color:#4ade80;">4</div>
                                <div></div>
                                <div style="background:rgba(251,191,36,0.15); border:1px solid rgba(251,191,36,0.3); border-radius:8px; padding:8px; color:#fbbf24;">5</div>
                                <div></div>
                                <div style="background:rgba(248,113,113,0.15); border:1px solid rgba(248,113,113,0.3); border-radius:8px; padding:8px; color:#f87171;">6</div>
                            </div>
                        </div>
                        <div style="display:flex; gap:10px; font-size:0.8rem; flex-wrap:wrap; justify-content:center;">
                            <span style="background:#0f172a; padding:6px 12px; border-radius:6px; color:#4ade80;">Left: (r+1, c-1)</span>
                            <span style="background:#0f172a; padding:6px 12px; border-radius:6px; color:#f87171;">Right: (r+1, c+1)</span>
                            <span style="background:#0f172a; padding:6px 12px; border-radius:6px; color:#fbbf24;">Sort: col → row → val</span>
                        </div>
                    </div>`,
                crux: "<strong>Grouping + Sorting:</strong><br>1. BFS/DFS to collect `(c, r, val)`.<br>2. Sort.",
                trap: "<strong>Shadow Nodes:</strong> Nodes can land on same (r, c). Must sort by value.",
                dryRun: ["(0,0,1)", "(-1,1,2), (1,1,3)", "Sort -> Col -1: [2], Col 0: [1], Col 1: [3]"],
                codeTitle: "Python Solution",
                code: `def verticalTraversal(root):
cols = defaultdict(list)
q = deque([(root, 0, 0)])
min_c, max_c = 0, 0
while q:
    node, r, c = q.popleft()
    if node:
        cols[c].append((r, node.val))
        min_c = min(min_c, c)
        max_c = max(max_c, c)
        q.append((node.left, r+1, c-1))
        q.append((node.right, r+1, c+1))
res = []
for c in range(min_c, max_c + 1):
    cols[c].sort(key=lambda x: (x[0], x[1]))
    res.append([x[1] for x in cols[c]])
return res`
            }
        },
        {
            id: "lca-bst",
            title: "LCA in BST",
            leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
            difficulty: "Good to Do",
            priority: "🟢",
            tags: ["BST Property"],
            quiz: {
                description: "Find LCA in BST. Optimization?",
                options: ["Same as Binary Tree (DFS)", "Use BST Property: if split, that's LCA", "Inorder Traversal", "BFS"],
                correct: 1,
                explanation: "Use BST Property! If both p and q < root, go Left. If both > root, go Right. The first node where they SPLIT (one small, one big) is the LCA. O(H) time, O(1) space (iterative)."
            },
            learn: {
                quickAlgo: [
                    "curr = root",
                    "while curr:                        # 🎯 Iterative Walk O(H)",
                    "    if p.val < curr.val and q.val < curr.val:",
                    "        curr = curr.left       # ⚡ Both smaller -> Go Left",
                    "    elif p.val > curr.val and q.val > curr.val:",
                    "        curr = curr.right      # ⚡ Both larger -> Go Right",
                    "    else:                      # ✅ Split Point found!",
                    "        return curr            # 💡 One left, one right (or one is curr)"
                ],
                metrics: { time: "O(H)", space: "O(1)" },
                code: `def lowestCommonAncestor(root, p, q):
    curr = root
    while curr:
        if p.val < curr.val and q.val < curr.val:
            curr = curr.left
        elif p.val > curr.val and q.val > curr.val:
            curr = curr.right
        else:
            return curr`,
                codeDetailed: `def lowestCommonAncestor(root, p, q):
    """
    LCA in Binary Search Tree
    
    STRATEGY: BST Property
    - LCA is the first node where p and q diverge.
    - If both p and q are smaller than root: LCA is in Left.
    - If both p and q are larger than root: LCA is in Right.
    - Otherwise (one small, one large, or equal): Current node is LCA.
    
    Time: O(H), Space: O(1)
    """
    curr = root
    while curr:
        if p.val < curr.val and q.val < curr.val:
            curr = curr.left
        elif p.val > curr.val and q.val > curr.val:
            curr = curr.right
        else:
            return curr`,
                visual: `
                    <h4 style="color:#c026d3;">🔀 The Fork in the Road (BST Property)</h4>
                    <div style="display:flex; flex-direction:column; gap:15px; margin:15px 0; max-width:550px;">
                        <div style="display:flex; gap:12px; flex-wrap:wrap; justify-content:center;">
                            <div style="background:#1e293b; padding:14px; border-radius:10px; text-align:center; flex:1; min-width:150px;">
                                <div style="font-size:0.8rem; color:#4ade80; font-weight:bold; margin-bottom:6px;">Both Left ←</div>
                                <div style="font-family:monospace; font-size:0.85rem; color:#cbd5e1;">p=2, q=4</div>
                                <div style="font-family:monospace; font-size:0.85rem; color:#94a3b8; margin-top:4px;">Both < <span style="color:#fbbf24;">6</span> → go left</div>
                            </div>
                            <div style="background:#1e293b; padding:14px; border-radius:10px; text-align:center; flex:1; min-width:150px;">
                                <div style="font-size:0.8rem; color:#f87171; font-weight:bold; margin-bottom:6px;">Both Right →</div>
                                <div style="font-family:monospace; font-size:0.85rem; color:#cbd5e1;">p=7, q=9</div>
                                <div style="font-family:monospace; font-size:0.85rem; color:#94a3b8; margin-top:4px;">Both > <span style="color:#fbbf24;">6</span> → go right</div>
                            </div>
                            <div style="background:rgba(251,191,36,0.08); border:1px solid rgba(251,191,36,0.3); padding:14px; border-radius:10px; text-align:center; flex:1; min-width:150px;">
                                <div style="font-size:0.8rem; color:#fbbf24; font-weight:bold; margin-bottom:6px;">🎯 SPLIT = LCA!</div>
                                <div style="font-family:monospace; font-size:0.85rem; color:#cbd5e1;">p=2, q=8</div>
                                <div style="font-family:monospace; font-size:0.85rem; color:#94a3b8; margin-top:4px;">2 < <span style="color:#fbbf24;">6</span> < 8 → found!</div>
                            </div>
                        </div>
                        <div style="background:#0f172a; padding:12px 16px; border-radius:8px; font-size:0.85rem; color:#94a3b8; text-align:center;">
                            <strong style="color:#a78bfa;">O(H) time, O(1) space</strong> — just walk down, no recursion needed
                        </div>
                    </div>`,
                crux: "<strong>BST Split Property:</strong><br>Both < Node ➡ Go Left.<br>Both > Node ➡ Go Right.<br>Else ➡ Found LCA.",
                strategy: "Iterative O(1) space. Walk down the tree deciding left/right based on values.",
                trap: "<strong>No Node Found?</strong> Algo assumes nodes exist. If validation needed, search for them first.",
                dryRun: [
                    "Tree: 6 (root), 2 (left), 8 (right). P=2, Q=4.",
                    "1. Curr=6. 2<6 and 4<6? Yes. Go Left.",
                    "2. Curr=2. 2<2? No. Split! Return 2."
                ]
            }
        }
    ]
}
