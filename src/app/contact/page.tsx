import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import { siteSettings } from "@/lib/content";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Biomedical & Industrial Engineering Enquiries",
  description:
    "Contact AusinX Solutions Pty Ltd in Melbourne for medical equipment servicing, installation & commissioning, parts supply, and precision calibration.",
  openGraph: {
    title: "Contact Us | AusinX Solutions Pty Ltd",
    description:
      "Get in touch with our Australian biomedical engineering team. Call 0421 081 256 or submit an enquiry online.",
    url: "https://www.ausinx.com.au/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#1A2A3A] text-xs font-bold uppercase tracking-wider mb-3 border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-[#F8B800]" />
            <span>Contact & Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A2A3A] tracking-tight font-heading">
            Get in Touch with Our Engineering Team
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Enquire about medical equipment servicing, installation, calibration, or urgent parts supply across Australia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Contact Form with Suspense for URL query params */}
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center text-slate-400 text-sm">
                  Loading enquiry form...
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>

          {/* Right Column: Contact Details & Embedded Google Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1A2A3A] text-white rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6">
              <div className="border-b border-slate-700 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  Direct Engineering Desk
                </span>
                <h2 className="text-xl font-bold font-heading">
                  Company Contact Information
                </h2>
              </div>

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
                    <strong className="block text-white">Public Email Enquiries</strong>
                    <a
                      href={`mailto:${siteSettings.publicEmail}`}
                      className="text-slate-300 hover:text-amber-300 transition-colors font-medium"
                    >
                      {siteSettings.publicEmail}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Direct Phone Lines</strong>
                    <div className="space-y-1.5 mt-1 font-medium">
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
            <div className="rounded-3xl overflow-hidden border border-slate-300/80 shadow-sm bg-white p-2">
              <div className="px-3 py-2 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Melbourne Office Location
                </p>
                <span className="text-[10px] text-slate-400 font-mono">470 St Kilda Rd</span>
              </div>
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-100">
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
