import os
import snippets
import sys  
import time
import shutil
import file_path as fp

def merger(): 
    if len(os.listdir('datasets/newUpdates/')) > 1:
        res = list()
        temp = []
        with open("datasets/Bloom_Dataset.json", "w",encoding="utf8") as infile:
            infile.write("")
            
        with open(fp.BloomFilterModel, "r",encoding="utf8") as outfile:
            f = outfile.read()
        for i in f.split():
            res.append(i)
        f = ""
        for i in os.listdir('datasets/newUpdates/'):
            if i.split(".")[-1] == "json":
                with open("datasets/newUpdates/"+i, "r",encoding="utf8") as outfile:
                    f += outfile.read()
                try:
                    os.remove('datasets/newUpdates/'+i)
                except:
                    pass
                                
        for i in f.split():
            res.append(i)
        
        res = list(set(res))
        
        with open("datasets/Bloom_Dataset.json", "w",encoding="utf8") as infile:
            infile.write("\n".join(res))
        
        
        shutil.copy2("datasets/Bloom_Dataset.json",fp.BloomFilterModel)
        #time.sleep(3)
        os.remove("datasets/Bloom_Dataset.json")

