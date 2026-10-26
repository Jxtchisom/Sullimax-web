"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 flex items-center gap-3 bg-sullimax-navy text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 animate-in slide-in-from-top-3 fade-in duration-200 max-w-sm">
      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/40">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
      </div>
      <p className="text-xs font-semibold text-slate-100 flex-1 truncate">
        {message}
      </p>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white transition-colors p-1"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}