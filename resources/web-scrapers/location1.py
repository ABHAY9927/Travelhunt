import requests
import csv
from bs4 import BeautifulSoup

def fetch_places(city):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
    }
    
    url = f'https://www.bing.com/search?q=things+to+do+in+{city}'
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print(f"Failed to fetch results for {city} - Status Code: {response.status_code}")
        return []
    
    soup = BeautifulSoup(response.text, 'html.parser')
    results = soup.find_all("li", class_="b_algo")  # Adjust this if Bing structure changes
    
    places = []
    for result in results:
        title_tag = result.find("h2")
        description_tag = result.find("p")
        
        if title_tag and description_tag:
            title_text = title_tag.get_text(strip=True)
            description_text = description_tag.get_text(strip=True)
            places.append((title_text, description_text, city))
    
    return places

def main():
    input_file = "selectedCities.txt"
    output_file = "places.csv"
    
    with open(input_file, "r", encoding="utf-8") as city_file:
        cities = [line.strip() for line in city_file if line.strip()]
    
    with open(output_file, "w", newline="", encoding="utf-8") as file:
        csv_writer = csv.writer(file)
        csv_writer.writerow(["Title", "Description", "City"])
        
        for city in cities:
            places = fetch_places(city)
            if not places:
                print(f"No data found for {city}")
                continue
            
            csv_writer.writerows(places)
            print(f"Data added for {city}")
    
    print("Scraping complete. Data saved to places.csv.")

if __name__ == "__main__":
    main()