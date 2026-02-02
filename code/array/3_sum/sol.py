def three_sum(nums):
    nums.sort()  # Step 1: Sort array
    triplets = []
    
    for i in range(len(nums)):
        # Skip duplicate anchors
        if i > 0 and nums[i-1] == nums[i]:
            continue
        
        # Two pointer approach
        left, right = i+1, len(nums)-1
        
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            
            if total == 0:
                triplets.append((nums[i], nums[left], nums[right]))
                left += 1
                right -= 1
                # Skip duplicates for both pointers
                while left < right and nums[left] == nums[left-1]:
                    left += 1
                while left < right and nums[right] == nums[right+1]:
                    right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
    
    return triplets