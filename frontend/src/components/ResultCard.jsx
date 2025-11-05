import { useEffect, useState } from "react";
import "./ResultCard.css";
import { CheckCircle2 } from "lucide-react";

export default function ResultCard({ result }) {
  const [show, setShow] = useState(false);

  if (!result) return null;

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const percentage = (result.confidence * 100).toFixed(2);
  const labelName = result.label.replace("im_", "").replace(/-/g, " ");

  const getConfidenceColor = (perc) => {
    if (perc > 85) return "#4ade80"; // green
    if (perc > 60) return "#facc15"; // yellow
    return "#f87171"; // red
  };

  const descriptions = {
    "Superficial Intermediate":
      "Sel ini menunjukkan kondisi jaringan epitel superfisial pada serviks yang umumnya normal.",
    Parabasal:
      "Sel parabasal adalah sel epitel muda yang biasanya muncul saat ada regenerasi jaringan.",
    Dyskeratotic:
      "Menandakan adanya kelainan pada proses keratinisasi yang bisa terkait dengan perubahan pra-kanker.",
    Koilocytotic:
      "Menunjukkan adanya infeksi HPV (Human Papilloma Virus) pada jaringan serviks.",
    Metaplastic:
      "Sel metaplastik berasal dari perubahan sel skuamosa dan umumnya merupakan proses normal regenerasi.",
  };

  return (
    <div className={`result-card-modern ${show ? "show" : ""}`}>
      <h2 className="result-title">📊 Hasil Analisis</h2>

      <div className="main-result">
        <div className="result-header">
          <p>Prediksi:</p>
          <h1>{labelName}</h1>
          <CheckCircle2 className="check-icon" />
        </div>
        <p className="confidence">Confidence: {percentage}%</p>
      </div>

      <div className="accuracy-section">
        <p>Akurasi</p>
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${percentage}%`,
              backgroundColor: getConfidenceColor(percentage),
            }}
          ></div>
        </div>
        <span className="acc-value">{percentage}%</span>
      </div>

      <div className="desc-section">
        <h4>Deskripsi:</h4>
        <p>
          {descriptions[labelName] ||
            "Tidak ada deskripsi khusus untuk hasil ini."}
        </p>
      </div>

      <div className="prob-section">
        <h4>🔬 Probabilitas Semua Kelas:</h4>
        <div className="prob-grid-2rows">
          {Object.entries(result.all_probabilities || {}).map(
            ([key, value]) => (
              <div key={key} className="prob-card">
                <h5>{key.replace("im_", "")}</h5>
                <div className="prob-bar-container">
                  <div
                    className="prob-bar-inner"
                    style={{
                      width: `${(value * 100).toFixed(2)}%`,
                    }}
                  ></div>
                </div>
                <span className="prob-value">
                  {(value * 100).toFixed(2)}%
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
