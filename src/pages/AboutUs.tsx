import React, { useState } from "react";
import { 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Eye, 
  Building2, 
  MapPin, 
  MoveRight, 
  CheckCircle2, 
  Film, 
  Clock, 
  ChevronDown,
  Globe2,
  TreePine,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";
import communityImage from "../assets/lifestyle images/community_spirit.png";
import heroImage from "../assets/upcoming/skyline.jpg";
import projectImage from "../assets/residential/com_res_1.jpg";
import logoMark from "../assets/logo-rb.png";
import "../styles/about-us.css";

const chapters = [
  { id: "chapter-belief", act: "ACT 01", name: "The Belief", tag: "Origin & Conviction" },
  { id: "chapter-vision", act: "ACT 02", name: "The Vision", tag: "Spatial Intelligence" },
  { id: "chapter-work", act: "ACT 03", name: "The Work", tag: "Discipline of Craft" },
  { id: "chapter-future", act: "ACT 04", name: "The Future", tag: "Dholera & Century Horizon" },
];

const milestones = [
  {
    year: "2000",
    badge: "Inception",
    title: "Groundwork & Urban Vision",
    desc: "Sangrilla began with a single core premise: infrastructure should elevate human well-being, not just fill empty land.",
    metric: "01 Master Plan"
  },
  {
    year: "2010",
    badge: "Scale & Trust",
    title: "Commercial & Mixed-Use Expansion",
    desc: "Diversified from boutique residential enclaves into Grade-A commercial office towers, pioneering steel-core structural engineering.",
    metric: "500K+ sq.ft"
  },
  {
    year: "2018",
    badge: "Community First",
    title: "The Sustainable Living Blueprint",
    desc: "Integrated biophilic architecture, zero-discharge water cycles, and curated community zones across all master-planned communities.",
    metric: "1,000+ Homes"
  },
  {
    year: "Present",
    badge: "Horizon",
    title: "Next-Gen Architectural Landmarks",
    desc: "Constructing carbon-conscious, ultra-luxury high-rises and smart city communities engineered to stand relevant for over a century.",
    metric: "15+ Landmarks"
  }
];

const pillars = [
  {
    code: "01 / INTEGRITY",
    title: "Absolute Transparency",
    desc: "Uncompromising clarity across land titles, structural grades, and execution schedules. We build partnerships on zero guesswork.",
    icon: ShieldCheck
  },
  {
    code: "02 / SPATIAL POETRY",
    title: "Intentional Form",
    desc: "Spaces engineered around natural light vectors, acoustic comfort, and passive cross-ventilation.",
    icon: Layers
  },
  {
    code: "03 / LONGEVITY",
    title: "Century-Grade Craft",
    desc: "High-spec materials, post-tensioned slabs, and durable exterior facades selected to resist environmental weathering.",
    icon: Building2
  },
  {
    code: "04 / COMMUNITY",
    title: "Social Ecosystems",
    desc: "Designing intentional friction points where neighbors interact, children play safely, and communities thrive.",
    icon: Eye
  }
];

const AboutUs = () => {
  const [activeMilestone, setActiveMilestone] = useState(0);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="sn-about">
      {/* ====================================================================
          1. CINEMATIC HERO: A SANGRILLA STORY
          "The Future Has an Origin."
          ==================================================================== */}
      <section className="sn-cinema-hero">
        {/* Sangrilla Logo as Hero Background with Low Opacity */}
        <div className="sn-cinema-bg">
          <div className="sn-hero-ambient-glow" />
          <div className="sn-hero-logo-backdrop" aria-hidden="true">
            <img 
              src={logoMark} 
              alt="Sangrilla Group Emblem" 
              className="sn-hero-bg-logo-img" 
            />
          </div>
          <div className="sn-cinema-golden-light" />
          <div className="sn-cinema-vignette" />
          <div className="sn-cinema-grain" />
        </div>

        <div className="sn-container sn-hero-layout">
          {/* Film Metadata Reel */}
          <div className="sn-film-meta-bar">
            <div className="sn-meta-item">
              <Film size={14} className="sn-blue-icon" />
              <span>A SANGRILLA STORY &bull; 35MM ESSAY</span>
            </div>
            <div className="sn-meta-divider" />
            <div className="sn-meta-item">
              <Clock size={14} className="sn-gold-icon" />
              <span>THE FUTURE HAS AN ORIGIN</span>
            </div>
            <div className="sn-meta-divider" />
            <div className="sn-meta-item">
              <MapPin size={14} className="sn-blue-icon" />
              <span>23.0225° N, 72.5714° E &bull; GUJARAT</span>
            </div>
          </div>

          {/* Hero Center Editorial */}
          <div className="sn-hero-lead-box">
            <div className="sn-hero-pill-badge">
              <span className="sn-pulse-dot" />
              <span>SANGRILLA GROUP &bull; ESTABLISHED 2000</span>
            </div>

            <h1 className="sn-cinema-h1">
              Not Just Better Spaces. <br />
              <span className="sn-gold-serif">Stronger Tomorrows.</span>
            </h1>

            <p className="sn-cinema-thesis">
              Every future city begins with someone seeing what does not yet exist. 
              For over a quarter of a century, Sangrilla has transformed raw geography 
              into living civic infrastructure—turning bold conviction into generational landmarks.
            </p>

            {/* Quick Interactive Chapter Ribbon */}
            <div className="sn-chapter-ribbon">
              <span className="sn-ribbon-label">EXPLORE THE 4 ACTS</span>
              <div className="sn-ribbon-tabs">
                {chapters.map((ch) => (
                  <button 
                    key={ch.id}
                    onClick={() => scrollToChapter(ch.id)}
                    className="sn-ribbon-tab"
                    type="button"
                  >
                    <span className="sn-ribbon-act">{ch.act}</span>
                    <span className="sn-ribbon-name">{ch.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Hero Stats Strip */}
          <div className="sn-hero-stats-band">
            <div className="sn-stat-col">
              <span className="sn-stat-value">25+</span>
              <span className="sn-stat-title">Years of Foresight</span>
            </div>
            <div className="sn-stat-sep" />
            <div className="sn-stat-col">
              <span className="sn-stat-value">1.2M+</span>
              <span className="sn-stat-title">Sq.Ft Developed</span>
            </div>
            <div className="sn-stat-sep" />
            <div className="sn-stat-col">
              <span className="sn-stat-value">100%</span>
              <span className="sn-stat-title">Title Clear Delivery</span>
            </div>
            <div className="sn-stat-sep" />
            <div className="sn-stat-col">
              <span className="sn-stat-value">15+</span>
              <span className="sn-stat-title">Century Landmarks</span>
            </div>
          </div>

          {/* Scroll Cue Indicator */}
          <button 
            type="button" 
            onClick={() => scrollToChapter("chapter-belief")} 
            className="sn-scroll-cue"
            aria-label="Scroll to Chapter 1"
          >
            <span>DISCOVER CHAPTER 01</span>
            <ChevronDown size={16} className="sn-bounce-icon" />
          </button>
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 01: THE BELIEF
          "Before the blueprint, the conviction."
          ==================================================================== */}
      <section className="sn-chapter-section" id="chapter-belief">
        <div className="sn-container">
          <div className="sn-chapter-badge-wrap">
            <span className="sn-pill">ACT 01 // 04 &bull; THE ORIGIN THESIS</span>
          </div>

          <div className="sn-belief-grid">
            <div className="sn-belief-narrative">
              <h2 className="sn-chapter-title">
                The Belief: <br />
                <span className="sn-serif-italic">Seeing what does not yet exist.</span>
              </h2>
              <div className="sn-quote-block">
                <span className="sn-quote-glyph">&ldquo;</span>
                <p className="sn-lead-quote">
                  A structure should not merely occupy geography; it must elevate 
                  the collective spirit of everyone who enters it.
                </p>
              </div>
              <p className="sn-body-text">
                In 2000, real estate across developing India was largely speculative volume. 
                Land was acquired for rapid division and immediate turnaround. Sangrilla was 
                born from an opposing premise: that land is civic destiny. Every master plan 
                is an enduring promise made to children, families, and businesses for a century to come.
              </p>
            </div>

            <div className="sn-belief-pillars-stack">
              <div className="sn-belief-card">
                <div className="sn-belief-card-header">
                  <span className="sn-belief-num">01</span>
                  <strong>Land as Civic Contribution</strong>
                </div>
                <p>
                  We treat every parcel of land as an irreplaceable civic canvas—prioritizing 
                  public parks, thermal air corridors, and human scale over speculative density.
                </p>
              </div>

              <div className="sn-belief-card">
                <div className="sn-belief-card-header">
                  <span className="sn-belief-num">02</span>
                  <strong>Uncompromising Legal Foundation</strong>
                </div>
                <p>
                  100% undisputed land titles and zero gray areas. We believe genuine peace 
                  of mind is the highest luxury any developer can deliver.
                </p>
              </div>

              <div className="sn-belief-card">
                <div className="sn-belief-card-header">
                  <span className="sn-belief-num">03</span>
                  <strong>Century-Scale Thinking</strong>
                </div>
                <p>
                  We design beyond the 10-year sales cycle. Our engineering decisions are 
                  calculated to ensure structures stand relevant, safe, and prestigious for generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 02: THE VISION
          "The geometry of human well-being."
          ==================================================================== */}
      <section className="sn-chapter-section sn-vision-section" id="chapter-vision">
        <div className="sn-container">
          <div className="sn-chapter-badge-wrap">
            <span className="sn-pill">ACT 02 // 04 &bull; SPATIAL POETRY</span>
          </div>

          <div className="sn-vision-grid">
            <div className="sn-vision-media-col">
              <div className="sn-vision-frame">
                <img 
                  src={communityImage} 
                  alt="Biophilic community master plan by Sangrilla" 
                  className="sn-vision-img" 
                />
                <div className="sn-vision-tag">
                  <TreePine size={16} className="sn-blue-icon" />
                  <span>Integrated Biophilic Architecture</span>
                </div>
              </div>
            </div>

            <div className="sn-vision-text-col">
              <h2 className="sn-chapter-title">
                The Vision: <br />
                <span className="sn-serif-italic">The geometry of human well-being.</span>
              </h2>
              <p className="sn-vision-intro">
                A true future city is not an expanse of cold concrete. It is spaces 
                engineered around light vectors, acoustics, and human interaction.
              </p>

              <div className="sn-vision-tenets">
                <div className="sn-tenet-item">
                  <div className="sn-tenet-icon-box">
                    <CheckCircle2 size={18} className="sn-blue-icon" />
                  </div>
                  <div>
                    <strong>Microclimate &amp; Wind Corridor Engineering</strong>
                    <p>Orienting building angles to harness natural wind drafts, reducing ambient courtyard heat by up to 4°C naturally.</p>
                  </div>
                </div>

                <div className="sn-tenet-item">
                  <div className="sn-tenet-icon-box">
                    <CheckCircle2 size={18} className="sn-blue-icon" />
                  </div>
                  <div>
                    <strong>Acoustic Sanctuary &amp; Thermal Insulation</strong>
                    <p>Double-glazed exterior envelopes and acoustic wall buffers that insulate interior living from urban noise.</p>
                  </div>
                </div>

                <div className="sn-tenet-item">
                  <div className="sn-tenet-icon-box">
                    <CheckCircle2 size={18} className="sn-blue-icon" />
                  </div>
                  <div>
                    <strong>Intentional Social Friction Points</strong>
                    <p>Wide communal promenades, shaded benches, and dedicated play zones that organically weave neighborly warmth.</p>
                  </div>
                </div>
              </div>

              <Link to="/projects" className="sn-cinematic-link">
                <span>Explore master-planned communities</span>
                <MoveRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 03: THE WORK
          "The discipline of steel & concrete."
          ==================================================================== */}
      <section className="sn-chapter-section" id="chapter-work">
        <div className="sn-container">
          <div className="sn-chapter-badge-wrap">
            <span className="sn-pill">ACT 03 // 04 &bull; DISCIPLINE OF CRAFT</span>
          </div>

          <div className="sn-work-header">
            <div>
              <h2 className="sn-chapter-title">
                The Work: <br />
                <span className="sn-serif-italic">Zero guesswork. Century-grade craft.</span>
              </h2>
            </div>
            <p className="sn-work-sub">
              Vision without execution is an illusion. For 25 years, every blueprint, steel reinforcement, 
              and joinery millimeter has been held to unyielding standards.
            </p>
          </div>

          {/* 4 Pillars of Execution */}
          <div className="sn-pillars-quad">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article key={pillar.code} className="sn-quad-card">
                  <div className="sn-quad-top">
                    <span className="sn-quad-code">{pillar.code}</span>
                    <div className="sn-quad-icon-wrap">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                  </div>
                  <h3 className="sn-quad-title">{pillar.title}</h3>
                  <p className="sn-quad-desc">{pillar.desc}</p>
                </article>
              );
            })}
          </div>

          {/* Interactive Era Evolution Timeline */}
          <div className="sn-work-timeline-wrap">
            <div className="sn-timeline-intro">
              <span className="sn-pill sn-pill-blue">CHRONICLES OF EXECUTION</span>
              <h3 className="sn-timeline-h3">Evolutionary Milestones</h3>
              <p className="sn-timeline-p">Follow Sangrilla’s journey from foundational groundwork to skyline authority.</p>
            </div>

            <div className="sn-timeline-console">
              {/* Timeline selector tabs */}
              <div className="sn-console-tabs">
                {milestones.map((item, idx) => (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => setActiveMilestone(idx)}
                    className={`sn-console-tab ${activeMilestone === idx ? "active" : ""}`}
                  >
                    <div className="sn-tab-info">
                      <span className="sn-tab-yr">{item.year}</span>
                      <span className="sn-tab-sub">{item.badge}</span>
                    </div>
                    <span className="sn-tab-beacon" />
                  </button>
                ))}
              </div>

              {/* Display card */}
              <div className="sn-console-screen">
                <div className="sn-screen-header">
                  <span className="sn-screen-badge">{milestones[activeMilestone].metric}</span>
                  <span className="sn-screen-year">{milestones[activeMilestone].year} Era Milestone</span>
                </div>
                <h4 className="sn-screen-title">{milestones[activeMilestone].title}</h4>
                <p className="sn-screen-desc">{milestones[activeMilestone].desc}</p>
                <div className="sn-screen-progress">
                  <div 
                    className="sn-screen-progress-bar"
                    style={{ width: `${((activeMilestone + 1) / milestones.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 04: THE FUTURE
          "Dholera SIR & the next century."
          ==================================================================== */}
      <section className="sn-chapter-section sn-future-section" id="chapter-future">
        <div className="sn-container">
          <div className="sn-chapter-badge-wrap">
            <span className="sn-pill">ACT 04 // 04 &bull; THE NEXT CENTURY</span>
          </div>

          <div className="sn-future-intro-box">
            <h2 className="sn-chapter-title">
              The Future: <br />
              <span className="sn-serif-italic">Pioneering India&rsquo;s smart greenfield horizons.</span>
            </h2>
            <p className="sn-future-lead">
              The story does not stop with what is built. It extends to what is becoming. 
              In Dholera Special Investment Region (SIR) and emerging Gujarat growth corridors, 
              Sangrilla is developing the greenfield ecosystems that will anchor India’s next century.
            </p>
          </div>

          <div className="sn-future-triad">
            <div className="sn-triad-card">
              <div className="sn-triad-icon-box">
                <Globe2 size={24} className="sn-blue-icon" />
              </div>
              <h3>Dholera SIR Megacity Hubs</h3>
              <p>
                Strategic master-planned plotting and commercial zones connected to 
                multimodal expressways, international cargo airports, and clean utility corridors.
              </p>
              <div className="sn-card-foot-metric">Strategic Logistics Corridor</div>
            </div>

            <div className="sn-triad-card">
              <div className="sn-triad-icon-box">
                <Activity size={24} className="sn-blue-icon" />
              </div>
              <h3>Carbon-Conscious Landmarks</h3>
              <p>
                Integrating rooftop solar arrays, zero-discharge greywater filtration, 
                and energy-conserving architectural building management systems.
              </p>
              <div className="sn-card-foot-metric">Net-Zero Water Target</div>
            </div>

            <div className="sn-triad-card">
              <div className="sn-triad-icon-box">
                <Building2 size={24} className="sn-blue-icon" />
              </div>
              <h3>Generational Legacy Assets</h3>
              <p>
                Engineered to appreciate not merely financially, but civically and culturally. 
                Investments that stand strong for grandchildren and beyond.
              </p>
              <div className="sn-card-foot-metric">Century-Grade Longevity</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CINEMATIC CLOSING INVITATION & FILM CREDITS
          ==================================================================== */}
      <section className="sn-closing-cta">
        <div className="sn-closing-bg">
          <img src={projectImage} alt="Sangrilla signature architectural legacy" />
          <div className="sn-closing-backdrop" />
        </div>
        <div className="sn-container sn-closing-container">
          <span className="sn-pill sn-pill-blue">THE FUTURE HAS AN ORIGIN</span>
          <h2 className="sn-closing-h2">
            Ready to find your place <br />
            in the Sangrilla story?
          </h2>
          <div className="sn-cta-actions">
            <Link to="/projects" className="sn-btn-primary">
              Explore Master Developments <ArrowUpRight size={18} />
            </Link>
            <Link to="/contact" className="sn-btn-secondary">
              Schedule Private Consultation
            </Link>
          </div>

          {/* Film Credits Footer Strip */}
          <div className="sn-film-credits">
            <div className="sn-credits-line">
              <span>SANGRILLA GROUP &bull; FOUNDED 2000</span>
              <span className="sn-credits-dot">&bull;</span>
              <span>AHMEDABAD &bull; GANDHINAGAR &bull; DHOLERA &bull; GUJARAT</span>
            </div>
            <p className="sn-credits-copyright">
              &copy; {new Date().getFullYear()} Sangrilla Group. All master plans, designs, and architectural specifications are protected under intellectual civic copyright.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
