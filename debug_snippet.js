                "max_p = min_p = res = nums[0]      # 🎯 Track BOTH max and min",
                "for n in nums[1:]:",
                "    if n < 0: swap(max_p, min_p)   # ⚡ Negative flips signs (Max<->Min)",
                "    max_p = max(n, n * max_p)      # 🔄 Extend info or start fresh",
                "    min_p = min(n, n * min_p)",
                "    res = max(res, max_p)          # ✅ Update global max",
                "return res"
            ],
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
