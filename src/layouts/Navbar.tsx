import { motion } from "framer-motion";
import { User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";


const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="navbar"
    >
      <div className="navbar-container">

        {/* LOGO */}
        <div className="logo">
          SANGRILLA
        </div>

        {/* MENU */}
        <div className="nav-menu">
          <Link to="/">Commercial</Link>
          <Link to="/">Residential</Link>
          <Link to="/">Plots</Link>
          <Link to="/">Services</Link>
          <Link to="/">Blogs</Link>
          <Link to="/">Career</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* ICONS */}
        <div className="nav-icons">
          <User size={20} className="icon" />
          <Menu size={20} className="icon" />
        </div>

      </div>
    </motion.nav>
  );
};

export default Navbar;