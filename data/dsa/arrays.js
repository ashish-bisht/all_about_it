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
            learn: {
                quickAlgo: [
                    "seen = {}                                      # 🎯 HashMap to store {value: index}",
                    "for index, num in enumerate(nums):",
                    "    complement = target - num                  # ⚡ What do we need?",
                    "    if complement in seen:                     # 🔍 Found it?",
                    "        return [seen[complement], index]       # ✅ Return [old_index, current_index]",
                    "    seen[num] = index                          # 💡 Store current for future"
                ],
                metrics: { time: "O(N)", space: "O(N)" },
                timeExplainer: "<strong>Time: O(N)</strong><br>We traverse the list containing N elements only once. Each look up in the table costs only O(1) time.",
                spaceExplainer: "<strong>Space: O(N)</strong><br>The extra space required depends on the number of items stored in the hash table, which stores at most N elements.",
                visual: `<div style="font-family:monospace; font-size:0.85rem;">
                    <strong style="color:#6366f1;">Two Sum: "The Complement Mirror" 🪞</strong>
                    <div style="background:#1e293b; padding:16px; border-radius:10px; margin:12px 0;">
                        <div style="color:#94a3b8; font-size:0.8rem; margin-bottom:12px;">Target = 9, nums = [2, 7, 11, 15]</div>
                        <div style="display:flex; flex-direction:column; gap:10px;">
                            <div style="display:flex; align-items:center; gap:8px;">
                                <span style="padding:6px 14px; background:rgba(251,191,36,0.2); border:1px solid #fbbf24; border-radius:8px; color:#fbbf24; font-weight:bold;">2</span>
                                <span style="color:#94a3b8;">→ Need 7. Map: {</span><span style="color:#fbbf24;">2:0</span><span style="color:#94a3b8;">}</span>
                            </div>
                            <div style="display:flex; align-items:center; gap:8px;">
                                <span style="padding:6px 14px; background:rgba(74,222,128,0.2); border:1px solid #4ade80; border-radius:8px; color:#4ade80; font-weight:bold;">7</span>
                                <span style="color:#94a3b8;">→ Need 2.</span>
                                <span style="color:#4ade80; font-weight:bold;">2 in Map? YES! ✓</span>
                            </div>
                        </div>
                        <div style="margin-top:12px; padding:8px 12px; background:rgba(74,222,128,0.1); border-radius:6px; border-left:3px solid #4ade80;">
                            <span style="color:#4ade80;">Found pair: indices [0, 1] → (2 + 7 = 9)</span>
                        </div>
                    </div>
                    <div style="background:#0f172a; padding:10px; border-radius:6px;">
                        <div style="color:#fbbf24;">Pattern: complement = target - num → check HashMap</div>
                        <div style="color:#94a3b8;">One-pass: store {value: index} as you go</div>
                    </div>
                </div>`,
                crux: "<strong>HashMap as Memory:</strong><br>As we iterate, we ask: 'Have I seen my complement before?'<br>If yes, we're done. If no, we remember the current number for the future.",
                strategy: "One-pass HashMap. Store `val -> index`. Check `target - val` in map.",
                trap: "<strong>Self-Usage:</strong><br>You cannot use the same element twice (e.g., target=6, nums=[3, 3] is fine, but nums=[3] is checking itself).<br><strong>Fix:</strong> Check map <em>before</em> adding current element.",
                dryRun: [
                    "<strong>Input:</strong> nums=[2, 7, 11, 15], target=9",
                    "<strong>Init:</strong> map={}",
                    "i=0, num=2: Need 7. Map has 7? NO. Add map[2]=0.",
                    "i=1, num=7: Need 2. Map has 2? YES (index 0).",
                    "<strong>Return:</strong> [0, 1]"
                ],
                codeTitle: "Python Solution (One Pass)",
                code: `def twoSum(nums, target):
    seen = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in seen:
            return [seen[complement], i]
            
        seen[num] = i
        
    return []`,
                codeDetailed: `def twoSum(nums, target):
    """
    Two Sum - HashMap Method
    
    STRATEGY:
    - We need to find 'a + b = target'
    - Rewritten: 'a = target - b'
    - Iterate through array, for each number 'b', check if we've already seen 'a'.
    
    WHY HASHMAP?
    - Lookup is O(1).
    - Total time becomes O(N) instead of O(N^2).
    """
    
    # Store { value : index }
    seen = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        # Have we seen the complement before?
        if complement in seen:
            return [seen[complement], i]
            
        # Store current number for future lookups
        seen[num] = i
        
    return []`
            }
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
                visual: `<div style="font-family:monospace; font-size:0.85rem;">
                    <strong style="color:#8b5cf6;">3Sum: "Anchor + Two Pointer Squeeze"</strong>
                    <div style="background:#1e293b; padding:16px; border-radius:10px; margin:12px 0;">
                        <div style="color:#94a3b8; font-size:0.8rem; margin-bottom:10px;">Sorted: [-4, -1, -1, 0, 1, 2] → Target = 0</div>
                        <div style="display:flex; gap:6px; align-items:center; justify-content:center; margin:12px 0;">
                            <span style="padding:6px 10px; background:rgba(251,191,36,0.3); border:2px solid #fbbf24; border-radius:8px; color:#fbbf24;">-1</span>
                            <span style="padding:6px 10px; background:rgba(56,189,248,0.2); border:1px solid #38bdf8; border-radius:8px; color:#38bdf8;">0</span>
                            <span style="padding:6px 10px; background:#1e293b; border:1px solid #475569; border-radius:8px; color:#cbd5e1;">1</span>
                            <span style="padding:6px 10px; background:rgba(248,113,113,0.2); border:1px solid #f87171; border-radius:8px; color:#f87171;">2</span>
                        </div>
                        <div style="text-align:center; font-size:0.75rem; color:#94a3b8;">
                            <span style="color:#fbbf24;">⬆ Anchor</span>&nbsp;&nbsp;&nbsp;
                            <span style="color:#38bdf8;">⬆ L</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span style="color:#f87171;">⬆ R</span>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:6px; margin-top:12px; font-size:0.82rem;">
                            <div style="color:#f87171;">L+R = 0+2 = 2 → Too big, R-- ←</div>
                            <div style="color:#38bdf8;">L+R = 0+1 = 1 → Too big, R-- ←</div>
                            <div style="color:#4ade80; font-weight:bold;">[-1, 0, 1] = 0 ✓ FOUND!</div>
                        </div>
                    </div>
                    <div style="background:#0f172a; padding:10px; border-radius:6px;">
                        <div style="color:#fbbf24;">Sort → Fix anchor → Two pointers squeeze remaining</div>
                        <div style="color:#94a3b8;">Skip duplicates: if nums[i] == nums[i-1]: continue</div>
                    </div>
                </div>`,
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
                visual: `<div style="font-family:monospace; font-size:0.85rem;">
                    <strong style="color:#10b981;">Kadane's: "Continue or Fresh Start?"</strong>
                    <div style="background:#1e293b; padding:16px; border-radius:10px; margin:12px 0;">
                        <div style="color:#94a3b8; font-size:0.8rem; margin-bottom:10px;">nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]</div>
                        <div style="display:flex; gap:4px; align-items:flex-end; justify-content:center; height:90px; margin:8px 0;">
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;"><div style="height:20px; width:28px; background:rgba(248,113,113,0.4); border:1px solid #f87171; border-radius:3px;"></div><span style="font-size:0.7rem; color:#f87171;">-2</span></div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;"><div style="height:35px; width:28px; background:rgba(74,222,128,0.4); border:1px solid #4ade80; border-radius:3px;"></div><span style="font-size:0.7rem; color:#4ade80;">1</span></div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;"><div style="height:15px; width:28px; background:rgba(248,113,113,0.4); border:1px solid #f87171; border-radius:3px;"></div><span style="font-size:0.7rem; color:#f87171;">-3</span></div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;"><div style="height:65px; width:28px; background:rgba(74,222,128,0.6); border:2px solid #4ade80; border-radius:3px;"></div><span style="font-size:0.7rem; color:#4ade80; font-weight:bold;">4★</span></div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;"><div style="height:50px; width:28px; background:rgba(74,222,128,0.3); border:1px solid #4ade80; border-radius:3px;"></div><span style="font-size:0.7rem; color:#94a3b8;">-1</span></div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;"><div style="height:60px; width:28px; background:rgba(74,222,128,0.3); border:1px solid #4ade80; border-radius:3px;"></div><span style="font-size:0.7rem; color:#94a3b8;">2</span></div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;"><div style="height:70px; width:28px; background:rgba(56,189,248,0.4); border:2px solid #38bdf8; border-radius:3px;"></div><span style="font-size:0.7rem; color:#38bdf8; font-weight:bold;">1</span></div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;"><div style="height:10px; width:28px; background:rgba(248,113,113,0.4); border:1px solid #f87171; border-radius:3px;"></div><span style="font-size:0.7rem; color:#f87171;">-5</span></div>
                            <div style="display:flex; flex-direction:column; align-items:center; gap:2px;"><div style="height:40px; width:28px; background:rgba(139,92,246,0.3); border:1px solid #8b5cf6; border-radius:3px;"></div><span style="font-size:0.7rem; color:#94a3b8;">4</span></div>
                        </div>
                        <div style="text-align:center; margin-top:8px;">
                            <span style="color:#38bdf8; font-weight:bold; padding:4px 10px; background:rgba(56,189,248,0.1); border-radius:6px;">Max subarray: [4,-1,2,1] = 6</span>
                        </div>
                    </div>
                    <div style="display:flex; gap:8px; margin-top:8px;">
                        <div style="flex:1; background:rgba(74,222,128,0.1); padding:10px; border-radius:6px; border-left:3px solid #4ade80;">
                            <div style="color:#4ade80; font-weight:bold; font-size:0.8rem;">Continue ✓</div>
                            <div style="color:#94a3b8; font-size:0.78rem;">prev + nums[i]</div>
                        </div>
                        <div style="flex:1; background:rgba(251,191,36,0.1); padding:10px; border-radius:6px; border-left:3px solid #fbbf24;">
                            <div style="color:#fbbf24; font-weight:bold; font-size:0.8rem;">Fresh Start ★</div>
                            <div style="color:#94a3b8; font-size:0.78rem;">nums[i] alone</div>
                        </div>
                    </div>
                </div>`,
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
                visual: `<div style="font-family:monospace; font-size:0.85rem;">
                    <strong style="color:#f59e0b;">Product Except Self: "Sandwich from Both Sides"</strong>
                    <div style="background:#1e293b; padding:16px; border-radius:10px; margin:12px 0;">
                        <div style="color:#94a3b8; font-size:0.8rem; margin-bottom:12px;">nums = [1, 2, 3, 4]</div>
                        <div style="display:flex; flex-direction:column; gap:10px;">
                            <div>
                                <div style="color:#38bdf8; font-weight:bold; font-size:0.8rem; margin-bottom:6px;">← Left Pass (prefix products):</div>
                                <div style="display:flex; gap:6px; align-items:center;">
                                    <span style="padding:5px 12px; background:rgba(56,189,248,0.2); border:1px solid #38bdf8; border-radius:6px; color:#38bdf8;">1</span>
                                    <span style="padding:5px 12px; background:rgba(56,189,248,0.2); border:1px solid #38bdf8; border-radius:6px; color:#38bdf8;">1</span>
                                    <span style="padding:5px 12px; background:rgba(56,189,248,0.2); border:1px solid #38bdf8; border-radius:6px; color:#38bdf8;">2</span>
                                    <span style="padding:5px 12px; background:rgba(56,189,248,0.2); border:1px solid #38bdf8; border-radius:6px; color:#38bdf8;">6</span>
                                </div>
                            </div>
                            <div style="color:#94a3b8; text-align:center;">× (multiply)</div>
                            <div>
                                <div style="color:#f87171; font-weight:bold; font-size:0.8rem; margin-bottom:6px;">→ Right Pass (suffix products):</div>
                                <div style="display:flex; gap:6px; align-items:center;">
                                    <span style="padding:5px 12px; background:rgba(248,113,113,0.2); border:1px solid #f87171; border-radius:6px; color:#f87171;">24</span>
                                    <span style="padding:5px 12px; background:rgba(248,113,113,0.2); border:1px solid #f87171; border-radius:6px; color:#f87171;">12</span>
                                    <span style="padding:5px 12px; background:rgba(248,113,113,0.2); border:1px solid #f87171; border-radius:6px; color:#f87171;">4</span>
                                    <span style="padding:5px 12px; background:rgba(248,113,113,0.2); border:1px solid #f87171; border-radius:6px; color:#f87171;">1</span>
                                </div>
                            </div>
                        </div>
                        <div style="margin-top:12px; text-align:center;">
                            <div style="color:#94a3b8;">= Final: </div>
                            <div style="display:flex; gap:6px; justify-content:center; margin-top:4px;">
                                <span style="padding:5px 12px; background:rgba(74,222,128,0.2); border:2px solid #4ade80; border-radius:6px; color:#4ade80; font-weight:bold;">24</span>
                                <span style="padding:5px 12px; background:rgba(74,222,128,0.2); border:2px solid #4ade80; border-radius:6px; color:#4ade80; font-weight:bold;">12</span>
                                <span style="padding:5px 12px; background:rgba(74,222,128,0.2); border:2px solid #4ade80; border-radius:6px; color:#4ade80; font-weight:bold;">8</span>
                                <span style="padding:5px 12px; background:rgba(74,222,128,0.2); border:2px solid #4ade80; border-radius:6px; color:#4ade80; font-weight:bold;">6</span>
                            </div>
                        </div>
                    </div>
                    <div style="background:#0f172a; padding:10px; border-radius:6px;">
                        <div style="color:#fbbf24;">res[i] = left_product[i] × right_product[i]</div>
                        <div style="color:#94a3b8;">No division needed! Two passes O(N)</div>
                    </div>
                </div>`,
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
                visual: `<div style="font-family:monospace; font-size:0.85rem;">
                    <strong style="color:#38bdf8;">Trapping Rain Water: "Process the Smaller Side"</strong>
                    <div style="background:#1e293b; padding:16px; border-radius:10px; margin:12px 0;">
                        <div style="color:#94a3b8; font-size:0.8rem; margin-bottom:10px;">height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]</div>
                        <div style="display:flex; gap:3px; align-items:flex-end; justify-content:center; height:100px; margin:8px 0;">
                            <div style="width:22px; height:5px; background:#475569; border-radius:2px;"></div>
                            <div style="width:22px; height:25px; background:#6366f1; border-radius:2px;"></div>
                            <div style="width:22px; height:25px; background:rgba(56,189,248,0.4); border:1px dashed #38bdf8; border-radius:2px;"></div>
                            <div style="width:22px; height:50px; background:#6366f1; border-radius:2px;"></div>
                            <div style="width:22px; height:25px; background:#6366f1; border-radius:2px; position:relative;"><div style="position:absolute;top:0;width:100%;height:25px;background:rgba(56,189,248,0.3);border-radius:2px;"></div></div>
                            <div style="width:22px; height:50px; background:rgba(56,189,248,0.4); border:1px dashed #38bdf8; border-radius:2px;"></div>
                            <div style="width:22px; height:25px; background:#6366f1; border-radius:2px; position:relative;"><div style="position:absolute;top:0;width:100%;height:25px;background:rgba(56,189,248,0.3);border-radius:2px;"></div></div>
                            <div style="width:22px; height:75px; background:#6366f1; border-radius:2px;"></div>
                            <div style="width:22px; height:50px; background:#6366f1; border-radius:2px;"></div>
                            <div style="width:22px; height:25px; background:#6366f1; border-radius:2px; position:relative;"><div style="position:absolute;top:0;width:100%;height:25px;background:rgba(56,189,248,0.3);border-radius:2px;"></div></div>
                            <div style="width:22px; height:50px; background:#6366f1; border-radius:2px;"></div>
                            <div style="width:22px; height:25px; background:#6366f1; border-radius:2px;"></div>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:#94a3b8; margin-top:4px;">
                            <span style="color:#38bdf8;">⬆ L (smaller→process)</span>
                            <span style="color:#38bdf8;">💧 water fills</span>
                            <span style="color:#f87171;">⬆ R</span>
                        </div>
                    </div>
                    <div style="background:rgba(56,189,248,0.1); padding:10px; border-radius:6px; border-left:3px solid #38bdf8;">
                        <div style="color:#38bdf8; font-weight:bold;">If h[L] < h[R]: process LEFT (water guaranteed!)</div>
                        <div style="color:#94a3b8;">Wall = update max | Valley = trap water (max - height)</div>
                    </div>
                </div>`,
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
                visual: `<div style="font-family:monospace; font-size:0.85rem;">
                    <strong style="color:#f59e0b;">Merge Intervals: "Sort → Overlap → Extend"</strong>
                    <div style="background:#1e293b; padding:16px; border-radius:10px; margin:12px 0;">
                        <div style="color:#94a3b8; font-size:0.8rem; margin-bottom:10px;">Sorted: [1,3] [2,6] [8,10]</div>
                        <div style="display:flex; flex-direction:column; gap:10px; font-size:0.82rem;">
                            <div style="display:flex; align-items:center; gap:8px;">
                                <span style="padding:4px 0; width:200px; position:relative;">
                                    <span style="display:inline-block; width:60px; height:20px; background:rgba(74,222,128,0.3); border:1px solid #4ade80; border-radius:4px; text-align:center; line-height:20px; color:#4ade80; font-size:0.75rem;">[1,3]</span>
                                </span>
                            </div>
                            <div style="display:flex; align-items:center; gap:8px;">
                                <span style="padding:4px 0; width:200px; position:relative;">
                                    <span style="display:inline-block; margin-left:20px; width:100px; height:20px; background:rgba(56,189,248,0.3); border:1px solid #38bdf8; border-radius:4px; text-align:center; line-height:20px; color:#38bdf8; font-size:0.75rem;">[2,6]</span>
                                </span>
                                <span style="color:#4ade80;">2 ≤ 3 → Overlap! Merge → [1,6]</span>
                            </div>
                            <div style="display:flex; align-items:center; gap:8px;">
                                <span style="padding:4px 0; width:200px; position:relative;">
                                    <span style="display:inline-block; margin-left:150px; width:50px; height:20px; background:rgba(248,113,113,0.3); border:1px solid #f87171; border-radius:4px; text-align:center; line-height:20px; color:#f87171; font-size:0.75rem;">[8,10]</span>
                                </span>
                                <span style="color:#f87171;">8 > 6 → No overlap! Add new</span>
                            </div>
                        </div>
                        <div style="margin-top:12px; text-align:center; padding:6px; background:rgba(74,222,128,0.1); border-radius:6px;">
                            <span style="color:#4ade80; font-weight:bold;">Result: [[1,6], [8,10]]</span>
                        </div>
                    </div>
                    <div style="background:#0f172a; padding:10px; border-radius:6px;">
                        <div style="color:#fbbf24;">Overlap check: result[-1][1] >= intervals[i][0]</div>
                        <div style="color:#94a3b8;">Merge: result[-1][1] = max(result[-1][1], current_end)</div>
                    </div>
                </div>`,
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
                visual: `
                    <h4 style="color:#c026d3;">🏢 Meeting Rooms: Min-Heap of End Times</h4>
                    <div style="display:flex; flex-direction:column; gap:12px; margin:15px 0; max-width:600px;">
                        <div style="background:#1e293b; padding:16px; border-radius:12px;">
                            <div style="font-size:0.8rem; color:#94a3b8; margin-bottom:10px;">Meetings (sorted by start): [0,30], [5,10], [15,20]</div>
                            <div style="display:flex; flex-direction:column; gap:8px; font-family:monospace; font-size:0.82rem;">
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <span style="color:#fbbf24; width:30px;">M1:</span>
                                    <div style="background:rgba(74,222,128,0.15); height:22px; border-radius:4px; width:200px; display:flex; align-items:center; padding:0 8px; font-size:0.75rem; color:#4ade80;">[0 ──────────────── 30]</div>
                                </div>
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <span style="color:#fbbf24; width:30px;">M2:</span>
                                    <div style="margin-left:33px; background:rgba(56,189,248,0.15); height:22px; border-radius:4px; width:40px; display:flex; align-items:center; padding:0 8px; font-size:0.75rem; color:#38bdf8;">[5-10]</div>
                                </div>
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <span style="color:#fbbf24; width:30px;">M3:</span>
                                    <div style="margin-left:100px; background:rgba(248,113,113,0.15); height:22px; border-radius:4px; width:40px; display:flex; align-items:center; padding:0 8px; font-size:0.75rem; color:#f87171;">[15-20]</div>
                                </div>
                            </div>
                        </div>
                        <div style="background:#0f172a; padding:12px; border-radius:8px;">
                            <div style="display:grid; grid-template-columns:80px 1fr; gap:6px; font-size:0.82rem; color:#cbd5e1;">
                                <span style="color:#4ade80;">Add M1:</span><span>Heap=[<span style="color:#4ade80;">30</span>] → Rooms=1</span>
                                <span style="color:#38bdf8;">Add M2:</span><span>5 < 30? New room! Heap=[<span style="color:#38bdf8;">10</span>,30] → Rooms=2</span>
                                <span style="color:#f87171;">Add M3:</span><span>15 ≥ 10? Reuse! Heap=[<span style="color:#f87171;">20</span>,30] → Rooms=2 ✅</span>
                            </div>
                        </div>
                    </div>`,
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
    
return len(heap)`,
                strategy: "Sort by start. Min-Heap tracks end times. If earliest ending <= current start, reuse room (pop). Always push current end.",
                codeDetailed: `import heapq

def min_meeting_rooms(intervals):
    """
    Meeting Rooms II - Minimum rooms needed

    STRATEGY: Sort + Min-Heap of End Times
    - Sort meetings by start time
    - Min-Heap tracks when each room becomes free
    - If earliest free room (heap[0]) is free by current start → reuse
    - Otherwise → allocate new room

    Time: O(N log N), Space: O(N)
    """

    # Edge case: no meetings
    if not intervals:
        return 0

    # Sort by start time so we process meetings in order
    intervals.sort(key=lambda x: x[0])

    # Min-Heap stores END times of ongoing meetings
    # heap[0] = earliest ending meeting
    heap = []
    heapq.heappush(heap, intervals[0][1])  # First meeting's end time

    for i in range(1, len(intervals)):
        # Can we reuse a room?
        # If earliest ending meeting (heap[0]) finishes before/at current start
        if intervals[i][0] >= heap[0]:
            heapq.heappop(heap)  # Room freed! Reuse it

        # Push current meeting's end time (new or reused room)
        heapq.heappush(heap, intervals[i][1])

    # Heap size = number of rooms in use
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
                visual: `<div style="font-family:monospace; font-size:0.85rem;">
                    <strong style="color:#a78bfa;">Longest Substring: "Elastic Window Expands & Shrinks"</strong>
                    <div style="background:#1e293b; padding:16px; border-radius:10px; margin:12px 0;">
                        <div style="color:#94a3b8; font-size:0.8rem; margin-bottom:10px;">s = "abcabcbb"</div>
                        <div style="display:flex; flex-direction:column; gap:8px;">
                            <div style="display:flex; gap:4px; align-items:center;">
                                <span style="width:45px; color:#94a3b8; font-size:0.75rem;">R=2:</span>
                                <span style="padding:4px 8px; background:rgba(74,222,128,0.2); border:1px solid #4ade80; border-radius:4px; color:#4ade80;">a</span>
                                <span style="padding:4px 8px; background:rgba(74,222,128,0.2); border:1px solid #4ade80; border-radius:4px; color:#4ade80;">b</span>
                                <span style="padding:4px 8px; background:rgba(74,222,128,0.2); border:1px solid #4ade80; border-radius:4px; color:#4ade80;">c</span>
                                <span style="padding:4px 8px; background:#0f172a; border:1px solid #334155; border-radius:4px; color:#475569;">a</span>
                                <span style="padding:4px 8px; background:#0f172a; border:1px solid #334155; border-radius:4px; color:#475569;">b</span>
                                <span style="padding:4px 8px; background:#0f172a; border:1px solid #334155; border-radius:4px; color:#475569;">c</span>
                                <span style="padding:4px 8px; background:#0f172a; border:1px solid #334155; border-radius:4px; color:#475569;">b</span>
                                <span style="padding:4px 8px; background:#0f172a; border:1px solid #334155; border-radius:4px; color:#475569;">b</span>
                                <span style="color:#4ade80; margin-left:8px;">len=3 ✓</span>
                            </div>
                            <div style="display:flex; gap:4px; align-items:center;">
                                <span style="width:45px; color:#94a3b8; font-size:0.75rem;">R=3:</span>
                                <span style="padding:4px 8px; background:rgba(248,113,113,0.2); border:1px solid #f87171; border-radius:4px; color:#f87171; text-decoration:line-through;">a</span>
                                <span style="padding:4px 8px; background:rgba(56,189,248,0.2); border:1px solid #38bdf8; border-radius:4px; color:#38bdf8;">b</span>
                                <span style="padding:4px 8px; background:rgba(56,189,248,0.2); border:1px solid #38bdf8; border-radius:4px; color:#38bdf8;">c</span>
                                <span style="padding:4px 8px; background:rgba(56,189,248,0.2); border:1px solid #38bdf8; border-radius:4px; color:#38bdf8;">a</span>
                                <span style="padding:4px 8px; background:#0f172a; border:1px solid #334155; border-radius:4px; color:#475569;">b</span>
                                <span style="padding:4px 8px; background:#0f172a; border:1px solid #334155; border-radius:4px; color:#475569;">c</span>
                                <span style="padding:4px 8px; background:#0f172a; border:1px solid #334155; border-radius:4px; color:#475569;">b</span>
                                <span style="padding:4px 8px; background:#0f172a; border:1px solid #334155; border-radius:4px; color:#475569;">b</span>
                                <span style="color:#f87171; margin-left:8px;">dup 'a'! shrink L</span>
                            </div>
                        </div>
                    </div>
                    <div style="display:flex; gap:8px; margin-top:8px;">
                        <div style="flex:1; background:rgba(74,222,128,0.1); padding:8px; border-radius:6px; border-left:3px solid #4ade80;">
                            <div style="color:#4ade80; font-weight:bold; font-size:0.8rem;">Expand R →</div>
                            <div style="color:#94a3b8; font-size:0.78rem;">Add char to set</div>
                        </div>
                        <div style="flex:1; background:rgba(248,113,113,0.1); padding:8px; border-radius:6px; border-left:3px solid #f87171;">
                            <div style="color:#f87171; font-weight:bold; font-size:0.8rem;">← Shrink L</div>
                            <div style="color:#94a3b8; font-size:0.78rem;">Remove until no dup</div>
                        </div>
                    </div>
                </div>`,
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
                timeExplainer: "<strong>Dutch National Flag:</strong><br>• Single pass through array<br>• Each element processed at most once<br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• In-place swaps, only 3 pointer variables<br>• No extra data structures<br><br><strong>Result:</strong> <code>O(1)</code>",
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
        i += 1`,
                codeDetailed: `def sortColors(nums):
    """
    Sort Colors (Dutch National Flag Algorithm)
    
    STRATEGY: Three Pointers
    - Low: Boundary for 0s (Red)
    - Mid: Scanner
    - High: Boundary for 2s (Blue)
    
    Logic:
    - If nums[mid] == 0: Swap with Low, increment Link & Mid
    - If nums[mid] == 1: Just increment Mid
    - If nums[mid] == 2: Swap with High, decrement High (Don't move Mid!)
    
    Time: O(N), Space: O(1)
    """
    low = 0
    mid = 0
    high = len(nums) - 1
    
    while mid <= high:
        if nums[mid] == 0:
            # Found 0: Move to the 0s zone (front)
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            # Found 1: It's in the correct middle zone, just skip
            mid += 1
        else:
            # Found 2: Move to the 2s zone (back)
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
            # CAUTION: Do NOT increment mid here. 
            # The value swapped from 'high' is unknown (could be 0/1/2).
            # We need to process it in the next iteration.`,
                visual: `
                    <h4 style="color:#c026d3;">🇳🇱 Dutch National Flag: 3-Zone Partition</h4>
                    <div style="display:flex; flex-direction:column; gap:12px; margin:15px 0; max-width:550px;">
                        <div style="background:#1e293b; padding:16px; border-radius:12px;">
                            <div style="display:flex; gap:3px; justify-content:center; font-family:monospace; font-size:0.85rem;">
                                <span style="background:rgba(248,113,113,0.2); padding:6px 10px; border-radius:4px; color:#f87171; border-bottom:2px solid #f87171;">0</span>
                                <span style="background:rgba(248,113,113,0.2); padding:6px 10px; border-radius:4px; color:#f87171; border-bottom:2px solid #f87171;">0</span>
                                <span style="color:#475569; display:flex; align-items:center;">│</span>
                                <span style="background:rgba(255,255,255,0.08); padding:6px 10px; border-radius:4px; color:#fff; border-bottom:2px solid #fff;">1</span>
                                <span style="background:rgba(255,255,255,0.08); padding:6px 10px; border-radius:4px; color:#fff; border-bottom:2px solid #fff;">1</span>
                                <span style="color:#475569; display:flex; align-items:center;">│</span>
                                <span style="background:rgba(94,92,230,0.2); padding:6px 10px; border-radius:4px; color:#a78bfa; border-bottom:2px solid #a78bfa;">?</span>
                                <span style="color:#475569; display:flex; align-items:center;">│</span>
                                <span style="background:rgba(56,189,248,0.2); padding:6px 10px; border-radius:4px; color:#38bdf8; border-bottom:2px solid #38bdf8;">2</span>
                                <span style="background:rgba(56,189,248,0.2); padding:6px 10px; border-radius:4px; color:#38bdf8; border-bottom:2px solid #38bdf8;">2</span>
                            </div>
                            <div style="display:flex; justify-content:center; gap:35px; font-size:0.7rem; margin-top:8px; color:#94a3b8;">
                                <span>↑ <span style="color:#f87171;">Low</span></span>
                                <span>↑ <span style="color:#a78bfa;">Mid</span> (scanner)</span>
                                <span>↑ <span style="color:#38bdf8;">High</span></span>
                            </div>
                        </div>
                        <div style="background:#0f172a; padding:12px; border-radius:8px;">
                            <div style="display:grid; grid-template-columns:1fr; gap:4px; font-size:0.82rem; color:#cbd5e1;">
                                <span><span style="color:#f87171;">arr[mid]=0:</span> swap(low, mid), low++, mid++</span>
                                <span><span style="color:#fff;">arr[mid]=1:</span> mid++ (already in place)</span>
                                <span><span style="color:#38bdf8;">arr[mid]=2:</span> swap(mid, high), high-- <span style="color:#f87171;">(don't mid++!)</span></span>
                            </div>
                        </div>
                    </div>`,
                crux: "<strong>3 Pointers:</strong> Low (0s), Mid (Scanner), High (2s).<br>Swap 0 to Low. Swap 2 to High.",
                strategy: "Use <code>Mid</code> to scan. If 0, swap with Low. If 2, swap with High. If 1, pass.",
                trap: "<strong>The '2' Swap Trap:</strong><br>When you swap with High (value 2), <strong>do NOT increment mid</strong>. The incoming value from High is uncheckd!",
                dryRun: [
                    "Input: [2,0,2,1,1,0]",
                    "1. Mid=2. Swap with High. Arr: [0,0,2,1,1,2]. High--.",
                    "2. Mid=0 (swapped val). Swap with Low. Arr: [0,0,2,1,1,2]. L++, Mid++.",
                    "3. Mid=0. Swap L. Arr: [0,0,2,1,1,2]. L++, M++.",
                    "4. Mid=2. Swap H. Arr: [0,0,1,1,2,2]. H--.",
                    "5. Mid=1. M++."
                ]
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
                timeExplainer: "<strong>Prefix XOR:</strong><br>• Single pass through array<br>• HashMap lookup/insert = <code>O(1)</code> each<br><br><strong>Total:</strong> <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• HashMap stores prefix XOR frequencies<br>• Worst case: all unique prefix XORs = <code>O(N)</code><br><br><strong>Result:</strong> <code>O(N)</code>",
                code: `def solve(A, B):
cnt = 0
xor = 0
map = {0: 1}
for n in A:
    xor ^= n
    if (xor ^ B) in map:
        cnt += map[xor ^ B]
    map[xor] = map.get(xor, 0) + 1
return cnt`,
                codeDetailed: `def solve(A, B):
    """
    Subarrays with XOR K
    
    STRATEGY: Prefix XOR + HashMap
    - Concept similar to "Subarray Sum Equals K"
    - If PrefixXOR[i] ^ PrefixXOR[j] = K, then XOR(j+1...i) = K
    - So, we look for 'Target = CurrentXOR ^ K' in our map
    
    Time: O(N), Space: O(N)
    """
    xr = 0
    count = 0
    freq = {0: 1}  # Base case: XOR 0 seen once (empty prefix)
    
    for x in A:
        xr = xr ^ x
        
        # We need subarray with XOR B
        # Current ^ Target = B  =>  Target = Current ^ B
        target = xr ^ B
        
        if target in freq:
            count += freq[target]
            
        freq[xr] = freq.get(xr, 0) + 1
        
    return count`,
                visual: `
                    <h4 style="color:#c026d3;">⊕ XOR Prefix: Like Prefix Sum but XOR</h4>
                    <div style="display:flex; flex-direction:column; gap:12px; margin:15px 0; max-width:550px;">
                        <div style="background:#1e293b; padding:16px; border-radius:12px;">
                            <div style="font-size:0.82rem; color:#94a3b8; margin-bottom:10px;">arr = [4, 2, 2, 6, 4], K = 6</div>
                            <div style="font-family:monospace; font-size:0.85rem; line-height:2; color:#cbd5e1; text-align:center;">
                                <span style="color:#fbbf24;">PrefixXOR:</span> 0 → 4 → 6 → 4 → 2 → 6<br>
                                <span style="color:#38bdf8;">Need:</span> CurrXOR ⊕ K = PrevXOR<br>
                                <span style="color:#4ade80;">At idx 4:</span> CurrXOR=6, 6⊕6=<span style="color:#fbbf24; font-weight:bold;">0</span> (found in map!) ✅
                            </div>
                        </div>
                        <div style="display:flex; gap:12px; justify-content:center; font-size:0.82rem; flex-wrap:wrap;">
                            <span style="background:rgba(251,191,36,0.1); border:1px solid rgba(251,191,36,0.3); padding:6px 12px; border-radius:6px; color:#fbbf24;">A ⊕ B = K</span>
                            <span style="color:#94a3b8; display:flex; align-items:center;">⟹</span>
                            <span style="background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.3); padding:6px 12px; border-radius:6px; color:#38bdf8;">A ⊕ K = B</span>
                            <span style="color:#94a3b8; display:flex; align-items:center;">→ lookup B in map!</span>
                        </div>
                    </div>`,
                crux: "XOR Difference Property: <code>A ^ B = K</code> ➡ <code>A ^ K = B</code>.<br>Look for <code>CurrXOR ^ K</code> in map.",
                strategy: "Calculate Prefix XOR. Check if <code>XR ^ K</code> exists in map. Add its frequency to count. Add <code>XR</code> to map.",
                trap: "<strong>Base Case:</strong><br>Initialize map with <code>{0: 1}</code>. Why? To handle subarrays starting from index 0 matching K.",
                dryRun: [
                    "Input: A=[4, 2, 2, 6, 4], K=6",
                    "Map={0:1}",
                    "1. x=4. XR=4. Need 4^6=2. Map has 2? No. Map={0:1, 4:1}",
                    "2. x=2. XR=6. Need 6^6=0. Map has 0? Yes(1). Count=1. Map={...6:1}",
                    "3. x=2. XR=4. Need 4^6=2. No. Map={...4:2}",
                    "4. x=6. XR=2. Need 2^6=4. Yes(2). Count=1+2=3. Map={...2:1}",
                    "5. x=4. XR=6. Need 6^6=0. Yes(1). Count=3+1=4."
                ]
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
                timeExplainer: "<strong>Sliding Window:</strong><br>• Right pointer traverses N chars<br>• Left pointer moves at most N times total<br><br><strong>Total:</strong> <code>O(N)</code> amortized",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• HashMap stores at most K+1 distinct chars<br><br><strong>Result:</strong> <code>O(K)</code>",
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
 return res`,
                codeDetailed: `def lengthOfLongestSubstringKDistinct(s, k):
    """
    Longest Substring with At Most K Distinct Characters
    
    STRATEGY: Sliding Window
    - Expand Right: Add character count
    - Invalid State: distinct_count > k
    - Shrink Left: Remove characters until distinct_count <= k
    - Update Max Length
    
    Time: O(N), Space: O(K)
    """
    char_map = {}
    left = 0
    max_len = 0
    
    for right, char in enumerate(s):
        # 1. Expand Window
        char_map[char] = char_map.get(char, 0) + 1
        
        # 2. Shrink if Invalid (Too many distinct chars)
        while len(char_map) > k:
            left_char = s[left]
            char_map[left_char] -= 1
            if char_map[left_char] == 0:
                del char_map[left_char]  # Crucial to reduce map size
            left += 1
            
        # 3. Update Max
        max_len = max(max_len, right - left + 1)
        
    return max_len`,
                visual: `
                    <h4 style="color:#c026d3;">🪟 Sliding Window: K Distinct Characters</h4>
                    <div style="display:flex; flex-direction:column; gap:12px; margin:15px 0; max-width:550px;">
                        <div style="background:#1e293b; padding:16px; border-radius:12px;">
                            <div style="font-size:0.82rem; color:#94a3b8; margin-bottom:10px;">s = "eceba", K = 2</div>
                            <div style="display:flex; flex-direction:column; gap:8px; font-family:monospace; font-size:0.85rem;">
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <span style="color:#4ade80; width:12px;">✓</span>
                                    <span style="background:rgba(74,222,128,0.15); padding:4px; border-radius:4px; border:1px solid rgba(74,222,128,0.3);">
                                        [<span style="color:#4ade80; font-weight:bold;">e c e</span>]
                                    </span>
                                    <span style="color:#94a3b8;">b a</span>
                                    <span style="color:#64748b; font-size:0.75rem;">→ {e:2, c:1} = 2 distinct ✓</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <span style="color:#f87171; width:12px;">✗</span>
                                    <span style="background:rgba(248,113,113,0.15); padding:4px; border-radius:4px; border:1px solid rgba(248,113,113,0.3);">
                                        [<span style="color:#f87171; font-weight:bold;">e c e b</span>]
                                    </span>
                                    <span style="color:#94a3b8;">a</span>
                                    <span style="color:#64748b; font-size:0.75rem;">→ 3 distinct! Shrink left</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <span style="color:#4ade80; width:12px;">✓</span>
                                    <span style="color:#94a3b8;">e</span>
                                    <span style="background:rgba(74,222,128,0.15); padding:4px; border-radius:4px; border:1px solid rgba(74,222,128,0.3);">
                                        [<span style="color:#4ade80; font-weight:bold;">c e b</span>]
                                    </span>
                                    <span style="color:#94a3b8;">a</span>
                                    <span style="color:#64748b; font-size:0.75rem;">→ still 3! keep shrinking...</span>
                                </div>
                            </div>
                        </div>
                        <div style="background:#0f172a; padding:10px 14px; border-radius:8px; font-size:0.82rem; color:#94a3b8; text-align:center;">
                            <strong style="color:#fbbf24;">Pattern:</strong> Expand right always. Shrink left when <code style="color:#f87171;">len(map) > K</code>
                        </div>
                    </div>`,
                crux: "<strong>Standard Sliding Window.</strong><br>Condition: <code>len(Map) > K</code> ➡ Shrink Left.",
                strategy: "Use HashMap to track frequency. If <code>len(map) > k</code>, decrement/remove counts from left.",
                trap: "<strong>Key Delete:</strong><br>When frequency becomes 0, you MUST <code>del map[key]</code>. Calculating distinct chars relies on map size!",
                dryRun: [
                    "Input: s='eceba', k=2",
                    "1. 'e': {e:1}. Max=1",
                    "2. 'c': {e:1, c:1}. Max=2",
                    "3. 'e': {e:2, c:1}. Max=3 ([ece])",
                    "4. 'b': {e:2, c:1, b:1}. Len=3 > K! Shrink L.",
                    "   Remove 'e'. {e:1, c:1, b:1}. Still > K.",
                    "   Remove 'c'. {e:1, b:1}. Valid! Max=3."
                ]
            }
        }
    ]
}
