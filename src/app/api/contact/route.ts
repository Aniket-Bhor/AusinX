import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminDb } from "@/lib/firebase-admin";

const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),
  organisation: z
    .string()
    .min(2, "Organisation must be at least 2 characters")
    .max(150, "Organisation name is too long"),
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(150, "Email is too long"),
  phone: z
    .string()
    .min(6, "Please provide a valid contact phone number")
    .max(30, "Phone number is too long"),
  serviceInterest: z.string().min(1, "Please select a service"),
  message: z
    .string()
    .min(5, "Message must be at least 5 characters")
    .max(3000, "Message cannot exceed 3,000 characters"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to being contacted regarding this enquiry.",
  }),
  websiteHoneypot: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();

    // 1. Validate with Zod
    const validationResult = contactSchema.safeParse(json);
    if (!validationResult.success) {
      const firstIssue = validationResult.error.issues?.[0];
      const errorMessage = firstIssue?.message || "Invalid input data";
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 2. Honeypot check (anti-spam)
    if (data.websiteHoneypot && data.websiteHoneypot.trim().length > 0) {
      // Silently discard spam submission while reporting success to bots
      return NextResponse.json({
        success: true,
        message: "Enquiry received successfully.",
      });
    }

    const enquiryRecord = {
      fullName: data.fullName.trim(),
      organisation: data.organisation.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      serviceInterest: data.serviceInterest,
      message: data.message.trim(),
      createdAt: new Date().toISOString(),
      timestamp: Date.now(),
      status: "new", // "new" | "in_review" | "contacted" | "archived"
    };

    // 3. Save to Firebase Realtime Database server-side
    const db = getAdminDb();
    let savedToFirebase = false;

    if (!db) {
      console.error("[Contact API] Firebase Admin DB not configured. Cannot save enquiry.");
      return NextResponse.json(
        {
          success: false,
          error: "Enquiry service is temporarily unavailable (database not configured). Please call us directly.",
        },
        { status: 503 }
      );
    }

    try {
      const enquiriesRef = db.ref("enquiries");
      const newRef = enquiriesRef.push();
      await newRef.set({
        id: newRef.key,
        ...enquiryRecord,
      });
      savedToFirebase = true;
    } catch (dbError) {
      console.error("[Contact API] Failed to write to Firebase RTDB:", dbError);
      return NextResponse.json(
        {
          success: false,
          error: "Unable to save your enquiry to the database. Please try again or call us directly.",
        },
        { status: 500 }
      );
    }

    // 4. Optional Resend Email Dispatch (silent skip if no key)
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail =
      process.env.CONTACT_NOTIFICATION_EMAIL ||
      process.env.CONTACT_TO_EMAIL ||
      "support@ausinx.com.au";

    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "AusinX Website <notifications@ausinx.com.au>",
            to: recipientEmail,
            reply_to: data.email,
            subject: `[AusinX Enquiry] New request from ${data.fullName} (${data.organisation})`,
            text: `New Service Enquiry received from AusinX Website:\n\nName: ${data.fullName}\nOrganisation: ${data.organisation}\nEmail: ${data.email}\nPhone: ${data.phone}\nService of Interest: ${data.serviceInterest}\n\nMessage:\n${data.message}\n\nSubmitted at: ${enquiryRecord.createdAt}`,
          }),
        });
      } catch (emailError) {
        // Silently skip email delivery errors as per decisions
        console.warn("[Contact API] Optional email dispatch skipped or failed:", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      savedToFirebase,
      message: "Enquiry received successfully. Our engineering team will be in touch shortly.",
    });
  } catch (error) {
    console.error("[Contact API] Error handling contact form submission:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your enquiry. Please try calling us directly.",
      },
      { status: 500 }
    );
  }
}
