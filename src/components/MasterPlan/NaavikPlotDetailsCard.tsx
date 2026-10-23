import React, { useState } from "react";
import { X, Send, Compass, Eye, Sparkles, Share2, Check, Star } from "lucide-react";

interface NaavikPlotDetailsCardProps {
  plotNumber: number;
  status: string;
  areaSqYards: number;
  facing?: string;
  type?: string;
  price?: string;
  dimensionsMeter?: string;
  roadAccess?: string;
  isCorner?: boolean;
  onClose: () => void;
  onInquire?: () => void;
  onOpenDrawer?: () => void;
  className?: string;
}

export const NaavikPlotDetailsCard: React.FC<NaavikPlotDetailsCardProps> = ({
  plotNumber,
  status,
  areaSqYards,
  facing,
  type,
  price,
  dimensionsMeter = "12.50 x 23.40 x 12.50 x 23.40",
  roadAccess,
  isCorner,
  onClose,
  onInquire,
  onOpenDrawer,
  className = ""
}) => {
  const [copied, setCopied] = useState(false);
  const isAvailable = status.toLowerCase() === "available";
  const isSold = status.toLowerCase() === "sold" || status.toLowerCase() === "booked";

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?plot=${plotNumber}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-[600] w-[calc(100vw-1.5rem)] sm:w-88 max-w-sm bg-slate-950/95 backdrop-blur-2xl border border-amber-500/30 rounded-2xl p-4 sm:p-5 text-white shadow-2xl shadow-black/90 animate-in fade-in zoom-in-95 duration-200 select-none ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <h3 className="text-base font-extrabold text-white tracking-wide flex items-center gap-1.5">
            <span>Plot #{plotNumber}</span>
            {isCorner && (
              <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/40 flex items-center gap-1">
                <Star size={10} className="fill-amber-400 text-amber-400" /> Corner
              </span>
            )}
            {type && (
              <span className="text-[10px] font-semibold text-slate-300 bg-slate-800/80 px-1.5 py-0.5 rounded-md border border-slate-700">
                {type}
              </span>
            )}
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopyLink}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Share Plot Link"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close Details"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Rows */}
      <div className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
        {/* Availability */}
        <div className="flex items-center justify-between">
          <span className="text-slate-400 font-medium">Availability</span>
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-white shadow-sm ${
              isAvailable
                ? "bg-emerald-600 shadow-emerald-950/50"
                : isSold
                ? "bg-rose-600 shadow-rose-950/50"
                : "bg-amber-600 shadow-amber-950/50"
            }`}
          >
            {isAvailable ? "AVAILABLE" : isSold ? "SOLD OUT" : "HOLD"}
          </span>
        </div>

        {/* Plot No & Type */}
        <div className="flex items-center justify-between">
          <span className="text-slate-400 font-medium">Plot Number</span>
          <span className="text-amber-300 font-extrabold text-base">
            #{plotNumber}
          </span>
        </div>

        {/* Area */}
        <div className="flex items-center justify-between">
          <span className="text-slate-400 font-medium">Total Area</span>
          <span className="text-white font-extrabold">
            {areaSqYards} SQ. YD. <span className="text-slate-400 text-[11px] font-normal">({Math.round(areaSqYards * 9)} sq ft)</span>
          </span>
        </div>

        {/* Facing */}
        {facing && (
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Compass size={13} className="text-amber-400" />
              <span>Facing</span>
            </span>
            <span className="text-white font-semibold">
              {facing} Facing
            </span>
          </div>
        )}

        {/* Size (meter) */}
        <div className="flex items-center justify-between">
          <span className="text-slate-400 font-medium">Dimensions</span>
          <span className="text-slate-200 font-semibold text-xs truncate max-w-[180px]">
            {dimensionsMeter}
          </span>
        </div>

        {/* Road Frontage */}
        {roadAccess && (
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Road Frontage</span>
            <span className="text-emerald-400 font-bold text-xs">
              {roadAccess}
            </span>
          </div>
        )}

        {/* Estimated Price */}
        {price && (
          <div className="flex items-center justify-between pt-1 border-t border-white/5">
            <span className="text-slate-400 font-medium">Starting Price</span>
            <span className="text-emerald-400 font-black text-sm">
              {price}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 sm:mt-5 pt-3 border-t border-white/10 flex gap-2">
        {onOpenDrawer && (
          <button
            onClick={onOpenDrawer}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-700 hover:border-amber-500/40"
          >
            <Eye size={13} />
            <span>Full Specs</span>
          </button>
        )}
        {onInquire && (
          <button
            onClick={onInquire}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/50"
          >
            <Send size={13} />
            <span>Inquire Now</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default NaavikPlotDetailsCard;
