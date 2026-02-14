// Auto-generated from data/ folder
// Run `python3 build_data.py` to regenerate
// Source: data/concepts/dp_concepts.js
// Topic: dp_concepts

// Dp Concepts data
// Extracted from data.js

const topic_dp_concepts = {
    id: "dp_concepts",
    title: "DP Mastery: Complete Guide",
    description: "From Zero to Hero - Master Every DP Pattern",
    color: "#8b5cf6",
    icon: "fas fa-brain",
    type: "guide",
    sections: [
        {
            id: "philosophy",
            title: "🧠 Philosophy",
            icon: "fas fa-lightbulb",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-lightbulb"></i>
                            The "Lun Na Lun" Philosophy
                        </div>
                        <div class="badges">
                            <span class="badge badge-must" style="background:#ef4444; color:white;">CORE CONCEPT</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="big-quote" style="font-size: 1.4rem; font-weight: 600; text-align: center; padding: 30px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(34, 211, 238, 0.1)); border-radius: 12px; border: 2px solid var(--border); margin: 30px 0; line-height: 1.8;">
                            "Har element pe do options: <span style='color:#8b5cf6; font-weight:800;'>LUN</span> (include karo) ya <span style='color:#8b5cf6; font-weight:800;'>NA LUN</span> (skip karo)"
                        </div>
                        
                        <div style="background: rgba(139, 92, 246, 0.1); padding: 25px; border-radius: 12px; border-left: 4px solid #8b5cf6; margin: 25px 0;">
                            <h4 style="margin-bottom:15px; color:#a78bfa;"><i class="fas fa-star"></i> Why This Pattern is Powerful</h4>
                            <ul style="list-style:none; padding-left:0; line-height:2;">
                                <li>✅ <strong>Natural Thinking:</strong> Dimag automatically "should I include this?" sochta hai</li>
                                <li>✅ <strong>Universal Template:</strong> 80% DP problems is pattern pe fit hote hain</li>
                                <li>✅ <strong>Interview-Friendly:</strong> 5 min mein code likh sakte ho</li>
                                <li>✅ <strong>Easy Complexity:</strong> States count karna simple hai</li>
                            </ul>
                        </div>
                        
                        <h3 style="margin: 30px 0 15px 0; color: #a78bfa;">
                            <i class="fas fa-brain"></i> The 3-Step DP Approach
                        </h3>
                        
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0;">
                            <div style="background: rgba(239, 68, 68, 0.1); padding: 20px; border-radius: 12px; text-align:center;">
                                <div style="font-size:2rem; margin-bottom:10px;">1️⃣</div>
                                <strong style="color:#ef4444;">Write Recursion</strong>
                                <p style="font-size:0.9rem; color:gray; margin-top:8px;">Sab se pehle brute force likho</p>
                            </div>
                            <div style="background: rgba(245, 158, 11, 0.1); padding: 20px; border-radius: 12px; text-align:center;">
                                <div style="font-size:2rem; margin-bottom:10px;">2️⃣</div>
                                <strong style="color:#f59e0b;">Add Memoization</strong>
                                <p style="font-size:0.9rem; color:gray; margin-top:8px;">memo dict add karo</p>
                            </div>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 20px; border-radius: 12px; text-align:center;">
                                <div style="font-size:2rem; margin-bottom:10px;">3️⃣</div>
                                <strong style="color:#10b981;">Convert to DP</strong>
                                <p style="font-size:0.9rem; color:gray; margin-top:8px;">Bottom-up tabulation (Optional)</p>
                            </div>
                        </div>
                        
                        <h3 style="margin: 30px 0 15px 0; color: #a78bfa;">
                            <i class="fas fa-code"></i> Universal Template
                        </h3>
                        
                        <div style="background: #0f172a; border-radius: 12px; padding: 20px;">
                            <pre style="color: #e2e8f0; font-family: 'Consolas', monospace; font-size: 0.9rem; line-height: 1.6;">def solve(arr):
memo = {}

def dfs(index, state):
    # 1. Base Case
    if index >= len(arr):
        return 0  # or appropriate base value
    
    # 2. Check Memo
    if (index, state) in memo:
        return memo[(index, state)]
    
    # 3. LUN (Take current element)
    take = arr[index] + dfs(index + 1, new_state)
    
    # 4. NA LUN (Skip current element)
    skip = dfs(index + 1, state)
    
    # 5. Choose best & store
    memo[(index, state)] = max(take, skip)
    return memo[(index, state)]

return dfs(0, initial_state)</pre>
                        </div>
                    </div>
                </div>`
        },
        {
            id: "roadmap",
            title: "🗺️ Roadmap",
            icon: "fas fa-route",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-route"></i>
                            DP Learning Roadmap
                        </div>
                        <div class="badges">
                            <span class="badge" style="background:#10b981; color:white;">7 QUESTIONS</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <p style="color: gray; margin-bottom: 25px;">
                            In order practice karo. Har question ek naya pattern sikhata hai!
                        </p>
                        
                        <div style="display: flex; flex-direction: column; gap: 15px;">
                            
                            <a href="learn.html?topic=dp&q=house-robber" style="text-decoration: none; display: block; background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05)); padding: 20px; border-radius: 12px; border: 1px solid rgba(239, 68, 68, 0.3); transition: transform 0.2s;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                                            <span style="background: #ef4444; color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">LEVEL 1</span>
                                            <strong style="color: white; font-size: 1.1rem;">House Robber</strong>
                                        </div>
                                        <p style="color: gray; font-size: 0.9rem; margin: 0;">
                                            <strong style="color:#a78bfa;">Pattern:</strong> Simple Take/Not-Take with gap constraint
                                        </p>
                                    </div>
                                    <i class="fas fa-arrow-right" style="color: #ef4444;"></i>
                                </div>
                            </a>
                            
                            <a href="learn.html?topic=dp&q=longest-increasing-subsequence" style="text-decoration: none; display: block; background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05)); padding: 20px; border-radius: 12px; border: 1px solid rgba(245, 158, 11, 0.3);">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                                            <span style="background: #f59e0b; color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">LEVEL 2</span>
                                            <strong style="color: white; font-size: 1.1rem;">LIS (Longest Increasing Subsequence)</strong>
                                        </div>
                                        <p style="color: gray; font-size: 0.9rem; margin: 0;">
                                            <strong style="color:#a78bfa;">Pattern:</strong> Take/Not-Take with comparison constraint
                                        </p>
                                    </div>
                                    <i class="fas fa-arrow-right" style="color: #f59e0b;"></i>
                                </div>
                            </a>
                            
                            <a href="learn.html?topic=dp&q=coin-change" style="text-decoration: none; display: block; background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05)); padding: 20px; border-radius: 12px; border: 1px solid rgba(245, 158, 11, 0.3);">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                                            <span style="background: #f59e0b; color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">LEVEL 3</span>
                                            <strong style="color: white; font-size: 1.1rem;">Coin Change</strong>
                                        </div>
                                        <p style="color: gray; font-size: 0.9rem; margin: 0;">
                                            <strong style="color:#a78bfa;">Pattern:</strong> Unbounded Knapsack (infinite supply)
                                        </p>
                                    </div>
                                    <i class="fas fa-arrow-right" style="color: #f59e0b;"></i>
                                </div>
                            </a>
                            
                            <a href="learn.html?topic=dp&q=partition-equal-subset-sum" style="text-decoration: none; display: block; background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05)); padding: 20px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.3);">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                                            <span style="background: #8b5cf6; color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">LEVEL 4</span>
                                            <strong style="color: white; font-size: 1.1rem;">0/1 Knapsack (Partition Equal Subset)</strong>
                                        </div>
                                        <p style="color: gray; font-size: 0.9rem; margin: 0;">
                                            <strong style="color:#a78bfa;">Pattern:</strong> Classic 0/1 Knapsack with target sum
                                        </p>
                                    </div>
                                    <i class="fas fa-arrow-right" style="color: #8b5cf6;"></i>
                                </div>
                            </a>
                            
                            <a href="learn.html?topic=dp&q=longest-common-subsequence" style="text-decoration: none; display: block; background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05)); padding: 20px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.3);">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                                            <span style="background: #8b5cf6; color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">LEVEL 5</span>
                                            <strong style="color: white; font-size: 1.1rem;">LCS (Longest Common Subsequence)</strong>
                                        </div>
                                        <p style="color: gray; font-size: 0.9rem; margin: 0;">
                                            <strong style="color:#a78bfa;">Pattern:</strong> Two-String DP (Match or Skip)
                                        </p>
                                    </div>
                                    <i class="fas fa-arrow-right" style="color: #8b5cf6;"></i>
                                </div>
                            </a>
                            
                            <a href="learn.html?topic=dp&q=word-break" style="text-decoration: none; display: block; background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05)); padding: 20px; border-radius: 12px; border: 1px solid rgba(16, 185, 129, 0.3);">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                                            <span style="background: #10b981; color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">LEVEL 6</span>
                                            <strong style="color: white; font-size: 1.1rem;">Word Break</strong>
                                        </div>
                                        <p style="color: gray; font-size: 0.9rem; margin: 0;">
                                            <strong style="color:#a78bfa;">Pattern:</strong> String partition + Dictionary lookup
                                        </p>
                                    </div>
                                    <i class="fas fa-arrow-right" style="color: #10b981;"></i>
                                </div>
                            </a>
                            
                            <a href="learn.html?topic=dp&q=edit-distance" style="text-decoration: none; display: block; background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05)); padding: 20px; border-radius: 12px; border: 1px solid rgba(16, 185, 129, 0.3);">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                                            <span style="background: #10b981; color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">BOSS</span>
                                            <strong style="color: white; font-size: 1.1rem;">Edit Distance</strong>
                                        </div>
                                        <p style="color: gray; font-size: 0.9rem; margin: 0;">
                                            <strong style="color:#a78bfa;">Pattern:</strong> Two-String DP with 3 operations
                                        </p>
                                    </div>
                                    <i class="fas fa-arrow-right" style="color: #10b981;"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>`
        },
        {
            id: "patterns",
            title: "🧩 5 Patterns",
            icon: "fas fa-puzzle-piece",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-puzzle-piece"></i>
                            The 5 DP Patterns
                        </div>
                    </div>
                    <div class="card-body">
                        <p style="color: gray; margin-bottom: 25px;">
                            <strong>90% DP problems</strong> in 5 patterns ke andar aate hain. Pattern pehchaan lo, problem solve ho jayegi!
                        </p>
                        
                        <!-- Pattern 1: Take/Not-Take -->
                        <div style="background: rgba(139, 92, 246, 0.05); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 16px; padding: 25px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                                <span style="background: #8b5cf6; color: white; padding: 6px 12px; border-radius: 8px; font-weight: 700;">1</span>
                                <h3 style="color: #a78bfa; margin: 0;">Take / Not-Take (Lun Na Lun)</h3>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;"><strong>Pehchaan:</strong> "Maximum/Minimum value subset select karo"</p>
                            <div style="background: #0f172a; padding: 12px; border-radius: 8px; font-family: Consolas; color: #7dd3fc; font-size: 0.9rem;">
                                take = arr[i] + dfs(i+1, new_state)<br>
                                skip = dfs(i+1, state)<br>
                                return max(take, skip)
                            </div>
                            <p style="margin-top: 12px; color: gray; font-size: 0.9rem;">
                                <strong>Problems:</strong> House Robber, LIS, Subset Sum
                            </p>
                        </div>
                        
                        <!-- Pattern 2: 0/1 Knapsack -->
                        <div style="background: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 16px; padding: 25px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                                <span style="background: #f59e0b; color: white; padding: 6px 12px; border-radius: 8px; font-weight: 700;">2</span>
                                <h3 style="color: #fbbf24; margin: 0;">0/1 Knapsack</h3>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;"><strong>Pehchaan:</strong> "Target sum tak pahunchna hai, items <strong>ek baar</strong> use kar sakte ho"</p>
                            <div style="background: #0f172a; padding: 12px; border-radius: 8px; font-family: Consolas; color: #7dd3fc; font-size: 0.9rem;">
                                # State: (index, remaining_capacity/sum)<br>
                                take = dfs(i+1, target - arr[i])  # Move to next<br>
                                skip = dfs(i+1, target)           # Move to next
                            </div>
                            <p style="margin-top: 12px; color: gray; font-size: 0.9rem;">
                                <strong>Problems:</strong> Partition Equal Subset, Target Sum
                            </p>
                        </div>
                        
                        <!-- Pattern 3: Unbounded Knapsack -->
                        <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 16px; padding: 25px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                                <span style="background: #ef4444; color: white; padding: 6px 12px; border-radius: 8px; font-weight: 700;">3</span>
                                <h3 style="color: #f87171; margin: 0;">Unbounded Knapsack</h3>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;"><strong>Pehchaan:</strong> "Target sum tak pahunchna hai, items <strong>baar baar</strong> use kar sakte ho"</p>
                            <div style="background: #0f172a; padding: 12px; border-radius: 8px; font-family: Consolas; color: #7dd3fc; font-size: 0.9rem;">
                                # Key difference: STAY at same index when taking!<br>
                                take = 1 + dfs(i, target - coins[i])  # Stay at i<br>
                                skip = dfs(i+1, target)               # Move to next
                            </div>
                            <p style="margin-top: 12px; color: gray; font-size: 0.9rem;">
                                <strong>Problems:</strong> Coin Change, Rod Cutting, Coin Change II
                            </p>
                        </div>
                        
                        <!-- Pattern 4: Two-String DP -->
                        <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 16px; padding: 25px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                                <span style="background: #10b981; color: white; padding: 6px 12px; border-radius: 8px; font-weight: 700;">4</span>
                                <h3 style="color: #34d399; margin: 0;">Two-String DP (Match/Skip)</h3>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;"><strong>Pehchaan:</strong> "Do strings compare karna hai"</p>
                            <div style="background: #0f172a; padding: 12px; border-radius: 8px; font-family: Consolas; color: #7dd3fc; font-size: 0.9rem;">
                                if s1[i] == s2[j]:  # MATCH<br>
                                &nbsp;&nbsp;return 1 + dfs(i+1, j+1)  # Diagonal<br>
                                else:  # NO MATCH<br>
                                &nbsp;&nbsp;return max(dfs(i+1, j), dfs(i, j+1))  # Skip one
                            </div>
                            <p style="margin-top: 12px; color: gray; font-size: 0.9rem;">
                                <strong>Problems:</strong> LCS, Edit Distance, Longest Palindromic Subseq
                            </p>
                        </div>
                        
                        <!-- Pattern 5: String Partition -->
                        <div style="background: rgba(34, 211, 238, 0.05); border: 1px solid rgba(34, 211, 238, 0.2); border-radius: 16px; padding: 25px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                                <span style="background: #22d3ee; color: black; padding: 6px 12px; border-radius: 8px; font-weight: 700;">5</span>
                                <h3 style="color: #22d3ee; margin: 0;">String Partition</h3>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;"><strong>Pehchaan:</strong> "String ko valid parts mein todna hai"</p>
                            <div style="background: #0f172a; padding: 12px; border-radius: 8px; font-family: Consolas; color: #7dd3fc; font-size: 0.9rem;">
                                for end in range(start, len(s)):<br>
                                &nbsp;&nbsp;if s[start:end+1] in wordDict:<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;if dfs(end + 1): return True<br>
                                return False
                            </div>
                            <p style="margin-top: 12px; color: gray; font-size: 0.9rem;">
                                <strong>Problems:</strong> Word Break, Palindrome Partitioning
                            </p>
                        </div>
                    </div>
                </div>`
        },
        {
            id: "complexity",
            title: "⏱️ Complexity",
            icon: "fas fa-clock",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-clock"></i>
                            Time Complexity: The Truth
                        </div>
                        <div class="badges">
                            <span class="badge badge-must" style="background:#ef4444; color:white;">CRITICAL</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div style="background:rgba(245, 158, 11, 0.1); padding:25px; text-align:center; border-radius:12px; margin:20px 0; border: 2px solid rgba(245, 158, 11, 0.3);">
                            <code style="font-size: 1.5em; color: #f59e0b; font-weight: 700;">Time = (Unique States) × (Work per State)</code>
                            <br><br>
                            <span style="color: gray;">NOT total recursive calls! Memoization changes everything!</span>
                        </div>
                        
                        <h3 style="color: #a78bfa; margin: 25px 0 15px;">Complexity by Problem</h3>
                        
                        <table style="width:100%; border-collapse: collapse; border-radius: 12px; overflow: hidden;">
                            <thead>
                                <tr style="background: linear-gradient(135deg, #8b5cf6, #a78bfa);">
                                    <th style="padding: 15px; text-align: left; color: white;">Problem</th>
                                    <th style="padding: 15px; text-align: left; color: white;">States</th>
                                    <th style="padding: 15px; text-align: left; color: white;">Time</th>
                                    <th style="padding: 15px; text-align: left; color: white;">Space</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; border-bottom: 1px solid #334155;">House Robber</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #7dd3fc; font-family: Consolas;">(i)</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #34d399;">O(N)</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #34d399;">O(1)*</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; border-bottom: 1px solid #334155;">LIS</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #7dd3fc; font-family: Consolas;">(i, prev_i)</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #f59e0b;">O(N²)</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #f59e0b;">O(N²)</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; border-bottom: 1px solid #334155;">Coin Change</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #7dd3fc; font-family: Consolas;">(amt) or (i, amt)</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #f59e0b;">O(A × C)</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #34d399;">O(A)</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; border-bottom: 1px solid #334155;">LCS</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #7dd3fc; font-family: Consolas;">(i, j)</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #f59e0b;">O(M × N)</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #f59e0b;">O(M × N)</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px;">Edit Distance</td>
                                    <td style="padding: 12px; color: #7dd3fc; font-family: Consolas;">(i, j)</td>
                                    <td style="padding: 12px; color: #f59e0b;">O(M × N)</td>
                                    <td style="padding: 12px; color: #f59e0b;">O(M × N)</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <p style="color: gray; font-size: 0.85rem; margin-top: 10px;">* Space optimized using rolling variables</p>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 25px;">
                            <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; padding: 20px; border-radius: 8px;">
                                <h4 style="color: #ef4444;">❌ WITHOUT Memo</h4>
                                <p>Exponential: O(2ⁿ)</p>
                                <p><strong>Result: TLE! ❌</strong></p>
                            </div>
                            <div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981; padding: 20px; border-radius: 8px;">
                                <h4 style="color: #10b981;">✅ WITH Memo</h4>
                                <p>Polynomial: O(N²) etc.</p>
                                <p><strong>Result: AC! ✅</strong></p>
                            </div>
                        </div>
                    </div>
                </div>`
        },
        {
            id: "mistakes",
            title: "⚠️ Mistakes",
            icon: "fas fa-exclamation-triangle",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-exclamation-triangle"></i>
                            Common DP Mistakes (Must Avoid!)
                        </div>
                        <div class="badges">
                            <span class="badge" style="background:#ef4444; color:white;">TRAPS</span>
                        </div>
                    </div>
                    <div class="card-body">
                        
                        <!-- Mistake 1 -->
                        <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                                <span style="background: #ef4444; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">1</span>
                                <strong style="color: #f87171; font-size: 1.1rem;">Memo Key Galat Liya</strong>
                            </div>
                            <p style="color: gray; margin-bottom: 12px;">Agar tumne state mein kuch parameter miss kiya, multiple calls same key pe store honge → Wrong Answer!</p>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div style="background: #0f172a; padding: 12px; border-radius: 8px;">
                                    <p style="color: #ef4444; margin-bottom: 8px; font-size: 0.85rem;">❌ WRONG</p>
                                    <code style="color: #f87171; font-family: Consolas; font-size: 0.85rem;">memo[index] = result</code>
                                </div>
                                <div style="background: #0f172a; padding: 12px; border-radius: 8px;">
                                    <p style="color: #10b981; margin-bottom: 8px; font-size: 0.85rem;">✅ RIGHT</p>
                                    <code style="color: #34d399; font-family: Consolas; font-size: 0.85rem;">memo[(index, remaining)] = result</code>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Mistake 2 -->
                        <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                                <span style="background: #f59e0b; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">2</span>
                                <strong style="color: #fbbf24; font-size: 1.1rem;">Base Case Wrong Value</strong>
                            </div>
                            <p style="color: gray; margin-bottom: 12px;">Min problem mein 0 return karna ya Max problem mein infinity use karna → Wrong Answer!</p>
                            <div style="background: #0f172a; padding: 12px; border-radius: 8px;">
                                <code style="color: #f59e0b; font-family: Consolas; font-size: 0.85rem;">
                                    # For MIN problems (Coin Change)<br>
                                    if target == 0: return 0  # Valid<br>
                                    if target < 0: return float('inf')  # Invalid<br><br>
                                    # For MAX problems (House Robber)<br>
                                    if index >= len(arr): return 0  # No more to take
                                </code>
                            </div>
                        </div>
                        
                        <!-- Mistake 3 -->
                        <div style="background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                                <span style="background: #8b5cf6; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">3</span>
                                <strong style="color: #a78bfa; font-size: 1.1rem;">0/1 vs Unbounded Confusion</strong>
                            </div>
                            <p style="color: gray; margin-bottom: 12px;">Jab item baar baar use kar sakte ho, index SAME rehna chahiye!</p>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div style="background: #0f172a; padding: 12px; border-radius: 8px;">
                                    <p style="color: #a78bfa; margin-bottom: 8px; font-size: 0.85rem;">0/1 Knapsack (Use once)</p>
                                    <code style="color: #c4b5fd; font-family: Consolas; font-size: 0.85rem;">take = dfs(i<strong>+1</strong>, ...)</code>
                                </div>
                                <div style="background: #0f172a; padding: 12px; border-radius: 8px;">
                                    <p style="color: #22d3ee; margin-bottom: 8px; font-size: 0.85rem;">Unbounded (Use infinite)</p>
                                    <code style="color: #67e8f9; font-family: Consolas; font-size: 0.85rem;">take = dfs(<strong>i</strong>, ...)  # Stay!</code>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Mistake 4 -->
                        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 20px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                                <span style="background: #10b981; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">4</span>
                                <strong style="color: #34d399; font-size: 1.1rem;">State Design Galat</strong>
                            </div>
                            <p style="color: gray; margin-bottom: 12px;">LIS mein prev_index track karna bhool gaye → Can't compare correctly!</p>
                            <div style="background: #0f172a; padding: 12px; border-radius: 8px;">
                                <code style="color: #34d399; font-family: Consolas; font-size: 0.85rem;">
                                    # LIS needs TWO parameters:<br>
                                    def dfs(curr_idx, prev_idx):  # ✅<br>
                                    &nbsp;&nbsp;if nums[curr_idx] > nums[prev_idx]:  # Compare<br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;take = 1 + dfs(curr_idx+1, curr_idx)
                                </code>
                            </div>
                        </div>
                    </div>
                </div>`
        },
        {
            id: "visualizers",
            title: "🎮 Visualizers",
            icon: "fas fa-play-circle",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-play-circle"></i>
                            Interactive DP Visualizers
                        </div>
                        <div class="badges">
                            <span class="badge" style="background:#10b981; color:white;">LEARN BY DOING</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <p style="color: gray; margin-bottom: 25px;">
                            Step-by-step dekho ki DP table kaise bharta hai. Best way to understand!
                        </p>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <a href="visualizers/lcs.html" style="text-decoration: none; display: block; background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05)); padding: 30px; border-radius: 16px; border: 1px solid rgba(139, 92, 246, 0.3); text-align: center; transition: transform 0.2s;">
                                <i class="fas fa-th" style="font-size: 2.5rem; color: #a78bfa; margin-bottom: 15px;"></i>
                                <h4 style="color: white; margin-bottom: 8px;">LCS Visualizer</h4>
                                <p style="color: gray; font-size: 0.9rem; margin: 0;">See 2D grid fill up</p>
                            </a>
                            
                            <a href="visualizers/lis.html" style="text-decoration: none; display: block; background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05)); padding: 30px; border-radius: 16px; border: 1px solid rgba(245, 158, 11, 0.3); text-align: center;">
                                <i class="fas fa-chart-line" style="font-size: 2.5rem; color: #fbbf24; margin-bottom: 15px;"></i>
                                <h4 style="color: white; margin-bottom: 8px;">LIS Visualizer</h4>
                                <p style="color: gray; font-size: 0.9rem; margin: 0;">Watch sequence build</p>
                            </a>
                            
                            <a href="visualizers/min_coins.html" style="text-decoration: none; display: block; background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05)); padding: 30px; border-radius: 16px; border: 1px solid rgba(16, 185, 129, 0.3); text-align: center;">
                                <i class="fas fa-coins" style="font-size: 2.5rem; color: #34d399; margin-bottom: 15px;"></i>
                                <h4 style="color: white; margin-bottom: 8px;">Coin Change Visualizer</h4>
                                <p style="color: gray; font-size: 0.9rem; margin: 0;">Unbounded knapsack in action</p>
                            </a>
                            
                            <a href="visualizers/word_break.html" style="text-decoration: none; display: block; background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.05)); padding: 30px; border-radius: 16px; border: 1px solid rgba(239, 68, 68, 0.3); text-align: center;">
                                <i class="fas fa-font" style="font-size: 2.5rem; color: #f87171; margin-bottom: 15px;"></i>
                                <h4 style="color: white; margin-bottom: 8px;">Word Break Visualizer</h4>
                                <p style="color: gray; font-size: 0.9rem; margin: 0;">String partition demo</p>
                            </a>
                        </div>
                    </div>
                </div>`
        }
    ]
};

window.currentTopicData = topic_dp_concepts;
