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
            { label: "🔍 Sorted Data", desc: "Array sorted? → Classic Binary Search" },
            { label: "📈 Monotonic Function", desc: "F(x) goes F,F,F,T,T,T? → Binary Search on Answer" },
            { label: "🔄 Rotated Array", desc: "Sorted but rotated? → Find which half is sorted" },
            { label: "⚖️ Min-Max / Max-Min", desc: "Optimize extremes? → BS on Answer + Greedy check" },
            { label: "✂️ Partition", desc: "Split 2 arrays optimally? → BS on smaller + auto-calc other" }
        ],
        patterns: [
            { algo: "Classic BS", use: "Find target in sorted array", time: "O(log N)", space: "O(1)", template: "while l<=r: mid=(l+r)//2" },
            { algo: "Rotated Array BS", use: "Search in rotated sorted", time: "O(log N)", space: "O(1)", template: "Find sorted half, check target range" },
            { algo: "BS on Answer", use: "Min speed, max distance", time: "O(N log M)", space: "O(1)", template: "Search [lo, hi], check if feasible(mid)" },
            { algo: "Min-Max / Max-Min", use: "Aggressive Cows, Books", time: "O(N log D)", space: "O(1)", template: "BS distance + greedy placement" },
            { algo: "Partition BS", use: "Median of 2 sorted", time: "O(log min(m,n))", space: "O(1)", template: "Cut smaller, calc j automatically" }
        ],
        decisionTree: `
<div style="background:#1e293b; padding:25px; border-radius:16px; margin:15px 0; border:1px solid rgba(255,255,255,0.1);">
<h4 style="color:#a78bfa; margin-bottom:20px; text-align:center; font-size:1.1rem;">🧠 Binary Search Pattern Recognition</h4>
<div style="font-family:monospace; font-size:0.85rem; line-height:1.8;">
<pre style="color:#e2e8f0; text-align:left; margin:0;">
                 ┌──────────────────────────┐
                 │ "What are you searching?"│
                 └────────────┬─────────────┘
                              │
       ┌──────────────────────┼──────────────────────┐
       ▼                      ▼                      ▼
┌─────────────┐        ┌─────────────┐        ┌─────────────┐
│ TARGET in   │        │ ANSWER/     │        │ PARTITION   │
│ sorted array│        │ SPEED/DIST  │        │ 2 arrays    │
└──────┬──────┘        └──────┬──────┘        └──────┬──────┘
       │                      │                      │
       ▼                      ▼                      ▼
 "Is it rotated?"       "Can you check         "Use smaller for
       │               if answer works?"         BS, calc other"
       │                      │                      │
  ┌────┴────┐                 ▼                      ▼
  ▼         ▼         ┌─────────────┐        ┌─────────────┐
┌─────┐ ┌───────┐     │ BS on range │        │ Median of   │
│ NO  │ │  YES  │     │ [lo, hi]    │        │ 2 sorted    │
│     │ │       │     │ is_feasible │        │ arrays      │
└──┬──┘ └───┬───┘     └─────────────┘        └─────────────┘
   │        │
   ▼        ▼
Classic  Rotated
  BS       BS
         ┌────────────────────┐
         │ nums[l]==nums[m]== │
         │ nums[r]? → Shrink! │
         └────────────────────┘
</pre>
</div>
</div>`,
        codeTemplates: `
<div style="background:#0f172a; padding:20px; border-radius:12px; margin:15px 0;">
<h4 style="color:#10b981; margin-bottom:15px;">📝 Binary Search Templates</h4>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
1️⃣ Classic Binary Search
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2  # Prevent overflow!
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
</pre>
</details>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
2️⃣ BS on Answer (Koko Bananas)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def minEatingSpeed(piles, h):
    def can_finish(speed):
        return sum((p + speed - 1) // speed for p in piles) <= h
    
    left, right = 1, max(piles)
    while left <= right:
        mid = left + (right - left) // 2
        if can_finish(mid):
            right = mid - 1  # Try slower
        else:
            left = mid + 1   # Need faster
    return left
</pre>
</details>

<details style="margin-bottom:15px;">
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
3️⃣ Rotated Array Search
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if nums[mid] == target: return True
        # Handle duplicates (fog)
        if nums[low] == nums[mid] == nums[high]:
            low += 1; high -= 1
            continue
        # Left sorted
        if nums[low] <= nums[mid]:
            if nums[low] <= target < nums[mid]:
                high = mid - 1
            else:
                low = mid + 1
        # Right sorted
        else:
            if nums[mid] < target <= nums[high]:
                low = mid + 1
            else:
                high = mid - 1
    return False
</pre>
</details>

<details>
<summary style="cursor:pointer; color:#fbbf24; font-weight:bold; padding:10px; background:#1e293b; border-radius:8px;">
4️⃣ Maximize Minimum (Aggressive Cows)
</summary>
<pre style="color:#a5b4fc; padding:15px; background:#1e1b4b; border-radius:8px; margin-top:10px; font-size:0.85rem;">
def aggressiveCows(stalls, k):
    stalls.sort()  # MUST SORT!
    def can_place(min_dist):
        count, last = 1, stalls[0]
        for s in stalls[1:]:
            if s - last >= min_dist:
                count += 1
                last = s
        return count >= k
    
    left, right, ans = 1, stalls[-1] - stalls[0], 1
    while left <= right:
        mid = left + (right - left) // 2
        if can_place(mid):
            ans = mid
            left = mid + 1  # Try larger
        else:
            right = mid - 1
    return ans
</pre>
</details>
</div>`,
        safetyCheck: [
            { label: "⚠️ Overflow!", desc: "<code>mid = left + (right - left) // 2</code> NOT <code>(left + right) // 2</code>" },
            { label: "🔄 Infinite Loop!", desc: "If <code>high = mid</code>, use <code>while left < right</code> not <code><=</code>" },
            { label: "🌫️ Duplicates Fog!", desc: "When <code>nums[l]==nums[m]==nums[r]</code>, shrink: <code>l++, r--</code>" },
            { label: "📊 Sort First!", desc: "Aggressive Cows: <code>stalls.sort()</code> before BS!" },
            { label: "🎯 Answer vs Index!", desc: "BS on Answer: return <code>left</code> (answer). Classic: return <code>mid</code> (index)" },
            { label: "♾️ Virtual Infinity!", desc: "Partition problems: Use <code>float('-inf')</code> and <code>float('inf')</code> for edges" }
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
                explanation: "Duplicates create 'fog'! When all three equal, can't tell which side sorted. Shrink: low++, high--. Worst case O(n)!"
            },
            learn: {
                quickAlgo: [
                    "left_pointer, right_pointer = 0, len(nums)-1",
                    "while left_pointer <= right_pointer:            # ⚠️ <= kyunki single element bhi check",
                    "    mid = left_pointer + (right_pointer - left_pointer)//2",
                    "    if nums[mid] == target: return True",
                    "    if nums[left_pointer] == nums[mid] == nums[right_pointer]:  # 🌫️ FOG!",
                    "        left_pointer += 1; right_pointer -= 1; continue",
                    "    if nums[left_pointer] <= nums[mid]:         # Left sorted",
                    "        if nums[left_pointer] <= target < nums[mid]: right_pointer = mid - 1",
                    "        else: left_pointer = mid + 1",
                    "    else:                                        # Right sorted",
                    "        if nums[mid] < target <= nums[right_pointer]: left_pointer = mid + 1",
                    "        else: right_pointer = mid - 1",
                    "return False"
                ],
                metrics: { time: "Avg O(log N)", space: "O(1)" },
                timeExplainer: "<strong>Time:</strong><br>• Best/Avg: <code>O(log N)</code><br>• Worst (all duplicates): <code>O(N)</code>",
                spaceExplainer: "<strong>Space: O(1)</strong><br>Only pointers, no extra space.",
                visual: `<span><strong>Visual: The Foggy Cliff</strong><br>
<pre style="background:none; border:none; padding:10px; font-size:0.8rem; line-height:1.2;">
Normal Rotated:          With Duplicates (FOG):
    /|                     ???
   / |___                 1 1 1 0 1 1 1
  /      |                Which side sorted? 🤷
         
FOG CONDITION: nums[L] == nums[mid] == nums[R]
ACTION: Shrink! L++, R--
</pre></span>`,
                crux: "<strong>Two steps:</strong><br>1. Clear FOG first (if L==mid==R)<br>2. Then check which side is sorted<br><br><strong>Sorted side check:</strong> <code>nums[left] <= nums[mid]</code> → Left sorted",
                strategy: "Check target found → Clear fog → Find sorted half → Check if target in range → Move pointer",
                trap: "<strong>⚠️ Range checks carefully!</strong><br>Left sorted: <code>nums[L] <= target < nums[mid]</code><br>Right sorted: <code>nums[mid] < target <= nums[R]</code><br><br><code>mid</code> already checked agar equal hota toh return ho chuka!",
                dryRun: [
                    "<strong>Input:</strong> [1, 0, 1, 1, 1], target = 0",
                    "<strong>Init:</strong> L=0, R=4",
                    "mid=2: nums[2]=1. Not target. nums[0]=nums[2]=nums[4]=1 → <strong>FOG!</strong> L++, R--",
                    "L=1, R=3, mid=2: nums[2]=1. Left sorted (nums[1]=0 <= nums[2]=1)? NO!",
                    "Right sorted: 0 < 0 <= 1? NO. R = mid-1 = 1",
                    "L=1, R=1, mid=1: nums[1]=0 == target → <strong>Return True</strong>"
                ],
                codeTitle: "Python Solution (Clean)",
                code: `def search(nums, target):
    left_pointer = 0
    right_pointer = len(nums) - 1

    while left_pointer <= right_pointer:
        mid = left_pointer + (right_pointer - left_pointer) // 2

        if nums[mid] == target:
            return True
        
        # FOG hatao - can't determine sorted side
        if nums[left_pointer] == nums[mid] == nums[right_pointer]:
            left_pointer += 1
            right_pointer -= 1
            continue
        
        # Check which side is sorted
        if nums[left_pointer] <= nums[mid]:  # Left sorted
            if nums[left_pointer] <= target < nums[mid]:
                right_pointer = mid - 1
            else:
                left_pointer = mid + 1
        else:  # Right sorted
            if nums[mid] < target <= nums[right_pointer]:
                left_pointer = mid + 1
            else:
                right_pointer = mid - 1
    
    return False`,
                codeDetailed: `def search(nums, target):
    """
    Search in Rotated Sorted Array II (with duplicates)
    
    STRATEGY:
    1. Clear FOG if nums[L] == nums[mid] == nums[R]
    2. Find which side is sorted
    3. Check if target in sorted range
    
    WHY <= in while?
    - Single element case: L==R, still need to check!
    """
    
    left_pointer = 0
    right_pointer = len(nums) - 1

    while left_pointer <= right_pointer:
        mid = left_pointer + (right_pointer - left_pointer) // 2

        if nums[mid] == target:
            return True
        
        # STEP 1: Clear the FOG
        # When all three equal, can't tell which side sorted!
        if nums[left_pointer] == nums[mid] == nums[right_pointer]:
            left_pointer += 1
            right_pointer -= 1
            continue
        
        # STEP 2: Find sorted half
        if nums[left_pointer] <= nums[mid]:
            # LEFT side is sorted
            # Target in [L, mid)?
            if nums[left_pointer] <= target < nums[mid]:
                right_pointer = mid - 1
            else:
                left_pointer = mid + 1
        else:
            # RIGHT side is sorted
            # Target in (mid, R]?
            if nums[mid] < target <= nums[right_pointer]:
                left_pointer = mid + 1
            else:
                right_pointer = mid - 1
    
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
                explanation: "BS on Answer! Search speed range [1, max(piles)]. If hours <= h, try slower. Else go faster."
            },
            learn: {
                quickAlgo: [
                    "left_pointer = 1                               # Ek to min khayega koko",
                    "right_pointer = max(piles)                     # Atleast 1 to khayega hi",
                    "result = right_pointer",
                    "while left_pointer <= right_pointer:",
                    "    koko_current_speed = (left_pointer + right_pointer) // 2",
                    "    hours_took = 0",
                    "    for pile in piles:",
                    "        hours_took += (pile + koko_current_speed - 1) // koko_current_speed",
                    "    if hours_took <= hours:                    # ✅ Time mein hogaya!",
                    "        result = koko_current_speed; right_pointer = koko_current_speed - 1",
                    "    else:                                       # ❌ Time zyada laga",
                    "        left_pointer = koko_current_speed + 1",
                    "return result"
                ],
                metrics: { time: "O(N log M)", space: "O(1)" },
                timeExplainer: "<strong>Time: O(N log M)</strong><br>Binary search (log M) × hours calc (N).",
                spaceExplainer: "<strong>Space: O(1)</strong><br>Only pointers, no extra space.",
                visual: `<span><strong>Visual: Speed vs Hours (Inverse)</strong><br>
<pre style="background:none; border:none; padding:10px; font-size:0.8rem; line-height:1.2;">
Hours
  ^
  |  *
  |    *
  |      *_____ h (target)
  |            *
  +--------------> Speed
     1        max

Find MINIMUM speed where hours <= h
</pre></span>`,
                crux: "<strong>BS on ANSWER!</strong><br>Search space: <code>[1, max(piles)]</code><br><br><strong>Decision:</strong><br>• hours <= h → Store result, try slower<br>• hours > h → Need faster speed",
                strategy: "For each speed, calculate total hours. Binary search for minimum valid speed.",
                trap: "<strong>Ceiling division without math.ceil:</strong><br><code>(pile + speed - 1) // speed</code><br><br>Faster than <code>math.ceil(pile/speed)</code>!",
                dryRun: [
                    "<strong>Input:</strong> piles=[3, 6, 7, 11], hours=8",
                    "<strong>Init:</strong> left=1, right=11, result=11",
                    "speed=6: hours_took = 1+1+2+2 = 6 <= 8 ✅ result=6, right=5",
                    "speed=3: hours_took = 1+2+3+4 = 10 > 8 ❌ left=4",
                    "speed=4: hours_took = 1+2+2+3 = 8 <= 8 ✅ result=4, right=3",
                    "left=4 > right=3 → <strong>Return 4</strong>"
                ],
                codeTitle: "Python Solution (Clean)",
                code: `def koko(piles, hours):
    # Saaf seedhi baat - Koko ko help karo kele khane mein
    # Take wo sare kele kha le saans lete lete 🍌
    
    left_pointer = 1            # Ek to min khayega koko
    right_pointer = max(piles)  # Atleast 1 to khayega hi
    result = right_pointer
    
    while left_pointer <= right_pointer:
        # Ab speed try karte hain
        koko_current_speed = left_pointer + (right_pointer - left_pointer) // 2
        
        # Check karo kitna time lagta hai is speed pe
        hours_took = 0
        for pile in piles:
            hours_took += (pile + koko_current_speed - 1) // koko_current_speed
        
        if hours_took <= hours:  # Time mein ho gaya!
            result = koko_current_speed
            right_pointer = koko_current_speed - 1  # Aur slow try karo
        else:  # Time zyada lag raha
            left_pointer = koko_current_speed + 1  # Speed badhao
    
    return result`,
                codeDetailed: `def koko(piles, hours):
    """
    Koko Eating Bananas - BS on Answer
    
    Saaf seedhi baat:
    - Koko ko help karo minimum speed dhundhne mein
    - Jisse wo hours ke andar sare kele kha le
    
    CEILING DIVISION TRICK:
    (pile + speed - 1) // speed = ceil(pile / speed)
    """
    
    left_pointer = 1
    right_pointer = max(piles)
    result = right_pointer
    
    while left_pointer <= right_pointer:
        koko_current_speed = left_pointer + (right_pointer - left_pointer) // 2
        
        # Kitna time lagega is speed pe?
        hours_took = 0
        for pile in piles:
            hours_took += (pile + koko_current_speed - 1) // koko_current_speed
        
        if hours_took <= hours:
            # Time mein ho gaya! Store karo, aur slow try karo
            result = koko_current_speed
            right_pointer = koko_current_speed - 1
        else:
            # Time zyada lag raha, speed badhao
            left_pointer = koko_current_speed + 1
    
    return result`
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
                explanation: "SORT + BS on Answer! Sort stalls, then binary search on distance. Greedy check for placing."
            },
            learn: {
                quickAlgo: [
                    "stalls.sort()                               # Pehle line mein khada kar sabko",
                    "left_pointer = 1                            # Ek to minimum door hongi",
                    "right_pointer = stalls[-1] - stalls[0]      # Max door = first se last tak",
                    "result = 0",
                    "while left_pointer <= right_pointer:",
                    "    cow_ki_doori = (left_pointer + right_pointer) // 2",
                    "    if can_place_cows(stalls, cows, cow_ki_doori):  # ✅ Sab fit ho gayi?",
                    "        result = cow_ki_doori                # Ye answer ho sakta hai",
                    "        left_pointer = cow_ki_doori + 1      # 💡 Aur door try karo",
                    "    else:                                     # ❌ Fit nahi ho rahi",
                    "        right_pointer = cow_ki_doori - 1     # Distance kam karo",
                    "return result"
                ],
                metrics: { time: "O(N log D)", space: "O(1)" },
                timeExplainer: "<strong>Time: O(N log D)</strong><br>Sort: O(N log N) + BS (log D) × Greedy (N).",
                spaceExplainer: "<strong>Space: O(1)</strong><br>Only pointers, no extra space.",
                visual: `<span><strong>Visual: Cows ko Door Door Rakhna Hai! 🐄</strong><br>
<pre style="background:none; border:none; padding:10px; font-size:0.8rem; line-height:1.2;">
Stalls: [1, 2, 4, 8, 9]   Cows: 3

Try distance = 3:
  1--2--4-----8--9
  🐄     🐄     🐄
  ├──3──┤├──4──┤
  Sab fit! ✅ Aur door try karo!

Try distance = 4:
  1--2--4-----8--9
  🐄           🐄 (sirf 2 fit hui)
  Teesri kahan rakhe? ❌ Distance kam karo
</pre></span>`,
                crux: "<strong>Pyari Cows ko Door Door Rakhna Hai!</strong><br>1. Sort stalls (line mein khada kar)<br>2. BS on distance<br>3. Greedy: pehli cow rakh, next tab jab gap >= min_dist",
                strategy: "Binary search + Greedy validation. Fit ho gayi? Aur door try. Nahi hui? Paas karo.",
                trap: "<strong>⚠️ SORT BHOOL GAYA?</strong><br>Bina sort ke greedy kaam nahi karega. Galat answer aayega!",
                dryRun: [
                    "<strong>Input:</strong> stalls=[1, 2, 8, 4, 9], cows=3 🐄🐄🐄",
                    "<strong>Sort pehle:</strong> [1, 2, 4, 8, 9]",
                    "<strong>Init:</strong> left=1, right=8, result=0",
                    "distance=4: 🐄@1, next@8, count=2. ❌ Teesri kahan? right=3",
                    "distance=2: 🐄@1, 🐄@4, 🐄@8. count=3 ✅ result=2, left=3",
                    "distance=3: 🐄@1, 🐄@4, 🐄@8. count=3 ✅ result=3, left=4",
                    "left=4 > right=3 → <strong>Return 3</strong>"
                ],
                codeTitle: "Python Solution (Clean)",
                code: `def aggressive_cows(stalls, cows):
    # Pyari cows ko door door rakhna hai
    # Taake wo ek dusre se ladte na rahe 🐄💢🐄
    
    stalls.sort()  # Pehle line mein khada kar sabko
    
    left_pointer = 1              # Minimum 1 distance to hogi
    right_pointer = stalls[-1] - stalls[0]  # Max = first se last
    result = 0
    
    while left_pointer <= right_pointer:
        # Ye distance try karte hain
        cow_ki_doori = left_pointer + (right_pointer - left_pointer) // 2
        
        if can_place_cows(stalls, cows, cow_ki_doori):
            # Sab cows fit ho gayi! Store karo
            result = cow_ki_doori
            left_pointer = cow_ki_doori + 1  # Aur door try karo
        else:
            # Fit nahi ho rahi, distance kam karo
            right_pointer = cow_ki_doori - 1
    
    return result


def can_place_cows(stalls, cows, min_dist):
    # Greedy: pehli cow pehle stall pe, fir jahan gap mile wahan
    
    count = 1  # Pehli cow to rakh di
    last_cow_position = stalls[0]
    
    for i in range(1, len(stalls)):
        if stalls[i] - last_cow_position >= min_dist:
            # Itni door hai? Cow rakh do! 🐄
            count += 1
            last_cow_position = stalls[i]
            
            if count == cows:  # Sab rakh di!
                return True
    
    return False  # Sab nahi rakh paaye 😢`,
                codeDetailed: `def aggressive_cows(stalls, cows):
    """
    Aggressive Cows - Pyari Cows ko Door Door Rakhna Hai!
    
    Ye cows aggressive hain, ek dusre se ladti hain
    Toh sabse door door rakhna hai taake peace rahe 🐄☮️🐄
    
    STRATEGY:
    1. Sort stalls (line mein khada kar)
    2. BS on distance [1, max-min]
    3. Greedy check: can we place all cows?
    """
    
    stalls.sort()
    
    left_pointer = 1
    right_pointer = stalls[-1] - stalls[0]
    result = 0
    
    while left_pointer <= right_pointer:
        cow_ki_doori = left_pointer + (right_pointer - left_pointer) // 2
        
        if can_place_cows(stalls, cows, cow_ki_doori):
            result = cow_ki_doori
            left_pointer = cow_ki_doori + 1
        else:
            right_pointer = cow_ki_doori - 1
    
    return result


def can_place_cows(stalls, cows, min_dist):
    """Greedy: ek ek karke cow rakho, gap check karo"""
    count = 1
    last_cow_position = stalls[0]
    
    for i in range(1, len(stalls)):
        if stalls[i] - last_cow_position >= min_dist:
            count += 1
            last_cow_position = stalls[i]
            if count == cows:
                return True
    
    return False`
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
                quickAlgo: [
                    "A, B = nums1, nums2",
                    "total = len(A) + len(B); half = total // 2",
                    "if len(A) > len(B): A, B = B, A    # 🎯 BS on smaller array",
                    "L, R = 0, len(A)-1",
                    "while True:",
                    "    i = (L + R) // 2               # ⚡ A's partition",
                    "    j = half - i - 2               # 🔄 B's partition",
                    "    Aleft = A[i] if i >= 0 else float('-inf')",
                    "    Aright = A[i+1] if i+1 < len(A) else float('inf')",
                    "    Bleft = B[j] if j >= 0 else float('-inf')",
                    "    Bright = B[j+1] if j+1 < len(B) else float('inf')",
                    "    if Aleft <= Bright and Bleft <= Aright: # ✅ Valid Partition",
                    "        if total % 2: return min(Aright, Bright)",
                    "        else: return (max(Aleft, Bleft) + min(Aright, Bright)) / 2",
                    "    elif Aleft > Bright: R = i - 1 # 💡 A too big, move left",
                    "    else: L = i + 1                # 💡 A too small, move right"
                ],
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
