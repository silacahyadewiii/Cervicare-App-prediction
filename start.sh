#!/bin/bash
cd backend
pip install --no-cache-dir -r requirements.txt
pip install uvicorn
uvicorn app.main:app --host 0.0.0.0 --port 10000
