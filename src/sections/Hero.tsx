import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import "../styles/hero.css";

const heroImages = [
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
];

const brandName = "SANGRILLA".split("");

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for parallax
  const springConfig = { damping: 30, stiffness: 200 };
  const sx = useSpring(mouseX, springConfig);
  const sy = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-morph">
      {/* 1. Liquid Morph Filter Definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="liquid-filter" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" seed="1" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* 2. Side Socials (Sharp Luxury) */}
      <div className="hero-socials-fixed">
        <a href="https://wa.me/919537702727" className="social-box whatsapp" target="_blank" rel="noreferrer">
          <FaWhatsapp size={22} />
        </a>
        <a href="tel:+919987322645" className="social-box phone">
          <Phone size={20} strokeWidth={1} />
        </a>
      </div>

      {/* 3. The Liquid Canvas */}
      <div className="morph-canvas">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.2, filter: 'url(#liquid-filter)' }}
            animate={{ opacity: 1, scale: 1.05, filter: 'url(#liquid-filter)' }}
            exit={{ opacity: 0, scale: 0.9, filter: 'url(#liquid-filter)' }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="morph-image"
            style={{ 
              backgroundImage: `url(${heroImages[currentIndex]})`,
              x: useTransform(sx, [-0.5, 0.5], [-30, 30]),
              y: useTransform(sy, [-0.5, 0.5], [-30, 30])
            }}
          />
        </AnimatePresence>
      </div>

      <div className="morph-overlay" />

      {/* 4. Floating Typography (3D Parallax) */}
      <div className="hero-branding">
        <div className="brand-parallax">
          {brandName.map((char, index) => (
            <motion.span
              key={index}
              className="floating-letter"
              style={{
                x: useTransform(sx, [-0.5, 0.5], [(-20 * (index - 4)), (20 * (index - 4))]),
                y: useTransform(sy, [-0.5, 0.5], [-15, 15]),
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
        <motion.p 
          className="brand-tagline-moral"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1 }}
        >
          Aspire to Grow.
        </motion.p>
      </div>

      {/* 5. The Horizon Line (Minimal HUD) */}
      <div className="hero-horizon">
        <div className="horizon-line-wrapper">
          <motion.div 
            className="horizon-bar" 
            style={{
              x: useTransform(sx, [-0.5, 0.5], ["-5%", "5%"]),
              rotate: useTransform(sx, [-0.5, 0.5], [-1, 1])
            }}
          />
          <div className="horizon-labels">
            <span>RESIDENTIAL</span>
            <span>COMMERCIAL</span>
            <span>PLOTTING</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;