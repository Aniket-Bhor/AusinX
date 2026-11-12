"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Wrench,
  Send,
  Zap,
} from "lucide-react";

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const modalities = [
  { id: "linac", label: "Radiotherapy & Linac", badge: "Critical" },
  { id: "ct-mri", label: "CT & MRI Imaging", badge: "Diagnostic" },
  { id: "c-arm", label: "C-Arm & X-Ray Systems", badge: "Surgical" },
  { id: "icu-biomed", label: "Ultrasound & Patient Monitors", badge: "Biomedical" },
  { id: "calibration", label: "Precision Calibration & QA", badge: "Compliance" },
  { id: "parts", label: "Spare Parts & Logistics", badge: "Express Supply" },
];

export default function QuickQuoteModal({
  isOpen,
  onClose,
  initialService,
}: QuickQuoteModalProps) {
  const [selectedModality, setSelectedModality] = useState(
    initialService || "ct-mri"
  );
  const [urgency, setUrgency] = useState<"urgent" | "standard" | "planned">("urgent");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Send or simulate quick triage
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: contactName || "Quick Dispatch Lead",
          email: "fast-triage@ausinx.com.au",
          phone: contactPhone,
          serviceCategory: selectedModality,
          message: `[QUICK POPUP DISPATCH] Urgency: ${urgency.toUpperCase()}. Modality: ${selectedModality}. Phone: ${contactPhone}`,
          hp: "",
        }),
      });
    } catch {
      // Proceed gracefully even on offline mode
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B2942]/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Pop-up Dialog Card */}
      <div className="relative w-full max-w-xl rounded-3xl bg-white shadow-[0_25px_70px_rgba(11,41,66,0.35)] border border-teal-100 overflow-hidden animate-pop-in z-10 my-8">
        {/* Glowing Top Ribbon */}
        <div className="h-2 w-full bg-gradient-to-r from-[#07999A] via-[#55C7C2] to-[#0B2942]" />

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-[#07999A] text-xs font-bold uppercase tracking-wider mb-2 border border-teal-100">
                <Zap className="w-3.5 h-3.5 text-[#07999A] fill-current" />
                <span>Instant Clinical Triage & Quote</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2942] tracking-tight font-heading">
                Rapid Engineering Support
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Tell us your equipment modality. An AusinX engineer will connect with you directly.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-teal-50 text-[#07999A] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-[#07999A]" />
              </div>
              <h3 className="text-xl font-bold text-[#0B2942]">Dispatch Request Received!</h3>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Our duty engineer has been notified. For urgent hospital or clinic emergencies, you can also dial directly:
              </p>
              <a
                href="tel:0421081256"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B2942] text-white font-semibold hover:bg-[#07999A] transition-all shadow-md"
              >
                <Phone className="w-4 h-4 text-[#55C7C2]" /> Call 0421 081 256 Now
              </a>
              <div>
                <button
                  onClick={onClose}
                  className="mt-4 text-xs font-semibold text-slate-400 hover:text-slate-600 underline"
                >
                  Close this window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Urgency Pill Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Urgency Level:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "urgent", label: "🚨 Urgent Emergency", desc: "Breakdown" },
                    { id: "standard", label: "⚡ Standard Service", desc: "1-2 Business Days" },
                    { id: "planned", label: "📅 Scheduled / QA", desc: "Planning" },
                  ].map((level) => (
                    <button
                      type="button"
                      key={level.id}
                      onClick={() => setUrgency(level.id as any)}
                      className={`p-2.5 rounded-xl text-left border text-xs font-medium transition-all ${
                        urgency === level.id
                          ? "border-[#07999A] bg-teal-50/70 text-[#0B2942] shadow-sm font-semibold ring-1 ring-[#07999A]"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <div>{level.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{level.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Equipment Modality Grid */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Select Equipment Type:
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {modalities.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setSelectedModality(item.id)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                        selectedModality === item.id
                          ? "border-[#07999A] bg-[#0B2942] text-white shadow-md font-semibold"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="truncate pr-1">{item.label}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                          selectedModality === item.id
                            ? "bg-[#07999A] text-white"
                            : "bg-white text-slate-500 border border-slate-200"
                        }`}
                      >
                        {item.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Your Name or Department:
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Dr. Sarah / Radiology Dept"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#07999A] focus:ring-1 focus:ring-[#07999A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Contact Phone Number:
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="e.g. 0400 000 000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#07999A] focus:ring-1 focus:ring-[#07999A]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-[#07999A] hover:bg-[#087F86] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Connecting..." : "Request Immediate Callback"}
                </button>
                <a
                  href="tel:0421081256"
                  className="w-full sm:w-auto py-3.5 px-5 rounded-full border border-slate-200 hover:bg-slate-50 text-[#0B2942] font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#07999A]" />
                  <span>Call 0421 081 256</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" /> Australian Compliant
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-teal-600" /> Fast Response
                </span>
                <span>•</span>
                <span>Direct to Melbourne Engineers</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
