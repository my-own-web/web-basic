# -*- coding: utf-8 -*-
import random

def check(l1, l2):
    # 모두 다른 사람과 매칭되어야 한다
    for i in range(len(l1)):
        if l1[i]==l2[i]:
            return 0
    return 1

people=input().split()
result=people[:]
while check(people, result)==0:
    random.shuffle(result)
print(people)
print(result)
