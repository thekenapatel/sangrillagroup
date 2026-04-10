import { useState } from "react";
import "../styles/commercial.css";

const tryLoadImage = (imagePath: string, isCommercial: boolean) => {
  if (isCommercial) {
    return new URL(`../assets/commercial/${imagePath}`, import.meta.url).href;
  }
  return new URL(`../assets/residential/${imagePath}`, import.meta.url).href;
};

const completedProjectsData = [
  {
    id: 1,
    name: "Sangrilla Complex",
    place: "Ahmedabad",
    description: "A well-designed commercial complex offering prime shop and office spaces with high footfall.",
    imageName: "com_1.jpg",
    isCommercial: true
  },
  {
    id: 2,
    name: "Sangrilla Bunglows",
    place: "Ahmedabad",
    description: "Premium independent bungalows featuring luxurious living spaces in a prime location.",
    imageName: "com_res_1.jpg",
    isCommercial: false
  },
  {
    id: 3,
    name: "Sangrilla Township",
    place: "Ahmedabad",
    description: "A large-scale, well-planned residential township with comprehensive amenities and vibrant community living.",
    imageName: "com_res_2.jpg",
    isCommercial: false
  },
  {
    id: 4,
    name: "Swagat Bunglows",
    place: "Ahmedabad",
    description: "Elegant and spacious bungalows known for superior quality construction and comfortable family homes.",
    imageName: "com_res_3.jpg",
    isCommercial: false
  },
  {
    id: 5,
    name: "Anantaa Park",
    place: "Ahmedabad",
    description: "A serene residential project with beautiful landscaping and modern homes.",
    imageName: "com_res_4.jpg",
    isCommercial: false
  },
  {
    id: 6,
    name: "Supan Residency",
    place: "Ahmedabad",
    description: "High-quality residential apartments offering excellent value and a modern lifestyle.",
    imageName: "com_res_5.jpg",
    isCommercial: false
  },
  {
    id: 7,
    name: "Satyam Bunglows",
    place: "Ahmedabad",
    description: "Classic and spacious bungalows built with trust and superior workmanship.",
    imageName: "com_res_6.jpg",
    isCommercial: false
  },
  {
    id: 8,
    name: "Sangrilla Plaza",
    place: "Gandhinagar",
    description: "Modern commercial plaza ideal for retail, showrooms, and business establishments.",
    imageName: "com_2.jpg",
    isCommercial: true
  },
  {
    id: 9,
    name: "Anantaa Bunglows",
    place: "Ahmedabad",
    description: "Premium bungalow project delivering luxurious and spacious independent homes.",
    imageName: "com_res_7.jpg",
    isCommercial: false
  },
  {
    id: 10,
    name: "Ananta Business Park",
    place: "Ahmedabad",
    description: "Premium business park developed for offices, corporate spaces, and professional services.",
    imageName: "com_3.jpg",
    isCommercial: true
  },
  {
    id: 11,
    name: "Sangrilla White House",
    place: "Ahmedabad",
    description: "Elegant premium residential bungalows with a distinctive modern white-themed design.",
    imageName: "com_res_8.jpg",
    isCommercial: false
  }
];

const ProjectCard = ({ project }: { project: any }) => {
  const [imgSrc, setImgSrc] = useState(tryLoadImage(project.imageName, project.isCommercial));

  return (
    <div className="project-card">
      <div className="project-image-wrapper">
        <img 
          src={imgSrc} 
          alt={project.name} 
          onError={() => setImgSrc(`https://placehold.co/600x600/1f2937/ffffff?text=${project.name.replace(/ /g, '+')}`)}
          className="project-image"
        />
      </div>
      <div className="project-info">
        <h3 className="project-name">{project.name}</h3>
        <span className="project-location">{project.place && project.place}</span>
        {project.description && <p>{project.description}</p>}
      </div>
    </div>
  );
};

const CompletedProjects = () => {
  return (
    <div className="commercial-page">
      <div className="commercial-hero">
        <h1>Completed Projects</h1>
        <p className="commercial-subtitle">
          Over the past two decades, Sangrilla has successfully built and delivered a diverse portfolio of landmark spaces across the state, from luxurious serene bungalows and robust commercial plazas to vibrant residential townships.
        </p>
      </div>

      <div className="projects-section">
        <div className="projects-grid">
          {completedProjectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompletedProjects;
