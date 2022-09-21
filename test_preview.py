data = []
with open("output_double.txt",'r', encoding='utf-8') as infile:
    data = infile.read()
data = data.split("\n")
print("Test Word\tActual Result\tResult")
for i in data:
    temp = i.split("->")
    try:
        print("{}\t{}\t{}---------------->{}".format(temp[1].strip(),temp[0].strip(),temp[2].strip(),temp[0].strip() == temp[2].strip()))
    except:
        pass
