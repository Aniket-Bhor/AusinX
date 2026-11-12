import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { getAdminDb } from "@/lib/firebase-admin";
import {
  initialAboutCopy,
  initialLifecycleSteps,
  initialServicesData,
  initialSiteSettings,
} from "@/lib/initial-content";
import { defaultHeroMetrics, defaultSiteImages } from "@/lib/site-images";
import {
  getLocalContentSection,
  saveLocalContentSection,
} from "@/lib/local-content-storage";

const editableSections = new Set([
  "services",
  "siteSettings",
  "about",
  "lifecycle",
  "siteImages",
  "heroMetrics",
]);

const initialDefaults: Record<string, unknown> = {
  services: initialServicesData,
  siteSettings: initialSiteSettings,
  about: initialAboutCopy,
  lifecycle: initialLifecycleSteps,
  siteImages: defaultSiteImages,
  heroMetrics: defaultHeroMetrics,
};

export async function GET(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");

  const db = getAdminDb();
  if (!db) {
    // If DB is not configured, check local storage first, then fallback to initial default content
    if (section) {
      const localSaved = getLocalContentSection(section);
      if (localSaved !== null && localSaved !== undefined) {
        return NextResponse.json({ data: localSaved });
      }
      if (initialDefaults[section] !== undefined) {
        return NextResponse.json({
          data: initialDefaults[section],
          warning: "Database not configured. Showing default content.",
        });
      }
    }
    return NextResponse.json({
      data: initialDefaults,
      warning: "Database not configured. Showing default content.",
    });
  }

  try {
    const path = section ? `content/${section}` : "content";
    const snapshot = await db.ref(path).once("value");
    const val = snapshot.val();

    if (val !== null && val !== undefined) {
      return NextResponse.json({ data: val });
    }

    // If section doesn't exist yet in DB, return initial defaults so admin sees pre-filled forms
    if (section && initialDefaults[section] !== undefined) {
      return NextResponse.json({ data: initialDefaults[section] });
    }

    return NextResponse.json({ data: val });
  } catch (error) {
    console.error("[Admin Content] Error fetching content:", error);
    if (section && initialDefaults[section] !== undefined) {
      return NextResponse.json({ data: initialDefaults[section] });
    }
    return NextResponse.json(
      { error: "Failed to fetch content from database." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getAdminDb();

  try {
    const { section, data } = await request.json();

    if (
      typeof section !== "string" ||
      !editableSections.has(section) ||
      data === undefined ||
      data === null
    ) {
      return NextResponse.json(
        { error: "Choose a valid content section and provide its data." },
        { status: 400 }
      );
    }

    if (section === "services") {
      if (!Array.isArray(data)) {
        return NextResponse.json(
          { error: "Services must be submitted as a list." },
          { status: 400 }
        );
      }

      const slugs = new Set<string>();
      for (const service of data) {
        if (
          !service ||
          typeof service.slug !== "string" ||
          service.slug.length > 64 ||
          !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(service.slug) ||
          typeof service.navTitle !== "string" ||
          !service.navTitle.trim() ||
          typeof service.title !== "string" ||
          !service.title.trim() ||
          slugs.has(service.slug)
        ) {
          return NextResponse.json(
            { error: "Every service needs a unique URL slug, navigation name, and title." },
            { status: 400 }
          );
        }
        slugs.add(service.slug);
      }

      const safeServices = data.map((service: Record<string, unknown>) => ({
        ...service,
        contactValue:
          typeof service.contactValue === "string" && service.contactValue.trim()
            ? service.contactValue.trim()
            : String(service.navTitle).trim(),
        image:
          typeof service.image === "string" && service.image.trim()
            ? service.image.trim()
            : "/images/client/imaging-suite.jpeg",
        imageAlt:
          typeof service.imageAlt === "string" && service.imageAlt.trim()
            ? service.imageAlt.trim()
            : String(service.navTitle).trim(),
        keyHighlights: Array.isArray(service.keyHighlights) ? service.keyHighlights : [],
        subServices: Array.isArray(service.subServices) ? service.subServices : [],
        metaTitle:
          typeof service.metaTitle === "string" && service.metaTitle.trim()
            ? service.metaTitle.trim()
            : String(service.title).trim(),
        metaDescription:
          typeof service.metaDescription === "string" && service.metaDescription.trim()
            ? service.metaDescription.trim()
            : String(service.shortSummary || "").trim(),
      }));
      data.splice(0, data.length, ...safeServices);
    }

    // Save locally for dev/offline resilience
    saveLocalContentSection(section, data);

    if (db) {
      try {
        // Save to content/${section}
        await db.ref(`content/${section}`).set(data);
        // Also sync top-level node for compatibility
        await db.ref(section).set(data);
      } catch (dbErr) {
        console.warn("[Admin Content] Failed writing to Firebase RTDB:", dbErr);
      }
    }

    if (section === "services") {
      revalidateTag("services", { expire: 0 });
    } else if (section === "siteSettings") {
      revalidateTag("site-settings", { expire: 0 });
    } else if (section === "about") {
      revalidateTag("about-copy", { expire: 0 });
    } else if (section === "lifecycle") {
      revalidateTag("lifecycle-steps", { expire: 0 });
    } else if (section === "siteImages") {
      revalidateTag("site-images", { expire: 0 });
    } else if (section === "heroMetrics") {
      revalidateTag("hero-metrics", { expire: 0 });
    }

    // Record audit trail if db connected
    if (db) {
      try {
        await db.ref(`auditLog`).push({
          action: "UPDATE_CONTENT",
          section,
          updatedBy: admin.email,
          timestamp: new Date().toISOString(),
        });
      } catch (logErr) {
        console.warn("[Admin Content] Failed writing audit log:", logErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Section '${section}' updated successfully.`,
    });
  } catch (error) {
    console.error("[Admin Content] Error saving content:", error);
    return NextResponse.json(
      { error: "Failed to save content to database." },
      { status: 500 }
    );
  }
}
