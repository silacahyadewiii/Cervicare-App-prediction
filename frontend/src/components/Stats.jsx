import { useEffect, useRef, useState } from "react";
import "./Stats.css";

export default function Stats() {
  const statsRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  const statsData = [
    { value: 99, suffix: "%", label: "Accuracy Model" },
    { value: 20000, suffix: "+", label: "Images Trained" },
    { value: 24, suffix: "/7", label: "Digital Screening" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="stats-container" ref={statsRef}>
      {statsData.map((stat, index) => (
        <div className={`stat-box ${animate ? "show" : ""}`} key={index}>
          <AnimatedNumber end={stat.value} suffix={stat.suffix} start={animate} />
          <p>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

function AnimatedNumber({ end, suffix, start }) {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startValue = 0;
    const duration = 1500;
    const increment = end / (duration / 15);

    const counter = setInterval(() => {
      startValue += increment;
      if (startValue >= end) {
        setNumber(end);
        clearInterval(counter);
      } else {
        setNumber(Math.floor(startValue));
      }
    }, 15);

    return () => clearInterval(counter);
  }, [start, end]);

  return <h3>{number}{suffix}</h3>;
}
