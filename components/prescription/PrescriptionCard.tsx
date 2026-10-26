"use client";

import { useState } from "react";
import { 
  UploadCloud, 
  FileText, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from "lucide-react";

export default function PrescriptionCard() {
  const [file, setFile] = useState<File | null>(null);
  const [patientName, setPatientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(
      `Hello Sullimax Diagnostics, my name is ${patientName || "a patient"}. I have a doctor's lab prescription slip I would like to review and book.`
    );
    window.open(`https://wa.me/2347067582117?text=${message}`, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !phoneNumber) return;
    setIsSubmitted(true);
  };

  return (
    <section id="prescription" className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white border border-sullimax-border rounded-2xl p-6 sm:p-10 shadow-xs">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-bold uppercase tracking-wider text-sullimax-emerald bg-sullimax-emeraldLight px-3 py-1 rounded-full border border-emerald-100">
            Fast Pathologist Routing
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-sullimax-navy mt-3 tracking-tight">
            Have a Doctor’s Lab Prescription?
          </h2>
          <p className="text-xs sm:text-sm text-sullimax-muted mt-2 leading-relaxed">
            Skip manual searching. Upload a clear photo of your doctor’s lab request slip, and our clinical team will review required tests, confirm pricing, and prepare your appointment.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-10 px-4 bg-sullimax-surface rounded-xl border border-emerald-100">
            <CheckCircle2 className="w-12 h-12 text-sullimax-emerald mx-auto mb-3" />
            <h3 className="text-lg font-bold text-sullimax-navy">
              Prescription Slip Received
            </h3>
            <p className="text-xs sm:text-sm text-sullimax-muted max-w-md mx-auto mt-1.5 leading-relaxed">
              Our duty pathologist is reviewing your lab request. We will reach out to <strong>{phoneNumber}</strong> within 15–30 minutes with an itemized test breakdown and prep instructions.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFile(null);
              }}
              className="mt-6 text-xs font-semibold text-sullimax-emerald hover:underline"
            >
              Upload another document
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload Dropzone */}
            <div className="relative border-2 border-dashed border-sullimax-border hover:border-sullimax-emerald/60 rounded-xl p-6 sm:p-8 text-center bg-sullimax-surface transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-sullimax-emerald flex items-center justify-center mb-3 border border-emerald-100">
                  <UploadCloud className="w-6 h-6" />
                </div>
                {file ? (
                  <div className="flex items-center gap-2 text-sm font-semibold text-sullimax-navy">
                    <FileText className="w-4 h-4 text-sullimax-emerald" />
                    <span>{file.name}</span>
                    <span className="text-xs text-sullimax-muted">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-bold text-sullimax-navy">
                      Click to upload or take a photo of your slip
                    </p>
                    <p className="text-xs text-sullimax-muted mt-1">
                      Supports JPG, PNG, or PDF (up to 10MB)
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Patient Info Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-sullimax-navy mb-1">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Chisom Adebayo"
                  className="w-full bg-sullimax-surface border border-sullimax-border rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-sullimax-navy placeholder-gray-400 focus:outline-none focus:border-sullimax-emerald transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-sullimax-navy mb-1">
                  WhatsApp / Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g. 08012345678"
                  className="w-full bg-sullimax-surface border border-sullimax-border rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-sullimax-navy placeholder-gray-400 focus:outline-none focus:border-sullimax-emerald transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-sullimax-navy mb-1">
                Clinical Notes / Symptoms (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any doctor instructions, fasting notices, or urgent date requests..."
                className="w-full bg-sullimax-surface border border-sullimax-border rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-sullimax-navy placeholder-gray-400 focus:outline-none focus:border-sullimax-emerald transition-colors resize-none"
              />
            </div>

            {/* CTAs: Direct Portal Submission vs WhatsApp Quick Review */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                className="w-full sm:flex-1 bg-sullimax-emerald hover:bg-sullimax-emeraldHover text-white text-xs sm:text-sm font-bold py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Submit for Pathologist Review</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppRedirect}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Send via WhatsApp</span>
              </button>
            </div>

            {/* Clinical Guarantee Footer */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-sullimax-muted pt-4 border-t border-sullimax-border/60">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sullimax-emerald" />
                15–30 min response time
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-sullimax-emerald" />
                Strict medical confidentiality
              </span>
              <span className="flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-sullimax-emerald" />
                Verified Yaba Lab Desk (RC 1196599)
              </span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}