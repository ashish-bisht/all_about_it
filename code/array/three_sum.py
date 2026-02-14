from __future__ import annotations

from typing import List


def three_sum(nums: List[int]) -> List[List[int]]:
    """Return all unique triplets [a,b,c] such that a+b+c == 0.

    Strategy: sort + fix an anchor + solve 2Sum using two pointers.

    Steps:
    1) Sort nums
    2) For each index as anchor:
       - skip duplicate anchors
       - run two pointers (left, right) on remaining subarray
       - when sum==0, record and skip duplicate left/right values

    Time: O(N^2)
    Space: O(1) extra (ignoring output)
    """

    nums.sort()
    n = len(nums)
    triplets: List[List[int]] = []

    for index in range(n - 2):
        anchor = nums[index]

        # Skip duplicate anchors
        if index > 0 and anchor == nums[index - 1]:
            continue

        left = index + 1
        right = n - 1

        while left < right:
            total = anchor + nums[left] + nums[right]

            if total == 0:
                triplets.append([anchor, nums[left], nums[right]])
                left += 1
                right -= 1

                # Skip duplicate left values
                while left < right and nums[left] == nums[left - 1]:
                    left += 1

                # Skip duplicate right values
                while left < right and nums[right] == nums[right + 1]:
                    right -= 1

            elif total < 0:
                left += 1
            else:
                right -= 1

    return triplets
