from bloomfilter import BloomFilter
import pickle
import json
import os
import file_path as fp

#word_to_be_check, number_of_words, probabilities_per
def start_bloom(word_absent,n,p): 
	#print(os.getcwd())
	word_present = []
	with open(fp.BloomFilterModel,'r',encoding='utf8') as json_file:
		for i in json_file.read().split():
			word_present.append(i)
	bloomf = BloomFilter(n,p)
	"""
	print("Size of bit array:{}".format(bloomf.size))
	print("False positive Probability:{}".format(bloomf.fp_prob))
	print("Number of hash functions:{}".format(bloomf.hash_count))
	
	with open("test", "wb") as fp:   #Pickling
		pickle.dump(l, fp)
	"""
	for item in word_present:
		bloomf.add(item)
	res = []
	
	for i in word_absent:
	    import string
	    for c in string.punctuation:
	        i = i.replace(c,"")
	    for j in ["೦","೧","೨","೩","೪","೫","೬","೭","೮","೯"]:
	        i = i.replace(j,"")
	    if(bloomf.check(i)):
	        if i not in word_present:
	            res.append(i)
	    else:
	        res.append(i)
	return res
