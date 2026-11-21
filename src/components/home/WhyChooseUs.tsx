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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent-light border border-brand-accent/20 text-brand-accent text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trust &amp; Engineering Accountability</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-primary tracking-tight leading-[1.12] font-heading">
              Why Businesses &amp; Clinics Trust AusinX
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Downtime in biomedical and industrial environments has direct consequences for operations and patient care. We eliminate risk with proactive engineering.
            </p>

            {/* Embedded Visual Feature Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg group">
              <div className="relative h-44 w-full">
                <Image
                  src={siteImages.whyChooseUsImage}
                  alt="Senior AusinX biomedical service engineer conducting clinical equipment inspection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 motion-image-enter"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-accent-on-dark">
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
                <Reveal key={point.title} delay={index * 80} direction="scale">
                  <div
                    className="group relative h-full p-6 rounded-3xl bg-slate-50/80 border border-slate-200/90 hover:border-brand-accent/40 hover:bg-white hover:glow-sm hover:-translate-y-1.5 hover:scale-[1.03] transition-all duration-300 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-brand-primary text-brand-accent-on-dark group-hover:bg-brand-accent group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center font-bold shadow-md">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-brand-accent transition-colors">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-brand-primary font-heading group-hover:text-brand-accent transition-colors">
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
