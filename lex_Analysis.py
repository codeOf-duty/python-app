import re
import os
import sys  
import shutil

def force_rp(PATH):
    data = []
    with open(PATH,'r') as inFile:
        data = inFile.read()
        
    punc = '”“”ʼ….ʻ…”-ʼ_,`^'
    for ele in data:
      if ele in punc:
          data = data.replace(ele,"")
          data = data.strip()
    with open(PATH,'w') as inFile:
        inFile.write(data)
    return True

if "__main__" == __name__:
    if len(sys.argv) == 2 :
        opt = sys.argv[1]
        #print(opt)
        if opt == "json":
            shutil.copy2('datasets/collection.json','datasets/collection-backup.json')
            if force_rp('datasets/collection.json'):
                print("Successfully")
            else:
                print("Not Procecced")
        elif opt == "txt":
            shutil.copy2('datasets/freq_kan.txt','datasets/freq_kan-backup.txt')
            if force_rp('datasets/freq_kan.txt'):
                print("Successfully")
            else:
                print("Not Procecced")
        else:
            print("Oops.. SOmething WeNts WroNg")
    else:
        print("No Argument i.e json, txt")
