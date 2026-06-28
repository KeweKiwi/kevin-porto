import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SkipLink } from "@/components/skip-link";

export const metadata: Metadata = {
  title: "Kevin William Faith — iOS Developer & Web Developer",
  description:
    "Portfolio of Kevin William Faith, a developer building native Apple experiences and production web systems.",
  openGraph: {
    title: "Kevin William Faith — iOS Developer & Web Developer",
    description:
      "Native Apple projects, production web systems, and case studies shaped around product ownership.",
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
      className={`${GeistSans.variable} ${GeistMono.variable}`}
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
