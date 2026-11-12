import { cacheTag } from "next/cache";
import { getLocalContentSection } from "@/lib/local-content-storage";
import {
  defaultHeroMetrics,
  defaultSiteImages,
  type HeroMetricItem,
  type HeroMetricsConfig,
  type SiteImages,
} from "@/lib/site-images";

export type { HeroMetricItem, HeroMetricsConfig, SiteImages };
export { defaultHeroMetrics, defaultSiteImages };

export interface SubService {
  title: string;
  description: string;
}

export interface ServiceDetail {
  slug: string;
  navTitle: string;
  contactValue: string;
  title: string;
  shortSummary: string;
  fullDescription: string;
  keyHighlights: string[];
  subServices: SubService[];
  image: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
}

export interface WhyChoosePoint {
  title: string;
  description: string;
}

export interface LifecycleStep {
  step: string;
  title: string;
  description: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  taglineReviewNote: string;
  heroSupportingText: string;
  address: {
    street: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    formatted: string;
  };
  phones: {
    display: string;
    raw: string;
  }[];
  publicEmail: string;
  businessHours: string;
  abnPlaceholder: string;
}

export const siteSettings: SiteSettings = {
  companyName: "AusinX Solutions Pty Ltd",
  // Option 2 selected as per instructions, marked TODO(client-review)
  tagline: "Keeping Essential Clinical & Industrial Systems Running.",
  taglineReviewNote: "TODO(client-review): Tagline Option 2 currently active. Client to confirm preference between Option 1, Option 2, or Option 3.",
  heroSupportingText: "TODO(client-review): AusinX provides a full range of services for medical equipment, healthcare products and industrial products across the entire lifecycle.",
  address: {
    street: "470 St Kilda Rd",
    city: "Melbourne",
    state: "VIC",
    postcode: "3004",
    country: "Australia",
    formatted: "470 St Kilda Rd, Melbourne VIC 3004, Australia",
  },
  phones: [
    { display: "0421 081 256", raw: "0421081256" },
    { display: "0494 730 478", raw: "0494730478" },
    { display: "0470 525 997", raw: "0470525997" },
  ],
  publicEmail: "support@ausinx.com.au",
  businessHours: "09:00 AM – 5:00 PM (Monday – Friday)",
  abnPlaceholder: "TODO(client-review): ABN pending client submission",
};

export const aboutCopy = {
  intro: [
    "AusinX is a proudly Australian-owned and operated company providing a full range of services for medical equipment, healthcare products and industrial products. We support organisations across the entire equipment lifecycle, from the first planning conversation through to safe, compliant disposal.",
    "Our team delivers complete, end-to-end solutions: planning, decommissioning, disposal, installation and commissioning. Whether you are fitting out a new clinical space, upgrading ageing technology or retiring equipment at end of life, we manage the detail so your teams can stay focused on patient care.",
    "We are committed to reliable parts supply, dependable logistics and exceptional service for the healthcare sector. We understand that downtime in a clinical and industrial environment has real consequences, so we work to keep your equipment available, accurate and performing as it should.",
  ],
  whyChooseUs: [
    {
      title: "Australian owned and operated",
      description: "Local accountability and a team that understands the Australian healthcare environment.",
    },
    {
      title: "One partner across the lifecycle",
      description: "From planning through to decommissioning and disposal.",
    },
    {
      title: "Reliability you can plan around",
      description: "With a focus on dependable parts supply and delivery.",
    },
    {
      title: "A service-first approach",
      description: "Built on clear communication and attention to detail.",
    },
  ] as WhyChoosePoint[],
};

export const lifecycleSteps: LifecycleStep[] = [
  {
    step: "01",
    title: "Planning & Sourcing",
    description: "Collaborative consultation and technical evaluation to align equipment specifications with clinical workflows and facility standards.",
  },
  {
    step: "02",
    title: "Installation & Commissioning",
    description: "Expert engineering installation delivered on schedule, compliant with strict Australian healthcare standards and ready for clinical use.",
  },
  {
    step: "03",
    title: "Service & Maintenance",
    description: "Scheduled preventive maintenance, proactive equipment analysis, and rapid emergency repairs to maximize clinical uptime.",
  },
  {
    step: "04",
    title: "Parts & Calibration",
    description: "Reliable component logistics paired with documented precision calibration for high diagnostic and therapeutic accuracy.",
  },
  {
    step: "05",
    title: "Decommissioning & Disposal",
    description: "Safe, environmentally responsible, and regulatory-compliant retirement and disposal of ageing or obsolete medical technology.",
  },
];

export const servicesData: ServiceDetail[] = [
  {
    slug: "service-maintenance",
    navTitle: "Service & Maintenance",
    contactValue: "Service & Maintenance",
    title: "Service & Maintenance Support",
    shortSummary: "Responsive, skilled support that keeps essential equipment running and minimises disruption to clinical operations. Reduce downtime to hospital and clinical departments.",
    fullDescription: "Responsive, skilled support that keeps essential equipment running and minimises disruption to clinical operations. Reduce downtime to hospital and clinical departments. Service and maintenance support: preventive maintenance, proactive analysis of equipment, remote support for quick response.",
    keyHighlights: [
      "Preventive maintenance scheduling",
      "Proactive analysis of equipment",
      "Remote support for rapid emergency triage",
      "Reduced clinical and departmental downtime",
    ],
    subServices: [
      {
        title: "Preventive Maintenance",
        description: "Scheduled servicing designed to maximise the performance, reliability and lifespan of your equipment.",
      },
      {
        title: "Service and Repairs",
        description: "Fast, responsive support that minimises downtime and keeps your systems running, so you can treat more patients.",
      },
    ],
    image: "/images/client/biomedical-service.jpeg",
    imageAlt: "Biomedical engineer servicing clinical equipment",
    metaTitle: "Biomedical Service & Maintenance Support | AusinX Solutions",
    metaDescription: "Responsive biomedical equipment service and preventive maintenance support for Australian hospitals, clinical departments, and diagnostic facilities.",
  },
  {
    slug: "installation-commissioning",
    navTitle: "Installation & Commissioning",
    contactValue: "Installation & Commissioning",
    title: "Installation & Commissioning",
    shortSummary: "Careful planning, installation and commissioning, delivered to a high standard and handed over ready for use. Specialised in radiotherapy equipment and diagnostic equipment (CT/MRI).",
    fullDescription: "Careful planning, installation and commissioning, delivered to a high standard and handed over ready for use. Specialised in radiotherapy equipment and diagnostic equipment (CT/MRI).",
    keyHighlights: [
      "Specialised in Radiotherapy equipment",
      "Diagnostic equipment expertise (CT/MRI)",
      "Strict compliance with Australian clinical standards",
      "Full lifecycle support from planning to disposal",
    ],
    subServices: [
      {
        title: "Installation and Commissioning",
        description: "Expert engineers are assigned to complete every installation on schedule and in line with industry standards and compliance requirements.",
      },
      {
        title: "Planning, Decommissioning and Disposal",
        description: "Support at both ends of the lifecycle, from the first plan to safe, compliant retirement of equipment.",
      },
    ],
    image: "/images/client/specialist-linac.jpeg",
    imageAlt: "Radiotherapy linear accelerator and oncology gantry installation",
    metaTitle: "Installation & Commissioning | Radiotherapy & CT/MRI Specialists | AusinX Solutions",
    metaDescription: "Precision installation, commissioning, planning, and compliant decommissioning for radiotherapy equipment and diagnostic systems (CT/MRI) across Australia.",
  },
  {
    slug: "parts-logistics",
    navTitle: "Parts & Logistics",
    contactValue: "Parts & Logistics",
    title: "Parts Supply & Logistics",
    shortSummary: "Reliable parts supply and well-coordinated logistics, so the right components and equipment arrive when and where they are needed.",
    fullDescription: "Reliable parts supply and well-coordinated logistics, so the right components and equipment arrive when and where they are needed.",
    keyHighlights: [
      "Dependable sourcing for critical biomedical components",
      "Coordinated logistics ensuring on-time delivery",
      "Minimised delays for planned servicing and urgent repairs",
      "Dedicated supply chain support for healthcare facilities",
    ],
    subServices: [
      {
        title: "Parts and Logistics",
        description: "Reliable sourcing and supply of equipment and parts delivered when and where your healthcare team needs them.",
      },
    ],
    image: "/images/client/parts-logistics.jpeg",
    imageAlt: "AusinX medical spare parts warehouse and logistics facility",
    metaTitle: "Medical Equipment Parts Supply & Logistics | AusinX Solutions",
    metaDescription: "Reliable biomedical parts sourcing and coordinated healthcare logistics to ensure critical components arrive on schedule when and where needed.",
  },
  {
    slug: "calibration",
    navTitle: "Calibration",
    contactValue: "Calibration",
    title: "Precision Calibration Support",
    shortSummary: "Precise, documented calibration support with accuracy, safety and confidence in your equipment's performance.",
    fullDescription: "Precise, documented calibration support with accuracy, safety and confidence in your equipment's performance.",
    keyHighlights: [
      "Documented precision verification protocols",
      "Confidence in diagnostic and clinical measurement accuracy",
      "Alignment with Australian healthcare safety guidelines",
      "Traceable quality records for compliance audits",
    ],
    subServices: [
      {
        title: "Calibration",
        description: "Precise, documented calibration that supports the accuracy and safety of your equipment.",
      },
    ],
    image: "/images/client/calibration-lab.jpeg",
    imageAlt: "Precision calibration test bench and electronic diagnostic instrumentation",
    metaTitle: "Biomedical Precision Calibration Services | AusinX Solutions",
    metaDescription: "Documented precision calibration support for medical and industrial electronics equipment, ensuring high clinical accuracy and safety compliance.",
  },
];

const RTDB_BASE =
  process.env.FIREBASE_DATABASE_URL ||
  "https://ausinx-default-rtdb.firebaseio.com";

export async function getSiteSettings(): Promise<SiteSettings> {
  "use cache";
  cacheTag("site-settings");

  const local = getLocalContentSection("siteSettings") as SiteSettings | null;
  if (local && typeof local === "object" && local.companyName) {
    return local;
  }

  try {
    const res = await fetch(`${RTDB_BASE}/content/siteSettings.json`, {
      signal: AbortSignal.timeout(2500),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.companyName) return data as SiteSettings;
    }
  } catch {
    // Graceful fallback to static JSON
  }
  return siteSettings;
}

export async function getAboutCopy(): Promise<typeof aboutCopy> {
  "use cache";
  cacheTag("about-copy");

  const local = getLocalContentSection("about") as typeof aboutCopy | null;
  if (local && typeof local === "object" && local.intro && local.whyChooseUs) {
    return local;
  }

  try {
    const res = await fetch(`${RTDB_BASE}/content/about.json`, {
      signal: AbortSignal.timeout(2500),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.intro && data.whyChooseUs) return data as typeof aboutCopy;
    }
  } catch {
    // Fallback
  }
  return aboutCopy;
}

const clientServiceImages: Record<string, { image: string; imageAlt: string }> = {
  "service-maintenance": { image: "/images/client/biomedical-service.jpeg", imageAlt: "Biomedical engineer servicing clinical equipment" },
  "installation-commissioning": { image: "/images/client/specialist-linac.jpeg", imageAlt: "Radiotherapy linear accelerator and oncology gantry installation" },
  "parts-logistics": { image: "/images/client/parts-logistics.jpeg", imageAlt: "AusinX medical spare parts warehouse and logistics facility" },
  calibration: { image: "/images/client/calibration-lab.jpeg", imageAlt: "Precision calibration test bench and electronic diagnostic instrumentation" },
};

function normalizeServiceImages(services: ServiceDetail[]): ServiceDetail[] {
  return services.map((service) => {
    const defaultImage = clientServiceImages[service.slug];
    const needsDefault =
      !service.image || service.image.startsWith("/images/placeholders/");

    return {
      ...service,
      ...(needsDefault && defaultImage ? defaultImage : {}),
      image: needsDefault
        ? defaultImage?.image || "/images/client/imaging-suite.jpeg"
        : service.image,
      navTitle: service.navTitle || service.title || "Service",
      contactValue: service.contactValue || service.navTitle || service.title || "Service",
      imageAlt:
        service.imageAlt ||
        defaultImage?.imageAlt ||
        service.navTitle ||
        service.title ||
        "Service image",
      metaTitle: service.metaTitle || service.title || service.navTitle || "AusinX service",
      metaDescription: service.metaDescription || service.shortSummary || "Engineering service from AusinX Solutions.",
      keyHighlights: Array.isArray(service.keyHighlights)
        ? service.keyHighlights
        : [],
      subServices: Array.isArray(service.subServices) ? service.subServices : [],
    };
  });
}

export async function getServices(): Promise<ServiceDetail[]> {
  "use cache";
  cacheTag("services");

  const local = getLocalContentSection("services") as ServiceDetail[] | null;
  if (local && Array.isArray(local) && local.length > 0) {
    return normalizeServiceImages(local);
  }

  try {
    const res = await fetch(`${RTDB_BASE}/content/services.json`, {
      signal: AbortSignal.timeout(2500),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return normalizeServiceImages(data as ServiceDetail[]);
      }
      if (data && typeof data === "object") {
        return normalizeServiceImages(Object.values(data) as ServiceDetail[]);
      }
    }
  } catch {
    // Fallback
  }
  return normalizeServiceImages(servicesData);
}

export async function getServiceBySlug(slug: string): Promise<ServiceDetail | undefined> {
  "use cache";
  cacheTag("services");
  const services = await getServices();
  return services.find((s) => s.slug === slug);
}

export async function getLifecycleSteps(): Promise<LifecycleStep[]> {
  "use cache";
  cacheTag("lifecycle-steps");

  const local = getLocalContentSection("lifecycle") as LifecycleStep[] | null;
  if (local && Array.isArray(local) && local.length > 0) {
    return local;
  }

  try {
    const res = await fetch(`${RTDB_BASE}/content/lifecycle.json`, {
      signal: AbortSignal.timeout(2500),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data as LifecycleStep[];
      }
      if (data && typeof data === "object") {
        return Object.values(data) as LifecycleStep[];
      }
    }
  } catch {
    // Fallback
  }
  return lifecycleSteps;
}

export async function getSiteImages(): Promise<SiteImages> {
  "use cache";
  cacheTag("site-images");

  const local = getLocalContentSection("siteImages") as Partial<SiteImages> | null;
  if (local && typeof local === "object") {
    const merged: SiteImages = { ...defaultSiteImages };
    (Object.keys(defaultSiteImages) as (keyof SiteImages)[]).forEach((key) => {
      const val = local[key];
      if (typeof val === "string" && val.trim().length > 0) {
        merged[key] = val.trim();
      }
    });
    return merged;
  }

  try {
    const res = await fetch(`${RTDB_BASE}/content/siteImages.json`, {
      signal: AbortSignal.timeout(2500),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object") {
        const merged: SiteImages = { ...defaultSiteImages };
        (Object.keys(defaultSiteImages) as (keyof SiteImages)[]).forEach((key) => {
          const val = data[key];
          if (typeof val === "string" && val.trim().length > 0) {
            merged[key] = val.trim();
          }
        });
        return merged;
      }
    }
  } catch {
    // Fallback to default local images
  }
  return defaultSiteImages;
}

export async function getHeroMetrics(): Promise<HeroMetricsConfig> {
  "use cache";
  cacheTag("hero-metrics");

  // In local dev/fallback, read directly from local content storage if available
  const local = getLocalContentSection("heroMetrics") as HeroMetricsConfig | null;
  if (local && typeof local === "object" && Array.isArray(local.items)) {
    return {
      enabled: typeof local.enabled === "boolean" ? local.enabled : true,
      items: local.items,
    };
  }

  try {
    const res = await fetch(`${RTDB_BASE}/content/heroMetrics.json`, {
      signal: AbortSignal.timeout(2500),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object" && Array.isArray(data.items)) {
        return {
          enabled: typeof data.enabled === "boolean" ? data.enabled : true,
          items: data.items,
        };
      }
    }
  } catch {
    // Fallback to default hero metrics
  }
  return defaultHeroMetrics;
}

