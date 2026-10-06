import React from "react";
import {
  Layers,
  Maximize2,
  Minimize2
} from "lucide-react";
import type { PlotUnit } from "../../data/sangrillaMeadowsData";
import { SAN_GRILLA_MEADOWS_META } from "../../data/sangrillaMeadowsData";

interface MasterPlanStatsBarProps {
  plots: PlotUnit[];
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onSelectStatusFilter: (status: "all" | "available" | "booked" | "reserved") => void;
  currentStatusFilter: string;
}

export const MasterPlanStatsBar: React.FC<MasterPlanStatsBarProps> = ({
  plots,
  isFullscreen,
  onToggleFullscreen,
  onSelectStatusFilter,
  currentStatusFilter
}) => {
  const availablePlots = plots.filter((p) => p.status === "available");
  const bookedPlots = plots.filter((p) => p.status === "booked");
  const reservedPlots = plots.filter((p) => p.status === "reserved");

  const availablePercent = Math.round((availablePlots.length / plots.length) * 100);

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

      {/* Right: Active blueprint mode & Fullscreen */}
      <div className="flex items-center gap-2">
        <div className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 px-2.5 py-1.5 text-xs font-semibold text-sky-200">
          <Layers size={14} />
          <span>2D Blueprint</span>
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
