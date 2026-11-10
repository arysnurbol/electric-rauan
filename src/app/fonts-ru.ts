import { Geologica, Manrope } from "next/font/google";

// Space Grotesk (from the brief) has no Cyrillic glyphs; Geologica is a
// technical geometric grotesque with full Cyrillic support.
// Separate module per locale: next/font bundles and preloads every font a
// module declares, so the Russian layout must not import the Kazakh set.
const geologica = Geologica({ variable: "--font-geologica", subsets: ["latin", "cyrillic"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin", "cyrillic"], display: "swap" });

export const fontClassesRu = `${geologica.variable} ${manrope.variable}`;
