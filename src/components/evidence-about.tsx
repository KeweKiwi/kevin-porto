"use client";

import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { workApproachContent } from "@/data/site-content";
import { cn } from "@/lib/cn";
import { motionDurations, motionEasings, motionSprings } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function EvidenceAbout() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const activeRow = workApproachContent.rows[activeIndex];

  useGSAP(
    () => {
      if (reducedMotion) {
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 78%",
          once: true,
        },
      });

      timeline
        .fromTo("[data-process-trace]", { scaleX: 0, transformOrigin: "left center" }, { duration: 0.9, ease: "power3.inOut", scaleX: 1 })
        .from("[data-process-step]", { autoAlpha: 0, duration: 0.45, ease: "power3.out", stagger: 0.08, y: 18 }, "-=0.55")
        .from("[data-process-answer]", { autoAlpha: 0, duration: 0.46, ease: "power3.out", y: 16 }, "-=0.16");
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  return (
    <section ref={rootRef} id="capabilities" className="relative overflow-hidden border-b border-graphite-strong bg-graphite-page py-20 tablet:py-28">
      <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-graphite-border" />
      <div className="container-grid relative">
        <div>
          <p className="font-mono text-xs uppercase text-signal">{workApproachContent.label}</p>
          <h2 className="mt-5 max-w-4xl text-balance font-display text-[clamp(2.75rem,7.5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink-primary tablet:text-[clamp(4rem,6vw,5.6rem)]">
            {workApproachContent.title}
          </h2>
        </div>

        <div className="relative mt-12 grid border-y border-graphite-strong tablet:grid-cols-3">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-signal" data-process-trace />
          {workApproachContent.rows.map((row, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={row.question}
                aria-pressed={active}
                className={cn(
                  "group relative isolate flex min-h-28 items-start gap-5 overflow-hidden border-b border-graphite-border px-1 py-6 text-left tablet:border-b-0 tablet:border-r tablet:px-6 tablet:last:border-r-0",
                  active ? "text-ink-primary" : "text-ink-muted hover:text-ink-primary",
                )}
                data-process-step
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                {active ? (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 z-0 bg-graphite-raised"
                    layoutId="work-approach-active-surface"
                    transition={motionSprings.layout}
                  />
                ) : null}
                <span className="relative z-10 font-mono text-sm text-signal">0{index + 1}</span>
                <span className="relative z-10 grid gap-1.5">
                  <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.065em] text-current">
                    {row.label}
                  </span>
                  <span className="text-sm font-medium leading-5 tablet:text-base tablet:leading-6">
                    {row.question}
                  </span>
                </span>
                <motion.span
                  animate={{ color: active ? "#D7F75B" : "#3A413F", x: active ? 3 : 0 }}
                  className="relative z-10 ml-auto mt-1 inline-flex shrink-0 group-hover:text-signal"
                  transition={motionSprings.snappy}
                >
                  <ArrowRight aria-hidden="true" size={16} />
                </motion.span>
                {active ? (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 z-10 h-px bg-signal"
                    layoutId="work-approach-active-rail"
                    transition={motionSprings.layout}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="min-h-[15rem] border-b border-graphite-strong py-8 tablet:py-10" data-process-answer>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRow.question}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-8 laptop:grid-cols-[minmax(0,1.25fr)_minmax(300px,.75fr)] laptop:items-end"
              exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              transition={{ duration: reducedMotion ? 0 : motionDurations.content, ease: motionEasings.precise }}
            >
              <p className="max-w-4xl text-2xl font-medium leading-[1.25] text-ink-primary tablet:text-4xl">
                {activeRow.answer}
              </p>
              <div className="border-l border-signal pl-5">
                <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-ink-muted">Project reference</p>
                <p className="mt-3 text-base text-ink-primary">{activeRow.evidence}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
