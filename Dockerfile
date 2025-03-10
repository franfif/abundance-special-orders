# Base image
FROM python:3.11-slim-bullseye

# Ensure that Python doesn't buffer the standard output to display log messages in real-time.
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Set the working directory inside the container to /app. All the following commands will be executed in this directory
WORKDIR /app

# Install Redis server
RUN apt-get update && apt-get install -y redis-server && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy the requirements.txt file from your local file system into the working directory in the container.
COPY requirements.txt ./

# Command to execute inside the container, to install all the dependencies for the project.
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Ensure Redis server is running
RUN service redis-server start

# Copy the application code into the container.
COPY . .

# Run migrations to create the database schema.
# RUN python manage.py migrate

# Shell command to be run when the container is started.
# The command checks if an environment variable PORT is set.
# If it is set, it runs the Django development server on the specified port; otherwise, it defaults to port 8000.
CMD [ "sh", "-c", "python manage.py migrate && if [ -n \"$PORT\" ]; then python manage.py runserver 0.0.0.0:$PORT; else python manage.py runserver 0.0.0.0:8000; fi" ]
