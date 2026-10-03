import React, { useState } from "react";
import { ChevronDown, ChevronUp, Layers, Crown, Trees, Sparkles } from "lucide-react";

interface MasterPlanLegendProps {
  availableCount: number;
  reservedCount: number;
  bookedCount: number;
  villaCount: number;
}

export const MasterPlanLegend: React.FC<MasterPlanLegendProps> = ({
  availableCount,
  reservedCount,
  bookedCount,
  villaCount
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className="absolute bottom-4 left-4 z-20 transition-all select-none">
      <div className="bg-slate-950/90 backdrop-blur-xl border border-slate-800/90 rounded-2xl shadow-2xl p-2.5 sm:p-3 text-white max-w-[280px]">
        {/* Header toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between gap-3 text-[11px] font-bold text-slate-300 hover:text-white"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="uppercase tracking-wider">Map Legend</span>
          </div>
          <span className="p-0.5 rounded text-slate-400 hover:text-white">
            {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </span>
        </button>

        {isExpanded && (
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 space-y-1.5 text-[11px]">
            {/* Available */}
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-300/60 shadow-sm shadow-emerald-400/40" />
                <span className="text-slate-200">Available</span>
              </div>
              <span className="text-emerald-400 font-bold">{availableCount}</span>
            </div>

            {/* Reserved / On Hold */}
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-300/60 shadow-sm shadow-amber-400/40" />
                <span className="text-slate-200">Reserved / On Hold</span>
              </div>
              <span className="text-amber-300 font-bold">{reservedCount}</span>
            </div>

            {/* Sold / Booked */}
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-rose-400/60 shadow-sm shadow-rose-500/40" />
                <span className="text-slate-200">Sold / Registered</span>
              </div>
              <span className="text-rose-400 font-bold">{bookedCount}</span>
            </div>

            {/* Luxury Villa */}
            <div className="flex items-center justify-between gap-2 px-1 pt-1 border-t border-slate-900">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-tr from-amber-400 to-yellow-200 border border-amber-300/80 shadow-sm shadow-amber-400/30 rotate-45 shrink-0" />
                <span className="text-amber-200 font-semibold flex items-center gap-1">
                  <span>Luxury Villa</span>
                </span>
              </div>
              <span className="text-amber-300 font-bold">{villaCount}</span>
            </div>

            {/* Common Green Amenities */}
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600/80 border border-emerald-400/60" />
                <span className="text-slate-300">Parks &amp; Amenities</span>
              </div>
              <span className="text-emerald-400 font-bold">7 COP</span>
            </div>

            {/* Road network */}
            <div className="flex items-center justify-between gap-2 px-1 text-[10px] text-slate-400 pt-0.5">
              <span>Internal Roads</span>
              <span className="font-semibold text-slate-300">7.5m &amp; 12m</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MasterPlanLegend;
