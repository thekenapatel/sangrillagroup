import React from "react";
import {
  Layers,
  Home,
  Crown,
  Info,
  ChevronRight,
  Sparkles
} from "lucide-react";

export type MasterPlanNavLevel = "master" | "residential" | "villa" | "detail";

interface MasterPlanNavigationProps {
  currentLevel: MasterPlanNavLevel;
  onSelectLevel: (level: MasterPlanNavLevel) => void;
  selectedPlotNumber?: number | null;
  selectedPlotType?: string | null;
  totalPlotsCount: number;
  residentialCount: number;
  villaCount: number;
}

export const MasterPlanNavigation: React.FC<MasterPlanNavigationProps> = ({
  currentLevel,
  onSelectLevel,
  selectedPlotNumber,
  selectedPlotType,
  totalPlotsCount,
  residentialCount,
  villaCount
}) => {
  return (
    <div className="w-full bg-slate-950/90 border-b border-slate-800/80 px-3 sm:px-6 py-2.5 backdrop-blur-md z-30 flex items-center justify-between gap-3 overflow-x-auto select-none">
      {/* 4-Tier Interactive Navigation Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Tier 1: Master Plan */}
        <button
          onClick={() => onSelectLevel("master")}
          className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            currentLevel === "master"
              ? "bg-gradient-to-r from-amber-500/20 via-amber-400/15 to-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10"
              : "bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800/80"
          }`}
          title="Explore Full Master Plan Layout"
        >
          <Layers size={14} className={currentLevel === "master" ? "text-amber-400" : "text-slate-400"} />
          <span>Master Layout</span>
          <span className="text-[10px] bg-slate-800/90 px-1.5 py-0.2 rounded-full text-slate-300 border border-slate-700/60 font-semibold">
            {totalPlotsCount}
          </span>
        </button>

        <ChevronRight size={13} className="text-slate-600 shrink-0 hidden sm:inline" />

        {/* Tier 2: Residential Plots */}
        <button
          onClick={() => onSelectLevel("residential")}
          className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            currentLevel === "residential"
              ? "bg-gradient-to-r from-emerald-500/20 via-emerald-400/15 to-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/10"
              : "bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800/80"
          }`}
          title="Filter and highlight 99 Residential Plots"
        >
          <Home size={14} className={currentLevel === "residential" ? "text-emerald-400" : "text-slate-400"} />
          <span>Residential Plots</span>
          <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-1.5 py-0.2 rounded-full border border-emerald-500/30 font-semibold">
            {residentialCount}
          </span>
        </button>

        <ChevronRight size={13} className="text-slate-600 shrink-0 hidden sm:inline" />

        {/* Tier 3: Luxury Villas */}
        <button
          onClick={() => onSelectLevel("villa")}
          className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            currentLevel === "villa"
              ? "bg-gradient-to-r from-amber-500/25 via-yellow-500/20 to-amber-500/25 text-amber-300 border border-amber-400/50 shadow-lg shadow-amber-500/15"
              : "bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800/80"
          }`}
          title="Explore 46 Luxury Villa Plots & Architectural Floor Plans"
        >
          <Crown size={14} className={currentLevel === "villa" ? "text-amber-400" : "text-slate-400"} />
          <span>Villa Layout &amp; Plans</span>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded-full border border-amber-500/40 font-semibold">
            {villaCount}
          </span>
        </button>

        {/* Tier 4: Individual Plot / Villa (when selected) */}
        {selectedPlotNumber && (
          <>
            <ChevronRight size={13} className="text-slate-600 shrink-0 hidden sm:inline" />
            <button
              onClick={() => onSelectLevel("detail")}
              className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                currentLevel === "detail"
                  ? "bg-gradient-to-r from-sky-500/20 via-sky-400/15 to-sky-500/20 text-sky-300 border border-sky-400/50 shadow-lg shadow-sky-500/10"
                  : "bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800/80"
              }`}
            >
              <Info size={14} className={currentLevel === "detail" ? "text-sky-400" : "text-slate-400"} />
              <span>Unit #{selectedPlotNumber} Details</span>
            </button>
          </>
        )}
      </div>

      {/* Right side prompt/badge */}
      <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
        <span className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800 text-[11px]">
          <Sparkles size={12} className="text-amber-400" />
          <span className="text-slate-300">
            {currentLevel === "master" && "Interactive Digital Master Plan • Aakru, Dholera SIR"}
            {currentLevel === "residential" && "99 Clear-Titled Residential Villa Plots • 120–350 Sq. Yd."}
            {currentLevel === "villa" && "46 Luxury Villas • Ground Floor & Loft Architectural Plans"}
            {currentLevel === "detail" && `Unit #${selectedPlotNumber} (${selectedPlotType || "Property Details"})`}
          </span>
        </span>
      </div>
    </div>
  );
};

export default MasterPlanNavigation;
