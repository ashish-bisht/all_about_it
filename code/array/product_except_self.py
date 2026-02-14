def product_except_self(nums):
    """LeetCode 238: Product of Array Except Self.

    Return an array answer such that answer[i] is the product of all the
    elements of nums except nums[i].

    Constraints:
    - No division
    - O(n) time
    - O(1) extra space (output array doesn't count)
    """

    res = [1] * len(nums)

    left_product = 1
    for index in range(len(nums)):
        res[index] *= left_product
        left_product *= nums[index]

    right_product = 1
    for index in range(len(nums) - 1, -1, -1):
        res[index] *= right_product
        right_product *= nums[index]

    return res


if __name__ == "__main__":
    print(product_except_self([1, 2, 3, 4]))  # [24, 12, 8, 6]
    print(product_except_self([1, 0, 3, 4]))  # [0, 12, 0, 0]
