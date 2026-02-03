def koko(piles, hours):
    # saaf sede baat humein koko ke help karne hai khane mein take wo kele bhe sare kha le saans lete lete.

    left_pointer = 1 # ek to min kaega koko.
    right_pointer = max(piles), # matlab atlest 1 to 

    result = right_pointer 

    while left_pointer <= right_pointer:
        koko_current_speed = left_pointer + (right_pointer - left_pointer)//2

        # ab speed mil gayi haha, ab check kar koko ko kitna time lagta haha,
        hours_took = 0

        for pile in piles:
            hours += (pile + koko_current_speed -1)//koko_current_speed

            if hours_took <= hours:
                result = koko_current_speed
                right_pointer = koko_current_speed -1

            else:
                left_pointer = koko_current_speed+1
    
    return result





