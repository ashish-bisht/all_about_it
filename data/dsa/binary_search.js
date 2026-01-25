// Binary Search data
// Extracted from data.js

const topic_binary_search = {
    id: "binary_search",
    title: "Binary Search Patterns",
    description: "Principal Engineer DSA • Day 2",
    color: "#2563eb",
    icon: "fas fa-search",
    mentalModel: {
        whenToApply: [
            { label: "Sorted Data", desc: "Classic usage (Find X)." },
            { label: "Monotonic Functions", desc: "F(x) goes F, F, T, T. (BS on Answer)." },
            { label: "Rotated Structures", desc: "Finding pivots/cliffs." }
        ],
        safetyCheck: [
            { label: "Overflow", desc: "Never use <code>(L+R)//2</code>. Always use <span class='code-snippet'>L + (R-L)//2</span>." },
            { label: "Infinite Loops", desc: "If <code>high = mid</code> → use <span class='code-snippet'>while L < R</span>." }
        ]
    },
    questions: [
        {
            id: "search-rotated-sorted-array-ii",
            title: "Search Rotated Sorted Array II",
            leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Duplicates"],
            quiz: {
                description: "Array has duplicates. What breaks normal binary search?",
                options: [
                    "Nothing, works normally",
                    "When nums[low] == nums[mid] == nums[high], can't determine sorted half",
                    "Pivot point becomes undefined",
                    "Multiple targets possible"
                ],
                correct: 1,
                explanation: "Duplicates create 'fog'! When nums[low] == nums[mid] == nums[high], we can't tell which side is sorted. Solution: Shrink window (low++, high--) until fog clears. Worst case O(n)!"
            },
            learn: {
                metrics: { time: "Avg O(log N)", space: "O(1)" },
                timeExplainer: "<strong>Time Analysis:</strong><br>• <strong>Best/Avg:</strong> <code>O(log N)</code> - Standard binary search<br>• <strong>Worst:</strong> <code>O(N)</code> - All duplicates<br><br><strong>Why?</strong> Duplicates create 'fog' requiring linear scan",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Iterative approach with 3 pointers<br>• No recursion stack<br><br><strong>Result:</strong> <code>O(1)</code>",
                visual: "<span><strong>Visual: The Foggy Cliff</strong><br>Imagine two slopes. When duplicates appear (1,1,1...), the slopes merge into a flat line ('fog'). You must walk blindly until the fog clears.</span>",
                crux: "If <code>nums[low] == nums[mid] == nums[high]</code>, we cannot determine which side is sorted.<br><strong>Strategy:</strong> Treat this as 'noise'. Shrink the window from both ends (<code>low++</code>, <code>high--</code>) until the unique numbers appear.",
                trap: "<strong>Worst Case O(N):</strong> If all elements are duplicates, we end up scanning the whole array linearly.",
                dryRun: [
                    "<strong>Input:</strong> [1, 0, 1, 1, 1], target = 0",
                    "1. L=0(1), R=4(1), M=2(1). <strong>Collision!</strong> 1==1==1. Action: L++, R--.",
                    "2. L=1(0), R=3(1), M=2(1). Left sorted? Yes. Target in range? Yes. Action: R = M - 1.",
                    "3. L=1(0), R=1(0). Match! Return True."
                ],
                codeTitle: "Python Solution (Principal Grade)",
                code: `def search(nums, target):
low, high = 0, len(nums) - 1

while low <= high:
    # Principal Habit: Prevent Overflow
    mid = low + (high - low) // 2
    
    if nums[mid] == target: return True
    
    # KEY: Handle Duplicates (The Fog)
    if nums[low] == nums[mid] == nums[high]:
        low += 1
        high -= 1
        continue
        
    # Standard Rotated Logic
    # Left side is sorted
    if nums[low] <= nums[mid]:
        if nums[low] <= target < nums[mid]:
            high = mid - 1
        else:
            low = mid + 1
    # Right side is sorted
    else:
        if nums[mid] < target <= nums[high]:
            low = mid + 1
        else:
            high = mid - 1
return False`
            }
        },
        {
            id: "koko-eating-bananas",
            title: "Koko Eating Bananas",
            leetcodeUrl: "https://leetcode.com/problems/koko-eating-bananas/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["BS on Answer"],
            quiz: {
                description: "Find minimum eating speed. What do we binary search on?",
                options: [
                    "Binary search the piles array",
                    "Binary search the ANSWER (speed range [1, max_pile])",
                    "Greedy selection",
                    "DP on remaining piles"
                ],
                correct: 1,
                explanation: "Binary Search on ANSWER! Search space = [1, max(piles)]. For each speed, calculate hours. If ≤ h, try slower (right = mid - 1). If > h, must go faster (left = mid + 1). Classic pattern!"
            },
            learn: {
                metrics: { time: "O(N log M)", space: "O(1)" },
                timeExplainer: "<strong>Time Analysis:</strong><br>• Binary search range: <code>log M</code> iterations<br>• Each check: <code>O(N)</code> to sum hours<br><br><strong>Total:</strong> <code>O(N log M)</code> where M = max(piles)",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Only variables for binary search<br>• No extra arrays<br><br><strong>Result:</strong> <code>O(1)</code>",
                visual: "<span><strong>Visual: The Inverse Curve</strong><br>As Speed (x-axis) increases, Hours (y-axis) decreases. <br>We want the <strong>Left-most</strong> point where Hours <= H.</span>",
                crux: "<strong>1. Search Space:</strong> We don't search the array. We search the range <code>[1, max(piles)]</code>.<br><strong>2. Decision:</strong> If Koko finishes in time, try slower (Left). If fails, go faster (Right).",
                trap: "<strong>Floating Point Math:</strong> Using `math.ceil` is slow. Use integer ceiling: <code>(p + s - 1) // s</code>.",
                dryRun: [
                    "<strong>Input:</strong> piles=[3, 6, 7, 11], h=8. Range [1, 11].",
                    "1. Mid=6. Hours=6. (OK). Try Slower [1-5].",
                    "2. Mid=3. Hours=10. (Too Slow). Try Faster [4-5].",
                    "3. Mid=4. Hours=8. (OK). Try Slower [4-3]. End."
                ],
                codeTitle: "Python Solution (Production Grade)",
                code: `def minEatingSpeed(piles: List[int], h: int) -> int:
min_speed, max_speed = 1, max(piles)

def get_hours(speed):
    return sum((p + speed - 1) // speed for p in piles)
    
while min_speed <= max_speed:
    mid_speed = min_speed + (max_speed - min_speed) // 2
    
    if get_hours(mid_speed) <= h:
        max_speed = mid_speed - 1
    else:
        min_speed = mid_speed + 1
        
return min_speed`
            }
        },
        {
            id: "aggressive-cows",
            title: "Aggressive Cows",
            leetcodeUrl: "https://www.spoj.com/problems/AGGRCOW/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Min-Max"],
            quiz: {
                description: "Maximize minimum distance between cows. What's the first step?",
                options: [
                    "Greedy placement",
                    "SORT stalls first! Then BS on distance",
                    "DP on positions",
                    "Try all combinations"
                ],
                correct: 1,
                explanation: "SORT + BS on Answer! Sort stalls. Binary search on distance [1, max-min]. For each distance, greedily try to place K cows. If successful, try larger distance (left = mid + 1). Min-Max pattern!"
            },
            learn: {
                metrics: { time: "O(N log N)", space: "O(1)" },
                timeExplainer: "<strong>Time Breakdown:</strong><br>• Sorting stalls: <code>O(N log N)</code><br>• Binary search × greedy check: <code>O(N log D)</code><br><br><strong>Total:</strong> <code>O(N log N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• In-place sorting possible<br>• Only variables for counting<br><br><strong>Result:</strong> <code>O(1)</code>",
                visual: "<span><strong>System Design Mapping:</strong> Load Balancing.<br>Imagine Stalls are IP Addresses and Cows are Microservices. Check max safety buffer.</span>",
                crux: "<strong>'Maximize the Minimum'</strong><br>1. Sort stalls.<br>2. BS on Distance.<br>3. Greedy Check: Can we place K cows with gap >= mid?",
                trap: "<strong>The Unsorted Array:</strong> The Greedy Check requires stalls to be sorted. Don't forget <code>stalls.sort()</code>.",
                dryRun: [
                    "<strong>Input:</strong> Stalls=[1, 2, 8, 4, 9], K=3.",
                    "Step 0: SORT -> [1, 2, 4, 8, 9].",
                    "1. Mid=4. Place@1. Next@8. Count=2. FAIL. Gap too big.",
                    "2. Mid=2. Place@1. Next@4. Next@8. Count=3. SUCCESS.",
                    "3. Mid=3. Place@1. Next@4. Next@8. Count=3. SUCCESS."
                ],
                codeTitle: "Python Solution",
                code: `def aggressiveCows(stalls: List[int], k: int) -> int:
stalls.sort()

def can_place(min_dist):
    count = 1
    last_pos = stalls[0]
    for i in range(1, len(stalls)):
        if stalls[i] - last_pos >= min_dist:
            count += 1
            last_pos = stalls[i]
            if count == k: return True
    return False

low, high = 1, stalls[-1] - stalls[0]
ans = 1

while low <= high:
    mid = low + (high - low) // 2
    if can_place(mid):
        ans = mid
        low = mid + 1
    else:
        high = mid - 1
return ans`
            }
        },
        {
            id: "median-of-two-sorted-arrays",
            title: "Median of 2 Sorted Arrays",
            leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
            difficulty: "HARD",
            priority: "🟡",
            tags: ["Partitioning"],
            quiz: {
                description: "Find median in O(log(min(m,n))). What's the trick?",
                options: [
                    "Merge both arrays O(m+n)",
                    "Partition smaller array, calculate j automatically",
                    "Binary search both arrays",
                    "Two pointers"
                ],
                correct: 1,
                explanation: "Partition + Virtual Infinity! BS on smaller array (cut at i). Calculate j for larger array: j = (m+n+1)/2 - i. Valid when maxLeft_X ≤ minRight_Y and maxLeft_Y ≤ minRight_X. Handle edges with ±∞!"
            },
            learn: {
                metrics: { time: "O(log min(N,M))", space: "O(1)" },
                timeExplainer: "<strong>Time Analysis:</strong><br>• Binary search on smaller array<br>• Always pick smaller for partitioning<br><br><strong>Total:</strong> <code>O(log min(N, M))</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Only partition pointers<br>• No extra arrays<br><br><strong>Result:</strong> <code>O(1)</code>",
                visual: "<span><strong>Mental Model: The Perfect Cut</strong><br>Slice both arrays such that elements on Left <= elements on Right.</span>",
                crux: "Don't merge! Partition array A at `i`. Partition B at `j` is auto-calculated.<br>Goal: `maxLeftA <= minRightB` & `maxLeftB <= minRightA`.",
                trap: "<strong>Edge Cases:</strong> What if cut is at 0 or N? Use <code>-∞</code> and <code>+∞</code>.",
                dryRun: [
                    "<strong>Input:</strong> X=[1, 3], Y=[2].",
                    "1. Cut X at 1 (Left: {1}, Right: {3}). Cut Y at 1 (Left: {2}, Right: {Inf}).",
                    "Check: 1 <= Inf? OK. 2 <= 3? OK.",
                    "Found! Median = max(1, 2) = 2."
                ],
                codeTitle: "Python Solution (Virtual Infinity)",
                code: `def findMedianSortedArrays(nums1, nums2):
if len(nums1) > len(nums2): 
    nums1, nums2 = nums2, nums1

m, n = len(nums1), len(nums2)
low, high = 0, m

while low <= high:
    partitionX = low + (high - low) // 2
    partitionY = (m + n + 1) // 2 - partitionX
    
    maxLeftX = float('-inf') if partitionX == 0 else nums1[partitionX - 1]
    minRightX = float('inf') if partitionX == m else nums1[partitionX]
    
    maxLeftY = float('-inf') if partitionY == 0 else nums2[partitionY - 1]
    minRightY = float('inf') if partitionY == n else nums2[partitionY]
    
    if maxLeftX <= minRightY and maxLeftY <= minRightX:
        if (m + n) % 2 == 0:
            return (max(maxLeftX, maxLeftY) + min(minRightX, minRightY)) / 2
        else:
            return max(maxLeftX, maxLeftY)
    elif maxLeftX > minRightY:
        high = partitionX - 1
    else:
        low = partitionX + 1`
            }
        }
    ]
}
