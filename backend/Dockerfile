FROM python:3.10

# Set working directory
WORKDIR /app

# Copy backend folder contents
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set working directory where manage.py is located
WORKDIR /app

# Expose port
EXPOSE 8000

# Run Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
