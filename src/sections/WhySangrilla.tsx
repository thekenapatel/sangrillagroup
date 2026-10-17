import { motion, useReducedMotion } from "framer-motion";
import { Compass, Handshake, ShieldCheck, TrendingUp } from "lucide-react";
import "../styles/why-sangrilla.css";

const pillars = [
  {
    number: "01",
    Icon: Compass,
    title: "Strategic Locations",
    lead: "Well-connected locations.",
    description: "Explore opportunities across Ahmedabad and Dholera.",
  },
  {
    number: "02",
    Icon: ShieldCheck,
    title: "Transparency First",
    lead: "Clarity at every step.",
    description: "Verified project documentation and clear ownership processes.",
  },
  {
    number: "03",
    Icon: TrendingUp,
    title: "Long-Term Value",
    lead: "Invest with perspective.",
    description: "Explore residential and commercial opportunities aligned with your goals.",
  },
  {
    number: "04",
    Icon: Handshake,
    title: "Personal Guidance",
    lead: "With you at every step.",
    description: "From site visits to purchase assistance, we make the process simpler.",
  },
];

const WhySangrilla: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const initialState = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 };
  const animationDuration = reduceMotion ? 0 : 0.55;

  return (
    <section className="why-sangrilla" aria-labelledby="why-heading">
      <div className="why-inner">
        <header className="why-header">
          <span className="why-eyebrow">WHY SANGRILLA</span>
          <div className="why-heading-row">
            <motion.h2
              id="why-heading"
              initial={initialState}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: animationDuration }}
            >
              Built on Trust. Focused on Tomorrow.
            </motion.h2>
            <motion.p
              initial={initialState}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: animationDuration, delay: reduceMotion ? 0 : 0.12 }}
            >
              Thoughtfully chosen locations, transparent processes, and personalized guidance for your real estate journey.
            </motion.p>
          </div>
        </header>

        <div className="why-grid">
          {pillars.map(({ number, Icon, title, lead, description }, index) => (
          <motion.article
            key={number}
            className="why-pillar"
            initial={initialState}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: animationDuration, delay: reduceMotion ? 0 : index * 0.08 }}
          >
            <div className="why-pillar-marker" aria-hidden="true">
              <span className="why-pillar-number">{number}</span>
              <span className="why-pillar-icon"><Icon size={22} strokeWidth={1.6} /></span>
            </div>
            <div className="why-pillar-copy">
              <h3>{title}</h3>
              <p className="why-pillar-lead">{lead}</p>
              <p className="why-pillar-description">{description}</p>
            </div>
          </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySangrilla;
