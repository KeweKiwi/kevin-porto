import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SkipLink } from "@/components/skip-link";
import { MotionProvider } from "@/components/motion-provider";
import { bodyFont, displayFont, monoFont } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kevinwilliamfaith.com"),

  title: "Kevin William Faith — Software Engineer",

  description:
    "Portfolio of Kevin William Faith: production web systems, native Apple products, technical leadership, and end-to-end software delivery.",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },

  openGraph: {
    title: "Kevin William Faith — Software Engineer",
    description:
      "Case studies spanning a live Laravel platform, native Apple products, technical leadership, and end-to-end software delivery.",
    type: "website",
    url: "https://www.kevinwilliamfaith.com",
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
      className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <MotionProvider>
          <div className="site-shell">
            <SkipLink />
            <SiteHeader />
            <main id="main-content">{children}</main>
            <SiteFooter />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
