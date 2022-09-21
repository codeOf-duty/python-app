from sys import exit
dict_ = dict()

def reWritor():
    str = []
    global dict_
    for i in dict_:
        str.append("{}->{}".format(dict_[i],i))
    res = "\n".join(str)
    with open('datasets/userAddWords/myCollections.json','w', encoding='utf-8') as inFile:
        inFile.write(res)

def Wordshower():
    data = []
    global dict_
    with open('datasets/userAddWords/myCollections.json','r', encoding='utf-8') as inFile:
        data = inFile.read()
    list_ = data.split("\n")
    print("ID \t\t\t Word")
    for i in list_:
        temp = i.split("->")
        if len(temp) == 2:
            if temp[1] not in dict_ and len(temp[1].strip()) > 1:
                dict_[temp[1].strip()] = temp[0]
                print("{} \t\t\t {}".format(temp[1].strip(),temp[0]))
            
def addWord(word, id_):
    with open('datasets/collection-temp.json','a', encoding='utf-8') as inFile:  # Check Twice Before Proceeding
        inFile.write("\n"+word)
        del dict_[id_]
        return True
    
def validator():
    try:
        id_ = input("\nEnter the ID to add dataset\t( ctrl+C to exit )\n")
        if id_ in dict_:
            wrd = dict_[id_]
            while(True):
                opt = int(input("\nDo you want to add {} ?\n\tPress 1 to Save\n\t2 to Cancel\n\t3 to Exit\n".format(wrd)))
                if opt in [1,2,3]:
                    if opt == 1:
                        if addWord(wrd, id_):
                            print("\nSuccessfully Added {}".format(wrd))
                            while(True):
                                proceed = int(input("\nWant to add words ??\n\tPress 1 to continue \n\t2 to Exit\n"))
                                if proceed in [1,2]:
                                    if proceed == 1:
                                        return 2 # Repeat Once Again
                                    elif proceed == 2:
                                        return 1 # Stop
                    elif opt == 2:
                        return 2 # Repeat Once Again
                    else:
                        return 1 # Stop
                else:
                    print("\nWrong Option")
                    continue       
        else:
            print("\nID not found.....")
            return 2         # Repeat Once Again
    except KeyboardInterrupt:
        print("\n Exited")
        exit()
    finally:
        reWritor()
        
        
if "__main__" == __name__:
    Wordshower()
    while(1):
        ans = validator()
        if ans == 1:
            break
        elif ans == 2:
            continue
        else:
            Wordshower()
    reWritor()
