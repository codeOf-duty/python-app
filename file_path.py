opt = "Dev"

if opt == "Dev":
    BloomFilterModel = "datasets/collection_test.json"
    SymspellModel = "datasets/freq_test.txt"
    userWordFile = "datasets/userAddWords/myCollections_test.json"
elif opt == "Pro":
    BloomFilterModel = "datasets/collection.json"
    SymspellModel = "datasets/freq_kan.txt"
    userWordFile = "datasets/userAddWords/myCollections.json"

