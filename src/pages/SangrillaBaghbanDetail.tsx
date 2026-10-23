import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Droplets,
  Building2,
  Trees,
  Compass,
  Home,
  Dumbbell,
  Clock,
  Globe,
  Download,
  Layers,
  Sparkles,
  Award,
  Flame,
  Users,
  Gamepad2,
  Sun,
  Trophy,
  Maximize2,
  X,
  FileCheck,
  Check
} from "lucide-react";
import "../styles/sangrilla-meadows.css";
import "../styles/lifestyle.css";
import OptimizedImage from "../components/OptimizedImage";
import { downloadBrochure } from "../services/mongoService";
import {
  SAN_GRILLA_BAGHBAN_META,
  BAGHBAN_AMENITIES,
  BAGHBAN_LOCATION_ADVANTAGES,
  BAGHBAN_LAYOUT_STATS
} from "../data/sangrillaBaghbanData";

const baghbanGalleryImages = [
  { src: "/assets/baghban/sangrilla-baghban-img3.jpg" },
  { src: "/assets/baghban/sangrilla-baghban-img2.jpg" },
  { src: "/assets/baghban/sangrilla-baghban-img4.jpg" },
  { src: "/assets/baghban/sangrilla-baghban-img1.jpg" },
  { src: "/assets/baghban/sangrilla-baghban-img5.jpg" },
];

const baghbanHighlights = [
  {
    title: "96 Residential Plots",
    desc: "Well-planned plots with space for natural light, privacy, and flexible home design.",
    icon: <Compass size={20} />
  },
  {
    title: "Individual Plot Ownership",
    desc: "Individual plot demarcation with ownership documentation and registry support.",
    icon: <FileCheck size={20} />
  },
  {
    title: "Wide Internal Roads",
    desc: "9 m and 12 m wide internal roads for easy access.",
    icon: <Layers size={20} />
  },
  {
    title: "Porch Villa Option",
    desc: "Build your own villa or explore construction options with Sangrilla Group.",
    icon: <Home size={20} />
  },
  {
    title: "Gated Community",
    desc: "Boundary walls, a gated entrance, and CCTV security.",
    icon: <ShieldCheck size={20} />
  },
  {
    title: "Convenient Location",
    desc: "Located on Pipdi Fedra Road, Kamiyala, 700 m from Kasthbhanjan Hanumanji Mandir.",
    icon: <MapPin size={20} />
  }
];
const partnerList = [
  "Reliance", "Tata", "L&T", "Adani", "Airbus", "Boeing", "Lockheed Martin",
  "Zydus", "Arvind", "Mahindra Lifespaces", "Welspun", "Cadila", "SKF",
  "Suzlon", "Essar", "HCC"
];

const zonesList = [
  "High Access Corridor",
  "Residential Zone",
  "HAC Zone",
  "City Centre",
  "Sports & Recreation",
  "Resort & Tourism",
  "Knowledge & IT",
  "Industrial Zone",
  "Agriculture Zone"
];

const SangrillaBaghbanDetail: React.FC = () => {
  const photosScrollerRef = useRef<HTMLDivElement>(null);
  const isDraggingPhotos = useRef(false);
  const photosDragStartX = useRef(0);
  const photosScrollStart = useRef(0);

  const [activeTab, setActiveTab] = useState("overview");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const handlePhotosMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    isDraggingPhotos.current = true;
    if (photosScrollerRef.current) {
      photosDragStartX.current = event.pageX - photosScrollerRef.current.offsetLeft;
      photosScrollStart.current = photosScrollerRef.current.scrollLeft;
    }
  };

  const handlePhotosMouseUp = () => {
    isDraggingPhotos.current = false;
  };

  const handlePhotosMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingPhotos.current || !photosScrollerRef.current) return;
    event.preventDefault();
    const pointerX = event.pageX - photosScrollerRef.current.offsetLeft;
    const dragDistance = (pointerX - photosDragStartX.current) * 2;
    photosScrollerRef.current.scrollLeft = photosScrollStart.current - dragDistance;
  };

  const scrollTo = (id: string, tabName: string) => {
    setActiveTab(tabName);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleDownloadBrochure = () => {
    downloadBrochure("/sangrilla-baghban-brochure.pdf", "sangrilla-baghban-brochure.pdf");
  };

  return (
    <div className="meadows-page">
      <div className="meadows-container">

        {/* ============================================================
            1. PROJECT HEADER & HERO
            ============================================================ */}
        <section className="meadows-hero">
          {/* Breadcrumbs */}
          <div className="meadows-breadcrumb">
            <Link to="/">Home</Link>
            <span className="meadows-breadcrumb-sep">/</span>
            <Link to="/dholera">Dholera Developments</Link>
            <span className="meadows-breadcrumb-sep">/</span>
            <span className="meadows-breadcrumb-current">SANGRILA BAGHBAN</span>
          </div>

          {/* Badges */}
          <div className="meadows-badges-row">
            {/* <span className="meadows-badge meadows-badge-cat" style={{ background: "#dcfce7", color: "#15803d", borderColor: "#bbf7d0" }}>
              <span className="meadows-badge-pulse" style={{ background: "#15803d" }} />
              96 Planned Villa Plots
            </span> */}
            <span className="meadows-badge meadows-badge-cat">
              Residential Plots &amp; Porch Villas
            </span>
            <span className="meadows-badge meadows-badge-cat">
              <MapPin size={12} /> Kamiyala, Dholera-SIR, Gujarat
            </span>
          </div>

          {/* Title & Tagline */}
          <motion.h1
            className="meadows-hero-title"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            SANGRILA BAGHBAN
          </motion.h1>

          <motion.h2
            className="meadows-hero-tagline"
            style={{ color: "#15803d" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            A Rare Lifestyle Address in Dholera / Residential Plots &amp; Porch Villas
          </motion.h2>

          <motion.p
            className="meadows-hero-intro"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <strong>India&apos;s First Greenfield Smart City</strong> — Dholera SIR, just steps away. Strategically located at the gateway of Dholera SIR at Kamiyala.
          </motion.p>

          {/* Action Bar */}
          {/* Action Bar */}
          <div className="meadows-hero-cta-bar">
            <button
              type="button"
              onClick={handleDownloadBrochure}
              className="meadows-btn-primary"
              style={{ background: "#15803d" }}
            >
              <Download size={15} /> Download Brochure
            </button>

            {/* <button
              onClick={() => scrollTo("layout-section", "layout")}
              className="meadows-btn-secondary"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <Layers size={15} color="#15803d" />
              <span>Master Demarcation Plan</span>
            </button> */}
          </div>

          {/* Quick-Jump Navigation Bar */}
          <div className="meadows-quick-nav-bar">
            <button
              className={`meadows-quick-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => scrollTo("overview-section", "overview")}
            >
              Overview
            </button>
            <button
              className={`meadows-quick-nav-item ${activeTab === 'photos' ? 'active' : ''}`}
              onClick={() => scrollTo("photos-section", "photos")}
            >
              Photos
            </button>
            <button
              className={`meadows-quick-nav-item ${activeTab === 'location' ? 'active' : ''}`}
              onClick={() => scrollTo("location-section", "location")}
            >
              Location
            </button>
            <button
              className={`meadows-quick-nav-item ${activeTab === 'layout' ? 'active' : ''}`}
              onClick={() => scrollTo("layout-section", "layout")}
            >
              Layout &amp; Plots
            </button>
            <button
              className={`meadows-quick-nav-item ${activeTab === 'amenities' ? 'active' : ''}`}
              onClick={() => scrollTo("amenities-section", "amenities")}
            >
              Amenities
            </button>
            <button
              className={`meadows-quick-nav-item ${activeTab === 'dholera' ? 'active' : ''}`}
              onClick={() => scrollTo("dholera-section", "dholera")}
            >
              Why Dholera SIR
            </button>
          </div>

          {/* Hero Banner Slot */}
          <div className="meadows-banner-wrapper">
            <OptimizedImage
              src="/assets/baghban/sangrilla-baghban-coverpage.png"
              alt="Sangrilla Baghban Dholera SIR"
              className="meadows-banner-image"
            />
            <div className="meadows-banner-overlay">
              <div className="meadows-banner-caption">
                <h2 className="meadows-banner-project-title">SANGRILLA BAGHBAN</h2>
                <h3>Gateway to Dholera SIR</h3>
                <p>Kamiyala, Nr. Kasthbhanjan Hanuman Mandir, Dholera SIR, Gujarat</p>
              </div>
              <div className="meadows-banner-pills">
                <span className="meadows-banner-pill">96 Planned Plots</span>
                <span className="meadows-banner-pill">9m &amp; 12m Roads</span>
                <span className="meadows-banner-pill">Porch Villas</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. PROJECT OVERVIEW & HIGHLIGHTS
            ============================================================ */}
        <section className="meadows-section" id="overview-section">
          <div className="meadows-section-header">
            <span className="meadows-section-subtitle">Gateway to Growth</span>
            <h2 className="meadows-section-title">Project Overview</h2>
          </div>

          <div className="meadows-overview-grid">
            <div className="meadows-overview-text">
              <p>
                <strong>Sangrilla Baghban</strong> is a premium residential development strategically located at the gateway of Dholera SIR, India&apos;s first and fastest-emerging Greenfield Smart City. Offering well-planned residential plots and luxurious porch villas, the project is designed for those seeking a refined lifestyle combined with long-term investment potential.
              </p>
              <p>
                Thoughtfully planned with modern infrastructure, wide roads (9 mt &amp; 12 mt), landscaped surroundings, and a dedicated residential environment, Sangrilla Baghban delivers the perfect balance of comfort, family living, and secure community ownership. Individual plot ownership provides complete freedom to personalize your future dream villa.
              </p>
            </div>

            <div className="meadows-overview-meta-card">
              <h4>Project Essentials</h4>
              <div className="meadows-meta-list">
                <div className="meadows-meta-row">
                  <span className="meadows-meta-label">Project Type</span>
                  <span className="meadows-meta-val">Residential Plots &amp; Porch Villas</span>
                </div>
                <div className="meadows-meta-row">
                  <span className="meadows-meta-label">Location</span>
                  <span className="meadows-meta-val">Kamiyala, Dholera-SIR, Gujarat</span>
                </div>
                <div className="meadows-meta-row">
                  <span className="meadows-meta-label">Total Plots</span>
                  <span className="meadows-meta-val">96 Thoughtfully Planned Plots</span>
                </div>
                <div className="meadows-meta-row">
                  <span className="meadows-meta-label">Road Infrastructure</span>
                  <span className="meadows-meta-val">9 MT &amp; 12 MT Wide Internal Roads</span>
                </div>
                <div className="meadows-meta-row">
                  <span className="meadows-meta-label">Common Plot COP-1</span>
                  <span className="meadows-meta-val">715 Sq. Mtr. (Club &amp; Amenities)</span>
                </div>
                <div className="meadows-meta-row">
                  <span className="meadows-meta-label">Ownership</span>
                  <span className="meadows-meta-val">100% Individual Clear Title</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Highlights Callouts */}
          <div className="meadows-highlights-grid">
            {baghbanHighlights.map((item, idx) => (
              <div key={idx} className="meadows-highlight-card is-baghban">
                <div className="meadows-highlight-icon-wrap" style={{ color: "#15803d" }}>
                  {item.icon}
                </div>
                <div className="meadows-highlight-text-wrap">
                  <h4 className="meadows-highlight-title">{item.title}</h4>
                  <p className="meadows-highlight-desc">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            3. PHOTOS (HORIZONTAL SCROLLER)
            ============================================================ */}
        <section className="meadows-section meadows-photos-section" id="photos-section">
          <div className="meadows-section-header">
            <h2 className="meadows-section-title">PROJECT GALLERY &amp; PLANS</h2>
          </div>

          <div
            className="meadows-photos-scroller"
            ref={photosScrollerRef}
            onMouseDown={handlePhotosMouseDown}
            onMouseLeave={handlePhotosMouseUp}
            onMouseUp={handlePhotosMouseUp}
            onMouseMove={handlePhotosMouseMove}
          >
            {baghbanGalleryImages.map((img, idx) => (
              <div
                key={idx}
                className="meadows-photo-slide"
                onClick={() => setLightboxImage(img.src)}
                style={{ cursor: "zoom-in" }}
              >
                <OptimizedImage src={img.src} alt="Sangrilla Baghban Gallery" draggable={false} />
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            4. LOCATION DETAILS & CONNECTIVITY TABLE
            ============================================================ */}
        <section className="meadows-section" id="location-section">
          <div className="meadows-section-header">
            <span className="meadows-section-subtitle">Strategic Geography</span>
            <h2 className="meadows-section-title">Location &amp; Connectivity</h2>
          </div>

          {/* Single Unified Location Card */}
          <div className="meadows-unified-location-card">
            <div className="meadows-unified-site-id">
              <div className="meadows-unified-pin-ring" style={{ color: "#15803d" }}>
                <MapPin size={22} />
              </div>
              <div className="meadows-unified-site-id-content">
                <p className="meadows-unified-eyebrow">Official Site Identification</p>
                <h3 className="meadows-unified-title">Sangrilla&nbsp;Baghban</h3>
              </div>
            </div>

            <div className="meadows-unified-divider" />

            {/* Address Grid */}
            <div className="meadows-address-grid">
              <div className="meadows-address-item">
                <span className="meadows-address-label">Village / Location</span>
                <span className="meadows-address-val">Kamiyala</span>
              </div>
              <div className="meadows-address-item">
                <span className="meadows-address-label">Corridor</span>
                <span className="meadows-address-val">Pipdi Fedra Road</span>
              </div>
              <div className="meadows-address-item">
                <span className="meadows-address-label">Key Landmark</span>
                <span className="meadows-address-val">Nr. Kasthbhanjan Hanuman Mandir</span>
              </div>
              <div className="meadows-address-item">
                <span className="meadows-address-label">Region</span>
                <span className="meadows-address-val">Gateway of Dholera SIR, Gujarat</span>
              </div>
            </div>

            <div className="meadows-unified-divider" />

            <div className="meadows-unified-footer">
              <div className="meadows-unified-address-block">
                <p className="meadows-unified-address-label">Site Address</p>
                <p className="meadows-unified-address-text">
                  Sangrilla Baghban, Kamiyala,<br />
                  Nr. Kasthbhanjan Hanuman Temple, Pipdi Fedra Road,<br />
                  Dholera–SIR, Gujarat, India.
                </p>
                <p className="meadows-unified-coords">📍 22.2850° N, 72.1640° E</p>
              </div>

              <a
                href="https://maps.google.com/?q=Kamiyala+Dholera+SIR"
                target="_blank"
                rel="noopener noreferrer"
                className="meadows-unified-directions-btn"
                style={{ background: "#15803d" }}
              >
                <Globe size={17} />
                Get Directions
              </a>
            </div>
          </div>

          {/* Distances & Connectivity Table */}
          <div style={{ marginTop: "36px" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 16px", color: "#1d1d1f" }}>
              Key Connectivity &amp; Regional Distances
            </h3>

            <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "14px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "#f5f5f7", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                    <th style={{ padding: "14px 20px", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6e6e73" }}>
                      Landmark / Growth Node
                    </th>
                    <th style={{ padding: "14px 20px", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6e6e73" }}>
                      Distance
                    </th>
                    <th style={{ padding: "14px 20px", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6e6e73" }}>
                      Travel Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {BAGHBAN_LOCATION_ADVANTAGES.map((d, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                      <td style={{ padding: "14px 20px", fontSize: "0.88rem", fontWeight: 600, color: "#1d1d1f" }}>
                        {d.landmark}
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: "0.88rem", fontWeight: 700, color: "#15803d" }}>
                        {d.distance}
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: "0.82rem", color: "#6e6e73" }}>
                        {d.travelTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ============================================================
            5. LAYOUT & PLOT DETAILS
            ============================================================ */}
        <section className="meadows-section" id="layout-section">
          <div className="meadows-section-header">
            <span className="meadows-section-subtitle">Official Dholera SIR Demarcation</span>
            <h2 className="meadows-section-title">Layout &amp; Plot Details</h2>
            <p style={{ fontSize: "0.95rem", color: "#64748b", marginTop: "4px", maxWidth: "680px" }}>
              Thoughtfully planned residential development with clear demarcations, wide internal roads, and dedicated open leisure spaces across 96 clear-titled villa plots.
            </p>
          </div>

          <div className="meadows-stats-grid">
            <div className="meadows-stat-card">
              <div className="meadows-stat-num">96 Plots</div>
              <div className="meadows-stat-title">Total Planned Plots</div>
              <div className="meadows-stat-desc">Organized geometry &amp; solar access</div>
            </div>

            <div className="meadows-stat-card">
              <div className="meadows-stat-num">9 &amp; 12 MT</div>
              <div className="meadows-stat-title">Road Infrastructure</div>
              <div className="meadows-stat-desc">Wide asphalt internal roads</div>
            </div>

            <div className="meadows-stat-card">
              <div className="meadows-stat-num">715 sq. m</div>
              <div className="meadows-stat-title">Common Plot COP-1</div>
              <div className="meadows-stat-desc">Clubhouse, Pool &amp; Garden Lawn</div>
            </div>

            <div className="meadows-stat-card">
              <div className="meadows-stat-num">553 sq. m</div>
              <div className="meadows-stat-title">Common Plot COP-2</div>
              <div className="meadows-stat-desc">Central Green Landscaped Garden</div>
            </div>

            <div className="meadows-stat-card">
              <div className="meadows-stat-num">524 sq. m</div>
              <div className="meadows-stat-title">Common Plot COP-3</div>
              <div className="meadows-stat-desc">Recreation Arena &amp; Gazebo Park</div>
            </div>

            <div className="meadows-stat-card">
              <div className="meadows-stat-num">100% Clear</div>
              <div className="meadows-stat-title">Individual Ownership</div>
              <div className="meadows-stat-desc">Complete legal registry facilitation</div>
            </div>
          </div>

          {/* Master Plan Graphic Preview */}
          {/* <div
            style={{
              marginTop: "28px",
              background: "#0f172a",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.08)",
              cursor: "zoom-in",
              position: "relative"
            }}
            onClick={() => setLightboxImage("/assets/baghban/baghban-master-plan.jpg")}
          >
            <img
              src="/assets/baghban/baghban-master-plan.jpg"
              alt="Sangrilla Baghban Master Demarcation Plan"
              style={{ width: "100%", maxHeight: "560px", objectFit: "contain", display: "block", margin: "0 auto" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                right: "16px",
                background: "rgba(0,0,0,0.7)",
                color: "#ffffff",
                padding: "6px 14px",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <Maximize2 size={13} /> Click to Expand Demarcation Plan
            </div>
          </div> */}
        </section>

        {/* ============================================================
            6. AMENITIES SECTION
            ============================================================ */}
        <section className="meadows-section" id="amenities-section">
          <div className="meadows-section-header">
            <span className="meadows-section-subtitle">Comfort &amp; Security</span>
            <h2 className="meadows-section-title">Amenities &amp; Infrastructure</h2>
          </div>

          <div className="meadows-amenities-grid">
            {BAGHBAN_AMENITIES.map((item, idx) => (
              <div key={idx} className="meadows-amenity-box">
                <div className="meadows-amenity-icon" style={{ color: "#15803d" }}>
                  {item.iconName === "Compass" && <Compass size={18} />}
                  {item.iconName === "Layers" && <Layers size={18} />}
                  {item.iconName === "ShieldCheck" && <ShieldCheck size={18} />}
                  {item.iconName === "Award" && <Award size={18} />}
                  {item.iconName === "Trees" && <Trees size={18} />}
                  {item.iconName === "Sparkles" && <Sparkles size={18} />}
                  {item.iconName === "Home" && <Home size={18} />}
                  {item.iconName === "Building2" && <Building2 size={18} />}
                  {item.iconName === "Dumbbell" && <Dumbbell size={18} />}
                  {item.iconName === "Users" && <Users size={18} />}
                  {item.iconName === "Gamepad2" && <Gamepad2 size={18} />}
                  {item.iconName === "Sun" && <Sun size={18} />}
                  {item.iconName === "Trophy" && <Trophy size={18} />}
                  {item.iconName === "Droplets" && <Droplets size={18} />}
                  {item.iconName === "Flame" && <Flame size={18} />}
                  {item.iconName === "CheckCircle2" && <CheckCircle2 size={18} />}
                </div>
                <h4 className="meadows-amenity-name">{item.name}</h4>
              </div>
            ))}
          </div>

          {/* Footer tags */}
          <div className="meadows-tags-container">
            <div className="meadows-tag-item">
              <span className="meadows-tag-dot" style={{ background: "#15803d" }} /> Well Planned Layout
            </div>
            <div className="meadows-tag-item">
              <span className="meadows-tag-dot" style={{ background: "#15803d" }} /> Landscaped Green Spaces
            </div>
            <div className="meadows-tag-item">
              <span className="meadows-tag-dot" style={{ background: "#15803d" }} /> Secure &amp; Safe Environment
            </div>
            <div className="meadows-tag-item">
              <span className="meadows-tag-dot" style={{ background: "#15803d" }} /> Modern Infrastructure
            </div>
            <div className="meadows-tag-item">
              <span className="meadows-tag-dot" style={{ background: "#15803d" }} /> Perfect for Peaceful Living
            </div>
          </div>
        </section>

        {/* ============================================================
            7. WHY DHOLERA SIR
            ============================================================ */}
        <section className="meadows-section" id="dholera-section">
          <div className="meadows-section-header">
            <span className="meadows-section-subtitle">Growth Engine of Gujarat</span>
            <h2 className="meadows-section-title">Why Dholera SIR?</h2>
          </div>

          <div className="meadows-dholera-card">
            <div className="meadows-dholera-stats">
              <div className="meadows-dholera-stat-item">
                <div className="meadows-dholera-stat-num" style={{ color: "#15803d" }}>~920 Sq. Km</div>
                <div className="meadows-dholera-stat-label">
                  India&apos;s largest Greenfield Smart City (1.5x Mumbai, 1.8x Singapore)
                </div>
              </div>

              <div className="meadows-dholera-stat-item">
                <div className="meadows-dholera-stat-num" style={{ color: "#15803d" }}>1,426 Hectares</div>
                <div className="meadows-dholera-stat-label">
                  Dholera International Airport (passenger &amp; cargo hub, Phase-1 ready)
                </div>
              </div>

              <div className="meadows-dholera-stat-item">
                <div className="meadows-dholera-stat-num" style={{ color: "#15803d" }}>109 Km</div>
                <div className="meadows-dholera-stat-label">
                  Ahmedabad–Dholera Expressway cuts travel time to ~50 minutes
                </div>
              </div>

              <div className="meadows-dholera-stat-item">
                <div className="meadows-dholera-stat-num" style={{ color: "#15803d" }}>$14 Billion</div>
                <div className="meadows-dholera-stat-label">
                  Tata–Intel semiconductor alliance Megafab in Dholera for 300mm AI wafers
                </div>
              </div>
            </div>

            <div className="meadows-infra-grid">
              <div className="meadows-infra-card">
                <h4><Building2 size={16} color="#15803d" /> Major Connectivity Infrastructure</h4>
                <p>
                  Dedicated Freight Corridor (DFC), 250 m Expressway Corridor, Ahmedabad–Dholera Metro/Rapid Transit (proposed), and direct Deep-Sea Port access.
                </p>
              </div>

              <div className="meadows-infra-card">
                <h4><Flame size={16} color="#15803d" /> Mega Clean Energy Park</h4>
                <p>
                  5,000 MW Solar Park capacity across 11,000 hectares (including ReNew Power facility with 4.9 GW integrated manufacturing across 55 acres).
                </p>
              </div>
            </div>

            <div className="meadows-partners-section">
              <h5>Notable Investment Partners &amp; Industry Giants</h5>
              <div className="meadows-partners-chips">
                {partnerList.map((partner, idx) => (
                  <span key={idx} className="meadows-partner-chip">
                    {partner}
                  </span>
                ))}
              </div>
            </div>

            <div className="meadows-zones-wrap">
              <h5>9 Multipurpose Zones of Dholera SIR</h5>
              <div className="meadows-zones-grid">
                {zonesList.map((zone, idx) => (
                  <div key={idx} className="meadows-zone-pill">
                    {zone}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>



        {/* ============================================================
            9. MANDATORY DISCLAIMER
            ============================================================ */}
        <section className="meadows-disclaimer-section">
          <div className="meadows-disclaimer-box">
            <h6>Mandatory Disclaimer</h6>
            <p className="meadows-disclaimer-text">
              This page is for information and presentation purposes only and does not constitute a legal offer or agreement. Premium quality materials or equivalent branded products shall be used for construction. Electric power, gas, legal, and other government charges are payable separately. Maintenance deposit is payable separately. The developer reserves the right to change dimensions, design, and specifications, binding on all members. Stamp duty, registration fees, and statutory levies shall be borne by the purchaser as per prevailing law. This is not an authorized legal document.
            </p>
          </div>
        </section>

      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1200,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px"
          }}
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              color: "#fff",
              background: "rgba(255,255,255,0.15)",
              border: "none",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <X size={24} />
          </button>
          <img
            src={lightboxImage}
            alt="Enlarged View"
            style={{ maxWidth: "95vw", maxHeight: "92vh", objectFit: "contain", borderRadius: "8px" }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  );
};

export default SangrillaBaghbanDetail;
