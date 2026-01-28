def max_prod_subarray(nums):
    max_so_far = nums[0]
    min_so_far = nums[0]
    result = nums[0]

    for index in range(1, len(nums)):
        temp_max = max_so_far

        max_so_far = max(nums[index], nums[index]* max_so_far, nums[index]*min_so_far) 
        min_so_far = min(nums[index], nums[index]* temp_max,   nums[index]*min_so_far)

        result = max(max_so_far, result)

    return result



print(max_prod_subarray([2,3,-2,4]))