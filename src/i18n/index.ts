import type { Locale } from "./config";
import { kk } from "./kk";
import { ru, type Dictionary } from "./ru";

const DICTIONARIES: Record<Locale, Dictionary> = { ru, kk };

export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale];
export type { Dictionary };
