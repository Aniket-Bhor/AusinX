import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  CheckCircle2,
  Activity,
  Layers,
} from "lucide-react";
import { siteSettings } from "@/lib/content";

export default function Hero() {
  return (
    <section className="relative bg-[#1A2A3A] text-white overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Subtle Gradient & Circuit Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber-400 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Australian Owned Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-amber-300 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Proudly Australian Owned & Operated</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Biomedical & Industrial{" "}
              <span className="text-[#F8B800]">Equipment Solutions</span>
            </h1>

            {/* Tagline Option 2 (Marked TODO(client-review)) */}
            <div className="border-l-4 border-[#F8B800] pl-4 py-1">
              <p className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight font-heading">
                {siteSettings.tagline}
              </p>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400/80 block mt-0.5">
                TODO(client-review): Tagline Option 2 Active
              </span>
            </div>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              AusinX provides a full range of services for medical equipment, healthcare products and industrial products across the entire lifecycle: planning, installation, commissioning, maintenance, parts supply, and calibration.
            </p>

            {/* Clinical Highlights Pill Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Specialised in Radiotherapy Equipment</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Diagnostic Systems Expertise (CT / MRI)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Rapid Downtime Reduction for Hospitals</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>End-to-End Lifecycle Accountability</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#F8B800] text-[#1A2A3A] font-bold text-base hover:bg-[#E0A400] transition-all shadow-lg active:scale-98 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#1A2A3A]"
              >
                <span>Request Support / Contact Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold text-base border border-white/20 transition-all backdrop-blur-sm"
              >
                <span>Explore Our Services</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Equipment Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-900 group">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/placeholders/hero-equipment.webp"
                  alt="TODO(client-review): Radiotherapy medical linear accelerator and CT suite"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A3A] via-transparent to-transparent opacity-80" />
              </div>

              {/* Floating Clinical Card */}
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-[#1A2A3A]/90 backdrop-blur-md border border-white/15 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F8B800] text-[#1A2A3A] flex items-center justify-center shrink-0 font-bold">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-amber-300 font-bold">
                        Lifecycle Focus
                      </p>
                      <p className="text-sm font-semibold text-white">
                        Service · Installation · Parts · Calibration
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] bg-white/10 px-2.5 py-1 rounded-full text-slate-200 hidden sm:inline">
                    Melbourne, AU
                  </span>
                </div>
              </div>
            </div>

            {/* Image Placeholder review label */}
            <div className="mt-2 text-right">
              <span className="text-[10px] text-slate-400">
                TODO(client-review): Placeholder image (radiotherapy suite)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
