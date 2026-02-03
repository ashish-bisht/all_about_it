def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])  # Start time se sort
    result = [intervals[0]]  # Pehla interval daal diya
    
    for index in range(1, len(intervals)):
        # ⚠️ IMPORTANT: result ki length intervals se CHHOTI hai!
        # result[index-1] WRONG - IndexError aayega
        # result[-1] CORRECT - last merged interval check karo
        
        if result[-1][1] >= intervals[index][0]:  # Overlap hai?
            result[-1][1] = max(result[-1][1], intervals[index][1])  # Merge: max end lo
        else:  # No overlap
            result.append(intervals[index])  # Naya interval add karo
    
    return result