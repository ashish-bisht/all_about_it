def trap(height):
    left_max_height = height[0]
    right_max_height = height[len(height)-1]
    
    left_pointer = 0
    right_pointer = len(height)-1
    
    trapped_water = 0
    
    while left_pointer < right_pointer:
        
        if height[left_pointer] < height[right_pointer]:  # Left side chhota
            if height[left_pointer] < left_max_height:  # Pani trap hoga
                trapped_water += left_max_height - height[left_pointer]
            else:  # Naya max mila
                left_max_height = height[left_pointer]
            left_pointer += 1  # L aage badho
            
        else:  # Right side chhota/barabar
            if height[right_pointer] < right_max_height:  # Pani trap hoga
                trapped_water += right_max_height - height[right_pointer]
            else:  # Naya max mila
                right_max_height = height[right_pointer]
            right_pointer -= 1  # R peeche aao
    
    return trapped_water