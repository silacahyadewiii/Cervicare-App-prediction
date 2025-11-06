# backend/Dockerfile
FROM python:3.12-slim

# system deps for TF might be heavy; add minimal
RUN apt-get update && apt-get install -y build-essential libsndfile1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/backend

# copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copy app
COPY backend/app ./app
COPY backend/models ./models

# Expose port
EXPOSE 8000

# Use gunicorn with uvicorn worker for production
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "app.main:app", "-w", "4", "-b", "0.0.0.0:8000", "--timeout", "120"]
