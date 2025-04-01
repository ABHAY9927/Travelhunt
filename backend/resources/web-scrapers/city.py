import mysql.connector
import csv
import requests
from bs4 import BeautifulSoup
import threading
import time
from dotenv import load_dotenv
import os

# SOURCES: Google Images and Google Search Results
# id name latitude longitude description country_id


def getConnection():
    load_dotenv()

    # DATABASE CONFIGURATIONS
    db = mysql.connector.connect(
        host = os.getenv("localhost"),
        database = os.getenv("travel_hunt"),
        user = os.getenv("root"),
        password= os.getenv("Abhay@9927")
    )

    # CURSOR TO OPERATE THE DATABASE
    dbcursor = db.cursor(buffered=True)

    return (db, dbcursor)


def getNextID():
    config = getConnection()
    dbcursor = config[1]

    query = "SELECT id FROM city ORDER BY id DESC LIMIT 1"
    dbcursor.execute(query)
    result = dbcursor.fetchone()

    if result == None:
        next_id = 10000

    else:
        last_id = result[0]
        next_id = int(str(last_id).replace("CI", "")) + 1

    dbcursor.close()
    return next_id


def getCityID():
    global count

    id = "CI" + str(count)
    count += 1
    return id


def getDescription(cityName, countryName):
    # HEADERS FOR GOOGLE SEARCH
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'}

    url = 'https://www.google.com/search?q=' + cityName + \
        " " + countryName + '&ie=utf-8&oe=utf-8&num=10'

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


def getCountryID(dbcursor, countryName):
    query = "SELECT id FROM country WHERE name=%s"
    dbcursor.execute(query, [countryName])
    result = dbcursor.fetchone()

    if result != None:
        return result[0]
    return "N/A"


def getImages(cityName, coutryName):
    imageLinks = []

    # HEADERS FOR GOOGLE SEARCH
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'}

    url = "https://www.google.com/search?q=" + cityName + " " + coutryName + "&sca_esv=593784007&tbm=isch&source=hp&biw=1440&bih=724&ei=q_aKZcDEBeqfseMPy4uu6AU&iflsig=AO6bgOgAAAAAZYsEuyacmJ2rm0tuiqWn-qeG_Q77jG7l&ved=0ahUKEwiAxvDSuq2DAxXqT2wGHcuFC10Q4dUDCAc&uact=5&oq=colombo&gs_lp=EgNpbWciB2NvbG9tYm8yCBAAGIAEGLEDMgUQABiABDIFEAAYgAQyCBAAGIAEGLEDMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIIEAAYgAQYsQMyCxAAGIAEGLEDGIMBSNoOUABYqwxwAHgAkAEAmAHvAaAB0gaqAQUwLjEuM7gBA8gBAPgBAYoCC2d3cy13aXotaW1nwgIOEAAYgAQYigUYsQMYgwHCAgQQABgDwgILEAAYgAQYigUYsQM&sclient=img"

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


def fillCity(start, end):
    global rowCount

    dbconfig = getConnection()
    db = dbconfig[0]
    dbcursor = dbconfig[1]

    # RELATIVE PATHS ONLY WORK ON THE FOLDER IN WHICH THE CODE RUNS
    # MOVE TO backend/web-scrapers FOLDER FOR EXECUTION
    file = open(
        "missedCities.csv", "r")

    csvreader = csv.reader(file)
    next(csvreader)  # IGNORE HEADERS

    i = 1
    data = []

    query = "INSERT INTO city(id, name, latitude, longitude, description, country_id, image1, image2, image3) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)"

    for row in csvreader:
        if i > start and i < end:  # CHANGE THE VALUE ACCORDINGLY FROM 0 - 44619 NOW: 100 - 501
            id = getCityID()
            cityName = row[1]
            latitude = row[2]
            longitude = row[3]
            country_id = getCountryID(dbcursor, row[4])
            images = getImages(cityName, row[4])
            description = getDescription(cityName, row[4])

            try:
                values = (id, cityName, latitude,
                          longitude, description, country_id,
                          images[0], images[1], images[2])

                data.append(values)

                print(cityName + " is created. " + str(i) +
                      " of " + "44691" + " created.")

            except:
                "Error occured when commiting " + cityName + " - " + str(i)

            if len(data) > 9:
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


def update(start, end):
    # SELECT city.id, city.name, country.name FROM city INNER JOIN country ON city.country_id = country.id WHERE city.description = "Not Found";
    global rowCount

    config = getConnection()
    conn = config[0]
    dbcursor = config[1]

    file = open("noDescription.csv", "r")
    csvreader = csv.reader(file)

    next(csvreader)

    query = "UPDATE city SET description=%s WHERE id=%s"
    data = []

    i = 2
    for row in csvreader:
        if i > start and i < end:
            id = row[0]
            description = getDescription(row[1], row[2])
            # print(description)

            if description != "Not Found":
                data.append((description, id))
                print(i, row[1], " Configured.\n")

            else:
                print(i, row[1], "Not Found", "\n")

            if(len(data) > 4):
                try:
                    dbcursor.executemany(query, data)
                    conn.commit()
                    nrows = dbcursor.rowcount
                    print(nrows, "rows updated.")
                    rowCount += nrows
                    data.clear()

                except Exception as exception:
                    print(exception)

        i += 1

    if (len(data)) > 0:
        try:
            dbcursor.executemany(query, data)
            conn.commit()
            nrows = dbcursor.rowcount
            print(nrows, "rows updated.")
            rowCount += nrows
            data.clear()

        except Exception as exception:
            print(exception)

    file.close()
    dbcursor.close()
    conn.close()


def delete():
    config = getConnection()
    conn = config[0]
    dbcursor = config[1]

    query = "DELETE FROM city WHERE id=%s"
    for i in range(14564, 14631):
        id = "CI" + str(i)
        dbcursor.execute(query, [id])
        conn.commit()

    # dbcursor.close()
    print("Delete Successful!")


def checkForMissedRecords():
    config = getConnection()
    conn = config[0]
    dbcursor = config[1]

    cityFile = open("worldcities.csv", "r")
    missedCityFile = open("missedCities.csv", "a")

    csvreader = csv.reader(cityFile)
    csvwriter = csv.writer(missedCityFile)

    next(csvreader)  # REMOVE HEADERS

    missed = []
    query = "SELECT name FROM city WHERE name=%s"

    endpoint = 44692 # UPDATE ACCORDINGLY
    i = 2
    for row in csvreader:
        cityName = row[1]
        dbcursor.execute(query, [cityName])
        result = dbcursor.fetchone()

        if result == None:
            csvwriter.writerow(row)
            missed.append(cityName)
            print("Missed Records at: ", i, cityName)

        else:
            print("Current row: ", i)
                
        i += 1

        if (i > endpoint):
           break

    cityFile.close()
    missedCityFile.close()
    dbcursor.close()
    conn.close()
    print("Missed Records:", len(missed))


if __name__ == "__main__":

    rowCount = 0

    ####################### TO INSERT THE DATA #####################################################

    count = getNextID()

    t1 = threading.Thread(target=fillCity, args=(0, 21))
    t2 = threading.Thread(target=fillCity, args=(20, 41))
    t3 = threading.Thread(target=fillCity, args=(40, 61))
    t4 = threading.Thread(target=fillCity, args=(60, 81))
    t5 = threading.Thread(target=fillCity, args=(80, 101))

    start = time.time()

    t1.start()
    t2.start()
    t3.start()
    t4.start()
    t5.start()

    t1.join()
    t2.join()
    t3.join()
    t4.join()
    t5.join()

    end = time.time()

    print("Done!")
    print(rowCount, "Rows Added")
    print("Execution Time: ", (end - start)/60)

    ################################################################################################

    ####################### TO UPDATE THE DESCRIPTION ##############################################

    # t1 = threading.Thread(target=update, args=(4500, 4531)) # 4500, 4531 # 
    # t2 = threading.Thread(target=update, args=(4530, 4591)) # 4530, 4591 # 
    # t3 = threading.Thread(target=update, args=(4590, 4601)) # 4590, 4601 # 
    # t4 = threading.Thread(target=update, args=(4600, 4621)) # 4600, 4621 # 
    # t5 = threading.Thread(target=update, args=(4620, 4632)) # 4620, 4632 # 

    # start = time.time()

    # t1.start()
    # t2.start()
    # t3.start()
    # t4.start()
    # t5.start()

    # t1.join()
    # t2.join()
    # t3.join()
    # t4.join()
    # t5.join()

    # end = time.time()

    # print("Done!")
    # print(rowCount, "rows updated.")
    # print("Execution Time: ", (end - start)/60)

    ################################################################################################

    ####################### TO DELETE THE ROWS #####################################################

    # delete()

    ################################################################################################

    ####################### CHECK FOR MISSED RECORDS ###############################################

    # start = time.time()
    # checkForMissedRecords() # UPDATE THE STOP COUNTER
    # end = time.time()

    # print("Done!")
    # print("Execution Time: ", (end - start)/60)

    ################################################################################################