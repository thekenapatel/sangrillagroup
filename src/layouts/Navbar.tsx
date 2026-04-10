import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="navbar"
      >
        <div className="navbar-container">
          {/* LOGO */}
          <Link to="/" className="logo">
            SANGRILLA
          </Link>

          {/* DESKTOP MENU - Hidden on mobile */}
          <div className="nav-menu">
            <NavLink to="/commercial">Commercial</NavLink>
            <NavLink to="/residential">Residential</NavLink>
            <NavLink to="/plots">Plots</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/insights">Insights</NavLink>
            <NavLink to="/about-us">About Us</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          {/* RIGHT SIDE */}
          <div className="nav-icons">
            <div
              className="icon menu-btn"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </div>
          </div>
        </div>

        {/* FULL MENU DROPDOWN - Shivalik Style */}
        <div className={`full-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="menu-grid">
            {/* Column 1 */}
            <div className="menu-column">
              <Link to="/commercial" onClick={closeMobileMenu}>Commercial</Link>
              <Link to="/residential" onClick={closeMobileMenu}>Residential</Link>
              <Link to="/plots" onClick={closeMobileMenu}>Plots</Link>
            </div>

            {/* Column 2 */}
            <div className="menu-column">
              <Link to="/services" onClick={closeMobileMenu}>Services</Link>
              <Link to="/insights" onClick={closeMobileMenu}>Insights</Link>
            </div>

            {/* Column 3 */}
            <div className="menu-column">
              <Link to="/ready-property" onClick={closeMobileMenu}>Ready Property</Link>
              <Link to="/services" onClick={closeMobileMenu}>Services</Link>
              <Link to="/completed-projects" onClick={closeMobileMenu}>Completed Projects</Link>
            </div>

            {/* Column 4 */}
            <div className="menu-column">
              <Link to="/about-us" onClick={closeMobileMenu}>About Us</Link>
              <Link to="/articles" onClick={closeMobileMenu}>Articles</Link>
              <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
            </div>

            {/* Column 5 */}
            <div className="menu-column">
              <Link to="/propose-land" onClick={closeMobileMenu}>Propose Land</Link>
              <Link to="/propose-project" onClick={closeMobileMenu}>Propose Project</Link>
              <Link to="/register-vendor" onClick={closeMobileMenu}>Register as a Vendor</Link>
              <Link to="/register-channel-partner" onClick={closeMobileMenu}>Register as a Channel Partner</Link>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;