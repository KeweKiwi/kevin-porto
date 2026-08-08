"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { InteractiveAnchor, InteractiveLink, MotionArrow } from "@/components/interactive-link";
import { PortraitComposition } from "@/components/hero/portrait-composition";
import { SegmentedName } from "@/components/hero/segmented-name";
import { SkillSignalMarquee } from "@/components/skill-signal-marquee";
import { profile } from "@/data/profile";
import { heroContent } from "@/data/site-content";
import { INTRO_REVEAL_EVENT } from "@/lib/intro";
import { prefersReducedMotionQuery } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

gsap.registerPlugin(useGSAP);

export function HeroDossier() {
  const rootRef = useRef<HTMLElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const insetOneRef = useRef<HTMLDivElement | null>(null);
  const insetTwoRef = useRef<HTMLDivElement | null>(null);
  const [introReady, setIntroReady] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setIntroReady(true);
      return;
    }

    const revealHero = () => setIntroReady(true);
    window.addEventListener(INTRO_REVEAL_EVENT, revealHero, { once: true });
    const fallbackTimer = window.setTimeout(revealHero, 6500);

    return () => {
      window.removeEventListener(INTRO_REVEAL_EVENT, revealHero);
      window.clearTimeout(fallbackTimer);
    };
  }, [reducedMotion]);

  useGSAP(
    () => {
      if (!introReady || reducedMotion || window.matchMedia(prefersReducedMotionQuery).matches) {
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from("[data-hero-greeting]", { autoAlpha: 0, duration: 0.24, x: -14 })
        .from(
          "[data-hero-name-mask]",
          { duration: 0.58, stagger: 0.055, yPercent: 108 },
          "-=0.08",
        )
        .fromTo(
          "[data-hero-stencil-middle]",
          { x: (index) => (index % 2 === 0 ? -11 : 9) },
          { duration: 0.42, stagger: 0.04, x: 0 },
          "-=0.42",
        )
        .from(
          "[data-hero-portrait]",
          { clipPath: "inset(0 0 100% 0)", duration: 0.78, scale: 1.035 },
          "-=0.48",
        )
        .from("[data-hero-tech-surface]", { autoAlpha: 0, duration: 0.3 }, "-=0.2")
        .fromTo(
          "[data-hero-measure-path]",
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { duration: 0.44, stagger: 0.018, strokeDashoffset: 0 },
          "-=0.52",
        )
        .from("[data-hero-measurements]", { autoAlpha: 0, duration: 0.28 }, "-=0.45")
        .from(
          "[data-hero-inset]",
          { autoAlpha: 0, clipPath: "inset(100% 0 0 0)", duration: 0.46, stagger: 0.08, y: 16 },
          "-=0.34",
        )
        .fromTo(
          "[data-hero-connector-path]",
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { duration: 0.48, strokeDashoffset: 0 },
          "-=0.36",
        )
        .from("[data-hero-positioning], [data-hero-summary]", {
          autoAlpha: 0,
          duration: 0.36,
          stagger: 0.055,
          y: 14,
        }, "-=0.32")
        .from("[data-hero-action]", { autoAlpha: 0, duration: 0.3, stagger: 0.06, y: 10 }, "-=0.22")
        .from("[data-hero-marquee]", { autoAlpha: 0, duration: 0.32, y: 18 }, "-=0.18");

    },
    { scope: rootRef, dependencies: [introReady, reducedMotion] },
  );

  return (
    <section ref={rootRef} className="kinetic-hero bg-graphite-page pt-16 tablet:pt-[4.5rem]">
      <div className="kinetic-hero-artboard container-grid">
        <span aria-hidden="true" className="hero-artboard-corner hero-artboard-corner-a" />
        <span aria-hidden="true" className="hero-artboard-corner hero-artboard-corner-b" />
        <span aria-hidden="true" className="hero-artboard-corner hero-artboard-corner-c" />
        <span aria-hidden="true" className="hero-artboard-corner hero-artboard-corner-d" />

        <div className="kinetic-hero-grid">
          <div className="hero-identity-block">
            <div className="hero-greeting" data-hero-greeting>
              <span aria-hidden="true" className="hero-greeting-corner" />
              <p>{heroContent.greeting}</p>
              <span aria-hidden="true" className="hero-greeting-rule" />
              <span aria-hidden="true" className="hero-greeting-node" />
            </div>

            <SegmentedName name={profile.name} />
          </div>

          <PortraitComposition
            insetOneRef={insetOneRef}
            insetTwoRef={insetTwoRef}
            portraitRef={portraitRef}
          />

          <div className="hero-copy-block">
            <p className="hero-positioning" data-hero-positioning>
              {heroContent.positioning}
            </p>
            <p className="hero-summary" data-hero-summary>
              {heroContent.summary}
            </p>

            <div className="hero-actions">
              <span className="inline-flex" data-hero-action>
                <InteractiveLink className="kinetic-primary-action" href="#work">
                  <span>{heroContent.primaryAction}</span>
                  <MotionArrow>
                    <ArrowRight size={17} />
                  </MotionArrow>
                </InteractiveLink>
              </span>
              {profile.githubUrl ? (
                <span className="inline-flex" data-hero-action>
                  <InteractiveAnchor
                    aria-label="Open GitHub profile"
                    className="kinetic-secondary-action"
                    href={profile.githubUrl}
                    interactionLevel="subtle"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>{heroContent.secondaryAction}</span>
                    <MotionArrow direction="up-right">
                      <ArrowUpRight size={15} />
                    </MotionArrow>
                  </InteractiveAnchor>
                </span>
              ) : null}
            </div>
          </div>

          <svg aria-hidden="true" className="hero-connector" preserveAspectRatio="none" viewBox="0 0 1000 700">
            <path
              className="hero-connector-path"
              d="M470 610H512V468H548"
              data-hero-connector-path
              pathLength="1"
            />
            <rect className="hero-connector-node" height="8" width="8" x="544" y="464" />
          </svg>
        </div>
      </div>

      <SkillSignalMarquee />
    </section>
  );
}
