import { Geist, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";

export const bodyFont = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: "variable",
});

export const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: "variable",
});

export const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});
