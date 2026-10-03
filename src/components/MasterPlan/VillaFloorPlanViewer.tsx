import React, { useState, useRef } from "react";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Layers,
  ChevronRight,
  ShieldCheck,
  Check,
  Compass,
  ArrowRight,
  Download,
  Building2,
  Sparkles,
  Home,
  Crown
} from "lucide-react";
import { SAN_GRILLA_MEADOWS_META } from "../../data/sangrillaMeadowsData";

interface VillaFloorPlanViewerProps {
  onBackToMaster: () => void;
  selectedPlotNumber?: number;
}

type FloorPlanTab = "ground" | "loft" | "sections" | "renders";

export const VillaFloorPlanViewer: React.FC<VillaFloorPlanViewerProps> = ({
  onBackToMaster,
  selectedPlotNumber
}) => {
  const [activeTab, setActiveTab] = useState<FloorPlanTab>("ground");
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string>("/assets/meadows/front-view.jpeg");

  // Zoom handlers
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.3, 3.5));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.3, 0.7));
  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.7), 3.5));
  };

  const galleryImages = [
    { src: "/assets/meadows/front-view.jpeg", label: "Front 3D Elevation" },
    { src: "/assets/meadows/front-side-view.jpeg", label: "Corner 3D Perspective" },
    { src: "/assets/meadows/up_res_1.jpg", label: "Township Aerial View" },
    { src: "/assets/meadows/living-area.jpeg", label: "Luxury Living Room" },
    { src: "/assets/meadows/bedroom.jpeg", label: "Master Bedroom" },
    { src: "/assets/meadows/loft-bedroom.jpeg", label: "Mezzanine Loft Bedroom" },
    { src: "/assets/meadows/kitchen.jpeg", label: "Modern Kitchen" },
    { src: "/assets/meadows/toilet.jpeg", label: "Premium Bathroom" }
  ];

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-950 text-white overflow-hidden select-none">
      {/* 1. Sub-Header Navigation for Floor Plans */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToMaster}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 transition-colors"
          >
            <span>← Master Plan</span>
          </button>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 text-xs">
            <Crown size={14} className="text-amber-400" />
            <span className="font-bold text-slate-200">
              Sangrilla Meadows Villa Architecture
            </span>
            {selectedPlotNumber && (
              <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-amber-300 border border-slate-700 font-semibold">
                Plot #{selectedPlotNumber}
              </span>
            )}
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab("ground");
              handleResetZoom();
            }}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeTab === "ground"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Ground Floor (410 Sq. Ft)
          </button>
          <button
            onClick={() => {
              setActiveTab("loft");
              handleResetZoom();
            }}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeTab === "loft"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Loft Level (150 Sq. Ft)
          </button>
          <button
            onClick={() => {
              setActiveTab("sections");
              handleResetZoom();
            }}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeTab === "sections"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Cross Sections
          </button>
          <button
            onClick={() => {
              setActiveTab("renders");
              handleResetZoom();
            }}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeTab === "renders"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            3D Elevation &amp; Gallery
          </button>
        </div>
      </div>

      {/* 2. Main Floor Plan Canvas / Gallery Area */}
      <div className="relative flex-1 w-full h-full min-h-0 flex flex-col md:flex-row overflow-hidden">
        {/* Left / Center: Interactive Map / Drawing Area */}
        <div
          className="relative flex-1 h-full overflow-hidden bg-slate-950 flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
        >
          {/* Zoom controls floating */}
          {activeTab !== "renders" && (
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-1.5 shadow-xl text-white">
              <button
                onClick={handleZoomIn}
                title="Zoom In"
                className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={handleZoomOut}
                title="Zoom Out"
                className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <ZoomOut size={16} />
              </button>
              <button
                onClick={handleResetZoom}
                title="Reset View"
                className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <RotateCcw size={15} />
              </button>
            </div>
          )}

          {/* Floating Instruction */}
          <div className="absolute top-4 left-4 z-20 bg-slate-900/80 backdrop-blur-md border border-slate-800/80 px-3 py-1.5 rounded-full text-[11px] text-slate-300 flex items-center gap-1.5 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>
              {activeTab === "ground" && "Ground Floor Layout • Living, Bed, Kitchen, Sit-out & Parking"}
              {activeTab === "loft" && "Loft Bedroom Level • Smart Mezzanine Architectural Concept"}
              {activeTab === "sections" && "Villa Architectural Cross-Sections A & B"}
              {activeTab === "renders" && "Click any thumbnail to preview high-res elevation / interior render"}
            </span>
          </div>

          {/* Pan & Zoom Viewport for 2D floor plans */}
          {activeTab !== "renders" ? (
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-75 ease-out p-6"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: "center center"
              }}
            >
              {activeTab === "ground" && (
                <div className="relative max-h-[85vh] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-white/5 backdrop-blur-md p-2">
                  <img
                    src="/assets/meadows/gf-plan.jpeg"
                    alt="Sangrilla Meadows Ground Floor Plan"
                    className="max-h-[75vh] w-auto object-contain rounded-xl"
                  />
                </div>
              )}

              {activeTab === "loft" && (
                <div className="relative max-h-[85vh] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-white/5 backdrop-blur-md p-2">
                  <img
                    src="/assets/meadows/loft-floor-plan.jpeg"
                    alt="Sangrilla Meadows Loft Floor Plan"
                    className="max-h-[75vh] w-auto object-contain rounded-xl"
                  />
                </div>
              )}

              {activeTab === "sections" && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-h-[85vh] overflow-auto p-4">
                  <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-white/5 p-2">
                    <p className="text-center text-xs font-bold text-amber-300 mb-1">Section A-A&apos;</p>
                    <img
                      src="/assets/meadows/villa-sec-a.jpeg"
                      alt="Section A-A"
                      className="max-h-[40vh] w-auto object-contain rounded-xl"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-white/5 p-2">
                    <p className="text-center text-xs font-bold text-amber-300 mb-1">Section B-B&apos;</p>
                    <img
                      src="/assets/meadows/villa-sec-b.jpeg"
                      alt="Section B-B"
                      className="max-h-[40vh] w-auto object-contain rounded-xl"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* 3D Gallery View */
            <div className="w-full h-full flex flex-col p-4 overflow-y-auto">
              <div className="flex-1 flex items-center justify-center max-h-[65vh] mb-4">
                <img
                  src={selectedGalleryImg}
                  alt="Selected Villa Render"
                  className="max-h-full max-w-full object-contain rounded-2xl border border-slate-800 shadow-2xl"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedGalleryImg(img.src)}
                    className={`shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedGalleryImg === img.src
                        ? "border-amber-400 scale-105 shadow-md shadow-amber-400/30"
                        : "border-slate-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Technical Architectural Specifications Dossier */}
        <div className="w-full md:w-[360px] lg:w-[400px] border-t md:border-t-0 md:border-l border-slate-800 bg-slate-950/95 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto text-xs">
          <div className="space-y-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Architectural Concept
              </span>
              <h3 className="text-xl font-black text-white mt-1.5 tracking-tight">
                Luxury Smart Porch Villa
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                Engineered for maximum natural light, cross-ventilation, and private loft space.
              </p>
            </div>

            {/* Area Breakdown Cards */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] text-slate-400 uppercase">Ground Floor</span>
                <p className="text-lg font-black text-amber-400 mt-0.5">410 Sq. Ft</p>
                <span className="text-[10px] text-slate-400">Living, Bed, Kitchen</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] text-slate-400 uppercase">Loft Floor</span>
                <p className="text-lg font-black text-emerald-400 mt-0.5">150 Sq. Ft</p>
                <span className="text-[10px] text-slate-400">Private Loft Suite</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-500/30 rounded-xl p-3">
              <div className="flex items-baseline justify-between">
                <span className="text-slate-300 font-semibold">Total Built-Up Area:</span>
                <span className="text-xl font-black text-amber-300">560 Sq. Ft</span>
              </div>
              <span className="text-[10px] text-slate-400">(Approx. 62 Sq. Yards Construction)</span>
            </div>

            {/* Specifications Details List */}
            <div className="space-y-2 border-t border-slate-800 pt-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Villa Specifications &amp; Features
              </p>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400 shrink-0" />
                  <span>Standard Plot: 15.00m x 6.00m (49&apos;-2&quot; x 19&apos;-8&quot;)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400 shrink-0" />
                  <span>Private Car Porch &amp; Garden Sit-out Entrance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400 shrink-0" />
                  <span>Open Kitchen with Dedicated Dining Alcove</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400 shrink-0" />
                  <span>Internal Designer Staircase leading to Loft Level</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400 shrink-0" />
                  <span>Double Height Ceilings over Living Area</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400 shrink-0" />
                  <span>Open-to-Sky Ventilation Shaft for Fresh Air</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <a
              href="https://wa.me/919904299977?text=Hello%20Sangrilla%20Meadows%20Team,%20I%20am%20interested%20in%20the%20Luxury%20Villa%20Concept%20and%20plot%20availability%20in%20Dholera%20SIR."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm text-center shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Enquire for Villa on WhatsApp</span>
              <ArrowRight size={15} />
            </a>

            <button
              onClick={onBackToMaster}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <Layers size={13} className="text-amber-400" />
              <span>Return to Full Master Plan View</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaFloorPlanViewer;
