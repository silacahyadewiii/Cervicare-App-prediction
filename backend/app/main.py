# backend/app/main.py
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from app.model_utils import predict  # pastikan import sesuai struktur package

app = FastAPI(title="Pap-Smear Classifier API")

# CORS — setel FRONTEND_URL di environment saat deploy
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tambahkan domain dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Batasi upload (misal 10 MB)
MAX_UPLOAD_SIZE = 10 * 1024 * 1024

@app.post("/predict")
async def predict_endpoint(file: UploadFile = File(...)):
    contents = await file.read()
    if len(contents) > MAX_UPLOAD_SIZE:
        raise HTTPException(status_code=413, detail="File too large")
    try:
        # FastAPI UploadFile -> file-like object dipassing ke model_utils.predict
        from io import BytesIO
        file_obj = BytesIO(contents)
        result = predict(file_obj)  # gunakan fungsi predict yang sudah ada
        return JSONResponse(content=result)
    except Exception as e:
        # logging (tambah logging di production)
        return JSONResponse(status_code=500, content={"error": str(e)})
