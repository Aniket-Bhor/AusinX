import fs from "fs";
import path from "path";
import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";


// Load .env.local variables manually if not in process.env
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      }
      process.env[key] = val.replace(/\\n/g, "\n");
    }
  });
}

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;
const databaseURL =
  process.env.FIREBASE_DATABASE_URL ||
  "https://ausinx-default-rtdb.firebaseio.com";

if (!projectId || !clientEmail || !privateKey) {
  console.error(
    "Error: Missing Firebase Admin credentials in .env.local. Check FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY."
  );
  process.exit(1);
}

const app =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        databaseURL,
      });

const db = getDatabase(app);


// Content Seed Data from Section 6 & 7
const seedData = {
  siteSettings: {
    companyName: "AusinX Solutions Pty Ltd",
    tagline: "Keeping Essential Clinical & Industrial Systems Running.",
    taglineReviewNote:
      "TODO(client-review): Tagline Option 2 currently active. Client to confirm preference between Option 1, Option 2, or Option 3.",
    heroSupportingText:
      "TODO(client-review): AusinX provides a full range of services for medical equipment, healthcare products and industrial products across the entire lifecycle.",
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
  },
  about: {
    intro: [
      "AusinX is a proudly Australian-owned and operated company providing a full range of services for medical equipment, healthcare products and industrial products. We support organisations across the entire equipment lifecycle, from the first planning conversation through to safe, compliant disposal.",
      "Our team delivers complete, end-to-end solutions: planning, decommissioning, disposal, installation and commissioning. Whether you are fitting out a new clinical space, upgrading ageing technology or retiring equipment at end of life, we manage the detail so your teams can stay focused on patient care.",
      "We are committed to reliable parts supply, dependable logistics and exceptional service for the healthcare sector. We understand that downtime in a clinical and industrial environment has real consequences, so we work to keep your equipment available, accurate and performing as it should.",
    ],
    whyChooseUs: [
      {
        title: "Australian owned and operated",
        description:
          "Local accountability and a team that understands the Australian healthcare environment.",
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
  },
  lifecycle: [
    {
      step: "01",
      title: "Planning & Sourcing",
      description:
        "Collaborative consultation and technical evaluation to align equipment specifications with clinical workflows and facility standards.",
    },
    {
      step: "02",
      title: "Installation & Commissioning",
      description:
        "Expert engineering installation delivered on schedule, compliant with strict Australian healthcare standards and ready for clinical use.",
    },
    {
      step: "03",
      title: "Service & Maintenance",
      description:
        "Scheduled preventive maintenance, proactive equipment analysis, and rapid emergency repairs to maximize clinical uptime.",
    },
    {
      step: "04",
      title: "Parts & Calibration",
      description:
        "Reliable component logistics paired with documented precision calibration for high diagnostic and therapeutic accuracy.",
    },
    {
      step: "05",
      title: "Decommissioning & Disposal",
      description:
        "Safe, environmentally responsible, and regulatory-compliant retirement and disposal of ageing or obsolete medical technology.",
    },
  ],
  services: [
    {
      slug: "service-maintenance",
      navTitle: "Service & Maintenance",
      contactValue: "Service & Maintenance",
      title: "Service & Maintenance Support",
      shortSummary:
        "Responsive, skilled support that keeps essential equipment running and minimises disruption to clinical operations. Reduce downtime to hospital and clinical departments.",
      fullDescription:
        "Responsive, skilled support that keeps essential equipment running and minimises disruption to clinical operations. Reduce downtime to hospital and clinical departments. Service and maintenance support: preventive maintenance, proactive analysis of equipment, remote support for quick response.",
      keyHighlights: [
        "Preventive maintenance scheduling",
        "Proactive analysis of equipment",
        "Remote support for rapid emergency triage",
        "Reduced clinical and departmental downtime",
      ],
      subServices: [
        {
          title: "Preventive Maintenance",
          description:
            "Scheduled servicing designed to maximise the performance, reliability and lifespan of your equipment.",
        },
        {
          title: "Service and Repairs",
          description:
            "Fast, responsive support that minimises downtime and keeps your systems running, so you can treat more patients.",
        },
      ],
      image: "/images/placeholders/service-maintenance.webp",
      imageAlt:
        "TODO(client-review): Biomedical engineer performing preventive maintenance testing on diagnostic equipment",
      metaTitle: "Biomedical Service & Maintenance Support | AusinX Solutions",
      metaDescription:
        "Responsive biomedical equipment service and preventive maintenance support for Australian hospitals, clinical departments, and diagnostic facilities.",
    },
    {
      slug: "installation-commissioning",
      navTitle: "Installation & Commissioning",
      contactValue: "Installation & Commissioning",
      title: "Installation & Commissioning",
      shortSummary:
        "Careful planning, installation and commissioning, delivered to a high standard and handed over ready for use. Specialised in radiotherapy equipment and diagnostic equipment (CT/MRI).",
      fullDescription:
        "Careful planning, installation and commissioning, delivered to a high standard and handed over ready for use. Specialised in radiotherapy equipment and diagnostic equipment (CT/MRI).",
      keyHighlights: [
        "Specialised in Radiotherapy equipment",
        "Diagnostic equipment expertise (CT/MRI)",
        "Strict compliance with Australian clinical standards",
        "Full lifecycle support from planning to disposal",
      ],
      subServices: [
        {
          title: "Installation and Commissioning",
          description:
            "Expert engineers are assigned to complete every installation on schedule and in line with industry standards and compliance requirements.",
        },
        {
          title: "Planning, Decommissioning and Disposal",
          description:
            "Support at both ends of the lifecycle, from the first plan to safe, compliant retirement of equipment.",
        },
      ],
      image: "/images/placeholders/installation-commissioning.webp",
      imageAlt:
        "TODO(client-review): Biomedical engineering team commissioning a large medical imaging gantry",
      metaTitle:
        "Installation & Commissioning | Radiotherapy & CT/MRI Specialists | AusinX Solutions",
      metaDescription:
        "Precision installation, commissioning, planning, and compliant decommissioning for radiotherapy equipment and diagnostic systems (CT/MRI) across Australia.",
    },
    {
      slug: "parts-logistics",
      navTitle: "Parts & Logistics",
      contactValue: "Parts & Logistics",
      title: "Parts Supply & Logistics",
      shortSummary:
        "Reliable parts supply and well-coordinated logistics, so the right components and equipment arrive when and where they are needed.",
      fullDescription:
        "Reliable parts supply and well-coordinated logistics, so the right components and equipment arrive when and where they are needed.",
      keyHighlights: [
        "Dependable sourcing for critical biomedical components",
        "Coordinated logistics ensuring on-time delivery",
        "Minimised delays for planned servicing and urgent repairs",
        "Dedicated supply chain support for healthcare facilities",
      ],
      subServices: [
        {
          title: "Parts and Logistics",
          description:
            "Reliable sourcing and supply of equipment and parts delivered when and where your healthcare team needs them.",
        },
      ],
      image: "/images/placeholders/parts-logistics.webp",
      imageAlt:
        "TODO(client-review): Medical parts storage and inventory logistics technician",
      metaTitle:
        "Medical Equipment Parts Supply & Logistics | AusinX Solutions",
      metaDescription:
        "Reliable biomedical parts sourcing and coordinated healthcare logistics to ensure critical components arrive on schedule when and where needed.",
    },
    {
      slug: "calibration",
      navTitle: "Calibration",
      contactValue: "Calibration",
      title: "Precision Calibration Support",
      shortSummary:
        "Precise, documented calibration support with accuracy, safety and confidence in your equipment's performance.",
      fullDescription:
        "Precise, documented calibration support with accuracy, safety and confidence in your equipment's performance.",
      keyHighlights: [
        "Documented precision verification protocols",
        "Confidence in diagnostic and clinical measurement accuracy",
        "Alignment with Australian healthcare safety guidelines",
        "Traceable quality records for compliance audits",
      ],
      subServices: [
        {
          title: "Calibration",
          description:
            "Precise, documented calibration that supports the accuracy and safety of your equipment.",
        },
      ],
      image: "/images/placeholders/calibration.webp",
      imageAlt:
        "TODO(client-review): Calibration specialist verifying biomedical electronics circuit with precision multimeter",
      metaTitle:
        "Biomedical Precision Calibration Services | AusinX Solutions",
      metaDescription:
        "Documented precision calibration support for medical and industrial electronics equipment, ensuring high clinical accuracy and safety compliance.",
    },
  ],
};

const staffMembers = [
  {
    name: "Sudhir Nalawade",
    email: "sudhirnalawade2003@gmail.com",
    role: "Director / Engineering Lead",
  },
  {
    name: "Shibu Madhavan",
    email: "Shibu.madhavan1977@gmail.com",
    role: "Director / Operations Lead",
  },
  {
    name: "Bhagwan Gorade",
    email: "BHAGAWANGORADE@gmail.com",
    role: "Director / Technical Lead",
  },
];

async function seedDatabase() {
  console.log("--> Connecting to Firebase Realtime Database at:", databaseURL);

  // 1. Seed Content Nodes
  const contentRef = db.ref("content");
  await contentRef.set(seedData);
  console.log("✓ Successfully seeded 'content' (siteSettings, about, lifecycle, services)");

  // 2. Also seed top-level nodes for convenience and security rules matching
  await db.ref("siteSettings").set(seedData.siteSettings);
  await db.ref("services").set(seedData.services);
  await db.ref("about").set(seedData.about);
  await db.ref("lifecycle").set(seedData.lifecycle);
  console.log("✓ Successfully synced top-level nodes (siteSettings, services, about, lifecycle)");

  // 3. Register Staff Profiles in Realtime Database under /staff
  console.log("--> Recording staff profiles for the 3 team members...");
  for (const staff of staffMembers) {
    const slug = staff.name.toLowerCase().replace(/[^a-z0-9]/g, "_");
    await db.ref(`staff/${slug}`).set({
      name: staff.name,
      email: staff.email,
      role: staff.role,
      active: true,
      updatedAt: new Date().toISOString(),
    });
    console.log(`  ✓ Registered staff member: ${staff.name} (${staff.email})`);
  }


  console.log("\n=======================================================");
  console.log("🎉 Firebase Database and Auth Seed Complete!");
  console.log("=======================================================");
  process.exit(0);
}

seedDatabase().catch((err) => {
  console.error("Fatal seed error:", err);
  process.exit(1);
});
