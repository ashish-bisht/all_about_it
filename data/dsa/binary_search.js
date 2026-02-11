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
                visual: `<div style="font-family:monospace; font-size:0.85rem;">
                    <strong style="color:#ef4444;">Rotated BS: "The Foggy Cliff"</strong>
                    <div style="background:#1e293b; padding:16px; border-radius:10px; margin:12px 0;">
                        <div style="display:flex; gap:20px; justify-content:center; flex-wrap:wrap;">
                            <div style="text-align:center;">
                                <div style="color:#4ade80; font-size:0.75rem; margin-bottom:6px;">Normal Rotated</div>
                                <div style="display:flex; gap:2px; align-items:flex-end; height:60px;">
                                    <div style="width:14px; height:30px; background:#4ade80; border-radius:2px;"></div>
                                    <div style="width:14px; height:45px; background:#4ade80; border-radius:2px;"></div>
                                    <div style="width:14px; height:55px; background:#4ade80; border-radius:2px;"></div>
                                    <div style="width:14px; height:15px; background:#f87171; border-radius:2px;"></div>
                                    <div style="width:14px; height:25px; background:#f87171; border-radius:2px;"></div>
                                    <div style="width:14px; height:40px; background:#f87171; border-radius:2px;"></div>
                                </div>
                                <div style="color:#94a3b8; font-size:0.65rem; margin-top:4px;">Clear sorted halves</div>
                            </div>
                            <div style="text-align:center;">
                                <div style="color:#f87171; font-size:0.75rem; margin-bottom:6px;">With Duplicates 🌫️ FOG</div>
                                <div style="display:flex; gap:2px; align-items:flex-end; height:60px;">
                                    <div style="width:14px; height:25px; background:#fbbf24; border-radius:2px;"></div>
                                    <div style="width:14px; height:25px; background:#fbbf24; border-radius:2px;"></div>
                                    <div style="width:14px; height:25px; background:#fbbf24; border-radius:2px;"></div>
                                    <div style="width:14px; height:15px; background:#fbbf24; border-radius:2px;"></div>
                                    <div style="width:14px; height:25px; background:#fbbf24; border-radius:2px;"></div>
                                    <div style="width:14px; height:25px; background:#fbbf24; border-radius:2px;"></div>
                                </div>
                                <div style="color:#f87171; font-size:0.65rem; margin-top:4px;">L == mid == R 🤷</div>
                            </div>
                        </div>
                    </div>
                    <div style="background:rgba(248,113,113,0.1); padding:10px; border-radius:6px; border-left:3px solid #f87171;">
                        <div style="color:#f87171; font-weight:bold;">FOG: nums[L] == nums[mid] == nums[R]</div>
                        <div style="color:#94a3b8;">Action: Shrink! L++, R-- (worst case O(N))</div>
                    </div>
                </div>`,
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
                visual: `<div style="font-family:monospace; font-size:0.85rem;">
                    <strong style="color:#f59e0b;">Koko: "Speed vs Hours (Inverse Curve)" 🍌</strong>
                    <div style="background:#1e293b; padding:16px; border-radius:10px; margin:12px 0;">
                        <div style="color:#94a3b8; font-size:0.8rem; margin-bottom:8px;">piles=[3,6,7,11], h=8</div>
                        <div style="display:flex; gap:2px; align-items:flex-end; height:70px; padding-left:30px; position:relative;">
                            <div style="position:absolute; left:0; top:0; bottom:0; display:flex; flex-direction:column; justify-content:space-between; font-size:0.6rem; color:#94a3b8;">
                                <span>hrs</span><span>↓</span>
                            </div>
                            <div style="width:22px; height:65px; background:rgba(248,113,113,0.4); border:1px solid #f87171; border-radius:3px;" title="speed=1"></div>
                            <div style="width:22px; height:55px; background:rgba(248,113,113,0.4); border:1px solid #f87171; border-radius:3px;" title="speed=2"></div>
                            <div style="width:22px; height:48px; background:rgba(248,113,113,0.3); border:1px solid #f87171; border-radius:3px;" title="speed=3"></div>
                            <div style="width:22px; height:38px; background:rgba(74,222,128,0.4); border:2px solid #4ade80; border-radius:3px;" title="speed=4"></div>
                            <div style="width:22px; height:32px; background:rgba(74,222,128,0.3); border:1px solid #4ade80; border-radius:3px;" title="speed=5"></div>
                            <div style="width:22px; height:28px; background:rgba(74,222,128,0.3); border:1px solid #4ade80; border-radius:3px;" title="speed=6"></div>
                        </div>
                        <div style="display:flex; gap:2px; padding-left:30px; font-size:0.6rem; color:#94a3b8; margin-top:2px;">
                            <span style="width:22px; text-align:center;">1</span>
                            <span style="width:22px; text-align:center;">2</span>
                            <span style="width:22px; text-align:center;">3</span>
                            <span style="width:22px; text-align:center; color:#4ade80; font-weight:bold;">4✓</span>
                            <span style="width:22px; text-align:center;">5</span>
                            <span style="width:22px; text-align:center;">6</span>
                        </div>
                        <div style="text-align:center; font-size:0.7rem; color:#94a3b8; margin-top:2px;">speed →</div>
                        <div style="margin-top:8px; text-align:center;">
                            <span style="padding:3px 10px; background:rgba(74,222,128,0.1); border:1px solid #4ade80; border-radius:4px; color:#4ade80; font-size:0.8rem;">Min speed where hours ≤ 8: <strong>4</strong></span>
                        </div>
                    </div>
                    <div style="background:#0f172a; padding:10px; border-radius:6px;">
                        <div style="color:#fbbf24;">BS on answer: range [1, max(piles)]</div>
                        <div style="color:#94a3b8;">hours ≤ h → try slower | hours > h → go faster</div>
                    </div>
                </div>`,
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
                visual: `<div style="font-family:monospace; font-size:0.85rem;">
                    <strong style="color:#10b981;">Aggressive Cows: "Door Door Rakhna Hai!" 🐄</strong>
                    <div style="background:#1e293b; padding:16px; border-radius:10px; margin:12px 0;">
                        <div style="color:#94a3b8; font-size:0.8rem; margin-bottom:10px;">Stalls: [1, 2, 4, 8, 9] | Cows: 3</div>
                        <div style="display:flex; flex-direction:column; gap:12px;">
                            <div>
                                <div style="color:#4ade80; font-size:0.75rem; margin-bottom:6px;">Try distance = 3:</div>
                                <div style="display:flex; gap:2px; align-items:center;">
                                    <span style="padding:4px 8px; background:rgba(74,222,128,0.3); border:2px solid #4ade80; border-radius:6px; color:#4ade80;">🐄 1</span>
                                    <span style="padding:4px 8px; background:#0f172a; border:1px solid #334155; border-radius:6px; color:#475569;">2</span>
                                    <span style="padding:4px 8px; background:rgba(56,189,248,0.3); border:2px solid #38bdf8; border-radius:6px; color:#38bdf8;">🐄 4</span>
                                    <span style="padding:4px 8px; background:rgba(139,92,246,0.3); border:2px solid #8b5cf6; border-radius:6px; color:#8b5cf6;">🐄 8</span>
                                    <span style="padding:4px 8px; background:#0f172a; border:1px solid #334155; border-radius:6px; color:#475569;">9</span>
                                    <span style="color:#4ade80; margin-left:8px;">3 fit! ✓ try bigger</span>
                                </div>
                            </div>
                            <div>
                                <div style="color:#f87171; font-size:0.75rem; margin-bottom:6px;">Try distance = 4:</div>
                                <div style="display:flex; gap:2px; align-items:center;">
                                    <span style="padding:4px 8px; background:rgba(74,222,128,0.3); border:2px solid #4ade80; border-radius:6px; color:#4ade80;">🐄 1</span>
                                    <span style="padding:4px 8px; background:#0f172a; border:1px solid #334155; border-radius:6px; color:#475569;">2</span>
                                    <span style="padding:4px 8px; background:#0f172a; border:1px solid #334155; border-radius:6px; color:#475569;">4</span>
                                    <span style="padding:4px 8px; background:rgba(56,189,248,0.3); border:2px solid #38bdf8; border-radius:6px; color:#38bdf8;">🐄 8</span>
                                    <span style="padding:4px 8px; background:#0f172a; border:1px solid #334155; border-radius:6px; color:#475569;">9</span>
                                    <span style="color:#f87171; margin-left:8px;">only 2! ✗ shrink</span>
                                </div>
                            </div>
                        </div>
                        <div style="margin-top:10px; text-align:center;">
                            <span style="padding:4px 12px; background:rgba(74,222,128,0.1); border:1px solid #4ade80; border-radius:6px; color:#4ade80;">Answer: max min-distance = <strong>3</strong></span>
                        </div>
                    </div>
                    <div style="background:#0f172a; padding:10px; border-radius:6px;">
                        <div style="color:#fbbf24;">Sort stalls → BS on distance → Greedy placement</div>
                        <div style="color:#94a3b8;">Fit → try bigger | Not fit → try smaller</div>
                    </div>
                </div>`,
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
                visual: `
                    <h4 style="color:#c026d3;">✂️ The Perfect Cut: Binary Search on Partition</h4>
                    <div style="display:flex; flex-direction:column; gap:12px; margin:15px 0; max-width:600px;">
                        <div style="background:#1e293b; padding:16px; border-radius:12px;">
                            <div style="font-size:0.82rem; color:#94a3b8; margin-bottom:10px;">A = [1, 3, 8, 9], B = [2, 5, 6, 7]</div>
                            <div style="display:flex; flex-direction:column; gap:8px; font-family:monospace; font-size:0.85rem;">
                                <div style="display:flex; align-items:center; gap:4px;">
                                    <span style="color:#4ade80; width:22px;">A:</span>
                                    <span style="background:rgba(74,222,128,0.15); padding:4px 8px; border-radius:4px; color:#4ade80;">1</span>
                                    <span style="background:rgba(74,222,128,0.15); padding:4px 8px; border-radius:4px; color:#4ade80;">3</span>
                                    <span style="color:#fbbf24; font-weight:bold; font-size:1.2rem;">✂</span>
                                    <span style="background:rgba(248,113,113,0.15); padding:4px 8px; border-radius:4px; color:#f87171;">8</span>
                                    <span style="background:rgba(248,113,113,0.15); padding:4px 8px; border-radius:4px; color:#f87171;">9</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:4px;">
                                    <span style="color:#38bdf8; width:22px;">B:</span>
                                    <span style="background:rgba(56,189,248,0.15); padding:4px 8px; border-radius:4px; color:#38bdf8;">2</span>
                                    <span style="background:rgba(56,189,248,0.15); padding:4px 8px; border-radius:4px; color:#38bdf8;">5</span>
                                    <span style="color:#fbbf24; font-weight:bold; font-size:1.2rem;">✂</span>
                                    <span style="background:rgba(167,139,250,0.15); padding:4px 8px; border-radius:4px; color:#a78bfa;">6</span>
                                    <span style="background:rgba(167,139,250,0.15); padding:4px 8px; border-radius:4px; color:#a78bfa;">7</span>
                                </div>
                            </div>
                            <div style="display:flex; gap:20px; margin-top:12px; padding-top:10px; border-top:1px solid #334155; justify-content:center; font-size:0.82rem;">
                                <span style="color:#4ade80;">Left: {1,3,2,5}</span>
                                <span style="color:#fbbf24;">≤</span>
                                <span style="color:#f87171;">Right: {8,9,6,7}</span>
                            </div>
                        </div>
                        <div style="background:#0f172a; padding:12px; border-radius:8px; font-size:0.82rem; color:#94a3b8;">
                            <strong style="color:#fbbf24;">Check:</strong> A[i-1] ≤ B[j] AND B[j-1] ≤ A[i] → <span style="color:#4ade80;">3≤6 ✓</span> <span style="color:#4ade80;">5≤8 ✓</span> → Median = max(3,5) = <strong style="color:#fbbf24;">5</strong>
                        </div>
                    </div>`,
                crux: "<strong>Partitioning on Smaller Array:</strong><br>Cut `A` at `i`. `B`'s cut `j` is auto-fixed to balance sizes.<br>Valid if: `A[i-1] <= B[j]` AND `B[j-1] <= A[i]`.",
                strategy: "Binary Search on smaller array [0, N]. Calc partition for larger. Check cross-conditions. Handle edges with ±∞.",
                trap: "<strong>Edge Cases & Infinity:</strong><br>If cut is at start/end, use `-∞` or `+∞`.<br>Don't access index -1 or index N directly!",
                dryRun: [
                    "<strong>Input:</strong> A=[1, 3], B=[2]. Total=3. Half=1.",
                    "1. BS on A (len 2). L=0, R=2.",
                    "2. Cut A at 1. LeftA=[1], RightA=[3].",
                    "3. Cut B at (3+1)//2 - 1 = 1. LeftB=[2], RightB=[Inf].",
                    "4. Cross-check: 1 <= Inf? Yes. 2 <= 3? Yes.",
                    "5. Valid! MaxLeft = max(1, 2) = 2. Median = 2."
                ],
                codeTitle: "Python Solution (Virtual Infinity)",
                code: `def findMedianSortedArrays(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1

    m, n = len(nums1), len(nums2)
    low, high = 0, m

    while low <= high:
        partitionX = (low + high) // 2
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
            low = partitionX + 1`,
                codeDetailed: `def findMedianSortedArrays(nums1, nums2):
    """
    Median of Two Sorted Arrays
    
    STRATEGY: Binary Search on Partition
    - Instead of merging (O(m+n)), we find a partition line.
    - We want: len(left_part) == len(right_part)
    - And: max(left_part) <= min(right_part)
    
    TRICK:
    - Only BS on the SMALLER array (say nums1).
    - Position in nums2 is determined by total length.
    - Use Infinity for edge cases (empty left/right parts).
    
    Time: O(log(min(M, N))), Space: O(1)
    """
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
        
    m, n = len(nums1), len(nums2)
    low, high = 0, m
    
    while low <= high:
        partitionX = (low + high) // 2
        partitionY = (m + n + 1) // 2 - partitionX
        
        # Handle edges: if partition is at 0, nothing on left (-inf)
        maxLeftX = float('-inf') if partitionX == 0 else nums1[partitionX - 1]
        minRightX = float('inf') if partitionX == m else nums1[partitionX]
        
        maxLeftY = float('-inf') if partitionY == 0 else nums2[partitionY - 1]
        minRightY = float('inf') if partitionY == n else nums2[partitionY]
        
        # Check alignment
        if maxLeftX <= minRightY and maxLeftY <= minRightX:
            # We found the perfect cut!
            if (m + n) % 2 == 0:
                return (max(maxLeftX, maxLeftY) + min(minRightX, minRightY)) / 2
            else:
                return max(maxLeftX, maxLeftY)
        elif maxLeftX > minRightY:
            # Too far right in nums1, move left
            high = partitionX - 1
        else:
            # Too far left in nums1, move right
            low = partitionX + 1`
            }
        }
    ]
}
