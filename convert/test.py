#!/usr/bin/python
import sys
import trueskill
import json
class MyDict(dict):
    def __getattr__(self,name):
        return self[name]
    def __setattr__(self,name,value):
        self[name] = value
data = json.loads(sys.argv[1])
data = [MyDict(j) for j in data]
trueskill.AdjustPlayers(data)
print json.dumps(data)