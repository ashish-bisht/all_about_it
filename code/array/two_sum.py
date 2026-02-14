from __future__ import annotations

from typing import List


def two_sum(nums: List[int], target: int) -> List[int]:
    """Return indices of two numbers such that they add up to target.

    Approach (one-pass HashMap):
    - Maintain a map: value -> index (numbers we've already seen)
    - For each num at current index, compute complement = target - num
    - If complement already exists in map: we found the pair
    - Else store current num with its index

    Time: O(N)
    Space: O(N)
    """

    seen: dict[int, int] = {}

    for index, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], index]

        # store AFTER checking to avoid using the same element twice
        seen[num] = index

    return [-1, -1]