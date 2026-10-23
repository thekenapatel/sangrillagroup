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
  X,
  Sun,
  Waves,
  School,
  Cpu,
  Store,
  MapPin,
  ExternalLink,
  Train
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

interface SurroundingMarkerConfig {
  id: string;
  x: number;
  y: number;
  theme: "airport" | "expressway" | "transport" | "industry" | "admin" | "city" | "temple" | "civic" | "nature" | "infrastructure" | "village";
  iconType: "plane" | "cpu" | "building" | "train" | "waves" | "temple" | "school" | "village" | "store" | "sun" | "navigation";
  customSubtitle?: string;
}

const SURROUNDING_MARKER_CONFIGS: SurroundingMarkerConfig[] = [
  // --- North ---
  { id: "ahmedabad", x: 1100, y: 55, theme: "city", iconType: "navigation", customSubtitle: "Capital Metropolis • 50 min via 10-Lane NH-751 Expressway" },
  { id: "dholera-airport", x: 1220, y: 175, theme: "airport", iconType: "plane", customSubtitle: "Greenfield 4,000m Dual Runway Cargo & Passenger Hub" },
  { id: "otariya-village", x: 960, y: 300, theme: "village", iconType: "village", customSubtitle: "Agrarian Village along Northward Highway" },

  // --- East (along & beyond 10-Lane Expressway) ---
  { id: "tata-semiconductor", x: 1520, y: 125, theme: "industry", iconType: "cpu", customSubtitle: "$11 Billion Mega-Fab • 50,000+ High-Tech Jobs" },
  { id: "tp1-activation", x: 1520, y: 255, theme: "admin", iconType: "building", customSubtitle: "Knowledge & IT Zone • Smart City Activation Core" },
  { id: "dholera-metro-city", x: 1520, y: 385, theme: "city", iconType: "building", customSubtitle: "Planned Plotted Enclave on Expressway Corridor" },
  { id: "metro-rail", x: 1520, y: 515, theme: "transport", iconType: "train", customSubtitle: "Ahmedabad-Dholera High-Speed MRTS Station" },
  { id: "riverfront", x: 1520, y: 645, theme: "nature", iconType: "waves", customSubtitle: "Artificial Riverfront • Canal Promenade & Boating" },
  { id: "abcd-hq", x: 1520, y: 775, theme: "admin", iconType: "building", customSubtitle: "DSIRDA Command Center & Smart City Admin HQ" },
  { id: "city-centre", x: 1520, y: 905, theme: "city", iconType: "building", customSubtitle: "TP-1 Central Business District & Corporate Towers" },
  { id: "valinda", x: 1520, y: 1035, theme: "village", iconType: "navigation", customSubtitle: "TP-2 Junction & Eastern Industrial Gateway" },

  // --- West (Aakru Village Amenities & Regional West) ---
  { id: "dhandhuka", x: 190, y: 280, theme: "city", iconType: "building", customSubtitle: "Sub-district Center • Colleges & District Hospital" },
  { id: "meldi-temple", x: 530, y: 440, theme: "temple", iconType: "temple", customSubtitle: "Heritage Village Temple • Devotional Landmark" },
  { id: "chamunda-temple", x: 510, y: 570, theme: "temple", iconType: "temple", customSubtitle: "Historic Chamunda Mandir • Walking Distance" },
  { id: "aakru-school", x: 510, y: 700, theme: "civic", iconType: "school", customSubtitle: "Government Primary School Campus & Playground" },
  { id: "aakru-village", x: 480, y: 830, theme: "village", iconType: "village", customSubtitle: "Gram Panchayat, Civic Administration & Village Bazaar" },
  { id: "aakru-lake", x: 520, y: 960, theme: "nature", iconType: "waves", customSubtitle: "Scenic Village Freshwater Lake & Water Body" },
  { id: "sandhida-village", x: 190, y: 900, theme: "village", iconType: "village", customSubtitle: "Western SIR Peripheral Settlement" },

  // --- South ---
  { id: "cher-village", x: 920, y: 1300, theme: "village", iconType: "store", customSubtitle: "Local Crossroads Market, Groceries, Medical & Fuel" },
  { id: "solar-park", x: 1210, y: 1420, theme: "infrastructure", iconType: "sun", customSubtitle: "5,000 MW Solar Park & 400KV Grid Substation" },
  { id: "bhavnagar", x: 1100, y: 1580, theme: "city", iconType: "navigation", customSubtitle: "Historic Port City & Industrial Harbor • 70 min" }
];

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
  const [planStyle, setPlanStyle] = useState<"gold" | "cad">("gold");
  const [showSurroundings, setShowSurroundings] = useState<boolean>(true);

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

  // Initial responsive fit: comfortably display master plan layout & surrounding locations
  useEffect(() => {
    if (typeof window !== "undefined") {
      const w = window.innerWidth;
      const initial = w < 640 ? 0.62 : w < 1024 ? 0.75 : 0.86;
      applyTransform(initial, { x: 0, y: 0 });
    }
  }, []);

  const handleZoomIn = () => {
    applyTransform(clampScale(scaleRef.current * 1.2));
    setShowUserInstruction(false);
  };
  const handleZoomOut = () => {
    applyTransform(clampScale(scaleRef.current / 1.2));
    setShowUserInstruction(false);
  };
  const handleResetZoom = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    const fit = w < 640 ? 0.62 : w < 1024 ? 0.75 : 0.86;
    applyTransform(fit, { x: 0, y: 0 });
  };

  const renderMarkerIcon = (type: string) => {
    switch (type) {
      case "plane":
        return <Plane size={15} className="text-sky-300 shrink-0 animate-pulse" />;
      case "cpu":
        return <Cpu size={15} className="text-purple-300 shrink-0" />;
      case "building":
        return <Building2 size={15} className="text-indigo-300 shrink-0" />;
      case "train":
        return <Train size={15} className="text-emerald-300 shrink-0" />;
      case "waves":
        return <Waves size={15} className="text-cyan-300 shrink-0" />;
      case "school":
        return <School size={15} className="text-rose-300 shrink-0" />;
      case "sun":
        return <Sun size={15} className="text-amber-300 shrink-0" />;
      case "store":
        return <Store size={15} className="text-amber-300 shrink-0" />;
      case "navigation":
        return <Navigation size={14} className="text-slate-300 shrink-0" />;
      case "temple":
        return <span className="text-sm shrink-0">🛕</span>;
      case "village":
      default:
        return <span className="text-sm shrink-0">🏡</span>;
    }
  };

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case "airport":
        return {
          card: "bg-slate-950/90 border-sky-500/40 hover:border-sky-400 hover:shadow-sky-500/20",
          badge: "bg-sky-500/20 text-sky-300 border-sky-500/40",
          title: "text-sky-100"
        };
      case "industry":
        return {
          card: "bg-slate-950/90 border-purple-500/40 hover:border-purple-400 hover:shadow-purple-500/20",
          badge: "bg-purple-500/20 text-purple-300 border-purple-500/40",
          title: "text-purple-100"
        };
      case "admin":
        return {
          card: "bg-slate-950/90 border-indigo-500/40 hover:border-indigo-400 hover:shadow-indigo-500/20",
          badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
          title: "text-indigo-100"
        };
      case "transport":
        return {
          card: "bg-slate-950/90 border-emerald-500/40 hover:border-emerald-400 hover:shadow-emerald-500/20",
          badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
          title: "text-emerald-100"
        };
      case "infrastructure":
        return {
          card: "bg-slate-950/90 border-amber-500/40 hover:border-amber-400 hover:shadow-amber-500/20",
          badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
          title: "text-amber-100"
        };
      case "temple":
        return {
          card: "bg-slate-950/90 border-orange-500/40 hover:border-orange-400 hover:shadow-orange-500/20",
          badge: "bg-orange-500/20 text-orange-300 border-orange-500/40",
          title: "text-orange-100"
        };
      case "civic":
        return {
          card: "bg-slate-950/90 border-rose-500/40 hover:border-rose-400 hover:shadow-rose-500/20",
          badge: "bg-rose-500/20 text-rose-300 border-rose-500/40",
          title: "text-rose-100"
        };
      case "nature":
        return {
          card: "bg-slate-950/90 border-cyan-500/40 hover:border-cyan-400 hover:shadow-cyan-500/20",
          badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
          title: "text-cyan-100"
        };
      case "city":
        return {
          card: "bg-slate-950/90 border-amber-500/40 hover:border-amber-400 hover:shadow-amber-500/20",
          badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
          title: "text-amber-100"
        };
      case "village":
      default:
        return {
          card: "bg-slate-950/90 border-slate-700/60 hover:border-slate-500 hover:shadow-slate-500/20",
          badge: "bg-slate-800 text-slate-300 border-slate-700",
          title: "text-slate-100"
        };
    }
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

  // When selectedPlot changes, center on it smoothly
  useEffect(() => {
    if (selectedPlot && selectedPlot.center) {
      // SVG center is (selectedPlot.center.x, selectedPlot.center.y)
      // ViewBox is 95, 305, 450, 770. Center is (320, 690)
      const dx = selectedPlot.center.x - 320;
      const dy = selectedPlot.center.y - 690;
      const zoomTarget = Math.max(scaleRef.current, 1.4);
      applyTransform(zoomTarget, {
        x: -dx * zoomTarget * 0.85,
        y: -dy * zoomTarget * 0.85
      });
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

      {/* Floating Viewport Controls (Bottom-Left: Pan, Zoom, Style & Fit) */}
      <div className="absolute bottom-16 sm:bottom-6 left-4 sm:left-6 z-20 flex flex-col gap-1.5 bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-1.5 shadow-2xl text-white">
        <button
          onClick={handleZoomIn}
          title="Zoom In (+)"
          className="w-9 h-9 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out (-)"
          className="w-9 h-9 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <ZoomOut size={16} />
        </button>
        <button
          onClick={handleResetZoom}
          title="Reset to Fit View (0)"
          className="w-9 h-9 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <RotateCcw size={15} />
        </button>
        <button
          onClick={() => setShowSurroundings((s) => !s)}
          title={showSurroundings ? "Hide Surrounding Landmarks" : "Show All Surrounding Landmarks"}
          className={`w-9 h-9 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition-colors ${
            showSurroundings ? "text-amber-400 hover:bg-amber-500/20" : "text-slate-500 hover:bg-slate-800"
          }`}
        >
          <MapPin size={15} />
        </button>
        <div className="w-5 h-[1px] bg-slate-800 mx-auto my-0.5" />
        <button
          onClick={() => setPlanStyle((s) => (s === "gold" ? "cad" : "gold"))}
          title={planStyle === "gold" ? "Switch to High-Contrast CAD Layout" : "Switch to Luxury Gold Blueprint"}
          className={`w-9 h-9 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition-colors ${
            planStyle === "gold"
              ? "text-amber-400 hover:bg-amber-500/20"
              : "text-sky-300 hover:bg-sky-500/20"
          }`}
        >
          <Layers size={15} />
        </button>
        <div className="w-5 h-[1px] bg-slate-800 mx-auto my-0.5" />
        <button
          onClick={onToggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
          className="w-9 h-9 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
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
          {/* Surrounding Places Environment (Surrounds Master Plan with All Regional Infrastructure & Settlements) */}
          <div
            className="absolute select-none pointer-events-auto transition-opacity duration-300"
            style={{
              width: "2200px",
              height: "1700px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              opacity: showSurroundings ? (scale > 2.8 ? 0.35 : 1) : 0,
              pointerEvents: showSurroundings ? "auto" : "none"
            }}
          >
            {/* SVG Vector Backdrop: Concentric Distance Rings, Radial Axis Lines, Connector Rays & Directional Compass */}
            <svg
              viewBox="0 0 2200 1700"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <defs>
                <radialGradient id="surroundGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#d4af37" stopOpacity="0.06" />
                  <stop offset="35%" stopColor="#0ea5e9" stopOpacity="0.03" />
                  <stop offset="100%" stopColor="#060a12" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect width="2200" height="1700" fill="url(#surroundGlow)" />

              {/* Concentric Distance Rings centered at (1100, 850) */}
              {/* 500m Radius */}
              <circle cx="1100" cy="850" r="280" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,6" opacity="0.3" />
              {/* 1.2 km Radius */}
              <circle cx="1100" cy="850" r="400" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="5,6" opacity="0.25" />
              {/* 2.5 km Radius */}
              <circle cx="1100" cy="850" r="540" fill="none" stroke="#0ea5e9" strokeWidth="1.2" strokeDasharray="6,6" opacity="0.22" />
              {/* 10 km Radius */}
              <circle cx="1100" cy="850" r="700" fill="none" stroke="#818cf8" strokeWidth="1.2" strokeDasharray="8,8" opacity="0.18" />
              {/* 18 km Radius */}
              <circle cx="1100" cy="850" r="840" fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="10,8" opacity="0.14" />

              {/* Dotted Radial Connector Rays from Layout Boundaries to Key Nodes */}
              {/* Link road axis to Expressway */}
              <line x1="1325" y1="850" x2="1420" y2="850" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" opacity="0.8" />
              {/* Center to Tata Semiconductor */}
              <line x1="1325" y1="520" x2="1520" y2="150" stroke="#c084fc" strokeWidth="1.2" strokeDasharray="4,4" opacity="0.4" />
              {/* Center to Dholera Metro Station */}
              <line x1="1325" y1="700" x2="1520" y2="540" stroke="#34d399" strokeWidth="1.2" strokeDasharray="4,4" opacity="0.5" />
              {/* Center to Riverfront */}
              <line x1="1325" y1="800" x2="1520" y2="670" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="4,4" opacity="0.4" />
              {/* Center to ABCD Building */}
              <line x1="1325" y1="900" x2="1520" y2="800" stroke="#818cf8" strokeWidth="1.2" strokeDasharray="4,4" opacity="0.4" />
              {/* Center to City Centre */}
              <line x1="1325" y1="980" x2="1520" y2="930" stroke="#a78bfa" strokeWidth="1.2" strokeDasharray="4,4" opacity="0.4" />
              {/* Center to Valinda */}
              <line x1="1325" y1="1100" x2="1520" y2="1060" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4,4" opacity="0.3" />
              {/* Center to Dholera Airport */}
              <line x1="1160" y1="465" x2="1220" y2="200" stroke="#38bdf8" strokeWidth="1.4" strokeDasharray="4,4" opacity="0.5" />
              {/* Center to Otariya */}
              <line x1="1020" y1="465" x2="980" y2="330" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4,4" opacity="0.35" />
              {/* Center to Ahmedabad */}
              <line x1="1100" y1="465" x2="1100" y2="90" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,5" opacity="0.5" />
              {/* Center to Meldi Mataji Temple */}
              <line x1="875" y1="580" x2="680" y2="470" stroke="#fb923c" strokeWidth="1.2" strokeDasharray="4,4" opacity="0.45" />
              {/* Center to Chamunda Mataji Temple */}
              <line x1="875" y1="670" x2="660" y2="600" stroke="#fb923c" strokeWidth="1.2" strokeDasharray="4,4" opacity="0.45" />
              {/* Center to Aakru School */}
              <line x1="875" y1="770" x2="660" y2="730" stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="4,4" opacity="0.4" />
              {/* Center to Aakru Village */}
              <line x1="875" y1="870" x2="650" y2="860" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="4,4" opacity="0.5" />
              {/* Center to Aakru Lake */}
              <line x1="875" y1="970" x2="680" y2="990" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="4,4" opacity="0.45" />
              {/* Center to Sandhida */}
              <line x1="875" y1="1050" x2="380" y2="930" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4,4" opacity="0.3" />
              {/* Center to Dhandhuka */}
              <line x1="875" y1="500" x2="380" y2="310" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4,4" opacity="0.35" />
              {/* Center to Cher Village */}
              <line x1="1020" y1="1235" x2="980" y2="1330" stroke="#f59e0b" strokeWidth="1.3" strokeDasharray="4,4" opacity="0.45" />
              {/* Center to Solar Park */}
              <line x1="1160" y1="1235" x2="1210" y2="1450" stroke="#eab308" strokeWidth="1.3" strokeDasharray="4,4" opacity="0.45" />
              {/* Center to Bhavnagar */}
              <line x1="1100" y1="1235" x2="1100" y2="1550" stroke="#94a3b8" strokeWidth="1.4" strokeDasharray="5,5" opacity="0.45" />

              {/* Compass Rose at Top-Right (2040, 140) */}
              <g transform="translate(2040, 140)">
                <circle r="42" fill="#090d16" stroke="#d4af37" strokeWidth="1.2" opacity="0.75" />
                <circle r="38" fill="none" stroke="#d4af37" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.5" />
                {/* North needle */}
                <polygon points="0,-34 6,-4 0,0 -6,-4" fill="#ef4444" />
                {/* South needle */}
                <polygon points="0,34 6,4 0,0 -6,4" fill="#94a3b8" />
                {/* East/West */}
                <polygon points="34,0 4,6 0,0 4,-6" fill="#64748b" />
                <polygon points="-34,0 -4,6 0,0 -4,-6" fill="#64748b" />
                <circle r="3.5" fill="#d4af37" />
                <text x="0" y="-38" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="900" fontFamily="sans-serif">N</text>
                <text x="0" y="48" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="700" fontFamily="sans-serif">S</text>
                <text x="48" y="4" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="700" fontFamily="sans-serif">E</text>
                <text x="-48" y="4" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="700" fontFamily="sans-serif">W</text>
                <text x="0" y="62" textAnchor="middle" fill="#d4af37" fontSize="8" fontWeight="bold" letterSpacing="1">TRUE NORTH</text>
              </g>
            </svg>

            {/* Distance Ring Indicator Badges */}
            <div className="absolute top-[575px] left-[1100px] -translate-x-1/2 pointer-events-none">
              <span className="text-[9px] font-bold text-amber-400/90 bg-slate-950/90 px-2 py-0.5 rounded-full border border-amber-500/30 backdrop-blur-sm shadow-md">
                500m Immediate Walking Radius
              </span>
            </div>
            <div className="absolute top-[455px] left-[1100px] -translate-x-1/2 pointer-events-none">
              <span className="text-[9px] font-bold text-emerald-400/90 bg-slate-950/90 px-2 py-0.5 rounded-full border border-emerald-500/30 backdrop-blur-sm shadow-md">
                1.2 km Metro Transit Radius
              </span>
            </div>
            <div className="absolute top-[315px] left-[1100px] -translate-x-1/2 pointer-events-none">
              <span className="text-[9px] font-bold text-sky-400/90 bg-slate-950/90 px-2 py-0.5 rounded-full border border-sky-500/30 backdrop-blur-sm shadow-md">
                2.5 km Local Market &amp; Cher Radius
              </span>
            </div>
            <div className="absolute top-[155px] left-[1100px] -translate-x-1/2 pointer-events-none">
              <span className="text-[9px] font-bold text-indigo-400/90 bg-slate-950/90 px-2 py-0.5 rounded-full border border-indigo-500/30 backdrop-blur-sm shadow-md">
                10 km Dholera SIR Activation Hub
              </span>
            </div>
            <div className="absolute top-[15px] left-[1100px] -translate-x-1/2 pointer-events-none">
              <span className="text-[9px] font-bold text-slate-300 bg-slate-950/90 px-2.5 py-0.5 rounded-full border border-slate-700 backdrop-blur-sm shadow-md">
                18 km Airport &amp; Tata Mega-Fab Radius
              </span>
            </div>

            {/* 10-Lane Ahmedabad–Dholera Expressway (NH-751) Corridor (250m to the East) */}
            <div className="absolute left-[1420px] top-[60px] bottom-[60px] w-[58px] flex flex-col items-center justify-between py-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-xl border-x-2 border-amber-400/80 shadow-2xl backdrop-blur-sm pointer-events-auto z-10">
              <div className="absolute inset-y-0 w-[2px] border-r-2 border-dashed border-amber-200/70" />
              <div className="z-10 bg-slate-950/95 border border-amber-400/70 text-amber-300 font-extrabold text-[9px] uppercase tracking-wider px-2 py-1 rounded-md text-center shadow-lg whitespace-nowrap -rotate-90 origin-center mb-10">
                ↑ North to Ahmedabad &amp; Airport
              </div>
              <div className="z-10 bg-amber-500 text-slate-950 font-black text-[11px] px-2 py-1.5 rounded-lg shadow-xl text-center whitespace-nowrap -rotate-90 origin-center tracking-wider">
                🛣️ NH-751 EXPRESSWAY (10-LANE)
              </div>
              <div className="z-10 bg-slate-950/95 border border-amber-400/70 text-amber-300 font-extrabold text-[9px] uppercase tracking-wider px-2 py-1 rounded-md text-center shadow-lg whitespace-nowrap -rotate-90 origin-center mt-10">
                ↓ South to ABCD &amp; Bhavnagar
              </div>
            </div>

            {/* Connecting Access Road from Township Entrance to 250m Expressway */}
            <div className="absolute left-[1325px] top-[830px] w-[95px] h-[40px] bg-slate-900/90 border-y-2 border-amber-400/80 flex items-center justify-center shadow-xl pointer-events-auto z-10">
              <span className="text-[8px] font-black text-amber-300 whitespace-nowrap px-1.5 py-0.5 bg-slate-950/95 rounded border border-amber-500/50 shadow-md">
                ← 250m LINK ROAD →
              </span>
            </div>

            {/* All Surrounding Regional & Local Landmark Cards */}
            {SURROUNDING_MARKER_CONFIGS.map((marker) => {
              const landmark = SURROUNDING_LANDMARKS.find((l) => l.id === marker.id);
              if (!landmark) return null;
              const theme = getThemeClasses(marker.theme);
              const isPill = marker.id === "ahmedabad" || marker.id === "bhavnagar";

              if (isPill) {
                return (
                  <div
                    key={marker.id}
                    onClick={() => setSelectedLandmark(landmark)}
                    className="absolute cursor-pointer group pointer-events-auto transition-transform hover:scale-105 z-10 -translate-x-1/2"
                    style={{ left: `${marker.x}px`, top: `${marker.y}px` }}
                  >
                    <div className="flex items-center gap-2 bg-slate-950/95 text-amber-300 px-4 py-1.5 rounded-full border border-amber-500/50 shadow-2xl backdrop-blur-md">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                      <span className="text-xs font-black">{landmark.name} ({landmark.distance} • {landmark.driveTime})</span>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={marker.id}
                  onClick={() => setSelectedLandmark(landmark)}
                  className="absolute cursor-pointer group pointer-events-auto transition-transform hover:scale-105 z-10"
                  style={{ left: `${marker.x}px`, top: `${marker.y}px` }}
                >
                  <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border shadow-xl backdrop-blur-md transition-all ${theme.card}`}>
                    {renderMarkerIcon(marker.iconType)}
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[11px] font-black truncate max-w-[170px] ${theme.title}`}>{landmark.name}</span>
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded shrink-0 border ${theme.badge}`}>
                          {landmark.distance}
                        </span>
                      </div>
                      <div className="text-[9px] text-slate-300/90 font-medium truncate max-w-[210px]">
                        {marker.customSubtitle || landmark.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Core Master Plan Canvas (Border-free layout floating naturally on canvas) */}
          <div
            className="relative z-10 w-[450px] h-[770px] max-w-[94vw] max-h-[86vh] aspect-[450/770] transition-all select-none"
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

            {/* Seamless canvas background fill matching viewport (#060a12) - no border box */}
            <rect x="95" y="305" width="450" height="770" fill={planStyle === "gold" ? "#060a12" : "#ffffff"} />
            <rect x="95" y="305" width="450" height="770" fill="url(#blueprint-grid-major)" opacity={planStyle === "gold" ? 0.35 : 0.15} />

            {/* Architectural CAD Master Plan Layer from Layout Dholera PDF */}
            <image
              href={planStyle === "gold" ? "/assets/meadows/layout_luxury_gold.png" : "/assets/meadows/layout_clean_cropped.png"}
              x="95"
              y="305"
              width="450"
              height="770"
              preserveAspectRatio="none"
              opacity={planStyle === "gold" ? 0.92 : 0.88}
              className="pointer-events-none select-none"
            />

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
            {selectedLandmark.nameGujarati && (
              <p className="text-xs text-amber-400 font-medium mt-0.5">{selectedLandmark.nameGujarati}</p>
            )}

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

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=22.26677,72.00833&destination=${selectedLandmark.coordinates[0]},${selectedLandmark.coordinates[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs transition-colors"
              >
                <Navigation size={13} />
                <span>Google Maps Directions</span>
                <ExternalLink size={12} className="opacity-70" />
              </a>

              <button
                onClick={() => setSelectedLandmark(null)}
                className="py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs text-center transition-all border border-slate-700"
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

      {/* Floating Hovered Plot Tooltip (Naavik Style) */}
      {hoveredPlot && tooltipPos && !selectedPlot && (
        <div
          className="fixed pointer-events-none z-[700] -translate-x-1/2 -translate-y-full mb-3"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y - 12}px`
          }}
        >
          <div className="bg-slate-950/95 border border-amber-500/40 rounded-xl px-3 py-2 shadow-2xl backdrop-blur-xl text-white text-xs flex items-center gap-2.5">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-amber-300">Plot #{hoveredPlot.plotNumber}</span>
                <span
                  className={`text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase ${
                    hoveredPlot.status === "available"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : hoveredPlot.status === "booked"
                      ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                  }`}
                >
                  {hoveredPlot.status === "booked" ? "Sold" : hoveredPlot.status}
                </span>
              </div>
              <div className="text-[10px] text-slate-300 mt-0.5">
                {hoveredPlot.areaSqYards} Sq. Yd. • {hoveredPlot.facing} Facing
              </div>
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
