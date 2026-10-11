import { motion } from "framer-motion";
import { Compass, Handshake, ShieldCheck, TrendingUp } from "lucide-react";
import "../styles/why-sangrilla.css";

const pillars = [
  {
    number: "01",
    Icon: Compass,
    title: "Strategic Growth Corridors",
    description: "Prime developments situated directly across Gujarat’s highest-appreciation zones, including Dholera SIR and prime Ahmedabad hubs.",
  },
  {
    number: "02",
    Icon: ShieldCheck,
    title: "Absolute Legal Transparency",
    description: "100% RERA-registered projects with verified title documentation, clear land history, and hassle-free ownership transfers.",
  },
  {
    number: "03",
    Icon: TrendingUp,
    title: "High-Yield Asset Curation",
    description: "Expertly selected residential plotting and commercial spaces structured for maximum capital growth and generational wealth.",
  },
  {
    number: "04",
    Icon: Handshake,
    title: "Dedicated Investor Ecosystem",
    description: "End-to-end guidance from personalized site visit assistance to strategic channel partner support and long-term asset management.",
  },
];

const WhySangrilla: React.FC = () => {
  return (
    <section className="why-sangrilla">
      <div className="why-header">
        <span className="why-eyebrow">WHY SANGRILLA GROUP</span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          Redefining Real Estate &amp; Smart City Growth
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Strategic location choices, absolute legal transparency, and future-proof developments designed for living and high-return investments.
        </motion.p>
      </div>

      <div className="why-grid">
        {pillars.map(({ number, Icon, title, description }, index) => (
          <motion.article
            key={number}
            className="why-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <div className="why-card-topline">
              <span className="why-card-number">{number}</span>
              <span className="why-card-icon"><Icon size={24} strokeWidth={1.8} /></span>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default WhySangrilla;
