import os
import platform
from sympound import sympound
from pyxdameraulevenshtein import damerau_levenshtein_distance
import file_path as fp

distancefun = damerau_levenshtein_distance
ssc = sympound(distancefun=distancefun, maxDictionaryEditDistance=3)
ssc.load_dictionary(fp.SymspellModel, term_index=0, count_index=1)

def suggestionReturner(word__):
    return ssc.lookup_compound(input_string=word__, edit_distance_max=3)

test =  ["ತಳರಿದದಾಳೆ","ಹಿಂದಿರುಗಿರಬಾರದುದಾಳೆ","ಇರುಕದ್ದರು","ಜರುತ್ತಲೇ","ಅಡರತ್ತಿರುವವು","ಳುತ್ತಿಲ್ಲದಿರಿ","ಕೆತ್ತಲಲ","ಉದುರತ್ಲ್ದಿದರೆ","ಕೆಕ್ತ್ತಿರುತ್ನೆ","ಜರುಕರೆ","ತೊಹುದಿತ್ತು","ಮಾಮದಿ","ಒಉಕ್ಕುವನುದ್ದು","ಜಿನದ","ತಲಪತ್ತಿಲದ"]
expected =  ["ತಳರಿದ್ದಾಳೆ","ಹಿಂದಿರುಗಿರಬಾರದು","ಇರುಕಿದ್ದರು","ಜಾರುತ್ತಲೇ","ಅಡರುತ್ತಿರುವೆವು","ಕೇಳುತ್ತಿಲ್ಲದಿರಿ","ಕೆತ್ತಿಲ್ಲ","ಉದುರುತ್ತಿಲ್ಲದಿದ್ದರೆ","ಕೆಕ್ಕುತ್ತಿರುತ್ತೇನೆ","ಕರೆ","ತೊಲಗಬಹುದಿತ್ತು","ಮಾಮ","ಉಕ್ಕುವನು","ಜೀವನದ","ತಲಪುತ್ತಿಲ್ಲದ"]
print("Test Word\t\tActual Result\t\tExpected Result\tResult")
for i,j in zip(test,expected):
    x = suggestionReturner(i)
    print("\n{}\t\t->{}\t\t->{}\t".format(i,x,j), end=" ")
    if j == str(x).split(":")[0]:
        print("Passed", end=" ")
    else:
        print("Failed", end=" ")
    
   
