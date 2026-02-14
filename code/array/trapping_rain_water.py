def trapping_water(nums):
    """LeetCode 42: Trapping Rain Water (Two Pointers).

    Idea:
    - Track max wall seen so far on both ends.
    - Always process the smaller side, because water level on that side is bounded.
    """

    max_left_height = nums[0]
    max_right_height = nums[len(nums) - 1]

    left = 0
    right = len(nums) - 1

    trapped_water = 0

    while left < right:
        if nums[left] < nums[right]:
            if max_left_height > nums[left]:
                trapped_water += max_left_height - nums[left]
            else:
                max_left_height = nums[left]

            left += 1

        else:
            if max_right_height > nums[right]:
                trapped_water += max_right_height - nums[right]
            else:
                max_right_height = nums[right]

            right -= 1

    return trapped_water


if __name__ == "__main__":
    print(trapping_water([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))  # 6
    print(trapping_water([4, 2, 0, 3, 2, 5]))  # 9
