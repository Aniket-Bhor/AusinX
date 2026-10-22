"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);


  return (
    <footer className="bg-[#121E2A] text-slate-300 border-t border-slate-800">
      {/* Upper Footer: Contact and Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1 & 2: Brand & About */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 shadow-sm ring-1 ring-slate-700 flex items-center justify-center shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="AusinX Solutions"
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block font-heading">
                  AusinX Solutions Pty Ltd
                </span>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block">
                  Biomedical & Industrial Electronics
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              AusinX is a proudly Australian-owned and operated company providing a full range of services for medical equipment, healthcare products and industrial products across the entire lifecycle: planning, decommissioning, disposal, installation, commissioning, parts supply, and calibration.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Proudly Australian Owned & Operated</span>
            </div>

            {/* Hidden Social Links Placeholder (TODO: client to provide links) */}
            {/* 
            <div className="pt-2 flex items-center gap-3 text-slate-400" aria-hidden="true">
              TODO(client-review): Social media links hidden until provided by client
            </div>
            */}
          </div>

          {/* Column 3: Core Services */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Core Pillars
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/services/service-maintenance"
                  className="text-slate-300 hover:text-white hover:underline transition-colors"
                >
                  Service & Maintenance
                </Link>
              </li>
              <li>
                <Link
                  href="/services/installation-commissioning"
                  className="text-slate-300 hover:text-white hover:underline transition-colors"
                >
                  Installation & Commissioning
                </Link>
              </li>
              <li>
                <Link
                  href="/services/parts-logistics"
                  className="text-slate-300 hover:text-white hover:underline transition-colors"
                >
                  Parts & Logistics
                </Link>
              </li>
              <li>
                <Link
                  href="/services/calibration"
                  className="text-slate-300 hover:text-white hover:underline transition-colors"
                >
                  Precision Calibration
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  href="/services"
                  className="text-amber-400 hover:text-amber-300 font-semibold text-xs inline-flex items-center gap-1"
                >
                  <span>All Services</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Company
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Contact & Enquiries
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Direct Contact Details */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Contact Us
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  470 St Kilda Rd,
                  <br />
                  Melbourne VIC 3004, Australia
                </span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href="mailto:support@ausinx.com.au"
                  className="hover:text-amber-400 transition-colors"
                >
                  support@ausinx.com.au
                </a>
              </li>
              <li className="space-y-1">
                <div className="flex items-start gap-2.5 text-slate-300">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div className="flex flex-col gap-1">
                    <a
                      href="tel:0421081256"
                      className="hover:text-amber-400 transition-colors font-medium"
                    >
                      0421 081 256
                    </a>
                    <a
                      href="tel:0494730478"
                      className="hover:text-amber-400 transition-colors font-medium"
                    >
                      0494 730 478
                    </a>
                    <a
                      href="tel:0470525997"
                      className="hover:text-amber-400 transition-colors font-medium"
                    >
                      0470 525 997
                    </a>
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400 text-xs pt-1">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon – Fri: 09:00 AM – 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Lower Footer: Copyright & Legal */}
      <div className="border-t border-slate-800 bg-[#0E1720] text-slate-400 text-xs py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © {currentYear} AusinX Solutions Pty Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {/* Hidden ABN placeholder as per instructions */}
            <span className="text-slate-500 hidden sm:inline" aria-hidden="true">
              {/* TODO(client-review): ABN XX XXX XXX XXX placeholder */}
            </span>
            <Link
              href="/privacy"
              className="text-slate-400 hover:text-slate-200 underline transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Australian Owned & Operated</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
