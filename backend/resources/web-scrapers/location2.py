from dotenv import load_dotenv
from bs4 import BeautifulSoup
import requests
import mysql.connector
import os
import csv
import threading
import time

def getConnection():
    load_dotenv()

    # DATABASE CONFIGURATIONS
    db = mysql.connector.connect(
            host=os.getenv("DB_HOST", '127.0.0.1'),
            database=os.getenv("DB_NAME", 'travel_hunt'),
            user=os.getenv("DB_USER", 'root'),
            password=os.getenv("DB_PASSWORD", 'Abhay@9927')
        )

    # CURSOR TO OPERATE THE DATABASE
    dbcursor = db.cursor(buffered=True)

    return (db, dbcursor)


def getNextID():
    config = getConnection()
    dbcursor = config[1]

    query = "SELECT id FROM location ORDER BY id DESC LIMIT 1"
    dbcursor.execute(query)
    result = dbcursor.fetchone()

    if result == None:
        next_id = 10000

    else:
        last_id = result[0]
        next_id = int(str(last_id).replace("L", "")) + 1

    dbcursor.close()
    return next_id


def getLocationID():
    global count

    id = "L" + str(count)
    count += 1
    return id


def getDescription(locationName, cityName):
    # HEADERS FOR GOOGLE SEARCH
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'}

    url = 'https://www.google.com/search?q=' + locationName + \
        " " + cityName + '&ie=utf-8&oe=utf-8&num=10'

    try:
        html = requests.get(url, headers=headers)

    except Exception as exception:
        print(exception.__class__.__name__)
        html = requests.get(url, headers=headers)

    # SCRAPE THE RESULTING WEBPAGE
    soup = BeautifulSoup(html.text, 'html.parser')

    # GET THE GOOGLE AND WIKIPEDIA DESCRIPTION FOR A CITY
    description = soup.find_all("div", class_="kno-rdesc")

    # FORMAT THE RESULT REMOVING HTML TAGS
    try:
        filtered_description = str(description).split("<span>")[
            2].replace("</span>", "")
    except:
        filtered_description = "Not Found"

    return filtered_description


def getCityID(dbcursor, cityName):
    query = "SELECT id FROM city WHERE name=%s"
    dbcursor.execute(query, [cityName])
    result = dbcursor.fetchone()

    if result != None:
        return result[0]
    return "N/A"


def getImages(locationName, cityName):
    imageLinks = []

    # HEADERS FOR GOOGLE SEARCH
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'}

    url = "https://www.google.com/search?q=" + locationName + " " + cityName + "&sca_esv=593784007&tbm=isch&source=hp&biw=1440&bih=724&ei=q_aKZcDEBeqfseMPy4uu6AU&iflsig=AO6bgOgAAAAAZYsEuyacmJ2rm0tuiqWn-qeG_Q77jG7l&ved=0ahUKEwiAxvDSuq2DAxXqT2wGHcuFC10Q4dUDCAc&uact=5&oq=colombo&gs_lp=EgNpbWciB2NvbG9tYm8yCBAAGIAEGLEDMgUQABiABDIFEAAYgAQyCBAAGIAEGLEDMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIIEAAYgAQYsQMyCxAAGIAEGLEDGIMBSNoOUABYqwxwAHgAkAEAmAHvAaAB0gaqAQUwLjEuM7gBA8gBAPgBAYoCC2d3cy13aXotaW1nwgIOEAAYgAQYigUYsQMYgwHCAgQQABgDwgILEAAYgAQYigUYsQM&sclient=img"

    html = requests.get(url, headers=headers)

    # SCRAPE THE RESULTING WEBPAGE
    soup = BeautifulSoup(html.text, 'html.parser')

    # GET THE GOOGLE AND WIKIPEDIA DESCRIPTION FOR A COUNTRY
    images = soup.find_all("img", class_="rg_i Q4LuWd")

    for image in images:
        try:
            imageLinks.append(image['data-src'])

        except:
            continue

        if (len(imageLinks) == 3):
            break

    return imageLinks


def fillLocation(start, end):
    global rowCount

    dbconfig = getConnection()
    db = dbconfig[0]
    dbcursor = dbconfig[1]

    # RELATIVE PATHS ONLY WORK ON THE FOLDER IN WHICH THE CODE RUNS
    # MOVE TO backend/web-scrapers FOLDER FOR EXECUTION
    file = open(
        "worldcities.csv", "r", encoding="utf=8")

    csvreader = csv.reader(file)
    next(csvreader)  # IGNORE HEADERS

    i = 1
    data = []

    query = "INSERT INTO location(id, name, category, description, image1, image2, image3, city_id) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)"

    for row in csvreader:
        if i > start and i < end:  # CHANGE THE VALUE ACCORDINGLY FROM 0 - 44619 NOW: 100 - 501
            id = getLocationID()
            locationName = row[0]
            category = row[1]
            city_id = getCityID(dbcursor, row[2])
            images = getImages(locationName, row[2])
            description = getDescription(locationName, row[2])

            try:
                values = (id, locationName, category, description,
                          images[0], images[1], images[2], city_id)

                data.append(values)

                print(locationName + " is created. " + str(i) +
                      " of " + "135" + " created.")

            except:
                "Error occured when commiting " + locationName + " - " + str(i)

            if len(data) > 5:
                try:
                    # INSERT DATA TO THE DATABASE AS A BATCH
                    dbcursor.executemany(query, data)
                    db.commit()
                    nrows = dbcursor.rowcount
                    print("\n", nrows,
                          "Records Inserted Successfully\n")
                    rowCount += nrows
                    data.clear()

                except Exception as exception:
                    print("Error occured when inserting", i)
                    print(exception)
                    db.rollback()

        i += 1

    # TO STORE UNCOMMITTED RESULTS IN THE DB WHICH ARE WAITING COMPLETION OF 10 ARRAY ITEMS
    if len(data) > 0:
        try:
            # INSERT DATA TO THE DATABASE AS A BATCH
            dbcursor.executemany(query, data)
            db.commit()
            nrows = dbcursor.rowcount
            print("\n", nrows,
                  "Records Inserted Successfully\n")
            rowCount += nrows
            data.clear()

        except Exception as exception:
            print("Error occured when inserting", i)
            print(exception)
            db.rollback()

    file.close()
    dbcursor.close()
    db.close()


if __name__ == "__main__":

    rowCount = 0

    ####################### TO INSERT THE DATA #####################################################

    count = getNextID()

    t1 = threading.Thread(target=fillLocation, args=(0, 71))
    t2 = threading.Thread(target=fillLocation, args=(70, 136))

    start = time.time()

    t1.start()
    t2.start()

    t1.join()
    t2.join()

    end = time.time()

    print("Done!")
    print(rowCount, "Rows Added")
    print("Execution Time: ", (end - start)/60)
