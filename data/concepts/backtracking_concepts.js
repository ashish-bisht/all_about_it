// Backtracking Concepts data
// Complete Mastery Guide

const topic_backtracking_concepts = {
    id: "backtracking_concepts",
    title: "🔥 Backtracking Mastery",
    description: "The Ultimate Guide - Hamesha Ke Liye!",
    color: "#f59e0b",
    icon: "fas fa-undo",
    type: "guide",
    sections: [
        {
            id: "core-concept",
            title: "🎯 Core Concept",
            icon: "fas fa-bullseye",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-bullseye"></i>
                            What is Backtracking?
                        </div>
                        <div class="badges">
                            <span class="badge badge-must" style="background:#ef4444; color:white;">FOUNDATION</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="big-quote" style="font-size: 1.4rem; font-weight: 600; text-align: center; padding: 30px; background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(239, 68, 68, 0.1)); border-radius: 12px; border: 2px solid var(--border); margin: 30px 0; line-height: 1.8;">
                            "Try karo → Agar galat raha toh wapas aao → Doosra option try karo"
                        </div>
                        
                        <div style="background: rgba(245, 158, 11, 0.1); padding: 25px; border-radius: 12px; border-left: 4px solid #f59e0b; margin: 25px 0;">
                            <h4 style="margin-bottom:15px; color:#fbbf24;"><i class="fas fa-star"></i> The 3-Step Pattern (ALWAYS!)</h4>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                                <div style="background: rgba(16, 185, 129, 0.1); padding: 20px; border-radius: 12px; text-align:center;">
                                    <div style="font-size:2rem; margin-bottom:10px;">1️⃣</div>
                                    <strong style="color:#10b981;">CHOOSE</strong>
                                    <p style="font-size:0.9rem; color:gray; margin-top:8px;">Make a decision</p>
                                </div>
                                <div style="background: rgba(139, 92, 246, 0.1); padding: 20px; border-radius: 12px; text-align:center;">
                                    <div style="font-size:2rem; margin-bottom:10px;">2️⃣</div>
                                    <strong style="color:#8b5cf6;">EXPLORE</strong>
                                    <p style="font-size:0.9rem; color:gray; margin-top:8px;">Recursively explore</p>
                                </div>
                                <div style="background: rgba(239, 68, 68, 0.1); padding: 20px; border-radius: 12px; text-align:center;">
                                    <div style="font-size:2rem; margin-bottom:10px;">3️⃣</div>
                                    <strong style="color:#ef4444;">UNCHOOSE</strong>
                                    <p style="font-size:0.9rem; color:gray; margin-top:8px;">Undo (backtrack)</p>
                                </div>
                            </div>
                        </div>
                        
                        <h3 style="margin: 30px 0 15px 0; color: #fbbf24;">
                            <i class="fas fa-code"></i> Universal Template
                        </h3>
                        
                        <div style="background: #0f172a; border-radius: 12px; padding: 20px;">
                            <pre style="color: #e2e8f0; font-family: 'Consolas', monospace; font-size: 0.9rem; line-height: 1.6;">def backtrack(state):
    if is_solution(state):
        process_solution(state)
        return
    
    for choice in get_choices(state):
        # CHOOSE
        make_choice(choice, state)
        
        # EXPLORE
        backtrack(state)
        
        # UNCHOOSE (backtrack)
        undo_choice(choice, state)</pre>
                        </div>
                        
                        <h3 style="margin: 30px 0 15px 0; color: #fbbf24;">
                            <i class="fas fa-balance-scale"></i> Backtracking vs Other Techniques
                        </h3>
                        
                        <table style="width:100%; border-collapse: collapse; border-radius: 12px; overflow: hidden;">
                            <thead>
                                <tr style="background: linear-gradient(135deg, #f59e0b, #fbbf24);">
                                    <th style="padding: 15px; text-align: left; color: black;">Technique</th>
                                    <th style="padding: 15px; text-align: left; color: black;">When to Use</th>
                                    <th style="padding: 15px; text-align: left; color: black;">Example</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #fbbf24;"><strong>Backtracking</strong></td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155;">Generate ALL possibilities</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155;">Permutations, N-Queens</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #8b5cf6;"><strong>DP</strong></td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155;">Overlapping subproblems</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155;">Knapsack, LCS</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; color: #10b981;"><strong>Greedy</strong></td>
                                    <td style="padding: 12px;">Local optimal → Global</td>
                                    <td style="padding: 12px;">Activity selection</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>`
        },
        {
            id: "pattern-recognition",
            title: "🧠 5 Patterns",
            icon: "fas fa-puzzle-piece",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-puzzle-piece"></i>
                            The 5 Backtracking Patterns
                        </div>
                    </div>
                    <div class="card-body">
                        <p style="color: gray; margin-bottom: 25px;">
                            <strong>95% backtracking problems</strong> in 5 patterns ke andar aate hain. Pattern pehchaan lo!
                        </p>
                        
                        <!-- Pattern 1: Subset -->
                        <div style="background: rgba(139, 92, 246, 0.05); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 16px; padding: 25px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                                <span style="background: #8b5cf6; color: white; padding: 6px 12px; border-radius: 8px; font-weight: 700;">1</span>
                                <h3 style="color: #a78bfa; margin: 0;">SUBSET Pattern (Pick/No-Pick)</h3>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;"><strong>Pehchaan:</strong> "Find all subsets/combinations" | Each element: include OR exclude</p>
                            <div style="background: #0f172a; padding: 12px; border-radius: 8px; font-family: Consolas; color: #7dd3fc; font-size: 0.9rem;">
                                current.append(arr[index])  # PICK<br>
                                backtrack(index + 1, current)<br>
                                current.pop()               # Backtrack<br><br>
                                backtrack(index + 1, current)  # NO-PICK
                            </div>
                            <p style="margin-top: 12px; color: gray; font-size: 0.9rem;">
                                <strong>Problems:</strong> Subsets, Subset Sum, Combination Sum
                            </p>
                            <p style="color: #a78bfa; font-size: 0.85rem;"><strong>Time:</strong> O(2^n) | <strong>Space:</strong> O(n)</p>
                        </div>
                        
                        <!-- Pattern 2: Permutation -->
                        <div style="background: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 16px; padding: 25px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                                <span style="background: #f59e0b; color: white; padding: 6px 12px; border-radius: 8px; font-weight: 700;">2</span>
                                <h3 style="color: #fbbf24; margin: 0;">PERMUTATION Pattern (Swapping)</h3>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;"><strong>Pehchaan:</strong> "Find all arrangements" | Order MATTERS | All elements used</p>
                            <div style="background: #0f172a; padding: 12px; border-radius: 8px; font-family: Consolas; color: #7dd3fc; font-size: 0.9rem;">
                                for i in range(index, len(arr)):<br>
                                &nbsp;&nbsp;arr[index], arr[i] = arr[i], arr[index]  # Swap<br>
                                &nbsp;&nbsp;backtrack(index + 1)<br>
                                &nbsp;&nbsp;arr[index], arr[i] = arr[i], arr[index]  # Swap back
                            </div>
                            <p style="margin-top: 12px; color: gray; font-size: 0.9rem;">
                                <strong>Problems:</strong> Permutations, Permutations II, Letter Case Permutation
                            </p>
                            <p style="color: #fbbf24; font-size: 0.85rem;"><strong>Time:</strong> O(n! × n) | <strong>Space:</strong> O(n)</p>
                        </div>
                        
                        <!-- Pattern 3: Combination -->
                        <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 16px; padding: 25px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                                <span style="background: #ef4444; color: white; padding: 6px 12px; border-radius: 8px; font-weight: 700;">3</span>
                                <h3 style="color: #f87171; margin: 0;">COMBINATION Pattern (Start Index)</h3>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;"><strong>Pehchaan:</strong> "Find combinations of size k" | Order doesn't matter | Avoid duplicates</p>
                            <div style="background: #0f172a; padding: 12px; border-radius: 8px; font-family: Consolas; color: #7dd3fc; font-size: 0.9rem;">
                                for i in range(start, len(arr)):<br>
                                &nbsp;&nbsp;current.append(arr[i])<br>
                                &nbsp;&nbsp;backtrack(i + 1, current)  # i+1: no reuse<br>
                                &nbsp;&nbsp;# backtrack(i, ...)       # i: unlimited use<br>
                                &nbsp;&nbsp;current.pop()
                            </div>
                            <p style="margin-top: 12px; color: gray; font-size: 0.9rem;">
                                <strong>Problems:</strong> Combinations, Combination Sum I/II, Generate Parentheses
                            </p>
                            <p style="color: #f87171; font-size: 0.85rem;"><strong>Time:</strong> O(C(n,k) × k) | <strong>Space:</strong> O(k)</p>
                        </div>
                        
                        <!-- Pattern 4: Grid -->
                        <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 16px; padding: 25px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                                <span style="background: #10b981; color: white; padding: 6px 12px; border-radius: 8px; font-weight: 700;">4</span>
                                <h3 style="color: #34d399; margin: 0;">GRID Pattern (DFS Backtracking)</h3>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;"><strong>Pehchaan:</strong> 2D matrix | Explore paths/neighbors | 4 directions</p>
                            <div style="background: #0f172a; padding: 12px; border-radius: 8px; font-family: Consolas; color: #7dd3fc; font-size: 0.9rem;">
                                visited[r][c] = True  # Mark<br>
                                for dr, dc in [(0,1),(1,0),(0,-1),(-1,0)]:<br>
                                &nbsp;&nbsp;backtrack(r + dr, c + dc, state)<br>
                                visited[r][c] = False  # Unmark (backtrack)
                            </div>
                            <p style="margin-top: 12px; color: gray; font-size: 0.9rem;">
                                <strong>Problems:</strong> Word Search, Number of Islands, Rat in Maze
                            </p>
                            <p style="color: #34d399; font-size: 0.85rem;"><strong>Time:</strong> O(4^(m×n)) | <strong>Space:</strong> O(m×n)</p>
                        </div>
                        
                        <!-- Pattern 5: Constraint -->
                        <div style="background: rgba(34, 211, 238, 0.05); border: 1px solid rgba(34, 211, 238, 0.2); border-radius: 16px; padding: 25px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                                <span style="background: #22d3ee; color: black; padding: 6px 12px; border-radius: 8px; font-weight: 700;">5</span>
                                <h3 style="color: #22d3ee; margin: 0;">CONSTRAINT Pattern (Validation)</h3>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;"><strong>Pehchaan:</strong> Multiple rules to satisfy | Check validity at each step | Early pruning</p>
                            <div style="background: #0f172a; padding: 12px; border-radius: 8px; font-family: Consolas; color: #7dd3fc; font-size: 0.9rem;">
                                for col in range(n):<br>
                                &nbsp;&nbsp;if is_valid(row, col):  # Check constraints<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;place(row, col)<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;backtrack(row + 1)<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;remove(row, col)
                            </div>
                            <p style="margin-top: 12px; color: gray; font-size: 0.9rem;">
                                <strong>Problems:</strong> N-Queens, Sudoku Solver, Graph Coloring
                            </p>
                            <p style="color: #22d3ee; font-size: 0.85rem;"><strong>Time:</strong> O(n!) with pruning | <strong>Space:</strong> O(n²)</p>
                        </div>
                    </div>
                </div>`
        },
        {
            id: "decision-tree",
            title: "🌳 Decision Tree",
            icon: "fas fa-sitemap",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-sitemap"></i>
                            Pattern Selection Guide
                        </div>
                        <div class="badges">
                            <span class="badge" style="background:#10b981; color:white;">INTERVIEW QUICK-PICK</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div style="background: #0f172a; padding: 25px; border-radius: 12px; font-family: Consolas; color: #e2e8f0; line-height: 2;">
                            <pre style="color: #e2e8f0;">
                     START
                       |
        "Problem mein kya chahiye?"
                       |
       ┌───────────────┴───────────────┐
       ↓                               ↓
  ALL possibilities              OPTIMAL solution
       |                               |
       ↓                               ↓
  BACKTRACKING                     DP/GREEDY
       |
       ├── Order matters? ─────→ PERMUTATION
       │
       ├── Size k select? ─────→ COMBINATION  
       │
       ├── All subsets? ───────→ SUBSET (Pick/No-Pick)
       │
       ├── Grid/Path explore? ─→ GRID DFS
       │
       └── Rules/Constraints? ─→ CONSTRAINT SATISFACTION
                            </pre>
                        </div>
                        
                        <h3 style="margin: 30px 0 15px 0; color: #fbbf24;">
                            <i class="fas fa-key"></i> Quick Keywords Mapping
                        </h3>
                        
                        <table style="width:100%; border-collapse: collapse; border-radius: 12px; overflow: hidden;">
                            <thead>
                                <tr style="background: linear-gradient(135deg, #f59e0b, #fbbf24);">
                                    <th style="padding: 12px; text-align: left; color: black;">Keyword in Problem</th>
                                    <th style="padding: 12px; text-align: left; color: black;">→ Pattern</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="background: #1e293b;"><td style="padding: 10px; border-bottom: 1px solid #334155;">"all subsets", "power set"</td><td style="padding: 10px; border-bottom: 1px solid #334155; color: #a78bfa;">SUBSET</td></tr>
                                <tr style="background: #1e293b;"><td style="padding: 10px; border-bottom: 1px solid #334155;">"all permutations", "arrangements"</td><td style="padding: 10px; border-bottom: 1px solid #334155; color: #fbbf24;">PERMUTATION</td></tr>
                                <tr style="background: #1e293b;"><td style="padding: 10px; border-bottom: 1px solid #334155;">"combinations of size k", "choose k"</td><td style="padding: 10px; border-bottom: 1px solid #334155; color: #f87171;">COMBINATION</td></tr>
                                <tr style="background: #1e293b;"><td style="padding: 10px; border-bottom: 1px solid #334155;">"find path", "word exists in grid"</td><td style="padding: 10px; border-bottom: 1px solid #334155; color: #34d399;">GRID DFS</td></tr>
                                <tr style="background: #1e293b;"><td style="padding: 10px;">"place n items", "satisfy rules"</td><td style="padding: 10px; color: #22d3ee;">CONSTRAINT</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>`
        },
        {
            id: "templates",
            title: "📝 Templates",
            icon: "fas fa-file-code",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-file-code"></i>
                            Ready-to-Use Templates
                        </div>
                        <div class="badges">
                            <span class="badge" style="background:#8b5cf6; color:white;">COPY-PASTE</span>
                        </div>
                    </div>
                    <div class="card-body">
                        
                        <!-- Template 1: Subsets -->
                        <div style="margin-bottom: 30px;">
                            <h4 style="color: #a78bfa; margin-bottom: 15px;"><i class="fas fa-layer-group"></i> Template 1: Subset Generation</h4>
                            <div style="background: #0f172a; border-radius: 12px; padding: 20px;">
                                <pre style="color: #e2e8f0; font-family: 'Consolas', monospace; font-size: 0.85rem; line-height: 1.6;">def subsets(nums):
    result = []
    
    def backtrack(index, current):
        if index == len(nums):
            result.append(current[:])  # COPY!
            return
        
        # PICK
        current.append(nums[index])
        backtrack(index + 1, current)
        current.pop()  # Backtrack
        
        # NO-PICK
        backtrack(index + 1, current)
    
    backtrack(0, [])
    return result
# Time: O(2^n × n), Space: O(n)</pre>
                            </div>
                        </div>
                        
                        <!-- Template 2: Permutations -->
                        <div style="margin-bottom: 30px;">
                            <h4 style="color: #fbbf24; margin-bottom: 15px;"><i class="fas fa-random"></i> Template 2: Permutation (Swapping)</h4>
                            <div style="background: #0f172a; border-radius: 12px; padding: 20px;">
                                <pre style="color: #e2e8f0; font-family: 'Consolas', monospace; font-size: 0.85rem; line-height: 1.6;">def permute(nums):
    result = []
    
    def backtrack(index):
        if index == len(nums):
            result.append(nums[:])  # COPY!
            return
        
        for i in range(index, len(nums)):
            nums[index], nums[i] = nums[i], nums[index]  # Swap
            backtrack(index + 1)
            nums[index], nums[i] = nums[i], nums[index]  # Swap back
    
    backtrack(0)
    return result
# Time: O(n! × n), Space: O(n)</pre>
                            </div>
                        </div>
                        
                        <!-- Template 3: Combinations -->
                        <div style="margin-bottom: 30px;">
                            <h4 style="color: #f87171; margin-bottom: 15px;"><i class="fas fa-th"></i> Template 3: Combination (Size k)</h4>
                            <div style="background: #0f172a; border-radius: 12px; padding: 20px;">
                                <pre style="color: #e2e8f0; font-family: 'Consolas', monospace; font-size: 0.85rem; line-height: 1.6;">def combine(n, k):
    result = []
    
    def backtrack(start, current):
        if len(current) == k:
            result.append(current[:])
            return
        
        for i in range(start, n + 1):
            current.append(i)
            backtrack(i + 1, current)  # i+1: avoid reuse
            current.pop()
    
    backtrack(1, [])
    return result
# Time: O(C(n,k) × k), Space: O(k)</pre>
                            </div>
                        </div>
                        
                        <!-- Template 4: Grid DFS -->
                        <div>
                            <h4 style="color: #34d399; margin-bottom: 15px;"><i class="fas fa-border-all"></i> Template 4: Grid DFS (Word Search)</h4>
                            <div style="background: #0f172a; border-radius: 12px; padding: 20px;">
                                <pre style="color: #e2e8f0; font-family: 'Consolas', monospace; font-size: 0.85rem; line-height: 1.6;">def exist(board, word):
    rows, cols = len(board), len(board[0])
    
    def backtrack(r, c, idx):
        if idx == len(word): return True
        if r < 0 or r >= rows or c < 0 or c >= cols: return False
        if board[r][c] != word[idx]: return False
        
        temp = board[r][c]
        board[r][c] = '#'  # Mark visited
        
        found = (backtrack(r+1, c, idx+1) or
                 backtrack(r-1, c, idx+1) or
                 backtrack(r, c+1, idx+1) or
                 backtrack(r, c-1, idx+1))
        
        board[r][c] = temp  # Restore (backtrack)
        return found
    
    for i in range(rows):
        for j in range(cols):
            if backtrack(i, j, 0): return True
    return False
# Time: O(m×n × 4^L), Space: O(L)</pre>
                            </div>
                        </div>
                    </div>
                </div>`
        },
        {
            id: "problems",
            title: "🎯 Problems",
            icon: "fas fa-tasks",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-tasks"></i>
                            Practice Roadmap
                        </div>
                        <div class="badges">
                            <span class="badge" style="background:#10b981; color:white;">LEVEL-WISE</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <p style="color: gray; margin-bottom: 25px;">
                            In order practice karo. Har level ek naya complexity add karta hai!
                        </p>
                        
                        <!-- Level 1 -->
                        <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 15px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                                <span style="background: #10b981; color: white; padding: 4px 12px; border-radius: 6px; font-weight: 700;">LEVEL 1</span>
                                <strong style="color: #34d399;">Easy - Basic Patterns</strong>
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                                <a href="learn.html?topic=backtracking&q=subsets" style="text-decoration:none; background:#1e293b; padding:12px; border-radius:8px; text-align:center; color:#34d399;">Subsets</a>
                                <a href="learn.html?topic=backtracking&q=permutations" style="text-decoration:none; background:#1e293b; padding:12px; border-radius:8px; text-align:center; color:#34d399;">Permutations</a>
                                <a href="learn.html?topic=backtracking&q=combinations" style="text-decoration:none; background:#1e293b; padding:12px; border-radius:8px; text-align:center; color:#34d399;">Combinations</a>
                            </div>
                        </div>
                        
                        <!-- Level 2 -->
                        <div style="background: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 15px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                                <span style="background: #f59e0b; color: white; padding: 4px 12px; border-radius: 6px; font-weight: 700;">LEVEL 2</span>
                                <strong style="color: #fbbf24;">Medium - Variations</strong>
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                                <a href="learn.html?topic=backtracking&q=combination-sum" style="text-decoration:none; background:#1e293b; padding:12px; border-radius:8px; text-align:center; color:#fbbf24;">Combination Sum</a>
                                <a href="learn.html?topic=backtracking&q=permutations-ii" style="text-decoration:none; background:#1e293b; padding:12px; border-radius:8px; text-align:center; color:#fbbf24;">Permutations II</a>
                                <a href="learn.html?topic=backtracking&q=subsets-ii" style="text-decoration:none; background:#1e293b; padding:12px; border-radius:8px; text-align:center; color:#fbbf24;">Subsets II</a>
                                <a href="learn.html?topic=backtracking&q=generate-parentheses" style="text-decoration:none; background:#1e293b; padding:12px; border-radius:8px; text-align:center; color:#fbbf24;">Generate ()</a>
                            </div>
                        </div>
                        
                        <!-- Level 3 -->
                        <div style="background: rgba(139, 92, 246, 0.05); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 15px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                                <span style="background: #8b5cf6; color: white; padding: 4px 12px; border-radius: 6px; font-weight: 700;">LEVEL 3</span>
                                <strong style="color: #a78bfa;">Medium-Hard - Grid & Strings</strong>
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                                <a href="learn.html?topic=backtracking&q=word-search" style="text-decoration:none; background:#1e293b; padding:12px; border-radius:8px; text-align:center; color:#a78bfa;">Word Search</a>
                                <a href="learn.html?topic=backtracking&q=letter-combinations" style="text-decoration:none; background:#1e293b; padding:12px; border-radius:8px; text-align:center; color:#a78bfa;">Letter Combos</a>
                            </div>
                        </div>
                        
                        <!-- Level 4 -->
                        <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 20px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                                <span style="background: #ef4444; color: white; padding: 4px 12px; border-radius: 6px; font-weight: 700;">BOSS</span>
                                <strong style="color: #f87171;">Hard - Constraint Satisfaction</strong>
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                                <a href="learn.html?topic=backtracking&q=n-queens" style="text-decoration:none; background:#1e293b; padding:12px; border-radius:8px; text-align:center; color:#f87171;">N-Queens 👑</a>
                                <a href="learn.html?topic=backtracking&q=sudoku-solver" style="text-decoration:none; background:#1e293b; padding:12px; border-radius:8px; text-align:center; color:#f87171;">Sudoku Solver</a>
                            </div>
                        </div>
                    </div>
                </div>`
        },
        {
            id: "mistakes",
            title: "⚠️ Mistakes",
            icon: "fas fa-exclamation-triangle",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-exclamation-triangle"></i>
                            Common Backtracking Mistakes
                        </div>
                        <div class="badges">
                            <span class="badge" style="background:#ef4444; color:white;">MUST AVOID</span>
                        </div>
                    </div>
                    <div class="card-body">
                        
                        <!-- Mistake 1 -->
                        <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                                <span style="background: #ef4444; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">1</span>
                                <strong style="color: #f87171; font-size: 1.1rem;">Not Making a COPY!</strong>
                            </div>
                            <p style="color: gray; margin-bottom: 12px;">current list is a reference. Sab entries same list point karengi!</p>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div style="background: #0f172a; padding: 12px; border-radius: 8px;">
                                    <p style="color: #ef4444; margin-bottom: 8px; font-size: 0.85rem;">❌ WRONG</p>
                                    <code style="color: #f87171; font-size: 0.85rem;">result.append(current)</code>
                                </div>
                                <div style="background: #0f172a; padding: 12px; border-radius: 8px;">
                                    <p style="color: #10b981; margin-bottom: 8px; font-size: 0.85rem;">✅ RIGHT</p>
                                    <code style="color: #34d399; font-size: 0.85rem;">result.append(current[:])</code>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Mistake 2 -->
                        <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                                <span style="background: #f59e0b; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">2</span>
                                <strong style="color: #fbbf24; font-size: 1.1rem;">Forgetting to BACKTRACK!</strong>
                            </div>
                            <p style="color: gray; margin-bottom: 12px;">Agar undo nahi kiya, state corrupt ho jayegi!</p>
                            <div style="background: #0f172a; padding: 12px; border-radius: 8px;">
                                <code style="color: #fbbf24; font-size: 0.85rem;">
                                    nums[i], nums[j] = nums[j], nums[i]  # Swap<br>
                                    backtrack(i + 1)<br>
                                    nums[i], nums[j] = nums[j], nums[i]  # Swap BACK! ✅
                                </code>
                            </div>
                        </div>
                        
                        <!-- Mistake 3 -->
                        <div style="background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                                <span style="background: #8b5cf6; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">3</span>
                                <strong style="color: #a78bfa; font-size: 1.1rem;">Not Handling Duplicates</strong>
                            </div>
                            <p style="color: gray; margin-bottom: 12px;">[1,1,2] → duplicate permutations without proper check!</p>
                            <div style="background: #0f172a; padding: 12px; border-radius: 8px;">
                                <code style="color: #a78bfa; font-size: 0.85rem;">
                                    nums.sort()  # Sort first!<br>
                                    if i > start and nums[i] == nums[i-1]:<br>
                                    &nbsp;&nbsp;continue  # Skip duplicate
                                </code>
                            </div>
                        </div>
                        
                        <!-- Mistake 4 -->
                        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 20px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                                <span style="background: #10b981; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">4</span>
                                <strong style="color: #34d399; font-size: 1.1rem;">Infinite Loop in Grid</strong>
                            </div>
                            <p style="color: gray; margin-bottom: 12px;">Grid DFS mein visited check bhool gaye → infinite recursion!</p>
                            <div style="background: #0f172a; padding: 12px; border-radius: 8px;">
                                <code style="color: #34d399; font-size: 0.85rem;">
                                    if visited[r][c]: return  # MUST check!<br>
                                    visited[r][c] = True<br>
                                    # ... explore ...<br>
                                    visited[r][c] = False  # Backtrack
                                </code>
                            </div>
                        </div>
                    </div>
                </div>`
        },
        {
            id: "cheatsheet",
            title: "📊 Cheatsheet",
            icon: "fas fa-clipboard-list",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-clipboard-list"></i>
                            Quick Reference Cheatsheet
                        </div>
                        <div class="badges">
                            <span class="badge" style="background:#22d3ee; color:black;">INTERVIEW READY</span>
                        </div>
                    </div>
                    <div class="card-body">
                        
                        <h3 style="color: #fbbf24; margin-bottom: 15px;"><i class="fas fa-bolt"></i> Pattern Summary</h3>
                        
                        <table style="width:100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; margin-bottom: 30px;">
                            <thead>
                                <tr style="background: linear-gradient(135deg, #f59e0b, #fbbf24);">
                                    <th style="padding: 12px; text-align: left; color: black;">Pattern</th>
                                    <th style="padding: 12px; text-align: left; color: black;">Key Code</th>
                                    <th style="padding: 12px; text-align: left; color: black;">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 10px; border-bottom: 1px solid #334155; color: #a78bfa;">Subset</td>
                                    <td style="padding: 10px; border-bottom: 1px solid #334155; font-family: Consolas; font-size: 0.8rem;">pick/no-pick, INDEX+1</td>
                                    <td style="padding: 10px; border-bottom: 1px solid #334155;">O(2^n)</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 10px; border-bottom: 1px solid #334155; color: #fbbf24;">Permutation</td>
                                    <td style="padding: 10px; border-bottom: 1px solid #334155; font-family: Consolas; font-size: 0.8rem;">for i in range(idx, n): swap</td>
                                    <td style="padding: 10px; border-bottom: 1px solid #334155;">O(n!)</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 10px; border-bottom: 1px solid #334155; color: #f87171;">Combination</td>
                                    <td style="padding: 10px; border-bottom: 1px solid #334155; font-family: Consolas; font-size: 0.8rem;">for i in range(start, n): i+1</td>
                                    <td style="padding: 10px; border-bottom: 1px solid #334155;">O(C(n,k))</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 10px; border-bottom: 1px solid #334155; color: #34d399;">Grid DFS</td>
                                    <td style="padding: 10px; border-bottom: 1px solid #334155; font-family: Consolas; font-size: 0.8rem;">visited + 4 directions</td>
                                    <td style="padding: 10px; border-bottom: 1px solid #334155;">O(4^L)</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 10px; color: #22d3ee;">Constraint</td>
                                    <td style="padding: 10px; font-family: Consolas; font-size: 0.8rem;">is_valid() + pruning</td>
                                    <td style="padding: 10px;">O(n!)</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <h3 style="color: #fbbf24; margin-bottom: 15px;"><i class="fas fa-check-circle"></i> Debug Checklist</h3>
                        
                        <div style="background: #0f172a; padding: 20px; border-radius: 12px;">
                            <ul style="list-style: none; padding: 0; line-height: 2.2; color: #e2e8f0;">
                                <li>☐ Am I making a <strong style="color:#10b981;">COPY</strong> when adding to result?</li>
                                <li>☐ Am I <strong style="color:#fbbf24;">BACKTRACKING</strong> (undoing choices)?</li>
                                <li>☐ Is my <strong style="color:#a78bfa;">BASE CASE</strong> correct?</li>
                                <li>☐ Am I handling <strong style="color:#f87171;">DUPLICATES</strong> if needed?</li>
                                <li>☐ Are my <strong style="color:#22d3ee;">LOOP RANGES</strong> correct (start vs index)?</li>
                                <li>☐ Have I added <strong style="color:#34d399;">VISITED CHECK</strong> for grid problems?</li>
                            </ul>
                        </div>
                        
                        <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(239, 68, 68, 0.1)); padding: 25px; border-radius: 12px; border: 2px solid rgba(245, 158, 11, 0.3); margin-top: 25px; text-align: center;">
                            <h3 style="color: #fbbf24; margin-bottom: 10px;">🎯 The 3 Golden Rules</h3>
                            <p style="font-size: 1.2rem; line-height: 2;">
                                <strong style="color:#10b981;">1. CHOOSE</strong> → Make a decision<br>
                                <strong style="color:#8b5cf6;">2. EXPLORE</strong> → Recurse with that decision<br>
                                <strong style="color:#ef4444;">3. UNCHOOSE</strong> → Backtrack (undo)
                            </p>
                        </div>
                    </div>
                </div>`
        }
    ]
};
