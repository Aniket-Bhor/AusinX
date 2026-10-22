import crypto from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "ausinx_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecretKey(): string {
  return (
    process.env.FIREBASE_PRIVATE_KEY ||
    process.env.ADMIN_SESSION_SECRET ||
    "ausinx-biomedical-engineering-secret-key-2026"
  );
}

export function signSession(payload: { email: string; name: string; role: string }): string {
  const data = JSON.stringify({ ...payload, iat: Date.now() });
  const hmac = crypto.createHmac("sha256", getSecretKey());
  hmac.update(data);
  const signature = hmac.digest("hex");
  return Buffer.from(`${data}.${signature}`).toString("base64url");
}

export function verifySession(token: string): { email: string; name: string; role: string } | null {
  try {
    const raw = Buffer.from(token, "base64url").toString("utf8");
    const lastDotIndex = raw.lastIndexOf(".");
    if (lastDotIndex === -1) return null;

    const data = raw.substring(0, lastDotIndex);
    const signature = raw.substring(lastDotIndex + 1);

    const hmac = crypto.createHmac("sha256", getSecretKey());
    hmac.update(data);
    const expectedSignature = hmac.digest("hex");

    if (
      crypto.timingSafeEqual(
        Buffer.from(signature, "hex"),
        Buffer.from(expectedSignature, "hex")
      )
    ) {
      return JSON.parse(data);
    }
  } catch {
    return null;
  }
  return null;
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;
  return verifySession(sessionCookie);
}

export function isAllowedStaffEmail(email: string): boolean {
  return Boolean(email && email.trim().length > 0);
}

export { SESSION_COOKIE_NAME, SESSION_MAX_AGE };
