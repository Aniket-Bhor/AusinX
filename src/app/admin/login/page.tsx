"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Login failed. Please check your credentials.");
      } else {
        window.location.href = "/admin";
      }
    } catch {
      setError("Network error connecting to login service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-white p-1 mx-auto shadow-lg flex items-center justify-center">
          <Image
            src="/images/client/ausinx-logo-cropped.png"
            alt="AusinX Solutions"
            width={56}
            height={56}
            style={{ width: "auto", height: "auto" }}
            className="object-contain max-h-full max-w-full"
          />

        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            AusinX Staff Portal
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Secure administrative control panel for AusinX Solutions
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-[#0F172A] py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-700 space-y-6">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Authorized Personnel Only</strong>
              <p className="text-emerald-200/80 mt-0.5">
                Restricted to AusinX management team (Sudhir, Shibu, Bhagwan).
              </p>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1"
              >
                Admin ID / Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Asuinx@admin or staff email"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0F172A] border border-slate-600 text-white placeholder-slate-500 text-sm focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0F172A] border border-slate-600 text-white placeholder-slate-500 text-sm focus:border-[#059669] focus:ring-1 focus:ring-[#059669] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#059669] text-[#0F172A] font-bold text-sm hover:bg-[#047857] transition-colors shadow-md disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center">
            <a
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              â† Return to Public Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
