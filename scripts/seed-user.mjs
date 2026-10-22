import fs from "fs";
import path from "path";
import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

// Load .env.local variables
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      }
      process.env[key] = val.replace(/\\n/g, "\n");
    }
  });
}

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;
const databaseURL =
  process.env.FIREBASE_DATABASE_URL ||
  "https://ausinx-default-rtdb.firebaseio.com";

if (!projectId || !clientEmail || !privateKey) {
  console.error("Missing Firebase Admin credentials in .env.local.");
  process.exit(1);
}

const app =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        databaseURL,
      });

const db = getDatabase(app);

async function seedUserNode() {
  try {
    console.log("Connecting to Firebase RTDB at:", databaseURL);
    
    const usersData = {
      ausinx_admin: {
        id: "ausinx@admin",
        username: "ausinx@admin",
        password: "ausinx@2026",
        name: "AusinX Administrator",
        role: "Administrator",
        active: true,
        updatedAt: new Date().toISOString(),
      },
    };

    await db.ref("user").set(usersData);
    console.log("Successfully created /user node in Firebase Realtime Database!");

    // Verify read
    const snapshot = await db.ref("user").once("value");
    console.log("Verified /user contents in RTDB:", Object.keys(snapshot.val() || {}));
    process.exit(0);
  } catch (error) {
    console.error("Error setting /user node:", error);
    process.exit(1);
  }
}

seedUserNode();
