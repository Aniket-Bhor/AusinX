# AusinX Solutions Pty Ltd - Corporate Website & Admin Portal

> High-performance corporate website and content management portal for **AusinX Solutions Pty Ltd**, a Melbourne-based biomedical and industrial engineering service provider specializing in radiotherapy, diagnostic imaging, and critical clinical infrastructure support.

---

## 1. Project Overview & Architecture

This project is built with **Next.js 16 (App Router with Turbopack)**, **React 19**, and **Tailwind CSS**. It couples high-performance static rendering and partial prerendering (PPR) for public pages with a dynamic, authenticated **Firebase Realtime Database** backend and staff management console.

### Key Architecture Highlights
- **Public Website**: Static generation with Next.js 16 caching (`'use cache'`) ensuring ultra-fast loads (sub-100ms TTFB) and zero database egress on regular visitor hits.
- **Fail-Safe Content Layer**: Content is fetched dynamically from Firebase RTDB with automatic zero-latency fallback to `src/lib/content.ts` if the database is unreachable or network is offline.
- **Staff Admin Portal (`/admin`)**: A lightweight, authenticated control center for AusinX leadership (Sudhir Nalawade, Shibu Madhavan, Bhagwan Gorade) to manage enquiries and edit service copy, site settings, and home hero text.
- **Enquiry Pipeline**: Server-validated via Zod, protected with an invisible anti-spam honeypot, saved directly to Firebase RTDB `/enquiries`, and optionally dispatched via Resend email.
- **Security by Design**: Zero public secrets in code or git. Public read rules for content; strict authentication required for writes and enquiries access.

---

## 2. Tech Stack

- **Framework**: Next.js 16.4.2 (App Router, Turbopack, Cache Components)
- **Language**: TypeScript 5
- **UI & Styling**: React 19, Tailwind CSS, Lucide React icons
- **Backend / Database**: Google Firebase Realtime Database
- **Server SDK**: `firebase-admin` (Node.js Admin SDK)
- **Validation**: Zod
- **Typography & Assets**: `next/font` (Google Fonts Inter), optimized WebP image pipeline
- **SEO & Schema**: Schema.org `LocalBusiness` / `MedicalBusiness` JSON-LD, dynamic `sitemap.xml`, and `robots.txt`

---

## 3. Directory Structure

```text
├── public/
│   ├── images/
│   │   ├── logo.png                       # AusinX company emblem
│   │   └── placeholders/*.webp            # Compressed WebP biomedical service imagery (<170KB)
│   ├── favicon.ico
│   └── site.webmanifest
├── scripts/
│   └── seed-firebase.mjs                  # Script to seed RTDB with baseline content & staff accounts
├── src/
│   ├── app/
│   │   ├── about/                         # Company history, directors, 5-stage lifecycle
│   │   ├── admin/                         # Staff admin dashboard & enquiries inbox
│   │   │   └── login/                     # Secure staff authentication portal
│   │   ├── api/
│   │   │   ├── admin/                     # Auth session, enquiries triage, content update APIs
│   │   │   └── contact/                   # Public form endpoint (Zod validation + RTDB write)
│   │   ├── contact/                       # Contact page, map embed, service preselect form
│   │   ├── privacy/                       # Australian Privacy Principles (APPs) policy
│   │   ├── services/                      # Services overview
│   │   │   └── [slug]/                    # 4 pillar detail pages (dynamic SSG)
│   │   ├── layout.tsx                     # Global RootLayout with JSON-LD schema
│   │   ├── page.tsx                       # Homepage (Hero, Pillars, Lifecycle, Why AusinX, CTA)
│   │   ├── robots.ts                      # Robots.txt directives (disallows /admin and /api)
│   │   └── sitemap.ts                     # XML sitemap generator
│   ├── components/
│   │   ├── home/                          # Hero, ServicesGrid, Lifecycle, WhyUs components
│   │   ├── layout/                        # Header, Footer, Navigation
│   │   └── seo/                           # Structured JSON-LD schemas
│   └── lib/
│       ├── admin-auth.ts                  # Cryptographic session cookie management (HMAC-SHA256)
│       ├── content.ts                     # Data access layer with RTDB + local fallback
│       └── firebase-admin.ts              # Firebase Admin SDK singleton initializer
├── ADMIN_GUIDE.md                         # Plain-English staff manual for directors
├── AUSINX_PROJECT_BRIEF.md                # Client project brief & requirements
├── firebase.rules.json                    # Firebase Realtime Database Security Rules
├── PROGRESS.md                            # Complete 8-phase execution log
├── TODO.md                                # Client review items & action registry
└── .env.example                           # Template for required environment variables
```

---

## 4. Environment Variables

Create a local `.env.local` file for development (strictly git-ignored). Required variables:

```bash
# Firebase Realtime Database URL
FIREBASE_DATABASE_URL=https://ausinx-default-rtdb.firebaseio.com

# Firebase Service Account Credentials (from Google Service Account JSON)
FIREBASE_PROJECT_ID=ausinx-default
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@ausinx-default.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgk...YOUR_KEY...\n-----END PRIVATE KEY-----\n"

# Security Secret for Admin Sessions (HMAC-SHA256 cookie signing)
# Generate a strong 32+ character random string: openssl rand -base64 32
ADMIN_SESSION_SECRET=your_long_random_session_secret_string_here

# Public Contact Routing
CONTACT_TO_EMAIL=support@ausinx.com.au

# Optional: Resend API Key for Email Dispatch (Leave blank to store in Firebase only)
RESEND_API_KEY=
RESEND_FROM_EMAIL=
```

> **IMPORTANT**: In production (Vercel/Netlify), ensure the private key preserves the `\n` newline characters wrapped in double quotes.

---

## 5. Local Setup & Development

### 1. Clone & Install Dependencies
```bash
git clone <repo-url>
cd AusinX
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env.local` and populate your Firebase credentials:
```bash
cp .env.example .env.local
```

### 3. Seed Database (Optional / Initial Setup)
To populate Firebase Realtime Database with the default services, site settings, and initial staff director accounts:
```bash
node scripts/seed-firebase.mjs
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public site.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to view the staff portal.

### 5. Build & Test Production Bundle
```bash
npm run build
npm run start
```

---

## 6. Staff Admin Portal (`/admin`)

The portal allows directors to manage incoming enquiries and make live updates to site text without code redeployment.

- **URL**: `/admin/login`
- **Admin Login (Stored in Firebase RTDB `/user`)**:
  - **Login ID**: `ausinx@admin`
  - **Password**: `ausinx@2026`
- **Features**:
  - **Enquiries Inbox**: Real-time listing of customer submissions with contact info, requested service, urgency, and timestamp. Mark as `contacted`, `in-progress`, `resolved`, or delete spam.
  - **Services Editor**: Edit tagline, description, features list, and deliverables for each of the 4 service pillars.
  - **Site Settings**: Update public office address, phone numbers, and operating hours.
  - **Homepage Editor**: Adjust the hero badge, headline, and supporting copy.

For detailed staff instructions, see [`ADMIN_GUIDE.md`](./ADMIN_GUIDE.md).

---

## 7. Production Deployment & Hosting (Vercel)

The site is optimized for deployment on **Vercel** with Next.js 16 Turbopack.

### Step 1: Connect Repository to Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New Project** and import the AusinX Git repository.
3. Keep the default build settings (`Framework: Next.js`, `Build Command: npm run build`).

### Step 2: Add Environment Variables in Vercel
In the project settings under **Settings > Environment Variables**, add:
- `FIREBASE_DATABASE_URL`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` (ensure `\n` characters are properly preserved)
- `ADMIN_SESSION_SECRET`
- `CONTACT_TO_EMAIL` (e.g. `support@ausinx.com.au`)
- `RESEND_API_KEY` (if using email delivery)

### Step 3: Configure Custom Domain on Ventra IP
The AusinX domain (`ausinx.com.au` / `www.ausinx.com.au`) is registered with **Ventra IP**.

1. In Vercel, go to **Settings > Domains** and add `ausinx.com.au` and `www.ausinx.com.au`.
2. In the **Ventra IP cPanel / DNS Console**, add the following records:
   - **Apex Record (`@`)**: Type `A`, Host `@`, Value `76.76.21.21` (Vercel Anycast IP)
   - **WWW Record (`www`)**: Type `CNAME`, Host `www`, Value `cname.vercel-dns.com.`
3. ⚠️ **CRITICAL - PRESERVE EMAIL**: **Do not touch or delete the existing `MX`, `TXT` (SPF/DKIM), or mail-related DNS records** in Ventra IP. This ensures `support@ausinx.com.au` and corporate emails continue functioning uninterrupted.

---

## 8. Security & Compliance

- **Secrets**: No service account keys or passwords are committed to version control (`*firebase-adminsdk*.json` and `.env*` are in `.gitignore`).
- **Firebase Security Rules**: Stored in `firebase.rules.json`. Content nodes (`services`, `siteSettings`, etc.) are publicly readable by the frontend and write-protected to authenticated admins only. The `/enquiries` node is locked from public access.
- **Privacy Policy**: Drafted in compliance with the **Australian Privacy Principles (APPs)** under the *Privacy Act 1988* (Cth) on `/privacy`.
- **Public Contact**: Only `support@ausinx.com.au` and the Melbourne office phone numbers are exposed to the public. Founder personal emails are restricted to admin access.

---

## 9. License & Ownership

Proprietary software developed for **AusinX Solutions Pty Ltd** (Melbourne, Victoria, Australia). All rights reserved.
