"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  CalendarCheck 
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openBookingModal = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-sullimax-border shadow-xs">
      {/* 1. Top Clinical Info Bar (Hidden on small mobile screens) */}
      <div className="bg-sullimax-surface border-b border-sullimax-border/60 text-[11px] text-sullimax-muted py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-sullimax-navy">
              RC 1196599
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-sullimax-emerald" />
              6 Olumo St, Yaba, Lagos
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-sullimax-emerald" />
              Mon–Sat: 7:30 AM–6:00 PM
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:07067582117"
              className="flex items-center gap-1 hover:text-sullimax-navy transition-colors"
            >
              <Phone className="w-3 h-3 text-sullimax-emerald" />
              <span>07067582117</span>
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="https://wa.me/2347067582117"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-medium transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sullimax-navy flex items-center justify-center text-white font-extrabold text-lg shadow-xs">
            S
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg text-sullimax-navy tracking-tight block leading-tight">
              Sullimax
            </span>
            <span className="text-[9px] uppercase tracking-widest text-sullimax-muted block font-semibold">
              Diagnostics Centre
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-sullimax-muted">
          <Link
            href="#tests"
            className="hover:text-sullimax-navy transition-colors"
          >
            Tests & Scans
          </Link>
          <Link
            href="#tests"
            className="hover:text-sullimax-navy transition-colors"
          >
            Health Packages
          </Link>
          <Link
            href="#prescription"
            className="hover:text-sullimax-navy transition-colors"
          >
            Upload Prescription
          </Link>
          <Link
            href="#contact"
            className="hover:text-sullimax-navy transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Action Buttons & Hamburger Toggle */}
        <div className="flex items-center gap-2">
          {/* Desktop "Book Appointment" CTA */}
          <button
            onClick={openBookingModal}
            className="hidden sm:inline-flex items-center gap-1.5 bg-sullimax-emerald hover:bg-sullimax-emeraldHover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-sullimax-navy hover:bg-sullimax-surface transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* 3. Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-sullimax-border px-4 py-5 space-y-4 animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3 text-sm font-semibold text-sullimax-navy">
            <Link
              href="#tests"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-gray-100 flex items-center justify-between"
            >
              <span>Tests & Scans</span>
              <span className="text-xs text-sullimax-muted">🧪</span>
            </Link>
            <Link
              href="#tests"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-gray-100 flex items-center justify-between"
            >
              <span>Health Packages</span>
              <span className="text-xs text-sullimax-muted">🩺</span>
            </Link>
            <Link
              href="#prescription"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-gray-100 flex items-center justify-between"
            >
              <span>Upload Prescription</span>
              <span className="text-xs text-sullimax-muted">📄</span>
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 flex items-center justify-between"
            >
              <span>Location & Hours</span>
              <span className="text-xs text-sullimax-muted">📍</span>
            </Link>
          </nav>

          <div className="pt-2 border-t border-sullimax-border space-y-2">
            <button
              onClick={openBookingModal}
              className="w-full bg-sullimax-emerald hover:bg-sullimax-emeraldHover text-white text-xs font-bold py-3 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            <a
              href="https://wa.me/2347067582117"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Chat with Yaba Lab Desk</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}