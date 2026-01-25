// Arrays Concepts data
// Extracted from data.js

const topic_arrays_concepts = {
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
};
