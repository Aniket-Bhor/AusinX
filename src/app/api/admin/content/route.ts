import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { getAdminDb } from "@/lib/firebase-admin";

export async function GET(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");

  const db = getAdminDb();
  if (!db) {
    return NextResponse.json(
      { error: "Firebase Realtime Database is not configured." },
      { status: 500 }
    );
  }

  try {
    const path = section ? `content/${section}` : "content";
    const snapshot = await db.ref(path).once("value");
    return NextResponse.json({ data: snapshot.val() });
  } catch (error) {
    console.error("[Admin Content] Error fetching content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content from database." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
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
    const { section, data } = await request.json();

    if (!section || !data) {
      return NextResponse.json(
        { error: "Missing section or payload data." },
        { status: 400 }
      );
    }

    // Save to content/${section}
    await db.ref(`content/${section}`).set(data);

    // Also sync top-level node for compatibility
    await db.ref(section).set(data);

    // Record audit trail
    await db.ref(`auditLog`).push({
      action: "UPDATE_CONTENT",
      section,
      updatedBy: admin.email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: `Section '${section}' updated successfully.`,
    });
  } catch (error) {
    console.error("[Admin Content] Error saving content:", error);
    return NextResponse.json(
      { error: "Failed to save content to database." },
      { status: 500 }
    );
  }
}
