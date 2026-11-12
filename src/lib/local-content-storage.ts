import fs from "fs";
import path from "path";

const DATA_DIR = path.resolve(process.cwd(), ".data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");

function ensureContentFile(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(CONTENT_FILE)) {
      fs.writeFileSync(CONTENT_FILE, JSON.stringify({}, null, 2), "utf8");
    }
  } catch (err) {
    console.error("[Local Content Storage] Error ensuring content file:", err);
  }
}

export function getLocalContentSection(section: string): unknown | null {
  try {
    ensureContentFile();
    const raw = fs.readFileSync(CONTENT_FILE, "utf8");
    const data = JSON.parse(raw);
    return data && typeof data === "object" && data[section] !== undefined ? data[section] : null;
  } catch (err) {
    console.error(`[Local Content Storage] Error reading section ${section}:`, err);
    return null;
  }
}

export function saveLocalContentSection(section: string, value: unknown): boolean {
  try {
    ensureContentFile();
    const raw = fs.readFileSync(CONTENT_FILE, "utf8");
    const data = JSON.parse(raw);
    data[section] = value;
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error(`[Local Content Storage] Error saving section ${section}:`, err);
    return false;
  }
}

