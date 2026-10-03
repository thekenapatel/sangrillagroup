import React, { useState } from "react";
import {
  X,
  Compass,
  MapPin,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Share2,
  Download,
  PhoneCall,
  Calendar,
  Building,
  ShieldCheck,
  BadgePercent,
  Calculator,
  ExternalLink
} from "lucide-react";
import type { AvirahiPlotUnit } from "../../data/avirahiCityData";
import { AVIRAHI_CITY_META } from "../../data/avirahiCityData";

interface AvirahiPlotSidebarProps {
  plot: AvirahiPlotUnit | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectNext: () => void;
  onSelectPrev: () => void;
  onOpenBookingModal: (plot: AvirahiPlotUnit) => void;
}

export const AvirahiPlotSidebar: React.FC<AvirahiPlotSidebarProps> = ({
  plot,
  isOpen,
  onClose,
  onSelectNext,
  onSelectPrev,
  onOpenBookingModal
}) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const [unitMode, setUnitMode] = useState<"sqYd" | "sqFt" | "sqMtr">("sqYd");

  if (!isOpen || !plot) return null;

  // Generate pre-filled WhatsApp message
  const generateWhatsAppUrl = () => {
    const message = `Hello Sangrilla Meadows Team,\n\nI am interested in inquiring/booking:\n*Plot #${plot.plotNumber}* (${plot.sector} - ${plot.sectorName})\n• Area: ${plot.areaSqYards} Sq. Yards (${plot.areaSqFt.toLocaleString()} Sq. Feet)\n• Facing: ${plot.facing}\n• Road Access: ${plot.roadWidth}\n• Status: ${plot.status.toUpperCase()}\n• Estimated Price: ₹${(plot.totalPrice / 100000).toFixed(2)} Lakhs\n\nPlease share the official layout plan, cost sheet, and schedule a site inspection.`;
    return `https://wa.me/${AVIRAHI_CITY_META.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?plot=${plot.plotNumber}`;
    navigator.clipboard.writeText(url);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const getStatusBadge = () => {
    switch (plot.status) {
      case "available":
        return (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Available for Booking</span>
          </div>
        );
      case "sold":
        return (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-bold uppercase tracking-wider">
            <XCircle size={14} />
            <span>Booked / Sold Out</span>
          </div>
        );
      case "reserved":
        return (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold uppercase tracking-wider">
            <Clock size={14} />
            <span>On Hold / Under Token</span>
          </div>
        );
    }
  };

  // 8-point compass rotation angle
  const getCompassRotation = () => {
    switch (plot.facing) {
      case "North": return 0;
      case "North-East": return 45;
      case "East": return 90;
      case "South-East": return 135;
      case "South": return 180;
      case "South-West": return 225;
      case "West": return 270;
      case "North-West": return 315;
      default: return 0;
    }
  };

  return (
    <aside className="absolute top-0 right-0 h-full w-full sm:w-[420px] max-w-full bg-slate-950/95 backdrop-blur-2xl border-l border-slate-800 text-white z-40 shadow-2xl flex flex-col transition-all duration-300 ease-in-out">
      {/* Top Header & Navigation */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between gap-3 bg-slate-900/60">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
              {plot.sector}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-[11px] text-slate-400">{plot.block}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Plot #{plot.plotNumber}</span>
            {plot.isCorner && (
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Corner
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-400 font-medium">{plot.sectorName}</p>
        </div>

        {/* Quick Actions: Prev/Next & Close */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onSelectPrev}
            title="Previous Plot"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={onSelectNext}
            title="Next Plot"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={onClose}
            title="Close Drawer"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition-colors ml-1"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Content Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 custom-scrollbar">
        {/* Status Badge */}
        <div className="flex items-center justify-between">
          {getStatusBadge()}
          <button
            onClick={handleShare}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg transition-colors"
          >
            <Share2 size={12} />
            <span>{copiedShare ? "Copied!" : "Share"}</span>
          </button>
        </div>

        {/* Total Area Card with Multi-Unit Switcher */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-4 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Plot Area
            </span>
            <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[10px]">
              <button
                onClick={() => setUnitMode("sqYd")}
                className={`px-2 py-0.5 rounded ${
                  unitMode === "sqYd"
                    ? "bg-emerald-500/20 text-emerald-300 font-bold"
                    : "text-slate-400"
                }`}
              >
                Sq. Yd
              </button>
              <button
                onClick={() => setUnitMode("sqFt")}
                className={`px-2 py-0.5 rounded ${
                  unitMode === "sqFt"
                    ? "bg-emerald-500/20 text-emerald-300 font-bold"
                    : "text-slate-400"
                }`}
              >
                Sq. Ft
              </button>
              <button
                onClick={() => setUnitMode("sqMtr")}
                className={`px-2 py-0.5 rounded ${
                  unitMode === "sqMtr"
                    ? "bg-emerald-500/20 text-emerald-300 font-bold"
                    : "text-slate-400"
                }`}
              >
                Sq. Mtr
              </button>
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            {unitMode === "sqYd" && (
              <>
                <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                  {plot.areaSqYards}
                </span>
                <span className="text-sm font-semibold text-slate-400">Sq. Yards</span>
                <span className="text-xs text-slate-500 ml-auto">
                  ({plot.areaSqFt.toLocaleString()} sq.ft)
                </span>
              </>
            )}
            {unitMode === "sqFt" && (
              <>
                <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                  {plot.areaSqFt.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-slate-400">Sq. Feet</span>
                <span className="text-xs text-slate-500 ml-auto">
                  ({plot.areaSqYards} sq.yd)
                </span>
              </>
            )}
            {unitMode === "sqMtr" && (
              <>
                <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                  {plot.areaSqMtr}
                </span>
                <span className="text-sm font-semibold text-slate-400">Sq. Meters</span>
                <span className="text-xs text-slate-500 ml-auto">
                  ({plot.areaSqYards} sq.yd)
                </span>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
            <div>
              <span className="text-slate-500 text-[11px]">Dimensions:</span>
              <p className="font-semibold text-slate-200">{plot.dimensions}</p>
            </div>
            <div>
              <span className="text-slate-500 text-[11px]">Road Access:</span>
              <p className="font-semibold text-slate-200">{plot.roadWidth}</p>
            </div>
          </div>
        </div>

        {/* Facing & Direction Orientation with Visual Compass */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
              <Compass size={15} />
              <span>Vastu Alignment</span>
            </div>
            <p className="text-base font-bold text-white mb-0.5">{plot.facing} Facing</p>
            <p className="text-xs text-slate-400">
              {plot.facing.includes("North") || plot.facing.includes("East")
                ? "Highly Auspicious (Ishan / Sun-facing flow)"
                : "Standard Vastu compliant perimeter"}
            </p>
          </div>

          {/* Graphical Compass Rose */}
          <div className="relative w-14 h-14 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center shadow-lg shrink-0">
            <span className="absolute top-1 text-[9px] font-bold text-slate-400">N</span>
            <span className="absolute right-1 text-[9px] font-bold text-slate-400">E</span>
            <span className="absolute bottom-1 text-[9px] font-bold text-slate-400">S</span>
            <span className="absolute left-1 text-[9px] font-bold text-slate-400">W</span>
            {/* Arrow indicating plot facing */}
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-500"
              style={{ transform: `rotate(${getCompassRotation()}deg)` }}
            >
              <div className="w-1.5 h-6 bg-gradient-to-t from-transparent via-amber-400 to-rose-500 rounded-full" />
            </div>
          </div>
        </div>

        {/* Pricing & Investment Guide */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <BadgePercent size={14} className="text-emerald-400" />
              <span>Investment Estimate</span>
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold">
              ₹{plot.pricePerSqYd.toLocaleString()} / Sq. Yd
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <span className="text-xs text-slate-400">Total Plot Value:</span>
            <span className="text-xl sm:text-2xl font-black text-white">
              ₹{(plot.totalPrice / 100000).toFixed(2)}{" "}
              <span className="text-xs font-semibold text-slate-400">Lakhs</span>
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span>Estimated Bank EMI (80% Loan):</span>
            <span className="font-bold text-sky-400">
              ~₹{plot.estimatedEmi.toLocaleString()} / month
            </span>
          </div>
        </div>

        {/* Plot Specifications & Key Badges */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Township Features &amp; Approvals
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-2.5 flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
              <span className="text-slate-300">RERA Approved</span>
            </div>
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-2.5 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span className="text-slate-300">NA / Clear Title</span>
            </div>
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-2.5 flex items-center gap-2">
              <Building size={16} className="text-sky-400 shrink-0" />
              <span className="text-slate-300">Underground Utilities</span>
            </div>
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-2.5 flex items-center gap-2">
              <Sparkles size={16} className="text-amber-400 shrink-0" />
              <span className="text-slate-300">Lakefront Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action CTAs */}
      <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/80 backdrop-blur-xl flex flex-col gap-2.5">
        {/* Primary CTA: "Book / Enquire on WhatsApp" */}
        <a
          href={generateWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-sm text-center shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
        >
          {/* WhatsApp SVG Icon */}
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.073-2.115-.515-1.745-.722-2.859-2.518-2.946-2.634-.088-.115-.718-.956-.718-1.823 0-.866.452-1.293.614-1.468.161-.176.353-.22.47-.22.118 0 .235.001.338.006.109.006.255-.041.399.303.148.353.504 1.232.548 1.321.044.089.073.193.015.309-.059.117-.088.19-.176.294-.088.103-.186.23-.265.31-.088.088-.18.183-.078.359.103.176.457.755.981 1.222.674.601 1.243.787 1.419.875.176.088.279.073.382-.044.103-.118.441-.515.559-.691.117-.176.235-.147.397-.088.162.059 1.029.485 1.206.573.176.088.294.132.338.206.044.074.044.428-.1 1.033zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.176L2 22l4.981-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
          </svg>
          <span>Book / Enquire on WhatsApp</span>
        </a>

        {/* Secondary CTAs */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onOpenBookingModal(plot)}
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <Calendar size={13} className="text-sky-400" />
            <span>Site Visit</span>
          </button>

          <a
            href={generateWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <Download size={13} className="text-amber-400" />
            <span>Layout PDF</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default AvirahiPlotSidebar;
