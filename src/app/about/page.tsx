import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  CheckCircle2,
  ShieldCheck,
  HeartPulse,
  Settings2,
  ShieldCheck as ComplianceIcon,
  MapPinned,
  FileCheck2,
  Users2,
  Cpu,
  PackageCheck,
  Sparkles,
} from "lucide-react";
import { getSiteImages } from "@/lib/content";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const engineeringStandards = [
  {
    title: "AS/NZS 3551 Compliance & Safety",
    description:
      "All medical electrical equipment is tested, serviced, and verified in strict accordance with Australian regulatory frameworks, complete with full audit documentation.",
    badge: "Safety Standard",
    Icon: FileCheck2,
  },
  {
    title: "Direct Senior Engineering Access",
    description:
      "Direct technical consultation without offshore call center delays. Facilities speak immediately with qualified biomedical and industrial systems specialists.",
    badge: "Fast Response",
    Icon: Users2,
  },
  {
    title: "Multi-Modality Technical Depth",
    description:
      "Specialized cross-disciplinary expertise spanning diagnostic imaging (CT, C-Arms, X-Ray), patient monitoring, clinical ultrasound, and industrial automation.",
    badge: "Technical Depth",
    Icon: Cpu,
  },
  {
    title: "Strategic Spares & Supply Assurance",
    description:
      "Dedicated local warehousing of OEM replacement boards, transducers, sensors, and consumables to minimize unplanned equipment downtime.",
    badge: "Supply Chain",
    Icon: PackageCheck,
  },
];

export const metadata: Metadata = {
  title: "About Us | Industrial & Biomedical Engineering Solutions",
  description:
    "Learn about AusinX Solutions Pty Ltd, providing specialist lifecycle engineering solutions, maintenance, and calibration for medical equipment and industrial electronics.",
  openGraph: {
    title: "About Us | AusinX Solutions Pty Ltd",
    description:
      "Specialist engineering partner supporting organisations across the entire equipment lifecycle.",
    url: "https://www.ausinx.com.au/about",
  },
};

export default async function AboutPage() {
  const siteImages = await getSiteImages();
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-slate-200 bg-surface-subtle py-14 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-36 h-96 w-96 rounded-full bg-brand-accent-light blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:px-8">
          {/* Hero Header */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/5 text-brand-primary text-xs font-bold uppercase tracking-wider mb-4 border border-brand-primary/10">
              <ShieldCheck className="w-4 h-4 text-brand-accent" />
              <span>About AusinX Solutions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-primary tracking-tight leading-tight font-heading">
              Specialist Industrial &amp; Biomedical Engineering Solutions
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600 leading-relaxed">
              Supporting organisations across the entire equipment lifecycle, from the first planning conversation through to commissioning, ongoing maintenance, and safe disposal.
            </p>
          </div>
          <div className="relative">
            <div className="relative aspect-[1.25/1] overflow-hidden rounded-[2rem] border border-white shadow-[0_24px_75px_rgba(11,41,66,.14)]">
              <Image src={siteImages.aboutImage} alt="Biomedical and industrial engineering workshop" fill className="object-cover transition-transform duration-700 hover:scale-[1.03] motion-image-enter" sizes="(max-width: 1024px) 100vw, 45vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-lg sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-accent-hover">Across the equipment lifecycle</p>
                <p className="mt-1 text-sm font-semibold text-brand-primary">Practical engineering support for healthcare and industry.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-14 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { label: "National coverage", Icon: MapPinned },
            { label: "Equipment lifecycle", Icon: Settings2 },
            { label: "Safety and compliance", Icon: ComplianceIcon },
          ].map(({ label, Icon }) => (
            <div
              key={label}
              className="group flex min-h-24 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-brand-accent/40 cursor-default"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-accent-light text-brand-accent transition-all duration-300 group-hover:bg-brand-accent group-hover:text-white group-hover:rotate-12 group-hover:scale-110 shadow-sm">
                <Icon className="h-6 w-6 transition-transform duration-300" />
              </div>
              <span className="text-base font-bold leading-snug text-brand-primary">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Dedicated Company Mission & Values (Unique to About Page) */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Our Mission: Zero Downtime",
              desc: "Delivering proactive engineering frameworks, precision calibrations, and rapid response models that keep essential healthcare technology and industrial systems operational without disruption.",
            },
            {
              step: "02",
              title: "Technical Transparency",
              desc: "Every diagnostic assessment, board-level repair, and safety sign-off is backed by comprehensive AS/NZS 3551 test documentation and direct communication with certified senior field engineers.",
            },
            {
              step: "03",
              title: "End-to-End Accountability",
              desc: "From initial pre-installation site surveys through to scheduled servicing, genuine parts replenishment, and compliant decommissioning, we provide complete lifecycle continuity.",
            },
          ].map(({ step, title, desc }, index) => (
            <article
              key={title}
              className={`rounded-2xl border p-6 sm:p-7 space-y-3 transition-all ${
                index === 0
                  ? "border-brand-accent/40 bg-brand-accent-light/50 shadow-sm"
                  : "border-slate-200 bg-white shadow-sm hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary text-xs font-mono font-bold text-brand-accent-on-dark">
                  {step}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Value Standard
                </span>
              </div>
              <h3 className="text-base font-bold text-brand-primary font-heading">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {desc}
              </p>
            </article>
          ))}
        </div>

        {/* Technical Standards & Modality Expertise (Unique to About Page) */}
        <div className="mb-16 rounded-3xl bg-surface-subtle p-6 sm:mb-16 sm:p-10 border border-slate-200/80">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-accent-hover bg-brand-accent-light px-2.5 py-1 rounded-md border border-brand-accent/20 inline-block mb-3">
              Engineering Scope
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-primary font-heading">
              Technical Standards &amp; Modality Capabilities
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Our engineering framework delivers dependable performance across mission-critical biomedical systems and specialized industrial machinery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Diagnostic Imaging & Medical Modalities",
                description:
                  "Turnkey mechanical anchoring, electrical verification, and OEM commissioning for CT suites, C-Arms, and specialized imaging rooms.",
              },
              {
                title: "Predictive Preventive Maintenance",
                description:
                  "Proactive telemetry, electronic waveform analysis, and scheduled component servicing to prevent equipment downtime before it occurs.",
              },
              {
                title: "AS/NZS 3551 Electrical Safety & QA",
                description:
                  "NATA-traceable calibration, electrical leakage audits, and documented compliance certificates for health authority audits.",
              },
              {
                title: "Industrial & Power Electronics",
                description:
                  "Fault diagnostics, board-level repairs, and component sourcing for complex industrial electronics and automated control equipment.",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="hover-lift p-6 rounded-2xl bg-white border border-slate-200 space-y-2.5 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-brand-primary font-heading">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Operational Standards (About Page Unique) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-bg-tint border border-slate-200 mb-16">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-accent-hover bg-brand-accent-light px-2.5 py-1 rounded-md border border-brand-accent/20 inline-block mb-3">
              Operational Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-primary font-heading">
              How AusinX Delivers Engineering Certainty
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Our engineering governance combines regulatory compliance, technical specialisation, and proactive supply logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {engineeringStandards.map((item) => {
              const Icon = item.Icon;
              return (
                <div
                  key={item.title}
                  className="hover-lift p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary text-brand-accent-on-dark flex items-center justify-center font-bold shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent-hover bg-brand-accent-light border border-brand-accent/20 px-2.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-brand-primary font-heading pt-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Why Businesses & Clinics Trust AusinX (Moved from Homepage) */}
      <WhyChooseUs />
    </div>
  );
}

