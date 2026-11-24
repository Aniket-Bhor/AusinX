export interface SiteImages {
  headerLogo: string;
  tabIcon?: string;
  heroImage: string;
  heroSlide1?: string;
  heroSlide2?: string;
  heroSlide3?: string;
  heroSlide4?: string;
  aboutNationalCoverage?: string;
  aboutEquipmentLifecycle?: string;
  aboutSafetyCompliance?: string;
  bentoCt: string;
  bentoCArm: string;
  bentoMonitor: string;
  bentoUltrasound: string;
  whyChooseUsImage: string;
  whyChooseUsSlide2?: string;
  whyChooseUsSlide3?: string;
  whyChooseUsSlide4?: string;
  aboutImage: string;
  contactImage: string;
}

export const defaultSiteImages: SiteImages = {
  headerLogo: "/images/client/ausinx-logo-new.png",
  tabIcon: "",
  heroImage: "/review_image/01_mri_diagnostic_suite.webp",
  heroSlide1: "/review_image/01_mri_diagnostic_suite.webp",
  heroSlide2: "/review_image/02_oscilloscope_calibration_station_new.webp",
  heroSlide3: "/review_image/04_pcb_board_soldering_diagnostics.webp",
  heroSlide4: "/review_image/06_cleanroom_precision_spares_new.webp",
  aboutNationalCoverage: "/extra/1about_us.png",
  aboutEquipmentLifecycle: "/extra/2about_us.png",
  aboutSafetyCompliance: "/extra/3about_us.png",
  bentoCt: "/images/client/ct-suite.jpeg",
  bentoCArm: "/images/client/c-arm.jpeg",
  bentoMonitor: "/images/client/patient-monitor.jpeg",
  bentoUltrasound: "/images/client/ultrasound-care.jpeg",
  whyChooseUsImage: "/images/client/precision-calibration.jpeg",
  whyChooseUsSlide2: "/images/client/why-choose-1.webp",
  whyChooseUsSlide3: "/images/client/why-choose-2.webp",
  whyChooseUsSlide4: "/images/client/why-choose-3.webp",
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

