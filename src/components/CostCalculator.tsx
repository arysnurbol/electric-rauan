"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Calculator, Sparkles } from "lucide-react";
import { AREA_PRESETS, OBJECT_TYPES, WORK_TYPES, type ObjectType, type WorkType } from "@/data/content";
import type { CalcPreset } from "@/data/services";
import type { L, Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { track } from "@/lib/analytics";
import { SITE, formatKzt } from "@/lib/site";
import { formatKzPhone, maskKzPhone, normalizeKzPhone, parseArea, validateArea, validatePhone, type ErrorCode } from "@/lib/validation";
import { composeMessage, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";
import { CALC_PRESET_EVENT } from "./ServiceBits";

const AREA_MIN = 10;
const AREA_MAX = 500;

function Choice<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  locale,
}: {
  legend: string;
  name: string;
  options: ReadonlyArray<{ value: T; label: L }>;
  value: T;
  onChange: (v: T) => void;
  locale: Locale;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-[0.95rem] font-semibold">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className={`flex min-h-[48px] grow cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] border px-4 py-2.5 text-[0.95rem] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-volt sm:grow-0 ${
              value === o.value ? "border-volt bg-volt/10" : "border-line hover:border-[#4b555c]"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="size-4 shrink-0 accent-[var(--color-volt)]"
            />
            {o.label[locale]}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function CostCalculator({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const c = t.calculator;
  const uid = useId();
  const [objectType, setObjectType] = useState<ObjectType>("apartment");
  const [work, setWork] = useState<WorkType>("rough");
  const [area, setArea] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ area?: ErrorCode; phone?: ErrorCode }>({});
  const [presetNote, setPresetNote] = useState(false);
  const noteTimer = useRef<number>(undefined);

  // Presets handed over from a service card ("Посчитать в калькуляторе")
  useEffect(() => {
    const onPreset = (e: Event) => {
      const p = (e as CustomEvent<CalcPreset>).detail;
      if (p.work) setWork(p.work);
      if (p.object) setObjectType(p.object);
      setPresetNote(true);
      window.clearTimeout(noteTimer.current);
      noteTimer.current = window.setTimeout(() => setPresetNote(false), 4000);
    };
    window.addEventListener(CALC_PRESET_EVENT, onPreset);
    return () => {
      window.removeEventListener(CALC_PRESET_EVENT, onPreset);
      window.clearTimeout(noteTimer.current);
    };
  }, []);

  const workMeta = WORK_TYPES.find((w) => w.value === work)!;
  const objectLabel = OBJECT_TYPES.find((o) => o.value === objectType)!.label[locale];
  const areaValid = area.trim() !== "" && !validateArea(area, true);
  const areaNum = areaValid ? parseArea(area) : 0;
  const estimate = workMeta.priced && areaValid ? areaNum * SITE.pricePerM2 : null;
  const normalizedPhone = phone.trim() ? normalizeKzPhone(phone) : null;
  const fmt = (n: number) => formatKzt(n);

  const setAreaValue = (v: string) => {
    setArea(v);
    // re-validate while typing so the error never vanishes on blur
    // (a layout shift mid-click would swallow the next click)
    if (errors.area) setErrors((er) => ({ ...er, area: validateArea(v, true) ?? undefined }));
  };

  const lbl = t.wa.labels;
  const message = composeMessage(
    `${t.wa.greeting} ${t.wa.calcIntro}`,
    [
      [lbl.object, objectLabel],
      [lbl.area, areaValid ? `${areaNum} м²` : undefined],
      [lbl.work, workMeta.label[locale]],
      [lbl.estimate, estimate ? t.common.from(`${fmt(estimate)} ₸`) : t.wa.individual],
      [lbl.name, name],
      [lbl.phone, normalizedPhone ? formatKzPhone(normalizedPhone) : undefined],
    ],
    t.wa.calcOutro,
  );

  const onSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const next = {
      area: validateArea(area, true) ?? undefined,
      phone: validatePhone(phone, false) ?? undefined,
    };
    setErrors(next);
    if (next.area || next.phone) {
      e.preventDefault();
      document.getElementById(next.area ? `${uid}-area` : `${uid}-phone`)?.focus();
      return;
    }
    track("calculator_submit", { object_type: objectType, work_type: work, has_estimate: Boolean(estimate) });
  };

  const sliderValue = Math.min(AREA_MAX, Math.max(AREA_MIN, areaNum || 70));

  return (
    <section id="calculator" aria-labelledby="calc-title" className="section border-t border-line">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 id="calc-title" className="font-display text-[clamp(1.75rem,4.6vw,2.4rem)] font-bold">
            {c.title}
          </h2>
          <p className="mt-5 text-lg text-muted">{c.lead}</p>
          <p className="mt-6 border-l-2 border-line pl-4 text-sm text-muted">{c.disclaimer(fmt(SITE.pricePerM2))}</p>
        </div>

        <form
          noValidate
          onSubmit={(e) => e.preventDefault()}
          className="relative grid gap-8 rounded-[var(--radius-lg)] border border-line bg-ink-2 p-5 sm:p-8 lg:col-span-8 lg:grid-cols-[1fr_minmax(0,300px)]"
          aria-describedby={`${uid}-result`}
        >
          <p
            role="status"
            className={`absolute -top-4 left-5 flex items-center gap-2 rounded-full bg-volt px-3 py-1.5 text-xs font-semibold text-ink transition-[opacity,translate] duration-300 sm:left-8 ${
              presetNote ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"
            }`}
          >
            <Sparkles size={14} aria-hidden="true" />
            {presetNote ? c.presetApplied : ""}
          </p>

          <div className="grid gap-7">
            <Choice legend={c.object} name={`${uid}-object`} options={OBJECT_TYPES} value={objectType} onChange={setObjectType} locale={locale} />

            <div>
              <label htmlFor={`${uid}-area`} className="mb-2 block text-[0.95rem] font-semibold">
                {c.area}
              </label>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  id={`${uid}-area`}
                  name="area"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder={c.placeholder}
                  value={area}
                  onChange={(e) => setAreaValue(e.target.value)}
                  onBlur={() => setErrors((er) => ({ ...er, area: validateArea(area) ?? undefined }))}
                  aria-invalid={Boolean(errors.area)}
                  aria-describedby={errors.area ? `${uid}-area-err` : undefined}
                  className="field max-w-[160px] tabular-nums"
                />
                <div role="group" aria-label={c.quick} className="flex flex-wrap gap-1.5">
                  {AREA_PRESETS.map((v) => (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={areaNum === v}
                      onClick={() => setAreaValue(String(v))}
                      className={`min-h-[44px] rounded-full border px-3.5 text-sm font-semibold tabular-nums transition-colors ${
                        areaNum === v ? "border-volt bg-volt text-ink" : "border-line text-muted hover:border-fg hover:text-fg"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="range"
                min={AREA_MIN}
                max={AREA_MAX}
                step={5}
                value={sliderValue}
                onChange={(e) => setAreaValue(e.target.value)}
                aria-label={c.areaRange}
                aria-valuetext={`${sliderValue} м²`}
                className="range mt-5 w-full"
                style={{ "--fill": `${((sliderValue - AREA_MIN) / (AREA_MAX - AREA_MIN)) * 100}%` } as React.CSSProperties}
              />
              <div aria-hidden="true" className="mt-1 flex justify-between text-xs text-muted tabular-nums">
                <span>{AREA_MIN} м²</span>
                <span>{AREA_MAX}+ м²</span>
              </div>
              {errors.area && (
                <p id={`${uid}-area-err`} className="mt-2 text-sm text-danger">
                  {t.errors[errors.area]}
                </p>
              )}
            </div>

            <Choice legend={c.work} name={`${uid}-work`} options={WORK_TYPES} value={work} onChange={setWork} locale={locale} />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-name`} className="mb-2 block text-[0.95rem] font-semibold">
                  {c.name} <span className="font-normal text-muted">{c.optional}</span>
                </label>
                <input
                  id={`${uid}-name`}
                  name="name"
                  autoComplete="given-name"
                  value={name}
                  maxLength={60}
                  onChange={(e) => setName(e.target.value)}
                  className="field"
                />
              </div>
              <div>
                <label htmlFor={`${uid}-phone`} className="mb-2 block text-[0.95rem] font-semibold">
                  {c.phone} <span className="font-normal text-muted">{c.optional}</span>
                </label>
                <input
                  id={`${uid}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+7 7XX XXX XX XX"
                  value={phone}
                  onChange={(e) => {
                    const v = maskKzPhone(e.target.value, phone);
                    setPhone(v);
                    if (errors.phone) setErrors((er) => ({ ...er, phone: validatePhone(v, false) ?? undefined }));
                  }}
                  onBlur={() => setErrors((er) => ({ ...er, phone: validatePhone(phone, false) ?? undefined }))}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
                  className="field tabular-nums"
                />
                {errors.phone && (
                  <p id={`${uid}-phone-err`} className="mt-2 text-sm text-danger">
                    {t.errors[errors.phone]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div
            id={`${uid}-result`}
            aria-live="polite"
            className="flex flex-col rounded-[var(--radius-md)] border border-line bg-ink p-6 lg:sticky lg:top-28 lg:self-start"
          >
            <span className="flex items-center gap-2 text-sm text-muted">
              <Calculator size={16} aria-hidden="true" className="text-volt" />
              {c.result}
            </span>
            {estimate ? (
              <>
                <p key={estimate} className="mt-4 font-display text-[2.1rem] font-extrabold leading-none tabular-nums text-volt motion-safe:animate-[rise_300ms_var(--ease-out-quart)_both]">
                  {t.common.from(`${fmt(estimate)} ₸`)}
                </p>
                <p className="mt-3 text-sm text-muted tabular-nums">
                  {areaNum} м² × {fmt(SITE.pricePerM2)} ₸
                </p>
              </>
            ) : workMeta.priced ? (
              <p className="mt-4 font-display text-xl font-semibold">{c.needArea}</p>
            ) : (
              <p className="mt-4 font-display text-xl font-semibold">{c.individual}</p>
            )}
            <p className="mt-4 text-sm text-muted">
              {objectLabel}. {workMeta.label[locale]}.
            </p>
            <a
              href={whatsappUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              data-source="calculator"
              onClick={onSubmit}
              className="btn btn-primary btn-lift mt-6 w-full !whitespace-normal text-center"
            >
              <WhatsAppIcon size={18} />
              {c.send}
            </a>
            <p className="mt-3 text-xs text-muted">{c.sendNote}</p>
          </div>
        </form>
      </div>
    </section>
  );
}
