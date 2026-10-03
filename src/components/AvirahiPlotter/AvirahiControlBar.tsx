import React, { useState } from "react";
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Compass,
  Crosshair,
  Building,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  ChevronDown
} from "lucide-react";
import type { PlotStatus } from "../../data/avirahiCityData";

export interface AvirahiFilterState {
  searchQuery: string;
  status: PlotStatus | "all";
  sector: string | "all";
  minArea: number;
  maxArea: number;
  facing: string | "all";
  cornerOnly: boolean;
}

interface AvirahiControlBarProps {
  filters: AvirahiFilterState;
  onFilterChange: (updates: Partial<AvirahiFilterState>) => void;
  onResetFilters: () => void;
  totalPlots: number;
  matchingPlots: number;
  is3DMode: boolean;
  onToggle3DMode: () => void;
  onResetView: () => void;
}

export const AvirahiControlBar: React.FC<AvirahiControlBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalPlots,
  matchingPlots,
  is3DMode,
  onToggle3DMode,
  onResetView
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Status Filter Options
  const statusOptions: { value: PlotStatus | "all"; label: string; countColor: string }[] = [
    { value: "all", label: "All Plots", countColor: "text-white" },
    { value: "available", label: "Available", countColor: "text-emerald-400" },
    { value: "sold", label: "Booked / Sold", countColor: "text-rose-400" },
    { value: "reserved", label: "On Hold", countColor: "text-amber-400" }
  ];

  return (
    <div className="w-full bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 py-3 z-30 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        {/* Top Primary Bar: Search, Status Pills, Area Slider, Reset & Count */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* 1. Instant Plot Search Input */}
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Search Plot Number (e.g. 104, 750)..."
              className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-emerald-500 rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder-slate-400 outline-none transition-all shadow-inner"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onFilterChange({ searchQuery: "" })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded-full"
              >
                ✕
              </button>
            )}
          </div>

          {/* 2. Status Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 border border-slate-800 rounded-xl overflow-x-auto max-w-full">
            {statusOptions.map((opt) => {
              const isActive = filters.status === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onFilterChange({ status: opt.value })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-slate-800 text-white shadow-md border border-slate-700"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {opt.value === "available" && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                  {opt.value === "sold" && (
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                  )}
                  {opt.value === "reserved" && (
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                  )}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* 3. Plot Size Slider (350 Sq. Yd to 900 Sq. Yd) */}
          <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 px-3.5 py-1.5 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
              Max Area:
            </span>
            <input
              type="range"
              min={350}
              max={900}
              step={25}
              value={filters.maxArea}
              onChange={(e) => onFilterChange({ maxArea: Number(e.target.value) })}
              className="w-28 sm:w-36 accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <span className="text-xs font-bold text-emerald-400 whitespace-nowrap">
              ≤ {filters.maxArea} <span className="text-[10px] text-slate-400 font-normal">Sq. Yd</span>
            </span>
          </div>

          {/* 4. Controls: Reset, 3D Toggle, Recenter, Advanced Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggle3DMode}
              title={is3DMode ? "2D Ortho Plan" : "3D Isometric View"}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                is3DMode
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  : "bg-slate-950/80 text-slate-300 border-slate-800 hover:bg-slate-800"
              }`}
            >
              <Sparkles size={13} className={is3DMode ? "text-amber-400" : "text-slate-400"} />
              <span className="hidden sm:inline">{is3DMode ? "3D Active" : "2D View"}</span>
            </button>

            <button
              onClick={onResetView}
              title="Reset View to Master Plan Extent"
              className="p-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
            >
              <Crosshair size={15} />
            </button>

            <button
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 border transition-all ${
                isAdvancedOpen
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-slate-950/80 text-slate-300 border-slate-800 hover:bg-slate-800"
              }`}
            >
              <SlidersHorizontal size={13} />
              <span className="hidden sm:inline">Filters</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${isAdvancedOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Live Filter Matching Counter */}
            <div className="bg-slate-950/90 border border-slate-800 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2">
              <span className="text-slate-400">Plots:</span>
              <span className="font-extrabold text-emerald-400">
                {matchingPlots}
                <span className="text-slate-500 font-normal"> / {totalPlots}</span>
              </span>
            </div>

            {(filters.status !== "all" ||
              filters.sector !== "all" ||
              filters.searchQuery ||
              filters.maxArea < 900 ||
              filters.minArea > 350 ||
              filters.facing !== "all" ||
              filters.cornerOnly) && (
              <button
                onClick={onResetFilters}
                title="Reset all filters"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Advanced Filters Drawer */}
        {isAdvancedOpen && (
          <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Sector Selector */}
            <div>
              <label className="block text-slate-400 font-semibold mb-1 text-[11px] uppercase tracking-wider">
                Sector Enclave
              </label>
              <select
                value={filters.sector}
                onChange={(e) => onFilterChange({ sector: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white outline-none focus:border-emerald-500"
              >
                <option value="all">All Sectors (1 to 5)</option>
                <option value="Sector 1">Sector 1 - Royal Palms (Plots 1-250)</option>
                <option value="Sector 2">Sector 2 - Boulevard Greens (Plots 251-500)</option>
                <option value="Sector 3">Sector 3 - Lakeview Precinct (Plots 501-750)</option>
                <option value="Sector 4">Sector 4 - Signature Grand (Plots 751-1000)</option>
                <option value="Sector 5">Sector 5 - Expressway Commercial (Plots 1001-1250)</option>
              </select>
            </div>

            {/* Facing Direction */}
            <div>
              <label className="block text-slate-400 font-semibold mb-1 text-[11px] uppercase tracking-wider">
                Vastu Facing
              </label>
              <select
                value={filters.facing}
                onChange={(e) => onFilterChange({ facing: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white outline-none focus:border-emerald-500"
              >
                <option value="all">Any Facing Direction</option>
                <option value="North">North Facing</option>
                <option value="East">East Facing</option>
                <option value="North-East">North-East Facing (Ishan Corner)</option>
                <option value="West">West Facing</option>
                <option value="South">South Facing</option>
                <option value="North-West">North-West Facing</option>
              </select>
            </div>

            {/* Min Area Slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                  Min Area
                </label>
                <span className="font-bold text-emerald-400">≥ {filters.minArea} Sq. Yd</span>
              </div>
              <input
                type="range"
                min={350}
                max={800}
                step={25}
                value={filters.minArea}
                onChange={(e) => onFilterChange({ minArea: Number(e.target.value) })}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Corner Only Toggle & Clear */}
            <div className="flex items-center justify-between pt-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filters.cornerOnly}
                  onChange={(e) => onFilterChange({ cornerOnly: e.target.checked })}
                  className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
                />
                <span className="text-slate-300 font-medium">Corner Plots Only (18m Road)</span>
              </label>

              <button
                onClick={onResetFilters}
                className="text-xs text-rose-400 hover:text-rose-300 underline font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvirahiControlBar;
