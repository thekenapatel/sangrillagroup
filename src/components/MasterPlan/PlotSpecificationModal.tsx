import React from "react";
import {
  X,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Compass,
  MapPin,
  Download,
  Layers,
  ArrowRight
} from "lucide-react";
import type { PlotUnit } from "../../data/sangrillaMeadowsData";
import { SAN_GRILLA_MEADOWS_META } from "../../data/sangrillaMeadowsData";

interface PlotSpecificationModalProps {
  plot: PlotUnit | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PlotSpecificationModal: React.FC<PlotSpecificationModalProps> = ({
  plot,
  isOpen,
  onClose
}) => {
  if (!isOpen || !plot) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in fade-in duration-200 text-xs">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="mb-6">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            Technical Demarcation Dossier
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5 tracking-tight">
            Plot #{plot.plotNumber} Specifications &amp; Architectural Plans
          </h2>
          <p className="text-xs text-slate-400">
            Sangrilla Meadows • New Survey 642 / Old 420/4/12 • Aakru, Dholera SIR
          </p>
        </div>

        {/* Technical Data Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 mb-6">
          <div>
            <span className="text-[10px] text-slate-400">Plot Type</span>
            <p className="font-bold text-white mt-0.5">{plot.type}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400">Total Plot Area</span>
            <p className="font-bold text-emerald-400 mt-0.5">{plot.areaSqYards} Sq. Yd</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400">Carpet Area</span>
            <p className="font-bold text-sky-400 mt-0.5">
              {plot.carpetAreaSqYards ? `${plot.carpetAreaSqYards} Sq. Yd` : "70% Construction"}
            </p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400">Facing Direction</span>
            <p className="font-bold text-amber-400 mt-0.5">{plot.facing} Facing</p>
          </div>
        </div>

        {/* Floor Plan Imagery If Available */}
        {plot.floorPlanImages && plot.floorPlanImages.length > 0 && (
          <div className="mb-6 space-y-2">
            <h3 className="font-bold text-slate-200 uppercase tracking-wider text-xs">
              Architectural Concept &amp; Villa Elevations
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {plot.floorPlanImages.slice(0, 3).map((imgUrl, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video relative group"
                >
                  <img
                    src={imgUrl}
                    alt={`Plan ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[10px] font-semibold text-slate-200">
                      {i === 0 ? "Ground Floor" : i === 1 ? "Loft Level" : "Exterior Elevation"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regulatory & Approvals Specs */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3 mb-6">
          <h3 className="font-bold text-slate-200 uppercase tracking-wider text-xs flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Title Clearances &amp; Township Infrastructure</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">100% Non-Agricultural (NA):</strong>
                <p className="text-[11px] text-slate-400">Order passed by District Collector for residential plotted development.</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Immediate Sub-Registrar Registry:</strong>
                <p className="text-[11px] text-slate-400">Direct execution of Sale Deed (Dastavej) upon full payment.</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Road Infrastructure:</strong>
                <p className="text-[11px] text-slate-400">{plot.roadAccess || "12 MT Main Spine Road / 7.5 MT Internal Roads"}.</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Feasibility:</strong>
                <p className="text-[11px] text-slate-400">{plot.constructionFeasibility || "G+1 Ground + First Floor + Terrace Villa"}.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Download PDF Button */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <a
            href={SAN_GRILLA_MEADOWS_META.pdfMasterPlanUrl}
            download="Layout-Dholera.pdf"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold transition-colors"
          >
            <Download size={14} className="text-emerald-400" />
            <span>Download Official Layout PDF</span>
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlotSpecificationModal;
