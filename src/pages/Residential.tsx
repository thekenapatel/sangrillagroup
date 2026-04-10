import { useState } from "react";
import "../styles/commercial.css";

const tryLoadImage = (name: string) => {
  return new URL(`../assets/residential/${name}`, import.meta.url).href;
};

const upcomingProjects = [
  {
    id: 1,
    name: "Anantaa Homes",
    place: "Ahmedabad",
    description: "A modern residential development offering spacious and contemporary homes with excellent amenities and great connectivity.",
    imageName: "up_res_1.jpg",
    fallbackName: "up_res_1.png",
    fallbackUrl: "https://placehold.co/600x600/1f2937/ffffff?text=Anantaa+Homes"
  },
  {
    id: 2,
    name: "Supan Residency",
    place: "Ahmedabad",
    description: "An upcoming premium residential project designed for comfortable and luxurious living.",
    imageName: "up_res_2.jpg",
    fallbackName: "up_res_2.png",
    fallbackUrl: "https://placehold.co/600x600/1f2937/ffffff?text=Supan+Residency"
  }
];

const completedProjects = [
  {
    id: 3,
    name: "Sangrilla Bunglows",
    place: "Ahmedabad",
    description: "Premium independent bungalows featuring luxurious living spaces in a prime location.",
    imageName: "com_res_1.jpg",
    fallbackName: "com_res_1.png",
    fallbackUrl: "https://placehold.co/600x600/1f2937/ffffff?text=Sangrilla+Bunglows"
  },
  {
    id: 4,
    name: "Sangrilla Township",
    place: "Ahmedabad",
    description: "A large-scale, well-planned residential township with comprehensive amenities and vibrant community living.",
    imageName: "com_res_2.jpg",
    fallbackName: "com_res_2.png",
    fallbackUrl: "https://placehold.co/600x600/1f2937/ffffff?text=Sangrilla+Township"
  },
  {
    id: 5,
    name: "Swagat Bunglows",
    place: "Ahmedabad",
    description: "Elegant and spacious bungalows known for superior quality construction and comfortable family homes.",
    imageName: "com_res_3.jpg",
    fallbackName: "com_res_3.png",
    fallbackUrl: "https://placehold.co/600x600/1f2937/ffffff?text=Swagat+Bunglows"
  },
  {
    id: 6,
    name: "Anantaa Park",
    place: "Ahmedabad",
    description: "A serene residential project with beautiful landscaping and modern homes.",
    imageName: "com_res_4.jpg",
    fallbackName: "com_res_4.png",
    fallbackUrl: "https://placehold.co/600x600/1f2937/ffffff?text=Anantaa+Park"
  },
  {
    id: 7,
    name: "Supan Residency",
    place: "Ahmedabad",
    description: "High-quality residential apartments offering excellent value and a modern lifestyle.",
    imageName: "com_res_5.jpg",
    fallbackName: "com_res_5.png",
    fallbackUrl: "https://placehold.co/600x600/1f2937/ffffff?text=Supan+Residency"
  },
  {
    id: 8,
    name: "Satyam Bunglows",
    place: "Ahmedabad",
    description: "Classic and spacious bungalows built with trust and superior workmanship.",
    imageName: "com_res_6.jpg",
    fallbackName: "com_res_6.png",
    fallbackUrl: "https://placehold.co/600x600/1f2937/ffffff?text=Satyam+Bunglows"
  },
  {
    id: 9,
    name: "Anantaa Bunglows",
    place: "Ahmedabad",
    description: "Premium bungalow project delivering luxurious and spacious independent homes.",
    imageName: "com_res_7.jpg",
    fallbackName: "com_res_7.png",
    fallbackUrl: "https://placehold.co/600x600/1f2937/ffffff?text=Anantaa+Bunglows"
  },
  {
    id: 10,
    name: "Sangrilla White House",
    place: "Ahmedabad",
    description: "Elegant premium residential bungalows with a distinctive modern white-themed design.",
    imageName: "com_res_8.jpg",
    fallbackName: "com_res_8.png",
    fallbackUrl: "https://placehold.co/600x600/1f2937/ffffff?text=White+House"
  }
];

const ProjectCard = ({ project }: { project: any }) => {
  const [imgSrc, setImgSrc] = useState(tryLoadImage(project.imageName));

  const handleError = () => {
    if (imgSrc.endsWith(project.imageName)) {
      setImgSrc(tryLoadImage(project.fallbackName));
    } else {
      setImgSrc(project.fallbackUrl);
    }
  };

  return (
    <div className="project-card">
      <div className="project-image-wrapper">
        <img 
          src={imgSrc} 
          alt={project.name} 
          onError={handleError}
          className="project-image"
        />
      </div>
      <div className="project-info">
        <h3>{project.name}</h3>
        <span className="project-location">{project.place && project.place}</span>
        {project.description && <p>{project.description}</p>}
      </div>
    </div>
  );
};

const Residential = () => {
  return (
    <div className="commercial-page">
      <div className="commercial-hero">
        <h1>Residential Projects</h1>
        <p className="commercial-subtitle">
          At SANGRILLA, we create high-quality homes and townships that offer comfort, elegance, and lasting value for families.
        </p>
      </div>

      <div className="projects-section">
        <h2 className="section-title">Upcoming Projects</h2>
        <div className="projects-grid">
          {upcomingProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div className="projects-section">
        <h2 className="section-title">Delivered Projects</h2>
        <div className="scrollable-container-wrapper">
          <div className="projects-grid scrollable-horizontal-grid">
            {completedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="scrollable-fade-right"></div>
        </div>
      </div>
    </div>
  );
};

export default Residential;
