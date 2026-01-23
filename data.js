const prepData = {
    arrays: {
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
                    metrics: { time: "O(N²)", space: "O(1) or O(N)" },
                    timeExplainer: "<strong>Time Breakdown:</strong><br>• Sorting: <code>O(N log N)</code><br>• Main loop: <code>N</code> iterations<br>• Each iteration: Two-pointer scan = <code>O(N)</code><br><br><strong>Total:</strong> <code>O(N log N + N²)</code> ≈ <code>O(N²)</code>",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• In Python, sorting might use <code>O(N)</code> auxiliary space<br>• If we ignore sorting and count only variables: <code>O(1)</code><br>• Result array not counted in space complexity",
                    visual: "<span><strong>Visual: The Anchor & Squeeze</strong><br>Array ko sort karo. Ek <code>anchor</code> fix karo, aur baaki do numbers ke liye <code>left_pointer</code> aur <code>right_pointer</code> ko tab tak squeeze karo jab tak 0 na mil jaye.</span>",
                    crux: "Triple loop ($O(N^3)$) se bachne ke liye **Sort** zaroori hai. Sorting se duplicates handle karna aur Two-Pointer lagana easy ho jata hai.<br><strong>Strategy:</strong><br>1. <code>anchor_value</code> ko fix karo loop se.<br>2. Agar <code>anchor_value</code> pichle element jaisa hai, toh skip (Duplicate protection).<br>3. Remaining array mein <code>target = -anchor_value</code> dhoondo.",
                    trap: "<strong>Internal Duplicates:</strong> Anchor skip karne ke baad bhi <code>left_pointer</code> same value pe land kar sakta hai.<br><strong>Fix:</strong> Jab triplet mil jaye, <code>left_pointer</code> ko tab tak badhao jab tak naya unique number na mil jaye.",
                    dryRun: [
                        "<strong>Input:</strong> nums = [-1, 0, 1, 2, -1, -4]",
                        "<strong>Sorted:</strong> [-4, -1, -1, 0, 1, 2]",
                        "1. i=0 (val=-4). Target = 4. <br>left_pointer=-1, right_pointer=2. Sum=1. <span class='var-highlight'>Small!</span> Move left_pointer.",
                        "2. i=1 (val=-1). Target = 1. <br>left_pointer=-1, right_pointer=2. Sum=1. <span class='var-highlight'>Match!</span> Triple: [-1, -1, 2].",
                        "3. <span class='var-highlight'>Duplicate Check:</span> left_pointer index 2 pe bhi -1 hai. Skip to index 3."
                    ],
                    codeTitle: "Python Solution (PEP 8 Style)",
                    code: `def three_sum(nums):
    triplets = []
    nums.sort()

    for i, anchor_value in enumerate(nums):
        # Skip duplicate anchors
        if i > 0 and anchor_value == nums[i - 1]:
            continue

        left_pointer = i + 1
        right_pointer = len(nums) - 1

        while left_pointer < right_pointer:
            current_sum = anchor_value + nums[left_pointer] + nums[right_pointer]
            
            if current_sum > 0:
                right_pointer -= 1
            elif current_sum < 0:
                left_pointer += 1
            else:
                triplets.append([anchor_value, nums[left_pointer], nums[right_pointer]])
                left_pointer += 1
                
                # Skip duplicate values for the left pointer
                while nums[left_pointer] == nums[left_pointer - 1] and left_pointer < right_pointer:
                    left_pointer += 1
                    
    return triplets`
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
                    timeExplainer: "Single pass through the array.",
                    spaceExplainer: "Only two variables stored: current_sum and max_sum.",
                    visual: "<span><strong>Visual: The Reset Button</strong><br>Jab tak <code>current_sum</code> positive hai, wo aage kaam aayega. Jaise hi wo negative hua, wo 'bojh' ban gaya. Use turant 0 karke naya safar shuru karo.</span>",
                    crux: "Contiguous subarray dhoondna hai. Agar pichla sum negative hai, toh wo current number ki value ko kam hi karega.<br><strong>Strategy:</strong><br>1. <code>current_sum</code> ko track karo.<br>2. Agar <code>current_sum < 0</code>, toh use <code>0</code> kar do (start fresh).<br>3. Har step pe <code>max_sum</code> update karo.",
                    trap: "<strong>All Negatives:</strong> Agar array <code>[-5, -2, -3]</code> hai aur tumne <code>max_sum = 0</code> se start kiya, toh answer 0 aayega jo galat hai.<br><strong>Fix:</strong> <code>max_sum</code> ko hamesha pehle element (<code>nums[0]</code>) se initialize karo.",
                    dryRun: [
                        "<strong>Input:</strong> nums = [-2, 1, -3, 4]",
                        "1. n=-2: current_sum=-2. max_sum=-2. <br><span class='var-highlight'>current_sum < 0</span> -> current_sum = 0.",
                        "2. n=1: current_sum=1. max_sum=max(-2, 1) = <span class='var-highlight'>1</span>.",
                        "3. n=-3: current_sum=-2. max_sum=1. <br><span class='var-highlight'>current_sum < 0</span> -> current_sum = 0.",
                        "4. n=4: current_sum=4. max_sum=max(1, 4) = <span class='var-highlight'>4</span>."
                    ],
                    codeTitle: "Python Solution",
                    code: `def max_sub_array(nums):
    # Initialize with first element to handle all-negative arrays
    max_sum = nums[0]
    current_sum = 0
    
    for n in nums:
        # If running sum is a liability, drop it
        if current_sum < 0:
            current_sum = 0
            
        current_sum += n
        
        if current_sum > max_sum:
            max_sum = current_sum
            
    return max_sum`
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
                    codeTitle: "Python Solution",
                    code: `def product_except_self(nums):
    n = len(nums)
    result = [1] * n
    
    # Prefix pass
    prefix_product = 1
    for i in range(n):
        result[i] = prefix_product
        prefix_product *= nums[i]
        
    # Suffix pass
    suffix_product = 1
    for i in range(n - 1, -1, -1):
        result[i] *= suffix_product
        suffix_product *= nums[i]
        
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
                    timeExplainer: "<strong>Time Analysis:</strong><br>• Single pass with two pointers<br>• Each element visited exactly once<br><br><strong>Total:</strong> <code>O(N)</code>",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• Only 4 variables: <code>left, right, left_max, right_max</code><br>• No extra arrays needed<br><br><strong>Result:</strong> <code>O(1)</code>",
                    visual: "<span><strong>Visual: The Bottle Neck</strong><br>Kisi bhi bar pe kitna paani rukega? <br><code>water = min(max_left, max_right) - current_height</code>. <br>Hum dono sides se scan karte hain aur jo side 'choti' (bottleneck) hai, wahan ka paani calculate karte hain.</span>",
                    crux: "Paani tabhi rukega jab dono taraf deewar (boundary) ho.<br><strong>Strategy:</strong><br>1. Pointers ends pe rakho.<br>2. <code>left_max</code> aur <code>right_max</code> track karo.<br>3. Move smaller side.",
                    trap: "<strong>Negative Water:</strong> Ensure <code>max_boundary >= current_height</code> before subtracting.",
                    dryRun: [
                        "<strong>Input:</strong> height = [0, 1, 0, 2, 1, 0, 1, 3]",
                        "1. L=0(H=0), R=7(H=3). Left smaller. left_max=0. Water+=0. Move L.",
                        "2. L=1(H=1). Left smaller. left_max=1. Water+=0. Move L.",
                        "3. L=2(H=0). Left smaller. Water += 1-0 = 1 unit. Move L."
                    ],
                    codeTitle: "Python Solution",
                    code: `def trap(height):
    if not height: return 0
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
    return water`
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
                    metrics: { time: "O(N)", space: "O(min(m,n))" },
                    timeExplainer: "<strong>Time Analysis:</strong><br>• Single pass with sliding window<br>• Each character visited at most twice<br><br><strong>Total:</strong> <code>O(N)</code>",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• HashMap stores char → index<br>• <code>m</code> = charset size, <code>n</code> = string length<br><br><strong>Result:</strong> <code>O(min(m, n))</code>",
                    visual: "<span><strong>Visual: Elastic Window</strong><br>Duplicate aate hi left pointer ko 'jump' karao to exclude the previous occurrence.</span>",
                    crux: "Uniqueness maintain karni hai.<br><strong>Strategy:</strong><br>1. <code>last_seen</code> map.<br>2. If char in map, <code>left = max(left, map[char] + 1)</code>.<br>3. Update map[char] = current_index.",
                    trap: "<strong>Backward Jump:</strong> Never move left pointer backwards. Always use max().",
                    dryRun: [
                        "<strong>Input:</strong> 'abba'",
                        "1. r=0(a): map={a:0}. len=1",
                        "2. r=1(b): map={a:0, b:1}. len=2",
                        "3. r=2(b): Dup! left=max(0, 1+1)=2. map={b:2}. len=2",
                        "4. r=3(a): Dup! left=max(2, 0+1)=2. (No jump backward)"
                    ],
                    codeTitle: "Python Solution",
                    code: `def length_of_longest_substring(s):
    last_seen = {}
    left = 0
    max_len = 0
    
    for right, char in enumerate(s):
        if char in last_seen:
            left = max(left, last_seen[char] + 1)
        last_seen[char] = right
        max_len = max(max_len, right - left + 1)
        
    return max_len`
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
                    code: `def maxProduct(nums):
    res = nums[0]
    curMin, curMax = 1, 1
    for n in nums:
        tmp = curMax * n
        curMax = max(n * curMax, n * curMin, n)
        curMin = min(tmp, n * curMin, n)
        res = max(res, curMax)
    return res`
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
    },

    binary_search: {
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
    },

    linked_list: {
        id: "linked_list",
        title: "Linked List Mastery",
        description: "Principal Engineer DSA • Day 4",
        color: "#059669",
        icon: "fas fa-network-wired",
        mentalModel: {
            whenToApply: [
                { label: "Wiring not Calculating", desc: "Don't think numbers. Think <strong>wires</strong>. Always draw pointers." }
            ],
            safetyCheck: [
                { label: "Sentinel Nodes", desc: "Use <code>dummy -> head</code>. It solves 90% of edge cases like inserting at head." },
                { label: "Runner Tech", desc: "Use Fast/Slow pointers for cycles and midpoints." }
            ]
        },
        questions: [
            {
                id: "lru-cache",
                title: "LRU Cache",
                leetcodeUrl: "https://leetcode.com/problems/lru-cache/",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["Design #1"],
                quiz: {
                    description: "Implement get() and put() in O(1). Which data structures?",
                    options: [
                        "HashMap only",
                        "Doubly Linked List + HashMap (key → node)",
                        "Array + HashMap",
                        "Queue + HashMap"
                    ],
                    correct: 1,
                    explanation: "Doubly LL + HashMap! HashMap for O(1) lookup. DLL for O(1) removal/insertion at head/tail. Get: move to head. Put: if full, remove tail. Add to head. #1 design question!"
                },
                learn: {
                    metrics: { time: "O(1)", space: "O(N)" },
                    timeExplainer: "<strong>Time Analysis:</strong><br>• <code>get()</code>: HashMap lookup = <code>O(1)</code><br>• <code>put()</code>: Map + DLL operations = <code>O(1)</code><br><br><strong>All operations:</strong> <code>O(1)</code> average",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• HashMap: <code>O(N)</code> for N key-value pairs<br>• Doubly Linked List: <code>O(N)</code> nodes<br><br><strong>Total:</strong> <code>O(N)</code>",
                    visual: "<span><strong>Visual: The Hybrid Engine</strong><br>HashMap stores <code>{Key -> Node}</code> for speed.<br>DLL stores <code>Order</code> (Head=Recent, Tail=Old).</span>",
                    crux: "<strong>The Wire-Splicing Strategy:</strong><br>Helpers: <code>_remove(node)</code> (Unplug) and <code>_add(node)</code> (Plug at front).<br>Get: Remove -> Add.<br>Put: Remove Old -> Add New. If Full: Remove Tail.",
                    trap: "<strong>Phantom Pointer:</strong> When evicting tail, you MUST delete it from the HashMap too! Often forgotten.",
                    dryRun: [
                        "1. Put(1, 1): Map={1:N1}, List=[1].",
                        "2. Put(2, 2): Map={1:N1, 2:N2}, List=[2, 1].",
                        "3. Get(1): Remove 1, Add 1. List=[1, 2].",
                        "4. Put(3, 3) Cap=2: Evict Tail(2). Map={1:N1, 3:N3}. List=[3, 1]."
                    ],
                    codeTitle: "Python Solution",
                    code: `class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {} 
        self.head, self.tail = Node(0, 0), Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        prev, nxt = node.prev, node.next
        prev.next, nxt.prev = nxt, prev

    def _add(self, node):
        node.prev, node.next = self.head, self.head.next
        self.head.next.prev = node
        self.head.next = node

    def get(self, key):
        if key in self.cache:
            self._remove(self.cache[key])
            self._add(self.cache[key])
            return self.cache[key].val
        return -1

    def put(self, key, value):
        if key in self.cache:
            self._remove(self.cache[key])
        new_node = Node(key, value)
        self._add(new_node)
        self.cache[key] = new_node
        if len(self.cache) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]`
                }
            },
            {
                id: "reverse-linked-list-k-group",
                title: "Reverse in K Groups",
                leetcodeUrl: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["Pointer Mastery"],
                quiz: {
                    description: "Reverse every K nodes. What's the challenge?",
                    options: [
                        "Standard reversal works",
                        "Need to track: prev_group_end, curr_group, next_group_start",
                        "Use recursion only",
                        "Convert to array"
                    ],
                    correct: 1,
                    explanation: "Pointer management! For each group: connect prev_group.next to new head. Connect new tail to next_group. Edge cases: < K nodes at end (don't reverse)."
                },
                learn: {
                    metrics: { time: "O(N)", space: "O(1)" },
                    timeExplainer: "<strong>Time Analysis:</strong><br>• Visit each node once<br>• Reversal within groups is O(K)<br><br><strong>Total:</strong> <code>O(N)</code>",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• Only pointers for manipulation<br>• No extra data structures<br><br><strong>Result:</strong> <code>O(1)</code>",
                    visual: "<span><strong>Visual: The Surgery</strong><br>1. Identify K segment.<br>2. Snip wires.<br>3. Flip.<br>4. Reconnect Anchors.</span>",
                    crux: "<strong>Don't get lost.</strong><br>Use `get_kth` to find group end.<br>After reverse, your `groupPrev` is broken. Update it to the NEW tail.",
                    trap: "<strong>Losing the Anchor:</strong> `groupPrev` must point to the new tail after each reversal to be ready for the next group.",
                    dryRun: [
                        "Input: 1->2->3->4->5, K=2",
                        "1. Group [1,2]. Rev -> 2->1. Link dummy->2, 1->3. Prev=1.",
                        "2. Group [3,4]. Rev -> 4->3. Link 1->4, 3->5. Prev=3.",
                        "3. Group [5]. Len < K. Stop."
                    ],
                    codeTitle: "Python Solution",
                    code: `def reverseKGroup(head, k):
    dummy = ListNode(0, head)
    groupPrev = dummy
    
    while True:
        kth = get_kth(groupPrev, k)
        if not kth: break
        groupNext = kth.next
        
        # Reverse inner
        prev, curr = kth.next, groupPrev.next
        while curr != groupNext:
            tmp = curr.next
            curr.next = prev
            prev = curr
            curr = tmp
            
        # Re-wire
        tmp = groupPrev.next # Old start (new tail)
        groupPrev.next = prev # New head
        groupPrev = tmp # Move anchor
        
    return dummy.next`
                }
            },
            {
                id: "linked-list-cycle-ii",
                title: "Detect Loop Start",
                leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle-ii/",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["Floyd's Algo"],
                quiz: {
                    description: "Find WHERE the cycle starts. What's the math?",
                    options: [
                        "HashMap to find first revisited node",
                        "Slow/Fast meet, then reset slow to head, move both by 1",
                        "Mark nodes",
                        "Count nodes in cycle"
                    ],
                    correct: 1,
                    explanation: "Floyd's Math! After slow/fast meet, reset slow to head. Move both by 1 step. They meet AT cycle start! Proven by math."
                },
                learn: {
                    metrics: { time: "O(N)", space: "O(1)" },
                    timeExplainer: "<strong>Floyd's Algorithm:</strong><br>• Phase 1: Detect cycle = <code>O(N)</code><br>• Phase 2: Find start = <code>O(N)</code><br><br><strong>Total:</strong> <code>O(N)</code>",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• Only 2 pointers: slow, fast<br>• No HashSet needed!<br><br><strong>Result:</strong> <code>O(1)</code>",
                    visual: "<span><strong>Visual: The P Shape</strong><br>Distance(Head to Start) = Distance(Meeting to Start).</span>",
                    crux: "<strong>Phase 1:</strong> Intercept (do they collide?).<br><strong>Phase 2:</strong> Reset slow to head. Move both 1 step. Collision = Start.",
                    trap: "<strong>The False Start:</strong> `slow` and `fast` equal at head initially. Don't return true immediately!",
                    dryRun: [
                        "1. Slow moves 1, Fast 2.",
                        "2. Collision! Cycle found.",
                        "3. Slow = Head. Move both 1 step.",
                        "4. Second Collision = Loop Entry."
                    ],
                    codeTitle: "Python Solution",
                    code: `def detectCycle(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            slow = head
            while slow != fast:
                slow = slow.next
                fast = fast.next
            return slow
    return None`
                }
            },
            {
                id: "copy-list-with-random-pointer",
                title: "Clone with Random Pointer",
                leetcodeUrl: "https://leetcode.com/problems/copy-list-with-random-pointer/",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["Deep Copy"],
                quiz: {
                    description: "Deep copy with random pointers. Best approach?",
                    options: [
                        "HashMap: old_node → new_node, then copy random",
                        "Interleaving: insert copies between originals",
                        "Recursion with memo",
                        "Modify original structure"
                    ],
                    correct: 0,
                    explanation: "HashMap is cleaner! Interleaving works (O(1) space) but is trickier. Both are accepted."
                },
                learn: {
                    metrics: { time: "O(N)", space: "O(1) (Interleaving)" },
                    timeExplainer: "<strong>3-Pass Algorithm:</strong><br>• Pass 1: Weave copies = <code>O(N)</code><br>• Pass 2: Link randoms = <code>O(N)</code><br>• Pass 3: Unweave = <code>O(N)</code><br><br><strong>Total:</strong> <code>O(N)</code>",
                    spaceExplainer: "<strong>Interleaving Method:</strong><br>• Insert copies inline<br>• No HashMap needed<br><br><strong>Result:</strong> <code>O(1)</code> extra space",
                    visual: "<span><strong>Visual: DNA Replication</strong><br>Pass 1: Weave A->A'->B->B'.<br>Pass 2: Link Randoms.<br>Pass 3: Unweave.</span>",
                    crux: "<strong>Interleaving Strategy:</strong><br>1. Insert Copy next to Original.<br>2. `copy.random = original.random.next`.<br>3. Extract Copy list.",
                    trap: "<strong>Null Crash:</strong> Check `if curr.random:` before accessing `next`.",
                    dryRun: ["1. Weave: 1->1'->2->2'.", "2. Rand: 1'.rand = 1.rand.next.", "3. Split: 1->2, 1'->2'."],
                    codeTitle: "Python Solution",
                    code: `def copyRandomList(head):
    if not head: return None
    curr = head
    while curr: # Weave
        new_node = Node(curr.val, next=curr.next)
        curr.next = new_node
        curr = new_node.next
    curr = head
    while curr: # Random
        if curr.random:
            curr.next.random = curr.random.next
        curr = curr.next.next
    old_head = head
    new_head = head.next
    curr_old = old_head
    curr_new = new_head
    while curr_old: # Unweave
        curr_old.next = curr_old.next.next
        if curr_new.next:
            curr_new.next = curr_new.next.next
        curr_old = curr_old.next
        curr_new = curr_new.next
    return new_head`
                }
            },
            {
                id: "palindrome-linked-list",
                title: "Palindrome Linked List",
                leetcodeUrl: "https://leetcode.com/problems/palindrome-linked-list/",
                difficulty: "Good to Do",
                priority: "🟢",
                tags: ["Half-Reversal"],
                quiz: {
                    description: "Check palindrome in O(n) time, O(1) space. How?",
                    options: [
                        "Convert to array O(n) space",
                        "Find mid (slow/fast), reverse second half, compare",
                        "Recursion O(n) stack",
                        "Use stack O(n) space"
                    ],
                    correct: 1,
                    explanation: "Find mid + Reverse! Use slow/fast to find middle. Reverse second half. Compare halves. Optional: reverse back."
                },
                learn: {
                    metrics: { time: "O(N)", space: "O(1)" },
                    timeExplainer: "<strong>Time Breakdown:</strong><br>• Find middle: <code>O(N/2)</code><br>• Reverse second half: <code>O(N/2)</code><br>• Compare: <code>O(N/2)</code><br><br><strong>Total:</strong> <code>O(N)</code>",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• No extra array for reversal<br>• In-place manipulation<br><br><strong>Result:</strong> <code>O(1)</code>",
                    visual: "<span><strong>Visual: The Butterfly</strong><br>1. Find Body (Mid).<br>2. Flip Right Wing.<br>3. Compare Wings.</span>",
                    crux: "Singly lists only go forward. To read backward, we must <strong>Reverse the Second Half</strong>.",
                    trap: "<strong>Destructive Read:</strong> You broke the list! Good engineers restore the list before returning.",
                    dryRun: ["1. 1->2->2->1. Slow at 2nd 2.", "2. Reverse 2->1 to 1->2.", "3. Compare 1->2 with 1->2. Match."],
                    codeTitle: "Python Solution",
                    code: `def isPalindrome(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    prev = None
    curr = slow
    while curr: # Reverse 2nd half
        tmp = curr.next
        curr.next = prev
        prev = curr
        curr = tmp
        
    left, right = head, prev
    while right:
        if left.val != right.val: return False
        left = left.next
        right = right.next
    return True`
                }
            }
        ]
    },

    stack: {
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
    },

    trees: {
        id: "trees",
        title: "Tree Mastery",
        description: "Principal Engineer DSA • Day 5",
        color: "#16a34a",
        icon: "fas fa-tree",
        mentalModel: {
            whenToApply: [
                { label: "Leap of Faith", desc: "Assume `solve(root.left)` works. Combine results." }
            ],
            safetyCheck: [
                { label: "Base Cases", desc: "Always handle `if not root` first." },
                { label: "Global vs Local", desc: "Pass down (Param) or Bubble up (Return)?" }
            ]
        },
        questions: [
            {
                id: "lca-binary-tree",
                title: "LCA in Binary Tree",
                leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["DFS Pattern"],
                quiz: {
                    description: "Find LCA in general binary tree. Best approach?",
                    options: [
                        "Find paths to both, compare",
                        "Recursive: if root is p or q, return root. Combine left/right results",
                        "Level-order",
                        "Iterative"
                    ],
                    correct: 1,
                    explanation: "Recursive DFS! Base: if root == p or q or null, return root. Recurse left/right. If both return node, I am LCA. If one, return that."
                },
                learn: {
                    metrics: { time: "O(N)", space: "O(H)" },
                    timeExplainer: "<strong>DFS Traversal:</strong><br>• Visit every node once<br>• Recurse Left and Right<br><br><strong>Total:</strong> <code>O(N)</code>",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• Recursion Stack depth = Tree Height<br>• Skewed Tree: <code>O(N)</code><br>• Balanced Tree: <code>O(log N)</code><br><br><strong>Result:</strong> <code>O(H)</code>",
                    visual: "<span><strong>Visual: The Meeting Point</strong><br>Paths merge at the LCA.</span>",
                    crux: "<strong>Bubbling Up:</strong><br>1. If I am P or Q, return Me.<br>2. If Left & Right both return something, I am LCA.<br>3. Else return non-null child.",
                    trap: "<strong>Missing Node:</strong> Standard algo assumes both nodes exist.",
                    dryRun: ["1. Found P in Left. Return P.", "2. Found Q in Right. Return Q.", "3. Root receives P and Q. Returns Root."],
                    codeTitle: "Python Solution",
                    code: `def lowestCommonAncestor(root, p, q):
    if not root or root == p or root == q: return root
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)
    if left and right: return root
    return left if left else right`
                }
            },
            {
                id: "serialize-deserialize-binary-tree",
                title: "Serialize & Deserialize",
                leetcodeUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["System Design Core"],
                quiz: {
                    description: "Convert tree to string and back. Best traversal?",
                    options: ["Inorder", "Preorder with null markers", "Postorder", "Level-order"],
                    correct: 1,
                    explanation: "Preorder + null markers! Serialize: '1,2,N,N,3'. Deserialize: Iterator. If 'N' return None. Else create node, recurse."
                },
                learn: {
                    metrics: { time: "O(N)", space: "O(H)" },
                    timeExplainer: "<strong>Preorder Traversal:</strong><br>• Visit all nodes to serialize: <code>O(N)</code><br>• Deserialize visits all nodes: <code>O(N)</code><br><br><strong>Total:</strong> <code>O(N)</code>",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• Recursion Stack: <code>O(H)</code><br>• Output String/Array: <code>O(N)</code><br><br><strong>Result:</strong> <code>O(N)</code>",
                    visual: "<span><strong>Visual: Flat Tree</strong><br>Record Nulls to preserve structure.</span>",
                    crux: "<strong>Preorder (Root-Left-Right):</strong><br>Ser: `vals.append(str(node.val))` or 'N'.<br>Deser: `next(iter)`. If 'N', return None.",
                    trap: "<strong>Global Index:</strong> Don't use a global integer index. Use an <strong>Iterator</strong>.",
                    dryRun: ["Ser: [1, 2, N, N, 3, N, N].", "Deser: 1 -> Left(2) -> Left(N), Right(N). 1 -> Right(3)."],
                    codeTitle: "Python Solution",
                    code: `class Codec:
    def serialize(self, root):
        vals = []
        def dfs(node):
            if not node: vals.append("N"); return
            vals.append(str(node.val))
            dfs(node.left)
            dfs(node.right)
        dfs(root)
        return ",".join(vals)

    def deserialize(self, data):
        vals = iter(data.split(","))
        def build():
            val = next(vals)
            if val == "N": return None
            node = TreeNode(int(val))
            node.left = build()
            node.right = build()
            return node
        return build()`
                }
            },
            {
                id: "binary-tree-maximum-path-sum",
                title: "Maximum Path Sum",
                leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["Global vs Local"],
                quiz: {
                    description: "Path can start/end anywhere. What's the trick?",
                    options: ["Try all paths", "DFS: track global max, return single-path max upward", "DP", "BFS"],
                    correct: 1,
                    explanation: "Global vs Local! At each node: global_max = max(global_max, node + left + right). Return upward: node + max(left, right)."
                },
                learn: {
                    metrics: { time: "O(N)", space: "O(H)" },
                    timeExplainer: "<strong>DFS Postorder:</strong><br>• Compute max path for each node<br>• Visit every node exactly once<br><br><strong>Total:</strong> <code>O(N)</code>",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• Recursion Stack depth = Tree Height<br>• Worst case (Skewed): <code>O(N)</code><br><br><strong>Result:</strong> <code>O(H)</code>",
                    visual: "<span><strong>Visual: The Inverted V</strong><br>Split (Arch) vs Flow (Straight).</span>",
                    crux: "<strong>1. Split:</strong> `Root + Left + Right`. Update Global Max.<br><strong>2. Flow:</strong> `Root + max(Left, Right)`. Return to parent.<br><strong>3. Clamp:</strong> `max(gain, 0)`.",
                    trap: "<strong>Negative Gain:</strong> If subtree sum is negative, ignore it (clamp to 0).",
                    dryRun: ["Left gives 15. Right gives 7. Root is 20.", "Global update: 15+7+20 = 42.", "Return: 20 + 15 = 35."],
                    codeTitle: "Python Solution",
                    code: `class Solution:
    def maxPathSum(self, root):
        self.max_sum = float('-inf')
        def get_max(node):
            if not node: return 0
            left = max(get_max(node.left), 0)
            right = max(get_max(node.right), 0)
            self.max_sum = max(self.max_sum, node.val + left + right)
            return node.val + max(left, right)
        get_max(root)
        return self.max_sum`
                }
            },
            {
                id: "construct-binary-tree-preorder-inorder",
                title: "Construct Tree (Pre+In)",
                leetcodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["Index Mastery"],
                quiz: {
                    description: "Rebuild tree from two traversals. Key insight?",
                    options: ["Preorder gives roots, Inorder gives split", "Hash Inorder", "Stack", "Level order"],
                    correct: 0,
                    explanation: "Preorder[0] is Root. Find Root in Inorder. Left of it is LeftSubtree, Right is RightSubtree."
                },
                learn: {
                    metrics: { time: "O(N)", space: "O(N)" },
                    timeExplainer: "<strong>Time Breakdown:</strong><br>• HashMap construction: <code>O(N)</code><br>• Recursive Tree Building: <code>O(N)</code><br><br><strong>Total:</strong> <code>O(N)</code>",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• HashMap stores N indices<br>• Recursion Stack: <code>O(H)</code><br><br><strong>Total:</strong> <code>O(N)</code>",
                    visual: "<span><strong>Visual: The Knife</strong><br>Root (from Pre) slices Inorder into Left/Right.</span>",
                    crux: "1. `root = pre.next()`<br>2. `mid = map[root]`<br>3. `size = mid - in_start`<br>4. Recurse.",
                    trap: "<strong>Slicing:</strong> `pre[1:]` is O(N). Use indices or iterator!",
                    dryRun: ["Pre: [3,9,20]. In: [9,3,20].", "Root=3. Mid=1. LeftSize=1.", "Left: Build([9]). Right: Build([20])."],
                    codeTitle: "Python Solution",
                    code: `def buildTree(preorder, inorder):
    in_map = {v: i for i, v in enumerate(inorder)}
    pre_iter = iter(preorder)
    
    def build(l, r):
        if l > r: return None
        val = next(pre_iter)
        root = TreeNode(val)
        mid = in_map[val]
        root.left = build(l, mid - 1)
        root.right = build(mid + 1, r)
        return root
        
    return build(0, len(inorder) - 1)`
                }
            },
            {
                id: "vertical-order-traversal",
                title: "Vertical Order Traversal",
                leetcodeUrl: "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
                difficulty: "Good to Do",
                priority: "🟡",
                tags: ["Coordinates"],
                quiz: {
                    description: "Print nodes by vertical column. Data structure?",
                    options: ["BFS only", "DFS with (row, col) + Sorting", "Inorder", "Level-order"],
                    correct: 1,
                    explanation: "Track (row, col). Store in `Map[col]`. Sort by Col, then Row, then Val."
                },
                learn: {
                    metrics: { time: "O(N log N)", space: "O(N)" },
                    timeExplainer: "<strong>BFS + Sorting:</strong><br>• BFS Traversal: <code>O(N)</code><br>• Sorting nodes in same column: <code>O(N log N)</code><br><br><strong>Total:</strong> <code>O(N log N)</code>",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• Map stores all nodes<br>• Queue for BFS<br><br><strong>Result:</strong> <code>O(N)</code>",
                    visual: "<span><strong>Visual: Grid Overlay</strong><br>Left: (r+1, c-1). Right: (r+1, c+1).</span>",
                    crux: "<strong>Grouping + Sorting:</strong><br>1. BFS/DFS to collect `(c, r, val)`.<br>2. Sort.",
                    trap: "<strong>Shadow Nodes:</strong> Nodes can land on same (r, c). Must sort by value.",
                    dryRun: ["(0,0,1)", "(-1,1,2), (1,1,3)", "Sort -> Col -1: [2], Col 0: [1], Col 1: [3]"],
                    codeTitle: "Python Solution",
                    code: `def verticalTraversal(root):
    cols = defaultdict(list)
    q = deque([(root, 0, 0)])
    min_c, max_c = 0, 0
    while q:
        node, r, c = q.popleft()
        if node:
            cols[c].append((r, node.val))
            min_c = min(min_c, c)
            max_c = max(max_c, c)
            q.append((node.left, r+1, c-1))
            q.append((node.right, r+1, c+1))
    res = []
    for c in range(min_c, max_c + 1):
        cols[c].sort(key=lambda x: (x[0], x[1]))
        res.append([x[1] for x in cols[c]])
    return res`
                }
            },
            {
                id: "lca-bst",
                title: "LCA in BST",
                leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
                difficulty: "Good to Do",
                priority: "🟢",
                tags: ["BST Property"],
                quiz: {
                    description: "Find LCA in BST. Optimization?",
                    options: ["Same as Binary Tree (DFS)", "Use BST Property: if split, that's LCA", "Inorder Traversal", "BFS"],
                    correct: 1,
                    explanation: "Use BST Property! If both p and q < root, go Left. If both > root, go Right. The first node where they SPLIT (one small, one big) is the LCA. O(H) time, O(1) space (iterative)."
                },
                learn: {
                    metrics: { time: "O(H)", space: "O(1)" },
                    code: `def lowestCommonAncestor(root, p, q):
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root`
                }
            },
            {
                id: "largest-bst-in-bt",
                title: "Largest BST in Binary Tree",
                leetcodeUrl: "https://practice.geeksforgeeks.org/problems/largest-bst/1",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["Postorder"],
                quiz: {
                    description: "Find size of largest BST subtree. Return type?",
                    options: ["Boolean only", "Size only", "Generic Tuple (min, max, size, isBST)", "Void"],
                    correct: 2,
                    explanation: "Postorder Tuple! Each node needs from children: (Min_Val, Max_Val, Size, Is_BST). If Left is BST & Right is BST & MaxLeft < Node < MinRight -> Current is BST."
                },
                learn: {
                    metrics: { time: "O(N)", space: "O(H)" },
                    code: `def largestBST(root):
    # Return: (min_val, max_val, size)
    def postorder(node):
        if not node: return (float('inf'), float('-inf'), 0)
        
        l_min, l_max, l_size = postorder(node.left)
        r_min, r_max, r_size = postorder(node.right)
        
        if l_max < node.val < r_min:
            return (min(l_min, node.val), max(r_max, node.val), l_size + r_size + 1)
        
        return (float('-inf'), float('inf'), max(l_size, r_size))
        
    return postorder(root)[2]`
                }
            },
            {
                id: "burn-binary-tree",
                title: "Burn a Binary Tree",
                leetcodeUrl: "https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["Graph on Tree"],
                quiz: {
                    description: "Time to burn tree from target node. Approach?",
                    options: ["Standard DFS", "Convert to Graph (Parent Pointers) + BFS", "Inorder", "DP"],
                    correct: 1,
                    explanation: "Convert to Graph! Tree nodes only point down. To burn UP, we need Parent pointers (or Adj List). Then run BFS from start node to find max distance."
                },
                learn: {
                    metrics: { time: "O(N)", space: "O(N)" },
                    code: `def amountOfTime(root, start):
    graph = defaultdict(list)
    def dfs(node):
        if not node: return
        if node.left:
            graph[node.val].append(node.left.val)
            graph[node.left.val].append(node.val)
            dfs(node.left)
        if node.right:
            graph[node.val].append(node.right.val)
            graph[node.right.val].append(node.val)
            dfs(node.right)
    dfs(root)
    
    q = deque([(start, 0)])
    visited = {start}
    max_time = 0
    while q:
        node, time = q.popleft()
        max_time = max(max_time, time)
        for nei in graph[node]:
            if nei not in visited:
                visited.add(nei)
                q.append((nei, time + 1))
    return max_time`
                }
            }
        ]
    },

    graphs: {
        id: "graphs",
        title: "Graph Mastery",
        description: "Principal Engineer DSA • Day 6",
        color: "#c026d3",
        icon: "fas fa-project-diagram",
        mentalModel: {
            whenToApply: [
                { label: "Shortest Path (No weights)", desc: "BFS (Layer by layer)." },
                { label: "Shortest Path (Weights)", desc: "Dijkstra (Priority Queue)." },
                { label: "Dependencies", desc: "Topo Sort (Kahn's Algo)." },
                { label: "Connectivity", desc: "Union-Find (DSU)." }
            ],
            safetyCheck: [
                { label: "No BFS for Shortest Path", desc: "Never use DFS for shortest path." },
                { label: "Visited Tracking", desc: "Mark visited immediately upon pushing to Queue." }
            ]
        },
        questions: [
            {
                id: "rotting-oranges",
                title: "Rotten Oranges",
                leetcodeUrl: "https://leetcode.com/problems/rotting-oranges/",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["Multi-Source BFS"],
                quiz: {
                    description: "Simulate rotting. Best approach?",
                    options: ["DFS from each rotten orange", "Multi-Source BFS", "Iterate grid repeatedly", "Union Find"],
                    correct: 1,
                    explanation: "Multi-Source BFS! Put ALL rotten oranges in queue initially. Process level by level (minutes). DFS fails because rotting happens simultaneously."
                },
                learn: {
                    metrics: { time: "O(N*M)", space: "O(N*M)" },
                    timeExplainer: "<strong>Multi-Source BFS:</strong><br>• Each cell visited once<br>• Queue operations are O(1)<br><br><strong>Total:</strong> <code>O(N×M)</code>",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• Queue stores at most boundary cells<br>• Worst case (all rotten): <code>O(N×M)</code><br><br><strong>Result:</strong> <code>O(N×M)</code>",
                    visual: "<span><strong>Visual: Infection Wave</strong><br>All rotten oranges explode at once. Layers: 0->1->2.</span>",
                    crux: "<strong>Simultaneous Rotting:</strong><br>1. Push ALL rotten to Q.<br>2. Loop Levels.<br>3. Check `fresh_cnt == 0` at end.",
                    trap: "<strong>Lonely Orange:</strong> If fresh count > 0 after BFS, return -1 (Impossible).",
                    dryRun: ["Q: [(0,0)]. Fresh: 1.", "Pop (0,0). Neighbors (0,1) -> Rot. Fresh: 0.", "Time: 1."],
                    codeTitle: "Python Solution",
                    code: `def orangesRotting(grid):
    q = deque()
    fresh = 0
    rows, cols = len(grid), len(grid[0])
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2: q.append((r,c))
            elif grid[r][c] == 1: fresh += 1
    
    minutes = 0
    while q and fresh > 0:
        minutes += 1
        for _ in range(len(q)):
            r, c = q.popleft()
            for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
                nr, nc = r+dr, c+dc
                if 0<=nr<rows and 0<=nc<cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    q.append((nr, nc))
    return minutes if fresh == 0 else -1`
                }
            },
            {
                id: "course-schedule",
                title: "Course Schedule",
                leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["Topo Sort"],
                quiz: {
                    description: "Detect if courses can be finished (dependencies). Algo?",
                    options: ["Dijkstra", "Kahn's Algo (Topo Sort)", "Union Find", "Floyd Warshall"],
                    correct: 1,
                    explanation: "Topo Sort (Kahn's)! Build graph. Calculate Indegrees. Q = [Indegree 0]. Process Q, reduce neighbor indegrees. If processed count == N, true."
                },
                learn: {
                    metrics: { time: "O(V+E)", space: "O(V+E)" },
                    timeExplainer: "<strong>Kahn's Algorithm:</strong><br>• Build Graph: <code>O(E)</code><br>• Queue Logic: Process each node & edge once<br><br><strong>Total:</strong> <code>O(V + E)</code>",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• Adjacency List: <code>O(V + E)</code><br>• Indegree Array: <code>O(V)</code><br><br><strong>Result:</strong> <code>O(V + E)</code>",
                    visual: "<span><strong>Visual: Unlocking</strong><br>Pre -> Course. When Pre is done, Course unlocks (Indegree becomes 0).</span>",
                    crux: "<strong>Indegree Zero:</strong><br>1. Q = Nodes with 0 prereqs.<br>2. Pop and 'relax' neighbors (`indegree -= 1`).<br>3. If neighbor becomes 0, push to Q.<br>4. Cycle if `count < N`.",
                    trap: "<strong>The Cycle:</strong> If queue empties but nodes remain with indegree > 0, there is a cycle.",
                    dryRun: ["0->1. Indegrees: [0, 1].", "Q: [0]. Pop 0. 1's indegree -> 0. Q: [1].", "Count: 2 == N. True."],
                    codeTitle: "Python Solution",
                    code: `def canFinish(n, prereqs):
    adj = defaultdict(list)
    indegree = [0]*n
    for c, p in prereqs:
        adj[p].append(c)
        indegree[c] += 1
    
    q = deque([i for i in range(n) if indegree[i] == 0])
    processed = 0
    while q:
        node = q.popleft()
        processed += 1
        for nei in adj[node]:
            indegree[nei] -= 1
            if indegree[nei] == 0: q.append(nei)
            
    return processed == n`
                }
            },
            {
                id: "network-delay-time",
                title: "Network Delay Time",
                leetcodeUrl: "https://leetcode.com/problems/network-delay-time/",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["Dijkstra"],
                quiz: {
                    description: "Max time for signal to reach all nodes. Weighted edges.",
                    options: ["BFS", "Dijkstra", "DFS", "Topo Sort"],
                    correct: 1,
                    explanation: "Dijkstra! Weighted edges require Priority Queue. BFS is for unweighted. Visit nodes in increasing order of cost."
                },
                learn: {
                    metrics: { time: "O(E log V)", space: "O(V+E)" },
                    visual: "<span><strong>Visual: Smart Ripple</strong><br>Greedy expansion. Always pick the cheapest node.</span>",
                    crux: "<strong>Min-Heap:</strong> `(dist, node)`.<br>1. Pop cheapest.<br>2. If new path to neighbor is shorter, push to heap.<br>3. Track visited.",
                    trap: "<strong>Stale Entries:</strong> Lazy Dijkstra leaves old `(cost, node)` in heap. Check `if cost > dist[node]: continue`.",
                    dryRun: ["PQ: [(0, K)]. Pop K.", "Push neighbors with weights.", "Pop next cheapest. Update dist."],
                    codeTitle: "Python Solution",
                    code: `def networkDelayTime(times, n, k):
    graph = defaultdict(list)
    for u, v, w in times:
        graph[u].append((v, w))
    
    pq = [(0, k)]
    dist = {}
    
    while pq:
        d, node = heapq.heappop(pq)
        if node in dist: continue
        dist[node] = d
        for nei, w in graph[node]:
            if nei not in dist:
                heapq.heappush(pq, (d+w, nei))
                
    return max(dist.values()) if len(dist) == n else -1`
                }
            },
            {
                id: "number-of-provinces",
                title: "Number of Provinces",
                leetcodeUrl: "https://leetcode.com/problems/number-of-provinces/",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["Union-Find"],
                quiz: {
                    description: "Count connected components. Efficient DS?",
                    options: ["DFS", "BFS", "Union-Find (DSU)", "All of the above"],
                    correct: 3,
                    explanation: "All work! But DSU (Union-Find) is the most elegant for 'connectivity' and 'components'. Initialize N parents. Union connected nodes. Count unique parents."
                },
                learn: {
                    metrics: { time: "O(α(N))", space: "O(N)" },
                    timeExplainer: "<strong>Union-Find (DSU):</strong><br>• Initialization: <code>O(N)</code><br>• Union/Find ops: Nearly constant <code>O(α(N))</code><br><br><strong>Total:</strong> <code>O(N + E⋅α(N))</code>",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• Parent Array: <code>O(N)</code><br>• Rank/Size Array: <code>O(N)</code><br><br><strong>Result:</strong> <code>O(N)</code>",
                    visual: "<span><strong>Visual: Corporate Merger</strong><br>Each Union merges two companies. Count remaining CEOs.</span>",
                    crux: "<strong>Find & Union:</strong><br>1. `Find(x)` with Path Compression.<br>2. `Union(x, y)` links roots.<br>3. `Count` decrements on successful union.",
                    trap: "<strong>Naive Union:</strong> Always link Roots! `parent[rootX] = rootY`, not `parent[x]=y`.",
                    dryRun: ["Init: [0, 1, 2]. Count=3.", "Union(0,1): [1, 1, 2]. Count=2.", "Total 2 provinces."],
                    codeTitle: "Python Solution",
                    code: `class DSU:
    def __init__(self, n):
        self.p = list(range(n))
        self.cnt = n
    def find(self, x):
        if self.p[x] != x: self.p[x] = self.find(self.p[x])
        return self.p[x]
    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx != ry:
            self.p[rx] = ry
            self.cnt -= 1

def findCircleNum(isConnected):
    n = len(isConnected)
    dsu = DSU(n)
    for i in range(n):
        for j in range(i+1, n):
            if isConnected[i][j]: dsu.union(i, j)
    return dsu.cnt`
                }
            },
            {
                id: "clone-graph",
                title: "Clone Graph",
                leetcodeUrl: "https://leetcode.com/problems/clone-graph/",
                difficulty: "Good to Do",
                priority: "🟢",
                tags: ["Deep Copy"],
                quiz: {
                    description: "Deep copy graph. How to handle cycles?",
                    options: ["BFS", "DFS + HashMap", "Recursion only", "Queue"],
                    correct: 1,
                    explanation: "DFS + HashMap! Map stores `OldNode -> NewNode`. If node in map, return stored copy (handles cycles). Else create, add to map, recurse."
                },
                learn: {
                    metrics: { time: "O(V+E)", space: "O(V)" },
                    timeExplainer: "<strong>DFS Traversal:</strong><br>• Visit each Vertex once<br>• Traverse each Edge once<br><br><strong>Total:</strong> <code>O(V + E)</code>",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• Map stores V nodes<br>• Recursion stack O(V)<br><br><strong>Result:</strong> <code>O(V)</code>",
                    visual: "<span><strong>Visual: Mirror Map</strong><br>Check Map before creating. Old -> New.</span>",
                    crux: "1. Check Map: Return if exists.<br>2. Create Copy.<br>3. Add to Map (BEFORE recursion).<br>4. Clone neighbors.",
                    trap: "<strong>Infinite Recursion:</strong> Must register in Map *before* visiting neighbors.",
                    dryRun: ["Q: Clone(1). Map={1:N1}. Recurse 2.", "Clone(2). Map={1:N1, 2:N2}. Recurse 1 -> Return N1.", "Link N2->N1."],
                    codeTitle: "Python Solution",
                    code: `def cloneGraph(node):
    if not node: return None
    old_to_new = {}
    
    def dfs(curr):
        if curr in old_to_new: return old_to_new[curr]
        copy = Node(curr.val)
        old_to_new[curr] = copy
        for nei in curr.neighbors:
            copy.neighbors.append(dfs(nei))
        return copy
        
    return dfs(node)`
                }
            },
            {
                id: "is-graph-bipartite",
                title: "Is Graph Bipartite?",
                leetcodeUrl: "https://leetcode.com/problems/is-graph-bipartite/",
                difficulty: "Good to Do",
                priority: "🟡",
                tags: ["Graph Coloring"],
                quiz: {
                    description: "Can graph be colored with 2 colors? Algorithm?",
                    options: ["Dijkstra", "BFS/DFS 2-Coloring", "Topological Sort", "Union Find"],
                    correct: 1,
                    explanation: "2-Coloring (Bipartite Check)! Use BFS/DFS. Assign color 0/1. If neighbor has SAME color -> False. If neighbor unvisited -> Assign opposite color."
                },
                learn: {
                    metrics: { time: "O(V+E)", space: "O(V)" },
                    code: `def isBipartite(graph):
    color = {}
    for i in range(len(graph)):
        if i not in color:
            color[i] = 0
            q = deque([i])
            while q:
                node = q.popleft()
                for nei in graph[node]:
                    if nei not in color:
                        color[nei] = 1 - color[node]
                        q.append(nei)
                    elif color[nei] == color[node]:
                        return False
    return True`
                }
            },
            {
                id: "detect-cycle-directed",
                title: "Detect Cycle (Directed)",
                leetcodeUrl: "https://practice.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["DFS Recursion"],
                quiz: {
                    description: "Find cycle in directed graph. DFS State?",
                    options: ["Visited Set only", "Visited + RecursionStack Sets", "BFS", "Union Find"],
                    correct: 1,
                    explanation: "Need 2 Sets! 1. Visited (Global), 2. RecursionStack (Current Path). If node in RecursionStack -> Cycle detected. If in Visited but not Stack -> Safe (Cross Edge)."
                },
                learn: {
                    metrics: { time: "O(V+E)", space: "O(V)" },
                    code: `def isCyclic(V, adj):
    visited = set()
    recStack = set()
    
    def dfs(node):
        visited.add(node)
        recStack.add(node)
        
        for nei in adj[node]:
            if nei not in visited:
                if dfs(nei): return True
            elif nei in recStack:
                return True
                
        recStack.remove(node)
        return False
        
    for i in range(V):
        if i not in visited:
            if dfs(i): return True
    return False`
                }
            }
        ]
    },

    dp: {
        id: "dp",
        title: "Dynamic Programming",
        description: "Principal Engineer DSA • Day 7",
        color: "#ec4899",
        icon: "fas fa-braille",
        mentalModel: {
            whenToApply: [
                { label: "Overlapping Subproblems", desc: "Solving the same small problem again and again? Memoize it." },
                { label: "Optimal Substructure", desc: "Can you build the answer from answers of smaller inputs?" }
            ],
            safetyCheck: [
                { label: "State Definition", desc: "Clearly define what `dp[i]` represents." },
                { label: "Base Cases", desc: "Don't forget `dp[0]` initialization." }
            ]
        },
        questions: [
            {
                id: "house-robber",
                title: "House Robber",
                leetcodeUrl: "https://leetcode.com/problems/house-robber/",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["1D DP"],
                quiz: {
                    description: "Max loot, can't rob adjacent. Recurrence?",
                    options: ["`max(arr[i] + rob[i-2], rob[i-1])`", "`arr[i] + rob[i-1]`", "`max(arr[i], rob[i-1])`", "Greedy"],
                    correct: 0,
                    explanation: "Choice at house i: Either Rob (take arr[i] + result from i-2) OR Skip (take result from i-1). Max of both."
                },
                learn: {
                    metrics: { time: "O(N)", space: "O(1)" },
                    timeExplainer: "<strong>Linear Scan:</strong><br>• Single pass through houses<br>• Constant work per house<br><br><strong>Total:</strong> <code>O(N)</code>",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• Optimized: Only store 2 vars<br>• No DP array needed<br><br><strong>Result:</strong> <code>O(1)</code>",
                    visual: "<span><strong>Visual: The Thief's Dilemma</strong><br>Rob current? Must have skipped previous. Skip current? Keep previous loot.</span>",
                    crux: "<strong>Space Optimization:</strong> Only need previous 2 values. `rob1, rob2`. New `rob2 = max(n + rob1, rob2)`.",
                    trap: "<strong>Greedy fail:</strong> Robbing biggest houses might block better combinations.",
                    dryRun: ["Input: [1,2,3,1].", "1. [1].", "2. max(2, 1) -> 2.", "3. max(3+1, 2) -> 4.", "4. max(1+2, 4) -> 4."],
                    codeTitle: "Python Solution",
                    code: `def rob(nums):
    rob1, rob2 = 0, 0
    for n in nums:
        temp = max(n + rob1, rob2)
        rob1 = rob2
        rob2 = temp
    return rob2`
                }
            },
            {
                id: "longest-increasing-subsequence",
                title: "LIS",
                leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/",
                visualizerUrl: "visualizers/lis.html",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["DP + Binary Search"],
                quiz: {
                    description: "Find length of LIS. O(N log N) approach?",
                    options: ["Standard DP O(N²)", "Patience Sorting / Tails Array", "Sliding Window", "Recursion"],
                    correct: 1,
                    explanation: "Patience Sorting! Maintain a 'tails' array. For each x, replace the first element in tails >= x. If x is largest, append. Len(tails) is answer."
                },
                learn: {
                    metrics: { time: "O(N²)", space: "O(N²)" },
                    timeExplainer: `
                        <div class="space-y-2">
                            <p class="font-bold text-red-400">1. Recursion (Lun Na Lun): O(2ⁿ)</p>
                            <ul class="list-disc pl-4 text-sm text-gray-400">
                                <li><strong>Choices:</strong> For each element, either TAKE (if > prev) or SKIP.</li>
                                <li>Similar to subsets logic. Exponential.</li>
                            </ul>
                            
                            <p class="font-bold text-yellow-400 mt-2">2. Memoization / DP: O(N²)</p>
                            <ul class="list-disc pl-4 text-sm text-gray-400">
                                <li><strong>States:</strong> (Index, Previous_Index).</li>
                                <li>Total N indices * N previous indices = N² states.</li>
                            </ul>

                             <p class="font-bold text-green-400 mt-2">3. Patience Sort: O(N log N)</p>
                            <ul class="list-disc pl-4 text-sm text-gray-400">
                                <li>Available in the "O(N log N)" tab (Advanced).</li>
                            </ul>
                        </div>`,
                    spaceExplainer: `
                        <div class="space-y-2">
                            <p><strong>1. Memoization: O(N²)</strong><br>
                            We need to cache results for every pair (i, prev_i).</p>
                            
                            <p><strong>2. 1D DP: O(N)</strong><br>
                            dp[i] = Length of LIS ending at index i. Only need array of size N.</p>
                        </div>`,
                    visual: "<span><strong>Visual: Lun Na Lun Tree</strong><br>At index i, compare with prev.<br>If nums[i] > prev: Branch 1 (Take), Branch 2 (Skip).<br>Else: Only Branch 2 (Skip).</span>",
                    crux: "<strong>The 'Lun na Lun' Logic:</strong><br>1. **Lun (Take):** Only if `nums[i] > nums[prev]`. Count as 1 + recurse(i+1, i).<br>2. **Na Lun (Skip):** Always allowed. recurse(i+1, prev).<br><br><strong>Note:</strong> `prev` is index, not value, to handle duplicates/indices correctly.",
                    trap: "<strong>Prev Index -1:</strong> Initially, prev index is -1 (fictional -∞).<br><strong>Subsequence vs Subarray:</strong> Not contiguous!",
                    dryRun: [
                        `<details class="group bg-slate-800 rounded-lg p-2 cursor-pointer open:ring-1 open:ring-indigo-500/50 transition-all duration-300">
                            <summary class="flex items-center gap-3 font-medium text-indigo-300 select-none list-none text-sm">
                                <span class="bg-indigo-500/20 text-indigo-400 p-1.5 rounded-md group-open:rotate-90 transition-transform">
                                    <i class="fas fa-chevron-right text-xs"></i>
                                </span>
                                <span>🔍 View Trace Execution (Hidden by Default)</span>
                            </summary>
                            
                            <div class="mt-3 pl-4 border-l-2 border-indigo-500/20 space-y-3 text-sm font-mono text-gray-300 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div class="flex items-start gap-2">
                                    <span class="text-blue-400 mt-1">1.</span>
                                    <div>
                                        <div class="font-bold text-white">Input: [10, 9, 2, 5, 3]</div>
                                    </div>
                                </div>

                                <div class="flex items-start gap-2 pl-4 border-l border-gray-700 ml-1">
                                    <span class="text-yellow-400 mt-1">2.</span>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <span>i=0 (10), prev=-1</span>
                                        </div>
                                        <div class="text-xs text-gray-400">Option A (Skip): dfs(1, -1)</div>
                                        <div class="text-xs text-gray-400">Option B (Take): 1 + dfs(1, 0)</div>
                                    </div>
                                </div>
                                
                                <div class="flex items-start gap-2 pl-8 border-l border-gray-700 ml-1">
                                    <span class="text-green-400 mt-1">3.</span>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <span>Start sequence with 2 (Index 2)</span>
                                        </div>
                                        <div class="text-xs text-gray-400">Current LIS: [2]</div>
                                    </div>
                                </div>

                                <div class="flex items-start gap-2 pl-12 border-l border-gray-700 ml-1">
                                    <span class="text-green-400 mt-1">4.</span>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <span>Take 5 (Index 3)?</span>
                                            <span class="bg-green-500/20 text-green-400 text-xs px-1.5 rounded">YES > 2</span>
                                        </div>
                                        <div class="text-xs text-gray-400">Current LIS: [2, 5]</div>
                                    </div>
                                </div>
                                
                                 <div class="flex items-start gap-2 pl-12 border-l border-gray-700 ml-1">
                                    <span class="text-green-400 mt-1">5.</span>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <span>Take 3 (Index 4)?</span>
                                            <span class="text-red-400 text-xs">NO < 5</span>
                                        </div>
                                        <div class="text-xs text-gray-400">Backtrack... Try taking 3 instead of 5?</div>
                                    </div>
                                </div>
                            </div>
                        </details>`
                    ],
                    codeTitle: "Evolution: Recursion -> Memo -> DP",
                    code: `
##### 1. Recursion (Lun Na Lun) - TLE
def lengthOfLIS_Rec(nums):
    def dfs(i, prev_i):
        if i == len(nums): return 0
        
        # Option 1: Na Lun (Skip)
        skip = dfs(i + 1, prev_i)
        
        # Option 2: Lun (Take) - Only if increasing
        take = 0
        if prev_i == -1 or nums[i] > nums[prev_i]:
            take = 1 + dfs(i + 1, i)
            
        return max(take, skip)
        
    return dfs(0, -1)

##### 2. Memoization (Top-Down) - O(N^2)
def lengthOfLIS_Memo(nums):
    memo = {} # Key: (i, prev_i)
    
    def dfs(i, prev_i):
        if i == len(nums): return 0
        if (i, prev_i) in memo: return memo[(i, prev_i)]
        
        skip = dfs(i + 1, prev_i)
        
        take = 0
        if prev_i == -1 or nums[i] > nums[prev_i]:
            take = 1 + dfs(i + 1, i)
            
        memo[(i, prev_i)] = max(take, skip)
        return memo[(i, prev_i)]
        
    return dfs(0, -1)

##### 3. Iterative DP (Bottom-Up) - O(N^2)
# Standard simple approach
def lengthOfLIS_DP(nums):
    if not nums: return 0
    # dp[i] = max length ending at index i
    dp = [1] * len(nums)
    
    for i in range(len(nums)):
        for j in range(i):
            if nums[i] > nums[j]:
                dp[i] = max(dp[i], 1 + dp[j])
                
    return max(dp)`
                }
            },
            {
                id: "longest-common-subsequence",
                title: "LCS",
                leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/",
                visualizerUrl: "visualizers/lcs.html",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["2D DP"],
                quiz: {
                    description: "Longest common subsequence in two strings. Logic?",
                    options: ["Substring matching", "If match: 1 + diag. Else: max(up, left)", "Greedy", "HashMaps"],
                    correct: 1,
                    explanation: "2D Grid! If chars match: `1 + dp[i-1][j-1]`. If no match: `max(dp[i-1][j], dp[i][j-1])` (carry forward best result)."
                },
                learn: {
                    metrics: { time: "O(M × N)", space: "O(M × N)" },
                    timeExplainer: `
                        <div class="space-y-2">
                            <p class="font-bold text-red-400">1. Recursion (Match/Skip): O(2ᵐ⁺ⁿ)</p>
                            <ul class="list-disc pl-4 text-sm text-gray-400">
                                <li><strong>Why?</strong> At each step (i, j), if no match, we branch twice: <code>(i+1, j)</code> and <code>(i, j+1)</code>.</li>
                                <li>Height of tree is M+N. Total nodes ≈ 2ᵐ⁺ⁿ.</li>
                            </ul>
                            
                            <p class="font-bold text-green-400 mt-2">2. DP Grid: O(M × N)</p>
                            <ul class="list-disc pl-4 text-sm text-gray-400">
                                <li><strong>States:</strong> Each cell (i, j) in the grid is solved once.</li>
                                <li><strong>Work per Cell:</strong> Constant O(1) comparison and max().</li>
                            </ul>
                        </div>`,
                    spaceExplainer: `
                        <div class="space-y-2">
                            <p><strong>1. Full Grid: O(M × N)</strong><br>
                            Standard approach stores the entire table to reconstruct the string.</p>
                            
                            <p><strong>2. Space Opt: O(min(M, N))</strong><br>
                            If we only need length, we only need the <em>previous row</em>. (Rolling array).</p>
                        </div>`,
                    visual: "<span><strong>Visual: Connection wires</strong><br>Draw lines between matching characters. Lines can't cross.</span>",
                    crux: "<strong>The 'Match or Skip' Logic:</strong><br>1. **Match:** Characters equal? 1 + Diagonal Result (i+1, j+1).<br>2. **No Match:** Characters different? We can't match both. Try skipping S1's char (i+1, j) OR S2's char (i, j+1). Take MAX.",
                    trap: "<strong>Subsequence vs Substring:</strong> Subsequence skips aren't penalized. Substring breaks on mismatch.<br><strong>Order:</strong> Text ordering must remain preserved.",
                    dryRun: [
                        `<details class="group bg-slate-800 rounded-lg p-2 cursor-pointer open:ring-1 open:ring-indigo-500/50 transition-all duration-300">
                            <summary class="flex items-center gap-3 font-medium text-indigo-300 select-none list-none text-sm">
                                <span class="bg-indigo-500/20 text-indigo-400 p-1.5 rounded-md group-open:rotate-90 transition-transform">
                                    <i class="fas fa-chevron-right text-xs"></i>
                                </span>
                                <span>🔍 View Trace Execution (Hidden by Default)</span>
                            </summary>
                            
                            <div class="mt-3 pl-4 border-l-2 border-indigo-500/20 space-y-3 text-sm font-mono text-gray-300 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div class="flex items-start gap-2">
                                    <span class="text-blue-400 mt-1">1.</span>
                                    <div>
                                        <div class="font-bold text-white">S1="abc", S2="ac"</div>
                                    </div>
                                </div>

                                <div class="flex items-start gap-2 pl-4 border-l border-gray-700 ml-1">
                                    <span class="text-green-400 mt-1">2.</span>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <span>Compare 'a' vs 'a'</span>
                                            <span class="bg-green-500/20 text-green-400 text-xs px-1.5 rounded">MATCH</span>
                                        </div>
                                        <div class="text-xs text-gray-400">1 + dfs("bc", "c")</div>
                                    </div>
                                </div>
                                
                                <div class="flex items-start gap-2 pl-8 border-l border-gray-700 ml-1">
                                    <span class="text-yellow-400 mt-1">3.</span>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <span>Compare 'b' vs 'c'</span>
                                            <span class="text-red-400 text-xs">NO MATCH</span>
                                        </div>
                                        <div class="text-xs text-gray-400">Option A: Skip 'b' -> dfs("c", "c")</div>
                                        <div class="text-xs text-gray-400">Option B: Skip 'c' -> dfs("bc", "")</div>
                                    </div>
                                </div>

                                <div class="flex items-start gap-2 pl-12 border-l border-gray-700 ml-1">
                                    <span class="text-green-400 mt-1">4.</span>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <span>Option A Match: 'c' vs 'c'</span>
                                            <span class="bg-green-500/20 text-green-400 text-xs px-1.5 rounded">MATCH</span>
                                        </div>
                                        <div class="text-xs text-gray-400">1 + dfs("", "") -> Returns 1+0 = 1</div>
                                    </div>
                                </div>

                                <div class="flex items-start gap-2 pl-4 border-l border-gray-700 ml-1">
                                    <span class="text-purple-400 mt-1">5.</span>
                                    <div>
                                        <div class="font-bold text-purple-300">Result: 1 (from 'a') + 1 (from 'c') = 2</div>
                                    </div>
                                </div>
                            </div>
                        </details>`
                    ],
                    codeTitle: "Evolution: Recursion -> Memo -> 2D Grid",
                    code: `
##### 1. Recursion (Match vs Skip) - TLE
def longestCommonSubsequence_Rec(text1, text2):
    def dfs(i, j):
        # Base Case: Either string finished
        if i == len(text1) or j == len(text2):
            return 0
            
        # Case 1: Match! (Diagonal move)
        if text1[i] == text2[j]:
            return 1 + dfs(i + 1, j + 1)
            
        # Case 2: No Match! (Max of skipping S1 char OR skipping S2 char)
        skip_1 = dfs(i + 1, j)
        skip_2 = dfs(i, j + 1)
        return max(skip_1, skip_2)

    return dfs(0, 0)

##### 2. Memoization (Top-Down) - Accepted
def longestCommonSubsequence_Memo(text1, text2):
    memo = {}
    
    def dfs(i, j):
        if i == len(text1) or j == len(text2): return 0
        if (i, j) in memo: return memo[(i, j)]
        
        if text1[i] == text2[j]:
            memo[(i, j)] = 1 + dfs(i + 1, j + 1)
        else:
            memo[(i, j)] = max(dfs(i + 1, j), dfs(i, j + 1))
            
        return memo[(i, j)]

    return dfs(0, 0)

##### 3. Bottom-Up 2D DP - Best for visualization
# dp[i][j] = LCS of text1[i:] and text2[j:] (or prefix based)
def longestCommonSubsequence_DP(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
                
    return dp[m][n]`
                }
            },
            {
                id: "coin-change",
                title: "Coin Change",
                leetcodeUrl: "https://leetcode.com/problems/coin-change/",
                visualizerUrl: "visualizers/min_coins.html",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["Knapsack"],
                quiz: {
                    description: "Fewest coins to make amount. Trick?",
                    options: ["Greedy (biggest coins first)", "DP: dp[a] = min(dp[a], 1 + dp[a-c])", "Backtracking", "BFS"],
                    correct: 1,
                    explanation: "Greedy fails (e.g., Coins [1,3,4], Target 6. Greedy 4+1+1 (3 coins). Optimal 3+3 (2 coins)). Use DP: solve for amount 1, then 2..."
                },
                learn: {
                    metrics: { time: "O(A × C)", space: "O(A)" },
                    timeExplainer: `
                        <div class="space-y-2">
                            <p class="font-bold text-red-400">1. Recursion (Lun Na Lun): O(2ⁿ)</p>
                            <ul class="list-disc pl-4 text-sm text-gray-400">
                                <li><strong>Why?</strong> At each step, either TAKE the coin (stay at index) or SKIP the coin (move to next index).</li>
                                <li>Strictly speaking, branches are infinite if we keep taking 1s, but logically exponential.</li>
                            </ul>
                            
                            <p class="font-bold text-green-400 mt-2">2. Memoization / DP: O(Amount × Coins)</p>
                            <ul class="list-disc pl-4 text-sm text-gray-400">
                                <li><strong>States:</strong> (Index, Amount) or just (Amount) in 1D DP.</li>
                                <li><strong>Total:</strong> If Amount=100, Coins=3 -> 300 subproblems. Easy!</li>
                            </ul>
                        </div>`,
                    spaceExplainer: `
                        <div class="space-y-2">
                            <p><strong>1. Recursion Stack: O(Amount)</strong><br>
                            If we take coin '1' repeatedly, depth = Amount.</p>
                            
                            <p><strong>2. DP Array: O(Amount)</strong><br>
                            We just need an array of size Amount+1 to store min coins for each value.</p>
                        </div>`,
                    visual: "<span><strong>Visual: Ladder</strong><br>To reach step 11, coming from step 6 (valid coin 5) costs +1 step.</span>",
                    crux: "<strong>The 'Lun na Lun' for Unbounded Knapsack:</strong><br>1. **Lun (Take It):** Use coin[i]. Amount decreases. <strong>Stay at index i</strong> (Infinite supply logic).<br>2. **Na Lun (Skip It):** Don't use coin[i]. <strong>Move to index i+1</strong>.<br><br><strong>Optimization:</strong> Cache `(index, amount)` or just `(amount)`.",
                    trap: "<strong>Greedy Fails:</strong> Coins=[1,3,4], Target=6. Greedy takes 4+1+1 (3 coins). DP finds 3+3 (2 coins).<br><strong>Initialization:</strong> Initialize DP with `Infinity`, not 0 or -1.",
                    dryRun: [
                        `<details class="group bg-slate-800 rounded-lg p-2 cursor-pointer open:ring-1 open:ring-indigo-500/50 transition-all duration-300">
                            <summary class="flex items-center gap-3 font-medium text-indigo-300 select-none list-none text-sm">
                                <span class="bg-indigo-500/20 text-indigo-400 p-1.5 rounded-md group-open:rotate-90 transition-transform">
                                    <i class="fas fa-chevron-right text-xs"></i>
                                </span>
                                <span>🔍 View Trace Execution (Hidden by Default)</span>
                            </summary>
                            
                            <div class="mt-3 pl-4 border-l-2 border-indigo-500/20 space-y-3 text-sm font-mono text-gray-300 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div class="flex items-start gap-2">
                                    <span class="text-blue-400 mt-1">1.</span>
                                    <div>
                                        <div class="font-bold text-white">Target: 6, Coins: [1, 3, 4]</div>
                                    </div>
                                </div>

                                <div class="flex items-start gap-2 pl-4 border-l border-gray-700 ml-1">
                                    <span class="text-yellow-400 mt-1">2.</span>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <span>Start Logic</span>
                                        </div>
                                        <div class="text-xs text-gray-400">Initialize dp = [0, inf, inf, ...]</div>
                                    </div>
                                </div>

                                <div class="flex items-start gap-2 pl-4 border-l border-gray-700 ml-1">
                                    <span class="text-green-400 mt-1">3.</span>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <span>Solve for 3</span>
                                        </div>
                                        <div class="text-xs text-gray-400">Use coin 3? Left=0. 1+dp[0] = 1 coin. ✅</div>
                                    </div>
                                </div>
                                
                                <div class="flex items-start gap-2 pl-4 border-l border-gray-700 ml-1">
                                    <span class="text-green-400 mt-1">4.</span>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <span>Solve for 6</span>
                                        </div>
                                        <div class="text-xs text-gray-400">Option A: 6-1 = 5 (dp[5] needed)</div>
                                        <div class="text-xs text-gray-400">Option B: 6-3 = 3 (dp[3]=1). Total 1+1 = 2 coins. ✅ Best!</div>
                                    </div>
                                </div>
                            </div>
                        </details>`
                    ],
                    codeTitle: "Evolution: Recursion -> Memo -> DP",
                    code: `
##### 1. Recursion (Lun Na Lun) - TLE
# Logic: Infinite supply -> If Take, stay at i. If Skip, i+1.
def coinChange_Rec(coins, amount):
    def dfs(amount, i):
        if amount == 0: return 0
        if amount < 0 or i == len(coins): return float('inf')
        
        # Option 1: Lun (Take coin, stay at i)
        take = 1 + dfs(amount - coins[i], i)
        
        # Option 2: Na Lun (Skip coin, move to i+1)
        skip = dfs(amount, i + 1)
        
        return min(take, skip)
    
    res = dfs(amount, 0)
    return res if res != float('inf') else -1

##### 2. Memoization (Top-Down) - Accepted
# Time: O(Amount * Coins) | Space: O(Amount * Coins)
def coinChange_Memo(coins, amount):
    memo = {}
    
    def dfs(amount, i):
        if amount == 0: return 0
        if amount < 0 or i == len(coins): return float('inf')
        
        state = (amount, i)
        if state in memo: return memo[state]
        
        take = 1 + dfs(amount - coins[i], i)
        skip = dfs(amount, i + 1)
        
        memo[state] = min(take, skip)
        return memo[state]
        
    res = dfs(amount, 0)
    return res if res != float('inf') else -1

##### 3. Iterative DP (1D Optimization) - Best
# Time: O(Amount * Coins) | Space: O(Amount)
# Logic: We don't need 'i' dimension. Just solve for amounts 0..T
def coinChange_DP(coins, amount):
    # dp[i] = min coins to make amount 'i'
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for a in range(1, amount + 1):
        for c in coins:
            if a - c >= 0:
                # Recurrence: 1 coin (current) + best way to make remainder
                dp[a] = min(dp[a], 1 + dp[a - c])
                
    return dp[amount] if dp[amount] != float('inf') else -1`
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
                    metrics: { time: "O(N³)", space: "O(N)" },
                    timeExplainer: `
                        <div class="space-y-2">
                            <p class="font-bold text-red-400">1. Brute Force (Recursion): O(2ⁿ)</p>
                            <ul class="list-disc pl-4 text-sm text-gray-400">
                                <li><strong>Why?</strong> At every character index <code>i</code>, we have 2 choices: Split or Don't Split.</li>
                                <li><strong>Math:</strong> For a string of length N, there are N-1 potential gaps. 2 choices per gap = 2ᴺ⁻¹.</li>
                                <li><strong>Example:</strong> If N=20, ops ≈ 1,000,000 (Doable). If N=50, ops ≈ 10¹⁵ (Universe Heat Death).</li>
                            </ul>
                            
                            <p class="font-bold text-green-400 mt-2">2. Memoization / DP: O(N³)</p>
                            <ul class="list-disc pl-4 text-sm text-gray-400">
                                <li><strong>States:</strong> We only have N unique start indices (0 to N).</li>
                                <li><strong>Work per State:</strong> Loop from <code>start</code> to <code>end</code> (O(N) iterations).</li>
                                <li><strong>Slicing Cost:</strong> Creating substring <code>s[start:end]</code> takes O(N) time.</li>
                                <li><strong>Total:</strong> N states × N loop × N slice = <strong>O(N³)</strong>.</li>
                            </ul>
                        </div>`,
                    spaceExplainer: `
                        <div class="space-y-2">
                            <p><strong>1. Recursion Stack: O(N)</strong><br>
                            Max depth of recursion tree is N (e.g., splitting every character 'a', 'a', 'a'...).</p>
                            
                            <p><strong>2. Memoization Cache: O(N)</strong><br>
                            We store a boolean result for each index 0 to N. Dictionary/Array size is linear.</p>
                            
                            <p><strong>Total Space: O(N)</strong></p>
                        </div>`,
                    visual: "<span><strong>Visual: The Cut Strategy</strong><br>Imagine slicing the string. If <code>s[0:j]</code> is valid (Green) AND <code>s[j:i]</code> is in dict (Blue), then <code>s[0:i]</code> becomes Green.</span>",
                    crux: "<strong>The 'Lun na Lun' (Cut or No Cut) Dilemma:</strong><br>Recursion chalao har index pe.<br>Agar `dictionary` mein word mila -> **Cut lagao** aur bacha hua `solve(end)` karo.<br>Agar nahi mila -> **Skip karo** (Word badhao).<br><br><strong>Optimization:</strong><br>Overlapping subproblems (same start index repeatedly solved) ko cache karo.",
                    trap: "<strong>Complexity Trap:</strong> It feels like O(N^N) because of the loop, but it's actually O(2^N) because logically each gap has a binary choice.<br><strong>Slicing Trap:</strong> Remember `s[j:i]` takes O(K) time in Python/Java. Don't ignore it.",
                    dryRun: [
                        `<details class="group bg-slate-800 rounded-lg p-2 cursor-pointer open:ring-1 open:ring-indigo-500/50 transition-all duration-300">
                            <summary class="flex items-center gap-3 font-medium text-indigo-300 select-none list-none text-sm">
                                <span class="bg-indigo-500/20 text-indigo-400 p-1.5 rounded-md group-open:rotate-90 transition-transform">
                                    <i class="fas fa-chevron-right text-xs"></i>
                                </span>
                                <span>🔍 View Trace Execution (Hidden by Default)</span>
                            </summary>
                            
                            <div class="mt-3 pl-4 border-l-2 border-indigo-500/20 space-y-3 text-sm font-mono text-gray-300 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div class="flex items-start gap-2">
                                    <span class="text-blue-400 mt-1">1.</span>
                                    <div>
                                        <div class="font-bold text-white">dfs(0)</div>
                                        <div class="text-xs text-gray-500">Input "leetcode"</div>
                                    </div>
                                </div>

                                <div class="pl-4 border-l border-gray-700 ml-1 opacity-60 hover:opacity-100 transition-opacity">
                                    <div class="flex items-center gap-2 text-xs text-red-300">
                                        <span>try "l"</span>
                                        <span class="text-red-500">❌ Not in dict</span>
                                    </div>
                                    <div class="flex items-center gap-2 text-xs text-red-300">
                                        <span>try "le"</span>
                                        <span class="text-red-500">❌ Not in dict</span>
                                    </div>
                                    <div class="flex items-center gap-2 text-xs text-red-300">
                                        <span>try "lee"</span>
                                        <span class="text-red-500">❌ Not in dict</span>
                                    </div>
                                </div>

                                <div class="flex items-start gap-2 pl-4 border-l border-gray-700 ml-1">
                                    <span class="text-green-400 mt-1">2.</span>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <span>try "leet"</span>
                                            <span class="bg-green-500/20 text-green-400 text-xs px-1.5 rounded">FOUND</span>
                                        </div>
                                        <div class="text-xs text-gray-400">Match! Recurse on suffix...</div>
                                    </div>
                                </div>

                                <div class="flex items-start gap-2 pl-4 border-l border-gray-700 ml-1">
                                    <span class="text-blue-400 mt-1">3.</span>
                                    <div>
                                        <div class="font-bold text-white">dfs(4)</div>
                                        <div class="text-xs text-gray-500">Remaining: "code"</div>
                                    </div>
                                </div>

                                <div class="pl-8 border-l border-gray-700 ml-1 opacity-60 hover:opacity-100 transition-opacity">
                                    <div class="flex items-center gap-2 text-xs text-red-300">
                                        <span>try "c", "co", "cod"</span>
                                        <span class="text-red-500">❌ Not in dict</span>
                                    </div>
                                </div>

                                <div class="flex items-start gap-2 pl-8 border-l border-gray-700 ml-1">
                                    <span class="text-green-400 mt-1">4.</span>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <span>try "code"</span>
                                            <span class="bg-green-500/20 text-green-400 text-xs px-1.5 rounded">FOUND</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex items-start gap-2 pl-8 border-l border-gray-700 ml-1">
                                    <span class="text-purple-400 mt-1">5.</span>
                                    <div>
                                        <div class="font-bold text-purple-300">dfs(8) -> Returns True</div>
                                        <div class="text-xs text-gray-500">Base Case Reached! (start == len)</div>
                                    </div>
                                </div>

                                <div class="border-t border-gray-700 pt-2 mt-2">
                                    <div class="flex items-center gap-2 text-green-400">
                                        <i class="fas fa-check-circle"></i>
                                        <span class="font-bold">Result: True</span>
                                    </div>
                                    <div class="text-xs text-gray-500">Backtrack: True -> True -> True</div>
                                </div>
                            </div>
                        </details>`
                    ],
                    codeTitle: "Evolution: Recursion -> Memo -> DP",
                    code: `
##### 1. Brute Force Recursion (TLE)
# Time: O(2^N) - Exponential!
def wordBreak_Recursive(s, wordDict):
    wordSet = set(wordDict)
    
    def dfs(start):
        # Base Case: Reached end of string, valid segmentation found
        if start == len(s): 
            return True
            
        # Try every possible cut from start+1 to end
        for end in range(start + 1, len(s) + 1):
            curr_word = s[start:end] # Slicing takes O(N)
            
            # Logic: Agar current word valid hai, AND...
            # ...baki bachi hui string bhi valid hai (Recursive leap of faith)
            if curr_word in wordSet and dfs(end):
                return True
                
        return False # No valid cut found from this start
        
    return dfs(0)

##### 2. Memoization (Top-Down DP)
# Time: O(N^3) | Space: O(N)
def wordBreak_Memo(s, wordDict):
    wordSet = set(wordDict)
    memo = {} # Cache: {start_index: True/False}
    
    def dfs(start):
        if start == len(s): return True
        if start in memo: return memo[start] # Return cached answer
        
        for end in range(start + 1, len(s) + 1):
            curr_word = s[start:end]
            if curr_word in wordSet and dfs(end):
                memo[start] = True # Store result before returning
                return True
                
        memo[start] = False # Cache failure too
        return False
        
    return dfs(0)

##### 3. Iterative DP (Bottom-Up) - The Best
# Time: O(N^3) | Space: O(N)
# Logic: Convert Recursion 'start' to DP index.
# dp[i] means: Is s[0...i] valid?
def wordBreak_DP(s, wordDict):
    wordSet = set(wordDict)
    dp = [False] * (len(s) + 1)
    dp[0] = True # Empty string is always valid
    
    # Fill table from left to right
    for i in range(1, len(s) + 1):
        # Try every possible partition point 'j' before 'i'
        for j in range(i):
            # Recurrence:
            # 1. dp[j]: Kya 0 se j tak already valid hai? (Previous foundation)
            # 2. s[j:i]: Kya j se i tak current chunk dictionary mein hai?
            if dp[j] and s[j:i] in wordSet:
                dp[i] = True
                break # Ek bhi valid cut mil gaya toh bas, aage checking bekar hai
                
    return dp[len(s)]`
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
                    metrics: { time: "O(N * Sum)", space: "O(Sum)" },
                    code: `def canPartition(nums):
    total = sum(nums)
    if total % 2 != 0: return False
    target = total // 2
    
    dp = set([0])
    for n in nums:
        new_dp = set()
        for t in dp:
            if t + n == target: return True
            new_dp.add(t + n)
            new_dp.add(t)
        dp = new_dp
    return False`
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
                    metrics: { time: "O(M*N)", space: "O(M*N)" },
                    code: `def minDistance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(m + 1):
        for j in range(n + 1):
            if i == 0: dp[i][j] = j
            elif j == 0: dp[i][j] = i
            elif word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j],    # Delete
                                   dp[i][j-1],    # Insert
                                   dp[i-1][j-1])  # Replace
    return dp[m][n]`
                }
            }
        ]
    },

    heap_trie: {
        id: "heap_trie",
        title: "Heaps & Tries",
        description: "Principal Engineer DSA • Day 8",
        color: "#d97706",
        icon: "fas fa-sitemap",
        mentalModel: {
            whenToApply: [
                { label: "Top K Elements", desc: "Heap. O(N log K)." },
                { label: "Prefix Search", desc: "Trie. O(L) lookup." }
            ],
            safetyCheck: [
                { label: "K-th Largest", desc: "Use Min-Heap of size K." },
                { label: "Trie Node", desc: "Remember `is_end` flag." }
            ]
        },
        questions: [
            {
                id: "kth-largest-element-in-a-stream",
                title: "Kth Largest in Stream",
                leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["Min-Heap"],
                quiz: {
                    description: "Maintain Kth largest in streaming data. Data structure?",
                    options: ["Sort list every time", "Max-Heap", "Min-Heap of size K", "BST"],
                    correct: 2,
                    explanation: "Min-Heap of size K! The root holds the K-th largest. If new val > root, pop root and push new val. Keep top K elements in the club; root is the 'bouncer' (smallest of the top K)."
                },
                learn: {
                    metrics: { time: "O(log K)", space: "O(K)" },
                    timeExplainer: "<strong>Min-Heap:</strong><br>• Add element: <code>O(log K)</code><br>• Maintain size K<br><br><strong>Total:</strong> <code>O(log K)</code> per add",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• Heap stores exactly K elements<br>• Ignore infinite stream history<br><br><strong>Result:</strong> <code>O(K)</code>",
                    visual: "<span><strong>Visual: The VIP Room</strong><br>Room capacity K. Bouncer (Root) is the poorest VIP. <br>If new guy is richer than Bouncer, kick Bouncer out.</span>",
                    crux: "<strong>Inverse Logic:</strong> Kth Largest -> Min-Heap.<br>1. Keep size <= K.<br>2. `heapq.heappushpop` if full.",
                    trap: "<strong>Don't Heapify All:</strong> Only store K elements.",
                    dryRun: ["K=3. Heap [?, ?, ?].", "Add 5, 2, 8 -> [2, 5, 8]. Root 2 is 3rd largest.", "Add 10. 10 > 2. Pop 2. Push 10. [5, 8, 10]. Root 5 is 3rd largest."],
                    codeTitle: "Python Solution",
                    code: `class KthLargest:
    def __init__(self, k, nums):
        self.k = k
        self.heap = []
        for n in nums: self.add(n)
        
    def add(self, val):
        if len(self.heap) < self.k:
            heapq.heappush(self.heap, val)
        elif val > self.heap[0]:
            heapq.heapreplace(self.heap, val)
        return self.heap[0]`
                }
            },
            {
                id: "merge-k-sorted-lists",
                title: "Merge K Sorted Lists",
                leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["Heap"],
                quiz: {
                    description: "Merge K lists efficiently.",
                    options: ["Comparing heads one by one", "Min-Heap with (val, node)", "Merge 2 at a time", "Concatenate and sort"],
                    correct: 1,
                    explanation: "Min-Heap! Put all K heads in heap. Pop min, add to result, push next node from that list. O(N log K)."
                },
                learn: {
                    metrics: { time: "O(N log K)", space: "O(K)" },
                    timeExplainer: "<strong>Heap Merge:</strong><br>• Heap size K (one per list)<br>• Process all N nodes<br>• Push/Pop is log K<br><br><strong>Total:</strong> <code>O(N log K)</code>",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• Heap stores K nodes<br>• Output list not counted (if returning new)<br><br><strong>Result:</strong> <code>O(K)</code>",
                    visual: "<span><strong>Visual: The Race</strong><br>K runners at start line. Move the leader forward.</span>",
                    crux: "<strong>Tuple Trick:</strong> `(val, idx, node)`. Use `idx` to break ties because Python can't compare `ListNode` objects.",
                    trap: "<strong>Comparsion Crash:</strong> Nodes with same value will crash heap if you don't use a tie-breaker or override `__lt__`.",
                    dryRun: ["Heads: 1(L1), 4(L2), 2(L3). Heap: [(1, L1), (2, L3), (4, L2)].", "Pop 1. Push L1.next."],
                    codeTitle: "Python Solution",
                    code: `def mergeKLists(lists):
    pq = []
    for i, l in enumerate(lists):
        if l: heapq.heappush(pq, (l.val, i, l))
    
    dummy = curr = ListNode()
    while pq:
        val, i, node = heapq.heappop(pq)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(pq, (node.next.val, i, node.next))
            
    return dummy.next`
                }
            },
            {
                id: "implement-trie-prefix-tree",
                title: "Implement Trie",
                leetcodeUrl: "https://leetcode.com/problems/implement-trie-prefix-tree/",
                difficulty: "Must Do",
                priority: "🔴",
                tags: ["Trie"],
                quiz: {
                    description: "Data structure for fast prefix search.",
                    options: ["HashMap", "Binary Search Tree", "Trie (Prefix Tree)", "Graph"],
                    correct: 2,
                    explanation: "Trie! Nodes represent characters. Path from root spells word. Shared prefixes share nodes (Space efficient)."
                },
                learn: {
                    metrics: { time: "O(L)", space: "O(N*L)" },
                    timeExplainer: "<strong>Prefix Tree:</strong><br>• Traversal depends only on word length L<br>• Independent of total words N<br><br><strong>Total:</strong> <code>O(L)</code>",
                    spaceExplainer: "<strong>Space Analysis:</strong><br>• Worst: No common prefixes<br>• <code>N</code> words of length <code>L</code><br><br><strong>Total:</strong> <code>O(N×L)</code> nodes",
                    visual: "<span><strong>Visual: Autocomplete</strong><br>APP -> 'A' -> 'P' -> 'P'. <br>APPLE -> Extends 'P' -> 'L' -> 'E'.</span>",
                    crux: "<strong>Node Struct:</strong> `children = {}`, `is_end = False`.<br>Insert/Search: Traverse char by char.",
                    trap: "<strong>Prefix vs Word:</strong> `startWith` returns True for 'APP'. `search` returns False for 'APP' if only 'APPLE' exists.",
                    dryRun: ["Insert 'HI'. Root->H->I(end).", "Search 'H'. Root->H. No end. False.", "Starts 'H'. True."],
                    codeTitle: "Python Solution",
                    code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.isEnd = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        cur = self.root
        for c in word:
            if c not in cur.children:
                cur.children[c] = TrieNode()
            cur = cur.children[c]
        cur.isEnd = True

    def search(self, word):
        cur = self.root
        for c in word:
            if c not in cur.children: return False
            cur = cur.children[c]
        return cur.isEnd

    def startsWith(self, prefix):
        cur = self.root
        for c in prefix:
            if c not in cur.children: return False
            cur = cur.children[c]
        return True`
                }
            },
            {
                id: "maximum-xor-of-two-numbers-in-an-array",
                title: "Max XOR of Two Numbers",
                leetcodeUrl: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
                difficulty: "Good to Do",
                priority: "🟡",
                tags: ["Trie", "Bit Manipulation"],
                quiz: {
                    description: "Find max XOR of two nums in array. O(N)?",
                    options: ["Brute Force O(N²)", "Trie", "Sort", "Heap"],
                    correct: 1,
                    explanation: "Insert all numbers into a Binary Trie. For each number, try to traverse the opposite bit path to maximize XOR."
                },
                learn: {
                    metrics: { time: "O(N * 32)", space: "O(N * 32)" },
                    code: `# Trie Implementation needed`
                }
            },
            {
                id: "single-number",
                title: "Single Number",
                leetcodeUrl: "https://leetcode.com/problems/single-number/",
                difficulty: "Bonus",
                priority: "🟢",
                tags: ["Bit Manipulation"],
                quiz: {
                    description: "All nums appear twice except one. O(N) time, O(1) space?",
                    options: ["HashSet", "Sorting", "XOR all numbers", "Math"],
                    correct: 2,
                    explanation: "A ^ A = 0. A ^ 0 = A. XORing all numbers cancels out pairs, leaving the single number."
                },
                learn: {
                    metrics: { time: "O(N)", space: "O(1)" },
                    code: `def singleNumber(nums):
    res = 0
    for n in nums:
        res ^= n
    return res`
                }
            },
            {
                id: "heapify-algorithm",
                title: "Heapify Algorithm",
                difficulty: "Bonus",
                priority: "🟢",
                tags: ["Heap"],
                quiz: {
                    description: "Convert array to heap. Complexity?",
                    options: ["O(N log N)", "O(N)", "O(log N)", "O(N²)"],
                    correct: 1,
                    explanation: "O(N)! Sift-down from the last non-leaf node up to root. Lower levels have less work."
                },
                learn: {
                    metrics: { time: "O(N)", space: "O(1)" },
                    code: `import heapq
def heapify(arr):
    heapq.heapify(arr) # Linear time O(N)
    return arr`
                }
            }
        ]
    },

    backtracking: {
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
    },

    dp_concepts: {
        id: "dp_concepts",
        title: "DP Mastery: Lun Na Lun",
        description: "The Philosophy & Pattern Recognition Guide",
        color: "#8b5cf6",
        icon: "fas fa-brain",
        type: "guide", // Special flag for the renderer
        sections: [
            {
                id: "philosophy",
                title: "Philosophy",
                icon: "fas fa-lightbulb",
                content: `
                    <div class="flashcard">
                        <div class="card-header">
                            <div class="card-title">
                                <i class="fas fa-lightbulb"></i>
                                The Lun Na Lun Philosophy
                            </div>
                            <div class="badges">
                                <span class="badge badge-must" style="background:#ef4444; color:white;">CORE CONCEPT</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="big-quote" style="font-size: 1.4rem; font-weight: 600; text-align: center; padding: 30px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(34, 211, 238, 0.1)); border-radius: 12px; border: 2px solid var(--border); margin: 30px 0; line-height: 1.8;">
                                "Har element pe do options: <span class="highlight" style="color:#8b5cf6">LUN</span> (include karo) ya <span class="highlight" style="color:#8b5cf6">NA LUN</span> (skip karo)"
                            </div>
                            
                            <div class="info-box box-philosophy" style="background: rgba(139, 92, 246, 0.1); padding: 20px; border-radius: 12px; border-left: 4px solid #8b5cf6; margin: 20px 0;">
                                <h4 style="margin-bottom:10px;"><i class="fas fa-star"></i> Why This Pattern is Powerful</h4>
                                <ul class="styled-list" style="list-style:none; padding-left:0;">
                                    <li style="padding:5px 0;"><strong>Natural Thinking:</strong> Dimag naturally "should I include this?" sochta hai</li>
                                    <li style="padding:5px 0;"><strong>Universal Template:</strong> 80% DP problems mein same pattern</li>
                                    <li style="padding:5px 0;"><strong>Interview-Friendly:</strong> 5 minutes mein code likh sakte ho</li>
                                    <li style="padding:5px 0;"><strong>Consistent Complexity:</strong> States count karna easy</li>
                                </ul>
                            </div>
                            
                            <h3 style="margin: 30px 0 15px 0; color: #a78bfa;">
                                <i class="fas fa-code"></i> Universal Template (Yaad Kar Lo!)
                            </h3>
                            
                            <div class="code-block" style="background: #0f172a; border-radius: 12px; padding: 15px;">
                                <pre style="color: #e2e8f0; font-family: 'Consolas', monospace;">def dpProblem(arr, target):
    memo = {}
    
    def dfs(index, state_params):
        # Step 1: Base case
        if index >= len(arr):
            return base_value
        
        # Step 2: Check memo (CRITICAL!)
        state = (index, state_params)
        if state in memo:
            return memo[state]
        
        # Step 3: LUN (include current element)
        take = calculate_with_arr[index] + dfs(index+1, new_state)
        
        # Step 4: NA LUN (skip current element)
        skip = dfs(index+1, state_params)
        
        # Step 5: Choose best
        result = max(take, skip)
        
        # Step 6: Store and return
        memo[state] = result
        return result
    
    return dfs(0, initial_state)</pre>
                            </div>
                        </div>
                    </div>`
            },
            {
                id: "patterns",
                title: "Patterns",
                icon: "fas fa-puzzle-piece",
                content: `
                    <div class="flashcard">
                        <div class="card-header">
                            <div class="card-title">
                                <i class="fas fa-puzzle-piece"></i>
                                Pattern Recognition Framework
                            </div>
                        </div>
                        <div class="card-body">
                            <h3 style="color: #a78bfa; margin-bottom: 20px;">
                                <i class="fas fa-brain"></i> Decision Tree: Kaunsa Pattern Use Kare?
                            </h3>
                            
                            <div class="visual-area" style="text-align:center; padding:30px; background: #1e293b; border: 2px dashed #334155; border-radius: 12px;">
                                <i class="fas fa-sitemap" style="font-size:3rem; color:#8b5cf6; margin-bottom:15px;"></i>
                                <h4 style="color: #22d3ee; margin: 15px 0;">Pattern Selection Flow</h4>
                                <div style="text-align: left; max-width: 700px; margin: 20px auto; line-height: 2; font-size: 1rem;">
                                    <strong style="color: #a78bfa;">Problem aaya ↓</strong><br><br>
                                    <strong>Question: Multiple choices at each step?</strong><br>
                                    &nbsp;&nbsp;<span style="color:#8b5cf6; font-weight:bold;">YES</span> → Use <strong>Lun Na Lun</strong> (Recursive + Memo)<br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;• Examples: LIS, Knapsack, Subset Sum<br>
                                    <br>
                                    &nbsp;&nbsp;<span style="color:#8b5cf6; font-weight:bold;">NO</span> → Check dependency type:<br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<strong>Simple sequential?</strong> → Use <strong>For Loop DP</strong> (Fibonacci)<br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<strong>Grid/Matrix?</strong> → Use <strong>2D DP</strong> (Unique Paths)<br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<strong>Two strings?</strong> → Use <strong>Match/Skip</strong> (LCS)
                                </div>
                            </div>
                            
                            <h3 style="margin: 30px 0 15px 0; color: #a78bfa;">
                                <i class="fas fa-table"></i> Pattern Comparison Table
                            </h3>
                            
                            <table style="width:100%; border-collapse: collapse; margin: 20px 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                                <thead>
                                    <tr style="background: linear-gradient(135deg, #8b5cf6, #a78bfa);">
                                        <th style="padding: 16px 20px; text-align: left; color: white; font-weight: 700; font-size: 0.95rem;">Pattern Type</th>
                                        <th style="padding: 16px 20px; text-align: left; color: white; font-weight: 700; font-size: 0.95rem;">Approach</th>
                                        <th style="padding: 16px 20px; text-align: left; color: white; font-weight: 700; font-size: 0.95rem;">State</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style="background: #1e293b;">
                                        <td style="padding: 16px 20px; color: #f1f5f9; font-weight: 600; border-bottom: 1px solid #334155;">Take/Not-Take</td>
                                        <td style="padding: 16px 20px; color: #c4b5fd; font-weight: 600; border-bottom: 1px solid #334155;">Lun Na Lun</td>
                                        <td style="padding: 16px 20px; border-bottom: 1px solid #334155;"><code style="background: #0f172a; color: #7dd3fc; padding: 4px 10px; border-radius: 6px; font-family: 'Consolas', monospace;">(idx, constraints)</code></td>
                                    </tr>
                                    <tr style="background: #1e293b;">
                                        <td style="padding: 16px 20px; color: #f1f5f9; font-weight: 600; border-bottom: 1px solid #334155;">Match/Skip</td>
                                        <td style="padding: 16px 20px; color: #c4b5fd; font-weight: 600; border-bottom: 1px solid #334155;">Two Indices</td>
                                        <td style="padding: 16px 20px; border-bottom: 1px solid #334155;"><code style="background: #0f172a; color: #7dd3fc; padding: 4px 10px; border-radius: 6px; font-family: 'Consolas', monospace;">(i, j)</code></td>
                                    </tr>
                                    <tr style="background: #1e293b;">
                                        <td style="padding: 16px 20px; color: #f1f5f9; font-weight: 600;">Grid</td>
                                        <td style="padding: 16px 20px; color: #c4b5fd; font-weight: 600;">2D For Loop</td>
                                        <td style="padding: 16px 20px;"><code style="background: #0f172a; color: #7dd3fc; padding: 4px 10px; border-radius: 6px; font-family: 'Consolas', monospace;">dp[i][j]</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>`
            },
            {
                id: "complexity",
                title: "Complexity",
                icon: "fas fa-chart-line",
                content: `
                    <div class="flashcard">
                        <div class="card-header">
                            <div class="card-title">
                                <i class="fas fa-chart-line"></i>
                                Time Complexity: The Real Truth
                            </div>
                            <div class="badges">
                                <span class="badge badge-must" style="background:#ef4444; color:white;">CRITICAL</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="big-quote" style="background:rgba(245, 158, 11, 0.1); border-color:#f59e0b; padding:20px; text-align:center; border-radius:12px; margin:20px 0;">
                                <code style="font-size: 1.3em; color: #f59e0b;">Time = (Unique States) × (Work per State)</code>
                                <br><br>
                                <span style="font-size: 0.9em; color: gray;">NOT total recursive calls! Memoization changes everything!</span>
                            </div>
                            
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                <div class="info-box" style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; padding: 15px; border-radius: 8px;">
                                    <h4>❌ WITHOUT Memo</h4>
                                    <p>Exponential Time (O(2^n))</p>
                                    <p><strong>Result: TLE! ❌</strong></p>
                                </div>
                                <div class="info-box" style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981; padding: 15px; border-radius: 8px;">
                                    <h4>✅ WITH Memo</h4>
                                    <p>Polynomial Time (O(N^2) or similar)</p>
                                    <p><strong>Result: AC! ✅</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>`
            }
        ]
    },

    // ============================================
    // ARRAYS MASTERY CONCEPTS
    // ============================================
    arrays_concepts: {
        id: "arrays_concepts",
        title: "Arrays Mastery: Pattern Bible",
        description: "Sliding Window, Two Pointers, and Prefix Sum Patterns",
        color: "#6366f1",
        icon: "fas fa-layer-group",
        type: "guide",
        sections: [
            {
                id: "sliding-window",
                title: "Sliding Window",
                icon: "fas fa-window-maximize",
                content: `
                    <div class="flashcard">
                        <div class="card-header">
                            <div class="card-title">
                                <i class="fas fa-window-maximize"></i>
                                Sliding Window Pattern
                            </div>
                            <div class="badges">
                                <span class="badge badge-must" style="background:#ef4444; color:white;">CORE PATTERN</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="big-quote" style="font-size: 1.4rem; font-weight: 600; text-align: center; padding: 30px; background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(34, 211, 238, 0.1)); border-radius: 12px; border: 2px solid var(--border); margin: 30px 0; line-height: 1.8;">
                                "Jab <span style='color:#6366f1'>Contiguous Subarray/Substring</span> bole, Sliding Window Laga Do!"
                            </div>
                            
                            <h3 style="color: #818cf8; margin: 20px 0;">When to Use</h3>
                            <ul style="list-style: none; padding: 0; line-height: 2;">
                                <li>✅ Find max/min subarray of size K</li>
                                <li>✅ Longest substring with condition (unique, at most K distinct)</li>
                                <li>✅ Sum/product of subarrays</li>
                            </ul>
                            
                            <h3 style="color: #818cf8; margin: 30px 0 15px;">Fixed vs Variable Window</h3>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                <div style="background: rgba(99, 102, 241, 0.1); padding: 20px; border-radius: 12px;">
                                    <h4>Fixed Size (K)</h4>
                                    <p>Max sum of K elements</p>
                                    <code>while right < n: expand, shrink when size > K</code>
                                </div>
                                <div style="background: rgba(34, 211, 153, 0.1); padding: 20px; border-radius: 12px;">
                                    <h4>Variable Size</h4>
                                    <p>Longest valid window</p>
                                    <code>Expand right, shrink left while invalid</code>
                                </div>
                            </div>
                            
                            <h3 style="margin: 30px 0 15px; color: #818cf8;">Universal Template</h3>
                            <div class="code-block" style="background: #0f172a; border-radius: 12px; padding: 15px;">
                                <pre style="color: #e2e8f0; font-family: 'Consolas', monospace;">def sliding_window(arr):
    left = 0
    window_state = {}  # or sum, count, etc.
    result = 0
    
    for right in range(len(arr)):
        # EXPAND: Add arr[right] to window
        window_state[arr[right]] = window_state.get(arr[right], 0) + 1
        
        # SHRINK: While window is invalid
        while invalid_condition(window_state):
            window_state[arr[left]] -= 1
            if window_state[arr[left]] == 0:
                del window_state[arr[left]]
            left += 1
        
        # UPDATE: Record result
        result = max(result, right - left + 1)
    
    return result</pre>
                            </div>
                        </div>
                    </div>`
            },
            {
                id: "two-pointers",
                title: "Two Pointers",
                icon: "fas fa-arrows-alt-h",
                content: `
                    <div class="flashcard">
                        <div class="card-header">
                            <div class="card-title">
                                <i class="fas fa-arrows-alt-h"></i>
                                Two Pointers Pattern  
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="big-quote" style="font-size: 1.4rem; font-weight: 600; text-align: center; padding: 30px; background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(34, 211, 238, 0.1)); border-radius: 12px; margin: 30px 0;">
                                "Sorted Array + Pair/Triplet Problem = Two Pointers"
                            </div>
                            
                            <h3 style="color: #818cf8; margin: 20px 0; font-size: 1.3rem; font-weight: 700;">Types of Two Pointers</h3>
                            <table style="width:100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                                <thead>
                                    <tr style="background: linear-gradient(135deg, #6366f1, #818cf8);">
                                        <th style="padding: 16px 20px; text-align: left; color: white; font-weight: 700; font-size: 0.95rem;">Type</th>
                                        <th style="padding: 16px 20px; text-align: left; color: white; font-weight: 700; font-size: 0.95rem;">Use Case</th>
                                        <th style="padding: 16px 20px; text-align: left; color: white; font-weight: 700; font-size: 0.95rem;">Example</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style="background: #1e293b;">
                                        <td style="padding: 16px 20px; color: #f1f5f9; font-weight: 600; border-bottom: 1px solid #334155;">Opposite Ends</td>
                                        <td style="padding: 16px 20px; color: #a5b4fc; border-bottom: 1px solid #334155;">Sum to target</td>
                                        <td style="padding: 16px 20px; color: #94a3b8; border-bottom: 1px solid #334155;">Two Sum II, Container with Water</td>
                                    </tr>
                                    <tr style="background: #1e293b;">
                                        <td style="padding: 16px 20px; color: #f1f5f9; font-weight: 600; border-bottom: 1px solid #334155;">Same Direction</td>
                                        <td style="padding: 16px 20px; color: #a5b4fc; border-bottom: 1px solid #334155;">Merge, remove duplicates</td>
                                        <td style="padding: 16px 20px; color: #94a3b8; border-bottom: 1px solid #334155;">Merge Sorted Array</td>
                                    </tr>
                                    <tr style="background: #1e293b;">
                                        <td style="padding: 16px 20px; color: #f1f5f9; font-weight: 600;">Fast-Slow</td>
                                        <td style="padding: 16px 20px; color: #a5b4fc;">Cycle detection</td>
                                        <td style="padding: 16px 20px; color: #94a3b8;">Linked List Cycle</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            <h3 style="margin: 30px 0 15px; color: #818cf8;">3Sum Template (Anchor + Squeeze)</h3>
                            <div class="code-block" style="background: #0f172a; border-radius: 12px; padding: 15px;">
                                <pre style="color: #e2e8f0; font-family: 'Consolas', monospace;">def three_sum(nums, target):
    nums.sort()  # CRITICAL: Must sort first!
    result = []
    
    for i in range(len(nums) - 2):
        # Skip duplicates for anchor
        if i > 0 and nums[i] == nums[i-1]:
            continue
        
        left, right = i + 1, len(nums) - 1
        
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            
            if total < target:
                left += 1
            elif total > target:
                right -= 1
            else:
                result.append([nums[i], nums[left], nums[right]])
                left += 1
                while left < right and nums[left] == nums[left-1]:
                    left += 1
    
    return result</pre>
                            </div>
                        </div>
                    </div>`
            },
            {
                id: "prefix-sum",
                title: "Prefix Sum",
                icon: "fas fa-calculator",
                content: `
                    <div class="flashcard">
                        <div class="card-header">
                            <div class="card-title">
                                <i class="fas fa-calculator"></i>
                                Prefix Sum Pattern
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="big-quote" style="font-size: 1.4rem; font-weight: 600; text-align: center; padding: 30px; background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(244, 114, 182, 0.1)); border-radius: 12px; margin: 30px 0;">
                                "Range Sum Query? Precompute Prefix, Answer in O(1)!"
                            </div>
                            
                            <div style="background: rgba(99, 102, 241, 0.1); padding: 20px; border-radius: 12px; margin: 20px 0;">
                                <h4 style="color: #818cf8;">Core Idea</h4>
                                <p><code>prefix[i] = arr[0] + arr[1] + ... + arr[i]</code></p>
                                <p><code>sum(i, j) = prefix[j] - prefix[i-1]</code></p>
                            </div>
                            
                            <h3 style="color: #818cf8; margin: 20px 0;">Subarray Sum Equals K (with HashMap)</h3>
                            <p>Count subarrays with sum = K</p>
                            <p><strong>Trick:</strong> If <code>prefix[j] - prefix[i] = K</code>, then <code>prefix[i] = prefix[j] - K</code></p>
                            
                            <div class="code-block" style="background: #0f172a; border-radius: 12px; padding: 15px; margin-top: 20px;">
                                <pre style="color: #e2e8f0; font-family: 'Consolas', monospace;">def subarray_sum(nums, k):
    prefix_count = {0: 1}  # Base case
    prefix_sum = 0
    count = 0
    
    for num in nums:
        prefix_sum += num
        
        # Check if (prefix_sum - k) exists
        if prefix_sum - k in prefix_count:
            count += prefix_count[prefix_sum - k]
        
        prefix_count[prefix_sum] = prefix_count.get(prefix_sum, 0) + 1
    
    return count</pre>
                            </div>
                        </div>
                    </div>`
            }
        ]
    },

    // ============================================
    // GRAPHS MASTERY CONCEPTS
    // ============================================
    graphs_concepts: {
        id: "graphs_concepts",
        title: "Graphs Mastery: The Complete Guide",
        description: "BFS, DFS, Topological Sort, and Union-Find Patterns",
        color: "#c026d3",
        icon: "fas fa-project-diagram",
        type: "guide",
        sections: [
            {
                id: "bfs-dfs",
                title: "BFS vs DFS",
                icon: "fas fa-sitemap",
                content: `
                    <div class="flashcard">
                        <div class="card-header">
                            <div class="card-title">
                                <i class="fas fa-sitemap"></i>
                                BFS vs DFS: When to Use What
                            </div>
                            <div class="badges">
                                <span class="badge badge-must" style="background:#c026d3; color:white;">CORE PATTERN</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="big-quote" style="font-size: 1.2rem; font-weight: 600; text-align: center; padding: 30px; background: linear-gradient(135deg, rgba(192, 38, 211, 0.1), rgba(34, 211, 238, 0.1)); border-radius: 12px; margin: 30px 0;">
                                "<span style='color:#c026d3'>Shortest Path (Unweighted)</span> → BFS &nbsp;&nbsp;|&nbsp;&nbsp; <span style='color:#22d3ee'>Explore All</span> → DFS"
                            </div>
                            
                            <table style="width:100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                                <thead>
                                    <tr style="background: linear-gradient(135deg, #c026d3, #e879f9);">
                                        <th style="padding: 16px 20px; text-align: center; color: white; font-weight: 700; font-size: 1rem;">BFS</th>
                                        <th style="padding: 16px 20px; text-align: center; color: white; font-weight: 700; font-size: 1rem;">DFS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style="background: #1e293b;">
                                        <td style="padding: 16px 20px; color: #f1f5f9; text-align: center; border-bottom: 1px solid #334155;">Uses Queue (FIFO)</td>
                                        <td style="padding: 16px 20px; color: #f1f5f9; text-align: center; border-bottom: 1px solid #334155;">Uses Stack/Recursion</td>
                                    </tr>
                                    <tr style="background: #1e293b;">
                                        <td style="padding: 16px 20px; color: #f1f5f9; text-align: center; border-bottom: 1px solid #334155;">Level by Level</td>
                                        <td style="padding: 16px 20px; color: #f1f5f9; text-align: center; border-bottom: 1px solid #334155;">Go Deep First</td>
                                    </tr>
                                    <tr style="background: #1e293b;">
                                        <td style="padding: 16px 20px; color: #34d399; text-align: center; font-weight: 600; border-bottom: 1px solid #334155;">✅ Shortest Path</td>
                                        <td style="padding: 16px 20px; color: #34d399; text-align: center; font-weight: 600; border-bottom: 1px solid #334155;">✅ Cycle Detection</td>
                                    </tr>
                                    <tr style="background: #1e293b;">
                                        <td style="padding: 16px 20px; color: #34d399; text-align: center; font-weight: 600;">✅ Multi-source spread</td>
                                        <td style="padding: 16px 20px; color: #34d399; text-align: center; font-weight: 600;">✅ Backtracking</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            <h3 style="margin: 30px 0 15px; color: #c026d3;">BFS Template</h3>
                            <div class="code-block" style="background: #0f172a; border-radius: 12px; padding: 15px;">
                                <pre style="color: #e2e8f0; font-family: 'Consolas', monospace;">from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    distance = 0
    
    while queue:
        # Process level by level
        for _ in range(len(queue)):
            node = queue.popleft()
            
            for neighbor in graph[node]:
                if neighbor not in visited:
                    visited.add(neighbor)  # Mark BEFORE pushing!
                    queue.append(neighbor)
        distance += 1
    
    return distance</pre>
                            </div>
                        </div>
                    </div>`
            },
            {
                id: "topo-sort",
                title: "Topological Sort",
                icon: "fas fa-sort-amount-down",
                content: `
                    <div class="flashcard">
                        <div class="card-header">
                            <div class="card-title">
                                <i class="fas fa-sort-amount-down"></i>
                                Topological Sort (Kahn's Algorithm)
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="big-quote" style="font-size: 1.2rem; font-weight: 600; text-align: center; padding: 30px; background: linear-gradient(135deg, rgba(192, 38, 211, 0.1), rgba(245, 158, 11, 0.1)); border-radius: 12px; margin: 30px 0;">
                                "Dependencies? Prerequisites? <span style='color:#c026d3'>Topo Sort</span> is the Answer!"
                            </div>
                            
                            <h3 style="color: #c026d3; margin: 20px 0;">When to Use</h3>
                            <ul style="list-style: none; padding: 0; line-height: 2;">
                                <li>✅ Course Schedule (prerequisites)</li>
                                <li>✅ Build Order (dependencies)</li>
                                <li>✅ Alien Dictionary</li>
                                <li>✅ Task Scheduling</li>
                            </ul>
                            
                            <h3 style="margin: 30px 0 15px; color: #c026d3;">Kahn's Algorithm Template</h3>
                            <div class="code-block" style="background: #0f172a; border-radius: 12px; padding: 15px;">
                                <pre style="color: #e2e8f0; font-family: 'Consolas', monospace;">from collections import deque, defaultdict

def topo_sort(n, edges):
    graph = defaultdict(list)
    indegree = [0] * n
    
    # Build graph and indegrees
    for src, dst in edges:
        graph[src].append(dst)
        indegree[dst] += 1
    
    # Start with nodes having 0 indegree
    queue = deque([i for i in range(n) if indegree[i] == 0])
    order = []
    
    while queue:
        node = queue.popleft()
        order.append(node)
        
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)
    
    # Cycle check
    return order if len(order) == n else []</pre>
                            </div>
                        </div>
                    </div>`
            },
            {
                id: "union-find",
                title: "Union-Find",
                icon: "fas fa-users",
                content: `
                    <div class="flashcard">
                        <div class="card-header">
                            <div class="card-title">
                                <i class="fas fa-users"></i>
                                Union-Find (Disjoint Set Union)
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="big-quote" style="font-size: 1.2rem; font-weight: 600; text-align: center; padding: 30px; background: linear-gradient(135deg, rgba(192, 38, 211, 0.1), rgba(52, 211, 153, 0.1)); border-radius: 12px; margin: 30px 0;">
                                "Connectivity? Grouping? Components? <span style='color:#34d399'>Union-Find!</span>"
                            </div>
                            
                            <h3 style="color: #c026d3; margin: 20px 0;">When to Use</h3>
                            <ul style="list-style: none; padding: 0; line-height: 2;">
                                <li>✅ Number of connected components</li>
                                <li>✅ Detect cycle in undirected graph</li>
                                <li>✅ Friends in network</li>
                                <li>✅ Kruskal's MST</li>
                            </ul>
                            
                            <h3 style="margin: 30px 0 15px; color: #c026d3;">DSU Template (with Path Compression + Rank)</h3>
                            <div class="code-block" style="background: #0f172a; border-radius: 12px; padding: 15px;">
                                <pre style="color: #e2e8f0; font-family: 'Consolas', monospace;">class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n  # Number of components
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False  # Already connected
        
        # Union by rank
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        
        self.count -= 1
        return True</pre>
                            </div>
                        </div>
                    </div>`
            }
        ]
    },

    // ============================================
    // TREES MASTERY CONCEPTS
    // ============================================
    trees_concepts: {
        id: "trees_concepts",
        title: "Trees Mastery: The Recursion Bible",
        description: "DFS, BFS, Path Problems, and Tree Construction Patterns",
        color: "#16a34a",
        icon: "fas fa-tree",
        type: "guide",
        sections: [
            {
                id: "recursion-patterns",
                title: "Recursion Patterns",
                icon: "fas fa-sync",
                content: `
                    <div class="flashcard">
                        <div class="card-header">
                            <div class="card-title">
                                <i class="fas fa-sync"></i>
                                Tree Recursion: The Leap of Faith
                            </div>
                            <div class="badges">
                                <span class="badge badge-must" style="background:#16a34a; color:white;">CORE PATTERN</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="big-quote" style="font-size: 1.4rem; font-weight: 600; text-align: center; padding: 30px; background: linear-gradient(135deg, rgba(22, 163, 74, 0.1), rgba(34, 211, 238, 0.1)); border-radius: 12px; margin: 30px 0; line-height: 1.8;">
                                "Trust that <span style='color:#16a34a'>solve(root.left)</span> and <span style='color:#16a34a'>solve(root.right)</span> work perfectly!"
                            </div>
                            
                            <h3 style="color: #16a34a; margin: 20px 0;">The Pattern</h3>
                            <ol style="line-height: 2;">
                                <li><strong>Base Case:</strong> <code>if not root: return base_value</code></li>
                                <li><strong>Recurse Left:</strong> <code>left_result = solve(root.left)</code></li>
                                <li><strong>Recurse Right:</strong> <code>right_result = solve(root.right)</code></li>
                                <li><strong>Combine:</strong> <code>return combine(root.val, left_result, right_result)</code></li>
                            </ol>
                            
                            <h3 style="margin: 30px 0 15px; color: #16a34a;">Universal Template</h3>
                            <div class="code-block" style="background: #0f172a; border-radius: 12px; padding: 15px;">
                                <pre style="color: #e2e8f0; font-family: 'Consolas', monospace;">def solve_tree(root):
    # 1. Base Case
    if not root:
        return 0  # or None, True, etc.
    
    # 2. LEAP OF FAITH: Trust left/right work!
    left_result = solve_tree(root.left)
    right_result = solve_tree(root.right)
    
    # 3. Combine at current node
    return root.val + left_result + right_result</pre>
                            </div>
                            
                            <h3 style="margin: 30px 0 15px; color: #16a34a; font-size: 1.3rem; font-weight: 700;">Common Examples</h3>
                            <table style="width:100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                                <thead>
                                    <tr style="background: linear-gradient(135deg, #16a34a, #22c55e);">
                                        <th style="padding: 16px 20px; text-align: left; color: white; font-weight: 700; font-size: 0.95rem; letter-spacing: 0.5px;">Problem</th>
                                        <th style="padding: 16px 20px; text-align: left; color: white; font-weight: 700; font-size: 0.95rem; letter-spacing: 0.5px;">Combine Logic</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style="background: #1e293b;">
                                        <td style="padding: 16px 20px; color: #f1f5f9; font-weight: 600; font-size: 1rem; border-bottom: 1px solid #334155;">Tree Height</td>
                                        <td style="padding: 16px 20px; border-bottom: 1px solid #334155;"><code style="background: #0f172a; color: #7dd3fc; padding: 6px 12px; border-radius: 6px; font-family: 'Consolas', 'Monaco', monospace; font-size: 0.95rem; font-weight: 600;">1 + max(left, right)</code></td>
                                    </tr>
                                    <tr style="background: #1e293b;">
                                        <td style="padding: 16px 20px; color: #f1f5f9; font-weight: 600; font-size: 1rem; border-bottom: 1px solid #334155;">Tree Sum</td>
                                        <td style="padding: 16px 20px; border-bottom: 1px solid #334155;"><code style="background: #0f172a; color: #7dd3fc; padding: 6px 12px; border-radius: 6px; font-family: 'Consolas', 'Monaco', monospace; font-size: 0.95rem; font-weight: 600;">root.val + left + right</code></td>
                                    </tr>
                                    <tr style="background: #1e293b;">
                                        <td style="padding: 16px 20px; color: #f1f5f9; font-weight: 600; font-size: 1rem; border-bottom: 1px solid #334155;">Count Nodes</td>
                                        <td style="padding: 16px 20px; border-bottom: 1px solid #334155;"><code style="background: #0f172a; color: #7dd3fc; padding: 6px 12px; border-radius: 6px; font-family: 'Consolas', 'Monaco', monospace; font-size: 0.95rem; font-weight: 600;">1 + left + right</code></td>
                                    </tr>
                                    <tr style="background: #1e293b;">
                                        <td style="padding: 16px 20px; color: #f1f5f9; font-weight: 600; font-size: 1rem;">Is Balanced?</td>
                                        <td style="padding: 16px 20px;"><code style="background: #0f172a; color: #7dd3fc; padding: 6px 12px; border-radius: 6px; font-family: 'Consolas', 'Monaco', monospace; font-size: 0.95rem; font-weight: 600;">abs(left - right) &lt;= 1</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>`
            },
            {
                id: "path-problems",
                title: "Path Problems",
                icon: "fas fa-route",
                content: `
                    <div class="flashcard">
                        <div class="card-header">
                            <div class="card-title">
                                <i class="fas fa-route"></i>
                                Path Problems: Global vs Local
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="big-quote" style="font-size: 1.2rem; font-weight: 600; text-align: center; padding: 30px; background: linear-gradient(135deg, rgba(22, 163, 74, 0.1), rgba(244, 114, 182, 0.1)); border-radius: 12px; margin: 30px 0;">
                                "Split at node (root + left + right) vs Flow through node (root + max(left, right))"
                            </div>
                            
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                                <div style="background: rgba(22, 163, 74, 0.1); padding: 20px; border-radius: 12px; border-left: 4px solid #16a34a;">
                                    <h4 style="color: #16a34a;">Global (The Arch)</h4>
                                    <p>Path ENDS at this node</p>
                                    <p>Used for: Max Path Sum</p>
                                    <code>global_max = max(global, root + left + right)</code>
                                </div>
                                <div style="background: rgba(99, 102, 241, 0.1); padding: 20px; border-radius: 12px; border-left: 4px solid #6366f1;">
                                    <h4 style="color: #6366f1;">Local (The Flow)</h4>
                                    <p>Path CONTINUES upward</p>
                                    <p>Returned to parent</p>
                                    <code>return root + max(left, right)</code>
                                </div>
                            </div>
                            
                            <h3 style="margin: 30px 0 15px; color: #16a34a;">Max Path Sum Template</h3>
                            <div class="code-block" style="background: #0f172a; border-radius: 12px; padding: 15px;">
                                <pre style="color: #e2e8f0; font-family: 'Consolas', monospace;">def maxPathSum(root):
    global_max = float('-inf')
    
    def dfs(node):
        nonlocal global_max
        if not node:
            return 0
        
        # Get best paths from children (clamp negatives to 0)
        left = max(dfs(node.left), 0)
        right = max(dfs(node.right), 0)
        
        # GLOBAL: Path that SPLITS here (arch)
        global_max = max(global_max, node.val + left + right)
        
        # LOCAL: Path that FLOWS upward (return to parent)
        return node.val + max(left, right)
    
    dfs(root)
    return global_max</pre>
                            </div>
                        </div>
                    </div>`
            },
            {
                id: "traversals",
                title: "Traversals",
                icon: "fas fa-stream",
                content: `
                    <div class="flashcard">
                        <div class="card-header">
                            <div class="card-title">
                                <i class="fas fa-stream"></i>
                                Tree Traversals: When to Use What
                            </div>
                        </div>
                        <div class="card-body">
                            <table style="width:100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3); margin: 20px 0;">
                                <thead>
                                    <tr style="background: linear-gradient(135deg, #16a34a, #22c55e);">
                                        <th style="padding: 16px 20px; text-align: left; color: white; font-weight: 700; font-size: 0.95rem;">Traversal</th>
                                        <th style="padding: 16px 20px; text-align: left; color: white; font-weight: 700; font-size: 0.95rem;">Order</th>
                                        <th style="padding: 16px 20px; text-align: left; color: white; font-weight: 700; font-size: 0.95rem;">Use Case</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style="background: #1e293b;">
                                        <td style="padding: 16px 20px; color: #4ade80; font-weight: 700; border-bottom: 1px solid #334155;">Preorder</td>
                                        <td style="padding: 16px 20px; color: #f1f5f9; border-bottom: 1px solid #334155;">Root → Left → Right</td>
                                        <td style="padding: 16px 20px; color: #94a3b8; border-bottom: 1px solid #334155;">Serialize tree, copy tree</td>
                                    </tr>
                                    <tr style="background: #1e293b;">
                                        <td style="padding: 16px 20px; color: #4ade80; font-weight: 700; border-bottom: 1px solid #334155;">Inorder</td>
                                        <td style="padding: 16px 20px; color: #f1f5f9; border-bottom: 1px solid #334155;">Left → Root → Right</td>
                                        <td style="padding: 16px 20px; color: #94a3b8; border-bottom: 1px solid #334155;">BST sorted order</td>
                                    </tr>
                                    <tr style="background: #1e293b;">
                                        <td style="padding: 16px 20px; color: #4ade80; font-weight: 700; border-bottom: 1px solid #334155;">Postorder</td>
                                        <td style="padding: 16px 20px; color: #f1f5f9; border-bottom: 1px solid #334155;">Left → Right → Root</td>
                                        <td style="padding: 16px 20px; color: #94a3b8; border-bottom: 1px solid #334155;">Delete tree, height calc</td>
                                    </tr>
                                    <tr style="background: #1e293b;">
                                        <td style="padding: 16px 20px; color: #4ade80; font-weight: 700;">Level Order</td>
                                        <td style="padding: 16px 20px; color: #f1f5f9;">BFS (Queue)</td>
                                        <td style="padding: 16px 20px; color: #94a3b8;">Level-wise processing</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            <h3 style="margin: 30px 0 15px; color: #16a34a;">Level Order (BFS) Template</h3>
                            <div class="code-block" style="background: #0f172a; border-radius: 12px; padding: 15px;">
                                <pre style="color: #e2e8f0; font-family: 'Consolas', monospace;">from collections import deque

def levelOrder(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level = []
        for _ in range(len(queue)):  # Process one level
            node = queue.popleft()
            level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(level)
    
    return result</pre>
                            </div>
                        </div>
                    </div>`
            }
        ]
    }
};

if (typeof module !== 'undefined') {
    module.exports = prepData;
}
