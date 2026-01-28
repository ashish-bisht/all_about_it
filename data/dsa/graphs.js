// Graphs data
// Extracted from data.js

const topic_graphs = {
    id: "graphs",
    title: "Graph Mastery",
    description: "Principal Engineer DSA • Day 6",
    color: "#c026d3",
    icon: "fas fa-project-diagram",
    mentalModel: {
        whenToApply: [
            { label: "Shortest Path (No weights)", desc: "BFS (Layer by layer)." },
            { label: "Shortest Path (Weights)", desc: "Dijkstra (Priority Queue)." },
            { label: "Dependencies", desc: "Topo Sort (Kahn's Algo)." },
            { label: "Connectivity", desc: "Union-Find (DSU)." },
            { label: "Graph Traversal (DFS/BFS)", desc: "Explore all nodes/edges, useful for connectivity checks." },
            { label: "Minimum Spanning Tree", desc: "Kruskal or Prim to connect all nodes with minimal total weight." },
            { label: "Max Flow / Min Cut", desc: "Ford‑Fulkerson or Edmonds‑Karp for network flow problems." },
            { label: "Cycle Detection", desc: "Union‑Find or DFS back‑edge detection." }
        ],
        patterns: [
            { algo: "BFS", use: "Unweighted shortest path / level order", time: "O(V+E)", space: "O(V)" },
            { algo: "DFS", use: "Connectivity, topological sort", time: "O(V+E)", space: "O(V)" },
            { algo: "Dijkstra", use: "Weighted shortest path", time: "O((V+E) log V)", space: "O(V)" },
            { algo: "Kruskal", use: "Minimum Spanning Tree", time: "O(E log E)", space: "O(V)" },
            { algo: "Union‑Find", use: "Cycle detection / DSU problems", time: "≈ O(α(N)) per op", space: "O(N)" }
        ],
        safetyCheck: [
            { label: "No BFS for Shortest Path", desc: "Use Dijkstra instead of BFS when edges have weights." },
            { label: "Visited Tracking", desc: "Mark visited immediately upon pushing to queue to avoid duplicates." },
            { label: "Do Not Mutate Graph During Traversal", desc: "If you need to modify, work on a copy or track changes separately." }
        ]
    },
    questions: [
        {
            id: "rotting-oranges",
            title: "Rotten Oranges",
            leetcodeUrl: "https://leetcode.com/problems/rotting-oranges/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Multi-Source BFS", "Matrix"],
            quiz: {
                description: "Simulate rotting. Why not DFS?",
                options: ["DFS is too slow", "DFS checks one path at a time (Simultaneous vs Sequential)", "DFS stack overflow", "DFS is hard to implement"],
                correct: 1,
                explanation: "The core problem is **SIMULTANEOUS** expansion. All rotten oranges affect neighbors at `t=1`. DFS goes deep on one orange (sequential) effectively calculating 'distance from ONE root', which is wrong here. We need 'min distance from ANY root' -> BFS."
            },
            learn: {
                metrics: { time: "O(N×M)", space: "O(N×M)" },
                timeExplainer: `
                    <h4 style="color:#c026d3;">⏱️ Time Complexity: O(N×M)</h4>
                    <div style="background:rgba(192, 38, 211, 0.1); padding:20px; border-radius:12px; margin:15px 0;">
                        <p><strong>Compare Approaches:</strong></p>
                        <table style="width:100%; border-collapse: collapse; margin-top:10px;">
                            <tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
                                <th style="text-align:left; padding:10px;">Approach</th>
                                <th style="text-align:left; padding:10px;">Complexity</th>
                                <th style="text-align:left; padding:10px;">Outcome</th>
                            </tr>
                            <tr style="border-bottom:1px solid rgba(255,255,255,0.1); background:rgba(239, 68, 68, 0.1);">
                                <td style="padding:10px;"><strong>Naive DFS</strong></td>
                                <td style="padding:10px;">O((NM)²)</td>
                                <td style="padding:10px;">❌ TLE / Wrong Logic (Sequential)</td>
                            </tr>
                            <tr style="background:rgba(16, 185, 129, 0.1);">
                                <td style="padding:10px;"><strong>Multi-Source BFS</strong></td>
                                <td style="padding:10px;">O(N×M)</td>
                                <td style="padding:10px;">✅ Optimal (Simultaneous)</td>
                            </tr>
                        </table>
                        
                        <div style="margin-top:15px;">
                            <strong>Why O(N×M)?</strong>
                            <ul style="line-height:1.6; color:#e2e8f0;">
                                <li>Each cell is added to Queue <strong>AT MOST ONCE</strong>.</li>
                                <li>Each cell is processed constant times (4 neighbors).</li>
                                <li>Total = N×M cells × O(1) operations.</li>
                            </ul>
                        </div>
                    </div>
                `,
                spaceExplainer: `
                    <h4 style="color:#c026d3;">📦 Space Complexity: O(N×M)</h4>
                    <div style="background:rgba(192, 38, 211, 0.1); padding:20px; border-radius:12px; margin:15px 0;">
                        <ul style="line-height:2;">
                            <li><strong>Queue Size:</strong> In worst case (e.g., all rotten initially), queue holds O(N×M) cells.</li>
                            <li><strong>Grid Modified In-Place:</strong> No extra <code>visited</code> array needed if we modify grid (1 → 2).</li>
                        </ul>
                    </div>
                `,
                visual: `
                    <h4 style="color:#c026d3;">🌊 Simultaneous Expansion (The Wave)</h4>
                    <div style="display:flex; flex-wrap:wrap; gap:20px; justify-content: center; margin: 20px 0;">
                        
                        <!-- T=0 -->
                        <div>
                            <div style="text-align:center; margin-bottom:5px; font-size:0.9rem; color:#94a3b8;">T = 0 (Init)</div>
                            <div style="display:grid; grid-template-columns:repeat(3, 30px); gap:2px; background:#334155; padding:2px; border-radius:4px;">
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#f87171; font-weight:bold;">2</div>
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#4ade80;">1</div>
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#4ade80;">1</div>
                                
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#4ade80;">1</div>
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#4ade80;">1</div>
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#64748b;">0</div>
                                
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#64748b;">0</div>
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#4ade80;">1</div>
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#4ade80;">1</div>
                            </div>
                            <div style="text-align:center; font-size:0.8rem; color:#64748b; margin-top:5px;">Q: [(0,0)]</div>
                        </div>

                        <!-- Arrow -->
                        <div style="display:flex; align-items:center; color:#64748b;">➞</div>

                        <!-- T=1 -->
                        <div>
                            <div style="text-align:center; margin-bottom:5px; font-size:0.9rem; color:#94a3b8;">T = 1 (Wave 1)</div>
                            <div style="display:grid; grid-template-columns:repeat(3, 30px); gap:2px; background:#334155; padding:2px; border-radius:4px;">
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#f87171; font-weight:bold;">2</div>
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#f87171; font-weight:bold; border: 1px solid #ef4444;">2</div>
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#4ade80;">1</div>
                                
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#f87171; font-weight:bold; border: 1px solid #ef4444;">2</div>
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#4ade80;">1</div>
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#64748b;">0</div>
                                
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#64748b;">0</div>
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#4ade80;">1</div>
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#4ade80;">1</div>
                            </div>
                            <div style="text-align:center; font-size:0.8rem; color:#64748b; margin-top:5px;">Fresh: 6 -> 4</div>
                        </div>

                        <!-- Arrow -->
                        <div style="display:flex; align-items:center; color:#64748b;">➞</div>

                        <!-- T=2 -->
                        <div>
                            <div style="text-align:center; margin-bottom:5px; font-size:0.9rem; color:#94a3b8;">T = 2 (Wave 2)</div>
                             <div style="display:grid; grid-template-columns:repeat(3, 30px); gap:2px; background:#334155; padding:2px; border-radius:4px;">
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#f87171; font-weight:bold;">2</div>
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#f87171; font-weight:bold;">2</div>
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#f87171; font-weight:bold; border: 1px solid #ef4444;">2</div>
                                
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#f87171; font-weight:bold;">2</div>
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#f87171; font-weight:bold; border: 1px solid #ef4444;">2</div>
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#64748b;">0</div>
                                
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#64748b;">0</div>
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#f87171; font-weight:bold; border: 1px solid #ef4444;">2</div>
                                <div style="background:#1e293b; height:30px; display:flex; align-items:center; justify-content:center; color:#4ade80;">1</div>
                            </div>
                            <div style="text-align:center; font-size:0.8rem; color:#64748b; margin-top:5px;">Fresh: 4 -> 1</div>
                        </div>

                    </div>
                    
                    <div style="background:#0f172a; padding:15px; border-radius:8px; margin-top:10px;">
                        <ul style="margin:0; padding-left:20px; color:#cbd5e1; font-size:0.9rem;">
                            <li><strong style="color:#f87171;">2</strong> = Rotten (Sources)</li>
                            <li><strong style="color:#4ade80;">1</strong> = Fresh (Targets)</li>
                            <li><span style="border: 1px solid #ef4444; padding:0 4px; border-radius:2px;">Box</span> = Newly Rotten this minute</li>
                        </ul>
                    </div>
                `,
                crux: `
                    <h4 style="color:#10b981;">💡 The Crux: "Process Level = 1 Minute"</h4>
                    <div style="display:grid; gap:15px; margin:15px 0;">
                        <div style="background:rgba(16, 185, 129, 0.1); padding:15px; border-radius:8px; border-left:4px solid #10b981;">
                            <strong>Mental Model:</strong> Think of this as a <strong>Physical Simulation</strong>.
                            <br>Every tick of the clock, infection spreads 1 unit distance in all directions.
                        </div>
                        <div style="background:rgba(239, 68, 68, 0.1); padding:15px; border-radius:8px; border-left:4px solid #ef4444;">
                            <strong>Why processing by size(Q) matters:</strong>
                            <br>We need to know when "Minute 1" ends and "Minute 2" begins.
                            <br><code>for _ in range(len(q)):</code> ensures we only process the CURRENT batch, not the newly infected ones!
                        </div>
                    </div>
                    
                    <h5 style="color:#a78bfa; margin-top:20px;">🕸️ Pattern: Multi-Source BFS</h5>
                    <p style="color:#cbd5e1; font-style:italic;">Why are these problems actually the same?</p>
                    <ul style="line-height:2;">
                        <li>🔥 <strong>Walls and Gates</strong>: Replace "Rotten" with "Gate". Find distance to nearest Gate. SAME LOGIC.</li>
                        <li>🌊 <strong>01 Matrix</strong>: Replace "Rotten" with "0". Find distance to nearest 0. SAME LOGIC.</li>
                        <li>🗺️ <strong>Shortest Bridge</strong>: Expand from Island A (Multi-source) until you hit Island B.</li>
                    </ul>
                `,
                trap: `
                    <h4 style="color:#ef4444;">⚠️ Deep Traps</h4>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin:15px 0;">
                        <div style="background:rgba(239, 68, 68, 0.1); padding:15px; border-radius:8px;">
                            <strong style="color:#f87171;">1. The "Last Minute" Bug</strong><br>
                            If you increment <code>time</code> at the start of the loop, you might count a minute even if NO fresh oranges rot.<br>
                            <span style="color:#cbd5e1; font-size:0.9em;">Fix: Check <code>if fresh > 0</code> or return <code>time - 1</code> if Q not empty.</span>
                        </div>
                        <div style="background:rgba(245, 158, 11, 0.1); padding:15px; border-radius:8px;">
                            <strong style="color:#fbbf24;">2. Isolated Fresh Orange</strong><br>
                            A fresh orange surrounded by 0s can NEVER be reached.<br>
                            <span style="color:#cbd5e1; font-size:0.9em;">Fix: Check <code>if fresh_count == 0</code> at the very end.</span>
                        </div>
                        <div style="background:rgba(139, 92, 246, 0.1); padding:15px; border-radius:8px; grid-column: span 2;">
                            <strong style="color:#a78bfa;">3. Modifying Queue Size during Loop</strong><br>
                            Classic Python trap! <code>for _ in range(len(que))</code> evaluates <code>len</code> ONCE.
                            If you used a dynamic <code>while</code> loop without fixing the range size, you'd mix levels!
                        </div>
                    </div>
                `,
                dryRun: `
                    <h4 style="color:#22d3ee;">🔍 Dry Run: [[2,1,1],[1,1,0],[0,1,1]]</h4>
                    <div style="background:#0f172a; padding:20px; border-radius:12px; font-family:'Consolas', monospace;">
                        <pre style="color:#e2e8f0; margin:0; line-height:1.8;">
<span style="color:#f59e0b;">Init:</span> Q=[(0,0)], fresh=6, time=0

<span style="color:#f59e0b;">Loop 1 (Size=1):</span>
  • Pop (0,0). Neighbors: (0,1), (1,0)
  • Rot (0,1) & (1,0). fresh=4.
  • Q now has [(0,1), (1,0)] (New batch!)
  • time → 1

<span style="color:#f59e0b;">Loop 2 (Size=2):</span>
  • Pop (0,1). Rot neighbors...
  • Pop (1,0). Rot neighbors...
  • time → 2

<span style="color:#f59e0b;">End:</span> Q empty? No. Fresh > 0? No. 
Break! Return time.
                        </pre>
                    </div>
                `,
                codeTitle: "Python Solution (Teacher's Voice)",
                code: `from collections import deque

def orangesRotting(grid):
    rows, cols = len(grid), len(grid[0])
    
    # 1. PRE-SCAN: Find all initially rotten oranges (Sources)
    queue = deque()
    fresh_count = 0
    
    for row in range(rows):
        for col in range(cols):
            if grid[row][col] == 2:
                queue.append((row, col))
            elif grid[row][col] == 1:
                fresh_count += 1

    # Edge Case: If no fresh oranges, 0 minutes needed.
    if fresh_count == 0:
        return 0
    
    # 2. BFS: Level by Level
    minutes_elapsed = 0
    directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]
    
    # Trap Fix: "while queue and fresh_count > 0"
    while queue and fresh_count > 0:
        
        # Process ONLY current level (snapshot of current minute)
        for _ in range(len(queue)):
            current_row, current_col = queue.popleft()

            for row_change, col_change in directions:
                new_row = current_row + row_change
                new_col = current_col + col_change 

                # Valid check + Fresh check
                if 0 <= new_row < rows and 0 <= new_col < cols and grid[new_row][new_col] == 1:
                    grid[new_row][new_col] = 2  # Rot it immediately!
                    fresh_count -= 1
                    queue.append((new_row, new_col)) # Add to NEXT level
        
        minutes_elapsed += 1
    
    # 3. FINAL CHECK: Did we reach everyone?
    return minutes_elapsed if fresh_count == 0 else -1`
            }
        },

        {
            id: "course-schedule",
            title: "Course Schedule",
            leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Topo Sort"],
            quiz: {
                description: "Detect if courses can be finished (dependencies). Algo?",
                options: ["Dijkstra", "Kahn's Algo (Topo Sort)", "Union Find", "Floyd Warshall"],
                correct: 1,
                explanation: "Topo Sort (Kahn's)! Build graph. Calculate Indegrees. Q = [Indegree 0]. Process Q, reduce neighbor indegrees. If processed count == N, true."
            },
            learn: {
                metrics: { time: "O(V+E)", space: "O(V+E)" },
                timeExplainer: `
                    <h4 style="color:#c026d3;">⏱️ Time Complexity: O(V + E)</h4>
                    <div style="background:rgba(192, 38, 211, 0.1); padding:20px; border-radius:12px; margin:15px 0;">
                        <p><strong>Step-by-Step Breakdown:</strong></p>
                        <ul style="line-height:1.6; color:#e2e8f0;">
                            <li><strong>Build Graph:</strong> <code style="color:#22d3ee;">O(E)</code> - Iterate through all prerequisites.</li>
                            <li><strong>Initialize Queue:</strong> <code style="color:#22d3ee;">O(V)</code> - Scan all in-degrees.</li>
                            <li><strong>BFS Processing:</strong> <code style="color:#22d3ee;">O(V + E)</code> - Process each vertex once, visit each edge once.</li>
                        </ul>
                        <div style="margin-top:15px; background:#0f172a; padding:10px; border-radius:8px; text-align:center;">
                            <code style="color:#34d399; font-size:1.1rem;">Total: O(E) + O(V) + O(V + E) = O(V + E)</code>
                        </div>
                        <p style="margin-top:10px; font-size:0.9em; color:#cbd5e1;"><em>Interview Tip:</em> "Why not V×E? Because we don't re-scan edges for every node. We visit each edge exactly once."</p>
                    </div>
                `,
                spaceExplainer: `
                    <h4 style="color:#c026d3;">💾 Space Complexity: O(V + E)</h4>
                    <div style="background:rgba(192, 38, 211, 0.1); padding:20px; border-radius:12px; margin:15px 0;">
                        <table style="width:100%;">
                            <tr><td style="padding:8px;"><strong>Graph:</strong></td><td>O(E) - Adjacency list stores E edges.</td></tr>
                            <tr><td style="padding:8px;"><strong>In-degree Array:</strong></td><td>O(V) - Size of num_courses.</td></tr>
                            <tr><td style="padding:8px;"><strong>Queue:</strong></td><td>O(V) - Worst case all nodes (0 dependencies).</td></tr>
                        </table>
                        <div style="margin-top:15px; font-weight:bold; color:#e879f9; text-align:center;">
                            Total Space ≈ O(V + E)
                        </div>
                    </div>
                `,
                visual: `
                    <h4 style="color:#c026d3;">🔗 Topological Sort: Kahn's Algorithm</h4>
                    <div style="display:flex; flex-direction:column; gap:20px; max-width:600px; margin:20px 0;">
                      
                      <!-- Graph Structure -->
                      <div style="display:flex; justify-content:center; gap:40px; margin-bottom:10px;">
                         <!-- Node 0 -->
                         <div style="position:relative; text-align:center;">
                            <div style="width:40px; height:40px; background:#10b981; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; color:white; border:2px solid #fff; margin:0 auto;">0</div>
                            <div style="margin-top:5px; font-size:12px; color:#cbd5e1;">In: <span style="color:#10b981">0</span></div>
                         </div>
                         
                         <div style="display:flex; flex-direction:column; justify-content:center; font-size:20px; color:#64748b;">
                            <div>➔</div>
                            <div>↘</div>
                         </div>

                         <!-- Node 1 & 2 -->
                         <div style="display:flex; flex-direction:column; gap:20px;">
                            <div style="position:relative; text-align:center;">
                                <div style="width:40px; height:40px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; color:white; margin:0 auto;">1</div>
                                <div style="margin-top:5px; font-size:12px; color:#cbd5e1;">In: 1</div>
                            </div>
                            <div style="position:relative; text-align:center;">
                                <div style="width:40px; height:40px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; color:white; margin:0 auto;">2</div>
                                <div style="margin-top:5px; font-size:12px; color:#cbd5e1;">In: 1</div>
                            </div>
                         </div>
                         
                         <div style="display:flex; flex-direction:column; justify-content:center; font-size:20px; color:#64748b;">
                            <div>↘</div>
                            <div>↗</div>
                         </div>

                         <!-- Node 3 -->
                         <div style="position:relative; text-align:center;">
                            <div style="width:40px; height:40px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; color:white; margin:0 auto;">3</div>
                            <div style="margin-top:5px; font-size:12px; color:#cbd5e1;">In: 2</div>
                         </div>
                      </div>

                      <!-- Timeline Breakdown -->
                      <div style="background:#1e293b; padding:15px; border-radius:8px;">
                         <div style="border-left:3px solid #10b981; padding-left:15px; margin-bottom:15px;">
                            <div style="color:#10b981; font-weight:bold; font-size:12px; margin-bottom:4px;">STEP 1: INITIALIZE</div>
                            <div style="color:#e2e8f0; font-size:13px;">Find nodes with Indegree = 0 (Node 0)</div>
                            <div style="margin-top:5px; background:#0f172a; padding:6px; border-radius:4px; display:inline-block; font-family:monospace; font-size:12px; border:1px solid #334155;">
                               Queue: [ <span style="color:#10b981; font-weight:bold;">0</span> ]
                            </div>
                         </div>
                         
                         <div style="border-left:3px solid #f59e0b; padding-left:15px; margin-bottom:15px;">
                            <div style="color:#f59e0b; font-weight:bold; font-size:12px; margin-bottom:4px;">STEP 2: PROCESS 0</div>
                            <div style="color:#cbd5e1; font-size:13px;">Pop 0 → Decrement neighbors (1 & 2)</div>
                            <div style="color:#e2e8f0; font-size:13px; margin-top:2px;">Indegrees become 0! Add to Q.</div>
                            <div style="margin-top:5px; background:#0f172a; padding:6px; border-radius:4px; display:inline-block; font-family:monospace; font-size:12px; border:1px solid #334155;">
                               Queue: [ <span style="color:#f59e0b; font-weight:bold;">1, 2</span> ]
                            </div>
                         </div>

                         <div style="border-left:3px solid #a78bfa; padding-left:15px;">
                            <div style="color:#a78bfa; font-weight:bold; font-size:12px; margin-bottom:4px;">STEP 3: PROCESS 1 & 2</div>
                            <div style="color:#cbd5e1; font-size:13px;">Pop 1, 2 → Decrement 3 twice (2→1→0)</div>
                            <div style="color:#e2e8f0; font-size:13px; margin-top:2px;">3 is now free! Add to Q.</div>
                            <div style="margin-top:5px; background:#0f172a; padding:6px; border-radius:4px; display:inline-block; font-family:monospace; font-size:12px; border:1px solid #334155;">
                               Queue: [ <span style="color:#a78bfa; font-weight:bold;">3</span> ]
                            </div>
                         </div>
                      </div>
                    </div>
                `,
                crux: `
                    <h4 style="color:#10b981;">💡 The Crux: Kahn's Algorithm</h4>
                    <div style="background:rgba(16, 185, 129, 0.1); padding:15px; border-radius:8px; border-left:4px solid #10b981; margin:15px 0;">
                        <strong>Core Idea:</strong>
                        <ul style="margin:5px 0 0 20px; color:#e2e8f0;">
                            <li>Cycle = Impossible (Return False)</li>
                            <li>No Cycle = Possible (Return True)</li>
                        </ul>
                    </div>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                        <div style="background:#0f172a; padding:15px; border-radius:8px;">
                            <strong style="color:#38bdf8;">1. In-Degree</strong>
                            <p style="font-size:0.9em; color:#94a3b8;">How many courses must be done <em>before</em> this one.</p>
                        </div>
                        <div style="background:#0f172a; padding:15px; border-radius:8px;">
                            <strong style="color:#38bdf8;">2. Queue</strong>
                            <p style="font-size:0.9em; color:#94a3b8;">Courses with 0 dependencies (Ready to take).</p>
                        </div>
                    </div>
                `,
                trap: `
                    <h4 style="color:#ef4444;">⚠️ Common Mistakes (Interview Killers)</h4>
                    <div style="display:grid; gap:15px; margin:15px 0;">
                        <div style="background:rgba(239, 68, 68, 0.1); padding:15px; border-radius:8px;">
                            <strong style="color:#f87171;">1. Wrong Graph Direction ❌</strong><br>
                            <span style="color:#cbd5e1; font-size:0.9em;">Make sure <code>pre -> course</code>. If <code>[1, 0]</code>, it means 0 -> 1.</span>
                        </div>
                        <div style="background:rgba(239, 68, 68, 0.1); padding:15px; border-radius:8px;">
                            <strong style="color:#f87171;">2. Syntax Errors ❌</strong><br>
                            <span style="color:#cbd5e1; font-size:0.9em;"><code>graph[pre].append = course</code> is WRONG. Use <code>.append(course)</code>.</span>
                        </div>
                        <div style="background:rgba(245, 158, 11, 0.1); padding:15px; border-radius:8px;">
                            <strong style="color:#fbbf24;">3. Counting Neighbors vs Courses ⚠️</strong><br>
                            <span style="color:#cbd5e1; font-size:0.9em;">Increment <code>processed</code> when popping from Queue (Course level), NOT when iterating neighbors.</span>
                        </div>
                        <div style="background:rgba(139, 92, 246, 0.1); padding:15px; border-radius:8px;">
                             <strong style="color:#a78bfa;">4. Iterating Values vs Indices ⚠️</strong><br>
                             <span style="color:#cbd5e1; font-size:0.9em;">Use <code>range(num_courses)</code> to check in-degree 0, not <code>in_degree</code> values directly.</span>
                        </div>
                    </div>
                `,
                dryRun: `
                    <h4 style="color:#22d3ee;">🔍 Dry Run: N=5, [[1,0],[2,0],[3,1],[3,2],[4,3]]</h4>
                    <div style="background:#0f172a; padding:20px; border-radius:12px; font-family:'Consolas', monospace;">
                        <pre style="color:#e2e8f0; margin:0; line-height:1.8;">
<span style="color:#f59e0b;">Init:</span> Q=[0], processed=0
<span style="color:#64748b;">(0 is only one with in-degree 0)</span>

<span style="color:#f59e0b;">Process 0:</span> processed=1
Neighbors: 1, 2
Indegrees: 1->0, 2->0
Q -> [1, 2]

<span style="color:#f59e0b;">Process 1:</span> processed=2
Neighbor: 3
Indegree: 3->1 (Still waiting on 2)
Q -> [2]

<span style="color:#f59e0b;">Process 2:</span> processed=3
Neighbor: 3
Indegree: 3->0 (Now 3 is free!)
Q -> [3]

<span style="color:#f59e0b;">Process 3:</span> processed=4
Neighbor: 4
Indegree: 4->0
Q -> [4]

<span style="color:#10b981;">Final:</span> processed(5) == num_courses(5) -> True
                        </pre>
                    </div>
                `,
                codeTitle: "Python Solution (Kahn's Algorithm)",
                code: `from collections import defaultdict, deque

def course_schedule(num_courses, prerequisites):
    # STEP 1: Build graph and in-degree array
    graph = defaultdict(list)
    in_degree = [0] * num_courses
    
    for course, pre_course in prerequisites:
        graph[pre_course].append(course)  # pre_course -> course
        in_degree[course] += 1
    
    # STEP 2: Find all starting points (in_degree = 0)
    que = deque()
    for course in range(num_courses):
        if in_degree[course] == 0:
            que.append(course)
    
    # STEP 3: BFS - Process level by level
    processed_courses = 0
    
    while que:
        cur_course = que.popleft()
        processed_courses += 1  # ✅ Count this course
        
        for neighbour in graph[cur_course]:
            in_degree[neighbour] -= 1
            if in_degree[neighbour] == 0:
                que.append(neighbour)
    
    # STEP 4: Check if all courses processed
    return processed_courses == num_courses`
            }
        },

        {
            id: "network-delay-time",
            title: "Network Delay Time",
            leetcodeUrl: "https://leetcode.com/problems/network-delay-time/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Dijkstra"],
            quiz: {
                description: "Max time for signal to reach all nodes. Weighted edges.",
                options: ["BFS", "Dijkstra", "DFS", "Topo Sort"],
                correct: 1,
                explanation: "Dijkstra! Weighted edges require Priority Queue. BFS is for unweighted. Visit nodes in increasing order of cost."
            },
            learn: {
                metrics: { time: "O(E log V)", space: "O(V+E)" },
                timeExplainer: `
                    <h4 style="color:#c026d3;">⏱️ Time Complexity: O(E log V)</h4>
                    <div style="background:rgba(192, 38, 211, 0.1); padding:20px; border-radius:12px; margin:15px 0;">
                        <p><strong>Dijkstra's Algorithm Breakdown:</strong></p>
                        <table style="width:100%; margin-top:10px;">
                            <tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
                                <td style="padding:10px;"><strong>Heap Operations:</strong></td>
                                <td style="padding:10px;">Each edge may be pushed to heap → <code style="color:#22d3ee;">O(E)</code> pushes</td>
                            </tr>
                            <tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
                                <td style="padding:10px;"><strong>Each Push/Pop:</strong></td>
                                <td style="padding:10px;">Heap has at most V nodes → <code style="color:#22d3ee;">O(log V)</code></td>
                            </tr>
                            <tr>
                                <td style="padding:10px;"><strong>Total:</strong></td>
                                <td style="padding:10px; font-weight:700; color:#34d399;">O(E × log V)</td>
                            </tr>
                        </table>
                        <div style="background:rgba(139, 92, 246, 0.1); padding:15px; border-radius:8px; margin-top:15px;">
                            <strong style="color:#a78bfa;">Why not O(V²)?</strong><br>
                            That's the naive version without a heap. With min-heap, we get O(E log V).
                        </div>
                    </div>
                `,
                spaceExplainer: `
                    <h4 style="color:#c026d3;">📦 Space Complexity: O(V+E)</h4>
                    <div style="background:rgba(192, 38, 211, 0.1); padding:20px; border-radius:12px; margin:15px 0;">
                        <table style="width:100%;">
                            <tr><td style="padding:8px;"><strong>Graph:</strong></td><td>O(V+E) - adjacency list</td></tr>
                            <tr><td style="padding:8px;"><strong>Dist Dict:</strong></td><td>O(V) - stores shortest distances</td></tr>
                            <tr><td style="padding:8px;"><strong>Heap:</strong></td><td>O(E) worst case with lazy deletion</td></tr>
                        </table>
                    </div>
                `,
                visual: `
                    <h4 style="color:#c026d3;">🎯 Dijkstra: Greedy Shortest Path</h4>
                    <div style="display:flex; flex-direction:column; gap:20px; max-width:600px; margin:20px 0;">
                      
                      <!-- Graph Structure -->
                      <div style="display:flex; justify-content:center; gap:50px; margin-bottom:15px; align-items:flex-start;">
                         <!-- Node 1 -->
                         <div style="text-align:center;">
                            <div style="width:40px; height:40px; background:#10b981; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; color:white; border:2px solid #fff; margin:0 auto;">1</div>
                            <div style="margin-top:2px; font-size:11px; color:#10b981;">Dist: 0</div>
                         </div>
                         
                         <!-- Nodes 2 & 3 -->
                         <div style="display:flex; flex-direction:column; gap:40px;">
                            <div style="position:relative;">
                                <div style="position:absolute; top:20px; left:-40px; border-top:2px dashed #64748b; width:40px; transform:rotate(-25deg);"></div>
                                <div style="position:absolute; top:5px; left:-25px; font-size:10px; color:#f59e0b; background:#1e293b; padding:0 3px;">2</div>
                                
                                <div style="width:40px; height:40px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; color:white;">2</div>
                                <div style="margin-top:2px; font-size:11px; color:#cbd5e1;">Dist: 2</div>
                            </div>
                            
                            <div style="position:relative;">
                                <div style="position:absolute; top:20px; left:-40px; border-top:2px dashed #64748b; width:40px; transform:rotate(25deg);"></div>
                                <div style="position:absolute; top:35px; left:-25px; font-size:10px; color:#f59e0b; background:#1e293b; padding:0 3px;">1</div>
                                
                                <div style="width:40px; height:40px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; color:white;">3</div>
                                <div style="margin-top:2px; font-size:11px; color:#cbd5e1;">Dist: 1</div>
                            </div>
                         </div>

                         <!-- Node 4 -->
                         <div style="display:flex; align-items:center;">
                             <div style="width:40px; height:40px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; color:white;">4</div>
                         </div>
                      </div>

                      <!-- Heap Logic -->
                      <div style="background:#1e293b; padding:15px; border-radius:8px;">
                         <div style="margin-bottom:12px; border-bottom:1px solid #334155; padding-bottom:8px;">
                            <strong style="color:#cbd5e1; font-size:13px;">MIN-HEAP State (Cost, Node):</strong>
                         </div>

                         <!-- Step 1 -->
                         <div style="display:flex; gap:10px; align-items:center; margin-bottom:12px;">
                            <div style="font-size:12px; color:#64748b; width:40px;">Step 1</div>
                            <div style="background:#0f172a; padding:5px 10px; border-radius:4px; font-family:monospace; font-size:12px; border:1px solid #334155;">
                               [(0, 1)]
                            </div>
                            <div style="font-size:12px; color:#10b981;">Pop 1, Push neighbors (2, 3)</div>
                         </div>

                         <!-- Step 2 -->
                         <div style="display:flex; gap:10px; align-items:center; margin-bottom:12px;">
                            <div style="font-size:12px; color:#64748b; width:40px;">Step 2</div>
                            <div style="background:#0f172a; padding:5px 10px; border-radius:4px; font-family:monospace; font-size:12px; border:1px solid #334155;">
                               [(1, 3), (2, 2)]
                            </div>
                            <div style="font-size:12px; color:#10b981;">Pop 3 (Cost 1), Push 4</div>
                         </div>

                         <!-- Step 3 -->
                         <div style="display:flex; gap:10px; align-items:center;">
                            <div style="font-size:12px; color:#64748b; width:40px;">Step 3</div>
                            <div style="background:#0f172a; padding:5px 10px; border-radius:4px; font-family:monospace; font-size:12px; border:1px solid #334155;">
                               [(2, 2), (4, 4)]
                            </div>
                            <div style="font-size:12px; color:#10b981;">Pop 2 (Cost 2)...</div>
                         </div>

                      </div>
                    </div>
                `,
                crux: `
                    <h4 style="color:#10b981;">💡 The Crux: Greedy + Min-Heap</h4>
                    <div style="display:grid; gap:15px; margin:15px 0;">
                        <div style="background:rgba(16, 185, 129, 0.1); padding:15px; border-radius:8px; border-left:4px solid #10b981;">
                            <strong>Greedy Choice:</strong> Always process the node with smallest known distance
                        </div>
                        <div style="background:rgba(245, 158, 11, 0.1); padding:15px; border-radius:8px; border-left:4px solid #f59e0b;">
                            <strong>Relaxation:</strong> If new path is shorter, update and push to heap
                        </div>
                        <div style="background:rgba(139, 92, 246, 0.1); padding:15px; border-radius:8px; border-left:4px solid #8b5cf6;">
                            <strong>Lazy Deletion:</strong> Skip nodes that are already in dist (stale entries)
                        </div>
                    </div>
                    <div style="background:#0f172a; padding:15px; border-radius:8px; margin:15px 0; font-family:Consolas;">
                        <code style="color:#7dd3fc;">
                            while heap:<br>
                            &nbsp;&nbsp;cost, node = heappop(heap)<br>
                            &nbsp;&nbsp;if node in dist: continue  # <span style="color:#ef4444;">CRITICAL!</span><br>
                            &nbsp;&nbsp;dist[node] = cost<br>
                            &nbsp;&nbsp;for neighbor, weight in graph[node]:<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;if neighbor not in dist:<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;heappush(heap, (cost + weight, neighbor))
                        </code>
                    </div>
                    <h5 style="color:#a78bfa; margin-top:20px;">Same Pattern Problems:</h5>
                    <ul style="line-height:2;">
                        <li>🛤️ <strong>Cheapest Flights Within K Stops</strong> - Dijkstra with constraint</li>
                        <li>🏊 <strong>Swim in Rising Water</strong> - Min-max path (modified Dijkstra)</li>
                        <li>📍 <strong>Path with Minimum Effort</strong> - Minimize maximum edge</li>
                        <li>🚗 <strong>Shortest Path in Binary Matrix</strong> - BFS (unweighted)</li>
                    </ul>
                `,
                trap: `
                    <h4 style="color:#ef4444;">⚠️ Common Traps</h4>
                    <div style="display:grid; gap:15px; margin:15px 0;">
                        <div style="background:rgba(239, 68, 68, 0.1); padding:15px; border-radius:8px;">
                            <strong style="color:#ef4444;">Trap 1: Stale Heap Entries</strong><br>
                            Same node can be pushed multiple times with different costs.<br>
                            <code style="background:#0f172a; padding:4px 8px; border-radius:4px; color:#f87171;">if node in dist: continue</code>
                        </div>
                        <div style="background:rgba(239, 68, 68, 0.1); padding:15px; border-radius:8px;">
                            <strong style="color:#ef4444;">Trap 2: Using BFS for Weighted</strong><br>
                            BFS only works for unweighted graphs! Dijkstra is for weighted.
                        </div>
                        <div style="background:rgba(239, 68, 68, 0.1); padding:15px; border-radius:8px;">
                            <strong style="color:#ef4444;">Trap 3: Negative Weights</strong><br>
                            Dijkstra FAILS with negative weights! Use Bellman-Ford instead.
                        </div>
                        <div style="background:rgba(239, 68, 68, 0.1); padding:15px; border-radius:8px;">
                            <strong style="color:#ef4444;">Trap 4: Node Indexing</strong><br>
                            This problem uses 1-indexed nodes! Start from node k, not k-1.
                        </div>
                    </div>
                `,
                dryRun: `
                    <h4 style="color:#22d3ee;">🔍 Dry Run: times=[[1,2,1],[1,3,2],[2,3,1]], n=3, k=1</h4>
                    <div style="background:#0f172a; padding:20px; border-radius:12px; font-family:'Consolas', monospace;">
                        <pre style="color:#e2e8f0; margin:0; line-height:1.8;">
<span style="color:#f59e0b;">Graph:</span>
  1 →(1)→ 2 →(1)→ 3
  1 →(2)→ 3

<span style="color:#f59e0b;">Initial:</span>
  heap = [(0, 1)]
  dist = {}

<span style="color:#f59e0b;">Pop (0, 1):</span>
  dist = {1: 0}
  Push (0+1, 2) and (0+2, 3)
  heap = [(1, 2), (2, 3)]

<span style="color:#f59e0b;">Pop (1, 2):</span>
  dist = {1: 0, 2: 1}
  Push (1+1, 3) = (2, 3)
  heap = [(2, 3), (2, 3)]  ← duplicate!

<span style="color:#f59e0b;">Pop (2, 3):</span>
  dist = {1: 0, 2: 1, 3: 2}
  heap = [(2, 3)]  ← stale entry

<span style="color:#f59e0b;">Pop (2, 3):</span>
  3 in dist → SKIP!

<span style="color:#10b981;">✅ len(dist) == n, return max(dist.values()) = 2</span>
                        </pre>
                    </div>
                `,
                codeTitle: "Python Solution (Dijkstra)",
                code: `def networkDelayTime(times, n, k):
    import heapq
    from collections import defaultdict
    
    # Build adjacency list
    graph = defaultdict(list)
    for u, v, w in times:
        graph[u].append((v, w))
    
    # Min-heap: (distance, node)
    heap = [(0, k)]
    dist = {}
    
    while heap:
        cost, node = heapq.heappop(heap)
        
        # Skip stale entries (already processed)
        if node in dist:
            continue
        
        # First time reaching this node = shortest path
        dist[node] = cost
        
        # Relax neighbors
        for neighbor, weight in graph[node]:
            if neighbor not in dist:
                heapq.heappush(heap, (cost + weight, neighbor))
    
    # Check if all nodes are reachable
    if len(dist) == n:
        return max(dist.values())
    return -1`
            }
        },

        {
            id: "number-of-provinces",
            title: "Number of Provinces",
            leetcodeUrl: "https://leetcode.com/problems/number-of-provinces/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Union-Find"],
            quiz: {
                description: "Count connected components. Efficient DS?",
                options: ["DFS", "BFS", "Union-Find (DSU)", "All of the above"],
                correct: 3,
                explanation: "All work! But DSU (Union-Find) is the most elegant for 'connectivity' and 'components'. Initialize N parents. Union connected nodes. Count unique parents."
            },
            learn: {
                metrics: { time: "O(N²×α(N))", space: "O(N)" },
                timeExplainer: `
                    <h4 style="color:#c026d3;">⏱️ Time Complexity: O(N² × α(N))</h4>
                    <div style="background:rgba(192, 38, 211, 0.1); padding:20px; border-radius:12px; margin:15px 0;">
                        <table style="width:100%; margin-top:10px;">
                            <tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
                                <td style="padding:10px;"><strong>Iterate Matrix:</strong></td>
                                <td style="padding:10px;">O(N²) - check each pair</td>
                            </tr>
                            <tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
                                <td style="padding:10px;"><strong>Union/Find:</strong></td>
                                <td style="padding:10px;">O(α(N)) ≈ O(1) with path compression</td>
                            </tr>
                        </table>
                        <div style="background:rgba(16, 185, 129, 0.1); padding:15px; border-radius:8px; margin-top:15px;">
                            <strong style="color:#10b981;">What is α(N)?</strong><br>
                            Inverse Ackermann function. For any practical N (even 10^100), α(N) ≤ 5. Basically constant!
                        </div>
                    </div>
                `,
                spaceExplainer: `
                    <h4 style="color:#c026d3;">📦 Space Complexity: O(N)</h4>
                    <div style="background:rgba(192, 38, 211, 0.1); padding:20px; border-radius:12px; margin:15px 0;">
                        <table style="width:100%;">
                            <tr><td style="padding:8px;"><strong>Parent Array:</strong></td><td>O(N) - one entry per node</td></tr>
                            <tr><td style="padding:8px;"><strong>Rank Array (optional):</strong></td><td>O(N) - for union by rank</td></tr>
                        </table>
                    </div>
                `,
                visual: `
                    <h4 style="color:#c026d3;">🏢 Union-Find: Corporate Merger</h4>
                    <div style="display:flex; flex-direction:column; gap:20px; max-width:600px; margin:20px 0;">
                        
                        <!-- Initial State -->
                        <div style="background:#1e293b; padding:10px; border-radius:8px;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                                <span style="color:#cbd5e1; font-size:12px;">Step 1: Initial (4 Provinces)</span>
                                <span style="font-family:monospace; color:#e2e8f0; font-size:11px;">Parent: [0, 1, 2, 3]</span>
                            </div>
                            <div style="display:flex; gap:10px; justify-content:center;">
                                <div style="width:30px; height:30px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:12px;">0</div>
                                <div style="width:30px; height:30px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:12px;">1</div>
                                <div style="width:30px; height:30px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:12px;">2</div>
                                <div style="width:30px; height:30px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:12px;">3</div>
                            </div>
                        </div>

                        <!-- Union 0-1 -->
                        <div style="background:#1e293b; padding:10px; border-radius:8px;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                                <span style="color:#cbd5e1; font-size:12px;">Step 2: Union(0, 1)</span>
                                <span style="font-family:monospace; color:#e2e8f0; font-size:11px;">Parent: [1, 1, 2, 3]</span>
                            </div>
                            <div style="display:flex; gap:10px; justify-content:center; align-items:flex-start;">
                                <div style="display:flex; flex-direction:column; align-items:center;">
                                    <div style="width:30px; height:30px; background:#10b981; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:12px; border:2px solid #fff;">1</div>
                                    <div style="height:15px; border-left:2px solid #64748b;"></div>
                                    <div style="width:30px; height:30px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:12px;">0</div>
                                </div>
                                <div style="width:30px; height:30px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:12px;">2</div>
                                <div style="width:30px; height:30px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:12px;">3</div>
                            </div>
                        </div>

                        <!-- Union 1-2 (Result) -->
                        <div style="background:#1e293b; padding:10px; border-radius:8px; border:1px solid #10b981;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                                <span style="color:#10b981; font-size:12px; font-weight:bold;">Step 3: Union(1, 2) → Final</span>
                                <span style="font-family:monospace; color:#e2e8f0; font-size:11px;">Count: 2</span>
                            </div>
                            <div style="display:flex; gap:40px; justify-content:center;">
                                <!-- Group 1 -->
                                <div style="position:relative; width:80px; height:80px; border:2px dashed #64748b; border-radius:12px; display:flex; justify-content:center; align-items:end; padding-bottom:5px;">
                                    <div style="position:absolute; top:-10px; background:#1e293b; color:#cbd5e1; font-size:10px; padding:0 5px;">Prov A</div>
                                    
                                    <!-- Tree Structure -->
                                    <div style="position:absolute; top:10px; left:25px; width:30px; height:30px; background:#10b981; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:12px; z-index:2;">2</div>
                                    
                                    <svg style="position:absolute; top:25px; left:10px; width:60px; height:40px; z-index:1;">
                                        <line x1="20" y1="0" x2="10" y2="30" stroke="#64748b" stroke-width="2" />
                                        <line x1="20" y1="0" x2="50" y2="30" stroke="#64748b" stroke-width="2" />
                                    </svg>

                                    <div style="position:absolute; bottom:5px; left:5px; width:25px; height:25px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:10px;">0</div>
                                    <div style="position:absolute; bottom:5px; right:5px; width:25px; height:25px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:10px;">1</div>
                                </div>

                                <!-- Group 2 -->
                                <div style="position:relative; width:40px; height:80px; border:2px dashed #64748b; border-radius:12px; display:flex; justify-content:center; align-items:center;">
                                    <div style="position:absolute; top:-10px; background:#1e293b; color:#cbd5e1; font-size:10px; padding:0 5px;">Prov B</div>
                                    <div style="width:30px; height:30px; background:#10b981; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:12px;">3</div>
                                </div>
                            </div>
                        </div>

                    </div>
                `,
                crux: `
                    <h4 style="color:#10b981;">💡 The Crux: Find Root + Union Roots</h4>
                    <div style="display:grid; gap:15px; margin:15px 0;">
                        <div style="background:rgba(16, 185, 129, 0.1); padding:15px; border-radius:8px; border-left:4px solid #10b981;">
                            <strong>Find with Path Compression:</strong><br>
                            <code style="background:#0f172a; padding:4px 8px; border-radius:4px;">if parent[x] != x: parent[x] = find(parent[x])</code>
                        </div>
                        <div style="background:rgba(245, 158, 11, 0.1); padding:15px; border-radius:8px; border-left:4px solid #f59e0b;">
                            <strong>Union by Rank/Size:</strong> Attach smaller tree under larger tree's root
                        </div>
                    </div>
                    <h5 style="color:#a78bfa; margin-top:20px;">Same Pattern Problems:</h5>
                    <ul style="line-height:2;">
                        <li>🏝️ <strong>Number of Islands</strong> - Can use DFS or DSU</li>
                        <li>🔗 <strong>Redundant Connection</strong> - Find the extra edge</li>
                        <li>📊 <strong>Accounts Merge</strong> - Group by common emails</li>
                        <li>👥 <strong>Smallest String with Swaps</strong> - Group indices by swaps</li>
                    </ul>
                `,
                trap: `
                    <h4 style="color:#ef4444;">⚠️ Common Traps</h4>
                    <div style="display:grid; gap:15px; margin:15px 0;">
                        <div style="background:rgba(239, 68, 68, 0.1); padding:15px; border-radius:8px;">
                            <strong style="color:#ef4444;">Trap 1: Union Nodes, Not Roots</strong><br>
                            <code style="color:#f87171;">parent[x] = y</code> is WRONG!<br>
                            <code style="color:#10b981;">parent[find(x)] = find(y)</code> is CORRECT!
                        </div>
                        <div style="background:rgba(239, 68, 68, 0.1); padding:15px; border-radius:8px;">
                            <strong style="color:#ef4444;">Trap 2: Counting Components</strong><br>
                            Count unique roots, not unique parent values. Use set(find(i) for i in range(n)).
                        </div>
                        <div style="background:rgba(239, 68, 68, 0.1); padding:15px; border-radius:8px;">
                            <strong style="color:#ef4444;">Trap 3: Self-Connection</strong><br>
                            isConnected[i][i] = 1 always. Don't count it twice or union i with i.
                        </div>
                    </div>
                `,
                codeTitle: "Python Solution (Union-Find)",
                code: `def findCircleNum(isConnected):
    n = len(isConnected)
    parent = list(range(n))
    count = n  # Start with N separate provinces
    
    def find(x):
        # Path compression: point directly to root
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]
    
    def union(x, y):
        nonlocal count
        root_x, root_y = find(x), find(y)
        if root_x != root_y:
            parent[root_x] = root_y  # Merge trees
            count -= 1               # One less component
    
    # Check each pair (upper triangle only)
    for i in range(n):
        for j in range(i + 1, n):
            if isConnected[i][j] == 1:
                union(i, j)
    
    return count`
            }
        },

        {
            id: "clone-graph",
            title: "Clone Graph",
            leetcodeUrl: "https://leetcode.com/problems/clone-graph/",
            difficulty: "Good to Do",
            priority: "🟢",
            tags: ["Deep Copy"],
            quiz: {
                description: "Deep copy graph. How to handle cycles?",
                options: ["BFS", "DFS + HashMap", "Recursion only", "Queue"],
                correct: 1,
                explanation: "DFS + HashMap! Map stores `OldNode -> NewNode`. If node in map, return stored copy (handles cycles). Else create, add to map, recurse."
            },
            learn: {
                metrics: { time: "O(V+E)", space: "O(V)" },
                timeExplainer: `
                    <h4 style="color:#c026d3;">⏱️ Time Complexity: O(V + E)</h4>
                    <div style="background:rgba(192, 38, 211, 0.1); padding:20px; border-radius:12px; margin:15px 0;">
                        <ul style="line-height:2.0; color:#e2e8f0; margin-left: 10px;">
                            <li><strong style="color:#f472b6;">Visit Nodes:</strong> Each node processed exactly once (Hash Map check). <code>O(V)</code></li>
                            <li><strong style="color:#f472b6;">Traverse Edges:</strong> We iterate over neighbors for every node. <code>O(E)</code></li>
                        </ul>
                        <div style="margin-top:10px; font-weight:bold; text-align:center; color:#e879f9;">Total: O(V + E)</div>
                    </div>
                `,
                spaceExplainer: `
                    <h4 style="color:#c026d3;">📦 Space Complexity: O(V)</h4>
                    <div style="background:rgba(192, 38, 211, 0.1); padding:20px; border-radius:12px; margin:15px 0;">
                        <ul style="line-height:2.0; color:#e2e8f0; margin-left: 10px;">
                            <li><strong style="color:#22d3ee;">Hash Map:</strong> Stores V nodes. <code>O(V)</code></li>
                            <li><strong style="color:#22d3ee;">Recursion Stack:</strong> Worst case depth is V. <code>O(V)</code></li>
                        </ul>
                    </div>
                `,
                visual: `
                    <h4 style="color:#c026d3;">🔄 Clone with Cycle Detection</h4>
                    <div style="display:flex; gap:10px; margin:20px 0; max-width:600px;">
                        
                        <!-- Original Graph (Left) -->
                        <div style="flex:1; background:#1e293b; padding:10px; border-radius:8px;">
                            <div style="text-align:center; color:#94a3b8; font-size:12px; margin-bottom:10px;">Original Graph</div>
                            <div style="display:flex; justify-content:center; gap:20px;">
                                <div style="display:flex; flex-direction:column; gap:20px;">
                                    <div style="width:30px; height:30px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white;">1</div>
                                    <div style="width:30px; height:30px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white;">4</div>
                                </div>
                                <div style="display:flex; flex-direction:column; gap:20px;">
                                    <div style="width:30px; height:30px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white;">2</div>
                                    <div style="width:30px; height:30px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white;">3</div>
                                </div>
                            </div>
                        </div>

                        <!-- Expansion Logic (Middle) -->
                        <div style="flex:1.5; display:flex; flex-direction:column; gap:8px;">
                            
                            <div style="background:#0f172a; padding:8px; border-radius:6px; border-left:3px solid #f59e0b;">
                                <div style="font-size:11px; color:#f59e0b; font-weight:bold;">1. Visit Node 1</div>
                                <div style="font-size:10px; color:#cbd5e1;">Map: {1 -> 1'}</div>
                            </div>

                            <div style="background:#0f172a; padding:8px; border-radius:6px; border-left:3px solid #f59e0b;">
                                <div style="font-size:11px; color:#f59e0b; font-weight:bold;">2. Visit Node 2</div>
                                <div style="font-size:10px; color:#cbd5e1;">Map: {1->1', 2->2'}</div>
                            </div>

                            <div style="background:#0f172a; padding:8px; border-radius:6px; border-left:3px solid #10b981;">
                                <div style="font-size:11px; color:#10b981; font-weight:bold;">3. Visit 1 (Cycle)</div>
                                <div style="font-size:10px; color:#cbd5e1;">1 in Map? YES! Return 1'</div>
                            </div>

                        </div>

                    </div>
                `,
                crux: `
                    <h4 style="color:#10b981;">💡 The Crux: HashMap = Visited + Clone Storage</h4>
                    <div style="display:grid; gap:15px; margin:15px 0;">
                        <div style="background:rgba(16, 185, 129, 0.1); padding:15px; border-radius:8px; border-left:4px solid #10b981;">
                            <strong>Check Map First:</strong> If node exists in map, return existing clone (breaks cycles!)
                        </div>
                        <div style="background:rgba(245, 158, 11, 0.1); padding:15px; border-radius:8px; border-left:4px solid #f59e0b;">
                            <strong>Add to Map BEFORE recursing:</strong> This is critical for cycle handling!
                        </div>
                    </div>
                    <div style="background:#0f172a; padding:15px; border-radius:8px; margin:15px 0; font-family:Consolas;">
                        <code style="color:#7dd3fc;">
                            if node in hashmap: return hashmap[node]<br>
                            clone = Node(node.val)<br>
                            hashmap[node] = clone  # <span style="color:#ef4444;">ADD BEFORE RECURSING!</span><br>
                            for neighbor in node.neighbors:<br>
                            &nbsp;&nbsp;clone.neighbors.append(dfs(neighbor))
                        </code>
                    </div>
                    <h5 style="color:#a78bfa; margin-top:20px;">Same Pattern Problems:</h5>
                    <ul style="line-height:2;">
                        <li>📋 <strong>Copy List with Random Pointer</strong> - Same hashmap trick</li>
                        <li>🌳 <strong>Clone Binary Tree with Random Pointer</strong> - Tree version</li>
                        <li>🔗 <strong>Clone N-ary Tree</strong> - Simpler, no cycles</li>
                    </ul>
                `,
                trap: `
                    <h4 style="color:#ef4444;">⚠️ Common Mistakes & Why They're Wrong</h4>
                    <div style="display:grid; gap:15px; margin:15px 0;">
                        <div style="background:rgba(239, 68, 68, 0.1); padding:15px; border-radius:8px;">
                            <strong style="color:#ef4444;">1. Missing Base Case Check ❌</strong><br>
                            <span style="color:#cbd5e1; font-size:0.9rem;"><code>if node in cloned: return cloned[node]</code></span><br>
                            Without this, cycles (e.g., 1→2→1) cause infinite recursion!
                        </div>
                        <div style="background:rgba(239, 68, 68, 0.1); padding:15px; border-radius:8px;">
                            <strong style="color:#ef4444;">2. Late Map Entry ❌</strong><br>
                            Store <code>cloned[node] = clone</code> <strong>BEFORE</strong> processing neighbors.<br>
                            If you do it after, the neighbor's recursive call won't find the node in 'cloned', leading to loops.
                        </div>
                        <div style="background:rgba(245, 158, 11, 0.1); padding:15px; border-radius:8px;">
                            <strong style="color:#fbbf24;">3. Not Handling None Input ⚠️</strong><br>
                            Graph can be empty! <code>if not node: return None</code>
                        </div>
                    </div>
                `,
                dryRun: `
                    <h4 style="color:#22d3ee;">🔍 Dry Run: 1 -- 2</h4>
                    <div style="background:#0f172a; padding:15px; border-radius:12px; font-family:'Consolas', monospace; font-size:0.9rem;">
                        <div style="margin-bottom:10px; border-bottom:1px solid #334155; padding-bottom:5px;">
                            <span style="color:#94a3b8;">Start: cloneGraph(1)</span>
                        </div>
                        
                        <div style="color:#e2e8f0; margin-left:10px;">
                            • <strong>DFS(1)</strong>: Not in map.
                            <br>&nbsp;&nbsp;→ Create Clone(1). Map = {1: 1'}
                            <br>&nbsp;&nbsp;→ Process neighbor 2.
                        </div>
                        
                        <div style="color:#e2e8f0; margin-left:25px; margin-top:5px; border-left:2px solid #334155; padding-left:10px;">
                            • <strong>DFS(2)</strong>: Not in map.
                            <br>→ Create Clone(2). Map = {1: 1', 2: 2'}
                            <br>→ Process neighbor 1 (Cycle!).
                            <br><span style="color:#10b981; background:rgba(16, 185, 129, 0.2); padding:2px 6px; border-radius:4px;">1 IS in Map! Return Clone(1)</span>
                        </div>
                    </div>
                `,
                codeTitle: "Python Solution (DFS + HashMap)",
                code: `class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def cloneGraph(node):
    # EDGE CASE: Empty graph
    if not node:
        return None
    
    # Hash map: original_node -> cloned_node
    cloned = {}
    
    def dfs(node):
        # BASE CASE: Node already cloned? Return it!
        if node in cloned:
            return cloned[node]
        
        # STEP 1: Create clone
        clone = Node(node.val)
        
        # STEP 2: Store in map BEFORE neighbors (Critical!)
        cloned[node] = clone
        
        # STEP 3: Clone neighbors recursively
        for neighbor in node.neighbors:
            clone.neighbors.append(dfs(neighbor))
        
        return clone
    
    return dfs(node)`
            }
        },

        {
            id: "is-graph-bipartite",
            title: "Is Graph Bipartite?",
            leetcodeUrl: "https://leetcode.com/problems/is-graph-bipartite/",
            difficulty: "Good to Do",
            priority: "🟡",
            tags: ["Graph Coloring"],
            quiz: {
                description: "Can graph be colored with 2 colors? Algorithm?",
                options: ["Dijkstra", "BFS/DFS 2-Coloring", "Topological Sort", "Union Find"],
                correct: 1,
                explanation: "2-Coloring (Bipartite Check)! Use BFS/DFS. Assign color 0/1. If neighbor has SAME color -> False. If neighbor unvisited -> Assign opposite color."
            },
            learn: {
                metrics: { time: "O(V+E)", space: "O(V)" },
                timeExplainer: `
                    <h4 style="color:#c026d3;">⏱️ Time Complexity: O(V + E)</h4>
                    <div style="background:rgba(192, 38, 211, 0.1); padding:20px; border-radius:12px; margin:15px 0;">
                        <ul style="line-height:2.0; color:#e2e8f0; margin-left:10px;">
                            <li><strong style="color:#f472b6;">Outer Loop:</strong> Iterates V nodes to handle disconnected components. <code>O(V)</code></li>
                            <li><strong style="color:#f472b6;">BFS Traversal:</strong> Visits every node once <code>O(V)</code> and checks all edges <code>O(E)</code>.</li>
                        </ul>
                        <div style="margin-top:10px; font-weight:bold; text-align:center; color:#e879f9;">Total: O(V + E)</div>
                    </div>
                `,
                spaceExplainer: `
                    <h4 style="color:#c026d3;">📦 Space Complexity: O(V)</h4>
                    <div style="background:rgba(192, 38, 211, 0.1); padding:20px; border-radius:12px; margin:15px 0;">
                        <ul style="line-height:2.0; color:#e2e8f0; margin-left:10px;">
                            <li><strong style="color:#22d3ee;">Color Array:</strong> Stores state for V nodes. <code>O(V)</code></li>
                            <li><strong style="color:#22d3ee;">Queue:</strong> Worst case holds all nodes at one level. <code>O(V)</code></li>
                        </ul>
                    </div>
                `,
                visual: `
                    <h4 style="color:#c026d3;">🎨 2-Coloring: Red vs Blue</h4>
                    <div style="display:flex; flex-direction:column; gap:20px; max-width:600px; margin:20px 0;">
                        
                        <!-- Valid Case -->
                        <div style="background:#1e293b; padding:15px; border-radius:8px;">
                            <div style="text-align:center; color:#10b981; font-weight:bold; margin-bottom:15px;">✅ Bipartite (Even Cycle)</div>
                            <div style="display:flex; justify-content:center; gap:30px; align-items:center;">
                                <div style="display:flex; flex-direction:column; gap:30px;">
                                    <div style="width:40px; height:40px; background:#ef4444; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold; border:2px solid #fff;">R</div>
                                    <div style="width:40px; height:40px; background:#3b82f6; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold;">B</div>
                                </div>
                                <div style="height:80px; width:2px; background:#64748b;"></div>
                                <div style="display:flex; flex-direction:column; gap:30px;">
                                    <div style="width:40px; height:40px; background:#3b82f6; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold;">B</div>
                                    <div style="width:40px; height:40px; background:#ef4444; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold;">R</div>
                                </div>
                            </div>
                            <div style="text-align:center; margin-top:10px; font-size:12px; color:#cbd5e1;">All neighbors have DIFFERENT colors</div>
                        </div>

                        <!-- Invalid Case -->
                        <div style="background:#1e293b; padding:15px; border-radius:8px;">
                            <div style="text-align:center; color:#f87171; font-weight:bold; margin-bottom:15px;">❌ Not Bipartite (Odd Cycle)</div>
                            <div style="display:flex; justify-content:center; align-items:center; position:relative; height:100px;">
                                <!-- Triangle -->
                                <div style="position:absolute; top:0; left:50%; transform:translateX(-50%); width:40px; height:40px; background:#ef4444; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold;">R</div>
                                <div style="position:absolute; bottom:0; left:20%; width:40px; height:40px; background:#3b82f6; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold;">B</div>
                                
                                <div style="position:absolute; bottom:0; right:20%; width:40px; height:40px; background:#ef4444; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold; border:2px dashed #f59e0b;">R?</div>
                                
                                <div style="position:absolute; top:50%; right:10px; color:#f59e0b; font-size:12px; width:80px;">Conflict! Needs Blue but neighbor is Blue</div>
                            </div>
                        </div>

                    </div>
                `,
                crux: `
                    <h4 style="color:#10b981;">💡 The Crux: Alternate Colors</h4>
                    <div style="display:grid; gap:15px; margin:15px 0;">
                        <div style="background:rgba(16, 185, 129, 0.1); padding:15px; border-radius:8px; border-left:4px solid #10b981;">
                            <strong>Key Insight:</strong> Bipartite ⟺ No odd-length cycles
                        </div>
                        <div style="background:rgba(245, 158, 11, 0.1); padding:15px; border-radius:8px; border-left:4px solid #f59e0b;">
                            <strong>Algorithm:</strong> <code>neighbor_color = 1 - current_color</code>
                        </div>
                    </div>
                    <h5 style="color:#a78bfa; margin-top:20px;">Same Pattern Problems:</h5>
                    <ul style="line-height:2;">
                        <li>👥 <strong>Possible Bipartition</strong> - Same problem, different name</li>
                        <li>🏫 <strong>Divide into Two Groups</strong> - Graph coloring variant</li>
                    </ul>
                `,
                trap: `
                    <h4 style="color:#ef4444;">⚠️ Common Mistakes & Why They're Wrong</h4>
                    <div style="display:grid; gap:15px; margin:15px 0;">
                        <div style="background:rgba(239, 68, 68, 0.1); padding:15px; border-radius:8px;">
                            <strong style="color:#ef4444;">1. Only starting BFS from Node 0 ❌</strong><br>
                            Graphs can be disconnected! Must iterate <code>range(n)</code> to cover all components.
                        </div>
                        <div style="background:rgba(239, 68, 68, 0.1); padding:15px; border-radius:8px;">
                            <strong style="color:#ef4444;">2. Using Visited Set (Boolean) ❌</strong><br>
                            Need 3 states: <code>-1</code> (Unvisited), <code>0</code> (Color A), <code>1</code> (Color B). Boolean isn't enough to check conflicts.
                        </div>
                        <div style="background:rgba(245, 158, 11, 0.1); padding:15px; border-radius:8px;">
                            <strong style="color:#fbbf24;">3. Incorrect Logic for "Same Color" ⚠️</strong><br>
                            If neighbor has SAME color as current node → <strong>Odd Cycle Detected</strong> → Return False immediately.
                        </div>
                    </div>
                `,
                dryRun: `
                    <h4 style="color:#22d3ee;">🔍 Dry Run: Triangle 0-1-2 (Not Bipartite)</h4>
                    <div style="background:#0f172a; padding:15px; border-radius:12px; font-family:'Consolas', monospace; font-size:0.9rem;">
                        <div style="margin-bottom:10px; border-bottom:1px solid #334155; padding-bottom:5px;">
                            <span style="color:#94a3b8;">Start: 0-1-2 connected</span>
                        </div>
                        
                        <div style="color:#e2e8f0; margin-left:10px;">
                            • <strong>Process 0</strong>: Color=0. Q=[0]
                            <br>&nbsp;&nbsp;→ Neighbors 1, 2 uncolored.
                            <br>&nbsp;&nbsp;→ Color[1]=1, Color[2]=1. Q=[1, 2]
                        </div>
                        
                        <div style="color:#e2e8f0; margin-left:25px; margin-top:5px; border-left:2px solid #334155; padding-left:10px;">
                            • <strong>Process 1</strong> (Color 1):
                            <br>→ Neighbor 0 (Color 0) ✅ OK (Opposite)
                            <br>→ Neighbor 2 (Color 1) ❌ <span style="color:#ef4444; font-weight:bold;">CONFLICT! Same Color!</span>
                        </div>
                        
                        <div style="margin-top:10px; color:#ef4444; font-weight:bold;">
                            Result: False (Odd Cycle Detected)
                        </div>
                    </div>
                `,
                codeTitle: "Python Solution (BFS Coloring)",
                code: `from collections import deque

def isBipartite(graph):
    n = len(graph)
    # -1: Uncolored, 0: Red, 1: Blue
    color = [-1] * n
    
    # Check all components (Handle Disconnected Graphs)
    for start in range(n):
        if color[start] != -1:
            continue
            
        # Begin BFS
        queue = deque([start])
        color[start] = 0  # Assign first color
        
        while queue:
            node = queue.popleft()
            
            for neighbor in graph[node]:
                # Case 1: Uncolored -> Assign opposite color
                if color[neighbor] == -1:
                    color[neighbor] = 1 - color[node]
                    queue.append(neighbor)
                
                # Case 2: Already colored with SAME color -> CONFLICT!
                elif color[neighbor] == color[node]:
                    return False
                    
    return True`
            }
        },

        {
            id: "detect-cycle-directed",
            title: "Detect Cycle (Directed)",
            leetcodeUrl: "https://practice.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["DFS Recursion"],
            quiz: {
                description: "Find cycle in directed graph. DFS State?",
                options: ["Visited Set only", "Visited + RecursionStack Sets", "BFS", "Union Find"],
                correct: 1,
                explanation: "Need 2 Sets! 1. Visited (Global), 2. RecursionStack (Current Path). If node in RecursionStack -> Cycle detected. If in Visited but not Stack -> Safe (Cross Edge)."
            },
            learn: {
                metrics: { time: "O(V+E)", space: "O(V)" },
                timeExplainer: `
                    <h4 style="color:#c026d3;">⏱️ Time Complexity: O(V + E)</h4>
                    <div style="background:rgba(192, 38, 211, 0.1); padding:20px; border-radius:12px; margin:15px 0;">
                        <p><strong>Step-by-Step Breakdown:</strong></p>
                        <ul style="line-height:2.0; color:#e2e8f0; margin-left: 10px;">
                            <li><strong style="color:#f472b6;">Iterate Graph:</strong> We visit every node once using the loop. <code>O(V)</code></li>
                            <li><strong style="color:#f472b6;">DFS Traversal:</strong> Inside DFS, each node is added to <code>visited</code> once. We never process a visited node again.</li>
                            <li><strong style="color:#f472b6;">Edge Traversal:</strong> For every node, we iterate over its adjacency list. Across the entire process, we traverse every edge exactly once. <code>O(E)</code></li>
                        </ul>
                        <p style="margin-top:10px; background:rgba(0,0,0,0.3); padding:10px; border-radius:8px; text-align:center; border: 1px solid rgba(192, 38, 211, 0.3);">
                            <strong>Total: O(V + E)</strong> where V is vertices, E is edges.
                        </p>
                    </div>
                `,
                spaceExplainer: `
                    <h4 style="color:#c026d3;">📦 Space Complexity: O(V)</h4>
                    <div style="background:rgba(192, 38, 211, 0.1); padding:20px; border-radius:12px; margin:15px 0;">
                        <p><strong>Memory Usage:</strong></p>
                        <ul style="line-height:2.0; color:#e2e8f0; margin-left: 10px;">
                            <li><strong style="color:#22d3ee;">Visited Set:</strong> Stores up to V nodes. <code>O(V)</code></li>
                            <li><strong style="color:#22d3ee;">Recursive Stack Set:</strong> Stores current path nodes. Worst case (line graph) O(V).</li>
                            <li><strong style="color:#22d3ee;">System Call Stack:</strong> Recursion depth can go up to V. <code>O(V)</code></li>
                        </ul>
                        <div style="margin-top:15px; font-size:0.9em; color:#cbd5e1; font-style:italic;">
                            *Adjacency List takes O(V+E) if constructed, but usually given or considered input space. Aux space is O(V).
                        </div>
                    </div>
                `,
                visual: `
                    <h4 style="color:#c026d3;">🔄 Visualizing the Trap</h4>
                    <div style="display:flex; flex-direction:column; gap:20px; max-width:600px; margin:20px 0;">
                        <div style="background:#1e293b; padding:20px; border-radius:12px; border: 1px solid rgba(255,255,255,0.1);">
                            <div style="display:flex; justify-content:space-around; align-items:center;">
                                <div style="text-align:center;">
                                    <div style="width:50px; height:50px; background:#f59e0b; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; color:black; margin:0 auto; box-shadow:0 0 15px rgba(245, 158, 11, 0.4);">A</div>
                                    <div style="margin-top:8px; font-size:12px; color:#f59e0b;">Current</div>
                                </div>
                                <div style="font-size:24px; color:#94a3b8;">➡</div>
                                <div style="text-align:center;">
                                    <div style="width:50px; height:50px; background:#ef4444; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; color:white; margin:0 auto; border:2px dashed #fff;">B</div>
                                    <div style="margin-top:8px; font-size:12px; color:#ef4444;">Neighbor</div>
                                </div>
                            </div>
                            <div style="margin-top:20px; background:rgba(0,0,0,0.3); padding:15px; border-radius:8px;">
                                <div style="display:flex; justify-content:space-between; margin-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:8px;">
                                    <span style="color:#94a3b8;">Case 1: B not visited</span>
                                    <strong style="color:#10b981;">Safe to Explore 🟢</strong>
                                </div>
                                <div style="display:flex; justify-content:space-between; margin-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:8px;">
                                    <span style="color:#94a3b8;">Case 2: B in Recursion Stack</span>
                                    <strong style="color:#ef4444;">CYCLE DETECTED! 🔴</strong>
                                </div>
                                <div style="display:flex; justify-content:space-between;">
                                    <span style="color:#94a3b8;">Case 3: B visited, NOT in Stack</span>
                                    <strong style="color:#3b82f6;">Safe (Cross Edge) 🔵</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                `,
                trap: `
                    <h4 style="color:#ef4444;">⚠️ The "Visited" Trap</h4>
                    <p style="color:#cbd5e1; margin-bottom:15px;">Why isn't a single <code>visited</code> set enough? Why do we need <code>recursive_stack</code>?</p>
                    
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px;">
                        <div style="background:rgba(239, 68, 68, 0.1); padding:15px; border-radius:8px; border-left:3px solid #ef4444;">
                            <strong style="color:#f87171;">Scenario:</strong>
                            <br>Path A -> B -> C
                            <br>Path A -> D -> C
                        </div>
                        <div style="background:rgba(59, 130, 246, 0.1); padding:15px; border-radius:8px; border-left:3px solid #3b82f6;">
                            <strong style="color:#60a5fa;">Explanation:</strong>
                            <br>When DFS reaches C via D, C is "visited" (from path A->B->C).
                            <br>But this is NOT a cycle! It's just a merge.
                        </div>
                    </div>
                    <div style="margin-top:15px; background:rgba(255,255,255,0.05); padding:12px; border-radius:8px;">
                        <span style="color:#fbbf24;">✅ Fix:</span> A cycle exists ONLY if we see a node that is part of the <strong>CURRENT active path</strong> (recursion stack).
                    </div>
                `,
                crux: `
                    <h4 style="color:#10b981;">💡 The Crux: Two Sets with Different Meanings</h4>
                    <div style="display:grid; gap:15px; margin:15px 0;">
                        <div style="background:rgba(16, 185, 129, 0.1); padding:15px; border-radius:8px; border-left:4px solid #10b981;">
                            <strong>Visited Set:</strong> "Have we processed this node in ANY path?" (Global)
                        </div>
                        <div style="background:rgba(245, 158, 11, 0.1); padding:15px; border-radius:8px; border-left:4px solid #f59e0b;">
                            <strong>RecStack Set:</strong> "Is this node in our CURRENT path?" (Local to DFS call)
                        </div>
                        <div style="background:rgba(239, 68, 68, 0.1); padding:15px; border-radius:8px; border-left:4px solid #ef4444;">
                            <strong>Cycle:</strong> Node is in RecStack → We're revisiting it in same path → Back edge → Cycle!
                        </div>
                    </div>
                
                    <h5 style="color:#a78bfa; margin-top:20px;">Same Pattern Problems:</h5>
                    <ul style="line-height:2;">
                        <li>📚 <strong>Course Schedule</strong> - Uses same DFS cycle detection to find circular dependencies.</li>
                        <li>🔗 <strong>Find Eventual Safe States</strong> - Nodes that are not part of any cycle (and don't lead to one).</li>
                        <li>⭕ <strong>Detect Cycle in Undirected Graph</strong> - Simpler version: just track 'parent' to avoid trivial immediate backward path.</li>
                        <li>👽 <strong>Alien Dictionary</strong> - Topological Sort (which detects cycles as "impossible" ordering).</li>
                    </ul>
                `,
                dryRun: `
                    <h4 style="color:#22d3ee;">🔍 Dry Run: 0->1, 1->2, 2->0</h4>
                    <div style="background:#0f172a; padding:15px; border-radius:12px; font-family:'Consolas', monospace; font-size:0.9rem;">
                        <div style="margin-bottom:10px; border-bottom:1px solid #334155; padding-bottom:5px;">
                            <span style="color:#94a3b8;">Start DFS(0)</span>
                        </div>
                        
                        <div style="color:#e2e8f0; margin-left:10px;">
                            • <strong>DFS(0)</strong>: Visited={0}, Stack={0}
                            <br>&nbsp;&nbsp;→ Neighbor 1? Not visited.
                        </div>
                        
                        <div style="color:#e2e8f0; margin-left:25px; margin-top:5px; border-left:2px solid #334155; padding-left:10px;">
                            • <strong>DFS(1)</strong>: Visited={0,1}, Stack={0,1}
                            <br>→ Neighbor 2? Not visited.
                        </div>
                        
                        <div style="color:#e2e8f0; margin-left:40px; margin-top:5px; border-left:2px solid #334155; padding-left:10px;">
                            • <strong>DFS(2)</strong>: Visited={0,1,2}, Stack={0,1,2}
                            <br>→ Neighbor 0?
                            <br><span style="color:#ef4444; background:rgba(239, 68, 68, 0.2); padding:2px 6px; border-radius:4px;">⚠️ 0 is in Stack! Return True</span>
                        </div>
                        
                        <div style="color:#10b981; margin-top:10px; font-weight:bold;">
                            Result: True (Cycle Detected)
                        </div>
                    </div>
                `,
                codeTitle: "Python Solution (DFS + Recursive Stack)",
                code: `from collections import defaultdict

def detect_cycle(n, edges):
    # 1. Build Adjacency List
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
    
    visited = set()
    recursive_stack = set()
    
    def dfs(node):
        # Mark current node as visited and add to recursion stack
        visited.add(node)
        recursive_stack.add(node)
        
        for neighbour in graph[node]:
            # Case 1: If neighbour not visited, recurse
            if neighbour not in visited:
                if dfs(neighbour):
                    return True
            # Case 2: If neighbour in recursion stack -> CYCLE!
            elif neighbour in recursive_stack:
                return True
        
        # Backtrack: Remove from recursion stack before returning
        recursive_stack.remove(node)
        return False
    
    # 2. Iterate ALL nodes (Handle disconnected components)
    for node in range(n):
        if node not in visited:
            if dfs(node):
                return True
                
    return False

# Example Usage
# n = 3, edges = [[0,1], [1,2], [2,0]] -> True
# n = 4, edges = [[0,1], [0,2], [1,3], [2,3]] -> False`
            }
        }
    ]
}

