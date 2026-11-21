import { createHash } from "node:crypto";
import { defaultSiteImages, type SiteImages } from "./site-images";

export function getIconVersion(siteImages?: Partial<SiteImages> | null): string {
  const source = siteImages?.tabIcon?.trim() || siteImages?.headerLogo?.trim() || defaultSiteImages.headerLogo;
  return createHash("md5").update(source).digest("hex").slice(0, 8);
}

export function getTabIconUrls(siteImages?: Partial<SiteImages> | null) {
  const v = getIconVersion(siteImages);
  return {
    icon: `/api/site-icon?size=64&v=${v}`,
    apple: `/api/site-icon?size=180&v=${v}`,
  };
}

// Backwards compatibility helper
export async function resolveTabIcon(headerLogo?: string | null): Promise<string> {
  const v = headerLogo ? createHash("md5").update(headerLogo).digest("hex").slice(0, 8) : "default";
  return `/api/site-icon?size=64&v=${v}`;
}
