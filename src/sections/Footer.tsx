import "../styles/footer.css";
import { Link } from "react-router-dom";

import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">

          {/* Column 1 */}
          <div className="footer-column">
            <h4>Properties</h4>
            <ul>
              <li><Link to="/commercial">Commercial</Link></li>
              <li><Link to="/residential">Residential</Link></li>
              <li><Link to="/plots">Plotting</Link></li>
              <li><Link to="/ready-property">Ready Property</Link></li>
              <li><Link to="/completed-projects">Completed Projects</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="footer-column">
            <h4>Collaborate</h4>
            <ul>
              <li><Link to="/propose-land">Propose Land</Link></li>
              <li><Link to="/propose-project">Propose Project</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>Careers</li>
              <li>
                <Link to="/articles">Articles</Link>
              </li>
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
              <a href="https://www.instagram.com/sangrillagroup" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>

              <a href="https://www.linkedin.com/in/sangrillagroup" target="_blank" rel="noreferrer">
                <FaLinkedinIn />
              </a>

              <a href="http://www.youtube.com/@sangrillagroup" target="_blank" rel="noreferrer">
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
      </div>
    </footer>
  );
};

export default Footer;