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
                timeExplainer: "<strong>Monotonic Stack:</strong><br>• Each element pushed once<br>• Each element popped once<br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Stack stores indices/values<br>• Worst: all decreasing = <code>O(N)</code>",
                visual: "<span><strong>Visual: The Horizon</strong><br>You can only see the first person taller than you.</span>",
                crux: "<strong>Decreasing Stack.</strong><br>If `current > stack.top`, pop! Current is the answer for the popped guy.",
                trap: "<strong>Leftovers:</strong> Elements in stack at end have NO next greater. Answer is -1.",
                dryRun: ["1. Stack [2]. Cur=1. 1<2. Push 1.", "2. Stack [2,1]. Cur=5. 5>1? Pop 1 (Ans 5). 5>2? Pop 2 (Ans 5).", "3. Push 5."],
                codeTitle: "Python Solution",
                code: `def nextGreaterElements(nums):
res = [-1] * len(nums)
stack = [] # Indices
for i, n in enumerate(nums):
    while stack and n > nums[stack[-1]]:
        idx = stack.pop()
        res[idx] = n
    stack.append(i)
return res`
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
                timeExplainer: "<strong>Monotonic Increasing Stack:</strong><br>• Each bar pushed/popped once<br>• Area calculated on pop<br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Stack stores bar indices<br>• Worst: increasing heights = <code>O(N)</code>",
                visual: "<span><strong>Visual: Expansion Limits</strong><br>How far Left and Right can a bar extend?</span>",
                crux: "<strong>The Pop Moment:</strong><br>When `h < top`: Pop.<br>Height = Popped.<br>Width = `i - NewTop - 1`.<br>Area = H * W.",
                trap: "<strong>Leftovers:</strong> Add a `0` at the end of array to force-pop everything.",
                dryRun: ["1. [2]. Cur=1. Pop 2. Area=2*1.", "2. [1,5,6]. Cur=2. Pop 6 (Area 6). Pop 5 (Area 10).", "3. Max=10."],
                codeTitle: "Python Solution",
                code: `def largestRectangleArea(heights):
heights.append(0)
stack = [-1]
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
                timeExplainer: "<strong>Stack Approach:</strong><br>• Each index pushed/popped once<br>• Horizontal water layers<br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Stack for indices<br>• Worst case: <code>O(N)</code>",
                visual: "<span><strong>Visual: The Bowl</strong><br>We fill horizontal layers. Floor, Left Wall, Right Wall.</span>",
                crux: "Found a Right Wall (`cur > top`)?<br>1. Pop `Floor`.<br>2. Calc `Water = (min(Left, Right) - Floor) * Width`.",
                trap: "<strong>Sentinel:</strong> If stack empty after pop, no Left Wall exists. Break.",
                dryRun: ["Stack [3, 0]. Cur=2.", "Pop 0 (Floor). Left=3. Right=2.", "Heigth=min(3,2)-0=2. Width=1. Water+=2."],
                codeTitle: "Python Solution",
                code: `def trap(height):
stack = []
water = 0
for i, h in enumerate(height):
    while stack and h > height[stack[-1]]:
        floor = stack.pop()
        if not stack: break
        w = i - stack[-1] - 1
        wd = min(height[stack[-1]], h) - height[floor]
        water += w * wd
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
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Stack stores survivors<br>• Worst: no collisions = <code>O(N)</code>",
                visual: "<span><strong>Visual: One-Way Street</strong><br>Collision only if StackTop > 0 and Cur < 0.</span>",
                crux: "<strong>Battle:</strong><br>1. Top < |Cur|? Top dies.<br>2. Top == |Cur|? Both die.<br>3. Top > |Cur|? Cur dies.",
                trap: "<strong>Survivor:</strong> If Left asteroid destroys everyone, it must be pushed to stack.",
                dryRun: ["Stack [10]. Cur -5. 10 defeats -5.", "Stack [5]. Cur -10. -10 defeats 5. Stack [-10]."],
                codeTitle: "Python Solution",
                code: `def asteroidCollision(asteroids):
stack = []
for ast in asteroids:
    while stack and ast < 0 and stack[-1] > 0:
        diff = ast + stack[-1]
        if diff < 0: stack.pop()
        elif diff > 0: ast = 0; break
        else: ast = 0; stack.pop(); break
    if ast: stack.append(ast)
return stack`
            }
        }
    ]
}
