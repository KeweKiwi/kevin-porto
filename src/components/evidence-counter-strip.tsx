"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { evidenceCounters } from "@/data/skills";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function EvidenceCounterStrip() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const primaryCounter = evidenceCounters.find((counter) => "prefix" in counter) ?? evidenceCounters[0];
  const supportingCounters = evidenceCounters.filter((counter) => counter !== primaryCounter);

  useGSAP(
    () => {
      const values = gsap.utils.toArray<HTMLElement>("[data-proof-value]");

      if (reducedMotion) {
        values.forEach((node) => {
          node.textContent = node.dataset.target ?? "0";
        });
        return;
      }

      values.forEach((node) => {
        const target = Number(node.dataset.target ?? 0);
        const state = { value: 0 };

        gsap.to(state, {
          value: target,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 82%", once: true },
          onUpdate: () => {
            node.textContent = String(Math.round(state.value));
          },
          onComplete: () => {
            node.textContent = String(target);
          },
        });
      });

      gsap.from("[data-proof-item]", {
        autoAlpha: 0,
        duration: 0.56,
        ease: "power3.out",
        stagger: 0.08,
        y: 18,
        scrollTrigger: { trigger: rootRef.current, start: "top 82%", once: true },
      });
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  return (
    <section ref={rootRef} aria-label="Project evidence" className="border-b border-graphite-strong bg-graphite-page py-16 tablet:py-20">
      <div className="container-grid grid border-y border-graphite-strong laptop:grid-cols-[minmax(0,1.25fr)_minmax(420px,.75fr)]">
        <article className="grid gap-5 py-9 laptop:grid-cols-[auto_1fr] laptop:items-end laptop:border-r laptop:border-graphite-strong laptop:pr-10" data-proof-item>
          <p className="font-display text-[clamp(5.5rem,13vw,10rem)] font-semibold leading-[0.78] tracking-[-0.055em] text-signal">
            {"prefix" in primaryCounter ? primaryCounter.prefix : ""}
            <span data-proof-value data-target={primaryCounter.value}>
              {reducedMotion ? primaryCounter.value : 0}
            </span>
          </p>
          <div className="max-w-xs pb-1">
            <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-ink-primary">{primaryCounter.label}</p>
            <p className="mt-3 text-base leading-7 text-ink-secondary">{primaryCounter.detail}</p>
          </div>
        </article>

        <div className="grid tablet:grid-cols-3 laptop:grid-cols-1">
          {supportingCounters.map((counter) => (
            <article key={counter.label} className="grid grid-cols-[5rem_1fr] items-center border-t border-graphite-strong py-5 tablet:border-l tablet:border-t-0 tablet:px-5 laptop:border-l-0 laptop:border-t laptop:px-7 laptop:first:border-t-0" data-proof-item>
              <p className="font-display text-4xl font-semibold leading-none tracking-[-0.04em] text-ink-primary">
                <span data-proof-value data-target={counter.value}>
                  {reducedMotion ? counter.value : 0}
                </span>
              </p>
              <div>
                <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-ink-primary">{counter.label}</p>
                <p className="mt-1 text-base leading-6 text-ink-secondary">{counter.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
