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
            { label: "Leap of Faith", desc: "Assume `solve(root.left)` works. Combine results." }
        ],
        safetyCheck: [
            { label: "Base Cases", desc: "Always handle `if not root` first." },
            { label: "Global vs Local", desc: "Pass down (Param) or Bubble up (Return)?" }
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
                metrics: { time: "O(N)", space: "O(H)" },
                timeExplainer: "<strong>DFS Traversal:</strong><br>• Visit every node once<br>• Recurse Left and Right<br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Recursion Stack depth = Tree Height<br>• Skewed Tree: <code>O(N)</code><br>• Balanced Tree: <code>O(log N)</code><br><br><strong>Result:</strong> <code>O(H)</code>",
                visual: "<span><strong>Visual: The Meeting Point</strong><br>Paths merge at the LCA.</span>",
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
                metrics: { time: "O(N)", space: "O(H)" },
                timeExplainer: "<strong>Preorder Traversal:</strong><br>• Visit all nodes to serialize: <code>O(N)</code><br>• Deserialize visits all nodes: <code>O(N)</code><br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Recursion Stack: <code>O(H)</code><br>• Output String/Array: <code>O(N)</code><br><br><strong>Result:</strong> <code>O(N)</code>",
                visual: "<span><strong>Visual: Flat Tree</strong><br>Record Nulls to preserve structure.</span>",
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
                metrics: { time: "O(N)", space: "O(H)" },
                timeExplainer: "<strong>DFS Postorder:</strong><br>• Compute max path for each node<br>• Visit every node exactly once<br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Recursion Stack depth = Tree Height<br>• Worst case (Skewed): <code>O(N)</code><br><br><strong>Result:</strong> <code>O(H)</code>",
                visual: "<span><strong>Visual: The Inverted V</strong><br>Split (Arch) vs Flow (Straight).</span>",
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
                metrics: { time: "O(N)", space: "O(N)" },
                timeExplainer: "<strong>Time Breakdown:</strong><br>• HashMap construction: <code>O(N)</code><br>• Recursive Tree Building: <code>O(N)</code><br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• HashMap stores N indices<br>• Recursion Stack: <code>O(H)</code><br><br><strong>Total:</strong> <code>O(N)</code>",
                visual: "<span><strong>Visual: The Knife</strong><br>Root (from Pre) slices Inorder into Left/Right.</span>",
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
                metrics: { time: "O(N log N)", space: "O(N)" },
                timeExplainer: "<strong>BFS + Sorting:</strong><br>• BFS Traversal: <code>O(N)</code><br>• Sorting nodes in same column: <code>O(N log N)</code><br><br><strong>Total:</strong> <code>O(N log N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Map stores all nodes<br>• Queue for BFS<br><br><strong>Result:</strong> <code>O(N)</code>",
                visual: "<span><strong>Visual: Grid Overlay</strong><br>Left: (r+1, c-1). Right: (r+1, c+1).</span>",
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
                metrics: { time: "O(H)", space: "O(1)" },
                code: `def lowestCommonAncestor(root, p, q):
while root:
    if p.val < root.val and q.val < root.val:
        root = root.left
    elif p.val > root.val and q.val > root.val:
        root = root.right
    else:
        return root`
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
    
return postorder(root)[2]`
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
return max_time`
            }
        }
    ]
}
