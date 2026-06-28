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

  useGSAP(
    () => {
      const nodes = gsap.utils.toArray<HTMLElement>("[data-counter-value]");

      if (reducedMotion) {
        nodes.forEach((node) => {
          node.textContent = node.dataset.target ?? "0";
        });
        return;
      }

      nodes.forEach((node) => {
        const target = Number(node.dataset.target ?? 0);
        const state = { value: 0 };

        gsap.to(state, {
          value: target,
          duration: 1.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 88%",
            once: true,
          },
          onUpdate: () => {
            node.textContent = String(Math.round(state.value));
          },
          onComplete: () => {
            node.textContent = String(target);
          },
        });
      });

      gsap.from("[data-counter-card]", {
        y: 18,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  return (
    <section
      ref={rootRef}
      aria-label="Verified project evidence"
      className="relative border-b border-graphite-border bg-graphite-page py-8 tablet:py-10"
    >
      <div className="container-grid">
        <div className="grid gap-px overflow-hidden rounded-[10px] border border-graphite-strong bg-graphite-strong tablet:grid-cols-4">
          {evidenceCounters.map((counter) => (
            <div
              key={counter.label}
              className="grid min-h-[150px] content-between bg-graphite-base p-5 tablet:min-h-[172px] desktop:p-6"
              data-counter-card
            >
              <div className="flex items-start justify-between gap-4">
                <p className="technical-label text-ink-muted">{counter.label}</p>
                <span className="h-px w-8 bg-signal/60" />
              </div>
              <div>
                <p className="font-mono text-5xl font-semibold leading-none text-ink-primary tablet:text-6xl">
                  {"prefix" in counter ? counter.prefix : ""}
                  <span data-counter-value data-target={counter.value}>
                    {reducedMotion ? counter.value : 0}
                  </span>
                </p>
                <p className="mt-4 text-sm leading-6 text-ink-secondary">{counter.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
