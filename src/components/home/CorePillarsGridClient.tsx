"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Wrench,
  Cpu,
  Package,
  Gauge,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import type { ServiceDetail } from "@/lib/content";

const iconMap = {
  "service-maintenance": Wrench,
  "installation-commissioning": Cpu,
  "parts-logistics": Package,
  calibration: Gauge,
};

const badgeMap = {
  "service-maintenance": "24/7 Breakdown & PM",
  "installation-commissioning": "Linac & CT Specialists",
  "parts-logistics": "Rapid Australia-wide Spares",
  calibration: "NATA & ISO Aligned QA",
};

export default function CorePillarsGridClient({
  servicesData,
}: {
  servicesData: ServiceDetail[];
}) {
  return (
    <section className="py-20 sm:py-28 bg-[#F6FAFA] relative overflow-hidden">
      {/* Glow accent */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[30rem] bg-emerald-500/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#059669] bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200 inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Service Pillars</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight font-heading">
            Mission-Critical Engineering Services
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Engineered for Australian hospitals, clinical departments, private practices, and industrial laboratories.
          </p>
        </div>

        {/* 4 Pillars Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {servicesData.map((service) => {
            const Icon = iconMap[service.slug as keyof typeof iconMap] || Wrench;
            const badge = badgeMap[service.slug as keyof typeof badgeMap] || "OEM Supported";

            return (
              <div
                key={service.slug}
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-[0_10px_35px_rgba(15,41,57,0.06)] hover:shadow-[0_22px_55px_rgba(7,153,154,0.18)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Visual Card Image with gradient & floating tag */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-[#0F172A]/25 to-transparent" />
                    
                    {/* Floating Service Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#0F172A] text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-md">
                        <Icon className="w-3.5 h-3.5 text-[#059669]" />
                        <span>{badge}</span>
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-6 right-6 text-white">
                      <h3 className="text-2xl font-bold font-heading group-hover:text-[#34D399] transition-colors">
                        {service.navTitle}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-8 space-y-5">
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {service.shortSummary}
                    </p>

                    {/* Capabilities Highlights */}
                    <div className="space-y-2.5 pt-3 border-t border-slate-100">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Key Capabilities:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.subServices.map((sub) => (
                          <div
                            key={sub.title}
                            className="flex items-start gap-2 text-xs text-[#0F172A] font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                            <span className="font-semibold">{sub.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions: 'Talk to our team' & 'Full Specs' */}
                <div className="px-6 sm:px-8 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between gap-4">
                  <Link
                    href={`/contact?service=${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] hover:text-[#0F172A] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Talk to our team</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-slate-100 group-hover:bg-[#0F172A] group-hover:text-white transition-all"
                  >
                    <span>Full Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
