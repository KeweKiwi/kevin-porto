"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MediaSlot } from "@/components/media-slot";
import { aboutPortraitAsset } from "@/data/media-assets";
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
          clipPath: "inset(0 0 0 100%)",
          duration: 1,
          ease: "power4.out",
          scale: 1.025,
        })
        .from(
          "[data-about-title] > span > span",
          { yPercent: 110, duration: 0.66, ease: "power4.out", stagger: 0.08 },
          "-=0.58",
        )
        .from(
          "[data-about-copy], [data-about-meta]",
          { autoAlpha: 0, y: 18, duration: 0.46, stagger: 0.05, ease: "power3.out" },
          "-=0.28",
        )
        .from(
          "[data-about-capability]",
          { autoAlpha: 0, y: 18, duration: 0.38, stagger: 0.08, ease: "power3.out" },
          "-=0.18",
        )
        .fromTo(
          "[data-about-trace]",
          { scaleX: 0, transformOrigin: "left center" },
          { duration: 0.75, ease: "power3.inOut", scaleX: 1 },
          0.12,
        );
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  return (
    <section ref={rootRef} id="about" className="relative overflow-hidden border-b border-graphite-border bg-graphite-base py-20 tablet:py-28 desktop:py-32">
      <div className="container-grid relative">
        <div className="grid gap-12 laptop:grid-cols-12 laptop:items-center">
          <div className="relative z-10 laptop:col-span-7">
            <p className="mb-6 font-mono text-xs uppercase text-signal">{aboutContent.sectionLabel}</p>
            <h2 className="about-editorial-title text-ink-primary" data-about-title>
              <span className="block overflow-hidden">
                <span className="block">
                  {aboutContent.titleSegments.map((segment, index) => (
                    <span key={segment}>
                      <span className="whitespace-nowrap">{segment}</span>
                      {index < aboutContent.titleSegments.length - 1 ? " " : null}
                    </span>
                  ))}
                </span>
              </span>
            </h2>

            <span aria-hidden="true" className="mt-7 block h-px w-full max-w-xl bg-signal" data-about-trace />

            <div className="mt-7 grid max-w-3xl gap-4 text-base leading-7 text-ink-secondary tablet:grid-cols-2 tablet:text-lg tablet:leading-8" data-about-copy>
              {aboutContent.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative laptop:col-span-5" data-portrait-frame>
            <MediaSlot
              asset={aboutPortraitAsset}
              className="aspect-[4/5] border border-graphite-strong"
              imageClassName="object-cover object-center"
              sizes="(max-width: 1023px) 100vw, 40vw"
            />
            <span className="absolute -bottom-px -left-px border border-graphite-strong bg-graphite-page px-4 py-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-ink-secondary">
              Team delivery / Squeaky
            </span>
          </div>
        </div>

        <dl className="mt-12 grid border-y border-graphite-strong tablet:grid-cols-2 laptop:grid-cols-4">
          {metadata.map((item) => (
            <div key={item.label} className="border-b border-graphite-border py-5 tablet:px-5 tablet:[&:nth-last-child(-n+2)]:border-b-0 laptop:border-b-0 laptop:border-r laptop:last:border-r-0" data-about-meta>
              <dt className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-ink-muted">{item.label}</dt>
              <dd className="mt-2 max-w-xs text-sm leading-6 text-ink-primary">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid border-b border-graphite-strong tablet:grid-cols-3">
          {aboutContent.capabilities.map((item, index) => (
            <article key={item.label} className="border-b border-graphite-border py-6 tablet:border-b-0 tablet:border-r tablet:px-5 tablet:last:border-r-0" data-about-capability>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.035em] text-ink-primary">{item.label}</h3>
                <span className="font-mono text-[0.68rem] text-signal">0{index + 1}</span>
              </div>
              <p className="mt-3 max-w-sm text-base leading-7 text-ink-secondary">{item.proof}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
