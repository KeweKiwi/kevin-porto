"use client";

import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { workApproachContent } from "@/data/site-content";

export function EvidenceAbout() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="capabilities" className="border-b border-graphite-strong bg-graphite-page py-20 tablet:py-28">
      <div className="container-grid">
        <p className="font-mono text-xs uppercase text-signal">{workApproachContent.label}</p>

        <div className="relative mt-9 grid gap-0 laptop:grid-cols-[10rem_1fr]">
          <span aria-hidden="true" className="absolute bottom-10 left-[4.75rem] top-10 hidden w-px bg-signal laptop:block" />

          {workApproachContent.rows.map((row, index) => {
            const active = index === activeIndex;
            return (
              <article key={row.question} className="contents">
                <button
                  aria-expanded={active}
                  className="relative flex min-h-20 items-center justify-between border-t border-graphite-strong py-4 text-left laptop:min-h-28 laptop:items-start laptop:pt-6"
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  <span className="font-mono text-5xl leading-none text-signal tablet:text-6xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="bg-graphite-page text-signal laptop:absolute laptop:left-[4.25rem] laptop:top-7">
                    {active ? <Minus aria-hidden="true" size={17} /> : <Plus aria-hidden="true" size={17} />}
                  </span>
                </button>

                <div className="border-t border-graphite-strong py-5 laptop:min-h-28 laptop:py-6">
                  <button
                    aria-expanded={active}
                    className="flex min-h-11 w-full items-center justify-between gap-5 text-left"
                    onClick={() => setActiveIndex(index)}
                    type="button"
                  >
                    <h3 className={active ? "text-lg font-semibold uppercase text-signal tablet:text-xl" : "text-lg font-semibold uppercase text-ink-primary tablet:text-xl"}>
                      {row.question}
                    </h3>
                    {active ? <Minus aria-hidden="true" className="text-signal laptop:hidden" size={17} /> : <Plus aria-hidden="true" className="text-signal laptop:hidden" size={17} />}
                  </button>

                  <AnimatePresence initial={false}>
                    {active ? (
                      <motion.div
                        animate={{ height: "auto", opacity: 1 }}
                        className="overflow-hidden"
                        exit={{ height: 0, opacity: 0 }}
                        initial={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="max-w-3xl pt-4 text-base leading-7 text-ink-secondary tablet:text-lg">
                          {row.answer}
                        </p>
                        <p className="pt-5 font-mono text-[0.6rem] uppercase text-signal">
                          Project / {row.evidence}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
