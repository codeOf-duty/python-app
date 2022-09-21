import random
import os
import platform
import pandas as pd
from sympound import sympound
from pyxdameraulevenshtein import damerau_levenshtein_distance
import file_path as fp

limit_test = 1000          # correct words size
timesLetter = 12           # letters to replace in correct word

distancefun = damerau_levenshtein_distance
ssc = sympound(distancefun=distancefun, maxDictionaryEditDistance=3)
ssc.load_dictionary(fp.SymspellModel, term_index=0, count_index=1)

def suggestionReturner(word__):
    return ssc.lookup_compound(input_string=word__, edit_distance_max=3)


correct = []
wrong = []
actual = []

data = ""

with open(fp.SymspellModel) as infile:
    data = infile.read()

data = data.split("\n")

dic = {}
for i,j in zip(range(1,len(data)),data):
    if len(j) >= 3:
        dic[i] = j.split()[0]

id_ = list(dic.keys())
pre_id = []

i = 0
while(i < limit_test):
    idx = random.choice(id_)
    if idx not in pre_id:
        pre_id.append(idx)
        correct.append(dic[idx])
        i += 1

# Letter Generator

"""  
letters = set()
english = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcqazwsxedcrfvtgbyhnujmiklop"
numbers = "1234567890"

for i in correct:
    for j in i:
        if j not in letters and j not in english and j not in numbers:
            letters.add(j)
print(letters)

"""

#Spelling Mistakes ( 1, 2, 3 .... N )


letters = ['ಚ', 'ಠ', 'ಖ',  'ಫ',  'ಹ', 'ಡ', 'ಎ', 'ಷ', 'ಆ', 'ಢ', 'ಝ', 'ಕ', 'ದ', 'o','ಐ', 'ಲ', 'ಔ',  'ವ', 'ಜ', 'ಘ','ಸ', 'ವ',  'ತ',  'ಷ', 'ಡ', 'ಮ', 'ರ', 'ಳ', 'ಭ', 'ಋ', 'ಪ', 'ನ',  'ಥ', 'ಫ', 'ದ', 'ಬ', 'ಹ', 'ಖ', 'ಕ', 'ಟ',  'ಯ' ,'ಧ',  'ಶ', 'ಜ', 'ಢ', 'ಣ', 'ಠ', 'ಗ','ಕ', 'ಏ', 'ಥ', 'ಆ', 'ಡ', 'ೕ', 'ು','ೖ', 'ಉ', 'ಛ',  'ಂ', 'ರ',  'ಸ', 'ಳ', 'ಗ',  'ಧ', 'ತ', 'ಏ', 'ಇ', 'ಶ', 'ಟ', 'ಬ', 'ೊ', 'ನ', 'ಞ',  'ು', 'ಒ', 'ೕ',  'ೈ', 'ಃ', 'ಣ', 'ೋ', 'ನ', 'ೖ', 'ಘ', 'ಃ', 'ತ', 'ೃ', 'ರ', 'ಪ', 'ೇ',  '೯', '೪', 'ಔ', 'ಶ', 'ಜ', '್', 'ದ', 'ಗ', 'ಾ', 'ಸ', 'ಯ', 'ೂ', 'ಿ','ೇ', 'a', 'ಊ', 'ಯ', 'ಈ', 'ೆ', 'ಿ', 'ಮ', 'ಭ', 'w', 'ೋ', 'ಥ', 'ಪ', 'ಢ', 'ಞ', 'ಇ', 'ೈ', 'ಭ', 'ಹ', 'ಛ', 'ಎ','ೆ', 'ೊ', 'ಫ', 'ಒ', 'ಷ', 'ಊ', 'ಠ', 'ೀ', 'ಐ', 'ಚ', 'ಂ', 'ಅ', 'ಣ', 'ಖ', 'ಓ', 'ಳ', 'ಲ', 'ವ', 'ಮ', 'ಉ', 'ೌ', 'ಟ', 'ಬ', 'ಧ', 'ಳ', 'ಏ', 'ಞ', 'ಔ', 'ಥ', 'ಛ', 'ಃ', 'ಹ', 'ಘ', 'ಂ', 'ದ', 'ಐ', 'ತ', 'ಸ', 'ಠ', 'ಜ', 'ಚ', 'ವ', 'ಈ', 'ಆ', 'ಿ', 'ಙ',  'ಫ', 'ಋ', 'ಲ', 'ೈ', 'ೊ', '೮', 'ನ', 'ಷ', 'ೆ', '೯', 'ೀ', 'ಬ', 'ಉ', 'ೇ', 'ಗ', 'ಇ', 'ಎ', 'ು', 'ಝ', 'ಒ' , 'ಶ', 'ಭ', '೪','ಪ', 'ಓ', '಼', 'ಯ', 'ಖ', 'ಟ', 'ೋ','ಧ', '೭', 'ಾ', 'ೂ', 'ಮ', 'ಣ', 'ಕ', 'ಢ', 'ೖ', 'ರ', 'ಅ','ಊ']

for i in correct:
    for _ in range(timesLetter):
        try:
            res = i
            temp_n = len(res)
            temp_let = len(letters)
            
            rand_n = random.randint(0,temp_n)
            rand_letter = random.randint(0,temp_let)
            
            repl_n = i[rand_n]
            repl_let = letters[rand_letter]
            res = i.replace(repl_n,repl_let)
        except:
            pass
    wrong.append(res)


#Words Comparator 

cont = 0
for i,j in zip(wrong,correct):
    flag = "Failed"
    res = suggestionReturner(i)
    res = str(res).split(":")[0] 
    if j == res:
        flag = "Passed"
        cont += 1
    actual.append([i,j,res,flag])

print("=================================================================")
print("{} letter replaced in each words ({})".format(timesLetter,limit_test))
print("INFO : File used {} ( {} bytes)".format(fp.SymspellModel,os.path.getsize(fp.SymspellModel)))
print("=================================================================")
print("Passed ", cont)
print("Failed", len(actual)-cont)
print("Accurancy : ",(cont/len(actual)*100))
pd.DataFrame(actual).to_excel('test-results/output.xlsx', header=False, index=False)


