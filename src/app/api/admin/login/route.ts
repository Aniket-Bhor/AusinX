import { NextResponse } from "next/server";
import { signSession, isAllowedStaffEmail, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/admin-auth";

const STAFF_DIRECTORY: Record<string, { name: string; role: string }> = {
  "sudhirnalawade2003@gmail.com": {
    name: "Sudhir Nalawade",
    role: "Director / Engineering Lead",
  },
  "shibu.madhavan1977@gmail.com": {
    name: "Shibu Madhavan",
    role: "Director / Operations Lead",
  },
  "bhagawangorade@gmail.com": {
    name: "Bhagwan Gorade",
    role: "Director / Technical Lead",
  },
};

// Default staff access password (can be overridden via ADMIN_PASSWORD env var)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "AusinX#Admin2026!";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Please enter both email and password." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    if (!isAllowedStaffEmail(cleanEmail)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Access restricted to authorized AusinX staff members (Sudhir, Shibu, Bhagwan).",
        },
        { status: 403 }
      );
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid staff password. Please check your credentials.",
        },
        { status: 401 }
      );
    }

    const staffInfo = STAFF_DIRECTORY[cleanEmail] || {
      name: "AusinX Staff",
      role: "Staff Member",
    };

    const token = signSession({
      email: cleanEmail,
      name: staffInfo.name,
      role: staffInfo.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        email: cleanEmail,
        name: staffInfo.name,
        role: staffInfo.role,
      },
    });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[Admin Login] Error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication system error." },
      { status: 500 }
    );
  }
}
