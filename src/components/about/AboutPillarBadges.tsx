"use client";

import React from "react";

/**
 * Three Completely Distinct Logo Concepts for AusinX About Pillars:
 *
 * 1. National Coverage (Geographic Silhouette):
 *    - Australia Continent Vector Map with Nationwide Telemetry Network
 *    - Radiating satellite/telecom broadcast arcs above
 *    - Regional dispatch nodes (Sydney, Melbourne, Brisbane, Perth, Darwin) + Tasmania
 *    - Dynamic wave ripple and beacon elevation on hover
 *
 * 2. Equipment Lifecycle (Circular Mechanism - User Approved):
 *    - 3-Stage Aerodynamic Orbital Track (+180° rotation on hover)
 *    - Counter-Rotating 8-tooth Biomedical Engineering Gear (-90° rotation on hover)
 *
 * 3. Safety and Compliance (Instrument / Meter Silhouette):
 *    - Precision Biomedical Calibration Meter Gauge (AS/NZS 3551 Standard Auditing)
 *    - Calibrated measurement scale with "Compliant / Pass" target zone
 *    - Dynamic Sweeping Instrument Needle that sweeps into the 100% PASS zone on hover
 *    - Verified Certification Check Badge with illuminated aura
 */

export function NationalCoverageLogo() {
  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-accent-light via-white to-brand-accent-light/50 border border-brand-accent/25 shadow-sm group-hover:border-brand-accent group-hover:shadow-[0_6px_20px_rgba(var(--brand-accent-rgb,5,150,105),0.28)] transition-all duration-500 overflow-hidden">
      {/* Ambient Pulsing Glow */}
      <div className="absolute inset-0 bg-brand-accent/15 rounded-xl opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none" />

      {/* Expanding Radar Ripple on Hover */}
      <span className="absolute h-9 w-9 rounded-full border border-brand-accent/40 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 ease-out pointer-events-none" />

      <svg
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 h-10 w-10 transition-transform duration-500 group-hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ausMapGrad" x1="12" y1="18" x2="44" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--brand-accent)" />
            <stop offset="100%" stopColor="var(--brand-primary)" />
          </linearGradient>
          <radialGradient id="beaconPulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--brand-accent-bright)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Transmitting Broadcast Waves (Radiating from the national network upwards) */}
        <g className="transition-transform duration-500 ease-out group-hover:-translate-y-1" style={{ transformOrigin: "28px 14px" }}>
          <path
            d="M 18 13 A 14 14 0 0 1 38 13"
            stroke="var(--brand-accent)"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="opacity-40 transition-all duration-500 group-hover:opacity-100 group-hover:stroke-brand-accent-bright"
          />
          <path
            d="M 22 16 A 9 9 0 0 1 34 16"
            stroke="var(--brand-accent)"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="opacity-75 transition-all duration-300 group-hover:opacity-100 group-hover:stroke-brand-accent"
          />
        </g>

        {/* 2. Stylized Australia Continent Vector Silhouette */}
        <g
          className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-0.5"
          style={{ transformOrigin: "28px 29px" }}
        >
          {/* Mainland Australia */}
          <path
            d="M 21 20 
               L 24 19 
               L 26 21 
               L 27 23 
               L 31 23 
               L 33 17 
               L 35 20 
               L 36 24 
               L 41 27 
               L 40 31 
               L 37 34 
               L 33 36 
               L 29 36 
               C 26 36 24 33 22 34 
               L 18 35 
               L 15 34 
               L 14 30 
               L 12 26 
               L 14 22 
               L 18 20 Z"
            fill="url(#ausMapGrad)"
            stroke="var(--brand-accent)"
            strokeWidth="1.2"
            strokeLinejoin="round"
            className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.16)] transition-all duration-300 group-hover:stroke-brand-accent-bright"
          />

          {/* Tasmania Island */}
          <path
            d="M 33 39 L 36 39 L 35 42 L 33 42 Z"
            fill="var(--brand-primary)"
            stroke="var(--brand-accent)"
            strokeWidth="0.8"
            className="transition-colors duration-300 group-hover:fill-brand-accent"
          />

          {/* Regional Network Grid Lines (Melbourne HQ to Perth, Darwin, Brisbane) */}
          <line x1="33" y1="33" x2="16" y2="30" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="1.5 1.5" />
          <line x1="33" y1="33" x2="25" y2="21" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="1.5 1.5" />
          <line x1="33" y1="33" x2="38" y2="27" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="1.5 1.5" />

          {/* Regional City Satellite Nodes */}
          <circle cx="16" cy="30" r="1.3" fill="#FFFFFF" /> {/* Perth */}
          <circle cx="25" cy="21" r="1.3" fill="#FFFFFF" /> {/* Darwin */}
          <circle cx="38" cy="27" r="1.3" fill="#FFFFFF" /> {/* Brisbane */}

          {/* Central Headquarters Dispatch Beacon (Melbourne / Sydney Hub) */}
          <circle cx="33" cy="33" r="3" fill="#FFFFFF" />
          <circle cx="33" cy="33" r="1.8" fill="var(--brand-accent)" className="animate-pulse" />
        </g>
      </svg>
    </div>
  );
}

export function EquipmentLifecycleLogo() {
  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-accent-light via-white to-brand-accent-light/50 border border-brand-accent/25 shadow-sm group-hover:border-brand-accent group-hover:shadow-[0_4px_16px_rgba(var(--brand-accent-rgb,5,150,105),0.25)] transition-all duration-500 overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-brand-accent/10 rounded-xl opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 animate-pulse pointer-events-none" />

      <svg
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 h-9 w-9 transition-transform duration-500 group-hover:scale-110"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lifecycleGrad1" x1="12" y1="12" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--brand-accent)" />
            <stop offset="100%" stopColor="var(--brand-primary)" />
          </linearGradient>
        </defs>

        {/* Rotating 3-Arrow Lifecycle Orbital Track */}
        <g
          className="transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-180"
          style={{ transformOrigin: "28px 28px" }}
        >
          {/* Segment 1: Planning to Commissioning */}
          <path
            d="M 28 8 A 20 20 0 0 1 45.3 18"
            stroke="var(--brand-accent)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <polygon
            points="44,14 47,19 41.5,19"
            fill="var(--brand-accent)"
          />

          {/* Segment 2: Maintenance to Calibration */}
          <path
            d="M 47.5 28 A 20 20 0 0 1 33.2 47.4"
            stroke="url(#lifecycleGrad1)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <polygon
            points="31.5,43 31.8,48.5 36.8,46"
            fill="var(--brand-primary)"
          />

          {/* Segment 3: Decommissioning to Renewal */}
          <path
            d="M 23 47 A 20 20 0 0 1 8.7 23.3"
            stroke="var(--brand-primary)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />
          <polygon
            points="7,25 9.5,20 12.5,24.5"
            fill="var(--brand-primary)"
          />
        </g>

        {/* Counter-Rotating Biomedical Engineering Gear Core */}
        <g
          className="transition-transform duration-700 ease-out group-hover:-rotate-90"
          style={{ transformOrigin: "28px 28px" }}
        >
          {/* Gear Body */}
          <circle cx="28" cy="28" r="9" fill="var(--brand-accent-light)" stroke="var(--brand-accent)" strokeWidth="1.5" />

          {/* Gear Teeth (8 Points) */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <rect
              key={angle}
              x="26.75"
              y="16.5"
              width="2.5"
              height="3.2"
              rx="0.75"
              fill="var(--brand-accent)"
              transform={`rotate(${angle} 28 28)`}
            />
          ))}

          {/* Inner Axle Hub */}
          <circle cx="28" cy="28" r="4.5" fill="#FFFFFF" stroke="var(--brand-primary)" strokeWidth="1.5" />
          <circle cx="28" cy="28" r="2" fill="var(--brand-accent)" className="transition-all duration-300 group-hover:scale-125" style={{ transformOrigin: "28px 28px" }} />
        </g>
      </svg>
    </div>
  );
}

export function SafetyComplianceLogo() {
  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-accent-light via-white to-brand-accent-light/50 border border-brand-accent/25 shadow-sm group-hover:border-brand-accent group-hover:shadow-[0_6px_20px_rgba(var(--brand-accent-rgb,5,150,105),0.28)] transition-all duration-500 overflow-hidden">
      {/* Ambient Pulsing Aura */}
      <div className="absolute inset-0 bg-brand-accent/15 rounded-xl opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none" />

      {/* Expanding Ring on Hover */}
      <span className="absolute h-9 w-9 rounded-full border border-brand-accent/40 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 ease-out pointer-events-none" />

      <svg
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 h-10 w-10 transition-transform duration-500 group-hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gaugeHousingGrad" x1="10" y1="12" x2="46" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="var(--brand-accent-light)" />
          </linearGradient>
          <linearGradient id="dialScaleGrad" x1="14" y1="26" x2="42" y2="26" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity="0.4" />
            <stop offset="65%" stopColor="var(--brand-primary)" stopOpacity="0.6" />
            <stop offset="70%" stopColor="var(--brand-accent)" />
            <stop offset="100%" stopColor="var(--brand-accent-bright)" />
          </linearGradient>
        </defs>

        {/* 1. Precision Instrument Meter Outer Bezel & Housing (Instrument silhouette) */}
        <path
          d="M 12 37 
             A 19 19 0 1 1 44 37 
             L 45 42 
             L 11 42 Z"
          fill="url(#gaugeHousingGrad)"
          stroke="var(--brand-primary)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          className="filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.12)] transition-colors duration-300 group-hover:stroke-brand-accent"
        />

        {/* 2. Calibrated Measurement Scale Arc (Neutral testing zone to vibrant Green/Accent PASS zone) */}
        <path
          d="M 16 34 A 14 14 0 1 1 40 34"
          stroke="url(#dialScaleGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Audit Calibration Measurement Ticks */}
        <line x1="16" y1="34" x2="19" y2="33" stroke="var(--brand-primary)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="21" y1="23" x2="23" y2="25" stroke="var(--brand-primary)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="28" y1="18" x2="28" y2="21" stroke="var(--brand-primary)" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="35" y1="23" x2="33" y2="25" stroke="var(--brand-accent)" strokeWidth="1.4" strokeLinecap="round" />
        {/* 100% Target Tick (AS/NZS Compliance Pass) */}
        <line x1="40" y1="34" x2="37" y2="33" stroke="var(--brand-accent-bright)" strokeWidth="1.8" strokeLinecap="round" />

        {/* 3. "PASSED / 100%" Compliance Seal Badge in the upper-right zone */}
        <g className="transition-all duration-300 group-hover:scale-110" style={{ transformOrigin: "39px 19px" }}>
          <circle cx="39" cy="19" r="5" fill="var(--brand-accent)" className="filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)]" />
          {/* Verified Checkmark inside badge */}
          <path
            d="M 37 19 L 38.5 20.5 L 41.5 17.5"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* 4. Dynamic Calibrated Sweeping Needle (Sweeps from testing ~35° into 100% compliant pass zone) */}
        <g
          className="transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[58deg]"
          style={{ transformOrigin: "28px 36px" }}
        >
          {/* Tapered Gauge Needle Indicator */}
          <polygon
            points="27.2,36 27.6,18 28.4,18 28.8,36"
            fill="var(--brand-accent-hover)"
            className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
          />
          {/* High-visibility needle tip */}
          <circle cx="28" cy="18" r="1.2" fill="var(--brand-accent)" />
        </g>

        {/* 5. Center Hub / Pivot Screw */}
        <circle cx="28" cy="36" r="4.2" fill="#FFFFFF" stroke="var(--brand-primary)" strokeWidth="1.5" />
        <circle cx="28" cy="36" r="2" fill="var(--brand-accent)" className="transition-all duration-300 group-hover:scale-125" style={{ transformOrigin: "28px 36px" }} />
      </svg>
    </div>
  );
}

/**
 * AboutPillarBadges Component:
 * Renders the 3 interactive cards using the animated vector logos instead of raster images.
 */
export default function AboutPillarBadges() {
  const pillars = [
    {
      id: "national-coverage",
      label: "National coverage",
      subtitle: "Coast-to-coast clinical logistics & rapid engineer response",
      LogoComponent: NationalCoverageLogo,
    },
    {
      id: "equipment-lifecycle",
      label: "Equipment lifecycle",
      subtitle: "Turnkey support from site planning to certified disposal",
      LogoComponent: EquipmentLifecycleLogo,
    },
    {
      id: "safety-compliance",
      label: "Safety and compliance",
      subtitle: "AS/NZS 3551 standard verification & full audit documentation",
      LogoComponent: SafetyComplianceLogo,
    },
  ];

  return (
    <div className="mb-14 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      {pillars.map(({ id, label, subtitle, LogoComponent }) => (
        <div
          key={id}
          className="group relative flex min-h-24 items-center gap-4.5 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-brand-accent/40 cursor-default overflow-hidden"
        >
          {/* Subtle dynamic background tint on card hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-accent-light/0 via-brand-accent-light/10 to-brand-accent-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Animated Logo Container */}
          <LogoComponent />

          {/* Pillar Typography */}
          <div className="relative z-10 flex flex-col justify-center">
            <span className="text-base font-bold leading-snug text-brand-primary group-hover:text-brand-accent-hover transition-colors duration-300">
              {label}
            </span>
            <span className="mt-0.5 text-xs text-slate-500 leading-normal line-clamp-1 group-hover:text-slate-600 transition-colors">
              {subtitle}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
