// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { MapPin, ArrowRight, MessageCircle } from "lucide-react";
// import "../styles/completed-projects.css";
// import OptimizedImage from "../components/OptimizedImage";
// import plotsVillasImg from "../assets/residential/res-plotsandvillas/plotsandvillas2.jpg";

// const plotProjects = [
//   {
//     id: "sangrilla-meadows",
//     name: "Sangrilla Meadows",
//     tagline: "Residential Plots & Luxurious Villas",
//     location: "Dholera-SIR, Gujarat",
//     status: "under-construction",
//     badge: "Under Construction / Pre-Launch",
//     image: "/assets/meadows/up_res_1.jpg",
//     desc: "India's First Greenfield Smart City — Dholera SIR, just steps away. 145 thoughtfully planned villa plots from 100 to 300 Sq. Yards with modern infrastructure and immediate Dastavej.",
//     price: "Starting at ₹7,500 / Sq. Yd.",
//     link: "/project/sangrilla-meadows"
//   }
//   // {
//   //   id: "sangrilla-meadows-plan",
//   //   name: "Sangrilla Meadows Plan",
//   //   tagline: "Live Interactive Master Plan & Plot Demarcation",
//   //   location: "Dholera Smart City (SIR), Gujarat",
//   //   status: "active",
//   //   badge: "Interactive 3D Plotter",
//   //   image: "/assets/meadows/up_res_1.jpg",
//   //   desc: "Explore the Sangrilla Meadows Master Plan with high-resolution GIS vector plotting. Live availability across all 145 residential villa plots, Vastu facing, dimensions, and seamless site visit scheduling.",
//   //   price: "Live Availability & Demarcation",
//   //   link: "/sangrilla-meadows-plan",
//   //   isExternal: false
//   // },
//   // {
//   //   id: "sangrilla-plots-villas",
//   //   name: "Sangrilla Plots & Villas",
//   //   tagline: "Where Land Meets Luxury",
//   //   status: "completed",
//   //   badge: "Delivered Landmark",
//   //   image: plotsVillasImg,
//   //   desc: "Elegant premium residential plots and villas with a distinctive modern design — a perfect blend of open spaces and luxury community living.",
//   //   price: "Delivered & Occupied",
//   //   link: "/project/sangrilla-plots-villas",
//   //   isExternal: false
// ];

// const Plots = () => {
//   return (
//     <div className="completed-page">
//       <div className="completed-container">
//         <div className="completed-hero">
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             Residential Plots
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             Strategic land investments and master-planned residential plotting developments across Gujarat&apos;s prime growth corridors.
//           </motion.p>
//         </div>

//         <div className="completed-grid">
//           {plotProjects.map((project) => {
//             const cardContent = (
//               <motion.div
//                 layout
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="completed-card"
//               >
//                 <div className="card-image-box">
//                   <OptimizedImage
//                     src={project.image}
//                     alt={project.name}
//                     className="project-image"
//                   />
//                   <div className="card-overlay" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
//                     <span
//                       className="tag"
//                       style={{
//                         background: project.status === "under-construction" ? "#007ADD" : "#16a34a",
//                         color: "#fff",
//                         fontWeight: 700
//                       }}
//                     >
//                       {project.badge}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="card-content">
//                   <div className="card-header">
//                     <div>
//                       <h3>{project.name}</h3>
//                       <p className="card-type-minimal" style={{ color: "#007ADD", fontWeight: 600 }}>
//                         {project.tagline}
//                       </p>
//                     </div>
//                     {project.location && (
//                       <div className="location-tag">
//                         <span className="icon">
//                           <MapPin size={14} style={{ display: "inline", verticalAlign: "middle" }} />
//                         </span>
//                         {project.location}
//                       </div>
//                     )}
//                   </div>

//                   <p className="card-desc" style={{ fontSize: "0.92rem", color: "#4b5563", lineHeight: 1.6, margin: "14px 0" }}>
//                     {project.desc}
//                   </p>

//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       marginTop: "15px",
//                       paddingTop: "15px",
//                       borderTop: "1px solid #f0f0f0"
//                     }}
//                   >
//                     <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#111" }}>
//                       {project.price}
//                     </span>
//                     <span
//                       style={{
//                         color: "#007ADD",
//                         fontWeight: 600,
//                         fontSize: "0.85rem",
//                         display: "inline-flex",
//                         alignItems: "center",
//                         gap: "4px"
//                       }}
//                     >
//                       {/* {project.isExternal ? "Open 3D Plotter ↗" : "View Project"} <ArrowRight size={14} /> */}
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             );

//             // if (project.isExternal) {
//               return (
//                 <a
//                   key={project.id}
//                   href={project.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="completed-card-link"
//                 >
//                   {cardContent}
//                 </a>
//               );
//             }

//             return (
//               <Link key={project.id} to={project.link} className="completed-card-link">
//                 {cardContent}
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Plots;

import "../styles/completed-projects.css";

const Plots = () => (
	<main className="completed-page">
		<div className="completed-container">
			<div className="completed-hero">
				<h1>Residential Plots</h1>
				<p>Our residential plots listings are being updated.</p>
			</div>
		</div>
	</main>
);

export default Plots;
