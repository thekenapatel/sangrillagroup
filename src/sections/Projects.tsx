import "../styles/projects.css";
import VillaImage from "../assets/property images/villa_image.png";
import ResidencyImage from "../assets/property images/interior_residency_image.png";
import CommercialImage from "../assets/property images/commercial_image.png";
import { useRef, useState } from "react";

const projects = [
  {
    name: "Sangrilla Heights",
    location: "Ahmedabad",
    category: "residential",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705",
  },
  {
    name: "Sangrilla Residency",
    location: "Gandhinagar",
    category: "residential",
    image: ResidencyImage,
  },
  {
    name: "Sangrilla Villas",
    location: "SG Highway",
    category: "residential",
    image: VillaImage,
  },
  {
    name: "Sangrilla Corporate",
    location: "Mumbai",
    category: "commercial",
    image: CommercialImage,
  },
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

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

    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  // ✅ FILTER LOGIC
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter(p => p.category === activeFilter);

  return (
    <div className="projects">
      <h2 className="projects-title">Our Projects</h2>

      {/* FILTERS */}
      <div className="projects-filters">
        <div
          className={`filter-item ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          All
        </div>

        <div
          className={`filter-item ${activeFilter === "residential" ? "active" : ""}`}
          onClick={() => setActiveFilter("residential")}
        >
          Residential
        </div>

        <div
          className={`filter-item ${activeFilter === "commercial" ? "active" : ""}`}
          onClick={() => setActiveFilter("commercial")}
        >
          Commercial
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
            <img src={project.image} className="project-image" />

            <div className="project-overlay"></div>

            <div className="project-text">
              <h3 className="project-name">{project.name}</h3>
              <p className="project-location">{project.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;