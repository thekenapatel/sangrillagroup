import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  Calendar,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Send
} from "lucide-react";
import type { PlotUnit } from "../../data/sangrillaMeadowsData";
import { SAN_GRILLA_MEADOWS_META } from "../../data/sangrillaMeadowsData";

interface PlotInquiryModalProps {
  plot: PlotUnit | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PlotInquiryModal: React.FC<PlotInquiryModalProps> = ({
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

  if (!isOpen || !plot) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    // Send WhatsApp booking request
    const msg =
      `*Sangrilla Meadows - VIP Site Visit & Plot Demarcation Booking*\n\n` +
      `• Name: ${fullName}\n` +
      `• Phone: ${phone}\n` +
      `• Email: ${email || "Not specified"}\n` +
      `• Target Unit: Plot #${plot.plotNumber} (${plot.type})\n` +
      `• Area: ${plot.areaSqYards} Sq. Yards (${plot.areaSqFt} Sq. Ft)\n` +
      `• Facing: ${plot.facing}\n` +
      `• Preferred Visit Date: ${preferredDate || "This Weekend"}\n` +
      `• Bank Loan Assistance: ${needLoan ? "Yes" : "No"}`;

    const url = `https://wa.me/919904299977?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
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
              Our Dholera SIR Real Estate Advisor will contact you with full official survey and layout documentation.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                Official Plot Demarcation
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5 tracking-tight">
                Inquire for Plot #{plot.plotNumber}
              </h2>
              <p className="text-xs text-slate-400">
                {plot.type} • {plot.areaSqYards} Sq. Yards ({plot.areaSqFt} sq.ft) • {plot.facing} Facing
              </p>
            </div>

            {/* Quick Summary Pill */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 mb-5 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-400">Dimensions</span>
                <p className="font-bold text-slate-200 truncate">{plot.dimensions}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Road</span>
                <p className="font-bold text-emerald-400 truncate">{plot.roadAccess || "7.5 MT"}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Price Est.</span>
                <p className="font-bold text-amber-400">
                  {plot.totalPrice ? `₹${(plot.totalPrice / 100000).toFixed(2)}L` : "On Request"}
                </p>
              </div>
            </div>

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
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Phone Number (WhatsApp) <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:outline-none focus:border-emerald-500 text-xs"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300">
                    <input
                      type="checkbox"
                      checked={needLoan}
                      onChange={(e) => setNeedLoan(e.target.checked)}
                      className="rounded accent-emerald-500 w-4 h-4"
                    />
                    <span>Bank Loan Assistance</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Send size={15} />
                <span>Submit &amp; Open WhatsApp</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PlotInquiryModal;
