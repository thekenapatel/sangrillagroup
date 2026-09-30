import { motion } from "framer-motion";
import "../styles/journey.css";

const Journey = () => {
  return (
    <section className="journey-section">
      <div className="journey-container">
        
        {/* Left Side: Massive Title and Hero Tagline */}
        <motion.div 
          className="journey-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Our Journey & <br /> Achievements</h2>
          <p className="journey-intro">
            From humble beginnings in 2000 to becoming a reputed name in real estate development. 
            Driven by a strong vision to create not just buildings, but happy and prosperous communities for generations to come.
          </p>
          <div className="journey-tagline">
            Your Dream.<br /> Our Commitment.
          </div>
        </motion.div>

        {/* Right Side: Key Achievements & Timeline formatting */}
        <div className="journey-stats">
          
          <div className="stat-item">
            <div className="stat-metric">25+ Years</div>
            <p>For over two decades, <strong>SANGRILLA</strong> has been a trusted name in construction, transforming dreams into reality since 2000.</p>
          </div>

          <div className="stat-item">
            <div className="stat-metric">10 lakh+ sq. ft.</div>
            <p>Proudly developed massive expanses of premium property, offering a combination of <strong>residential bungalows, townships, apartments & commercial spaces</strong>.</p>
          </div>

          <div className="stat-item">
            <div className="stat-metric">1000+ Families</div>
            <p>Deeply trusted by thousands across Gujarat, delivering quality, trust, and timely execution across absolutely every single project.</p>
          </div>

          <div className="stat-item">
            <div className="stat-metric">Always Building</div>
            <p>We look toward the future with multiple active sites, spearheaded by our flagship project currently under construction – <strong>Sangrilla Meadows</strong>.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Journey;
