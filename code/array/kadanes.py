def maximum_sub_array(nums):
    prev_max = nums[0]
    max_so_far = nums[0]

    for index in range(1, len(nums)):
        cur_max = max(prev_max + nums[index], nums[index])
        max_so_far = max(max_so_far, cur_max)
        prev_max = cur_max

    return max_so_far


if __name__ == "__main__":
    print(maximum_sub_array([-2, 1, -3, 4, -1, 2, 1, -5, 4]))  # 6
    print(maximum_sub_array([-5, -2, -3]))  # -2