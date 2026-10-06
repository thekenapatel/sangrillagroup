import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { z } from "zod";
import { Link } from "react-router-dom";
import "../styles/upcoming.css";
import OptimizedImage from "../components/OptimizedImage";

import blossom from "../assets/upcoming/blossom.jpg";
import skyline from "../assets/upcoming/skyline.jpg";

const upcomingProjects = [
  {
    title: "Sangrilla Blossom",
    description: "Ultra-luxury 4BHK apartments with private decks.",
    launchDate: "2026-06-15",
    image: blossom,
  },
  {
    title: "Sangrilla Skyline",
    description: "Next-gen smart offices with sky gardens.",
    launchDate: "2026-08-01",
    image: skyline,
  }
];

const emailSchema = z.string().email("Please enter a valid email address");

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

const NotifyForm: React.FC<{ projectTitle: string }> = ({ projectTitle }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    try {
      emailSchema.parse(email);
    } catch (err: any) {
      setErrorMessage(err instanceof z.ZodError ? err.issues[0].message : err.message);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      // Simulation for registration since there is no backend API yet
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus("success");
      setEmail("");
      
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Failed to subscribe. Please check your connection.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="notify-container">
      <form className="notify-form" onSubmit={handleSubmit}>
        <div className="input-with-button">
          <input 
            type="email" 
            placeholder="Your Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading" || status === "success"}
            required 
          />
          <button 
            type="submit" 
            disabled={status === "loading" || status === "success"}
          >
            {status === "loading" ? <Loader2 className="spinner" size={18} /> : "Notify Me"}
          </button>
        </div>

      </form>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: status !== "idle" ? 1 : 0, y: status !== "idle" ? 0 : 10 }}
        className={`feedback-msg ${status}`}
      >
        {status === "success" && (
          <><CheckCircle2 size={16} /> Successfully registered for updates!</>
        )}
        {status === "error" && (
          <><AlertCircle size={16} /> {errorMessage}</>
        )}
      </motion.div>
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
          Upcoming Projects Teaser
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

                <NotifyForm projectTitle={project.title} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingTeaser;

