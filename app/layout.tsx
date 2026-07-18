import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistPixelLine, GeistPixelSquare } from "geist/font/pixel";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SkipLink } from "@/components/skip-link";

export const metadata: Metadata = {
  title: "Kevin William Faith — iOS & Full-Stack Web Developer",
  description:
    "Portfolio of Kevin William Faith: native iOS engineering, technical leadership, and end-to-end full-stack web delivery.",
  openGraph: {
    title: "Kevin William Faith — iOS & Full-Stack Web Developer",
    description:
      "Case studies covering GameKit multiplayer, SwiftData and App Intents, and an independently delivered production Laravel platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} ${GeistPixelLine.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <div className="site-shell">
          <SkipLink />
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
