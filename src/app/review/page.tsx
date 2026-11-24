import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, Download, ExternalLink, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Asset Approval Package | AusinX Solutions",
  description: "Candidate images for review and client approval before integration into the main project.",
};

interface CandidateImage {
  id: string;
  filename: string;
  title: string;
  modality: string;
  badge: string;
  description: string;
  dimensions: string;
  jpgSize: string;
  webpSize: string;
  webpUrl: string;
  jpgUrl: string;
}

const candidates: CandidateImage[] = [
  {
    id: "01_mri",
    filename: "01_mri_diagnostic_suite",
    title: "High-Field MRI Diagnostic Imaging Suite",
    modality: "Diagnostic Imaging & Radiology",
    badge: "Diagnostic Imaging",
    description: "Modern high-field Magnetic Resonance Imaging (MRI) gantry and patient scanning suite, complementing AusinX CT and C-Arm imaging services.",
    dimensions: "1600 × 1459",
    jpgSize: "427 KB",
    webpSize: "94 KB",
    webpUrl: "/images/review/01_mri_diagnostic_suite.webp",
    jpgUrl: "/images/review/01_mri_diagnostic_suite.jpg",
  },
  {
    id: "02_calib",
    filename: "02_oscilloscope_calibration_station",
    title: "Biomedical Oscilloscope & Calibration Station",
    modality: "AS/NZS 3551 Compliance & Safety",
    badge: "Calibration Lab",
    description: "High-precision test bench with digital storage oscilloscopes and electronic signal verification instruments for electrical safety audits.",
    dimensions: "1600 × 1066",
    jpgSize: "5.8 MB",
    webpSize: "190 KB",
    webpUrl: "/images/review/02_oscilloscope_calibration_station.webp",
    jpgUrl: "/images/review/02_oscilloscope_calibration_station.jpg",
  },
  {
    id: "03_surgery",
    filename: "03_robotic_surgical_suite",
    title: "Robotic-Assisted Surgical & Operating Suite",
    modality: "Operating Theatre & Surgical Technology",
    badge: "Surgical Technology",
    description: "Multi-axis robotic surgical consoles with integrated high-definition clinical endoscopy monitors and surgical theatre lighting.",
    dimensions: "1600 × 1200",
    jpgSize: "1.6 MB",
    webpSize: "148 KB",
    webpUrl: "/images/review/03_robotic_surgical_suite.webp",
    jpgUrl: "/images/review/03_robotic_surgical_suite.jpg",
  },
  {
    id: "04_pcb",
    filename: "04_pcb_board_soldering_diagnostics",
    title: "Component-Level PCB Micro-Soldering & Diagnostics",
    modality: "Industrial & Medical Electronics Repair",
    badge: "Board-Level Repair",
    description: "SMD component rework, trace repair, and micro-soldering on medical equipment electronic controller boards.",
    dimensions: "1600 × 1067",
    jpgSize: "13.8 MB",
    webpSize: "81 KB",
    webpUrl: "/images/review/04_pcb_board_soldering_diagnostics.webp",
    jpgUrl: "/images/review/04_pcb_board_soldering_diagnostics.jpg",
  },
  {
    id: "05_dialysis",
    filename: "05_hemodialysis_clinical_system",
    title: "Clinical Hemodialysis & Life-Support Equipment",
    modality: "Renal & Critical Care Modality",
    badge: "Critical Care",
    description: "Specialized hemodialysis unit with digital touchscreen diagnostic interface, fluidic delivery systems, and safety alarms.",
    dimensions: "1122 × 1600",
    jpgSize: "1.1 MB",
    webpSize: "75 KB",
    webpUrl: "/images/review/05_hemodialysis_clinical_system.webp",
    jpgUrl: "/images/review/05_hemodialysis_clinical_system.jpg",
  },
  {
    id: "06_spares",
    filename: "06_cleanroom_precision_spares",
    title: "Precision Cleanroom & Spares Logistics Archive",
    modality: "OEM Parts Logistics & Storage",
    badge: "Spares Assurance",
    description: "Cleanroom facility with controlled environment warehousing for medical transducers, sensitive sensors, and OEM spare assemblies.",
    dimensions: "1130 × 1600",
    jpgSize: "3.7 MB",
    webpSize: "309 KB",
    webpUrl: "/images/review/06_cleanroom_precision_spares.webp",
    jpgUrl: "/images/review/06_cleanroom_precision_spares.jpg",
  },
];

export default function ReviewPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/5 text-brand-primary text-xs font-bold uppercase tracking-wider border border-brand-primary/10">
              <ShieldCheck className="w-4 h-4 text-brand-accent" />
              <span>Asset Review &amp; Approval</span>
            </div>
            <h1 className="text-3xl font-extrabold text-brand-primary tracking-tight font-heading">
              6 New Biomedical &amp; Engineering Image Candidates
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
              Stored in the dedicated extra review folder (<code>review_images/</code> and <code>public/images/review/</code>).
              Each image represents a distinct technical modality with zero repetitions, ready for your approval.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((img, idx) => (
            <div
              key={img.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col transition hover:shadow-md hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                <Image
                  src={img.webpUrl}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3 bg-brand-primary/90 text-brand-accent-on-dark text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm border border-brand-accent/20">
                  #{idx + 1} &bull; {img.badge}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-brand-accent-hover uppercase tracking-wider block">
                    {img.modality}
                  </span>
                  <h2 className="text-lg font-bold text-brand-primary font-heading leading-snug">
                    {img.title}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {img.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1 text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Dimensions:</span>
                      <span className="font-semibold text-slate-800">{img.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Optimized WebP:</span>
                      <span className="font-semibold text-emerald-700">{img.webpSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Original JPG:</span>
                      <span className="font-semibold text-slate-700">{img.jpgSize}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={img.webpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-brand-primary text-white hover:bg-brand-primary-dark transition"
                    >
                      <span>View WebP</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={img.jpgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                    >
                      <span>Full JPG</span>
                      <Download className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
