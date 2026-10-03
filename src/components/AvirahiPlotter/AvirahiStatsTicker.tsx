import React from "react";
import {
  Building2,
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  Maximize2,
  Minimize2,
  ShieldCheck,
  TrendingUp,
  Flame
} from "lucide-react";
import type { AvirahiPlotUnit } from "../../data/avirahiCityData";
import { AVIRAHI_CITY_META } from "../../data/avirahiCityData";

interface AvirahiStatsTickerProps {
  plots: AvirahiPlotUnit[];
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const AvirahiStatsTicker: React.FC<AvirahiStatsTickerProps> = ({
  plots,
  isFullscreen,
  onToggleFullscreen
}) => {
  const availableCount = plots.filter((p) => p.status === "available").length;
  const soldCount = plots.filter((p) => p.status === "sold").length;
  const reservedCount = plots.filter((p) => p.status === "reserved").length;

  const availablePercent = Math.round((availableCount / plots.length) * 100);

  return (
    <div className="w-full bg-slate-950/95 border-b border-slate-800/80 px-4 py-2.5 z-30 flex flex-wrap items-center justify-between gap-3 text-xs">
      {/* Left: Project Branding & RERA */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center font-black text-slate-950 text-sm shadow-md shadow-emerald-500/20">
            SM
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-sm text-white tracking-tight">
                Sangrilla Meadows Plan
              </h1>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                Dholera SIR
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Sangrilla Meadows • Master Plan &amp; Plot Demarcation
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span>RERA No: {AVIRAHI_CITY_META.reraApproved.split(" ")[1]}</span>
        </div>
      </div>

      {/* Middle: Live Inventory Counters */}
      <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto py-1">
        {/* Total Plots */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 text-[11px]">Total Plots:</span>
          <span className="font-bold text-white text-xs sm:text-sm">
            {plots.length.toLocaleString()}
          </span>
        </div>

        {/* Available */}
        <div className="flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-[11px] font-medium">Available:</span>
          <span className="font-extrabold text-emerald-300 text-xs sm:text-sm">
            {availableCount}
          </span>
          <span className="text-[10px] text-emerald-500 font-semibold">
            ({availablePercent}%)
          </span>
        </div>

        {/* Sold */}
        <div className="flex items-center gap-1.5 bg-rose-950/30 border border-rose-500/30 px-2.5 py-1 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span className="text-rose-400 text-[11px] font-medium">Sold / Booked:</span>
          <span className="font-extrabold text-rose-300 text-xs sm:text-sm">
            {soldCount}
          </span>
        </div>

        {/* Reserved */}
        <div className="flex items-center gap-1.5 bg-amber-950/30 border border-amber-500/30 px-2.5 py-1 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-amber-400 text-[11px] font-medium">On Hold:</span>
          <span className="font-extrabold text-amber-300 text-xs sm:text-sm">
            {reservedCount}
          </span>
        </div>
      </div>

      {/* Right: Fullscreen Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Master Plan"}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs"
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          <span className="hidden md:inline">{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
        </button>
      </div>
    </div>
  );
};

export default AvirahiStatsTicker;
