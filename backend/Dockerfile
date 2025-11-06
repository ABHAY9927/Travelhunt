FROM python:3.10
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "backend/travel_hunt_api/manage.py", "runserver", "0.0.0.0:8000"]
