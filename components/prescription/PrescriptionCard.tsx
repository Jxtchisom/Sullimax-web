"use client";

import { useState } from "react";
import { UploadCloud, MessageCircle, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { validateNigerianPhone } from "@/lib/validators";

export default function PrescriptionCard() {
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [notes, setNotes] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateNigerianPhone(phone)) {
      setPhoneError("Please enter a valid Nigerian phone number (e.g. 08012345678 or +234...)");
      return;
    }

    setPhoneError("");

    const message = encodeURIComponent(
      `*Prescription Review Request - Sullimax Diagnostics*\n\n` +
      `*Patient:* ${patientName}\n` +
      `*Phone:* ${phone}\n` +
      (fileName ? `*Attached Prescription File:* ${fileName}\n` : "") +
      (notes ? `*Doctor's Instructions / Notes:* ${notes}\n` : "") +
      `\nHello Sullimax Lab Desk, I would like your duty pathologist to review this prescription and provide a cost breakdown.`
    );

    window.open(`https://wa.me/2347067582117?text=${message}`, "_blank");
  };

  return (
    <section id="prescription" className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl border border-sullimax-border p-6 sm:p-10 shadow-xs">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sullimax-emerald uppercase tracking-wider mb-2">
            <FileText className="w-4 h-4" />
            <span>Pathology Desk Review</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-sullimax-navy tracking-tight">
            Have a Doctor&apos;s Prescription?
          </h2>
          <p className="text-xs sm:text-sm text-sullimax-muted mt-2 leading-relaxed">
            Upload a photo or PDF of your doctor&apos;s test requisition. Our duty clinical pathologist will review the handwriting, map the exact investigations, and send you a confirmed itemized bill on WhatsApp.
          </p>
        </div>

        <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-sullimax-navy mb-1.5">
                Patient Legal Name
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Babatunde Adeleke"
                className="w-full bg-sullimax-surface border border-sullimax-border rounded-xl px-3.5 py-2.5 text-xs text-sullimax-navy placeholder-gray-400 focus:outline-none focus:border-sullimax-emerald"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-sullimax-navy mb-1.5">
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
                className={`w-full bg-sullimax-surface border rounded-xl px-3.5 py-2.5 text-xs text-sullimax-navy placeholder-gray-400 focus:outline-none ${
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

          {/* Upload Dropzone */}
          <div>
            <label className="block text-xs font-bold text-sullimax-navy mb-1.5">
              Prescription Document / Photo
            </label>
            <label className="border-2 border-dashed border-sullimax-border hover:border-sullimax-emerald rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-sullimax-surface/50">
              <UploadCloud className="w-8 h-8 text-sullimax-emerald mb-2" />
              {fileName ? (
                <span className="text-xs font-bold text-sullimax-navy flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {fileName}
                </span>
              ) : (
                <>
                  <span className="text-xs font-bold text-sullimax-navy">
                    Click to select photo or scan (PNG, JPG, PDF)
                  </span>
                  <span className="text-[11px] text-sullimax-muted mt-1">
                    Max size 15MB. Clear daylight photo recommended.
                  </span>
                </>
              )}
              <input
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-sullimax-navy mb-1.5">
              Additional Notes for Pathologist (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Doctor said I should fast, or requesting home blood draw."
              className="w-full bg-sullimax-surface border border-sullimax-border rounded-xl px-3.5 py-2.5 text-xs text-sullimax-navy placeholder-gray-400 focus:outline-none focus:border-sullimax-emerald resize-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-sullimax-emerald hover:bg-sullimax-emeraldHover text-white text-xs font-bold px-6 py-3.5 rounded-xl shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Prescription to Duty Pathologist</span>
          </button>
        </form>
      </div>
    </section>
  );
}