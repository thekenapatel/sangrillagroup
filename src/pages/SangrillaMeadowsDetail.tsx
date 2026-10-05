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
  Phone,
  Mail,
  Globe,
  Download,
  Calendar,
  Send,
  Layers,
  Sparkles,
  Award,
  Flame,
  Check,
  ChevronRight,
  Camera,
  Star,
  Quote,
  TrendingUp,
  UserCheck
} from "lucide-react";
import "../styles/sangrilla-meadows.css";
import "../styles/lifestyle.css";
import BrochureModal from "../components/BrochureModal";
import OptimizedImage from "../components/OptimizedImage";

const galleryImages = [
  { src: "/assets/meadows/up_res_1.jpg" },
  { src: "/assets/meadows/up_res_2.jpg" },
  { src: "/assets/meadows/front-view.jpeg" },
  { src: "/assets/meadows/front-side-view.jpeg" },
  { src: "/assets/meadows/living-area.jpeg" },
  { src: "/assets/meadows/bedroom.jpeg" },
  { src: "/assets/meadows/kitchen.jpeg" },
  { src: "/assets/meadows/loft-bedroom.jpeg" },
  { src: "/assets/meadows/staircase-loft.jpeg" },
  { src: "/assets/meadows/toilet.jpeg" }
];

const connectivityData = [
  { landmark: "Dholera SIR", distance: "1 km", time: "–" },
  { landmark: "Dholera Riverfront", distance: "2 km / 9 km", time: "4–5 min / 13–18 min" },
  { landmark: "Proposed Railway Station", distance: "Walking distance", time: "5–10 min walk" },
  { landmark: "250 m / 10-Lane Road Corridor", distance: "250 m", time: "2–5 min" },
  { landmark: "Cher Village", distance: "2 km", time: "4–5 min" },
  { landmark: "Dholera Industrial Zone", distance: "10–15 km", time: "15–25 min" },
  { landmark: "Knowledge & IT Zone", distance: "8–10 km", time: "12–18 min" },
  { landmark: "ABCD Building (Admin HQ)", distance: "8 km", time: "12–15 min" },
  { landmark: "Dholera International Airport", distance: "14 km", time: "20–25 min" },
  { landmark: "Dholera City Centre (TP-1)", distance: "10 km", time: "15–20 min" },
  { landmark: "Proposed Metro/MRTS", distance: "5–10 km", time: "10–20 min" },
  { landmark: "Ahmedabad", distance: "75–85 km", time: "50–65 min" },
  { landmark: "Bhavnagar", distance: "55–65 km", time: "1 hr 15–30 min" },
  { landmark: "Ghogha Port", distance: "70 km", time: "1 hr 20–40 min" },
  { landmark: "Rajkot", distance: "175–180 km", time: "2 hr 45 min–3 hr 15 min" },
  { landmark: "Surat", distance: "260–275 km", time: "3 hr 30 min–4 hr" },
];

const amenitiesList = [
  { name: "Plot Demarcation", icon: <Compass size={18} /> },
  { name: "Internal Roads", icon: <Layers size={18} /> },
  { name: "Boundary Wall", icon: <ShieldCheck size={18} /> },
  { name: "CCTV Security", icon: <Award size={18} /> },
  { name: "Garden & Gazebo", icon: <Trees size={18} /> },
  { name: "Children's Park", icon: <Sparkles size={18} /> },
  { name: "Senior Citizen Park", icon: <Home size={18} /> },
  { name: "Gated Community", icon: <CheckCircle2 size={18} /> },
  { name: "Gym", icon: <Dumbbell size={18} /> },
  { name: "Club House", icon: <Building2 size={18} /> },
  { name: "Community Hall", icon: <Building2 size={18} /> },
  { name: "Street Lighting", icon: <Flame size={18} /> },
  { name: "24x7 Water Supply", icon: <Droplets size={18} /> },
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

const investorTestimonials = [
  {
    name: "Prashant K. Shah",
    role: "Senior Director, Tech Enterprise",
    location: "Ahmedabad / Singapore NRI",
    plot: "Plot #42 · 250 Sq. Yd.",
    badge: "Verified NRI Investor",
    rating: 5,
    avatar: "PS",
    accentColor: "#007ADD",
    highlight: "100% Transparent Documentation & Fast Registry",
    quote:
      "Finding clear title NA/NOC approved land in Dholera SIR with immediate registry was our top priority. Sangrilla Group made the entire transaction 100% transparent. The direct proximity to the 250m express corridor and upcoming international airport makes Meadows our highest-potential asset in Gujarat."
  },
  {
    name: "Dr. Hemali & Vikram Trivedi",
    role: "Healthcare Consultants",
    location: "Ahmedabad",
    plot: "2BHK Porch Villa",
    badge: "Villa Homeowner",
    rating: 5,
    avatar: "VT",
    accentColor: "#10b981",
    highlight: "Compounding Asset & Resort-Like Township",
    quote:
      "We were looking for a weekend villa getaway that doubles as a compounding generational asset. The planned clubhouse, landscaped parks, and wide tree-lined roads give Sangrilla Meadows a resort-like aura. It's rare to see a developer execute exactly according to the Dholera Smart City masterplan."
  },
  {
    name: "Maheshbhai V. Patel",
    role: "Industrialist & Angel Investor",
    location: "Vadodara",
    plot: "Multiple Plots · 600 Sq. Yd.",
    badge: "Multi-Plot Investor",
    rating: 5,
    avatar: "MP",
    accentColor: "#f59e0b",
    highlight: "High Ground Elevation & High Growth Corridor",
    quote:
      "With Tata's semiconductor plant and the Dholera Expressway driving rapid momentum, timelines are speeding up significantly. Sangrilla Meadows stands out because of its natural high elevation — zero waterlogging risks during monsoon. Highly recommended for strategic portfolio growth."
  },
  {
    name: "Kavita N. Mehta",
    role: "FinTech Strategy Lead",
    location: "Mumbai",
    plot: "Plot #88 · 150 Sq. Yd.",
    badge: "Verified First-Time Buyer",
    rating: 5,
    avatar: "KM",
    accentColor: "#8b5cf6",
    highlight: "Complete Remote Paperwork & Frictionless Process",
    quote:
      "As an outstation buyer from Mumbai, I was initially cautious about remote land purchases. The Sangrilla team provided complete paperwork verification in advance, coordinated our site visit, and facilitated legal registration without any friction. The customer support is exemplary."
  }
];

const SangrillaMeadowsDetail: React.FC = () => {
  const photosScrollerRef = useRef<HTMLDivElement>(null);
  const isDraggingPhotos = useRef(false);
  const photosDragStartX = useRef(0);
  const photosScrollStart = useRef(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "Residential Plots",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const text = encodeURIComponent(
      `Hello Sangrilla Group! I am interested in *Sangrilla Meadows (Dholera-SIR)*.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'N/A'}\nInterested in: ${formData.interest}\nMessage: ${formData.message || 'Please share more details.'}`
    );
    window.open(`https://wa.me/919737327999?text=${text}`, '_blank');
    setFormSubmitted(true);
  };

  const handleDownloadBrochure = () => {
    setIsBrochureModalOpen(true);
  };

  const handleBookVisit = () => {
    setFormData(prev => ({ ...prev, interest: "Site Visit Booking" }));
    scrollTo("contact-section", "contact");
  };

  return (
    <div className="meadows-page">
      <div className="meadows-container">

        {/* ============================================================
            1. PROJECT HEADER
            ============================================================ */}
        <section className="meadows-hero">
          {/* Breadcrumbs */}
          <div className="meadows-breadcrumb">
            <Link to="/">Home</Link>
            <span className="meadows-breadcrumb-sep">/</span>
            {/* <Link to="/under-construction-projects">Under Construction</Link> */}
            {/* <span className="meadows-breadcrumb-sep">/</span> */}
            <span className="meadows-breadcrumb-current" style={{ fontFamily: "'Philosopher', sans-serif" }}>SANGRILLA MEADOWS</span>
          </div>

          {/* Badges */}
          <div className="meadows-badges-row">
            {/* <span className="meadows-badge meadows-badge-uc">
              <span className="meadows-badge-pulse" />
              Under Construction
            </span> */}
            {/* <span className="meadows-badge meadows-badge-pre">
              Pre-Launch
            </span> */}
            <span className="meadows-badge meadows-badge-cat">
              Residential Plots &amp; Luxurious Villas
            </span>
            <span className="meadows-badge meadows-badge-cat">
              <MapPin size={12} /> Dholera-SIR, Gujarat
            </span>
          </div>

          {/* Title & Tagline */}
          <motion.h1
            className="meadows-hero-title"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Sangrilla Meadows
          </motion.h1>

          <motion.h2
            className="meadows-hero-tagline"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            Residential Plots &amp; Luxurious Villas
          </motion.h2>

          <motion.p
            className="meadows-hero-intro"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <strong>India&apos;s First Greenfield Smart City</strong> — Dholera SIR, just steps away.
          </motion.p>

          {/* Action Bar */}
          <div className="meadows-hero-cta-bar">
            <button onClick={() => scrollTo("contact-section", "contact")} className="meadows-btn-primary">
              <Send size={15} /> Enquire Now
            </button>
            <Link
              to="/project/sangrilla-meadows/master-plan"
              className="meadows-btn-ghost"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <Layers size={15} className="text-emerald-400" />
              <span>Interactive Master Plan</span>
            </Link>
            <button type="button" onClick={handleDownloadBrochure} className="meadows-btn-secondary">
              <Download size={15} /> Download Brochure
            </button>
            <button onClick={handleBookVisit} className="meadows-btn-ghost">
              <Calendar size={15} /> Book Site Visit
            </button>
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
            {/* <button
              className={`meadows-quick-nav-item ${activeTab === 'villas' ? 'active' : ''}`}
              onClick={() => scrollTo("villa-section", "villas")}
            >
              Villa Plans
            </button> */}
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
            {/* <button
              className={`meadows-quick-nav-item ${activeTab === 'pricing' ? 'active' : ''}`}
              onClick={() => scrollTo("pricing-section", "pricing")}
            >
              Pricing
            </button> */}
            <button
              className={`meadows-quick-nav-item ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => scrollTo("contact-section", "contact")}
            >
              Enquire
            </button>
            <button
              className={`meadows-quick-nav-item ${activeTab === 'investors' ? 'active' : ''}`}
              onClick={() => scrollTo("investors-section", "investors")}
            >
              Investors
            </button>
          </div>

          {/* Hero Banner Slot */}
          <div className="meadows-banner-wrapper">
            <OptimizedImage
              src="/assets/meadows/up_res_1.jpg"
              alt="Sangrilla Meadows Dholera SIR"
              className="meadows-banner-image"
            />
            <div className="meadows-banner-overlay">
              <div className="meadows-banner-caption">
                <h2 className="meadows-banner-project-title">SANGRILLA MEADOWS</h2>
                <h3>Gateway to Dholera SIR</h3>
                <p>Aakru Village, Dhandhuka, Ahmedabad District, Gujarat</p>
              </div>
              <div className="meadows-banner-pills">
                <span className="meadows-banner-pill">145 Planned Plots</span>
                <span className="meadows-banner-pill">From ₹7,500/Sq. Yd.</span>
                <span className="meadows-banner-pill">₹36L 2BHK Villas</span>
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
                <strong>Sangrilla Meadows</strong> is a premium residential development strategically located at the gateway of Dholera SIR, India&apos;s first and fastest-emerging Greenfield Smart City. It offers well-planned residential plots and luxurious villas, combining a refined lifestyle with long-term investment potential.
              </p>
              <p>
                The project features modern infrastructure, wide roads, landscaped surroundings, and seamless access to Dholera International Airport, expressway networks, industrial zones, and government-backed smart city initiatives.
              </p>
            </div>

            <div className="meadows-overview-meta-card">
              <h4>Project Essentials</h4>
              <div className="meadows-meta-list">
                <div className="meadows-meta-row">
                  <span className="meadows-meta-label">Project Type</span>
                  <span className="meadows-meta-val">Residential Plots &amp; Villas</span>
                </div>
                <div className="meadows-meta-row">
                  <span className="meadows-meta-label">Location</span>
                  <span className="meadows-meta-val">Aakru Village, Dholera-SIR, Gujarat</span>
                </div>
                {/* <div className="meadows-meta-row">
                  <span className="meadows-meta-label">Status</span>
                  <span className="meadows-meta-val">Under Construction / Pre-Launch</span>
                </div> */}
                <div className="meadows-meta-row">
                  <span className="meadows-meta-label">Total</span>
                  <span className="meadows-meta-val">99 Plots | 46 Villas</span>
                </div>
                <div className="meadows-meta-row">
                  <span className="meadows-meta-label">Plot Sizes</span>
                  <span className="meadows-meta-val">120 to 350 Sq. Yards</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Highlights Callouts */}
          <div className="meadows-highlights-grid">
            <div className="meadows-highlight-card">
              <div className="meadows-highlight-icon-wrap">
                <ShieldCheck size={20} />
              </div>
              <h4 className="meadows-highlight-title">NA/NOC Title Clear</h4>
            </div>

            <div className="meadows-highlight-card">
              <div className="meadows-highlight-icon-wrap">
                <CheckCircle2 size={20} />
              </div>
              <h4 className="meadows-highlight-title">Government Approved</h4>
            </div>

            <div className="meadows-highlight-card">
              <div className="meadows-highlight-icon-wrap">
                <FileText size={20} />
              </div>
              <h4 className="meadows-highlight-title">Plan Pass Residential Project</h4>
            </div>

            <div className="meadows-highlight-card">
              <div className="meadows-highlight-icon-wrap">
                <Award size={20} />
              </div>
              <h4 className="meadows-highlight-title">Immediate Dastavej Available<br />(Registry)</h4>
            </div>

            <div className="meadows-highlight-card">
              <div className="meadows-highlight-icon-wrap">
                <Droplets size={20} />
              </div>
              <h4 className="meadows-highlight-title">Rare Waterlogging-Free Location</h4>
            </div>
          </div>
        </section>

        {/* ============================================================
            PHOTOS (HORIZONTAL SCROLLER)
            ============================================================ */}
        <section className="meadows-section" id="photos-section">
          <div className="meadows-section-header" style={{ marginBottom: "20px" }}>
            <h2 className="meadows-section-title">PHOTOS</h2>
          </div>

          <div
            className="lifestyle-scroll-container"
            ref={photosScrollerRef}
            onMouseDown={handlePhotosMouseDown}
            onMouseLeave={handlePhotosMouseUp}
            onMouseUp={handlePhotosMouseUp}
            onMouseMove={handlePhotosMouseMove}
          >
            {galleryImages.map((img, idx) => (
              <div key={idx} className="lifestyle-card">
                <OptimizedImage src={img.src} alt="" />
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            3. LOCATION DETAILS & CONNECTIVITY TABLE
            ============================================================ */}
        <section className="meadows-section" id="location-section">
          <div className="meadows-section-header">
            <span className="meadows-section-subtitle">Strategic Geography</span>
            <h2 className="meadows-section-title">Location &amp; Connectivity</h2>
          </div>

          {/* ── Single Unified Location Card ── */}
          <div className="meadows-unified-location-card">

            {/* Top: Site Identification */}
            <div className="meadows-unified-site-id">
              <div className="meadows-unified-pin-ring">
                <MapPin size={22} />
              </div>
              <div className="meadows-unified-site-id-content">
                <p className="meadows-unified-eyebrow">Official Site Identification</p>
                <h3 className="meadows-unified-title">Sangrilla&nbsp;Meadows</h3>
              </div>
            </div>

            <div className="meadows-unified-divider" />

            {/* Mid: Address Grid */}
            <div className="meadows-address-grid">
              <div className="meadows-address-item">
                <span className="meadows-address-label">Village</span>
                <span className="meadows-address-val">Aakru</span>
              </div>
              <div className="meadows-address-item">
                <span className="meadows-address-label">Taluka</span>
                <span className="meadows-address-val">Dhandhuka</span>
              </div>
              <div className="meadows-address-item">
                <span className="meadows-address-label">District</span>
                <span className="meadows-address-val">Ahmedabad, Gujarat</span>
              </div>
              <div className="meadows-address-item">
                <span className="meadows-address-label">Survey No.</span>
                <span className="meadows-address-val">New – 642 | Old – 420/4/12</span>
              </div>
            </div>

            <div className="meadows-unified-divider" />

            {/* Bottom: Full Address + Get Directions */}
            <div className="meadows-unified-footer">
              <div className="meadows-unified-address-block">
                <p className="meadows-unified-address-label">Full Address</p>
                <p className="meadows-unified-address-text">
                  Sangrilla Meadows, Aakru Village,<br />
                  Dholera–SIR, Dhandhuka,<br />
                  Ahmedabad District, Gujarat — 382 460
                </p>
                <p className="meadows-unified-coords">📍 22.2529° N, 72.1851° E</p>
              </div>
              <a
                href="https://maps.app.goo.gl/rPaedTaKUW62Se6V9"
                target="_blank"
                rel="noopener noreferrer"
                className="meadows-unified-directions-btn"
              >
                <Globe size={17} />
                Get Directions
              </a>
            </div>

          </div>
        </section>

        {/* ============================================================
            INTERACTIVE PLOTTER CALLOUT (BELOW LOCATION SECTION)
            ============================================================ */}
        <section className="meadows-section" style={{ paddingTop: "0.5rem", paddingBottom: "1.5rem" }}>
          <div
            className="meadows-plotter-feature-banner"
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "1.5rem",
              background: "linear-gradient(135deg, #060b14 0%, #0a1324 50%, #030712 100%)",
              border: "1px solid rgba(212, 175, 55, 0.35)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(212, 175, 55, 0.12)",
              padding: "2.5rem 2.25rem",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem"
            }}
          >
            {/* Ambient Background Glow Effect */}
            <div
              style={{
                position: "absolute",
                top: "-60px",
                right: "10%",
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)",
                filter: "blur(40px)",
                pointerEvents: "none"
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-60px",
                left: "5%",
                width: "260px",
                height: "260px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)",
                filter: "blur(40px)",
                pointerEvents: "none"
              }}
            />

            <div style={{ maxWidth: "680px", position: "relative", zIndex: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "0.3rem 0.85rem",
                    borderRadius: "9999px",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    background: "rgba(212, 175, 55, 0.12)",
                    color: "#f5c542",
                    border: "1px solid rgba(212, 175, 55, 0.3)"
                  }}
                >
                  <Sparkles size={12} className="text-amber-400" />
                  <span>Digital Master Plan</span>
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#94a3b8"
                  }}
                >
                  <ShieldCheck size={13} className="text-emerald-400" />
                  145 Demarcated Plots &amp; Villas
                </span>
              </div>

              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  margin: "0 0 0.75rem 0",
                  lineHeight: 1.25
                }}
              >
                Experience the Sangrilla Meadows Interactive Plotter
              </h3>

              <p
                style={{
                  fontSize: "0.95rem",
                  color: "#cbd5e1",
                  lineHeight: 1.65,
                  margin: 0
                }}
              >
                Immerse yourself in our interactive digital master plan. Smoothly zoom and pan through residential plots and luxury villas, inspect real-time availability, vastu alignments, dimensions, and architectural floor plans in Aakru Village, Dholera SIR.
              </p>
            </div>

            <div style={{ position: "relative", zIndex: 2 }}>
              <a
                href="/project/sangrilla-meadows/master-plan"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    `${window.location.origin}/project/sangrilla-meadows/master-plan`,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "1.1rem 2rem",
                  borderRadius: "1rem",
                  background: "linear-gradient(135deg, #d4af37 0%, #f59e0b 50%, #b8860b 100%)",
                  color: "#0a0a0a",
                  fontWeight: 800,
                  fontSize: "1rem",
                  letterSpacing: "0.02em",
                  textDecoration: "none",
                  boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.4), 0 0 15px rgba(212, 175, 55, 0.3)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 15px 30px -5px rgba(245, 158, 11, 0.5), 0 0 25px rgba(212, 175, 55, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(245, 158, 11, 0.4), 0 0 15px rgba(212, 175, 55, 0.3)";
                }}
              >
                <span>Explore Sangrilla Meadows Plotter →</span>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================
            4. LAYOUT & PLOT DETAILS
            ============================================================ */}
        <section className="meadows-section" id="layout-section">
          <div className="meadows-section-header">
            <span className="meadows-section-subtitle">Official Dholera SIR Demarcation</span>
            <h2 className="meadows-section-title">Layout &amp; Plot Details</h2>
            <p style={{ fontSize: "0.95rem", color: "#64748b", marginTop: "4px", maxWidth: "680px" }}>
              Thoughtfully planned residential development with clear demarcations, wide internal roads, and dedicated open leisure spaces across 145 clear-titled villa plots.
            </p>
          </div>

          <div className="meadows-stats-grid">
            <div className="meadows-stat-card">
              <div className="meadows-stat-num">29,471.15</div>
              <div className="meadows-stat-title">Total Plot Area (Sq. Yd.)</div>
              <div className="meadows-stat-desc">Entire gated development perimeter</div>
            </div>

            <div className="meadows-stat-card">
              <div className="meadows-stat-num">11,558.96</div>
              <div className="meadows-stat-title">Common Plot Area (Sq. Yd.)</div>
              <div className="meadows-stat-desc">Dedicated green &amp; open amenities</div>
            </div>

            <div className="meadows-stat-card">
              <div className="meadows-stat-num">17,912.19</div>
              <div className="meadows-stat-title">Carpet / Saleable Area</div>
              <div className="meadows-stat-desc">Sq. Yds of clear-titled villa land</div>
            </div>

            <div className="meadows-stat-card">
              <div className="meadows-stat-num">145</div>
              <div className="meadows-stat-title">Number of Plots</div>
              <div className="meadows-stat-desc">Thoughtfully planned villa plots</div>
            </div>

            <div className="meadows-stat-card">
              <div className="meadows-stat-num">120–350</div>
              <div className="meadows-stat-title">Plot Sizes Available</div>
              <div className="meadows-stat-desc">Sq. Yards options for private villas</div>
            </div>

            <div className="meadows-stat-card">
              <div className="meadows-stat-num">Lifestyle</div>
              <div className="meadows-stat-title">Leisure spaces & Amenities</div>
              <div className="meadows-stat-desc">Total 7 spaces</div>
            </div>

            <div className="meadows-stat-card">
              <div className="meadows-stat-num">Wide Road Network</div>
              <div className="meadows-stat-title">Spacious Internal Infrastructure</div>
              <div className="meadows-stat-desc">7.5 m Internal Roads | 12 m Main Spine Road</div>
            </div>

          </div>

          {/* Interactive Master Plan & Plotter Callout */}
          <div
            style={{
              marginTop: "2rem",
              padding: "1.75rem 2rem",
              borderRadius: "1.25rem",
              background: "linear-gradient(135deg, #09121f 0%, #030712 100%)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.5rem"
            }}
          >
            <div style={{ maxWidth: "600px" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "0.2rem 0.65rem",
                  borderRadius: "9999px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#34d399",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  marginBottom: "0.5rem"
                }}
              >
                Official Master Plan &amp; Plotter
              </span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", margin: "0.25rem 0" }}>
                Explore Sangrilla Meadows Interactive 3D Plotter
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>
                Inspect all 145 villa plots with live availability, dimensions, Vastu alignment, and Satellite GIS demarcation in Aakru Village, Dholera SIR.
              </p>
            </div>
            <a
              href="/project/sangrilla-meadows/master-plan"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  `${window.location.origin}/project/sangrilla-meadows/master-plan`,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "0.85rem 1.5rem",
                borderRadius: "0.85rem",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "#022c22",
                fontWeight: 800,
                fontSize: "0.875rem",
                textDecoration: "none",
                boxShadow: "0 10px 15px -3px rgba(16, 185, 129, 0.3)",
                transition: "all 0.2s ease",
                cursor: "pointer"
              }}
            >
              <Layers size={16} />
              <span>Launch Interactive Master Plan ↗</span>
            </a>
          </div>

          {/* Layout Note Callout */}
          {/* <div className="meadows-layout-note-card">
            <h4>Planned For Flexibility &amp; Generational Wealth</h4>
            <p className="meadows-layout-note-quote">
              &ldquo;Organized plot arrangement. Freedom to personalize your future villa. Ideal for family living and long-term ownership. A future-ready residential investment.&rdquo;
            </p>
            <div className="meadows-ownership-badge">
              <Check size={14} /> Freedom to build your own villa later (construction at additional cost)
            </div>
          </div> */}
        </section>

        {/* ============================================================
            5. SAMPLE VILLA / UNIT SPECIFICATIONS
            ============================================================ */}
        {/* <section className="meadows-section" id="villa-section">
          <div className="meadows-section-header">
            <span className="meadows-section-subtitle">Architectural Vision</span>
            <h2 className="meadows-section-title">Sample Villa Specifications</h2>
          </div>

          <div className="meadows-villa-grid"> */}
            {/* Card 1: Sample Villa Plan */}
            {/* <div className="meadows-villa-card">
              <div>
                <div className="meadows-villa-header">
                  <h3>Sample Villa Plan</h3>
                  <p className="meadows-villa-subtitle">Smartly engineered porch villa concept</p>
                </div>

                <div className="meadows-villa-specs-list">
                  <div className="meadows-villa-spec-row">
                    <span className="meadows-spec-title">Plot Size</span>
                    <span className="meadows-spec-value">15.00 M x 6.00 M (49&apos;-2&quot; x 19&apos;-8&quot;)</span>
                  </div>

                  <div className="meadows-villa-spec-row">
                    <span className="meadows-spec-title">Ground Floor Built-up</span>
                    <span className="meadows-spec-value">410 Sq. Ft.</span>
                  </div>

                  <div className="meadows-villa-spec-row">
                    <span className="meadows-spec-title">Ground Floor Layout</span>
                    <span className="meadows-spec-value">Living/Dining, Kitchen, 1 Bed, Toilet, Sit-out, Parking, Garden</span>
                  </div>

                  <div className="meadows-villa-spec-row">
                    <span className="meadows-spec-title">Loft Floor Built-up</span>
                    <span className="meadows-spec-value">150 Sq. Ft. (Loft Bedroom)</span>
                  </div>

                  <div className="meadows-villa-spec-row">
                    <span className="meadows-spec-title">Total Built-up Area</span>
                    <span className="meadows-spec-value">560 Sq. Ft. (62 Sq. Yards)</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "14px" }}>
                <button onClick={() => scrollTo("contact-section", "contact")} className="meadows-btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
                  Request Architectural Plan
                </button>
              </div>
            </div> */}

            {/* Card 2: Optional 2BHK Weekend Villa Package */}
            {/* <div className="meadows-villa-card featured">
              <span className="meadows-villa-card-badge">Turnkey Package</span>
              <div>
                <div className="meadows-villa-header">
                  <h3>Optional 2BHK Weekend Villa Package</h3>
                  <p className="meadows-villa-subtitle">Fully furnished, move-in ready vacation villa</p>
                </div>

                <div className="meadows-villa-specs-list">
                  <div className="meadows-villa-spec-row">
                    <span className="meadows-spec-title">Plot Area</span>
                    <span className="meadows-spec-value">177 Sq. Yards</span>
                  </div>

                  <div className="meadows-villa-spec-row">
                    <span className="meadows-spec-title">Construction Area</span>
                    <span className="meadows-spec-value">110 Sq. Yards</span>
                  </div>

                  <div className="meadows-villa-spec-row">
                    <span className="meadows-spec-title">Furnishing</span>
                    <span className="meadows-spec-value">Fully Furnished, Move-in Ready</span>
                  </div>

                  <div className="meadows-villa-spec-row">
                    <span className="meadows-spec-title">Package Price</span>
                    <span className="meadows-spec-value" style={{ color: "#007ADD", fontSize: "1.05rem" }}>₹36 Lakhs</span>
                  </div>
                </div> */}

                {/* Guaranteed Rental Feature */}
                {/* <div className="meadows-villa-perks">
                  <div className="meadows-villa-perks-title">Guaranteed Rental Income</div>
                  <div className="meadows-villa-perks-desc">₹36,000 / month for up to 36 months</div>
                  <span className="meadows-rental-note">(Subject to formal agreement &amp; terms)</span>
                </div>
              </div>

              <div>
                <button onClick={() => scrollTo("contact-section", "contact")} className="meadows-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  Enquire for 2BHK Villa
                </button>
              </div>
            </div>
          </div>
        </section> */}

        {/* ============================================================
            6. AMENITIES SECTION
            ============================================================ */}
        <section className="meadows-section" id="amenities-section">
          <div className="meadows-section-header">
            <span className="meadows-section-subtitle">Comfort &amp; Security</span>
            <h2 className="meadows-section-title">Amenities &amp; Infrastructure</h2>
          </div>

          <div className="meadows-amenities-grid">
            {amenitiesList.map((item, idx) => (
              <div key={idx} className="meadows-amenity-box">
                <div className="meadows-amenity-icon">
                  {item.icon}
                </div>
                <h4 className="meadows-amenity-name">{item.name}</h4>
              </div>
            ))}
          </div>

          {/* Footer tags */}
          <div className="meadows-tags-container">
            <div className="meadows-tag-item">
              <span className="meadows-tag-dot" /> Well Planned Layout
            </div>
            <div className="meadows-tag-item">
              <span className="meadows-tag-dot" /> Landscaped Green Spaces
            </div>
            <div className="meadows-tag-item">
              <span className="meadows-tag-dot" /> Secure &amp; Safe Environment
            </div>
            <div className="meadows-tag-item">
              <span className="meadows-tag-dot" /> Modern Infrastructure
            </div>
            <div className="meadows-tag-item">
              <span className="meadows-tag-dot" /> Perfect for Peaceful Living
            </div>
          </div>
        </section>

        {/* ============================================================
            7. WHY DHOLERA SIR — CONTEXT SECTION
            ============================================================ */}
        <section className="meadows-section" id="dholera-section">
          <div className="meadows-section-header">
            <span className="meadows-section-subtitle">Growth Engine of Gujarat</span>
            <h2 className="meadows-section-title">Why Dholera SIR?</h2>
          </div>

          <div className="meadows-dholera-card">
            {/* Top Macro Stats */}
            <div className="meadows-dholera-stats">
              <div className="meadows-dholera-stat-item">
                <div className="meadows-dholera-stat-num">~920 Sq. Km</div>
                <div className="meadows-dholera-stat-label">
                  India&apos;s largest Greenfield Smart City (1.5x Mumbai, 1.8x Singapore)
                </div>
              </div>

              <div className="meadows-dholera-stat-item">
                <div className="meadows-dholera-stat-num">1,426 Hectares</div>
                <div className="meadows-dholera-stat-label">
                  Dholera International Airport (passenger &amp; cargo hub, Phase-1 ready)
                </div>
              </div>

              <div className="meadows-dholera-stat-item">
                <div className="meadows-dholera-stat-num">109 Km</div>
                <div className="meadows-dholera-stat-label">
                  Ahmedabad–Dholera Expressway cuts travel time to ~50 minutes
                </div>
              </div>

              <div className="meadows-dholera-stat-item">
                <div className="meadows-dholera-stat-num">$14 Billion</div>
                <div className="meadows-dholera-stat-label">
                  Tata–Intel semiconductor alliance Megafab in Dholera for 300mm AI wafers
                </div>
              </div>
            </div>

            {/* Key Infra Pillars */}
            <div className="meadows-infra-grid">
              <div className="meadows-infra-card">
                <h4><Building2 size={16} color="#007ADD" /> Major Connectivity Infrastructure</h4>
                <p>
                  Dedicated Freight Corridor (DFC), 250 m Expressway Corridor, Ahmedabad–Dholera Metro/Rapid Transit (proposed), and direct Deep-Sea Port access.
                </p>
              </div>

              <div className="meadows-infra-card">
                <h4><Flame size={16} color="#007ADD" /> Mega Clean Energy Park</h4>
                <p>
                  5,000 MW Solar Park capacity across 11,000 hectares (including ReNew Power facility with 4.9 GW integrated manufacturing across 55 acres).
                </p>
              </div>
            </div>

            {/* Notable Investment Partners */}
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

            {/* 9 Multipurpose Zones */}
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
            8. PRICING SECTION
            ============================================================ */}
        {/* <section className="meadows-section" id="pricing-section">
          <div className="meadows-section-header">
            <span className="meadows-section-subtitle">Investment Value</span>
            <h2 className="meadows-section-title">Transparent Pricing</h2>
          </div>

          <div className="meadows-pricing-grid"> */}
            {/* Plot Pricing */}
            {/* <div className="meadows-pricing-card">
              <div>
                <div className="meadows-pricing-tag">Residential Plots</div>
                <h3 className="meadows-pricing-title">Villa Plots</h3>

                <div className="meadows-price-figure">
                  <div className="meadows-price-prefix">Starting from</div>
                  <div className="meadows-price-amount">
                    ₹7,500 <span className="meadows-price-unit">/ Sq. Yard</span>
                  </div>
                </div>

                <ul className="meadows-pricing-points">
                  <li><Check size={15} /> Clear NA/NOC Freehold Title</li>
                  <li><Check size={15} /> Plot sizes from 100 to 300 Sq. Yards</li>
                  <li><Check size={15} /> Immediate Dastavej (Registry)</li>
                  <li><Check size={15} /> Freedom to design &amp; build custom villa</li>
                  <li><Check size={15} /> High appreciation corridor near Dholera SIR</li>
                </ul>
              </div>

              <div>
                <button onClick={() => scrollTo("contact-section", "contact")} className="meadows-btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
                  Enquire for Plot Pricing
                </button>
              </div>
            </div> */}

            {/* Weekend Villa Pricing */}
            {/* <div className="meadows-pricing-card premium">
              <div>
                <div className="meadows-pricing-tag">Turnkey Package</div>
                <h3 className="meadows-pricing-title">2BHK Weekend Villa</h3>

                <div className="meadows-price-figure">
                  <div className="meadows-price-prefix">All-Inclusive Package Price</div>
                  <div className="meadows-price-amount">
                    ₹36 Lakhs
                  </div>
                </div>

                <ul className="meadows-pricing-points">
                  <li><Check size={15} /> 177 Sq. Yards Plot Area</li>
                  <li><Check size={15} /> 110 Sq. Yards Construction Area</li>
                  <li><Check size={15} /> Fully Furnished &amp; Move-in Ready</li>
                  <li><Check size={15} /> Guaranteed Rental: ₹36,000/month for up to 36 months</li>
                  <li><Check size={15} /> Private Garden &amp; Sit-out areas</li>
                </ul>
              </div>

              <div>
                <button onClick={() => scrollTo("contact-section", "contact")} className="meadows-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  Enquire for 2BHK Villa
                </button>
              </div>
            </div>
          </div>

          <div className="meadows-pricing-disclaimer">
            <strong>Pricing Notice:</strong> Prices indicated are starting rates and subject to change per developer policy and plot availability. Construction charges for personalized plots, statutory taxes, deposits, and registration charges are extra as applicable.
          </div>
        </section> */}

        {/* ============================================================
            9. CONTACT / CTA SECTION
            ============================================================ */}
        <section className="meadows-section" id="contact-section">
          <div className="meadows-contact-grid">
            <div className="meadows-contact-info">
              <span className="meadows-section-subtitle">Get in Touch</span>
              <h3>Connect With Sangrilla Group</h3>
              <p>
                Interested in owning a plot or luxury villa at Sangrilla Meadows? Connect with our dedicated sales and investment advisory team today.
              </p>

              <div className="meadows-contact-channels">
                <div className="meadows-channel-row">
                  <div className="meadows-channel-icon">
                    <Phone size={16} />
                  </div>
                  <div className="meadows-channel-text">
                    <h5>Call Us</h5>
                    <a href="tel:+919737327999">+91 973 7327 999</a> / <a href="tel:+919737328999">+91 973 7328 999</a>
                  </div>
                </div>

                <div className="meadows-channel-row">
                  <div className="meadows-channel-icon">
                    <Mail size={16} />
                  </div>
                  <div className="meadows-channel-text">
                    <h5>Email Support</h5>
                    <a href="mailto:sangrillagroup@gmail.com">sangrillagroup@gmail.com</a>
                  </div>
                </div>

                <div className="meadows-channel-row">
                  <div className="meadows-channel-icon">
                    <Globe size={16} />
                  </div>
                  <div className="meadows-channel-text">
                    <h5>Official Website</h5>
                    <a href="https://www.sangrillagroup.com" target="_blank" rel="noreferrer">www.sangrillagroup.com</a>
                  </div>
                </div>

                <div className="meadows-channel-row">
                  <div className="meadows-channel-icon">
                    <MapPin size={16} />
                  </div>
                  <div className="meadows-channel-text">
                    <h5>Sales Office</h5>
                    <p>A/507, Money Plant High Street, Jagatpur, S.G. Highway, Gota, Ahmedabad – 382470, Gujarat, India.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Form */}
            <div className="meadows-form-wrap">
              <h4>Request Callback</h4>
              <p>Fill out the form below to receive detailed cost sheet and brochure via WhatsApp.</p>

              {formSubmitted ? (
                <div style={{ padding: "24px", background: "#f0fdf4", borderRadius: "12px", textAlign: "center", border: "1px solid #bbf7d0" }}>
                  <CheckCircle2 size={36} color="#16a34a" style={{ margin: "0 auto 8px" }} />
                  <h4 style={{ color: "#166534", margin: "0 0 4px", fontSize: "0.98rem" }}>Thank You!</h4>
                  <p style={{ color: "#15803d", margin: 0, fontSize: "0.82rem" }}>
                    Your inquiry has been submitted. Our executive will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form className="meadows-form" onSubmit={handleSubmit}>
                  <div className="meadows-input-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dev Patel"
                      className="meadows-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="meadows-input-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 95270 27222"
                      className="meadows-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="meadows-input-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      className="meadows-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="meadows-input-group">
                    <label>I Am Interested In</label>
                    <select
                      className="meadows-select"
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    >
                      <option value="Residential Plots">Residential Plots (120–350 Sq. Yd.)</option>
                      <option value="2BHK Weekend Villa">2BHK Weekend Villa (₹36 Lakhs)</option>
                      <option value="Site Visit Booking">Book Complimentary Site Visit</option>
                      <option value="General Information">General Investment Inquiry</option>
                    </select>
                  </div>

                  <div className="meadows-input-group">
                    <label>Questions / Message</label>
                    <textarea
                      placeholder="Any specific requirement or scheduled date for visit..."
                      className="meadows-textarea"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="meadows-form-submit">
                    Send Inquiry on WhatsApp →
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================
            10. WHAT OUR INVESTORS SAY
            ============================================================ */}
        <section className="meadows-section" id="investors-section">
          <div className="meadows-section-header">
            <span className="meadows-section-subtitle">Real Buyer Experiences</span>
            <h2 className="meadows-section-title">WHAT OUR INVESTORS SAY</h2>
            <p className="meadows-investors-intro">
              Hear firsthand from verified plot buyers, NRI investors, and villa owners who have chosen Sangrilla Meadows as their gateway to Dholera SIR.
            </p>
          </div>

          {/* Trust Metrics Bar */}
          <div className="meadows-investors-stats-bar">
            <div className="meadows-investor-stat-item">
              <div className="meadows-investor-stat-icon">
                <Star size={20} fill="#007ADD" color="#007ADD" />
              </div>
              <div>
                <div className="meadows-investor-stat-val">4.9 / 5.0</div>
                <div className="meadows-investor-stat-label">Verified Investor Rating</div>
              </div>
            </div>

            <div className="meadows-investor-stat-item">
              <div className="meadows-investor-stat-icon">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div className="meadows-investor-stat-val">100% Title Clear</div>
                <div className="meadows-investor-stat-label">Immediate Dastavej / Registry</div>
              </div>
            </div>

            <div className="meadows-investor-stat-item">
              <div className="meadows-investor-stat-icon">
                <TrendingUp size={20} />
              </div>
              <div>
                <div className="meadows-investor-stat-val">₹7,500/Sq. Yd.</div>
                <div className="meadows-investor-stat-label">Starting Pre-Launch Advantage</div>
              </div>
            </div>

            <div className="meadows-investor-stat-item">
              <div className="meadows-investor-stat-icon">
                <UserCheck size={20} />
              </div>
              <div>
                <div className="meadows-investor-stat-val">500+ Buyers</div>
                <div className="meadows-investor-stat-label">Across Sangrilla Developments</div>
              </div>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="meadows-investors-grid">
            {investorTestimonials.map((t, idx) => (
              <div key={idx} className="meadows-investor-card">
                <div>
                  <div className="meadows-investor-top">
                    <div className="meadows-investor-stars">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <span className="meadows-investor-badge">
                      <CheckCircle2 size={12} /> {t.badge}
                    </span>
                  </div>

                  <h4 className="meadows-investor-highlight">&ldquo;{t.highlight}&rdquo;</h4>
                  <p className="meadows-investor-quote">{t.quote}</p>
                </div>

                <div>
                  <div className="meadows-investor-divider" />
                  <div className="meadows-investor-footer">
                    <div className="meadows-investor-author">
                      <div
                        className="meadows-investor-avatar"
                        style={{ background: t.accentColor }}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <h5 className="meadows-investor-name">{t.name}</h5>
                        <p className="meadows-investor-role">{t.role} · {t.location}</p>
                      </div>
                    </div>
                    <span className="meadows-investor-plot">{t.plot}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            10. MANDATORY DISCLAIMER
            ============================================================ */}
        <section className="meadows-disclaimer-section">
          <div className="meadows-disclaimer-box">
            <h6>Mandatory Disclaimer</h6>
            <p className="meadows-disclaimer-text">
              This page is for information and presentation purposes only and does not constitute a legal offer or agreement. Premium quality materials or equivalent branded products shall be used for construction. Electric power, gas, legal, and other government charges are payable separately. Maintenance deposit is payable separately. The developer reserves the right to change dimensions, design, and specifications, binding on all members. Stamp duty, registration fees, and service tax on allotment/possession shall be borne by the purchaser as per prevailing law. Rates and terms are subject to change per developer policy and local regulations. This is not an authorized legal document.
            </p>
          </div>
        </section>

      </div>

      {/* Brochure Download Popup Modal */}
      <BrochureModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
        projectName="Sangrilla Meadows"
        brochureUrl="/sangrilla-meadows-brochure.pdf"
        brochureFileName="sangrilla-meadows-brochure.pdf"
      />
    </div>
  );
};

export default SangrillaMeadowsDetail;
