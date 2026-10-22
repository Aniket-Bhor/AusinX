# AusinX Solutions – Website Project Brief

> **For the AI agent:** Read this entire file before planning or writing code. It is the single source of truth for the project. Where something is marked **TBD**, do NOT invent it: use a clearly marked placeholder and list it in `TODO.md`. Use the copy in Section 7 verbatim (only fix typos); do not rewrite the client's wording unless asked.

---

## 1. Project Overview

| Item | Detail |
|---|---|
| Client | AusinX Solutions Pty Ltd |
| Location | 470 St Kilda Rd, Melbourne VIC 3004, Australia |
| Industry | Biomedical and industrial electronics equipment solutions |
| Ownership | Proudly Australian-owned and operated |
| Existing domain | www.ausinx.com.au (hosting with Ventra IP) |
| Core pillars | **Service · Installation · Parts · Calibration** |
| Audience | Healthcare organisations (hospital departments, clinical engineering, radiotherapy and imaging departments) and industrial B2B customers |
| Primary goal | Present AusinX's services credibly and generate B2B enquiries from medical professionals and healthcare organisations |
| Tone | Professional, trustworthy, clear, reliable, clinical-grade but approachable. Plain Australian English (organisation, colour, programme only where natural). |

### Business description
AusinX provides a full range of services for medical equipment, healthcare products and industrial products across the whole equipment lifecycle: planning, decommissioning, disposal, installation and commissioning, plus parts supply, service and calibration. Specialised in radiotherapy equipment and diagnostic equipment (CT/MRI).

### Website goals
1. Explain AusinX's services clearly to prospective customers.
2. Build trust with medical professionals and B2B healthcare buyers.
3. Make it simple to make an enquiry (contact form, phone, email).
4. Be simple and easy to navigate.
5. Be easy to extend later (Parts/Products, Blog, Partners).

---

## 2. Recommended Tech Stack (default)

- **Framework:** Next.js (App Router) + TypeScript
- **Styling/UI:** Tailwind CSS + shadcn/ui; icons via lucide-react; subtle animation via Framer Motion
- **CMS / basic admin panel:** Sanity (embedded Studio at `/studio`) so non-technical staff can edit content
- **Contact form:** Next.js server action or API route sending email via Resend (or Formspree as a fallback), with validation (zod) and spam protection (honeypot + rate limit; optionally Cloudflare Turnstile)
- **Hosting:** Vercel or Netlify, with the client's domain pointed via DNS
- **SEO:** Next.js metadata API, sitemap.xml, robots.txt, Open Graph tags, JSON-LD (`LocalBusiness`/`Organization`)

> **Alternative:** If the client must use their existing Ventra IP cPanel hosting, switch to a custom **WordPress theme** with the same sitemap and design. Do not change stack without being asked. Flag it in the plan instead.

---

## 3. Sitemap and Navigation

```
Header nav:  Home | Services ▾ | About Us | Contact Us
                      ├─ Service & Maintenance
                      ├─ Installation & Commissioning
                      ├─ Parts & Logistics
                      └─ Calibration
Footer:      logo, short blurb, quick links, contact details, Privacy Policy, © AusinX Solutions Pty Ltd
```

**Phase 1 (build now):** Home, Services overview, 4 service detail pages (or one Services page with 4 anchored sections: decide in the plan and justify), About Us, Contact Us, Privacy Policy.

**Phase 2 (architect for it, but do NOT build or show in nav yet):** Parts / Products tab, Blog, Partners section. Create the CMS schemas and routes behind a feature flag (`NEXT_PUBLIC_ENABLE_BLOG`, etc.) so they can be switched on later without refactoring.

Navigation must be sticky, with a dropdown for Services on desktop and a clean hamburger menu on mobile. A clear "Contact Us" call-to-action button belongs in the header.

---

## 4. Design Direction

- **Style:** Modern, clean, minimal, professional healthcare/medical-technology. Lots of white space, strong typography, high-quality equipment photography, subtle scroll and hover interactions (the client specifically liked "home page interaction" and "pictures" on their references).
- **References (study layout and feel, do not copy code, text or assets):**
  - https://mediquip.com.au/
  - https://www.kcare.com.au/about-us
  - https://www.oncologysystems.com/about-us/
  - https://techimac.com.au/
- **Brand colours (LOCKED, taken from the supplied logo; do not use any other palette):**
  - Primary dark: charcoal navy `#1A2A3A` (headings, header, footer, dark sections)
  - Accent: amber/gold `#F8B800` (CTAs, highlights, icons). Hover state `#E0A400`. Never use amber for small body text on white (fails contrast); use it as a fill with dark text on top.
  - Neutrals: `#0F172A` (body text), `#475569` (muted text), `#F1F5F9` (section backgrounds), `#FFFFFF`
  - Expose these as CSS variables / Tailwind theme tokens. Check WCAG AA contrast for every text/background pair.
- **Logo notes:** `/assets/Logo.png` is a circular badge (gear ring, hard-hat engineer with wrench, "AX" monogram with circuit line, text "ENGINEERING SOLUTIONS"). It has a solid WHITE background (not transparent), so place it on white or light surfaces, or create a transparent/SVG version if possible. The logo reads "AX Engineering Solutions" while the company name is "AusinX Solutions Pty Ltd": use the logo as supplied, put the full company name as text beside it in the header, and add "confirm logo/name wording with client" to `TODO.md`. Design the look around the logo: industrial-engineering confidence plus healthcare cleanliness (lots of white, navy for trust, amber as the single accent).
- **Typography:** Client has no preference. Suggest a clean sans pair via `next/font` (e.g. *Inter* for body and *Plus Jakarta Sans* or *Manrope* for headings).
- **Imagery:** Equipment pictures are important (hero and service sections). Client has not supplied service images: use clearly named placeholders in `/public/images/placeholders/` and list needed photos in `TODO.md`. Never hotlink or embed copyrighted manufacturer images.
- **Dislikes:** Not specified. Avoid clutter, stock-photo cliché overload, dense walls of text, autoplaying video and carousels that hide key content.
- **Tagline:** Client wants a tagline (with equipment pictures) but has not supplied one. Propose 3 options in the plan and use a placeholder meanwhile. Example directions: "Keeping essential equipment running." / "Service. Installation. Parts. Calibration." / "Your partner across the equipment lifecycle."
- **Accessibility and quality:** WCAG 2.1 AA contrast, keyboard navigable, semantic HTML, alt text on all images, responsive from 360px to 1920px, Lighthouse target ≥ 90 on Performance, Accessibility, Best Practices and SEO.

---

## 5. Page Requirements

### 5.1 Home
1. **Hero:** headline, tagline, short supporting line, primary CTA ("Contact Us" / "Request Support") and secondary CTA ("Our Services"). Equipment imagery.
2. **Intro / who we are:** from Section 7.1 (first paragraphs).
3. **Core Pillars:** four cards (Service, Installation, Parts, Calibration) linking to their service pages. Text in Section 7.2.
4. **Why Healthcare Teams Choose AusinX:** four points, Section 7.1.
5. **Lifecycle strip (optional visual):** Planning → Installation & Commissioning → Service & Calibration → Parts & Logistics → Decommissioning & Disposal.
6. **Final CTA band** with phone and email.
7. *(Phase 2 placeholder, hidden)* Partners logo strip.

### 5.2 Services
Overview page introducing the four pillars, plus a detail section/page for each (Section 7.3). Each has a heading, description, bullet list of sub-services, a relevant image and a "Make an enquiry" CTA. **No pricing displayed.**

### 5.3 About Us
Company story, Australian-owned and operated, lifecycle approach, reliability and service-first values, the "Why choose AusinX" points, and a CTA. Team section hidden/optional (client has not supplied team photos or certificates). Use Section 7.1 copy.

### 5.4 Contact Us
- Contact form: Name, Organisation, Email, Phone, Service of interest (dropdown: Service & Maintenance / Installation & Commissioning / Parts & Logistics / Calibration / Other), Message, consent checkbox. Validation, success and error states, spam protection.
- Contact details panel (Section 6).
- Embedded Google Map for the address (use an embed from the address; client did not provide a link).
- Business hours: 9:00 AM – 5:00 PM.
- Reference for layout: https://mediquip.com.au/contact/

### 5.5 Privacy Policy
Create a sensible placeholder Australian privacy policy page (mark as "draft, to be reviewed by the client"). Footer link on every page. Include a short cookie/analytics note if analytics is added.

### 5.6 Phase 2 (hidden behind feature flags)
- **Blog:** listing page, post page, categories, author, featured image. The client has no initial topics yet ("plan to add later").
- **Parts / Products:** simple listing with enquiry CTA (no e-commerce, no pricing).
- **Partners:** logos and descriptions section.

---

## 6. Contact and Company Details

| Item | Value |
|---|---|
| Legal name | AusinX Solutions Pty Ltd |
| Address | 470 St Kilda Rd, Melbourne VIC 3004 |
| Public email | support@ausinx.com.au |
| Phones | 0421 081 256 · 0494 730 478 · 0470 525 997 |
| Hours | 09:00 AM – 5:00 PM |
| WhatsApp | Not provided: leave out |
| Social links | Not provided: leave out (footer icons hidden until supplied) |
| ABN | TBD: placeholder in footer |
| Google Maps link | Not provided: embed using the address |
| **Enquiry recipient email** | **TBD.** Likely support@ausinx.com.au. Read from env var `CONTACT_TO_EMAIL`. Never hard-code or expose personal emails on the site. |

Make phone numbers `tel:` links and the email a `mailto:` link. Add Schema.org `LocalBusiness` JSON-LD using these details.

---

## 7. Content (use verbatim, fix typos only)

### 7.1 Company / About copy
AusinX is a proudly Australian-owned and operated company providing a full range of services for medical equipment, healthcare products and industrial products. We support organisations across the entire equipment lifecycle, from the first planning conversation through to safe, compliant disposal.

Our team delivers complete, end-to-end solutions: planning, decommissioning, disposal, installation and commissioning. Whether you are fitting out a new clinical space, upgrading ageing technology or retiring equipment at end of life, we manage the detail so your teams can stay focused on patient care.

We are committed to reliable parts supply, dependable logistics and exceptional service for the healthcare sector. We understand that downtime in a clinical and industrial environment has real consequences, so we work to keep your equipment available, accurate and performing as it should.

**Why Healthcare Teams Choose AusinX**
- **Australian owned and operated**, with local accountability and a team that understands the Australian healthcare environment.
- **One partner across the lifecycle**, from planning through to decommissioning and disposal.
- **Reliability you can plan around**, with a focus on dependable parts supply and delivery.
- **A service-first approach**, built on clear communication and attention to detail.

### 7.2 Our Core Pillars
- **Service.** Responsive, skilled support that keeps essential equipment running and minimises disruption to clinical operations. Reduce downtime to hospital and clinical departments. Service and maintenance support: preventive maintenance, proactive analysis of equipment, remote support for quick response.
- **Installation.** Careful planning, installation and commissioning, delivered to a high standard and handed over ready for use. Specialised in radiotherapy equipment and diagnostic equipment (CT/MRI).
- **Parts.** Reliable parts supply and well-coordinated logistics, so the right components and equipment arrive when and where they are needed.
- **Calibration.** Precise, documented calibration support with accuracy, safety and confidence in your equipment's performance.

### 7.3 Service detail copy

**Service**
Responsive, skilled support that keeps essential equipment running and minimises disruption to clinical operations.
- **Preventive Maintenance:** Scheduled servicing designed to maximise the performance, reliability and lifespan of your equipment.
- **Service and Repairs:** Fast, responsive support that minimises downtime and keeps your systems running, so you can treat more patients.

**Installation**
Careful planning, installation and commissioning, delivered to a high standard.
- **Installation and Commissioning:** Expert engineers are assigned to complete every installation on schedule and in line with industry standards and compliance requirements.
- **Planning, Decommissioning and Disposal:** Support at both ends of the lifecycle, from the first plan to safe, compliant retirement of equipment.

**Parts**
Well-coordinated supply, so the right components and equipment arrive when and where they are needed.
- **Parts and Logistics:** Reliable sourcing and supply of equipment and parts delivered when and where your healthcare team needs them.

**Calibration**
Precise, documented calibration that supports the accuracy and safety of your equipment's performance.
- **Calibration:** Precise, documented calibration that supports the accuracy and safety of your equipment.

---

## 8. Admin Panel / CMS Requirements

- Basic, easy-to-use admin for the AusinX team (3 users) at `/studio` (or equivalent), with login.
- Editable without code: **Services** (title, summary, bullets, image), **Contact details** (phone, email, address, hours), **Home page sections**, **Blog posts** (title, slug, body, featured image, category, author, date; Phase 2), **Partners** (name, logo, link; Phase 2), **Site settings** (tagline, social links, SEO defaults).
- Seed the CMS with the content in Section 7 and Section 6 so the site works on first run.
- Provide a short `ADMIN_GUIDE.md` in plain English for non-technical staff.

---

## 9. Functional Requirements Checklist

- [ ] Responsive layout (mobile, tablet, desktop)
- [ ] Sticky header with Services dropdown and mobile menu
- [ ] Contact form with validation, spam protection and email delivery
- [ ] Embedded map and click-to-call/email links
- [ ] CMS-driven content with basic admin panel
- [ ] SEO: metadata, Open Graph, sitemap, robots, JSON-LD
- [ ] Image optimisation (`next/image`), fast loading
- [ ] Privacy policy page, accessible 404 page
- [ ] Feature flags for Blog / Products / Partners (hidden for launch)
- [ ] Optional analytics (Google Analytics 4 / Plausible) via env var, off by default

**Out of scope:** pricing display, e-commerce/checkout, user accounts, multi-language, live chat.

---

## 10. Deployment and Handover

- Client already owns **ausinx.com.au** and has hosting with **Ventra IP**. Confirm hosting type before deploying. If using Vercel/Netlify, provide clear DNS instructions (A/CNAME records) and keep email (MX) records untouched.
- Provide: `README.md` (setup, env vars, run, build, deploy), `.env.example`, `ADMIN_GUIDE.md`, `TODO.md`.
- Deliver a staging URL for client approval before pointing the live domain.

---

## 11. Assets and Inputs Needed (track in `TODO.md`)

| Item | Status |
|---|---|
| Logo (client Google Drive link) | Done: `/assets/Logo.png` (white background; ask the client for an SVG/transparent version) |
| Brand colours | Locked from logo (navy `#1A2A3A` + amber `#F8B800`); fonts suggested, client to approve |
| Tagline | Not provided: 3 options to propose |
| Equipment and service photos | Not provided: use placeholders |
| Enquiry recipient email | TBD |
| ABN | TBD |
| Social media links | Not provided |
| Privacy policy text | Draft needed, client to review |
| Partner details | Future |
| Blog topics/content | Future |

---

## 12. Working Rules for the Agent

1. **Plan first.** Produce an implementation plan (stack, file structure, page list, component list, CMS schemas) and wait for approval before coding.
2. Build in this order: project setup and design tokens → global layout (header/footer/nav) → Home → Services → About → Contact → Privacy → CMS and seed data → SEO → polish and QA.
3. Verify each page in the browser at mobile and desktop widths, and report any issues found.
4. Keep components reusable and typed. No lorem ipsum in final pages: use the client's copy or a clearly marked placeholder.
5. Never fabricate certifications, accreditations, client names, statistics, testimonials or partner names. If a claim is not in this brief, leave it out.
6. Do not copy text, images or code from the reference websites.
7. After each phase, summarise what was done and what is still TBD.

8. **Be efficient with commands.** Do not run Python or ad-hoc scripts for simple tasks. Use the Node/npm toolchain only (npm, npx, next, git). Batch related commands together and avoid unnecessary terminal calls, installs or repeated checks. Do not ask for review on read-only commands (ls, cat, git status).
9. **End every response with a SHORT SUMMARY** (max 6 bullets): what was done, what files changed, what is pending or needs my decision. Nothing longer.
