# AusinX Solutions – Staff Admin Guide

Welcome to the **AusinX Solutions Admin Portal** (`/admin`). This guide explains how authorized staff members can manage website content, review incoming customer enquiries, and update company settings.

---

## 1. How to Access the Admin Panel

1. Open your web browser and navigate to:  
   **`https://www.ausinx.com.au/admin/login`** (or `http://localhost:3000/admin/login` when testing locally).
2. Sign in with the private admin credentials provisioned for your account.
3. Click **Sign In to Admin Panel**.

*(Note: Admin accounts are managed dynamically in the Firebase Realtime Database under the `/user` node).*

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
- Select an existing service or click **Add service** to create one.
- Set its URL slug, navigation name, enquiry form name, title, short summary, and full description.
- Upload a JPG, PNG, or WebP image up to 8 MB, add accessible image text, and edit highlights or sub-service details.
- Click **Save & Publish Services**. Saved service changes appear on the home page, services pages, navigation, and enquiry form without a code change or Git push.
- The site automatically fits and crops uploaded images for mobile, tablet, and desktop layouts.

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
- **Image uploads:** Set `FIREBASE_STORAGE_BUCKET` in the server environment to the bucket name shown in Firebase Storage. The Firebase service account must have permission to create Storage objects. The image upload endpoint is private to signed-in admins; uploaded images are served to website visitors using their public download URL.

---

## 5. Contact & Support

For technical assistance with the portal or hosting updates, contact your development administrator.
