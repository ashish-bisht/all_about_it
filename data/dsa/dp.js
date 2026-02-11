// Dp data
// Extracted from data.js

const topic_dp = {
    id: "dp",
    title: "Dynamic Programming",
    description: "Principal Engineer DSA • Day 7",
    color: "#ec4899",
    icon: "fas fa-braille",
    mentalModel: {
        whenToApply: [
            { label: "🔄 Overlapping Subproblems", desc: "Same small problem solved repeatedly → Memoize it!" },
            { label: "🏗️ Optimal Substructure", desc: "Optimal solution built from optimal sub-solutions" },
            { label: "📊 Counting Ways", desc: "How many ways to reach X? → DP addition" },
            { label: "⚖️ Optimization", desc: "Min/Max value? → DP with min()/max()" },
            { label: "✅ Decision Making", desc: "Take or skip? → Compare both choices" }
        ],
        patterns: [
            { algo: "1D Linear", use: "House Robber, Climbing Stairs", time: "O(N)", space: "O(1)", template: "dp[i] = f(dp[i-1], dp[i-2])" },
            { algo: "0/1 Knapsack", use: "Subset Sum, Partition Equal", time: "O(N×W)", space: "O(W)", template: "Take: dp[j-w]+v, Skip: dp[j]" },
            { algo: "Unbounded Knapsack", use: "Coin Change, Rod Cutting", time: "O(N×W)", space: "O(W)", template: "for coin: dp[j] = min(dp[j], dp[j-coin]+1)" },
            { algo: "LCS/LIS", use: "Longest Common/Increasing", time: "O(N²) or O(N log N)", space: "O(N)", template: "match: dp[i-1][j-1]+1, else: max(skip)" },
            { algo: "Grid DP", use: "Unique Paths, Min Path Sum", time: "O(M×N)", space: "O(N)", template: "dp[i][j] = f(dp[i-1][j], dp[i][j-1])" },
            { algo: "Interval DP", use: "Burst Balloons, MCM", time: "O(N³)", space: "O(N²)", template: "for len, for i, for k in (i,j)" }
        ],
        decisionTree: `
<div style="background:#1e293b; padding:25px; border-radius:16px; margin:15px 0; border:1px solid rgba(255,255,255,0.1);">
<h4 style="color:#a78bfa; margin-bottom:20px; text-align:center; font-size:1.1rem;">🧠 DP Pattern Recognition (Recursive Thinking)</h4>
<div style="font-family:monospace; font-size:0.85rem; line-height:1.8;">
<pre style="color:#e2e8f0; text-align:left; margin:0;">
              ┌──────────────────────────────┐
              │ "What type of DP problem?"   │
              └──────────────┬───────────────┘
                             │
     ┌───────────────────────┼───────────────────────┐
     ▼                       ▼                       ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  SEQUENCE    │      │   KNAPSACK   │      │    GRID      │
│  Problems    │      │   Problems   │      │   Problems   │
└──────┬───────┘      └──────┬───────┘      └──────┬───────┘
       │                     │                     │
       ▼                     ▼                     ▼
 ┌───────────────┐    ┌───────────────┐    ┌───────────────┐
 │ LIS/LCS?      │    │ 0/1? Use item │    │ solve(i, j)   │
 │ solve(i, j)   │    │ ONCE only     │    │               │
 │               │    │               │    │ return from   │
 │ match? +1     │    │ Unbounded?    │    │ solve(i-1, j) │
 │ else max()    │    │ Can REUSE     │    │ solve(i, j-1) │
 └───────────────┘    └───────────────┘    └───────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │ 🔥 UNIVERSAL RECURSIVE TEMPLATE:                        │
  │                                                         │
  │   def solve(i, ...):                                    │
  │       if BASE_CASE: return 0                            │
  │       if (i, ...) in memo: return memo[(i, ...)]        │
  │                                                         │
  │       take = value + solve(NEXT_STATE_AFTER_TAKE)       │
  │       skip = solve(NEXT_STATE_AFTER_SKIP)               │
  │                                                         │
  │       memo[(i, ...)] = max(take, skip)  # or min        │
  │       return memo[(i, ...)]                             │
  └─────────────────────────────────────────────────────────┘

       "Counting ways vs Optimization?"
              │
       ┌──────┴──────┐
       ▼             ▼
  ┌─────────────┐   ┌─────────────┐
  │ COUNTING    │   │ OPTIMIZATION│
  │ return      │   │ return      │
  │ solve(a) +  │   │ max/min(    │
  │ solve(b)    │   │  take, skip │
  └─────────────┘   │ )           │
                    └─────────────┘
</pre>
</div>
</div>`,
        codeTemplates: `
<div style="background:#0f172a; padding:20px; border-radius:12px; margin:15px 0;">
<h4 style="color:#10b981; margin-bottom:15px;">📝 DP Templates (Memoization)</h4>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
1️⃣ House Robber (Take/Skip)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def rob(nums):
    memo = {}
    def solve(i):
        if i >= len(nums): return 0
        if i in memo: return memo[i]
        
        take = nums[i] + solve(i + 2)  # Take current, skip next
        skip = solve(i + 1)             # Skip current
        
        memo[i] = max(take, skip)
        return memo[i]
    return solve(0)
</pre>
</details>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
2️⃣ Coin Change (Unbounded)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def coinChange(coins, amount):
    memo = {}
    def solve(remaining):
        if remaining == 0: return 0
        if remaining < 0: return float('inf')
        if remaining in memo: return memo[remaining]
        
        min_coins = float('inf')
        for coin in coins:
            min_coins = min(min_coins, solve(remaining - coin) + 1)
        
        memo[remaining] = min_coins
        return min_coins
    
    ans = solve(amount)
    return ans if ans != float('inf') else -1
</pre>
</details>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
3️⃣ LCS (Longest Common Subsequence)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def lcs(text1, text2):
    memo = {}
    def solve(i, j):
        if i == len(text1) or j == len(text2): return 0
        if (i, j) in memo: return memo[(i, j)]
        
        if text1[i] == text2[j]:
            memo[(i, j)] = 1 + solve(i + 1, j + 1)  # Match!
        else:
            memo[(i, j)] = max(solve(i + 1, j), solve(i, j + 1))  # Skip
        
        return memo[(i, j)]
    return solve(0, 0)
</pre>
</details>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
4️⃣ 0/1 Knapsack
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def knapsack(weights, values, capacity):
    memo = {}
    def solve(i, remaining):
        if i == len(weights) or remaining == 0: return 0
        if (i, remaining) in memo: return memo[(i, remaining)]
        
        skip = solve(i + 1, remaining)  # Skip current item
        take = 0
        if weights[i] <= remaining:
            take = values[i] + solve(i + 1, remaining - weights[i])
        
        memo[(i, remaining)] = max(take, skip)
        return memo[(i, remaining)]
    return solve(0, capacity)
</pre>
</details>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
5️⃣ Unique Paths (Grid DP)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def uniquePaths(m, n):
    memo = {}
    def solve(i, j):
        if i == m - 1 and j == n - 1: return 1  # Reached destination
        if i >= m or j >= n: return 0           # Out of bounds
        if (i, j) in memo: return memo[(i, j)]
        
        # Can only go DOWN or RIGHT
        memo[(i, j)] = solve(i + 1, j) + solve(i, j + 1)
        return memo[(i, j)]
    return solve(0, 0)
</pre>
</details>

<details>
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
6️⃣ Longest Increasing Subsequence (LIS)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def lengthOfLIS(nums):
    memo = {}
    def solve(i, prev_idx):
        if i == len(nums): return 0
        if (i, prev_idx) in memo: return memo[(i, prev_idx)]
        
        skip = solve(i + 1, prev_idx)  # Skip current
        take = 0
        if prev_idx == -1 or nums[i] > nums[prev_idx]:
            take = 1 + solve(i + 1, i)  # Take current
        
        memo[(i, prev_idx)] = max(take, skip)
        return memo[(i, prev_idx)]
    return solve(0, -1)
</pre>
</details>
</div>`,
        safetyCheck: [
            { label: "📝 Define dp[i]!", desc: "Clearly write what dp[i] represents BEFORE coding" },
            { label: "🔢 Base cases!", desc: "<code>dp[0]</code> initialization — don't skip!" },
            { label: "🔄 Loop direction!", desc: "0/1 Knapsack: REVERSE loop. Unbounded: FORWARD loop" },
            { label: "⚡ Space optimize!", desc: "2D → 1D: Use only prev row. Often just 2 variables!" },
            { label: "📊 Counting vs Opt!", desc: "Counting: <code>+=</code>. Optimization: <code>min()/max()</code>" },
            { label: "🎯 Don't overthink!", desc: "Most DP = Take vs Skip: <code>max(take, skip)</code>" }
        ]
    },
    questions: [
        {
            id: "house-robber",
            title: "House Robber",
            leetcodeUrl: "https://leetcode.com/problems/house-robber/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["1D DP", "Space Optimization"],
            quiz: {
                description: "Max loot, can't rob adjacent houses. What's the recurrence?",
                options: ["`max(nums[i] + dp[i-2], dp[i-1])`", "`nums[i] + dp[i-1]`", "`max(nums[i], dp[i-1])`", "Greedy (pick largest)"],
                correct: 0,
                explanation: "At each house: Either ROB it (take money + skip previous) OR SKIP it (keep previous max). Compare and take maximum!"
            },
            learn: {
                quickAlgo: [
                    "rob1, rob2 = 0, 0                  # 🎯 Space Optimization: Only 2 vars needed",
                    "for n in nums:",
                    "    new_rob = max(rob1 + n, rob2)  # ⚡ Decision: Rob current (n + prev_prev) vs Skip (prev)",
                    "    rob1 = rob2                    # 🔄 Shift window forward",
                    "    rob2 = new_rob                 # ✅ Update max loot found so far",
                    "return rob2"
                ],
                metrics: { time: "O(N)", space: "O(1)" },
                timeExplainer: `<strong>Time Breakdown:</strong><br>
                    • Single pass through all N houses<br>
                    • Constant O(1) work at each house (just max comparison)<br>
                    <br><strong>Total:</strong> <code>O(N)</code>`,
                spaceExplainer: `<strong>Space Optimization Journey:</strong><br>
                    • <strong>Naive:</strong> O(N) dp array<br>
                    • <strong>Optimized:</strong> Only 2 variables needed!<br>
                    • Why? dp[i] only depends on dp[i-1] and dp[i-2]<br>
                    <br><strong>Result:</strong> <code>O(1)</code> space`,
                visual: `<div style="font-family:monospace; font-size:0.85rem;">
                    <strong style="color:#a78bfa;">🏠 House Robber: "Rob or Skip at Each House"</strong>
                    <div style="background:#1e293b; padding:16px; border-radius:10px; margin:12px 0;">
                        <div style="color:#94a3b8; font-size:0.8rem; margin-bottom:10px;">houses = [2, 7, 9, 3, 1]</div>
                        <div style="display:flex; gap:6px; align-items:flex-end; justify-content:center; height:80px; margin:8px 0;">
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                                <div style="height:25px; width:32px; background:rgba(74,222,128,0.3); border:2px solid #4ade80; border-radius:4px; display:flex; align-items:center; justify-content:center; color:#4ade80; font-size:0.7rem;">$2</div>
                                <span style="font-size:0.65rem; color:#4ade80;">ROB</span>
                            </div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                                <div style="height:55px; width:32px; background:rgba(248,113,113,0.2); border:1px solid #f87171; border-radius:4px; display:flex; align-items:center; justify-content:center; color:#f87171; font-size:0.7rem;">$7</div>
                                <span style="font-size:0.65rem; color:#f87171;">skip</span>
                            </div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                                <div style="height:70px; width:32px; background:rgba(74,222,128,0.3); border:2px solid #4ade80; border-radius:4px; display:flex; align-items:center; justify-content:center; color:#4ade80; font-size:0.7rem;">$9</div>
                                <span style="font-size:0.65rem; color:#4ade80;">ROB</span>
                            </div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                                <div style="height:30px; width:32px; background:rgba(248,113,113,0.2); border:1px solid #f87171; border-radius:4px; display:flex; align-items:center; justify-content:center; color:#f87171; font-size:0.7rem;">$3</div>
                                <span style="font-size:0.65rem; color:#f87171;">skip</span>
                            </div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                                <div style="height:18px; width:32px; background:rgba(74,222,128,0.3); border:2px solid #4ade80; border-radius:4px; display:flex; align-items:center; justify-content:center; color:#4ade80; font-size:0.7rem;">$1</div>
                                <span style="font-size:0.65rem; color:#4ade80;">ROB</span>
                            </div>
                        </div>
                        <div style="text-align:center; margin-top:8px;">
                            <span style="padding:4px 12px; background:rgba(74,222,128,0.1); border:1px solid #4ade80; border-radius:6px; color:#4ade80; font-weight:bold;">Max loot: 2+9+1 = $12</span>
                        </div>
                    </div>
                    <div style="background:#0f172a; padding:10px; border-radius:6px;">
                        <div style="color:#fbbf24;">dp[i] = max(nums[i] + dp[i-2], dp[i-1])</div>
                        <div style="color:#94a3b8;">ROB current + best from 2 ago | SKIP = best from prev</div>
                    </div>
                </div>`,
                crux: `<strong style="color:#f59e0b;">🔑 Key Insight:</strong><br>
                    <strong>Adjacent constraint = "Gap of 1" pattern</strong><br><br>
                    
                    <div style="background: rgba(139, 92, 246, 0.1); padding: 15px; border-radius: 8px; margin: 10px 0;">
                    <strong>The Recurrence:</strong><br>
                    <code>max_loot_at[i] = max(nums[i] + max_loot_at[i-2], max_loot_at[i-1])</code><br><br>
                    
                    <strong>In Words:</strong><br>
                    • ROB current = current money + best from 2 houses ago<br>
                    • SKIP current = best from previous house<br>
                    • Take maximum of both choices
                    </div>
                    
                    <br><strong style="color:#22d3ee;">💡 Same Pattern Problems:</strong><br>
                    • <strong>Climbing Stairs</strong> - ways[i] = ways[i-1] + ways[i-2]<br>
                    • <strong>Fibonacci</strong> - fib[i] = fib[i-1] + fib[i-2]<br>
                    • <strong>House Robber II</strong> - Same but circular array`,
                trap: `<strong style="color:#ef4444;">⚠️ Common Traps:</strong><br><br>
                    
                    <strong>1. Greedy Fails:</strong><br>
                    <code>[2, 1, 1, 2]</code> → Greedy picks 2+2=4, but optimal is 2+2=4 ✓... wait<br>
                    <code>[1, 3, 1, 3, 100]</code> → Greedy picks 3+100=103, but optimal is 1+1+100=102... wait<br>
                    Actually: <code>[2, 7, 9, 3, 1]</code> → Greedy might pick 9, missing 2+9+1=12<br><br>
                    
                    <strong>2. Edge Cases to Handle:</strong><br>
                    • Empty array → return 0<br>
                    • Single house → return nums[0]<br>
                    • Two houses → return max(nums[0], nums[1])`,
                dryRun: [
                    `<strong>Input:</strong> nums = [1, 2, 3, 1]`,
                    `<strong>Initialize:</strong><br>
                    • prev_prev_max = 0 (no houses robbed yet)<br>
                    • prev_max = 0`,
                    `<strong>House 0 (money=1):</strong><br>
                    • ROB: 1 + prev_prev_max = 1 + 0 = 1<br>
                    • SKIP: prev_max = 0<br>
                    • current_max = max(1, 0) = <span style="color:#4ade80;">1</span>`,
                    `<strong>House 1 (money=2):</strong><br>
                    • ROB: 2 + 0 = 2<br>
                    • SKIP: 1<br>
                    • current_max = max(2, 1) = <span style="color:#4ade80;">2</span>`,
                    `<strong>House 2 (money=3):</strong><br>
                    • ROB: 3 + 1 = 4<br>
                    • SKIP: 2<br>
                    • current_max = max(4, 2) = <span style="color:#4ade80;">4</span>`,
                    `<strong>House 3 (money=1):</strong><br>
                    • ROB: 1 + 2 = 3<br>
                    • SKIP: 4<br>
                    • current_max = max(3, 4) = <span style="color:#4ade80;">4</span>`,
                    `<strong>Answer:</strong> 4 (robbed houses 0 and 2 → 1+3=4)`
                ],
                codeTitle: "Evolution: DP Table → Space Optimized",
                code: `##### Approach 1: DP Table (O(n) space)
def rob_dp_table(nums):
if not nums:
    return 0
if len(nums) == 1:
    return nums[0]

# dp[i] = max loot we can get from houses 0 to i
dp = [0] * len(nums)
dp[0] = nums[0]
dp[1] = max(nums[0], nums[1])

for house_index in range(2, len(nums)):
    rob_current = nums[house_index] + dp[house_index - 2]
    skip_current = dp[house_index - 1]
    dp[house_index] = max(rob_current, skip_current)

return dp[-1]


##### Approach 2: Space Optimized (O(1) space) ✅ BEST
def rob(nums):
"""
Key insight: We only need previous 2 values!
prev_prev_max = max loot from 2 houses ago
prev_max = max loot from previous house
"""
if not nums:
    return 0
if len(nums) == 1:
    return nums[0]

prev_prev_max = 0  # Best loot from 2 houses back
prev_max = 0       # Best loot from 1 house back

for current_money in nums:
    # Decision: rob current house or skip it?
    rob_current = current_money + prev_prev_max
    skip_current = prev_max
    current_max = max(rob_current, skip_current)
    
    # Shift window forward
    prev_prev_max = prev_max
    prev_max = current_max

return prev_max


# Test cases
print(rob([1,2,3,1]))     # 4 (rob house 0 + house 2)
print(rob([2,7,9,3,1]))   # 12 (rob house 0 + house 2 + house 4)
print(rob([]))            # 0 (edge case)
print(rob([100]))         # 100 (single house)`
            }
        },
        {
            id: "longest-increasing-subsequence",
            title: "LIS",
            leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/",
            visualizerUrl: "visualizers/lis.html",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["DP + Binary Search", "Take/Skip Pattern"],
            quiz: {
                description: "Find length of LIS. O(N log N) approach?",
                options: ["Standard DP O(N²)", "Patience Sorting / Tails Array", "Sliding Window", "Recursion"],
                correct: 1,
                explanation: "Patience Sorting! Maintain a 'tails' array. For each x, replace the first element in tails >= x. If x is largest, append. Len(tails) is answer."
            },
            learn: {
                quickAlgo: [
                    "🎯 <strong>NlogN kaise?</strong> Patience sorting — solitaire card game strategy",
                    "⚡ <code>tails</code> array: smallest ending element for LIS of length i+1",
                    "🔄 Binary Search: Find insertion point of current num in <code>tails</code>",
                    "✅ Extend: append if largest; Replace: existing bada element chote se replace karo",
                    "💡 Replace kyun? Smaller ending value gives better chance to extend later!"
                ],
                metrics: { time: "O(N²)", space: "O(N²)" },
                timeExplainer: `<strong style="color:#f59e0b;">⏱️ Time Complexity Deep Dive</strong>
                
                <div style="background: rgba(239, 68, 68, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ef4444;">
                    <strong style="color:#ef4444;">1. Brute Force Recursion: O(2ⁿ)</strong><br><br>
                    <strong>Why 2ⁿ?</strong><br>
                    • Har element pe 2 branches: <strong>TAKE</strong> or <strong>SKIP</strong><br>
                    • n elements = 2 × 2 × 2... (n times) = 2ⁿ<br>
                    • Like generating all subsets!<br><br>
                    <code style="color:#f87171;">Result: TLE for n > 20 ❌</code>
                </div>
                
                <div style="background: rgba(16, 185, 129, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #10b981;">
                    <strong style="color:#10b981;">2. With Memoization: O(N²)</strong><br><br>
                    <strong>Why N²?</strong><br>
                    • States = (curr_idx, prev_idx)<br>
                    • curr_idx: 0 to n-1 → N possibilities<br>
                    • prev_idx: -1 to n-1 → N possibilities<br>
                    • Total unique states = N × N = N²<br>
                    • Each state computed ONCE!<br><br>
                    <code style="color:#34d399;">Result: AC! ✅</code>
                </div>
                
                <div style="background: rgba(139, 92, 246, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #8b5cf6;">
                    <strong style="color:#a78bfa;">3. Binary Search (Advanced): O(N log N)</strong><br><br>
                    • Patience Sorting technique<br>
                    • For each element, binary search in 'tails' array<br>
                    • N elements × log N search = O(N log N)
                </div>`,
                spaceExplainer: `<strong style="color:#22d3ee;">📦 Space Complexity Analysis</strong>
                
                <div style="background: rgba(239, 68, 68, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ef4444;">
                    <strong style="color:#ef4444;">Recursion without Memo: O(N)</strong><br>
                    • Only call stack depth = max N frames<br>
                    • Each frame stores: curr_idx, prev_idx (constants)<br>
                    • Total: O(N) stack space
                </div>
                
                <div style="background: rgba(245, 158, 11, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b;">
                    <strong style="color:#fbbf24;">With Memoization: O(N²)</strong><br>
                    • memo dict stores (curr_idx, prev_idx) → result<br>
                    • Max entries = N × N = N²<br>
                    • + Recursion stack O(N)<br>
                    • Total: O(N²)
                </div>
                
                <div style="background: rgba(16, 185, 129, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #10b981;">
                    <strong style="color:#34d399;">Iterative 1D DP: O(N)</strong><br>
                    • dp[i] = LIS length ending at index i<br>
                    • Only 1 array of size N needed!
                </div>`,
                visual: `<div style="background: #1e293b; padding: 20px; border-radius: 12px; margin: 15px 0;">
                    <strong style="color: #a78bfa;">🧠 State Design: "Prev Index Yaad Rakhna Hai!"</strong><br><br>
                    <code style="color: #4ade80;">
                    dfs(curr_idx, prev_idx):<br><br>
                    
                    ├── Can we TAKE nums[curr_idx]?<br>
                    │   └── Only if prev_idx == -1 OR nums[curr_idx] > nums[prev_idx]<br>
                    │       └── TAKE: 1 + dfs(curr_idx+1, curr_idx)  # prev becomes current<br>
                    │<br>
                    └── We can always SKIP<br>
                        └── SKIP: dfs(curr_idx+1, prev_idx)  # prev stays same<br><br>
                    
                    Answer = max(TAKE, SKIP)
                    </code>
                </div>`,
                crux: `<strong style="color:#f59e0b;">🔑 Key Insight: "Prev Yaad Rakhna Hai"</strong><br><br>
                
                <div style="background: rgba(139, 92, 246, 0.1); padding: 15px; border-radius: 8px; margin: 10px 0;">
                    <strong>Why Two States?</strong><br>
                    • <code>curr_idx</code>: Where we are now<br>
                    • <code>prev_idx</code>: Last element we TOOK (for comparison)<br><br>
                    
                    Without prev_idx, we can't check if current > previous!
                </div>
                
                <div style="background: rgba(16, 185, 129, 0.1); padding: 15px; border-radius: 8px; margin: 10px 0;">
                    <strong>The Core Logic:</strong><br>
                    <code>if nums[curr_idx] > nums[prev_idx]:</code><br>
                    &nbsp;&nbsp;<code>take = 1 + dfs(curr_idx+1, curr_idx)</code><br>
                    <code>skip = dfs(curr_idx+1, prev_idx)</code><br>
                    <code>return max(take, skip)</code>
                </div>
                
                <br><strong style="color:#22d3ee;">💡 Same Pattern Problems:</strong><br>
                • <strong>Russian Doll Envelopes</strong> - 2D LIS (sort + LIS on heights)<br>
                • <strong>Maximum Length of Pair Chain</strong> - LIS variant<br>
                • <strong>Number of LIS</strong> - Count instead of length`,
                trap: `<strong style="color:#ef4444;">⚠️ Common Traps:</strong><br><br>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background: rgba(239, 68, 68, 0.1); padding: 12px; border-radius: 8px;">
                        <strong style="color:#f87171;">❌ Forgetting prev_idx = -1</strong><br>
                        <span style="font-size: 0.9rem;">Initial prev is -1 (fictional -∞) so first element can always be taken</span>
                    </div>
                    <div style="background: rgba(245, 158, 11, 0.1); padding: 12px; border-radius: 8px;">
                        <strong style="color:#fbbf24;">❌ Subsequence ≠ Subarray</strong><br>
                        <span style="font-size: 0.9rem;">Elements don't need to be contiguous! [10,9,2,5,3,7,101] → [2,5,7,101]</span>
                    </div>
                </div>
                
                <div style="background: rgba(139, 92, 246, 0.1); padding: 12px; border-radius: 8px; margin-top: 15px;">
                    <strong style="color:#a78bfa;">❌ Wrong memo key</strong><br>
                    Key must be <code>(curr_idx, prev_idx)</code> not just <code>curr_idx</code>!<br>
                    Same curr_idx with different prev_idx gives different results.
                </div>`,
                dryRun: [
                    `<strong>Input:</strong> nums = [10, 9, 2, 5, 3, 7, 101, 18]`,
                    `<strong>Call:</strong> dfs(curr_idx=0, prev_idx=-1)<br>
                    • prev=-1 means "no element taken yet"<br>
                    • We can take nums[0]=10 (always allowed when prev=-1)`,
                    `<strong>Exploring from 10:</strong><br>
                    • TAKE 10: dfs(1, 0) → need nums[1] > 10 to take<br>
                    • 9 < 10, 2 < 10... stuck!<br>
                    • Better to start with smaller number`,
                    `<strong>Better path: Start with 2 (index 2)</strong><br>
                    • SKIP 10, SKIP 9, TAKE 2<br>
                    • Now prev_idx = 2, nums[prev_idx] = 2`,
                    `<strong>Continue from 2:</strong><br>
                    • 5 > 2 ✅ → TAKE, LIS = [2, 5]<br>
                    • 3 > 5 ❌ → Can't take<br>
                    • 7 > 5 ✅ → TAKE, LIS = [2, 5, 7]<br>
                    • 101 > 7 ✅ → TAKE, LIS = [2, 5, 7, 101]`,
                    `<strong>Answer:</strong> 4<br>
                    One valid LIS: [2, 5, 7, 101]<br>
                    Another: [2, 3, 7, 101] (same length)`
                ],
                codeTitle: "Evolution: Recursion → Memo → Iterative DP",
                code: `##### Approach 1: Brute Recursion - O(2^n) TLE!
def lis_brute(nums):
"""
Two states: curr_idx (where we are) and prev_idx (last taken element)
Key insight: "prev yaad rakhna hai" for comparison!
"""
def dfs(curr_idx, prev_idx):
    # Base: no more elements
    if curr_idx == len(nums):
        return 0
    
    # Option 1: TAKE current (only if increasing)
    take = 0
    if prev_idx == -1 or nums[curr_idx] > nums[prev_idx]:
        take = 1 + dfs(curr_idx + 1, curr_idx)  # curr becomes new prev
    
    # Option 2: SKIP current (always allowed)
    skip = dfs(curr_idx + 1, prev_idx)  # prev stays same
    
    return max(take, skip)

return dfs(0, -1)  # Start with prev = -1 (fictional -∞)


##### Approach 2: Memoization - O(N²) ✅
def lis_memo(nums):
memo = {}  # Key: (curr_idx, prev_idx)

def dfs(curr_idx, prev_idx):
    if curr_idx == len(nums):
        return 0
    
    # Check memo BEFORE computing
    if (curr_idx, prev_idx) in memo:
        return memo[(curr_idx, prev_idx)]
    
    # TAKE if increasing
    take = 0
    if prev_idx == -1 or nums[curr_idx] > nums[prev_idx]:
        take = 1 + dfs(curr_idx + 1, curr_idx)
    
    # SKIP always allowed
    skip = dfs(curr_idx + 1, prev_idx)
    
    result = max(take, skip)
    memo[(curr_idx, prev_idx)] = result  # Store AFTER computing
    return result

return dfs(0, -1)


##### Approach 3: Iterative DP - O(N²) time, O(N) space
def lengthOfLIS(nums):
if not nums:
    return 0

# dp[i] = length of LIS ENDING at index i
dp = [1] * len(nums)  # Each element is LIS of length 1

for curr_idx in range(1, len(nums)):
    for prev_idx in range(curr_idx):
        if nums[curr_idx] > nums[prev_idx]:
            dp[curr_idx] = max(dp[curr_idx], 1 + dp[prev_idx])

return max(dp)  # LIS can end at any index


# Test
print(lis_memo([10,9,2,5,3,7,101,18]))  # 4 → [2,5,7,101]
print(lengthOfLIS([0,1,0,3,2,3]))       # 4 → [0,1,2,3]`
            }
        },
        {
            id: "longest-common-subsequence",
            title: "LCS",
            leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/",
            visualizerUrl: "visualizers/lcs.html",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["2D DP", "Two-String Pattern"],
            quiz: {
                description: "Longest common subsequence in two strings. Logic?",
                options: ["Substring matching", "If match: 1 + diag. Else: max(up, left)", "Greedy", "HashMaps"],
                correct: 1,
                explanation: "2D Grid! If chars match: `1 + dp[i-1][j-1]`. If no match: `max(dp[i-1][j], dp[i][j-1])` (carry forward best result)."
            },
            learn: {
                quickAlgo: [
                    "if s1[i] == s2[j]:                 # 🎯 Characters MATCH",
                    "    return 1 + solve(i+1, j+1)     # ⚡ Add 1, move both pointers diagonally",
                    "else:                              # 🔄 NO MATCH",
                    "    return max(solve(i+1, j),      # ✅ Skip s1 char",
                    "               solve(i, j+1))      #    Skip s2 char"
                ],
                metrics: { time: "O(M × N)", space: "O(M × N)" },
                timeExplainer: `<strong style="color:#f59e0b;">⏱️ Time Complexity Deep Dive</strong>
                
                <div style="background: rgba(239, 68, 68, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ef4444;">
                    <strong style="color:#ef4444;">1. Brute Force Recursion: O(2^(m+n))</strong><br><br>
                    <strong>Why 2^(m+n)?</strong><br>
                    • Worst case: NO characters match<br>
                    • At each step, we branch into 2: skip from text1 OR skip from text2<br>
                    • Max depth = m + n (go through both strings)<br>
                    • Total branches = 2^(m+n)<br><br>
                    <code style="color:#f87171;">Result: TLE for strings > 20 chars ❌</code>
                </div>
                
                <div style="background: rgba(16, 185, 129, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #10b981;">
                    <strong style="color:#10b981;">2. With Memoization: O(M × N)</strong><br><br>
                    <strong>Why M × N?</strong><br>
                    • States = (index1, index2)<br>
                    • index1: 0 to m → M values<br>
                    • index2: 0 to n → N values<br>
                    • Total unique states = M × N<br>
                    • Each state computed ONCE!<br><br>
                    <code style="color:#34d399;">Example: "abcde" vs "ace" → 5×3 = 15 states ✅</code>
                </div>`,
                spaceExplainer: `<strong style="color:#22d3ee;">📦 Space Complexity Analysis</strong>
                
                <div style="background: rgba(239, 68, 68, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ef4444;">
                    <strong style="color:#ef4444;">Recursion Stack: O(M + N)</strong><br>
                    • Max depth = m + n (worst case go through both)<br>
                    • Each frame: index1, index2 (constants)
                </div>
                
                <div style="background: rgba(245, 158, 11, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b;">
                    <strong style="color:#fbbf24;">With Memoization: O(M × N)</strong><br>
                    • memo[(index1, index2)] stores result<br>
                    • Max entries = M × N<br>
                    • + Recursion stack O(M + N)
                </div>
                
                <div style="background: rgba(16, 185, 129, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #10b981;">
                    <strong style="color:#34d399;">Space Optimized: O(min(M, N))</strong><br>
                    • If only need length (not actual LCS)<br>
                    • Use rolling array (only previous row needed)
                </div>`,
                visual: `<div style="background: #1e293b; padding: 20px; border-radius: 12px; margin: 15px 0;">
                    <strong style="color: #a78bfa;">🔑 Two Cases: Match vs No Match</strong><br><br>
                    <code style="color: #4ade80;">
                    def dfs(index1, index2):<br><br>
                    
                    &nbsp;&nbsp;# MATCH: Characters equal! Take it & move BOTH pointers<br>
                    &nbsp;&nbsp;if text1[index1] == text2[index2]:<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;return <span style="color:#fbbf24;">1</span> + dfs(index1+1, index2+1)  <span style="color:#94a3b8;">← Only ONE choice!</span><br><br>
                    
                    &nbsp;&nbsp;# NO MATCH: Try skipping from EITHER string<br>
                    &nbsp;&nbsp;skip_text1 = dfs(index1+1, index2)  <span style="color:#94a3b8;">← Skip char from text1</span><br>
                    &nbsp;&nbsp;skip_text2 = dfs(index1, index2+1)  <span style="color:#94a3b8;">← Skip char from text2</span><br>
                    &nbsp;&nbsp;return max(skip_text1, skip_text2)
                    </code>
                </div>`,
                crux: `<strong style="color:#f59e0b;">🔑 Key Insight: "Match = No Choice, No Match = Try Both"</strong><br><br>
                
                <div style="background: rgba(16, 185, 129, 0.1); padding: 15px; border-radius: 8px; margin: 10px 0;">
                    <strong style="color:#34d399;">When Characters MATCH:</strong><br>
                    • Take the match! Move BOTH pointers forward<br>
                    • <code>return 1 + dfs(i+1, j+1)</code><br>
                    • No "Lun Na Lun" here - always take the match!
                </div>
                
                <div style="background: rgba(239, 68, 68, 0.1); padding: 15px; border-radius: 8px; margin: 10px 0;">
                    <strong style="color:#f87171;">When Characters DON'T Match:</strong><br>
                    • Can't match both - try skipping from either string<br>
                    • <code>skip1 = dfs(i+1, j)</code> ← Skip from text1<br>
                    • <code>skip2 = dfs(i, j+1)</code> ← Skip from text2<br>
                    • <code>return max(skip1, skip2)</code>
                </div>
                
                <br><strong style="color:#22d3ee;">💡 Same Pattern Problems:</strong><br>
                • <strong>Edit Distance</strong> - Min operations to convert (same 2-string pattern)<br>
                • <strong>Shortest Common Supersequence</strong> - Based on LCS!<br>
                • <strong>Longest Palindromic Subsequence</strong> - LCS(s, reverse(s))`,
                trap: `<strong style="color:#ef4444;">⚠️ Common Traps:</strong><br><br>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background: rgba(239, 68, 68, 0.1); padding: 12px; border-radius: 8px;">
                        <strong style="color:#f87171;">❌ Subsequence ≠ Substring</strong><br>
                        <span style="font-size: 0.9rem;">Subsequence: Can skip chars, order preserved<br>
                        Substring: Contiguous, no skips allowed</span>
                    </div>
                    <div style="background: rgba(245, 158, 11, 0.1); padding: 12px; border-radius: 8px;">
                        <strong style="color:#fbbf24;">❌ Wrong base case</strong><br>
                        <span style="font-size: 0.9rem;">Return 0 when EITHER string ends<br>
                        Not when both end!</span>
                    </div>
                </div>
                
                <div style="background: rgba(139, 92, 246, 0.1); padding: 12px; border-radius: 8px; margin-top: 15px;">
                    <strong style="color:#a78bfa;">❌ Thinking it's "Lun Na Lun"</strong><br>
                    When chars MATCH, there's NO choice to make - always take the match!<br>
                    "Lun Na Lun" only applies when chars DON'T match.
                </div>`,
                dryRun: [
                    `<strong>Input:</strong> text1 = "abcde", text2 = "ace"`,
                    `<strong>Call:</strong> dfs(index1=0, index2=0)<br>
                    • text1[0] = 'a', text2[0] = 'a'<br>
                    • MATCH! → 1 + dfs(1, 1)`,
                    `<strong>dfs(1, 1):</strong><br>
                    • text1[1] = 'b', text2[1] = 'c'<br>
                    • NO MATCH → try both:<br>
                    &nbsp;&nbsp;• skip 'b': dfs(2, 1)<br>
                    &nbsp;&nbsp;• skip 'c': dfs(1, 2)`,
                    `<strong>dfs(2, 1):</strong> text1[2]='c', text2[1]='c'<br>
                    • MATCH! → 1 + dfs(3, 2)<br><br>
                    <strong>dfs(3, 2):</strong> text1[3]='d', text2[2]='e'<br>
                    • NO MATCH → try both... eventually finds 'e' at dfs(4, 2)`,
                    `<strong>dfs(4, 2):</strong> text1[4]='e', text2[2]='e'<br>
                    • MATCH! → 1 + dfs(5, 3)<br>
                    • dfs(5, 3) → index1 == len(text1) → return 0`,
                    `<strong>Answer:</strong> 3<br>
                    LCS = "ace" (matched at positions 0, 2, 4)`
                ],
                codeTitle: "Evolution: Recursion → Memo → 2D DP",
                code: `##### Approach 1: Brute Recursion - O(2^(m+n)) TLE!
def lcs_brute(text1, text2):
"""
Two pointers: index1 for text1, index2 for text2
Key: When match, NO choice - must take it!
"""
def dfs(index1, index2):
    # Base: Either string exhausted
    if index1 == len(text1) or index2 == len(text2):
        return 0
    
    # MATCH: Take it and move BOTH pointers
    if text1[index1] == text2[index2]:
        return 1 + dfs(index1 + 1, index2 + 1)
    
    # NO MATCH: Try skipping from either string
    skip_text1 = dfs(index1 + 1, index2)
    skip_text2 = dfs(index1, index2 + 1)
    
    return max(skip_text1, skip_text2)

return dfs(0, 0)


##### Approach 2: Memoization - O(M × N) ✅
def longestCommonSubsequence(text1, text2):
memo = {}  # Key: (index1, index2)

def dfs(index1, index2):
    # Base: Either string exhausted
    if index1 == len(text1) or index2 == len(text2):
        return 0
    
    # Check memo
    if (index1, index2) in memo:
        return memo[(index1, index2)]
    
    # MATCH: Take it!
    if text1[index1] == text2[index2]:
        result = 1 + dfs(index1 + 1, index2 + 1)
    else:
        # NO MATCH: Try both skips
        skip_text1 = dfs(index1 + 1, index2)
        skip_text2 = dfs(index1, index2 + 1)
        result = max(skip_text1, skip_text2)
    
    memo[(index1, index2)] = result
    return result

return dfs(0, 0)


##### Approach 3: 2D DP (Bottom-Up) ⭐️
def longestCommonSubsequence_DP(text1, text2):
m, n = len(text1), len(text2)
# dp[i][j] = LCS of text1[0:i] and text2[0:j]
dp = [[0] * (n + 1) for _ in range(m + 1)]

for i in range(1, m + 1):
    for j in range(1, n + 1):
        if text1[i - 1] == text2[j - 1]:
            # MATCH: 1 + diagonal
            dp[i][j] = 1 + dp[i - 1][j - 1]
        else:
            # NO MATCH: max of up or left
            dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

return dp[m][n]


# Test
print(longestCommonSubsequence("abcde", "ace"))  # 3 → "ace"`
            }
        },
        {
            id: "coin-change",
            title: "Coin Change",
            leetcodeUrl: "https://leetcode.com/problems/coin-change/",
            visualizerUrl: "visualizers/min_coins.html",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Unbounded Knapsack", "Infinite Supply"],
            quiz: {
                description: "Fewest coins to make amount. Trick?",
                options: ["Greedy (biggest coins first)", "DP: dp[a] = min(dp[a], 1 + dp[a-c])", "Backtracking", "BFS"],
                correct: 1,
                explanation: "Greedy fails (e.g., Coins [1,3,4], Target 6. Greedy 4+1+1 (3 coins). Optimal 3+3 (2 coins)). Use DP: solve for amount 1, then 2..."
            },
            learn: {
                quickAlgo: [
                    "dp = [inf] * (amount + 1); dp[0]=0 # 🎯 Min coins to reach 'i' amount",
                    "for a in range(1, amount+1):",
                    "    for c in coins:",
                    "        if a - c >= 0:             # ⚡ Can we use this coin?",
                    "            dp[a] = min(dp[a], 1 + dp[a-c]) # 🔄 Update min cost",
                    "return dp[amount] if != inf else -1"
                ],
                metrics: { time: "O(A × C)", space: "O(A × C)" },
                timeExplainer: `<strong style="color:#f59e0b;">⏱️ Time Complexity Deep Dive</strong>
                
                <div style="background: rgba(239, 68, 68, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ef4444;">
                    <strong style="color:#ef4444;">1. Brute Force Recursion: O(n^amount) or worse! 🔥</strong><br><br>
                    <strong>Why so bad?</strong><br>
                    • Each coin can be taken UNLIMITED times (unbounded)<br>
                    • Worst case: coin = 1, amount = 100<br>
                    • Depth = amount/min_coin = 100 (if smallest coin is 1)<br>
                    • At each level, we have n coin choices<br>
                    • Total: O(n^(amount/min_coin))<br><br>
                    <code style="color:#f87171;">Result: TLE for amount > 20 ❌</code>
                </div>
                
                <div style="background: rgba(16, 185, 129, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #10b981;">
                    <strong style="color:#10b981;">2. With Memoization: O(Amount × Coins)</strong><br><br>
                    <strong>Why Amount × Coins?</strong><br>
                    • States = (remaining_amount, coin_index)<br>
                    • amount: 0 to amount → A values<br>
                    • index: 0 to n-1 → n values<br>
                    • Total unique states = A × n<br>
                    • Each state computed ONCE!<br><br>
                    <code style="color:#34d399;">Example: amount=100, coins=3 → 300 states ✅</code>
                </div>
                
                <div style="background: rgba(139, 92, 246, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #8b5cf6;">
                    <strong style="color:#a78bfa;">3. 1D DP: O(Amount × Coins)</strong><br><br>
                    • For each amount from 1 to A: O(A)<br>
                    • Try each coin: O(C)<br>
                    • Total: O(A × C)
                </div>`,
                spaceExplainer: `<strong style="color:#22d3ee;">📦 Space Complexity Analysis</strong>
                
                <div style="background: rgba(239, 68, 68, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ef4444;">
                    <strong style="color:#ef4444;">Recursion Stack: O(Amount/min_coin)</strong><br>
                    • Worst case: taking coin=1 repeatedly<br>
                    • Max depth = amount (if smallest coin is 1)<br>
                    • Each frame: amount, index (constants)
                </div>
                
                <div style="background: rgba(245, 158, 11, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b;">
                    <strong style="color:#fbbf24;">With Memoization: O(Amount × Coins)</strong><br>
                    • memo[(amount, index)] stores result<br>
                    • Max entries = A × n<br>
                    • + Recursion stack O(A)
                </div>
                
                <div style="background: rgba(16, 185, 129, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #10b981;">
                    <strong style="color:#34d399;">1D DP: O(Amount) ✅ BEST</strong><br>
                    • Only need dp array of size amount+1<br>
                    • dp[i] = min coins to make amount i
                </div>`,
                visual: `<div style="background: #1e293b; padding: 20px; border-radius: 12px; margin: 15px 0;">
                    <strong style="color: #a78bfa;">🔑 CRITICAL: UNBOUNDED vs 0/1 Knapsack</strong><br><br>
                    <code style="color: #4ade80;">
                    # UNBOUNDED (Coin Change) - Infinite supply<br>
                    take = 1 + dfs(amount - coins[index], <span style="color:#f87171;">index</span>)  <span style="color:#94a3b8;">← STAY at same index!</span><br><br>
                    
                    # 0/1 Knapsack - Each item once<br>
                    take = 1 + dfs(amount - items[index], <span style="color:#f87171;">index + 1</span>)  <span style="color:#94a3b8;">← MOVE to next!</span>
                    </code><br><br>
                    <span style="color:#fbbf24;">⚠️ This ONE difference changes everything!</span>
                </div>`,
                crux: `<strong style="color:#f59e0b;">🔑 Key Insight: "STAY at Same Index = Infinite Supply"</strong><br><br>
                
                <div style="background: rgba(139, 92, 246, 0.1); padding: 15px; border-radius: 8px; margin: 10px 0;">
                    <strong>The Core Logic:</strong><br><br>
                    <code>def dfs(remaining_amount, coin_index):</code><br>
                    &nbsp;&nbsp;<code>if remaining_amount == 0: return 0  # No more coins needed</code><br>
                    &nbsp;&nbsp;<code>if coin_index == len(coins): return inf  # No coins left</code><br><br>
                    
                    &nbsp;&nbsp;<code># TAKE: Use this coin, STAY at same index (can reuse!)</code><br>
                    &nbsp;&nbsp;<code>take = 1 + dfs(amount - coins[index], index)</code><br><br>
                    
                    &nbsp;&nbsp;<code># SKIP: Don't use this coin, move to next</code><br>
                    &nbsp;&nbsp;<code>skip = dfs(amount, index + 1)</code><br><br>
                    
                    &nbsp;&nbsp;<code>return min(take, skip)</code>
                </div>
                
                <br><strong style="color:#22d3ee;">💡 Same Pattern Problems:</strong><br>
                • <strong>Coin Change II</strong> - Count ways (not min coins)<br>
                • <strong>Unbounded Knapsack</strong> - Max value with infinite items<br>
                • <strong>Rod Cutting</strong> - Max profit cutting rod`,
                trap: `<strong style="color:#ef4444;">⚠️ Common Traps:</strong><br><br>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background: rgba(239, 68, 68, 0.1); padding: 12px; border-radius: 8px;">
                        <strong style="color:#f87171;">❌ Greedy Fails!</strong><br>
                        <span style="font-size: 0.9rem;">Coins=[1,3,4], Target=6<br>
                        Greedy: 4+1+1 = 3 coins ❌<br>
                        DP: 3+3 = 2 coins ✅</span>
                    </div>
                    <div style="background: rgba(245, 158, 11, 0.1); padding: 12px; border-radius: 8px;">
                        <strong style="color:#fbbf24;">❌ Wrong Initialization</strong><br>
                        <span style="font-size: 0.9rem;">dp = [0] * (amount+1) ❌<br>
                        dp = [inf] * (amount+1) ✅<br>
                        dp[0] = 0 (base case)</span>
                    </div>
                </div>
                
                <div style="background: rgba(139, 92, 246, 0.1); padding: 12px; border-radius: 8px; margin-top: 15px;">
                    <strong style="color:#a78bfa;">❌ Confusing 0/1 with Unbounded</strong><br>
                    When TAKING: <code>dfs(amt - coin, index)</code> NOT <code>dfs(amt - coin, index+1)</code>!<br>
                    STAY at same index means we can take same coin again.
                </div>`,
                dryRun: [
                    `<strong>Input:</strong> coins = [1, 2, 5], amount = 11`,
                    `<strong>Call:</strong> dfs(remaining=11, index=0)<br>
                    • Coins available: [1, 2, 5]<br>
                    • Need to find MINIMUM coins to make 11`,
                    `<strong>Key Decisions:</strong><br>
                    • TAKE coin[0]=1: dfs(10, 0) → can take 1 again (unlimited!)<br>
                    • SKIP coin[0]=1: dfs(11, 1) → try coin 2`,
                    `<strong>Optimal Path Found:</strong><br>
                    • Take 5: remaining = 6, coins = 1<br>
                    • Take 5: remaining = 1, coins = 2<br>
                    • Take 1: remaining = 0, coins = 3 ✅<br>
                    • 5 + 5 + 1 = 11 with 3 coins`,
                    `<strong>Answer:</strong> 3<br>
                    One valid combination: [5, 5, 1]<br>
                    Another: [5, 2, 2, 2] = 4 coins (not optimal)`
                ],
                codeTitle: "Evolution: Recursion → Memo → 1D DP",
                code: `##### Approach 1: Brute Recursion - O(n^amount) TLE!
def coin_change_brute(coins, amount):
"""
UNBOUNDED: When taking a coin, STAY at same index!
"""
def dfs(remaining_amount, coin_index):
    # Base: Exact amount made
    if remaining_amount == 0:
        return 0
    
    # Base: No coins left OR negative amount
    if coin_index == len(coins) or remaining_amount < 0:
        return float('inf')
    
    # TAKE: Use this coin, STAY at same index (unlimited supply!)
    take = float('inf')
    if remaining_amount >= coins[coin_index]:
        take = 1 + dfs(remaining_amount - coins[coin_index], coin_index)
    
    # SKIP: Move to next coin
    skip = dfs(remaining_amount, coin_index + 1)
    
    return min(take, skip)

result = dfs(amount, 0)
return result if result != float('inf') else -1


##### Approach 2: Memoization - O(Amount × Coins) ✅
def coinChange(coins, amount):
memo = {}  # Key: (remaining_amount, coin_index)

def dfs(remaining_amount, coin_index):
    if remaining_amount == 0:
        return 0
    if coin_index == len(coins) or remaining_amount < 0:
        return float('inf')
    
    state = (remaining_amount, coin_index)
    if state in memo:
        return memo[state]
    
    # TAKE (stay at index) or SKIP (move to next)
    take = float('inf')
    if remaining_amount >= coins[coin_index]:
        take = 1 + dfs(remaining_amount - coins[coin_index], coin_index)
    skip = dfs(remaining_amount, coin_index + 1)
    
    memo[state] = min(take, skip)
    return memo[state]

result = dfs(amount, 0)
return result if result != float('inf') else -1


##### Approach 3: 1D DP - O(Amount × Coins) time, O(Amount) space ⭐️
def coinChange_DP(coins, amount):
# dp[i] = min coins to make amount i
dp = [float('inf')] * (amount + 1)
dp[0] = 0  # Base: 0 coins to make 0

for target_amount in range(1, amount + 1):
    for coin in coins:
        if target_amount - coin >= 0:
            dp[target_amount] = min(dp[target_amount], 1 + dp[target_amount - coin])

return dp[amount] if dp[amount] != float('inf') else -1


# Test
print(coinChange([1,2,5], 11))  # 3 → 5+5+1
print(coinChange([2], 3))       # -1 → impossible`
            }
        },
        {
            id: "word-break",
            title: "Word Break",
            leetcodeUrl: "https://leetcode.com/problems/word-break/",
            visualizerUrl: "visualizers/word_break.html",
            difficulty: "Good to Do",
            priority: "🟡",
            tags: ["String DP", "Dictionary"],
            quiz: {
                description: "Can string s be segmented into dictionary words?",
                options: ["Greedy matching", "DP: dp[i] is true if s[:i] can be segmented", "Backtracking O(2^N)", "Trie"],
                correct: 1,
                explanation: "Brute Force is O(2^N). We need DP! dp[i] = True if dp[j] is True AND s[j:i] in dict. Iterate i from 1 to N, j from 0 to i."
            },
            learn: {
                quickAlgo: [
                    "dp = [1] * n                       # 🎯 dp[i] = Longest chain ending at i",
                    "for i in range(n):",
                    "    for j in range(i):             # ⚡ Check all previous elements",
                    "        if nums[i] > nums[j]:      # 🔄 Can we extend the chain?",
                    "            dp[i] = max(dp[i], 1 + dp[j])",
                    "return max(dp)"
                ],
                metrics: { time: "O(N³)", space: "O(N)" },
                timeExplainer: `
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <div style="background:rgba(127,29,29,0.2); padding:12px; border-radius:8px; border:1px solid rgba(248,113,113,0.3);">
                            <p style="font-weight:bold; color:#f87171; font-size:1rem;">🔴 Brute Force (Recursion): O(2ⁿ)</p>
                            <div style="margin-top:8px; display:flex; flex-direction:column; gap:8px; font-size:0.875rem; color:#d1d5db;">
                                <p><strong>🤔 Kyun?</strong> Har character ke baad ek "cut" lag sakta hai ya nahi:</p>
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; font-family:monospace; font-size:0.75rem;">
                                    l|e|e|t|c|o|d|e   ← 7 potential gaps<br>
                                    Cut? ✓ or ✗ for each gap
                                </div>

                                <p><strong>📊 Math Breakdown:</strong></p>
                                <ul style="list-style:disc; padding-left:16px; display:flex; flex-direction:column; gap:4px;">
                                    <li>String length = N</li>
                                    <li>Potential gaps = <strong>N-1</strong> (between characters)</li>
                                    <li>Each gap: 2 choices (cut or don't cut)</li>
                                    <li>Total combinations = <strong>2^(N-1)</strong> ≈ O(2ⁿ)</li>
                                </ul>

                                <p><strong>🎯 Real Numbers:</strong></p>
                                <table style="width:100%; font-size:0.75rem; border-collapse:collapse;">
                                    <tr style="border-bottom:1px solid #374151;">
                                        <td style="padding-top:4px; padding-bottom:4px;">N = 10</td>
                                        <td style="color:#fbbf24;">512 ops ✅ Fast</td>
                                    </tr>
                                    <tr style="border-bottom:1px solid #374151;">
                                        <td style="padding-top:4px; padding-bottom:4px;">N = 20</td>
                                        <td style="color:#fbbf24;">~1 Million ops ⚠️ Borderline</td>
                                    </tr>
                                    <tr style="border-bottom:1px solid #374151;">
                                        <td style="padding-top:4px; padding-bottom:4px;">N = 30</td>
                                        <td style="color:#f87171;">~1 Billion ops ❌ TLE</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-top:4px; padding-bottom:4px;">N = 50</td>
                                        <td style="color:#f87171;">~10¹⁵ ops 💀 Universe Heat Death</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <div style="background:rgba(20,83,45,0.2); padding:12px; border-radius:8px; border:1px solid rgba(74,222,128,0.3);">
                            <p style="font-weight:bold; color:#4ade80; font-size:1rem;">🟢 Memoization / DP: O(N³)</p>
                            <div style="margin-top:8px; display:flex; flex-direction:column; gap:8px; font-size:0.875rem; color:#d1d5db;">
                                <p><strong>🤔 Why 2ⁿ → N³?</strong></p>

                                <p><strong>Step 1: Count Unique States</strong></p>
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px;">
                                    <div style="font-family:monospace; font-size:0.75rem;">dfs(<span style="color:#22d3ee;">start</span>)</div>
                                    <div style="font-size:0.75rem; color:#94a3b8;">Start index can only be: 0, 1, 2, ... N</div>
                                    <div style="color:#22d3ee; font-weight:bold;">Unique States = N+1 ≈ O(N)</div>
                                </div>

                                <p style="margin-top:8px;"><strong>Step 2: Work per State</strong></p>
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; font-family:monospace; font-size:0.75rem;">
for end in range(start+1, len(s)+1):  <span style="color:#fbbf24;">← O(N) iterations</span>
curr_word = s[start:end]           <span style="color:#fb923c;">← O(N) slicing!</span>
                                </div>

                                <p style="margin-top:8px;"><strong>🧮 Final Calculation:</strong></p>
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; color:#67e8f9;">
                                    N states × N loop × N slicing = <strong style="color:#4ade80;">O(N³)</strong>
                                </div>

                                <p style="margin-top:8px;"><strong>💡 Hidden Cost - Slicing:</strong></p>
                                <div style="background:rgba(124,45,18,0.2); padding:8px; border-radius:6px; border:1px solid rgba(249,115,22,0.2);">
                                    <div style="color:#fb923c; font-weight:bold; font-size:0.75rem;">⚠️ DON'T FORGET!</div>
                                    <div style="font-size:0.75rem;">In Python/Java: <code>s[start:end]</code> creates NEW string</div>
                                    <div style="font-size:0.75rem;">This takes O(end - start) = O(N) time!</div>
                                </div>
                            </div>
                        </div>

                        <div style="background:rgba(88,28,135,0.2); padding:12px; border-radius:8px; border:1px solid rgba(168,85,247,0.3);">
                            <p style="font-weight:bold; color:#a78bfa; font-size:1rem;">🟣 Optimization: O(N² × M)</p>
                            <div style="margin-top:8px; font-size:0.875rem; color:#d1d5db;">
                                <p><strong>Using Trie or Word Length Bound:</strong></p>
                                <ul style="list-style:disc; padding-left:16px; font-size:0.75rem; display:flex; flex-direction:column; gap:4px;">
                                    <li>If max word length in dict = M (usually small)</li>
                                    <li>Instead of loop till N, loop only till M</li>
                                    <li>Time: O(N × M × M) = O(N × M²)</li>
                                </ul>
                            </div>
                        </div>
                    </div>`,
                spaceExplainer: `
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <div style="background:#1e293b; padding:12px; border-radius:8px;">
                            <p style="font-weight:bold; color:#60a5fa;">1. Recursion Stack: O(N)</p>
                            <div style="font-size:0.875rem; color:#d1d5db; margin-top:4px;">
                                <p>Worst case: All single chars are valid words</p>
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; font-family:monospace; font-size:0.75rem; margin-top:4px;">
s = "aaa" and dict = {"a"}<br>
dfs(0) → dfs(1) → dfs(2) → dfs(3)<br>
<span style="color:#fbbf24;">Max depth = N</span>
                                </div>
                            </div>
                        </div>

                        <div style="background:#1e293b; padding:12px; border-radius:8px;">
                            <p style="font-weight:bold; color:#4ade80;">2. Memoization Cache: O(N)</p>
                            <div style="font-size:0.875rem; color:#d1d5db; margin-top:4px;">
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; font-family:monospace; font-size:0.75rem;">
memo = {<br>
  0: True/False,   <span style="color:#64748b;"># Can break from index 0?</span><br>
  1: True/False,   <span style="color:#64748b;"># Can break from index 1?</span><br>
  ...<br>
  N-1: True/False  <span style="color:#64748b;"># Can break from last char?</span><br>
}<br>
<span style="color:#22d3ee;">Size = N entries</span>
                                </div>
                            </div>
                        </div>

                        <div style="background:rgba(20,83,45,0.2); padding:12px; border-radius:8px; border:1px solid rgba(74,222,128,0.3);">
                            <p style="font-weight:bold; color:#4ade80;">Total Space: O(N)</p>
                            <p style="font-size:0.875rem; color:#94a3b8;">Both stack and cache are linear.</p>
                        </div>
                    </div>`,
                visual: `
                    <h4 style="color:#c026d3;">🔪 The Cut Strategy</h4>
                    <div style="display:flex; flex-direction:column; gap:12px; margin:15px 0; max-width:500px;">
                        <div style="background:#1e293b; padding:16px; border-radius:12px;">
                            <div style="font-size:0.82rem; color:#94a3b8; margin-bottom:10px;">s = "leetcode", dict = ["leet", "code"]</div>
                            <div style="display:flex; justify-content:center; gap:3px; font-family:monospace; font-size:0.85rem;">
                                <span style="background:rgba(74,222,128,0.2); padding:4px 8px; border-radius:4px; color:#4ade80;">l</span>
                                <span style="background:rgba(74,222,128,0.2); padding:4px 8px; border-radius:4px; color:#4ade80;">e</span>
                                <span style="background:rgba(74,222,128,0.2); padding:4px 8px; border-radius:4px; color:#4ade80;">e</span>
                                <span style="background:rgba(74,222,128,0.2); padding:4px 8px; border-radius:4px; color:#4ade80;">t</span>
                                <span style="color:#f87171; font-size:1.2rem; font-weight:bold; display:flex; align-items:center;">✂</span>
                                <span style="background:rgba(56,189,248,0.2); padding:4px 8px; border-radius:4px; color:#38bdf8;">c</span>
                                <span style="background:rgba(56,189,248,0.2); padding:4px 8px; border-radius:4px; color:#38bdf8;">o</span>
                                <span style="background:rgba(56,189,248,0.2); padding:4px 8px; border-radius:4px; color:#38bdf8;">d</span>
                                <span style="background:rgba(56,189,248,0.2); padding:4px 8px; border-radius:4px; color:#38bdf8;">e</span>
                            </div>
                            <div style="text-align:center; margin-top:10px; font-size:0.82rem;">
                                <span style="color:#4ade80;">"leet" ✓</span> +
                                <span style="color:#38bdf8;">"code" ✓</span> =
                                <span style="color:#fbbf24; font-weight:bold;">VALID!</span>
                            </div>
                        </div>
                        <div style="background:#0f172a; padding:10px 14px; border-radius:8px; font-size:0.82rem; color:#94a3b8; text-align:center;">
                            Try every cut position. Left part in dict? Recurse on right part.
                        </div>
                    </div>`,
                crux: `<div style="display:flex; flex-direction:column; gap:12px;">
                    <div style="background:rgba(22,78,99,0.2); padding:12px; border-radius:8px; border:1px solid rgba(6,182,212,0.3);">
                        <div style="font-weight:bold; color:#22d3ee; margin-bottom:8px;">🎯 The "Cut or Extend" Logic</div>
                        <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; font-family:monospace; font-size:0.75rem;">
for end in range(start + 1, len(s) + 1):  <span style="color:#64748b;"># Try all ends</span><br>
word = s[start:end]<br>
<br>
if word in wordSet:    <span style="color:#4ade80;"># Mila! CUT lagao</span><br>
    if dfs(end):       <span style="color:#4ade80;"># Baki bhi valid?</span><br>
        return True<br>
<span style="color:#64748b;"># Else: EXTEND karo (loop continues)</span>
                        </div>
                    </div>

                    <div style="background:rgba(113,63,18,0.2); padding:12px; border-radius:8px; border:1px solid rgba(234,179,8,0.3);">
                        <div style="font-weight:bold; color:#fbbf24; margin-bottom:8px;">💡 Key Insight</div>
                        <p style="font-size:0.875rem; color:#d1d5db;"><strong>STATE:</strong> Just the <code>start</code> index</p>
                        <p style="font-size:0.875rem; color:#d1d5db;"><strong>DECISION:</strong> Where to cut (try all ends)</p>
                        <p style="font-size:0.875rem; color:#d1d5db;"><strong>BASE CASE:</strong> start == len(s) → True</p>
                    </div>

                    <div style="background:rgba(88,28,135,0.2); padding:12px; border-radius:8px; border:1px solid rgba(168,85,247,0.3);">
                        <div style="font-weight:bold; color:#a78bfa; margin-bottom:8px;">🔗 Same Pattern Problems</div>
                        <ul style="font-size:0.875rem; color:#d1d5db; display:flex; flex-direction:column; gap:4px;">
                            <li>• <strong>Word Break II</strong> - Return all valid segmentations</li>
                            <li>• <strong>Palindrome Partitioning</strong> - Cut where each part is palindrome</li>
                            <li>• <strong>Decode Ways</strong> - Valid number → letter mappings</li>
                        </ul>
                    </div>
                </div>`,
                trap: `<div style="display:flex; flex-direction:column; gap:8px;">
                    <div style="background:rgba(127,29,29,0.2); padding:8px; border-radius:6px; border:1px solid rgba(248,113,113,0.3);">
                        <div style="font-weight:bold; color:#f87171; font-size:0.875rem;">❌ Trap 1: Complexity Confusion</div>
                        <p style="font-size:0.75rem; color:#d1d5db;">Looks like O(N^N) due to nested loop, but it's O(2^N)!</p>
                        <p style="font-size:0.75rem; color:#94a3b8;">Each gap has binary choice: cut or extend.</p>
                    </div>

                    <div style="background:rgba(124,45,18,0.2); padding:8px; border-radius:6px; border:1px solid rgba(249,115,22,0.2);">
                        <div style="font-weight:bold; color:#fb923c; font-size:0.875rem;">❌ Trap 2: Slicing Cost Hidden</div>
                        <p style="font-size:0.75rem; color:#d1d5db;"><code>s[start:end]</code> is NOT O(1)!</p>
                        <p style="font-size:0.75rem; color:#94a3b8;">It's O(K) where K = substring length. Total = O(N³)</p>
                    </div>

                    <div style="background:rgba(113,63,18,0.2); padding:8px; border-radius:6px; border:1px solid rgba(234,179,8,0.3);">
                        <div style="font-weight:bold; color:#fbbf24; font-size:0.875rem;">❌ Trap 3: Wrong Loop Range</div>
                        <div style="background:rgba(0,0,0,0.3); padding:4px; border-radius:6px; font-family:monospace; font-size:0.75rem; margin-top:4px;">
<span style="color:#f87171;">❌ range(start, len(s)+1)</span>  <span style="color:#64748b;"># empty substring!</span><br>
<span style="color:#4ade80;">✅ range(start+1, len(s)+1)</span> <span style="color:#64748b;"># at least 1 char</span>
                        </div>
                    </div>

                    <div style="background:rgba(30,58,138,0.3); padding:8px; border-radius:6px; border:1px solid rgba(59,130,246,0.3);">
                        <div style="font-weight:bold; color:#60a5fa; font-size:0.875rem;">❌ Trap 4: Not Using Set</div>
                        <p style="font-size:0.75rem; color:#d1d5db;">List lookup = O(N). <strong>Set lookup = O(1)!</strong></p>
                        <p style="font-size:0.75rem; color:#94a3b8;">Always convert wordDict to set first.</p>
                    </div>
                </div>`,
                dryRun: [
                    `<details style="background:#1e293b; border-radius:8px; padding:8px; cursor:pointer;">
                        <summary style="display:flex; align-items:center; gap:12px; font-weight:500; color:#a5b4fc; user-select:none; list-style:none; font-size:0.875rem;">
                            <span style="background:rgba(99,102,241,0.2); color:#818cf8; padding:6px; border-radius:6px;">
                                <i class="fas fa-chevron-right" style="font-size:0.75rem;"></i>
                            </span>
                            <span>🔍 View Trace: "leetcode" (Hidden by Default)</span>
                        </summary>

                        <div style="margin-top:12px; padding-left:16px; border-left:2px solid rgba(99,102,241,0.2); display:flex; flex-direction:column; gap:12px; font-size:0.875rem; font-family:monospace; color:#d1d5db;">
                            <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; font-size:0.75rem;">
                                <strong>Input:</strong> s = "leetcode"<br>
                                <strong>Dict:</strong> {"leet", "code"}
                            </div>

                            <div style="display:flex; align-items:flex-start; gap:8px;">
                                <span style="color:#60a5fa; margin-top:4px;">1.</span>
                                <div>
                                    <div style="font-weight:bold; color:white;">dfs(0)</div>
                                    <div style="font-size:0.75rem; color:#64748b;">Full string "leetcode"</div>
                                </div>
                            </div>

                            <div style="padding-left:16px; border-left:1px solid #374151; margin-left:4px; opacity:0.6;">
                                <div style="display:flex; align-items:center; gap:8px; font-size:0.75rem; color:#fca5a5;">
                                    <span>s[0:1] = "l"</span>
                                    <span style="color:#ef4444;">❌ Not in dict</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:8px; font-size:0.75rem; color:#fca5a5;">
                                    <span>s[0:2] = "le"</span>
                                    <span style="color:#ef4444;">❌ Not in dict</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:8px; font-size:0.75rem; color:#fca5a5;">
                                    <span>s[0:3] = "lee"</span>
                                    <span style="color:#ef4444;">❌ Not in dict</span>
                                </div>
                            </div>

                            <div style="display:flex; align-items:flex-start; gap:8px; padding-left:16px; border-left:1px solid #374151; margin-left:4px;">
                                <span style="color:#4ade80; margin-top:4px;">2.</span>
                                <div>
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        <span>s[0:4] = "leet"</span>
                                        <span style="background:rgba(74,222,128,0.2); color:#4ade80; font-size:0.75rem; padding-left:6px; padding-right:6px; border-radius:6px;">FOUND!</span>
                                    </div>
                                    <div style="font-size:0.75rem; color:#94a3b8;">CUT lagao! → Recurse on remaining...</div>
                                </div>
                            </div>

                            <div style="display:flex; align-items:flex-start; gap:8px; padding-left:24px; border-left:1px solid #374151; margin-left:4px;">
                                <span style="color:#60a5fa; margin-top:4px;">3.</span>
                                <div>
                                    <div style="font-weight:bold; color:white;">dfs(4)</div>
                                    <div style="font-size:0.75rem; color:#64748b;">Remaining: "code"</div>
                                </div>
                            </div>

                            <div style="padding-left:40px; border-left:1px solid #374151; margin-left:4px; opacity:0.6;">
                                <div style="display:flex; align-items:center; gap:8px; font-size:0.75rem; color:#fca5a5;">
                                    <span>s[4:5] = "c", s[4:6] = "co", s[4:7] = "cod"</span>
                                    <span style="color:#ef4444;">❌</span>
                                </div>
                            </div>

                            <div style="display:flex; align-items:flex-start; gap:8px; padding-left:40px; border-left:1px solid #374151; margin-left:4px;">
                                <span style="color:#4ade80; margin-top:4px;">4.</span>
                                <div>
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        <span>s[4:8] = "code"</span>
                                        <span style="background:rgba(74,222,128,0.2); color:#4ade80; font-size:0.75rem; padding-left:6px; padding-right:6px; border-radius:6px;">FOUND!</span>
                                    </div>
                                </div>
                            </div>

                            <div style="display:flex; align-items:flex-start; gap:8px; padding-left:48px; border-left:1px solid #374151; margin-left:4px;">
                                <span style="color:#a78bfa; margin-top:4px;">5.</span>
                                <div>
                                    <div style="font-weight:bold; color:#d8b4fe;">dfs(8) → True</div>
                                    <div style="font-size:0.75rem; color:#64748b;">BASE CASE: start == len(s)</div>
                                </div>
                            </div>

                            <div style="border-top:1px solid #374151; padding-top:8px; margin-top:8px;">
                                <div style="display:flex; align-items:center; gap:8px; color:#4ade80;">
                                    <i class="fas fa-check-circle"></i>
                                    <span style="font-weight:bold;">Backtrack: True → True → True</span>
                                </div>
                                <div style="font-size:0.75rem; color:#64748b; margin-top:4px;">"leet" + "code" = ✅ Valid!</div>
                            </div>
                        </div>
                    </details>`
                ],
                codeTitle: "Evolution: Recursion → Memo → DP",
                code: `
##### 1. Brute Force Recursion (TLE - O(2^N))
def wordBreak_Brute(s, wordDict):
word_set = set(wordDict)  # O(1) lookup instead of O(N)!

def dfs(start_index):
    # 🎯 BASE CASE: Puri string khatam, segmentation successful!
    if start_index == len(s):
        return True
    
    # Try cutting at every possible end position
    for end_index in range(start_index + 1, len(s) + 1):
        current_word = s[start_index:end_index]
        
        # If current word is valid AND remaining is also valid
        if current_word in word_set and dfs(end_index):
            return True
    
    # No valid cut found from this position
    return False

return dfs(0)

##### 2. Memoization - Top Down (O(N³) Time, O(N) Space)
def wordBreak_Memo(s, wordDict):
word_set = set(wordDict)
memo = {}  # Cache: {start_index: can_break_from_here?}

def dfs(start_index):
    if start_index == len(s):
        return True
    
    # 🔍 Already computed? Return cached answer!
    if start_index in memo:
        return memo[start_index]
    
    for end_index in range(start_index + 1, len(s) + 1):
        current_word = s[start_index:end_index]
        
        if current_word in word_set and dfs(end_index):
            memo[start_index] = True  # 💾 Cache success
            return True
    
    memo[start_index] = False  # 💾 Cache failure too!
    return False

return dfs(0)

##### 3. Iterative DP - Bottom Up (O(N³) Time, O(N) Space)
# dp[i] = Can s[0:i] be segmented?
def wordBreak_DP(s, wordDict):
word_set = set(wordDict)
n = len(s)

# dp[i] means: Can s[0:i] be segmented into valid words?
dp = [False] * (n + 1)
dp[0] = True  # Empty string is always valid

# Fill table left to right
for end in range(1, n + 1):
    for start in range(end):
        # Recurrence:
        # 1. dp[start] = True → s[0:start] is valid ✓
        # 2. s[start:end] in dict → current chunk is valid ✓
        if dp[start] and s[start:end] in word_set:
            dp[end] = True
            break  # One valid cut is enough!

return dp[n]`
            }
        },
        {
            id: "partition-equal-subset-sum",
            title: "0/1 Knapsack (Partition)",
            leetcodeUrl: "https://leetcode.com/problems/partition-equal-subset-sum/",
            difficulty: "Good to Do",
            priority: "🟡",
            tags: ["Knapsack"],
            quiz: {
                description: "Can array be split into two equal sum subsets?",
                options: ["Greedy", "Find subset with sum = Total/2", "Sort and split", "Backtracking"],
                correct: 1,
                explanation: "If Total Sum is odd, impossible. Else, find subset with sum = Total/2. This is 0/1 Knapsack."
            },
            learn: {
                quickAlgo: [
                    "🎯 <strong>Target Sum kyun?</strong> Equal partition = Subset Sum with target <code>Total/2</code>",
                    "⚡ <code>if sum % 2 != 0</code> → Odd sum divide nahi ho sakta, return False",
                    "🔄 0/1 Knapsack logic: Iterate BACKWARDS <code>range(target, num-1, -1)</code>",
                    "✅ <code>dp[t] = dp[t] or dp[t - num]</code> — can we make sum 't'?",
                    "💡 Backwards loop zaroori hai for 1D array to avoid reusing same element"
                ],
                metrics: { time: "O(N × Sum)", space: "O(Sum)" },
                timeExplainer: `
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <div style="background:rgba(127,29,29,0.2); padding:12px; border-radius:8px; border:1px solid rgba(248,113,113,0.3);">
                            <p style="font-weight:bold; color:#f87171; font-size:1rem;">🔴 Brute Force (Recursion): O(2ⁿ)</p>
                            <div style="margin-top:8px; display:flex; flex-direction:column; gap:8px; font-size:0.875rem; color:#d1d5db;">
                                <p><strong>🤔 Kyun?</strong> Har element ke liye 2 choices:</p>
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; font-family:monospace; font-size:0.75rem;">
                                    TAKE   → Include in subset (LUN LE)<br>
                                    SKIP   → Don't include (MAT LE)
                                </div>

                                <p><strong>📊 Math Breakdown:</strong></p>
                                <ul style="list-style:disc; padding-left:16px; display:flex; flex-direction:column; gap:4px;">
                                    <li>N elements in array</li>
                                    <li>Each element: 2 choices (take/skip)</li>
                                    <li>Total subsets = <strong>2^N</strong></li>
                                </ul>

                                <p><strong>🎯 Real Numbers:</strong></p>
                                <table style="width:100%; font-size:0.75rem; border-collapse:collapse;">
                                    <tr style="border-bottom:1px solid #374151;">
                                        <td style="padding-top:4px; padding-bottom:4px;">N = 10</td>
                                        <td style="color:#fbbf24;">1,024 subsets ✅ Fast</td>
                                    </tr>
                                    <tr style="border-bottom:1px solid #374151;">
                                        <td style="padding-top:4px; padding-bottom:4px;">N = 20</td>
                                        <td style="color:#fbbf24;">~1 Million ⚠️ Slow</td>
                                    </tr>
                                    <tr style="border-bottom:1px solid #374151;">
                                        <td style="padding-top:4px; padding-bottom:4px;">N = 30</td>
                                        <td style="color:#f87171;">~1 Billion ❌ TLE</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-top:4px; padding-bottom:4px;">N = 50</td>
                                        <td style="color:#f87171;">~10¹⁵ 💀 Impossible</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <div style="background:rgba(20,83,45,0.2); padding:12px; border-radius:8px; border:1px solid rgba(74,222,128,0.3);">
                            <p style="font-weight:bold; color:#4ade80; font-size:1rem;">🟢 Memoization / DP: O(N × Sum)</p>
                            <div style="margin-top:8px; display:flex; flex-direction:column; gap:8px; font-size:0.875rem; color:#d1d5db;">
                                <p><strong>🤔 Why 2ⁿ → N × Sum?</strong></p>

                                <p><strong>Step 1: Count Unique States</strong></p>
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px;">
                                    <div style="font-family:monospace; font-size:0.75rem;">solve(<span style="color:#22d3ee;">index</span>, <span style="color:#a78bfa;">remaining_sum</span>)</div>
                                    <div style="font-size:0.75rem; color:#94a3b8;">index: 0 to N → N values</div>
                                    <div style="font-size:0.75rem; color:#94a3b8;">remaining_sum: 0 to Target → Target+1 values</div>
                                    <div style="color:#22d3ee; font-weight:bold;">Unique States = N × Target</div>
                                </div>

                                <p style="margin-top:8px;"><strong>Step 2: Work per State</strong></p>
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; font-family:monospace; font-size:0.75rem;">
take = solve(idx + 1, rem - nums[idx])  <span style="color:#4ade80;">← O(1)</span><br>
skip = solve(idx + 1, rem)               <span style="color:#4ade80;">← O(1)</span><br>
return take or skip                      <span style="color:#4ade80;">← O(1)</span>
                                </div>

                                <p style="margin-top:8px;"><strong>🧮 Final Calculation:</strong></p>
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; color:#67e8f9;">
                                    N × Sum states × O(1) work = <strong style="color:#4ade80;">O(N × Sum)</strong>
                                </div>
                            </div>
                        </div>

                        <div style="background:rgba(88,28,135,0.2); padding:12px; border-radius:8px; border:1px solid rgba(168,85,247,0.3);">
                            <p style="font-weight:bold; color:#a78bfa; font-size:1rem;">🟣 1D Space Optimized: O(Sum)</p>
                            <div style="margin-top:8px; font-size:0.875rem; color:#d1d5db;">
                                <p><strong>Key Trick:</strong> Iterate RIGHT to LEFT!</p>
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; font-family:monospace; font-size:0.75rem; margin-top:4px;">
for num in nums:<br>
for s in range(target, num - 1, <span style="color:#f87171;">-1</span>):  <span style="color:#fbbf24;">← BACKWARDS!</span><br>
    dp[s] = dp[s] or dp[s - num]
                                </div>
                                <p style="font-size:0.75rem; color:#94a3b8; margin-top:4px;">Backwards ensures each item used only once!</p>
                            </div>
                        </div>
                    </div>`,
                spaceExplainer: `
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <div style="background:#1e293b; padding:12px; border-radius:8px;">
                            <p style="font-weight:bold; color:#60a5fa;">1. Recursion Stack: O(N)</p>
                            <div style="font-size:0.875rem; color:#d1d5db; margin-top:4px;">
                                <p>Max depth = N (one decision per element)</p>
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; font-family:monospace; font-size:0.75rem; margin-top:4px;">
solve(0, target) → solve(1, ...) → ... → solve(N, ...)<br>
<span style="color:#fbbf24;">Max depth = N</span>
                                </div>
                            </div>
                        </div>

                        <div style="background:#1e293b; padding:12px; border-radius:8px;">
                            <p style="font-weight:bold; color:#4ade80;">2. DP Table: O(N × Sum) → O(Sum)</p>
                            <div style="font-size:0.875rem; color:#d1d5db; margin-top:4px;">
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; font-family:monospace; font-size:0.75rem;">
<span style="color:#64748b;"># 2D Table</span><br>
dp = [[False] * (target+1) for _ in range(N+1)]  <span style="color:#fbbf24;">← O(N × Sum)</span><br><br>
<span style="color:#64748b;"># Optimized 1D</span><br>
dp = [False] * (target + 1)  <span style="color:#4ade80;">← O(Sum)</span>
                                </div>
                            </div>
                        </div>

                        <div style="background:rgba(20,83,45,0.2); padding:12px; border-radius:8px; border:1px solid rgba(74,222,128,0.3);">
                            <p style="font-weight:bold; color:#4ade80;">Optimized Space: O(Sum)</p>
                            <p style="font-size:0.875rem; color:#94a3b8;">Where Sum = Total/2 (our target)</p>
                        </div>
                    </div>`,
                visual: `
                    <h4 style="color:#c026d3;">🎒 0/1 Knapsack: Take or Skip</h4>
                    <div style="display:flex; flex-direction:column; gap:12px; margin:15px 0; max-width:500px;">
                        <div style="background:#1e293b; padding:16px; border-radius:12px;">
                            <div style="font-size:0.82rem; color:#94a3b8; margin-bottom:12px;">nums = [1, 5, 11, 5], Target = 11</div>
                            <div style="display:flex; align-items:center; gap:20px; justify-content:center;">
                                <div style="text-align:center;">
                                    <div style="background:rgba(74,222,128,0.15); border:1px solid rgba(74,222,128,0.3); padding:10px 16px; border-radius:8px; margin-bottom:6px;">
                                        <span style="color:#4ade80; font-weight:bold; font-size:0.9rem;">TAKE</span>
                                    </div>
                                    <div style="font-size:0.75rem; color:#94a3b8;">Include in subset</div>
                                    <div style="font-family:monospace; font-size:0.78rem; color:#4ade80; margin-top:4px;">idx+1, sum-num</div>
                                </div>
                                <div style="color:#475569; font-size:1.5rem; font-weight:bold;">OR</div>
                                <div style="text-align:center;">
                                    <div style="background:rgba(248,113,113,0.15); border:1px solid rgba(248,113,113,0.3); padding:10px 16px; border-radius:8px; margin-bottom:6px;">
                                        <span style="color:#f87171; font-weight:bold; font-size:0.9rem;">SKIP</span>
                                    </div>
                                    <div style="font-size:0.75rem; color:#94a3b8;">Don't include</div>
                                    <div style="font-family:monospace; font-size:0.78rem; color:#f87171; margin-top:4px;">idx+1, sum (same)</div>
                                </div>
                            </div>
                        </div>
                        <div style="background:#0f172a; padding:10px 14px; border-radius:8px; font-size:0.82rem; color:#94a3b8; text-align:center;">
                            Each element: use <strong style="color:#fbbf24;">ONCE</strong> or not at all. Goal: subset summing to Target.
                        </div>
                    </div>`,
                crux: `<div style="display:flex; flex-direction:column; gap:12px;">
                    <div style="background:rgba(127,29,29,0.3); padding:12px; border-radius:8px; border-width:2px; border-style:solid; border-color:#ef4444;">
                        <div style="font-weight:bold; color:#f87171; margin-bottom:8px;">🚨 CRITICAL: 0/1 vs Unbounded Knapsack</div>
                        <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:8px; font-size:0.75rem;">
                            <div style="background:rgba(127,29,29,0.2); padding:8px; border-radius:6px;">
                                <div style="color:#f87171; font-weight:bold; margin-bottom:4px;">0/1 Knapsack</div>
                                <div style="font-family:monospace; background:rgba(0,0,0,0.3); padding:4px; border-radius:6px;">
                                    solve(<span style="color:#fbbf24;">idx + 1</span>, rem - num)
                                </div>
                                <div style="color:#94a3b8; margin-top:4px;">MOVE to next! Each item ONCE.</div>
                            </div>
                            <div style="background:rgba(20,83,45,0.2); padding:8px; border-radius:6px;">
                                <div style="color:#4ade80; font-weight:bold; margin-bottom:4px;">Unbounded</div>
                                <div style="font-family:monospace; background:rgba(0,0,0,0.3); padding:4px; border-radius:6px;">
                                    solve(<span style="color:#fbbf24;">idx</span>, rem - num)
                                </div>
                                <div style="color:#94a3b8; margin-top:4px;">STAY at same! Infinite supply.</div>
                            </div>
                        </div>
                    </div>

                    <div style="background:rgba(22,78,99,0.2); padding:12px; border-radius:8px; border:1px solid rgba(6,182,212,0.3);">
                        <div style="font-weight:bold; color:#22d3ee; margin-bottom:8px;">🎯 Problem Transformation</div>
                        <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; font-size:0.75rem;">
                            <div>1. Total sum odd? → <span style="color:#f87171;">IMPOSSIBLE</span></div>
                            <div>2. Target = sum / 2</div>
                            <div>3. Find ANY subset that sums to Target</div>
                            <div>4. If found, other subset also = Target! ✓</div>
                        </div>
                    </div>

                    <div style="background:rgba(88,28,135,0.2); padding:12px; border-radius:8px; border:1px solid rgba(168,85,247,0.3);">
                        <div style="font-weight:bold; color:#a78bfa; margin-bottom:8px;">🔗 Same Pattern Problems</div>
                        <ul style="font-size:0.875rem; color:#d1d5db; display:flex; flex-direction:column; gap:4px;">
                            <li>• <strong>Target Sum</strong> - Assign +/- to reach target</li>
                            <li>• <strong>Last Stone Weight II</strong> - Minimize remaining stone</li>
                            <li>• <strong>Subset Sum</strong> - Classic 0/1 Knapsack</li>
                            <li>• <strong>Count Subsets with Sum K</strong> - Count instead of boolean</li>
                        </ul>
                    </div>
                </div>`,
                trap: `<div style="display:flex; flex-direction:column; gap:8px;">
                    <div style="background:rgba(127,29,29,0.2); padding:8px; border-radius:6px; border:1px solid rgba(248,113,113,0.3);">
                        <div style="font-weight:bold; color:#f87171; font-size:0.875rem;">❌ Trap 1: Odd Sum</div>
                        <p style="font-size:0.75rem; color:#d1d5db;">If total sum is <strong>ODD</strong>, return False immediately!</p>
                        <p style="font-size:0.75rem; color:#94a3b8;">Can't split odd number into two equal integers.</p>
                    </div>

                    <div style="background:rgba(124,45,18,0.2); padding:8px; border-radius:6px; border:1px solid rgba(249,115,22,0.2);">
                        <div style="font-weight:bold; color:#fb923c; font-size:0.875rem;">❌ Trap 2: 1D DP Direction</div>
                        <div style="background:rgba(0,0,0,0.3); padding:4px; border-radius:6px; font-family:monospace; font-size:0.75rem; margin-top:4px;">
<span style="color:#f87171;">❌ for s in range(0, target+1):</span>  <span style="color:#64748b;"># LEFT to RIGHT</span><br>
<span style="color:#4ade80;">✅ for s in range(target, num-1, -1):</span>  <span style="color:#64748b;"># RIGHT to LEFT</span>
                        </div>
                        <p style="font-size:0.75rem; color:#94a3b8;">Wrong direction = using same item multiple times!</p>
                    </div>

                    <div style="background:rgba(113,63,18,0.2); padding:8px; border-radius:6px; border:1px solid rgba(234,179,8,0.3);">
                        <div style="font-weight:bold; color:#fbbf24; font-size:0.875rem;">❌ Trap 3: Greedy Doesn't Work</div>
                        <p style="font-size:0.75rem; color:#d1d5db;">[3, 1, 1, 2, 2, 1]: Greedy picks 3, then stuck!</p>
                        <p style="font-size:0.75rem; color:#94a3b8;">Optimal: {3, 2} and {1, 1, 2, 1} both sum to 5.</p>
                    </div>

                    <div style="background:rgba(30,58,138,0.3); padding:8px; border-radius:6px; border:1px solid rgba(59,130,246,0.3);">
                        <div style="font-weight:bold; color:#60a5fa; font-size:0.875rem;">❌ Trap 4: Confusing with Unbounded</div>
                        <p style="font-size:0.75rem; color:#d1d5db;">0/1 = <strong>idx + 1</strong> (move) | Unbounded = <strong>idx</strong> (stay)</p>
                        <p style="font-size:0.75rem; color:#94a3b8;">This single line difference changes everything!</p>
                    </div>
                </div>`,
                dryRun: [
                    `<details style="background:#1e293b; border-radius:8px; padding:8px; cursor:pointer;">
                        <summary style="display:flex; align-items:center; gap:12px; font-weight:500; color:#a5b4fc; user-select:none; list-style:none; font-size:0.875rem;">
                            <span style="background:rgba(99,102,241,0.2); color:#818cf8; padding:6px; border-radius:6px;">
                                <i class="fas fa-chevron-right" style="font-size:0.75rem;"></i>
                            </span>
                            <span>🔍 View Trace: [1, 5, 11, 5] (Hidden by Default)</span>
                        </summary>

                        <div style="margin-top:12px; padding-left:16px; border-left:2px solid rgba(99,102,241,0.2); display:flex; flex-direction:column; gap:12px; font-size:0.875rem; font-family:monospace; color:#d1d5db;">
                            <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; font-size:0.75rem;">
                                <strong>Input:</strong> nums = [1, 5, 11, 5]<br>
                                <strong>Total:</strong> 22 (even ✓)<br>
                                <strong>Target:</strong> 22 / 2 = 11
                            </div>

                            <div style="font-size:0.75rem;">
                                <strong>Find subset summing to 11:</strong>
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; margin-top:4px; display:flex; flex-direction:column; gap:4px;">
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        <span style="color:#fbbf24;">1.</span>
                                        <span>Try [1]: 1 ≠ 11</span>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        <span style="color:#fbbf24;">2.</span>
                                        <span>Try [1, 5]: 6 ≠ 11</span>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        <span style="color:#fbbf24;">3.</span>
                                        <span>Try [1, 5, 5]: 11 = 11 ✅</span>
                                    </div>
                                </div>
                            </div>

                            <div style="font-size:0.75rem;">
                                <strong>Or simpler - just take 11:</strong>
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; margin-top:4px;">
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        <span>Subset {11} sums to 11 ✅</span>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        <span>Remaining {1, 5, 5} also sums to 11 ✅</span>
                                    </div>
                                </div>
                            </div>

                            <div style="border-top:1px solid #374151; padding-top:8px; margin-top:8px;">
                                <div style="display:flex; align-items:center; gap:8px; color:#4ade80;">
                                    <i class="fas fa-check-circle"></i>
                                    <span style="font-weight:bold;">Answer: True</span>
                                </div>
                                <div style="font-size:0.75rem; color:#64748b; margin-top:4px;">Partition: {11} | {1, 5, 5}</div>
                            </div>
                        </div>
                    </details>`
                ],
                codeTitle: "Evolution: Recursion → Memo → 1D DP",
                code: `
##### 1. Brute Force Recursion (TLE - O(2^N))
def canPartition_Brute(nums):
total = sum(nums)
if total % 2 != 0:  # Odd sum? Impossible!
    return False
target = total // 2

def solve(index, remaining):
    # 🎯 BASE CASES
    if remaining == 0: return True   # Found valid subset!
    if remaining < 0: return False   # Over budget
    if index >= len(nums): return False  # No items left
    
    # TAKE or SKIP (Lun ya Mat Lun)
    take = solve(index + 1, remaining - nums[index])  # ← idx + 1!
    skip = solve(index + 1, remaining)
    
    return take or skip

return solve(0, target)

##### 2. Memoization - Top Down (O(N × Sum) Time & Space)
def canPartition_Memo(nums):
total = sum(nums)
if total % 2 != 0:
    return False
target = total // 2

memo = {}

def solve(index, remaining):
    if remaining == 0: return True
    if remaining < 0 or index >= len(nums): return False
    
    if (index, remaining) in memo:
        return memo[(index, remaining)]
    
    take = solve(index + 1, remaining - nums[index])
    skip = solve(index + 1, remaining)
    
    memo[(index, remaining)] = take or skip
    return memo[(index, remaining)]

return solve(0, target)

##### 3. 1D DP - Space Optimized (O(N × Sum) Time, O(Sum) Space)
def canPartition_DP(nums):
total = sum(nums)
if total % 2 != 0:
    return False
target = total // 2

# dp[s] = True if we can make sum 's' using some subset
dp = [False] * (target + 1)
dp[0] = True  # Empty subset = sum 0

for num in nums:
    # 🚨 CRITICAL: Iterate BACKWARDS!
    # This ensures each num is used at most ONCE
    for s in range(target, num - 1, -1):
        if dp[s - num]:  # Could make (s - num) before?
            dp[s] = True  # Now can make s!
    
    if dp[target]:  # Early exit optimization
        return True

return dp[target]`
            }
        },
        {
            id: "edit-distance",
            title: "Edit Distance",
            leetcodeUrl: "https://leetcode.com/problems/edit-distance/",
            difficulty: "Good to Do",
            priority: "🟡",
            tags: ["String DP"],
            quiz: {
                description: "Min ops to convert word1 to word2.",
                options: ["LCS variation", "Greedy", "BFS", "Two Pointers"],
                correct: 0,
                explanation: "2D DP. If match: dp[i-1][j-1]. If mismatch: 1 + min(Insert, Delete, Replace)."
            },
            learn: {
                quickAlgo: [
                    "if w1[i] == w2[j]:                 # 🎯 Match: No op needed",
                    "    return solve(i+1, j+1)",
                    "else:",
                    "    insert = 1 + solve(i, j+1)     # ⚡ Insert char",
                    "    delete = 1 + solve(i+1, j)     # ⚡ Delete char",
                    "    replace = 1 + solve(i+1, j+1)  # 🔄 Replace char",
                    "    return min(insert, delete, replace)"
                ],
                metrics: { time: "O(M×N)", space: "O(M×N)" },
                timeExplainer: `
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <div style="background:rgba(127,29,29,0.2); padding:12px; border-radius:8px; border:1px solid rgba(248,113,113,0.3);">
                            <p style="font-weight:bold; color:#f87171; font-size:1rem;">🔴 Brute Force (Recursion): O(3^(M+N))</p>
                            <div style="margin-top:8px; display:flex; flex-direction:column; gap:8px; font-size:0.875rem; color:#d1d5db;">
                                <p><strong>🤔 Kyun?</strong> Har mismatch pe 3 choices hain:</p>
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; font-family:monospace; font-size:0.75rem;">
                                    INSERT  → (i, j-1)    <span style="color:#64748b;"># Add char to word1</span><br>
                                    DELETE  → (i-1, j)    <span style="color:#64748b;"># Remove char from word1</span><br>
                                    REPLACE → (i-1, j-1)  <span style="color:#64748b;"># Change char in word1</span>
                                </div>

                                <p><strong>📊 Math Breakdown:</strong></p>
                                <ul style="list-style:disc; padding-left:16px; display:flex; flex-direction:column; gap:4px;">
                                    <li>At each step: <strong>3 branches</strong> (worst case)</li>
                                    <li>Max depth: <strong>M + N</strong> (both strings empty)</li>
                                    <li>Total: 3^(M+N) calls!</li>
                                </ul>

                                <p><strong>🎯 Real Numbers:</strong></p>
                                <table style="width:100%; font-size:0.75rem; border-collapse:collapse;">
                                    <tr style="border-bottom:1px solid #374151;">
                                        <td style="padding-top:4px; padding-bottom:4px;">M=5, N=5</td>
                                        <td style="color:#fbbf24;">3^10 ≈ 59K ops ✅</td>
                                    </tr>
                                    <tr style="border-bottom:1px solid #374151;">
                                        <td style="padding-top:4px; padding-bottom:4px;">M=10, N=10</td>
                                        <td style="color:#fb923c;">3^20 ≈ 3.5 Billion ⚠️ TLE</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-top:4px; padding-bottom:4px;">M=20, N=20</td>
                                        <td style="color:#f87171;">3^40 ≈ 10^19 💀 Impossible</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <div style="background:rgba(20,83,45,0.2); padding:12px; border-radius:8px; border:1px solid rgba(74,222,128,0.3);">
                            <p style="font-weight:bold; color:#4ade80; font-size:1rem;">🟢 Memoization / DP: O(M × N)</p>
                            <div style="margin-top:8px; display:flex; flex-direction:column; gap:8px; font-size:0.875rem; color:#d1d5db;">
                                <p><strong>🤔 Why 3^(M+N) → M×N?</strong></p>

                                <p><strong>Step 1: Count Unique States</strong></p>
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px;">
                                    <div style="font-family:monospace; font-size:0.75rem;">solve(<span style="color:#22d3ee;">i</span>, <span style="color:#a78bfa;">j</span>)</div>
                                    <div style="font-size:0.75rem; color:#94a3b8;">i can be: 0 to M → (M+1) values</div>
                                    <div style="font-size:0.75rem; color:#94a3b8;">j can be: 0 to N → (N+1) values</div>
                                    <div style="color:#22d3ee; font-weight:bold;">Unique States = (M+1) × (N+1) ≈ O(M×N)</div>
                                </div>

                                <p style="margin-top:8px;"><strong>Step 2: Work per State</strong></p>
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; font-family:monospace; font-size:0.75rem;">
if word1[i-1] == word2[j-1]:  <span style="color:#4ade80;">← O(1) compare</span><br>
return dp[i-1][j-1]       <span style="color:#4ade80;">← O(1) lookup</span><br>
else:<br>
return 1 + min(...)       <span style="color:#4ade80;">← O(1) min of 3</span>
                                </div>

                                <p style="margin-top:8px;"><strong>🧮 Final Calculation:</strong></p>
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; color:#67e8f9;">
                                    M×N states × O(1) work = <strong style="color:#4ade80;">O(M×N)</strong>
                                </div>
                            </div>
                        </div>

                        <div style="background:rgba(88,28,135,0.2); padding:12px; border-radius:8px; border:1px solid rgba(168,85,247,0.3);">
                            <p style="font-weight:bold; color:#a78bfa; font-size:1rem;">🟣 Space Optimized: O(min(M, N))</p>
                            <div style="margin-top:8px; font-size:0.875rem; color:#d1d5db;">
                                <p><strong>Only need previous row!</strong></p>
                                <ul style="list-style:disc; padding-left:16px; font-size:0.75rem; display:flex; flex-direction:column; gap:4px;">
                                    <li>Current cell only depends on: top, left, diagonal</li>
                                    <li>Keep 2 rows (previous + current)</li>
                                    <li>Space: O(min(M, N)) if we iterate smarter</li>
                                </ul>
                            </div>
                        </div>
                    </div>`,
                spaceExplainer: `
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <div style="background:#1e293b; padding:12px; border-radius:8px;">
                            <p style="font-weight:bold; color:#60a5fa;">1. Recursion Stack: O(M + N)</p>
                            <div style="font-size:0.875rem; color:#d1d5db; margin-top:4px;">
                                <p>Max depth when both strings shrink one char at a time</p>
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; font-family:monospace; font-size:0.75rem; margin-top:4px;">
solve(M, N) → solve(M-1, N) → ... → solve(0, N)<br>
     → solve(0, N-1) → ... → solve(0, 0)<br>
<span style="color:#fbbf24;">Max depth = M + N</span>
                                </div>
                            </div>
                        </div>

                        <div style="background:#1e293b; padding:12px; border-radius:8px;">
                            <p style="font-weight:bold; color:#4ade80;">2. Memoization Cache / DP Table: O(M × N)</p>
                            <div style="font-size:0.875rem; color:#d1d5db; margin-top:4px;">
                                <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; font-family:monospace; font-size:0.75rem;">
dp = [[0] * (N+1) for _ in range(M+1)]<br>
<span style="color:#64748b;"># (M+1) rows × (N+1) columns</span><br>
<span style="color:#22d3ee;">Size ≈ M × N cells</span>
                                </div>
                            </div>
                        </div>

                        <div style="background:rgba(20,83,45,0.2); padding:12px; border-radius:8px; border:1px solid rgba(74,222,128,0.3);">
                            <p style="font-weight:bold; color:#4ade80;">Total Space: O(M × N)</p>
                            <p style="font-size:0.875rem; color:#94a3b8;">Can be optimized to O(min(M,N)) using 2 rows.</p>
                        </div>
                    </div>`,
                visual: `
                    <h4 style="color:#c026d3;">⚡ The 3 Operations: Insert / Delete / Replace</h4>
                    <div style="display:flex; flex-direction:column; gap:12px; margin:15px 0; max-width:550px;">
                        <div style="background:#1e293b; padding:16px; border-radius:12px;">
                            <div style="font-size:0.82rem; color:#94a3b8; margin-bottom:12px;">Convert "CAT" → "CUT"</div>
                            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px;">
                                <div style="background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.3); padding:12px; border-radius:10px; text-align:center;">
                                    <div style="color:#38bdf8; font-weight:bold; font-size:0.9rem; margin-bottom:6px;">INSERT</div>
                                    <div style="font-family:monospace; font-size:0.82rem; color:#cbd5e1;">CAT → C<span style="color:#4ade80; font-weight:bold;">U</span>AT</div>
                                    <div style="font-family:monospace; font-size:0.75rem; color:#64748b; margin-top:4px;">(i, j-1)</div>
                                </div>
                                <div style="background:rgba(248,113,113,0.1); border:1px solid rgba(248,113,113,0.3); padding:12px; border-radius:10px; text-align:center;">
                                    <div style="color:#f87171; font-weight:bold; font-size:0.9rem; margin-bottom:6px;">DELETE</div>
                                    <div style="font-family:monospace; font-size:0.82rem; color:#cbd5e1;">CAT → <span style="color:#f87171; text-decoration:line-through;">C</span>AT</div>
                                    <div style="font-family:monospace; font-size:0.75rem; color:#64748b; margin-top:4px;">(i-1, j)</div>
                                </div>
                                <div style="background:rgba(251,191,36,0.1); border:1px solid rgba(251,191,36,0.3); padding:12px; border-radius:10px; text-align:center;">
                                    <div style="color:#fbbf24; font-weight:bold; font-size:0.9rem; margin-bottom:6px;">REPLACE</div>
                                    <div style="font-family:monospace; font-size:0.82rem; color:#cbd5e1;">CAT → C<span style="color:#fbbf24; font-weight:bold;">U</span>T</div>
                                    <div style="font-family:monospace; font-size:0.75rem; color:#64748b; margin-top:4px;">(i-1, j-1)</div>
                                </div>
                            </div>
                        </div>
                        <div style="background:#0f172a; padding:10px 14px; border-radius:8px; font-size:0.82rem; color:#94a3b8; text-align:center;">
                            <span style="color:#4ade80;">MATCH → diagonal (0 cost)</span> | <span style="color:#f87171;">MISMATCH → min(3 ops) + 1</span>
                        </div>
                    </div>`,
                crux: `<div style="display:flex; flex-direction:column; gap:12px;">
                    <div style="background:rgba(22,78,99,0.2); padding:12px; border-radius:8px; border:1px solid rgba(6,182,212,0.3);">
                        <div style="font-weight:bold; color:#22d3ee; margin-bottom:8px;">🎯 The Core Recurrence</div>
                        <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; font-family:monospace; font-size:0.75rem;">
if word1[i-1] == word2[j-1]:  <span style="color:#4ade80;"># MATCH!</span><br>
dp[i][j] = dp[i-1][j-1]   <span style="color:#4ade80;"># No operation needed</span><br>
else:                         <span style="color:#f87171;"># MISMATCH</span><br>
dp[i][j] = 1 + min(<br>
    dp[i-1][j],           <span style="color:#f87171;"># DELETE from word1</span><br>
    dp[i][j-1],           <span style="color:#60a5fa;"># INSERT into word1</span><br>
    dp[i-1][j-1]          <span style="color:#fbbf24;"># REPLACE in word1</span><br>
)
                        </div>
                    </div>

                    <div style="background:rgba(113,63,18,0.2); padding:12px; border-radius:8px; border:1px solid rgba(234,179,8,0.3);">
                        <div style="font-weight:bold; color:#fbbf24; margin-bottom:8px;">💡 Key Insight: LCS Connection</div>
                        <p style="font-size:0.875rem; color:#d1d5db;">Edit Distance ≈ <strong>Total Length - 2×LCS</strong></p>
                        <p style="font-size:0.75rem; color:#94a3b8;">But direct DP is easier to understand and implement!</p>
                    </div>

                    <div style="background:rgba(88,28,135,0.2); padding:12px; border-radius:8px; border:1px solid rgba(168,85,247,0.3);">
                        <div style="font-weight:bold; color:#a78bfa; margin-bottom:8px;">🔗 Same Pattern Problems</div>
                        <ul style="font-size:0.875rem; color:#d1d5db; display:flex; flex-direction:column; gap:4px;">
                            <li>• <strong>LCS</strong> - Match = take, Mismatch = skip</li>
                            <li>• <strong>One Edit Distance</strong> - Check if exactly 1 edit</li>
                            <li>• <strong>Delete Operation for Two Strings</strong> - Only delete allowed</li>
                            <li>• <strong>Minimum ASCII Delete Sum</strong> - Weighted deletions</li>
                        </ul>
                    </div>
                </div>`,
                trap: `<div style="display:flex; flex-direction:column; gap:8px;">
                    <div style="background:rgba(127,29,29,0.2); padding:8px; border-radius:6px; border:1px solid rgba(248,113,113,0.3);">
                        <div style="font-weight:bold; color:#f87171; font-size:0.875rem;">❌ Trap 1: Base Case Confusion</div>
                        <div style="background:rgba(0,0,0,0.3); padding:4px; border-radius:6px; font-family:monospace; font-size:0.75rem; margin-top:4px;">
dp[i][0] = i  <span style="color:#64748b;"># Delete all i chars from word1</span><br>
dp[0][j] = j  <span style="color:#64748b;"># Insert all j chars into word1</span>
                        </div>
                    </div>

                    <div style="background:rgba(124,45,18,0.2); padding:8px; border-radius:6px; border:1px solid rgba(249,115,22,0.2);">
                        <div style="font-weight:bold; color:#fb923c; font-size:0.875rem;">❌ Trap 2: Index Off-by-One</div>
                        <p style="font-size:0.75rem; color:#d1d5db;">DP uses 1-indexed! Compare <code>word1[i-1]</code> with <code>word2[j-1]</code></p>
                        <p style="font-size:0.75rem; color:#94a3b8;">dp[i][j] represents first i chars of word1 and first j chars of word2</p>
                    </div>

                    <div style="background:rgba(113,63,18,0.2); padding:8px; border-radius:6px; border:1px solid rgba(234,179,8,0.3);">
                        <div style="font-weight:bold; color:#fbbf24; font-size:0.875rem;">❌ Trap 3: Forgetting +1</div>
                        <p style="font-size:0.75rem; color:#d1d5db;">INSERT/DELETE/REPLACE each costs <strong>1 operation</strong></p>
                        <p style="font-size:0.75rem; color:#94a3b8;">Return value is: <code>1 + min(...)</code> not just <code>min(...)</code></p>
                    </div>

                    <div style="background:rgba(30,58,138,0.3); padding:8px; border-radius:6px; border:1px solid rgba(59,130,246,0.3);">
                        <div style="font-weight:bold; color:#60a5fa; font-size:0.875rem;">❌ Trap 4: Greedy Doesn't Work</div>
                        <p style="font-size:0.75rem; color:#d1d5db;">"horse" → "ros": Greedy might replace h→r, but optimal is different!</p>
                        <p style="font-size:0.75rem; color:#94a3b8;">Must try all 3 options and take minimum.</p>
                    </div>
                </div>`,
                dryRun: [
                    `<details style="background:#1e293b; border-radius:8px; padding:8px; cursor:pointer;">
                        <summary style="display:flex; align-items:center; gap:12px; font-weight:500; color:#a5b4fc; user-select:none; list-style:none; font-size:0.875rem;">
                            <span style="background:rgba(99,102,241,0.2); color:#818cf8; padding:6px; border-radius:6px;">
                                <i class="fas fa-chevron-right" style="font-size:0.75rem;"></i>
                            </span>
                            <span>🔍 View Trace: "CAT" → "CUT" (Hidden by Default)</span>
                        </summary>

                        <div style="margin-top:12px; padding-left:16px; border-left:2px solid rgba(99,102,241,0.2); display:flex; flex-direction:column; gap:12px; font-size:0.875rem; font-family:monospace; color:#d1d5db;">
                            <div style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; font-size:0.75rem;">
                                <strong>Input:</strong> word1 = "CAT", word2 = "CUT"<br>
                                <strong>Goal:</strong> Minimum operations to convert CAT → CUT
                            </div>

                            <div style="font-size:0.75rem;">
                                <strong>DP Table (rows=word1, cols=word2):</strong>
                                <pre style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; margin-top:4px; overflow-x:auto;">
""  C   U   T
""   0   1   2   3  ← Insert C, U, T
C    1  [0]  1   2  ← C==C, cost=0
A    2   1  [1]  2  ← A≠U, min(1,1,0)+1=1
T    3   2   2  [1] ← T==T, cost=dp[2][2]=1
                                </pre>
                            </div>

                            <div style="display:flex; flex-direction:column; gap:8px; font-size:0.75rem;">
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <span style="color:#4ade80;">1.</span>
                                    <span>dp[1][1]: C == C → dp[0][0] = <strong>0</strong></span>
                                </div>
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <span style="color:#fbbf24;">2.</span>
                                    <span>dp[2][2]: A ≠ U → 1 + min(dp[1][2], dp[2][1], dp[1][1])</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:8px; padding-left:16px;">
                                    <span>= 1 + min(1, 1, 0) = <strong>1</strong> (REPLACE A→U)</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <span style="color:#4ade80;">3.</span>
                                    <span>dp[3][3]: T == T → dp[2][2] = <strong>1</strong></span>
                                </div>
                            </div>

                            <div style="border-top:1px solid #374151; padding-top:8px; margin-top:8px;">
                                <div style="display:flex; align-items:center; gap:8px; color:#4ade80;">
                                    <i class="fas fa-check-circle"></i>
                                    <span style="font-weight:bold;">Answer: 1 (Replace 'A' with 'U')</span>
                                </div>
                                <div style="font-size:0.75rem; color:#64748b; margin-top:4px;">CAT → C<span style="color:#fbbf24;">U</span>T</div>
                            </div>
                        </div>
                    </details>`
                ],
                codeTitle: "Evolution: Recursion → Memo → DP",
                code: `
##### 1. Brute Force Recursion (TLE - O(3^(M+N)))
def minDistance_Brute(word1, word2):
def solve(i, j):
    # 🎯 BASE CASES
    if i == 0: return j  # Insert remaining j chars
    if j == 0: return i  # Delete remaining i chars
    
    # If chars MATCH - no operation needed!
    if word1[i-1] == word2[j-1]:
        return solve(i-1, j-1)
    
    # If MISMATCH - try all 3 operations, pick minimum
    insert_op = solve(i, j-1)      # Insert word2[j-1] into word1
    delete_op = solve(i-1, j)      # Delete word1[i-1]
    replace_op = solve(i-1, j-1)   # Replace word1[i-1] with word2[j-1]
    
    return 1 + min(insert_op, delete_op, replace_op)

return solve(len(word1), len(word2))

##### 2. Memoization - Top Down (O(M×N) Time & Space)
def minDistance_Memo(word1, word2):
memo = {}

def solve(i, j):
    if i == 0: return j
    if j == 0: return i
    
    if (i, j) in memo:
        return memo[(i, j)]
    
    if word1[i-1] == word2[j-1]:
        result = solve(i-1, j-1)  # Match! No cost
    else:
        insert_op = solve(i, j-1)
        delete_op = solve(i-1, j)
        replace_op = solve(i-1, j-1)
        result = 1 + min(insert_op, delete_op, replace_op)
    
    memo[(i, j)] = result
    return result

return solve(len(word1), len(word2))

##### 3. Iterative DP - Bottom Up (O(M×N) Time & Space)
def minDistance_DP(word1, word2):
m, n = len(word1), len(word2)

# dp[i][j] = min ops to convert word1[0:i] → word2[0:j]
dp = [[0] * (n + 1) for _ in range(m + 1)]

# Base cases: converting empty string
for i in range(m + 1):
    dp[i][0] = i  # Delete all i chars
for j in range(n + 1):
    dp[0][j] = j  # Insert all j chars

# Fill table
for i in range(1, m + 1):
    for j in range(1, n + 1):
        if word1[i-1] == word2[j-1]:
            dp[i][j] = dp[i-1][j-1]  # No operation
        else:
            dp[i][j] = 1 + min(
                dp[i-1][j],    # DELETE
                dp[i][j-1],    # INSERT
                dp[i-1][j-1]   # REPLACE
            )

return dp[m][n]`
            }
        }
    ]
}
