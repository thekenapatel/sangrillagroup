import React from "react";
import { motion } from "framer-motion";
import "../styles/why-sangrilla.css";

const reasons = [
  {
    icon: "📍",
    title: "Strategic Locations",
    description: "Our projects are situated in the fastest-growing corridors of Ahmedabad, ensuring maximum connectivity and future growth.",
  },
  {
    icon: "📈",
    title: "Investment Value",
    description: "Historically, Sangrilla properties have shown exceptional appreciation, making them a safe and high-yielding investment.",
  },
  {
    icon: "🏠",
    title: "Community First",
    description: "We don't just build houses; we curate thriving communities where luxury lifestyle and comfort coexist seamlessly.",
  }
];

const stats = [
  { number: "25+", text: "Years of Excellence" },
  { number: "1500+", text: "Happy Families" },
  { number: "15+", text: "Completed Projects" }
];

const WhySangrilla: React.FC = () => {
  return (
    <section className="why-sangrilla">
      <div className="why-header">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Why Sangrilla
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A localized touch for the city we call home. Discover why Sangrilla is the preferred choice for premium living.
        </motion.p>
      </div>

      <div className="why-grid">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            className="why-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <span className="why-card-icon">{reason.icon}</span>
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-box"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
          >
            <span className="stat-number">{stat.number}</span>
            <span className="stat-text">{stat.text}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhySangrilla;
