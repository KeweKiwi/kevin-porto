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
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || window.innerWidth < 1024 || !pinRef.current) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>(".project-reel-card");
      const stepCount = Math.max(projects.length - 1, 1);

      const cardState = (offset: number) => {
        if (offset === 0) {
          return {
            autoAlpha: 1,
            filter: "blur(0px)",
            rotateY: 0,
            scale: 1,
            xPercent: -50,
            yPercent: -50,
            zIndex: 5,
          };
        }

        if (offset === -1) {
          return {
            autoAlpha: 0.28,
            filter: "blur(1.2px)",
            rotateY: 9,
            scale: 0.7,
            xPercent: -92,
            yPercent: -50,
            zIndex: 2,
          };
        }

        if (offset === 1) {
          return {
            autoAlpha: 0.34,
            filter: "blur(1.2px)",
            rotateY: -9,
            scale: 0.7,
            xPercent: 24,
            yPercent: -50,
            zIndex: 2,
          };
        }

        return {
          autoAlpha: 0,
          filter: "blur(2px)",
          rotateY: offset < 0 ? 12 : -12,
          scale: 0.54,
          xPercent: offset < 0 ? -150 : 82,
          yPercent: -50,
          zIndex: 1,
        };
      };

      gsap.set(".casefile-stage", { perspective: 1400 });
      gsap.set(cards, {
        transformOrigin: "center center",
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
      });
      cards.forEach((card, index) => gsap.set(card, cardState(index)));
      gsap.set(".project-reel-media", { y: 0 });
      gsap.set(".project-reel-copy", { y: 0 });
      gsap.set(".work-reel-beam", { autoAlpha: 0.42, xPercent: -180 });
      gsap.set(".work-progress-line", { scaleY: 0, transformOrigin: "top center" });
      gsap.set(".project-reel-frame-line", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".project-reel-frame-drop", { scaleY: 0, transformOrigin: "top center" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "selected-work-showcase",
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * stepCount * 1.25}`,
          pin: pinRef.current,
          scrub: 0.8,
          onUpdate: (self) => {
            const nextIndex = Math.min(
              projects.length - 1,
              Math.round(self.progress * (projects.length - 1)),
            );

            if (activeIndexRef.current !== nextIndex) {
              activeIndexRef.current = nextIndex;
              setActiveIndex(nextIndex);
            }
          },
        },
      });

      timeline
        .to(".work-progress-line", { scaleY: 1, duration: stepCount, ease: "none" }, 0)
        .to(".work-reel-beam", { xPercent: 520, duration: stepCount, ease: "none" }, 0)
        .to(".project-reel-frame-line", { scaleX: 1, duration: 0.28, ease: "power3.out" }, 0)
        .to(".project-reel-frame-drop", { scaleY: 1, duration: 0.28, ease: "power3.out" }, 0.04);

      projects.slice(1).forEach((_, stepIndex) => {
        const nextActiveIndex = stepIndex + 1;

        cards.forEach((card, cardIndex) => {
          timeline.to(
            card,
            {
              ...cardState(cardIndex - nextActiveIndex),
              duration: 1,
              ease: "power3.inOut",
            },
            stepIndex,
          );
        });

        const activeCard = cards[nextActiveIndex];

        timeline
          .fromTo(
            activeCard.querySelector(".project-reel-media"),
            { y: 28 },
            { y: 0, duration: 0.55, ease: "power3.out" },
            stepIndex + 0.48,
          )
          .fromTo(
            activeCard.querySelector(".project-reel-copy"),
            { y: 22 },
            { y: 0, duration: 0.48, ease: "power3.out" },
            stepIndex + 0.55,
          );
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  function selectProject(index: number) {
    if (reducedMotion || window.innerWidth < 1024) {
      activeIndexRef.current = index;
      setActiveIndex(index);
      return;
    }

    const trigger = ScrollTrigger.getById("selected-work-showcase");

    if (!trigger) {
      activeIndexRef.current = index;
      setActiveIndex(index);
      return;
    }

    const progress = projects.length <= 1 ? 0 : index / (projects.length - 1);

    window.scrollTo({
      top: trigger.start + (trigger.end - trigger.start) * progress,
      behavior: "auto",
    });
  }

  return (
    <section ref={sectionRef} id="work" className="casefile-section relative border-b border-graphite-border bg-graphite-page">
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
          <div className="relative grid content-start gap-3 pt-10">
            <span aria-hidden="true" className="absolute left-5 top-10 h-[6.25rem] w-px bg-graphite-border" />
            <span aria-hidden="true" className="work-progress-line absolute left-5 top-10 h-[6.25rem] w-px scale-y-0 bg-signal" />
            {projects.map((project, index) => (
              <button
                key={project.slug}
                aria-label={`Show ${project.name}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className="group relative z-[1] flex items-center gap-3 text-left"
                onClick={() => selectProject(index)}
                type="button"
              >
                <span
                  className={
                    activeIndex === index
                      ? "h-px w-10 bg-signal"
                      : "h-px w-6 bg-graphite-strong transition-all group-hover:w-10"
                  }
                />
                <span
                  className={
                    activeIndex === index
                      ? "technical-label text-signal"
                      : "technical-label text-ink-muted transition-colors group-hover:text-ink-secondary"
                  }
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>

          <div className="casefile-stage relative min-h-[640px] overflow-hidden border border-graphite-strong bg-graphite-base">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(215,247,91,0.10),transparent_28%),linear-gradient(90deg,rgba(215,247,91,0.08),transparent_28%,transparent_70%,rgba(243,240,232,0.05))]"
            />
            <span
              aria-hidden="true"
              className="work-reel-beam pointer-events-none absolute inset-y-0 left-0 z-30 w-[18%] bg-gradient-to-r from-transparent via-signal/20 to-transparent mix-blend-screen"
            />
            <span
              aria-hidden="true"
              className="project-reel-frame-line pointer-events-none absolute left-[9%] top-8 z-20 h-px w-[82%] bg-signal/45"
            />
            <span
              aria-hidden="true"
              className="project-reel-frame-drop pointer-events-none absolute left-[9%] top-8 z-20 h-16 w-px bg-ink-primary/25"
            />
            <span
              aria-hidden="true"
              className="project-reel-frame-drop pointer-events-none absolute right-[9%] bottom-8 z-20 h-16 w-px origin-bottom bg-ink-primary/25"
            />
            {projects.map((project, index) => {
              const visual = projectVisuals[index];
              return (
                <article
                  key={project.slug}
                  aria-hidden={activeIndex !== index}
                  className="project-reel-card absolute left-1/2 top-1/2 h-[78%] w-[82%] overflow-hidden border border-graphite-strong bg-graphite-page/96 shadow-signal-sm will-change-transform"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(90deg,rgba(215,247,91,0.05),transparent_24%,transparent_72%,rgba(243,240,232,0.04))]"
                  />
                  <div className="relative grid h-full grid-cols-[0.96fr_1fr] gap-6 p-6">
                    <div className="project-reel-media min-w-0 self-center will-change-transform">
                      <ProjectMedia
                        project={project}
                        variant="hero"
                        className="min-h-[400px] w-full max-w-full rounded-[6px] shadow-none"
                      />
                    </div>
                    <div className="project-reel-copy flex min-w-0 flex-col justify-between py-3 will-change-transform">
                      <div>
                        <p className="technical-label mb-5 text-signal">{visual.technicalSignal}</p>
                        <h3 className="text-5xl font-semibold leading-none text-ink-primary wide:text-6xl">{project.name}</h3>
                        <p className="mt-6 max-w-lg text-lg leading-[1.55] text-ink-secondary">{visual.statement}</p>
                      </div>
                      <div className="grid gap-5">
                        <div className="h-px bg-graphite-border" />
                        <div className="grid grid-cols-2 gap-4 border-b border-graphite-border pb-5">
                          <Meta label="Role" value={project.role} />
                          <Meta label="Status" value={visual.shortStatus} />
                        </div>
                        <p className="text-sm leading-6 text-ink-secondary">{visual.proof}</p>
                        <Link
                          className="group inline-flex w-fit items-center gap-2 rounded-[4px] bg-signal px-4 py-3 text-sm font-medium text-graphite-page transition-transform hover:-translate-y-0.5 active:translate-y-0"
                          href={`/projects/${project.slug}`}
                          tabIndex={activeIndex === index ? 0 : -1}
                        >
                          View case study
                          <ArrowRight aria-hidden="true" className="transition group-hover:translate-x-1" size={16} />
                        </Link>
                      </div>
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
