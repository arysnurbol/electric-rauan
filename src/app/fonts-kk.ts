import { Geologica, Manrope } from "next/font/google";

// Kazakh letters (ә ғ қ ң ө ұ ү һ) live in the cyrillic-ext subset.
const geologica = Geologica({ variable: "--font-geologica", subsets: ["latin", "cyrillic", "cyrillic-ext"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin", "cyrillic", "cyrillic-ext"], display: "swap" });

export const fontClassesKk = `${geologica.variable} ${manrope.variable}`;
