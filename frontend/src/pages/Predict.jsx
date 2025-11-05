import { useState } from "react";
import "../styles/Predict.css";
import { Loader2 } from "lucide-react";
import ResultCard from "../components/ResultCard";

export default function Predict() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
  };

  const handlePredict = async () => {
    if (!file) return alert("Pilih gambar terlebih dahulu!");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${BACKEND_URL}/predict`, { method: "POST", body: formData });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Terjadi kesalahan saat memproses gambar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="predict-section" className="predict-container section bg-forest">
      <div className="predict-card">
        <h1 className="predict-title">Prediksi Kanker Serviks</h1>

        <div className="upload-section">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && <img src={preview} alt="Preview" className="preview-img" />}

          <button onClick={handlePredict} disabled={loading} className="predict-btn">
            {loading && <Loader2 className="spin" />}
            {loading ? "Memproses..." : "Prediksi"}
          </button>
        </div>

        {result && <ResultCard result={result} />}
      </div>
    </div>
  );
}
