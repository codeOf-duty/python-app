import pandas as pd
import hashlib
import shutil
import snippets
import os
from collections import Counter
import docx

def files2freq():
    if len(os.listdir("datasets/docxDataset-freq/")) > 1:
        snippets.convertDoc2Docx('datasets/docxDataset-freq/')
        for i in os.listdir("datasets/docxDataset-freq/"):
            i = "datasets/docxDataset-freq/"+i
            if i.endswith('.docx'):
                data = snippets.DocxToData(i)
                processed_data = snippets.DocxToList(i)
                id_ = hashlib.md5(i.encode('utf-8')).hexdigest()[:12]
                res = Counter(processed_data)
                with open("datasets/newUpdates-freq/new_freq_"+id_+"-"+str(len(res))+".txt", "w", encoding='utf-8') as infile:
                    for j in res:
                        infile.write("{} {}\n".format(j,res[j]))
                shutil.move('datasets/docxDataset-freq/'+i.split("/")[-1], 'train-data/'+i.split("/")[-1])
            elif i.endswith('.xlsx'):    # frequency files only 
                df = pd.read_excel(i) 
                res = df.to_numpy()
                id_ = hashlib.md5(i.encode('utf-8')).hexdigest()[:12]
                with open("datasets/newUpdates-freq/new_freq_"+id_+"-"+str(len(res))+".txt", "w", encoding='utf-8') as infile:
                    for j in res:
                        infile.write("{} {}\n".format(j[0],j[1]))
                shutil.move('datasets/docxDataset-freq/'+i.split("/")[-1], 'train-data/'+i.split("/")[-1])
        print("Completed....")

