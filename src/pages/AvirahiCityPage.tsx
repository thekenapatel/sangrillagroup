import React, { useEffect } from "react";
import AvirahiPlotter from "../components/AvirahiPlotter/AvirahiPlotter";
import ErrorBoundary from "../components/ErrorBoundary";

export const AvirahiCityPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Avirahi City | Residential Plots in Dholera, Ahmedabad | Sangrilla Group";
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-slate-950 overflow-hidden z-40">
      <ErrorBoundary fallbackTitle="Avirahi City Interactive GIS Plotter">
        <AvirahiPlotter />
      </ErrorBoundary>
    </div>
  );
};

export default AvirahiCityPage;
