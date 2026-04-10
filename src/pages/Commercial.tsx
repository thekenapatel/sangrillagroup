import { useState } from "react";
import "../styles/commercial.css";

// We'll dynamically resolve these to prevent the app from crashing if 
// the user hasn't added the files with the exact names or extensions yet.
// The user specified names without extensions ("up_1", "com_1", etc).
const tryLoadImage = (name: string) => {
  // Vite specific way to resolve assets or fail gracefully
  return new URL(`../assets/commercial/${name}`, import.meta.url).href;
};

const upcomingProjects = [
  {
    id: 1,
    name: "Anantaa Homes",
    place: "Ahmedabad",
    imageName: "up_1.jpg",
    fallbackName: "up_1.png",
    fallbackUrl: "https://placehold.co/600x800/1f2937/ffffff?text=Anantaa+Homes"
  },
  {
    id: 2,
    name: "Supan Residency",
    place: "Ahmedabad",
    imageName: "up_2.jpg",
    fallbackName: "up_2.png",
    fallbackUrl: "https://placehold.co/600x800/1f2937/ffffff?text=Supan+Residency"
  }
];

const completedProjects = [
  {
    id: 3,
    name: "Sangrilla Complex",
    place: "Ahmedabad",
    description: "A well-designed commercial complex offering prime shop and office spaces with high footfall.",
    imageName: "com_1.jpg",
    fallbackName: "com_1.png",
    fallbackUrl: "https://placehold.co/600x800/1f2937/ffffff?text=Sangrilla+Complex"
  },
  {
    id: 4,
    name: "Sangrilla Plaza",
    place: "Gandhinagar",
    description: "Modern commercial plaza ideal for retail, showrooms, and business establishments.",
    imageName: "com_2.jpg",
    fallbackName: "com_2.png",
    fallbackUrl: "https://placehold.co/600x800/1f2937/ffffff?text=Sangrilla+Plaza"
  },
  {
    id: 5,
    name: "Ananta Business Park",
    place: "Ahmedabad",
    description: "Premium business park developed for offices, corporate spaces, and professional services.",
    imageName: "com_3.jpg",
    fallbackName: "com_3.png",
    fallbackUrl: "https://placehold.co/600x800/1f2937/ffffff?text=Ananta+Business+Park"
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
        <span className="project-location">{project.place}</span>
        {project.description && <p>{project.description}</p>}
      </div>
    </div>
  );
};

const Commercial = () => {
  return (
    <div className="commercial-page">
      <div className="commercial-hero">
        <h1>Commercial Projects</h1>
        <p className="commercial-subtitle">
          SANGRILLA develops high-quality commercial and mixed-use properties designed for business success, excellent visibility, and strong investment returns.
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
        <h2 className="section-title">Completed Projects</h2>
        <div className="projects-grid">
          {completedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Commercial;
