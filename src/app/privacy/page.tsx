import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Australian Privacy Principles Draft",
  description:
    "Privacy policy draft compliant with the Privacy Act 1988 (Cth) and Australian Privacy Principles (APPs) for AusinX Solutions Pty Ltd.",
  openGraph: {
    title: "Privacy Policy | AusinX Solutions Pty Ltd",
    description:
      "Privacy policy draft compliant with the Privacy Act 1988 (Cth) and Australian Privacy Principles (APPs).",
    url: "https://www.ausinx.com.au/privacy",
  },
};


export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-200">
            <AlertTriangle className="w-4 h-4 text-teal-600" />
            <span>TODO(client-review): Draft Privacy Policy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2942] tracking-tight font-heading">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Last updated: October 2026 • AusinX Solutions Pty Ltd
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0B2942]">1. Introduction</h2>
            <p>
              AusinX Solutions Pty Ltd (&quot;AusinX&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the privacy of individuals who interact with us, in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). This document sets out how we collect, hold, use, and disclose personal information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0B2942]">2. Information We Collect</h2>
            <p>
              When you submit an enquiry through our website or contact us by phone or email, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your full name and professional contact details (email address, telephone number)</li>
              <li>Your healthcare organisation, hospital department, or company name</li>
              <li>Details regarding the medical equipment, maintenance, calibration, or parts you require</li>
              <li>Any additional information you choose to provide in your message</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0B2942]">3. How We Use Your Information</h2>
            <p>
              We collect and use your personal information solely for legitimate business purposes, including:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Responding to service enquiries and providing quotations</li>
              <li>Coordinating on-site engineering, installation, calibration, and maintenance</li>
              <li>Managing parts supply and logistics delivery</li>
              <li>Complying with Australian regulatory and clinical engineering record-keeping standards</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0B2942]">4. Data Security and Retention</h2>
            <p>
              We take reasonable steps to protect your personal information from misuse, interference, loss, unauthorised access, modification, or disclosure. We do not sell or rent personal information to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0B2942]">5. Cookies & Analytics</h2>
            <p>
              Our website may use standard technical cookies and privacy-friendly analytics to assess website performance, traffic patterns, and navigation ease. These tools do not track personal identifying information across external websites.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0B2942]">6. Contact Us Regarding Privacy</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to access or correct your personal information, please contact us:
            </p>
            <p className="font-medium text-[#0B2942]">
              Privacy Officer, AusinX Solutions Pty Ltd
              <br />
              470 St Kilda Rd, Melbourne VIC 3004, Australia
              <br />
              Email:{" "}
              <a href="mailto:support@ausinx.com.au" className="text-blue-700 underline">
                support@ausinx.com.au
              </a>
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-slate-200">
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-wider text-[#0B2942] hover:underline"
          >
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
