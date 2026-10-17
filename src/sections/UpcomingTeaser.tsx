import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/upcoming.css";
import OptimizedImage from "../components/OptimizedImage";

import blossom from "../assets/upcoming/blossom.jpg";
import skyline from "../assets/upcoming/skyline.jpg";

const upcomingProjects = [
  {
    title: "SANGRILLA NEEJDHAM",
    description: "Ultra-luxury 4BHK apartments with private decks.",
    launchDate: "2026-06-15",
    image: blossom,
  },
  {
    title: "SANGRILLA SKYLINE",
    description: "Next-gen smart offices with sky gardens.",
    launchDate: "2026-08-01",
    image: skyline,
  }
];

const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; mins: number } | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 60000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return <div className="countdown-timer">Soon...</div>;

  return (
    <div className="countdown-timer">
      <div className="countdown-box">
        <span className="countdown-num">{timeLeft.days}</span>
        <span className="countdown-label">Days</span>
      </div>
      <div className="countdown-box">
        <span className="countdown-num">{timeLeft.hours}</span>
        <span className="countdown-label">Hrs</span>
      </div>
      <div className="countdown-box">
        <span className="countdown-num">{timeLeft.mins}</span>
        <span className="countdown-label">Mins</span>
      </div>
    </div>
  );
};

const UpcomingTeaser: React.FC = () => {
  return (
    <section className="upcoming-section">
      <div className="upcoming-header">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Upcoming Projects 
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A glimpse into the future of luxury living. Be the first to know when we launch.
        </motion.p>
      </div>

      <div className="upcoming-grid">
        {upcomingProjects.map((project, index) => (
          <div
            key={index}
            className="upcoming-card"
          >
            <div className="upcoming-image-container">
              <OptimizedImage src={project.image} alt={project.title} />
            </div>
            
            <div className="upcoming-card-content">
              <span className="upcoming-badge">Coming Soon</span>
              
              <div className="upcoming-info">
                <h3>{project.title}</h3>
                <CountdownTimer targetDate={project.launchDate} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingTeaser;

