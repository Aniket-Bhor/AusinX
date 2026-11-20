# AusinX Solutions - Biomedical & Industrial Equipment Website

Official website and staff administration portal for **AusinX Solutions Pty Ltd**, providing full lifecycle engineering solutions, precision calibration, medical imaging maintenance (CT, C-Arms, X-Ray), and parts logistics across Australia.

---

## Tech Stack
- **Framework:** Next.js (App Router) & React
- **Styling:** Tailwind CSS v4 with semantic CSS variables
- **Backend / Database:** Firebase Admin SDK & Realtime Database (with offline local fallback in `.data/`)
- **Theme Engine:** Built-in dynamic 12-palette color system controllable from the Admin Panel

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and provide your Firebase credentials:
```bash
cp .env.example .env.local
```
Fill in the following variables in `.env.local`:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_DATABASE_URL`
- `FIREBASE_STORAGE_BUCKET` (optional, for image uploads)
- `ADMIN_DEFAULT_USERNAME` (optional, default `ausinx@admin`)
- `ADMIN_DEFAULT_PASSWORD` (optional, default `ausinx@2026`)

### 3. Seed Database Content & Admin Account
To populate the initial content and seed the default staff administrator:
```bash
npm run seed:firebase
npm run seed:user
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Admin Portal
- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Default Login ID:** `ausinx@admin`
- **Default Password:** `ausinx@2026` (or values configured in `.env.local`)
- **Capabilities:**
  - View, filter, and update customer contact enquiries
  - Manage services (titles, summaries, capabilities, highlights, images, and slugs)
  - Customize Site Settings (legal company name, public contact email, office address, phone lines)
  - Upload custom Brand Logo & Wordmark
  - Select from 12 live Color Palettes with instant server-rendered application and "Reset to Original"
  - Manage Homepage Hero metrics and lifecycle steps
