"use client";

import Link from "next/link";
import {
  ArrowRight,
  Braces,
  Database,
  Download,
  MapPin,
  MessageCircle,
  Smartphone,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { profile } from "@/data/profile";
import { INTRO_REVEAL_EVENT } from "@/lib/intro";
import { prefersReducedMotionQuery } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

gsap.registerPlugin(useGSAP);

const heroMeta = [
  { label: "Based in", value: "Indonesia" },
  { label: "Academy", value: "Apple Developer Academy @UC" },
  { label: "Focus", value: "iOS + Web" },
] as const;

const coordinates = ["-06.2 / 106.8", "build: native", "ship: web", "signal: ready"] as const;

export function HeroDossier() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [introReady, setIntroReady] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setIntroReady(true);
      return;
    }

    let revealed = false;

    function revealHero() {
      if (revealed) {
        return;
      }

      revealed = true;
      setIntroReady(true);
    }

    window.addEventListener(INTRO_REVEAL_EVENT, revealHero, { once: true });
    const fallbackTimer = window.setTimeout(revealHero, 7200);

    return () => {
      window.removeEventListener(INTRO_REVEAL_EVENT, revealHero);
      window.clearTimeout(fallbackTimer);
    };
  }, [reducedMotion]);

  useGSAP(
    () => {
      if (
        !introReady ||
        reducedMotion ||
        window.matchMedia(prefersReducedMotionQuery).matches
      ) {
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .from(".hero-grid-plane", {
          opacity: 0,
          scale: 0.985,
          duration: 0.75,
        })
        .from(
          ".hero-meta",
          {
            y: 16,
            opacity: 0,
            duration: 0.42,
            stagger: 0.06,
          },
          "-=0.35",
        )
        .from(
          ".hero-name-primary",
          {
            clipPath: "inset(0 0 100% 0)",
            y: 44,
            duration: 0.82,
          },
          "-=0.16",
        )
        .from(
          ".hero-name-outline",
          {
            clipPath: "inset(100% 0 0 0)",
            y: -28,
            opacity: 0,
            duration: 0.78,
          },
          "-=0.56",
        )
        .from(
          ".hero-positioning",
          {
            y: 18,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.28",
        )
        .from(
          ".hero-copy",
          {
            y: 16,
            opacity: 0,
            duration: 0.48,
          },
          "-=0.3",
        )
        .from(
          ".hero-actions",
          {
            y: 14,
            opacity: 0,
            duration: 0.44,
          },
          "-=0.26",
        )
        .from(
          ".hero-symbol",
          {
            scale: 0.88,
            opacity: 0,
            duration: 0.46,
            stagger: 0.08,
          },
          "-=0.48",
        )
        .from(
          ".hero-coordinate",
          {
            y: 10,
            opacity: 0,
            duration: 0.36,
            stagger: 0.05,
          },
          "-=0.34",
        );

      gsap.to(".hero-scanline", {
        xPercent: 118,
        duration: 5.6,
        ease: "none",
        repeat: -1,
        stagger: 0.55,
      });

      gsap.to(".hero-pulse", {
        opacity: 0.34,
        scale: 0.92,
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.22,
      });
    },
    { scope: rootRef, dependencies: [introReady, reducedMotion] },
  );

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (reducedMotion || !rootRef.current) {
      return;
    }

    const rect = rootRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rootRef.current.style.setProperty("--hero-x", x.toFixed(3));
    rootRef.current.style.setProperty("--hero-y", y.toFixed(3));
  }

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] overflow-hidden border-b border-graphite-border pt-16 tablet:pt-[4.5rem]"
      onPointerMove={handlePointerMove}
      style={
        {
          "--hero-x": 0,
          "--hero-y": 0,
        } as React.CSSProperties
      }
    >
      <div aria-hidden="true" className="hero-grid-plane absolute inset-0">
        <div className="absolute inset-0 opacity-70 kwf-grid" />
        <span className="hero-scanline absolute left-[-44%] top-[26%] h-px w-[44%] bg-signal/45" />
        <span className="hero-scanline absolute left-[-52%] top-[58%] h-px w-[52%] bg-ink-primary/16" />
        <span className="hero-scanline absolute left-[-38%] top-[76%] h-px w-[38%] bg-signal/30" />
        <span className="absolute left-[12%] top-[19%] h-px w-[76%] bg-graphite-border" />
        <span className="absolute bottom-[18%] left-[18%] h-px w-[64%] bg-graphite-border" />
        <span className="absolute left-[50%] top-[12%] hidden h-[72%] w-px bg-graphite-border tablet:block" />
      </div>

      <div
        aria-hidden="true"
        className="hero-symbol hero-pulse absolute left-[9%] top-[28%] hidden h-12 w-12 items-center justify-center border border-graphite-strong text-signal tablet:flex"
        style={{
          transform:
            "translate3d(calc(var(--hero-x) * -16px), calc(var(--hero-y) * -10px), 0)",
        }}
      >
        <Braces size={18} strokeWidth={1.6} />
      </div>
      <div
        aria-hidden="true"
        className="hero-symbol hero-pulse absolute right-[12%] top-[31%] hidden h-11 w-11 items-center justify-center border border-graphite-strong text-ink-secondary laptop:flex"
        style={{
          transform:
            "translate3d(calc(var(--hero-x) * 14px), calc(var(--hero-y) * 8px), 0)",
        }}
      >
        <Database size={17} strokeWidth={1.6} />
      </div>
      <div
        aria-hidden="true"
        className="hero-symbol hero-pulse absolute bottom-[22%] right-[19%] hidden h-10 w-10 items-center justify-center border border-graphite-strong text-signal/90 tablet:flex"
        style={{
          transform:
            "translate3d(calc(var(--hero-x) * 9px), calc(var(--hero-y) * 14px), 0)",
        }}
      >
        <Smartphone size={17} strokeWidth={1.6} />
      </div>

      <div className="container-grid relative z-10 flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center gap-8 py-12 text-center tablet:min-h-[calc(100svh-4.5rem)] tablet:gap-10 tablet:py-16">
        <div className="hero-meta flex max-w-5xl flex-wrap items-center justify-center gap-2 text-ink-muted">
          {heroMeta.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 border border-graphite-border bg-graphite-page/72 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.08em]"
            >
              <span className="text-signal">{item.label}</span>
              <span>{item.value}</span>
            </span>
          ))}
        </div>

        <div className="max-w-[min(1160px,100%)]">
          <h1
            aria-label={profile.name}
            className="select-none text-center font-sans font-semibold tracking-normal"
          >
            <span className="hero-name-primary block overflow-hidden text-[clamp(4.4rem,22vw,13.8rem)] leading-[0.78] text-ink-primary tablet:text-[clamp(7rem,16vw,15rem)]">
              KEVIN
            </span>
            <span className="hero-name-outline kwf-outline block overflow-hidden whitespace-nowrap text-[clamp(2rem,10.8vw,9.2rem)] leading-[0.92] tablet:text-[clamp(4.2rem,9.5vw,10rem)]">
              WILLIAM FAITH
            </span>
          </h1>

          <p className="hero-positioning mt-7 text-[clamp(1.2rem,4.4vw,2.45rem)] font-semibold leading-tight text-ink-primary tablet:mt-8">
            Native Apple Engineering. Production Web Delivery.
          </p>
          <p className="hero-copy mx-auto mt-5 max-w-2xl text-sm leading-[1.7] text-ink-secondary tablet:text-base">
            Developer focused on native Apple experiences, technical leadership, and production web systems.
          </p>
        </div>

        <div className="hero-actions flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:justify-center">
          <Link
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] bg-signal px-5 py-3 text-sm font-medium text-graphite-page transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
            href="#work"
          >
            View Projects
            <ArrowRight aria-hidden="true" className="transition group-hover:translate-x-1" size={16} />
          </Link>
          {profile.resumeUrl ? (
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] border border-graphite-strong px-5 py-3 text-sm font-medium text-ink-primary transition hover:border-signal hover:text-signal"
              href={profile.resumeUrl}
            >
              Download Resume
              <Download aria-hidden="true" size={16} />
            </a>
          ) : null}
          <Link
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] border border-graphite-strong px-5 py-3 text-sm font-medium text-ink-primary transition hover:border-signal hover:text-signal"
            href="#contact"
          >
            Let&apos;s Talk
            <MessageCircle aria-hidden="true" size={16} />
          </Link>
        </div>

        <div className="hero-coordinate grid w-full max-w-4xl grid-cols-2 gap-2 pt-2 text-left tablet:grid-cols-4">
          {coordinates.map((coordinate, index) => (
            <div
              key={coordinate}
              className="border-t border-graphite-border pt-3 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-ink-muted"
            >
              <span className="mr-2 text-signal">{String(index + 1).padStart(2, "0")}</span>
              {coordinate}
            </div>
          ))}
        </div>

        <div className="hero-meta flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-muted">
          <MapPin aria-hidden="true" className="text-signal" size={14} />
          Based in Indonesia
        </div>
      </div>
    </section>
  );
}
