import React, { useState } from "react";
import "../styles/Predict.css";

export default function Healthy() {
  const [activeTip, setActiveTip] = useState(null);

  const tips = [
    {
      icon: "🔬",
      title: "Pap Smear berkala",
      desc: "Pap Smear dilakukan untuk mendeteksi perubahan abnormal pada sel serviks secara dini. Pemeriksaan ini sangat efektif untuk mencegah kanker serviks melalui deteksi dini lesi pra-kanker.",
      clinical: "Tes ini merupakan langkah utama dalam deteksi dini kanker serviks, direkomendasikan dilakukan secara berkala setiap 3 tahun.",
    },
    {
      icon: "🚭",
      title: "Stop rokok",
      desc: "Merokok dapat mempercepat perkembangan infeksi HPV menjadi kanker serviks karena melemahkan sistem imun di area serviks.",
      clinical: "Zat kimia dalam rokok dapat menyebabkan perubahan genetik pada sel epitel serviks, meningkatkan risiko transformasi menjadi kanker.",
    },
    {
      icon: "🧬",
      title: "Perkuat imun tubuh",
      desc: "Sistem imun yang kuat membantu tubuh melawan infeksi HPV secara alami.",
      clinical: "Konsumsi makanan bergizi, olahraga, dan tidur cukup terbukti menjaga sel imun tetap aktif melawan infeksi HPV.",
    },
    {
      icon: "💉",
      title: "Vaksin HPV",
      desc: "Vaksinasi HPV efektif mencegah infeksi virus penyebab utama kanker serviks.",
      clinical: "Dianjurkan untuk perempuan usia 9–26 tahun sebelum aktif secara seksual untuk hasil perlindungan optimal.",
    },
  ];

  return (
    <div id="healthy" className="predict-container section bg-leaf">
      <div className="predict-card">
        <h2 className="predict-title">Tentang Kanker Serviks</h2>
        <p className="about-text">
          Kanker serviks merupakan salah satu penyebab utama kematian pada wanita di seluruh dunia.
          Penyakit ini disebabkan oleh infeksi Human Papillomavirus (HPV) yang menyerang sel epitel serviks.
          Menurut WHO, lebih dari <strong>600.000 kasus baru</strong> kanker serviks terjadi setiap tahun,
          dan sebagian besar dapat dicegah melalui vaksinasi dan deteksi dini seperti Pap Smear.
        </p>
        <p className="about-text">
          Edukasi mengenai gaya hidup sehat dan pemeriksaan rutin sangat penting untuk mencegah kanker serviks
          serta menjaga kesehatan reproduksi wanita.
        </p>

        <h2 className="predict-title" style={{ marginTop: "40px" }}>
          Tips Kesehatan Serviks 🌿
        </h2>

        <div className="tips-grid">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="tip-box"
              onClick={() => setActiveTip(tip)}
              style={{ cursor: "pointer" }}
            >
              {tip.icon} {tip.title}
            </div>
          ))}
        </div>

        <div className="read-more">
          <p>Cari tahu info lebih lanjut:</p>
          <a
            href="https://jurnal.polibatam.ac.id/index.php/JAIC/article/view/10343"
            target="_blank"
            rel="noopener noreferrer"
          >
            Klik artikel edukatif disini →
          </a>
        </div>
      </div>

      {/* Modal Pop-up */}
      {activeTip && (
        <div className="modal-overlay" onClick={() => setActiveTip(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{activeTip.icon} {activeTip.title}</h3>
            <p><strong>Deskripsi:</strong> {activeTip.desc}</p>
            <p><strong>Makna Klinis:</strong> {activeTip.clinical}</p>
            <button className="close-btn" onClick={() => setActiveTip(null)}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
}
