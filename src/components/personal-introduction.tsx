"use client";

import { Code2, GraduationCap, MapPin, Network, Smartphone } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { profile } from "@/data/profile";
import { prefersReducedMotionQuery } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const meta = [
  { icon: MapPin, label: "Location", value: "Indonesia" },
  { icon: GraduationCap, label: "Education", value: profile.education },
  { icon: Smartphone, label: "Academy", value: profile.academy },
  { icon: Code2, label: "Focus", value: "Native Apple + Production Web" },
] as const;

const capabilityLabels = [
  { label: "Native Apple", proof: "QuackFight / Squeaky" },
  { label: "Production Web", proof: "Rizki Mobil" },
  { label: "Technical Leadership", proof: "QuackFight / Squeaky" },
  { label: "Client Delivery", proof: "Rizki Mobil" },
] as const;

const profileSignals = [
  { label: "Build", detail: "Hands-on engineering" },
  { label: "Lead", detail: "Technical integration" },
  { label: "Ship", detail: "Production delivery" },
] as const;

export function PersonalIntroduction() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || window.matchMedia(prefersReducedMotionQuery).matches) {
        return;
      }

      gsap.from("[data-intro-reveal]", {
        y: 28,
        opacity: 0,
        duration: 0.72,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 76%",
          once: true,
        },
      });

      gsap.to(".portrait-scan", {
        xPercent: 116,
        duration: 4.8,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  return (
    <section
      ref={rootRef}
      id="about"
      className="relative overflow-hidden border-b border-graphite-border bg-graphite-page py-20 tablet:py-28 desktop:py-32"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-16 bg-graphite-page" />
      <div className="absolute left-[12%] top-0 hidden h-full w-px bg-graphite-border desktop:block" />
      <div className="container-grid grid gap-10 desktop:grid-cols-12 desktop:items-start">
        <div className="desktop:col-span-5" data-intro-reveal>
          <div
            aria-label="Kevin William Faith visual identity frame"
            className="relative aspect-[4/5] min-h-[420px] overflow-hidden border border-graphite-strong bg-graphite-base shadow-signal-sm"
            role="img"
          >
            <div className="absolute inset-0 kwf-grid opacity-40" />
            <span className="portrait-scan absolute left-[-54%] top-[43%] h-px w-[54%] bg-signal/55" />
            <span className="absolute left-5 top-5 h-7 w-7 border-l border-t border-signal/70" />
            <span className="absolute right-5 top-5 h-7 w-7 border-r border-t border-ink-primary/35" />
            <span className="absolute bottom-5 left-5 h-7 w-7 border-b border-l border-ink-primary/35" />
            <span className="absolute bottom-5 right-5 h-7 w-7 border-b border-r border-signal/70" />
            <div className="absolute inset-x-7 bottom-7">
              <p className="technical-label mb-4 text-signal">Profile signal</p>
              <div className="text-[clamp(5.4rem,18vw,8.5rem)] font-semibold leading-none text-ink-primary">
                KWF
              </div>
              <p className="mt-5 max-w-xs text-base font-semibold leading-tight text-ink-primary">
                Kevin William Faith
              </p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-ink-secondary">
                Native Apple developer with production web delivery experience.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-px overflow-hidden border border-graphite-strong bg-graphite-strong mobile:grid-cols-2">
            {meta.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="min-w-0 bg-graphite-base p-4">
                  <div className="mb-3 flex items-center gap-2 text-signal">
                    <Icon aria-hidden="true" size={15} strokeWidth={1.6} />
                    <p className="technical-label text-ink-muted">{item.label}</p>
                  </div>
                  <p className="break-words text-sm leading-6 text-ink-primary">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="desktop:col-span-6 desktop:col-start-7" data-intro-reveal>
          <p className="technical-label mb-5 text-ink-muted">01 / About</p>
          <h2 className="max-w-4xl text-4xl font-semibold leading-none text-ink-primary tablet:text-6xl desktop:text-7xl">
            Native Apple Developer with Production Web Delivery.
          </h2>
          <div className="mt-8 grid gap-5 text-base leading-[1.7] text-ink-secondary tablet:text-lg">
            <p>
              I&apos;m Kevin William Faith, a developer focused on building native Apple experiences and production web systems.
            </p>
            <p>
              I enjoy turning unclear requirements into working software, whether that means leading a multiplayer iOS project or delivering a live operational platform for a client.
            </p>
          </div>

          <div className="mt-10 grid gap-3 tablet:grid-cols-2">
            {capabilityLabels.map((item) => (
              <div key={item.label} className="border border-graphite-strong bg-graphite-base p-4">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="font-mono text-sm font-semibold uppercase tracking-[0.08em] text-ink-primary">
                    {item.label}
                  </p>
                  <span className="h-px w-8 bg-signal/60" />
                </div>
                <p className="text-sm leading-6 text-ink-secondary">{item.proof}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-px overflow-hidden border border-graphite-strong bg-graphite-strong tablet:grid-cols-3">
            {profileSignals.map((signal) => (
              <div key={signal.label} className="bg-graphite-base p-5">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <p className="text-3xl font-semibold leading-none text-ink-primary">{signal.label}</p>
                  <Network aria-hidden="true" className="text-signal" size={17} strokeWidth={1.6} />
                </div>
                <p className="technical-label text-ink-muted">{signal.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
