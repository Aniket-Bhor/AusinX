export interface SiteImages {
  headerLogo: string;
  heroImage: string;
  bentoCt: string;
  bentoCArm: string;
  bentoMonitor: string;
  bentoUltrasound: string;
  whyChooseUsImage: string;
  aboutImage: string;
  contactImage: string;
}

export const defaultSiteImages: SiteImages = {
  headerLogo: "/images/client/ausinx-logo-brand-clean.png",
  heroImage: "/images/client/imaging-suite.jpeg",
  bentoCt: "/images/client/ct-suite.jpeg",
  bentoCArm: "/images/client/c-arm.jpeg",
  bentoMonitor: "/images/client/patient-monitor.jpeg",
  bentoUltrasound: "/images/client/ultrasound-care.jpeg",
  whyChooseUsImage: "/images/client/clinical-trust.jpeg",
  aboutImage: "/images/client/engineering-workshop.jpeg",
  contactImage: "/images/client/contact-support.jpeg",
};

export interface HeroMetricItem {
  id: string;
  stat: string;
  label: string;
  desc: string;
  color: "red" | "emerald" | "amber";
  visible: boolean;
}

export interface HeroMetricsConfig {
  enabled: boolean;
  items: HeroMetricItem[];
}

export const defaultHeroMetrics: HeroMetricsConfig = {
  enabled: true,
  items: [
    {
      id: "callout",
      stat: "24/7",
      label: "Emergency Breakdown Callout",
      desc: "Melbourne & National",
      color: "red",
      visible: true,
    },
    {
      id: "uptime",
      stat: "99.8%",
      label: "Clinical Equipment Uptime",
      desc: "Proactive Preventive Care",
      color: "emerald",
      visible: true,
    },
    {
      id: "experience",
      stat: "15+ Yrs",
      label: "Specialist Engineering",
      desc: "Linac, CT & Biomedical",
      color: "amber",
      visible: true,
    },
    {
      id: "ownership",
      stat: "100%",
      label: "Australian Owned",
      desc: "Local Leadership & Spares",
      color: "emerald",
      visible: true,
    },
  ],
};

