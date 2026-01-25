from collections import defaultdict
from collections import deque

def course_schedule(num_courses, prerequisites):
    #ismein sabse phele , graph bnao, abhi bas prequite hai, and graph mein prequeste daalo, kyunki wo phele khatam karna hai, matlab ye khatam hoga tabhi aage jaegana
    graph = defaultdict(list) # take append error na aaye.
    in_degree = [0]* num_courses #ek in degree , ismein pata chalega ke konsa ciurse ke kine dependencies hain.
    for prerequisite in prerequisites:
        course, pre_course = prerequisite
        graph[pre_course].append(course) # kyunki pre_course phele khatam karna hai.
        in_degree[course] +=1

    

    que = deque()
    # now build our first que, put courses which have 0 in degre.
    for course in range(len(in_degree)):
        if in_degree[course] == 0:
            que.append(course)


        
        

    # visited = set() ye chaiye ni, kyunki hum in degree se dekh rahe hain

    # ab jis course ke 0 hai in degree, matlab koi pre nahin hai usko que meindaal de bhai

    # ab bas kardo start bfs :)
    proceesed_courses = 0
    while que:
        cur_course = que.popleft()
        for neighbour in graph[cur_course]:
            in_degree[neighbour]-=1
            if in_degree[neighbour] == 0:
                que.append(neighbour)
        proceesed_courses +=1

    return proceesed_courses == num_courses 


print(course_schedule(2, prerequisites = [[1,0],[0,1]]
))
