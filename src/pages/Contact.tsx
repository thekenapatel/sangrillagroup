import { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react";
import "../styles/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber = "919737227999";
    const text = `*New Inquiry from Sangrilla Group Website*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Message:* ${formData.message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, "_blank");

    // Clear inputs
    setFormData({ name: "", email: "", message: "" });
  };

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
          {/* Left Column: Form Section */}
          <div className="contact-form-section">
            <div className="glass-card form-container">
              <h3>Send us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <textarea
                    placeholder="How can we help you?"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
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
                  <p>Office: +91 97372 27999</p>
                  <a href="tel:+919737227999">Speak with us →</a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="info-card">
                <div className="icon-box">
                  <MessageSquare />
                </div>
                <div className="info-text">
                  <h3>WhatsApp</h3>
                  <p>Direct: +91 97372 27999</p>
                  <a href="https://wa.me/919737227999" target="_blank" rel="noreferrer">
                    Start a chat →
                  </a>
                </div>
              </div>

              {/* Office */}
              <div className="info-card">
                <div className="icon-box">
                  <MapPin />
                </div>
                <div className="info-text address-block">
                  <h3>Sales Office Address</h3>
                  <p>
                    A/507, Money Plant High Street, Jagatpur, S.G. Highway, Gota, Ahmedabad – 382470, Gujarat, India.
                  </p>
                  <a href="https://maps.app.goo.gl/rPaedTaKUW62Se6V9" target="_blank" rel="noreferrer">
                    Get directions →
                  </a>
                </div>
                <div className="info-text address-block">
                  <h3>Registered Office</h3>
                  <p>
                    417, Sangrilla Group, The CBD Mall, Nr. Vaishnodevi Circle, Ahmedabad - 382421, Gujarat, India.
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