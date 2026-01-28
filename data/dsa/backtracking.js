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
            { label: "Find ALL", desc: "Combinations, Permutations, Subsets." },
            { label: "Constraints", desc: "N is small (<= 20)." }
        ],
        safetyCheck: [
            { label: "Reference Bug", desc: "Use `res.append(path[:])` (Copy)." },
            { label: "Undo Step", desc: "Always backtrack: `path.pop()` after recursion." }
        ]
    },
    questions: [
        {
            id: "n-queens",
            title: "N-Queens",
            leetcodeUrl: "https://leetcode.com/problems/n-queens/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Classic Backtracking"],
            quiz: {
                description: "Place N queens safely. Optimized check?",
                options: ["Loop to check attacks", "3 Sets (cols, diag+, diag-)", "Bitmasking", "Random"],
                correct: 1,
                explanation: "3 Sets! Track occupied Columns, Pos Diagonals (r+c), and Neg Diagonals (r-c). O(1) safety check."
            },
            learn: {
                metrics: { time: "O(N!)", space: "O(N)" },
                timeExplainer: "<strong>Backtracking:</strong><br>• 1st row: N choice<br>• 2nd row: N-2 choice...<br>• Upper bound <code>N!</code><br><br><strong>Total:</strong> <code>O(N!)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• 3 Sets for constraints: <code>O(N)</code><br>• Recursion Stack: <code>O(N)</code><br><br><strong>Result:</strong> <code>O(N)</code>",
                visual: "<span><strong>Visual: Laser Beams</strong><br>Sets block vertical and diagonal lines.</span>",
                crux: "<strong>Pattern:</strong> Loop cols in current row.<br>1. Check safe (Sets).<br>2. Add to Sets. Recurse.<br>3. Remove from Sets (Backtrack).",
                trap: "<strong>Diagonal Math:</strong> PosDiag = r+c. NegDiag = r-c.",
                dryRun: ["Row 0, Col 0. Safe. Recurse Row 1.", "Row 1, Col 0 (Col Block). Col 1 (Diag Block)..."],
                codeTitle: "Python Solution",
                code: `def solveNQueens(n):
cols = set()
posDiag = set() # r+c
negDiag = set() # r-c
res = []
board = [-1]*n # row -> col mapping

def backtrack(r):
    if r == n:
        # Build string board
        temp = []
        for i in range(n):
            line = "." * board[i] + "Q" + "." * (n - board[i] - 1)
            temp.append(line)
        res.append(temp)
        return

    for c in range(n):
        if c in cols or (r+c) in posDiag or (r-c) in negDiag:
            continue
        
        cols.add(c); posDiag.add(r+c); negDiag.add(r-c)
        board[r] = c
        
        backtrack(r + 1)
        
        cols.remove(c); posDiag.remove(r+c); negDiag.remove(r-c)
        
backtrack(0)
return res`
            }
        },
        {
            id: "permutations",
            title: "Permutations",
            difficulty: "Good to Do",
            priority: "🟢",
            tags: ["Swapping"],
            quiz: {
                description: "Generate all permutations of [1,2,3].",
                options: ["Iterative", "Backtracking with 'visited' set", "Backtracking with Swapping", "All"],
                correct: 2,
                explanation: "Swapping is space efficient! Swap `nums[start]` with `nums[i]`, recurse, then Swap Back (Backtrack)."
            },
            learn: {
                metrics: { time: "O(N * N!)", space: "O(N)" },
                timeExplainer: "<strong>Permutations:</strong><br>• <code>N!</code> permutations<br>• Each takes <code>O(N)</code> to copy<br><br><strong>Total:</strong> <code>O(N × N!)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Recursion Stack: <code>O(N)</code><br>• Output list size: <code>N!</code><br><br><strong>Result:</strong> <code>O(N)</code> aux",
                visual: "<span><strong>Visual: Shuffling Chairs</strong><br>Fix 1st pos, shuffle rest. Then swap and repeat.</span>",
                crux: "<strong>Swap Pattern:</strong><br>1. Loop `i` from `start` to `end`.<br>2. Swap `nums[start], nums[i]`.<br>3. Recurse `start + 1`.<br>4. Swap back.",
                trap: "<strong>Copy Ref:</strong> `res.append(nums[:])` is mandatory.",
                dryRun: ["Start=0. Swap(0,0). [1,2,3]. Recurse 1.", "Start=1. Swap(1,1). [1,2,3]. Recurse 2. Append.", "Backtrack. Swap(1,2). [1,3,2]."],
                codeTitle: "Python Solution",
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
return res`
            }
        },
        {
            id: "subsets",
            title: "Subsets",
            leetcodeUrl: "https://leetcode.com/problems/subsets/",
            difficulty: "Good to Do",
            priority: "🟡",
            tags: ["Pick/No-Pick"],
            quiz: {
                description: "Generate power set. Core decision?",
                options: ["Loop n times", "Include or Exclude current element", "Swap adjacent", "Bit manipulation only"],
                correct: 1,
                explanation: "Pick/No-Pick! For every element, you have 2 choices: Include it in current subset OR Skip it. 2^N total."
            },
            learn: {
                metrics: { time: "O(2^N)", space: "O(N)" },
                timeExplainer: "<strong>Exponential:</strong><br>• Each element has 2 choices (Yes/No)<br>• Total <code>2^N</code> subsets<br>• Copying takes O(N)<br><br><strong>Total:</strong> <code>O(N × 2^N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Stack depth: <code>O(N)</code><br>• Result size: <code>2^N</code><br><br><strong>Aux:</strong> <code>O(N)</code>",
                visual: "<span><strong>Visual: The Fork</strong><br>At index i: Left Path (Include), Right Path (Exclude).</span>",
                crux: "<strong>Pattern:</strong> `dfs(i, current_path)`<br>1. Include `nums[i]` -> Recurse `i+1`<br>2. Exclude `nums[i]` (Pop) -> Recurse `i+1`",
                trap: "<strong>Base Case:</strong> Add to results at START of function, because every node in decision tree is a valid subset.",
                dryRun: ["dfs(0, []). Add [].", "Include 1. dfs(1, [1]). Add [1].", "Exclude 1. dfs(1, [])..."],
                codeTitle: "Python Solution",
                code: `def subsets(nums):
    res = []
    def backtrack(i, path):
        if i == len(nums):
            res.append(path[:])
            return
        
        # Choice 1: Include
        path.append(nums[i])
        backtrack(i + 1, path)
        
        # Choice 2: Exclude (Backtrack)
        path.pop()
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
            tags: ["Unbounded Knapsack"],
            quiz: {
                description: "Reuse elements allowed. How to handle logic?",
                options: ["Pass index i+1", "Pass index i (Stay)", "Use a set", "Sort array"],
                correct: 1,
                explanation: "Pass `i`! Since we can reuse the same element, we recurse with the SAME index. Only increment when we choose to SKIP."
            },
            learn: {
                metrics: { time: "O(2^T)", space: "O(T)" },
                timeExplainer: "<strong>Branching Factor:</strong><br>• Depends on Target T and min(candidates)<br>• Roughly O(Candidates ^ (T/min))",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Recursion depth = Max number of elements in sum (T/min)",
                visual: "<span><strong>Visual: Infinite Supply</strong><br>You can grab the same coin multiple times until you bust (sum > target).</span>",
                crux: "<strong>Reuse Pattern:</strong><br>• Include: `dfs(i, current_sum + nums[i])` (Stay at `i`)<br>• Skip: `dfs(i + 1, current_sum)`",
                trap: "<strong>Negative Numbers:</strong> If candidates had negatives, this would infinite loop!",
                dryRun: ["Target=7. Cands=[2,3].", "Use 2. Rem=5. Recurse(i=0).", "Use 2. Rem=3. ..."],
                codeTitle: "Python Solution",
                code: `def combinationSum(candidates, target):
    res = []
    def backtrack(i, cur, total):
        if total == target:
            res.append(cur.copy())
            return
        if i >= len(candidates) or total > target:
            return
            
        # Choice 1: Include (Reuse i)
        cur.append(candidates[i])
        backtrack(i, cur, total + candidates[i])
        
        # Choice 2: Skip (Move to i+1)
        cur.pop()
        backtrack(i + 1, cur, total)
        
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
            tags: ["Grid DFS"],
            quiz: {
                description: "Find string in grid (adjacent cells). Constraint?",
                options: ["Any cell can be used twice", "Visited cells cannot be reused in current path", "Diagonals allowed", "Only right/down"],
                correct: 1,
                explanation: "Path constraint! You cannot visit the same cell twice IN THE SAME PATH. Mark visited, recurse, then unmark (backtrack)."
            },
            learn: {
                metrics: { time: "O(N*M * 4^L)", space: "O(L)" },
                timeExplainer: "<strong>DFS from Every Cell:</strong><br>• N*M starting points<br>• 4 directions<br>• Depth L (word len)<br><br><strong>Total:</strong> <code>O(N×M × 3^L)</code> (3 dirs effectively)",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Recursion stack depth = L (Length of word)",
                visual: "<span><strong>Visual: The Snake</strong><br>The snake crawls on the grid. If it hits a dead end, it retreats (undoes move).</span>",
                crux: "<strong>Grid Backtracking:</strong><br>1. Check boundaries & match.<br>2. Mark `#` (visited).<br>3. Explore 4 dirs.<br>4. AES: Restore original char.",
                trap: "<strong>Early Exit:</strong> If ANY direction implies True, return True immediately. Don't explore others.",
                dryRun: ["Grid 'A','B'. Target 'AB'.", "dfs(0,0) matches 'A'. Mark '#'.", "dfs(0,1) matches 'B'. Valid!"],
                codeTitle: "Python Solution",
                code: `def exist(board, word):
    ROWS, COLS = len(board), len(board[0])
    
    def dfs(r, c, i):
        if i == len(word): return True
        if (r < 0 or c < 0 or r >= ROWS or c >= COLS or 
            board[r][c] != word[i]):
            return False
            
        temp = board[r][c]
        board[r][c] = "#" # Mark
        
        res = (dfs(r+1, c, i+1) or dfs(r-1, c, i+1) or
               dfs(r, c+1, i+1) or dfs(r, c-1, i+1))
               
        board[r][c] = temp # Unmark
        return res
        
    for r in range(ROWS):
        for c in range(COLS):
            if dfs(r, c, 0): return True
    return False`
            }
        },
        {
            id: "sudoku-solver",
            title: "Sudoku Solver",
            leetcodeUrl: "https://leetcode.com/problems/sudoku-solver/",
            difficulty: "Bonus",
            priority: "🟢",
            tags: ["Hard"],
            quiz: {
                description: "Fill 9x9 grid. How to optimize?",
                options: ["Try 1-9 sequentially", "Constraint Propagation", "Random Guessing", "Genetic Algo"],
                correct: 0,
                explanation: "Backtracking! Find empty cell. Try 1-9. Check validity (Row, Col, 3x3 Box). If valid, recurse. If stuck, backtrack."
            },
            learn: {
                metrics: { time: "O(9^M)", space: "O(M)" },
                timeExplainer: "<strong>Exponential:</strong><br>• M empty cells<br>• 9 choices each<br><br><strong>Worst Case:</strong> NP-Complete.",
                spaceExplainer: "<strong>Space:</strong> Recursion depth M (number of empty cells).",
                visual: "<span><strong>Visual: Filling the Void</strong><br>Place 1. Stuck? Change to 2. Stuck? Change to 3...</span>",
                crux: "<strong>Validity Check:</strong><br>• Row `board[r][c]`<br>• Col `board[r][c]`<br>• Box `3*(r//3) + c//3`",
                trap: "<strong>Return Value:</strong> Must return `True` when solved to stop other branches from overwriting solution!",
                dryRun: ["Find empty (0,2).", "Try '1'. Check rules. OK. Recurse.", "Downstream fails? Change '1' to '2'."],
                codeTitle: "Python Solution",
                code: `def solveSudoku(board):
    def isValid(r, c, k):
        for i in range(9):
            if board[r][i] == k: return False
            if board[i][c] == k: return False
            if board[3*(r//3) + i//3][3*(c//3) + i%3] == k: return False
        return True

    def solve():
        for r in range(9):
            for c in range(9):
                if board[r][c] == ".":
                    for k in "123456789":
                        if isValid(r, c, k):
                            board[r][c] = k
                            if solve(): return True
                            board[r][c] = "."
                    return False
        return True # Solved
    solve()`
            }
        }
    ]
}
