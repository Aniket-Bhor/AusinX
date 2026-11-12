import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, HeartPulse, Settings2, ShieldCheck as ComplianceIcon, MapPinned } from "lucide-react";
import { getAboutCopy, getLifecycleSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us | Australian Biomedical Engineering Solutions",
  description:
    "Learn about AusinX Solutions Pty Ltd, proudly Australian-owned and operated, providing full lifecycle engineering solutions for medical equipment, healthcare products, and industrial electronics.",
  openGraph: {
    title: "About Us | AusinX Solutions Pty Ltd",
    description:
      "Proudly Australian-owned and operated engineering company supporting healthcare organisations across the entire equipment lifecycle.",
    url: "https://www.ausinx.com.au/about",
  },
};

export default async function AboutPage() {
  const [aboutCopy, lifecycleSteps] = await Promise.all([
    getAboutCopy(),
    getLifecycleSteps(),
  ]);
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#F5FAF9] py-14 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-36 h-96 w-96 rounded-full bg-[#E7F5F3] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:px-8">
        {/* Hero Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2942]/5 text-[#0B2942] text-xs font-bold uppercase tracking-wider mb-4 border border-[#0B2942]/10">
            <ShieldCheck className="w-4 h-4 text-[#07999A]" />
            <span>About AusinX Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2942] tracking-tight leading-tight font-heading">
            Proudly Australian-Owned Biomedical & Industrial Engineering
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600 leading-relaxed">
            Supporting healthcare organisations across the entire equipment lifecycle, from the first planning conversation through to safe, compliant disposal.
          </p>
        </div>
        <div className="relative">
          <div className="relative aspect-[1.25/1] overflow-hidden rounded-[2rem] border border-white shadow-[0_24px_75px_rgba(11,41,66,.14)]">
            <Image src="/images/client/engineering-workshop.jpeg" alt="Biomedical engineering workshop and equipment" fill className="object-cover transition-transform duration-700 hover:scale-[1.03]" sizes="(max-width: 1024px) 100vw, 45vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2942]/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-lg sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#087F86]">Across the equipment lifecycle</p>
              <p className="mt-1 text-sm font-semibold text-[#0B2942]">Practical engineering support for healthcare and industry.</p>
            </div>
          </div>
        </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Australian owned", Icon: MapPinned },
            { label: "Biomedical expertise", Icon: HeartPulse },
            { label: "Equipment lifecycle", Icon: Settings2 },
            { label: "Safety and compliance", Icon: ComplianceIcon },
          ].map(({ label, Icon }) => <div key={label} className="flex min-h-24 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"><Icon className="h-5 w-5 shrink-0 text-[#07999A]" /><span className="text-sm font-semibold leading-snug text-[#0B2942]">{label}</span></div>)}
        </div>

        {/* Section 7.1 Story Grid */}
        <div className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {aboutCopy.intro.map((paragraph, index) => <article key={paragraph} className={`rounded-2xl border p-6 sm:p-7 ${index === 0 ? "border-[#BCE1DE] bg-[#F4FAF9]" : "border-slate-200 bg-white"}`}><span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#E7F5F3] text-xs font-bold text-[#087F86]">0{index + 1}</span><p className="text-sm leading-7 text-slate-700">{paragraph}</p></article>)}
        </div>

        {/* Equipment Lifecycle Approach */}
        <div className="mb-16 rounded-3xl bg-[#F8FBFB] p-6 sm:mb-16 sm:p-10">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200 inline-block mb-3">
              Lifecycle Integration
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2942] font-heading">
              Our End-to-End Equipment Lifecycle Approach
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              We manage the technical detail across every stage so clinical staff can stay focused on patient care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {lifecycleSteps.map((step) => (
              <div
                key={step.step}
                className="hover-lift p-5 rounded-2xl bg-white border border-slate-200 space-y-2 transition-colors"
              >
                <span className="text-xs font-mono font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
                  Phase {step.step}
                </span>
                <h3 className="text-base font-bold text-[#0B2942] font-heading pt-1">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Healthcare Teams Choose AusinX */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F1F5F9] border border-slate-200 mb-16">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2942] font-heading">
              Why Healthcare Teams Choose AusinX
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Our engineering approach prioritises clinical availability, accuracy, and dependable service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {aboutCopy.whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="hover-lift p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2 transition-all"
              >
                <h3 className="text-base font-bold text-[#0B2942] flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#07999A] shrink-0" />
                  <span>{item.title}</span>
                </h3>
                <p className="text-sm text-slate-600 pl-7 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

