"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ProjectMedia } from "@/components/project-media";
import { projects } from "@/data/projects";
import { projectVisuals } from "@/data/project-visuals";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SelectedWorkShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || window.innerWidth < 1024 || !pinRef.current) {
        return;
      }

      const panels = gsap.utils.toArray<HTMLElement>(".project-stage");
      gsap.set(panels.slice(1), { yPercent: 110, opacity: 0, scale: 0.96 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.4}`,
          pin: pinRef.current,
          scrub: 0.75,
          onUpdate: (self) => {
            const nextIndex = Math.min(projects.length - 1, Math.floor(self.progress * projects.length));
            setActiveIndex(nextIndex);
          },
        },
      });

      panels.forEach((panel, index) => {
        if (index === 0) {
          return;
        }

        timeline
          .to(
            panels[index - 1],
            {
              yPercent: -34,
              opacity: 0,
              scale: 0.96,
              duration: 1,
              ease: "power2.inOut",
            },
            index - 1,
          )
          .to(
            panel,
            {
              yPercent: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power2.inOut",
            },
            index - 0.88,
          );
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section ref={sectionRef} id="work" className="relative border-b border-graphite-border bg-graphite-page">
      <div ref={pinRef} className="container-grid py-20 tablet:py-28 desktop:min-h-screen desktop:py-20">
        <div className="mb-12 grid gap-6 desktop:grid-cols-12 desktop:items-end">
          <div className="desktop:col-span-7">
            <p className="technical-label mb-5 text-ink-muted">Selected work</p>
            <h2 className="max-w-4xl text-4xl font-semibold leading-none text-ink-primary tablet:text-6xl desktop:text-7xl">
              Three systems, three different kinds of ownership.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-[1.55] text-ink-secondary desktop:col-span-4 desktop:col-start-9">
            From sensor-heavy iOS gameplay to live dealership operations and native finance workflows, each project shows a different part of Kevin&apos;s engineering range.
          </p>
        </div>

        <div className="hidden desktop:grid desktop:grid-cols-[96px_1fr] desktop:gap-8">
          <div className="grid content-start gap-3 pt-10">
            {projects.map((project, index) => (
              <button
                key={project.slug}
                className="group flex items-center gap-3 text-left"
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <span className={activeIndex === index ? "h-px w-10 bg-signal" : "h-px w-6 bg-graphite-strong transition-all group-hover:w-10"} />
                <span className={activeIndex === index ? "technical-label text-signal" : "technical-label text-ink-muted"}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>

          <div className="relative min-h-[600px] overflow-hidden rounded-[10px] border border-graphite-strong bg-graphite-base">
            {projects.map((project, index) => {
              const visual = projectVisuals[index];
              return (
                <article key={project.slug} className="project-stage absolute inset-0 grid grid-cols-12 gap-6 p-7">
                  <div className="col-span-6 self-center">
                    <ProjectMedia project={project} variant="hero" className={index === 0 ? "min-h-[460px]" : "min-h-[420px]"} />
                  </div>
                  <div className="col-span-6 flex flex-col justify-between py-5">
                    <div>
                      <p className="technical-label mb-5 text-signal">{visual.technicalSignal}</p>
                      <h3 className="text-5xl font-semibold leading-none text-ink-primary wide:text-6xl">{project.name}</h3>
                      <p className="mt-6 max-w-lg text-lg leading-[1.55] text-ink-secondary">{visual.statement}</p>
                    </div>
                    <div className="grid gap-5">
                      <div className="grid grid-cols-2 gap-4 border-y border-graphite-border py-5">
                        <Meta label="Role" value={project.role} />
                        <Meta label="Status" value={visual.shortStatus} />
                      </div>
                      <p className="text-sm leading-6 text-ink-secondary">{visual.proof}</p>
                      <Link
                        className="group inline-flex w-fit items-center gap-2 rounded-[4px] bg-signal px-4 py-3 text-sm font-medium text-graphite-page transition-transform hover:-translate-y-0.5 active:translate-y-0"
                        href={`/projects/${project.slug}`}
                      >
                        View case study
                        <ArrowRight aria-hidden="true" className="transition group-hover:translate-x-1" size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5 desktop:hidden">
          {projects.map((project, index) => {
            const visual = projectVisuals[index];
            return (
              <motion.article
                key={project.slug}
                className="overflow-hidden rounded-[10px] border border-graphite-strong bg-graphite-base shadow-signal-sm"
                whileTap={{ scale: 0.985 }}
              >
                <Link className="block p-4" href={`/projects/${project.slug}`}>
                  <ProjectMedia project={project} variant="compact" className="shadow-none" />
                  <div className="mt-6">
                    <p className="technical-label mb-3 text-signal">{visual.index} / {project.platform}</p>
                    <h3 className="text-4xl font-semibold leading-none text-ink-primary">{project.name}</h3>
                    <p className="mt-4 text-sm leading-6 text-ink-secondary">{visual.statement}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-graphite-border pt-4">
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-muted">
                        {project.role}
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-ink-primary">
                        Open
                        <ArrowRight aria-hidden="true" size={15} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="technical-label mb-2 text-ink-muted">{label}</p>
      <p className="text-sm leading-6 text-ink-primary">{value}</p>
    </div>
  );
}
