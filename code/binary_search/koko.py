def koko(piles, hours):
    # Saaf seedhi baat - Koko ko help karo kele khane mein
    # Take wo sare kele kha le saans lete lete 🍌
    
    left_pointer = 1            # Ek to min khayega koko
    right_pointer = max(piles)  # Atleast 1 to khayega hi
    result = right_pointer
    
    while left_pointer <= right_pointer:
        # Ab speed try karte hain
        koko_current_speed = left_pointer + (right_pointer - left_pointer) // 2
        
        # Check karo kitna time lagta hai is speed pe
        hours_took = 0
        for pile in piles:
            hours_took += (pile + koko_current_speed - 1) // koko_current_speed
        
        if hours_took <= hours:  # Time mein ho gaya!
            result = koko_current_speed
            right_pointer = koko_current_speed - 1  # Aur slow try karo
        else:  # Time zyada lag raha
            left_pointer = koko_current_speed + 1  # Speed badhao
    
    return result