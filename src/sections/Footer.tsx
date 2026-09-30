import "../styles/footer.css";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedinIn, FaYoutube, FaFacebook } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          {/* Column 1: Properties */}
          <div className="footer-column">
            {/* <h4>Properties</h4> */}
            <ul>
              <li><Link to="/commercial">Commercial</Link></li>
              <li><Link to="/residential">Residential</Link></li>
              <li><Link to="/plots">Plotting</Link></li>
              <li><Link to="/ready-property">Ready Property</Link></li>
              <li><Link to="/completed-projects">Completed Projects</Link></li>
              <li><Link to="/estate" className="estate-brand-link">Estate</Link></li>
            </ul>
          </div>

          {/* Column 2: Collaborate */}
          <div className="footer-column">
            {/* <h4>Collaborate</h4> */}
            <ul>
              <li><Link to="/propose-land">Propose Land</Link></li>
              <li><Link to="/propose-project">Propose Project</Link></li>
              <li><Link to="/register-vendor">Register as a Vendor</Link></li>
              <li><Link to="/register-channel-partner">Register as a Channel Partner</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="footer-column">
            {/* <h4>Company</h4> */}
            <ul>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/articles">Articles</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>



        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-main">
            <div className="footer-brand-info">
              <div className="social-icons">
                <a href="https://www.instagram.com/sangrillagroup" target="_blank" rel="noreferrer"><FaInstagram /></a>
                <a href="https://www.facebook.com/sangrillagroup" target="_blank" rel="noreferrer"><FaFacebook /></a>
                <a href="https://www.linkedin.com/in/sangrillagroup" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
                <a href="https://www.youtube.com/@sangrillagroup" target="_blank" rel="noreferrer"><FaYoutube /></a>
              </div>
              <p className="copyright">© 2026 Sangrilla Group</p>
            </div>
          </div>

          <div className="footer-legal">
            <div className="legal-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-use">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
