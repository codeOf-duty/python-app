from bloomfilter import BloomFilter
import pickle
import json
import os
import file_path as fp 

word_present = []
with open(fp.BloomFilterModel,'r',encoding='utf8') as json_file:
	for i in json_file.read().split():
		word_present.append(i)
bloomf = BloomFilter(100,0.5)
for item in word_present:
	bloomf.add(item)

def bloom_lookup(i):
    if(bloomf.check(i)):
	    if i not in word_present:
		    return "False"
    else:
	    return "False"
    return "True"
