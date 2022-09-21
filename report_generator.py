import re
import os
import time
import file_path as fp
"""
CurrentBuilding:
    Bloom_Dataset.json
    Symspell_Datset.txt

Completed : 
Bloom_Dataset.json -> collection.json
Symspell_Dataset.txt -> freq_kan.txt

"""
def last_date(path):
    return time.ctime(os.stat(path).st_mtime)

def checkBuilding(path, files):
    files_ = os.listdir(path)
    res = []
    for i in files:
        if i in files_:
            res.append(i.split("_")[0])
    return res

def count_flen(path):
    with open(path,'r',encoding="utf8") as infile:
        data = infile.read()
        size = os.stat(path).st_size
        return len(data.split("\n")), str(size)+" kb"

def count_ext(list_, ext):
    count = 0
    for i in list_:
        if i.split(".")[-1] == ext:
            count += 1
    return count

def report_gen():
    res = {}
    
    datasetPath = 'train-data/'
    BloomfilterPath = fp.BloomFilterModel
    SymspellPath = fp.SymspellModel
    UserWordPath = fp.userWordFile
    files_ = os.listdir(datasetPath)
    totalDataset = len(files_)
    totalDatasetSize = 0
    for ele in os.scandir(datasetPath):
        totalDatasetSize += os.stat(ele).st_size
    """
    print("BloomFilter Dataset ",count_flen(BloomfilterPath))
    print("Last Bloomfilter build : ",last_date(BloomfilterPath))
    print("Symspell Dataset ",count_flen(SymspellPath))
    print("Last Symspell build : ",last_date(SymspellPath))
    print("UserWords Dataset ",count_flen(UserWordPath))
    print("Last UserWord update : ",last_date(UserWordPath))
    print("Total Dataset ",totalDataset)
    print("File Size ",totalDatasetSize,"kb")
    print("Currently building ",checkBuilding('datasets/',["Bloom_Dataset.json","Symspell_Dataset.txt"]))
    print("Xlxs Format ",count_ext(files_,"xlsx"))
    print("Docx Format ",count_ext(files_,"docx"))
    print("Other Format ",totalDataset-(count_ext(files_,"xlsx")+count_ext(files_,"docx")))
    """
    temp = count_flen(BloomfilterPath)
    res["BloomFilter"] = [temp[0],temp[1],last_date(BloomfilterPath)]
    temp = count_flen(SymspellPath)
    res["Symspell"] = [temp[0],temp[1],last_date(SymspellPath)]
    temp = count_flen(UserWordPath)
    res["UserWord"] = [temp[0],temp[1],last_date(UserWordPath)]
    res["Dataset"] = [str(totalDataset)+" files",str(totalDatasetSize)+" kb",None]
    res["building"] = checkBuilding('datasets/',["Bloom_Dataset.json","Symspell_Dataset.txt"])
    res["Dataset_Collection"] = ['1079','200','1']
    return res
