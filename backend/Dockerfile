FROM python:3.10

# Set working directory inside container
WORKDIR /app

# Copy backend folder (which contains manage.py & requirements.txt)
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 8000
EXPOSE 8000

# Start Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

