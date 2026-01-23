
#sabse phele hum recursion se start krege 

def word_break(s, wordDict):
    word_set = set(wordDict)

    memo = {}
    def dfs(start):
        if start == len(s):
            return True
        if start in memo:
            return memo[start]
            
        # yahan hum start+1 se karenge kyunk agar ni kiya to empty string aaega [0:0] is case mein, and range last ke exclusive hoti hai ,
        #  isliye len(s)+1 tak jaate hai. 
        for end in range(start+1, len(s)+1):
            cur_word = s[start:end]

            if cur_word in word_set and dfs(end): # ye ab baki ka dekh ke dega answer agar sabh true aaya to true
                memo[start] = True
                return True

        memo[start] = False
        return False

    return dfs(0)

        


print(word_break("leetcode", ["leet", "code"]))
print(word_break("applepenapple", ["apple", "pen"]))
print(word_break("catsandog", ["cats", "dog", "sand", "and", "cat"]))