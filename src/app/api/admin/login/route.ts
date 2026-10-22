import { NextResponse } from "next/server";
import { signSession, isAllowedStaffEmail, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/admin-auth";

const STAFF_DIRECTORY: Record<string, { name: string; role: string }> = {
  "asunix@admin": {
    name: "AusinX Administrator",
    role: "System Administrator",
  },
  "ausinx@admin": {
    name: "AusinX Administrator",
    role: "System Administrator",
  },
  "admin": {
    name: "AusinX Administrator",
    role: "System Administrator",
  },
  "sudhirnalawade2003@gmail.com": {
    name: "Sudhir Nalawade",
    role: "Director / Engineering Lead",
  },
  "sudhir.nalawade@ausinx.com.au": {
    name: "Sudhir Nalawade",
    role: "Director / Engineering Lead",
  },
  "sudhir@ausinx.com.au": {
    name: "Sudhir Nalawade",
    role: "Director / Engineering Lead",
  },
  "shibu.madhavan1977@gmail.com": {
    name: "Shibu Madhavan",
    role: "Director / Operations Lead",
  },
  "shibu.madhavan@ausinx.com.au": {
    name: "Shibu Madhavan",
    role: "Director / Operations Lead",
  },
  "shibu@ausinx.com.au": {
    name: "Shibu Madhavan",
    role: "Director / Operations Lead",
  },
  "bhagawangorade@gmail.com": {
    name: "Bhagwan Gorade",
    role: "Director / Technical Lead",
  },
  "bhagwan.gorade@ausinx.com.au": {
    name: "Bhagwan Gorade",
    role: "Director / Technical Lead",
  },
  "bhagwan@ausinx.com.au": {
    name: "Bhagwan Gorade",
    role: "Director / Technical Lead",
  },
};

const VALID_PASSWORDS = [
  "Ausnix@2026",
  "Ausinx@2026",
  "Asunix@2026",
  process.env.ADMIN_PASSWORD,
  "AusinX#Admin2026!",
  "AusinX2024!",
].filter(Boolean) as string[];

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

    if (!VALID_PASSWORDS.includes(password)) {
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
