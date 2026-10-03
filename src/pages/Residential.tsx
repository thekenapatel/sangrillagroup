import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { residentialProjects } from "../data/allProjects";
import "../styles/fullscreen-listing.css";
import OptimizedImage from "../components/OptimizedImage";

const resolveImage = (path: string): string => {
  if (!path) return "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200";
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('/') || path.startsWith('blob:')) {
    return path;
  }
  try {
    return new URL(`../assets/${path}`, import.meta.url).href;
  } catch {
    return "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200";
  }
};

const Residential = () => {
  const [activeIndex, setActiveIndex] = useState(() => {
    const saved = sessionStorage.getItem("residentialActiveIndex");
    return saved ? parseInt(saved, 10) : 0;
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      const index = Math.round(scrollLeft / width);
      if (index !== activeIndex) {
        setActiveIndex(index);
        sessionStorage.setItem("residentialActiveIndex", index.toString());
      }
    }
  };

  const scrollToSection = (index: number, behavior: ScrollBehavior = "smooth") => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: index * width,
        behavior: behavior
      });
    }
  };

  useEffect(() => {
    // Restore scroll position on mount
    if (activeIndex !== 0) {
      const timer = setTimeout(() => {
        scrollToSection(activeIndex, "auto");
      }, 50);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // If we are at the first slide and scrolling LEFT or UP significantly
      if (activeIndex === 0 && (e.deltaX < -50 || e.deltaY < -50)) {
        navigate("/");
      }
    };

    el.addEventListener("wheel", handleWheel);
    el.addEventListener("scroll", handleScroll);
    
    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("scroll", handleScroll);
    };
  }, [activeIndex, navigate]);

  return (
    <div className="fs-portfolio-wrapper">
      <div className="fs-scroll-container" ref={scrollRef}>
        {residentialProjects.map((project, index) => (
          <section key={project.id} className="fs-project-section">
            {/* Background Layer */}
            <div className="fs-bg-layer">
              <OptimizedImage
                src={resolveImage(project.images[0])}
                className="fs-bg-image"
                alt={project.name}
                containerClassName="fs-bg-image-container"
              />
              <div className="fs-bg-overlay" />
            </div>

            {/* Content Panel */}
            <div className="fs-content-panel">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8 }}
              >
                <div className="fs-breadcrumb">
                  <Link to="/">Home</Link>
                  <span>/</span>
                  <span className="fs-current">Residential</span>
                </div>
                <h1 className="fs-title">{project.name}</h1>
                <p className="fs-tagline">{project.tagline}</p>
                
                <div className="fs-meta">
                  <div className="fs-badge">
                    <MapPin size={18} />
                    {project.location}{project.year ? ` · ${project.year}` : ""}
                  </div>
                  {/* {project.status === "under-construction" && (
                    <div className="fs-badge" style={{ background: '#007ADD', color: '#fff', border: 'none', fontWeight: 600 }}>
                      Under Construction
                    </div>
                  )} */}
                </div>

                <p className="fs-description">{project.description}</p>

                <div className="fs-actions">
                  <Link to={`/project/${project.id}`} className="fs-btn fs-btn-explore">
                    Explore Lifestyle <ArrowRight size={20} />
                  </Link>
                  <Link to="/contact" className="fs-btn fs-btn-enquire">
                    <MessageCircle size={20} /> Enquire
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="fs-bottom-nav">
        {residentialProjects.map((_, idx) => (
          <button
            key={idx}
            className={`fs-dot ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => scrollToSection(idx)}
            title={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Residential;
