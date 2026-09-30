import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import "../styles/hero.css";

const heroImages = [
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-morph">
      {/* 1. Subtle Background Slider */}
      <div className="hero-bg-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="hero-bg-image"
            style={{ backgroundImage: `url(${heroImages[currentIndex]})` }}
          />
        </AnimatePresence>
      </div>

      {/* 2. Side Socials (Minimalist) */}
      <div className="hero-socials-fixed">
        <motion.a 
          href="https://wa.me/919737227999" 
          className="social-box whatsapp" 
          target="_blank" 
          rel="noreferrer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <FaWhatsapp size={20} />
        </motion.a>
        <motion.a 
          href="tel:+919737227999" 
          className="social-box phone"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Phone size={18} strokeWidth={1.5} />
        </motion.a>
      </div>

      {/* 3. Central Branding (Static & Elegant) */}
      <div className="hero-branding">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          SANGRILLA
        </motion.h1>
        <motion.p 
          className="brand-tagline-moral"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        >
          Building with Purpose Since 2000.
        </motion.p>
      </div>

      {/* 4. Minimal Horizon Decoration */}
      <div className="hero-horizon" />
    </div>
  );
};

export default Hero;