import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, CheckCircle2, ArrowLeft, Mail } from "lucide-react";
import "../styles/project-detail.css";
import OptimizedImage from "../components/OptimizedImage";
import { getProjectById } from "../data/allProjects";
import SangrillaMeadowsDetail from "./SangrillaMeadowsDetail";

const resolveImage = (path: string): string => {
  if (!path) return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200";
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('/') || path.startsWith('blob:')) {
    return path;
  }
  try {
    return new URL(`../assets/${path}`, import.meta.url).href;
  } catch {
    return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200";
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (id === "sangrilla-meadows") {
    return <SangrillaMeadowsDetail />;
  }

  const project = id ? getProjectById(id) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If we are at the top and scrolling UP significantly
      if (window.scrollY <= 0 && e.deltaY < -50) {
        if (project) {
          navigate(project.type === "commercial" ? "/commercial" : "/residential");
        } else {
          navigate("/");
        }
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [project, navigate]);

  if (!project) {
    return (
      <div className="project-detail-page">
        <div className="pd-not-found">
          <h2>Project not found</h2>
          <Link to="/commercial" className="pd-back-link">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      <div className="project-detail-linear-container">
        
        {/* ── TOP: Breadcrumb & Header ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pd-linear-header"
        >
          <div className="pd-breadcrumb">
            <Link to="/" className="pd-breadcrumb-link">Home</Link>
            <span className="pd-breadcrumb-separator">/</span>
            <Link
              to={project.type === "commercial" ? "/commercial" : "/residential"}
              className="pd-breadcrumb-link"
            >
              {project.type === "commercial" ? "Commercial" : "Residential"}
            </Link>
            <span className="pd-breadcrumb-separator">/</span>
            <span className="pd-breadcrumb-current">{project.name}</span>
          </div>

          <h1 className="pd-linear-title">{project.name}</h1>
          <p className="pd-linear-tagline">{project.tagline}</p>

          <div className="pd-meta-row">
            <span className="pd-badge pd-location">
              <MapPin size={14} /> {project.location}
            </span>
            <span className={`pd-badge pd-status ${project.status === "under-construction" ? "uc" : "done"}`}>
              <span className={`status-dot ${project.status === "under-construction" ? "pulse" : ""}`} />
              {project.status === "under-construction"
                ? "Under Construction"
                : `Completed${project.year ? ` · ${project.year}` : ""}`}
            </span>
          </div>
        </motion.div>

        {/* ── SECTION: Key Specifications ── */}
        {project.specs && project.specs.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="pd-specs-grid"
          >
            {project.specs.map((spec, idx) => (
              <div key={idx} className="pd-spec-item">
                <span className="pd-spec-label">{spec.label}</span>
                <span className="pd-spec-value">{spec.value}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── SECTION: Project Configuration (Inventory) ── */}
        {project.inventory && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="pd-inventory-section"
          >
            <h3 className="pd-section-title">Project Configuration</h3>
            <div className="pd-inventory-card-single">
              <table className="pd-inventory-table">
                <thead>
                  <tr>
                    <th>Floor</th>
                    <th>Shops/Offices</th>
                    <th>Unit Size</th>
                  </tr>
                </thead>
                <tbody>
                  {project.inventory.map((item, idx) => (
                    <tr key={idx}>
                      <td className="floor-cell">{item.floor}</td>
                      <td className="count-cell">{item.count}</td>
                      <td className="size-cell">{item.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* ── SECTION: Description ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pd-description-section"
        >
          <h3 className="pd-section-title">About the Project</h3>
          <p className="pd-description-text">{project.description}</p>
{/*           
            <Link to="/contact" className="pd-contact-btn">
              <Mail size={18} /> Enquire Now
            </Link> */}
        </motion.div>

        {/* ── SECTION: Photos (Horizontal Scroller) ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pd-photos-section"
        >
          <h3 className="pd-section-title">Photos</h3>
          <div className="pd-horizontal-scroller">
            {project.images.map((imgPath, idx) => (
              <div key={idx} className="pd-photo-wrapper">
                <OptimizedImage
                  src={resolveImage(imgPath)}
                  alt={`${project.name} view ${idx + 1}`}
                  className="pd-photo-img"
                  containerClassName="pd-photo-container"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── SECTION: Amenities ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pd-amenities-section"
        >
          <h3 className="pd-section-title">Amenities</h3>
          <div className="pd-amenities-grid">
            {project.amenities.map((amenity, idx) => (
              <div key={idx} className="pd-amenity-item">
                <CheckCircle2 size={18} className="pd-amenity-icon" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
