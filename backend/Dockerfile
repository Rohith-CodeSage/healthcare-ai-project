# Start from an official Python image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file first and install dependencies
# This is efficient because it only re-runs if requirements.txt changes
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all the application code and the trained models
COPY ./app /app/app
COPY ./ml_models /app/ml_models

# Expose the port the app will run on
EXPOSE 8000

# The command to run the FastAPI server
# This tells uvicorn to look in the 'app' folder for the 'main.py' file,
# and inside that file, find the variable named 'app'.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]