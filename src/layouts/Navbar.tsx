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
            <NavLink to="/project/sangrilla-meadows">DHOLERA</NavLink>
            <NavLink to="/projects">PROJECTS</NavLink>
            <NavLink to="/register-channel-partner">CHANNEL PARTNER</NavLink>
            <NavLink to="/about-us">ABOUT US</NavLink>
            <NavLink to="/contact">CONTACT</NavLink>
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
              <Link to="/project/sangrilla-meadows" onClick={closeMobileMenu}>DHOLERA</Link>
              <Link to="/projects" onClick={closeMobileMenu}>PROJECTS</Link>
              <Link to="/register-channel-partner" onClick={closeMobileMenu}>CHANNEL PARTNER</Link>
              <Link to="/about-us" onClick={closeMobileMenu}>ABOUT US</Link>
              <Link to="/contact" onClick={closeMobileMenu}>CONTACT</Link>
            </div>

            {/* Column 2 */}
            <div className="menu-column">
              <Link to="/commercial" onClick={closeMobileMenu}>Commercial</Link>
              <Link to="/residential" onClick={closeMobileMenu}>Residential</Link>
              <Link to="/plots" onClick={closeMobileMenu}>Plots</Link>
              <Link to="/services" onClick={closeMobileMenu}>Services</Link>
              <Link to="/insights" onClick={closeMobileMenu}>Insights</Link>
            </div>

            {/* Column 3 */}
            <div className="menu-column">
              <Link to="/under-construction-projects" onClick={closeMobileMenu}>Under Construction</Link>
              <Link to="/ready-property" onClick={closeMobileMenu}>Ready Property</Link>
              <Link to="/completed-projects" onClick={closeMobileMenu}>Completed Projects</Link>
            </div>

            {/* Column 4 */}
            <div className="menu-column">
              <Link to="/articles" onClick={closeMobileMenu}>Articles</Link>
              <Link to="/propose-land" onClick={closeMobileMenu}>Propose Land</Link>
              <Link to="/propose-project" onClick={closeMobileMenu}>Propose Project</Link>
              <Link to="/register-vendor" onClick={closeMobileMenu}>Register as a Vendor</Link>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;