def search(nums, target):

    left_pointer = 0
    right_pointer = len(nums)-1

    while left_pointer <= right_pointer: # ye important hai btanake = kyun.
        
        mid = left_pointer + (right_pointer - left_pointer)//2

        if nums[mid] == target:
            return True
        
        #fog hatao 
        if nums[left_pointer] == nums[mid] == nums[right_pointer]:
            left +=1
            right-=1
            continue
        
        # we check which side is sorted. 

        if nums[left_pointer] <= nums[mid]: # iska matlab left sorted hai.
            #ab check kar, ke target is side hai ke nahin.
            if nums[left_pointer] <= target < mid: # ismein mid ni aaega kyunki uper check ho chuka hai, agar target or mid ek hai to mil gaya na.
                right_pointer = mid -1
            else:
                left = mid+1

        else: #iska matlab right sorted hai.
            if nums[mid] < target <= nums[right_pointer]:
                left_pointer = mid +1
            else:
                right_pointer = mid -1



