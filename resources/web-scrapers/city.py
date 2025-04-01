import mysql.connector
import csv
import requests
from bs4 import BeautifulSoup
import threading
import time
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Database Connection
def getConnection():
    try:
        db = mysql.connector.connect(
            host=os.getenv("DB_HOST", '127.0.0.1'),
            database=os.getenv("DB_NAME", 'travel_hunt'),
            user=os.getenv("DB_USER", 'root'),
            password=os.getenv("DB_PASSWORD", 'Abhay@9927')
        )
        dbcursor = db.cursor(buffered=True)
        return db, dbcursor
    except mysql.connector.Error as err:
        print("Error: Unable to connect to the database:", err)
        return None, None


# Get Next City ID
def getNextID():
    db, dbcursor = getConnection()
    if dbcursor is None:
        return 10000

    query = "SELECT id FROM city ORDER BY id DESC LIMIT 1"
    dbcursor.execute(query)
    result = dbcursor.fetchone()
    
    next_id = 10000 if result is None else int(str(result[0]).replace("CI", "")) + 1
    dbcursor.close()
    return next_id


# Generate City ID
def getCityID():
    global count
    city_id = "CI" + str(count)
    count += 1
    return city_id


# Fetch City Description
def getDescription(cityName, countryName):
    headers = {'User-Agent': 'Mozilla/5.0'}
    url = f'https://www.google.com/search?q={cityName}+{countryName}&num=10'

    for _ in range(3):  # Retry 3 times
        try:
            response = requests.get(url, headers=headers, timeout=5)
            soup = BeautifulSoup(response.text, 'html.parser')
            description = soup.find_all("div", class_="kno-rdesc")
            if description:
                return description[0].get_text().strip()
        except requests.exceptions.RequestException:
            time.sleep(2)

    return "Not Found"


# Get or Insert Country ID
def getOrInsertCountryID(dbcursor, db, countryName):
    query = "SELECT id FROM country WHERE name=%s"
    dbcursor.execute(query, [countryName])
    result = dbcursor.fetchone()

    if result:
        return result[0]
    
    # If country does not exist, insert it
    new_country_id = "CO" + str(int(time.time()))  # Generate unique ID
    insert_query = "INSERT INTO country (id, name) VALUES (%s, %s)"
    dbcursor.execute(insert_query, (new_country_id, countryName))
    db.commit()

    return new_country_id


# Fetch City Images
def getImages(cityName, countryName):
    imageLinks = []
    headers = {'User-Agent': 'Mozilla/5.0'}
    url = f"https://www.google.com/search?q={cityName}+{countryName}&tbm=isch"

    try:
        response = requests.get(url, headers=headers, timeout=5)
        soup = BeautifulSoup(response.text, 'html.parser')
        images = soup.find_all("img", limit=4)

        for img in images:
            src = img.get("data-src") or img.get("src")
            if src:
                imageLinks.append(src)

        return imageLinks[:3] if len(imageLinks) >= 3 else imageLinks
    except requests.exceptions.RequestException:
        return ["Not Found"] * 3


# Insert Cities into the Database
def fillCity(start, end):
    global rowCount
    db, dbcursor = getConnection()
    if dbcursor is None:
        return

    try:
        with open("missedCities.csv", "r", encoding="utf-8") as file:
            csvreader = csv.reader(file)
            next(csvreader)  # Skip headers

            query = "INSERT INTO city(id, name, latitude, longitude, description, country_id, image1, image2, image3) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)"
            data = []
            i = 1

            for row in csvreader:
                if start <= i < end:
                    id = getCityID()
                    cityName, latitude, longitude, countryName = row[1], row[2], row[3], row[4]

                    country_id = getOrInsertCountryID(dbcursor, db, countryName)  # Insert country if missing
                    images = getImages(cityName, countryName)
                    description = getDescription(cityName, countryName)

                    values = (id, cityName, latitude, longitude, description, country_id, images[0], images[1], images[2])
                    data.append(values)
                    print(f"{cityName} added ({i}/{end})")

                    if len(data) >= 10:
                        dbcursor.executemany(query, data)
                        db.commit()
                        rowCount += len(data)
                        data.clear()

                i += 1

            if data:
                dbcursor.executemany(query, data)
                db.commit()
                rowCount += len(data)

    except Exception as e:
        print("Error inserting data:", e)
    finally:
        dbcursor.close()
        db.close()


# Multi-threaded Data Insertion
if __name__ == "__main__":
    rowCount = 0
    count = getNextID()

    threads = [
        threading.Thread(target=fillCity, args=(0, 21)),
        threading.Thread(target=fillCity, args=(20, 41)),
        threading.Thread(target=fillCity, args=(40, 61)),
        threading.Thread(target=fillCity, args=(60, 81)),
        threading.Thread(target=fillCity, args=(80, 101))
    ]

    start_time = time.time()

    for t in threads:
        t.start()

    for t in threads:
        t.join()

    end_time = time.time()

    print("Done!")
    print(f"{rowCount} Rows Added")
    print(f"Execution Time: {(end_time - start_time)/60:.2f} minutes")