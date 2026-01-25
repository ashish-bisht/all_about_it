// Trees Concepts data
// Extracted from data.js

const topic_trees_concepts = {
    id: "trees_concepts",
    title: "Trees Mastery: The Recursion Bible",
    description: "DFS, BFS, Path Problems, and Tree Construction Patterns",
    color: "#16a34a",
    icon: "fas fa-tree",
    type: "guide",
    sections: [
        {
            id: "recursion-patterns",
            title: "Recursion Patterns",
            icon: "fas fa-sync",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-sync"></i>
                            Tree Recursion: The Leap of Faith
                        </div>
                        <div class="badges">
                            <span class="badge badge-must" style="background:#16a34a; color:white;">CORE PATTERN</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="big-quote" style="font-size: 1.4rem; font-weight: 600; text-align: center; padding: 30px; background: linear-gradient(135deg, rgba(22, 163, 74, 0.1), rgba(34, 211, 238, 0.1)); border-radius: 12px; margin: 30px 0; line-height: 1.8;">
                            "Trust that <span style='color:#16a34a'>solve(root.left)</span> and <span style='color:#16a34a'>solve(root.right)</span> work perfectly!"
                        </div>
                        
                        <h3 style="color: #16a34a; margin: 20px 0;">The Pattern</h3>
                        <ol style="line-height: 2;">
                            <li><strong>Base Case:</strong> <code>if not root: return base_value</code></li>
                            <li><strong>Recurse Left:</strong> <code>left_result = solve(root.left)</code></li>
                            <li><strong>Recurse Right:</strong> <code>right_result = solve(root.right)</code></li>
                            <li><strong>Combine:</strong> <code>return combine(root.val, left_result, right_result)</code></li>
                        </ol>
                        
                        <h3 style="margin: 30px 0 15px; color: #16a34a;">Universal Template</h3>
                        <div class="code-block" style="background: #0f172a; border-radius: 12px; padding: 15px;">
                            <pre style="color: #e2e8f0; font-family: 'Consolas', monospace;">def solve_tree(root):
# 1. Base Case
if not root:
    return 0  # or None, True, etc.

# 2. LEAP OF FAITH: Trust left/right work!
left_result = solve_tree(root.left)
right_result = solve_tree(root.right)

# 3. Combine at current node
return root.val + left_result + right_result</pre>
                        </div>
                        
                        <h3 style="margin: 30px 0 15px; color: #16a34a; font-size: 1.3rem; font-weight: 700;">Common Examples</h3>
                        <table style="width:100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                            <thead>
                                <tr style="background: linear-gradient(135deg, #16a34a, #22c55e);">
                                    <th style="padding: 16px 20px; text-align: left; color: white; font-weight: 700; font-size: 0.95rem; letter-spacing: 0.5px;">Problem</th>
                                    <th style="padding: 16px 20px; text-align: left; color: white; font-weight: 700; font-size: 0.95rem; letter-spacing: 0.5px;">Combine Logic</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 16px 20px; color: #f1f5f9; font-weight: 600; font-size: 1rem; border-bottom: 1px solid #334155;">Tree Height</td>
                                    <td style="padding: 16px 20px; border-bottom: 1px solid #334155;"><code style="background: #0f172a; color: #7dd3fc; padding: 6px 12px; border-radius: 6px; font-family: 'Consolas', 'Monaco', monospace; font-size: 0.95rem; font-weight: 600;">1 + max(left, right)</code></td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 16px 20px; color: #f1f5f9; font-weight: 600; font-size: 1rem; border-bottom: 1px solid #334155;">Tree Sum</td>
                                    <td style="padding: 16px 20px; border-bottom: 1px solid #334155;"><code style="background: #0f172a; color: #7dd3fc; padding: 6px 12px; border-radius: 6px; font-family: 'Consolas', 'Monaco', monospace; font-size: 0.95rem; font-weight: 600;">root.val + left + right</code></td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 16px 20px; color: #f1f5f9; font-weight: 600; font-size: 1rem; border-bottom: 1px solid #334155;">Count Nodes</td>
                                    <td style="padding: 16px 20px; border-bottom: 1px solid #334155;"><code style="background: #0f172a; color: #7dd3fc; padding: 6px 12px; border-radius: 6px; font-family: 'Consolas', 'Monaco', monospace; font-size: 0.95rem; font-weight: 600;">1 + left + right</code></td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 16px 20px; color: #f1f5f9; font-weight: 600; font-size: 1rem;">Is Balanced?</td>
                                    <td style="padding: 16px 20px;"><code style="background: #0f172a; color: #7dd3fc; padding: 6px 12px; border-radius: 6px; font-family: 'Consolas', 'Monaco', monospace; font-size: 0.95rem; font-weight: 600;">abs(left - right) &lt;= 1</code></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>`
        },
        {
            id: "path-problems",
            title: "Path Problems",
            icon: "fas fa-route",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-route"></i>
                            Path Problems: Global vs Local
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="big-quote" style="font-size: 1.2rem; font-weight: 600; text-align: center; padding: 30px; background: linear-gradient(135deg, rgba(22, 163, 74, 0.1), rgba(244, 114, 182, 0.1)); border-radius: 12px; margin: 30px 0;">
                            "Split at node (root + left + right) vs Flow through node (root + max(left, right))"
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                            <div style="background: rgba(22, 163, 74, 0.1); padding: 20px; border-radius: 12px; border-left: 4px solid #16a34a;">
                                <h4 style="color: #16a34a;">Global (The Arch)</h4>
                                <p>Path ENDS at this node</p>
                                <p>Used for: Max Path Sum</p>
                                <code>global_max = max(global, root + left + right)</code>
                            </div>
                            <div style="background: rgba(99, 102, 241, 0.1); padding: 20px; border-radius: 12px; border-left: 4px solid #6366f1;">
                                <h4 style="color: #6366f1;">Local (The Flow)</h4>
                                <p>Path CONTINUES upward</p>
                                <p>Returned to parent</p>
                                <code>return root + max(left, right)</code>
                            </div>
                        </div>
                        
                        <h3 style="margin: 30px 0 15px; color: #16a34a;">Max Path Sum Template</h3>
                        <div class="code-block" style="background: #0f172a; border-radius: 12px; padding: 15px;">
                            <pre style="color: #e2e8f0; font-family: 'Consolas', monospace;">def maxPathSum(root):
global_max = float('-inf')

def dfs(node):
    nonlocal global_max
    if not node:
        return 0
    
    # Get best paths from children (clamp negatives to 0)
    left = max(dfs(node.left), 0)
    right = max(dfs(node.right), 0)
    
    # GLOBAL: Path that SPLITS here (arch)
    global_max = max(global_max, node.val + left + right)
    
    # LOCAL: Path that FLOWS upward (return to parent)
    return node.val + max(left, right)

dfs(root)
return global_max</pre>
                        </div>
                    </div>
                </div>`
        },
        {
            id: "traversals",
            title: "Traversals",
            icon: "fas fa-stream",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-stream"></i>
                            Tree Traversals: When to Use What
                        </div>
                    </div>
                    <div class="card-body">
                        <table style="width:100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3); margin: 20px 0;">
                            <thead>
                                <tr style="background: linear-gradient(135deg, #16a34a, #22c55e);">
                                    <th style="padding: 16px 20px; text-align: left; color: white; font-weight: 700; font-size: 0.95rem;">Traversal</th>
                                    <th style="padding: 16px 20px; text-align: left; color: white; font-weight: 700; font-size: 0.95rem;">Order</th>
                                    <th style="padding: 16px 20px; text-align: left; color: white; font-weight: 700; font-size: 0.95rem;">Use Case</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 16px 20px; color: #4ade80; font-weight: 700; border-bottom: 1px solid #334155;">Preorder</td>
                                    <td style="padding: 16px 20px; color: #f1f5f9; border-bottom: 1px solid #334155;">Root → Left → Right</td>
                                    <td style="padding: 16px 20px; color: #94a3b8; border-bottom: 1px solid #334155;">Serialize tree, copy tree</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 16px 20px; color: #4ade80; font-weight: 700; border-bottom: 1px solid #334155;">Inorder</td>
                                    <td style="padding: 16px 20px; color: #f1f5f9; border-bottom: 1px solid #334155;">Left → Root → Right</td>
                                    <td style="padding: 16px 20px; color: #94a3b8; border-bottom: 1px solid #334155;">BST sorted order</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 16px 20px; color: #4ade80; font-weight: 700; border-bottom: 1px solid #334155;">Postorder</td>
                                    <td style="padding: 16px 20px; color: #f1f5f9; border-bottom: 1px solid #334155;">Left → Right → Root</td>
                                    <td style="padding: 16px 20px; color: #94a3b8; border-bottom: 1px solid #334155;">Delete tree, height calc</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 16px 20px; color: #4ade80; font-weight: 700;">Level Order</td>
                                    <td style="padding: 16px 20px; color: #f1f5f9;">BFS (Queue)</td>
                                    <td style="padding: 16px 20px; color: #94a3b8;">Level-wise processing</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <h3 style="margin: 30px 0 15px; color: #16a34a;">Level Order (BFS) Template</h3>
                        <div class="code-block" style="background: #0f172a; border-radius: 12px; padding: 15px;">
                            <pre style="color: #e2e8f0; font-family: 'Consolas', monospace;">from collections import deque

def levelOrder(root):
if not root:
    return []

result = []
queue = deque([root])

while queue:
    level = []
    for _ in range(len(queue)):  # Process one level
        node = queue.popleft()
        level.append(node.val)
        
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    
    result.append(level)

return result</pre>
                        </div>
                    </div>
                </div>`
        }
    ]
}
