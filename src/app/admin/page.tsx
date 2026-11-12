"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Inbox,
  Settings,
  Wrench,
  Layers,
  LogOut,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  Mail,
  Phone,
  Building,
  Trash2,
  Save,
  Loader2,
  ShieldCheck,
  RefreshCw,
  Plus,
  UploadCloud,
  X,
} from "lucide-react";

interface AdminUser {
  email: string;
  name: string;
  role: string;
}

interface Enquiry {
  id: string;
  fullName: string;
  organisation: string;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
  createdAt: string;
  status: "new" | "in_review" | "contacted" | "archived";
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "enquiries" | "services" | "settings" | "home"
  >("enquiries");

  // Notifications / feedback
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Enquiries state
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);

  // Site Settings state
  const [settingsData, setSettingsData] = useState<any>(null);
  const [savingSettings, setSavingSettings] = useState(false);

  // Services state
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [savingServices, setSavingServices] = useState(false);
  const [uploadingServiceImage, setUploadingServiceImage] = useState(false);

  // Home / About / Lifecycle state
  const [aboutData, setAboutData] = useState<any>(null);
  const [lifecycleData, setLifecycleData] = useState<any[]>([]);
  const [savingHome, setSavingHome] = useState(false);

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Check Auth Session
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/session");
        const data = await res.json();
        if (!res.ok || !data.authenticated) {
          router.push("/admin/login");
        } else {
          setUser(data.user);
          loadEnquiries();
          loadContent();
        }
      } catch {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  // Load Enquiries
  const loadEnquiries = async () => {
    setLoadingEnquiries(true);
    try {
      const res = await fetch("/api/admin/enquiries");
      const data = await res.json();
      if (res.ok && data.enquiries) {
        setEnquiries(data.enquiries);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  // Load Content from RTDB
  const loadContent = async () => {
    try {
      const [resSettings, resServices, resAbout, resLifecycle] =
        await Promise.all([
          fetch("/api/admin/content?section=siteSettings"),
          fetch("/api/admin/content?section=services"),
          fetch("/api/admin/content?section=about"),
          fetch("/api/admin/content?section=lifecycle"),
        ]);

      const sData = await resSettings.json();
      const srvData = await resServices.json();
      const aData = await resAbout.json();
      const lData = await resLifecycle.json();

      if (sData.data) setSettingsData(sData.data);
      if (srvData.data) {
        const list = Array.isArray(srvData.data)
          ? srvData.data
          : Object.values(srvData.data);
        setServicesData(list);
      }
      if (aData.data) setAboutData(aData.data);
      if (lData.data) {
        const lList = Array.isArray(lData.data)
          ? lData.data
          : Object.values(lData.data);
        setLifecycleData(lList);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  // Update Enquiry Status
  const handleStatusChange = async (
    id: string,
    status: Enquiry["status"]
  ) => {
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status } : e))
        );
        showFeedback("success", "Enquiry status updated.");
      }
    } catch {
      showFeedback("error", "Failed to update enquiry status.");
    }
  };

  // Delete Enquiry
  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/admin/enquiries?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        showFeedback("success", "Enquiry removed.");
      }
    } catch {
      showFeedback("error", "Failed to delete enquiry.");
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "siteSettings",
          data: settingsData,
        }),
      });
      if (res.ok) {
        showFeedback("success", "Site settings updated in Firebase RTDB.");
      } else {
        showFeedback("error", "Failed to save site settings.");
      }
    } catch {
      showFeedback("error", "Network error saving site settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  // Save Services
  const handleSaveServices = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingServices(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "services",
          data: servicesData,
        }),
      });
      if (res.ok) {
        showFeedback("success", "Services are live on the customer website.");
      } else {
        const result = await res.json().catch(() => null);
        showFeedback("error", result?.error || "Failed to save services.");
      }
    } catch {
      showFeedback("error", "Network error saving services.");
    } finally {
      setSavingServices(false);
    }
  };

  const handleAddService = () => {
    let suffix = servicesData.length + 1;
    let slug = `new-service-${suffix}`;
    while (servicesData.some((service) => service.slug === slug)) {
      suffix += 1;
      slug = `new-service-${suffix}`;
    }

    const service = {
      slug,
      navTitle: "New Service",
      contactValue: "New Service",
      title: "New Service",
      shortSummary: "",
      fullDescription: "",
      keyHighlights: [],
      subServices: [],
      image: "/images/client/imaging-suite.jpeg",
      imageAlt: "New service image",
      metaTitle: "New Service | AusinX Solutions",
      metaDescription: "",
    };

    setServicesData((current) => [...current, service]);
    setSelectedServiceIndex(servicesData.length);
    showFeedback("success", "New service added. Complete its details and save to publish it.");
  };

  const handleServiceImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    const service = servicesData[selectedServiceIndex];
    if (!file || !service) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("slug", service.slug);
    setUploadingServiceImage(true);

    try {
      const response = await fetch("/api/admin/service-image", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok || !result.imageUrl) {
        showFeedback("error", result.error || "Image upload failed.");
        return;
      }

      setServicesData((current) =>
        current.map((item, index) =>
          index === selectedServiceIndex
            ? { ...item, image: result.imageUrl }
            : item
        )
      );
      showFeedback("success", "Image uploaded. Save the service to publish the change.");
    } catch {
      showFeedback("error", "Network error while uploading the image.");
    } finally {
      setUploadingServiceImage(false);
    }
  };

  // Save Home / About
  const handleSaveHome = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingHome(true);
    try {
      await Promise.all([
        fetch("/api/admin/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ section: "about", data: aboutData }),
        }),
        fetch("/api/admin/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ section: "lifecycle", data: lifecycleData }),
        }),
      ]);
      showFeedback("success", "Home and lifecycle copy updated in Firebase RTDB.");
    } catch {
      showFeedback("error", "Error saving home sections.");
    } finally {
      setSavingHome(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-[#07999A]" />
          <span>Verifying AusinX staff credentials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#0F172A] flex flex-col">
      {/* Top Navbar */}
      <header className="bg-[#0B2942] text-white border-b border-slate-700 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white p-0.5 flex items-center justify-center shrink-0">
              <Image
                src="/images/client/ausinx-logo-cropped.png"
                alt="AusinX Solutions"
                width={32}
                height={32}
                style={{ width: "auto", height: "auto" }}
                className="object-contain max-h-full max-w-full"
              />

            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight font-heading block">
                AusinX Admin Console
              </span>
              <span className="text-[10px] text-teal-400 font-semibold block">
                Firebase Realtime Database Connected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-white">
                {user?.name}
              </span>
              <span className="text-[10px] text-slate-300">
                {user?.role}
              </span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-slate-200 text-xs font-semibold hover:bg-white/15 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">View Public Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 text-xs font-bold hover:bg-red-500/30 transition-colors border border-red-500/30"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-4 border-t border-slate-800 text-xs font-bold uppercase tracking-wider overflow-x-auto">
          <button
            onClick={() => setActiveTab("enquiries")}
            className={`py-3 px-3 sm:px-4 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === "enquiries"
                ? "border-[#07999A] text-[#07999A]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Enquiries Inbox</span>
            {enquiries.filter((e) => e.status === "new").length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#07999A] text-[#0B2942] text-[10px] font-black">
                {enquiries.filter((e) => e.status === "new").length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`py-3 px-3 sm:px-4 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === "services"
                ? "border-[#07999A] text-[#07999A]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Services Editor</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`py-3 px-3 sm:px-4 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === "settings"
                ? "border-[#07999A] text-[#07999A]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Site Settings</span>
          </button>

          <button
            onClick={() => setActiveTab("home")}
            className={`py-3 px-3 sm:px-4 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === "home"
                ? "border-[#07999A] text-[#07999A]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Home & Lifecycle</span>
          </button>
        </div>
      </header>

      {/* Floating Feedback Notification */}
      {feedback && (
        <div
          role="status"
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-2xl border text-sm font-semibold flex items-center gap-2.5 transition-all ${
            feedback.type === "success"
              ? "bg-emerald-900 text-emerald-100 border-emerald-700"
              : "bg-red-900 text-red-100 border-red-700"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* TAB 1: ENQUIRIES INBOX */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-[#0B2942] font-heading">
                  Website Enquiries Inbox
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Enquiries received through the online contact form stored in Firebase Realtime Database.
                </p>
              </div>
              <button
                onClick={loadEnquiries}
                disabled={loadingEnquiries}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${
                    loadingEnquiries ? "animate-spin" : ""
                  }`}
                />
                <span>Refresh Inbox</span>
              </button>
            </div>

            {enquiries.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm space-y-3">
                <Inbox className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-[#0B2942]">
                  No Enquiries Yet
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  When healthcare facilities submit service requests on the contact form, they will appear here in real time.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                            enq.status === "new"
                              ? "bg-teal-100 text-teal-800 border border-teal-300"
                              : enq.status === "in_review"
                              ? "bg-blue-100 text-blue-800 border border-blue-300"
                              : enq.status === "contacted"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-slate-100 text-slate-600 border border-slate-300"
                          }`}
                        >
                          {enq.status.replace("_", " ")}
                        </span>
                        <h3 className="text-base font-bold text-[#0B2942]">
                          {enq.fullName}
                        </h3>
                        <span className="text-xs text-slate-500">
                          ({enq.organisation})
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            {enq.createdAt
                              ? new Date(enq.createdAt).toLocaleString("en-AU")
                              : "Recent"}
                          </span>
                        </span>
                        <select
                          value={enq.status}
                          onChange={(e) =>
                            handleStatusChange(
                              enq.id,
                              e.target.value as Enquiry["status"]
                            )
                          }
                          className="text-xs font-semibold px-2 py-1 rounded-lg border border-slate-300 bg-white"
                        >
                          <option value="new">Mark as New</option>
                          <option value="in_review">In Review</option>
                          <option value="contacted">Contacted</option>
                          <option value="archived">Archived</option>
                        </select>
                        <button
                          onClick={() => handleDeleteEnquiry(enq.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail className="w-4 h-4 text-teal-500 shrink-0" />
                        <a
                          href={`mailto:${enq.email}`}
                          className="hover:underline font-medium text-slate-800"
                        >
                          {enq.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone className="w-4 h-4 text-teal-500 shrink-0" />
                        <a
                          href={`tel:${enq.phone}`}
                          className="hover:underline font-medium text-slate-800"
                        >
                          {enq.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Building className="w-4 h-4 text-teal-500 shrink-0" />
                        <span>
                          Service: <strong>{enq.serviceInterest}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-100 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {enq.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SERVICES EDITOR */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-[#0B2942] font-heading">
                  Services Content Editor
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Create and update services, descriptions, and images shown across the customer website.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddService}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0B2942] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#087F86]"
              >
                <Plus className="h-4 w-4" /> Add service
              </button>
            </div>

            {servicesData.length > 0 ? (
              <>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {servicesData.map((s, idx) => (
                  <button
                    type="button"
                    key={s.slug}
                    onClick={() => setSelectedServiceIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                      selectedServiceIndex === idx
                        ? "bg-[#0B2942] text-white shadow"
                        : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {s.navTitle}
                  </button>
                ))}
                </div>

            <form
              onSubmit={handleSaveServices}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Service URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    pattern="[a-z0-9]+(-[a-z0-9]+)*"
                    value={servicesData[selectedServiceIndex]?.slug || ""}
                    onChange={(e) => {
                      const updated = [...servicesData];
                      updated[selectedServiceIndex].slug = e.target.value
                        .toLowerCase()
                        .trim()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-|-$/g, "");
                      setServicesData(updated);
                    }}
                    placeholder="example-service"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#07999A]"
                  />
                  <span className="mt-1 block text-[11px] text-slate-500">Customer page: /services/{servicesData[selectedServiceIndex]?.slug || "service-name"}</span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Enquiry Form Service Name
                  </label>
                  <input
                    type="text"
                    value={servicesData[selectedServiceIndex]?.contactValue || ""}
                    onChange={(e) => {
                      const updated = [...servicesData];
                      updated[selectedServiceIndex].contactValue = e.target.value;
                      setServicesData(updated);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#07999A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Display Navigation Title
                  </label>
                  <input
                    type="text"
                    value={servicesData[selectedServiceIndex]?.navTitle || ""}
                    onChange={(e) => {
                      const updated = [...servicesData];
                      updated[selectedServiceIndex].navTitle = e.target.value;
                      setServicesData(updated);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#07999A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Main Pillar Title
                  </label>
                  <input
                    type="text"
                    value={servicesData[selectedServiceIndex]?.title || ""}
                    onChange={(e) => {
                      const updated = [...servicesData];
                      updated[selectedServiceIndex].title = e.target.value;
                      setServicesData(updated);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#07999A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(220px,0.8fr)] sm:items-center">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Service Image
                    </label>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-[#07999A] hover:text-[#087F86]">
                      {uploadingServiceImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
                      {uploadingServiceImage ? "Uploading image…" : "Choose image"}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleServiceImageUpload}
                        disabled={uploadingServiceImage}
                        className="sr-only"
                      />
                    </label>
                    <p className="mt-1.5 text-xs text-slate-500">JPG, PNG, or WebP · up to 8 MB. The website automatically crops and sizes it for each screen.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Image Description (Accessibility)
                    </label>
                    <input
                      type="text"
                      value={servicesData[selectedServiceIndex]?.imageAlt || ""}
                      onChange={(e) => {
                        const updated = [...servicesData];
                        updated[selectedServiceIndex].imageAlt = e.target.value;
                        setServicesData(updated);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-[#07999A]"
                    />
                  </div>
                </div>
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-white">
                  {servicesData[selectedServiceIndex]?.image ? (
                    <Image
                      src={servicesData[selectedServiceIndex].image}
                      alt={servicesData[selectedServiceIndex].imageAlt || "Service image preview"}
                      fill
                      sizes="(max-width: 640px) 100vw, 40vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-slate-400">Image preview appears here</div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Short Summary (Home & Cards)
                </label>
                <textarea
                  rows={2}
                  value={servicesData[selectedServiceIndex]?.shortSummary || ""}
                  onChange={(e) => {
                    const updated = [...servicesData];
                    updated[selectedServiceIndex].shortSummary = e.target.value;
                    setServicesData(updated);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#07999A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Detailed Description (Services Page & Detail View)
                </label>
                <textarea
                  rows={3}
                  value={servicesData[selectedServiceIndex]?.fullDescription || ""}
                  onChange={(e) => {
                    const updated = [...servicesData];
                    updated[selectedServiceIndex].fullDescription = e.target.value;
                    setServicesData(updated);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#07999A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Key Highlights (one per line)
                </label>
                <textarea
                  rows={4}
                  value={(servicesData[selectedServiceIndex]?.keyHighlights || []).join("\n")}
                  onChange={(e) => {
                    const updated = [...servicesData];
                    updated[selectedServiceIndex].keyHighlights = e.target.value
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean);
                    setServicesData(updated);
                  }}
                  placeholder="Preventive maintenance scheduling\nRapid response support"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#07999A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Search Title</label>
                  <input
                    type="text"
                    value={servicesData[selectedServiceIndex]?.metaTitle || ""}
                    onChange={(e) => {
                      const updated = [...servicesData];
                      updated[selectedServiceIndex].metaTitle = e.target.value;
                      setServicesData(updated);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#07999A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Search Description</label>
                  <input
                    type="text"
                    value={servicesData[selectedServiceIndex]?.metaDescription || ""}
                    onChange={(e) => {
                      const updated = [...servicesData];
                      updated[selectedServiceIndex].metaDescription = e.target.value;
                      setServicesData(updated);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#07999A]"
                  />
                </div>
              </div>

              {/* Sub-services */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between gap-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Sub-Services Breakdown
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...servicesData];
                      updated[selectedServiceIndex].subServices = [
                        ...(updated[selectedServiceIndex].subServices || []),
                        { title: "", description: "" },
                      ];
                      setServicesData(updated);
                    }}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-[#07999A] hover:text-[#087F86]"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add detail
                  </button>
                </div>
                {servicesData[selectedServiceIndex]?.subServices?.map(
                  (sub: any, subIdx: number) => (
                    <div
                      key={subIdx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                    >
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...servicesData];
                            updated[selectedServiceIndex].subServices = updated[
                              selectedServiceIndex
                            ].subServices.filter((_: any, index: number) => index !== subIdx);
                            setServicesData(updated);
                          }}
                          aria-label="Remove sub-service"
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={sub.title}
                        placeholder="Sub-service title"
                        onChange={(e) => {
                          const updated = [...servicesData];
                          updated[selectedServiceIndex].subServices[subIdx].title =
                            e.target.value;
                          setServicesData(updated);
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                      />
                      <textarea
                        rows={2}
                        value={sub.description}
                        placeholder="Sub-service description"
                        onChange={(e) => {
                          const updated = [...servicesData];
                          updated[selectedServiceIndex].subServices[
                            subIdx
                          ].description = e.target.value;
                          setServicesData(updated);
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                  )
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={savingServices}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#07999A] text-[#0B2942] font-bold text-sm hover:bg-[#087F86] transition-colors shadow-md disabled:opacity-50"
                >
                  {savingServices ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Save & Publish Services</span>
                </button>
              </div>
            </form>
              </>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <h2 className="text-lg font-bold text-[#0B2942]">No services have been added yet.</h2>
                <p className="mt-2 text-sm text-slate-500">Start with a service name, description, and image. You can add sub-service details too.</p>
                <button
                  type="button"
                  onClick={handleAddService}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0B2942] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#087F86]"
                >
                  <Plus className="h-4 w-4" /> Create the first service
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SITE SETTINGS */}
        {activeTab === "settings" && settingsData && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-[#0B2942] font-heading">
                Site Settings & Identity
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Edit company name, tagline, official contact email, and office address.
              </p>
            </div>

            <form
              onSubmit={handleSaveSettings}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Legal Company Name
                  </label>
                  <input
                    type="text"
                    value={settingsData.companyName || ""}
                    onChange={(e) =>
                      setSettingsData({
                        ...settingsData,
                        companyName: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#07999A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Public Email Address
                  </label>
                  <input
                    type="email"
                    value={settingsData.publicEmail || ""}
                    onChange={(e) =>
                      setSettingsData({
                        ...settingsData,
                        publicEmail: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#07999A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tagline (Marked TODO(client-review))
                </label>
                <input
                  type="text"
                  value={settingsData.tagline || ""}
                  onChange={(e) =>
                    setSettingsData({
                      ...settingsData,
                      tagline: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#07999A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Business Hours
                </label>
                <input
                  type="text"
                  value={settingsData.businessHours || ""}
                  onChange={(e) =>
                    setSettingsData({
                      ...settingsData,
                      businessHours: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#07999A]"
                />
              </div>

              <div className="pt-2 border-t border-slate-100">
                <h3 className="text-sm font-bold text-[#0B2942] mb-3">
                  Melbourne Office Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={settingsData.address?.street || ""}
                      onChange={(e) =>
                        setSettingsData({
                          ...settingsData,
                          address: {
                            ...settingsData.address,
                            street: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      City / State
                    </label>
                    <input
                      type="text"
                      value={`${settingsData.address?.city || ""}, ${
                        settingsData.address?.state || ""
                      }`}
                      onChange={(e) => {
                        const [c, s] = e.target.value.split(",");
                        setSettingsData({
                          ...settingsData,
                          address: {
                            ...settingsData.address,
                            city: c?.trim() || "",
                            state: s?.trim() || "",
                          },
                        })
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Postcode
                    </label>
                    <input
                      type="text"
                      value={settingsData.address?.postcode || ""}
                      onChange={(e) =>
                        setSettingsData({
                          ...settingsData,
                          address: {
                            ...settingsData.address,
                            postcode: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#07999A] text-[#0B2942] font-bold text-sm hover:bg-[#087F86] transition-colors shadow-md disabled:opacity-50"
                >
                  {savingSettings ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Save Site Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: HOME & LIFECYCLE */}
        {activeTab === "home" && aboutData && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-[#0B2942] font-heading">
                Home & Lifecycle Sections
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Edit the introductory story, Why Healthcare Teams Choose AusinX, and 5-stage lifecycle strip.
              </p>
            </div>

            <form
              onSubmit={handleSaveHome}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Intro Story Paragraphs (Section 7.1)
                </label>
                <div className="space-y-2">
                  {aboutData.intro?.map((p: string, idx: number) => (
                    <textarea
                      key={idx}
                      rows={2}
                      value={p}
                      onChange={(e) => {
                        const newIntro = [...aboutData.intro];
                        newIntro[idx] = e.target.value;
                        setAboutData({ ...aboutData, intro: newIntro });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Why Healthcare Teams Choose AusinX (4 Points)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {aboutData.whyChooseUs?.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                    >
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...aboutData.whyChooseUs];
                          updated[idx].title = e.target.value;
                          setAboutData({ ...aboutData, whyChooseUs: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                      />
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => {
                          const updated = [...aboutData.whyChooseUs];
                          updated[idx].description = e.target.value;
                          setAboutData({ ...aboutData, whyChooseUs: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  5-Stage Lifecycle Integration Steps
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {lifecycleData.map((step: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
                    >
                      <span className="font-mono text-[10px] font-bold text-teal-600 block">
                        Step {step.step}
                      </span>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => {
                          const updated = [...lifecycleData];
                          updated[idx].title = e.target.value;
                          setLifecycleData(updated);
                        }}
                        className="w-full px-2 py-1 rounded border border-slate-300 text-xs font-bold"
                      />
                      <textarea
                        rows={3}
                        value={step.description}
                        onChange={(e) => {
                          const updated = [...lifecycleData];
                          updated[idx].description = e.target.value;
                          setLifecycleData(updated);
                        }}
                        className="w-full px-2 py-1 rounded border border-slate-300 text-[11px]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={savingHome}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#07999A] text-[#0B2942] font-bold text-sm hover:bg-[#087F86] transition-colors shadow-md disabled:opacity-50"
                >
                  {savingHome ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Save Home & Lifecycle Sections</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
