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
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Estate from "./pages/Estate";
import ProjectDetail from "./pages/ProjectDetail";
import UnderConstructionProjects from "./pages/UnderConstructionProjects";
import SangrillaMeadowsDetail from "./pages/SangrillaMeadowsDetail";

import Chatbot from "./components/ChatBot AI/Chatbot";

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    // Show splash if on root path
    return window.location.pathname === "/" || window.location.pathname === "";
  });

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
        <Route path="/under-construction-projects" element={<UnderConstructionProjects />} />
        <Route path="/under-construction" element={<UnderConstructionProjects />} />
        <Route path="/project/sangrilla-meadows" element={<SangrillaMeadowsDetail />} />
        <Route path="/under-construction/sangrilla-meadows" element={<SangrillaMeadowsDetail />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/propose-land" element={<ProposeLand />} />
        <Route path="/propose-project" element={<ProposeProject />} />
        <Route path="/register-vendor" element={<RegisterVendor />} />
        <Route path="/register-channel-partner" element={<RegisterChannelPartner />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/estate" element={<Estate />} />
        <Route path="/project/:id" element={<ProjectDetail />} />

      </Routes>

      <Chatbot />
      <Footer />
    </Router>
  );
}

export default App;