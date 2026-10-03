import React from "react";
import {
  X,
  MapPin,
  CheckCircle2,
  Building2,
  Trees,
  ShieldCheck,
  Compass,
  Phone,
  ExternalLink,
  Car,
  Plane,
  Sparkles
} from "lucide-react";
import { AVIRAHI_CITY_META } from "../../data/avirahiCityData";

interface AvirahiProjectInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry?: () => void;
}

export const AvirahiProjectInfoModal: React.FC<AvirahiProjectInfoModalProps> = ({
  isOpen,
  onClose,
  onOpenInquiry
}) => {
  if (!isOpen) return null;

  const amenities = [
    "Club House & Banquet",
    "Swimming Pool",
    "Cricket Ground",
    "Volley Ball Court",
    "Indoor Games Arena",
    "Senior Citizen Park",
    "Business Centre & Cafe",
    "9.0m - 24m Wide RCC Roads",
    "24/7 Security & CCTV",
    "Underground Utilities",
    "Rainwater Harvesting",
    "Landscaped Green Parks"
  ];

  const connectivity = [
    { label: "Ahmedabad–Dholera Expressway (NH-751)", distance: "0.25 km / 2 mins" },
    { label: "Proposed Dholera Metro Station", distance: "1.0 km / 4 mins" },
    { label: "ABCD Command Center (Smart City Hub)", distance: "7.2 km / 8 mins" },
    { label: "Tata Semiconductor Fab Plant", distance: "12.0 km / 12 mins" },
    { label: "Dholera International Airport (Navagam)", distance: "14.5 km / 15 mins" }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none animate-in fade-in duration-200">
      <div className="bg-slate-900/95 border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition-colors"
          title="Close"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Sangrilla Group • Dholera Smart City (SIR)</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Avirahi City
        </h2>
        <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
          <MapPin size={13} className="text-amber-400 shrink-0" />
          <span>Ahmedabad–Dholera Expressway Corridor (SH-6), Valinda, Dholera, Gujarat 382455</span>
        </p>

        {/* Key Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-5">
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 text-center">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Total Township</span>
            <span className="text-lg font-black text-white mt-0.5 block">170 Acres</span>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 text-center">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Total Plots</span>
            <span className="text-lg font-black text-emerald-400 mt-0.5 block">1,250 Units</span>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 text-center">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Plot Sizes</span>
            <span className="text-lg font-black text-amber-400 mt-0.5 block">350 - 900 Yd</span>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 text-center">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Title Status</span>
            <span className="text-lg font-black text-sky-400 mt-0.5 block">100% NA Clear</span>
          </div>
        </div>

        {/* Project Description */}
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 text-xs text-slate-300 leading-relaxed mb-5">
          Avirahi City is a premier master-planned residential plotting township strategically situated along the high-growth corridor of Ahmedabad–Dholera Expressway. Designed with wide internal road networks (9m to 24m), world-class sports &amp; club amenities, landscaped common parks, and complete infrastructure trunk lines, it offers immediate registry (dastavej) and unparalleled capital appreciation.
        </div>

        {/* Amenities Grid */}
        <div className="mb-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Sparkles size={13} className="text-amber-400" />
            <span>Township Amenities</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {amenities.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-slate-950/60 border border-slate-800/80 px-3 py-2 rounded-xl text-xs text-slate-200"
              >
                <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Connectivity */}
        <div className="mb-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Compass size={13} className="text-sky-400" />
            <span>Strategic Connectivity</span>
          </h4>
          <div className="space-y-1.5">
            {connectivity.map((conn, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-slate-950/40 border border-slate-800/60 px-3 py-2 rounded-xl text-xs"
              >
                <span className="text-slate-300">{conn.label}</span>
                <span className="font-bold text-amber-400">{conn.distance}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenInquiry?.();
            }}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/50 transition-all text-center"
          >
            Send Inquiry / Book Site Visit
          </button>
          <a
            href={`https://wa.me/${AVIRAHI_CITY_META.whatsappNumber}?text=${encodeURIComponent("Hello Sangrilla, I would like to know more about Avirahi City Dholera.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <Phone size={14} className="text-emerald-400" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AvirahiProjectInfoModal;
