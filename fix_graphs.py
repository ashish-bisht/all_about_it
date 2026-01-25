
import os
import re

file_path = "/Users/ashishbisht/Documents/2026/prep/all_about_it/data/dsa/graphs.js"

with open(file_path, "r") as f:
    lines = f.readlines()

# Find the start of the detect-cycle-directed block
start_idx = -1
for i, line in enumerate(lines):
    if 'id: "detect-cycle-directed"' in line:
        start_idx = i
        break

if start_idx == -1:
    print("Error: Could not find detect-cycle-directed ID")
    exit(1)

# Find the visual property within this block
visual_start_idx = -1
for i in range(start_idx, len(lines)):
    if 'visual: `' in lines[i]:
        visual_start_idx = i
        break

if visual_start_idx == -1:
    print("Error: Could not find visual property start")
    exit(1)

# Find the end of the visual property (closing backtick)
visual_end_idx = -1
for i in range(visual_start_idx + 1, len(lines)):
    if '`,' in lines[i] or (lines[i].strip() == '`' and i + 1 < len(lines) and ',' in lines[i+1]): 
        # Checking for backtick followed by comma, or backtick on its own line then comma
        visual_end_idx = i
        break
    if lines[i].strip().endswith('`,') or lines[i].strip() == '`,':
         visual_end_idx = i
         break

if visual_end_idx == -1:
    print("Error: Could not find visual property end")
    # Debug print next 20 lines
    for j in range(visual_start_idx, min(visual_start_idx+20, len(lines))):
        print(f"{j}: {lines[j]}")
    exit(1)

print(f"Replacing lines {visual_start_idx} to {visual_end_idx}")

# Replacement content
new_visual = """                visual: `
                    <h4 style="color:#c026d3;">🔄 DFS States: Visited vs Recursion Stack</h4>
                    <div style="display:flex; gap:20px; margin:20px 0; max-width:600px;">
                        
                        <!-- Graph Visual -->
                        <div style="flex:1; display:flex; flex-direction:column; align-items:center;">
                            <div style="margin-bottom:10px; color:#cbd5e1; font-size:12px;">Graph State</div>
                            <div style="position:relative; width:100px; height:100px;">
                                <!-- Node 0 -->
                                <div style="position:absolute; top:0; left:35px; width:30px; height:30px; background:#fbbf24; color:black; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold;">0</div>
                                
                                <!-- Node 1 -->
                                <div style="position:absolute; top:40px; left:0; width:30px; height:30px; background:#fbbf24; color:black; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold;">1</div>
                                
                                <!-- Node 2 -->
                                <div style="position:absolute; top:40px; right:0; width:30px; height:30px; background:#ef4444; color:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; border:2px solid #fbbf24;">2</div>

                                <!-- Node 1 -> 2 Arrow -->
                                <div style="position:absolute; top:60px; left:30px; width:40px; height:2px; background:#64748b;"></div>
                            </div>
                        </div>

                        <!-- Stack Visual -->
                        <div style="flex:1; background:#1e293b; padding:15px; border-radius:8px;">
                            <div style="margin-bottom:10px; color:#cbd5e1; font-size:12px; text-align:center;">Recursion Stack (Path)</div>
                            <div style="display:flex; flex-direction:column; gap:5px; align-items:center;">
                                
                                <div style="width:80%; padding:8px; background:#fbbf24; color:black; border-radius:4px; text-align:center; font-size:12px;">
                                    Stack: [0, 1]
                                </div>
                                
                                <div style="color:#cbd5e1;">↓</div>
                                
                                <div style="width:80%; padding:8px; background:#ef4444; color:white; border-radius:4px; text-align:center; font-size:12px; border:1px solid #fbbf24;">
                                    Try Visit 2
                                </div>

                                <div style="margin-top:10px; font-size:11px; color:#f87171; text-align:center;">
                                    ⚠️ 2 is already in Stack (Ancestry)! 
                                    <br><strong>CYCLE DETECTED</strong>
                                </div>

                            </div>
                        </div>

                    </div>
                `,\n"""

# Create new list of lines
new_lines = lines[:visual_start_idx] + [new_visual] + lines[visual_end_idx+1:]

with open(file_path, "w") as f:
    f.writelines(new_lines)

print("Successfully replaced content using line scanning!")
