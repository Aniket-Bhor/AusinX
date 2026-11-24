"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { defaultSiteImages, type SiteImages } from "@/lib/site-images";

const getModalities = (siteImages: SiteImages) => [
  {
    title: "Computed Tomography (CT) Systems",
    slug: "service-maintenance",
    category: "Diagnostic Imaging",
    description:
      "Full-scope preventive maintenance, mechanical gantry overhauls, detector calibration, and imaging precision verification.",
    image: siteImages.bentoCt,
    imageAlt: "Modern CT Diagnostic Suite maintained by AusinX",
    pills: [
      { label: "OEM Calibrated", type: "neutral" },
      { label: "Emergency Breakdown", type: "accent" },
      { label: "Precision Imaging QA", type: "neutral" },
    ],
  },
  {
    title: "C-Arm & Mobile X-Ray",
    slug: "installation-commissioning",
    category: "Surgical & Fluoroscopy",
    description:
      "High-uptime operating theatre readiness, image intensifier calibration, and mechanical articulation testing.",
    image: siteImages.bentoCArm,
    imageAlt: "Mobile C-Arm surgical imaging system",
    pills: [
      { label: "Theatre Ready QA", type: "neutral" },
      { label: "Dose Calibration", type: "accent" },
      { label: "Interventional Suites", type: "neutral" },
    ],
  },
  {
    title: "Patient Monitors & Ventilators",
    slug: "calibration",
    category: "Telemetry & ICU",
    description:
      "Multiparameter telemetry systems, ICU ventilators, vital sign monitors, and clinical alert accuracy testing.",
    image: siteImages.bentoMonitor,
    imageAlt: "Patient monitoring and diagnostic telemetry",
    pills: [
      { label: "AS/NZS 3551 Safety", type: "neutral" },
      { label: "Sensor Calibration", type: "accent" },
      { label: "Critical Care Uptime", type: "neutral" },
    ],
  },
  {
    title: "Ultrasound Transducers & Consoles",
    slug: "parts-logistics",
    category: "Point of Care",
    description:
      "Transducer acoustic lens inspection, probe phantom validation, and diagnostic console electronic servicing.",
    image: siteImages.bentoUltrasound,
    imageAlt: "Clinical ultrasound care and transducer testing",
    pills: [
      { label: "Acoustic Testing", type: "neutral" },
      { label: "Phantom QA Validation", type: "accent" },
      { label: "Multi-Probe Support", type: "neutral" },
    ],
  },
];

export default function InteractiveBento({
  siteImages = defaultSiteImages,
}: {
  siteImages?: SiteImages;
}) {
  const modalities = getModalities(siteImages);
  return (
    <section className="py-20 sm:py-24 bg-surface-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-14 text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent-light border border-brand-accent/20 text-brand-accent text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Multi-Modality Engineering Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-primary tracking-tight font-heading">
            Built for High-Consequence Healthcare
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Specialist engineering capabilities across Australia&apos;s most demanding diagnostic, medical, and industrial environments.
          </p>
        </div>

        {/* Equalized 2x2 Grid (2 per row on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {modalities.map((item, index) => (
            <Reveal key={item.title} delay={index * 80} direction="scale">
              <Link
                href={`/services/${item.slug}`}
                className="group relative h-full overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(15,41,57,0.05)] hover:glow-md hover:border-brand-accent/40 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] flex flex-col justify-between block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
              >
                {/* Image Section */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    unoptimized
                    loading="lazy"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/30 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-brand-primary text-xs font-bold uppercase tracking-wider shadow-sm transition-transform duration-300 group-hover:scale-105 inline-block">
                      {item.category}
                    </span>
                  </div>

                  {/* Bottom Overlay Title & Description */}
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <h3 className="text-xl sm:text-2xl font-bold font-heading">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Capability Tags & Learn More Cue */}
                <div className="p-5 sm:p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    {item.pills.map((pill) => (
                      <span
                        key={pill.label}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-transform duration-200 group-hover:translate-y-[-1px] ${pill.type === "accent"
                            ? "bg-brand-accent-light text-brand-accent border border-brand-accent/20"
                            : "bg-slate-100 text-slate-700"
                          }`}
                      >
                        {pill.label}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-accent group-hover:text-brand-accent-hover transition-colors shrink-0">
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
