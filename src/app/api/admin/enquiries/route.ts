import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { getAdminDb } from "@/lib/firebase-admin";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getAdminDb();
  if (!db) {
    return NextResponse.json(
      { error: "Firebase Realtime Database is not configured." },
      { status: 500 }
    );
  }

  try {
    const snapshot = await db.ref("enquiries").once("value");
    const val = snapshot.val();
    if (!val) {
      return NextResponse.json({ enquiries: [] });
    }

    const enquiries = Object.keys(val).map((key) => ({
      id: key,
      ...val[key],
    }));

    // Sort newest first
    enquiries.sort(
      (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
    );

    return NextResponse.json({ enquiries });
  } catch (error) {
    console.error("[Admin Enquiries] Error fetching enquiries:", error);
    return NextResponse.json(
      { error: "Failed to load enquiries from database." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getAdminDb();
  if (!db) {
    return NextResponse.json(
      { error: "Firebase Realtime Database is not configured." },
      { status: 500 }
    );
  }

  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing enquiry id or status." },
        { status: 400 }
      );
    }

    await db.ref(`enquiries/${id}`).update({
      status,
      updatedBy: admin.email,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, id, status });
  } catch (error) {
    console.error("[Admin Enquiries] Error updating enquiry:", error);
    return NextResponse.json(
      { error: "Failed to update enquiry status." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getAdminDb();
  if (!db) {
    return NextResponse.json(
      { error: "Firebase Realtime Database is not configured." },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing enquiry id." }, { status: 400 });
    }

    await db.ref(`enquiries/${id}`).remove();
    return NextResponse.json({ success: true, message: "Enquiry deleted." });
  } catch (error) {
    console.error("[Admin Enquiries] Error deleting enquiry:", error);
    return NextResponse.json(
      { error: "Failed to delete enquiry." },
      { status: 500 }
    );
  }
}
