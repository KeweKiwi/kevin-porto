"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { profile } from "@/data/profile";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
  ...(profile.resumeUrl ? [{ label: "Resume", href: profile.resumeUrl }] : []),
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let previousY = window.scrollY;

    function handleScroll() {
      const currentY = window.scrollY;
      setHidden(currentY > previousY && currentY > 160);
      previousY = currentY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-graphite-border bg-graphite-page/94 backdrop-blur-sm transition-transform duration-300",
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="container-grid flex h-16 items-center justify-between tablet:h-[4.5rem]">
        <Link
          className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-ink-primary transition hover:text-signal"
          href="/"
          onClick={() => setMenuOpen(false)}
        >
          KWF
        </Link>

        <div className="hidden items-center gap-8 tablet:flex">
          <nav aria-label="Main navigation" className="flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-ink-secondary transition hover:text-signal"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            className="group inline-flex min-h-10 items-center gap-2 rounded-[4px] bg-signal px-4 text-sm font-medium text-graphite-page transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
            href="/#contact"
          >
            Let&apos;s Talk
            <ArrowUpRight aria-hidden="true" className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={15} />
          </Link>
        </div>

        <button
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-graphite-strong text-ink-primary tablet:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span className="screen-reader-only">Toggle navigation</span>
          {menuOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
        </button>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-graphite-border bg-graphite-page transition-[grid-template-rows]",
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
        id="mobile-navigation"
      >
        <nav aria-label="Mobile navigation" className="min-h-0 overflow-hidden">
          <div className="container-grid grid gap-3 py-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className="flex items-center justify-between border-b border-graphite-border py-4 font-mono text-xs font-medium uppercase tracking-[0.08em] text-ink-primary"
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
                <ArrowUpRight aria-hidden="true" size={14} />
              </Link>
            ))}
            <Link
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] bg-signal px-4 text-sm font-medium text-graphite-page"
              href="/#contact"
              onClick={() => setMenuOpen(false)}
            >
              Let&apos;s Talk
              <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
