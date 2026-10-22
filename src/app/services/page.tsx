import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Wrench,
  Cpu,
  Package,
  Gauge,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Mail,
} from "lucide-react";
import { servicesData, lifecycleSteps, siteSettings } from "@/lib/content";

export const metadata: Metadata = {

  title: "Services & Capabilities | Biomedical Engineering",
  description:
    "Explore AusinX's four engineering pillars: Service & Maintenance, Installation & Commissioning (Radiotherapy & CT/MRI), Parts & Logistics, and Precision Calibration.",
  openGraph: {
    title: "Services & Capabilities | AusinX Solutions Pty Ltd",
    description:
      "Full lifecycle engineering solutions for medical equipment, healthcare products and industrial electronics across Australia.",
    url: "https://www.ausinx.com.au/services",
  },
};

const iconMap = {
  "service-maintenance": Wrench,
  "installation-commissioning": Cpu,
  "parts-logistics": Package,
  calibration: Gauge,
};

export default function ServicesPage() {
  return (
    <div className="bg-[#F1F5F9] min-h-screen">
      {/* Services Header Banner */}
      <section className="bg-[#1A2A3A] text-white py-16 sm:py-24 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/15">
              <ShieldCheck className="w-4 h-4 text-[#F8B800]" />
              <span>Australian Healthcare & Industrial Engineering</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
              Our Core Pillars & Engineering Capabilities
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              AusinX provides a full range of services for medical equipment, healthcare products and industrial products across the entire equipment lifecycle: planning, decommissioning, disposal, installation and commissioning, plus parts supply, service and calibration.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Pillars Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {servicesData.map((service, index) => {
              const Icon = iconMap[service.slug as keyof typeof iconMap] || Wrench;
              const isEven = index % 2 === 1;

              return (
                <div
                  key={service.slug}
                  id={service.slug}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-shadow duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
                >
                  {/* Service Visual */}
                  <div
                    className={`lg:col-span-5 relative min-h-[320px] lg:min-h-[420px] w-full bg-slate-100 ${
                      isEven ? "lg:order-last" : ""
                    }`}
                  >

                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 rounded-xl bg-[#1A2A3A] text-[#F8B800] flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-4">
                      <span className="text-[10px] text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                        TODO(client-review): Placeholder Photo
                      </span>
                    </div>
                  </div>

                  {/* Service Information */}
                  <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                          Pillar 0{index + 1}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2A3A] font-heading">
                        {service.title}
                      </h2>

                      <p className="text-base text-slate-700 leading-relaxed">
                        {service.fullDescription}
                      </p>

                      {/* Sub-services breakdown */}
                      <div className="pt-2 space-y-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Sub-Service Scope & Details:
                        </p>
                        <div className="space-y-2.5">
                          {service.subServices.map((sub) => (
                            <div
                              key={sub.title}
                              className="p-3.5 rounded-xl bg-[#F1F5F9] border border-slate-200/80 space-y-1"
                            >
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#F8B800] shrink-0" />
                                <strong className="text-sm text-[#0F172A] font-semibold">
                                  {sub.title}
                                </strong>
                              </div>
                              <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                                {sub.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#1A2A3A] text-white font-bold text-sm hover:bg-[#121E2A] transition-colors shadow-sm"
                      >
                        <span>Detailed Specifications</span>
                        <ArrowRight className="w-4 h-4 text-[#F8B800]" />
                      </Link>

                      <Link
                        href={`/contact?service=${service.slug}`}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#F8B800] text-[#1A2A3A] font-bold text-sm hover:bg-[#E0A400] transition-colors shadow-sm"
                      >
                        <span>Make an Enquiry</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Equipment Lifecycle Strip Overview */}
      <section className="py-16 bg-[#1A2A3A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/15 inline-block mb-3">
              Full Lifecycle Support
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Lifecycle Integration for Healthcare Facilities
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              From the first planning conversation through to safe, compliant disposal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {lifecycleSteps.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-[#24384D] border border-slate-700/80 space-y-2"
              >
                <span className="text-xs font-mono font-bold text-amber-400">
                  Step {step.step}
                </span>
                <h3 className="text-base font-bold text-white font-heading">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Contact CTA Band */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2A3A] font-heading">
            Need Dedicated Technical Service or Equipment Assessment?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Contact our engineering specialists directly to discuss preventive service agreements, rapid repairs, or turnkey installation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#F8B800] text-[#1A2A3A] font-bold text-sm hover:bg-[#E0A400] transition-colors shadow-md"
            >
              <span>Submit Service Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:0421081256"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-slate-300 text-slate-800 font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span>Call 0421 081 256</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
