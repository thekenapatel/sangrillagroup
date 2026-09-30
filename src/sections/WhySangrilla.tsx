import { motion, animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  { value: 15, suffix: "+", text: "Completed Projects" },
  { value: 25, suffix: "+", text: "Years of Excellence" },
  { value: 1000, suffix: "+", text: "Happy Families" },
  { value: 1000000, suffix: "+", text: "Total sq.ft" }
];

const AnimatedCounter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest).toLocaleString('en-IN'));
        }
      });
      return controls.stop;
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

const WhySangrilla: React.FC = () => {
  return (
    <section className="why-sangrilla">
      <div className="why-header">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Sangrilla
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A localized touch for the city we call home. Discover why Sangrilla is the preferred choice for premium living.
        </motion.p>
      </div>

      <div className="why-grid">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="why-card"
          >
            <span className="why-card-icon">{reason.icon}</span>
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
          </div>
        ))}
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-box"
          >
            <span className="stat-number">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="stat-text">{stat.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhySangrilla;
