"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { siteSettings } from "@/lib/content";

const serviceSlugMap: Record<string, string> = {
  "service-maintenance": "Service & Maintenance",
  "service": "Service & Maintenance",
  "installation-commissioning": "Installation & Commissioning",
  "installation": "Installation & Commissioning",
  "parts-logistics": "Parts & Logistics",
  "parts": "Parts & Logistics",
  "calibration": "Calibration",
  "other": "Other",
};

function ContactFormInner() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service")?.toLowerCase();

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    organisation: "",
    email: "",
    phone: "",
    serviceInterest: "Service & Maintenance",
    message: "",
    consent: false,
    websiteHoneypot: "", // Honeypot field for anti-spam
  });

  // Pre-select service from URL query parameter
  useEffect(() => {
    if (serviceParam) {
      const matched =
        serviceSlugMap[serviceParam] ||
        Object.values(serviceSlugMap).find(
          (v) => v.toLowerCase() === serviceParam
        );
      if (matched) {
        setFormData((prev) => ({ ...prev, serviceInterest: matched }));
      }
    }
  }, [serviceParam]);

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

    // Anti-spam honeypot check
    if (formData.websiteHoneypot) {
      setSubmitted(true);
      return;
    }

    if (!formData.fullName || !formData.email || !formData.message) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (!formData.consent) {
      setErrorMessage("Please consent to being contacted regarding your enquiry.");
      return;
    }

    setSubmitting(true);

    try {
      // Simulate submission endpoint / server action
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
    } catch {
      setErrorMessage("An unexpected error occurred. Please try calling us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
      {submitted ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-[#1A2A3A] font-heading">
            Enquiry Received
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Thank you for reaching out to AusinX Solutions. An engineer will review your request and respond promptly during standard business hours.
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
                  serviceInterest: "Service & Maintenance",
                  message: "",
                  consent: false,
                  websiteHoneypot: "",
                });
              }}
              className="px-5 py-2.5 rounded-lg bg-[#1A2A3A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#121E2A] transition-colors"
            >
              Send Another Message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1A2A3A] font-heading">
              Service Enquiry Form
            </h2>
            {serviceParam && (
              <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full font-medium">
                Service Pre-selected
              </span>
            )}
          </div>

          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Honeypot Field (hidden from genuine users) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="websiteHoneypot">Do not fill this field</label>
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
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Dr. Jane Smith"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#F8B800] focus:ring-1 focus:ring-[#F8B800] outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="organisation"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                Organisation / Hospital *
              </label>
              <input
                type="text"
                id="organisation"
                name="organisation"
                required
                value={formData.organisation}
                onChange={handleChange}
                placeholder="e.g. Melbourne Health Clinic"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#F8B800] focus:ring-1 focus:ring-[#F8B800] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@hospital.com.au"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#F8B800] focus:ring-1 focus:ring-[#F8B800] outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="04XX XXX XXX"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#F8B800] focus:ring-1 focus:ring-[#F8B800] outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="serviceInterest"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
            >
              Service of Interest
            </label>
            <select
              id="serviceInterest"
              name="serviceInterest"
              value={formData.serviceInterest}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#F8B800] focus:ring-1 focus:ring-[#F8B800] outline-none bg-white font-medium"
            >
              <option value="Service & Maintenance">
                Service & Maintenance (Preventive & Repairs)
              </option>
              <option value="Installation & Commissioning">
                Installation & Commissioning (Radiotherapy & CT/MRI)
              </option>
              <option value="Parts & Logistics">
                Parts Supply & Coordinated Logistics
              </option>
              <option value="Calibration">
                Documented Precision Calibration
              </option>
              <option value="Other">Other Enquiry</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
            >
              Message / Equipment Details *
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Please describe your equipment type, facility location, and requirements..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-[#F8B800] focus:ring-1 focus:ring-[#F8B800] outline-none"
            ></textarea>
          </div>

          {/* Cloudflare Turnstile & Honeypot Notice */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Protected by Cloudflare Turnstile & Honeypot Spam Shield</span>
            </div>
            <span className="text-[10px] text-slate-400">Secure</span>
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mt-1 rounded text-[#F8B800] focus:ring-[#F8B800]"
            />
            <label htmlFor="consent" className="text-xs text-slate-600">
              I consent to AusinX Solutions contacting me regarding this service enquiry. We respect your privacy.
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#F8B800] text-[#1A2A3A] font-bold text-sm hover:bg-[#E0A400] transition-all shadow-md active:scale-98 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{submitting ? "Sending Enquiry..." : "Send Service Enquiry"}</span>
          </button>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1A2A3A] bg-white px-3 py-1 rounded-full border border-slate-200 inline-block mb-3">
            Contact & Support
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A2A3A] tracking-tight font-heading">
            Get in Touch with Our Engineering Team
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Enquire about medical equipment servicing, installation, calibration, or urgent parts supply.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Form with Suspense for useSearchParams */}
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center text-slate-400 text-sm">
                  Loading enquiry form...
                </div>
              }
            >
              <ContactFormInner />
            </Suspense>
          </div>

          {/* Right Column: Contact Details & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1A2A3A] text-white rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-5">
              <h2 className="text-xl font-bold font-heading border-b border-slate-700 pb-3">
                Company Contact Information
              </h2>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Office Address</strong>
                    <span className="text-slate-300">
                      470 St Kilda Rd, Melbourne VIC 3004, Australia
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Email Enquiries</strong>
                    <a
                      href={`mailto:${siteSettings.publicEmail}`}
                      className="text-slate-300 hover:text-amber-300 transition-colors"
                    >
                      {siteSettings.publicEmail}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Direct Phone Lines</strong>
                    <div className="space-y-1 mt-1 font-medium">
                      {siteSettings.phones.map((p) => (
                        <a
                          key={p.raw}
                          href={`tel:${p.raw}`}
                          className="block text-slate-200 hover:text-amber-300 transition-colors"
                        >
                          {p.display}
                        </a>
                      ))}
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Operating Hours</strong>
                    <span className="text-slate-300">
                      Monday – Friday: 09:00 AM – 5:00 PM
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-2xl overflow-hidden border border-slate-300 shadow-sm bg-white p-2">
              <p className="text-xs font-bold text-slate-500 uppercase px-3 py-2">
                Melbourne Location
              </p>
              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden">
                <iframe
                  title="AusinX Solutions Melbourne Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=470+St+Kilda+Rd,+Melbourne+VIC+3004&t=&z=14&ie=UTF8&iwloc=&output=embed"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
