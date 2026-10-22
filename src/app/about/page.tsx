import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity } from "lucide-react";
import { aboutCopy } from "@/lib/content";

export const metadata = {
  title: "About Us | Australian Biomedical Engineering Solutions",
  description: "Learn about AusinX Solutions Pty Ltd, proudly Australian-owned and operated, providing full lifecycle engineering solutions for medical equipment.",
};

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A2A3A]/5 text-[#1A2A3A] text-xs font-bold uppercase tracking-wider mb-4 border border-[#1A2A3A]/10">
            <ShieldCheck className="w-4 h-4 text-[#F8B800]" />
            <span>About AusinX Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A2A3A] tracking-tight leading-tight font-heading">
            Proudly Australian-Owned Biomedical & Industrial Engineering
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Supporting healthcare organisations across the entire equipment lifecycle, from the first planning conversation through to safe, compliant disposal.
          </p>
        </div>

        {/* Section 7.1 Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6 text-base text-slate-700 leading-relaxed">
            <div className="p-6 rounded-2xl bg-[#F1F5F9] border border-slate-200">
              <p className="font-semibold text-[#0F172A]">
                {aboutCopy.intro[0]}
              </p>
            </div>
            <p>
              {aboutCopy.intro[1]}
            </p>
            <p>
              {aboutCopy.intro[2]}
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-[4/3] relative bg-slate-100">
              <Image
                src="/images/placeholders/hero-equipment.jpg"
                alt="TODO(client-review): AusinX healthcare technology support"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A3A]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-sm text-[#1A2A3A] shadow-md border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1A2A3A]">
                  Specialised Scope
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  Radiotherapy equipment & diagnostic systems (CT/MRI)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Healthcare Teams Choose AusinX */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F1F5F9] border border-slate-200 mb-16">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2A3A] font-heading">
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
                className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2"
              >
                <h3 className="text-base font-bold text-[#1A2A3A] flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#F8B800] shrink-0" />
                  <span>{item.title}</span>
                </h3>
                <p className="text-sm text-slate-600 pl-7 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl bg-[#1A2A3A] text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold font-heading">
              Ready to Discuss Your Equipment Requirements?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak with our engineers about service agreements, commissioning, or parts supply.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#F8B800] text-[#1A2A3A] font-bold text-sm hover:bg-[#E0A400] transition-colors shrink-0"
          >
            <span>Contact Us Today</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
