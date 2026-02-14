def trapping_water(nums):

    max_left_height = nums[0]
    max_right_height = nums[len(nums)-1]

    left = 0

    right = len(nums)-1

    trapped_water = 0

    while left < right:
        # mera kaam hai pani bharna to agar left se kam hai to matlab pani bharega, nahin to left max badhao, and left ko bhe and vice versa right mein
        # ab check kar ke left nums chote hai ya right nums:

        if nums[left] < nums[right]:
            if max_left_height > nums[left]:
                trapped_water+= max_left_height - nums[left]
                

            else:
                max_left_height = nums[left]

            left +=1

        else:
            if max_right_height > nums[right]:
                trapped_water += max_right_height - nums[right]

            else:
                max_right_height = nums[right]

            right -=1

