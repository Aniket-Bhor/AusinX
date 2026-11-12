import { getApps, getApp, initializeApp, cert, type App } from "firebase-admin/app";
import { getDatabase, type Database } from "firebase-admin/database";
import { getStorage } from "firebase-admin/storage";

let adminApp: App | null = null;

function getFirebaseAdminApp(): App | null {
  if (adminApp) {
    return adminApp;
  }

  if (getApps().length > 0) {
    adminApp = getApp();
    return adminApp;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const databaseURL =
    process.env.FIREBASE_DATABASE_URL ||
    "https://ausinx-default-rtdb.firebaseio.com";

  if (!projectId || !clientEmail || !privateKey) {
    console.warn(
      "[Firebase Admin] Missing credentials in environment. Check FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY."
    );
    return null;
  }

  // Handle newline escapes in private key
  privateKey = privateKey.replace(/\\n/g, "\n");

  try {
    adminApp = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      databaseURL,
    });
    return adminApp;
  } catch (error) {
    console.error("[Firebase Admin] Initialization error:", error);
    return null;
  }
}

export function getAdminDb(): Database | null {
  const app = getFirebaseAdminApp();
  if (!app) return null;
  return getDatabase(app);
}

export function getAdminStorageBucket() {
  const app = getFirebaseAdminApp();
  if (!app) return null;

  const bucketName =
    process.env.FIREBASE_STORAGE_BUCKET ||
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (!bucketName) return null;

  return getStorage(app).bucket(bucketName);
}

// Lazy dynamic import for auth to prevent jose/jwks-rsa ESM bundling conflict during build
export async function getAdminAuth() {
  const app = getFirebaseAdminApp();
  if (!app) return null;
  const { getAuth } = await import("firebase-admin/auth");
  return getAuth(app);
}
