import React, { useState, useMemo, useEffect } from "react";
import type { AvirahiPlotUnit } from "../../data/avirahiCityData";
import { AVIRAHI_PLOTS, AVIRAHI_CITY_META } from "../../data/avirahiCityData";
import AvirahiMapEngine from "./AvirahiMapEngine";

interface AvirahiPlotterProps {
  initialPlotNumber?: number;
  className?: string;
}

export const AvirahiPlotter: React.FC<AvirahiPlotterProps> = ({
  initialPlotNumber,
  className = ""
}) => {
  const [selectedPlot, setSelectedPlot] = useState<AvirahiPlotUnit | null>(null);

  // Read URL query parameters (?plot=826)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plotParam = params.get("plot");
    const targetNum = initialPlotNumber || (plotParam ? parseInt(plotParam, 10) : null);

    if (targetNum) {
      const match = AVIRAHI_PLOTS.find((p) => p.plotNumber === targetNum);
      if (match) {
        setSelectedPlot(match);
      }
    }
  }, [initialPlotNumber]);

  // All plot IDs set
  const allPlotIds = useMemo(() => new Set(AVIRAHI_PLOTS.map((p) => p.id)), []);

  return (
    <div className={`fixed inset-0 w-screen h-screen bg-slate-950 overflow-hidden select-none font-sans z-40 ${className}`}>
      <AvirahiMapEngine
        plots={AVIRAHI_PLOTS}
        filteredPlotIds={allPlotIds}
        selectedPlot={selectedPlot}
        onSelectPlot={setSelectedPlot}
      />
    </div>
  );
};

export default AvirahiPlotter;
