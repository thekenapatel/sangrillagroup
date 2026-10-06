import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Sparkles,
  Info,
  Trees,
  Compass,
  Crown,
  Eye,
  Layers,
  CheckCircle2,
  Plane,
  Car,
  Building2,
  Factory,
  Navigation,
  X
} from "lucide-react";
import type { PlotUnit, CommonAmenityArea, SurroundingLandmark } from "../../data/sangrillaMeadowsData";
import {
  COMMON_AMENITY_AREAS,
  SAN_GRILLA_MEADOWS_META,
  SURROUNDING_LANDMARKS
} from "../../data/sangrillaMeadowsData";
import MasterPlanLegend from "./MasterPlanLegend";
import type { MasterPlanNavLevel } from "./MasterPlanNavigation";

interface MasterPlanCanvasProps {
  plots: PlotUnit[];
  filteredPlotIds: Set<string>;
  selectedPlot: PlotUnit | null;
  onSelectPlot: (plot: PlotUnit) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  navigationLevel?: MasterPlanNavLevel;
  onNavigateToVillas?: () => void;
}

export const MasterPlanCanvas: React.FC<MasterPlanCanvasProps> = ({
  plots,
  filteredPlotIds,
  selectedPlot,
  onSelectPlot,
  isFullscreen,
  onToggleFullscreen,
  navigationLevel = "master",
  onNavigateToVillas
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Pan & Zoom Transform State
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Touch Gesture State (Pinch-to-zoom & Touch Pan)
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);
  const lastTouchDistRef = useRef<number | null>(null);
  const lastTouchMidpointRef = useRef<{ x: number; y: number } | null>(null);
  const scaleRef = useRef(1);
  const positionRef = useRef({ x: 0, y: 0 });

  // Hover & Tooltip State
  const [hoveredPlot, setHoveredPlot] = useState<PlotUnit | null>(null);
  const [hoveredAmenity, setHoveredAmenity] = useState<CommonAmenityArea | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [showUserInstruction, setShowUserInstruction] = useState<boolean>(true);
  const [selectedLandmark, setSelectedLandmark] = useState<SurroundingLandmark | null>(null);

  const clampScale = (value: number) => Math.min(Math.max(value, 0.35), 4.5);

  const applyTransform = (
    nextScale: number,
    nextPosition: { x: number; y: number } = positionRef.current
  ) => {
    scaleRef.current = nextScale;
    positionRef.current = nextPosition;
    setScale(nextScale);
    setPosition(nextPosition);
  };

  const handleZoomIn = () => {
    applyTransform(clampScale(scaleRef.current * 1.2));
    setShowUserInstruction(false);
  };
  const handleZoomOut = () => {
    applyTransform(clampScale(scaleRef.current / 1.2));
    setShowUserInstruction(false);
  };
  const handleResetZoom = () => {
    applyTransform(1, { x: 0, y: 0 });
  };

  // Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - positionRef.current.x,
      y: e.clientY - positionRef.current.y
    });
    setShowUserInstruction(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const nextPosition = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      };
      positionRef.current = nextPosition;
      setPosition(nextPosition);
    }

    if (hoveredPlot || hoveredAmenity) {
      setTooltipPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Wheel zoom centered on cursor
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setShowUserInstruction(false);
    const currentScale = scaleRef.current;
    const nextScale = clampScale(currentScale * (e.deltaY > 0 ? 0.9 : 1.1));
    const rect = e.currentTarget.getBoundingClientRect();
    const focus = {
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2
    };
    const currentPosition = positionRef.current;
    const scaleRatio = nextScale / currentScale;
    applyTransform(nextScale, {
      x: focus.x - (focus.x - currentPosition.x) * scaleRatio,
      y: focus.y - (focus.y - currentPosition.y) * scaleRatio
    });
  };

  // Touch gesture handlers for mobile & tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    setShowUserInstruction(false);
    if (e.touches.length === 1) {
      setIsDragging(true);
      lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      lastTouchDistRef.current = null;
      lastTouchMidpointRef.current = null;
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDistRef.current = Math.hypot(dx, dy);
      const rect = e.currentTarget.getBoundingClientRect();
      lastTouchMidpointRef.current = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left - rect.width / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top - rect.height / 2
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 1) e.preventDefault();

    if (e.touches.length === 1 && isDragging && lastTouchRef.current) {
      const dx = e.touches[0].clientX - lastTouchRef.current.x;
      const dy = e.touches[0].clientY - lastTouchRef.current.y;
      setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (
      e.touches.length === 2 &&
      lastTouchDistRef.current !== null &&
      lastTouchMidpointRef.current
    ) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDist = Math.hypot(dx, dy);
      const currentScale = scaleRef.current;
      const nextScale = clampScale(currentScale * (newDist / lastTouchDistRef.current));
      const rect = e.currentTarget.getBoundingClientRect();
      const nextMidpoint = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left - rect.width / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top - rect.height / 2
      };
      const previousMidpoint = lastTouchMidpointRef.current;
      const currentPosition = positionRef.current;
      const scaleRatio = nextScale / currentScale;
      applyTransform(nextScale, {
        x: nextMidpoint.x - (previousMidpoint.x - currentPosition.x) * scaleRatio,
        y: nextMidpoint.y - (previousMidpoint.y - currentPosition.y) * scaleRatio
      });
      lastTouchDistRef.current = newDist;
      lastTouchMidpointRef.current = nextMidpoint;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    lastTouchRef.current = null;
    lastTouchDistRef.current = null;
    lastTouchMidpointRef.current = null;
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-" || e.key === "_") handleZoomOut();
      if (e.key === "0") handleResetZoom();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // When selectedPlot changes, center on it if appropriate
  useEffect(() => {
    if (selectedPlot && selectedPlot.center) {
      // SVG center is (selectedPlot.center.x, selectedPlot.center.y)
      // ViewBox is 95, 305, 450, 770. Center is (320, 690)
      // We can gently ease into view if scale > 1
    }
  }, [selectedPlot]);

  // Counts for legend
  const availableCount = plots.filter((p) => p.status === "available").length;
  const reservedCount = plots.filter((p) => p.status === "reserved").length;
  const bookedCount = plots.filter((p) => p.status === "booked").length;
  const villaCount = plots.filter((p) => p.type === "Luxurious Villa").length;

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setIsDragging(false);
        setHoveredPlot(null);
        setHoveredAmenity(null);
        setTooltipPos(null);
      }}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full min-h-[550px] overflow-hidden bg-[#060a12] cursor-grab active:cursor-grabbing select-none touch-none"
      style={{ touchAction: "none" }}
    >
      {/* Ambient luxury backdrop glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(212, 175, 55, 0.08) 0%, rgba(16, 185, 129, 0.04) 40%, #060a12 85%)"
        }}
      />

      {/* Floating Instructions Banner (Requirement 8) */}
      {showUserInstruction && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 transition-all pointer-events-none animate-in fade-in duration-500 hidden md:block">
          <div className="bg-slate-950/90 backdrop-blur-xl border border-amber-500/30 text-amber-200/90 px-4 py-2 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span>Drag to pan • Pinch or use the controls to zoom • Tap a plot for details</span>
          </div>
        </div>
      )}

      {/* Floating Floating Viewport Controls (Right Side) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-slate-950/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-1.5 shadow-2xl text-white">
        <button
          onClick={handleZoomIn}
          title="Zoom In (+)"
          className="w-11 h-11 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out (-)"
          className="w-11 h-11 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <ZoomOut size={16} />
        </button>
        <button
          onClick={handleResetZoom}
          title="Reset to Fit View (0)"
          className="w-11 h-11 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <RotateCcw size={15} />
        </button>
        <div className="w-5 h-[1px] bg-slate-800 mx-auto my-0.5" />
        <button
          onClick={onToggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
          className="w-11 h-11 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>
      </div>

      {/* Quick Navigation Shortcut for Villas */}
      {navigationLevel === "villa" && onNavigateToVillas && (
        <div className="absolute top-4 left-4 z-20 animate-in fade-in duration-300">
          <button
            onClick={onNavigateToVillas}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/50 backdrop-blur-xl text-amber-300 px-3.5 py-2 rounded-xl text-xs font-bold shadow-xl transition-all"
          >
            <Crown size={14} className="text-amber-400" />
            <span>Open Villa Architectural Floor Plans →</span>
          </button>
        </div>
      )}

      {/* Main Pan / Zoom Viewport Container */}
      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: "center center"
        }}
      >
        <div className="relative flex h-full w-full items-center justify-center shrink-0">
          {/* Surrounding Places Environment (Expanded when zooming out, like Google Maps) */}
          <div
            className="hidden absolute pointer-events-none transition-opacity duration-300 select-none"
            style={{
              width: "1600px",
              height: "1500px",
              opacity: scale <= 1.05 ? 1 : Math.max(0.12, 1 - (scale - 1) * 2.5),
              pointerEvents: scale <= 1.15 ? "auto" : "none"
            }}
          >
            {/* Concentric Distance Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* 1 KM Radius */}
              <div className="absolute w-[560px] h-[560px] rounded-full border border-amber-500/25 border-dashed flex items-start justify-center pt-2">
                <span className="text-[10px] font-bold text-amber-400/80 bg-slate-950/80 px-2 py-0.5 rounded-full border border-amber-500/30 backdrop-blur-sm">
                  1 KM Radius (Local Green Buffer)
                </span>
              </div>
              {/* 5 KM Radius */}
              <div className="absolute w-[880px] h-[880px] rounded-full border border-slate-700/60 border-dashed flex items-start justify-center pt-3">
                <span className="text-[10px] font-bold text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded-full border border-slate-700 backdrop-blur-sm">
                  5 KM Radius (Expressway Node &amp; Cher)
                </span>
              </div>
              {/* 10 KM Radius */}
              <div className="absolute w-[1220px] h-[1220px] rounded-full border border-slate-800/80 border-dashed flex items-start justify-center pt-3">
                <span className="text-[10px] font-bold text-indigo-400/90 bg-slate-950/80 px-2.5 py-0.5 rounded-full border border-indigo-500/30 backdrop-blur-sm">
                  10 KM Radius (ABCD Smart City Center)
                </span>
              </div>
              {/* 15 KM Radius */}
              <div className="absolute w-[1520px] h-[1520px] rounded-full border border-sky-800/60 border-dashed flex items-start justify-center pt-3">
                <span className="text-[10px] font-bold text-sky-400/90 bg-slate-950/80 px-2.5 py-0.5 rounded-full border border-sky-500/30 backdrop-blur-sm">
                  15 KM Radius (Dholera International Airport)
                </span>
              </div>
            </div>

            {/* 10-Lane Ahmedabad–Dholera Expressway (NH-751) Corridor (250m to the right) */}
            <div className="absolute right-[190px] top-[60px] bottom-[60px] w-[54px] flex flex-col items-center justify-between py-6 bg-gradient-to-b from-amber-500/20 via-amber-500/10 to-amber-500/20 rounded-2xl border-x-2 border-amber-400/50 shadow-2xl backdrop-blur-sm pointer-events-auto">
              <div className="absolute inset-y-0 w-[2px] border-r-2 border-dashed border-amber-300/60" />
              <div className="z-10 bg-slate-950/95 border border-amber-400/60 text-amber-300 font-extrabold text-[10px] uppercase tracking-wider px-2 py-1 rounded-md text-center shadow-lg whitespace-nowrap -rotate-90 origin-center mb-8">
                North to Ahmedabad &amp; Airport ↑
              </div>
              <div className="z-10 bg-amber-500 text-slate-950 font-black text-[11px] px-2 py-1.5 rounded-lg shadow-xl text-center whitespace-nowrap -rotate-90 origin-center">
                🛣️ NH-751 EXPRESSWAY (10-LANE)
              </div>
              <div className="z-10 bg-slate-950/95 border border-amber-400/60 text-amber-300 font-extrabold text-[10px] uppercase tracking-wider px-2 py-1 rounded-md text-center shadow-lg whitespace-nowrap -rotate-90 origin-center mt-8">
                South to ABCD &amp; Bhavnagar ↓
              </div>
            </div>

            {/* Connecting Access Road from Township Entrance to 250m Expressway */}
            <div className="absolute right-[244px] top-[715px] w-[95px] h-[36px] bg-slate-900/90 border-y-2 border-amber-400/70 flex items-center justify-center shadow-xl pointer-events-auto">
              <span className="text-[8px] font-black text-amber-300 whitespace-nowrap px-1 bg-slate-950/90 rounded border border-amber-500/40">
                ← 250m LINK ROAD →
              </span>
            </div>

            {/* Surrounding Landmark Markers (Google Maps Style) */}
            {/* 1. Dholera International Airport */}
            <div
              onClick={() => setSelectedLandmark(SURROUNDING_LANDMARKS.find((l) => l.id === "dholera-airport") || null)}
              className="absolute right-[110px] top-[100px] cursor-pointer group pointer-events-auto transition-transform hover:scale-105"
            >
              <div className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-sky-700 text-white px-3 py-1.5 rounded-xl border border-sky-300 shadow-2xl backdrop-blur-md">
                <Plane size={15} className="text-white animate-pulse" />
                <div>
                  <div className="text-[11px] font-black flex items-center gap-1.5">
                    <span>Dholera Int'l Airport (DIA)</span>
                    <span className="bg-black/30 text-[9px] px-1.5 py-0.5 rounded-md text-sky-200">14 km</span>
                  </div>
                  <div className="text-[9px] text-sky-100 font-medium">Greenfield 4000m Dual Runway Cargo Hub</div>
                </div>
              </div>
            </div>

            {/* 2. ABCD Administrative Headquarters */}
            <div
              onClick={() => setSelectedLandmark(SURROUNDING_LANDMARKS.find((l) => l.id === "abcd-hq") || null)}
              className="absolute right-[110px] top-[780px] cursor-pointer group pointer-events-auto transition-transform hover:scale-105"
            >
              <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-3 py-1.5 rounded-xl border border-indigo-300 shadow-2xl backdrop-blur-md">
                <Building2 size={15} className="text-white" />
                <div>
                  <div className="text-[11px] font-black flex items-center gap-1.5">
                    <span>ABCD Building (DSIRDA HQ)</span>
                    <span className="bg-black/30 text-[9px] px-1.5 py-0.5 rounded-md text-indigo-200">8 km</span>
                  </div>
                  <div className="text-[9px] text-indigo-100 font-medium">Smart City Administrative Command Center</div>
                </div>
              </div>
            </div>

            {/* 3. Tata Semiconductor Plant */}
            <div
              onClick={() => setSelectedLandmark(SURROUNDING_LANDMARKS.find((l) => l.id === "tata-semiconductor") || null)}
              className="absolute right-[110px] top-[460px] cursor-pointer group pointer-events-auto transition-transform hover:scale-105"
            >
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 py-1.5 rounded-xl border border-purple-300 shadow-2xl backdrop-blur-md">
                <Factory size={15} className="text-white" />
                <div>
                  <div className="text-[11px] font-black flex items-center gap-1.5">
                    <span>Tata Semiconductor Plant</span>
                    <span className="bg-black/30 text-[9px] px-1.5 py-0.5 rounded-md text-purple-200">12 km</span>
                  </div>
                  <div className="text-[9px] text-purple-100 font-medium">$11 Billion Mega-Fab &amp; High-Tech Zone</div>
                </div>
              </div>
            </div>

            {/* 4. Proposed Metro / Railway Station */}
            <div
              onClick={() => setSelectedLandmark(SURROUNDING_LANDMARKS.find((l) => l.id === "metro-rail") || null)}
              className="absolute right-[170px] bottom-[140px] cursor-pointer group pointer-events-auto transition-transform hover:scale-105"
            >
              <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-3 py-1.5 rounded-xl border border-emerald-300 shadow-2xl backdrop-blur-md">
                <Navigation size={14} className="text-white" />
                <div>
                  <div className="text-[11px] font-black flex items-center gap-1.5">
                    <span>Dholera Metro / Rail Station</span>
                    <span className="bg-black/30 text-[9px] px-1.5 py-0.5 rounded-md text-emerald-200">Walking Dist.</span>
                  </div>
                  <div className="text-[9px] text-emerald-100 font-medium">Ahmedabad-Dholera MRTS Station</div>
                </div>
              </div>
            </div>

            {/* 5. Cher Village & Residential Hub */}
            <div
              onClick={() => setSelectedLandmark(SURROUNDING_LANDMARKS.find((l) => l.id === "cher-village") || null)}
              className="absolute left-[130px] bottom-[260px] cursor-pointer group pointer-events-auto transition-transform hover:scale-105"
            >
              <div className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 text-white px-3 py-1.5 rounded-xl border border-amber-500/40 shadow-2xl backdrop-blur-md">
                <Compass size={14} className="text-amber-400" />
                <div>
                  <div className="text-[11px] font-black flex items-center gap-1.5">
                    <span>Cher Village &amp; Markets</span>
                    <span className="bg-amber-500/20 text-[9px] px-1.5 py-0.5 rounded-md text-amber-300">2 km</span>
                  </div>
                  <div className="text-[9px] text-slate-300 font-medium">Local Schools, Medical &amp; Amenities</div>
                </div>
              </div>
            </div>

            {/* 6. Aakru Village & Temples (Immediate Neighbor - 500-600m West) */}
            <div
              onClick={() => setSelectedLandmark(SURROUNDING_LANDMARKS.find((l) => l.id === "aakru-village") || null)}
              className="absolute left-[90px] top-[340px] cursor-pointer group pointer-events-auto transition-transform hover:scale-105"
            >
              <div className="flex items-center gap-2 bg-gradient-to-r from-rose-950 to-slate-900 text-white px-3 py-1.5 rounded-xl border border-rose-500/50 shadow-2xl backdrop-blur-md">
                <span className="text-sm">🏡</span>
                <div>
                  <div className="text-[11px] font-black flex items-center gap-1.5">
                    <span>Aakru Village &amp; Mandirs</span>
                    <span className="bg-rose-500/20 text-[9px] px-1.5 py-0.5 rounded-md text-rose-300">600 m</span>
                  </div>
                  <div className="text-[9px] text-slate-300 font-medium">Chamunda &amp; Meldi Mata Temples, Primary School</div>
                </div>
              </div>
            </div>

            {/* 7. Dhandhuka Junction */}
            <div
              onClick={() => setSelectedLandmark(SURROUNDING_LANDMARKS.find((l) => l.id === "dhandhuka") || null)}
              className="absolute left-[110px] top-[160px] cursor-pointer group pointer-events-auto transition-transform hover:scale-105"
            >
              <div className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 text-white px-3 py-1.5 rounded-xl border border-slate-600 shadow-2xl backdrop-blur-md">
                <Building2 size={14} className="text-slate-300" />
                <div>
                  <div className="text-[11px] font-black flex items-center gap-1.5">
                    <span>Dhandhuka Town</span>
                    <span className="bg-slate-700 text-[9px] px-1.5 py-0.5 rounded-md text-slate-300">14 km</span>
                  </div>
                  <div className="text-[9px] text-slate-400 font-medium">Sub-district Center &amp; Colleges</div>
                </div>
              </div>
            </div>

            {/* 7. Ahmedabad Metropolis (North) */}
            <div
              onClick={() => setSelectedLandmark(SURROUNDING_LANDMARKS.find((l) => l.id === "ahmedabad") || null)}
              className="absolute top-[30px] left-1/2 -translate-x-1/2 cursor-pointer group pointer-events-auto transition-transform hover:scale-105"
            >
              <div className="flex items-center gap-2 bg-slate-950/95 text-amber-300 px-4 py-1.5 rounded-full border border-amber-500/50 shadow-2xl backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs font-black">↑ Ahmedabad Metropolis (75 km • 50 min via 10-Lane Expressway)</span>
              </div>
            </div>

            {/* 8. Bhavnagar City & Port (South) */}
            <div
              onClick={() => setSelectedLandmark(SURROUNDING_LANDMARKS.find((l) => l.id === "bhavnagar") || null)}
              className="absolute bottom-[30px] left-1/2 -translate-x-1/2 cursor-pointer group pointer-events-auto transition-transform hover:scale-105"
            >
              <div className="flex items-center gap-2 bg-slate-950/95 text-slate-300 px-4 py-1.5 rounded-full border border-slate-700 shadow-2xl backdrop-blur-md">
                <span className="text-xs font-black">↓ Bhavnagar City &amp; Coastal Port (60 km • 75 min)</span>
              </div>
            </div>
          </div>

          {/* Core Master Plan Canvas Card (exact portrait proportion of the cropped layout: 450x770) */}
          <div
            className="relative z-10 h-[88%] w-auto max-w-[90vw] aspect-[450/770] rounded-3xl overflow-hidden shadow-2xl transition-all"
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.95), 0 0 50px rgba(212, 175, 55, 0.12), 0 0 0 1.5px rgba(212, 175, 55, 0.35)"
            }}
          >
          {/* Interactive vector blueprint */}
          <svg
            viewBox="95 305 450 770"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-full pointer-events-auto select-none"
          >
            <defs>
              <pattern id="blueprint-grid-minor" width="12" height="12" patternUnits="userSpaceOnUse">
                <path d="M 12 0 L 0 0 0 12" fill="none" stroke="#16445b" strokeWidth="0.55" />
              </pattern>
              <pattern id="blueprint-grid-major" width="60" height="60" patternUnits="userSpaceOnUse">
                <rect width="60" height="60" fill="url(#blueprint-grid-minor)" />
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#27627a" strokeWidth="0.9" />
              </pattern>
              {/* Pulse glowing filter for selected plot */}
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#f59e0b" floodOpacity="0.9" />
              </filter>
              <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#10b981" floodOpacity="0.8" />
              </filter>
            </defs>

            <rect x="95" y="305" width="450" height="770" fill="#071521" />
            <rect x="95" y="305" width="450" height="770" fill="url(#blueprint-grid-major)" />
            <rect x="95" y="305" width="450" height="770" fill="none" stroke="#4b91aa" strokeWidth="1.2" />

            {/* 1. Common Open Amenity Areas (COP-1 to COP-7) */}
            <g className="amenities-layer pointer-events-auto">
              {COMMON_AMENITY_AREAS.map((amenity) => {
                const isHovered = hoveredAmenity?.id === amenity.id;
                return (
                  <g key={amenity.id}>
                    <polygon
                      points={amenity.polygonPoints}
                      fill="#059669"
                      fillOpacity={isHovered ? 0.65 : 0.35}
                      stroke={isHovered ? "#34d399" : "#10b981"}
                      strokeWidth={isHovered ? 1.8 : 1}
                      strokeDasharray={isHovered ? "none" : "2,2"}
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={(e) => {
                        setHoveredAmenity(amenity);
                        setTooltipPos({ x: e.clientX, y: e.clientY });
                      }}
                      onMouseLeave={() => setHoveredAmenity(null)}
                    />
                    {/* Amenity label text */}
                    <text
                      x={amenity.coordinates.x + amenity.coordinates.width / 2}
                      y={amenity.coordinates.y + amenity.coordinates.height / 2}
                      fill="#6ee7b7"
                      fontSize="6.5"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="pointer-events-none"
                      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.9)" }}
                    >
                      {amenity.code}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* 2. All 145 Demarcated Plots */}
            <g className="plots-layer pointer-events-auto">
              {plots.map((plot) => {
                const isFiltered = filteredPlotIds.has(plot.id);
                const isSelected = selectedPlot?.id === plot.id;
                const isHovered = hoveredPlot?.id === plot.id;
                const isVilla = plot.type === "Luxurious Villa";

                // Filter logic based on navigation level
                let isDimmed = !isFiltered;
                if (navigationLevel === "residential" && isVilla) {
                  isDimmed = true;
                } else if (navigationLevel === "villa" && !isVilla) {
                  isDimmed = true;
                }

                // Status colors
                let fillColor = "#10b981"; // available (emerald)
                let strokeColor = "#34d399";
                if (plot.status === "booked") {
                  fillColor = "#ef4444"; // booked (rose)
                  strokeColor = "#f87171";
                } else if (plot.status === "reserved") {
                  fillColor = "#f59e0b"; // reserved (amber)
                  strokeColor = "#fbbf24";
                }

                if (isVilla) {
                  strokeColor = isSelected ? "#fef08a" : "#f59e0b";
                }

                // Opacity logic
                let fillOpacity = 0.22;
                if (isSelected) {
                  fillOpacity = 0.8;
                } else if (isHovered) {
                  fillOpacity = 0.65;
                } else if (isDimmed) {
                  fillOpacity = 0.05;
                } else if (isVilla) {
                  fillOpacity = 0.32;
                }

                const strokeWidth = isSelected ? 2.5 : isHovered ? 1.8 : 0.85;

                return (
                  <g key={plot.id}>
                    {plot.polygonPoints ? (
                      <polygon
                        points={plot.polygonPoints}
                        fill={fillColor}
                        fillOpacity={fillOpacity}
                        stroke={isSelected ? "#ffffff" : isHovered ? "#fef08a" : strokeColor}
                        strokeWidth={strokeWidth}
                        filter={isSelected ? "url(#goldGlow)" : isHovered ? "url(#emeraldGlow)" : undefined}
                        className="cursor-pointer transition-all duration-150"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPlot(plot);
                        }}
                        onMouseEnter={(e) => {
                          setHoveredPlot(plot);
                          setTooltipPos({ x: e.clientX, y: e.clientY });
                        }}
                        onMouseLeave={() => setHoveredPlot(null)}
                      />
                    ) : (
                      <rect
                        x={plot.coordinates.x}
                        y={plot.coordinates.y}
                        width={plot.coordinates.width}
                        height={plot.coordinates.height}
                        fill={fillColor}
                        fillOpacity={fillOpacity}
                        stroke={isSelected ? "#ffffff" : isHovered ? "#fef08a" : strokeColor}
                        strokeWidth={strokeWidth}
                        rx={1.5}
                        filter={isSelected ? "url(#goldGlow)" : undefined}
                        className="cursor-pointer transition-all duration-150"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPlot(plot);
                        }}
                        onMouseEnter={(e) => {
                          setHoveredPlot(plot);
                          setTooltipPos({ x: e.clientX, y: e.clientY });
                        }}
                        onMouseLeave={() => setHoveredPlot(null)}
                      />
                    )}

                    {/* Vector Plot number at center */}
                    {plot.center && (
                      <text
                        x={plot.center.x}
                        y={plot.center.y}
                        fill={isDimmed ? "rgba(255,255,255,0.25)" : isSelected ? "#ffffff" : "#f1f5f9"}
                        fontSize={isSelected ? "7.5" : "6.2"}
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="pointer-events-none"
                        style={{
                          textShadow: isSelected
                            ? "0 0 3px #f59e0b, 0 1px 2px #000"
                            : "0 1px 2px rgba(0,0,0,0.95)"
                        }}
                      >
                        {plot.plotNumber}
                      </text>
                    )}

                    {/* Luxury Villa Diamond Indicator on villa plots */}
                    {isVilla && plot.center && !isDimmed && (
                      <circle
                        cx={plot.center.x}
                        cy={plot.center.y - 6}
                        r={1.2}
                        fill="#fef08a"
                        stroke="#b45309"
                        strokeWidth={0.4}
                        className="pointer-events-none animate-pulse"
                      />
                    )}
                  </g>
                );
              })}
            </g>

            {/* Selected Plot Highlight Ring */}
            {selectedPlot?.center && (
              <g className="pointer-events-none">
                <circle
                  cx={selectedPlot.center.x}
                  cy={selectedPlot.center.y}
                  r={12}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth={1.5}
                  strokeDasharray="3,2"
                  className="animate-spin"
                  style={{ transformOrigin: `${selectedPlot.center.x}px ${selectedPlot.center.y}px`, animationDuration: "8s" }}
                />
              </g>
            )}
          </svg>
        </div>
        </div>
      </div>

      {/* Surrounding Landmark Information Modal */}
      {selectedLandmark && (
        <div className="fixed inset-0 z-[500] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-amber-500/40 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl relative animate-in fade-in duration-200">
            <button
              onClick={() => setSelectedLandmark(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>

            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Surrounding Infrastructure
            </span>

            <h3 className="text-xl font-black text-white mt-2 tracking-tight">
              {selectedLandmark.name}
            </h3>

            <div className="grid grid-cols-2 gap-2 my-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] text-slate-400">Distance from Meadows:</span>
                <p className="text-base font-black text-amber-400 mt-0.5">{selectedLandmark.distance}</p>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] text-slate-400">Approx. Drive Time:</span>
                <p className="text-base font-black text-emerald-400 mt-0.5">{selectedLandmark.driveTime}</p>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed mb-5">
              {selectedLandmark.description}
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedLandmark(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs text-center transition-all border border-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Amenity Tooltip */}
      {hoveredAmenity && tooltipPos && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: `${tooltipPos.x + 16}px`,
            top: `${tooltipPos.y + 16}px`,
            maxWidth: "280px"
          }}
        >
          <div className="bg-slate-950/95 border border-emerald-500/40 rounded-2xl p-3 shadow-2xl backdrop-blur-2xl text-white text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
              <Trees size={14} />
              <span>{hoveredAmenity.code}: {hoveredAmenity.name}</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed mb-1.5">
              {hoveredAmenity.description}
            </p>
            <div className="text-[10px] text-emerald-300 font-semibold">
              Total Area: {hoveredAmenity.areaSqYd} Sq. Yards ({hoveredAmenity.areaSqMtr} Sq. Mt)
            </div>
          </div>
        </div>
      )}

      {/* Map Legend (Requirement 9) */}
      <MasterPlanLegend
        availableCount={availableCount}
        reservedCount={reservedCount}
        bookedCount={bookedCount}
        villaCount={villaCount}
      />
    </div>
  );
};

export default MasterPlanCanvas;
