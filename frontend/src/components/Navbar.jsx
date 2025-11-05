import "./Navbar.css";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleScroll = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">CerviCare</div>

      <ul className={`nav-links ${open ? "active" : ""}`}>
        <li onClick={() => handleScroll("welcome")}>Home</li>
        <li onClick={() => handleScroll("predict-section")}>Predict</li>
        <li onClick={() => handleScroll("healthy")}>About</li>
      </ul>

      <div className="menu-btn" onClick={() => setOpen(!open)}>
        ☰
      </div>
    </nav>
  );
}
