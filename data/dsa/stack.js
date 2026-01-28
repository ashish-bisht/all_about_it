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
            { label: "Delayed Processing", desc: "Put it in stack, wait for trigger (Next Greater/Smaller)." }
        ],
        safetyCheck: [
            { label: "Empty Stack", desc: "Always check `if stack` before peeking." },
            { label: "Decr vs Incr", desc: "Next Greater -> Decreasing Stack. <br>Next Smaller -> Increasing Stack." }
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
                metrics: { time: "O(N)", space: "O(N)" },
                timeExplainer: "<strong>Monotonic Stack:</strong><br>• Each element pushed ONCE<br>• Each element popped ONCE<br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Stack stores indices<br>• Worst Case: Decreasing order [5,4,3,2,1] -> Stack holds all N elements.<br><strong>Aux:</strong> <code>O(N)</code>",
                visual: `<div style="text-align:center;">
                    <div style="font-size:3rem; margin-bottom:10px;">📉 ➡️ 📈</div>
                    <div><strong>Visual: The Horizon</strong></div>
                    <div style="font-size:0.9rem; color:var(--text-muted); margin-top:5px;">
                        Imagine looking to the right. You can only see the first person <strong>taller</strong> than you.<br>
                        Smaller people get hidden (popped) by taller ones.
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
                metrics: { time: "O(N)", space: "O(N)" },
                timeExplainer: "<strong>Monotonic Increasing Stack:</strong><br>• Each element pushed ONCE<br>• Each element popped ONCE<br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Stack stores indices<br>• Worst Case: Increasing order [1,2,3...N] -> Stack holds all N elements.<br><strong>Aux:</strong> <code>O(N)</code>",
                visual: `<div style="text-align:center;">
                    <div style="font-size:3rem; margin-bottom:10px;">📊 🧱</div>
                    <div><strong>Visual: The Expansion Limits</strong></div>
                    <div style="font-size:0.9rem; color:var(--text-muted); margin-top:5px;">
                        For current bar <code>H</code>, find left-most and right-most boundary where height >= <code>H</code>.<br>
                        <strong>Pop Logic:</strong> When you see a smaller bar, the "tall" bars in stack can't expand right anymore. Process them!
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
                metrics: { time: "O(N)", space: "O(N)" },
                timeExplainer: "<strong>Monotonic Decreasing Stack:</strong><br>• Each bar pushed ONCE<br>• Each bar popped ONCE<br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Stack stores indices<br>• Worst Case: Decreasing order.<br><strong>Aux:</strong> <code>O(N)</code>",
                visual: `<div style="text-align:center;">
                    <div style="font-size:3rem; margin-bottom:10px;">🥣 💧</div>
                    <div><strong>Visual: Horizontal Slicing</strong></div>
                    <div style="font-size:0.9rem; color:var(--text-muted); margin-top:5px;">
                        Imagine filling a bowl layer by layer.<br>
                        <strong>Floor:</strong> The popped short bar.<br>
                        <strong>Left Wall:</strong> The new top after pop.<br>
                        <strong>Right Wall:</strong> The current bar <code>i</code>.
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
                metrics: { time: "O(N)", space: "O(N)" },
                timeExplainer: "<strong>Simulation:</strong><br>• Each asteroid processed once<br>• Stack push/pop = O(1) each<br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Stack stores survivors<br>• Worst: No collisions (all same direction) = <code>O(N)</code>",
                visual: `<div style="text-align:center;">
                    <div style="font-size:3rem; margin-bottom:10px;">☄️ 💥 🪨</div>
                    <div><strong>Visual: The One-Way Street</strong></div>
                    <div style="font-size:0.9rem; color:var(--text-muted); margin-top:5px;">
                        Right-moving (+) asteroids are peaceful travellers waiting in the stack.<br>
                        Left-moving (-) asteroids are destroyers attempting to crash into them.
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

    return stack`
            }
        }
    ]
}
