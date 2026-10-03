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
  Calendar,
  Building,
  ShieldCheck,
  BadgePercent,
  Layers,
  PhoneCall,
  FileText
} from "lucide-react";
import type { PlotUnit } from "../../data/sangrillaMeadowsData";
import { SAN_GRILLA_MEADOWS_META } from "../../data/sangrillaMeadowsData";

interface PlotDrawerProps {
  isOpen: boolean;
  plot: PlotUnit | null;
  onClose: () => void;
  onInquire: (plot: PlotUnit) => void;
  onOpenSpecs: (plot: PlotUnit) => void;
  onSelectNext: () => void;
  onSelectPrev: () => void;
}

export const PlotDrawer: React.FC<PlotDrawerProps> = ({
  isOpen,
  plot,
  onClose,
  onInquire,
  onOpenSpecs,
  onSelectNext,
  onSelectPrev
}) => {
  const [copiedShare, setCopiedShare] = useState(false);

  if (!isOpen || !plot) return null;

  // Generate pre-filled WhatsApp message
  const generateWhatsAppUrl = () => {
    const estPriceLakhs = plot.totalPrice ? (plot.totalPrice / 100000).toFixed(2) : "On Request";
    const msg =
      `*Sangrilla Meadows - Official Plot Inquiry*\n\n` +
      `Hello Sangrilla Meadows Team,\n` +
      `I am interested in inquiring about:\n` +
      `• *Plot #${plot.plotNumber}* (${plot.type})\n` +
      `• Area: ${plot.areaSqYards} Sq. Yards (${plot.areaSqFt} Sq. Ft)\n` +
      `• Facing: ${plot.facing}\n` +
      `• Dimensions: ${plot.dimensions}\n` +
      `• Road Access: ${plot.roadAccess || "Standard Access"}\n` +
      `• Status: ${plot.status.toUpperCase()}\n` +
      `• Est. Price: ₹${estPriceLakhs} Lakhs\n\n` +
      `Please share the detailed layout plan and schedule a site visit in Dholera SIR.`;

    return `https://wa.me/919904299977?text=${encodeURIComponent(msg)}`;
  };

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?plot=${plot.plotNumber}`;
    navigator.clipboard.writeText(url);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const getCompassRotation = () => {
    switch (plot.facing) {
      case "North":
        return 0;
      case "North-East":
        return 45;
      case "East":
        return 90;
      case "South":
        return 180;
      case "West":
        return 270;
      case "North-West":
        return 315;
      default:
        return 0;
    }
  };

  const statusConfig = {
    available: {
      label: "Available for Booking",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
      dotColor: "bg-emerald-400"
    },
    booked: {
      label: "Booked / Sold Out",
      badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/40",
      dotColor: "bg-rose-500"
    },
    reserved: {
      label: "On Hold / Reserved",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      dotColor: "bg-amber-400"
    }
  }[plot.status];

  return (
    <aside className="absolute top-0 right-0 bottom-0 z-40 w-full sm:w-[420px] lg:w-[450px] bg-slate-950/95 backdrop-blur-2xl border-l border-slate-800 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
      {/* Top Header Drawer Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Previous / Next plot quick buttons */}
          <button
            onClick={onSelectPrev}
            title="Previous Plot"
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs font-bold text-slate-300">
            Plot <strong className="text-emerald-400">#{plot.plotNumber}</strong>
          </span>
          <button
            onClick={onSelectNext}
            title="Next Plot"
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleShare}
            title="Share Direct Link"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-xs flex items-center gap-1"
          >
            <Share2 size={14} />
            {copiedShare && <span className="text-[10px] text-emerald-400">Copied!</span>}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main Drawer Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-white text-xs">
        {/* Plot Title & Status */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${statusConfig.badgeColor}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotColor}`} />
              <span>{statusConfig.label}</span>
            </span>
            {plot.isCorner && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Corner Plot
              </span>
            )}
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Plot #{plot.plotNumber} • {plot.type}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Sangrilla Meadows • Aakru, Dholera SIR (New Survey 642)
          </p>
        </div>

        {/* Primary Area & Dimensions Card */}
        <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-4">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-3xl font-black text-emerald-400">{plot.areaSqYards}</span>
              <span className="text-sm font-semibold text-slate-300 ml-1.5">Sq. Yards</span>
            </div>
            <span className="text-xs text-slate-400">
              ({plot.areaSqFt.toLocaleString()} Sq. Ft)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 text-[11px]">Dimensions:</span>
              <p className="font-semibold text-slate-200 mt-0.5">{plot.dimensions}</p>
            </div>
            <div>
              <span className="text-slate-400 text-[11px]">Road Access:</span>
              <p className="font-semibold text-slate-200 mt-0.5">{plot.roadAccess || "7.5 MT Internal Road"}</p>
            </div>
          </div>
        </div>

        {/* Facing & Direction Orientation with Visual Compass */}
        <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
              <Compass size={14} />
              <span>Vastu Alignment</span>
            </div>
            <p className="text-base font-bold text-white mb-0.5">{plot.facing} Facing</p>
            <p className="text-xs text-slate-400">
              {plot.facing.includes("North") || plot.facing.includes("East")
                ? "Highly Auspicious (Ishan / Sun-facing flow)"
                : "Standard Vastu compliant layout orientation"}
            </p>
          </div>

          {/* Graphical Compass Rose */}
          <div className="relative w-14 h-14 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center shadow-lg shrink-0">
            <span className="absolute top-1 text-[9px] font-bold text-slate-400">N</span>
            <span className="absolute right-1 text-[9px] font-bold text-slate-400">E</span>
            <span className="absolute bottom-1 text-[9px] font-bold text-slate-400">S</span>
            <span className="absolute left-1 text-[9px] font-bold text-slate-400">W</span>
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-500"
              style={{ transform: `rotate(${getCompassRotation()}deg)` }}
            >
              <div className="w-1.5 h-6 bg-gradient-to-t from-transparent via-amber-400 to-rose-500 rounded-full" />
            </div>
          </div>
        </div>

        {/* Pricing & Investment Guide */}
        {plot.totalPrice && (
          <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <BadgePercent size={13} className="text-emerald-400" />
                <span>Investment Value</span>
              </span>
              <span className="text-xs text-emerald-400 font-bold">
                ₹{plot.pricePerSqYd?.toLocaleString()} / Sq. Yd
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-xs text-slate-400">Total Plot Value:</span>
              <span className="text-2xl font-black text-white">
                ₹{(plot.totalPrice / 100000).toFixed(2)}{" "}
                <span className="text-xs font-semibold text-slate-400">Lakhs</span>
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span>Estimated Bank EMI (80% Loan):</span>
              <span className="font-bold text-sky-400">
                ~₹{Math.round((plot.totalPrice * 0.8 * 0.0085)).toLocaleString()} / mo
              </span>
            </div>
          </div>
        )}

        {/* Township Legal Clearances */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Approvals &amp; Feasibility
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2">
              <ShieldCheck size={15} className="text-emerald-400 shrink-0" />
              <span className="text-slate-300">100% NA Title Clear</span>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              <span className="text-slate-300">Immediate Dastavej</span>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2">
              <Building size={15} className="text-sky-400 shrink-0" />
              <span className="text-slate-300">{plot.constructionFeasibility || "G+1 Construction"}</span>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2">
              <Sparkles size={15} className="text-amber-400 shrink-0" />
              <span className="text-slate-300">Gated Campus</span>
            </div>
          </div>
        </div>

        {/* View Detailed Specs Button */}
        <button
          onClick={() => onOpenSpecs(plot)}
          className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <FileText size={14} className="text-emerald-400" />
          <span>View Floor Plans &amp; Full Specifications</span>
        </button>
      </div>

      {/* Bottom Sticky Action CTAs */}
      <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/90 backdrop-blur-xl flex flex-col gap-2.5">
        {/* Primary CTA: WhatsApp Booking */}
        <a
          href={generateWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-sm text-center shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.073-2.115-.515-1.745-.722-2.859-2.518-2.946-2.634-.088-.115-.718-.956-.718-1.823 0-.866.452-1.293.614-1.468.161-.176.353-.22.47-.22.118 0 .235.001.338.006.109.006.255-.041.399.303.148.353.504 1.232.548 1.321.044.089.073.193.015.309-.059.117-.088.19-.176.294-.088.103-.186.23-.265.31-.088.088-.18.183-.078.359.103.176.457.755.981 1.222.674.601 1.243.787 1.419.875.176.088.279.073.382-.044.103-.118.441-.515.559-.691.117-.176.235-.147.397-.088.162.059 1.029.485 1.206.573.176.088.294.132.338.206.044.074.044.428-.1 1.033zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.176L2 22l4.981-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
          </svg>
          <span>Book / Enquire on WhatsApp</span>
        </a>

        {/* Secondary CTAs */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onInquire(plot)}
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <Calendar size={13} className="text-sky-400" />
            <span>Site Visit</span>
          </button>

          <a
            href={SAN_GRILLA_MEADOWS_META.pdfMasterPlanUrl}
            download="Layout-Dholera.pdf"
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

export default PlotDrawer;
