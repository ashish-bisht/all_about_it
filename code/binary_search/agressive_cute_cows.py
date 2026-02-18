



def cute_cows(stalls, cows):

    stalls.sort()
    left = 1 
    right = stalls[-1] - stalls[0]

    result = 1

    while left <= right :
        mid = (right-left)//2

        if can_place_cows(stalls, cows, cow_distance):
            result = mid
            left = mid +1

        else:
            right = mid-1

    return result


def can_place_cows(stalls, cows, cow_distance):
    # greedy lagao, phele cow ko first pe bethao, cute cow
    
    last_cow_postition = stalls[0]

    for index in range(1,len(stalls)):
        if last_cow_postition - stalls[index] >= cow_distance:
            last_cow_postition = stalls[index]
            cows -=1

    
        if cows == 0:
            return True #fast return  

    return False





