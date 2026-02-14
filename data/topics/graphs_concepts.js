// Auto-generated from data/ folder
// Run `python3 build_data.py` to regenerate
// Source: data/concepts/graphs_concepts.js
// Topic: graphs_concepts

// Graphs Concepts data
// Extracted from data.js

const topic_graphs_concepts = {
    id: "graphs_concepts",
    title: "Graphs Mastery: The Complete Guide",
    description: "BFS, DFS, Topological Sort, and Union-Find Patterns",
    color: "#c026d3",
    icon: "fas fa-project-diagram",
    type: "guide",
    sections: [
        {
            id: "bfs-dfs",
            title: "BFS vs DFS",
            icon: "fas fa-sitemap",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-sitemap"></i>
                            BFS vs DFS: When to Use What
                        </div>
                        <div class="badges">
                            <span class="badge badge-must" style="background:#c026d3; color:white;">CORE PATTERN</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="big-quote" style="font-size: 1.2rem; font-weight: 600; text-align: center; padding: 30px; background: linear-gradient(135deg, rgba(192, 38, 211, 0.1), rgba(34, 211, 238, 0.1)); border-radius: 12px; margin: 30px 0;">
                            "<span style='color:#c026d3'>Shortest Path (Unweighted)</span> → BFS &nbsp;&nbsp;|&nbsp;&nbsp; <span style='color:#22d3ee'>Explore All</span> → DFS"
                        </div>
                        
                        <table style="width:100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                            <thead>
                                <tr style="background: linear-gradient(135deg, #c026d3, #e879f9);">
                                    <th style="padding: 16px 20px; text-align: center; color: white; font-weight: 700; font-size: 1rem;">BFS</th>
                                    <th style="padding: 16px 20px; text-align: center; color: white; font-weight: 700; font-size: 1rem;">DFS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 16px 20px; color: #f1f5f9; text-align: center; border-bottom: 1px solid #334155;">Uses Queue (FIFO)</td>
                                    <td style="padding: 16px 20px; color: #f1f5f9; text-align: center; border-bottom: 1px solid #334155;">Uses Stack/Recursion</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 16px 20px; color: #f1f5f9; text-align: center; border-bottom: 1px solid #334155;">Level by Level</td>
                                    <td style="padding: 16px 20px; color: #f1f5f9; text-align: center; border-bottom: 1px solid #334155;">Go Deep First</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 16px 20px; color: #34d399; text-align: center; font-weight: 600; border-bottom: 1px solid #334155;">✅ Shortest Path</td>
                                    <td style="padding: 16px 20px; color: #34d399; text-align: center; font-weight: 600; border-bottom: 1px solid #334155;">✅ Cycle Detection</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 16px 20px; color: #34d399; text-align: center; font-weight: 600;">✅ Multi-source spread</td>
                                    <td style="padding: 16px 20px; color: #34d399; text-align: center; font-weight: 600;">✅ Backtracking</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <h3 style="margin: 30px 0 15px; color: #c026d3;">BFS Template</h3>
                        <div class="code-block" style="background: #0f172a; border-radius: 12px; padding: 15px;">
                            <pre style="color: #e2e8f0; font-family: 'Consolas', monospace;">from collections import deque

def bfs(graph, start):
visited = {start}
queue = deque([start])
distance = 0

while queue:
    # Process level by level
    for _ in range(len(queue)):
        node = queue.popleft()
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)  # Mark BEFORE pushing!
                queue.append(neighbor)
    distance += 1

return distance</pre>
                        </div>
                    </div>
                </div>`
        },
        {
            id: "topo-sort",
            title: "Topological Sort",
            icon: "fas fa-sort-amount-down",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-sort-amount-down"></i>
                            Topological Sort (Kahn's Algorithm)
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="big-quote" style="font-size: 1.2rem; font-weight: 600; text-align: center; padding: 30px; background: linear-gradient(135deg, rgba(192, 38, 211, 0.1), rgba(245, 158, 11, 0.1)); border-radius: 12px; margin: 30px 0;">
                            "Dependencies? Prerequisites? <span style='color:#c026d3'>Topo Sort</span> is the Answer!"
                        </div>
                        
                        <h3 style="color: #c026d3; margin: 20px 0;">When to Use</h3>
                        <ul style="list-style: none; padding: 0; line-height: 2;">
                            <li>✅ Course Schedule (prerequisites)</li>
                            <li>✅ Build Order (dependencies)</li>
                            <li>✅ Alien Dictionary</li>
                            <li>✅ Task Scheduling</li>
                        </ul>
                        
                        <h3 style="margin: 30px 0 15px; color: #c026d3;">Kahn's Algorithm Template</h3>
                        <div class="code-block" style="background: #0f172a; border-radius: 12px; padding: 15px;">
                            <pre style="color: #e2e8f0; font-family: 'Consolas', monospace;">from collections import deque, defaultdict

def topo_sort(n, edges):
graph = defaultdict(list)
indegree = [0] * n

# Build graph and indegrees
for src, dst in edges:
    graph[src].append(dst)
    indegree[dst] += 1

# Start with nodes having 0 indegree
queue = deque([i for i in range(n) if indegree[i] == 0])
order = []

while queue:
    node = queue.popleft()
    order.append(node)
    
    for neighbor in graph[node]:
        indegree[neighbor] -= 1
        if indegree[neighbor] == 0:
            queue.append(neighbor)

# Cycle check
return order if len(order) == n else []</pre>
                        </div>
                    </div>
                </div>`
        },
        {
            id: "union-find",
            title: "Union-Find",
            icon: "fas fa-users",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-users"></i>
                            Union-Find (Disjoint Set Union)
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="big-quote" style="font-size: 1.2rem; font-weight: 600; text-align: center; padding: 30px; background: linear-gradient(135deg, rgba(192, 38, 211, 0.1), rgba(52, 211, 153, 0.1)); border-radius: 12px; margin: 30px 0;">
                            "Connectivity? Grouping? Components? <span style='color:#34d399'>Union-Find!</span>"
                        </div>
                        
                        <h3 style="color: #c026d3; margin: 20px 0;">When to Use</h3>
                        <ul style="list-style: none; padding: 0; line-height: 2;">
                            <li>✅ Number of connected components</li>
                            <li>✅ Detect cycle in undirected graph</li>
                            <li>✅ Friends in network</li>
                            <li>✅ Kruskal's MST</li>
                        </ul>
                        
                        <h3 style="margin: 30px 0 15px; color: #c026d3;">DSU Template (with Path Compression + Rank)</h3>
                        <div class="code-block" style="background: #0f172a; border-radius: 12px; padding: 15px;">
                            <pre style="color: #e2e8f0; font-family: 'Consolas', monospace;">class DSU:
def __init__(self, n):
    self.parent = list(range(n))
    self.rank = [0] * n
    self.count = n  # Number of components

def find(self, x):
    if self.parent[x] != x:
        self.parent[x] = self.find(self.parent[x])  # Path compression
    return self.parent[x]

def union(self, x, y):
    px, py = self.find(x), self.find(y)
    if px == py:
        return False  # Already connected
    
    # Union by rank
    if self.rank[px] < self.rank[py]:
        px, py = py, px
    self.parent[py] = px
    if self.rank[px] == self.rank[py]:
        self.rank[px] += 1
    
    self.count -= 1
    return True</pre>
                        </div>
                    </div>
                </div>`
        }
    ]
};

window.currentTopicData = topic_graphs_concepts;
