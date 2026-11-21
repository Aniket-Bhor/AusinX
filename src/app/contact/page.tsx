import React, { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Wrench, Building2 } from "lucide-react";
import { getServices, getSiteImages, getSiteSettings } from "@/lib/content";
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

export default async function ContactPage() {
  const [services, siteSettings, siteImages] = await Promise.all([
    getServices(),
    getSiteSettings(),
    getSiteImages(),
  ]);
  return (
    <div className="py-12 sm:py-20 bg-bg-tint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface text-brand-primary text-xs font-bold uppercase tracking-wider mb-3 border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            <span>Contact & Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-primary tracking-tight font-heading">
            Get in Touch with Our Engineering Team
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Enquire about medical equipment servicing, installation, calibration, or urgent parts supply across Australia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column: Contact Form with Suspense for URL query params */}
          <div id="support" className="scroll-mt-28 lg:col-span-7">
            <Suspense
              fallback={
                <div className="bg-surface rounded-3xl p-10 border border-slate-200 text-center text-slate-500 text-sm">
                  Loading enquiry form...
                </div>
              }
            >
              <ContactForm services={services.map(({ slug, navTitle, contactValue }) => ({
                slug,
                navTitle,
                contactValue: contactValue || navTitle,
              }))} />
            </Suspense>
          </div>

          {/* Right Column: Contact Details & Embedded Google Map */}
          <div className="lg:col-span-5 space-y-5">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-surface text-brand-primary shadow-sm">
              <div className="relative h-44 sm:h-52">
                <Image src={siteImages.contactImage} alt="AusinX engineering technical support desk and telemetry operations" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/70 via-brand-primary/10 to-transparent" />
                <div className="absolute bottom-4 left-5 flex items-center gap-2 text-sm font-semibold text-white"><Wrench className="h-4 w-4 text-brand-accent-on-dark" /> Engineering support, made accessible</div>
              </div>
              <div className="space-y-6 p-6 sm:p-8">
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-accent-hover block mb-1">
                    Direct Engineering Desk
                  </span>
                  <h2 className="text-xl font-bold font-heading">
                    Company Contact Information
                  </h2>
                </div>

                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-accent-bright shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-brand-primary">Office Address</strong>
                      <span className="text-slate-600">
                        {siteSettings.address.formatted}
                      </span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-brand-accent-bright shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-brand-primary">Public Email Enquiries</strong>
                      <a
                        href={`mailto:${siteSettings.publicEmail}`}
                        className="text-slate-600 hover:text-brand-accent-hover transition-colors font-medium"
                      >
                        {siteSettings.publicEmail}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-brand-accent-bright shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-brand-primary">Direct Phone Lines</strong>
                      <div className="space-y-1.5 mt-1 font-medium">
                        {siteSettings.phones.map((p) => (
                          <a
                            key={p.raw}
                            href={`tel:${p.raw}`}
                            className="block text-slate-600 hover:text-brand-accent-hover transition-colors"
                          >
                            {p.display}
                          </a>
                        ))}
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-brand-accent-bright shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-brand-primary">Operating Hours</strong>
                      <span className="text-slate-600">
                        {siteSettings.businessHours}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex items-center gap-3 border-t border-slate-100 bg-surface-subtle px-6 py-4 text-xs text-slate-600 sm:px-8">
                <Building2 className="h-4 w-4 shrink-0 text-brand-accent" /> Australian-owned and operated engineering support
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
