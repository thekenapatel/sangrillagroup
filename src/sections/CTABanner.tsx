import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/cta.css";

const CTABanner: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    interestedIn: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    const message = `Hello Sangrilla Group, I am interested in a project!%0A%0A` +
      `*Full Name:* ${formData.name}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Interested In:* ${formData.interestedIn.charAt(0).toUpperCase() + formData.interestedIn.slice(1)}%0A%0A` +
      `Please provide more details regarding current availability and pricing.`;

    const whatsappNumber = "+919537702727";
    const waUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Open WhatsApp in a new tab
    window.open(waUrl, "_blank");

    // Clear form inputs
    setFormData({
      name: "",
      phone: "",
      interestedIn: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="cta-banner">
      <div className="cta-container">
        
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to Find Your <br /> Dream Home?</h2>
          <p>
            Connect with our experts today for a personalized consultation and 
            exclusive access to our premium residential and commercial projects.
          </p>
          
          <div className="cta-actions">
            <a 
              href="https://wa.me/+919737227999" 
              className="btn-whatsapp" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.886.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.89 4.44-9.892 9.886-.001 2.125.593 3.456 1.574 5.111l-.973 3.548 3.653-.959zm12.339-6.421c-.33-.165-1.951-.963-2.253-1.073-.303-.11-.523-.165-.743.165-.22.33-.853 1.073-1.046 1.321-.192.248-.386.275-.715.11-.33-.165-1.391-.513-2.651-1.636-.98-.874-1.641-1.953-1.833-2.283-.192-.33-.021-.508.144-.672.148-.148.33-.386.496-.578.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.742-1.789-1.018-2.434-.268-.626-.54-.54-.743-.55-.191-.01-.413-.012-.633-.012-.22 0-.578.083-.88.413-.303.33-1.155 1.129-1.155 2.752 0 1.623 1.183 3.192 1.348 3.413.165.22 2.328 3.555 5.639 4.986.788.341 1.403.543 1.883.696.791.252 1.511.216 2.08.132.634-.093 1.952-.798 2.227-1.568.275-.77.275-1.43.193-1.568-.083-.138-.303-.22-.633-.385z"/></svg>
                WhatsApp Us
            </a>
            <Link to="/contact" className="btn-book">Book Site Visit</Link>
          </div>
        </motion.div>

        <div className="cta-form-container">
          <form className="cta-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name"
              placeholder="Full Name" 
              required 
              value={formData.name}
              onChange={handleChange}
            />
            <input 
              type="tel" 
              name="phone"
              placeholder="Phone Number" 
              required 
              value={formData.phone}
              onChange={handleChange}
            />
            <select 
              name="interestedIn"
              required 
              value={formData.interestedIn}
              onChange={handleChange}
            >
              <option value="" disabled>Interested In</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="plots">Land/Plots</option>
            </select>
            <button type="submit" className="btn-submit">Inquire Now</button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default CTABanner;
