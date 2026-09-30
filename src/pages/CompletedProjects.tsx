import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/completed-projects.css";
import OptimizedImage from "../components/OptimizedImage";
import { allProjects, type Project } from "../data/allProjects";

const ProjectCard = ({ project }: { project: Project }) => {
  const projectType = project.specs.find(s => s.label === "Type")?.value || (project.type === 'commercial' ? 'Commercial' : 'Residential');
  const projectYear = project.year || project.specs.find(s => s.label.includes("Year"))?.value;

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
          <div className="card-overlay">
            <span className="tag">{project.type}</span>
          </div>
        </div>
        <div className="card-content">
          <div className="card-header">
            <div>
              <h3>{project.name}</h3>
              <p className="card-type-minimal">{projectType} {projectYear ? `· ${projectYear}` : ""}</p>
            </div>
            <div className="location-tag">
              <span className="icon">📍</span>
              {project.location}
            </div>
          </div>
          
          {/* <p className="card-desc">{project.description}</p> */}
          
          {/* {project.inventory && (
            <div className="card-footer">
              {project.inventory.slice(0, 2).map((item, idx) => (
                <div key={idx} className="inventory-badge">
                  <strong>{item.floor}:</strong> {item.count}
                </div>
              ))}
            </div>
          )} */}
        </div>
      </motion.div>
    </Link>
  );
};

const CompletedProjects = () => {
  const [filter, setFilter] = useState<"all" | "commercial" | "residential">("all");

  const filteredProjects = allProjects.filter((p) => {
    if (p.status !== "completed") return false;
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
            Completed Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Over two decades of crafting landmark spaces that define the skyline of Gujarat. 
            Discover our portfolio of successfully delivered commercial plazas and residential townships.
          </motion.p>
        </div>

        <div className="filter-controls">
          {(["all", "commercial", "residential"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`filter-btn ${filter === type ? "active" : ""}`}
            >
              {type}
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

export default CompletedProjects;
