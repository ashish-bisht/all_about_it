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
            { label: "Sorted Data", desc: "Classic usage (Two Pointers/Binary Search)." },
            { label: "Contiguous Subarrays", desc: "Think <span class='code-snippet'>Sliding Window</span>." },
            { label: "Lookups", desc: "High speed? Think <span class='code-snippet'>Hash Map</span>." }
        ],
        safetyCheck: [
            { label: "Edge Cases", desc: "Always handle <span class='code-snippet'>if not nums</span> first." },
            { label: "Space Trade-off", desc: "Use <span class='code-snippet'>O(N)</span> space to get <span class='code-snippet'>O(1)</span> lookup." }
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
                    "Kadane's: currSum = max(arr[i], currSum + arr[i])",
                    "Divide and Conquer O(n log n)"
                ],
                correct: 2,
                explanation: "Kadane's is GENIUS! Keep running sum. If it goes negative, reset to 0 (or current element). Track global max. O(n) time, O(1) space. Foundation for many DP problems!"
            },
            learn: {
                metrics: { time: "O(N)", space: "O(1)" },
                timeExplainer: "<strong>Time Complexity: O(N)</strong><br>We iterate through the array exactly once (Single Pass). Each element is visited and processed in constant time.",
                spaceExplainer: "<strong>Space Complexity: O(1)</strong><br>We only use two variables (`current_sum` and `global_max`) to track the state, regardless of the input array size.",
                visual: "<span><strong>Visual: The Reset Button</strong><br>Jab tak <code>current_sum</code> positive hai, wo aage kaam aayega. Jaise hi wo negative hua, wo 'bojh' ban gaya. Use turant 0 karke naya safar shuru karo.</span>",
                crux: "Contiguous subarray dhoondna hai. Agar pichla sum negative hai, toh wo current number ki value ko kam hi karega.<br><strong>Strategy:</strong><br>1. <code>current_sum</code> ko track karo.<br>2. DECISION: Kya <code>current + nums[i]</code> better hai ya fresh start <code>nums[i]</code> better hai?<br>3. Har step pe <code>global_max</code> update karo.",
                trap: "<strong>All Negatives:</strong> Agar array <code>[-5, -2, -3]</code> hai aur tumne <code>max_sum = 0</code> se start kiya, toh answer 0 aayega jo galat hai.<br><strong>Fix:</strong> <code>global_max</code> ko hamesha pehle element (<code>nums[0]</code>) se initialize karo.",
                dryRun: [
                    "<strong>Input:</strong> nums = [-2, 1, -3, 4]",
                    "1. n=-2: current_sum=-2. global_max=-2. <br><span class='var-highlight'>current_sum < 0</span> -> Reset logic triggers implicitly next step.",
                    "2. n=1: max(1, -2+1) = 1. current_sum=1. global_max=max(-2, 1) = <span class='var-highlight'>1</span>.",
                    "3. n=-3: max(-3, 1-3) = -2. current_sum=-2. global_max=1.",
                    "4. n=4: max(4, -2+4) = 4. current_sum=4. global_max=4."
                ],
                codeTitle: "Python Solution (Clean)",
                code: `def max_sub_array(nums):
    # Initialize with first element
    max_sum = nums[0]
    current_sum = nums[0]
    
    # Iterate starting from the second element
    for current_num in nums[1:]:
        # If current_sum is negative, reset it (start fresh)
        # Because adding a negative sum to current_num will only make it smaller
        if current_sum < 0:
            current_sum = 0
            
        current_sum += current_num
        
        if current_sum > max_sum:
            max_sum = current_sum
            
    return max_sum`,
                codeDetailed: `def max_sub_array(nums):
    """
    Kadane's Algorithm - Maximum Subarray Sum
    
    CRUX: Track TWO things separately:
    1. current_sum: Current subarray sum (can go negative!)
    2. global_max: Overall best answer found so far (peak value)
    """
    
    # Initialize with first element
    global_max = nums[0]      # Best answer found so far
    current_sum = nums[0]     # Current subarray sum
    
    # Iterate from second element
    for current_num in nums[1:]:
        # DECISION POINT: Fresh start ya continue?
        # If adding current element makes sum worse, start fresh
        current_sum = max(current_num, current_sum + current_num)
        #                 \\_________/  \\_______________________/
        #                Fresh          Continue previous
        #                start          subarray
        
        # Track the peak! (CRUX of Kadane's)
        # This ensures we don't lose the best answer
        # even if current_sum becomes negative later
        global_max = max(global_max, current_sum)
    
    return global_max  # Return peak, not current!`
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
                explanation: "Prefix × Suffix magic! First pass: prefix[i] = product of all left elements. Second pass: suffix from right. Result[i] = prefix[i] × suffix[i]. O(n) time! Microsoft/Amazon favorite."
            },
            learn: {
                metrics: { time: "O(N)", space: "O(1)" },
                timeExplainer: "<strong>Time Analysis:</strong><br>• <code>2 passes</code> through the array<br>• First pass: Build prefix products<br>• Second pass: Multiply with suffix products<br><br><strong>Total:</strong> <code>O(2N)</code> = <code>O(N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Output array not counted as extra space<br>• Only one variable <code>suffix_product</code> used<br><br><strong>Result:</strong> <code>O(1)</code> auxiliary space",
                visual: "<span><strong>Visual: The Sandwich Logic</strong><br>Index <code>i</code> ke liye: (Left se sabka product) × (Right se sabka product). Hum result array mein pehle left side ka maal bharte hain, phir right side se aate waqt subtract kar dete hain.</span>",
                crux: "Division operator banned hai.<br><strong>Strategy:</strong><br>1. <strong>Left Pass:</strong> <code>result[i]</code> mein 0 se <code>i-1</code> tak ka product store karo.<br>2. <strong>Right Pass:</strong> Ek variable <code>suffix_product</code> maintain karo aur piche se aate waqt <code>result[i]</code> ko usse multiply karo.",
                trap: "<strong>Zero Handling:</strong> Agar array mein ek <code>0</code> hai, toh baaki sab index zero ho jayenge except the zero's index. Fix: Prefix/Suffix logic handles this naturally.",
                dryRun: [
                    "<strong>Input:</strong> nums = [1, 2, 3, 4]",
                    "1. <strong>Prefix Pass:</strong> result = [1, 1, 2, 6] <br>(e.g., index 3 stores 1*2*3)",
                    "2. <strong>Suffix Pass:</strong> suffix_product start = 1 <br>- i=3: res[3]*1=6. suffix=4. <br>- i=2: res[2]*4=8. suffix=12. <br>- i=1: res[1]*12=12. suffix=24. <br>- i=0: res[0]*24=24",
                    "<strong>Final:</strong> [24, 12, 8, 6]"
                ],
                codeTitle: "Python Solution (Clean)",
                code: `def product_except_self(nums):
    n = len(nums)
    result = [1] * n
    
    # Pass 1: Left to Right
    left_product = 1
    for index, num in enumerate(nums):
        result[index] = left_product
        left_product *= num
        
    # Pass 2: Right to Left
    right_product = 1
    for index in range(n - 1, -1, -1):
        result[index] *= right_product
        right_product *= nums[index]
        
    return result`,
                codeDetailed: `def product_except_self(nums):
    """
    Product of Array Except Self (Without Division)
    
    CRUX: Break the problem into LEFT and RIGHT products
    - result[index] = (product of all left elements) * (product of all right elements)
    """
    
    n = len(nums)
    result = [1] * n
    
    # PASS 1: Left to Right (Store Left Products)
    left_product = 1
    for index, num in enumerate(nums):
        result[index] = left_product      # Direct assignment (clearer!)
        left_product *= num               # Update for next iteration
    
    # PASS 2: Right to Left (Multiply with Right Products)
    right_product = 1
    for index in range(n - 1, -1, -1):
        result[index] *= right_product    # Multiply karna padega (combining left * right)
        right_product *= nums[index]
    
    return result`
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
                explanation: "Two pointers is ELITE! Start from both ends with left_max, right_max. Water at position = min(left_max, right_max) - height. Move smaller pointer inward. O(n) time, O(1) space!"
            },
            learn: {
                metrics: { time: "O(N)", space: "O(1)" },
                timeExplainer: "<strong>Time: O(N)</strong><br>We process each element exactly once using two pointers meeting in the middle.",
                spaceExplainer: "<strong>Space: O(1)</strong><br>Only constant extra space used for pointers and max height variables.",
                visual: `<span><strong>Visual: The Water Level</strong><br>Water at position <code>i</code> = <code>min(left_max, right_max) - height[i]</code>.<br>
<pre style="background:none; border:none; padding:10px; font-size:0.8rem; line-height:1.2;">
   LEFT_MAX        RIGHT_MAX
      |               |
      █               █
      █       ?       █
      █   █   i   █   █
  ════════════════════════
</pre>
Smaller wall decides the water level! Kyunki pani MIN height tak hi bharega.</span>`,
                crux: "Water level choti height se decide hota hai.<br><strong>Strategy:</strong><br>Process the <strong>SMALLER</strong> side (water is guaranteed there!).<br>1. Agar <code>height[left] < height[right]</code>, toh left side ka water confirm hai (kyunki right mein badi wall hai).<br>2. Same logic for right side.",
                trap: "<strong>Wall vs Valley:</strong><br>Agar current height <code>> max_height</code>, toh wo <strong>Wall</strong> hai (pani nahi rukega, max update karo).<br>Agar choti hai, toh wo <strong>Valley</strong> hai (pani calculate karo).",
                dryRun: [
                    "<strong>Input:</strong> height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
                    "1. L=0, R=11. 0 < 1. Process Left. L_max=0. New Wall. Move L.",
                    "2. L=1. 1 < 1. Process Left. L_max=1. New Wall. Move L.",
                    "3. L=2. 0 < 1. Process Left. L_max=1. Valley! Water += 1-0 = 1. Move L.",
                    "4. ... (Continuing logic where smaller side moves) ...",
                    "<strong>Final Water:</strong> 6 units"
                ],
                codeTitle: "Python Solution (Clean)",
                code: `def trapping_rain_water(height):
    if not height: return 0
    
    left_pointer = 0
    right_pointer = len(height) - 1

    left_max_height = height[left_pointer]
    right_max_height = height[right_pointer]

    trapped_water = 0

    while left_pointer < right_pointer:
        # Process the SMALLER side
        if height[left_pointer] < height[right_pointer]:
            if height[left_pointer] > left_max_height:
                left_max_height = height[left_pointer]
            else:
                trapped_water += min(left_max_height, right_max_height) - height[left_pointer]
            left_pointer += 1
        else:
            if height[right_pointer] > right_max_height:
                right_max_height = height[right_pointer]
            else:
                trapped_water += min(left_max_height, right_max_height) - height[right_pointer]
            right_pointer -= 1

    return trapped_water`,
                codeDetailed: `def trapping_rain_water(height):
    """
    Trapping Rain Water - Two Pointers Approach
    
    ═══════════════════════════════════════════════════════════════
    CRUX: Water at position i = min(left_max, right_max) - height[i]
    ═══════════════════════════════════════════════════════════════
    
    STRATEGY: Process the SMALLER side (water is guaranteed there!)
    
    Why? Kyunki pani MIN height tak hi bharega:
         LEFT_MAX        RIGHT_MAX
            |               |
            █               █
            █       ?       █
            █   █   i   █   █
        ════════════════════════
        
        Water level = min(LEFT_MAX, RIGHT_MAX)
        Smaller wall decides the water level!
    
    Time: O(n), Space: O(1)
    """
    
    # ════════════════════════════════════════════════════════════
    # STEP 1: Initialize Two Pointers
    # ════════════════════════════════════════════════════════════
    left_pointer = 0                    # Start from left end
    right_pointer = len(height) - 1    # Start from right end
    
    # Visual:
    # height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
    #           ↑                                ↑
    #      left_pointer                   right_pointer
    
    
    # ════════════════════════════════════════════════════════════
    # STEP 2: Track Maximum Heights from Both Sides
    # ════════════════════════════════════════════════════════════
    left_max_height = height[left_pointer]    # Tallest wall on left so far
    right_max_height = height[right_pointer]  # Tallest wall on right so far
    
    # Initially:
    # left_max_height = 0 (height at index 0)
    # right_max_height = 1 (height at index 11)
    
    
    # ════════════════════════════════════════════════════════════
    # STEP 3: Initialize Water Counter
    # ════════════════════════════════════════════════════════════
    trapped_water = 0
    
    
    # ════════════════════════════════════════════════════════════
    # STEP 4: Process Elements Until Pointers Meet
    # ════════════════════════════════════════════════════════════
    while left_pointer < right_pointer:
        
        # ────────────────────────────────────────────────────────
        # DECISION: Which side to process?
        # ────────────────────────────────────────────────────────
        # Rule: Process the SMALLER side
        # Why? Because water level is decided by smaller wall
        
        if height[left_pointer] < height[right_pointer]:
            # ┌────────────────────────────────────────────────┐
            # │ LEFT SIDE IS SMALLER - Process Left!          │
            # └────────────────────────────────────────────────┘
            
            # Visual:
            #     █                   █
            #     █       ?           █
            #     █   █   L   █       █
            # ════════════════════════════
            #         ↑               ↑
            #    left (small)    right (big)
            #
            # LEFT chhota hai, so RIGHT side pe definitely
            # koi bada wall hai. LEFT ka water CONFIRM hai!
            
            # ┌────────────────────────────────────────────────┐
            # │ Check: Is current bar a NEW WALL or VALLEY?   │
            # └────────────────────────────────────────────────┘
            if height[left_pointer] > left_max_height:
                # Current bar is TALLER - it's a NEW WALL!
                # Update the left boundary
                left_max_height = height[left_pointer]
                
                # Visual:
                # Old max:  █
                # New max:  █ █  ← Update!
                
                # No water trapped here (it's a wall, not valley)
            
            else:
                # Current bar is SHORTER - it's a VALLEY!
                # Water will be trapped here
                
                # ┌────────────────────────────────────────────┐
                # │ WATER FORMULA:                             │
                # │ water = min(left_max, right_max) - height  │
                # └────────────────────────────────────────────┘
                
                # Visual:
                #     LEFT_MAX                RIGHT_MAX
                #        |                       |
                #        █                       █
                #        █ ░░░                   █
                #        █ ░i░   ←── water!      █
                #        █_█_____________________█
                #
                # Water level = min(left_max, right_max)
                # Water at i = water_level - current_height
                
                trapped_water += min(left_max_height, right_max_height) - height[left_pointer]
                
                # Example:
                # left_max = 2, right_max = 3, height[i] = 0
                # water = min(2,3) - 0 = 2 - 0 = 2 units ✅
            
            # Move left pointer forward
            left_pointer += 1
            
        else:
            # ┌────────────────────────────────────────────────┐
            # │ RIGHT SIDE IS SMALLER/EQUAL - Process Right!  │
            # └────────────────────────────────────────────────┘
            
            # Visual:
            #         █                   █
            #         █       ?           █
            #         █   █       █   R   █
            # ════════════════════════════════
            #         ↑                   ↑
            #    left (big)          right (small)
            #
            # RIGHT chhota hai, so LEFT side pe definitely
            # koi bada wall hai. RIGHT ka water CONFIRM hai!
            
            # ┌────────────────────────────────────────────────┐
            # │ Check: Is current bar a NEW WALL or VALLEY?   │
            # └────────────────────────────────────────────────┘
            if height[right_pointer] > right_max_height:
                # Current bar is TALLER - it's a NEW WALL!
                right_max_height = height[right_pointer]
                
                # No water trapped (it's a wall)
            
            else:
                # Current bar is SHORTER - it's a VALLEY!
                # Water will be trapped here
                
                # Visual:
                #  LEFT_MAX                RIGHT_MAX
                #     |                       |
                #     █                       █
                #     █                   ░░░ █
                #     █       ←── water! ░i░ █
                #     █_______________________█
                
                trapped_water += min(left_max_height, right_max_height) - height[right_pointer]
            
            # Move right pointer backward
            right_pointer -= 1
    
    # ════════════════════════════════════════════════════════════
    # STEP 5: Return Total Trapped Water
    # ════════════════════════════════════════════════════════════
    return trapped_water

print(trapping_rain_water([0,1,0,2,1,0,1,3,2,1,2,1]))`
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
                explanation: "SORT FIRST by start time! Then iterate: if current.start <= last.end, they overlap - merge. Else, add current to result. O(n log n) for sort, O(n) for merge. Standard interval pattern!"
            },
            learn: {
                metrics: { time: "O(N log N)", space: "O(N)" },
                timeExplainer: "<strong>Time Breakdown:</strong><br>• Sorting: <code>O(N log N)</code><br>• Single pass to merge: <code>O(N)</code><br><br><strong>Total:</strong> <code>O(N log N)</code>",
                spaceExplainer: "<strong>Space Analysis:</strong><br>• Result array to store merged intervals<br>• Worst case: no merges = <code>O(N)</code>",
                visual: "<span><strong>Visual: The Number Line</strong><br>Intervals ko unke start_time se sort karo. Check overlap with previous.</span>",
                crux: "Bina sorting ke overlap check karna impossible hai.<br><strong>Strategy:</strong><br>1. Sort by start.<br>2. Check if <code>current_start <= last_end</code>.<br>3. Merge by taking <code>max(last_end, current_end)</code>.",
                trap: "<strong>The Subset Interval:</strong> [1, 10] and [2, 5]. End should stay 10. Always use max().",
                dryRun: [
                    "<strong>Input:</strong> [[1, 3], [2, 6], [8, 10]]",
                    "1. Merged = [[1, 3]]",
                    "2. [2, 6]: 2 <= 3. Overlap! End = max(3, 6) = 6. Merged=[[1, 6]]",
                    "3. [8, 10]: 8 > 6. No overlap. Append."
                ],
                codeTitle: "Python Solution",
                code: `def merge_intervals(intervals):
if not intervals: return []
intervals.sort(key=lambda x: x[0])
merged = [intervals[0]]

for i in range(1, len(intervals)):
    start, end = intervals[i]
    last_end = merged[-1][1]
    
    if start <= last_end:
        merged[-1][1] = max(last_end, end)
    else:
        merged.append([start, end])
return merged`
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
                correct: 1,
                explanation: "HashMap + Sliding Window! Store char → index. When duplicate found, jump LEFT pointer to max(left, map[char] + 1). Track max length. This is THE 'Hello World' of sliding window! O(n)."
            },
            learn: {
                metrics: { time: "O(N)", space: "O(N)" },
                timeExplainer: "<strong>Time: O(N)</strong><br>We traverse the string once. Each character is added to the Set once and removed at most once (2N ops = O(N)).",
                spaceExplainer: "<strong>Space: O(N)</strong><br>In worst case (all unique), the Set stores all N characters.",
                visual: `<span><strong>Visual: Elastic Window</strong><br>Expand Right. If duplicate found, shrink Left until unique.<br>
<pre style="background:none; border:none; padding:10px; font-size:0.8rem; line-height:1.2;">
 "ppwkew"
   ^  ^
   L  R
 Window: [w, k, e] -> Valid
</pre>
</span>`,
                crux: "No Duplicates allowed.<br><strong>Formula:</strong> <code>max_len = max(max_len, R - L + 1)</code>",
                strategy: "Use a <strong>Set</strong>. If <code>s[right]</code> exists in Set, <code>remove(s[left])</code> and <code>left++</code> until valid.",
                trap: "<strong>While Loop:</strong> Don't use `if`. Use `while` to remove characters until the duplicate is gone.",
                dryRun: [
                    "<strong>Input:</strong> 'abcabcbb'",
                    "1. R=0('a'): Set={'a'}, Len=1",
                    "2. R=1('b'): Set={'a','b'}, Len=2",
                    "3. R=2('c'): Set={'a','b','c'}, Len=3",
                    "4. R=3('a'): Duplicate 'a'! Remove s[L]('a'), L=1. Set={'b','c'}. Add 'a'. Set={'b','c','a'}. Len=3"
                ],
                codeTitle: "Python Solution (Clean)",
                code: `def length_of_longest_substring(s):
    char_set = set()
    left = 0
    max_length = 0

    for right in range(len(s)):
        # Shrink window if duplicate found
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1

        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)

    return max_length`,
                codeDetailed: `def length_of_longest_substring(s):
    """
    Longest Substring Without Repeating Characters
    
    ═══════════════════════════════════════════════════════════════
    CRUX: Sliding Window + HashSet
    ═══════════════════════════════════════════════════════════════
    
    STRATEGY: Expand Right, Shrink Left if Invalid
    1. Maintain a Window [left, right]
    2. Use a SET to track characters in the current window
    3. If new char is in Set -> Shrink Left until it's gone
    4. Update max_length at every valid step
    
    Time: O(N), Space: O(N)
    """
    char_set = set()
    left = 0
    max_length = 0

    # ════════════════════════════════════════════════════════════
    # STEP 1: Expand Window (Move Right Pointer)
    # ════════════════════════════════════════════════════════════
    for right in range(len(s)):
        
        # ════════════════════════════════════════════════════════════
        # STEP 2: Handle Duplicates (Shrink Phase)
        # ════════════════════════════════════════════════════════════
        # WARNING: Use 'while', not 'if'. We might need to remove 
        # multiple characters to clear the duplicate.
        # Example: "abcc", right at second 'c', we remove 'a', 'b', then 'c'.
        
        while s[right] in char_set:
            # Remove from logic (Set)
            char_set.remove(s[left])
            # Remove from window (Pointer)
            left += 1

            # Visual:
            # [a, b, c, a] -> Duplicate 'a'!
            #  ^        ^
            #  L        R
            # Remove 'a', Move L -> [b, c, a] (Valid now)

        # ════════════════════════════════════════════════════════════
        # STEP 3: Add New Character & Update Max
        # ════════════════════════════════════════════════════════════
        char_set.add(s[right])  # Add current char to tracking
        
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
            id: "max-product-subarray",
            title: "Max Product Subarray",
            leetcodeUrl: "https://leetcode.com/problems/maximum-product-subarray/",
            difficulty: "Must Do",
            priority: "🔴",
            tags: ["DP"],
            quiz: {
                description: "Find max product. Negatives allowed. Trick?",
                options: ["Kadane's normally", "Track Min and Max product", "Prefix products", "Two pointers"],
                correct: 1,
                explanation: "Track both MAX and MIN! A negative number can flip a large negative Min into a huge positive Max. cur_max = max(n, n*prev_max, n*prev_min)."
            },
            learn: {
                metrics: { time: "O(N)", space: "O(1)" },
                timeExplainer: "<strong>Time: O(N)</strong><br>Single pass solution. We calculate max/min for each element in constant time.",
                spaceExplainer: "<strong>Space: O(1)</strong><br>We only store 3 variables: <code>max_prod</code>, <code>min_prod</code>, and <code>result</code>.",
                visual: `<span><strong>Visual: The Flip</strong><br>Negative number se positive max chota min ban jata hai, aur negative min bada max ban jata hai!<br>
<pre style="background:none; border:none; padding:10px; font-size:0.8rem; line-height:1.2;">
   Input: [2, 3, -2, 4]
   
   Idx 1 (3): Max=6, Min=3
   Idx 2 (-2):
      Max candidate -> -2 * 6 = -12 (Too small!)
      Min candidate -> -2 * 6 = -12 (Saved for later!)
      Max becomes -2 (start fresh or flip min?)
</pre>
</span>`,
                crux: "Negative numbers FLIP signs.<br>A huge negative Min * Negative number = Huge Positive Max!",
                strategy: "Track BOTH `max_prod` and `min_prod`. Swap them if current number is negative.",
                trap: "<strong>Zeros:</strong> If we see a 0, the subarray breaks. Reset max/min to the next number (effectively handled by logic).",
                dryRun: [
                    "<strong>Input:</strong> [2, 3, -2, 4]",
                    "1. i=0: res=2, max=2, min=2",
                    "2. i=1(3): max=max(3, 6, 6)=6, min=min(3, 6, 6)=3. res=6",
                    "3. i=2(-2): max=max(-2, -12, -6)=-2. min=min(-2, -12, -6)=-12. res=6",
                    "4. i=3(4): max=max(4, -8, -48)=4. min=min(4, -8, -48)=-48. res=6"
                ],
                codeTitle: "Python Solution (Clean)",
                code: `def maxProduct(nums):
    if not nums: return 0
    
    max_prod = nums[0]
    min_prod = nums[0]
    result = nums[0]
    
    for i in range(1, len(nums)):
        temp_max = max_prod
        
        # KEY: Max can come from (n), (n*max), or (n*min)
        max_prod = max(nums[i], nums[i] * max_prod, nums[i] * min_prod)
        min_prod = min(nums[i], nums[i] * temp_max, nums[i] * min_prod)
        
        result = max(result, max_prod)
    
    return result`,
                codeDetailed: `def maxProduct(nums):
    """
    Maximum Product Subarray
    
    ═══════════════════════════════════════════════════════════════
    CRUX: Track Min & Max because Negatives Swap Signs
    ═══════════════════════════════════════════════════════════════
    
    STRATEGY: 
    When we multiply by a negative:
    - Big Positive becomes Small Negative (Max -> Min)
    - Big Negative becomes Big Positive (Min -> Max)
    
    So we must track BOTH candidates at every step.
    
    Time: O(N), Space: O(1)
    """
    if not nums:
        return 0
    
    # ════════════════════════════════════════════════════════════
    # STEP 1: Initialize State
    # ════════════════════════════════════════════════════════════
    max_prod = nums[0]  # Tracks max positive product ending here
    min_prod = nums[0]  # Tracks min negative product ending here
    result = nums[0]    # Global maximum found so far
    
    # ════════════════════════════════════════════════════════════
    # STEP 2: Iterate Through Array
    # ════════════════════════════════════════════════════════════
    for i in range(1, len(nums)):
        
        # Store current max before updating (since we need it for min calculation)
        temp_max = max_prod
        
        # ════════════════════════════════════════════════════════════
        # STEP 3: Update Max & Min
        # ════════════════════════════════════════════════════════════
        # Current max can be:
        # 1. Current number itself (start new subarray, e.g., after a 0)
        # 2. Current number * previous max (positive * positive)
        # 3. Current number * previous min (negative * negative = positive!)
        
        max_prod = max(nums[i], nums[i] * max_prod, nums[i] * min_prod)
        
        # Current min can be:
        # 1. Current number itself
        # 2. Current number * previous min (positive * negative)
        # 3. Current number * previous max (negative * positive)
        
        min_prod = min(nums[i], nums[i] * temp_max, nums[i] * min_prod)
        
        # Example trace at index 2 (val = -2):
        # Prev Max=6, Prev Min=3
        # New Max = max(-2, -12, -6) = -2
        # New Min = min(-2, -12, -6) = -12  <-- IMPORTANT! 
        # The -12 is saved. If next num is -4, result became 48!
        
        result = max(result, max_prod)
    
    return result`
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
