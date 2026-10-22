# AusinX Solutions - Client Review Items & Owner Checklist

This document tracks all action items, decisions, and security tasks requiring the client or site owner's intervention before public launch.

---

## 1. Things Only the Owner Must Do (Technical Setup)

### A. Firebase Realtime Database Security Rules
Paste the exact rules from `firebase.rules.json` into the Firebase Console:
1. Go to [Firebase Console](https://console.firebase.google.com/) > Select Project **ausinx-default**.
2. Navigate to **Build > Realtime Database > Rules**.
3. Replace all rules with the following JSON and click **Publish**:
```json
{
  "rules": {
    "content": {
      ".read": true,
      ".write": "auth != null"
    },
    "staff": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "enquiries": {
      ".read": "auth != null",
      ".write": false
    }
  }
}
```
*Note: Public reads for `/content` are enabled so frontend visitors can see service descriptions. Writes require admin auth. The `/enquiries` node is write-locked to the public and readable only by authenticated staff (the contact form saves via the Firebase Admin SDK on the server, bypassing client write rules).*

### B. Firebase Authentication Setup (Admin Logins)
The `/admin` panel supports authentication for the 3 directors:
- `sudhir.nalawade@ausinx.com.au`
- `shibu.madhavan@ausinx.com.au`
- `bhagwan.gorade@ausinx.com.au`

**Steps**:
1. In Firebase Console, go to **Build > Authentication > Sign-in method**.
2. Enable the **Email/Password** provider (Email link passwordless can be left off).
3. In the **Users** tab, either ensure the 3 staff users exist with secure passwords, or note their passwords as initialized during the seed script.
4. Update the staff passwords as instructed in [`ADMIN_GUIDE.md`](./ADMIN_GUIDE.md).

### C. Vercel Hosting Dashboard Environment Variables
When deploying the repository to **Vercel** (or Netlify), add the following environment variables in **Project Settings > Environment Variables**:

| Variable Name | Required? | Source / Value |
|---|---|---|
| `FIREBASE_DATABASE_URL` | **Yes** | `https://ausinx-default-rtdb.firebaseio.com` |
| `FIREBASE_PROJECT_ID` | **Yes** | From your Firebase service account JSON (`ausinx-default`) |
| `FIREBASE_CLIENT_EMAIL` | **Yes** | From your Firebase service account JSON (`firebase-adminsdk-fbsvc@...`) |
| `FIREBASE_PRIVATE_KEY` | **Yes** | From your Firebase service account JSON (keep `\n` linebreaks intact, wrapped in quotes) |
| `ADMIN_SESSION_SECRET` | **Yes** | A random 32+ character string for HMAC-SHA256 session cookie signing |
| `CONTACT_TO_EMAIL` | **Yes** | `support@ausinx.com.au` |
| `RESEND_API_KEY` | *Optional* | Your Resend API key (e.g. `re_...`) if you want instant email alerts |
| `RESEND_FROM_EMAIL` | *Optional* | `enquiries@ausinx.com.au` (requires domain verified in Resend) |

### D. Ventra IP Domain DNS Configuration
The company domain `ausinx.com.au` is registered on **Ventra IP**. When ready to point the domain to Vercel:
1. In Vercel, navigate to **Settings > Domains** and add `ausinx.com.au` and `www.ausinx.com.au`.
2. In the **Ventra IP DNS Manager**, configure:
   - **Apex (`@`)**: `A` record pointing to `76.76.21.21` (Vercel Anycast)
   - **Subdomain (`www`)**: `CNAME` record pointing to `cname.vercel-dns.com.`
3. ⚠️ **DO NOT TOUCH EXISTING EMAIL RECORDS**: Keep all `MX` and `TXT` (SPF/DKIM/DMARC) records untouched so that `support@ausinx.com.au` and Microsoft 365 / Google Workspace email accounts continue operating without interruption.

---

## 2. Client Content Review Items (Marked TODO(client-review))

The following items are marked `TODO(client-review)` in the code and database:

| Item | Location | Current Value | Required Action |
|---|---|---|---|
| **Tagline Selection** | Hero & Site Identity | *"Keeping Essential Clinical & Industrial Systems Running."* | Confirm which of the 3 options is preferred (or provide a new one). |
| **Hero Supporting Copy** | Homepage Hero | *"End-to-end engineering, maintenance, and compliance support for radiotherapy, diagnostic imaging, and critical biomedical systems across Australia."* | Verify if scope covers all intended modalities. |
| **Registered ABN** | Global Footer | `TODO(client-review): ABN: XX XXX XXX XXX` (Currently hidden) | Provide the official registered Australian Business Number to display in the footer. |
| **Logo Artwork** | Site Header | Circular badge reads *"AX Engineering Solutions"* | Confirm if an updated transparent PNG or vector SVG logo with *"AusinX Solutions"* will be supplied. |
| **Privacy Policy** | `/privacy` | Complete Australian Privacy Principles (APPs) draft under *Privacy Act 1988* (Cth). | Client management/legal review and approval prior to launch. |
| **Social Media URLs** | Global Footer | Placeholders hidden | Provide corporate LinkedIn, Facebook, or Twitter/X URLs if active. |
| **After-Hours Urgent Contact** | Contact Page & Footer | Melbourne office line with prompt to contact support | Confirm if a dedicated 24/7 on-call triage phone number or pager service should be listed. |

---

## 3. Image Licensing & Asset Replacement Registry

All service and hero images currently use high-performance, compressed WebP biomedical representations (<170KB each) to demonstrate clean responsive layouts without copyright infringement.

| Filename | Web Location | Status | Action Required |
|---|---|---|---|
| `logo.png` | `/public/images/logo.png` | Active (White BG) | Replace with transparent SVG when provided. |
| `hero-equipment.webp` | `/public/images/placeholders/hero-equipment.webp` | Placeholder (77KB) | Replace with photo of AusinX linac or clinic partner facility. |
| `service-maintenance.webp` | `/public/images/placeholders/service-maintenance.webp` | Placeholder (139KB) | Replace with authentic photo of AusinX engineer servicing equipment. |
| `installation-commissioning.webp` | `/public/images/placeholders/installation-commissioning.webp` | Placeholder (138KB) | Replace with photo of AusinX gantry/machine installation. |
| `parts-logistics.webp` | `/public/images/placeholders/parts-logistics.webp` | Placeholder (165KB) | Replace with photo of AusinX spare parts inventory / cleanroom. |
| `calibration.webp` | `/public/images/placeholders/calibration.webp` | Placeholder (128KB) | Replace with photo of AusinX calibration test bench & tooling. |

---

## 4. Pre-Launch Verification Checklist

- [ ] Firebase Security Rules published in Firebase Console.
- [ ] Admin user accounts tested at `/admin/login`.
- [ ] Test enquiry submitted on `/contact` and verified in `/admin`.
- [ ] Environment variables configured in Vercel.
- [ ] DNS A and CNAME records pointed in Ventra IP (MX records preserved).
- [ ] SSL certificate auto-provisioned by Vercel.
- [ ] Client review items in Section 2 signed off.
