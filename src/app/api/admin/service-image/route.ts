import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { getAdminStorageBucket } from "@/lib/firebase-admin";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const allowedTypes = new Map([
  ["image/jpeg", { extension: "jpg", signature: (bytes: Buffer) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff }],
  ["image/png", { extension: "png", signature: (bytes: Buffer) => bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) }],
  ["image/webp", { extension: "webp", signature: (bytes: Buffer) => bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP" }],
]);

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bucket = getAdminStorageBucket();
  if (!bucket) {
    return NextResponse.json(
      { error: "Firebase Storage is not configured. Set FIREBASE_STORAGE_BUCKET in the server environment." },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const slug = formData.get("slug");
    const slot = formData.get("slot");

    let folderPrefix = "";
    if (typeof slot === "string" && /^[a-zA-Z0-9_-]{1,64}$/.test(slot)) {
      folderPrefix = `site-images/${slot}`;
    } else if (typeof slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      folderPrefix = `service-images/${slug}`;
    } else {
      return NextResponse.json({ error: "Provide a valid service slug or website image slot before uploading." }, { status: 400 });
    }
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Choose an image file to upload." }, { status: 400 });
    }
    if (file.size === 0 || file.size > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "Images must be 8 MB or smaller." }, { status: 400 });
    }

    const imageType = allowedTypes.get(file.type);
    const bytes = Buffer.from(await file.arrayBuffer());
    if (!imageType || !imageType.signature(bytes)) {
      return NextResponse.json(
        { error: "Use a valid JPG, PNG, or WebP image." },
        { status: 400 }
      );
    }

    const objectPath = `${folderPrefix}/${randomUUID()}.${imageType.extension}`;
    const downloadToken = randomUUID();
    const imageFile = bucket.file(objectPath);
    await imageFile.save(bytes, {
      resumable: false,
      metadata: {
        contentType: file.type,
        metadata: {
          firebaseStorageDownloadTokens: downloadToken,
          uploadedBy: admin.email,
        },
      },
    });

    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(objectPath)}?alt=media&token=${downloadToken}`;
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("[Admin Service Image] Upload failed:", error);
    return NextResponse.json(
      { error: "Image upload failed. Check the Firebase Storage bucket and service-account permissions." },
      { status: 500 }
    );
  }
}
