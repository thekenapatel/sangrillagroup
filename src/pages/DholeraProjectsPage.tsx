import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MapPin,
  CheckCircle2,
  Phone,
  Mail,
  Download,
  Calendar,
  Layers,
  ArrowRight,
  X,
  Compass
} from "lucide-react";
import "../styles/dholera-hub.css";
import { downloadBrochure, saveContactDetails } from "../services/mongoService";

const DholeraProjectsPage: React.FC = () => {
  const location = useLocation();
  const stickyBarRef = useRef<HTMLElement>(null);
  const [siteVisitModalOpen, setSiteVisitModalOpen] = useState(false);
  const [visitSubmitted, setVisitSubmitted] = useState(false);
  const [visitForm, setVisitForm] = useState({
    name: "",
    phone: "",
    email: "",
    project: "Both Projects",
    date: "",
    visitors: "1-2 Persons",
    notes: ""
  });

  // Single unified CTA contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    project: "Both Projects (Meadows & Baghban)",
    inquiryType: "Schedule Escorted Site Visit",
    visitDate: "",
    message: ""
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Pre-select project and auto-scroll to CTA contact form if linked from project cards
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const projParam = (searchParams.get("project") || (location.state as any)?.project || "").toLowerCase();

    if (projParam) {
      if (projParam.includes("meadow")) {
        setContactForm((prev) => ({
          ...prev,
          project: "Sangrilla Meadows (145 Villa Plots · Aakru Village)"
        }));
      } else if (projParam.includes("baghban")) {
        setContactForm((prev) => ({
          ...prev,
          project: "Sangrilla Baghban (96 Villa Plots & Porch Villas · Kamiyala)"
        }));
      }
    }

    if (location.hash === "#dholera-contact") {
      const scrollTimer = setTimeout(() => {
        const el = document.getElementById("dholera-contact");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
      return () => clearTimeout(scrollTimer);
    }
  }, [location.search, location.hash, location.state]);

  // Unified CTA Contact Form Submit
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) return;

    try {
      await saveContactDetails({
        name: contactForm.name,
        contactNumber: contactForm.phone,
        email: contactForm.email,
        source: "Dholera Main Page Unified CTA Form",
        project: contactForm.project
      });
    } catch {
      // Silently continue
    }

    const text = encodeURIComponent(
      `Hello Sangrilla Group! I am interested in *${contactForm.project}* in Dholera SIR.\n\n` +
      `Name: ${contactForm.name}\n` +
      `Phone: ${contactForm.phone}\n` +
      `Email: ${contactForm.email || 'N/A'}\n` +
      `Inquiry Type: ${contactForm.inquiryType}\n` +
      `Preferred Date: ${contactForm.visitDate || 'Earliest Available'}\n` +
      `Message: ${contactForm.message || 'Please share detailed cost sheets and site coordinates.'}`
    );
    window.open(`https://wa.me/919737327999?text=${text}`, "_blank");
    setContactSubmitted(true);
  };

  // ESC key listener for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && siteVisitModalOpen) {
        setSiteVisitModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [siteVisitModalOpen]);

  // Prevent sticky bar from going down into the footer
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const footer = document.querySelector("footer");
          const bar = stickyBarRef.current;
          if (footer && bar) {
            const footerRect = footer.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const isMobile = window.innerWidth <= 768;
            const defaultBottom = isMobile ? 14 : 24;

            // Distance from viewport bottom to footer top
            const footerVisibleHeight = windowHeight - footerRect.top;

            if (footerVisibleHeight > 0) {
              // The top of the footer has entered the viewport:
              // Push the bar up so its bottom sits exactly defaultBottom px above the footer top
              const targetBottom = footerVisibleHeight + defaultBottom;
              bar.style.bottom = `${targetBottom}px`;

              // If the user scrolls deep into the footer, fade out cleanly
              if (footerVisibleHeight > (isMobile ? 120 : 180)) {
                bar.classList.add("is-footer-hidden");
              } else {
                bar.classList.remove("is-footer-hidden");
              }
            } else {
              // Footer is not in view
              bar.style.bottom = `${defaultBottom}px`;
              bar.classList.remove("is-footer-hidden");
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Handle Brochure Downloads
  const handleBrochureDownload = (proj: "sangrilla-baghban" | "sangrilla-meadows") => {
    if (proj === "sangrilla-baghban") {
      downloadBrochure("/sangrilla-baghban-brochure.pdf", "sangrilla-baghban-brochure.pdf");
    } else {
      downloadBrochure("/sangrilla-meadows-brochure.pdf", "sangrilla-meadows-brochure.pdf");
    }
  };

  // Site Visit Form Submit
  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitForm.name || !visitForm.phone) return;

    const text = encodeURIComponent(
      `Hello Sangrilla Group! I would like to schedule a private site visit to *${visitForm.project}* in Dholera SIR.\n\nName: ${visitForm.name}\nPhone: ${visitForm.phone}\nEmail: ${visitForm.email || 'N/A'}\nPreferred Date: ${visitForm.date || 'Earliest available weekend'}\nAttendees: ${visitForm.visitors}\nNotes: ${visitForm.notes || 'Please arrange site coordinates and guided inspection.'}`
    );
    window.open(`https://wa.me/919737327999?text=${text}`, "_blank");
    setVisitSubmitted(true);
    setTimeout(() => {
      setSiteVisitModalOpen(false);
      setVisitSubmitted(false);
    }, 2500);
  };

  return (
    <div className="dholera-page-wrapper">
      <div className="dholera-container">

        {/* ============================================================
            HERO SECTION (Apple / Shivalik Minimalist Presentation)
            ============================================================ */}
        <section className="dholera-hero">
          {/* <div className="dholera-eyebrow">
            <span className="dholera-eyebrow-dot" />
            <span>Dholera Special Investment Region · Strategic Assets</span>
          </div> */}

          <h1 className="dholera-hero-title">
            Thoughtfully Planned Communities. Lasting Value.
          </h1>

          <p className="dholera-hero-subtitle">
            Sangrilla Group creates residential spaces in Dholera, bringing together considered planning, modern infrastructure, and opportunities to build for the future.
          </p>

          {/* Macroeconomic Metrics Strip (Clean Hairline Grid) */}
          <div className="dholera-metrics-strip">
            <div className="dholera-metric-item">
              <div className="dholera-metric-val">920 SQ. KM.</div>
              <div className="dholera-metric-lbl">Planned Greenfield Metropolis</div>
            </div>
            <div className="dholera-metric-item">
              <div className="dholera-metric-val">50 Min</div>
              <div className="dholera-metric-lbl">Ahmedabad-Dholera Expressway</div>
            </div>
            <div className="dholera-metric-item">
              <div className="dholera-metric-val">Tata Fab</div>
              <div className="dholera-metric-lbl">Semiconductor Ecosystem</div>
            </div>
            <div className="dholera-metric-item">
              <div className="dholera-metric-val">2026</div>
              <div className="dholera-metric-lbl">Greenfield Int&apos;l Airport</div>
            </div>
            <div className="dholera-metric-item">
              <div className="dholera-metric-val">100%</div>
              <div className="dholera-metric-lbl">NA / NOC Clear Title Registry</div>
            </div>
          </div>
        </section>

        {/* ============================================================
            THE TWO MASTER PROJECT SHOWCASE CARDS (Main Page)
            ============================================================ */}
        <section className="dholera-portfolio-section">
          <div className="dholera-section-header">
            <span className="dholera-section-eyebrow">Featured Developments</span>
            <h2 className="dholera-section-title">Strategic Land Holdings in Dholera SIR</h2>
            <p className="dholera-section-desc">
              Select an enclave below to inspect demarcated layouts, infrastructure specifications, and investment projections.
            </p>
          </div>

          <div className="dholera-projects-grid">

            {/* CARD 1: SANGRILA MEADOWS */}
            <article className="dholera-project-card">
              <Link to="/project/sangrilla-meadows" className="dholera-card-media">
                <img
                  src="/assets/meadows/up_res_1.jpg"
                  alt="Sangrilla Meadows Dholera SIR"
                  className="dholera-card-img"
                  loading="lazy"
                />
                <div className="dholera-card-media-overlay" />
                <div className="dholera-card-status-badge">
                  <span className="dholera-status-indicator" />
                  <span>Featured · 145 Villa Plots</span>
                </div>
              </Link>

              <div className="dholera-card-body">
                <div className="dholera-card-meta">
                  <MapPin size={13} /> Aakru Village · Dholera SIR
                </div>

                <h3 className="dholera-card-title">SANGRILLA MEADOWS</h3>

                <p className="dholera-card-desc">
                  A vision of refined living, where thoughtfully planned plots create space for your future home and a legacy of your own.
                </p>
                <div className="dholera-card-specs">
                  <span className="dholera-spec-pill">145 Villa Plots</span>
                  <span className="dholera-spec-pill">29,471 Sq. Yd. Area</span>
                  <span className="dholera-spec-pill">250m Expressway Link</span>
                  <span className="dholera-spec-pill">Immediate Dastavej</span>
                </div>

                <div className="dholera-card-actions">
                  <Link
                    to="/project/sangrilla-meadows"
                    className="dholera-btn-primary"
                  >
                    <span>Explore Project Details</span>
                    <ArrowRight size={16} />
                  </Link>

                  {/* <div className="dholera-btn-secondary-row">
                    <button
                      type="button"
                      className="dholera-btn-secondary"
                      onClick={() => handleBrochureDownload("sangrilla-meadows")}
                    >
                      <Download size={14} /> Brochure PDF
                    </button>

                    <Link
                      to="/project/sangrilla-meadows/master-plan"
                      className="dholera-btn-secondary"
                    >
                      <Layers size={14} /> 3D GIS Plotter ↗
                    </Link>
                  </div> */}
                </div>
              </div>
            </article>

            {/* CARD 2: SANGRILA BAGHBAN */}
            <article className="dholera-project-card">
              <Link to="/project/sangrilla-baghban" className="dholera-card-media">
                <img
                  src="/assets/baghban/sangrilla-baghban-coverpage.png"
                  alt="Sangrilla Baghban Dholera SIR"
                  className="dholera-card-img"
                  loading="lazy"
                />
                <div className="dholera-card-media-overlay" />
                <div className="dholera-card-status-badge">
                  <span className="dholera-status-indicator is-baghban" />
                  <span>New Launch · 96 Villa Plots</span>
                </div>
              </Link>

              <div className="dholera-card-body">
                <div className="dholera-card-meta">
                  <MapPin size={13} /> Kamiyala · Gateway of Dholera SIR
                </div>

                <h3 className="dholera-card-title">SANGRILLA BAGHBAN</h3>

                <p className="dholera-card-desc">
                  A greener way to belong, bringing together open spaces, personal villa aspirations, and a community shaped around tomorrow.
                </p>

                <div className="dholera-card-specs">
                  <span className="dholera-spec-pill">96 Planned Plots</span>
                  <span className="dholera-spec-pill">Porch Villa Option</span>
                  <span className="dholera-spec-pill">9m &amp; 12m Roads</span>
                  <span className="dholera-spec-pill">Kamiyala Mandir 700m</span>
                </div>

                <div className="dholera-card-actions">
                  <Link
                    to="/project/sangrilla-baghban"
                    className="dholera-btn-primary"
                  >
                    <span>Explore Project Details</span>
                    <ArrowRight size={16} />
                  </Link>

                  {/* <div className="dholera-btn-secondary-row">
                    <button
                      type="button"
                      className="dholera-btn-secondary"
                      onClick={() => handleBrochureDownload("sangrilla-baghban")}
                    >
                      <Download size={14} /> Brochure PDF
                    </button>

                    <Link
                      to="/project/sangrilla-baghban#location"
                      className="dholera-btn-secondary"
                    >
                      <MapPin size={14} /> Location Plan
                    </Link>
                  </div> */}
                </div>
              </div>
            </article>

          </div>
        </section>

        {/* ============================================================
            SINGLE UNIFIED CTA CONTACT FORM (Just Below the Two Projects)
            ============================================================ */}
        <section className="dholera-contact-section" id="dholera-contact">
          <div className="dholera-contact-grid">

            {/* Left Column: Direct Institutional Assurances & Channels */}
            <div className="dholera-contact-info-col">
              <div className="dholera-contact-eyebrow">
                <span className="dholera-status-indicator" style={{ background: "#007ADD" }} />
                <span>Investor Relations &amp; Direct Developer Desk</span>
              </div>

              <h2 className="dholera-contact-heading">
                Connect With Sangrilla Group · Dholera SIR
              </h2>

              <p className="dholera-contact-lead">
                Plan an escorted private site inspection or request official clear-title dossiers, demarcation layouts, and pre-launch pricing sheets for <strong>Sangrilla Meadows</strong> and <strong>Sangrilla Baghban</strong>.
              </p>

              {/* Direct Channels */}
              <div className="dholera-contact-channels">
                <a href="tel:+919737327999" className="dholera-channel-card">
                  <div className="dholera-channel-icon">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="dholera-channel-label">Direct Investor Helpline</span>
                    <span className="dholera-channel-value">+91 97373 27999 / +91 97373 28999</span>
                  </div>
                </a>

                <a href="mailto:sales@sangrillagroup.com" className="dholera-channel-card">
                  <div className="dholera-channel-icon">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="dholera-channel-label">Official Advisory Desk</span>
                    <span className="dholera-channel-value">sales@sangrillagroup.com</span>
                  </div>
                </a>

                <div className="dholera-channel-card">
                  <div className="dholera-channel-icon">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="dholera-channel-label">Corporate Sales Headquarters</span>
                    <span className="dholera-channel-value">A/507, Money Plant High Street, S.G. Highway, Gota, Ahmedabad – 382470</span>
                  </div>
                </div>
              </div>

              {/* Verified Trust Strip */}
              <div className="dholera-trust-pills-wrap">
                <div className="dholera-trust-pill">
                  <CheckCircle2 size={14} /> 100% NA / NOC Clear Title
                </div>
                <div className="dholera-trust-pill">
                  <CheckCircle2 size={14} /> Immediate Dastavej Registry
                </div>
                <div className="dholera-trust-pill">
                  <CheckCircle2 size={14} /> Direct Developer Pricing
                </div>
                <div className="dholera-trust-pill">
                  <CheckCircle2 size={14} /> Turnkey Villa Construction Support
                </div>
              </div>

              {/* Brochure Quick Downloads */}
              <div className="dholera-brochure-download-row">
                <button
                  type="button"
                  className="dholera-brochure-btn"
                  onClick={() => handleBrochureDownload("sangrilla-meadows")}
                >
                  <Download size={14} /> Meadows Brochure PDF
                </button>
                <button
                  type="button"
                  className="dholera-brochure-btn"
                  onClick={() => handleBrochureDownload("sangrilla-baghban")}
                >
                  <Download size={14} /> Baghban Brochure PDF
                </button>
              </div>
            </div>

            {/* Right Column: High-End Contact Form Card */}
            <div className="dholera-contact-form-card">
              <div className="dholera-form-card-header">
                <h3 className="dholera-form-card-title">Schedule a Site Visit or Request Cost Sheet</h3>
                <p className="dholera-form-card-desc">
                  Fill in your coordinates below. Our senior investment director will connect with you via WhatsApp.
                </p>
              </div>

              {contactSubmitted ? (
                <div className="dholera-form-success-box">
                  <CheckCircle2 size={40} color="#16a34a" style={{ margin: "0 auto 10px" }} />
                  <h4 className="dholera-form-success-title">Inquiry Forwarded Successfully</h4>
                  <p className="dholera-form-success-text">
                    Thank you, {contactForm.name}! Your request regarding {contactForm.project} has been shared directly with our Dholera advisory desk. We will reach out to you shortly.
                  </p>
                  <button
                    type="button"
                    className="dholera-form-reset-btn"
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactForm({
                        name: "",
                        phone: "",
                        email: "",
                        project: "Both Projects (Meadows & Baghban)",
                        inquiryType: "Schedule Escorted Site Visit",
                        visitDate: "",
                        message: ""
                      });
                    }}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form className="dholera-unified-form" onSubmit={handleContactSubmit}>
                  <div className="dholera-form-row">
                    <div className="dholera-form-field">
                      <label className="dholera-form-lbl">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dev Patel"
                        className="dholera-input"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      />
                    </div>

                    <div className="dholera-form-field">
                      <label className="dholera-form-lbl">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 97373 27999"
                        className="dholera-input"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="dholera-form-row">
                    <div className="dholera-form-field">
                      <label className="dholera-form-lbl">Email Address</label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        className="dholera-input"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      />
                    </div>

                    <div className="dholera-form-field">
                      <label className="dholera-form-lbl">Project of Interest</label>
                      <select
                        className="dholera-select"
                        value={contactForm.project}
                        onChange={(e) => setContactForm({ ...contactForm, project: e.target.value })}
                      >
                        <option value="Both Projects (Meadows & Baghban)">Both Projects (Meadows &amp; Baghban)</option>
                        <option value="Sangrilla Meadows (145 Villa Plots · Aakru Village)">Sangrilla Meadows (145 Villa Plots · Aakru)</option>
                        <option value="Sangrilla Baghban (96 Villa Plots & Porch Villas · Kamiyala)">Sangrilla Baghban (96 Plots &amp; Villas · Kamiyala)</option>
                      </select>
                    </div>
                  </div>

                  <div className="dholera-form-row">
                    <div className="dholera-form-field">
                      <label className="dholera-form-lbl">Inquiry Nature</label>
                      <select
                        className="dholera-select"
                        value={contactForm.inquiryType}
                        onChange={(e) => setContactForm({ ...contactForm, inquiryType: e.target.value })}
                      >
                        <option value="Schedule Escorted Site Visit">Schedule Escorted Site Visit</option>
                        <option value="Request Latest Cost Sheet & Layouts">Request Latest Cost Sheet &amp; Layouts</option>
                        <option value="Immediate Plot Booking (Clear Title)">Immediate Plot Booking (Clear Title)</option>
                        <option value="Turnkey Porch Villa Construction">Turnkey Porch Villa Construction</option>
                        <option value="General Investment Advisory">General Investment Advisory</option>
                      </select>
                    </div>

                    <div className="dholera-form-field">
                      <label className="dholera-form-lbl">Preferred Visit Date (Optional)</label>
                      <input
                        type="date"
                        className="dholera-input"
                        value={contactForm.visitDate}
                        onChange={(e) => setContactForm({ ...contactForm, visitDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="dholera-form-field">
                    <label className="dholera-form-lbl">Questions / Special Requirements</label>
                    <textarea
                      placeholder="Please mention preferred plot sizes (e.g. 150 Sq. Yd.) or scheduled inspection time..."
                      className="dholera-textarea"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="dholera-submit-btn">
                    <span>Submit Inquiry &amp; Connect via WhatsApp</span>
                    <ArrowRight size={16} />
                  </button>

                  <p className="dholera-form-footnote">
                    Your information is confidential and will never be shared with third parties.
                  </p>
                </form>
              )}
            </div>

          </div>
        </section>

      </div>

      {/* ============================================================
          STICKY BOTTOM FLOATING CORPORATE BAR (Apple Style)
          ============================================================ */}
      <aside ref={stickyBarRef} className="dholera-sticky-bar">
        <div className="dholera-sticky-brand">
          <Compass size={15} />
          <span>Sangrilla Dholera Portfolio</span>
        </div>

        <div className="dholera-sticky-actions">
          <Link
            to="/project/sangrilla-meadows"
            className="dholera-sticky-btn"
          >
            <span className="dholera-btn-lbl-desktop">Meadows Details</span>
            <span className="dholera-btn-lbl-mobile">Meadows</span>
          </Link>

          <Link
            to="/project/sangrilla-baghban"
            className="dholera-sticky-btn"
          >
            <span className="dholera-btn-lbl-desktop">Baghban Details</span>
            <span className="dholera-btn-lbl-mobile">Baghban</span>
          </Link>

          <button
            type="button"
            className="dholera-sticky-btn is-cta"
            onClick={() => {
              const el = document.getElementById("dholera-contact");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <Calendar size={13} />
            <span className="dholera-btn-lbl-desktop">Schedule Visit &amp; Enquire</span>
            <span className="dholera-btn-lbl-mobile">Enquire</span>
          </button>
        </div>
      </aside>

      {/* ============================================================
          SITE VISIT BOOKING MODAL (From Main Page CTA)
          ============================================================ */}
      {siteVisitModalOpen && (
        <div className="dholera-modal-backdrop" onClick={() => setSiteVisitModalOpen(false)}>
          <div
            className="dholera-modal-container"
            style={{ maxWidth: "560px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dholera-modal-header">
              <div>
                <h3 className="dholera-modal-title" style={{ fontSize: "1.2rem" }}>
                  Schedule a Private Site Visit
                </h3>
                <span className="dholera-modal-badge">Dholera SIR On-Ground Inspection</span>
              </div>
              <button
                type="button"
                className="dholera-modal-close-btn"
                onClick={() => setSiteVisitModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: "28px" }}>
              {visitSubmitted ? (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <CheckCircle2 size={48} color="#15803d" style={{ margin: "0 auto 12px" }} />
                  <h4 style={{ margin: "0 0 6px" }}>Site Visit Requested</h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#6e6e73" }}>
                    Our corporate chauffeur and site director will reach out to confirm your itinerary.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleVisitSubmit}>
                  <div className="dholera-form-grid" style={{ gridTemplateColumns: "1fr" }}>
                    <div className="dholera-form-group">
                      <label className="dholera-form-label">Full Name *</label>
                      <input
                        type="text"
                        className="dholera-form-input"
                        placeholder="Your name"
                        required
                        value={visitForm.name}
                        onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })}
                      />
                    </div>

                    <div className="dholera-form-group">
                      <label className="dholera-form-label">Contact Number *</label>
                      <input
                        type="tel"
                        className="dholera-form-input"
                        placeholder="+91 XXXXX XXXXX"
                        required
                        value={visitForm.phone}
                        onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value })}
                      />
                    </div>

                    <div className="dholera-form-group">
                      <label className="dholera-form-label">Target Development</label>
                      <select
                        className="dholera-form-select"
                        value={visitForm.project}
                        onChange={(e) => setVisitForm({ ...visitForm, project: e.target.value })}
                      >
                        <option value="Sangrilla Baghban (Kamiyala)">Sangrilla Baghban (96 Villa Plots)</option>
                        <option value="Sangrilla Meadows (Aakru)">Sangrilla Meadows (145 Villa Plots)</option>
                        <option value="Both Dholera Projects">Inspect Both Projects</option>
                      </select>
                    </div>

                    <div className="dholera-form-group">
                      <label className="dholera-form-label">Preferred Date</label>
                      <input
                        type="date"
                        className="dholera-form-input"
                        value={visitForm.date}
                        onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="dholera-form-submit-btn" style={{ marginTop: "16px" }}>
                    <span>Confirm Site Visit Request</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DholeraProjectsPage;
