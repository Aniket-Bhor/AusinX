# AusinX Solutions – Staff Admin Guide

Welcome to the **AusinX Solutions Admin Portal** (`/admin`). This guide explains how authorized staff members can manage website content, review incoming customer enquiries, and update company settings.

---

## 1. How to Access the Admin Panel

1. Open your web browser and navigate to:  
   **`https://www.ausinx.com.au/admin/login`** (or `http://localhost:3000/admin/login` when testing locally).
2. Enter your authorized staff email address:
   - **Sudhir Nalawade:** `sudhirnalawade2003@gmail.com`
   - **Shibu Madhavan:** `Shibu.madhavan1977@gmail.com`
   - **Bhagwan Gorade:** `BHAGAWANGORADE@gmail.com`
3. Enter your default password:  
   **`AusinX#Admin2026!`** *(Note: You can override this password via the `ADMIN_PASSWORD` environment variable in your hosting dashboard).*
4. Click **Sign In to Admin Panel**.

---

## 2. Managing Customer Enquiries (Inbox)

Under the **Enquiries Inbox** tab:
- **View Submissions:** Every time a healthcare facility or hospital department submits the online contact form, it instantly appears in this inbox.
- **Client Details:** View the sender's full name, organisation, email address, phone number, chosen service of interest, and exact equipment message.
- **Workflow Statuses:**
  - **New:** Fresh enquiry waiting for review.
  - **In Review:** An engineer is evaluating the technical requirements or parts inventory.
  - **Contacted:** The client has been called or emailed with a formal quotation or service plan.
  - **Archived:** Completed or historical enquiry.
- **Direct Actions:** Click on any email or phone number to open your mail client or phone dialer immediately.
- **Delete:** Remove spam or test enquiries using the trash icon.

---

## 3. Editing Website Content

### 3.1 Services Editor
- Select any of the 4 core engineering pillars:
  1. *Service & Maintenance*
  2. *Installation & Commissioning*
  3. *Parts & Logistics*
  4. *Calibration*
- Update the display title, short summary (shown on cards and homepage), and full technical description.
- Edit individual sub-services (titles and descriptions).
- Click **Save Services to Firebase RTDB**. Changes sync live across the website.

### 3.2 Site Settings
- Update official company identity details:
  - Legal business name
  - Tagline
  - Public support email (`support@ausinx.com.au`)
  - Office address (470 St Kilda Rd, Melbourne)
  - Business operating hours
- Click **Save Site Settings**.

### 3.3 Home & Lifecycle Sections
- Edit the introductory company story.
- Refine the *Why Healthcare Teams Choose AusinX* points.
- Adjust the 5-stage *Equipment Lifecycle Integration* steps.
- Click **Save Home & Lifecycle Sections**.

---

## 4. Firebase Database Security & Backup

- **Realtime Database URL:** `https://ausinx-default-rtdb.firebaseio.com/`
- **Security Rules:** Configured in `firebase.rules.json`. Public users can read content, but only authenticated staff can write changes. Enquiries are private and only viewable by authorized staff.
- **Fallback Protection:** If Firebase is ever temporarily unreachable, the public website automatically falls back to the high-reliability built-in content in `src/lib/content.ts` so prospective healthcare clients never see a blank screen or broken page.

---

## 5. Contact & Support

For technical assistance with the portal or hosting updates, contact your development administrator.
