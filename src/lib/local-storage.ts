import fs from "fs";
import path from "path";

export interface StoredEnquiry {
  id: string;
  fullName: string;
  organisation: string;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
  createdAt: string;
  timestamp: number;
  status: "new" | "in_review" | "contacted" | "archived";
  updatedBy?: string;
  updatedAt?: string;
}

const DATA_DIR = path.resolve(process.cwd(), ".data");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.json");

function ensureFile(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(ENQUIRIES_FILE)) {
      fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2), "utf8");
    }
  } catch (err) {
    console.error("[Local Storage] Error creating storage file:", err);
  }
}

export function getLocalEnquiries(): StoredEnquiry[] {
  try {
    ensureFile();
    const raw = fs.readFileSync(ENQUIRIES_FILE, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("[Local Storage] Error reading enquiries:", err);
    return [];
  }
}

export function saveLocalEnquiry(enquiry: Omit<StoredEnquiry, "id"> & { id?: string }): StoredEnquiry {
  ensureFile();
  const list = getLocalEnquiries();
  const id = enquiry.id || `enq_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const item: StoredEnquiry = { ...enquiry, id };
  list.unshift(item);
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2), "utf8");
  return item;
}

export function updateLocalEnquiryStatus(id: string, status: StoredEnquiry["status"], updatedBy?: string): boolean {
  ensureFile();
  const list = getLocalEnquiries();
  const target = list.find((e) => e.id === id);
  if (!target) return false;
  target.status = status;
  if (updatedBy) target.updatedBy = updatedBy;
  target.updatedAt = new Date().toISOString();
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2), "utf8");
  return true;
}

export function deleteLocalEnquiry(id: string): boolean {
  ensureFile();
  const list = getLocalEnquiries();
  const filtered = list.filter((e) => e.id !== id);
  if (filtered.length === list.length) return false;
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(filtered, null, 2), "utf8");
  return true;
}

