"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MediaSlot } from "@/components/media-slot";
import { portraitAsset } from "@/data/media-assets";
import { profile } from "@/data/profile";
import { aboutContent } from "@/data/site-content";
import { prefersReducedMotionQuery } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const metadata = [
  { label: "Location", value: "Indonesia" },
  { label: "Education", value: profile.education },
  { label: "Program", value: profile.academy },
  { label: "Focus", value: aboutContent.focusLabel },
] as const;

export function PersonalIntroduction() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || window.matchMedia(prefersReducedMotionQuery).matches) {
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 72%",
          once: true,
        },
      });

      timeline
        .from("[data-portrait-frame]", {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.9,
          ease: "power4.out",
          scale: 1.035,
        })
        .from(
          "[data-about-title] > span > span",
          { yPercent: 110, duration: 0.66, ease: "power4.out", stagger: 0.08 },
          "-=0.58",
        )
        .from(
          "[data-about-copy], [data-about-meta]",
          { autoAlpha: 0, x: 20, duration: 0.42, stagger: 0.06, ease: "power3.out" },
          "-=0.28",
        )
        .from(
          "[data-about-capability]",
          { autoAlpha: 0, y: 18, duration: 0.38, stagger: 0.08, ease: "power3.out" },
          "-=0.18",
        )
        .fromTo(
          "[data-about-trace]",
          { scaleY: 0, transformOrigin: "top center" },
          { duration: 0.7, ease: "power3.inOut", scaleY: 1 },
          0.12,
        );
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  const titleLines = ["Engineering with ownership,", "from architecture to delivery."];

  return (
    <section ref={rootRef} id="about" className="relative overflow-hidden border-b border-graphite-border bg-graphite-page py-20 tablet:py-28 desktop:py-32">
      <span aria-hidden="true" className="absolute right-0 top-4 hidden text-[12rem] font-semibold leading-none text-graphite-raised desktop:block">
        02
      </span>

      <div className="container-grid relative grid gap-12 laptop:grid-cols-12 laptop:items-stretch">
        <div className="relative laptop:col-span-5" data-portrait-frame>
          <MediaSlot
            asset={portraitAsset}
            className="aspect-[4/5] min-h-[440px] border-r border-graphite-strong tablet:min-h-[620px]"
            sizes="(max-width: 1023px) 100vw, 42vw"
          />
          <span aria-hidden="true" className="absolute -left-4 top-10 h-[72%] w-px bg-signal" data-about-trace />
        </div>

        <div className="relative z-10 laptop:col-span-6 laptop:col-start-7 laptop:self-center">
          <p className="mb-6 font-mono text-xs uppercase text-signal">{aboutContent.sectionLabel}</p>
          <h2 className="about-editorial-title uppercase text-ink-primary" data-about-title>
            {titleLines.map((line) => (
              <span key={line} className="block overflow-hidden">
                <span className="block">{line}</span>
              </span>
            ))}
          </h2>

          <div className="mt-7 max-w-2xl space-y-4 text-base leading-7 text-ink-secondary tablet:text-lg tablet:leading-8" data-about-copy>
            {aboutContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-9 border-y border-graphite-strong">
            {metadata.map((item) => (
              <div key={item.label} className="grid gap-2 border-b border-graphite-border py-3 last:border-b-0 tablet:grid-cols-[7rem_1fr]" data-about-meta>
                <dt className="font-mono text-[0.6rem] uppercase text-signal">{item.label}</dt>
                <dd className="text-sm leading-6 text-ink-primary">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-9 grid gap-6 tablet:grid-cols-3">
            {aboutContent.capabilities.map((item) => (
              <article key={item.label} className="border-l border-graphite-strong pl-4" data-about-capability>
                <div className="flex items-center gap-2 text-signal">
                  <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.5} />
                  <h3 className="text-lg font-semibold uppercase text-ink-primary">{item.label}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-ink-secondary">{item.proof}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
