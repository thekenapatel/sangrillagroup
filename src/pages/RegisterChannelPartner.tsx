import React, { useState } from "react";
import {
  TrendingUp,
  ShieldCheck,
  UserCheck,
  FileText,
  User,
  Building,
  Phone,
  Mail,
  Award,
  MapPin,
  CheckCircle2,
  Sparkles,
  Lock
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { saveContactDetails } from "../services/mongoService";
import "../styles/channel-partner.css";

interface FormData {
  fullName: string;
  agencyName: string;
  mobileNumber: string;
  email: string;
  reraNumber: string;
  location: string;
  customLocation: string;
}

interface FormErrors {
  fullName?: string;
  agencyName?: string;
  mobileNumber?: string;
  email?: string;
  location?: string;
}

const POPULAR_LOCATIONS = [
  "Ahmedabad",
  "Dholera SIR / Bhal Region",
  "Surat",
  "Vadodara",
  "Rajkot",
  "Gandhinagar",
  "Mumbai / MMR",
  "Delhi NCR",
  "Bengaluru",
  "Pune",
  "Other"
];

const DEFAULT_WHATSAPP_MESSAGE =
  "Hello Sangrilla Team, I would like to register as a Channel Partner. Please share the onboarding details and project portfolio.";

const DEFAULT_WHATSAPP_URL = `https://wa.me/919737227999?text=${encodeURIComponent(
  DEFAULT_WHATSAPP_MESSAGE
)}`;

const RegisterChannelPartner: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    agencyName: "",
    mobileNumber: "",
    email: "",
    reraNumber: "",
    location: "Ahmedabad",
    customLocation: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registrationRef, setRegistrationRef] = useState<string>("");
  const [whatsappUrl, setWhatsappUrl] = useState<string>("");

  const formatWhatsAppMessage = (data: FormData, loc: string): string => {
    const reraDisplay = data.reraNumber.trim() ? data.reraNumber.trim() : "N/A";
    return (
      `Hello Sangrilla Team, I would like to register as a Channel Partner. Here are my details:\n\n` +
      `• Name: ${data.fullName.trim()}\n` +
      `• Firm: ${data.agencyName.trim()}\n` +
      `• Mobile: ${data.mobileNumber.trim()}\n` +
      `• Email: ${data.email.trim()}\n` +
      `• RERA No: ${reraDisplay}\n` +
      `• Operating Location: ${loc}`
    );
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name (at least 2 characters).";
    }

    if (!formData.agencyName.trim() || formData.agencyName.trim().length < 2) {
      errs.agencyName = "Please enter your agency or firm name.";
    }

    const cleanMobile = formData.mobileNumber.replace(/\D/g, "");
    if (!cleanMobile || cleanMobile.length < 10) {
      errs.mobileNumber = "Please enter a valid 10-digit mobile number.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (formData.location === "Other" && !formData.customLocation.trim()) {
      errs.location = "Please enter your operating city or location.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const finalLocation =
      formData.location === "Other"
        ? formData.customLocation.trim()
        : formData.location;

    const refId = `CP-${Math.floor(100000 + Math.random() * 900000)}`;
    const rawMessage = formatWhatsAppMessage(formData, finalLocation);
    const targetWaUrl = `https://wa.me/919737227999?text=${encodeURIComponent(rawMessage)}`;

    try {
      // 1. Submit through resilient lead capture service first
      await saveContactDetails({
        name: formData.fullName.trim(),
        contactNumber: formData.mobileNumber.trim(),
        email: formData.email.trim(),
        source: "Channel Partner Network",
        project: `Firm: ${formData.agencyName.trim()} | City: ${finalLocation}${
          formData.reraNumber.trim() ? " | RERA: " + formData.reraNumber.trim() : ""
        } | Ref: ${refId}`
      });

      // 2. Persist full channel partner details in localStorage
      try {
        const storedPartners = JSON.parse(
          localStorage.getItem("sangrilla_channel_partners") || "[]"
        );
        storedPartners.push({
          ...formData,
          resolvedLocation: finalLocation,
          refId,
          submittedAt: new Date().toISOString()
        });
        localStorage.setItem(
          "sangrilla_channel_partners",
          JSON.stringify(storedPartners)
        );
      } catch (storageErr) {
        console.warn("[ChannelPartner] LocalStorage warning:", storageErr);
      }
    } catch (err) {
      console.error("[ChannelPartner] Registration lead save error:", err);
    } finally {
      // 3. Automatically redirect to WhatsApp in a new tab
      window.open(targetWaUrl, "_blank");

      setRegistrationRef(refId);
      setWhatsappUrl(targetWaUrl);
      setIsSuccess(true);
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      agencyName: "",
      mobileNumber: "",
      email: "",
      reraNumber: "",
      location: "Ahmedabad",
      customLocation: ""
    });
    setErrors({});
    setIsSuccess(false);
    setRegistrationRef("");
    setWhatsappUrl("");
  };

  const resolvedLocation =
    formData.location === "Other"
      ? formData.customLocation.trim()
      : formData.location;

  return (
    <div className="channel-partner-page">
      <div className="cp-container">
        <div className="cp-split-layout">
          {/* ================= LEFT COLUMN: HERO & 4 BENEFITS ================= */}
          <div className="cp-left-content">
            {/* 1. Hero Section */}
            <div className="cp-badge-wrapper">
              <span className="cp-badge">
                {/* <span className="cp-badge-dot" /> */}
                SANGRILLA PARTNER NETWORK
              </span>
            </div>

            <h1 className="cp-hero-title">
              Grow Your Real Estate Business with Sangrilla Group
            </h1>

            <p className="cp-hero-subtitle">
              Join our exclusive Channel Partner Network. Gain priority access
              to premium Dholera SIR smart city plots and high-appreciation
              residential/commercial inventory with seamless payouts and 360°
              sales support.
            </p>

            {/* Quick Trust Highlights */}
            <div className="cp-trust-row">
              <div className="cp-trust-pill">
                <ShieldCheck size={16} />
                <span>100% Clear Titles (7/12)</span>
              </div>
              <div className="cp-trust-pill">
                <TrendingUp size={16} />
                <span>Direct Developer Payouts</span>
              </div>
              <div className="cp-trust-pill">
                <UserCheck size={16} />
                <span>Dedicated Relationship Manager</span>
              </div>
            </div>

            {/* 2. Benefits Grid (4 Cards) */}
            <div className="cp-benefits-header">
              <span>Why Partner With Us</span>
              <hr />
            </div>

            <div className="cp-benefits-grid">
              {/* Card 1: High & Timely Payouts */}
              <div className="cp-benefit-card">
                <div className="cp-benefit-card-top">
                  <div className="cp-benefit-icon-box">
                    <TrendingUp size={24} />
                  </div>
                  <span className="cp-card-badge-num">01</span>
                </div>
                <h3 className="cp-benefit-title">High & Timely Payouts</h3>
                <p className="cp-benefit-desc">
                  Transparent commission structures paid directly on agreement
                  execution with zero hidden delays.
                </p>
              </div>

              {/* Card 2: 100% RERA & Title-Clear Projects */}
              <div className="cp-benefit-card">
                <div className="cp-benefit-card-top">
                  <div className="cp-benefit-icon-box">
                    <ShieldCheck size={24} />
                  </div>
                  <span className="cp-card-badge-num">02</span>
                </div>
                <h3 className="cp-benefit-title">
                  100% RERA & Title-Clear Projects
                </h3>
                <p className="cp-benefit-desc">
                  Sell with absolute confidence. All Sangrilla developments
                  feature clear 7/12 titles and full regulatory compliance.
                </p>
              </div>

              {/* Card 3: Dedicated Partner Support */}
              <div className="cp-benefit-card">
                <div className="cp-benefit-card-top">
                  <div className="cp-benefit-icon-box">
                    <UserCheck size={24} />
                  </div>
                  <span className="cp-card-badge-num">03</span>
                </div>
                <h3 className="cp-benefit-title">Dedicated Partner Support</h3>
                <p className="cp-benefit-desc">
                  Get paired with a dedicated Channel Partner Manager to assist
                  you with client site visits, documentation, and deal closure.
                </p>
              </div>

              {/* Card 4: Marketing & Sales Collateral */}
              <div className="cp-benefit-card">
                <div className="cp-benefit-card-top">
                  <div className="cp-benefit-icon-box">
                    <FileText size={24} />
                  </div>
                  <span className="cp-card-badge-num">04</span>
                </div>
                <h3 className="cp-benefit-title">Marketing & Sales Collateral</h3>
                <p className="cp-benefit-desc">
                  Access high-resolution brochures, 3D walkthroughs, floor
                  plans, and digital campaign kits ready to share with your
                  investors.
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Connect Card */}
            {/* <div className="cp-direct-connect-card">
              <div className="cp-direct-connect-left">
                <div className="cp-direct-connect-icon">
                  <FaWhatsapp size={26} />
                </div>
                <div className="cp-direct-connect-info">
                  <h4>Direct Alliance Desk</h4>
                  <p>
                    Prefer to speak directly? Chat with our Channel Sales Team on
                    WhatsApp for instant partner onboarding and marketing kits.
                  </p>
                </div>
              </div>
              <a
                href={DEFAULT_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cp-direct-connect-btn"
              >
                <FaWhatsapp size={16} />
                <span>Chat on WhatsApp</span>
              </a>
            </div> */}
          </div>

          {/* ================= RIGHT COLUMN: REGISTRATION FORM ================= */}
          <div className="cp-right-content">
            <div className="cp-form-card">
              {!isSuccess ? (
                <>
                  <div className="cp-form-header">
                    <div className="cp-form-header-badge">
                      {/* <Sparkles size={13} /> */}
                      <span>Alliance Onboarding</span>
                    </div>
                    <h2 className="cp-form-title">
                      Become an Authorized Channel Partner
                    </h2>
                    <p className="cp-form-subtitle">
                      Complete your registration below. Our Channel Alliance team
                      will activate your partner privileges within 24 hours.
                    </p>
                  </div>

                  <form className="cp-form" onSubmit={handleSubmit} noValidate>
                    {/* 1. Full Name / Contact Person */}
                    <div className="cp-field-group">
                      <label className="cp-label" htmlFor="fullName">
                        Full Name / Contact Person *
                      </label>
                      <div className="cp-input-wrap">
                        <User className="cp-input-icon" size={18} />
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          className="cp-input"
                          placeholder="e.g. Dev Patel"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      {errors.fullName && (
                        <span className="cp-field-error">{errors.fullName}</span>
                      )}
                    </div>

                    {/* 2. Agency / Firm Name */}
                    <div className="cp-field-group">
                      <label className="cp-label" htmlFor="agencyName">
                        Agency / Firm Name *
                      </label>
                      <div className="cp-input-wrap">
                        <Building className="cp-input-icon" size={18} />
                        <input
                          id="agencyName"
                          name="agencyName"
                          type="text"
                          className="cp-input"
                          placeholder="e.g. Anantaa Realty Ventures"
                          value={formData.agencyName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      {errors.agencyName && (
                        <span className="cp-field-error">
                          {errors.agencyName}
                        </span>
                      )}
                    </div>

                    {/* 3 & 4. Mobile Number and Email Address (Row) */}
                    <div className="cp-form-row">
                      <div className="cp-field-group">
                        <label className="cp-label" htmlFor="mobileNumber">
                          Mobile Number *
                        </label>
                        <div className="cp-input-wrap">
                          <Phone className="cp-input-icon" size={18} />
                          <input
                            id="mobileNumber"
                            name="mobileNumber"
                            type="tel"
                            className="cp-input"
                            placeholder="10-digit number"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        {errors.mobileNumber && (
                          <span className="cp-field-error">
                            {errors.mobileNumber}
                          </span>
                        )}
                      </div>

                      <div className="cp-field-group">
                        <label className="cp-label" htmlFor="email">
                          Email Address *
                        </label>
                        <div className="cp-input-wrap">
                          <Mail className="cp-input-icon" size={18} />
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className="cp-input"
                            placeholder="partner@firm.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        {errors.email && (
                          <span className="cp-field-error">{errors.email}</span>
                        )}
                      </div>
                    </div>

                    {/* 5. RERA Registration Number (Optional) */}
                    <div className="cp-field-group">
                      <label className="cp-label" htmlFor="reraNumber">
                        <span>RERA Registration Number</span>
                        <span className="cp-optional-tag">(Optional)</span>
                      </label>
                      <div className="cp-input-wrap">
                        <Award className="cp-input-icon" size={18} />
                        <input
                          id="reraNumber"
                          name="reraNumber"
                          type="text"
                          className="cp-input"
                          placeholder="e.g. PR/GJ/AHMEDABAD/..."
                          value={formData.reraNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {/* 6. City / Primary Operating Location */}
                    <div className="cp-field-group">
                      <label className="cp-label" htmlFor="location">
                        City / Primary Operating Location *
                      </label>
                      <div className="cp-input-wrap">
                        <MapPin className="cp-input-icon" size={18} />
                        <select
                          id="location"
                          name="location"
                          className="cp-select"
                          value={formData.location}
                          onChange={handleInputChange}
                        >
                          {POPULAR_LOCATIONS.map((loc) => (
                            <option key={loc} value={loc}>
                              {loc}
                            </option>
                          ))}
                        </select>
                      </div>

                      {formData.location === "Other" && (
                        <div className="cp-input-wrap" style={{ marginTop: "8px" }}>
                          <MapPin className="cp-input-icon" size={18} />
                          <input
                            type="text"
                            name="customLocation"
                            className="cp-input"
                            placeholder="Enter your operating city/region"
                            value={formData.customLocation}
                            onChange={handleInputChange}
                          />
                        </div>
                      )}
                      {errors.location && (
                        <span className="cp-field-error">{errors.location}</span>
                      )}
                    </div>

                    {/* 7. Submit Button */}
                    <button
                      type="submit"
                      className="cp-submit-btn"
                      disabled={isSubmitting}
                      id="register-channel-partner-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="cp-spinner" />
                          <span>Connecting to WhatsApp...</span>
                        </>
                      ) : (
                        <>
                          <FaWhatsapp className="cp-wa-icon" size={20} />
                          <span>Register via WhatsApp</span>
                        </>
                      )}
                    </button>

                    <div className="cp-form-footer-note">
                      <Lock size={12} />
                      <span>
                        Verified Developer Channel • Direct Agreement & Transparent Payouts
                      </span>
                    </div>

                    {/* Direct Open WhatsApp Link with Default Chat */}
                    <div className="cp-direct-whatsapp-wrap">
                      <div className="cp-direct-wa-divider">
                        <span>Or connect directly</span>
                      </div>
                      <a
                        href={DEFAULT_WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cp-direct-wa-link"
                      >
                        <FaWhatsapp size={18} />
                        <span>Direct Chat on WhatsApp (+91 97372 27999)</span>
                      </a>
                      <p className="cp-direct-wa-hint">
                        Prefer to talk right away? Tap above to start an instant WhatsApp conversation.
                      </p>
                    </div>
                  </form>
                </>
              ) : (
                /* Success Confirmation State */
                <div className="cp-success-card">
                  <div className="cp-success-icon-wrap">
                    <CheckCircle2 size={38} />
                  </div>
                  <h2 className="cp-success-title">Application Submitted!</h2>
                  <p className="cp-success-desc">
                    Thank you, <strong>{formData.fullName}</strong>. Your partner
                    registration for <strong>{formData.agencyName}</strong> has
                    been recorded and WhatsApp has been initiated.
                  </p>

                  <div className="cp-success-summary">
                    <div className="cp-summary-item">
                      <span className="cp-summary-label">Reference ID:</span>
                      <span className="cp-summary-val">{registrationRef}</span>
                    </div>
                    <div className="cp-summary-item">
                      <span className="cp-summary-label">Mobile:</span>
                      <span className="cp-summary-val">{formData.mobileNumber}</span>
                    </div>
                    <div className="cp-summary-item">
                      <span className="cp-summary-label">Operating City:</span>
                      <span className="cp-summary-val">{resolvedLocation}</span>
                    </div>
                    <div className="cp-summary-item">
                      <span className="cp-summary-label">Status:</span>
                      <span className="cp-summary-val" style={{ color: "#10b981" }}>
                        WhatsApp Dispatch Active
                      </span>
                    </div>
                  </div>

                  <div className="cp-success-actions">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cp-wa-btn"
                    >
                      <FaWhatsapp size={20} />
                      <span>Chat Directly on WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      className="cp-reset-btn"
                      onClick={handleReset}
                    >
                      Register Another Associate / Partner
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterChannelPartner;
