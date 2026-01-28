// Stack Concepts data
// Extracted from data.js

const topic_stack_concepts = {
    id: "stack_concepts",
    title: "Stack Mastery: The Monotonic Framework",
    description: "Master the Art of 'Waiting Room' Logic",
    color: "#7c3aed",
    icon: "fas fa-layer-group",
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
                            The "Waiting Room" Philosophy
                        </div>
                        <div class="badges">
                            <span class="badge badge-must" style="background:#7c3aed; color:white;">CORE CONCEPT</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="big-quote" style="font-size: 1.4rem; font-weight: 600; text-align: center; padding: 30px; background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(139, 92, 246, 0.1)); border-radius: 12px; border: 2px solid var(--border); margin: 30px 0; line-height: 1.8;">
                            "Stack ek <span style='color:#7c3aed; font-weight:800;'>Waiting Room</span> hai. Elements tab tak wait karte hain jab tak unhe koi 'Resolve' karne wala na mil jaye."
                        </div>
                        
                        <div style="background: rgba(124, 58, 237, 0.1); padding: 25px; border-radius: 12px; border-left: 4px solid #7c3aed; margin: 25px 0;">
                            <h4 style="margin-bottom:15px; color:#a78bfa;"><i class="fas fa-star"></i> Why It Works</h4>
                            <ul style="list-style:none; padding-left:0; line-height:2;">
                                <li>✅ <strong>Time Travel:</strong> Hum past ke un elements ko access kar sakte hain jo abhi "unresolved" hain.</li>
                                <li>✅ <strong>O(N) Magic:</strong> Each element is pushed ONCE and popped ONCE. Linear time guaranteed!</li>
                                <li>✅ <strong>Structure:</strong> Nested problems (brackets, recursive calls) ko linear way mein handle karta hai.</li>
                            </ul>
                        </div>
                        
                        <h3 style="margin: 30px 0 15px 0; color: #a78bfa;">
                            <i class="fas fa-layer-group"></i> The Monotonic Stack Rule
                        </h3>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
                            <div style="background: rgba(239, 68, 68, 0.1); padding: 20px; border-radius: 12px; text-align:center;">
                                <div style="font-size:2rem; margin-bottom:10px;">📉</div>
                                <strong style="color:#ef4444;">Decreasing Stack</strong>
                                <p style="font-size:0.9rem; color:gray; margin-top:8px;">Find <strong>Next Greater</strong></p>
                                <p style="font-size:0.8rem; color:gray;">Jab tak chote hain, wait karo. Bada aaya toh pop!</p>
                            </div>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 20px; border-radius: 12px; text-align:center;">
                                <div style="font-size:2rem; margin-bottom:10px;">📈</div>
                                <strong style="color:#10b981;">Increasing Stack</strong>
                                <p style="font-size:0.9rem; color:gray; margin-top:8px;">Find <strong>Next Smaller</strong></p>
                                <p style="font-size:0.8rem; color:gray;">Jab tak bade hain, wait karo. Chota aaya toh pop!</p>
                            </div>
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
                            Stack Mastery Roadmap
                        </div>
                        <div class="badges">
                            <span class="badge" style="background:#10b981; color:white;">4 LEVELS</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <p style="color: gray; margin-bottom: 25px;">
                            Start from basics and climb to the top.
                        </p>
                        
                        <div style="display: flex; flex-direction: column; gap: 15px;">
                            
                            <!-- Level 1 -->
                            <a href="learn.html?topic=stack&q=next-greater-element" style="text-decoration: none; display: block; background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(124, 58, 237, 0.05)); padding: 20px; border-radius: 12px; border: 1px solid rgba(124, 58, 237, 0.3); transition: transform 0.2s;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                                            <span style="background: #7c3aed; color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">LEVEL 1</span>
                                            <strong style="color: white; font-size: 1.1rem;">Next Greater Element</strong>
                                        </div>
                                        <p style="color: gray; font-size: 0.9rem; margin: 0;">
                                            <strong style="color:#a78bfa;">Learn:</strong> The basic Monotonic Decreasing Stack.
                                        </p>
                                    </div>
                                    <i class="fas fa-arrow-right" style="color: #7c3aed;"></i>
                                </div>
                            </a>

                            <!-- Level 2 -->
                            <a href="learn.html?topic=stack&q=asteroid-collision" style="text-decoration: none; display: block; background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05)); padding: 20px; border-radius: 12px; border: 1px solid rgba(239, 68, 68, 0.3); transition: transform 0.2s;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                                            <span style="background: #ef4444; color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">LEVEL 2</span>
                                            <strong style="color: white; font-size: 1.1rem;">Asteroid Collision</strong>
                                        </div>
                                        <p style="color: gray; font-size: 0.9rem; margin: 0;">
                                            <strong style="color:#a78bfa;">Learn:</strong> Collision Logic & Left/Right interactions.
                                        </p>
                                    </div>
                                    <i class="fas fa-arrow-right" style="color: #ef4444;"></i>
                                </div>
                            </a>

                            <!-- Level 3 -->
                            <a href="learn.html?topic=stack&q=largest-rectangle-in-histogram" style="text-decoration: none; display: block; background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05)); padding: 20px; border-radius: 12px; border: 1px solid rgba(245, 158, 11, 0.3);">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                                            <span style="background: #f59e0b; color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">LEVEL 3</span>
                                            <strong style="color: white; font-size: 1.1rem;">Histogram Area</strong>
                                        </div>
                                        <p style="color: gray; font-size: 0.9rem; margin: 0;">
                                            <strong style="color:#a78bfa;">Learn:</strong> Finding Expansion Limits (Left & Right).
                                        </p>
                                    </div>
                                    <i class="fas fa-arrow-right" style="color: #f59e0b;"></i>
                                </div>
                            </a>
                            
                            <!-- Level 4 -->
                            <a href="learn.html?topic=stack&q=trapping-rain-water" style="text-decoration: none; display: block; background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05)); padding: 20px; border-radius: 12px; border: 1px solid rgba(16, 185, 129, 0.3);">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                                            <span style="background: #10b981; color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">BOSS</span>
                                            <strong style="color: white; font-size: 1.1rem;">Trapping Rain Water</strong>
                                        </div>
                                        <p style="color: gray; font-size: 0.9rem; margin: 0;">
                                            <strong style="color:#a78bfa;">Learn:</strong> 3-Bar Logic (Left, Right, Base) - "The Bowl".
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
            title: "🧩 3 Patterns",
            icon: "fas fa-puzzle-piece",
            content: `
                <div class="flashcard">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-puzzle-piece"></i>
                            The 3 Stack Patterns
                        </div>
                    </div>
                    <div class="card-body">
                        <p style="color: gray; margin-bottom: 25px;">
                            Ye 3 patterns samajh liye toh Stack ke 80% questions solved!
                        </p>
                        
                        <!-- Pattern 1: NGE -->
                        <div style="background: rgba(124, 58, 237, 0.05); border: 1px solid rgba(124, 58, 237, 0.2); border-radius: 16px; padding: 25px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                                <span style="background: #7c3aed; color: white; padding: 6px 12px; border-radius: 8px; font-weight: 700;">1</span>
                                <h3 style="color: #a78bfa; margin: 0;">The Monotonic Decreasing Stack</h3>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;"><strong>Pehchaan:</strong> "Next Greater Element dhoondo"</p>
                            <div style="background: #0f172a; padding: 12px; border-radius: 8px; font-family: Consolas; color: #7dd3fc; font-size: 0.9rem;">
                                while stack and arr[stack[-1]] < arr[i]:<br>
                                &nbsp;&nbsp;smaller_index = stack.pop()<br>
                                &nbsp;&nbsp;result[smaller_index] = arr[i]  # Founded Next Greater!<br>
                                stack.append(i)
                            </div>
                            <p style="margin-top: 12px; color: gray; font-size: 0.9rem;">
                                <strong>Logic:</strong> Chote wale wait karenge, Bada aayega toh sabko pop kar dega.
                            </p>
                        </div>
                        
                        <!-- Pattern 2: Expansion Limits -->
                        <div style="background: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 16px; padding: 25px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                                <span style="background: #f59e0b; color: white; padding: 6px 12px; border-radius: 8px; font-weight: 700;">2</span>
                                <h3 style="color: #fbbf24; margin: 0;">The Expansion Limits (Previous Smaller)</h3>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;"><strong>Pehchaan:</strong> "Area, Rectangle, ya Span dhoondo"</p>
                            <div style="background: #0f172a; padding: 12px; border-radius: 8px; font-family: Consolas; color: #7dd3fc; font-size: 0.9rem;">
                                while stack and arr[stack[-1]] >= arr[i]:<br>
                                &nbsp;&nbsp;h = arr[stack.pop()]  # Height is fully determined<br>
                                &nbsp;&nbsp;w = i - stack[-1] - 1  # Right Limit - Left Limit - 1<br>
                                &nbsp;&nbsp;max_area = max(max_area, h * w)
                            </div>
                            <p style="margin-top: 12px; color: gray; font-size: 0.9rem;">
                                <strong>Logic:</strong> Jab chota element aata hai, toh current height ka raaj khatam. Calculate kar lo!
                            </p>
                        </div>
                        
                        <!-- Pattern 3: Collision / Matching -->
                        <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 16px; padding: 25px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                                <span style="background: #ef4444; color: white; padding: 6px 12px; border-radius: 8px; font-weight: 700;">3</span>
                                <h3 style="color: #f87171; margin: 0;">Collision & Matching</h3>
                            </div>
                            <p style="color: gray; margin-bottom: 15px;"><strong>Pehchaan:</strong> "Brackets, Asteroids, ya adjacent pair removal"</p>
                            <div style="background: #0f172a; padding: 12px; border-radius: 8px; font-family: Consolas; color: #7dd3fc; font-size: 0.9rem;">
                                if stack and matches(stack[-1], current):<br>
                                &nbsp;&nbsp;stack.pop()  # Destroy/Match/Resolves<br>
                                else:<br>
                                &nbsp;&nbsp;stack.append(current)  # Wait for partner
                            </div>
                            <p style="margin-top: 12px; color: gray; font-size: 0.9rem;">
                                <strong>Logic:</strong> Aane wala element stack ke top se react karta hai.
                            </p>
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
                            Common Stack Mistakes
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
                                <strong style="color: #f87171; font-size: 1.1rem;">Storing Values Instead of Indices</strong>
                            </div>
                            <p style="color: gray; margin-bottom: 12px;">Values store karne se aap original position lose kar dete ho. Width kaise nikaloge?</p>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div style="background: #0f172a; padding: 12px; border-radius: 8px;">
                                    <p style="color: #ef4444; margin-bottom: 8px; font-size: 0.85rem;">❌ WRONG</p>
                                    <code style="color: #f87171; font-family: Consolas; font-size: 0.85rem;">stack.append(arr[i])</code>
                                </div>
                                <div style="background: #0f172a; padding: 12px; border-radius: 8px;">
                                    <p style="color: #10b981; margin-bottom: 8px; font-size: 0.85rem;">✅ RIGHT</p>
                                    <code style="color: #34d399; font-family: Consolas; font-size: 0.85rem;">stack.append(i)</code>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Mistake 2 -->
                        <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 20px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                                <span style="background: #f59e0b; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">2</span>
                                <strong style="color: #fbbf24; font-size: 1.1rem;">Infinite Loop / TLE</strong>
                            </div>
                            <p style="color: gray; margin-bottom: 12px;">While loop condition galat likhne se stack kabhi empty nahi hota ya infinite loop chalta hai.</p>
                            <div style="background: #0f172a; padding: 12px; border-radius: 8px;">
                                <code style="color: #f59e0b; font-family: Consolas; font-size: 0.85rem;">
                                    # Always check stack is not empty FIRST<br>
                                    while stack and arr[stack[-1]] < arr[i]:<br>
                                    &nbsp;&nbsp;stack.pop()
                                </code>
                            </div>
                        </div>

                    </div>
                </div>`
        }
    ]
};
