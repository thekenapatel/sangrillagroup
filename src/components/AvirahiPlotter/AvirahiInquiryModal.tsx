import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  Building,
  ShieldCheck,
  Send
} from "lucide-react";
import type { AvirahiPlotUnit } from "../../data/avirahiCityData";
import { AVIRAHI_CITY_META } from "../../data/avirahiCityData";

interface AvirahiInquiryModalProps {
  plot: AvirahiPlotUnit | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AvirahiInquiryModal: React.FC<AvirahiInquiryModalProps> = ({
  plot,
  isOpen,
  onClose
}) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [needLoan, setNeedLoan] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    // Build WhatsApp message
    const targetDesc = plot
      ? `Plot #${plot.plotNumber} (${plot.sector} - ${plot.sectorName})\n• Area: ${plot.areaSqYards} Sq. Yd (${plot.areaSqFt.toLocaleString()} sq.ft)\n• Facing: ${plot.facing}`
      : "General Project Inquiry & Plot Availability";

    const msg = `*VIP Site Visit & Booking Inquiry - Avirahi City (Sangrilla)*\n\n` +
      `• Name: ${fullName}\n` +
      `• Phone: ${phone}\n` +
      `• Email: ${email || "Not specified"}\n` +
      `• Target: ${targetDesc}\n` +
      `• Preferred Visit Date: ${preferredDate || "This Weekend"}\n` +
      `• Bank Loan Assistance: ${needLoan ? "Yes" : "No"}`;

    const url = `https://wa.me/${AVIRAHI_CITY_META.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl relative animate-in fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              Our Senior Dholera Investment Consultant will contact you on WhatsApp / Phone within 15 minutes with complete plot documentation.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                Official Plot Demarcation &amp; Booking
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5 tracking-tight">
                {plot ? `Inquire for Plot #${plot.plotNumber}` : "Inquire About Avirahi City"}
              </h2>
              <p className="text-xs text-slate-400">
                {plot
                  ? `${plot.sector} (${plot.sectorName}) • ${plot.areaSqYards} Sq. Yards • ${plot.facing} Facing`
                  : "Dholera Smart City (SIR) • Premium Residential & Villa Plots"}
              </p>
            </div>

            {/* Quick Plot Snapshot Card */}
            {plot && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 mb-5 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400">Area</span>
                  <p className="font-bold text-emerald-400">{plot.areaSqYards} Sq. Yd</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">Road</span>
                  <p className="font-bold text-slate-200 truncate">{plot.roadWidth}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">Est. Price</span>
                  <p className="font-bold text-amber-400">₹{(plot.totalPrice / 100000).toFixed(2)}L</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    WhatsApp / Phone <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Preferred Date for Dholera Site Inspection
                </label>
                <div className="relative">
                  <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={needLoan}
                  onChange={(e) => setNeedLoan(e.target.checked)}
                  className="w-4 h-4 rounded accent-emerald-500"
                />
                <span className="text-slate-300">
                  I need Nationalized / Private Bank loan assistance (Up to 80% financing)
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-4"
              >
                <Send size={15} />
                <span>Confirm VIP Inquiry &amp; Connect on WhatsApp</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AvirahiInquiryModal;
