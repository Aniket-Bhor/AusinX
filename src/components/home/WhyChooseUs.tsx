import React from "react";
import Image from "next/image";
import {
  ShieldCheck,
  RefreshCw,
  Clock,
  MessageSquareCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { getAboutCopy, getSiteImages } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";

const icons = [ShieldCheck, RefreshCw, Clock, MessageSquareCheck];

export default async function WhyChooseUs() {
  const [aboutCopy, siteImages] = await Promise.all([
    getAboutCopy(),
    getSiteImages(),
  ]);
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* Left Column: Heading, Value Proposition & Real Visual Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#059669] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trust &amp; Engineering Accountability</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.12] font-heading">
              Why Australian Clinics Trust AusinX
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Downtime in clinical and radiation oncology environments has direct consequences for patient scheduling and treatment efficacy. We eliminate risk with proactive engineering.
            </p>

            {/* Embedded Visual Feature Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg group">
              <div className="relative h-44 w-full">
                <Image
                  src={siteImages.whyChooseUsImage}
                  alt="Senior AusinX biomedical service engineer conducting clinical equipment inspection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#34D399]">
                    <CheckCircle2 className="w-4 h-4" /> Direct Senior Engineer Accountability
                  </div>
                  <p className="text-xs text-slate-200 mt-0.5">
                    No offshore call centres. Immediate direct access to specialist field engineers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Interactive Glowing Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {aboutCopy.whyChooseUs.map((point, index) => {
              const Icon = icons[index] || ShieldCheck;
              return (
                <Reveal key={point.title} delay={index * 90} direction="scale">
                  <div
                    className="group relative h-full p-6 rounded-3xl bg-slate-50/80 border border-slate-200/90 hover:border-emerald-300 hover:bg-white hover:shadow-[0_16px_40px_rgba(7,153,154,0.14)] hover:-translate-y-1.5 transition-all duration-300 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-[#34D399] group-hover:bg-[#059669] group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center font-bold shadow-md">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-[#059669] transition-colors">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0F172A] font-heading group-hover:text-[#059669] transition-colors">
                      {point.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {point.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
