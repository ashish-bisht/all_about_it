def  product_except_self(nums):
    res = [1] * len(nums)

    left_product  = 1
    right_product = 1

    for index in range(len(nums)):
        res[index] *= left_product
        
        left_product *= nums[index]

    for index in range(len(nums)-1, -1, -1):
        res[index] *= right_product
        right_product *= nums[index]

    return res


print(product_except_self( nums = [1,2,3,4]))