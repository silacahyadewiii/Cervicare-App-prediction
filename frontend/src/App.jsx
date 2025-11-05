import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Welcome from "./pages/Welcome";
import Predict from "./pages/Predict";
import Healthy from "./pages/Healthy";
import Footer from "./components/Footer";

import "./styles/Predict.css";

export default function App() {
  useEffect(() => {
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((sec) => observer.observe(sec));
  }, []);

  return (
    <>
      <Navbar />
      <Welcome />
      <Predict />
      <Healthy />
      <Footer />
    </>
  );
}
