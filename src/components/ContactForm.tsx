"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronDown, LoaderCircle } from "lucide-react";
import { OBJECT_TYPES, WORK_TYPES } from "@/data/content";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { track } from "@/lib/analytics";
import {
  formatKzPhone,
  maskKzPhone,
  normalizeKzPhone,
  parseArea,
  validateArea,
  validateName,
  validatePhone,
  type ErrorCode,
} from "@/lib/validation";
import { composeMessage, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

type Fields = {
  name: string;
  phone: string;
  objectType: string;
  area: string;
  services: string[];
  comment: string;
  consent: boolean;
};
type FieldKey = "name" | "phone" | "objectType" | "area" | "consent";
type Errors = Partial<Record<FieldKey, ErrorCode>>;

const EMPTY: Fields = { name: "", phone: "", objectType: "", area: "", services: [], comment: "", consent: false };
const ORDER: FieldKey[] = ["name", "phone", "objectType", "area", "consent"];

function validate(f: Fields): Errors {
  const e: Errors = {};
  const n = validateName(f.name);
  if (n) e.name = n;
  const p = validatePhone(f.phone, true);
  if (p) e.phone = p;
  if (!f.objectType) e.objectType = "objectRequired";
  const a = validateArea(f.area);
  if (a) e.area = a;
  if (!f.consent) e.consent = "consentRequired";
  return e;
}

export function ContactForm({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const ft = t.form;
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [waHref, setWaHref] = useState("");
  const submitting = useRef(false);

  const serviceOptions = [...WORK_TYPES.map((w) => w.label[locale]), ft.panelService];

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setF((p) => ({ ...p, [k]: v }));
    if (errors[k as FieldKey]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const lbl = t.wa.labels;
  const normalized = normalizeKzPhone(f.phone);
  const message = composeMessage(
    `${t.wa.greeting} ${t.wa.leadIntro}`,
    [
      [lbl.name, f.name],
      [lbl.phone, normalized ? formatKzPhone(normalized) : f.phone],
      [lbl.object, OBJECT_TYPES.find((o) => o.value === f.objectType)?.label[locale]],
      [lbl.area, f.area.trim() && !validateArea(f.area) ? `${parseArea(f.area)} м²` : undefined],
      [lbl.services, f.services.join(", ")],
      [lbl.comment, f.comment],
    ],
    t.wa.leadOutro,
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting.current) return; // prevents double submission
    const errs = validate(f);
    setErrors(errs);
    const first = ORDER.find((k) => errs[k]);
    if (first) {
      document.getElementById(id(first))?.focus();
      return;
    }
    submitting.current = true;
    setStatus("submitting");

    const url = whatsappUrl(message);
    setWaHref(url);
    track("lead_form_submit", { object_type: f.objectType, services_count: f.services.length });

    // Opened synchronously inside the submit gesture so popup blockers allow it
    // (a "noopener" feature string would make window.open always return null)
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.assign(url);

    window.setTimeout(() => {
      setStatus("done");
      submitting.current = false;
    }, 500);
  };

  if (status === "done") {
    return (
      <div
        role="status"
        className="flex flex-col items-start rounded-[var(--radius-lg)] border border-volt/40 bg-ink-2 p-6 sm:p-8 motion-safe:animate-[rise_400ms_var(--ease-out-quart)_both]"
      >
        <CheckCircle2 size={32} aria-hidden="true" className="text-volt" />
        <h3 className="mt-4 font-display text-2xl font-bold">{ft.doneTitle}</h3>
        <p className="mt-3 text-muted">{ft.doneText}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={waHref} target="_blank" rel="noopener noreferrer" data-source="lead_form_retry" className="btn btn-primary">
            <WhatsAppIcon size={18} />
            {ft.again}
          </a>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setF(EMPTY);
              setStatus("idle");
            }}
          >
            {ft.reset}
          </button>
        </div>
      </div>
    );
  }

  const err = (k: FieldKey) =>
    errors[k] ? (
      <p id={id(`${k}-err`)} className="mt-2 text-sm text-danger">
        {t.errors[errors[k]!]}
      </p>
    ) : null;
  const aria = (k: FieldKey) => ({
    "aria-invalid": Boolean(errors[k]),
    "aria-describedby": errors[k] ? id(`${k}-err`) : undefined,
  });
  const req = <span className="text-volt">*</span>;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={id("title")}
      className="grid gap-5 rounded-[var(--radius-lg)] border border-line bg-ink-2 p-5 sm:p-8"
    >
      <div>
        <h3 id={id("title")} className="font-display text-2xl font-bold">
          {ft.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted">{ft.hint}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className="mb-2 block font-semibold">
            {ft.name} {req}
          </label>
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            maxLength={60}
            value={f.name}
            onChange={(e) => set("name", e.target.value)}
            className="field"
            {...aria("name")}
          />
          {err("name")}
        </div>
        <div>
          <label htmlFor={id("phone")} className="mb-2 block font-semibold">
            {ft.phone} {req}
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 7XX XXX XX XX"
            value={f.phone}
            onChange={(e) => set("phone", maskKzPhone(e.target.value, f.phone))}
            onBlur={() => {
              const p = f.phone.trim() ? validatePhone(f.phone, true) : null;
              if (p) setErrors((x) => ({ ...x, phone: p }));
            }}
            className="field tabular-nums"
            {...aria("phone")}
          />
          {err("phone")}
        </div>
        <div>
          <label htmlFor={id("objectType")} className="mb-2 block font-semibold">
            {ft.object} {req}
          </label>
          <select
            id={id("objectType")}
            name="objectType"
            value={f.objectType}
            onChange={(e) => set("objectType", e.target.value)}
            className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 fill=%22none%22><path d=%22M1 1.5 6 6.5l5-5%22 stroke=%22%23A3ACB1%22 stroke-width=%221.6%22/></svg>')] bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-10"
            {...aria("objectType")}
          >
            <option value="" disabled>
              {ft.choose}
            </option>
            {OBJECT_TYPES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label[locale]}
              </option>
            ))}
          </select>
          {err("objectType")}
        </div>
        <div>
          <label htmlFor={id("area")} className="mb-2 block font-semibold">
            {ft.area}
          </label>
          <input
            id={id("area")}
            name="area"
            inputMode="decimal"
            autoComplete="off"
            placeholder={t.calculator.placeholder}
            value={f.area}
            onChange={(e) => set("area", e.target.value)}
            className="field tabular-nums"
            {...aria("area")}
          />
          {err("area")}
        </div>
      </div>

      <fieldset>
        <legend className="mb-3 font-semibold">{ft.services}</legend>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((label) => {
            const checked = f.services.includes(label);
            return (
              <label
                key={label}
                className={`flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border px-4 text-[0.92rem] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-volt ${
                  checked ? "border-volt bg-volt/10 text-fg" : "border-line text-muted hover:text-fg"
                }`}
              >
                <input
                  type="checkbox"
                  name="services"
                  className="sr-only"
                  checked={checked}
                  onChange={() => set("services", checked ? f.services.filter((s) => s !== label) : [...f.services, label])}
                />
                <span aria-hidden="true" className={`size-2 rounded-full transition-colors ${checked ? "bg-volt" : "bg-line"}`} />
                {label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor={id("comment")} className="mb-2 block font-semibold">
          {ft.comment}
        </label>
        <textarea
          id={id("comment")}
          name="comment"
          rows={3}
          maxLength={600}
          placeholder={ft.commentPlaceholder}
          value={f.comment}
          onChange={(e) => set("comment", e.target.value)}
          className="field resize-y"
        />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
          <input
            id={id("consent")}
            name="consent"
            type="checkbox"
            checked={f.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-0.5 size-5 shrink-0 accent-[var(--color-volt)]"
            {...aria("consent")}
          />
          <span>
            {ft.consentBefore}
            <Link href={localePath(locale, "/privacy")} className="text-fg underline underline-offset-2 hover:text-volt">
              {ft.consentLink}
            </Link>
            {ft.consentAfter} {req}
          </span>
        </label>
        {err("consent")}
      </div>

      <details className="group rounded-[var(--radius-sm)] border border-line">
        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between px-4 text-sm font-semibold text-muted hover:text-fg">
          {ft.preview}
          <ChevronDown size={16} aria-hidden="true" className="transition-transform group-open:rotate-180" />
        </summary>
        <pre className="border-t border-line px-4 py-3 font-sans text-sm whitespace-pre-wrap text-fg">{message}</pre>
      </details>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-primary btn-lift w-full text-base sm:w-auto sm:justify-self-start"
      >
        {status === "submitting" ? (
          <>
            <LoaderCircle size={18} aria-hidden="true" className="animate-spin" />
            {ft.submitting}
          </>
        ) : (
          <>
            <WhatsAppIcon size={18} />
            {ft.submit}
          </>
        )}
      </button>
    </form>
  );
}
