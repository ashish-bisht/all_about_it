def maximum_sub_array(nums):
    prev_max = nums[0]
    max_so_far = nums[0]
    
    for index in range(1, len(nums)):  # ✅ Start from 1
        cur_max = max(prev_max + nums[index], nums[index])  # ✅ Use index
        max_so_far = max(max_so_far, cur_max)
        prev_max = cur_max
    
    return max_so_far