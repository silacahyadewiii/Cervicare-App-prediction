import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet import preprocess_input
from PIL import Image

# Load model sekali saat startup
MODEL_PATH = r"C:\Users\HP\Cervical-Cancer-app-prediction-sila\Cervicare-App-prediction\backend\models"
model = load_model(MODEL_PATH)
print("Model loaded successfully.")

# Daftar kelas
CLASS_NAMES = ['im_Dyskeratotic', 'im_Koilocytotic', 'im_Metaplastic', 'im_Parabasal', 'im_Superficial-Intermediate']

def preprocess_image(img, target_size=(224, 224)):
    """
    Preprocess gambar untuk prediksi.
    Bisa menerima:
    - path string ke file gambar
    - file-like object (UploadFile.file dari FastAPI)
    """
    if isinstance(img, str):
        img = Image.open(img).convert("RGB")
    else:
        img = Image.open(img).convert("RGB")  # file-like object

    img = img.resize(target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)

    # ✨ Tambahkan ini agar sama seperti training di Colab
    img_array = preprocess_input(img_array)

    return img_array

def predict(img):
    """
    Prediksi label dan probabilitas semua kelas
    img bisa berupa path string atau file-like object
    """
    img_array = preprocess_image(img)
    preds = model.predict(img_array)

    class_idx = np.argmax(preds, axis=1)[0]
    label = CLASS_NAMES[class_idx]
    confidence = float(np.max(preds))
    all_probs = {CLASS_NAMES[i]: float(preds[0][i]) for i in range(len(CLASS_NAMES))}

    return {
        "label": label,
        "confidence": confidence,
        "all_probabilities": all_probs
    }
