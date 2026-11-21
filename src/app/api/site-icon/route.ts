import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { getSiteImages } from "@/lib/content";
import { defaultSiteImages } from "@/lib/site-images";

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

    if (targetSource.startsWith("/")) {
      const localPath = path.resolve(
        process.cwd(),
        "public",
        targetSource.replace(/^\//, "")
      );
      if (fs.existsSync(localPath)) {
        imageBuffer = fs.readFileSync(localPath);
      }
    } else if (targetSource.startsWith("data:")) {
      const parts = targetSource.split(",");
      if (parts.length === 2) {
        imageBuffer = Buffer.from(parts[1], "base64");
      }
    } else if (targetSource.startsWith("http://") || targetSource.startsWith("https://")) {
      const res = await fetch(targetSource, { signal: AbortSignal.timeout(3500) });
      if (res.ok) {
        imageBuffer = Buffer.from(await res.arrayBuffer());
      }
    }

    if (!imageBuffer && fs.existsSync(defaultLogoPath)) {
      imageBuffer = fs.readFileSync(defaultLogoPath);
    }

    if (!imageBuffer) {
      // Emergency empty transparent PNG
      const transparent = await sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
      })
        .png()
        .toBuffer();
      return new Response(transparent, {
        headers: { "Content-Type": "image/png" },
      });
    }

    // Resize full image to fit inside inner canvas without cropping (contain, centered)
    const fitted = await sharp(imageBuffer)
      .resize(innerSize, innerSize, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    // Composite onto exact square canvas with small padding
    const outputBuffer = await sharp({
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

    return new Response(outputBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    });
  } catch (err) {
    console.error("[Site Icon] Error processing icon:", err);
    const fallbackBuffer = fs.existsSync(defaultLogoPath)
      ? fs.readFileSync(defaultLogoPath)
      : Buffer.alloc(0);
    return new Response(fallbackBuffer, {
      headers: { "Content-Type": "image/png", "Cache-Control": "no-cache" },
    });
  }
}
