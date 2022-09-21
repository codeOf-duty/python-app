import openpyxl
import hashlib
import pandas as pd
import snippets
import os
import shutil
import textract
import subprocess

def XlsxToJSON():
    temp = []
    for i in os.listdir('datasets/docxDataset/'):
        temp = []
        if i.endswith('.xlsx'):
            temp = snippets.xlxsToList('datasets/docxDataset/'+i)
            id_ = hashlib.md5(i.encode('utf-8')).hexdigest()[:12]
            with open("datasets/newUpdates/"+id_+"-"+str(len(temp))+".json", "w", encoding='utf-8') as infile:
                infile.write("\n".join(temp))
            shutil.move('datasets/docxDataset/'+i, 'train-data/'+i)

if "__main__" == __name__:
    XlsxToJSON()
