import React from "react";
import {
  Search,
  Filter,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Compass,
  Home,
  SlidersHorizontal,
  ChevronDown
} from "lucide-react";

export interface FilterState {
  searchQuery: string;
  status: "all" | "available" | "booked" | "reserved";
  facing: "all" | "North" | "East" | "South" | "West" | "North-East" | "North-West";
  plotType: "all" | "Residential Plot" | "Luxurious Villa";
  minArea: number;
  maxArea: number;
  cornerOnly: boolean;
}

interface MasterPlanToolbarProps {
  filters: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalPlotsCount: number;
  matchingPlotsCount: number;
}

export const MasterPlanToolbar: React.FC<MasterPlanToolbarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalPlotsCount,
  matchingPlotsCount
}) => {
  const isFiltered =
    filters.searchQuery !== "" ||
    filters.status !== "all" ||
    filters.facing !== "all" ||
    filters.plotType !== "all" ||
    filters.minArea !== 120 ||
    filters.maxArea !== 350 ||
    filters.cornerOnly;

  return (
    <div className="w-full bg-slate-900/90 border-b border-slate-800/80 px-4 py-3 backdrop-blur-md z-30 flex flex-wrap items-center justify-between gap-3 text-xs text-white">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
          placeholder="Search plot # (e.g. 42), facing, or villa..."
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-xs"
        />
        {filters.searchQuery && (
          <button
            onClick={() => onFilterChange({ searchQuery: "" })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter Selectors Group */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Status Filter */}
        <div className="relative">
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value as any })}
            className="appearance-none bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-2 pr-7 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="all">Status: All</option>
            <option value="available">🟢 Available Only</option>
            <option value="booked">🔴 Booked / Sold</option>
            <option value="reserved">🟡 On Hold / Reserved</option>
          </select>
          <ChevronDown
            size={12}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>

        {/* Facing Filter */}
        <div className="relative">
          <select
            value={filters.facing}
            onChange={(e) => onFilterChange({ facing: e.target.value as any })}
            className="appearance-none bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-2 pr-7 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="all">Facing: All Vastu</option>
            <option value="East">East (Sun Facing)</option>
            <option value="North">North (Auspicious)</option>
            <option value="North-East">North-East (Ishan)</option>
            <option value="West">West</option>
            <option value="South">South</option>
            <option value="North-West">North-West</option>
          </select>
          <ChevronDown
            size={12}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>

        {/* Plot Type Filter */}
        <div className="relative">
          <select
            value={filters.plotType}
            onChange={(e) => onFilterChange({ plotType: e.target.value as any })}
            className="appearance-none bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-2 pr-7 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="all">Type: All Units</option>
            <option value="Residential Plot">Residential Plot</option>
            <option value="Luxurious Villa">Luxurious Villa</option>
          </select>
          <ChevronDown
            size={12}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>

        {/* Corner Plots Only Toggle */}
        <button
          onClick={() => onFilterChange({ cornerOnly: !filters.cornerOnly })}
          className={`px-3 py-2 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1.5 ${
            filters.cornerOnly
              ? "bg-amber-500/20 border-amber-500/50 text-amber-300 font-semibold"
              : "bg-slate-950/80 border-slate-700/80 text-slate-300 hover:text-white"
          }`}
        >
          <span>Corner Only</span>
          {filters.cornerOnly && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
        </button>

        {/* Reset Filters Button */}
        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="px-2.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-slate-700 transition-colors flex items-center gap-1"
            title="Reset Filters"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Matching Plots Count Pill */}
      <div className="text-xs text-slate-400 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
        Showing <strong className="text-emerald-400">{matchingPlotsCount}</strong> of{" "}
        <span className="text-white">{totalPlotsCount}</span> plots
      </div>
    </div>
  );
};

export default MasterPlanToolbar;
