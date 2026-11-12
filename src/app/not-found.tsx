import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F1F5F9] px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-lg text-center space-y-5">
        <span className="text-4xl font-extrabold text-[#07999A] font-mono">404</span>
        <h1 className="text-2xl font-bold text-[#0B2942] font-heading">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          The page you are looking for does not exist or may have been relocated.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B2942] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#071F33] transition-colors"
          >
            <Home className="w-4 h-4 text-[#07999A]" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors"
          >
            <Phone className="w-4 h-4 text-slate-500" />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
