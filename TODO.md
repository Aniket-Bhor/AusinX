# AusinX Solutions - Project TODOs & Client Review Items

This document tracks items requiring client review, decisions, assets, and licensing information.

---

## 1. Client Review Items (Marked TODO(client-review))

| Item | Context | Status / Value | Action Required |
|---|---|---|---|
| **Tagline** | Hero & Site Identity | `TODO(client-review): "Keeping Essential Clinical & Industrial Systems Running."` | Client to select preferred option (Option 1: Precision Support Across the Healthcare Equipment Lifecycle; Option 2: Keeping Essential Clinical & Industrial Systems Running; Option 3: Service · Installation · Parts · Calibration). |
| **Hero Supporting Line** | Hero Section | `TODO(client-review): "End-to-end engineering, maintenance, and compliance support for radiotherapy, diagnostic imaging, and critical biomedical systems across Australia."` | Client to confirm if scope wording matches service commitments. |
| **ABN** | Global Footer | `TODO(client-review): ABN: XX XXX XXX XXX` | Client to provide their registered Australian Business Number. Currently hidden placeholder. |
| **Logo Artwork vs. Name** | Header Brand Title | Logo reads *"AX ENGINEERING SOLUTIONS"*; Company is *"AusinX Solutions Pty Ltd"*. | Client to confirm if new transparent SVG/PNG logo will be provided and whether "AX Engineering Solutions" or "AusinX Solutions" should be primary badge text. |
| **Privacy Policy** | `/privacy` | Draft based on Australian Privacy Principles (APPs). | Client legal/management review before public launch. |
| **Enquiry Recipient Email** | Contact Form | Default `support@ausinx.com.au` via `CONTACT_TO_EMAIL`. | Confirm whether enquiries route to `support@ausinx.com.au` or forward to founders' inboxes. Personal Gmails are not displayed publicly. |
| **Social Media Links** | Global Footer | Hidden placeholders. | Client to provide LinkedIn/Facebook company page URLs when created. |

---

## 2. Image Licensing & Asset Registry

All placeholder images are generated high-resolution clinical representations to demonstrate layout and visual aesthetics without infringing any copyrighted equipment manufacturer assets.

| Filename | Location | Description | Source / Licence | Status |
|---|---|---|---|---|
| `logo.png` | `/public/images/logo.png` | Circular AusinX / AX Engineering Solutions badge | Client supplied (`/assets/Logo.png`). Proprietary to AusinX Solutions Pty Ltd. | In use (solid white background). Recommend requesting SVG with transparent background. |
| `hero-equipment.jpg` | `/public/images/placeholders/hero-equipment.jpg` | High-tech hospital radiotherapy suite with linear accelerator and imaging bed | AI-Generated biomedical representation (Imagen 3). Non-exclusive project placeholder license. | `TODO(client-review)` - Replace with AusinX authentic facility/equipment photos when available. |
| `service-maintenance.jpg` | `/public/images/placeholders/service-maintenance.jpg` | Biomedical field engineer servicing medical diagnostic machine with digital multimeter | AI-Generated biomedical representation (Imagen 3). Non-exclusive project placeholder license. | `TODO(client-review)` - Replace with photos of AusinX engineers in the field. |
| `installation-commissioning.jpg` | `/public/images/placeholders/installation-commissioning.jpg` | Biomedical engineering team commissioning a large medical imaging gantry | AI-Generated biomedical representation (Imagen 3). Non-exclusive project placeholder license. | `TODO(client-review)` - Replace with AusinX on-site installation photos. |
| `parts-logistics.jpg` | `/public/images/placeholders/parts-logistics.jpg` | Clean clinical medical electronics components warehouse with logistics technician | AI-Generated biomedical representation (Imagen 3). Non-exclusive project placeholder license. | `TODO(client-review)` - Replace with AusinX inventory/parts storage facility photos. |
| `calibration.jpg` | `/public/images/placeholders/calibration.jpg` | Calibration engineer conducting precision oscilloscope and multimeter testing on biomedical board | AI-Generated biomedical representation (Imagen 3). Non-exclusive project placeholder license. | `TODO(client-review)` - Replace with AusinX calibration lab or test bench photos. |

---

## 3. Hosting & Deployment Notes

- Client domain: `www.ausinx.com.au` currently hosted on **Ventra IP**.
- Staging and SSR production recommended on **Vercel** or **Netlify**.
- Domain connection: Point A/CNAME DNS records to Vercel upon client sign-off, preserving MX records for email.
