def search(nums, target):
    left = 0
    right = len(nums) -1

    while left <= right:
        mid = left + (right-left)//2

        if nums[mid] == target:
            return True

        if nums[left] == nums[mid] == nums[right]: # fog hai bhai.
            left +=1
            right -=1

        if  nums[left] <=  nums[mid] :
            if nums[left] <= target < nums[right]:
                right = mid -1

            else:
                left = mid+1

        else:
            if nums[mid] <= target < nums[right]:
                left = mid +1

            else:
                right = mid -1

    return False




print(search([2,5,6,0,0,1,2], target = 0))
