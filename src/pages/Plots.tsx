import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import "../styles/completed-projects.css";
import OptimizedImage from "../components/OptimizedImage";

const plotProjects = [
  {
    id: "sangrilla-meadows",
    name: "Sangrilla Meadows",
    tagline: "Residential Plots & Luxurious Villas",
    location: "Aakru Village, Dholera-SIR, Gujarat",
    status: "under-construction",
    badge: "Featured · 145 Plots",
    badgeColor: "#007ADD",
    image: "/assets/meadows/up_res_1.jpg",
    desc: "India's First Greenfield Smart City — Dholera SIR, just steps away. 145 thoughtfully planned villa plots from 100 to 300 Sq. Yards with modern infrastructure and immediate Dastavej.",
    highlights: ["29,471 Sq. Yd. Total Area", "12m Main Spine Road", "250m to Expressway Link"],
    link: "/project/sangrilla-meadows"
  },
  {
    id: "sangrilla-baghban",
    name: "Sangrilla Baghban",
    tagline: "A Rare Lifestyle Address in Dholera / Residential Plots & Porch Villas",
    location: "Kamiyala, Dholera-SIR, Gujarat",
    status: "under-construction",
    badge: "Featured · 96 Plots",
    badgeColor: "#15803d",
    image: "/assets/baghban/baghban-amenities.png",
    desc: "Strategically located at the gateway of Dholera SIR. 96 thoughtfully planned villa plots and luxurious porch villas with 9 mt & 12 mt wide internal roads, mandir, pool, and 24/7 CCTV gated security.",
    highlights: ["96 Planned Plots", "Porch Villas", "Individual Plot Ownership", "Clubhouse & Pool"],
    link: "/project/sangrilla-baghban"
  }
];

const Plots = () => {
  return (
    <div className="completed-page">
      <div className="completed-container">
        <div className="completed-hero">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Residential Plots
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Strategic land investments and master-planned residential plotting developments in Gujarat&apos;s prime growth corridors. Clear title, government-approved NA/NOC residential developments with immediate registry.
          </motion.p>
        </div>

        <div className="completed-grid" style={{ maxWidth: "1050px", margin: "0 auto" }}>
          {plotProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="completed-card"
            >
              <div className="card-image-box">
                <OptimizedImage
                  src={project.image}
                  alt={project.name}
                  className="project-image"
                />
                <div className="card-overlay" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span
                    className="tag"
                    style={{
                      background: project.badgeColor,
                      color: "#fff",
                      fontWeight: 700
                    }}
                  >
                    {project.badge}
                  </span>
                </div>
              </div>

              <div className="card-content">
                <div className="card-header">
                  <div>
                    <h3>{project.name}</h3>
                    <p className="card-type-minimal" style={{ color: project.badgeColor, fontWeight: 600 }}>
                      {project.tagline}
                    </p>
                  </div>
                  {project.location && (
                    <div className="location-tag">
                      <span className="icon">
                        <MapPin size={14} style={{ display: "inline", verticalAlign: "middle" }} />
                      </span>
                      {project.location}
                    </div>
                  )}
                </div>

                <p className="card-desc" style={{ fontSize: "0.92rem", color: "#4b5563", lineHeight: 1.6, margin: "14px 0" }}>
                  {project.desc}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                  {project.highlights.map((h, i) => (
                    <span
                      key={i}
                      style={{
                        background: "#f1f5f9",
                        color: "#334155",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: 600
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "15px",
                    paddingTop: "15px",
                    borderTop: "1px solid #f0f0f0"
                  }}
                >
                  <Link
                    to={project.link}
                    className="pc-btn pc-btn-explore"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      textDecoration: "none"
                    }}
                  >
                    <span>View Project Details</span>
                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    to="/contact"
                    className="pc-btn pc-btn-enquire"
                    style={{ textDecoration: "none" }}
                  >
                    Enquire Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plots;
