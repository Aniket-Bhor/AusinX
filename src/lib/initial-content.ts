export const initialSiteSettings = {
  companyName: "AusinX Solutions Pty Ltd",
  tagline: "Industrial & Biomedical Engineering Solutions",
  taglineReviewNote: "Australian-owned and operated partner across the full equipment lifecycle.",
  heroSupportingText: "Australian-owned and operated. We support medical equipment, healthcare products and industrial products through their full lifecycle: planning, decommissioning, disposal, installation and commissioning.",
  address: {
    street: "Level 1, 45 William Street",
    city: "Melbourne",
    state: "VIC",
    postcode: "3000",
    country: "Australia",
    formatted: "Level 1, 45 William Street, Melbourne VIC 3000",
  },
  phones: [
    { display: "0421 081 256", raw: "+61421081256", note: "Primary Engineering Mobile" },
    { display: "0430 435 628", raw: "+61430435628", note: "Secondary Support" },
  ],
  publicEmail: "support@ausinx.com.au",
  businessHours: "09:00 AM – 5:00 PM (Monday – Friday)",
  abnPlaceholder: "TODO(client-review): ABN pending client submission",
};

export const initialAboutCopy = {
  intro: [
    "AusinX provides a comprehensive, full-lifecycle range of engineering services for medical equipment, healthcare technology, and industrial products. We support organisations across the entire equipment lifecycle, from the first planning conversation through to safe, compliant disposal.",
    "Our team delivers complete, end-to-end solutions: planning, decommissioning, disposal, installation and commissioning. Whether you are fitting out a new clinical space, upgrading ageing technology or retiring equipment at end of life, we manage the detail so your teams can stay focused on patient care.",
    "We are committed to reliable parts supply, dependable logistics and exceptional service for the biomedical and industrial sectors. We understand that downtime in a biomedical and industrial environment has real consequences, so we work to keep your equipment available, accurate and performing as it should.",
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
  ],
};

export const initialLifecycleSteps = [
  {
    step: "01",
    title: "Planning & Sourcing",
    description: "Collaborative consultation and technical evaluation to align equipment specifications with operational workflows and facility standards.",
  },
  {
    step: "02",
    title: "Installation & Commissioning",
    description: "Expert engineering installation delivered on schedule, compliant with strict Australian healthcare and industrial standards and ready for operational use.",
  },
  {
    step: "03",
    title: "Service & Maintenance",
    description: "Scheduled preventive maintenance, proactive equipment analysis, and rapid emergency repairs to maximize equipment uptime.",
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

export const initialServicesData = [
  {
    slug: "service-maintenance",
    navTitle: "Service & Maintenance",
    contactValue: "Service & Maintenance",
    title: "Service & Maintenance Support",
    shortSummary: "Responsive, skilled support that keeps essential equipment running and minimises disruption to operations. Reduce downtime across hospital and industrial departments.",
    fullDescription: "Responsive, skilled support that keeps essential equipment running and minimises disruption to operations. Reduce downtime across hospital and industrial departments. Service and maintenance support: preventive maintenance, proactive analysis of equipment, remote support for quick response.",
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
      {
        title: "Technical Helpline Support",
        description: "Direct line to trained engineers who can diagnose issues remotely or arrange rapid on-site attendance.",
      },
    ],
    image: "/images/client/service-maintenance-new.webp",
    imageAlt: "Biomedical engineering service workbench with diagnostic equipment",
    metaTitle: "Medical Equipment Service & Maintenance | AusinX Solutions",
    metaDescription: "Preventive maintenance, repairs and technical support for medical equipment across Australia. Minimise downtime with AusinX.",
  },
  {
    slug: "installation-commissioning",
    navTitle: "Installation & Commissioning",
    contactValue: "Installation & Commissioning",
    title: "Installation & Commissioning",
    shortSummary: "Turnkey delivery, mechanical anchoring, electrical verification, and OEM-standard commissioning for medical imaging suites and industrial modalities.",
    fullDescription: "Comprehensive support throughout the equipment lifecycle, from initial planning and installation, ongoing maintenance and safe decommissioning. AusinX specialises in medical and industrial equipment — from site readiness and pre-installation site surveys through to physical delivery, mechanical anchoring, electrical hookup, and final calibration, ensuring every piece of equipment meets strict Australian standards.",
    keyHighlights: [
      "Site readiness inspection and pre-installation reviews",
      "Mechanical rigging, positioning, and anchoring",
      "OEM protocol verification and functional safety signoff",
      "Clinical and industrial handoff and operational verification",
    ],
    subServices: [
      {
        title: "Pre-Installation Planning",
        description: "Site visits and reviews to verify structural, electrical, and technical requirements before delivery.",
      },
      {
        title: "Rigging & Delivery",
        description: "Specialist logistics and careful handling of sensitive medical and industrial electronics.",
      },
      {
        title: "OEM Calibration & Sign-Off",
        description: "Comprehensive commissioning tests according to manufacturer and Australian compliance standards.",
      },
      {
        title: "Planning, Commissioning & Disposal",
        description: "Comprehensive support throughout the equipment lifecycle, from initial planning and installation, ongoing maintenance and safe decommissioning.",
      },
    ],
    image: "/images/client/imaging-suite.webp",
    imageAlt: "Medical imaging suite installation and commissioning",
    metaTitle: "Medical Equipment Installation & Commissioning | AusinX",
    metaDescription: "Professional installation and commissioning for medical and industrial equipment across Australia. Specialised in medical imaging and industrial equipment.",
  },
  {
    slug: "parts-logistics",
    navTitle: "Parts & Logistics",
    contactValue: "Parts & Logistics",
    title: "Parts Supply & Logistics",
    shortSummary: "Rapid sourcing, warehousing, and expedited delivery of genuine OEM components, high-wear consumables, and replacement boards.",
    fullDescription: "Minimising hospital equipment downtime requires parts when you need them. AusinX manages a curated inventory of clinical components, boards, sensors, and cables, partnered with priority couriers for urgent breakdown callouts.",
    keyHighlights: [
      "Access to OEM-certified components and replacement sub-assemblies",
      "Expedited shipping options for urgent hospital breakdowns",
      "Inventory traceability and serial tracking",
      "Warehousing and local stockholding in Australia",
    ],
    subServices: [
      {
        title: "Urgent Breakdown Supply",
        description: "Rapid parts dispatch to get critical diagnostic or treatment systems back online without delay.",
      },
      {
        title: "Scheduled Consumable Restocking",
        description: "Predictable, recurring supply for high-turnover accessories, filters, electrodes, and probes.",
      },
    ],
    image: "/images/client/parts-no-faces.webp",
    imageAlt: "AusinX parts warehouse with organized shelving and components",
    metaTitle: "Medical Spare Parts & Logistics Supply | AusinX Solutions",
    metaDescription: "Dependable supply and express logistics for genuine medical equipment parts across Australia.",
  },
  {
    slug: "calibration",
    navTitle: "Calibration & Safety QA",
    contactValue: "Calibration & Safety QA",
    title: "Calibration & Precision Testing",
    shortSummary: "NATA-traceable calibration, electrical safety testing to AS/NZS 3551, and diagnostic image quality assurance for regulatory compliance.",
    fullDescription: "Accurate clinical diagnoses and therapeutic delivery rely on precision calibration. AusinX conducts electrical safety testing, radiation leakage audits, dose verification, and transducer quality checks with documented compliance certificates.",
    keyHighlights: [
      "Electrical safety audits compliant with AS/NZS 3551 standards",
      "Traceable test instrumentation and calibrated phantoms",
      "Comprehensive compliance reports for accreditation audits",
      "Scheduled annual and biannual calibration contracts",
    ],
    subServices: [
      {
        title: "AS/NZS 3551 Safety Checks",
        description: "Mandatory routine electrical safety testing of patient-connected equipment.",
      },
      {
        title: "Transducer & Probe Testing",
        description: "Ultrasound probe acoustic and electronic verification using standardized tissue-mimicking phantoms.",
      },
    ],
    image: "/images/client/calibration-new.webp",
    imageAlt: "Precision calibration laboratory with measurement instruments",
    metaTitle: "Medical Equipment Calibration & AS/NZS 3551 Testing | AusinX",
    metaDescription: "Precision biomedical calibration, electrical safety testing, and compliance documentation by certified AusinX engineers.",
  },
];

