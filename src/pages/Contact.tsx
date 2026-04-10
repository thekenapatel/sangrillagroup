import { Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react";
import "../styles/contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="container">
        <header className="contact-header">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">
            Have a question or want to visit our sites? We're here to help you find your dream space.
          </p>
        </header>

        <div className="contact-grid">
          {/* Left Column: Form Placeholder */}
          <div className="contact-form-section">
            <div className="glass-card form-container">
              <h3>Send us a Message</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="input-group">
                  <input type="text" placeholder="Full Name" required />
                </div>
                <div className="input-group">
                  <input type="email" placeholder="Email Address" required />
                </div>
                <div className="input-group">
                  <textarea placeholder="How can we help you?" rows={5} required></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Contact Details */}
          <div className="contact-info-section">
            <div className="info-cards">
              {/* Email */}
              <div className="info-card">
                <div className="icon-box">
                  <Mail />
                </div>
                <div className="info-text">
                  <h3>Email Us</h3>
                  <p>sangrillagroup@gmail.com</p>
                  <a href="mailto:sangrillagroup@gmail.com">Send an email →</a>
                </div>
              </div>

              {/* Phone */}
              <div className="info-card">
                <div className="icon-box">
                  <Phone />
                </div>
                <div className="info-text">
                  <h3>Call Us</h3>
                  <p>Office: +91 99873 22645</p>
                  <a href="tel:+919987322645">Speak with us →</a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="info-card">
                <div className="icon-box">
                  <MessageSquare />
                </div>
                <div className="info-text">
                  <h3>WhatsApp</h3>
                  <p>Direct: +91 95377 02727</p>
                  <a href="https://wa.me/919537702727" target="_blank" rel="noreferrer">
                    Start a chat →
                  </a>
                </div>
              </div>

              {/* Office */}
              <div className="info-card">
                <div className="icon-box">
                  <MapPin />
                </div>
                <div className="info-text">
                  <h3>Visit Office</h3>
                  <p>
                    Sangrilla Group, The CBD Mall, Nr. Vaishnodevi Circle, Ahmedabad
                  </p>
                  <a href="https://share.google/NcvYGsqTMM12hqJ6N" target="_blank" rel="noreferrer">
                    Get directions →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;