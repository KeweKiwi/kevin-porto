"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { InteractiveLink, MotionArrow } from "@/components/interactive-link";
import { KwfMark } from "@/components/kwf-mark";
import { profile } from "@/data/profile";
import { interactionScale, motionDurations, motionEasings, motionSprings } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type NavSectionId = "about" | "contact" | "skills" | "work";

type NavItem = {
  external?: boolean;
  href: string;
  id?: NavSectionId;
  label: string;
};

const contactNavItem: NavItem = { id: "contact", label: "Contact", href: "/#contact" };

const navItems: NavItem[] = [
  { id: "about", label: "About", href: "/#about" },
  { id: "work", label: "Work", href: "/#work" },
  { id: "skills", label: "Skills", href: "/#skills" },
  ...(profile.resumeUrl
    ? [{ external: true, label: "Résumé", href: profile.resumeUrl }]
    : []),
];

const menuContainerVariants = {
  closed: { opacity: 0, y: -12 },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDurations.overlay,
      ease: motionEasings.precise,
      staggerChildren: 0.045,
      delayChildren: 0.06,
    },
  },
};

const menuItemVariants = {
  closed: { opacity: 0, y: 12 },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDurations.content,
      ease: motionEasings.precise,
    },
  },
};

export function SiteHeader() {
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const hiddenRef = useRef(false);
  const compactRef = useRef(false);
  const [activeSection, setActiveSection] = useState<NavSectionId | null>(null);
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let previousY = window.scrollY;
    let frame: number | null = null;

    function updateHeader() {
      const currentY = window.scrollY;
      const nextHidden = currentY > previousY && currentY > 160;
      const nextCompact = currentY > 24;

      if (nextHidden !== hiddenRef.current) {
        hiddenRef.current = nextHidden;
        setHidden(nextHidden);
      }

      if (nextCompact !== compactRef.current) {
        compactRef.current = nextCompact;
        setCompact(nextCompact);
      }

      if (pathname === "/" && currentY < 120) {
        setActiveSection(null);
      }

      previousY = currentY;
      frame = null;
    }

    function handleScroll() {
      if (frame === null) {
        frame = window.requestAnimationFrame(updateHeader);
      }
    }

    updateHeader();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const sections = navItems
      .flatMap((item) => (item.id ? [document.getElementById(item.id)] : []))
      .filter((section): section is HTMLElement => Boolean(section));

    const hashId = window.location.hash.slice(1) as NavSectionId;
    if (sections.some((section) => section.id === hashId)) {
      setActiveSection(hashId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id as NavSectionId);
        }
      },
      {
        rootMargin: "-24% 0px -58% 0px",
        threshold: [0.05, 0.2, 0.45],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const originalBodyOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => {
      menuPanelRef.current
        ?.querySelector<HTMLElement>("[data-mobile-nav-link]")
        ?.focus();
    });

    document.body.style.overflow = "hidden";
    hiddenRef.current = false;
    setHidden(false);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = Array.from(
        menuPanelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [menuOpen]);

  function activateItem(item: NavItem) {
    if (item.id) {
      setActiveSection(item.id);
    }
    setMenuOpen(false);
  }

  const headerTransition = reducedMotion ? { duration: 0 } : motionSprings.snappy;

  return (
    <motion.header
      animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
      className={
        compact
          ? "fixed inset-x-0 top-0 z-50 border-b border-graphite-strong bg-graphite-page/95 shadow-[0_12px_36px_rgba(0,0,0,.18)] backdrop-blur-md"
          : "fixed inset-x-0 top-0 z-50 border-b border-graphite-border bg-graphite-page"
      }
      initial={false}
      transition={headerTransition}
    >
      <div className="container-grid flex h-16 items-center justify-between tablet:h-[4.5rem]">
        <InteractiveLink
          aria-label="Kevin William Faith — Home"
          className="group inline-flex min-h-11 min-w-20 items-center text-ink-primary"
          href="/"
          interactionLevel="subtle"
          onClick={() => setMenuOpen(false)}
        >
          <KwfMark className="h-7 w-auto tablet:h-8" />
        </InteractiveLink>

        <div className="hidden items-center gap-9 tablet:flex">
          <nav aria-label="Main navigation" className="flex items-center gap-8">
            {navItems.map((item) => {
              const active = item.id === activeSection;
              const content = (
                <>
                  <motion.span
                    transition={motionSprings.snappy}
                    whileHover={reducedMotion ? undefined : { y: -2 }}
                  >
                    {item.label}
                  </motion.span>
                  {active ? (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px bg-signal"
                      layoutId="site-navigation-active"
                      transition={headerTransition}
                    />
                  ) : null}
                </>
              );

              if (item.external) {
                return (
                  <a
                    key={item.href}
                    aria-label={`${item.label} (opens in a new tab)`}
                    className="relative inline-flex min-h-11 min-w-11 items-center justify-center text-[0.82rem] font-semibold tracking-[0.025em] text-ink-secondary hover:text-ink-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-signal"
                    href={item.href}
                    onClick={() => activateItem(item)}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {content}
                  </a>
                );
              }

              return (
                <Link
                  key={item.href}
                  aria-current={active ? "location" : undefined}
                  className="relative inline-flex min-h-11 min-w-11 items-center justify-center text-[0.82rem] font-semibold tracking-[0.025em] text-ink-secondary hover:text-ink-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-signal"
                  href={item.href}
                  onClick={() => activateItem(item)}
                >
                  {content}
                </Link>
              );
            })}
          </nav>
          <InteractiveLink
            className="inline-flex min-h-11 items-center gap-3 rounded-none bg-signal px-5 text-sm font-semibold tracking-[-0.01em] text-graphite-page hover:bg-ink-primary"
            href="/#contact"
            onClick={() => setActiveSection("contact")}
          >
            Contact
            <MotionArrow direction="up-right">
              <ArrowUpRight size={15} />
            </MotionArrow>
          </InteractiveLink>
        </div>

        <motion.button
          ref={menuButtonRef}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-graphite-strong text-ink-primary tablet:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          transition={motionSprings.snappy}
          type="button"
          whileTap={reducedMotion ? undefined : { scale: interactionScale.button }}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={menuOpen ? "close" : "open"}
              animate={{ opacity: 1, rotate: 0 }}
              className="inline-flex"
              exit={reducedMotion ? undefined : { opacity: 0, rotate: menuOpen ? -20 : 20 }}
              initial={reducedMotion ? false : { opacity: 0, rotate: menuOpen ? 20 : -20 }}
              transition={{ duration: reducedMotion ? 0 : motionDurations.feedback }}
            >
              {menuOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            ref={menuPanelRef}
            aria-label="Mobile navigation"
            aria-modal="true"
            animate="open"
            className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-graphite-strong bg-graphite-page tablet:hidden"
            exit="closed"
            id="mobile-navigation"
            initial={reducedMotion ? false : "closed"}
            role="dialog"
            variants={menuContainerVariants}
          >
            <div aria-hidden="true" className="kwf-grid pointer-events-none absolute inset-0 opacity-35" />
            <nav aria-label="Mobile navigation" className="container-grid relative flex min-h-full flex-col py-6">
              <div className="grid">
                {navItems.map((item, index) => {
                    const active = item.id === activeSection;
                    const content = (
                      <>
                        <span className="flex items-center gap-4">
                          <span className="font-mono text-[0.68rem] text-signal">0{index + 1}</span>
                          {item.label}
                        </span>
                        <ArrowUpRight aria-hidden="true" className="text-signal" size={16} />
                        {active ? (
                          <motion.span
                            aria-hidden="true"
                            className="absolute bottom-0 left-0 h-px w-24 bg-signal"
                            layoutId="mobile-navigation-active"
                            transition={headerTransition}
                          />
                        ) : null}
                      </>
                    );

                    return (
                      <motion.div key={item.href} variants={menuItemVariants}>
                        {item.external ? (
                          <a
                            aria-label={`${item.label} (opens in a new tab)`}
                            className="relative flex min-h-16 items-center justify-between border-b border-graphite-strong px-1 text-xl font-semibold text-ink-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-signal"
                            data-mobile-nav-link={index === 0 ? true : undefined}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {content}
                          </a>
                        ) : (
                          <Link
                            aria-current={active ? "location" : undefined}
                            className="relative flex min-h-16 items-center justify-between border-b border-graphite-strong px-1 text-xl font-semibold text-ink-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-signal"
                            data-mobile-nav-link={index === 0 ? true : undefined}
                            href={item.href}
                            onClick={() => activateItem(item)}
                          >
                            {content}
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
              </div>

              <motion.div className="mt-auto pt-8" variants={menuItemVariants}>
                <InteractiveLink
                  className="flex min-h-14 items-center justify-between bg-signal px-5 text-base font-semibold text-graphite-page"
                  href="/#contact"
                  onClick={() => activateItem(contactNavItem)}
                >
                  Contact
                  <MotionArrow direction="up-right">
                    <ArrowUpRight size={17} />
                  </MotionArrow>
                </InteractiveLink>
                <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.065em] text-ink-muted">
                  KWF / Navigation interface
                </p>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
