import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { getSiteImages } from "@/lib/content";
import { defaultSiteImages } from "@/lib/site-images";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let sharpLib: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  sharpLib = require("sharp");
} catch {
  // Graceful fallback if native binary unavailable
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedSize = parseInt(searchParams.get("size") || "64", 10);
  const size = requestedSize === 180 ? 180 : 64;
  const padding = size === 180 ? 12 : 4;
  const innerSize = size - padding * 2;

  const defaultLogoPath = path.resolve(
    process.cwd(),
    "public",
    "images",
    "client",
    "ausinx-logo-new.png"
  );

  try {
    const siteImages = await getSiteImages();
    // Use tabIcon if set; otherwise use headerLogo; fallback to default
    const targetSource =
      siteImages.tabIcon?.trim() ||
      siteImages.headerLogo?.trim() ||
      defaultSiteImages.headerLogo;

    let imageBuffer: Buffer | null = null;
    let contentType = "image/png";

    if (targetSource.startsWith("/")) {
      const localPath = path.resolve(
        process.cwd(),
        "public",
        targetSource.replace(/^\//, "")
      );
      if (fs.existsSync(localPath)) {
        imageBuffer = fs.readFileSync(localPath);
        if (localPath.endsWith(".svg")) contentType = "image/svg+xml";
        else if (localPath.endsWith(".webp")) contentType = "image/webp";
        else if (localPath.endsWith(".jpg") || localPath.endsWith(".jpeg")) contentType = "image/jpeg";
      }
    } else if (targetSource.startsWith("data:")) {
      const parts = targetSource.split(",");
      if (parts.length === 2) {
        imageBuffer = Buffer.from(parts[1], "base64");
        const match = targetSource.match(/^data:([^;]+);/);
        if (match) contentType = match[1];
      }
    } else if (targetSource.startsWith("http://") || targetSource.startsWith("https://")) {
      const res = await fetch(targetSource, { signal: AbortSignal.timeout(3500) });
      if (res.ok) {
        imageBuffer = Buffer.from(await res.arrayBuffer());
        const ct = res.headers.get("content-type");
        if (ct) contentType = ct;
      }
    }

    if (!imageBuffer && fs.existsSync(defaultLogoPath)) {
      imageBuffer = fs.readFileSync(defaultLogoPath);
      contentType = "image/png";
    }

    if (!imageBuffer) {
      return new NextResponse(null, {
        headers: { "Content-Type": "image/png" },
      });
    }

    // If sharp is available, composite into square canvas with contain
    if (sharpLib) {
      const fitted = await sharpLib(imageBuffer)
        .resize(innerSize, innerSize, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toBuffer();

      const outputBuffer = await sharpLib({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
      })
        .composite([{ input: fitted, gravity: "center" }])
        .png()
        .toBuffer();

      return new NextResponse(new Uint8Array(outputBuffer), {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        },
      });
    }

    // Fallback without sharp: stream the image buffer directly
    return new NextResponse(new Uint8Array(imageBuffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    });
  } catch (err) {
    console.error("[Site Icon] Error processing icon:", err);
    const fallbackBuffer = fs.existsSync(defaultLogoPath)
      ? fs.readFileSync(defaultLogoPath)
      : Buffer.alloc(0);
    return new NextResponse(new Uint8Array(fallbackBuffer), {
      headers: { "Content-Type": "image/png", "Cache-Control": "no-cache" },
    });
  }
}
