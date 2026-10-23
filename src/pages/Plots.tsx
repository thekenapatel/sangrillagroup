import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import "../styles/plots.css";
import OptimizedImage from "../components/OptimizedImage";

const plotProjects = [
  {
    id: "sangrilla-meadows",
    name: "Sangrilla Meadows",
    location: "Aakru Village, Dholera SIR",
    badge: "145 Villa Plots · Dholera SIR",
    badgeTheme: "blue",
    image: "/assets/meadows/up_res_1.jpg",
    desc: "Demarcated residential villa plots with modern infrastructure, 12m wide internal roads, and immediate Dastavej.",
    link: "/project/sangrilla-meadows",
    enquireLink: "/dholera?project=sangrilla-meadows#dholera-contact"
  },
  {
    id: "sangrilla-baghban",
    name: "Sangrilla Baghban",
    location: "Kamiyala, Dholera SIR",
    badge: "96 Villa Plots · Dholera SIR",
    badgeTheme: "green",
    image: "/assets/baghban/sangrilla-baghban-entrance.png",
    desc: "Serene residential plots and porch villas with wide internal avenues, clubhouse, and lush green open spaces.",
    link: "/project/sangrilla-baghban",
    enquireLink: "/dholera?project=sangrilla-baghban#dholera-contact"
  }
];

const Plots: React.FC = () => {
  return (
    <div className="plots-page">
      <div className="plots-container">
        {/* Minimal Hero */}
        <section className="plots-hero">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="plots-hero-title"
          >
            Residential Plotting
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="plots-hero-subtitle"
          >
            Master-planned residential villa plots in Dholera SIR with clear title registry and modern infrastructure.
          </motion.p>
        </section>

        {/* Two Projects Showcased Only */}
        <div className="plots-grid">
          {plotProjects.map((project) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="plot-card"
            >
              <Link to={project.link} className="plot-card-media">
                <OptimizedImage
                  src={project.image}
                  alt={project.name}
                  className="plot-card-img"
                />
                <div className="plot-card-overlay" />
                <span
                  className={`plot-card-badge ${
                    project.badgeTheme === "green" ? "is-green" : "is-blue"
                  }`}
                >
                  {project.badge}
                </span>
              </Link>

              <div className="plot-card-body">
                <div
                  className={`plot-card-location ${
                    project.badgeTheme === "green" ? "is-green" : ""
                  }`}
                >
                  <MapPin size={14} />
                  <span>{project.location}</span>
                </div>

                <h2 className="plot-card-title">{project.name}</h2>
                <p className="plot-card-desc">{project.desc}</p>

                <div className="plot-card-actions">
                  <Link to={project.link} className="plot-btn-primary">
                    <span>Explore Project</span>
                    <ArrowRight size={14} />
                  </Link>

                  <Link to={project.enquireLink} className="plot-btn-enquire">
                    <span>Enquire</span>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plots;
