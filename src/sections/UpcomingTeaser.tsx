import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/upcoming.css";

const upcomingProjects = [
  {
    title: "Sangrilla Homes",
    location: "South Bopal, Ahmedabad",
    description: "Ultra-luxury 4BHK apartments with private decks.",
    launchDate: "2026-06-15",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "The Anantaa Corporate",
    location: "Prahlad Nagar, Ahmedabad",
    description: "Next-gen smart offices with sky gardens.",
    launchDate: "2026-08-01",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
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
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Upcoming Projects Teaser
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A glimpse into the future of luxury living. Be the first to know when we launch.
        </motion.p>
      </div>

      <div className="upcoming-grid">
        {upcomingProjects.map((project, index) => (
          <motion.div
            key={index}
            className="upcoming-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="upcoming-image-container">
              <img src={project.image} alt={project.title} />
            </div>
            
            <div className="upcoming-card-content">
              <span className="upcoming-badge">Coming Soon</span>
              
              <div className="upcoming-info">
                <h3>{project.title}</h3>
                <p>{project.location}</p>
                
                <CountdownTimer targetDate={project.launchDate} />

                <form className="notify-form" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="Your Email" required />
                  <button type="submit">Notify Me</button>
                </form>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingTeaser;
