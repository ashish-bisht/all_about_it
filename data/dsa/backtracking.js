// Backtracking data
// Extracted from data.js

const topic_backtracking = {
    id: "backtracking",
    title: "Backtracking Mastery",
    description: "Principal Engineer DSA • Part 2",
    color: "#4c1d95",
    icon: "fas fa-chess-queen",
    mentalModel: {
        whenToApply: [
            { label: "🎯 ALL Solutions", desc: "Find ALL permutations, combinations, subsets, paths." },
            { label: "🔢 Small N (≤ 20)", desc: "Exponential time OK when N is small." },
            { label: "🚫 Constraint Satisfaction", desc: "N-Queens, Sudoku, Graph Coloring - place items with rules." },
            { label: "🔍 Decision Tree", desc: "Each step = make a choice → explore → undo (CHOOSE-EXPLORE-UNCHOOSE)." }
        ],
        patterns: [
            { algo: "Subsets (Pick/No-Pick)", use: "Generate all 2^N subsets", time: "O(2^N × N)", space: "O(N)", template: "backtrack(i+1) for both PICK and SKIP" },
            { algo: "Permutations (Swap)", use: "Generate all N! arrangements", time: "O(N × N!)", space: "O(N)", template: "swap(start, i) → recurse → swap back" },
            { algo: "Combinations (Bounded)", use: "Choose k items from n", time: "O(C(n,k) × k)", space: "O(k)", template: "Loop j from start, recurse with j+1" },
            { algo: "Unbounded (Combination Sum)", use: "Reuse elements allowed", time: "O(N^(T/M))", space: "O(T/M)", template: "PICK stays at i, SKIP moves to i+1" },
            { algo: "Grid DFS (Word Search)", use: "Find path in 2D matrix", time: "O(M×N × 3^L)", space: "O(L)", template: "mark # → 4 dirs → unmark" },
            { algo: "Constraint Satisfaction", use: "N-Queens, Sudoku", time: "O(N!) / O(9^M)", space: "O(N)", template: "Check constraints → place → recurse → remove" }
        ],
        decisionTree: `
<div style="background:#1e293b; padding:25px; border-radius:16px; margin:15px 0; border:1px solid rgba(255,255,255,0.1);">
<h4 style="color:#a78bfa; margin-bottom:20px; text-align:center; font-size:1.1rem;">🧠 Pattern Recognition Flowchart</h4>
<div style="font-family:monospace; font-size:0.85rem; line-height:2;">
<div style="text-align:center; color:#fbbf24; font-weight:bold; margin-bottom:15px;">
"Problem kya maang raha hai?"
</div>
<pre style="color:#e2e8f0; text-align:left;">
                    ┌─────────────────┐
                    │ "Find ALL ___"? │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
  ┌─────────────┐    ┌─────────────┐    ┌──────────────┐
  │  SUBSETS    │    │ PERMUTATIONS│    │ COMBINATIONS │
  │  "2^N"      │    │   "N!"      │    │   "C(n,k)"   │
  └─────┬───────┘    └──────┬──────┘    └──────┬───────┘
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐  ┌───────────────┐  ┌────────────────┐
│ Pick/No-Pick  │  │     SWAP      │  │ Loop j=start   │
│ i+1 for both  │  │ swap→rec→swap │  │ Recurse j+1    │
└───────────────┘  └───────────────┘  └────────────────┘

         "Elements REUSABLE?"          "2D Grid?"
              │                            │
    ┌─────────┴─────────┐        ┌────────┴────────┐
    ▼                   ▼        │                 │
 ┌──────┐          ┌───────┐    ▼                 ▼
 │ YES  │          │  NO   │  ┌────────┐    ┌──────────┐
 └──┬───┘          └───┬───┘  │  YES   │    │ CONSTRAINT│
    │                  │      └───┬────┘    │ PROBLEM  │
    ▼                  ▼          ▼         └────┬─────┘
┌────────────┐  ┌──────────┐ ┌─────────┐   ┌────────────┐
│PICK: stay i│  │PICK: i+1 │ │Grid DFS │   │ N-Queens/  │
│SKIP: i+1   │  │SKIP: i+1 │ │mark→exp→│   │ Sudoku     │
└────────────┘  └──────────┘ │unmark   │   │ Use SETS   │
                             └─────────┘   └────────────┘
</pre>
</div>
</div>`,
        codeTemplates: `
<div style="background:#0f172a; padding:20px; border-radius:12px; margin:15px 0;">
<h4 style="color:#10b981; margin-bottom:15px;">📝 Universal Templates (Copy-Paste Ready)</h4>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
1️⃣ Subset Pattern (Pick/No-Pick)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def subsets(nums):
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
</pre>
</details>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
2️⃣ Permutation Pattern (Swap)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def permute(nums):
    result = []
    def backtrack(start):
        if start == len(nums):
            result.append(nums[:])
            return
        for i in range(start, len(nums)):
            nums[start], nums[i] = nums[i], nums[start]  # Swap
            backtrack(start + 1)
            nums[start], nums[i] = nums[i], nums[start]  # Unswap
    backtrack(0)
    return result
</pre>
</details>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
3️⃣ Combination Sum Pattern (Unbounded)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def combinationSum(candidates, target):
    result = []
    def backtrack(index, path, current_sum):
        if current_sum == target:
            result.append(path[:])
            return
        if index >= len(candidates) or current_sum > target:
            return
        # PICK (stay at index)
        path.append(candidates[index])
        backtrack(index, path, current_sum + candidates[index])
        path.pop()
        # SKIP (move to index+1)
        backtrack(index + 1, path, current_sum)
    backtrack(0, [], 0)
    return result
</pre>
</details>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
4️⃣ Grid DFS Pattern (Word Search)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def exist(board, word):
    ROWS, COLS = len(board), len(board[0])
    def dfs(row, col, char_index):
        if char_index == len(word): return True
        if (row < 0 or row >= ROWS or col < 0 or col >= COLS 
            or board[row][col] != word[char_index]):
            return False
        original = board[row][col]
        board[row][col] = '#'  # Mark
        found = (dfs(row+1,col,char_index+1) or dfs(row-1,col,char_index+1) or
                 dfs(row,col+1,char_index+1) or dfs(row,col-1,char_index+1))
        board[row][col] = original  # Unmark
        return found
    return any(dfs(r,c,0) for r in range(ROWS) for c in range(COLS))
</pre>
</details>

<details>
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
5️⃣ Constraint Pattern (N-Queens)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def solveNQueens(n):
    cols, pos_diag, neg_diag = set(), set(), set()
    result, positions = [], [-1] * n
    def backtrack(row):
        if row == n:
            result.append(['.'*c + 'Q' + '.'*(n-c-1) for c in positions])
            return
        for col in range(n):
            if col in cols or (row+col) in pos_diag or (row-col) in neg_diag:
                continue
            cols.add(col); pos_diag.add(row+col); neg_diag.add(row-col)
            positions[row] = col
            backtrack(row + 1)
            cols.remove(col); pos_diag.remove(row+col); neg_diag.remove(row-col)
    backtrack(0)
    return result
</pre>
</details>
</div>`,
        safetyCheck: [
            { label: "📋 COPY the list!", desc: "<code>result.append(path[:])</code> — Without copy, all entries point to same mutating list!" },
            { label: "↩️ ALWAYS undo!", desc: "<code>path.pop()</code> or <code>swap back</code> — Forgetting backtrack = corrupted state for other branches." },
            { label: "🔢 Index logic!", desc: "Subsets: i+1 both | Permute: swap | Unbounded: PICK stays at i, SKIP goes i+1" },
            { label: "⚡ Prune early!", desc: "Check constraints BEFORE recursing: <code>if sum > target: return</code>" },
            { label: "🔄 Short-circuit OR!", desc: "Grid DFS: <code>return dfs(...) or dfs(...)</code> — Stop if any path succeeds." },
            { label: "📍 Mark & Unmark!", desc: "Grid: <code>board[r][c]='#'</code> before, restore original after exploring." }
        ]
    },
    questions: [
        {
            id: "n-queens",
            title: "N-Queens",
            leetcodeUrl: "https://leetcode.com/problems/n-queens/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Classic Backtracking", "Constraint Satisfaction"],
            quiz: {
                description: "Place N queens on N×N board such that no two attack each other. How to check if position is safe in O(1)?",
                options: ["Loop through all queens", "3 Sets (cols, posDiag, negDiag)", "Check 8 directions", "2D visited array"],
                correct: 1,
                explanation: "3 Sets! Track: columns (col), positive diagonals (row+col), negative diagonals (row-col). Each is O(1) lookup!"
            },
            learn: {
                quickAlgo: [
                    "cols, diag, anti_diag = set(), set(), set()",
                    "res = []",
                    "def backtrack(r):",
                    "    if r == n:                     # 🎯 Base Case: All queens placed",
                    "        res.append(board[:])",
                    "        return",
                    "    for c in range(n):             # ⚡ Try all columns in current row",
                    "        if c in cols or (r+c) in diag or (r-c) in anti_diag: # 🔄 Valid?",
                    "            continue",
                    "        cols.add(c); diag.add(r+c); anti_diag.add(r-c) # ✅ Place & Mark",
                    "        board[r] = c",
                    "        backtrack(r + 1)           # 💡 Recurse next row",
                    "        cols.remove(c); diag.remove(r+c); anti_diag.remove(r-c) # 🔄 Backtrack logic (Unmark)"
                ],
                metrics: { time: "O(N!)", space: "O(N)" },
                timeExplainer: `<strong>Time Complexity: O(N!)</strong><br><br>
<div style="background:#0f172a; padding:15px; border-radius:8px;">
<strong style="color:#fbbf24;">Row-by-row placement:</strong><br><br>
• Row 0: <code>N</code> possible columns<br>
• Row 1: <code>~N-2</code> safe columns (1 col + 2 diags blocked)<br>
• Row 2: <code>~N-4</code> safe columns<br>
• ...<br><br>
<strong style="color:#10b981;">Upper bound ≈ N × (N-2) × (N-4) × ... ≈ N!</strong>
</div>

<div style="background:rgba(245,158,11,0.1); padding:15px; border-radius:8px; margin-top:10px;">
<strong style="color:#fbbf24;">Example N=4:</strong><br>
Row 0: 4 choices → Row 1: ~2 choices → ...<br>
Total ≈ 4! = 24 (actual solutions = 2)
</div>`,

                spaceExplainer: `<strong>Space Complexity: O(N)</strong><br><br>
<div style="background:#0f172a; padding:15px; border-radius:8px;">
<table style="width:100%; color:#e2e8f0;">
<tr><td style="padding:8px 0;"><strong style="color:#10b981;">✓ columns set</strong></td><td>O(N) - max N columns</td></tr>
<tr><td style="padding:8px 0;"><strong style="color:#10b981;">✓ posDiag set</strong></td><td>O(N) - one active per row</td></tr>
<tr><td style="padding:8px 0;"><strong style="color:#10b981;">✓ negDiag set</strong></td><td>O(N) - one active per row</td></tr>
<tr><td style="padding:8px 0;"><strong style="color:#10b981;">✓ Recursion Stack</strong></td><td>O(N) - max N rows deep</td></tr>
</table>
</div>

<div style="background:rgba(16,185,129,0.1); padding:12px; border-radius:8px; margin-top:10px;">
<strong style="color:#10b981;">💡 No 2D board needed!</strong><br>
Just track queen column for each row: <code>queen_positions[row] = col</code>
</div>`,

                visual: `<div style="text-align:left; font-family: monospace; font-size: 0.85rem; line-height: 1.6;">
<strong style="color:#fbbf24;">♛ "Laser Beams" Visualization (N=4):</strong>
<pre style="color: var(--text-muted); margin-top:10px;">
When Queen placed at (row=1, col=2):

     0   1   2   3
   ┌───┬───┬───┬───┐
 0 │   │ ↖ │ ↑ │ ↗ │   ← Attacked by diagonals & column
   ├───┼───┼───┼───┤
 1 │ ← │ ← │ ♛ │ → │   ← Queen at (1, 2)
   ├───┼───┼───┼───┤
 2 │   │ ↙ │ ↓ │ ↘ │   ← Attacked below
   ├───┼───┼───┼───┤
 3 │ ↙ │   │ ↓ │   │ ↘
   └───┴───┴───┴───┘

<strong style="color:#10b981;">3 SETS track these attacks:</strong>
┌────────────────────────────────────────────┐
│ columns:  {2}        ← Column 2 blocked    │
│ posDiag:  {3}        ← row+col = 1+2 = 3   │
│ negDiag:  {-1}       ← row-col = 1-2 = -1  │
└────────────────────────────────────────────┘

Same diagonal formula for ANY cell:
• (0,1): posDiag = 0+1 = 1, negDiag = 0-1 = -1 ← BLOCKED!
• (2,3): posDiag = 2+3 = 5, negDiag = 2-3 = -1 ← BLOCKED!
• (3,1): posDiag = 3+1 = 4, negDiag = 3-1 = 2  ← SAFE ✓
</pre>
</div>`,

                crux: `<strong>The 3-Sets Constraint Pattern:</strong><br><br>
<div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin:15px 0;">
<div style="background:rgba(239,68,68,0.1); padding:15px; border-radius:8px; text-align:center;">
<div style="font-size:1.5rem; margin-bottom:8px;">📍</div>
<strong style="color:#ef4444;">columns</strong><br>
<code style="font-size:0.8rem;">col</code><br>
<small style="color:gray;">Vertical attack</small>
</div>
<div style="background:rgba(16,185,129,0.1); padding:15px; border-radius:8px; text-align:center;">
<div style="font-size:1.5rem; margin-bottom:8px;">↗</div>
<strong style="color:#10b981;">posDiag</strong><br>
<code style="font-size:0.8rem;">row + col</code><br>
<small style="color:gray;">↗ diagonal attack</small>
</div>
<div style="background:rgba(139,92,246,0.1); padding:15px; border-radius:8px; text-align:center;">
<div style="font-size:1.5rem; margin-bottom:8px;">↘</div>
<strong style="color:#8b5cf6;">negDiag</strong><br>
<code style="font-size:0.8rem;">row - col</code><br>
<small style="color:gray;">↘ diagonal attack</small>
</div>
</div>

<div style="background:#0f172a; padding:15px; border-radius:8px;">
<strong style="color:#fbbf24;">💡 Why row+col and row-col?</strong><br><br>
<code>↗ Diagonal:</code> All cells have SAME (row + col)<br>
<code>↘ Diagonal:</code> All cells have SAME (row - col)<br><br>
<strong style="color:#10b981;">No need to check rows!</strong> We place exactly 1 queen per row.
</div>`,

                trap: `<strong>⚠️ Common Mistakes:</strong><br><br>

<div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); padding:15px; border-radius:8px; margin-bottom:15px;">
<strong style="color:#f87171;">❌ Mistake 1: Wrong diagonal formula</strong>
<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:10px;">
<div style="background:#0f172a; padding:10px; border-radius:6px;">
<span style="color:#ef4444;">Wrong:</span><br>
<code style="color:#f87171;">posDiag = row * col</code><br>
<small style="color:gray;">Doesn't identify same diagonal!</small>
</div>
<div style="background:#0f172a; padding:10px; border-radius:6px;">
<span style="color:#10b981;">Correct:</span><br>
<code style="color:#34d399;">posDiag = row + col</code><br>
<code style="color:#34d399;">negDiag = row - col</code>
</div>
</div>
</div>

<div style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); padding:15px; border-radius:8px; margin-bottom:15px;">
<strong style="color:#fbbf24;">❌ Mistake 2: Forgetting to remove from sets!</strong><br>
<code style="color:#fbbf24;">columns.remove(col)  # MUST do after recursion!</code><br>
<small style="color:gray;">Without this, sets stay polluted for other branches</small>
</div>

<div style="background:rgba(139,92,246,0.1); border:1px solid rgba(139,92,246,0.3); padding:15px; border-radius:8px;">
<strong style="color:#a78bfa;">❌ Mistake 3: Building board wrong</strong><br>
<code style="color:#a78bfa;">'.' * col + 'Q' + '.' * (n - col - 1)</code><br>
<small style="color:gray;">Queen at position 'col', dots before and after</small>
</div>`,

                dryRun: [
                    "<strong>Input:</strong> N = 4",
                    "Initialize: columns={}, posDiag={}, negDiag={}, queen_positions=[-1,-1,-1,-1]",
                    "<code>backtrack(row=0)</code> → Try each column",
                    "<strong style='color:#10b981;'>row=0, col=0:</strong> Safe! Add to sets",
                    "&nbsp;&nbsp;columns={0}, posDiag={0}, negDiag={0}",
                    "&nbsp;&nbsp;queen_positions=[0,-1,-1,-1]",
                    "&nbsp;&nbsp;<code>backtrack(row=1)</code>",
                    "&nbsp;&nbsp;<strong style='color:#ef4444;'>row=1, col=0:</strong> 0 in columns ❌",
                    "&nbsp;&nbsp;<strong style='color:#ef4444;'>row=1, col=1:</strong> (1+1)=2 not in posDiag, but (1-1)=0 in negDiag ❌",
                    "&nbsp;&nbsp;<strong style='color:#10b981;'>row=1, col=2:</strong> Safe!",
                    "&nbsp;&nbsp;&nbsp;&nbsp;columns={0,2}, posDiag={0,3}, negDiag={0,-1}",
                    "&nbsp;&nbsp;&nbsp;&nbsp;<code>backtrack(row=2)</code>",
                    "&nbsp;&nbsp;&nbsp;&nbsp;... all columns blocked for row 2 ❌",
                    "&nbsp;&nbsp;Backtrack: Remove col=2 from sets",
                    "&nbsp;&nbsp;<strong style='color:#10b981;'>row=1, col=3:</strong> Safe! Continue...",
                    "... eventually finds solution ...",
                    "<strong>Solution 1:</strong> ['.Q..', '...Q', 'Q...', '..Q.']",
                    "<strong>Solution 2:</strong> ['..Q.', 'Q...', '...Q', '.Q..']"
                ],
                codeTitle: "Python Solution (3-Sets)",
                code: `def solveNQueens(n):
    """
    Place N queens on N×N board with no attacks.
    Time: O(N!), Space: O(N)
    """
    columns = set()      # Columns with queens
    pos_diagonals = set()  # row + col values
    neg_diagonals = set()  # row - col values
    
    result = []
    queen_positions = [-1] * n  # queen_positions[row] = col
    
    def backtrack(row):
        # Base case: All queens placed!
        if row == n:
            # Build the board
            board = []
            for r in range(n):
                col = queen_positions[r]
                line = '.' * col + 'Q' + '.' * (n - col - 1)
                board.append(line)
            result.append(board)
            return
        
        # Try each column in current row
        for col in range(n):
            # Check if position is safe
            if (col in columns or 
                (row + col) in pos_diagonals or 
                (row - col) in neg_diagonals):
                continue  # Not safe, skip
            
            # === PLACE QUEEN ===
            columns.add(col)
            pos_diagonals.add(row + col)
            neg_diagonals.add(row - col)
            queen_positions[row] = col
            
            # Recurse to next row
            backtrack(row + 1)
            
            # === REMOVE QUEEN (Backtrack) ===
            columns.remove(col)
            pos_diagonals.remove(row + col)
            neg_diagonals.remove(row - col)
    
    backtrack(0)
    return result`,
                codeDetailed: `def solveNQueens_detailed(n):
    """
    N-QUEENS with 3-Sets O(1) Constraint Check
    
    WHY 3 SETS?
    - Queen attacks: row, column, both diagonals
    - We go row-by-row, so row is automatically unique
    - Need to track: column, ↗ diagonal, ↘ diagonal
    
    DIAGONAL MATH:
    - ↗ diagonal: All cells have same (row + col)
      Example: (0,2), (1,1), (2,0) all have row+col = 2
    - ↘ diagonal: All cells have same (row - col)
      Example: (0,0), (1,1), (2,2) all have row-col = 0
    """
    columns = set()
    pos_diagonals = set()  # row + col
    neg_diagonals = set()  # row - col
    
    result = []
    queen_positions = [-1] * n
    
    def backtrack(current_row):
        # === BASE CASE ===
        # All N rows filled = valid solution!
        if current_row == n:
            board = []
            for row in range(n):
                col = queen_positions[row]
                # Build row string: dots before Q, Q, dots after
                row_str = '.' * col + 'Q' + '.' * (n - col - 1)
                board.append(row_str)
            result.append(board)
            return
        
        # === TRY EACH COLUMN ===
        for col in range(n):
            # O(1) safety check using sets
            pos_diag = current_row + col
            neg_diag = current_row - col
            
            if col in columns:
                continue  # Column attacked
            if pos_diag in pos_diagonals:
                continue  # ↗ Diagonal attacked
            if neg_diag in neg_diagonals:
                continue  # ↘ Diagonal attacked
            
            # === PLACE QUEEN ===
            columns.add(col)
            pos_diagonals.add(pos_diag)
            neg_diagonals.add(neg_diag)
            queen_positions[current_row] = col
            
            # === RECURSE ===
            backtrack(current_row + 1)
            
            # === BACKTRACK ===
            # Remove queen to try other positions
            columns.remove(col)
            pos_diagonals.remove(pos_diag)
            neg_diagonals.remove(neg_diag)
    
    backtrack(0)
    return result

# Test
for solution in solveNQueens_detailed(4):
    for row in solution:
        print(row)
    print()
# Output:
# .Q..
# ...Q
# Q...
# ..Q.
#
# ..Q.
# Q...
# ...Q
# .Q..`
            }
        },
        {
            id: "permutations",
            title: "Permutations",
            leetcodeUrl: "https://leetcode.com/problems/permutations/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Swapping", "In-place"],
            quiz: {
                description: "Generate all permutations of [1,2,3]. Most space-efficient approach?",
                options: ["Iterative with queue", "Backtracking with 'visited' set", "Backtracking with Swapping", "Dynamic Programming"],
                correct: 2,
                explanation: "Swapping is most space efficient! No extra visited set needed. Swap nums[start] with nums[i], recurse, then Swap Back (Backtrack)."
            },
            learn: {
                quickAlgo: [
                    "res = []",
                    "def backtrack(first):",
                    "    if first == n:                 # 🎯 Base Case: Permutation complete",
                    "        res.append(nums[:])",
                    "        return",
                    "    for i in range(first, n):      # ⚡ Swap current with all future pos",
                    "        nums[first], nums[i] = nums[i], nums[first] # 🔄 Swap",
                    "        backtrack(first + 1)       # ✅ Fix 'first' and move on",
                    "        nums[first], nums[i] = nums[i], nums[first] # 💡 Undo Swap"
                ],
                metrics: { time: "O(N × N!)", space: "O(N)" },
                timeExplainer: `<strong>Why O(N × N!)?</strong><br><br>
<div style="background:#0f172a; padding:15px; border-radius:8px; margin:10px 0;">
<strong style="color:#fbbf24;">Step-by-step breakdown:</strong><br><br>
• Position 0: <code>N</code> choices<br>
• Position 1: <code>N-1</code> choices<br>
• Position 2: <code>N-2</code> choices<br>
• ...<br>
• Position N-1: <code>1</code> choice<br><br>
<strong style="color:#10b981;">Total permutations = N × (N-1) × ... × 1 = N!</strong>
</div>

<div style="background:rgba(245,158,11,0.1); padding:15px; border-radius:8px; margin-top:10px;">
<strong style="color:#fbbf24;">+ O(N) per permutation</strong><br>
Each permutation: copy array to result = O(N)<br><br>
<strong>Final: O(N × N!)</strong>
</div>

<strong style="color:#a78bfa;">Example n=3:</strong><br>
• Permutations = 3! = 6<br>
• Copy cost = 3 each<br>
• Total ≈ 6 × 3 = 18 operations`,

                spaceExplainer: `<strong>Space Complexity: O(N)</strong><br><br>
<div style="background:#0f172a; padding:15px; border-radius:8px;">
<table style="width:100%; color:#e2e8f0;">
<tr><td style="padding:8px 0;"><strong style="color:#10b981;">✓ Recursion Stack</strong></td><td>O(N) - depth = N levels</td></tr>
<tr><td style="padding:8px 0;"><strong style="color:#10b981;">✓ In-place Swapping</strong></td><td>O(1) - no extra array!</td></tr>
<tr><td style="padding:8px 0;"><strong style="color:#8b5cf6;">Output (not counted)</strong></td><td>O(N! × N) - result storage</td></tr>
</table>
</div>

<div style="background:rgba(16,185,129,0.1); padding:12px; border-radius:8px; margin-top:10px;">
<strong style="color:#10b981;">💡 Swapping Advantage:</strong><br>
"Visited set" approach uses O(N) extra space.<br>
Swapping approach: <strong>TRUE in-place!</strong>
</div>`,

                visual: `<div style="text-align:left; font-family: monospace; font-size: 0.85rem; line-height: 1.6;">
<strong style="color:#fbbf24;">🪑 "Musical Chairs" Visualization:</strong>
<pre style="color: var(--text-muted); margin-top:10px;">
nums = [1, 2, 3]       start = 0

"Position 0 pe kaun baithega?"
    ↓
┌───────────────────────────────────────────┐
│  i=0: Swap(0,0)    i=1: Swap(0,1)    i=2: Swap(0,2)  │
│  [1, 2, 3]         [2, 1, 3]         [3, 2, 1]       │
│      ↓                 ↓                 ↓           │
│  start=1           start=1           start=1        │
│  "Pos 1 pe kaun?"  "Pos 1 pe kaun?" "Pos 1 pe kaun?"│
└───────────────────────────────────────────┘

Taking [1,2,3] branch (start=1):
┌─────────────────────────────────┐
│  i=1: Swap(1,1)    i=2: Swap(1,2)  │
│  [1, 2, 3]         [1, 3, 2]       │
│      ↓                 ↓           │
│  start=2           start=2        │
│  ✅ ADD [1,2,3]    ✅ ADD [1,3,2] │
└─────────────────────────────────┘

Same process for [2,1,3] and [3,2,1] branches...

<strong style="color:#10b981;">Final 6 permutations:</strong>
[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]
</pre>
</div>`,

                crux: `<strong>The Swap-Recurse-Unswap Pattern:</strong><br><br>
<div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin:15px 0;">
<div style="background:rgba(16,185,129,0.1); padding:15px; border-radius:8px; text-align:center;">
<div style="font-size:1.5rem; margin-bottom:8px;">1️⃣</div>
<strong style="color:#10b981;">SWAP</strong><br>
<code style="font-size:0.8rem;">nums[start], nums[i] = nums[i], nums[start]</code><br>
<small style="color:gray;">Position 'start' pe element 'i' try karo</small>
</div>
<div style="background:rgba(139,92,246,0.1); padding:15px; border-radius:8px; text-align:center;">
<div style="font-size:1.5rem; margin-bottom:8px;">2️⃣</div>
<strong style="color:#8b5cf6;">RECURSE</strong><br>
<code style="font-size:0.8rem;">backtrack(start + 1)</code><br>
<small style="color:gray;">Next position fix karo</small>
</div>
<div style="background:rgba(239,68,68,0.1); padding:15px; border-radius:8px; text-align:center;">
<div style="font-size:1.5rem; margin-bottom:8px;">3️⃣</div>
<strong style="color:#ef4444;">UNSWAP</strong><br>
<code style="font-size:0.8rem;">nums[start], nums[i] = nums[i], nums[start]</code><br>
<small style="color:gray;">Wapas original state</small>
</div>
</div>

<div style="background:#0f172a; padding:15px; border-radius:8px;">
<strong style="color:#fbbf24;">💡 Key Insight:</strong><br>
Loop <code>i</code> from <code>start</code> to <code>n-1</code><br>
→ Har element ko ek baar 'start' position pe try karo!
</div>`,

                trap: `<strong>⚠️ Common Mistakes:</strong><br><br>

<div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); padding:15px; border-radius:8px; margin-bottom:15px;">
<strong style="color:#f87171;">❌ Mistake 1: Bhool gaye copy banana!</strong>
<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:10px;">
<div style="background:#0f172a; padding:10px; border-radius:6px;">
<span style="color:#ef4444;">Wrong:</span><br>
<code style="color:#f87171;">res.append(nums)</code>
</div>
<div style="background:#0f172a; padding:10px; border-radius:6px;">
<span style="color:#10b981;">Correct:</span><br>
<code style="color:#34d399;">res.append(nums[:])</code>
</div>
</div>
<small style="color:gray;">Without copy, all entries point to same mutating list!</small>
</div>

<div style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); padding:15px; border-radius:8px; margin-bottom:15px;">
<strong style="color:#fbbf24;">❌ Mistake 2: Bhool gaye swap back karna!</strong><br>
<code style="color:#fbbf24;">nums[start], nums[i] = nums[i], nums[start]  // Swap BACK!</code><br>
<small style="color:gray;">Without swap back, array corrupted for other branches</small>
</div>

<div style="background:rgba(139,92,246,0.1); border:1px solid rgba(139,92,246,0.3); padding:15px; border-radius:8px;">
<strong style="color:#a78bfa;">❌ Mistake 3: Loop range galat!</strong><br>
<code style="color:#a78bfa;">for i in range(start, len(nums)):</code> ✅<br>
<code style="color:#ef4444;">for i in range(0, len(nums)):</code> ❌ (duplicates!)<br>
<small style="color:gray;">i=start se start karo, 0 se nahi!</small>
</div>`,

                dryRun: [
                    "<strong>Input:</strong> nums = [1, 2, 3]",
                    "<code>backtrack(0)</code> → Loop i = 0 to 2",
                    "<strong style='color:#10b981;'>i=0:</strong> Swap(0,0) → [1,2,3] (no change)",
                    "&nbsp;&nbsp;<code>backtrack(1)</code> → Loop i = 1 to 2",
                    "&nbsp;&nbsp;<strong style='color:#10b981;'>i=1:</strong> Swap(1,1) → [1,2,3]",
                    "&nbsp;&nbsp;&nbsp;&nbsp;<code>backtrack(2)</code> → Loop i = 2 to 2",
                    "&nbsp;&nbsp;&nbsp;&nbsp;<strong style='color:#10b981;'>i=2:</strong> Swap(2,2) → [1,2,3]",
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>backtrack(3)</code> → start==len ✅ ADD <strong>[1,2,3]</strong>",
                    "&nbsp;&nbsp;&nbsp;&nbsp;Swap back(2,2) → [1,2,3]",
                    "&nbsp;&nbsp;Swap back(1,1) → [1,2,3]",
                    "&nbsp;&nbsp;<strong style='color:#fbbf24;'>i=2:</strong> Swap(1,2) → [1,<strong>3</strong>,<strong>2</strong>]",
                    "&nbsp;&nbsp;&nbsp;&nbsp;<code>backtrack(2)</code> → ✅ ADD <strong>[1,3,2]</strong>",
                    "&nbsp;&nbsp;Swap back(1,2) → [1,2,3]",
                    "Swap back(0,0) → [1,2,3]",
                    "<strong style='color:#fbbf24;'>i=1:</strong> Swap(0,1) → [<strong>2</strong>,<strong>1</strong>,3]",
                    "&nbsp;&nbsp;... continues → ✅ ADD <strong>[2,1,3]</strong>, <strong>[2,3,1]</strong>",
                    "<strong style='color:#ef4444;'>i=2:</strong> Swap(0,2) → [<strong>3</strong>,2,<strong>1</strong>]",
                    "&nbsp;&nbsp;... continues → ✅ ADD <strong>[3,2,1]</strong>, <strong>[3,1,2]</strong>",
                    "<strong>Final Result:</strong> [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,2,1], [3,1,2]]"
                ],
                codeTitle: "Python Solution (Swapping)",
                code: `def permute(nums):
    """
    Generate all permutations using in-place swapping
    Time: O(N × N!), Space: O(N) for recursion stack
    """
    res = []

    def backtrack(start):
        # Base case: All positions fixed
        if start == len(nums):
            res.append(nums[:])  # COPY!
            return

        # Try each element at 'start' position
        for i in range(start, len(nums)):
            # 1. SWAP: Put nums[i] at position 'start'
            nums[start], nums[i] = nums[i], nums[start]

            # 2. RECURSE: Fix remaining positions
            backtrack(start + 1)

            # 3. UNSWAP: Restore for next iteration
            nums[start], nums[i] = nums[i], nums[start]

    backtrack(0)
    return res

# Alternative: Using visited set (more space)
def permute_visited(nums):
    res = []
    used = [False] * len(nums)
    path = []
    
    def backtrack():
        if len(path) == len(nums):
            res.append(path[:])
            return
        for i in range(len(nums)):
            if used[i]: continue
            used[i] = True
            path.append(nums[i])
            backtrack()
            path.pop()
            used[i] = False
    
    backtrack()
    return res`,
                codeDetailed: `def permute_detailed(nums):
    """
    Detailed step-by-step explanation
    
    CORE IDEA:
    - "Position 0 pe kaun baithega?"
    - Try each element at position 0
    - Then recursively fill position 1, 2, ...
    
    WHY SWAPPING WORKS:
    - No extra visited set needed!
    - Elements before 'start' are FIXED
    - Elements from 'start' onwards are AVAILABLE
    - Swapping temporarily moves an element to 'start'
    """
    res = []

    def backtrack(start):
        # BASE CASE: All N positions are fixed
        # We have a complete permutation!
        if start == len(nums):
            # CRITICAL: Make a copy!
            # nums is being modified in-place
            res.append(nums[:])
            return

        # RECURSIVE CASE: Try each available element at 'start'
        # Available elements = nums[start], nums[start+1], ..., nums[n-1]
        for i in range(start, len(nums)):
            # === STEP 1: SWAP ===
            # Temporarily place nums[i] at position 'start'
            # Now nums[start] is "fixed" for this branch
            nums[start], nums[i] = nums[i], nums[start]
            
            # === STEP 2: RECURSE ===
            # With nums[start] fixed, fill remaining positions
            backtrack(start + 1)
            
            # === STEP 3: UNSWAP (Backtrack) ===
            # Restore original order before trying next element
            # This is ESSENTIAL - otherwise array stays corrupted!
            nums[start], nums[i] = nums[i], nums[start]

    backtrack(0)
    return res

# Test
print(permute_detailed([1, 2, 3]))
# Output: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]`
            }
        },
        {
            id: "subsets",
            title: "Subsets",
            leetcodeUrl: "https://leetcode.com/problems/subsets/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Pick/No-Pick", "Power Set"],
            quiz: {
                description: "Generate power set of [1,2,3]. Core decision at each element?",
                options: ["Loop n times", "Include or Exclude current element", "Swap adjacent", "Bit manipulation only"],
                correct: 1,
                explanation: "Pick/No-Pick! For every element, you have 2 choices: Include it in current subset OR Skip it. 2^N total subsets."
            },
            learn: {
                quickAlgo: [
                    "res = []",
                    "def backtrack(start, path):",
                    "    res.append(path[:])            # 🎯 Capture EVERY valid subset node",
                    "    for i in range(start, n):      # ⚡ Iterate remaining options",
                    "        path.append(nums[i])       # 🔄 Include nums[i]",
                    "        backtrack(i + 1, path)     # ✅ Move forward (i+1)",
                    "        path.pop()                 # 💡 Backtrack (Exclude)"
                ],
                metrics: { time: "O(2^N × N)", space: "O(N)" },
                timeExplainer: `<strong>Exponential Growth:</strong><br>
• Each element has 2 choices (Pick/No-Pick)<br>
• Total subsets = <code>2^N</code><br>
• Copying each subset takes <code>O(N)</code><br><br>
<strong>Total:</strong> <code>O(N × 2^N)</code>`,
                spaceExplainer: `<strong>Space Analysis:</strong><br>
• Recursion stack depth: <code>O(N)</code><br>
• Current path array: <code>O(N)</code><br>
• Output: <code>2^N</code> subsets (not counted as aux)<br><br>
<strong>Aux Space:</strong> <code>O(N)</code>`,
                visual: `<div style="text-align:left; font-family: monospace; font-size: 0.85rem; line-height: 1.8;">
<pre style="color: var(--text-muted);">
                    []
                    |
        "Element 1 ko LUN ya NA LUN?"
                /           \\
            PICK 1        NO-PICK 1
              [1]             []
               |               |
         "2 LUN?"        "2 LUN?"
         /     \\          /     \\
     [1,2]    [1]       [2]     []
       |       |         |       |
   "3 LUN?" "3 LUN?"  "3 LUN?" "3 LUN?"
    / \\      / \\       / \\      / \\
[1,2,3][1,2][1,3][1] [2,3][2] [3] []
</pre>
</div>`,
                crux: `<strong>The 3-Step Pattern:</strong><br>
<div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin:15px 0;">
<div style="background:rgba(16,185,129,0.1); padding:12px; border-radius:8px; text-align:center;">
<strong style="color:#10b981;">1. PICK</strong><br>
<code>current.append(nums[i])</code>
</div>
<div style="background:rgba(139,92,246,0.1); padding:12px; border-radius:8px; text-align:center;">
<strong style="color:#8b5cf6;">2. EXPLORE</strong><br>
<code>backtrack(i + 1)</code>
</div>
<div style="background:rgba(239,68,68,0.1); padding:12px; border-radius:8px; text-align:center;">
<strong style="color:#ef4444;">3. UNPICK</strong><br>
<code>current.pop()</code>
</div>
</div>
Then call backtrack(i+1) again for NO-PICK path.`,
                trap: `<strong>❌ Common Bug: Not Making a COPY!</strong><br><br>
<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
<div style="background:#0f172a; padding:12px; border-radius:8px;">
<span style="color:#ef4444;">❌ WRONG:</span><br>
<code style="color:#f87171;">result.append(current)</code><br>
<small style="color:gray;">All entries point to same list!</small>
</div>
<div style="background:#0f172a; padding:12px; border-radius:8px;">
<span style="color:#10b981;">✅ CORRECT:</span><br>
<code style="color:#34d399;">result.append(current[:])</code><br>
<small style="color:gray;">Independent copy created!</small>
</div>
</div>`,
                dryRun: [
                    "<strong>Input:</strong> nums = [1,2,3]",
                    "<code>backtrack(0, [])</code> → PICK 1 → <code>current = [1]</code>",
                    "<code>backtrack(1, [1])</code> → PICK 2 → <code>current = [1,2]</code>",
                    "<code>backtrack(2, [1,2])</code> → PICK 3 → <code>current = [1,2,3]</code>",
                    "<code>backtrack(3, [1,2,3])</code> → Base case! ✅ ADD <strong>[1,2,3]</strong>",
                    "<code>pop()</code> → <code>current = [1,2]</code>",
                    "<code>backtrack(3, [1,2])</code> → Base case! ✅ ADD <strong>[1,2]</strong>",
                    "<code>pop()</code> → <code>current = [1]</code>, PICK 3 → <code>current = [1,3]</code>",
                    "... continues for all 8 subsets",
                    "<strong>Final:</strong> [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]"
                ],
                codeTitle: "Python Solution (Pick/No-Pick)",
                code: `def subsets(nums):
    """
    Generate all subsets using Pick/No-Pick backtracking
    Time: O(2^n × n), Space: O(n)
    """
    result = []
    
    def backtrack(index, current):
        # Base case: processed all elements
        if index == len(nums):
            result.append(current[:])  # COPY!
            return
        
        # PICK current element
        current.append(nums[index])
        backtrack(index + 1, current)
        current.pop()  # Backtrack
        
        # NO-PICK current element
        backtrack(index + 1, current)
    
    backtrack(0, [])
    return result

# Alternative: Iterative approach
def subsets_iterative(nums):
    result = [[]]
    for num in nums:
        result += [subset + [num] for subset in result]
    return result`,
                codeDetailed: `def subsets_detailed(nums):
    """
    Detailed version with step-by-step explanation
    """
    result = []
    
    def backtrack(index, current):
        # Base case: We've made decisions for all elements
        # Every path through the decision tree is a valid subset
        if index == len(nums):
            # CRITICAL: Append a COPY, not the reference!
            # current is a mutable list - without [:], 
            # all entries in result would point to same list
            result.append(current[:])
            return
        
        # === DECISION 1: PICK current element ===
        current.append(nums[index])  # Add to current subset
        backtrack(index + 1, current)  # Explore with this element
        
        # === BACKTRACK: Undo the choice ===
        current.pop()  # Remove to explore "no-pick" path
        
        # === DECISION 2: NO-PICK current element ===
        # current is now clean (without nums[index])
        backtrack(index + 1, current)  # Explore without this element
    
    # Start from index 0 with empty subset
    backtrack(0, [])
    return result

# Test with dry run
print(subsets_detailed([1, 2, 3]))
# Output: [[], [3], [2], [2,3], [1], [1,3], [2,3], [1,2,3]]`
            }
        },
        {
            id: "combination-sum",
            title: "Combination Sum",
            leetcodeUrl: "https://leetcode.com/problems/combination-sum/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Unbounded Knapsack", "Reuse Allowed"],
            quiz: {
                description: "Candidates = [2,3,6,7], Target = 7. Elements can be reused. Key logic?",
                options: ["Pass index i+1 always", "Pass index i (Stay) when picking", "Use a visited set", "Sort and use binary search"],
                correct: 1,
                explanation: "Pass `i` (Stay)! Since we can reuse the same element unlimited times, we recurse with SAME index when picking. Only increment to i+1 when we SKIP."
            },
            learn: {
                quickAlgo: [
                    "🎯 <strong>Unlimited use kyun?</strong> <code>backtrack(i, ...)</code> not i+1 — same element repeat allowed",
                    "⚡ Pruning: <code>if target < 0: return</code> — exceeded, no point continuing",
                    "🔄 <code>for i in range(start, n)</code> — start ensures no duplicates like [2,3] and [3,2]",
                    "✅ <code>target == 0</code> → valid combination found!",
                    "💡 Sorted array helps: <code>if cand > target: break</code> — early exit"
                ],
                metrics: { time: "O(N^(T/M))", space: "O(T/M)" },
                timeExplainer: `<strong>Time Complexity: O(N^(T/M))</strong><br><br>
<div style="background:#0f172a; padding:15px; border-radius:8px;">
<strong style="color:#fbbf24;">Variables:</strong><br>
• N = number of candidates<br>
• T = target sum<br>
• M = minimum candidate value<br><br>

<strong style="color:#10b981;">Why T/M?</strong><br>
Maximum depth of recursion = T/M<br>
(If min candidate is 2 and target is 7, max depth = 7/2 ≈ 3)
</div>

<div style="background:rgba(245,158,11,0.1); padding:15px; border-radius:8px; margin-top:10px;">
<strong style="color:#fbbf24;">Example: candidates=[2,3], target=7</strong><br>
• Min = 2, so max depth = 7/2 ≈ 3-4 levels<br>
• At each level, N choices<br>
• Total ≈ N^(T/M) = 2^3 = 8 nodes (roughly)
</div>

<strong style="color:#a78bfa;">Note:</strong> Often written as O(2^T) upper bound`,

                spaceExplainer: `<strong>Space Complexity: O(T/M)</strong><br><br>
<div style="background:#0f172a; padding:15px; border-radius:8px;">
<table style="width:100%; color:#e2e8f0;">
<tr><td style="padding:8px 0;"><strong style="color:#10b981;">✓ Recursion Stack</strong></td><td>O(T/M) - max elements in a valid combination</td></tr>
<tr><td style="padding:8px 0;"><strong style="color:#10b981;">✓ Current Path</strong></td><td>O(T/M) - same bound</td></tr>
<tr><td style="padding:8px 0;"><strong style="color:#8b5cf6;">Output</strong></td><td>Varies based on valid combinations</td></tr>
</table>
</div>

<div style="background:rgba(16,185,129,0.1); padding:12px; border-radius:8px; margin-top:10px;">
<strong style="color:#10b981;">💡 Example:</strong><br>
target=7, min candidate=2<br>
Max path length = 7/2 ≈ 3 (like [2,2,3])<br>
So space = O(3) = O(T/M)
</div>`,

                visual: `<div style="text-align:left; font-family: monospace; font-size: 0.85rem; line-height: 1.6;">
<strong style="color:#fbbf24;">🪙 "Unlimited Coins" Visualization:</strong>
<pre style="color: var(--text-muted); margin-top:10px;">
candidates = [2, 3], target = 7

             backtrack(i=0, sum=0)
             "2 LUN ya NA LUN?"
                /           \\
         PICK 2            SKIP 2
        sum=2              (move to i=1)
        i=0 (STAY!)         
           |                  |
    "Phir se 2 LUN?"     "3 LUN ya NA LUN?"
         /     \\              /        \\
    PICK 2   SKIP 2       PICK 3     SKIP 3
    sum=4    (i=1)        sum=3      (done)
    i=0                   i=1
       |                    |
  "Phir se 2?"         "Phir se 3?"
     /    \\                 |
  PICK 2  SKIP           PICK 3
  sum=6                  sum=6
  i=0                    i=1
     |                     |
  PICK 2?              PICK 3?
  sum=8 ❌             sum=9 ❌
  (>target)            (>target)
  
✅ Valid paths: [2,2,3] (sum=7), [7] (if 7 in candidates)
</pre>
</div>`,

                crux: `<strong>The Stay vs Move Pattern (Unbounded Knapsack):</strong><br><br>
<div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin:15px 0;">
<div style="background:rgba(16,185,129,0.15); padding:20px; border-radius:12px; border:2px solid rgba(16,185,129,0.3);">
<div style="font-size:1.5rem; margin-bottom:10px;">✅ PICK (LUN)</div>
<strong style="color:#10b981;">Stay at same index!</strong><br><br>
<code style="font-size:0.85rem; background:#0f172a; padding:8px; border-radius:4px; display:block;">
path.append(candidates[i])<br>
backtrack(<strong style="color:#10b981;">i</strong>, path, sum + candidates[i])<br>
path.pop()
</code><br>
<small style="color:gray;">Element reuse allowed → i stays same</small>
</div>
<div style="background:rgba(239,68,68,0.15); padding:20px; border-radius:12px; border:2px solid rgba(239,68,68,0.3);">
<div style="font-size:1.5rem; margin-bottom:10px;">❌ SKIP (NA LUN)</div>
<strong style="color:#ef4444;">Move to next index!</strong><br><br>
<code style="font-size:0.85rem; background:#0f172a; padding:8px; border-radius:4px; display:block;">
backtrack(<strong style="color:#ef4444;">i + 1</strong>, path, sum)
</code><br>
<small style="color:gray;">Done with this element forever → i+1</small>
</div>
</div>

<div style="background:#0f172a; padding:15px; border-radius:8px;">
<strong style="color:#fbbf24;">⚡ Key Difference from Subsets:</strong><br>
Subsets: Both paths use <code>i+1</code><br>
Combination Sum: PICK uses <code>i</code>, SKIP uses <code>i+1</code>
</div>`,

                trap: `<strong>⚠️ Common Mistakes:</strong><br><br>

<div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); padding:15px; border-radius:8px; margin-bottom:15px;">
<strong style="color:#f87171;">❌ Mistake 1: Using i+1 for PICK call</strong>
<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:10px;">
<div style="background:#0f172a; padding:10px; border-radius:6px;">
<span style="color:#ef4444;">Wrong:</span><br>
<code style="color:#f87171;">backtrack(i+1, sum+val)</code><br>
<small style="color:gray;">Can't reuse elements!</small>
</div>
<div style="background:#0f172a; padding:10px; border-radius:6px;">
<span style="color:#10b981;">Correct:</span><br>
<code style="color:#34d399;">backtrack(i, sum+val)</code><br>
<small style="color:gray;">Stay at i for reuse</small>
</div>
</div>
</div>

<div style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); padding:15px; border-radius:8px; margin-bottom:15px;">
<strong style="color:#fbbf24;">❌ Mistake 2: Forgetting sum > target check</strong><br>
<code style="color:#fbbf24;">if sum > target: return  # MUST have this!</code><br>
<small style="color:gray;">Without this, infinite recursion if min candidate taken repeatedly</small>
</div>

<div style="background:rgba(139,92,246,0.1); border:1px solid rgba(139,92,246,0.3); padding:15px; border-radius:8px;">
<strong style="color:#a78bfa;">❌ Mistake 3: Negative candidates</strong><br>
<small style="color:gray;">If candidates had negative numbers → infinite loop!<br>
sum would never exceed target. Problem guarantees positive numbers.</small>
</div>`,

                dryRun: [
                    "<strong>Input:</strong> candidates = [2, 3], target = 7",
                    "<code>backtrack(0, [], 0)</code> → sum=0 < 7, continue",
                    "<strong style='color:#10b981;'>PICK 2:</strong> path=[2], sum=2",
                    "&nbsp;&nbsp;<code>backtrack(0, [2], 2)</code> → stay at i=0",
                    "&nbsp;&nbsp;<strong style='color:#10b981;'>PICK 2:</strong> path=[2,2], sum=4",
                    "&nbsp;&nbsp;&nbsp;&nbsp;<code>backtrack(0, [2,2], 4)</code>",
                    "&nbsp;&nbsp;&nbsp;&nbsp;<strong style='color:#10b981;'>PICK 2:</strong> path=[2,2,2], sum=6",
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>backtrack(0, [2,2,2], 6)</code>",
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong style='color:#10b981;'>PICK 2:</strong> sum=8 > 7 ❌ return",
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong style='color:#ef4444;'>SKIP 2:</strong> move to i=1",
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong style='color:#10b981;'>PICK 3:</strong> sum=9 > 7 ❌ return",
                    "&nbsp;&nbsp;&nbsp;&nbsp;pop() → path=[2,2]",
                    "&nbsp;&nbsp;&nbsp;&nbsp;<strong style='color:#ef4444;'>SKIP 2:</strong> move to i=1, path=[2,2], sum=4",
                    "&nbsp;&nbsp;&nbsp;&nbsp;<strong style='color:#10b981;'>PICK 3:</strong> path=[2,2,3], sum=7 ✅ <strong>ADD [2,2,3]</strong>",
                    "&nbsp;&nbsp;... backtrack continues ...",
                    "&nbsp;&nbsp;<strong style='color:#ef4444;'>SKIP all 2s:</strong> → try [3,...]",
                    "&nbsp;&nbsp;<strong style='color:#10b981;'>PICK 3:</strong> path=[3], sum=3",
                    "&nbsp;&nbsp;&nbsp;&nbsp;<strong style='color:#10b981;'>PICK 3:</strong> path=[3,3], sum=6",
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong style='color:#10b981;'>PICK 3:</strong> sum=9 > 7 ❌",
                    "<strong>Final Result:</strong> [[2,2,3], [7]] (if 7 was in candidates)"
                ],
                codeTitle: "Python Solution (Unbounded Knapsack)",
                code: `def combinationSum(candidates, target):
    """
    Find all unique combinations that sum to target.
    Elements can be reused unlimited times.
    Time: O(N^(T/M)), Space: O(T/M)
    """
    res = []

    def backtrack(i, current_path, current_sum):
        # Base Case 1: Found valid combination!
        if current_sum == target:
            res.append(current_path[:])  # COPY!
            return
        
        # Base Case 2: Invalid - out of bounds or exceeded
        if i >= len(candidates) or current_sum > target:
            return

        # CHOICE 1: PICK (LUN) - Stay at index i
        current_path.append(candidates[i])
        backtrack(i, current_path, current_sum + candidates[i])
        
        # BACKTRACK: Undo the choice
        current_path.pop()

        # CHOICE 2: SKIP (NA LUN) - Move to i+1
        backtrack(i + 1, current_path, current_sum)

    backtrack(0, [], 0)
    return res

# Test
print(combinationSum([2,3,6,7], 7))
# Output: [[2,2,3], [7]]`,
                codeDetailed: `def combinationSum_detailed(candidates, target):
    """
    UNBOUNDED KNAPSACK Pattern:
    - Same as 0/1 Knapsack, but elements can be reused
    - Key difference: PICK stays at 'i', doesn't move to 'i+1'
    
    WHY STAY AT i?
    - [2,3], target=7
    - If we need [2,2,3], we must pick '2' multiple times
    - Staying at i=0 allows: pick 2, pick 2 again, then move on
    
    WHY SKIP MOVES TO i+1?
    - Once we decide "no more 2s", we're done with index 0
    - Move to index 1 (element 3) permanently
    """
    res = []

    def backtrack(i, path, current_sum):
        # === BASE CASE 1: SUCCESS ===
        # We found a valid combination!
        if current_sum == target:
            res.append(path[:])  # Make a copy
            return
        
        # === BASE CASE 2: FAILURE ===
        # Out of candidates OR sum exceeded target
        if i >= len(candidates) or current_sum > target:
            return

        # === CHOICE 1: PICK current element ===
        # Key: We can pick it AGAIN, so stay at index i
        path.append(candidates[i])
        backtrack(i, path, current_sum + candidates[i])  # i, not i+1!
        
        # === BACKTRACK ===
        # Remove the element we just added
        path.pop()

        # === CHOICE 2: SKIP current element ===
        # We're done with this element forever, move to next
        backtrack(i + 1, path, current_sum)  # i+1, move on!

    backtrack(0, [], 0)
    return res

# Comparison with Combination Sum II (no reuse):
def combinationSum2(candidates, target):
    """
    In Combination Sum II, each element used ONCE
    So PICK also uses i+1, not i
    """
    candidates.sort()  # Sort to handle duplicates
    res = []
    
    def backtrack(i, path, total):
        if total == target:
            res.append(path[:])
            return
        if total > target:
            return
            
        for j in range(i, len(candidates)):
            # Skip duplicates at same level
            if j > i and candidates[j] == candidates[j-1]:
                continue
            path.append(candidates[j])
            backtrack(j + 1, path, total + candidates[j])  # j+1, not j!
            path.pop()
    
    backtrack(0, [], 0)
    return res`
            }
        },
        {
            id: "word-search",
            title: "Word Search",
            leetcodeUrl: "https://leetcode.com/problems/word-search/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Grid DFS", "Backtracking"],
            quiz: {
                description: "Find 'ABCCED' in 2D grid. Can same cell be visited twice in one path?",
                options: ["Yes, any cell can be reused", "No, but can use in different paths", "Only adjacent cells matter", "Diagonals allowed"],
                correct: 1,
                explanation: "No reuse in SAME path! Mark cell as visited (#), explore 4 directions, then UNMARK (backtrack). Cell can be used in different paths though."
            },
            learn: {
                quickAlgo: [
                    "def dfs(r, c, k):",
                    "    if k == len(word): return True # 🎯 Word Found!",
                    "    if not (0 <= r < ROWS and 0 <= c < COLS) or board[r][c] != word[k]: return False # ⚡ Mismatch/Off-board",
                    "    temp, board[r][c] = board[r][c], '#' # 🔄 Mark visited",
                    "    found = (dfs(r+1,c,k+1) or dfs(r-1,c,k+1) or dfs(r,c+1,k+1) or dfs(r,c-1,k+1)) # ✅ Try 4 dirs",
                    "    board[r][c] = temp             # 💡 Unmark (Backtrack)",
                    "    return found"
                ],
                metrics: { time: "O(M×N × 3^L)", space: "O(L)" },
                timeExplainer: `<strong>Time Complexity: O(M×N × 3^L)</strong><br><br>
<div style="background:#0f172a; padding:15px; border-radius:8px;">
<strong style="color:#fbbf24;">Breaking it down:</strong><br><br>
• <strong style="color:#10b981;">M × N</strong> = Grid cells (each can be starting point)<br>
• <strong style="color:#10b981;">3^L</strong> = DFS branching factor<br><br>

<strong style="color:#a78bfa;">Why 3, not 4?</strong><br>
First cell: 4 directions possible<br>
But after that: 3 directions (can't go back to where we came from!)
</div>

<div style="background:rgba(245,158,11,0.1); padding:15px; border-radius:8px; margin-top:10px;">
<strong style="color:#fbbf24;">Example:</strong><br>
Grid = 3×4, Word = "ABCDEF" (L=6)<br>
Time ≈ 12 × 3^6 = 12 × 729 ≈ 8748 operations
</div>`,

                spaceExplainer: `<strong>Space Complexity: O(L)</strong><br><br>
<div style="background:#0f172a; padding:15px; border-radius:8px;">
<table style="width:100%; color:#e2e8f0;">
<tr><td style="padding:8px 0;"><strong style="color:#10b981;">✓ Recursion Stack</strong></td><td>O(L) - max depth = word length</td></tr>
<tr><td style="padding:8px 0;"><strong style="color:#10b981;">✓ In-place Marking</strong></td><td>O(1) - no extra grid needed!</td></tr>
</table>
</div>

<div style="background:rgba(16,185,129,0.1); padding:12px; border-radius:8px; margin-top:10px;">
<strong style="color:#10b981;">💡 Space Optimization:</strong><br>
We mark visited cells by replacing with '#'<br>
No separate visited[][] array needed!
</div>`,

                visual: `<div style="text-align:left; font-family: monospace; font-size: 0.85rem; line-height: 1.6;">
<strong style="color:#fbbf24;">🐍 "The Snake" Visualization:</strong>
<pre style="color: var(--text-muted); margin-top:10px;">
Grid:                  Finding "ABC"
┌───┬───┬───┬───┐
│ A │ B │ C │ E │      Step 1: Start at (0,0), char='A' ✓
├───┼───┼───┼───┤              Mark A → #
│ S │ F │ C │ S │      
├───┼───┼───┼───┤      ┌───┬───┬───┬───┐
│ A │ D │ E │ E │      │ # │ B │ C │ E │  🐍 at A
└───┴───┴───┴───┘      ├───┼───┼───┼───┤
                       │ S │ F │ C │ S │
                       └───┴───┴───┴───┘

Step 2: Move right to (0,1), char='B' ✓
        Mark B → #
        
┌───┬───┬───┬───┐      Step 3: Move right to (0,2), char='C' ✓
│ # │ # │ C │ E │              Mark C → #
├───┼───┼───┼───┤      
│ S │ F │ C │ S │      ┌───┬───┬───┬───┐
└───┴───┴───┴───┘      │ # │ # │ # │ E │  🐍 found "ABC" ✅
                       └───┴───┴───┴───┘

If dead end → Unmark and try another direction
(Snake retreats and tries different path)
</pre>
</div>`,

                crux: `<strong>The Mark-Explore-Unmark Pattern:</strong><br><br>
<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin:15px 0;">
<div style="background:rgba(239,68,68,0.1); padding:15px; border-radius:8px; text-align:center;">
<div style="font-size:1.2rem; margin-bottom:8px;">0️⃣</div>
<strong style="color:#ef4444;">CHECK</strong><br>
<small style="color:gray;">Bounds & Match</small>
</div>
<div style="background:rgba(16,185,129,0.1); padding:15px; border-radius:8px; text-align:center;">
<div style="font-size:1.2rem; margin-bottom:8px;">1️⃣</div>
<strong style="color:#10b981;">MARK</strong><br>
<code style="font-size:0.75rem;">board[r][c]='#'</code>
</div>
<div style="background:rgba(139,92,246,0.1); padding:15px; border-radius:8px; text-align:center;">
<div style="font-size:1.2rem; margin-bottom:8px;">2️⃣</div>
<strong style="color:#8b5cf6;">EXPLORE</strong><br>
<small style="color:gray;">4 Directions</small>
</div>
<div style="background:rgba(245,158,11,0.1); padding:15px; border-radius:8px; text-align:center;">
<div style="font-size:1.2rem; margin-bottom:8px;">3️⃣</div>
<strong style="color:#fbbf24;">UNMARK</strong><br>
<code style="font-size:0.75rem;">board[r][c]=temp</code>
</div>
</div>

<div style="background:#0f172a; padding:15px; border-radius:8px;">
<strong style="color:#fbbf24;">4 Directions:</strong><br>
<code>dfs(r+1, c) or dfs(r-1, c) or dfs(r, c+1) or dfs(r, c-1)</code><br><br>
<strong style="color:#10b981;">💡 Use OR short-circuit:</strong> If any direction returns True, stop immediately!
</div>`,

                trap: `<strong>⚠️ Common Mistakes:</strong><br><br>

<div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); padding:15px; border-radius:8px; margin-bottom:15px;">
<strong style="color:#f87171;">❌ Mistake 1: Forgetting to UNMARK!</strong>
<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:10px;">
<div style="background:#0f172a; padding:10px; border-radius:6px;">
<span style="color:#ef4444;">Wrong:</span><br>
<code style="color:#f87171; font-size:0.8rem;">board[r][c] = '#'<br>return dfs(...)</code><br>
<small style="color:gray;">Cell stays marked forever!</small>
</div>
<div style="background:#0f172a; padding:10px; border-radius:6px;">
<span style="color:#10b981;">Correct:</span><br>
<code style="color:#34d399; font-size:0.8rem;">temp = board[r][c]<br>board[r][c] = '#'<br>res = dfs(...)<br>board[r][c] = temp</code>
</div>
</div>
</div>

<div style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); padding:15px; border-radius:8px; margin-bottom:15px;">
<strong style="color:#fbbf24;">❌ Mistake 2: Not using short-circuit OR</strong><br>
<code style="color:#fbbf24;">return dfs(r+1,c) or dfs(r-1,c) or ...</code> ✅<br>
<small style="color:gray;">If first direction works, skip others! Much faster.</small>
</div>

<div style="background:rgba(139,92,246,0.1); border:1px solid rgba(139,92,246,0.3); padding:15px; border-radius:8px;">
<strong style="color:#a78bfa;">❌ Mistake 3: Wrong order of checks</strong><br>
<code style="color:#a78bfa;">if i == len(word): return True  # Check SUCCESS first!</code><br>
<code style="color:#a78bfa;">if out_of_bounds or mismatch: return False</code><br>
<small style="color:gray;">Check base case BEFORE bounds check!</small>
</div>`,

                dryRun: [
                    "<strong>Input:</strong> board = [['A','B'],['C','D']], word = 'ABCD'",
                    "<code>exist(board, 'ABCD')</code> → Try each cell as start",
                    "<strong style='color:#10b981;'>Start (0,0):</strong> board[0][0]='A' == word[0] ✓",
                    "&nbsp;&nbsp;Mark: board[0][0] = '#'",
                    "&nbsp;&nbsp;<code>dfs(0, 0, 0)</code> → i=0 matches, explore 4 dirs",
                    "&nbsp;&nbsp;<strong style='color:#8b5cf6;'>Try RIGHT (0,1):</strong> board[0][1]='B' == word[1] ✓",
                    "&nbsp;&nbsp;&nbsp;&nbsp;Mark: board[0][1] = '#'",
                    "&nbsp;&nbsp;&nbsp;&nbsp;<code>dfs(0, 1, 1)</code> → explore from B",
                    "&nbsp;&nbsp;&nbsp;&nbsp;<strong style='color:#8b5cf6;'>Try DOWN (1,1):</strong> board[1][1]='D' != word[2]='C' ❌",
                    "&nbsp;&nbsp;&nbsp;&nbsp;<strong style='color:#8b5cf6;'>Try LEFT (0,0):</strong> board[0][0]='#' (visited) ❌",
                    "&nbsp;&nbsp;&nbsp;&nbsp;All directions failed from B",
                    "&nbsp;&nbsp;&nbsp;&nbsp;Unmark: board[0][1] = 'B'",
                    "&nbsp;&nbsp;<strong style='color:#ef4444;'>RIGHT failed,</strong> try DOWN (1,0)",
                    "&nbsp;&nbsp;<strong style='color:#8b5cf6;'>Try DOWN (1,0):</strong> board[1][0]='C' == word[1]='B' ❌",
                    "&nbsp;&nbsp;Unmark: board[0][0] = 'A'",
                    "<strong style='color:#fbbf24;'>Start (0,0) failed.</strong> Try next cell...",
                    "... continues trying other starting positions ...",
                    "<strong>Final:</strong> Return True if any path found, else False"
                ],
                codeTitle: "Python Solution (Grid Backtracking)",
                code: `def exist(board, word):
    """
    Find if word exists in grid via adjacent cells.
    Time: O(M×N × 3^L), Space: O(L)
    """
    ROWS, COLS = len(board), len(board[0])
    
    def dfs(row, col, char_index):
        # Base Case 1: Found complete word!
        if char_index == len(word):
            return True
        
        # Base Case 2: Out of bounds or mismatch
        if (row < 0 or row >= ROWS or 
            col < 0 or col >= COLS or 
            board[row][col] != word[char_index]):
            return False
        
        # MARK: Save char and mark as visited
        original_char = board[row][col]
        board[row][col] = '#'
        
        # EXPLORE: Try all 4 directions (short-circuit OR)
        found = (dfs(row+1, col, char_index+1) or   # Down
                 dfs(row-1, col, char_index+1) or   # Up
                 dfs(row, col+1, char_index+1) or   # Right
                 dfs(row, col-1, char_index+1))     # Left
        
        # UNMARK: Restore for other paths
        board[row][col] = original_char
        
        return found
    
    # Try each cell as starting point
    for row in range(ROWS):
        for col in range(COLS):
            if dfs(row, col, 0):
                return True
    return False`,
                codeDetailed: `def exist_detailed(board, word):
    """
    GRID BACKTRACKING Pattern:
    
    WHY MARK AND UNMARK?
    - Same cell can't be used twice in ONE path
    - But can be used in DIFFERENT paths
    - Mark '#' prevents revisiting in current DFS
    - Unmark allows reuse when we backtrack
    
    WHY SHORT-CIRCUIT OR?
    - dfs(...) or dfs(...) or ...
    - If first returns True, others don't execute
    - Massive optimization for early termination
    """
    ROWS, COLS = len(board), len(board[0])
    
    def dfs(row, col, char_index):
        # === BASE CASE 1: SUCCESS ===
        # We've matched entire word!
        if char_index == len(word):
            return True
        
        # === BASE CASE 2: FAILURE ===
        # Out of grid bounds
        if row < 0 or row >= ROWS or col < 0 or col >= COLS:
            return False
        
        # Current cell doesn't match required char
        if board[row][col] != word[char_index]:
            return False
        
        # === MARK AS VISITED ===
        # Save original char, replace with '#'
        # This prevents revisiting in current path
        original_char = board[row][col]
        board[row][col] = '#'
        
        # === EXPLORE 4 DIRECTIONS ===
        # Use OR for short-circuit evaluation
        # If any direction succeeds, return True immediately
        found = (
            dfs(row + 1, col, char_index + 1) or  # Down
            dfs(row - 1, col, char_index + 1) or  # Up  
            dfs(row, col + 1, char_index + 1) or  # Right
            dfs(row, col - 1, char_index + 1)     # Left
        )
        
        # === UNMARK (BACKTRACK) ===
        # Restore original char for other paths
        # This is CRITICAL - cell can be used in other paths
        board[row][col] = original_char
        
        return found
    
    # Try every cell as potential starting point
    for row in range(ROWS):
        for col in range(COLS):
            # If first char matches, start DFS
            if dfs(row, col, 0):
                return True
    
    return False

# Cleaner version using direction array:
def exist_clean(board, word):
    ROWS, COLS = len(board), len(board[0])
    DIRECTIONS = [(0,1), (1,0), (0,-1), (-1,0)]  # Right, Down, Left, Up
    
    def dfs(row, col, char_index):
        if char_index == len(word): 
            return True
        if not (0 <= row < ROWS and 0 <= col < COLS): 
            return False
        if board[row][col] != word[char_index]: 
            return False
        
        original_char = board[row][col]
        board[row][col] = '#'
        
        for delta_row, delta_col in DIRECTIONS:
            if dfs(row + delta_row, col + delta_col, char_index + 1):
                board[row][col] = original_char
                return True
        
        board[row][col] = original_char
        return False
    
    return any(dfs(row, col, 0) 
               for row in range(ROWS) 
               for col in range(COLS))`
            }
        },
        {
            id: "sudoku-solver",
            title: "Sudoku Solver",
            leetcodeUrl: "https://leetcode.com/problems/sudoku-solver/",
            difficulty: "Bonus",
            priority: "🟡",
            tags: ["Hard", "Constraint Satisfaction"],
            quiz: {
                description: "Fill empty cells in 9×9 Sudoku grid. What's the key constraint to check?",
                options: ["Only row uniqueness", "Row + Column", "Row + Column + 3×3 Box", "Random fill and verify"],
                correct: 2,
                explanation: "3 Constraints! Each number 1-9 must appear exactly once in: (1) Row, (2) Column, (3) 3×3 Box. Backtrack when any constraint violated."
            },
            learn: {
                quickAlgo: [
                    "def solve():",
                    "    for r in range(9):",
                    "        for c in range(9):",
                    "            if board[r][c] == '.': # 🎯 Find empty cell",
                    "                for digit in '123456789': # ⚡ Try digits 1-9",
                    "                    if is_valid(r, c, digit): # 🔄 Check constraints",
                    "                        board[r][c] = digit # ✅ Place digit",
                    "                        if solve(): return True # 💡 Recurse & propagate success",
                    "                        board[r][c] = '.' # 🔄 Backtrack",
                    "                return False # No digit works, backtrack",
                    "    return True # All cells filled, solved!"
                ],
                metrics: { time: "O(9^M)", space: "O(M)" },
                timeExplainer: `<strong>Time Complexity: O(9^M)</strong><br><br>
<div style="background:#0f172a; padding:15px; border-radius:8px;">
<strong style="color:#fbbf24;">Where M = number of empty cells</strong><br><br>
• Each empty cell: up to 9 choices<br>
• M empty cells to fill<br>
• Worst case: try all combinations<br><br>
<strong style="color:#ef4444;">Upper bound = 9^M</strong>
</div>

<div style="background:rgba(16,185,129,0.1); padding:15px; border-radius:8px; margin-top:10px;">
<strong style="color:#10b981;">💡 Pruning helps a LOT!</strong><br>
Early constraint checks eliminate most branches.<br>
Typical Sudoku: ~17 given → ~64 empty → still fast!
</div>`,

                spaceExplainer: `<strong>Space Complexity: O(M)</strong><br><br>
<div style="background:#0f172a; padding:15px; border-radius:8px;">
<table style="width:100%; color:#e2e8f0;">
<tr><td style="padding:8px 0;"><strong style="color:#10b981;">✓ Recursion Stack</strong></td><td>O(M) - max M empty cells deep</td></tr>
<tr><td style="padding:8px 0;"><strong style="color:#10b981;">✓ In-place Modification</strong></td><td>O(1) - modify board directly</td></tr>
</table>
</div>

<div style="background:rgba(245,158,11,0.1); padding:12px; border-radius:8px; margin-top:10px;">
<strong style="color:#fbbf24;">Optimization:</strong> Use 3 sets (rows, cols, boxes)<br>
for O(1) validity check instead of O(9) loop.
</div>`,

                visual: `<div style="text-align:left; font-family: monospace; font-size: 0.8rem; line-height: 1.5;">
<strong style="color:#fbbf24;">🔢 Sudoku 3-Constraint Visualization:</strong>
<pre style="color: var(--text-muted); margin-top:10px;">
Filling cell (row=0, col=2):

     0   1   2   3   4   5   6   7   8
   ┌───┬───┬───┬───┬───┬───┬───┬───┬───┐
 0 │ 5 │ 3 │ ? │ . │ 7 │ . │ . │ . │ . │  ← ROW 0: has 5,3,7
   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤
 1 │ 6 │ . │ . │ 1 │ 9 │ 5 │ . │ . │ . │
   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤
 2 │ . │ 9 │ 8 │ . │ . │ . │ . │ 6 │ . │
   ├───┴───┴───┼───┴───┴───┼───┴───┴───┤
               ↑
            COL 2: has 8
   
   ┌───────────┐
   │ 5 │ 3 │ ? │  ← BOX 0 (top-left 3×3)
   │ 6 │ . │ . │     Already has: 5, 3, 6, 9, 8
   │ . │ 9 │ 8 │
   └───────────┘

<strong style="color:#10b981;">Valid choices for (0,2):</strong>
Row 0 blocks: {5, 3, 7}
Col 2 blocks: {8}
Box 0 blocks: {5, 3, 6, 9, 8}
Combined: {3, 5, 6, 7, 8, 9}
<strong style="color:#fbbf24;">Available: {1, 2, 4} → Try 1 first!</strong>

<strong style="color:#a78bfa;">Box Index Formula:</strong>
box_index = (row // 3) * 3 + (col // 3)
For (0, 2): (0//3)*3 + (2//3) = 0*3 + 0 = Box 0
</pre>
</div>`,

                crux: `<strong>The 3-Constraint Check Pattern:</strong><br><br>
<div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin:15px 0;">
<div style="background:rgba(239,68,68,0.1); padding:15px; border-radius:8px; text-align:center;">
<div style="font-size:1.5rem; margin-bottom:8px;">➡️</div>
<strong style="color:#ef4444;">ROW</strong><br>
<code style="font-size:0.75rem;">board[row][0..8]</code><br>
<small style="color:gray;">Check all 9 columns</small>
</div>
<div style="background:rgba(16,185,129,0.1); padding:15px; border-radius:8px; text-align:center;">
<div style="font-size:1.5rem; margin-bottom:8px;">⬇️</div>
<strong style="color:#10b981;">COLUMN</strong><br>
<code style="font-size:0.75rem;">board[0..8][col]</code><br>
<small style="color:gray;">Check all 9 rows</small>
</div>
<div style="background:rgba(139,92,246,0.1); padding:15px; border-radius:8px; text-align:center;">
<div style="font-size:1.5rem; margin-bottom:8px;">⬜</div>
<strong style="color:#8b5cf6;">3×3 BOX</strong><br>
<code style="font-size:0.7rem;">box_row = 3*(row//3)</code><br>
<code style="font-size:0.7rem;">box_col = 3*(col//3)</code>
</div>
</div>

<div style="background:#0f172a; padding:15px; border-radius:8px;">
<strong style="color:#fbbf24;">💡 Box Cell Access:</strong><br>
<code>for i in range(9):</code><br>
<code>&nbsp;&nbsp;box_row + i // 3, box_col + i % 3</code><br><br>
This iterates all 9 cells in the 3×3 box!
</div>`,

                trap: `<strong>⚠️ Common Mistakes:</strong><br><br>

<div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); padding:15px; border-radius:8px; margin-bottom:15px;">
<strong style="color:#f87171;">❌ Mistake 1: Not returning True when solved!</strong>
<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:10px;">
<div style="background:#0f172a; padding:10px; border-radius:6px;">
<span style="color:#ef4444;">Wrong:</span><br>
<code style="color:#f87171; font-size:0.8rem;">if solve(): pass</code><br>
<small style="color:gray;">Solution gets overwritten!</small>
</div>
<div style="background:#0f172a; padding:10px; border-radius:6px;">
<span style="color:#10b981;">Correct:</span><br>
<code style="color:#34d399; font-size:0.8rem;">if solve(): return True</code><br>
<small style="color:gray;">Propagate success up!</small>
</div>
</div>
</div>

<div style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); padding:15px; border-radius:8px; margin-bottom:15px;">
<strong style="color:#fbbf24;">❌ Mistake 2: Wrong box index formula</strong><br>
<code style="color:#34d399;">box_row = 3 * (row // 3)</code> ✅<br>
<code style="color:#f87171;">box_row = row // 3</code> ❌<br>
<small style="color:gray;">Must multiply by 3 to get actual row index!</small>
</div>

<div style="background:rgba(139,92,246,0.1); border:1px solid rgba(139,92,246,0.3); padding:15px; border-radius:8px;">
<strong style="color:#a78bfa;">❌ Mistake 3: Forgetting to reset cell on backtrack</strong><br>
<code style="color:#a78bfa;">board[row][col] = '.'  # MUST reset!</code><br>
<small style="color:gray;">Without this, wrong values stay and corrupt other branches</small>
</div>`,

                dryRun: [
                    "<strong>Input:</strong> 9×9 Sudoku with empty cells marked '.'",
                    "<code>solve()</code> → Find first empty cell",
                    "<strong style='color:#10b981;'>Found empty:</strong> (row=0, col=2)",
                    "Loop: Try digits '1' to '9'",
                    "&nbsp;&nbsp;<strong style='color:#fbbf24;'>Try '1':</strong> isValid(0, 2, '1')?",
                    "&nbsp;&nbsp;&nbsp;&nbsp;Check row 0: '1' not in row ✓",
                    "&nbsp;&nbsp;&nbsp;&nbsp;Check col 2: '1' not in col ✓",
                    "&nbsp;&nbsp;&nbsp;&nbsp;Check box 0: '1' not in box ✓",
                    "&nbsp;&nbsp;<strong style='color:#10b981;'>Valid!</strong> board[0][2] = '1'",
                    "&nbsp;&nbsp;<code>solve()</code> → Find next empty (0, 3)",
                    "&nbsp;&nbsp;&nbsp;&nbsp;Try '1': Already 1 in row 0 ❌",
                    "&nbsp;&nbsp;&nbsp;&nbsp;Try '2': Valid! Place and recurse...",
                    "&nbsp;&nbsp;&nbsp;&nbsp;... continues recursively ...",
                    "&nbsp;&nbsp;Eventually hits dead end (no valid digit)",
                    "&nbsp;&nbsp;<strong style='color:#ef4444;'>Backtrack:</strong> board[0][2] = '.'",
                    "&nbsp;&nbsp;<strong style='color:#fbbf24;'>Try '2':</strong> Continue with next digit...",
                    "... continues until solved ...",
                    "<strong>All cells filled:</strong> return True ✅"
                ],
                codeTitle: "Python Solution (Backtracking)",
                code: `def solveSudoku(board):
    """
    Solve Sudoku by filling empty cells with valid digits.
    Time: O(9^M), Space: O(M) where M = empty cells
    """
    
    def is_valid(row, col, digit):
        # Check row
        for c in range(9):
            if board[row][c] == digit:
                return False
        
        # Check column
        for r in range(9):
            if board[r][col] == digit:
                return False
        
        # Check 3x3 box
        box_row = 3 * (row // 3)
        box_col = 3 * (col // 3)
        for i in range(9):
            r = box_row + i // 3
            c = box_col + i % 3
            if board[r][c] == digit:
                return False
        
        return True
    
    def solve():
        # Find next empty cell
        for row in range(9):
            for col in range(9):
                if board[row][col] == '.':
                    # Try each digit 1-9
                    for digit in '123456789':
                        if is_valid(row, col, digit):
                            # Place digit
                            board[row][col] = digit
                            
                            # Recurse
                            if solve():
                                return True  # Solved!
                            
                            # Backtrack
                            board[row][col] = '.'
                    
                    # No valid digit found
                    return False
        
        # No empty cells = solved!
        return True
    
    solve()`,
                codeDetailed: `def solveSudoku_detailed(board):
    """
    SUDOKU SOLVER with Backtracking
    
    STRATEGY:
    1. Find first empty cell ('.')
    2. Try digits 1-9
    3. For each digit, check 3 constraints
    4. If valid, place and recurse
    5. If recursion fails, backtrack (reset to '.')
    6. If no digit works, return False
    7. If no empty cells, puzzle solved!
    
    WHY BACKTRACKING WORKS:
    - We explore all possibilities systematically
    - Early pruning via constraint checks
    - Guaranteed to find solution if exists
    """
    
    def is_valid(row, col, digit):
        """
        Check if placing 'digit' at (row, col) is valid.
        Must check: row, column, and 3x3 box.
        """
        # === CHECK ROW ===
        # Scan all columns in this row
        for c in range(9):
            if board[row][c] == digit:
                return False
        
        # === CHECK COLUMN ===
        # Scan all rows in this column
        for r in range(9):
            if board[r][col] == digit:
                return False
        
        # === CHECK 3x3 BOX ===
        # Find top-left corner of box
        box_row_start = 3 * (row // 3)  # 0, 3, or 6
        box_col_start = 3 * (col // 3)  # 0, 3, or 6
        
        # Check all 9 cells in box
        for delta_row in range(3):
            for delta_col in range(3):
                r = box_row_start + delta_row
                c = box_col_start + delta_col
                if board[r][c] == digit:
                    return False
        
        return True
    
    def solve():
        """
        Main backtracking function.
        Returns True if puzzle solved, False otherwise.
        """
        # Find next empty cell
        for row in range(9):
            for col in range(9):
                if board[row][col] == '.':
                    # Try each digit 1-9
                    for digit in '123456789':
                        if is_valid(row, col, digit):
                            # === PLACE DIGIT ===
                            board[row][col] = digit
                            
                            # === RECURSE ===
                            if solve():
                                return True  # Puzzle solved!
                            
                            # === BACKTRACK ===
                            # Solution not found, undo placement
                            board[row][col] = '.'
                    
                    # Tried all digits, none worked
                    return False
        
        # No empty cells left = puzzle solved!
        return True
    
    solve()

# Optimized version using sets for O(1) lookup:
def solveSudoku_optimized(board):
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    
    # Initialize sets with existing values
    for row in range(9):
        for col in range(9):
            if board[row][col] != '.':
                digit = board[row][col]
                rows[row].add(digit)
                cols[col].add(digit)
                boxes[(row // 3) * 3 + col // 3].add(digit)
    
    def solve():
        for row in range(9):
            for col in range(9):
                if board[row][col] == '.':
                    box_idx = (row // 3) * 3 + col // 3
                    for digit in '123456789':
                        if (digit not in rows[row] and 
                            digit not in cols[col] and 
                            digit not in boxes[box_idx]):
                            # Place
                            board[row][col] = digit
                            rows[row].add(digit)
                            cols[col].add(digit)
                            boxes[box_idx].add(digit)
                            
                            if solve(): return True
                            
                            # Backtrack
                            board[row][col] = '.'
                            rows[row].remove(digit)
                            cols[col].remove(digit)
                            boxes[box_idx].remove(digit)
                    return False
        return True
    
    solve()`
            }
        }
    ]
}
