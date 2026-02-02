// Arrays data
// Extracted from data.js

const topic_arrays = {
    id: "arrays",
    title: "Arrays & Sliding Window",
    description: "Principal Engineer DSA • Day 1",
    color: "var(--primary)", // #6366f1
    icon: "fas fa-layer-group",
    mentalModel: {
        whenToApply: [
            { label: "🔍 Fast Lookup", desc: "Need O(1) lookup? → HashMap (Two Sum, Subarray Sum K)" },
            { label: "📊 Sorted Data", desc: "Array sorted? → Two Pointers from ends (3Sum, Container Water)" },
            { label: "📐 Contiguous Subarray", desc: "Max/Min subarray? → Kadane's or Sliding Window" },
            { label: "🪟 K Window", desc: "Fixed/variable window? → Sliding Window technique" },
            { label: "↔️ Prefix/Suffix", desc: "Need left+right info? → Prefix/Suffix arrays (Product Except Self)" },
            { label: "📅 Intervals", desc: "Overlapping ranges? → Sort by start, track end (Merge Intervals)" }
        ],
        patterns: [
            { algo: "HashMap Lookup", use: "Find pair/triplet with sum", time: "O(N)", space: "O(N)", template: "if target-num in map: found!" },
            { algo: "Two Pointers", use: "Sorted array pair finding", time: "O(N)", space: "O(1)", template: "left=0, right=n-1, move based on sum" },
            { algo: "Sliding Window (Fixed)", use: "Max sum of k elements", time: "O(N)", space: "O(1)", template: "add right, remove left when size>k" },
            { algo: "Sliding Window (Variable)", use: "Longest/shortest with condition", time: "O(N)", space: "O(K)", template: "expand right, shrink left while invalid" },
            { algo: "Kadane's Algorithm", use: "Max subarray sum", time: "O(N)", space: "O(1)", template: "curr = max(num, curr+num)" },
            { algo: "Prefix Sum", use: "Subarray sum queries", time: "O(N)", space: "O(N)", template: "prefix[i] = prefix[i-1] + arr[i]" },
            { algo: "Dutch National Flag", use: "3-way partition (0,1,2)", time: "O(N)", space: "O(1)", template: "low, mid, high pointers" },
            { algo: "Interval Merge", use: "Overlapping intervals", time: "O(N log N)", space: "O(N)", template: "sort by start, merge if overlap" }
        ],
        decisionTree: `
<div style="background:#1e293b; padding:25px; border-radius:16px; margin:15px 0; border:1px solid rgba(255,255,255,0.1);">
<h4 style="color:#a78bfa; margin-bottom:20px; text-align:center; font-size:1.1rem;">🧠 Arrays Pattern Recognition</h4>
<div style="font-family:monospace; font-size:0.85rem; line-height:1.8;">
<pre style="color:#e2e8f0; text-align:left; margin:0;">
                    ┌─────────────────────────┐
                    │ "Array problem type?"   │
                    └───────────┬─────────────┘
                                │
    ┌───────────────────────────┼───────────────────────────┐
    ▼                           ▼                           ▼
┌────────────┐          ┌─────────────┐          ┌──────────────┐
│ FIND PAIR  │          │  SUBARRAY   │          │  INTERVALS   │
│ with sum   │          │  max/min    │          │  overlapping │
└─────┬──────┘          └──────┬──────┘          └──────┬───────┘
      │                        │                        │
      ▼                        ▼                        ▼
┌───────────────┐      ┌─────────────────┐      ┌──────────────┐
│ Sorted?       │      │ Contiguous?     │      │ Sort by start│
│ → Two Pointer │      │ → Kadane's      │      │ Track max end│
│ Unsorted?     │      │ Fixed window?   │      └──────────────┘
│ → HashMap     │      │ → Sliding Window│
└───────────────┘      └─────────────────┘

         "Need left AND right info?"        "3-way partition?"
              │                                   │
              ▼                                   ▼
      ┌───────────────┐                   ┌────────────────┐
      │ Prefix/Suffix │                   │ Dutch National │
      │ Two passes    │                   │ Flag Algorithm │
      │ left→ then ←  │                   │ 0,1,2 sorting  │
      └───────────────┘                   └────────────────┘
</pre>
</div>
</div>`,
        codeTemplates: `
<div style="background:#0f172a; padding:20px; border-radius:12px; margin:15px 0;">
<h4 style="color:#10b981; margin-bottom:15px;">📝 Arrays Templates</h4>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
1️⃣ Two Sum (HashMap)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def twoSum(nums, target):
    seen = {}
    for index, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], index]
        seen[num] = index
    return []
</pre>
</details>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
2️⃣ Sliding Window (Variable)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def lengthOfLongestSubstring(s):
    char_set = set()
    left = max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len
</pre>
</details>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
3️⃣ Kadane's Algorithm
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def maxSubArray(nums):
    max_sum = current_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum
</pre>
</details>

<details>
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
4️⃣ Merge Intervals
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged
</pre>
</details>
</div>`,
        safetyCheck: [
            { label: "🔍 Empty array!", desc: "<code>if not nums: return</code> — Always check first!" },
            { label: "📍 Index bounds!", desc: "Two pointers: <code>while left < right</code> not <code><=</code>" },
            { label: "🔄 Duplicate skip!", desc: "3Sum: <code>while left < right and nums[left] == nums[left-1]: left += 1</code>" },
            { label: "📋 Copy issue!", desc: "When storing result, use <code>result.append(nums[:])</code>" },
            { label: "⚡ Shrink window!", desc: "Sliding window: shrink with <code>while</code> not <code>if</code>" },
            { label: "🔢 Overflow!", desc: "Product problems: track both max and min (negatives flip sign)" }
        ]
    },
    questions: [
        {
            id: "two-sum",
            title: "Two Sum",
            leetcodeUrl: "https://leetcode.com/problems/two-sum/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["HashMap"],
            quiz: {
                description: "Given an array and target, find two numbers that add up to target. What's the optimal approach?",
                options: [
                    "Brute Force O(n²) - Check all pairs",
                    "HashMap O(n) - Store complements as you iterate",
                    "Two Pointers O(n log n) - Sort then scan",
                    "Binary Search O(n log n) - Sort and search for each element"
                ],
                correct: 1,
                explanation: "HashMap is KING! As you iterate, check if (target - current) exists in map. If yes, found! If no, store current. One pass: O(n) time, O(n) space. Warm-up in 20% of interviews!"
            },
            learn: null // Not present in arrays.html, only game
        },
        {
            id: "3sum",
            title: "3Sum",
            leetcodeUrl: "https://leetcode.com/problems/3sum/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Two Pointers"],
            quiz: {
                description: "Find all triplets that sum to zero. Best approach to avoid duplicates?",
                options: [
                    "Three nested loops O(n³)",
                    "HashMap with pair sums O(n²) space",
                    "Sort + Two Pointers O(n²) time, O(1) space",
                    "Backtracking O(2ⁿ)"
                ],
                correct: 2,
                explanation: "Sort first! Fix one element, use two pointers on rest. Skip duplicates by checking if current == previous. This is THE standard pattern for multi-pointer problems. O(n²) time!"
            },
            learn: {
                quickAlgo: [
                    "nums.sort()                                  # 🎯 MUST sort first!",
                    "ans = []",
                    "for index in range(len(nums) - 2):           # ⚡ Fix first num (Anchor)",
                    "    if index > 0 and nums[index] == nums[index-1]: continue  # Skip dup anchor",
                    "    left, right = index + 1, len(nums) - 1   # 🔄 Two Pointers",
                    "    while left < right:",
                    "        total = nums[index] + nums[left] + nums[right]",
                    "        if total == 0:                        # ✅ Found triplet!",
                    "            ans.append([nums[index], nums[left], nums[right]])",
                    "            left += 1; right -= 1",
                    "            while left < right and nums[left] == nums[left-1]: left += 1",
                    "            while left < right and nums[right] == nums[right+1]: right -= 1",
                    "        elif total < 0: left += 1             # Need bigger sum",
                    "        else: right -= 1                      # Need smaller sum",
                    "return ans"
                ],
                metrics: { time: "O(N²)", space: "O(1)" },
                timeExplainer: "<strong>Time: O(N²)</strong><br>• Sorting takes O(N log N).<br>• We iterate N times (Anchor).<br>• Inside loop, max O(N) work (Two Pointers).<br>Total = N * N = O(N²).",
                spaceExplainer: "<strong>Space: O(1)</strong><br>We only use pointers (left, right, index). Ignoring output array space.",
                visual: `<span><strong>Visual: Anchor & Squeeze</strong><br>Array ko sort karo. First element <code>anchor</code> fix karo. Remaining array mein do pointers se target dhundo.<br>
<pre style="background:none; border:none; padding:10px; font-size:0.8rem; line-height:1.2;">
 Sorted: [-4, -1, -1, 0, 1, 2]
          ^   ^             ^
      Anchor  L             R
 Target for (L, R) = -Anchor
</pre>
</span>`,
                crux: "3Sum = 1 Fixed Number + 2Sum (Sorted).<br><strong>Formula:</strong> <code>nums[L] + nums[R] + Anchor = 0</code>",
                strategy: "Sort First. Fix <code>i</code>, then solve 2Sum on <code>nums[i+1:]</code>.",
                trap: "<strong>Duplicates:</strong><br>1. Anchor duplicates: <code>if i > 0 and nums[i] == nums[i-1]: continue</code><br>2. Pointer duplicates: <code>while nums[L] == nums[L-1]: L++</code>",
                dryRun: [
                    "<strong>Input:</strong> nums = [-1, 0, 1, 2, -1, -4]",
                    "1. Sort: [-4, -1, -1, 0, 1, 2]",
                    "2. Anchor=-4. Target=4. (L=-1, R=2) -> Sum=1 (Small). L++",
                    "3. Anchor=-1. Target=1. (L=-1, R=2) -> Sum=1. FOUND! [-1, -1, 2].",
                    "4. Skip duplicates for L. Move L to 0."
                ],
                codeTitle: "Python Solution (Clean)",
                code: `def three_sum(nums):
    nums.sort()
    ans = []

    for index in range(len(nums) - 2):
        # Skip duplicate anchors
        if index > 0 and nums[index] == nums[index - 1]:
            continue

        left = index + 1
        right = len(nums) - 1

        while left < right:
            total = nums[index] + nums[left] + nums[right]

            if total == 0:
                ans.append([nums[index], nums[left], nums[right]])
                left += 1
                right -= 1
                
                # Skip duplicate left
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
                # Skip duplicate right
                while left < right and nums[right] == nums[right + 1]:
                    right -= 1
                    
            elif total < 0:
                left += 1
            else:
                right -= 1

    return ans`,
                codeDetailed: `def three_sum(nums):
    """
    3Sum - Finding triplets that sum to zero
    
    ═══════════════════════════════════════════════════════════════
    CRUX: Sort + Fix Anchor + Two Pointers
    ═══════════════════════════════════════════════════════════════
    
    STRATEGY: Reduce 3Sum to 2Sum
    1. SORT the array (Essential for Two Pointers)
    2. Loop 'i' as the ANCHOR (the first element)
    3. Treat the rest (i+1 to end) as a 2Sum Sorted problem
       Goal: Find (Left + Right) = -Anchor
    
    Time: O(N²), Space: O(1)
    """
    nums.sort()  # Step 1: Sort is mandatory
    ans = []

    # Iterate with Anchor
    # stop at len-2 because we need at least 2 more elements (Left, Right)
    for index in range(len(nums) - 2):
        
        # ════════════════════════════════════════════════════════════
        # STEP 1: Handle Anchor Duplicates
        # ════════════════════════════════════════════════════════════
        # If current number is same as previous, we've already done 
        # the work for this value. Skip to avoid duplicate triplets.
        if index > 0 and nums[index] == nums[index - 1]:
            continue

        # ════════════════════════════════════════════════════════════
        # STEP 2: Set Two Pointers
        # ════════════════════════════════════════════════════════════
        left = index + 1
        right = len(nums) - 1

        # Visual:
        # [-4, -1, -1, 0, 1, 2]
        #   ^   ^            ^
        #  Anc  L            R
        
        while left < right:
            total = nums[index] + nums[left] + nums[right]

            if total == 0:
                # Found a Triplet!
                ans.append([nums[index], nums[left], nums[right]])

                # ════════════════════════════════════════════════════
                # STEP 3: Handle Pointer Duplicates (Internal)
                # ════════════════════════════════════════════════════
                # We need to move BOTH pointers inward after finding a match
                left += 1
                right -= 1

                # SKIP same values to avoid duplicate triplets like [-1, -1, 2] again
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
                
                while left < right and nums[right] == nums[right + 1]:
                    right -= 1

            elif total < 0:
                # Sum is too small -> Need bigger number -> Move Left forward
                left += 1
            else:
                # Sum is too big -> Need smaller number -> Move Right backward
                right -= 1

    return ans`
            }
        },
        {
            id: "max-subarray",
            title: "Kadane's Algorithm",
            leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["DP"],
            quiz: {
                description: "Find maximum sum of contiguous subarray. What's the DP optimization?",
                options: [
                    "Check all subarrays O(n³)",
                    "Prefix sums O(n²)",
                    "Kadane's: cur_max = max(prev_max + nums[i], nums[i])",
                    "Divide and Conquer O(n log n)"
                ],
                correct: 2,
                explanation: "Kadane's is GENIUS! At each step: continue previous subarray OR start fresh. Track global max. O(n) time, O(1) space. Foundation for many DP problems!"
            },
            learn: {
                quickAlgo: [
                    "prev_max = max_so_far = nums[0]              # 🎯 Init with first element",
                    "for index in range(1, len(nums)):            # ⚡ Start from 1",
                    "    cur_max = max(prev_max + nums[index], nums[index])  # 🔄 Continue or fresh?",
                    "    max_so_far = max(max_so_far, cur_max)    # ✅ Track global maximum",
                    "    prev_max = cur_max                       # 💡 Update for next iteration",
                    "return max_so_far"
                ],
                metrics: { time: "O(N)", space: "O(1)" },
                timeExplainer: "<strong>Time: O(N)</strong><br>Single pass through array. Each element processed in O(1).",
                spaceExplainer: "<strong>Space: O(1)</strong><br>Only two variables: <code>prev_max</code> and <code>max_so_far</code>.",
                visual: `<span><strong>Visual: Continue vs Fresh Start</strong><br>
<pre style="background:none; border:none; padding:10px; font-size:0.8rem; line-height:1.2;">
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
         │  │   │  │
         ▼  ▼   ▼  ▼
prev:   -2  1  -2  4   ← Best ending HERE
max:    -2  1   1  4   ← Global peak (answer!)

Key: cur_max = max(prev + nums[i], nums[i])
     "Continue"  vs  "Fresh start"
</pre></span>`,
                crux: "<strong>Decision at each index:</strong><br>Continue previous subarray (<code>prev_max + nums[i]</code>) OR start fresh (<code>nums[i]</code>)?<br><br><strong>Why?</strong> Negative prev_max is a burden - fresh start better!",
                strategy: "Track TWO things: <code>prev_max</code> (best ending at previous) and <code>max_so_far</code> (global peak).",
                trap: "<strong>All Negatives Trap:</strong><br>Array <code>[-5, -2, -3]</code> → Answer is <code>-2</code> (least negative).<br><strong>Fix:</strong> Init with <code>nums[0]</code>, NOT 0!",
                dryRun: [
                    "<strong>Input:</strong> nums = [-2, 1, -3, 4]",
                    "<strong>Init:</strong> prev_max = max_so_far = nums[0] = <span class='var-highlight'>-2</span>",
                    "index=1: cur_max = max(-2+1, 1) = <strong>1</strong>. max_so_far = max(-2, 1) = <span class='var-highlight'>1</span>.",
                    "index=2: cur_max = max(1-3, -3) = <strong>-2</strong>. max_so_far = 1.",
                    "index=3: cur_max = max(-2+4, 4) = <strong>4</strong>. max_so_far = <span class='var-highlight'>4</span>.",
                    "<strong>Return:</strong> 4"
                ],
                codeTitle: "Python Solution (Clean)",
                code: `def maximum_sub_array(nums):
    prev_max = nums[0]
    max_so_far = nums[0]
    
    for index in range(1, len(nums)):
        cur_max = max(prev_max + nums[index], nums[index])
        max_so_far = max(max_so_far, cur_max)
        prev_max = cur_max
    
    return max_so_far`,
                codeDetailed: `def maximum_sub_array(nums):
    """
    Kadane's Algorithm - Maximum Subarray Sum
    
    DECISION at each step:
    - Continue previous subarray (prev_max + nums[i])
    - OR start fresh from current element (nums[i])
    
    Track TWO things:
    1. prev_max: Best sum ENDING at previous position
    2. max_so_far: Global maximum (the answer!)
    """
    
    prev_max = nums[0]      # Best sum ending at previous
    max_so_far = nums[0]    # Global peak
    
    for index in range(1, len(nums)):
        # DECISION: Continue or fresh start?
        cur_max = max(prev_max + nums[index], nums[index])
        #             \\_________________/     \\________/
        #              Continue subarray      Fresh start
        
        # Track the global peak!
        max_so_far = max(max_so_far, cur_max)
        
        # Update for next iteration
        prev_max = cur_max
    
    return max_so_far`
            }
        },
        {
            id: "product-except-self",
            title: "Product Except Self",
            leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Prefix & Suffix"],
            quiz: {
                description: "Return array where output[i] = product of all except nums[i], WITHOUT division. How?",
                options: [
                    "Divide total product by nums[i]",
                    "Prefix product from left × Suffix product from right",
                    "Nested loops O(n²)",
                    "Use logarithms to convert to addition"
                ],
                correct: 1,
                explanation: "Prefix × Suffix magic! Pass 1: store left products. Pass 2: multiply with right products. O(n) time, O(1) space!"
            },
            learn: {
                quickAlgo: [
                    "res = [1] * len(nums)                        # 🎯 Init with 1s",
                    "left_product = right_product = 1",
                    "for index in range(len(nums)):               # ⚡ Left Pass",
                    "    res[index] *= left_product",
                    "    left_product *= nums[index]",
                    "for index in range(len(nums)-1, -1, -1):     # 🔄 Right Pass",
                    "    res[index] *= right_product",
                    "    right_product *= nums[index]",
                    "return res"
                ],
                metrics: { time: "O(N)", space: "O(1)" },
                timeExplainer: "<strong>Time: O(N)</strong><br>Two passes through array: O(2N) = O(N).",
                spaceExplainer: "<strong>Space: O(1)</strong><br>Output array doesn't count. Only two variables used.",
                visual: `<span><strong>Visual: Sandwich Product</strong><br>
<pre style="background:none; border:none; padding:10px; font-size:0.8rem; line-height:1.2;">
nums = [1, 2, 3, 4]

Left Pass (store products of LEFT elements):
  res[0] = 1         (nothing on left)
  res[1] = 1         (1)
  res[2] = 1×2 = 2   (1,2)
  res[3] = 1×2×3 = 6 (1,2,3)
  res = [1, 1, 2, 6]

Right Pass (multiply with RIGHT products):
  res[3] *= 1       → 6   (nothing on right)
  res[2] *= 4       → 8   (4)
  res[1] *= 4×3=12  → 12  (4,3)
  res[0] *= 12×2=24 → 24  (4,3,2)
  
Final: [24, 12, 8, 6]
</pre></span>`,
                crux: "<strong>Division banned!</strong><br>res[i] = (product of LEFT elements) × (product of RIGHT elements)<br><br><strong>Two Passes:</strong><br>1. Left → Right: Store left products<br>2. Right → Left: Multiply with right products",
                strategy: "Use result array to store left products first, then multiply with right products in second pass.",
                trap: "<strong>Zero Handling:</strong><br>Array <code>[1, 0, 3, 4]</code> → Only index of 0 gets non-zero value.<br>Prefix/Suffix logic handles this naturally!",
                dryRun: [
                    "<strong>Input:</strong> nums = [1, 2, 3, 4]",
                    "<strong>Init:</strong> res = [1, 1, 1, 1], left_product = 1",
                    "<strong>Left Pass:</strong> res = [1, 1, 2, 6]",
                    "<strong>Right Pass:</strong> right_product=1 → res[3]=6, right=4 → res[2]=8, right=12 → res[1]=12, right=24 → res[0]=24",
                    "<strong>Return:</strong> [24, 12, 8, 6]"
                ],
                codeTitle: "Python Solution (Clean)",
                code: `def product_except_self(nums):
    res = [1] * len(nums)

    left_product = 1
    right_product = 1

    for index in range(len(nums)):
        res[index] *= left_product
        left_product *= nums[index]

    for index in range(len(nums)-1, -1, -1):
        res[index] *= right_product
        right_product *= nums[index]

    return res`,
                codeDetailed: `def product_except_self(nums):
    """
    Product of Array Except Self (Without Division)
    
    res[i] = (product of all LEFT) × (product of all RIGHT)
    
    Two Passes:
    1. Left → Right: Build left products in res
    2. Right → Left: Multiply with right products
    """
    
    res = [1] * len(nums)
    
    left_product = 1
    right_product = 1
    
    # PASS 1: Left to Right
    for index in range(len(nums)):
        res[index] *= left_product   # Store left product
        left_product *= nums[index]  # Update for next
    
    # PASS 2: Right to Left  
    for index in range(len(nums)-1, -1, -1):
        res[index] *= right_product  # Multiply with right product
        right_product *= nums[index] # Update for next
    
    return res`
            }
        },
        {
            id: "trapping-rain-water",
            title: "Trapping Rain Water",
            leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Two Pointers"],
            quiz: {
                description: "Calculate water trapped between bars. What's the optimal pattern?",
                options: [
                    "For each bar, find max left & right O(n²)",
                    "Pre-compute max arrays O(n) space",
                    "Two pointers from both ends O(1) space",
                    "Stack-based approach O(n)"
                ],
                correct: 2,
                explanation: "Two pointers is ELITE! Process SMALLER side (water guaranteed there!). O(n) time, O(1) space!"
            },
            learn: {
                quickAlgo: [
                    "left_pointer, right_pointer = 0, len(height) - 1",
                    "left_max_height = height[0]",
                    "right_max_height = height[-1]",
                    "trapped_water = 0",
                    "while left_pointer < right_pointer:",
                    "    if height[left_pointer] < height[right_pointer]:  # 🔄 Left chhota",
                    "        if height[left_pointer] < left_max_height:    # Valley! Pani trap",
                    "            trapped_water += left_max_height - height[left_pointer]",
                    "        else: left_max_height = height[left_pointer]  # Naya wall",
                    "        left_pointer += 1",
                    "    else:                                              # Right chhota",
                    "        if height[right_pointer] < right_max_height:  # Valley! Pani trap",
                    "            trapped_water += right_max_height - height[right_pointer]",
                    "        else: right_max_height = height[right_pointer] # Naya wall",
                    "        right_pointer -= 1",
                    "return trapped_water"
                ],
                metrics: { time: "O(N)", space: "O(1)" },
                timeExplainer: "<strong>Time: O(N)</strong><br>Each element processed exactly once. Two pointers meet in middle.",
                spaceExplainer: "<strong>Space: O(1)</strong><br>Only 4 variables: two pointers + two max heights.",
                visual: `<span><strong>Visual: Water Level Decision</strong><br>
<pre style="background:none; border:none; padding:10px; font-size:0.8rem; line-height:1.2;">
Water at i = min(left_max, right_max) - height[i]

   LEFT_MAX        RIGHT_MAX
      │               │
      █               █
      █   ░░░░░░░░    █    ← Water level = min(L,R)
      █   █   i   █   █
  ════════════════════════

KEY INSIGHT: Process SMALLER side!
- If height[L] < height[R]: LEFT side ka water CONFIRM 
  (kyunki right mein definitely badi wall hai)
- No need for min() - directly use left_max!
</pre></span>`,
                crux: "<strong>Process SMALLER side!</strong><br>Agar left chhota hai → left ka water confirm (right mein badi wall hai)<br><br><strong>Wall vs Valley:</strong><br>• height >= max → Naya wall (update max)<br>• height < max → Valley (trap water!)",
                strategy: "Two pointers from ends. Compare heights. Move smaller side inward. Track max on each side.",
                trap: "<strong>Why no min() needed?</strong><br>We always process smaller side, so opposite side definitely has bigger wall!<br><code>water = local_max - height</code> is enough.",
                dryRun: [
                    "<strong>Input:</strong> height = [0, 1, 0, 2]",
                    "<strong>Init:</strong> L=0, R=3, L_max=0, R_max=2, water=0",
                    "L=0: h[0]=0 < h[3]=2 → Process Left. h[0]=0 >= L_max=0 → Wall. L_max=0. L++",
                    "L=1: h[1]=1 < h[3]=2 → Process Left. h[1]=1 >= L_max=0 → Wall. L_max=1. L++",
                    "L=2: h[2]=0 < h[3]=2 → Process Left. h[2]=0 < L_max=1 → <strong>Valley!</strong> water += 1-0 = <span class='var-highlight'>1</span>. L++",
                    "<strong>Return:</strong> 1"
                ],
                codeTitle: "Python Solution (Clean)",
                code: `def trap(height):
    left_max_height = height[0]
    right_max_height = height[len(height)-1]
    
    left_pointer = 0
    right_pointer = len(height)-1
    
    trapped_water = 0
    
    while left_pointer < right_pointer:
        
        if height[left_pointer] < height[right_pointer]:  # Left side chhota
            if height[left_pointer] < left_max_height:    # Pani trap hoga
                trapped_water += left_max_height - height[left_pointer]
            else:                                          # Naya max mila
                left_max_height = height[left_pointer]
            left_pointer += 1
            
        else:                                              # Right side chhota
            if height[right_pointer] < right_max_height:  # Pani trap hoga
                trapped_water += right_max_height - height[right_pointer]
            else:                                          # Naya max mila
                right_max_height = height[right_pointer]
            right_pointer -= 1
    
    return trapped_water`,
                codeDetailed: `def trap(height):
    """
    Trapping Rain Water - Two Pointers
    
    CRUX: Water at i = min(left_max, right_max) - height[i]
    
    KEY INSIGHT: Process SMALLER side!
    - If left < right: Left side has guaranteed water
      (right definitely has a bigger wall somewhere)
    - So we can use left_max directly (no min needed!)
    """
    
    left_max_height = height[0]
    right_max_height = height[len(height)-1]
    
    left_pointer = 0
    right_pointer = len(height)-1
    
    trapped_water = 0
    
    while left_pointer < right_pointer:
        
        if height[left_pointer] < height[right_pointer]:
            # LEFT SIDE CHHOTA - process left
            # Right mein definitely badi wall hai!
            
            if height[left_pointer] < left_max_height:
                # VALLEY! Pani trap hoga
                trapped_water += left_max_height - height[left_pointer]
            else:
                # WALL! Naya max mila
                left_max_height = height[left_pointer]
            
            left_pointer += 1
            
        else:
            # RIGHT SIDE CHHOTA - process right
            # Left mein definitely badi wall hai!
            
            if height[right_pointer] < right_max_height:
                # VALLEY! Pani trap hoga
                trapped_water += right_max_height - height[right_pointer]
            else:
                # WALL! Naya max mila
                right_max_height = height[right_pointer]
            
            right_pointer -= 1
    
    return trapped_water`
            }
        },
        {
            id: "merge-intervals",
            title: "Merge Intervals",
            leetcodeUrl: "https://leetcode.com/problems/merge-intervals/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Sorting", "Greedy"],
            quiz: {
                description: "Merge all overlapping intervals. What's the first critical step?",
                options: [
                    "Use Union-Find",
                    "Sort by start time, then merge linearly",
                    "Build interval tree",
                    "Check every pair O(n²)"
                ],
                correct: 1,
                explanation: "SORT FIRST by start time! Then check overlap with last merged. O(n log n)!"
            },
            learn: {
                quickAlgo: [
                    "intervals.sort(key=lambda x: x[0])        # 🎯 Sort by start",
                    "result = [intervals[0]]                   # Pehla interval daal diya",
                    "for index in range(1, len(intervals)):",
                    "    if result[-1][1] >= intervals[index][0]:  # 🔄 Overlap?",
                    "        result[-1][1] = max(result[-1][1], intervals[index][1])  # Merge",
                    "    else:",
                    "        result.append(intervals[index])   # 💡 No overlap: add new",
                    "return result"
                ],
                metrics: { time: "O(N log N)", space: "O(N)" },
                timeExplainer: "<strong>Time: O(N log N)</strong><br>Sorting + single pass merge.",
                spaceExplainer: "<strong>Space: O(N)</strong><br>Result array. Worst case: no merges.",
                visual: `<span><strong>Visual: Overlap Check</strong><br>
<pre style="background:none; border:none; padding:10px; font-size:0.8rem; line-height:1.2;">
Sorted: [1,3] [2,6] [8,10]

[1,3] + [2,6]:
  1---3
    2-----6
  Overlap! (2 <= 3) → Merge: [1,6]

[1,6] + [8,10]:
  1-------6
            8--10
  No overlap! (8 > 6) → Add new
  
Result: [[1,6], [8,10]]
</pre></span>`,
                crux: "<strong>Sort first!</strong> Then check: <code>result[-1][1] >= intervals[index][0]</code><br><br><strong>Merge formula:</strong> <code>result[-1][1] = max(result[-1][1], current_end)</code>",
                strategy: "Sort by start. Compare current interval with LAST merged interval.",
                trap: "<strong>⚠️ Use result[-1] not result[index-1]!</strong><br>result length differs from intervals length!<br><code>result[index-1]</code> → IndexError",
                dryRun: [
                    "<strong>Input:</strong> [[1,3], [2,6], [8,10]]",
                    "<strong>After sort:</strong> Same (already sorted)",
                    "<strong>Init:</strong> result = [[1,3]]",
                    "index=1 [2,6]: result[-1][1]=3 >= 2? ✅ Overlap! result[-1][1] = max(3,6) = 6. result=[[1,<span class='var-highlight'>6</span>]]",
                    "index=2 [8,10]: result[-1][1]=6 >= 8? ❌ No overlap. Append. result=[[1,6], [8,10]]",
                    "<strong>Return:</strong> [[1,6], [8,10]]"
                ],
                codeTitle: "Python Solution (Clean)",
                code: `def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])  # Start time se sort
    result = [intervals[0]]  # Pehla interval daal diya
    
    for index in range(1, len(intervals)):
        # ⚠️ IMPORTANT: result ki length intervals se CHHOTI hai!
        # result[index-1] WRONG - IndexError aayega
        # result[-1] CORRECT - last merged interval check karo
        
        if result[-1][1] >= intervals[index][0]:  # Overlap hai?
            result[-1][1] = max(result[-1][1], intervals[index][1])  # Merge: max end lo
        else:  # No overlap
            result.append(intervals[index])  # Naya interval add karo
    
    return result`,
                codeDetailed: `def merge_intervals(intervals):
    """
    Merge Overlapping Intervals
    
    STRATEGY:
    1. Sort by start time
    2. Compare each interval with LAST merged
    3. If overlap: extend end time
    4. Else: add as new interval
    
    TRAP: Use result[-1], NOT result[index-1]!
    """
    
    intervals.sort(key=lambda x: x[0])
    result = [intervals[0]]
    
    for index in range(1, len(intervals)):
        # Check overlap with LAST merged interval
        # NOT result[index-1] - that causes IndexError!
        
        if result[-1][1] >= intervals[index][0]:
            # OVERLAP! Extend end time
            result[-1][1] = max(result[-1][1], intervals[index][1])
        else:
            # NO OVERLAP - add new interval
            result.append(intervals[index])
    
    return result`
            }
        },
        {
            id: "meeting-rooms-ii",
            title: "Meeting Rooms II",
            leetcodeUrl: "https://leetcode.com/problems/meeting-rooms-ii/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Min-Heap"],
            quiz: {
                description: "Find minimum meeting rooms needed. Best data structure?",
                options: [
                    "Sort by start time, count overlaps",
                    "Min Heap of end times",
                    "Interval tree",
                    "Greedy with sorting both start and end arrays"
                ],
                correct: 1,
                explanation: "Min Heap FTW! Sort by start time. For each meeting, if heap top (earliest end) < current start, reuse room (pop heap). Always push current end time. Heap size = rooms needed. O(n log n)!"
            },
            learn: {
                quickAlgo: [
                    "intervals.sort(key=lambda x: x[0]) # 🎯 Sort by START time",
                    "heap = []                          # ⚡ Min-Heap of END times",
                    "for start, end in intervals:",
                    "    if heap and heap[0] <= start:  # 🔄 Room available! (meeting ended)",
                    "        heappop(heap)              # ✅ Reuse room",
                    "    heappush(heap, end)            # 💡 Always push current end time",
                    "return len(heap)                   # Heap size = rooms needed"
                ],
                metrics: { time: "O(N log N)", space: "O(N)" },
                timeExplainer: "<strong>Time Breakdown:</strong><br>• Sorting: <code>O(N log N)</code><br>• Heap operations: <code>O(N log N)</code><br><br><strong>Total:</strong> <code>O(N log N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Min-Heap stores end times<br>• Worst case: all meetings overlap = <code>O(N)</code>",
                visual: "<span><strong>Visual: Room Re-use</strong><br>Heap batata hai kaunsi meeting sabse pehle khatam hogi. Agar nayi meeting uske baad shuru ho rahi hai, toh room reuse karo.</span>",
                crux: "Track occupied rooms.<br><strong>Strategy:</strong><br>1. Sort by Start Time.<br>2. Min-Heap stores End Times.<br>3. If <code>start >= heap[0]</code>, pop (room freed).<br>4. Push new end time.",
                trap: "<strong>Just Finished:</strong> [1, 5] and [5, 10]. Reuse is allowed.",
                dryRun: [
                    "<strong>Input:</strong> [[0, 30], [5, 10], [15, 20]]",
                    "1. [0, 30]: Heap=[30]",
                    "2. [5, 10]: 5 < 30. New room. Heap=[10, 30]",
                    "3. [15, 20]: 15 >= 10. Reuse. Pop 10, Push 20. Heap=[20, 30]",
                    "Size=2"
                ],
                codeTitle: "Python Solution",
                code: `import heapq
def min_meeting_rooms(intervals):
if not intervals: return 0
intervals.sort(key=lambda x: x[0])
heap = [] # Stores end times
heapq.heappush(heap, intervals[0][1])

for i in range(1, len(intervals)):
    if intervals[i][0] >= heap[0]:
        heapq.heappop(heap)
    heapq.heappush(heap, intervals[i][1])
    
return len(heap)`
            }
        },
        {
            id: "longest-substring",
            title: "Longest Substring Without Repeating",
            leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["Sliding Window"],
            quiz: {
                description: "Find longest substring with all unique characters. What's the sliding window logic?",
                options: [
                    "Try all substrings O(n³)",
                    "HashMap + Sliding window with left pointer jump",
                    "Set + Two pointers expanding right",
                    "Binary search on length"
                ],
                correct: 2,
                explanation: "Set + Sliding Window! Expand right, shrink left if duplicate found. Track max length. O(n) time!"
            },
            learn: {
                quickAlgo: [
                    "char_set = set(); max_length = 0; left = 0",
                    "for right in range(len(s)):",
                    "    if s[right] in char_set:               # 🔄 Duplicate mila!",
                    "        while s[right] in char_set:        # Jab tak duplicate hai",
                    "            char_set.remove(s[left])       # Left hata, aage badho",
                    "            left += 1",
                    "    char_set.add(s[right])                  # ✅ Current add karo",
                    "    max_length = max(max_length, right - left + 1)",
                    "return max_length"
                ],
                metrics: { time: "O(N)", space: "O(N)" },
                timeExplainer: "<strong>Time: O(N)</strong><br>Each char added once, removed at most once. 2N ops = O(N).",
                spaceExplainer: "<strong>Space: O(N)</strong><br>Worst case (all unique): Set stores all N chars.",
                visual: `<span><strong>Visual: Elastic Window</strong><br>
<pre style="background:none; border:none; padding:10px; font-size:0.8rem; line-height:1.2;">
"abcabcbb"
    ^  ^
    L  R

When duplicate found:
  Shrink LEFT until duplicate gone!
  
s[R]='a' already in set → remove s[L], L++
until 'a' not in set anymore
</pre></span>`,
                crux: "<strong>Expand Right, Shrink Left if duplicate!</strong><br><br>Window size formula: <code>right - left + 1</code>",
                strategy: "Use SET for O(1) lookup. If <code>s[right]</code> in Set → shrink window from left until valid.",
                trap: "<strong>while not if!</strong><br>Multiple chars may need removal. Ex: 'abcc' → remove 'a', 'b', 'c' to clear duplicate 'c'.",
                dryRun: [
                    "<strong>Input:</strong> 'abcabcbb'",
                    "<strong>Init:</strong> char_set={}, max_length=0, left=0",
                    "R=0('a'): Not in set. Add. set={'a'}, len=1",
                    "R=1('b'): Not in set. Add. set={'a','b'}, len=2",
                    "R=2('c'): Not in set. Add. set={'a','b','c'}, len=<span class='var-highlight'>3</span>",
                    "R=3('a'): <strong>Duplicate!</strong> Remove s[0]='a', left=1. Add 'a'. set={'b','c','a'}, len=3",
                    "<strong>Return:</strong> 3"
                ],
                codeTitle: "Python Solution (Clean)",
                code: `def longest_substring_without_rep(s):
    
    char_set = set()
    max_length = 0
    left = 0

    for right in range(len(s)):
        
        if s[right] in char_set:  # Duplicate mila
            while s[right] in char_set:  # Jab tak duplicate hai
                char_set.remove(s[left])  # Left ko hata aage badho
                left += 1
        
        char_set.add(s[right])  # Current add karo
        max_length = max(max_length, right - left + 1)  # Max update
       
    return max_length`,
                codeDetailed: `def longest_substring_without_rep(s):
    """
    Longest Substring Without Repeating Characters
    
    STRATEGY: Sliding Window + HashSet
    - Expand right pointer
    - If duplicate found: shrink left until valid
    - Track max window size
    
    Time: O(N), Space: O(N)
    """
    
    char_set = set()
    max_length = 0
    left = 0

    for right in range(len(s)):
        
        # DUPLICATE CHECK
        if s[right] in char_set:
            # Shrink window until duplicate gone
            while s[right] in char_set:
                char_set.remove(s[left])
                left += 1
        
        # Add current char to window
        char_set.add(s[right])
        
        # Update max length
        # Window size = right - left + 1
        max_length = max(max_length, right - left + 1)
       
    return max_length`
            }
        },
        {
            id: "sort-colors",
            title: "Sort Colors",
            leetcodeUrl: "https://leetcode.com/problems/sort-colors/",
            difficulty: "Good to Do",
            priority: "🟡",
            tags: ["Two Pointers"],
            quiz: {
                description: "Sort array of 0s, 1s, 2s in one pass. Method?",
                options: ["Merge Sort", "Counting Sort (2 pass)", "Dutch National Flag (1 pass)", "Quick Sort"],
                correct: 2,
                explanation: "Dutch National Flag Algorithm! 3 Pointers: Low (0 boundary), Mid (Scanner), High (2 boundary). If 0: swap(low, mid), low++, mid++. If 1: mid++. If 2: swap(mid, high), high--."
            },
            learn: {
                quickAlgo: [
                    "L, mid, R = 0, 0, len(nums)-1      # 🎯 3 Pointers: 0s, 1s, 2s boundaries",
                    "while mid <= R:",
                    "    if nums[mid] == 0:             # ⚡ Found 0: Move to Front",
                    "        swap(nums[L], nums[mid])",
                    "        L += 1; mid += 1",
                    "    elif nums[mid] == 1:           # 🔄 Found 1: Skip",
                    "        mid += 1",
                    "    else:                          # 💡 Found 2: Move to Back",
                    "        swap(nums[mid], nums[R])",
                    "        R -= 1                     # ✅ Don't move mid (check swapped val)"
                ],
                metrics: { time: "O(N)", space: "O(1)" },
                code: `def sortColors(nums):
l, r = 0, len(nums)-1
i = 0
while i <= r:
    if nums[i] == 0:
        nums[l], nums[i] = nums[i], nums[l]
        l += 1
        i += 1
    elif nums[i] == 2:
        nums[r], nums[i] = nums[i], nums[r]
        r -= 1
    else:
        i += 1`
            }
        },

        {
            id: "subarray-sum-xor-k",
            title: "Subarrays with XOR K",
            leetcodeUrl: "https://www.interviewbit.com/problems/subarray-with-given-xor/",
            difficulty: "Good to Do",
            priority: "🟡",
            tags: ["HashMap"],
            quiz: {
                description: "Count subarrays with XOR = K. Pattern?",
                options: ["Sliding Window", "Prefix XOR + HashMap", "Trie", "DP"],
                correct: 1,
                explanation: "XR = Prefix XOR. We want subarray ending at i with XOR K. So `XR ^ K` must exist previously? Yes. like Two Sum: Check map for `XR ^ K`. Add count."
            },
            learn: {
                quickAlgo: [
                    "count = 0; xor = 0",
                    "map = {0: 1}                       # 🎯 Base case: XOR 0 seen once (empty prefix)",
                    "for n in nums:",
                    "    xor ^= n                       # ⚡ Current Prefix XOR",
                    "    target = xor ^ K               # 🔄 Formula: Prefix[i] ^ Prefix[j] = K",
                    "    if target in map:",
                    "        count += map[target]       # ✅ Add occurrences of required prefix",
                    "    map[xor] = map.get(xor,0) + 1  # 💡 Store current XOR frequency",
                    "return count"
                ],
                metrics: { time: "O(N)", space: "O(N)" },
                code: `def solve(A, B):
cnt = 0
xor = 0
map = {0: 1}
for n in A:
    xor ^= n
    if (xor ^ B) in map:
        cnt += map[xor ^ B]
    map[xor] = map.get(xor, 0) + 1
return cnt`
            }
        },
        {
            id: "longest-substring-k-distinct",
            title: "Longest Substring K Distinct",
            leetcodeUrl: "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/",
            difficulty: "Good to Do",
            priority: "🟡",
            tags: ["Sliding Window"],
            quiz: {
                description: "Max substring with at most K distinct chars.",
                options: ["DP", "Sliding Window + HashMap", "Recursion", "Greedy"],
                correct: 1,
                explanation: "Standard variable sliding window! Expand right, add to Map. While len(Map) > K, shrink left (decrement/remove from Map). Update max_len."
            },
            learn: {
                quickAlgo: [
                    "char_map = {}; L = 0; max_len = 0",
                    "for R in range(len(s)):           # 🎯 Expand Right",
                    "    char_map[s[R]] = char_map.get(s[R], 0) + 1",
                    "    while len(char_map) > K:      # ⚡ Too many distinct chars!",
                    "        char_map[s[L]] -= 1       # 🔄 Shrink Left",
                    "        if char_map[s[L]] == 0:",
                    "            del char_map[s[L]]    # ✅ Remove from tracking",
                    "        L += 1",
                    "    max_len = max(max_len, R-L+1) # 💡 Valid window size",
                    "return max_len"
                ],
                metrics: { time: "O(N)", space: "O(K)" },
                code: `def lengthOfLongestSubstringKDistinct(s, k):
map = {}
l = 0
res = 0
for r, c in enumerate(s):
    map[c] = map.get(c, 0) + 1
    while len(map) > k:
        map[s[l]] -= 1
        if map[s[l]] == 0: del map[s[l]]
        l += 1
    res = max(res, r - l + 1)
return res`
            }
        }
    ]
}
