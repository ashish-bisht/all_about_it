// Auto-generated from data/ folder
// Run `python3 build_data.py` to regenerate
// Source: data/dsa/stack.js
// Topic: stack

// Stack data
// Extracted from data.js

const topic_stack = {
    id: "stack",
    title: "Monotonic Stack Mastery",
    description: "Principal Engineer DSA • Day 3",
    color: "#7c3aed",
    icon: "fas fa-layer-group",
    mentalModel: {
        whenToApply: [
            { label: "📈 Next Greater/Smaller", desc: "Find next larger or smaller element → Monotonic Stack" },
            { label: "📊 Rectangle Area", desc: "Max rectangle in histogram → Monotonic Increasing Stack" },
            { label: "💧 Trapping Water", desc: "Water between bars → Decreasing Stack (horizontal slicing)" },
            { label: "💥 Collision/Matching", desc: "Parentheses, Asteroids → Stack simulation" },
            { label: "⏳ Delayed Processing", desc: "Wait for future info to resolve current element" }
        ],
        patterns: [
            { algo: "NGE (Decreasing Stack)", use: "Next Greater Element", time: "O(N)", space: "O(N)", template: "while stack and arr[top] < curr: pop, resolve" },
            { algo: "NSE (Increasing Stack)", use: "Next Smaller Element", time: "O(N)", space: "O(N)", template: "while stack and arr[top] > curr: pop, resolve" },
            { algo: "Histogram Rectangle", use: "Max rectangle area", time: "O(N)", space: "O(N)", template: "Increasing stack + sentinel, width = i - stack[-1] - 1" },
            { algo: "Trapping Rain Water", use: "Water between bars", time: "O(N)", space: "O(N)", template: "Decreasing stack, floor = pop, water = min(L,R) - floor" },
            { algo: "Stack Simulation", use: "Collisions, matching", time: "O(N)", space: "O(N)", template: "Push stable, battle on conflict" }
        ],
        decisionTree: `
<div style="background:#1e293b; padding:25px; border-radius:16px; margin:15px 0; border:1px solid rgba(255,255,255,0.1);">
<h4 style="color:#a78bfa; margin-bottom:20px; text-align:center; font-size:1.1rem;">🧠 Stack Pattern Recognition</h4>
<div style="font-family:monospace; font-size:0.85rem; line-height:1.8;">
<pre style="color:#e2e8f0; text-align:left; margin:0;">
              ┌──────────────────────────────┐
              │ "What are you looking for?"  │
              └──────────────┬───────────────┘
                             │
     ┌───────────────────────┼───────────────────────┐
     ▼                       ▼                       ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ NEXT GREATER │      │ AREA/RANGE   │      │  MATCHING/   │
│    ELEMENT   │      │  PROBLEMS    │      │  COLLISION   │
└──────┬───────┘      └──────┬───────┘      └──────┬───────┘
       │                     │                     │
       ▼                     ▼                     ▼
 ┌───────────────┐    ┌───────────────┐    ┌───────────────┐
 │ DECREASING    │    │ Histogram?    │    │ Parentheses?  │
 │ Stack         │    │ → INCREASING  │    │ Asteroids?    │
 │               │    │ Stack         │    │ → Simulate!   │
 │ Pop when      │    │               │    │               │
 │ curr > top    │    │ Water Trap?   │    │ Push stable,  │
 └───────────────┘    │ → DECREASING  │    │ battle on     │
                      │ Stack         │    │ conflict      │
                      └───────────────┘    └───────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │ 🔑 KEY INSIGHT: Stack stores UNRESOLVED elements        │
  │    When conflict occurs → POP and RESOLVE!             │
  │    Remaining in stack → No answer (-1 or default)       │
  └─────────────────────────────────────────────────────────┘
</pre>
</div>
</div>`,
        codeTemplates: `
<div style="background:#0f172a; padding:20px; border-radius:12px; margin:15px 0;">
<h4 style="color:#10b981; margin-bottom:15px;">📝 Stack Templates</h4>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
1️⃣ Next Greater Element (NGE)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def nextGreaterElement(arr):
    n = len(arr)
    result = [-1] * n
    stack = []  # Store INDICES
    
    for current_index in range(n):
        # Pop all smaller elements
        while stack and arr[stack[-1]] < arr[current_index]:
            smaller_index = stack.pop()
            result[smaller_index] = arr[current_index]
        stack.append(current_index)
    return result
</pre>
</details>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
2️⃣ Largest Rectangle in Histogram
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def largestRectangleArea(heights):
    heights.append(0)  # Sentinel to clear stack
    stack = [-1]       # Sentinel for left boundary
    max_area = 0
    
    for i, h in enumerate(heights):
        while stack[-1] != -1 and h < heights[stack[-1]]:
            height = heights[stack.pop()]
            width = i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    return max_area
</pre>
</details>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
3️⃣ Trapping Rain Water (Stack)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def trap(height):
    stack = []  # Decreasing stack
    water = 0
    
    for i, h in enumerate(height):
        while stack and h > height[stack[-1]]:
            floor = stack.pop()
            if not stack: break  # No left wall
            left = stack[-1]
            width = i - left - 1
            bounded_h = min(height[left], h) - height[floor]
            water += width * bounded_h
        stack.append(i)
    return water
</pre>
</details>

<details>
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
4️⃣ Asteroid Collision
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def asteroidCollision(asteroids):
    stack = []
    for current in asteroids:
        while stack and current < 0 < stack[-1]:
            if abs(current) > stack[-1]:
                stack.pop(); continue
            elif abs(current) == stack[-1]:
                stack.pop(); break
            else:
                break
        else:
            stack.append(current)
    return stack
</pre>
</details>
</div>`,
        safetyCheck: [
            { label: "📋 Store INDICES!", desc: "Always store indices in stack, not values: <code>stack.append(i)</code>" },
            { label: "🔍 Check empty!", desc: "<code>if stack</code> before <code>stack[-1]</code> or <code>stack.pop()</code>" },
            { label: "📉 Decreasing = NGE!", desc: "Next GREATER → Decreasing stack (pop when curr > top)" },
            { label: "📈 Increasing = NSE!", desc: "Next SMALLER → Increasing stack (pop when curr < top)" },
            { label: "🚨 Sentinel trick!", desc: "Append 0 to force-clear stack at end (Histogram)" },
            { label: "⚠️ Width formula!", desc: "Rectangle width = <code>i - stack[-1] - 1</code> (not i - popped)" }
        ]
    },
    questions: [
        {
            id: "next-greater-element",
            title: "Next Greater Element",
            leetcodeUrl: "https://leetcode.com/problems/next-greater-element-i/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Monotonic Stack"],
            quiz: {
                description: "For each element, find next greater to the right. Pattern?",
                options: [
                    "Nested loops O(n²)",
                    "Monotonic Decreasing Stack (traverse right to left)",
                    "Binary search O(n log n)",
                    "Heap-based"
                ],
                correct: 1,
                explanation: "Monotonic Stack! Traverse right to left (or store indices). If current > stack.top, current is NGE for top. Stack maintains decreasing order. O(n)!"
            },
            learn: {
                quickAlgo: [
                    "res = [-1] * n",
                    "stack = []                     # 🎯 Store INDICES",
                    "for i in range(len(nums)):",
                    "    while stack and nums[stack[-1]] < nums[i]: # ⚡ Found NGE!",
                    "        idx = stack.pop()",
                    "        res[idx] = nums[i]     # ✅ Map NGE for popped index",
                    "    stack.append(i)            # 💡 Push current index",
                    "return res"
                ],
                metrics: { time: "O(N)", space: "O(N)" },
                timeExplainer: "<strong>Monotonic Stack:</strong><br>• Each element pushed ONCE<br>• Each element popped ONCE<br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Stack stores indices<br>• Worst Case: Decreasing order [5,4,3,2,1] -> Stack holds all N elements.<br><strong>Aux:</strong> <code>O(N)</code>",
                visual: `<div style="font-family:monospace; font-size:0.85rem;">
                    <strong style="color:#22d3ee;">Next Greater Element: "Look Right for Taller"</strong>
                    <div style="display:flex; align-items:flex-end; gap:4px; margin:15px 0 8px; height:120px;">
                        <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                            <div style="font-size:0.7rem; color:#94a3b8;">4</div>
                            <div style="width:40px; height:40px; background:#334155; border-radius:4px 4px 0 0; display:flex; align-items:center; justify-content:center; color:#e2e8f0; font-weight:bold;">4</div>
                        </div>
                        <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                            <div style="font-size:0.7rem; color:#22d3ee;">→5</div>
                            <div style="width:40px; height:50px; background:#0e7490; border:2px solid #22d3ee; border-radius:4px 4px 0 0; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:bold;">5</div>
                        </div>
                        <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                            <div style="font-size:0.7rem; color:#94a3b8;">2</div>
                            <div style="width:40px; height:20px; background:#334155; border-radius:4px 4px 0 0; display:flex; align-items:center; justify-content:center; color:#e2e8f0; font-weight:bold;">2</div>
                        </div>
                        <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                            <div style="font-size:0.7rem; color:#22d3ee;">→10</div>
                            <div style="width:40px; height:100px; background:#0e7490; border:2px solid #22d3ee; border-radius:4px 4px 0 0; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:bold;">10</div>
                        </div>
                        <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                            <div style="font-size:0.7rem; color:#ef4444;">-1</div>
                            <div style="width:40px; height:80px; background:#334155; border-radius:4px 4px 0 0; display:flex; align-items:center; justify-content:center; color:#e2e8f0; font-weight:bold;">8</div>
                        </div>
                    </div>
                    <div style="background:#0f172a; padding:10px; border-radius:6px; margin-top:8px;">
                        <div style="color:#fbbf24;">Stack (decreasing): stores waiting elements</div>
                        <div style="color:#94a3b8;">When <span style="color:#22d3ee;">BIGGER</span> element arrives → pop all smaller = their NGE found!</div>
                    </div>
                </div>`,
                crux: "<strong>Framework (Monotonic Decreasing Stack):</strong><br>1. Store <strong>Indices</strong> (better than values).<br>2. Loop `i` from `0` to `N-1`.<br>3. <strong>Resolving Conflict:</strong> While `arr[stack.top] < arr[i]`: We found the Next Greater for stack.top! <br>➡ `pop()` and record result.<br><br><strong>Logic Ek Line Mein:</strong><br>Jab bhi koi BADA element aata hai, toh stack se sab CHOTE elements pop karke unka answer set kar do!",
                trap: "<strong>Leftovers:</strong><br>Elements remaining in stack have NO next greater element. Their result remains `-1` (default).",
                dryRun: [
                    "<strong>Init:</strong> arr=[4,5,2,10,8]. Result=[-1]*5. Stack=[]",
                    "<strong>i=0 (Val 4):</strong> Stack empty. Push 0. Stack=[0(4)].",
                    "<strong>i=1 (Val 5):</strong> 4 < 5? YES! <span style='color:var(--success)'>Found NGE for 4 is 5.</span> Pop 0. Stack=[]. Push 1. Stack=[1(5)].",
                    "<strong>i=2 (Val 2):</strong> 5 < 2? NO. Push 2. Stack=[1(5), 2(2)].",
                    "<strong>i=3 (Val 10):</strong> 2 < 10? YES! Pop 2 (NGE=10). 5 < 10? YES! Pop 1 (NGE=10). Push 3. Stack=[3(10)].",
                    "<strong>i=4 (Val 8):</strong> 10 < 8? NO. Push 4. Stack=[3(10), 4(8)].",
                    "<strong>End:</strong> Stack [3,4] have no NGE (-1)."
                ],
                codeTitle: "Python Solution (Better Variable Names)",
                code: `def nextGreaterElement(arr):
    n = len(arr)
    result = [-1] * n
    stack = []  # Indices store karenge
    
    for current_index in range(n):
        current_value = arr[current_index]
        
        # Jab tak stack mein chote elements hain
        while stack and arr[stack[-1]] < current_value:
            smaller_index = stack.pop()
            result[smaller_index] = current_value
        
        stack.append(current_index)
    
    return result`,
                strategy: `<strong>Monotonic Decreasing Stack Strategy:</strong><br><strong>Step 1:</strong> Initialize result array with -1 (default: no NGE).<br><strong>Step 2:</strong> Traverse left to right. For each element, pop all smaller elements from stack — current element IS their NGE.<br><strong>Step 3:</strong> Push current index onto stack.<br><br><strong>Why it works:</strong> Stack maintains decreasing order. When a bigger element arrives, it resolves all waiting smaller elements.`,
                codeDetailed: `def nextGreaterElement(arr):
    n = len(arr)
    result = [-1] * n       # ← Default: no NGE found
    stack = []               # ← Stores INDICES (not values)
    
    for current_index in range(n):
        current_value = arr[current_index]
        
        # ← Pop all elements SMALLER than current
        # ← Current is NGE for all of them!
        while stack and arr[stack[-1]] < current_value:
            smaller_index = stack.pop()
            result[smaller_index] = current_value  # ← Found NGE!
        
        stack.append(current_index)  # ← Wait for future NGE
    
    # ← Elements remaining in stack have no NGE (result stays -1)
    return result`
            }
        },
        {
            id: "largest-rectangle-in-histogram",
            title: "Largest Rectangle in Histogram",
            leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["The Boss Problem"],
            quiz: {
                description: "Find max rectangle area. What's the boss-level trick?",
                options: [
                    "Brute force all rectangles O(n²)",
                    "Monotonic Increasing Stack with index tracking",
                    "Divide and Conquer O(n log n)",
                    "DP O(n²)"
                ],
                correct: 1,
                explanation: "Monotonic Stack! Maintain increasing heights. When current < stack top, pop and calc area: height[top] * (current_idx - stack.peek() - 1)."
            },
            learn: {
                quickAlgo: [
                    "🎯 <strong>Wait kyun?</strong> Rectangle tabhi finalize hoga jab choti height aayegi (boundary)",
                    "⚡ Increasing Stack: <code>while h < height[stack.top]</code> → Pop!",
                    "🔄 Calc Area: <code>height[popped] * (current_i - new_top - 1)</code>",
                    "✅ Push current index. Add Sentinel sets boundaries auto.",
                    "💡 -1 Sentinel stack start mein zaroor add karein for easy width calc"
                ],
                metrics: { time: "O(N)", space: "O(N)" },
                timeExplainer: "<strong>Monotonic Increasing Stack:</strong><br>• Each element pushed ONCE<br>• Each element popped ONCE<br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Stack stores indices<br>• Worst Case: Increasing order [1,2,3...N] -> Stack holds all N elements.<br><strong>Aux:</strong> <code>O(N)</code>",
                visual: `<div style="font-family:monospace; font-size:0.85rem;">
                    <strong style="color:#22d3ee;">Largest Rectangle: "How far can each bar expand?"</strong>
                    <div style="display:flex; align-items:flex-end; gap:2px; margin:15px 0 8px; height:140px; position:relative;">
                        <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                            <div style="width:45px; height:40px; background:#334155; border-radius:4px 4px 0 0; display:flex; align-items:center; justify-content:center; color:#e2e8f0;">2</div>
                        </div>
                        <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                            <div style="width:45px; height:20px; background:#334155; border-radius:4px 4px 0 0; display:flex; align-items:center; justify-content:center; color:#e2e8f0;">1</div>
                        </div>
                        <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                            <div style="width:45px; height:100px; background:rgba(16,185,129,0.3); border:2px solid #10b981; border-radius:4px 4px 0 0; display:flex; align-items:center; justify-content:center; color:#10b981; font-weight:bold;">5</div>
                        </div>
                        <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                            <div style="width:45px; height:120px; background:rgba(16,185,129,0.3); border:2px solid #10b981; border-radius:4px 4px 0 0; display:flex; align-items:center; justify-content:center; color:#10b981; font-weight:bold;">6</div>
                        </div>
                        <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                            <div style="width:45px; height:40px; background:#334155; border-radius:4px 4px 0 0; display:flex; align-items:center; justify-content:center; color:#e2e8f0;">2</div>
                        </div>
                        <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                            <div style="width:45px; height:60px; background:#334155; border-radius:4px 4px 0 0; display:flex; align-items:center; justify-content:center; color:#e2e8f0;">3</div>
                        </div>
                    </div>
                    <div style="background:rgba(16,185,129,0.1); padding:8px 12px; border-radius:6px; border-left:3px solid #10b981; margin-top:8px;">
                        <span style="color:#10b981; font-weight:bold;">Max Rectangle = 5 × 2 = 10</span>
                        <span style="color:#94a3b8;"> (height=5, spans 2 bars)</span>
                    </div>
                    <div style="background:#0f172a; padding:10px; border-radius:6px; margin-top:8px;">
                        <div style="color:#fbbf24;">Increasing Stack: when shorter bar arrives →</div>
                        <div style="color:#94a3b8;">Pop tall bars (they can't expand right anymore). Calc area for each popped bar.</div>
                        <div style="color:#94a3b8; margin-top:4px;">Width = <code style="color:#a5f3fc;">current_i - stack.top - 1</code></div>
                    </div>
                </div>`,
                crux: "<strong>Framework (Monotonic Increasing Stack):</strong><br>1. <strong>Indices</strong> in stack.<br>2. <strong>Conflict:</strong> `arr[i] < arr[stack.top]`.<br>3. <strong>Pop & Resolve:</strong><br>• Height = `arr[popped]`<br>• Width = `i - stack.peek() - 1` (Right - Left - 1)<br>• Area = Max(Area, H*W)",
                trap: "<strong>The Leftover Sentinel:</strong><br>Append `0` to end of array to force-pop all remaining elements in the stack at the end.",
                dryRun: [
                    "<strong>Init:</strong> heights=[2,1,5,6,2,3]. Append 0. Stack=[-1]. Ans=0.",
                    "<strong>i=0 (Val 2):</strong> Push 0. Stack=[-1, 0].",
                    "<strong>i=1 (Val 1):</strong> 1 < 2? YES. Pop 0 (Val 2). W = 1 - (-1) - 1 = 1. Area = 2*1 = 2.",
                    "<strong>i=2,3 (Val 5,6):</strong> Push. Stack=[-1, 1, 2, 3].",
                    "<strong>i=4 (Val 2):</strong> 2 < 6? YES. Pop 3 (Val 6). W = 4 - 2 - 1 = 1. Area = 6*1 = 6.",
                    "<strong>Cont:</strong> 2 < 5? YES. Pop 2 (Val 5). W = 4 - 1 - 1 = 2. Area = 5*2 = 10 (Max)."
                ],
                codeTitle: "Python Solution (Sentinel Trick)",
                code: `def largestRectangleArea(heights):
    heights.append(0)  # Sentinel to clear stack
    stack = [-1]      # Sentinel for left boundary
    ans = 0
    
    for i, h in enumerate(heights):
        while stack[-1] != -1 and h < heights[stack[-1]]:
            height = heights[stack.pop()]
            width = i - stack[-1] - 1
            ans = max(ans, height * width)
        stack.append(i)
    
    return ans`,
                strategy: `<strong>Monotonic Increasing Stack Strategy:</strong><br><strong>Step 1:</strong> Append 0 to heights (sentinel forces all remaining bars to pop).<br><strong>Step 2:</strong> Initialize stack with -1 (sentinel for left boundary).<br><strong>Step 3:</strong> For each bar: while shorter than stack top, pop and calculate area = height[popped] × (i - stack[-1] - 1).<br><br><strong>Why it works:</strong> When a bar is popped, current index is its right boundary and new stack top is its left boundary.`,
                codeDetailed: `def largestRectangleArea(heights):
    heights.append(0)        # ← Sentinel: forces all bars to pop at end
    stack = [-1]             # ← Sentinel: left boundary for width calc
    ans = 0
    
    for i, h in enumerate(heights):
        # ← Pop bars taller than current (they can't expand right)
        while stack[-1] != -1 and h < heights[stack[-1]]:
            height = heights[stack.pop()]   # ← This bar's height
            width = i - stack[-1] - 1       # ← Right - Left - 1
            ans = max(ans, height * width)  # ← Track max area
        stack.append(i)  # ← Push current bar
    
    return ans`
            }
        },
        {
            id: "trapping-rain-water-stack",
            title: "Trapping Rain Water (Stack)",
            leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/",
            difficulty: "Good to Do",
            priority: "🟡",
            tags: ["Horizontal Slicing"],
            quiz: {
                description: "Solve using stack. How?",
                options: [
                    "Monotonic decreasing stack",
                    "Store indices, calculate water when finding taller bar",
                    "Prefix max arrays",
                    "Greedy"
                ],
                correct: 1,
                explanation: "Stack stores indices (Decreasing). When current > top, we found a right wall. Pop top (Floor). New Top is Left Wall. Water = (min(L, R) - Floor) * Dist."
            },
            learn: {
                quickAlgo: [
                    "vol = 0; stack = []",
                    "for i, h in enumerate(height):",
                    "    while stack and height[stack[-1]] < h: # 🎯 Bowl boundary found (Right Wall)",
                    "        mid = stack.pop()          # ⚡ Identify valley (Bottom)",
                    "        if not stack: break        # ❌ No Left Wall",
                    "        h_bound = min(h, height[stack[-1]]) - height[mid] # 🔄 Water Height",
                    "        w_bound = i - stack[-1] - 1 # ✅ Water Width",
                    "        vol += h_bound * w_bound",
                    "    stack.append(i)",
                    "return vol",
                    "💡 Two Pointer approach is usually better (O(1) space), but this is good concept"
                ],
                metrics: { time: "O(N)", space: "O(N)" },
                timeExplainer: "<strong>Monotonic Decreasing Stack:</strong><br>• Each bar pushed ONCE<br>• Each bar popped ONCE<br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Stack stores indices<br>• Worst Case: Decreasing order.<br><strong>Aux:</strong> <code>O(N)</code>",
                visual: `<div style="font-family:monospace; font-size:0.85rem;">
                    <strong style="color:#22d3ee;">Trapping Rain Water: "Find the Bowl"</strong>
                    <div style="display:flex; align-items:flex-end; gap:2px; margin:15px 0 8px; height:120px;">
                        <div style="width:40px; height:80px; background:#475569; border-radius:4px 4px 0 0; display:flex; align-items:flex-start; justify-content:center; padding-top:4px; color:#e2e8f0;">4</div>
                        <div style="width:40px; height:40px; background:#475569; border-radius:4px 4px 0 0; display:flex; align-items:flex-start; justify-content:center; padding-top:4px; color:#e2e8f0; position:relative;"><span>2</span><div style="position:absolute; top:-42px; width:36px; height:40px; background:rgba(56,189,248,0.2); border:1px dashed #38bdf8; border-radius:2px; display:flex; align-items:center; justify-content:center; font-size:0.7rem; color:#38bdf8;">💧</div></div>
                        <div style="width:40px; height:0px; background:#475569; position:relative;"><div style="position:absolute; bottom:0; width:36px; height:60px; background:rgba(56,189,248,0.2); border:1px dashed #38bdf8; border-radius:2px; display:flex; align-items:center; justify-content:center; font-size:0.7rem; color:#38bdf8;">💧💧</div></div>
                        <div style="width:40px; height:60px; background:#475569; border-radius:4px 4px 0 0; display:flex; align-items:flex-start; justify-content:center; padding-top:4px; color:#e2e8f0;">3</div>
                    </div>
                    <div style="background:#0f172a; padding:10px; border-radius:6px; margin-top:8px;">
                        <div style="color:#38bdf8; font-weight:bold;">Bowl Pattern: Left Wall → Floor → Right Wall</div>
                        <div style="color:#94a3b8; margin-top:4px;">Decreasing stack. When taller bar (Right Wall) comes:</div>
                        <div style="color:#94a3b8;">1. Pop = <span style="color:#fbbf24;">Floor</span></div>
                        <div style="color:#94a3b8;">2. New top = <span style="color:#fbbf24;">Left Wall</span></div>
                        <div style="color:#94a3b8;">3. Water = <code style="color:#a5f3fc;">min(L, R) - Floor</code> × <code style="color:#a5f3fc;">width</code></div>
                    </div>
                </div>`,
                crux: "<strong>Framework (The Bowl):</strong><br>1. <strong>Stack</strong> (Decreasing).<br>2. <strong>Conflict:</strong> `h[i] > h[stack.top]` (Right Wall found!).<br>3. <strong>Process Bowl:</strong><br>• `Floor` = pop().<br>• `height` = `min(Left, Right) - Floor`.<br>• `width` = `Right - Left - 1`.<br>• `Add water`!",
                trap: "<strong>The Flat Floor:</strong><br>If `stack` is empty after popping floor, it means there is no <strong>Left Wall</strong> to hold water. Break.",
                dryRun: [
                    "<strong>Init:</strong> height=[4,2,0,3,2,5]. Ans=0. Stack=[].",
                    "<strong>i=0,1,2 (Val 4,2,0):</strong> Decreasing. Push. Stack=[0(4), 1(2), 2(0)].",
                    "<strong>i=3 (Val 3):</strong> 3 > 0? YES.",
                    "➡ Pop 0 (Floor). Left=2. Right=3. H=min(2,3)-0=2. W=3-1-1=1. Water+=2.",
                    "➡ 3 > 2 (Next Top)? YES.",
                    "➡ Pop 2 (Floor). Left=4. Right=3. H=min(4,3)-2=1. W=3-0-1=2. Water+=2. Total=4."
                ],
                codeTitle: "Python Solution (Horizontal Method)",
                code: `def trap(height):
    stack = []  # Indices
    water = 0
    
    for i, h in enumerate(height):
        while stack and h > height[stack[-1]]:
            floor_index = stack.pop()
            if not stack: break  # No left wall
            
            left_wall_index = stack[-1]
            width = i - left_wall_index - 1
            bounded_height = min(height[left_wall_index], h) - height[floor_index]
            
            water += width * bounded_height
            
        stack.append(i)
    return water`,
                strategy: `<strong>Decreasing Stack "Bowl" Strategy:</strong><br><strong>Step 1:</strong> Maintain decreasing stack of indices.<br><strong>Step 2:</strong> When taller bar found (right wall): pop = floor. New top = left wall.<br><strong>Step 3:</strong> Water = min(left, right) - floor height × width between walls.<br><br><strong>Why it works:</strong> Each pop reveals a "bowl" — floor between two walls where water accumulates horizontally.`,
                codeDetailed: `def trap(height):
    stack = []       # ← Decreasing stack of indices
    water = 0
    
    for i, h in enumerate(height):
        # ← Found right wall (taller than stack top)
        while stack and h > height[stack[-1]]:
            floor_index = stack.pop()    # ← Valley floor
            if not stack: break          # ← No left wall = no bowl
            
            left_wall_index = stack[-1]  # ← Left wall
            width = i - left_wall_index - 1  # ← Bowl width
            bounded_height = min(height[left_wall_index], h) - height[floor_index]  # ← Water height
            
            water += width * bounded_height  # ← Add water in this layer
            
        stack.append(i)
    return water`
            }
        },
        {
            id: "asteroid-collision",
            title: "Asteroid Collision",
            leetcodeUrl: "https://leetcode.com/problems/asteroid-collision/",
            difficulty: "Bonus",
            priority: "🟢",
            tags: ["Simulation"],
            quiz: {
                description: "Asteroids collide if moving towards each other. Pattern?",
                options: [
                    "Queue-based simulation",
                    "Stack: push right-moving, check collisions with left-moving",
                    "Greedy selection",
                    "DP"
                ],
                correct: 1,
                explanation: "Stack! Push Right (->). Check Left (<-) against stack."
            },
            learn: {
                quickAlgo: [
                    "🎯 <strong>Collision Logic?</strong> Only Right (→) and Left (←) collide",
                    "⚡ Stack: Stores stable/right-moving asteroids",
                    "🔄 Loop: <code>while stack.top > 0 and curr < 0:</code> → Crush!",
                    "✅ If <code>abs(curr) > abs(top)</code>, pop stack & continue. Else destroy curr.",
                    "💡 Loop end pe agar curr survive kiya, toh push"
                ],
                metrics: { time: "O(N)", space: "O(N)" },
                timeExplainer: "<strong>Simulation:</strong><br>• Each asteroid processed once<br>• Stack push/pop = O(1) each<br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Stack stores survivors<br>• Worst: No collisions (all same direction) = <code>O(N)</code>",
                visual: `<div style="font-family:monospace; font-size:0.85rem;">
                    <strong style="color:#22d3ee;">Asteroid Collision: "Right vs Left"</strong>
                    <div style="display:flex; align-items:center; gap:8px; margin:15px 0; padding:12px; background:#0f172a; border-radius:8px;">
                        <div style="padding:6px 12px; background:rgba(16,185,129,0.2); border:1px solid #10b981; border-radius:20px; color:#10b981; font-weight:bold;">5 →</div>
                        <div style="padding:6px 12px; background:rgba(16,185,129,0.2); border:1px solid #10b981; border-radius:20px; color:#10b981; font-weight:bold;">10 →</div>
                        <div style="font-size:1.5rem;">💥</div>
                        <div style="padding:6px 12px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; border-radius:20px; color:#ef4444; font-weight:bold;">← -5</div>
                    </div>
                    <div style="display:flex; gap:10px; margin-top:8px;">
                        <div style="flex:1; background:rgba(16,185,129,0.1); padding:10px; border-radius:8px; border-left:3px solid #10b981;">
                            <div style="color:#10b981; font-weight:bold; font-size:0.8rem;">Stack (→)</div>
                            <div style="color:#94a3b8; font-size:0.8rem;">Right-movers wait peacefully</div>
                        </div>
                        <div style="flex:1; background:rgba(239,68,68,0.1); padding:10px; border-radius:8px; border-left:3px solid #ef4444;">
                            <div style="color:#ef4444; font-weight:bold; font-size:0.8rem;">Incoming (←)</div>
                            <div style="color:#94a3b8; font-size:0.8rem;">Left-movers try to destroy</div>
                        </div>
                    </div>
                    <div style="background:#0f172a; padding:10px; border-radius:6px; margin-top:8px;">
                        <div style="color:#fbbf24;">Result: |10| > |-5| → <span style="color:#ef4444;">-5 destroyed</span>. Stack = [5, 10]</div>
                    </div>
                </div>`,
                crux: "<strong>Framework (Collisions):</strong><br>1. <strong>Stack</strong> only stores Stable asteroids.<br>2. <strong>Conflict Cond:</strong> StackTop > 0 (Right) AND Current < 0 (Left).<br>3. <strong>Battle Logic:</strong><br>• Top < |Cur| ➡ 💥 Top destroyed. Continue Checking.<br>• Top == |Cur| ➡ 💥 Both destroyed.<br>• Top > |Cur| ➡ 💥 Cur destroyed. Stop.",
                trap: "<strong>The Survivor:</strong><br>If a Left-Moving asteroid destroys ALL right-moving ones in the stack, it survives and settles in the stack itself.",
                dryRun: [
                    "<strong>Init:</strong> ast=[5, 10, -5]. Stack=[].",
                    "<strong>Val 5 (+):</strong> Push. Stack=[5].",
                    "<strong>Val 10 (+):</strong> Push. Stack=[5, 10].",
                    "<strong>Val -5 (-):</strong> Conflict with 10!",
                    "➡ Compare 10 vs |-5|. 10 wins. -5 destroyed.",
                    "<strong>End:</strong> Stack=[5, 10]."
                ],
                codeTitle: "Python Solution (Battle Simulation)",
                code: `def asteroid_collision(asteroids):
    stack = []

    for current_asteroid in asteroids:
        # Collision sirf tab: current NEGATIVE (←) aur stack top POSITIVE (→)
        while stack and current_asteroid < 0 < stack[-1]:
            
            # Case 1: Current BADA - top destroy, current zinda
            if abs(current_asteroid) > stack[-1]:
                stack.pop()
                continue  # Agle se bhi collision check karo (chain reaction!)

            # Case 2: EQUAL - dono destroy
            elif abs(current_asteroid) == stack[-1]:
                stack.pop()
                break  # Current bhi destroy, append mat karo

            # Case 3: Top BADA - current destroy
            else:
                break  # Current destroy, append mat karo

        # Yahan tab aayega jab:
        # 1. Current POSITIVE tha (while skip ho gaya)
        # 2. Current NEGATIVE tha BUT bach gaya (sabko uda diya)
        else:
            stack.append(current_asteroid)

    return stack`,
                strategy: `<strong>Stack Battle Simulation Strategy:</strong><br><strong>Step 1:</strong> Iterate through asteroids. Push right-moving (+) onto stack.<br><strong>Step 2:</strong> When left-moving (-) meets right-moving (+) on stack: battle!<br><strong>Step 3:</strong> Three cases:<br>• |current| > top → pop top, continue checking<br>• |current| == top → both destroyed<br>• |current| < top → current destroyed<br><br><strong>Why it works:</strong> Only right-left collisions happen. Same-direction asteroids never meet.`,
                codeDetailed: `def asteroid_collision(asteroids):
    stack = []

    for current_asteroid in asteroids:
        # ← Collision only when: current LEFT (−) and top RIGHT (+)
        while stack and current_asteroid < 0 < stack[-1]:
            
            if abs(current_asteroid) > stack[-1]:   # ← Current wins
                stack.pop()
                continue  # ← Chain reaction: check next in stack

            elif abs(current_asteroid) == stack[-1]: # ← Mutual destruction
                stack.pop()
                break     # ← Both gone, stop

            else:                                    # ← Top wins
                break     # ← Current destroyed, stop

        else:
            # ← Survived all battles (or no collision)
            stack.append(current_asteroid)

    return stack`
            }
        }
    ]
}

window.currentTopicData = topic_stack;
