import docx
import hashlib
import pandas as pd
import snippets
import os
import shutil
import textract
import subprocess
import time

def DocxToJSON():
    temp = []
    snippets.convertDoc2Docx('datasets/docxDataset/')
    print("length files {}".format(len(os.listdir('datasets/docxDataset/'))))
    for i in os.listdir('datasets/docxDataset/'):
        temp = []
        if i.endswith('.docx'):
            temp = snippets.DocxToList('datasets/docxDataset/'+i,opt=False)
            id_ = hashlib.md5(i.encode('utf-8')).hexdigest()[:12]
            with open("datasets/newUpdates/"+id_+"-"+str(len(temp))+".json", "w", encoding='utf-8') as infile:
                infile.write("\n".join(temp))
            shutil.move('datasets/docxDataset/'+i, 'train-data/'+i)

if "__main__" == __name__:
    st = time.time()
    DocxToJSON()
    en = time.time()
    print(en-st)
