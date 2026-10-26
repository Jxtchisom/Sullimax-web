import Link from "next/link";
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck, Award, FileCheck2 } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-sullimax-navy text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* 1. Clinical Trust & Governance Metric Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-700">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">CAC & Clinical Licensure</h4>
              <p className="text-xs text-slate-400 mt-1">
                Registered under RC 1196599. Fully compliant with Lagos State laboratory regulations.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-700">
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Quality Assurance Controls</h4>
              <p className="text-xs text-slate-400 mt-1">
                Automated multi-point calibration on all haematology and clinical chemistry analysers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-700">
              <FileCheck2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Pathologist Verification</h4>
              <p className="text-xs text-slate-400 mt-1">
                Every abnormal and critical result is countersigned by a consultant clinical pathologist.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Location & Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sullimax-emerald flex items-center justify-center text-white font-bold text-base">
                S
              </div>
              <div>
                <span className="font-bold text-base text-white">Sullimax</span>
                <span className="text-[10px] tracking-wider uppercase text-slate-400 block font-medium">
                  Diagnostics Centre
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Providing precision medical laboratory, diagnostic ultrasound imaging, and tailored preventive checkups to individuals, families, and corporate organizations across Lagos.
            </p>
          </div>

          {/* Centre Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Yaba Centre Location</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>6 Olumo Street, off Commercial Avenue, Yaba, Lagos State.</span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Monday – Saturday: 7:30 AM – 6:00 PM</span>
              </p>
            </div>
          </div>

          {/* Clinical Direct Lines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact & Enquiries</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p>
                <a
                  href="tel:07067582117"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>07067582117</span>
                </a>
              </p>
              <p>
                <a
                  href="https://wa.me/2347067582117"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Direct WhatsApp Desk</span>
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal Sub-bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Sullimax Diagnostics Centre. All rights reserved. RC 1196599.</p>
          <div className="flex gap-4">
            <Link href="#privacy" className="hover:text-slate-300 transition-colors">
              Patient Data Privacy
            </Link>
            <Link href="#terms" className="hover:text-slate-300 transition-colors">
              Clinical Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}