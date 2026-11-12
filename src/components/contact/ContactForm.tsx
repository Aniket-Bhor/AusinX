"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Loader2,
} from "lucide-react";

interface ContactServiceOption {
  slug: string;
  navTitle: string;
  contactValue: string;
}

export default function ContactForm({ services }: { services: ContactServiceOption[] }) {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service")?.toLowerCase();
  const serviceSlugMap = useMemo(
    () =>
      Object.fromEntries(
        services.flatMap((service) => [
          [service.slug, service.contactValue],
          [service.navTitle.toLowerCase(), service.contactValue],
          [service.contactValue.toLowerCase(), service.contactValue],
        ])
      ),
    [services]
  );
  const legacyServiceMap = useMemo<Record<string, string>>(
    () => ({
      service: services.find((item) => item.slug === "service-maintenance")?.contactValue || "Other",
      installation: services.find((item) => item.slug === "installation-commissioning")?.contactValue || "Other",
      parts: services.find((item) => item.slug === "parts-logistics")?.contactValue || "Other",
      other: "Other",
    }),
    [services]
  );
  const defaultService = services[0]?.contactValue || "Other";

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    organisation: "",
    email: "",
    phone: "",
    serviceInterest: defaultService,
    message: "",
    consent: false,
    websiteHoneypot: "",
  });

  // Pre-select service from URL query parameter (?service=...)
  useEffect(() => {
    if (serviceParam) {
      const matched =
        serviceSlugMap[serviceParam] || legacyServiceMap[serviceParam];
      if (matched) {
        setFormData((prev) => ({ ...prev, serviceInterest: matched }));
      }
    }
  }, [serviceParam, serviceSlugMap, legacyServiceMap]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (!formData.consent) {
      setErrorMessage("Please consent to being contacted regarding your enquiry.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setErrorMessage(
          result.error || "Unable to send enquiry. Please contact us directly by phone."
        );
      } else {
        setSubmitted(true);
      }
    } catch {
      setErrorMessage(
        "Network connection error. Please call us on 0421 081 256 for immediate assistance."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md">
      {submitted ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-[#0B2942] font-heading">
            Enquiry Received Successfully
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Thank you for contacting AusinX Solutions. An engineer will review your request and respond promptly during standard business hours.
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  fullName: "",
                  organisation: "",
                  email: "",
                  phone: "",
                  serviceInterest: defaultService,
                  message: "",
                  consent: false,
                  websiteHoneypot: "",
                });
              }}
              className="px-6 py-2.5 rounded-lg bg-[#0B2942] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#071F33] transition-colors shadow-sm"
            >
              Send Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0B2942] font-heading">
              Healthcare & Industrial Service Enquiry
            </h2>
            {serviceParam && (
              <span className="text-xs bg-teal-50 text-teal-900 border border-teal-200 px-2.5 py-1 rounded-full font-semibold">
                Service Pre-selected
              </span>
            )}
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Honeypot Field (anti-spam) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="websiteHoneypot">Leave this blank</label>
            <input
              type="text"
              id="websiteHoneypot"
              name="websiteHoneypot"
              tabIndex={-1}
              autoComplete="off"
              value={formData.websiteHoneypot}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Dr. Jane Smith"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#07999A] focus:ring-2 focus:ring-[#07999A]/20 outline-none transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="organisation"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Organisation / Hospital <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="organisation"
                name="organisation"
                required
                value={formData.organisation}
                onChange={handleChange}
                placeholder="e.g. Melbourne Health Clinic"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#07999A] focus:ring-2 focus:ring-[#07999A]/20 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Official Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@hospital.com.au"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#07999A] focus:ring-2 focus:ring-[#07999A]/20 outline-none transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Contact Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="04XX XXX XXX"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#07999A] focus:ring-2 focus:ring-[#07999A]/20 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="serviceInterest"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Service of Interest <span className="text-red-500">*</span>
            </label>
            <select
              id="serviceInterest"
              name="serviceInterest"
              value={formData.serviceInterest}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#07999A] focus:ring-2 focus:ring-[#07999A]/20 outline-none bg-white font-medium transition-all"
            >
              {services.map((service) => (
                <option key={service.slug} value={service.contactValue}>
                  {service.navTitle}
                </option>
              ))}
              <option value="Other">Other Technical Enquiry</option>
              <option value="Other">Other Technical Enquiry</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Message / Equipment Details <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your equipment model, facility department, and support requirements..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#07999A] focus:ring-2 focus:ring-[#07999A]/20 outline-none transition-all"
            ></textarea>
          </div>

          {/* Privacy & Anti-Spam Notice */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Protected by server-side verification & anti-spam shield</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">AusinX Secure</span>
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              required
              checked={formData.consent}
              onChange={handleChange}
              className="mt-1 rounded border-slate-300 text-[#07999A] focus:ring-[#07999A]"
            />
            <label htmlFor="consent" className="text-xs text-slate-600 leading-relaxed">
              I consent to AusinX Solutions contacting me regarding this enquiry. We respect your privacy in accordance with our{" "}
              <a href="/privacy" className="underline text-slate-800 hover:text-black">
                Privacy Policy
              </a>
              .
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#07999A] text-[#0B2942] font-bold text-sm hover:bg-[#087F86] transition-all shadow-md active:scale-[0.99] disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Enquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Service Enquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
