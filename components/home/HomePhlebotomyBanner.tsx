"use client";

import { Home, ShieldCheck, Clock, MapPin, ArrowRight } from "lucide-react";

interface HomePhlebotomyBannerProps {
  onBookHomeVisit: () => void;
}

export default function HomePhlebotomyBanner({ onBookHomeVisit }: HomePhlebotomyBannerProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      <div className="bg-gradient-to-r from-emerald-950 via-sullimax-navy to-slate-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden border border-emerald-900/50 shadow-md">
        
        {/* Subtle background glow */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-500/30">
              <Home className="w-3.5 h-3.5 text-emerald-400" />
              <span>Doorstep Sample Collection</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Can’t Make It to Yaba? Request a Home Phlebotomist
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Skip Lagos traffic and long fasting queues. A licensed, cold-chain equipped phlebotomist visits your home or office anywhere in Lagos to safely collect blood, urine, or swab samples.
            </p>

            {/* Quick value badges */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                Early morning fasting slots (from 7:00 AM)
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Sterile single-use vacutainer protocol
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Mainland & Island dispatch
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              onClick={onBookHomeVisit}
              className="bg-sullimax-emerald hover:bg-sullimax-emeraldHover text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Book Home Phlebotomist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-center text-slate-400">
              ₦5,000 flat doorstep logistics fee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}