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
}
