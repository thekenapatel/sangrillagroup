import React from "react";
import {
  Map,
  Layers,
  Compass,
  Maximize2,
  Minimize2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Crown
} from "lucide-react";
import type { PlotUnit } from "../../data/sangrillaMeadowsData";
import { SAN_GRILLA_MEADOWS_META } from "../../data/sangrillaMeadowsData";

export type ViewEngineMode = "luxury" | "cad" | "map" | "satellite" | "streets" | "dark";

interface MasterPlanStatsBarProps {
  plots: PlotUnit[];
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onSelectStatusFilter: (status: "all" | "available" | "booked" | "reserved") => void;
  currentStatusFilter: string;
  viewMode: ViewEngineMode;
  onToggleViewMode: (mode: ViewEngineMode) => void;
}

export const MasterPlanStatsBar: React.FC<MasterPlanStatsBarProps> = ({
  plots,
  isFullscreen,
  onToggleFullscreen,
  onSelectStatusFilter,
  currentStatusFilter,
  viewMode,
  onToggleViewMode
}) => {
  const availablePlots = plots.filter((p) => p.status === "available");
  const bookedPlots = plots.filter((p) => p.status === "booked");
  const reservedPlots = plots.filter((p) => p.status === "reserved");

  const availablePercent = Math.round((availablePlots.length / plots.length) * 100);

  const isMapMode = viewMode === "map" || viewMode === "satellite";

  return (
    <div className="w-full bg-slate-950/95 border-b border-slate-800/90 px-3 sm:px-6 py-2.5 z-30 flex flex-wrap items-center justify-between gap-3 text-xs text-white select-none">
      {/* Left: Branding & Survey Information */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center font-black text-slate-950 text-xs shadow-md shadow-amber-500/20 shrink-0">
          SM
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-extrabold text-sm text-white tracking-tight">
              Sangrilla Meadows Plotter
            </h2>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              Dholera SIR
            </span>
          </div>
          <p className="text-[10px] text-slate-400 hidden sm:block">
            Aakru Village • Survey: New {SAN_GRILLA_MEADOWS_META.surveyNoNew} / Old {SAN_GRILLA_MEADOWS_META.surveyNoOld}
          </p>
        </div>
      </div>

      {/* Center: Live Availability Status Filter Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-0.5">
        {/* Total */}
        <button
          onClick={() => onSelectStatusFilter("all")}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all text-xs whitespace-nowrap ${
            currentStatusFilter === "all"
              ? "bg-slate-800 border-slate-600 text-white font-bold"
              : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          <span>All Units:</span>
          <strong className="text-white">{plots.length}</strong>
        </button>

        {/* Available */}
        <button
          onClick={() => onSelectStatusFilter("available")}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all text-xs whitespace-nowrap ${
            currentStatusFilter === "available"
              ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold shadow-sm shadow-emerald-500/20"
              : "bg-emerald-950/30 border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/40"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available:</span>
          <strong className="text-emerald-300">{availablePlots.length}</strong>
          <span className="text-[10px] text-emerald-500 hidden md:inline">({availablePercent}%)</span>
        </button>

        {/* Booked / Sold */}
        <button
          onClick={() => onSelectStatusFilter("booked")}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all text-xs whitespace-nowrap ${
            currentStatusFilter === "booked"
              ? "bg-rose-500/20 border-rose-400 text-rose-300 font-bold shadow-sm shadow-rose-500/20"
              : "bg-rose-950/30 border-rose-500/30 text-rose-400 hover:bg-rose-900/40"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span>Sold:</span>
          <strong className="text-rose-300">{bookedPlots.length}</strong>
        </button>

        {/* Reserved */}
        <button
          onClick={() => onSelectStatusFilter("reserved")}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all text-xs whitespace-nowrap ${
            currentStatusFilter === "reserved"
              ? "bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-sm shadow-amber-500/20"
              : "bg-amber-950/30 border-amber-500/30 text-amber-400 hover:bg-amber-900/40"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>Reserved:</span>
          <strong className="text-amber-300">{reservedPlots.length}</strong>
        </button>
      </div>

      {/* Right: View Mode Engine Switcher & Fullscreen */}
      <div className="flex items-center gap-2">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-0.5 flex items-center">
          {/* 1. Google Satellite Map (Default Unified Map Style) */}
          <button
            onClick={() => onToggleViewMode("satellite")}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              isMapMode
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-bold"
                : "text-slate-400 hover:text-white"
            }`}
            title="Google Satellite Hybrid Map with Master Plan Layout Overlay"
          >
            <Map size={12} />
            <span className="hidden sm:inline">Satellite Map</span>
            <span className="sm:hidden">Satellite</span>
          </button>

          {/* 2. Google Streets */}
          <button
            onClick={() => onToggleViewMode("streets")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "streets"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md font-bold"
                : "text-slate-400 hover:text-white"
            }`}
            title="Google Streets Roadmap with Master Plan Demarcations"
          >
            <Compass size={12} />
            <span className="hidden md:inline">Google Streets</span>
            <span className="md:hidden">Streets</span>
          </button>

          {/* 3. Cyber Dark */}
          <button
            onClick={() => onToggleViewMode("dark")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "dark"
                ? "bg-indigo-600 text-white shadow-md font-bold"
                : "text-slate-400 hover:text-white"
            }`}
            title="Cyber Dark Map Style"
          >
            <Sparkles size={12} />
            <span className="hidden md:inline">Dark Map</span>
            <span className="md:hidden">Dark</span>
          </button>

          {/* 4. 2D Blueprint Plan */}
          <button
            onClick={() => onToggleViewMode("luxury")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "luxury"
                ? "bg-slate-800 text-white shadow-md font-bold border border-slate-700"
                : "text-slate-400 hover:text-white"
            }`}
            title="2D Digital Blueprint Canvas"
          >
            <Layers size={12} />
            <span className="hidden sm:inline">2D Blueprint</span>
            <span className="sm:hidden">2D</span>
          </button>
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={onToggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Master Plan"}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>
      </div>
    </div>
  );
};

export default MasterPlanStatsBar;
