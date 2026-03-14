def longest_common_subsequence(text1, text2):
    
    def dfs(index1, index2):
        if index1 == len(text1) or index2 == len(text2):
            return 0
        
        take = 0
        
        if text1[index1] == text2[index2]:
            return 1 + dfs(index1+1, index2+1)
            
        skip_text1 = dfs(index1+1, index2)
        skip_text2 = dfs(index1, index2+1)
        
        res = max(skip_text1, skip_text2)