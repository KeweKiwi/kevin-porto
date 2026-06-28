"use client";

import Link from "next/link";
import { ArrowRight, CircleDot } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ProjectMedia } from "@/components/project-media";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { projectVisuals } from "@/data/project-visuals";
import { INTRO_REVEAL_EVENT } from "@/lib/intro";
import { prefersReducedMotionQuery } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

gsap.registerPlugin(useGSAP);

export function HeroDossier() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [introReady, setIntroReady] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const activeProject = projects[activeIndex];
  const activeVisual = projectVisuals[activeIndex];

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % projects.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  useEffect(() => {
    function revealHero() {
      setIntroReady(true);
    }

    window.addEventListener(INTRO_REVEAL_EVENT, revealHero, { once: true });

    const fallbackTimer = window.setTimeout(revealHero, 2600);

    return () => {
      window.removeEventListener(INTRO_REVEAL_EVENT, revealHero);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

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
        .from(".portrait-aperture", {
          clipPath: "inset(48% 22% 48% 22%)",
          scale: 0.96,
          opacity: 0,
          duration: 0.78,
        })
        .from(
          ".hero-greeting",
          {
            y: 14,
            opacity: 0,
            duration: 0.36,
          },
          "-=0.28",
        )
        .from(
          ".hero-line",
          {
            yPercent: 112,
            duration: 0.82,
            stagger: 0.08,
          },
          "-=0.2",
        )
        .from(
          ".hero-copy",
          {
            y: 18,
            opacity: 0,
            duration: 0.45,
          },
          "-=0.32",
        )
        .from(
          ".hero-actions",
          {
            y: 16,
            opacity: 0,
            duration: 0.42,
          },
          "-=0.24",
        )
        .from(
          ".hero-rule",
          {
            scaleX: 0,
            opacity: 0,
            transformOrigin: "left center",
            duration: 0.48,
            stagger: 0.08,
          },
          "-=0.46",
        )
        .from(
          ".hero-signal-field",
          {
            opacity: 0,
            scale: 0.985,
            duration: 0.7,
          },
          "-=0.55",
        )
        .from(
          ".signal-panel",
          {
            x: 42,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.55",
        );

      gsap.to(".signal-scan-line", {
        xPercent: 115,
        duration: 4.8,
        ease: "none",
        repeat: -1,
        stagger: 0.55,
      });

      gsap.to(".signal-marker", {
        opacity: 0.28,
        scale: 0.92,
        duration: 1.7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.28,
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
      className="relative min-h-[100svh] overflow-hidden border-b border-graphite-border pt-20"
      onPointerMove={handlePointerMove}
      style={
        {
          "--hero-x": 0,
          "--hero-y": 0,
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0 opacity-30">
        <div className="hero-rule absolute left-[8%] top-[17%] h-px w-[84%] bg-graphite-border" />
        <div className="hero-rule absolute left-[22%] top-[10%] h-[72%] w-px bg-graphite-border" />
        <div className="hero-rule absolute bottom-[12%] right-[9%] h-px w-[42%] bg-graphite-strong" />
      </div>
      <div
        aria-hidden="true"
        className="hero-signal-field pointer-events-none absolute inset-y-20 right-[4%] hidden w-[54%] overflow-hidden rounded-[10px] border border-graphite-border/70 opacity-55 laptop:block"
        style={{
          transform:
            "translate3d(calc(var(--hero-x) * 10px), calc(var(--hero-y) * 7px), 0)",
        }}
      >
        <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(to_right,rgba(215,247,91,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(243,240,232,.055)_1px,transparent_1px)] [background-size:52px_52px]" />
        <span className="signal-scan-line absolute left-[-38%] top-[24%] h-px w-[42%] bg-signal/45" />
        <span className="signal-scan-line absolute left-[-46%] top-[48%] h-px w-[52%] bg-ink-primary/18" />
        <span className="signal-scan-line absolute left-[-34%] top-[72%] h-px w-[36%] bg-signal/30" />
        <span className="signal-marker absolute left-[18%] top-[31%] h-2 w-2 rounded-full border border-signal/70" />
        <span className="signal-marker absolute right-[14%] top-[18%] h-1.5 w-1.5 rounded-full bg-signal/70" />
        <span className="signal-marker absolute bottom-[18%] left-[42%] h-2 w-2 rounded-full border border-ink-primary/35" />
      </div>

      <div className="container-grid grid min-h-[calc(100svh-5rem)] content-center gap-10 py-10 tablet:py-14 laptop:grid-cols-12 laptop:items-center laptop:gap-6">
        <div className="relative z-10 laptop:col-span-5">
          <p className="hero-greeting technical-label mb-6 text-ink-muted">Hello, I&apos;m Kevin.</p>
          <h1 className="max-w-5xl text-[clamp(3.4rem,14vw,6.2rem)] font-bold leading-[0.9] tracking-normal text-ink-primary laptop:text-[clamp(4.1rem,5.2vw,5.9rem)]">
            {["I build native", "Apple experiences", "and production", "web systems."].map((line) => (
              <span key={line} className="block overflow-hidden pb-2">
                <span className="hero-line block">{line}</span>
              </span>
            ))}
          </h1>
          <p className="hero-copy mt-8 max-w-xl text-base leading-[1.55] text-ink-secondary tablet:text-lg">
            {profile.intro}
          </p>
          <div className="hero-actions mt-8 flex flex-wrap gap-3">
            <Link
              className="group inline-flex items-center gap-2 rounded-[4px] bg-signal px-4 py-3 text-sm font-medium text-graphite-page transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              href="#work"
            >
              Explore work
              <ArrowRight aria-hidden="true" className="transition group-hover:translate-x-1" size={16} />
            </Link>
            <Link
              className="inline-flex items-center gap-2 rounded-[4px] border border-graphite-strong px-4 py-3 text-sm font-medium text-ink-primary transition hover:border-signal hover:text-signal"
              href="#about"
            >
              Meet Kevin
            </Link>
          </div>
        </div>

        <div className="relative z-10 grid gap-5 laptop:col-span-7 laptop:grid-cols-[0.82fr_1.18fr] laptop:items-end">
          <div
            className="portrait-aperture relative z-10 min-h-[360px] overflow-hidden rounded-[10px] border border-graphite-strong bg-graphite-base p-5 shadow-signal tablet:min-h-[430px]"
            style={{
              transform:
                "translate3d(calc(var(--hero-x) * -14px), calc(var(--hero-y) * -10px), 0)",
            }}
          >
            <div className="absolute inset-5 border border-graphite-border" />
            <div className="absolute inset-x-10 top-10 h-px bg-signal/55" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="technical-label mb-4 text-signal">Identity file</p>
              <div className="text-[clamp(5rem,18vw,9rem)] font-bold leading-none text-ink-primary/95 laptop:text-[6.5rem]">
                KW
              </div>
              <p className="mt-5 max-w-xs text-sm leading-6 text-ink-secondary">
                {profile.role}. Product-minded execution across Apple platforms and the web.
              </p>
            </div>
            <div className="absolute right-6 top-6 grid gap-2 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-ink-muted">
              <span>{profile.academy}</span>
              <span>{profile.education}</span>
            </div>
          </div>

          <div
            className="signal-panel relative z-10 overflow-hidden rounded-[10px] border border-graphite-strong bg-graphite-base p-4 shadow-signal"
            style={{
              transform:
                "translate3d(calc(var(--hero-x) * 18px), calc(var(--hero-y) * 12px), 0)",
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-signal">
                <CircleDot aria-hidden="true" size={13} />
                Active project signal
              </div>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-muted">
                {activeVisual.index}
              </span>
            </div>
            <ProjectMedia project={activeProject} variant="compact" className="shadow-none" />
            <div className="mt-5 grid gap-4">
              <div>
                <p className="technical-label mb-2 text-ink-muted">{activeProject.name}</p>
                <p className="text-sm leading-6 text-ink-primary">{activeVisual.statement}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <SignalDatum label="Role" value={activeProject.role} />
                <SignalDatum label="Status" value={activeVisual.shortStatus} />
              </div>
              <div className="flex flex-wrap gap-2">
                {activeVisual.markers.map((marker) => (
                  <span
                    key={marker}
                    className="rounded-[4px] border border-graphite-strong px-2.5 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-ink-secondary"
                  >
                    {marker}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignalDatum({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-graphite-border pt-3">
      <p className="technical-label mb-2 text-ink-muted">{label}</p>
      <p className="text-xs leading-5 text-ink-secondary">{value}</p>
    </div>
  );
}
