export interface SiteImages {
  headerLogo: string;
  tabIcon?: string;
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
  headerLogo: "/images/client/ausinx-logo-new.png",
  tabIcon: "",
  heroImage: "/images/client/imaging-suite.webp",
  bentoCt: "/images/client/ct-suite.jpeg",
  bentoCArm: "/images/client/c-arm.jpeg",
  bentoMonitor: "/images/client/patient-monitor.jpeg",
  bentoUltrasound: "/images/client/ultrasound-care.jpeg",
  whyChooseUsImage: "/images/client/precision-calibration.jpeg",
  aboutImage: "/images/client/engineering-workshop.webp",
  contactImage: "/images/client/contact-support.webp",
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
      label: "On-Call Engineering Support",
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
      desc: "CT, Imaging & Biomedical",
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

