import csv
file = open("worldcities.csv", "r", encoding="utf-8")
csvreader = csv.reader(file)
next(csvreader)  # IGNORE HEADERS

i = 1
for row in csvreader:
    print(row)  # Yeh check karega ki file read ho rahi hai ya nahi
    if i > 5:  # Sirf pehle 5 rows print karega
        break
    i += 1
