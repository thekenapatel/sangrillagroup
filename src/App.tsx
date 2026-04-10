import { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Journey from "./sections/Journey";
import Lifestyle from "./sections/Lifestyle";
import UpcomingTeaser from "./sections/UpcomingTeaser";
import WhySangrilla from "./sections/WhySangrilla";
import CTABanner from "./sections/CTABanner";
import Footer from "./sections/Footer";
import Contact from "./pages/Contact";
import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";

// New Pages
import AboutUs from "./pages/AboutUs";
import Commercial from "./pages/Commercial";
import Residential from "./pages/Residential";
import Plots from "./pages/Plots";
import Services from "./pages/Services";
import Insights from "./pages/Insights";
import ReadyProperty from "./pages/ReadyProperty";
import CompletedProjects from "./pages/CompletedProjects";
import Articles from "./pages/Articles";
import ProposeLand from "./pages/ProposeLand";
import ProposeProject from "./pages/ProposeProject";
import RegisterVendor from "./pages/RegisterVendor";
import RegisterChannelPartner from "./pages/RegisterChannelPartner";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <Router basename="/">
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Projects />
              <Lifestyle />
              <UpcomingTeaser />
              <WhySangrilla />
              <Journey />
              <CTABanner />
            </>
          }
        />

        {/* Contact Page */}
        <Route path="/contact" element={<Contact />} />
        
        {/* Dynamic Pages from Navbar */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/commercial" element={<Commercial />} />
        <Route path="/residential" element={<Residential />} />
        <Route path="/plots" element={<Plots />} />
        <Route path="/services" element={<Services />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/ready-property" element={<ReadyProperty />} />
        <Route path="/completed-projects" element={<CompletedProjects />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/propose-land" element={<ProposeLand />} />
        <Route path="/propose-project" element={<ProposeProject />} />
        <Route path="/register-vendor" element={<RegisterVendor />} />
        <Route path="/register-channel-partner" element={<RegisterChannelPartner />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;