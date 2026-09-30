import "../styles/projects.css";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { allProjects } from "../data/allProjects";
import OptimizedImage from "../components/OptimizedImage";

const resolveImage = (path: string): string => {
  if (!path) return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800";
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('/') || path.startsWith('blob:')) {
    return path;
  }
  try {
    return new URL(`../assets/${path}`, import.meta.url).href;
  } catch {
    return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800";
  }
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const filteredProjects =
    activeFilter === "all"
      ? allProjects
      : allProjects.filter((p) => p.type === activeFilter);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };
  const handleMouseUp = () => (isDown.current = false);
  const handleMouseLeave = () => (isDown.current = false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 2;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleScroll = () => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      const { scrollLeft } = scrollRef.current;
      const firstCard = scrollRef.current.children[0] as HTMLElement;
      const cardWidth = firstCard.offsetWidth + 20; // card width + gap on mobile (20px)
      const index = Math.round(scrollLeft / cardWidth);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  const scrollToSection = (index: number) => {
    if (scrollRef.current) {
      const firstCard = scrollRef.current.children[0] as HTMLElement;
      const cardWidth = firstCard.offsetWidth + 20; // card width + gap
      
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, [activeIndex, filteredProjects]);

  return (
    <div className="hp-projects-wrap">
      <div className="hp-projects-container">
        <h2 className="projects-title">Explore Our Landmarks</h2>

        {/* FILTERS */}
        <div className="projects-filters">
          {[
            { key: "all", label: "All" },
            { key: "residential", label: "Residential" },
            { key: "commercial", label: "Commercial" },
          ].map(({ key, label }) => (
            <div
              key={key}
              className={`filter-item ${activeFilter === key ? "active" : ""}`}
              onClick={() => {
                setActiveFilter(key);
                setActiveIndex(0);
                if (scrollRef.current) scrollRef.current.scrollLeft = 0;
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* SCROLL CONTAINER */}
      <div
        ref={scrollRef}
        className="projects-scroll"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {filteredProjects.map((project, index) => (
          <div key={index} className="project-card">
            {/* Image */}
            <div className="project-image-wrapper">
              <OptimizedImage
                src={resolveImage(project.images[0])}
                className="project-image"
                alt={project.name}
              />
              {project.status === "under-construction" && (
                <span className="project-card-badge">Under Construction</span>
              )}
            </div>

            {/* Info */}
            <div className="project-info">
              <h3 className="project-name">{project.name}</h3>
              <p className="project-location">{project.location}</p>

              {/* Action Buttons */}
              <div className="project-card-actions">
                <Link
                  to="/contact"
                  className="pc-btn pc-btn-enquire"
                  onClick={(e) => e.stopPropagation()}
                >
                  Enquire
                </Link>
                <Link
                  to={`/project/${project.id}`}
                  className="pc-btn pc-btn-explore"
                  onClick={(e) => e.stopPropagation()}
                >
                  Explore →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION DOTS (MOBILE ONLY) */}
      <div className="projects-dots">
        {filteredProjects.map((_, index) => (
          <div
            key={index}
            className={`project-dot ${activeIndex === index ? "active" : ""}`}
            onClick={() => scrollToSection(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;