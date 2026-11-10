import type { Dictionary } from "@/i18n";

export type ErrorCode = keyof Dictionary["errors"];

/**
 * Kazakhstan numbers: country code +7, then a 10-digit national number that
 * always starts with 7 (mobile 70x/747/75x/76x/77x, landline 7xx e.g. 727 Almaty).
 * Accepts "+7 707 …", "8 707 …", "707 …" with any spaces, dashes or brackets.
 * Returns the normalized E.164 string or null.
 */
export function normalizeKzPhone(input: string): string | null {
  let digits = input.replace(/\D/g, "");
  if (digits.length === 10 && digits.startsWith("7")) digits = `7${digits}`;
  if (digits.length === 11 && digits.startsWith("8")) digits = `7${digits.slice(1)}`;
  if (digits.length !== 11 || !digits.startsWith("77")) return null;
  return `+${digits}`;
}

export function formatKzPhone(e164: string): string {
  const d = e164.replace(/\D/g, "");
  return `+7 ${d.slice(1, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9, 11)}`;
}

/**
 * As-you-type mask: "+7 7XX XXX XX XX". A leading 8 or a bare 7XX… is treated
 * as the national number. `prev` lets a backspace over a separator remove the
 * digit before it instead of getting stuck.
 */
export function maskKzPhone(raw: string, prev = ""): string {
  let digits = raw.replace(/\D/g, "");
  const prevDigits = prev.replace(/\D/g, "");
  if (raw.length < prev.length && digits === prevDigits) digits = digits.slice(0, -1);
  if (digits === "") return "";
  if (digits[0] === "8") digits = `7${digits.slice(1)}`; // 8 707… → +7 707…
  else if (digits[0] !== "7") digits = `7${digits}`; // anything else → prefix country code
  else if (digits.length > 1 && digits[1] !== "7") digits = `7${digits}`; // 707… typed without country code
  digits = digits.slice(0, 11);
  const n = digits.slice(1);
  let out = "+7";
  if (n.length) out += ` ${n.slice(0, 3)}`;
  if (n.length > 3) out += ` ${n.slice(3, 6)}`;
  if (n.length > 6) out += ` ${n.slice(6, 8)}`;
  if (n.length > 8) out += ` ${n.slice(8, 10)}`;
  return out;
}

export function validateName(name: string): ErrorCode | null {
  const v = name.trim();
  if (v.length === 0) return "nameRequired";
  if (v.length < 2) return "nameShort";
  if (v.length > 60) return "nameLong";
  return null;
}

export function validatePhone(phone: string, required: boolean): ErrorCode | null {
  if (!phone.trim()) return required ? "phoneRequired" : null;
  return normalizeKzPhone(phone) ? null : "phoneInvalid";
}

/** Area in m²: optional unless `required`; positive numbers up to 100 000. */
export function validateArea(raw: string, required = false): ErrorCode | null {
  const v = raw.trim();
  if (v === "") return required ? "areaRequired" : null;
  const n = Number(v.replace(",", "."));
  if (!Number.isFinite(n) || n <= 0) return "areaInvalid";
  if (n > 100000) return "areaTooBig";
  return null;
}

export function parseArea(raw: string): number {
  return Math.round(Number(raw.trim().replace(",", ".")));
}
