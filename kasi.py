filepath = '/mnt/d/soft/qqdata/download/Mini词典 中英&汉字化方案 20230803013221.txt'
chs = {}
fg = {}

with open(filepath) as f:
    for line in f:
        if line.startswith("#"):
            continue
        word, zi, *_ = line.split("\t")

        if zi in chs:
            print(zi, chs[zi], word)
            continue
        chs[zi] = word
        fg[word] = zi

for word in sorted(fg):
    print(word, fg[word], sep=",", end=";")

print()
