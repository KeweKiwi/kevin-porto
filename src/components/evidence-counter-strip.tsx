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
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 84%", once: true },
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
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.07,
        x: -14,
        scrollTrigger: { trigger: rootRef.current, start: "top 84%", once: true },
      });
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  return (
    <section ref={rootRef} aria-label="Project highlights" className="border-b border-graphite-strong bg-graphite-page py-12 tablet:py-16">
      <div className="container-grid grid gap-8 tablet:grid-cols-2 laptop:grid-cols-4">
        {evidenceCounters.map((counter, index) => (
          <article key={counter.label} className="proof-strip-item relative border-l border-graphite-strong pl-5" data-proof-item>
            <p className="font-mono text-5xl leading-none text-signal tablet:text-6xl">
              {"prefix" in counter ? counter.prefix : ""}
              <span data-proof-value data-target={counter.value}>
                {reducedMotion ? counter.value : 0}
              </span>
            </p>
            <p className="mt-4 font-mono text-[0.65rem] uppercase text-ink-primary">
              <span className="mr-2 text-ink-muted">{String(index + 1).padStart(2, "0")}</span>
              {counter.label}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-ink-secondary">{counter.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
