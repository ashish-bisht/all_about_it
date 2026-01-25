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
        }
    ]
}
