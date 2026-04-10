import React from "react";
import { motion } from "framer-motion";
import "../styles/cta.css";

const CTABanner: React.FC = () => {
  return (
    <section className="cta-banner">
      <div className="cta-container">
        
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Ready to Find Your <br /> Dream Home?</h2>
          <p>
            Connect with our experts today for a personalized consultation and 
            exclusive access to our premium residential and commercial projects.
          </p>
          
          <div className="cta-actions">
            <a 
              href="https://wa.me/+919537702727" 
              className="btn-whatsapp" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.886.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.89 4.44-9.892 9.886-.001 2.125.593 3.456 1.574 5.111l-.973 3.548 3.653-.959zm12.339-6.421c-.33-.165-1.951-.963-2.253-1.073-.303-.11-.523-.165-.743.165-.22.33-.853 1.073-1.046 1.321-.192.248-.386.275-.715.11-.33-.165-1.391-.513-2.651-1.636-.98-.874-1.641-1.953-1.833-2.283-.192-.33-.021-.508.144-.672.148-.148.33-.386.496-.578.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.742-1.789-1.018-2.434-.268-.626-.54-.54-.743-.55-.191-.01-.413-.012-.633-.012-.22 0-.578.083-.88.413-.303.33-1.155 1.129-1.155 2.752 0 1.623 1.183 3.192 1.348 3.413.165.22 2.328 3.555 5.639 4.986.788.341 1.403.543 1.883.696.791.252 1.511.216 2.08.132.634-.093 1.952-.798 2.227-1.568.275-.77.275-1.43.193-1.568-.083-.138-.303-.22-.633-.385z"/></svg>
                WhatsApp Us
            </a>
            <button className="btn-book">Book Site Visit</button>
          </div>
        </motion.div>

        <motion.div 
          className="cta-form-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form className="cta-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Full Name" required />
            <input type="tel" placeholder="Phone Number" required />
            <select required defaultValue="">
              <option value="" disabled>Interested In</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="plots">Land/Plots</option>
            </select>
            <button type="submit" className="btn-submit">Inquire Now</button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default CTABanner;
