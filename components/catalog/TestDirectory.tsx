"use client";

import { useState, useEffect } from "react";
import { 
  Check, 
  Plus, 
  Clock, 
  AlertCircle, 
  Info, 
  ChevronRight, 
  SearchX 
} from "lucide-react";

export interface TestItem {
  id: string;
  name: string;
  category: "HAEMATOLOGY" | "CHEMISTRY" | "MICROBIOLOGY" | "ULTRASOUND";
  price: number;
  turnaround: string;
  sampleType: string;
  fasting?: boolean;
  prepNote?: string;
  genderTarget?: "ALL" | "MALE" | "FEMALE";
}

const SINGLE_TESTS: TestItem[] = [
  {
    id: "t1",
    name: "Full Blood Count (FBC / CBC)",
    category: "HAEMATOLOGY",
    price: 7000,
    turnaround: "2–4 hrs",
    sampleType: "Blood (EDTA)",
  },
  {
    id: "t2",
    name: "Lipid Profile / Cholesterol Panel",
    category: "CHEMISTRY",
    price: 18000,
    turnaround: "Same-Day",
    sampleType: "Blood (Serum)",
    fasting: true,
    prepNote: "Requires 10–12 hours overnight fasting.",
  },
  {
    id: "t3",
    name: "Fasting Blood Sugar (FBS)",
    category: "CHEMISTRY",
    price: 4000,
    turnaround: "1–2 hrs",
    sampleType: "Blood (Fluoride)",
    fasting: true,
    prepNote: "Requires 8 hours fasting before sample collection.",
  },
  {
    id: "t4",
    name: "Liver Function Test (LFT)",
    category: "CHEMISTRY",
    price: 20000,
    turnaround: "Same-Day",
    sampleType: "Blood (Serum)",
  },
  {
    id: "t5",
    name: "Kidney Function Test (Urea, Creatinine, Electrolytes)",
    category: "CHEMISTRY",
    price: 18000,
    turnaround: "Same-Day",
    sampleType: "Blood (Serum)",
  },
  {
    id: "t6",
    name: "Genotype & Blood Group",
    category: "HAEMATOLOGY",
    price: 8000,
    turnaround: "2–3 hrs",
    sampleType: "Blood (EDTA)",
  },
];

const ULTRASOUND_SCANS: TestItem[] = [
  {
    id: "u1",
    name: "Pelvic Ultrasound Scan",
    category: "ULTRASOUND",
    price: 15000,
    turnaround: "Instant Report + Printout",
    sampleType: "Radiology / Imaging",
    genderTarget: "FEMALE",
    prepNote: "Full bladder required: drink 1 litre of water 1 hour before scan.",
  },
  {
    id: "u2",
    name: "Prostate Ultrasound (Trans-abdominal)",
    category: "ULTRASOUND",
    price: 18000,
    turnaround: "Instant Report",
    sampleType: "Radiology / Imaging",
    genderTarget: "MALE",
    prepNote: "Moderately full bladder required.",
  },
  {
    id: "u3",
    name: "Obstetric / Pregnancy Scan",
    category: "ULTRASOUND",
    price: 15000,
    turnaround: "Instant Report + Images",
    sampleType: "Radiology / Imaging",
    genderTarget: "FEMALE",
    prepNote: "Adequate hydration recommended. Checks fetal viability & gestational age.",
  },
  {
    id: "u4",
    name: "Full Abdomino-Pelvic Scan",
    category: "ULTRASOUND",
    price: 22000,
    turnaround: "Instant Report + Printout",
    sampleType: "Radiology / Imaging",
    genderTarget: "ALL",
    prepNote: "Strict 6–8 hours fasting required. Morning appointment recommended.",
  },
  {
    id: "u5",
    name: "Breast Ultrasound (Bilateral)",
    category: "ULTRASOUND",
    price: 18000,
    turnaround: "Instant Report",
    sampleType: "Radiology / Imaging",
    genderTarget: "FEMALE",
    prepNote: "Wear comfortable two-piece clothing. No powders or deodorants on chest.",
  },
];

const PACKAGES = {
  male: [
    {
      id: "pkg-plat-m",
      name: "Total Body Platinum (Male)",
      price: 147000,
      badge: "Save ₦18,500",
      description: "Executive senior diagnostic profile with prostate scan and cardiac markers.",
      tests: [
        "Prostate Ultrasound Scan",
        "PSA (Prostate Specific Antigen)",
        "Full Blood Count (FBC)",
        "Comprehensive Lipid Profile",
        "Liver & Kidney Function Panels",
        "Fasting Blood Glucose",
        "Urine Analysis & Microscopy",
      ],
    },
    {
      id: "pkg-gold-m",
      name: "Comprehensive Gold (Male)",
      price: 86000,
      badge: "Popular",
      description: "Essential wellness screen covering organ health and blood wellness.",
      tests: [
        "Full Blood Count",
        "Fasting Blood Sugar",
        "Lipid Profile",
        "Liver Function Test",
        "Urinalysis",
      ],
    },
    {
      id: "pkg-silver-m",
      name: "Wellness Silver",
      price: 38000,
      description: "Basic preventive screening for routine health monitoring.",
      tests: ["Full Blood Count", "Fasting Blood Sugar", "Urinalysis", "Blood Pressure & BMI"],
    },
  ],
  female: [
    {
      id: "pkg-plat-f",
      name: "Total Body Platinum (Female)",
      price: 160000,
      badge: "Save ₦22,000",
      description: "Executive female diagnostic profile including pelvic scan and cervical screen.",
      tests: [
        "Pelvic Ultrasound Scan",
        "Bilateral Breast Ultrasound",
        "Full Blood Count (FBC)",
        "Comprehensive Lipid Profile",
        "Liver & Kidney Function Panels",
        "Fasting Blood Glucose",
        "Urinalysis & Pap Smear referral",
      ],
    },
    {
      id: "pkg-gold-f",
      name: "Comprehensive Gold (Female)",
      price: 86000,
      badge: "Popular",
      description: "Essential wellness screen with pelvic diagnostic evaluation.",
      tests: [
        "Pelvic Ultrasound Scan",
        "Full Blood Count",
        "Fasting Blood Sugar",
        "Lipid Profile",
        "Urinalysis",
      ],
    },
    {
      id: "pkg-silver-f",
      name: "Wellness Silver",
      price: 38000,
      description: "Basic preventive screening for routine health monitoring.",
      tests: ["Full Blood Count", "Fasting Blood Sugar", "Urinalysis", "Blood Pressure & BMI"],
    },
  ],
};

interface TestDirectoryProps {
  searchQuery?: string;
  categoryFilter?: string;
  selectedItemIds: string[];
  onToggleItem: (id: string, name: string) => void;
  onProceedToBooking?: (selectedItems: TestItem[]) => void;
}

export default function TestDirectory({
  searchQuery = "",
  categoryFilter = "ALL",
  selectedItemIds = [],
  onToggleItem,
  onProceedToBooking,
}: TestDirectoryProps) {
  const [activeTab, setActiveTab] = useState<"tests" | "packages" | "ultrasound">("tests");
  const [packageGender, setPackageGender] = useState<"male" | "female">("female");
  const [scanFilter, setScanFilter] = useState<"ALL" | "FEMALE" | "MALE">("ALL");

  // Sync tab with Hero search category pills
  useEffect(() => {
    if (categoryFilter === "ULTRASOUND") {
      setActiveTab("ultrasound");
    } else if (categoryFilter === "PACKAGES") {
      setActiveTab("packages");
    } else if (
      categoryFilter === "HAEMATOLOGY" ||
      categoryFilter === "CHEMISTRY" ||
      categoryFilter === "SAME_DAY" ||
      categoryFilter === "POPULAR"
    ) {
      setActiveTab("tests");
    }
  }, [categoryFilter]);

  // Sync tab with Navbar custom event & URL hash
  useEffect(() => {
    const handleTabSwitch = (e: Event) => {
      const customEvent = e as CustomEvent<"tests" | "packages" | "ultrasound">;
      if (customEvent.detail) {
        setActiveTab(customEvent.detail);
      }
    };

    const checkHash = () => {
      if (window.location.hash === "#packages") {
        setActiveTab("packages");
      } else if (window.location.hash === "#ultrasound") {
        setActiveTab("ultrasound");
      }
    };

    checkHash();
    window.addEventListener("switch-directory-tab", handleTabSwitch);
    window.addEventListener("hashchange", checkHash);

    return () => {
      window.removeEventListener("switch-directory-tab", handleTabSwitch);
      window.removeEventListener("hashchange", checkHash);
    };
  }, []);

  const query = searchQuery.trim().toLowerCase();

  // 1. Filter Individual Tests
  const filteredTests = SINGLE_TESTS.filter((test) => {
    const matchesSearch =
      !query ||
      test.name.toLowerCase().includes(query) ||
      test.category.toLowerCase().includes(query) ||
      test.sampleType.toLowerCase().includes(query);

    const matchesCategory =
      categoryFilter === "ALL" ||
      categoryFilter === "POPULAR" ||
      (categoryFilter === "HAEMATOLOGY" && test.category === "HAEMATOLOGY") ||
      (categoryFilter === "CHEMISTRY" && test.category === "CHEMISTRY") ||
      (categoryFilter === "SAME_DAY" &&
        (test.turnaround.toLowerCase().includes("hr") ||
          test.turnaround.toLowerCase().includes("same-day")));

    return matchesSearch && matchesCategory;
  });

  // 2. Filter Ultrasound Scans
  const filteredScans = ULTRASOUND_SCANS.filter((scan) => {
    const matchesGender =
      scanFilter === "ALL" ||
      scan.genderTarget === scanFilter ||
      scan.genderTarget === "ALL";

    const matchesSearch =
      !query ||
      scan.name.toLowerCase().includes(query) ||
      scan.prepNote?.toLowerCase().includes(query);

    return matchesGender && matchesSearch;
  });

  // 3. Filter Packages
  const filteredPackages = PACKAGES[packageGender].filter((pkg) => {
    if (!query) return true;
    return (
      pkg.name.toLowerCase().includes(query) ||
      pkg.description.toLowerCase().includes(query) ||
      pkg.tests.some((t) => t.toLowerCase().includes(query))
    );
  });

  return (
    <section id="tests" className="max-w-7xl mx-auto px-4 py-8">
      {/* 3-Way Segment Switcher */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-2xl bg-sullimax-surface border border-sullimax-border shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab("tests")}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "tests"
                ? "bg-sullimax-emerald text-white shadow-xs"
                : "text-sullimax-muted hover:text-sullimax-navy"
            }`}
          >
            🧪 Individual Lab Tests ({filteredTests.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("packages")}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "packages"
                ? "bg-sullimax-emerald text-white shadow-xs"
                : "text-sullimax-muted hover:text-sullimax-navy"
            }`}
          >
            🩺 Health Packages ({filteredPackages.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ultrasound")}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "ultrasound"
                ? "bg-sullimax-emerald text-white shadow-xs"
                : "text-sullimax-muted hover:text-sullimax-navy"
            }`}
          >
            📡 Ultrasound Scans ({filteredScans.length})
          </button>
        </div>
      </div>

      {/* VIEW A: INDIVIDUAL TESTS */}
      {activeTab === "tests" && (
        <>
          {filteredTests.length === 0 ? (
            <div className="text-center py-16 bg-sullimax-surface rounded-2xl border border-dashed border-sullimax-border">
              <SearchX className="w-10 h-10 text-sullimax-muted mx-auto mb-2" />
              <p className="font-bold text-sullimax-navy text-sm">No tests match your criteria</p>
              <p className="text-xs text-sullimax-muted mt-1">
                Try searching for general terms like &quot;Blood&quot;, &quot;Sugar&quot;, or reset your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTests.map((test) => {
                const isSelected = selectedItemIds.includes(test.id);
                return (
                  <div
                    key={test.id}
                    className={`bg-white rounded-xl border p-5 transition-all flex flex-col justify-between ${
                      isSelected
                        ? "border-sullimax-emerald ring-1 ring-sullimax-emerald shadow-xs"
                        : "border-sullimax-border hover:border-gray-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-2">
                        <span className="font-semibold text-sullimax-emerald bg-sullimax-emeraldLight px-2 py-0.5 rounded border border-emerald-100">
                          {test.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sullimax-muted">
                          <Clock className="w-3 h-3" />
                          {test.turnaround}
                        </span>
                      </div>

                      <h3 className="font-bold text-sullimax-navy text-base leading-snug">
                        {test.name}
                      </h3>

                      <p className="text-xs text-sullimax-muted mt-1">
                        Specimen: {test.sampleType}
                      </p>

                      {test.fasting && (
                        <div className="mt-3 flex items-start gap-1.5 p-2 rounded-lg bg-amber-50/70 border border-amber-200/60 text-amber-800 text-[11px]">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                          <span>{test.prepNote}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-sullimax-border flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-sullimax-muted block uppercase tracking-wider">
                          Fee
                        </span>
                        <span className="font-bold text-lg text-sullimax-navy">
                          ₦{test.price.toLocaleString()}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onToggleItem(test.id, test.name)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                          isSelected
                            ? "bg-emerald-100 text-sullimax-emerald border border-emerald-300"
                            : "bg-sullimax-emerald hover:bg-sullimax-emeraldHover text-white shadow-xs"
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" /> Add Test
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* VIEW B: HEALTH PACKAGES */}
      {activeTab === "packages" && (
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 bg-sullimax-surface p-3 rounded-xl border border-sullimax-border">
            <span className="text-xs font-medium text-sullimax-navy">
              Select Profile: Packages tailor ultrasound and biomarker checks to gender biology.
            </span>
            <div className="inline-flex rounded-lg bg-white border border-sullimax-border p-1">
              <button
                type="button"
                onClick={() => setPackageGender("female")}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  packageGender === "female"
                    ? "bg-sullimax-emerald text-white shadow-xs"
                    : "text-sullimax-muted hover:text-sullimax-navy"
                }`}
              >
                👩 Female Profile
              </button>
              <button
                type="button"
                onClick={() => setPackageGender("male")}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  packageGender === "male"
                    ? "bg-sullimax-emerald text-white shadow-xs"
                    : "text-sullimax-muted hover:text-sullimax-navy"
                }`}
              >
                👨 Male Profile
              </button>
            </div>
          </div>

          {filteredPackages.length === 0 ? (
            <div className="text-center py-16 bg-sullimax-surface rounded-2xl border border-dashed border-sullimax-border">
              <SearchX className="w-10 h-10 text-sullimax-muted mx-auto mb-2" />
              <p className="font-bold text-sullimax-navy text-sm">No packages match your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => {
                const isSelected = selectedItemIds.includes(pkg.id);
                return (
                  <div
                    key={pkg.id}
                    className={`bg-white rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                      isSelected
                        ? "border-sullimax-emerald ring-2 ring-sullimax-emerald shadow-sm"
                        : "border-sullimax-border hover:shadow-xs"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-sullimax-emerald">
                          Clinical Package
                        </span>
                        {pkg.badge && (
                          <span className="bg-emerald-50 text-sullimax-emerald text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                            {pkg.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="font-extrabold text-xl text-sullimax-navy leading-snug">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-sullimax-muted mt-2 leading-relaxed">
                        {pkg.description}
                      </p>

                      <div className="mt-5 pt-4 border-t border-sullimax-border">
                        <p className="text-[11px] font-bold text-sullimax-navy uppercase tracking-wider mb-2">
                          Included Tests ({pkg.tests.length}):
                        </p>
                        <ul className="space-y-1.5 text-xs text-sullimax-muted">
                          {pkg.tests.map((t, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-sullimax-emerald shrink-0" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-sullimax-border flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-sullimax-muted uppercase tracking-wider block">
                          Package Fee
                        </span>
                        <span className="text-2xl font-extrabold text-sullimax-navy">
                          ₦{pkg.price.toLocaleString()}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onToggleItem(pkg.id, pkg.name)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? "bg-emerald-100 text-sullimax-emerald border border-emerald-300"
                            : "bg-sullimax-emerald hover:bg-sullimax-emeraldHover text-white shadow-xs"
                        }`}
                      >
                        {isSelected ? "Selected ✓" : "Book Package"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW C: ULTRASOUND & IMAGING */}
      {activeTab === "ultrasound" && (
        <div>
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1 text-xs">
            {(["ALL", "FEMALE", "MALE"] as const).map((gender) => (
              <button
                key={gender}
                type="button"
                onClick={() => setScanFilter(gender)}
                className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                  scanFilter === gender
                    ? "bg-sullimax-navy text-white border-sullimax-navy"
                    : "bg-sullimax-surface text-sullimax-muted border-sullimax-border hover:bg-gray-100"
                }`}
              >
                {gender === "ALL" && "All Ultrasound Scans"}
                {gender === "FEMALE" && "Women's Scans (Pelvic / Obstetric / Breast)"}
                {gender === "MALE" && "Men's Scans (Prostate / Scrotal)"}
              </button>
            ))}
          </div>

          {filteredScans.length === 0 ? (
            <div className="text-center py-16 bg-sullimax-surface rounded-2xl border border-dashed border-sullimax-border">
              <SearchX className="w-10 h-10 text-sullimax-muted mx-auto mb-2" />
              <p className="font-bold text-sullimax-navy text-sm">No scans match your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredScans.map((scan) => {
                const isSelected = selectedItemIds.includes(scan.id);
                return (
                  <div
                    key={scan.id}
                    className={`bg-white rounded-xl border p-5 flex flex-col justify-between transition-all ${
                      isSelected
                        ? "border-sullimax-emerald ring-1 ring-sullimax-emerald shadow-xs"
                        : "border-sullimax-border hover:border-gray-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-2">
                        <span className="font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                          {scan.category}
                        </span>
                        <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                          {scan.turnaround}
                        </span>
                      </div>

                      <h3 className="font-bold text-sullimax-navy text-base leading-snug">
                        {scan.name}
                      </h3>

                      {scan.prepNote && (
                        <div className="mt-3 flex items-start gap-1.5 p-2.5 rounded-lg bg-sullimax-surface border border-sullimax-border text-sullimax-muted text-[11px] leading-relaxed">
                          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-sullimax-emerald" />
                          <div>
                            <strong className="text-sullimax-navy block font-semibold mb-0.5">
                              Preparation Instructions:
                            </strong>
                            {scan.prepNote}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-sullimax-border flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-sullimax-muted block uppercase tracking-wider">
                          Scan Fee
                        </span>
                        <span className="font-bold text-lg text-sullimax-navy">
                          ₦{scan.price.toLocaleString()}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onToggleItem(scan.id, scan.name)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                          isSelected
                            ? "bg-emerald-100 text-sullimax-emerald border border-emerald-300"
                            : "bg-sullimax-emerald hover:bg-sullimax-emeraldHover text-white shadow-xs"
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" /> Add Scan
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Floating Cart Drawer */}
      {selectedItemIds.length > 0 && (
        <div className="fixed bottom-4 left-0 right-0 z-40 px-4 max-w-xl mx-auto">
          <div className="bg-sullimax-navy text-white rounded-2xl p-4 shadow-xl flex items-center justify-between border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div>
              <p className="text-xs text-slate-300">
                <span className="font-bold text-white text-sm mr-1">
                  {selectedItemIds.length}
                </span>{" "}
                {selectedItemIds.length === 1 ? "item" : "items"} selected
              </p>
              <p className="text-[11px] text-emerald-400 font-medium">
                Ready for walk-in appointment or home sample
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const allFlatItems: TestItem[] = [
                  ...SINGLE_TESTS,
                  ...ULTRASOUND_SCANS,
                  ...PACKAGES.male.map((p) => ({
                    id: p.id,
                    name: p.name,
                    category: "CHEMISTRY" as const,
                    price: p.price,
                    turnaround: "Comprehensive",
                    sampleType: "Blood & Scans",
                  })),
                  ...PACKAGES.female.map((p) => ({
                    id: p.id,
                    name: p.name,
                    category: "CHEMISTRY" as const,
                    price: p.price,
                    turnaround: "Comprehensive",
                    sampleType: "Blood & Scans",
                  })),
                ];
                const matched = allFlatItems.filter((i) => selectedItemIds.includes(i.id));
                if (onProceedToBooking) onProceedToBooking(matched);
              }}
              className="bg-sullimax-emerald hover:bg-sullimax-emeraldHover text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Proceed to Booking</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}