import requests
import csv
from bs4 import BeautifulSoup
import os


headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'}

selectedCities = open(
    "selectedCities.txt", "r")
file_path = os.path.abspath("resources/web-scrapers/worldcities.csv")

file = open("worldcities.csv", "a")
csv_writer = csv.writer(file)

for city in selectedCities:

    url = 'https://www.google.com/search?q=' + \
        'things to do in ' + city.strip() + '&ie=utf-8&oe=utf-8&num=10'

    html = requests.get(url, headers=headers)

    # SCRAPE THE RESULTING WEBPAGE
    soup = BeautifulSoup(html.text, 'html.parser')

    titles = soup.find_all("div", class_="UEiegc v3HaEc Sqrs4e lVm3ye Hdw6tb")

    descriptions = soup.find_all(
        "div", class_="UEiegc Y4Ql3c LEwnzc Sqrs4e Hdw6tb")

    fullList = zip(titles, descriptions)

    for title, description in fullList:
        filtered_title = list(title)[0].split("<div>")[0].strip()
        filtered_desc = list(description)[0].split("<div>")[0].strip()

        element = [filtered_title, filtered_desc, city.strip()]
        csv_writer.writerow(element)

        print(element)

file.close()
