import React, { useState, useMemo, useEffect, useRef } from "react";
import type { PlotUnit } from "../../data/sangrillaMeadowsData";
import {
  SAN_GRILLA_MEADOWS_PLOTS,
  SAN_GRILLA_MEADOWS_META
} from "../../data/sangrillaMeadowsData";
import MasterPlanStatsBar, { type ViewEngineMode } from "./MasterPlanStatsBar";
import MasterPlanNavigation, { type MasterPlanNavLevel } from "./MasterPlanNavigation";
import type { FilterState } from "./MasterPlanToolbar";
import MasterPlanToolbar from "./MasterPlanToolbar";
import MasterPlanCanvas from "./MasterPlanCanvas";
import MasterPlanMapCanvas from "./MasterPlanMapCanvas";
import VillaFloorPlanViewer from "./VillaFloorPlanViewer";
import PlotDrawer from "./PlotDrawer";
import NaavikPlotDetailsCard from "./NaavikPlotDetailsCard";
import PlotInquiryModal from "./PlotInquiryModal";
import PlotSpecificationModal from "./PlotSpecificationModal";

interface MasterPlanViewerProps {
  initialPlotNumber?: number;
  className?: string;
  defaultFullscreen?: boolean;
}

export const MasterPlanViewer: React.FC<MasterPlanViewerProps> = ({
  initialPlotNumber,
  className = "",
  defaultFullscreen = false
}) => {
  const containerWrapperRef = useRef<HTMLDivElement>(null);

  // 1. Navigation Hierarchy (Requirement 4: Master Plan → Plot Layout → Villa Layout → Individual Plot/Villa)
  const [navLevel, setNavLevel] = useState<MasterPlanNavLevel>("master");
  const [showVillaFloorPlans, setShowVillaFloorPlans] = useState<boolean>(false);

  // 2. View Engine Mode: 'luxury' (2D Digital Master Plan Layout - default with 145 numbered plots) | 'map' (GIS Google Satellite) | 'cad' (Technical CAD)
  const [viewMode, setViewMode] = useState<ViewEngineMode>(() => {
    const params = new URLSearchParams(window.location.search);
    const modeParam = params.get("mode") || params.get("view");
    if (modeParam === "map" || modeParam === "satellite") return "map";
    if (modeParam === "cad") return "cad";
    return "luxury"; // Default to 2D Digital Master Plan Layout so all 145 numbered plots & details are immediately visible!
  });

  // 3. Filter state
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    status: "all",
    facing: "all",
    plotType: "all",
    minArea: 120,
    maxArea: 350,
    cornerOnly: false
  });

  // 4. Active selected plot and modals
  const [selectedPlot, setSelectedPlot] = useState<PlotUnit | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);
  const [isSpecsModalOpen, setIsSpecsModalOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(defaultFullscreen);

  // Check URL parameters for ?plot=42 on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plotParam = params.get("plot");
    const targetNum = initialPlotNumber || (plotParam ? parseInt(plotParam, 10) : null);

    if (targetNum) {
      const match = SAN_GRILLA_MEADOWS_PLOTS.find((p) => p.plotNumber === targetNum);
      if (match) {
        setSelectedPlot(match);
        setIsDrawerOpen(true);
        setNavLevel("detail");
      }
    }
  }, [initialPlotNumber]);

  // If user searches for a specific plot number, automatically select it
  useEffect(() => {
    if (filters.searchQuery.trim()) {
      const queryNum = parseInt(filters.searchQuery.trim(), 10);
      if (!isNaN(queryNum) && queryNum >= 1 && queryNum <= 145) {
        const match = SAN_GRILLA_MEADOWS_PLOTS.find((p) => p.plotNumber === queryNum);
        if (match && selectedPlot?.plotNumber !== queryNum) {
          setSelectedPlot(match);
          setNavLevel("detail");
        }
      }
    }
  }, [filters.searchQuery]);

  // Handle Fullscreen
  const toggleFullscreen = () => {
    if (!containerWrapperRef.current) return;

    if (!document.fullscreenElement) {
      containerWrapperRef.current
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {
          setIsFullscreen(!isFullscreen);
        });
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => setIsFullscreen(!isFullscreen));
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  // Filter logic
  const filteredPlots = useMemo(() => {
    return SAN_GRILLA_MEADOWS_PLOTS.filter((plot) => {
      // 1. Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const plotNumStr = plot.plotNumber.toString();
        const matchesNum =
          plotNumStr.includes(query) ||
          `plot ${plotNumStr}`.includes(query) ||
          `plot #${plotNumStr}`.includes(query);
        const matchesType = plot.type.toLowerCase().includes(query);
        const matchesFacing = plot.facing.toLowerCase().includes(query);
        const matchesCorner = query.includes("corner") && plot.isCorner;
        if (!matchesNum && !matchesType && !matchesFacing && !matchesCorner) {
          return false;
        }
      }

      // 2. Status
      if (filters.status !== "all" && plot.status !== filters.status) {
        return false;
      }

      // 3. Facing
      if (filters.facing !== "all" && plot.facing !== filters.facing) {
        return false;
      }

      // 4. Plot Type (can be governed by filter or navigation tab)
      if (filters.plotType !== "all" && plot.type !== filters.plotType) {
        return false;
      }

      // 5. Area range
      if (plot.areaSqYards > filters.maxArea || plot.areaSqYards < filters.minArea) {
        return false;
      }

      // 6. Corner Only
      if (filters.cornerOnly && !plot.isCorner) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const filteredPlotIds = useMemo(() => {
    return new Set(filteredPlots.map((p) => p.id));
  }, [filteredPlots]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      status: "all",
      facing: "all",
      plotType: "all",
      minArea: 120,
      maxArea: 350,
      cornerOnly: false
    });
    setNavLevel("master");
    setShowVillaFloorPlans(false);
  };

  // Navigation Level Handler (Requirement 4)
  const handleSelectNavLevel = (level: MasterPlanNavLevel) => {
    setNavLevel(level);
    if (level === "master") {
      setFilters((prev) => ({ ...prev, plotType: "all" }));
      setShowVillaFloorPlans(false);
    } else if (level === "residential") {
      setFilters((prev) => ({ ...prev, plotType: "Residential Plot" }));
      setShowVillaFloorPlans(false);
    } else if (level === "villa") {
      setFilters((prev) => ({ ...prev, plotType: "Luxurious Villa" }));
      // In villa level, user can also view floor plans
    } else if (level === "detail") {
      if (selectedPlot) {
        setIsDrawerOpen(true);
      }
    }
  };

  // Plot selection
  const handleSelectPlot = (plot: PlotUnit) => {
    setSelectedPlot(plot);
    setNavLevel("detail");
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Next / Previous Navigation
  const handleSelectNext = () => {
    if (!selectedPlot) return;
    const list = filteredPlots.length > 0 ? filteredPlots : SAN_GRILLA_MEADOWS_PLOTS;
    const currentIndex = list.findIndex((p) => p.id === selectedPlot.id);
    const nextIndex = (currentIndex + 1) % list.length;
    setSelectedPlot(list[nextIndex]);
  };

  const handleSelectPrev = () => {
    if (!selectedPlot) return;
    const list = filteredPlots.length > 0 ? filteredPlots : SAN_GRILLA_MEADOWS_PLOTS;
    const currentIndex = list.findIndex((p) => p.id === selectedPlot.id);
    const prevIndex = (currentIndex - 1 + list.length) % list.length;
    setSelectedPlot(list[prevIndex]);
  };

  const handleInquire = (plot: PlotUnit) => {
    setSelectedPlot(plot);
    setIsInquiryModalOpen(true);
  };

  const handleOpenSpecs = (plot: PlotUnit) => {
    setSelectedPlot(plot);
    setIsSpecsModalOpen(true);
  };

  const residentialCount = SAN_GRILLA_MEADOWS_PLOTS.filter((p) => p.type === "Residential Plot").length;
  const villaCount = SAN_GRILLA_MEADOWS_PLOTS.filter((p) => p.type === "Luxurious Villa").length;

  return (
    <div
      ref={containerWrapperRef}
      className={`relative w-full flex flex-col bg-[#060a12] font-sans transition-all overflow-hidden ${
        isFullscreen
          ? "fixed inset-0 z-50 h-screen w-screen rounded-none"
          : "h-[750px] lg:h-[860px] rounded-3xl shadow-2xl border border-slate-800/90"
      } ${className}`}
    >
      {/* 1. Header & Live Availability Stats Bar */}
      <MasterPlanStatsBar
        plots={SAN_GRILLA_MEADOWS_PLOTS}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onSelectStatusFilter={(status) => handleFilterChange({ status })}
        currentStatusFilter={filters.status}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
      />

      {/* 2. 4-Tier Interactive Navigation (Master Plan → Plot Layout → Villa Layout → Individual Plot/Villa) */}
      <MasterPlanNavigation
        currentLevel={navLevel}
        onSelectLevel={handleSelectNavLevel}
        selectedPlotNumber={selectedPlot?.plotNumber}
        selectedPlotType={selectedPlot?.type}
        totalPlotsCount={SAN_GRILLA_MEADOWS_PLOTS.length}
        residentialCount={residentialCount}
        villaCount={villaCount}
      />

      {/* 3. Control & Filter Toolbar (only when in master, residential, or detail mode) */}
      {!showVillaFloorPlans && (
        <MasterPlanToolbar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalPlotsCount={SAN_GRILLA_MEADOWS_PLOTS.length}
          matchingPlotsCount={filteredPlots.length}
        />
      )}

      {/* 4. Main Interactive Viewport */}
      <div className="relative flex-1 w-full h-full min-h-0 overflow-hidden">
        {showVillaFloorPlans ? (
          /* Villa Floor Plan / Layout Experience */
          <VillaFloorPlanViewer
            onBackToMaster={() => setShowVillaFloorPlans(false)}
            selectedPlotNumber={selectedPlot?.plotNumber}
          />
        ) : viewMode === "map" ? (
          /* GIS Satellite Map */
          <MasterPlanMapCanvas
            plots={SAN_GRILLA_MEADOWS_PLOTS}
            filteredPlotIds={filteredPlotIds}
            selectedPlot={selectedPlot}
            onSelectPlot={handleSelectPlot}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
          />
        ) : (
          /* Digital Master Plan Canvas (Luxury Gold or Clean CAD) */
          <MasterPlanCanvas
            plots={SAN_GRILLA_MEADOWS_PLOTS}
            filteredPlotIds={filteredPlotIds}
            selectedPlot={selectedPlot}
            onSelectPlot={handleSelectPlot}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
            navigationLevel={navLevel}
            onNavigateToVillas={() => setShowVillaFloorPlans(true)}
            themeStyle={viewMode === "cad" ? "cad" : "luxury"}
            onSwitchToMap={() => setViewMode("map")}
          />
        )}

        {/* 5. Naavik-Style Top-Right Floating Details Card */}
        {selectedPlot && !isDrawerOpen && (
          <NaavikPlotDetailsCard
            plotNumber={selectedPlot.plotNumber}
            status={selectedPlot.status}
            areaSqYards={selectedPlot.areaSqYards}
            facing={selectedPlot.facing}
            type={selectedPlot.type}
            price={selectedPlot.totalPrice ? `₹${(selectedPlot.totalPrice / 100000).toFixed(2)} Lakhs` : undefined}
            dimensionsMeter={
              selectedPlot.dimensionsMeter ||
              selectedPlot.dimensions ||
              `${(Math.sqrt(selectedPlot.areaSqYards * 0.836) * 0.8).toFixed(2)} x ${(Math.sqrt(selectedPlot.areaSqYards * 0.836) * 1.25).toFixed(2)} x ${(Math.sqrt(selectedPlot.areaSqYards * 0.836) * 0.8).toFixed(2)} x ${(Math.sqrt(selectedPlot.areaSqYards * 0.836) * 1.25).toFixed(2)}`
            }
            onClose={() => setSelectedPlot(null)}
            onInquire={() => handleInquire(selectedPlot)}
            onOpenDrawer={() => setIsDrawerOpen(true)}
          />
        )}
      </div>

      {/* 6. Comprehensive Plot Details Slide-Out Drawer */}
      <PlotDrawer
        isOpen={isDrawerOpen}
        plot={selectedPlot}
        onClose={handleCloseDrawer}
        onInquire={handleInquire}
        onOpenSpecs={handleOpenSpecs}
        onSelectNext={handleSelectNext}
        onSelectPrev={handleSelectPrev}
      />

      {/* 7. Modals */}
      <PlotInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        plot={selectedPlot}
      />

      <PlotSpecificationModal
        isOpen={isSpecsModalOpen}
        onClose={() => setIsSpecsModalOpen(false)}
        plot={selectedPlot}
      />
    </div>
  );
};

export default MasterPlanViewer;
