"use client";

import { useState, useEffect } from "react";
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Home, 
  CheckCircle2, 
  Trash2,
  AlertCircle
} from "lucide-react";
import { validateNigerianPhone, formatToWhatsAppNumber } from "@/lib/validators";

export interface BookingItem {
  id: string;
  name: string;
  price: number;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: BookingItem[];
  onRemoveItem: (id: string) => void;
  initialVisitType?: "WALK_IN" | "HOME_SAMPLE";
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedItems,
  onRemoveItem,
  initialVisitType = "WALK_IN",
}: BookingModalProps) {
  const [visitType, setVisitType] = useState<"WALK_IN" | "HOME_SAMPLE">(initialVisitType);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("07:30 AM - 09:30 AM (Fasting Priority)");
  const [address, setAddress] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisitType(initialVisitType);
      setIsBooked(false);
      setPhoneError("");
    }
  }, [isOpen, initialVisitType]);

  if (!isOpen) return null;

  const totalAmount = selectedItems.reduce((acc, item) => acc + item.price, 0);
  const homeServiceFee = visitType === "HOME_SAMPLE" ? 5000 : 0;
  const grandTotal = totalAmount + homeServiceFee;

  const TIME_SLOTS = [
    "07:30 AM - 09:30 AM (Fasting Priority)",
    "09:30 AM - 11:30 AM",
    "11:30 AM - 01:30 PM",
    "02:00 PM - 04:00 PM",
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Strict Nigerian Phone Validation
    if (!validateNigerianPhone(phone)) {
      setPhoneError("Please enter a valid Nigerian phone number (e.g. 08012345678 or +234...)");
      return;
    }

    setPhoneError("");
    setIsBooked(true);
  };

  const handleWhatsAppDispatch = () => {
    const itemList =
      selectedItems.length > 0
        ? selectedItems.map((i) => `• ${i.name} (₦${i.price.toLocaleString()})`).join("\n")
        : "• Consultation / General Diagnostic Booking";

    const text = encodeURIComponent(
      `*New Appointment Booking - Sullimax Diagnostics*\n\n` +
      `*Patient:* ${fullName}\n` +
      `*Phone:* ${phone}\n` +
      `*Visit Type:* ${visitType === "WALK_IN" ? "Walk-in (Yaba Centre)" : "Home Sample Collection"}\n` +
      (visitType === "HOME_SAMPLE" ? `*Address:* ${address}\n` : "") +
      `*Date:* ${preferredDate}\n` +
      `*Time Slot:* ${preferredTime}\n\n` +
      `*Tests Booked:*\n${itemList}\n\n` +
      (visitType === "HOME_SAMPLE" ? `*Home Logistics Fee:* ₦5,000\n` : "") +
      `*Estimated Total:* ₦${grandTotal.toLocaleString()}`
    );

    window.open(`https://wa.me/2347067582117?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-sullimax-border overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-sullimax-surface border-b border-sullimax-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-sullimax-emerald" />
            <h2 className="text-base font-bold text-sullimax-navy">
              Schedule Diagnostic Appointment
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-sullimax-muted hover:text-sullimax-navy hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isBooked ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-14 h-14 text-sullimax-emerald mx-auto mb-3" />
              <h3 className="text-xl font-bold text-sullimax-navy">Appointment Scheduled</h3>
              <p className="text-xs sm:text-sm text-sullimax-muted max-w-md mx-auto mt-2 leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Your slot has been reserved for{" "}
                <strong>{preferredDate} ({preferredTime})</strong>.
              </p>

              <div className="mt-6 p-4 rounded-xl bg-sullimax-surface border border-sullimax-border max-w-sm mx-auto text-left text-xs space-y-1.5">
                <p className="font-semibold text-sullimax-navy">Next Steps:</p>
                <p className="text-sullimax-muted">
                  {visitType === "HOME_SAMPLE"
                    ? `• A phlebotomist will arrive at ${address || "your designated address"} during your morning slot.`
                    : "• Arrive at 6 Olumo St, off Commercial Ave, Yaba for fast-track processing."}
                </p>
                <p className="text-sullimax-muted">• Fast for 8–10 hours overnight if your investigations include sugar or lipids.</p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleWhatsAppDispatch}
                  className="bg-sullimax-emerald hover:bg-sullimax-emeraldHover text-white text-xs font-bold px-6 py-3 rounded-xl transition-colors shadow-xs"
                >
                  Send Confirmation to Front Desk via WhatsApp
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="border border-sullimax-border px-5 py-3 rounded-xl text-xs font-semibold text-sullimax-muted hover:text-sullimax-navy"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              {/* Visit Type Toggle */}
              <div>
                <label className="block text-xs font-bold text-sullimax-navy mb-2">
                  Select Visit Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setVisitType("WALK_IN")}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all ${
                      visitType === "WALK_IN"
                        ? "border-sullimax-emerald bg-emerald-50/50 ring-1 ring-sullimax-emerald"
                        : "border-sullimax-border bg-sullimax-surface hover:bg-gray-100"
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-sullimax-emerald shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-sullimax-navy">Walk-in to Centre</p>
                      <p className="text-[11px] text-sullimax-muted">6 Olumo St, Yaba, Lagos</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisitType("HOME_SAMPLE")}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all ${
                      visitType === "HOME_SAMPLE"
                        ? "border-sullimax-emerald bg-emerald-50/50 ring-1 ring-sullimax-emerald"
                        : "border-sullimax-border bg-sullimax-surface hover:bg-gray-100"
                    }`}
                  >
                    <Home className="w-4 h-4 text-sullimax-emerald shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-sullimax-navy">Home Phlebotomy</p>
                      <p className="text-[11px] text-sullimax-muted">+₦5,000 door collection</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Selected Tests Breakdown */}
              <div className="bg-sullimax-surface rounded-xl p-4 border border-sullimax-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-sullimax-navy uppercase tracking-wider">
                    Selected Investigations ({selectedItems.length})
                  </span>
                </div>

                {selectedItems.length === 0 ? (
                  <p className="text-xs text-sullimax-muted italic">
                    No tests selected. You are booking a walk-in evaluation.
                  </p>
                ) : (
                  <div className="divide-y divide-sullimax-border/60 max-h-36 overflow-y-auto pr-1">
                    {selectedItems.map((item) => (
                      <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                        <span className="text-sullimax-navy font-medium truncate max-w-[280px]">
                          {item.name}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-sullimax-navy">
                            ₦{item.price.toLocaleString()}
                          </span>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-gray-400 hover:text-red-500"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {visitType === "HOME_SAMPLE" && (
                  <div className="pt-2 border-t border-sullimax-border/60 flex justify-between items-center text-xs text-emerald-800">
                    <span>Doorstep Phlebotomy & Logistics:</span>
                    <span className="font-semibold">+₦5,000</span>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-sullimax-border flex justify-between items-center text-xs">
                  <span className="text-sullimax-muted">Estimated Total:</span>
                  <span className="text-base font-extrabold text-sullimax-emerald">
                    ₦{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Patient Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-sullimax-navy mb-1">
                    Patient Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full legal name"
                    className="w-full bg-sullimax-surface border border-sullimax-border rounded-lg px-3 py-2 text-xs text-sullimax-navy placeholder-gray-400 focus:outline-none focus:border-sullimax-emerald"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-sullimax-navy mb-1">
                    WhatsApp / Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (phoneError) setPhoneError("");
                    }}
                    placeholder="e.g. 08012345678"
                    className={`w-full bg-sullimax-surface border rounded-lg px-3 py-2 text-xs text-sullimax-navy placeholder-gray-400 focus:outline-none ${
                      phoneError
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-sullimax-border focus:border-sullimax-emerald"
                    }`}
                  />
                  {phoneError && (
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-red-600 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{phoneError}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Home Address Field */}
              {visitType === "HOME_SAMPLE" && (
                <div>
                  <label className="block text-xs font-bold text-sullimax-navy mb-1">
                    Lagos Home / Office Address
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street name, landmark, area (e.g. Alagomeji, Yaba)"
                    className="w-full bg-sullimax-surface border border-sullimax-border rounded-lg px-3 py-2 text-xs text-sullimax-navy placeholder-gray-400 focus:outline-none focus:border-sullimax-emerald"
                  />
                </div>
              )}

              {/* Date & Time Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-sullimax-navy mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sullimax-emerald" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-sullimax-surface border border-sullimax-border rounded-lg px-3 py-2 text-xs text-sullimax-navy focus:outline-none focus:border-sullimax-emerald"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-sullimax-navy mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sullimax-emerald" />
                    <span>Arrival / Sample Window</span>
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-sullimax-surface border border-sullimax-border rounded-lg px-3 py-2 text-xs text-sullimax-navy focus:outline-none focus:border-sullimax-emerald"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-sullimax-border flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-sullimax-emerald hover:bg-sullimax-emeraldHover text-white text-xs font-bold py-3 rounded-xl shadow-xs transition-colors"
                >
                  Confirm & Reserve Appointment
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl border border-sullimax-border text-xs font-semibold text-sullimax-muted hover:text-sullimax-navy"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}