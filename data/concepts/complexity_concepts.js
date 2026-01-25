// Time & Space Complexity Mastery Guide
// The complete guide to understanding complexity analysis

const topic_complexity_concepts = {
    id: "complexity_concepts",
    title: "Time & Space Mastery: The Complete Guide",
    description: "Recursion Trees, Memoization Magic, and Real Number Analysis",
    color: "#f59e0b",
    icon: "fas fa-clock",
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
                            The Golden Formula
                        </div>
                        <div class="badges">
                            <span class="badge badge-must" style="background:#ef4444; color:white;">CORE CONCEPT</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="big-quote" style="font-size: 1.6rem; font-weight: 700; text-align: center; padding: 40px; background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(239, 68, 68, 0.1)); border-radius: 16px; border: 2px solid rgba(245, 158, 11, 0.4); margin: 30px 0; line-height: 1.6;">
                            Time = <span style="color:#f59e0b;">(Unique States)</span> × <span style="color:#22d3ee;">(Work per State)</span>
                        </div>
                        
                        <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; padding: 20px; border-radius: 8px; margin: 25px 0;">
                            <h4 style="color: #f87171; margin-bottom: 10px;">⚠️ Common Misconception</h4>
                            <p style="color: #fca5a5;">Time complexity ≠ Total recursive calls!</p>
                            <p style="color: gray;">Many students count all recursive calls, but with memoization, we only count <strong>unique states</strong>.</p>
                        </div>
                        
                        <h3 style="color: #fbbf24; margin: 30px 0 15px;">The Two Questions</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div style="background: rgba(245, 158, 11, 0.1); padding: 25px; border-radius: 12px; text-align: center;">
                                <div style="font-size: 2.5rem; margin-bottom: 15px;">1️⃣</div>
                                <h4 style="color: #fbbf24;">How many UNIQUE states?</h4>
                                <p style="color: gray; font-size: 0.9rem; margin-top: 10px;">Count the possible combinations of your memo key parameters</p>
                            </div>
                            <div style="background: rgba(34, 211, 238, 0.1); padding: 25px; border-radius: 12px; text-align: center;">
                                <div style="font-size: 2.5rem; margin-bottom: 15px;">2️⃣</div>
                                <h4 style="color: #22d3ee;">How much WORK per state?</h4>
                                <p style="color: gray; font-size: 0.9rem; margin-top: 10px;">What happens inside each recursive call (loops, string ops, etc.)</p>
                            </div>
                        </div>
                        
                        <h3 style="color: #fbbf24; margin: 30px 0 15px;">Quick Examples</h3>
                        <table style="width:100%; border-collapse: collapse; border-radius: 12px; overflow: hidden;">
                            <thead>
                                <tr style="background: linear-gradient(135deg, #f59e0b, #fbbf24);">
                                    <th style="padding: 15px; text-align: left; color: black;">Problem</th>
                                    <th style="padding: 15px; text-align: left; color: black;">States</th>
                                    <th style="padding: 15px; text-align: left; color: black;">Work/State</th>
                                    <th style="padding: 15px; text-align: left; color: black;">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; border-bottom: 1px solid #334155;">House Robber</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #7dd3fc;">N indices</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #22d3ee;">O(1)</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #34d399; font-weight: 700;">O(N)</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; border-bottom: 1px solid #334155;">LCS</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #7dd3fc;">M × N pairs</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #22d3ee;">O(1)</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #f59e0b; font-weight: 700;">O(M×N)</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px;">Word Break</td>
                                    <td style="padding: 12px; color: #7dd3fc;">N positions</td>
                                    <td style="padding: 12px; color: #22d3ee;">O(N²) loop + slice</td>
                                    <td style="padding: 12px; color: #ef4444; font-weight: 700;">O(N³)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>`
        },
        {
            id: "recursion-trees",
            title: "🌳 Recursion Trees",
            icon: "fas fa-tree",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-tree"></i>
                            Visualizing Recursion: The Tree
                        </div>
                        <div class="badges">
                            <span class="badge" style="background:#10b981; color:white;">VISUAL GUIDE</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="big-quote" style="font-size: 1.3rem; font-weight: 600; text-align: center; padding: 25px; background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(245, 158, 11, 0.1)); border-radius: 12px; margin: 20px 0;">
                            "Every recursive call = A node in the tree"
                        </div>
                        
                        <!-- Fibonacci Tree -->
                        <h3 style="color: #ef4444; margin: 30px 0 15px;">
                            <i class="fas fa-fire"></i> Fibonacci WITHOUT Memo: O(2^N)
                        </h3>
                        <p style="color: gray; margin-bottom: 15px;">Each call splits into 2 more calls = Exponential explosion!</p>
                        
                        <div style="background: #0f172a; padding: 25px; border-radius: 12px; font-family: 'Consolas', monospace; overflow-x: auto;">
                            <pre style="color: #e2e8f0; margin: 0; line-height: 1.4;">
                         fib(5)
                        /      \\
                   fib(4)        fib(3)
                   /    \\        /    \\
              fib(3)  fib(2)  fib(2)  fib(1)
              /   \\    /  \\    /  \\      |
          fib(2) fib(1) ...  ...  ...    1
           / \\      |
        fib(1) fib(0)
           |      |
           1      0
           
    Total Nodes: 2^5 - 1 = 31 calls for fib(5)!
    For fib(50): 2^50 = 1,125,899,906,842,624 calls 💀</pre>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 25px 0;">
                            <div style="background: rgba(239, 68, 68, 0.1); padding: 20px; border-radius: 12px; border: 1px solid rgba(239, 68, 68, 0.3);">
                                <h4 style="color: #ef4444;">❌ Without Memo</h4>
                                <p style="color: #fca5a5; font-size: 1.5rem; font-weight: 700; margin: 10px 0;">O(2^N)</p>
                                <p style="color: gray; font-size: 0.9rem;">fib(3) is called 3 times!</p>
                                <p style="color: gray; font-size: 0.9rem;">fib(2) is called 5 times!</p>
                            </div>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 20px; border-radius: 12px; border: 1px solid rgba(16, 185, 129, 0.3);">
                                <h4 style="color: #10b981;">✅ With Memo</h4>
                                <p style="color: #34d399; font-size: 1.5rem; font-weight: 700; margin: 10px 0;">O(N)</p>
                                <p style="color: gray; font-size: 0.9rem;">Each fib(k) computed only ONCE!</p>
                                <p style="color: gray; font-size: 0.9rem;">Stored and reused instantly</p>
                            </div>
                        </div>
                        
                        <!-- LIS Recursion Tree -->
                        <h3 style="color: #f59e0b; margin: 30px 0 15px;">
                            <i class="fas fa-chart-line"></i> LIS: Why O(2^N) Without Memo
                        </h3>
                        
                        <div style="background: #0f172a; padding: 25px; border-radius: 12px; font-family: 'Consolas', monospace; overflow-x: auto;">
                            <pre style="color: #e2e8f0; margin: 0; line-height: 1.4;">
    Array: [3, 1, 2, 4]     Starting from index 0, prev = -1

                      lis(0, -1)
                     /          \\
               TAKE 3          SKIP 3
              lis(1, 0)        lis(1, -1)
              /      \\         /       \\
         SKIP 1    [X]      TAKE 1    SKIP 1
        lis(2, 0)  can't   lis(2, 1)  lis(2, -1)
         /    \\   (1<3)     /    \\     /     \\
      SKIP   TAKE        TAKE  SKIP  TAKE   SKIP
        ...    ...         ...   ...   ...    ...

    Every element: 2 choices (take/skip)
    = 2 × 2 × 2 × 2 = 2^N possibilities</pre>
                        </div>
                        
                        <h3 style="color: #22d3ee; margin: 30px 0 15px;">
                            <i class="fas fa-lightbulb"></i> Why Memo Makes It O(N²)
                        </h3>
                        <div style="background: rgba(34, 211, 238, 0.1); padding: 20px; border-radius: 12px; border-left: 4px solid #22d3ee;">
                            <p style="margin-bottom: 15px;"><strong>Memo Key:</strong> <code style="background: #0f172a; padding: 4px 8px; border-radius: 4px; color: #7dd3fc;">(current_index, prev_index)</code></p>
                            <p style="margin-bottom: 10px;"><strong>How many unique pairs?</strong></p>
                            <ul style="list-style: none; padding-left: 0; line-height: 2;">
                                <li>• current_index: 0 to N-1 → <strong>N</strong> values</li>
                                <li>• prev_index: -1 to N-1 → <strong>N+1</strong> values</li>
                                <li>• Total states: <strong style="color: #22d3ee;">N × (N+1) ≈ O(N²)</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>`
        },
        {
            id: "memo-magic",
            title: "⚡ Memo Magic",
            icon: "fas fa-magic",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-magic"></i>
                            Before vs After Memoization
                        </div>
                        <div class="badges">
                            <span class="badge" style="background:#8b5cf6; color:white;">TRANSFORMATIVE</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="big-quote" style="font-size: 1.3rem; font-weight: 600; text-align: center; padding: 25px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(16, 185, 129, 0.1)); border-radius: 12px; margin: 20px 0;">
                            "Memoization converts EXPONENTIAL → POLYNOMIAL"
                        </div>
                        
                        <h3 style="color: #a78bfa; margin: 25px 0 15px;">The Transformation Table</h3>
                        <table style="width:100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                            <thead>
                                <tr style="background: linear-gradient(135deg, #8b5cf6, #a78bfa);">
                                    <th style="padding: 15px; text-align: left; color: white;">Problem</th>
                                    <th style="padding: 15px; text-align: center; color: white;">Without Memo</th>
                                    <th style="padding: 15px; text-align: center; color: white;">→</th>
                                    <th style="padding: 15px; text-align: center; color: white;">With Memo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; font-weight: 600;">Fibonacci</td>
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; text-align: center; color: #ef4444; font-weight: 700;">O(2^N)</td>
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; text-align: center; font-size: 1.5rem;">→</td>
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; text-align: center; color: #10b981; font-weight: 700;">O(N)</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; font-weight: 600;">House Robber</td>
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; text-align: center; color: #ef4444; font-weight: 700;">O(2^N)</td>
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; text-align: center; font-size: 1.5rem;">→</td>
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; text-align: center; color: #10b981; font-weight: 700;">O(N)</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; font-weight: 600;">LIS</td>
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; text-align: center; color: #ef4444; font-weight: 700;">O(2^N)</td>
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; text-align: center; font-size: 1.5rem;">→</td>
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; text-align: center; color: #f59e0b; font-weight: 700;">O(N²)</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; font-weight: 600;">LCS</td>
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; text-align: center; color: #ef4444; font-weight: 700;">O(2^(M+N))</td>
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; text-align: center; font-size: 1.5rem;">→</td>
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; text-align: center; color: #f59e0b; font-weight: 700;">O(M×N)</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; font-weight: 600;">Coin Change</td>
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; text-align: center; color: #ef4444; font-weight: 700;">O(C^Amount)</td>
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; text-align: center; font-size: 1.5rem;">→</td>
                                    <td style="padding: 15px; border-bottom: 1px solid #334155; text-align: center; color: #f59e0b; font-weight: 700;">O(C×Amount)</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 15px; font-weight: 600;">Edit Distance</td>
                                    <td style="padding: 15px; text-align: center; color: #ef4444; font-weight: 700;">O(3^(M+N))</td>
                                    <td style="padding: 15px; text-align: center; font-size: 1.5rem;">→</td>
                                    <td style="padding: 15px; text-align: center; color: #f59e0b; font-weight: 700;">O(M×N)</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <h3 style="color: #a78bfa; margin: 30px 0 15px;">Visual: How Memo Prunes the Tree</h3>
                        
                        <div style="background: #0f172a; padding: 25px; border-radius: 12px; font-family: 'Consolas', monospace; overflow-x: auto;">
                            <pre style="color: #e2e8f0; margin: 0; line-height: 1.4;">
    <span style="color: #ef4444;">WITHOUT MEMO:</span> Every node is computed
    
                      fib(5)
                     /      \\
                fib(4)        fib(3)  ← <span style="color: #ef4444;">Recomputed!</span>
               /    \\        /    \\
           fib(3)  fib(2)  fib(2)  fib(1)  ← <span style="color: #ef4444;">Recomputed!</span>
              ↓       ↓       ↓
            (more recomputation...)
    
    ─────────────────────────────────────────
    
    <span style="color: #10b981;">WITH MEMO:</span> Reuse cached results (shown as ▣)
    
                      fib(5)
                     /      \\
                fib(4)       ▣ fib(3)  ← <span style="color: #10b981;">Cached! O(1)</span>
               /    \\        
           fib(3)   ▣ fib(2)  ← <span style="color: #10b981;">Cached! O(1)</span>
           /    \\
       fib(2)   ▣ fib(1)  ← <span style="color: #10b981;">Cached! O(1)</span>
       /    \\
   fib(1)   fib(0)
   
   Only 6 actual computations instead of 31!</pre>
                        </div>
                        
                        <div style="background: rgba(16, 185, 129, 0.1); padding: 20px; border-radius: 12px; margin-top: 25px; border-left: 4px solid #10b981;">
                            <h4 style="color: #10b981; margin-bottom: 10px;">💡 Key Insight</h4>
                            <p style="color: #a7f3d0;">Memoization doesn't change the algorithm logic - it just avoids redundant work by remembering previous results!</p>
                        </div>
                    </div>
                </div>`
        },
        {
            id: "time-patterns",
            title: "📊 Time Patterns",
            icon: "fas fa-chart-bar",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-chart-bar"></i>
                            Every DP Pattern's Complexity
                        </div>
                    </div>
                    <div class="card-body">
                        
                        <!-- Pattern 1: Simple Linear -->
                        <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 16px; padding: 25px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                                <span style="background: #10b981; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700;">O(N)</span>
                                <h3 style="color: #34d399; margin: 0;">Simple Take/Not-Take</h3>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;">State: Only index | Work: O(1) decisions</p>
                            <div style="background: #0f172a; padding: 15px; border-radius: 8px; font-family: Consolas;">
                                <code style="color: #7dd3fc;">memo[(index)] = result  # N unique states</code>
                            </div>
                            <p style="margin-top: 15px; color: gray; font-size: 0.9rem;">
                                <strong>Problems:</strong> Fibonacci, House Robber, Climbing Stairs
                            </p>
                        </div>
                        
                        <!-- Pattern 2: Two Parameter -->
                        <div style="background: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 16px; padding: 25px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                                <span style="background: #f59e0b; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700;">O(N²)</span>
                                <h3 style="color: #fbbf24; margin: 0;">Two-Parameter State</h3>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;">State: (index, prev_index) or (index, remaining) | Work: O(1)</p>
                            <div style="background: #0f172a; padding: 15px; border-radius: 8px; font-family: Consolas;">
                                <code style="color: #7dd3fc;">memo[(i, prev)] = result  # N × N = N² states</code>
                            </div>
                            <p style="margin-top: 15px; color: gray; font-size: 0.9rem;">
                                <strong>Problems:</strong> LIS, Partition Equal Subset Sum
                            </p>
                        </div>
                        
                        <!-- Pattern 3: Two Strings -->
                        <div style="background: rgba(139, 92, 246, 0.05); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 16px; padding: 25px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                                <span style="background: #8b5cf6; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700;">O(M×N)</span>
                                <h3 style="color: #a78bfa; margin: 0;">Two-String DP</h3>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;">State: (i in string1, j in string2) | Work: O(1)</p>
                            <div style="background: #0f172a; padding: 15px; border-radius: 8px; font-family: Consolas;">
                                <code style="color: #7dd3fc;">memo[(i, j)] = result  # M × N states</code>
                            </div>
                            <p style="margin-top: 15px; color: gray; font-size: 0.9rem;">
                                <strong>Problems:</strong> LCS, Edit Distance, Interleaving String
                            </p>
                        </div>
                        
                        <!-- Pattern 4: With Extra Work -->
                        <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 16px; padding: 25px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                                <span style="background: #ef4444; color: white; padding: 8px 14px; border-radius: 8px; font-weight: 700;">O(N³)</span>
                                <h3 style="color: #f87171; margin: 0;">String Partition</h3>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;">State: N positions | Work: O(N) loop + O(N) string slice!</p>
                            <div style="background: #0f172a; padding: 15px; border-radius: 8px; font-family: Consolas;">
                                <code style="color: #ef4444;"># N states × (N loop × N slice) = O(N³)!</code><br>
                                <code style="color: #7dd3fc;">for end in range(start, n):  # O(N) loop</code><br>
                                <code style="color: #7dd3fc;">    s[start:end+1]  # O(N) string slice!</code>
                            </div>
                            <p style="margin-top: 15px; color: gray; font-size: 0.9rem;">
                                <strong>Problems:</strong> Word Break, Palindrome Partitioning
                            </p>
                        </div>
                        
                        <!-- Pattern 5: Knapsack -->
                        <div style="background: rgba(34, 211, 238, 0.05); border: 1px solid rgba(34, 211, 238, 0.2); border-radius: 16px; padding: 25px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                                <span style="background: #22d3ee; color: black; padding: 8px 14px; border-radius: 8px; font-weight: 700;">O(N×Target)</span>
                                <h3 style="color: #22d3ee; margin: 0;">Knapsack Variants</h3>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;">State: (index, remaining_capacity) | Work: O(1)</p>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div style="background: #0f172a; padding: 15px; border-radius: 8px;">
                                    <p style="color: #22d3ee; margin-bottom: 8px; font-size: 0.85rem;">0/1 Knapsack</p>
                                    <code style="color: #7dd3fc; font-size: 0.85rem;">O(N × Capacity)</code>
                                </div>
                                <div style="background: #0f172a; padding: 15px; border-radius: 8px;">
                                    <p style="color: #f59e0b; margin-bottom: 8px; font-size: 0.85rem;">Unbounded (Coin Change)</p>
                                    <code style="color: #7dd3fc; font-size: 0.85rem;">O(Coins × Amount)</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
        },
        {
            id: "space-analysis",
            title: "📦 Space Deep Dive",
            icon: "fas fa-memory",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-memory"></i>
                            Space Complexity: The Full Picture
                        </div>
                        <div class="badges">
                            <span class="badge" style="background:#c026d3; color:white;">DEEP DIVE</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="big-quote" style="font-size: 1.2rem; font-weight: 600; text-align: center; padding: 25px; background: linear-gradient(135deg, rgba(192, 38, 211, 0.1), rgba(139, 92, 246, 0.1)); border-radius: 12px; margin: 20px 0;">
                            Space = <span style="color:#c026d3;">Recursion Stack</span> + <span style="color:#a78bfa;">Memoization Table</span>
                        </div>
                        
                        <h3 style="color: #c026d3; margin: 25px 0 15px;">
                            <i class="fas fa-layer-group"></i> Part 1: Recursion Stack
                        </h3>
                        
                        <div style="background: #0f172a; padding: 25px; border-radius: 12px; font-family: 'Consolas', monospace; margin-bottom: 20px; overflow-x: auto;">
                            <pre style="color: #e2e8f0; margin: 0; line-height: 1.5;">
    Call Stack Visualization for fib(5):
    
    ┌─────────────────────────────────────┐
    │  fib(0) ← Currently executing       │  ← Max Depth = N
    ├─────────────────────────────────────┤
    │  fib(1)                             │
    ├─────────────────────────────────────┤
    │  fib(2)                             │
    ├─────────────────────────────────────┤
    │  fib(3)                             │
    ├─────────────────────────────────────┤
    │  fib(4)                             │
    ├─────────────────────────────────────┤
    │  fib(5) ← First call                │
    └─────────────────────────────────────┘
    
    Stack grows DOWN as we recurse deeper
    Each frame stores: local vars + return address</pre>
                        </div>
                        
                        <div style="background: rgba(192, 38, 211, 0.1); padding: 20px; border-radius: 12px; border-left: 4px solid #c026d3; margin-bottom: 25px;">
                            <h4 style="color: #c026d3; margin-bottom: 10px;">Stack Depth Formula</h4>
                            <p><strong>Max Stack Depth = Longest path from root to leaf in recursion tree</strong></p>
                            <ul style="line-height: 2; margin-top: 10px;">
                                <li><strong>Fibonacci:</strong> O(N) - goes fib(n) → fib(n-1) → ... → fib(0)</li>
                                <li><strong>LCS:</strong> O(M+N) - at most M+N recursive calls deep</li>
                                <li><strong>Binary Tree:</strong> O(H) where H = height of tree</li>
                            </ul>
                        </div>
                        
                        <h3 style="color: #a78bfa; margin: 30px 0 15px;">
                            <i class="fas fa-table"></i> Part 2: Memoization Table
                        </h3>
                        
                        <table style="width:100%; border-collapse: collapse; border-radius: 12px; overflow: hidden;">
                            <thead>
                                <tr style="background: linear-gradient(135deg, #8b5cf6, #a78bfa);">
                                    <th style="padding: 15px; text-align: left; color: white;">Problem</th>
                                    <th style="padding: 15px; text-align: left; color: white;">Memo Table Size</th>
                                    <th style="padding: 15px; text-align: left; color: white;">Optimizable?</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; border-bottom: 1px solid #334155;">Fibonacci</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #7dd3fc;">O(N)</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #10b981;">✅ O(1) - only need last 2</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; border-bottom: 1px solid #334155;">House Robber</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #7dd3fc;">O(N)</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #10b981;">✅ O(1) - rolling variables</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; border-bottom: 1px solid #334155;">LCS</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #7dd3fc;">O(M×N)</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: #f59e0b;">🔶 O(min(M,N)) - 1 row</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px;">Coin Change</td>
                                    <td style="padding: 12px; color: #7dd3fc;">O(Amount)</td>
                                    <td style="padding: 12px; color: #ef4444;">❌ Can't reduce further</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <h3 style="color: #ef4444; margin: 30px 0 15px;">
                            <i class="fas fa-exclamation-triangle"></i> Stack Overflow Warning!
                        </h3>
                        <div style="background: rgba(239, 68, 68, 0.1); padding: 20px; border-radius: 12px; border: 1px solid rgba(239, 68, 68, 0.3);">
                            <p style="margin-bottom: 15px;">Python default recursion limit: <strong style="color: #ef4444;">1000 calls</strong></p>
                            <p style="margin-bottom: 10px;">For N > 1000, you'll get:</p>
                            <code style="background: #0f172a; padding: 8px 12px; border-radius: 6px; color: #f87171; display: block; margin: 10px 0;">RecursionError: maximum recursion depth exceeded</code>
                            <p style="margin-top: 15px;"><strong>Solutions:</strong></p>
                            <ul style="line-height: 2;">
                                <li><code>import sys; sys.setrecursionlimit(10000)</code></li>
                                <li>Convert to iterative DP (bottom-up)</li>
                            </ul>
                        </div>
                    </div>
                </div>`
        },
        {
            id: "real-numbers",
            title: "🔢 Real Numbers",
            icon: "fas fa-calculator",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-calculator"></i>
                            What The Numbers Actually Mean
                        </div>
                        <div class="badges">
                            <span class="badge" style="background:#ef4444; color:white;">REALITY CHECK</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="big-quote" style="font-size: 1.3rem; font-weight: 600; text-align: center; padding: 25px; background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(245, 158, 11, 0.1)); border-radius: 12px; margin: 20px 0;">
                            LeetCode judges: ~10⁸ operations/second
                        </div>
                        
                        <h3 style="color: #f59e0b; margin: 25px 0 15px;">2^N Growth - The Horror Show</h3>
                        
                        <table style="width:100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                            <thead>
                                <tr style="background: linear-gradient(135deg, #ef4444, #f87171);">
                                    <th style="padding: 15px; text-align: center; color: white;">N</th>
                                    <th style="padding: 15px; text-align: right; color: white;">2^N Operations</th>
                                    <th style="padding: 15px; text-align: right; color: white;">Time @ 10⁸/sec</th>
                                    <th style="padding: 15px; text-align: center; color: white;">Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; text-align: center; border-bottom: 1px solid #334155;">10</td>
                                    <td style="padding: 12px; text-align: right; border-bottom: 1px solid #334155; color: #7dd3fc;">1,024</td>
                                    <td style="padding: 12px; text-align: right; border-bottom: 1px solid #334155;">0.00001 sec</td>
                                    <td style="padding: 12px; text-align: center; border-bottom: 1px solid #334155; color: #10b981;">✅ Fast</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; text-align: center; border-bottom: 1px solid #334155;">20</td>
                                    <td style="padding: 12px; text-align: right; border-bottom: 1px solid #334155; color: #7dd3fc;">1,048,576</td>
                                    <td style="padding: 12px; text-align: right; border-bottom: 1px solid #334155;">0.01 sec</td>
                                    <td style="padding: 12px; text-align: center; border-bottom: 1px solid #334155; color: #10b981;">✅ OK</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; text-align: center; border-bottom: 1px solid #334155;">30</td>
                                    <td style="padding: 12px; text-align: right; border-bottom: 1px solid #334155; color: #fbbf24;">1,073,741,824</td>
                                    <td style="padding: 12px; text-align: right; border-bottom: 1px solid #334155;">10.7 sec</td>
                                    <td style="padding: 12px; text-align: center; border-bottom: 1px solid #334155; color: #ef4444;">❌ TLE</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; text-align: center; border-bottom: 1px solid #334155;">40</td>
                                    <td style="padding: 12px; text-align: right; border-bottom: 1px solid #334155; color: #ef4444;">1,099,511,627,776</td>
                                    <td style="padding: 12px; text-align: right; border-bottom: 1px solid #334155;">3 hours</td>
                                    <td style="padding: 12px; text-align: center; border-bottom: 1px solid #334155; color: #ef4444;">💀 Dead</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; text-align: center;">50</td>
                                    <td style="padding: 12px; text-align: right; color: #ef4444;">1,125,899,906,842,624</td>
                                    <td style="padding: 12px; text-align: right;">130 days</td>
                                    <td style="padding: 12px; text-align: center; color: #ef4444;">☠️ RIP</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <h3 style="color: #10b981; margin: 30px 0 15px;">What Complexity Can Handle What N?</h3>
                        
                        <table style="width:100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; margin-top: 15px;">
                            <thead>
                                <tr style="background: linear-gradient(135deg, #10b981, #34d399);">
                                    <th style="padding: 15px; text-align: left; color: white;">Complexity</th>
                                    <th style="padding: 15px; text-align: center; color: white;">Max N for 1 sec</th>
                                    <th style="padding: 15px; text-align: left; color: white;">Typical Problems</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; font-weight: 600;">O(N)</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; text-align: center; color: #10b981; font-weight: 700;">10⁸</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: gray;">House Robber, Fibonacci</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; font-weight: 600;">O(N log N)</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; text-align: center; color: #10b981; font-weight: 700;">10⁷</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: gray;">LIS (Binary Search)</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; font-weight: 600;">O(N²)</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; text-align: center; color: #f59e0b; font-weight: 700;">10⁴</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: gray;">LIS, LCS, Edit Distance</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; font-weight: 600;">O(N³)</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; text-align: center; color: #f59e0b; font-weight: 700;">500</td>
                                    <td style="padding: 12px; border-bottom: 1px solid #334155; color: gray;">Word Break, Matrix Chain</td>
                                </tr>
                                <tr style="background: #1e293b;">
                                    <td style="padding: 12px; font-weight: 600;">O(2^N)</td>
                                    <td style="padding: 12px; text-align: center; color: #ef4444; font-weight: 700;">20-25</td>
                                    <td style="padding: 12px; color: gray;">Subsets, Permutations</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div style="background: rgba(139, 92, 246, 0.1); padding: 20px; border-radius: 12px; margin-top: 25px; border-left: 4px solid #8b5cf6;">
                            <h4 style="color: #a78bfa; margin-bottom: 10px;">💡 Quick Check Rule</h4>
                            <p>Look at constraints in problem:</p>
                            <ul style="line-height: 2;">
                                <li>N ≤ 20 → O(2^N) might work (brute force ok)</li>
                                <li>N ≤ 10⁴ → Need at least O(N²)</li>
                                <li>N ≤ 10⁵ → Need O(N log N) or O(N)</li>
                                <li>N ≤ 10⁸ → Must be O(N) or O(1)</li>
                            </ul>
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
                            Common Complexity Mistakes
                        </div>
                        <div class="badges">
                            <span class="badge" style="background:#ef4444; color:white;">AVOID THESE!</span>
                        </div>
                    </div>
                    <div class="card-body">
                        
                        <!-- Mistake 1 -->
                        <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                                <span style="background: #ef4444; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">1</span>
                                <strong style="color: #f87171; font-size: 1.1rem;">Counting Recursive Calls Instead of States</strong>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;">"My function calls itself twice, so it's O(2^N)"</p>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div style="background: #0f172a; padding: 15px; border-radius: 8px;">
                                    <p style="color: #ef4444; margin-bottom: 8px; font-size: 0.85rem;">❌ WRONG Thinking</p>
                                    <code style="color: #f87171; font-size: 0.85rem;">2 calls per state = O(2^N)</code>
                                </div>
                                <div style="background: #0f172a; padding: 15px; border-radius: 8px;">
                                    <p style="color: #10b981; margin-bottom: 8px; font-size: 0.85rem;">✅ RIGHT Thinking</p>
                                    <code style="color: #34d399; font-size: 0.85rem;">N unique states × O(1) = O(N)</code>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Mistake 2 -->
                        <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                                <span style="background: #f59e0b; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">2</span>
                                <strong style="color: #fbbf24; font-size: 1.1rem;">Forgetting String Slicing Cost</strong>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;">String slicing in Python creates a NEW string = O(length) time!</p>
                            <div style="background: #0f172a; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                                <code style="color: #f59e0b;">
                                    # Word Break: s[start:end+1]<br>
                                    # This is O(end - start), NOT O(1)!<br><br>
                                    # Total: N states × N loop × N slice = O(N³)
                                </code>
                            </div>
                            <p style="color: gray; font-size: 0.9rem;"><strong>Fix:</strong> Use index comparisons or hash the string</p>
                        </div>
                        
                        <!-- Mistake 3 -->
                        <div style="background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                                <span style="background: #8b5cf6; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">3</span>
                                <strong style="color: #a78bfa; font-size: 1.1rem;">Ignoring Hidden Loops</strong>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;">Some operations have hidden loops you might miss:</p>
                            <div style="background: #0f172a; padding: 15px; border-radius: 8px;">
                                <code style="color: #a78bfa;">
                                    word in wordSet  # O(len(word)) for hashing!<br>
                                    list(set)        # O(N) to convert<br>
                                    string + string  # O(N) - creates new string<br>
                                    arr.copy()       # O(N) - copies all elements<br>
                                    "x" * n          # O(N) - creates n-length string
                                </code>
                            </div>
                        </div>
                        
                        <!-- Mistake 4 -->
                        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 20px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                                <span style="background: #10b981; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">4</span>
                                <strong style="color: #34d399; font-size: 1.1rem;">Not Recognizing State Dependencies</strong>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;">Different parameters = Different states!</p>
                            <div style="background: #0f172a; padding: 15px; border-radius: 8px;">
                                <code style="color: #34d399;">
                                    # LIS: memo[index] is WRONG!<br>
                                    # Because result depends on prev_index too<br><br>
                                    # Correct: memo[(index, prev_index)]<br>
                                    # States: N × N = O(N²)
                                </code>
                            </div>
                        </div>
                        
                        <div style="background: rgba(245, 158, 11, 0.1); padding: 20px; border-radius: 12px; margin-top: 25px; border-left: 4px solid #f59e0b;">
                            <h4 style="color: #fbbf24; margin-bottom: 10px;">💡 Pro Tip</h4>
                            <p>When calculating complexity, always ask:</p>
                            <ol style="line-height: 2; margin-top: 10px;">
                                <li>What are the state parameters? (memo key)</li>
                                <li>How many unique combinations exist?</li>
                                <li>What work happens INSIDE each state? (loops, string ops)</li>
                                <li>Multiply: States × Work per State = Answer</li>
                            </ol>
                        </div>
                    </div>
                </div>`
        }
    ]
};
