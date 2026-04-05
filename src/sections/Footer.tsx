import "../styles/footer.css";
import { Link } from "react-router-dom";

import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { color } from "motion-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Column 1 */}
        <div className="footer-column">
          <h4>Properties</h4>
          <ul>
            <li>Commercial</li>
            <li>Residential</li>
            <li>Plotting</li>
            <li>Ready Property</li>
            <li>Completed Projects</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="footer-column">
          <h4>Business</h4>
          <ul>
            <li>Furniture</li>
            <li>Institute</li>
            <li>Fund</li>
            <li>Tech</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-column">
          <h4>Engage</h4>
          <ul>
            <li>WIRE</li>
            <li>Pockets</li>
            <li>Events</li>
            <li>Propose Land</li>
            <li>Propose Project</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Articles</li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">

        <div className="footer-bottom-left">

          {/* 🔥 Social Icons */}
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>

            <a href="https://www.instagram.com/sangrillagroup" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>

            <a href="https://www.linkedin.com/in/sangrillagroup" target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>

            <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
          </div>

          <p>© 2026 Sangrilla Group</p>

        </div>

        <div className="footer-links">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;