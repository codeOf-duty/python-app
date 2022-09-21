import os 
import file_path as fp
import shutil
from collections import Counter

def symspell_merger():
    if len(os.listdir('datasets/newUpdates-freq/')) > 1:
        res = {}
        with open(fp.SymspellModel,"r",encoding="utf-8") as infile:
             data = infile.read()
             for i in data.split("\n"):
                temp = i.split(" ")
                res["".join(temp[:-1])] = temp[-1]

        print(len(res))
        for i in os.listdir("datasets/newUpdates-freq/"):
            PATH = "datasets/newUpdates-freq/"+i
            if PATH != "datasets/newUpdates-freq/Readme.txt":
                with open(PATH,"r", encoding="utf-8") as infile1:
                    data = infile1.read()
                    for i in data.split("\n"):
                        temp = i.split(" ")
                        if len(temp) >= 2:
                            if "".join(temp[:-1]) not in res:
                                res["".join(temp[:-1])] = temp[-1]
                            else:
                                res["".join(temp[:-1])] = int(temp[-1])+int(res["".join(temp[:-1])])
                os.remove(PATH)
        
        print(len(res))
        # Write new dataset
        with open("datasets/Symspell_Dataset.txt", "w",encoding="utf8") as infile:
            for i in res:
                infile.write("{} {}\n".format(i, res[i]))
        print("completed")
        shutil.copy2("datasets/Symspell_Dataset.txt",fp.SymspellModel)
        os.remove("datasets/Symspell_Dataset.txt")

