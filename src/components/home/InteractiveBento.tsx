"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const modalities = [
  {
    title: "Computed Tomography & Radiotherapy",
    category: "Diagnostic Imaging",
    description:
      "Full-scope preventive maintenance, mechanical gantry overhauls, detector calibration, and radiation safety verification.",
    image: "/images/client/ct-suite.jpeg",
    imageAlt: "Modern CT Diagnostic Suite maintained by AusinX",
    pills: [
      { label: "OEM Calibrated", type: "neutral" },
      { label: "Emergency Breakdown", type: "accent" },
      { label: "Shielding Verification", type: "neutral" },
    ],
  },
  {
    title: "C-Arm & Mobile X-Ray",
    category: "Surgical & Fluoroscopy",
    description:
      "High-uptime operating theatre readiness, image intensifier calibration, and mechanical articulation testing.",
    image: "/images/client/c-arm.jpeg",
    imageAlt: "Mobile C-Arm surgical imaging system",
    pills: [
      { label: "Theatre Ready QA", type: "neutral" },
      { label: "Dose Calibration", type: "accent" },
      { label: "Interventional Suites", type: "neutral" },
    ],
  },
  {
    title: "Patient Monitors & Ventilators",
    category: "Telemetry & ICU",
    description:
      "Multiparameter telemetry systems, ICU ventilators, vital sign monitors, and clinical alert accuracy testing.",
    image: "/images/client/patient-monitor.jpeg",
    imageAlt: "Patient monitoring and diagnostic telemetry",
    pills: [
      { label: "AS/NZS 3551 Safety", type: "neutral" },
      { label: "Sensor Calibration", type: "accent" },
      { label: "Critical Care Uptime", type: "neutral" },
    ],
  },
  {
    title: "Ultrasound Transducers & Consoles",
    category: "Point of Care",
    description:
      "Transducer acoustic lens inspection, probe phantom validation, and diagnostic console electronic servicing.",
    image: "/images/client/ultrasound-care.jpeg",
    imageAlt: "Clinical ultrasound care and transducer testing",
    pills: [
      { label: "Acoustic Testing", type: "neutral" },
      { label: "Phantom QA Validation", type: "accent" },
      { label: "Multi-Probe Support", type: "neutral" },
    ],
  },
];

export default function InteractiveBento() {
  return (
    <section className="py-20 sm:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-14 text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-[#07999A] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Multi-Modality Engineering Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2942] tracking-tight font-heading">
            Built for High-Consequence Healthcare
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Specialist engineering capabilities across Australia’s most demanding radiotherapy, diagnostic, and clinical environments.
          </p>
        </div>

        {/* Equalized 2x2 Grid (2 per row on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {modalities.map((item, index) => (
            <Reveal key={item.title} delay={index * 110} direction="scale">
              <div
                className="group relative h-full overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(15,41,57,0.05)] hover:shadow-[0_20px_45px_rgba(7,153,154,0.18)] hover:border-teal-300/80 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
              >
              {/* Image Section */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2942]/90 via-[#0B2942]/30 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0B2942] text-xs font-bold uppercase tracking-wider shadow-sm transition-transform duration-300 group-hover:scale-105 inline-block">
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

              {/* Bottom Capability Tags (Equal Padding & Height) */}
              <div className="p-5 sm:p-6 bg-white flex flex-wrap items-center gap-2 border-t border-slate-100">
                {item.pills.map((pill) => (
                  <span
                    key={pill.label}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-transform duration-200 group-hover:translate-y-[-1px] ${
                      pill.type === "accent"
                        ? "bg-teal-50 text-[#07999A] border border-teal-100"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {pill.label}
                  </span>
                ))}
              </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
