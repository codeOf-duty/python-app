import os
import file_path as fp
import shutil
import sys
import time
from pathlib import Path

def freq_Alloter():
    corpus = fp.BloomFilterModel
    data = ""
    with open(corpus,'r',encoding="utf8") as outFile:
        data = outFile.read()
    temp = list(map(str,data.split()))
    n = len(temp)
    with open("datasets/Symspell_Dataset.txt",'w',encoding="utf8") as f:
        f.seek(0)  # sets  point at the beginning of the file
        f.truncate()  # Clear previous content
        f.close() 
    
    res = set(temp)

    for i in res:
        with open("datasets/Symspell_Dataset.txt",'a',encoding="utf8") as inFile:
            inFile.write("{}  {}\n".format(i.replace(" ",""),temp.count(i)))
    shutil.copy2("datasets/Symspell_Dataset.txt",fp.SymspellModel)
    time.sleep(3)
    path = Path("datasets/Symspell_Dataset.txt")
    if(path.is_file()):
        os.remove("datasets/Symspell_Dataset.txt")


