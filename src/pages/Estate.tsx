import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/estate.css";
import OptimizedImage from "../components/OptimizedImage";

// Assets
// import extremeHero from "../assets/estate/estatehero1.jpg";

// import extremeCommercial from "../assets/estate/extreme_commercial.png";

// import extremeResidential from "../assets/estate/extreme_residential.png";

// import abstractDetail from "../assets/estate/abstract_detail.png";

//hero display images:
import estateHero1 from "../assets/estate/hero-section-display/estatehero1.jpg";
import estateHero2 from "../assets/estate/hero-section-display/estatehero2.jpg";
import estateHero3 from "../assets/estate/hero-section-display/estatehero3.jpg";
import estateHero4 from "../assets/estate/hero-section-display/estatehero4.jpg";
import estateHero5 from "../assets/estate/hero-section-display/estatehero5.jpg";
import estateHero6 from "../assets/estate/hero-section-display/estatehero6.jpeg";
import estateHero7 from "../assets/estate/hero-section-display/estatehero7.jpg";
import estateHero8 from "../assets/estate/hero-section-display/estatehero8.jpg";
import estateHero9 from "../assets/estate/hero-section-display/estatehero9.jpg";

//territories images:
import estateTerr1 from "../assets/estate/strategic-territories/estate-terr1.jpg";
import estateTerr2 from "../assets/estate/strategic-territories/estate-terr2.jpg";
import estateTerr3 from "../assets/estate/strategic-territories/estate-terr3.jpg";
import estateTerr4 from "../assets/estate/strategic-territories/estate-terr4.jpg";

//pillars images:
import estatePillar1 from "../assets/estate/strategic-pillars/estatepillar1.jpg";
import estatePillar2 from "../assets/estate/strategic-pillars/estatepillar2.jpg";
import estatePillar3 from "../assets/estate/strategic-pillars/estatepillar3.jpg";

//assets images:
import estateLand from "../assets/estate/featured-assets/estate-asset-land.jpg";
import estateCommercial from "../assets/estate/featured-assets/estate-asset-comm.jpg";
import estateResidential from "../assets/estate/featured-assets/estate-asset-res.jpg";


const advantages = [
  {
    id: "01",
    title: "Private Acquisitions",
    description: "Discrete brokerage for Ahmedabad's most coveted residential sanctuaries.",
    image: estatePillar1
  },
  {
    id: "02",
    title: "Strategic Expansion",
    description: "High-yield commercial assets and industrial corridors for institutional growth.",
    image: estatePillar2
  },
  {
    id: "03",
    title: "Market Intelligence",
    description: "Proprietary data analysis ensuring every deal anchors your financial legacy.",
    image: estatePillar3
  }
];

const territories = [
  { id: "01", name: "Science City", desc: "Elite residential enclaves and premium institutional hubs.", image: estateTerr1 },
  { id: "02", name: "Sanand", desc: "The industrial backbone with high-appreciation satellite potential.", image: estateTerr2 },
  { id: "03", name: "Tragad", desc: "Strategic residential connectivity with seamless urban access.", image: estateTerr3 },
  { id: "04", name: "Chandkheda", desc: "A legacy suburban sanctuary with stable, long-term valuation.", image: estateTerr4 }
];

const heroImages = [
    estateHero1,
    estateHero2,
    estateHero3,
    estateHero4,
    estateHero5,
    estateHero6,
    estateHero7,
    estateHero8,
    estateHero9
];

const featuredProperties = [
  {
    id: 1,
    title: "The Zenith Skyvilla",
    location: "Science City",
    type: "Residential",
    price: "On Request",
    image: estateResidential
  },
  {
    id: 2,
    title: "Sangrilla Business Hub",
    location: "Sanand",
    type: "Commercial",
    price: "Institutional Grade",
    image: estateCommercial
  },
  {
    id: 3,
    title: "Signature Estate Plot",
    location: "Chandkheda",
    type: "Land",
    price: "Premium Valuation",
    image: estateLand
  }
];

const testimonials = [
  {
    name: "Rajesh Mehta",
    role: "Institutional Investor",
    quote: "Sangrilla's transparency in brokerage is unmatched. Since 2012, they've been my trusted partners for all Ahmedabad acquisitions."
  },
  {
    name: "Anita Desai",
    role: "Luxury Homeowner",
    quote: "They don't just sell property; they curate a lifestyle. The transition into our Science City villa was seamless."
  }
];

const insights = [
  {
    title: "Why Sanand is Booming in 2026",
    desc: "A deep dive into the industrial expansion corridor.",
    date: "March 2026"
  },
  {
    title: "Commercial vs Residential ROI",
    desc: "Where to anchor your financial legacy this year.",
    date: "April 2026"
  }
];

const buyingJourney = [
  { step: "01", title: "Consultation", desc: "Define your financial and lifestyle goals." },
  { step: "02", title: "Shortlisting", desc: "Curation of exclusive assets." },
  { step: "03", title: "Site Visits", desc: "Strategic zone exploration." },
  { step: "04", title: "Negotiation", desc: "Expert protocols for value." },
  { step: "05", title: "Closure", desc: "Seamless legacy transition." }
];

const Estate = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [formData, setFormData] = useState({ name: "", phone: "", lookingFor: "" });
  const [activePillar, setActivePillar] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Full Name: ${formData.name}\nPhone Number: ${formData.phone}\nWhat Are You Looking For?: ${formData.lookingFor}\n\nHello! I am interested in Sangrilla Estate, please provide me some more info.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919737227999?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setFormData({ name: "", phone: "", lookingFor: "" });
  };

  const handlePropertyRequest = (title: string, location: string) => {
    const message = `Hello! I am interested in ${title} at ${location}. Please provide more details.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919737227999?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="estate-page-premium">
      
      {/* ── PREMIUM HERO SECTION ── */}
      <section className="estate-hero">
        
        {/* Background Layer with Simple Cross-fade */}
        <div className="estate-hero-bg">
          <AnimatePresence mode="wait">
            <motion.img 
                key={currentBg}
                src={heroImages[currentBg]}
                alt="Sangrilla Estate Hero"
                className="estate-hero-img"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{ position: 'absolute', inset: 0 }}
            />
          </AnimatePresence>
          <div className="estate-hero-overlay" />
        </div>

        {/* Central Content */}
        <div className="estate-hero-content">
          <motion.h1 
            className="estate-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p style={{fontFamily: "Philosopher,sans-serif"}}>SANGRILLA <span style={{color: "#007ADD", fontFamily: "Philosopher,sans-serif"}}>ESTATE</span></p>
          </motion.h1>

          <motion.p 
            className="estate-hero-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Curating Wealth. Since 2000.
          </motion.p>
        </div>

      </section>

      {/* ── THE HERITAGE ── */}
      <section className="elegant-section tbc-container-elegant">
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}>
            <h2 className="heritage-title">
                Two Decades of <br />Uncompromising Precision.
            </h2>
            <p className="heritage-text">
                With over two decades of real estate expertise since 2000, Sangrilla Estate specializes in premium residential and commercial brokerage across Ahmedabad’s most strategic zones. We navigate the complexities of property brokerage with a focus on trust, authority, and institutional-grade yields.
            </p>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ── */}
      <section className="elegant-section tbc-container-elegant">
        <h2 className="elegant-section-title">Featured Assets</h2>
        <div className="property-grid">
            {featuredProperties.map((prop) => (
                <div key={prop.id} className="property-card">
                    <div className="property-img-wrap">
                        <OptimizedImage src={prop.image} alt={prop.title} className="property-img" />
                        <span className="property-badge">{prop.type}</span>
                    </div>
                    <div className="property-info">
                        <h3 className="property-title">{prop.title}</h3>
                        <p className="property-meta">{prop.location} | {prop.price}</p>
                        <button 
                            className="property-cta"
                            onClick={() => handlePropertyRequest(prop.title, prop.location)}
                        >
                            Request Details
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* ── STRATEGIC PILLARS (GRID LAYOUT) ── */}
      <section className="elegant-section tbc-container-elegant">
        <h2 className="elegant-section-title">Strategic Pillars</h2>
        <div className="property-grid">
            {advantages.map((adv) => (
                <div 
                    key={adv.id} 
                    className={`property-card ${activePillar === adv.id ? 'is-active' : ''}`}
                    onClick={() => setActivePillar(activePillar === adv.id ? null : adv.id)}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="property-img-wrap">
                        <OptimizedImage src={adv.image} alt={adv.title} className="property-img" />
                    </div>
                    <div className="property-info">
                        <h3 className="property-title">{adv.title}</h3>
                        <p className="property-meta" style={{ marginBottom: 0 }}>{adv.description}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* ── STRATEGIC TERRITORIES ── */}
      <section className="elegant-section tbc-container-elegant">
         <h2 className="elegant-section-title">Strategic Territories</h2>
         <div className="tbc-editorial-grid">
            {territories.map((terr, index) => (
                <div 
                   key={terr.id} 
                   className="tbc-editorial-item"
                >
                    <div className="editorial-img-wrap">
                        <OptimizedImage src={terr.image} alt={terr.name} className="editorial-img" />
                    </div>
                    <div className="editorial-meta">
                        <h3 className="editorial-title">{terr.name}</h3>
                        <p className="editorial-desc">{terr.desc}</p>
                    </div>
                </div>
            ))}
         </div>
      </section>

      {/* ── THE BUYING JOURNEY ── */}
      <section className="elegant-section tbc-container-elegant">
        <h2 className="elegant-section-title">The Journey</h2>
        <div className="timeline-container">
            {buyingJourney.map((step, idx) => (
                <div key={idx} className="timeline-item">
                    <span className="timeline-step">{step.step}</span>
                    <h3 className="timeline-title">{step.title}</h3>
                    <p className="timeline-desc">{step.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="elegant-section tbc-container-elegant">
        <h2 className="elegant-section-title">Client Legacies</h2>
        <div className="testimonial-grid">
            {testimonials.map((t, idx) => (
                <div key={idx} className="testimonial-card">
                    <p className="testimonial-quote">"{t.quote}"</p>
                    <div className="testimonial-author">
                        <h4 className="testimonial-name">{t.name}</h4>
                        <span className="testimonial-role">{t.role}</span>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* ── INVESTMENT INSIGHTS ── */}
      <section className="elegant-section tbc-container-elegant">
        <h2 className="elegant-section-title">Insights</h2>
        <div className="insights-grid">
            {insights.map((article, idx) => (
                <div key={idx} className="insight-card">
                    <span className="insight-date">{article.date}</span>
                    <h3 className="insight-title">{article.title}</h3>
                    <p className="insight-desc">{article.desc}</p>
                    <button className="insight-link">Read Intelligence →</button>
                </div>
            ))}
        </div>
      </section>

      {/* ── SOCIAL CONNECTION ── */}
      <section className="social-integration">
        <div className="tbc-container-elegant" style={{ textAlign: 'center', paddingBottom: 0 }}>
            <h2 className="elegant-section-title estate-social-title" style={{ marginTop: 0 }}>Beyond the Transaction</h2>
            <div className="social-links-grid">
                <a href="https://www.instagram.com/sangrillaestate" target="_blank" rel="noopener noreferrer" className="social-pill">Instagram</a>
                <a href="https://www.facebook.com/sangrillaestate" target="_blank" rel="noopener noreferrer" className="social-pill">Facebook</a>
                <a href="https://www.youtube.com/@sangrillaestate" target="_blank" rel="noopener noreferrer" className="social-pill">YouTube</a>
            </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="elegant-section tbc-container-elegant">
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="elegant-section-title">Build Your Legacy</h2>
            <p style={{ color: '#86868b', marginBottom: '60px', fontSize: '1.2rem' }}>
                Get Personalized Property Advisory
            </p>
            <form onSubmit={handleInquiry} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input 
                    type="text" 
                    className="elegant-input" 
                    placeholder="Full Name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input 
                    type="tel" 
                    className="elegant-input" 
                    placeholder="Phone Number" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <input 
                    type="text" 
                    className="elegant-input" 
                    placeholder="What Are You Looking For?" 
                    required 
                    value={formData.lookingFor}
                    onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                />
                <button type="submit" className="elegant-btn">Request Consultation</button>
            </form>
        </div>
      </section>

    </div>
  );
};

export default Estate;
