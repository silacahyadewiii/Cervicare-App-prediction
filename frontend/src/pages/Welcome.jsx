import "../styles/Predict.css";
import Stats from "../components/Stats";

export default function Welcome() {
  return (
    <div id="welcome" className="predict-container section bg-mint hero-section">
      <div className="predict-card hero-card">
        <h1 className="predict-title">Cervical Cancer Digital Screening 🩺</h1>
        <p className="hero-sub">
          <strong>Dengan teknologi AI, lakukan skrining awal kanker serviks secara digital
          untuk mendeteksi gejala lebih cepat.</strong>
        </p>

        <button
          className="predict-btn"
          onClick={() =>
            document.getElementById("predict-section").scrollIntoView({ behavior: "smooth" })
          }
        >
          Mulai Prediksi
        </button>
        <Stats />
      </div>
    </div>
  );
}
