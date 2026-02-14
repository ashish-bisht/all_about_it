// Auto-generated from data/ folder
// Run `python3 build_data.py` to regenerate
// Source: data/dsa/backtracking.js
// Topic: backtracking

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
                strategy: `<strong>Constraint Satisfaction Strategy:</strong><br><strong>Step 1:</strong> Go row by row (only 1 queen per row).<br><strong>Step 2:</strong> For each column, check O(1) safety using 3 Sets: <code>columns</code>, <code>posDiag (row+col)</code>, <code>negDiag (row-col)</code>.<br><strong>Step 3:</strong> Place queen → add to all 3 sets → recurse next row → remove from sets.<br><br><strong>Why it works:</strong> Row-by-row traversal handles row conflicts automatically. Sets encode column and diagonal attacks for O(1) lookup.`,
                codeDetailed: `def solveNQueens_detailed(n):
    """
    N-QUEENS with 3-Sets O(1) Constraint Check
    
    WHY 3 SETS?
    - Queen attacks: row, column, both diagonals
    - We go row-by-row, so row is automatically unique
    - Need to track: column, ↗ diagonal, ↘ diagonal
    
    DIAGONAL MATH:
    - ↗ diagonal: All cells have same (row + col)
    - ↘ diagonal: All cells have same (row - col)
    """
    columns = set()
    pos_diagonals = set()  # row + col
    neg_diagonals = set()  # row - col
    
    result = []
    queen_positions = [-1] * n
    
    def backtrack(current_row):
        # === BASE CASE ===
        if current_row == n:
            board = []
            for row in range(n):
                col = queen_positions[row]
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
                continue
            if pos_diag in pos_diagonals:
                continue
            if neg_diag in neg_diagonals:
                continue
            
            # === PLACE QUEEN ===
            columns.add(col)
            pos_diagonals.add(pos_diag)
            neg_diagonals.add(neg_diag)
            queen_positions[current_row] = col
            
            # === RECURSE ===
            backtrack(current_row + 1)
            
            # === BACKTRACK ===
            columns.remove(col)
            pos_diagonals.remove(pos_diag)
            neg_diagonals.remove(neg_diag)
    
    backtrack(0)
    return result`
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
</div>`,

                spaceExplainer: `<strong>Space Complexity: O(N)</strong><br><br>
<div style="background:#0f172a; padding:15px; border-radius:8px;">
<table style="width:100%; color:#e2e8f0;">
<tr><td style="padding:8px 0;"><strong style="color:#10b981;">✓ Recursion Stack</strong></td><td>O(N) - depth = N levels</td></tr>
<tr><td style="padding:8px 0;"><strong style="color:#10b981;">✓ In-place Swapping</strong></td><td>O(1) - no extra array!</td></tr>
<tr><td style="padding:8px 0;"><strong style="color:#8b5cf6;">Output (not counted)</strong></td><td>O(N! × N) - result storage</td></tr>
</table>
</div>`,

                visual: `<div style="font-family:monospace; font-size:0.85rem;">
                    <strong style="color:#fbbf24;">🪑 Permutations: "Musical Chairs Swapping"</strong>
                    <div style="background:#1e293b; padding:16px; border-radius:10px; margin:12px 0;">
                        <div style="color:#94a3b8; font-size:0.8rem; margin-bottom:10px;">nums = [1, 2, 3] → "Position 0 pe kaun baithega?"</div>
                        <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap;">
                            <div style="text-align:center;">
                                <div style="color:#4ade80; font-size:0.75rem; margin-bottom:4px;">Swap(0,0)</div>
                                <div style="display:flex; gap:3px;">
                                    <span style="padding:4px 10px; background:rgba(74,222,128,0.3); border:2px solid #4ade80; border-radius:6px; color:#4ade80;">1</span>
                                    <span style="padding:4px 10px; background:#0f172a; border:1px solid #334155; border-radius:6px; color:#cbd5e1;">2</span>
                                    <span style="padding:4px 10px; background:#0f172a; border:1px solid #334155; border-radius:6px; color:#cbd5e1;">3</span>
                                </div>
                            </div>
                            <div style="text-align:center;">
                                <div style="color:#38bdf8; font-size:0.75rem; margin-bottom:4px;">Swap(0,1)</div>
                                <div style="display:flex; gap:3px;">
                                    <span style="padding:4px 10px; background:rgba(56,189,248,0.3); border:2px solid #38bdf8; border-radius:6px; color:#38bdf8;">2</span>
                                    <span style="padding:4px 10px; background:#0f172a; border:1px solid #334155; border-radius:6px; color:#cbd5e1;">1</span>
                                    <span style="padding:4px 10px; background:#0f172a; border:1px solid #334155; border-radius:6px; color:#cbd5e1;">3</span>
                                </div>
                            </div>
                            <div style="text-align:center;">
                                <div style="color:#f87171; font-size:0.75rem; margin-bottom:4px;">Swap(0,2)</div>
                                <div style="display:flex; gap:3px;">
                                    <span style="padding:4px 10px; background:rgba(248,113,113,0.3); border:2px solid #f87171; border-radius:6px; color:#f87171;">3</span>
                                    <span style="padding:4px 10px; background:#0f172a; border:1px solid #334155; border-radius:6px; color:#cbd5e1;">2</span>
                                    <span style="padding:4px 10px; background:#0f172a; border:1px solid #334155; border-radius:6px; color:#cbd5e1;">1</span>
                                </div>
                            </div>
                        </div>
                        <div style="text-align:center; margin-top:8px; color:#94a3b8; font-size:0.75rem;">Then recurse on positions 1, 2... swap back after each!</div>
                    </div>
                    <div style="display:flex; gap:8px;">
                        <div style="flex:1; background:rgba(74,222,128,0.1); padding:8px; border-radius:6px; text-align:center; border-left:3px solid #4ade80;">
                            <div style="color:#4ade80; font-weight:bold; font-size:0.8rem;">1️⃣ SWAP</div>
                        </div>
                        <div style="flex:1; background:rgba(139,92,246,0.1); padding:8px; border-radius:6px; text-align:center; border-left:3px solid #8b5cf6;">
                            <div style="color:#8b5cf6; font-weight:bold; font-size:0.8rem;">2️⃣ RECURSE</div>
                        </div>
                        <div style="flex:1; background:rgba(248,113,113,0.1); padding:8px; border-radius:6px; text-align:center; border-left:3px solid #f87171;">
                            <div style="color:#f87171; font-weight:bold; font-size:0.8rem;">3️⃣ UNSWAP</div>
                        </div>
                    </div>
                </div>`,

                crux: `<strong>The Swap-Recurse-Unswap Pattern:</strong><br><br>
<div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin:15px 0;">
<div style="background:rgba(16,185,129,0.1); padding:15px; border-radius:8px; text-align:center;">
<div style="font-size:1.5rem; margin-bottom:8px;">1️⃣</div>
<strong style="color:#10b981;">SWAP</strong><br>
<code style="font-size:0.8rem;">swap(start, i)</code>
</div>
<div style="background:rgba(139,92,246,0.1); padding:15px; border-radius:8px; text-align:center;">
<div style="font-size:1.5rem; margin-bottom:8px;">2️⃣</div>
<strong style="color:#8b5cf6;">RECURSE</strong><br>
<code style="font-size:0.8rem;">backtrack(start + 1)</code>
</div>
<div style="background:rgba(239,68,68,0.1); padding:15px; border-radius:8px; text-align:center;">
<div style="font-size:1.5rem; margin-bottom:8px;">3️⃣</div>
<strong style="color:#ef4444;">UNSWAP</strong><br>
<code style="font-size:0.8rem;">swap(start, i)</code>
</div>
</div>`,

                trap: `<strong>⚠️ Common Mistakes:</strong><br><br>
<div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); padding:15px; border-radius:8px; margin-bottom:15px;">
<strong style="color:#f87171;">❌ Mistake 1: Bhool gaye copy banana!</strong>
<code style="color:#f87171;">res.append(nums)</code>
<small style="color:gray;">Must use nums[:]!</small>
</div>
<div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); padding:15px; border-radius:8px; margin-bottom:15px;">
<strong style="color:#f87171;">❌ Mistake 2: Forgetting to swap back!</strong>
<small style="color:gray;">Array stays corrupted for other branches</small>
</div>`,

                dryRun: [
                    "<strong>Input:</strong> nums = [1, 2, 3]",
                    "<code>backtrack(0)</code> → Loop i = 0 to 2",
                    "<strong style='color:#10b981;'>i=0:</strong> Swap(0,0) → [1,2,3]",
                    "&nbsp;&nbsp;<code>backtrack(1)</code>...",
                    "&nbsp;&nbsp;Swap back(0,0) → [1,2,3]",
                    "<strong style='color:#fbbf24;'>i=1:</strong> Swap(0,1) → [2,1,3]",
                    "&nbsp;&nbsp;<code>backtrack(1)</code>...",
                    "&nbsp;&nbsp;Swap back(0,1) → [1,2,3]",
                    "..."
                ],
                codeTitle: "Python Solution (Swapping)",
                code: `def permute(nums):
    res = []
    def backtrack(start):
        if start == len(nums):
            res.append(nums[:])
            return
        for i in range(start, len(nums)):
            nums[start], nums[i] = nums[i], nums[start]
            backtrack(start + 1)
            nums[start], nums[i] = nums[i], nums[start]
    backtrack(0)
    return res`,
                strategy: `<strong>Swap-Recurse-Unswap Strategy:</strong><br><strong>Step 1:</strong> Fix position <code>start</code>. Swap each remaining element into that position.<br><strong>Step 2:</strong> Recurse on <code>start+1</code> to fix next position.<br><strong>Step 3:</strong> Swap back to restore array for next iteration.<br><br><strong>Why it works:</strong> In-place swapping avoids needing a visited set. Each swap puts a different element at position <code>start</code>.`,
                codeDetailed: `def permute_detailed(nums):
    """
    Detailed step-by-step explanation
    """
    res = []
    def backtrack(start):
        if start == len(nums):
            res.append(nums[:])
            return
        for i in range(start, len(nums)):
            # SWAP: Try element i at 'start'
            nums[start], nums[i] = nums[i], nums[start]
            
            backtrack(start + 1)
            
            # UNSWAP: Restore for next iteration
            nums[start], nums[i] = nums[i], nums[start]
    backtrack(0)
    return res`
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
                visual: `<div style="font-family:monospace; font-size:0.85rem;">
                    <strong style="color:#a78bfa;">Subsets: "Pick or No-Pick at Each Element"</strong>
                    <div style="background:#1e293b; padding:16px; border-radius:10px; margin:12px 0; text-align:center;">
                        <div style="color:#94a3b8; font-size:0.8rem; margin-bottom:12px;">nums = [1, 2]</div>
                        <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
                            <span style="padding:5px 14px; background:rgba(139,92,246,0.2); border:1px solid #8b5cf6; border-radius:8px; color:#8b5cf6;">[ ]</span>
                            <div style="color:#94a3b8; font-size:0.75rem;">"Element 1 ko LUN ya NA LUN?"</div>
                            <div style="display:flex; gap:60px; margin-top:4px;">
                                <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
                                    <span style="color:#4ade80; font-size:0.7rem;">✓ PICK 1</span>
                                    <span style="padding:4px 10px; background:rgba(74,222,128,0.2); border:1px solid #4ade80; border-radius:6px; color:#4ade80;">[1]</span>
                                    <div style="display:flex; gap:20px; margin-top:4px;">
                                        <div style="text-align:center;"><span style="color:#38bdf8; font-size:0.65rem;">✓ PICK 2</span><br><span style="padding:3px 8px; background:rgba(56,189,248,0.2); border:1px solid #38bdf8; border-radius:4px; color:#38bdf8; font-size:0.8rem;">[1,2]</span></div>
                                        <div style="text-align:center;"><span style="color:#f87171; font-size:0.65rem;">✗ SKIP 2</span><br><span style="padding:3px 8px; background:rgba(248,113,113,0.1); border:1px solid #475569; border-radius:4px; color:#94a3b8; font-size:0.8rem;">[1]</span></div>
                                    </div>
                                </div>
                                <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
                                    <span style="color:#f87171; font-size:0.7rem;">✗ SKIP 1</span>
                                    <span style="padding:4px 10px; background:rgba(248,113,113,0.1); border:1px solid #475569; border-radius:6px; color:#94a3b8;">[ ]</span>
                                    <div style="display:flex; gap:20px; margin-top:4px;">
                                        <div style="text-align:center;"><span style="color:#38bdf8; font-size:0.65rem;">✓ PICK 2</span><br><span style="padding:3px 8px; background:rgba(56,189,248,0.2); border:1px solid #38bdf8; border-radius:4px; color:#38bdf8; font-size:0.8rem;">[2]</span></div>
                                        <div style="text-align:center;"><span style="color:#f87171; font-size:0.65rem;">✗ SKIP 2</span><br><span style="padding:3px 8px; background:rgba(248,113,113,0.1); border:1px solid #475569; border-radius:4px; color:#94a3b8; font-size:0.8rem;">[ ]</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="margin-top:12px; padding:6px; background:rgba(74,222,128,0.1); border-radius:6px;">
                            <span style="color:#4ade80;">Result: [[], [1], [2], [1,2]] → 2² = 4 subsets</span>
                        </div>
                    </div>
                </div>`,
                crux: `<strong>The Pick/No-Pick Pattern:</strong><br>
For each element, two recursive calls:<br>
1. Pick it, recurse i+1<br>
2. Don't pick it, recurse i+1`,
                trap: `<strong>❌ Common Bug: Not Copying Path</strong><br>
Must use <code>res.append(path[:])</code>!`,
                dryRun: [
                    "<strong>Input:</strong> [1,2]",
                    "root: []",
                    "PICK 1: [1] -> PICK 2: [1,2] -> Done",
                    "            -> SKIP 2: [1] -> Done",
                    "SKIP 1: []  -> PICK 2: [2] -> Done",
                    "            -> SKIP 2: [] -> Done"
                ],
                codeTitle: "Python Solution (Pick/No-Pick)",
                code: `def subsets(nums):
    res = []
    def backtrack(i, path):
        if i == len(nums):
            res.append(path[:])
            return
        
        # PICK
        path.append(nums[i])
        backtrack(i + 1, path)
        path.pop()
        
        # NO-PICK
        backtrack(i + 1, path)
        
    backtrack(0, [])
    return res`,
                strategy: `<strong>Pick/No-Pick Strategy:</strong><br><strong>Step 1:</strong> At each element, make TWO recursive calls.<br><strong>Step 2:</strong> PICK: append element, recurse <code>i+1</code>, then pop (backtrack).<br><strong>Step 3:</strong> NO-PICK: just recurse <code>i+1</code> without the element.<br><br><strong>Why it works:</strong> Binary decision tree generates all 2^N subsets. Every leaf node is a valid subset.`,
                codeDetailed: `def subsets_detailed(nums):
    res = []
    def backtrack(i, path):
        if i == len(nums):
            res.append(path[:]) # COPY!
            return
        
        # PICK
        path.append(nums[i])
        backtrack(i + 1, path)
        path.pop()
        
        # NO-PICK
        backtrack(i + 1, path)
    
    backtrack(0, [])
    return res`
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
                    "res = []",
                    "def backtrack(start, path, remain):",
                    "    if remain == 0:                # 🎯 Found valid combination!",
                    "        res.append(path[:])",
                    "        return",
                    "    for i in range(start, len(cand)):",
                    "        if cand[i] > remain: break # ⚡ Pruning (sorted array)",
                    "        path.append(cand[i])       # 🔄 Include",
                    "        backtrack(i, path, remain - cand[i]) # ✅ i not i+1 (reuse allowed)",
                    "        path.pop()                 # 💡 Backtrack"
                ],
                metrics: { time: "O(N^(T/M))", space: "O(T/M)" },
                timeExplainer: `<strong>Time: O(N^(T/M))</strong><br>
Max depth = Target / Min_Element (T/M)`,
                spaceExplainer: `<strong>Space: O(T/M)</strong><br>
Recursion depth + path storage`,
                visual: `
                    <h4 style="color:#c026d3;">🪙 Unlimited Coins: Stay vs Move</h4>
                    <div style="display:flex; flex-direction:column; gap:12px; margin:15px 0; max-width:550px;">
                        <div style="background:#1e293b; padding:16px; border-radius:12px; text-align:center;">
                            <div style="font-size:0.85rem; color:#94a3b8; margin-bottom:10px;">Target = 7, Candidates = [2, 3, 6, 7]</div>
                            <div style="font-family:monospace; font-size:0.82rem; line-height:2.2; color:#cbd5e1;">
                                <span style="color:#fbbf24;">backtrack(i=0, sum=0)</span><br>
                                <span style="color:#94a3b8;">├── </span><span style="color:#4ade80;">PICK 2 → backtrack(i=0, sum=2)</span> <span style="color:#64748b;">← stay at i!</span><br>
                                <span style="color:#94a3b8;">│   ├── </span><span style="color:#4ade80;">PICK 2 → (i=0, sum=4)</span><br>
                                <span style="color:#94a3b8;">│   │   ├── </span><span style="color:#4ade80;">PICK 2 → (i=0, sum=6)</span><br>
                                <span style="color:#94a3b8;">│   │   │   └── </span><span style="color:#f87171;">sum=8 > 7 ✗</span><br>
                                <span style="color:#94a3b8;">│   │   └── </span><span style="color:#38bdf8;">PICK 3 → (i=1, sum=7) ✅</span><br>
                                <span style="color:#94a3b8;">└── </span><span style="color:#a78bfa;">SKIP → backtrack(i=1, sum=0)</span> <span style="color:#64748b;">← move to next</span>
                            </div>
                        </div>
                        <div style="display:flex; gap:10px; justify-content:center; font-size:0.82rem;">
                            <span style="background:rgba(74,222,128,0.1); border:1px solid rgba(74,222,128,0.3); padding:6px 12px; border-radius:6px; color:#4ade80;">PICK: backtrack(i, ...)</span>
                            <span style="background:rgba(167,139,250,0.1); border:1px solid rgba(167,139,250,0.3); padding:6px 12px; border-radius:6px; color:#a78bfa;">SKIP: backtrack(i+1, ...)</span>
                        </div>
                    </div>`,
                crux: `<strong>Stay vs Move:</strong><br>
PICK: <code>backtrack(i, ...)</code> (Stay for reuse)<br>
SKIP: <code>backtrack(i+1, ...)</code> (Move on)`,
                trap: `<strong>Infinite Recursion:</strong><br>
Must check <code>if sum > target</code> and ensure numbers are positive!`,
                dryRun: ["Detailed dry run..."],
                codeTitle: "Python Solution (Unbounded)",
                code: `def combinationSum(candidates, target):
    res = []
    def backtrack(i, path, total):
        if total == target:
            res.append(path[:])
            return
        if i >= len(candidates) or total > target:
            return
        
        # PICK (Stay at i)
        path.append(candidates[i])
        backtrack(i, path, total + candidates[i])
        path.pop()
        
        # SKIP (Move to i+1)
        backtrack(i + 1, path, total)
        
    backtrack(0, [], 0)
    return res`,
                strategy: `<strong>Unbounded Knapsack Strategy:</strong><br><strong>Step 1:</strong> Sort candidates for pruning. Loop from <code>start</code>.<br><strong>Step 2:</strong> PICK: recurse with SAME index <code>i</code> (reuse allowed). SKIP: move to <code>i+1</code>.<br><strong>Step 3:</strong> Prune: if <code>candidates[i] > remain</code>, break (sorted = all future elements too big).<br><br><strong>Key difference from Subsets:</strong> PICK stays at <code>i</code>, not <code>i+1</code>.`,
                codeDetailed: `def combinationSum_detailed(candidates, target):
    """
    Key difference: Recurse with 'i' to allow reuse
    """
    res = []
    def backtrack(i, path, total):
        if total == target:
            res.append(path[:])
            return
        if i >= len(candidates) or total > target:
            return
        
        path.append(candidates[i])
        backtrack(i, path, total + candidates[i]) # Stay at i
        path.pop()
        
        backtrack(i + 1, path, total) # Move to i+1
        
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
                timeExplainer: `<strong>Time: O(M×N × 3^L)</strong><br>
Start from any cell (M*N). Branching factor 3 (except first step).`,
                spaceExplainer: `<strong>Space: O(L)</strong><br>
Recursion depth = Length of word`,
                visual: `
                    <h4 style="color:#c026d3;">🐍 Snake Path: Mark → Explore → Unmark</h4>
                    <div style="display:flex; flex-direction:column; gap:12px; margin:15px 0; max-width:550px;">
                        <div style="display:flex; flex-wrap:wrap; gap:15px; justify-content:center;">
                            <div>
                                <div style="text-align:center; font-size:0.8rem; color:#94a3b8; margin-bottom:5px;">Step 1: Find 'A'</div>
                                <div style="display:grid; grid-template-columns:repeat(4, 36px); gap:2px; background:#334155; padding:2px; border-radius:4px;">
                                    <div style="background:#7f1d1d; height:36px; display:flex; align-items:center; justify-content:center; color:#fbbf24; font-weight:bold; border:2px solid #f87171;">A</div>
                                    <div style="background:#1e293b; height:36px; display:flex; align-items:center; justify-content:center; color:#94a3b8;">B</div>
                                    <div style="background:#1e293b; height:36px; display:flex; align-items:center; justify-content:center; color:#94a3b8;">C</div>
                                    <div style="background:#1e293b; height:36px; display:flex; align-items:center; justify-content:center; color:#94a3b8;">E</div>
                                    <div style="background:#1e293b; height:36px; display:flex; align-items:center; justify-content:center; color:#94a3b8;">S</div>
                                    <div style="background:#1e293b; height:36px; display:flex; align-items:center; justify-content:center; color:#94a3b8;">F</div>
                                    <div style="background:#1e293b; height:36px; display:flex; align-items:center; justify-content:center; color:#94a3b8;">C</div>
                                    <div style="background:#1e293b; height:36px; display:flex; align-items:center; justify-content:center; color:#94a3b8;">S</div>
                                    <div style="background:#1e293b; height:36px; display:flex; align-items:center; justify-content:center; color:#94a3b8;">A</div>
                                    <div style="background:#1e293b; height:36px; display:flex; align-items:center; justify-content:center; color:#94a3b8;">D</div>
                                    <div style="background:#1e293b; height:36px; display:flex; align-items:center; justify-content:center; color:#94a3b8;">E</div>
                                    <div style="background:#1e293b; height:36px; display:flex; align-items:center; justify-content:center; color:#94a3b8;">E</div>
                                </div>
                            </div>
                            <div style="display:flex; align-items:center; color:#64748b;">➞</div>
                            <div>
                                <div style="text-align:center; font-size:0.8rem; color:#94a3b8; margin-bottom:5px;">Found "ABCE" ✅</div>
                                <div style="display:grid; grid-template-columns:repeat(4, 36px); gap:2px; background:#334155; padding:2px; border-radius:4px;">
                                    <div style="background:#14532d; height:36px; display:flex; align-items:center; justify-content:center; color:#4ade80; font-weight:bold;">A</div>
                                    <div style="background:#14532d; height:36px; display:flex; align-items:center; justify-content:center; color:#4ade80; font-weight:bold;">B</div>
                                    <div style="background:#14532d; height:36px; display:flex; align-items:center; justify-content:center; color:#4ade80; font-weight:bold;">C</div>
                                    <div style="background:#14532d; height:36px; display:flex; align-items:center; justify-content:center; color:#4ade80; font-weight:bold;">E</div>
                                    <div style="background:#1e293b; height:36px; display:flex; align-items:center; justify-content:center; color:#94a3b8;">S</div>
                                    <div style="background:#1e293b; height:36px; display:flex; align-items:center; justify-content:center; color:#94a3b8;">F</div>
                                    <div style="background:#1e293b; height:36px; display:flex; align-items:center; justify-content:center; color:#94a3b8;">C</div>
                                    <div style="background:#1e293b; height:36px; display:flex; align-items:center; justify-content:center; color:#94a3b8;">S</div>
                                    <div style="background:#1e293b; height:36px; display:flex; align-items:center; justify-content:center; color:#94a3b8;">A</div>
                                    <div style="background:#1e293b; height:36px; display:flex; align-items:center; justify-content:center; color:#94a3b8;">D</div>
                                    <div style="background:#1e293b; height:36px; display:flex; align-items:center; justify-content:center; color:#94a3b8;">E</div>
                                    <div style="background:#1e293b; height:36px; display:flex; align-items:center; justify-content:center; color:#94a3b8;">E</div>
                                </div>
                            </div>
                        </div>
                        <div style="background:#0f172a; padding:12px; border-radius:8px;">
                            <div style="display:grid; grid-template-columns:24px 1fr; gap:6px; font-size:0.82rem; color:#cbd5e1;">
                                <span style="color:#fbbf24;">1.</span><span><strong style="color:#f87171;">MARK</strong> cell as '#' (visited)</span>
                                <span style="color:#fbbf24;">2.</span><span><strong style="color:#4ade80;">EXPLORE</strong> 4 directions recursively</span>
                                <span style="color:#fbbf24;">3.</span><span><strong style="color:#38bdf8;">UNMARK</strong> cell back to original (backtrack!)</span>
                            </div>
                        </div>
                    </div>`,
                crux: `<strong>Mark-Explore-Unmark:</strong><br>
1. MARK board[r][c] = '#'<br>
2. EXPLORE 4 directions<br>
3. UNMARK board[r][c] = original`,
                trap: `<strong>Forgetting to Unmark:</strong><br>
If you don't unmark, other paths can't use this cell!`,
                dryRun: ["Dry run steps..."],
                codeTitle: "Python Solution (Grid DFS)",
                code: `def exist(board, word):
    R, C = len(board), len(board[0])
    def dfs(r, c, i):
        if i == len(word): return True
        if (r < 0 or r >= R or c < 0 or c >= C or
            board[r][c] != word[i]):
            return False
            
        temp = board[r][c]
        board[r][c] = '#'
        res = (dfs(r+1,c,i+1) or dfs(r-1,c,i+1) or
               dfs(r,c+1,i+1) or dfs(r,c-1,i+1))
        board[r][c] = temp
        return res

    for r in range(R):
        for c in range(C):
            if dfs(r, c, 0): return True
    return False`,
                strategy: `<strong>Grid DFS + Mark/Unmark Strategy:</strong><br><strong>Step 1:</strong> Try every cell as starting point.<br><strong>Step 2:</strong> DFS: check bounds, check char match, mark cell as <code>'#'</code> (visited).<br><strong>Step 3:</strong> Explore 4 directions. If any returns True, short-circuit return True.<br><strong>Step 4:</strong> UNMARK cell (restore original char) for other paths.<br><br><strong>Why mark/unmark:</strong> Prevents revisiting same cell in one path, but allows it for different starting paths.`,
                codeDetailed: `def exist_detailed(board, word):
    """
    Grid DFS with backtracking
    """
    R, C = len(board), len(board[0])
    def dfs(r, c, i):
        if i == len(word): return True
        if r < 0 or r >= R or c < 0 or c >= C or board[r][c] != word[i]:
            return False
            
        # MARK
        temp = board[r][c]
        board[r][c] = '#'
        
        # EXPLORE
        res = (dfs(r+1,c,i+1) or dfs(r-1,c,i+1) or
               dfs(r,c+1,i+1) or dfs(r,c-1,i+1))
               
        # UNMARK
        board[r][c] = temp
        return res

    for r in range(R):
        for c in range(C):
            if dfs(r, c, 0): return True
    return False`
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

                visual: `<div style="font-family:monospace; font-size:0.85rem;">
                    <strong style="color:#fbbf24;">🔢 Sudoku: "3-Constraint Backtracking"</strong>
                    <div style="background:#1e293b; padding:16px; border-radius:10px; margin:12px 0;">
                        <div style="color:#94a3b8; font-size:0.8rem; margin-bottom:10px;">Filling cell (0,2): which digits are valid?</div>
                        <div style="display:grid; grid-template-columns:repeat(3, 36px); gap:2px; width:fit-content; margin:0 auto 12px;">
                            <div style="height:36px; display:flex; align-items:center; justify-content:center; background:rgba(139,92,246,0.2); border:1px solid #8b5cf6; border-radius:4px; color:#8b5cf6; font-weight:bold;">5</div>
                            <div style="height:36px; display:flex; align-items:center; justify-content:center; background:rgba(139,92,246,0.2); border:1px solid #8b5cf6; border-radius:4px; color:#8b5cf6; font-weight:bold;">3</div>
                            <div style="height:36px; display:flex; align-items:center; justify-content:center; background:rgba(74,222,128,0.2); border:2px solid #4ade80; border-radius:4px; color:#4ade80; font-weight:bold;">?</div>
                            <div style="height:36px; display:flex; align-items:center; justify-content:center; background:#0f172a; border:1px solid #334155; border-radius:4px; color:#475569;">6</div>
                            <div style="height:36px; display:flex; align-items:center; justify-content:center; background:#0f172a; border:1px solid #334155; border-radius:4px; color:#475569;">.</div>
                            <div style="height:36px; display:flex; align-items:center; justify-content:center; background:#0f172a; border:1px solid #334155; border-radius:4px; color:#475569;">.</div>
                            <div style="height:36px; display:flex; align-items:center; justify-content:center; background:#0f172a; border:1px solid #334155; border-radius:4px; color:#475569;">.</div>
                            <div style="height:36px; display:flex; align-items:center; justify-content:center; background:#0f172a; border:1px solid #334155; border-radius:4px; color:#475569;">9</div>
                            <div style="height:36px; display:flex; align-items:center; justify-content:center; background:#0f172a; border:1px solid #334155; border-radius:4px; color:#475569;">8</div>
                        </div>
                        <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">
                            <span style="padding:3px 10px; background:rgba(248,113,113,0.1); border:1px solid #f87171; border-radius:4px; color:#f87171; font-size:0.75rem;">Row: ✗ 5,3</span>
                            <span style="padding:3px 10px; background:rgba(248,113,113,0.1); border:1px solid #f87171; border-radius:4px; color:#f87171; font-size:0.75rem;">Col: ✗ 8</span>
                            <span style="padding:3px 10px; background:rgba(248,113,113,0.1); border:1px solid #f87171; border-radius:4px; color:#f87171; font-size:0.75rem;">Box: ✗ 5,3,6,9</span>
                        </div>
                        <div style="margin-top:8px; text-align:center;">
                            <span style="padding:3px 12px; background:rgba(74,222,128,0.1); border:1px solid #4ade80; border-radius:4px; color:#4ade80;">Valid: {1, 2, 4, 7} → Try each, backtrack if fail</span>
                        </div>
                    </div>
                    <div style="background:#0f172a; padding:10px; border-radius:6px;">
                        <div style="color:#fbbf24;">Box index = (r//3)*3 + (c//3)</div>
                        <div style="color:#94a3b8;">Place → Recurse → fail? Reset to '.' → try next digit</div>
                    </div>
                </div>`,

                crux: `<strong>The 3-Constraint Check Pattern:</strong><br><br>
<div style="background:#0f172a; padding:15px; border-radius:8px;">
<strong style="color:#fbbf24;">For any cell (r, c), check 3 things:</strong><br>
1. <strong>Row:</strong> Is digit already in <code>board[r]</code>?<br>
2. <strong>Col:</strong> Is digit already in <code>board[:][c]</code>?<br>
3. <strong>Box:</strong> Is digit already in 3×3 box?
</div>

<div style="background:rgba(16,185,129,0.1); padding:12px; border-radius:8px; margin-top:10px;">
<strong style="color:#10b981;">💡 Box Formula:</strong><br>
<code>idx = (r // 3) * 3 + (c // 3)</code><br>
Use this to map (0..8, 0..8) to Box 0..8
</div>`,

                trap: `<strong>⚠️ Common Mistakes:</strong><br><br>
<div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); padding:15px; border-radius:8px; margin-bottom:15px;">
<strong style="color:#f87171;">❌ Mistake: Forgetting to Backtrack (Reset to '.')</strong><br>
<code style="color:#fbbf24;">board[r][c] = digit</code> ✅<br>
<code style="color:#f87171;">if solve(): return True</code><br>
<code style="color:#fbbf24;">board[r][c] = '.'  # MUST DO THIS!</code><br>
<small style="color:gray;">If recursion fails, you must clear the cell so other branches can try.</small>
</div>`,

                dryRun: [
                    "<strong>Input:</strong> Partial Board",
                    "1. Find first empty cell: (0, 2)",
                    "2. Try '1': Row 0 has '1'? No. Col 2 has '1'? Yes. ❌ Skip.",
                    "3. Try '2': Row 0 has '2'? Yes. ❌ Skip.",
                    "4. Try '4': Safe! ✅ Place '4'.",
                    "   Recursion: Find next empty cell...",
                    "   ...If recursion returns False (dead end):",
                    "   Reset (0, 2) to '.'",
                    "5. Try '5': ..."
                ],
                codeTitle: "Python Solution (Backtracking)",
                code: `def solveSudoku(board):
    """
    Solve Sudoku by filling empty cells.
    Time: O(9^M), Space: O(M)
    """
    def is_valid(row, col, char):
        for i in range(9):
            if board[row][i] == char: return False
            if board[i][col] == char: return False
            if board[3*(row//3) + i//3][3*(col//3) + i%3] == char: 
                return False
        return True

    def solve():
        for r in range(9):
            for c in range(9):
                if board[r][c] == ".":
                    # Try digits 1-9
                    for char in "123456789":
                        if is_valid(r, c, char):
                            board[r][c] = char
                            if solve(): return True
                            board[r][c] = "."  # Backtrack
                    return False
        return True
        
    solve()`,
                strategy: `<strong>Cell-by-Cell Constraint Strategy:</strong><br><strong>Step 1:</strong> Find next empty cell (scan row by row).<br><strong>Step 2:</strong> Try digits 1–9. Check validity using row, column, and 3×3 box constraints.<br><strong>Step 3:</strong> Place digit → recurse → if fails, remove digit (backtrack).<br><strong>Step 4:</strong> If no digit works, return False (triggers backtrack in parent).<br><br><strong>Why it works:</strong> Exhaustive search with constraint pruning. Guarantees finding a solution if one exists.`,
                codeDetailed: `def solveSudoku_detailed(board):
    """
    SUDOKU SOLVER with Backtracking
    """
    def is_valid(row, col, digit):
        # Check row
        for i in range(9):
            if board[row][i] == digit: return False
        # Check col
        for i in range(9):
            if board[i][col] == digit: return False
        # Check box
        box_r = (row // 3) * 3
        box_c = (col // 3) * 3
        for i in range(3):
            for j in range(3):
                if board[box_r + i][box_c + j] == digit: return False
        return True

    def solve():
        for r in range(9):
            for c in range(9):
                if board[r][c] == ".":
                    for char in "123456789":
                        if is_valid(r, c, char):
                            board[r][c] = char
                            if solve(): return True
                            board[r][c] = "."
                    return False
        return True

    solve()`
            }
        }
    ]
}

window.currentTopicData = topic_backtracking;
