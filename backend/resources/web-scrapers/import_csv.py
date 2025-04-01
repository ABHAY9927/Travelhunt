import os
import sys
import django
import csv

# ✅ Backend Folder ka Absolute Path Auto-Detect karein
PROJECT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../backend"))
sys.path.append(PROJECT_PATH)

# ✅ Django Settings Load karein
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "travel_hunt_api.settings")
django.setup()

# ✅ Django Models Import karein
from travel_hunt_api.models import City

def import_worldcities():
    csv_path = os.path.join(PROJECT_PATH, "../resources/webscrapers/worldcities.csv")
    cities = []

    with open(csv_path, "r", encoding="utf-8") as file:
        csv_reader = csv.reader(file)
        next(csv_reader)  # Ignore Header
        
        for row in csv_reader:
            try:
                cities.append(City(
                    name=row[0],  # Agar City model me name field hai
                    country=row[1],  # Agar country ForeignKey hai to isko alag handle karna hoga
                    lat=float(row[2]) if row[2] else None,
                    lng=float(row[3]) if row[3] else None
                ))
            except Exception as e:
                print(f"❌ Error inserting row {row}: {e}")

    # ✅ Bulk Insert (Fast Performance)
    City.objects.bulk_create(cities)
    print("✅ Cities Import Successful!")

import_worldcities()
