import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { getAdminDb } from "@/lib/firebase-admin";
import {
  deleteLocalEnquiry,
  getLocalEnquiries,
  updateLocalEnquiryStatus,
} from "@/lib/local-storage";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getAdminDb();
  if (!db) {
    // If Firebase DB is not configured, load from local persistent store
    const localList = getLocalEnquiries();
    localList.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    return NextResponse.json({ enquiries: localList });
  }

  try {
    const snapshot = await db.ref("enquiries").once("value");
    const val = snapshot.val();
    const localList = getLocalEnquiries();

    const firebaseList = val
      ? Object.keys(val).map((key) => ({ id: key, ...val[key] }))
      : [];

    // Merge and deduplicate by ID
    const mergedMap = new Map<string, any>();
    localList.forEach((item) => mergedMap.set(item.id, item));
    firebaseList.forEach((item) => mergedMap.set(item.id, item));

    const enquiries = Array.from(mergedMap.values());
    enquiries.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    return NextResponse.json({ enquiries });
  } catch (error) {
    console.error("[Admin Enquiries] Error fetching enquiries from Firebase, falling back to local:", error);
    const localList = getLocalEnquiries();
    localList.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    return NextResponse.json({ enquiries: localList });
  }
}

export async function PATCH(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await request.json();
  if (!id || !status) {
    return NextResponse.json(
      { error: "Missing enquiry id or status." },
      { status: 400 }
    );
  }

  // Update in local store
  updateLocalEnquiryStatus(id, status, admin.email);

  const db = getAdminDb();
  if (db) {
    try {
      await db.ref(`enquiries/${id}`).update({
        status,
        updatedBy: admin.email,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("[Admin Enquiries] Error updating enquiry in Firebase:", error);
    }
  }

  return NextResponse.json({ success: true, id, status });
}

export async function DELETE(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing enquiry id." }, { status: 400 });
  }

  // Delete from local store
  deleteLocalEnquiry(id);

  const db = getAdminDb();
  if (db) {
    try {
      await db.ref(`enquiries/${id}`).remove();
    } catch (error) {
      console.error("[Admin Enquiries] Error deleting enquiry from Firebase:", error);
    }
  }

  return NextResponse.json({ success: true, message: "Enquiry deleted." });
}
