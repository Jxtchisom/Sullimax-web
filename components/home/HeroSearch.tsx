"use client";

import { useState } from "react";
import { Search, Sparkles, ShieldCheck, Clock, FileCheck } from "lucide-react";

interface HeroSearchProps {
  onSearch?: (query: string) => void;
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export default function HeroSearch({
  onSearch,
  activeCategory = "ALL",
  onSelectCategory,
}: HeroSearchProps) {
  const [query, setQuery] = useState("");

  const categories = [
    { id: "ALL", label: "All Tests & Scans" },
    { id: "POPULAR", label: "🔥 Most Booked" },
    { id: "HAEMATOLOGY", label: "🩸 Blood Work" },
    { id: "ULTRASOUND", label: "📡 Ultrasound" },
    { id: "PACKAGES", label: "🩺 Health Packages" },
    { id: "SAME_DAY", label: "⚡ Same-Day Results" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <section className="relative bg-white pt-8 pb-10 border-b border-sullimax-border">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Verified Clinic Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sullimax-surface border border-sullimax-border text-xs font-medium text-sullimax-emerald mb-4">
          <Sparkles className="w-3.5 h-3.5 text-sullimax-emerald" />
          <span>Accredited Medical Diagnostic Centre • Yaba, Lagos</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-sullimax-navy leading-tight">
  Sullimax Diagnostics Centre <br className="hidden sm:inline" />
  <span className="text-sullimax-emerald text-2xl sm:text-3xl md:text-4xl font-bold block mt-1">
    Accurate Diagnostics, Trusted Results in Lagos.
  </span>
         </h1>

        {/* Subtitle */}
        <p className="mt-3 text-sm sm:text-base text-sullimax-muted max-w-xl mx-auto leading-relaxed">
          Book certified clinical pathology tests, comprehensive checkup packages, and walk-in ultrasound scans with verified digital turnaround.
        </p>

        {/* Search Bar Input */}
        <form
          onSubmit={handleSearchSubmit}
          className="mt-6 max-w-2xl mx-auto flex items-center bg-white border-2 border-sullimax-border rounded-xl shadow-sm hover:border-sullimax-emerald focus-within:border-sullimax-emerald focus-within:ring-2 focus-within:ring-emerald-100 transition-all p-1.5"
        >
          <div className="pl-3 pr-2 text-sullimax-muted">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (onSearch) onSearch(e.target.value);
            }}
            placeholder="Search 40+ tests (e.g., Full Blood Count, Pelvic Scan, Genotype)..."
            className="w-full bg-transparent text-sm sm:text-base text-sullimax-navy placeholder-gray-400 focus:outline-none py-2"
          />
          <button
            type="submit"
            className="bg-sullimax-emerald hover:bg-sullimax-emeraldHover text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shrink-0"
          >
            Search
          </button>
        </form>

        {/* Horizontal Quick Filter Pills */}
        <div className="mt-5 flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-sullimax-emerald text-white border-sullimax-emerald"
                    : "bg-sullimax-surface text-sullimax-muted border-sullimax-border hover:bg-gray-100 hover:text-sullimax-navy"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Clinical Value Badges */}
        <div className="mt-8 pt-6 border-t border-sullimax-border/60 grid grid-cols-3 gap-2 sm:gap-6 text-left max-w-xl mx-auto">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-sullimax-emerald shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-sullimax-navy">ISO Standard</p>
              <p className="text-[11px] text-sullimax-muted">Certified Lab</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-sullimax-emerald shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-sullimax-navy">Fast Turnaround</p>
              <p className="text-[11px] text-sullimax-muted">Same-day reports</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FileCheck className="w-4 h-4 text-sullimax-emerald shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-sullimax-navy">Pathologist Verified</p>
              <p className="text-[11px] text-sullimax-muted">Official results</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}