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
  ImageIcon,
  RotateCcw,
  Eye,
  EyeOff,
  ChevronDown,
} from "lucide-react";
import {
  defaultHeroMetrics,
  defaultSiteImages,
  type HeroMetricsConfig,
  type SiteImages,
} from "@/lib/site-images";

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
    "enquiries" | "services" | "images" | "settings" | "home"
  >("enquiries");

  // Notifications / feedback
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Enquiries state
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [enquiryFilter, setEnquiryFilter] = useState<
    "all" | Enquiry["status"]
  >("all");

  // Site Settings state
  const [settingsData, setSettingsData] = useState<any>(null);
  const [savingSettings, setSavingSettings] = useState(false);

  // Services state
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [savingServices, setSavingServices] = useState(false);
  const [uploadingServiceImage, setUploadingServiceImage] = useState(false);
  const [showAdvancedService, setShowAdvancedService] = useState(false);

  // Home / About / Lifecycle / Hero Stats state
  const [aboutData, setAboutData] = useState<any>(null);
  const [lifecycleData, setLifecycleData] = useState<any[]>([]);
  const [heroMetricsData, setHeroMetricsData] =
    useState<HeroMetricsConfig>(defaultHeroMetrics);
  const [savingHome, setSavingHome] = useState(false);

  // Website Images state
  const [siteImagesData, setSiteImagesData] = useState<SiteImages>(defaultSiteImages);
  const [savingImages, setSavingImages] = useState(false);
  const [uploadingImageSlot, setUploadingImageSlot] = useState<string | null>(null);

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
      } else if (!res.ok) {
        showFeedback("error", data.error || "Failed to load enquiries from database.");
      }
    } catch (e) {
      console.error(e);
      showFeedback("error", "Network error loading enquiries.");
    } finally {
      setLoadingEnquiries(false);
    }
  };

  // Load Content from RTDB
  const loadContent = async () => {
    try {
      const [resSettings, resServices, resAbout, resLifecycle, resImages, resMetrics] =
        await Promise.all([
          fetch("/api/admin/content?section=siteSettings"),
          fetch("/api/admin/content?section=services"),
          fetch("/api/admin/content?section=about"),
          fetch("/api/admin/content?section=lifecycle"),
          fetch("/api/admin/content?section=siteImages"),
          fetch("/api/admin/content?section=heroMetrics"),
        ]);

      const sData = await resSettings.json();
      const srvData = await resServices.json();
      const aData = await resAbout.json();
      const lData = await resLifecycle.json();
      const iData = await resImages.json();
      const mData = await resMetrics.json();

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
      if (iData.data && typeof iData.data === "object") {
        setSiteImagesData({ ...defaultSiteImages, ...iData.data });
      }
      if (mData.data && typeof mData.data === "object" && Array.isArray(mData.data.items)) {
        setHeroMetricsData({
          enabled: typeof mData.data.enabled === "boolean" ? mData.data.enabled : true,
          items: mData.data.items,
        });
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
        fetch("/api/admin/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ section: "heroMetrics", data: heroMetricsData }),
        }),
      ]);
      showFeedback("success", "Home, Hero Stats & Lifecycle saved to live site.");
    } catch {
      showFeedback("error", "Error saving home sections.");
    } finally {
      setSavingHome(false);
    }
  };

  // Upload Website Image for a specific slot
  const handleSiteImageUpload = async (
    slot: keyof SiteImages,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("slot", slot);
    setUploadingImageSlot(slot);

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

      setSiteImagesData((prev) => ({ ...prev, [slot]: result.imageUrl }));
      showFeedback("success", "Image uploaded. Click 'Save Website Images' to publish.");
    } catch {
      showFeedback("error", "Network error while uploading image.");
    } finally {
      setUploadingImageSlot(null);
    }
  };

  // Save Website Images
  const handleSaveSiteImages = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingImages(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "siteImages",
          data: siteImagesData,
        }),
      });
      if (res.ok) {
        showFeedback("success", "Website images published to live site.");
      } else {
        const result = await res.json().catch(() => null);
        showFeedback("error", result?.error || "Failed to save website images.");
      }
    } catch {
      showFeedback("error", "Network error saving website images.");
    } finally {
      setSavingImages(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-[#059669]" />
          <span>Verifying AusinX staff credentials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#0F172A] flex flex-col">
      {/* Top Navbar */}
      <header className="bg-[#0F172A] text-white border-b border-slate-700 sticky top-0 z-40 shadow-md">
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
              <span className="text-[10px] text-emerald-400 font-semibold block">
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
                ? "border-[#059669] text-[#34D399]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Enquiries</span>
            {enquiries.filter((e) => e.status === "new").length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#EF4444] text-white text-[10px] font-black">
                {enquiries.filter((e) => e.status === "new").length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("home")}
            className={`py-3 px-3 sm:px-4 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === "home"
                ? "border-[#059669] text-[#34D399]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Home &amp; Stats</span>
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`py-3 px-3 sm:px-4 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === "services"
                ? "border-[#059669] text-[#34D399]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Services</span>
          </button>

          <button
            onClick={() => setActiveTab("images")}
            className={`py-3 px-3 sm:px-4 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === "images"
                ? "border-[#059669] text-[#34D399]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Images</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`py-3 px-3 sm:px-4 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === "settings"
                ? "border-[#059669] text-[#34D399]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Company Info</span>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full space-y-6">
        {/* Quick Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => {
              setActiveTab("enquiries");
              setEnquiryFilter("new");
            }}
            className="text-left rounded-2xl bg-white border border-slate-200 p-4 shadow-sm hover:border-[#059669] transition-all"
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              New Enquiries
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-[#EF4444]">
                {enquiries.filter((e) => e.status === "new").length}
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                of {enquiries.length} total
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("home")}
            className="text-left rounded-2xl bg-white border border-slate-200 p-4 shadow-sm hover:border-[#059669] transition-all"
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Hero Stats Bar
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span
                className={`text-sm font-extrabold px-2.5 py-0.5 rounded-full ${
                  heroMetricsData.enabled
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {heroMetricsData.enabled ? "Visible on Site" : "Hidden"}
              </span>
              <span className="text-[11px] font-semibold text-[#059669]">
                Edit →
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("services")}
            className="text-left rounded-2xl bg-white border border-slate-200 p-4 shadow-sm hover:border-[#059669] transition-all"
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Active Services
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-[#0F172A]">
                {servicesData.length}
              </span>
              <span className="text-[11px] font-semibold text-[#059669]">
                Manage →
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("images")}
            className="text-left rounded-2xl bg-white border border-slate-200 p-4 shadow-sm hover:border-[#059669] transition-all"
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Website Photos
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-[#F59E0B]">9</span>
              <span className="text-[11px] font-semibold text-[#059669]">
                Upload →
              </span>
            </div>
          </button>
        </div>

        {/* TAB 1: ENQUIRIES INBOX */}
        {activeTab === "enquiries" && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-[#0F172A] font-heading">
                  Customer Enquiries
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Every contact form submission is saved here until you delete it.
                </p>
              </div>
              <button
                onClick={loadEnquiries}
                disabled={loadingEnquiries}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm self-start"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${
                    loadingEnquiries ? "animate-spin" : ""
                  }`}
                />
                <span>Refresh</span>
              </button>
            </div>

            {enquiries.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: "all", label: `All (${enquiries.length})` },
                    {
                      id: "new",
                      label: `New (${enquiries.filter((e) => e.status === "new").length})`,
                    },
                    {
                      id: "in_review",
                      label: `In Review (${enquiries.filter((e) => e.status === "in_review").length})`,
                    },
                    {
                      id: "contacted",
                      label: `Contacted (${enquiries.filter((e) => e.status === "contacted").length})`,
                    },
                    {
                      id: "archived",
                      label: `Archived (${enquiries.filter((e) => e.status === "archived").length})`,
                    },
                  ] as const
                ).map((pill) => (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => setEnquiryFilter(pill.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                      enquiryFilter === pill.id
                        ? "bg-[#0F172A] text-white"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            )}

            {enquiries.filter((e) =>
              enquiryFilter === "all" ? true : e.status === enquiryFilter
            ).length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm space-y-3">
                <Inbox className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-[#0F172A]">
                  {enquiries.length === 0
                    ? "No Enquiries Yet"
                    : "No Enquiries in This Filter"}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {enquiries.length === 0
                    ? "When healthcare facilities submit service requests on the contact form, they will appear here."
                    : "Try switching the filter above to view other enquiries."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {enquiries
                  .filter((e) =>
                    enquiryFilter === "all" ? true : e.status === enquiryFilter
                  )
                  .map((enq) => (
                  <div
                    key={enq.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                            enq.status === "new"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : enq.status === "in_review"
                              ? "bg-blue-100 text-blue-800 border border-blue-300"
                              : enq.status === "contacted"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-slate-100 text-slate-600 border border-slate-300"
                          }`}
                        >
                          {enq.status.replace("_", " ")}
                        </span>
                        <h3 className="text-base font-bold text-[#0F172A]">
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
                        <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                        <a
                          href={`mailto:${enq.email}`}
                          className="hover:underline font-medium text-slate-800"
                        >
                          {enq.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                        <a
                          href={`tel:${enq.phone}`}
                          className="hover:underline font-medium text-slate-800"
                        >
                          {enq.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Building className="w-4 h-4 text-emerald-500 shrink-0" />
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
                <h1 className="text-2xl font-extrabold text-[#0F172A] font-heading">
                  Services Content Editor
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Create and update services, descriptions, and images shown across the customer website.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddService}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#047857]"
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
                        ? "bg-[#0F172A] text-white shadow"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#059669]"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#059669]"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#059669]"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(220px,0.8fr)] sm:items-center">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Service Image
                    </label>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-[#059669] hover:text-[#047857]">
                      {uploadingServiceImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
                      {uploadingServiceImage ? "Uploading imageâ€¦" : "Choose image"}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleServiceImageUpload}
                        disabled={uploadingServiceImage}
                        className="sr-only"
                      />
                    </label>
                    <p className="mt-1.5 text-xs text-slate-500">JPG, PNG, or WebP Â· up to 8 MB. The website automatically crops and sizes it for each screen.</p>
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-[#059669]"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#059669]"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#059669]"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#059669]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdvancedService((prev) => !prev)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0F172A] px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showAdvancedService ? "rotate-180" : ""
                    }`}
                  />
                  <span>
                    {showAdvancedService
                      ? "Hide Advanced SEO & Sub-Services"
                      : `Advanced SEO & Sub-Services (${
                          servicesData[selectedServiceIndex]?.subServices?.length || 0
                        })`}
                  </span>
                </button>
              </div>

              {showAdvancedService && (
                <div className="space-y-6 pt-2 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Search Title (SEO)
                      </label>
                      <input
                        type="text"
                        value={servicesData[selectedServiceIndex]?.metaTitle || ""}
                        onChange={(e) => {
                          const updated = [...servicesData];
                          updated[selectedServiceIndex].metaTitle = e.target.value;
                          setServicesData(updated);
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#059669]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Search Description (SEO)
                      </label>
                      <input
                        type="text"
                        value={servicesData[selectedServiceIndex]?.metaDescription || ""}
                        onChange={(e) => {
                          const updated = [...servicesData];
                          updated[selectedServiceIndex].metaDescription = e.target.value;
                          setServicesData(updated);
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#059669]"
                      />
                    </div>
                  </div>

                  {/* Sub-services */}
                  <div className="space-y-3">
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
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-[#059669] hover:text-[#047857]"
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
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={savingServices}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#059669] text-white font-bold text-sm hover:bg-[#047857] transition-colors shadow-md disabled:opacity-50"
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
                <h2 className="text-lg font-bold text-[#0F172A]">No services have been added yet.</h2>
                <p className="mt-2 text-sm text-slate-500">Start with a service name, description, and image. You can add sub-service details too.</p>
                <button
                  type="button"
                  onClick={handleAddService}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0F172A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#047857]"
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
              <h1 className="text-2xl font-extrabold text-[#0F172A] font-heading">
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#059669]"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Company Tagline
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#059669]"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#059669]"
                />
              </div>

              <div className="pt-2 border-t border-slate-100">
                <h3 className="text-sm font-bold text-[#0F172A] mb-3">
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#059669] text-white font-bold text-sm hover:bg-[#047857] transition-colors shadow-md disabled:opacity-50"
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

        {/* TAB 4: HOME, HERO STATS & LIFECYCLE */}
        {activeTab === "home" && aboutData && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-[#0F172A] font-heading">
                  Home Page &amp; Hero Stats
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Turn the Hero Stats Bar on or off, edit the numbers/labels, or update your About &amp; Lifecycle copy.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSaveHome}
              className="space-y-6"
            >
              {/* HERO STATS BAR (OPTIONAL & EDITABLE) */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-[#0F172A] font-heading">
                      Hero Stats Bar (Optional)
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      The 4-column metrics strip below the homepage hero banner (24/7, 99.8%, 15+ Yrs, 100%).
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() =>
                        setHeroMetricsData((prev) => ({
                          ...prev,
                          enabled: !prev.enabled,
                        }))
                      }
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors border ${
                        heroMetricsData.enabled
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : "bg-slate-100 text-slate-600 border-slate-300"
                      }`}
                    >
                      {heroMetricsData.enabled ? (
                        <Eye className="w-4 h-4 text-[#059669]" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-slate-500" />
                      )}
                      <span>
                        {heroMetricsData.enabled ? "Shown on Site" : "Hidden on Site"}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setHeroMetricsData(defaultHeroMetrics)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setHeroMetricsData((prev) => ({
                          ...prev,
                          items: [
                            ...prev.items,
                            {
                              id: `stat-${Date.now()}`,
                              stat: "New",
                              label: "Metric Title",
                              desc: "Short subtitle",
                              color: "emerald",
                              visible: true,
                            },
                          ],
                        }))
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-[#0F172A] hover:bg-[#047857] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Stat</span>
                    </button>
                  </div>
                </div>

                {!heroMetricsData.enabled && (
                  <div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs font-medium text-amber-900">
                    The Hero Stats Bar is currently hidden. Click <strong>Shown on Site</strong> above and save to display it again.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {heroMetricsData.items.map((metric, idx) => (
                    <div
                      key={metric.id || idx}
                      className={`p-4 rounded-2xl border space-y-2.5 transition-opacity ${
                        metric.visible
                          ? "bg-slate-50 border-slate-200"
                          : "bg-slate-100/60 border-dashed border-slate-300 opacity-65"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const items = [...heroMetricsData.items];
                            items[idx] = { ...items[idx], visible: !items[idx].visible };
                            setHeroMetricsData({ ...heroMetricsData, items });
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-[#0F172A]"
                        >
                          {metric.visible ? (
                            <Eye className="w-3.5 h-3.5 text-[#059669]" />
                          ) : (
                            <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                          )}
                          <span>{metric.visible ? "Visible" : "Hidden"}</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          <select
                            value={metric.color}
                            onChange={(e) => {
                              const items = [...heroMetricsData.items];
                              items[idx] = {
                                ...items[idx],
                                color: e.target.value as "red" | "emerald" | "amber",
                              };
                              setHeroMetricsData({ ...heroMetricsData, items });
                            }}
                            className="text-[11px] font-bold px-2 py-0.5 rounded-lg border border-slate-300 bg-white"
                          >
                            <option value="red">Red</option>
                            <option value="emerald">Green</option>
                            <option value="amber">Amber</option>
                          </select>

                          {heroMetricsData.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const items = heroMetricsData.items.filter(
                                  (_, i) => i !== idx
                                );
                                setHeroMetricsData({ ...heroMetricsData, items });
                              }}
                              title="Remove stat"
                              className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <input
                        type="text"
                        value={metric.stat}
                        placeholder="e.g. 24/7"
                        onChange={(e) => {
                          const items = [...heroMetricsData.items];
                          items[idx] = { ...items[idx], stat: e.target.value };
                          setHeroMetricsData({ ...heroMetricsData, items });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-base font-extrabold text-[#0F172A]"
                      />

                      <input
                        type="text"
                        value={metric.label}
                        placeholder="Title"
                        onChange={(e) => {
                          const items = [...heroMetricsData.items];
                          items[idx] = { ...items[idx], label: e.target.value };
                          setHeroMetricsData({ ...heroMetricsData, items });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold"
                      />

                      <input
                        type="text"
                        value={metric.desc}
                        placeholder="Subtitle"
                        onChange={(e) => {
                          const items = [...heroMetricsData.items];
                          items[idx] = { ...items[idx], desc: e.target.value };
                          setHeroMetricsData({ ...heroMetricsData, items });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-[11px] text-slate-600"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    About Us Intro Paragraphs
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
                      <span className="font-mono text-[10px] font-bold text-emerald-600 block">
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
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#059669] text-white font-bold text-sm hover:bg-[#047857] transition-colors shadow-md disabled:opacity-50"
                  >
                    {savingHome ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>Save Home &amp; Stats</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: WEBSITE IMAGES */}
        {activeTab === "images" && (
          <form onSubmit={handleSaveSiteImages} className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h2 className="text-xl font-extrabold text-[#0F172A] font-heading">
                    Website Images Manager
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Upload or update images for every section across the website. Service-specific images can also be uploaded in the{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("services")}
                      className="text-[#059669] font-bold hover:underline"
                    >
                      Services Editor
                    </button>
                    .
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={savingImages}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] text-[#0F172A] font-bold text-xs hover:bg-[#047857] transition-colors shadow-md disabled:opacity-50"
                >
                  {savingImages ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Save Website Images</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(
                  [
                    {
                      key: "headerLogo",
                      label: "Header & Footer Brand Logo",
                      location: "Top Navbar & Site Footer",
                    },
                    {
                      key: "heroImage",
                      label: "Home Hero Showcase",
                      location: "Homepage Top Banner",
                    },
                    {
                      key: "bentoCt",
                      label: "Modality 1: CT & Radiotherapy",
                      location: "Homepage Multi-Modality Grid",
                    },
                    {
                      key: "bentoCArm",
                      label: "Modality 2: C-Arm & Mobile X-Ray",
                      location: "Homepage Multi-Modality Grid",
                    },
                    {
                      key: "bentoMonitor",
                      label: "Modality 3: Patient Monitors & Ventilators",
                      location: "Homepage Multi-Modality Grid",
                    },
                    {
                      key: "bentoUltrasound",
                      label: "Modality 4: Ultrasound Transducers",
                      location: "Homepage Multi-Modality Grid",
                    },
                    {
                      key: "whyChooseUsImage",
                      label: "Why Choose Us Feature Image",
                      location: "Homepage Why Choose Us Section",
                    },
                    {
                      key: "aboutImage",
                      label: "About Page Workshop Image",
                      location: "About Us Page Hero",
                    },
                    {
                      key: "contactImage",
                      label: "Contact Page Support Desk",
                      location: "Contact Page Information Card",
                    },
                  ] as { key: keyof SiteImages; label: string; location: string }[]
                ).map((slot) => {
                  const currentUrl = siteImagesData[slot.key] || defaultSiteImages[slot.key];
                  const isUploading = uploadingImageSlot === slot.key;
                  return (
                    <div
                      key={slot.key}
                      className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-sm font-bold text-[#0F172A]">
                              {slot.label}
                            </h3>
                            <p className="text-[11px] text-slate-500">
                              {slot.location}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setSiteImagesData((prev) => ({
                                ...prev,
                                [slot.key]: defaultSiteImages[slot.key],
                              }))
                            }
                            title="Reset to default image"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="relative h-40 w-full rounded-xl overflow-hidden border border-slate-200 bg-white">
                          <Image
                            src={currentUrl}
                            alt={slot.label}
                            fill
                            unoptimized
                            className={
                              slot.key === "headerLogo"
                                ? "object-contain p-3"
                                : "object-cover"
                            }
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <input
                          type="text"
                          value={currentUrl}
                          onChange={(e) =>
                            setSiteImagesData((prev) => ({
                              ...prev,
                              [slot.key]: e.target.value,
                            }))
                          }
                          placeholder="/images/client/..."
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-[11px] font-mono text-slate-700"
                        />

                        <label className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-bold hover:bg-[#020617] transition-colors cursor-pointer">
                          {isUploading ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <UploadCloud className="w-3.5 h-3.5 text-[#34D399]" />
                          )}
                          <span>
                            {isUploading ? "Uploading..." : "Upload New Image"}
                          </span>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            disabled={isUploading}
                            onChange={(e) => handleSiteImageUpload(slot.key, e)}
                          />
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
