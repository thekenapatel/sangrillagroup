import React, { useEffect } from "react";
import MasterPlanViewer from "../components/MasterPlan/MasterPlanViewer";
import ErrorBoundary from "../components/ErrorBoundary";

export const MasterPlanPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Sangrilla Meadows Plotter | Interactive Digital Master Plan | Dholera SIR";
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-slate-950 overflow-hidden z-40">
      <ErrorBoundary fallbackTitle="Interactive Master Plan & Plot Viewer">
        <MasterPlanViewer defaultFullscreen={true} className="w-full h-full rounded-none border-none shadow-none" />
      </ErrorBoundary>
    </div>
  );
};

export default MasterPlanPage;
