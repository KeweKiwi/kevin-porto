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
import { selectedWorkContent } from "@/data/site-content";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SelectedWorkShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) {
        return;
      }

      const responsiveMotion = gsap.matchMedia();
      responsiveMotion.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-work-card]");
        const stepCount = projects.length - 1;

        gsap.set(cards.slice(1), {
          autoAlpha: 0,
          clipPath: "inset(100% 0 0 0)",
          pointerEvents: "none",
        });
        gsap.set("[data-work-progress]", { scaleX: 0, transformOrigin: "left center" });

        const timeline = gsap.timeline({
          onUpdate: () => {
            const nextIndex = cards.reduce((bestIndex, card, index) => {
              const opacity = Number(gsap.getProperty(card, "opacity"));
              const bestOpacity = Number(gsap.getProperty(cards[bestIndex], "opacity"));
              return opacity > bestOpacity ? index : bestIndex;
            }, 0);

            if (nextIndex !== activeIndexRef.current) {
              activeIndexRef.current = nextIndex;
              setActiveIndex(nextIndex);
            }
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });

        timeline.to("[data-work-progress]", { duration: stepCount, ease: "none", scaleX: 1 }, 0);

        projects.slice(1).forEach((_, stepIndex) => {
          const outgoing = cards[stepIndex];
          const incoming = cards[stepIndex + 1];
          const outgoingCopy = outgoing.querySelector("[data-work-copy]");
          const incomingCopy = incoming.querySelector("[data-work-copy]");
          const outgoingMedia = outgoing.querySelector("[data-work-project-media]");
          const incomingMedia = incoming.querySelector("[data-work-project-media]");

          timeline
            .to(outgoingCopy, { autoAlpha: 0, duration: 0.24, ease: "power2.in", y: -18 }, stepIndex + 0.04)
            .to(outgoingMedia, { duration: 0.48, ease: "power3.inOut", scale: 0.985, xPercent: -1.5 }, stepIndex + 0.02)
            .to(outgoing, { autoAlpha: 0, clipPath: "inset(0 0 100% 0)", duration: 0.52, ease: "power4.inOut", pointerEvents: "none" }, stepIndex + 0.08)
            .fromTo(
              incoming,
              { autoAlpha: 1, clipPath: "inset(100% 0 0 0)", pointerEvents: "none" },
              { autoAlpha: 1, clipPath: "inset(0% 0 0 0)", duration: 0.62, ease: "power4.inOut", immediateRender: false, pointerEvents: "auto" },
              stepIndex + 0.12,
            )
            .fromTo(
              incomingMedia,
              { scale: 1.035, xPercent: 1.5 },
              { duration: 0.72, ease: "power3.out", immediateRender: false, scale: 1, xPercent: 0 },
              stepIndex + 0.15,
            )
            .fromTo(
              incomingCopy,
              { autoAlpha: 0, y: 28 },
              { autoAlpha: 1, duration: 0.46, ease: "power3.out", immediateRender: false, y: 0 },
              stepIndex + 0.34,
            );
        });
      });

      return () => responsiveMotion.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  function selectProject(index: number) {
    if (reducedMotion || window.innerWidth < 1024) {
      activeIndexRef.current = index;
      setActiveIndex(index);
      return;
    }

    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const progress = index / Math.max(projects.length - 1, 1);
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      behavior: "smooth",
      top: sectionTop + (section.offsetHeight - window.innerHeight) * progress,
    });
  }

  return (
    <section
      ref={sectionRef}
      id="work"
      className="kinetic-work-scroll relative border-b border-graphite-border bg-graphite-page"
      data-reduced-motion={reducedMotion}
    >
      <div className="kinetic-work-stage">
        <header className="container-grid flex min-h-20 items-center justify-between gap-8 border-b border-graphite-strong">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[0.62rem] text-signal">03</span>
            <h2 className="text-2xl font-semibold uppercase text-ink-primary tablet:text-3xl">{selectedWorkContent.label}</h2>
          </div>
          <p className="hidden max-w-xl text-right text-sm leading-6 text-ink-secondary tablet:block">
            {selectedWorkContent.summary}
          </p>
        </header>

        <div className="kinetic-work-desktop-grid relative hidden laptop:block">
          {projects.map((project, index) => {
            const visual = projectVisuals[index];
            return (
              <Link
                key={project.slug}
                aria-hidden={activeIndex !== index}
                aria-label={`View ${project.name} case study`}
                className="work-project-card absolute inset-x-0 bottom-20 top-0 grid grid-cols-[minmax(330px,.72fr)_minmax(0,1.5fr)]"
                data-work-card
                data-work-index={index}
                href={`/projects/${project.slug}`}
                tabIndex={activeIndex === index ? 0 : -1}
              >
                <div className="flex min-w-0 flex-col justify-center border-r border-graphite-strong px-9 desktop:px-12" data-work-copy>
                  <p className="font-mono text-[0.65rem] uppercase text-signal">
                    Project {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-5 text-5xl font-semibold uppercase leading-[0.9] text-ink-primary desktop:text-6xl">
                    {project.name}
                  </h3>
                  <p className="mt-6 max-w-md text-base leading-7 text-ink-secondary desktop:text-lg">
                    {visual.statement}
                  </p>

                  <dl className="mt-8 grid grid-cols-2 border-y border-graphite-strong py-5">
                    <div className="border-r border-graphite-border pr-4">
                      <dt className="font-mono text-[0.56rem] uppercase text-ink-muted">Role</dt>
                      <dd className="mt-2 text-sm leading-6 text-ink-primary">{project.role}</dd>
                    </div>
                    <div className="pl-4">
                      <dt className="font-mono text-[0.56rem] uppercase text-ink-muted">Status</dt>
                      <dd className="mt-2 text-sm leading-6 text-ink-primary">{visual.shortStatus}</dd>
                    </div>
                  </dl>

                  <p className="mt-6 font-mono text-[0.6rem] uppercase leading-6 text-signal">
                    {visual.markers.slice(0, 3).join(" / ")}
                  </p>

                  <span className="mt-8 inline-flex min-h-12 w-fit items-center gap-8 border-b border-signal text-sm font-medium text-ink-primary">
                    View case study
                    <ArrowRight aria-hidden="true" size={16} />
                  </span>
                </div>

                <div className="min-w-0 p-5 desktop:p-7" data-work-project-media>
                  <ProjectMedia
                    className="h-full min-h-full w-full"
                    priority={index === 0}
                    project={project}
                    variant="hero"
                  />
                </div>
              </Link>
            );
          })}

          <nav aria-label="Featured projects" className="absolute inset-x-0 bottom-0 z-20 grid h-20 grid-cols-3 border-t border-graphite-strong bg-graphite-page">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left bg-signal" data-work-progress />
            {projects.map((project, index) => (
              <button
                key={project.slug}
                aria-label={`Show ${project.name}`}
                aria-pressed={activeIndex === index}
                className={activeIndex === index ? "group flex min-h-11 items-center justify-between border-r border-graphite-strong px-7 text-left text-ink-primary last:border-r-0" : "group flex min-h-11 items-center justify-between border-r border-graphite-strong px-7 text-left text-ink-muted last:border-r-0 hover:text-ink-primary"}
                onClick={() => selectProject(index)}
                type="button"
              >
                <span className="font-mono text-[0.62rem] text-signal">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm font-medium uppercase">{project.name}</span>
                <span className={activeIndex === index ? "h-px w-8 bg-signal" : "h-px w-8 bg-graphite-strong transition-colors group-hover:bg-signal"} />
              </button>
            ))}
          </nav>
        </div>

        <div className="grid laptop:hidden">
          {projects.map((project, index) => {
            const visual = projectVisuals[index];
            return (
              <motion.article
                key={project.slug}
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ amount: 0.18, once: true }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              >
                <Link className="group block border-b border-graphite-strong py-10" href={`/projects/${project.slug}`}>
                  <div className="container-grid">
                    <ProjectMedia className="w-full" priority={index === 0} project={project} variant="compact" />
                    <div className="pt-6">
                      <p className="font-mono text-xs text-signal">
                        {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                      </p>
                      <div className="mt-3 flex items-end justify-between gap-5">
                        <h3 className="text-4xl font-semibold uppercase leading-none text-ink-primary tablet:text-6xl">{project.name}</h3>
                        <ArrowRight aria-hidden="true" className="shrink-0 text-signal transition-transform group-active:translate-x-1" size={22} />
                      </div>
                      <p className="mt-4 max-w-xl text-base leading-7 text-ink-secondary">{visual.statement}</p>
                      <div className="mt-6 grid gap-3 border-t border-graphite-border pt-4 font-mono text-[0.6rem] uppercase text-ink-muted xs:grid-cols-2">
                        <span>{project.role}</span>
                        <span className="xs:text-right">{visual.shortStatus}</span>
                      </div>
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
