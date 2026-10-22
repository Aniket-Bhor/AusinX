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
} from "lucide-react";
import { servicesData } from "@/lib/content";

const iconMap = {
  "service-maintenance": Wrench,
  "installation-commissioning": Cpu,
  "parts-logistics": Package,
  calibration: Gauge,
};

export default function CorePillarsGrid() {
  return (
    <section className="py-20 bg-[#F1F5F9] border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1A2A3A] bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm inline-block">
            Our Core Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2A3A] tracking-tight font-heading">
            Specialised Biomedical & Industrial Capabilities
          </h2>
          <p className="text-base text-slate-600">
            Dedicated engineering services built for hospitals, clinical departments, imaging centres, and industrial facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service) => {
            const Icon = iconMap[service.slug as keyof typeof iconMap] || Wrench;

            return (
              <div
                key={service.slug}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Service Image with subtle overlay */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="w-10 h-10 rounded-xl bg-[#1A2A3A] text-[#F8B800] flex items-center justify-center shadow-md">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-4">
                      <span className="text-[10px] text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                        TODO(client-review): Placeholder Photo
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#1A2A3A] group-hover:text-blue-900 transition-colors font-heading">
                        {service.navTitle}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.shortSummary}
                    </p>

                    {/* Sub-services pills / bullets */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Key Capabilities:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.subServices.map((sub) => (
                          <div
                            key={sub.title}
                            className="flex items-start gap-2 text-xs text-[#0F172A] font-medium bg-slate-50 p-2 rounded-lg border border-slate-100"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F8B800] shrink-0 mt-0.5" />
                            <span>{sub.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 sm:px-8 pb-6 pt-2">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-slate-50 hover:bg-[#1A2A3A] text-[#1A2A3A] hover:text-white font-bold text-sm transition-all group/btn border border-slate-200"
                  >
                    <span>Explore {service.navTitle}</span>
                    <ArrowRight className="w-4 h-4 text-[#F8B800] group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1A2A3A] text-white hover:bg-[#121E2A] font-bold text-sm shadow-md transition-colors"
          >
            <span>View Complete Services Overview</span>
            <ArrowRight className="w-4 h-4 text-[#F8B800]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
