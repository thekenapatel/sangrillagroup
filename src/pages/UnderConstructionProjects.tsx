import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, MessageCircle } from "lucide-react";
import "../styles/completed-projects.css";
import OptimizedImage from "../components/OptimizedImage";
import { allProjects, type Project } from "../data/allProjects";

const ProjectCard = ({ project }: { project: Project }) => {
  const projectType =
    project.specs.find((s) => s.label === "Type")?.value ||
    (project.type === "commercial" ? "Commercial" : "Residential");

  return (
    <Link to={`/project/${project.id}`} className="completed-card-link">
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
        className="completed-card"
      >
        <div className="card-image-box">
          <OptimizedImage
            src={project.images[0]}
            alt={project.name}
            className="project-image"
          />
          <div className="card-overlay" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span
              className="tag"
              style={{
                background: "#007ADD",
                color: "#fff",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#fff",
                  display: "inline-block"
                }}
              />
              Under Construction
            </span>
            <span className="tag" style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}>
              Pre-Launch
            </span>
          </div>
        </div>

        <div className="card-content">
          <div className="card-header">
            <div>
              <h3>{project.name}</h3>
              <p className="card-type-minimal" style={{ color: "#007ADD", fontWeight: 600 }}>
                {project.tagline || projectType}
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
            {project.id === "sangrilla-meadows"
              ? "India's First Greenfield Smart City — Dholera SIR, just steps away. Offering well-planned residential villa plots and luxurious porch villas."
              : project.description}
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px",
              paddingTop: "15px",
              borderTop: "1px solid #f0f0f0"
            }}
          >
            <Link
              to={`/project/${project.id}`}
              className="pc-btn pc-btn-explore"
              style={{
                flex: 1,
                textAlign: "center",
                padding: "10px",
                borderRadius: "8px",
                background: "#111",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.85rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              View Details <ArrowRight size={14} />
            </Link>

            <Link
              to="/contact"
              className="pc-btn pc-btn-enquire"
              style={{
                padding: "10px 18px",
                borderRadius: "8px",
                background: "#f3f4f6",
                color: "#111",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.85rem",
                border: "1px solid #e5e7eb",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle size={14} /> Enquire
            </Link>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const UnderConstructionProjects = () => {
  const [filter, setFilter] = useState<"all" | "commercial" | "residential">("all");

  const underConstructionList = allProjects.filter((p) => p.status === "under-construction");

  const filteredProjects = underConstructionList.filter((p) => {
    if (filter === "all") return true;
    return p.type === filter;
  });

  return (
    <div className="completed-page">
      <div className="completed-container">
        <div className="completed-hero">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Under Construction
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover our prestigious upcoming landmarks and active developments underway in Gujarat&apos;s fastest-growing corridors.
          </motion.p>
        </div>

        <div className="filter-controls">
          {(["all", "residential", "commercial"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`filter-btn ${filter === type ? "active" : ""}`}
            >
              {type === "all" ? "All Active" : type}
            </button>
          ))}
        </div>

        <motion.div layout className="completed-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default UnderConstructionProjects;
