"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  Globe2,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "@/components/project-archive-carousel.module.css";
import { InteractiveAnchor, InteractiveLink, MotionArrow } from "@/components/interactive-link";
import {
  archiveProjects,
  projectArchiveContent,
  type ArchiveProject,
} from "@/data/project-archive";
import { motionDurations, motionSprings } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type ArchiveAction = {
  external: boolean;
  href: string;
  kind: "case-study" | "live" | "source" | "testflight";
  label: string;
};

function getArchiveActions(project: ArchiveProject): ArchiveAction[] {
  const actions: ArchiveAction[] = [];

  if (project.caseStudyUrl) {
    actions.push({
      external: false,
      href: project.caseStudyUrl,
      kind: "case-study",
      label: "View case study",
    });
  }

  if (project.sourceUrl) {
    actions.push({
      external: true,
      href: project.sourceUrl,
      kind: "source",
      label: "Source code",
    });
  }

  if (project.liveUrl) {
    actions.push({
      external: true,
      href: project.liveUrl,
      kind: "live",
      label: "Live website",
    });
  }

  if (project.testFlightUrl) {
    actions.push({
      external: true,
      href: project.testFlightUrl,
      kind: "testflight",
      label: "TestFlight",
    });
  }

  return actions;
}

function ArchiveActionIcon({ kind }: { kind: ArchiveAction["kind"] }) {
  if (kind === "source") {
    return <Github aria-hidden="true" size={15} strokeWidth={1.8} />;
  }

  if (kind === "live") {
    return <Globe2 aria-hidden="true" size={15} strokeWidth={1.8} />;
  }

  if (kind === "testflight") {
    return <ExternalLink aria-hidden="true" size={15} strokeWidth={1.8} />;
  }

  return null;
}

function ArchiveActions({ project }: { project: ArchiveProject }) {
  const actions = getArchiveActions(project);

  if (actions.length === 0) {
    return null;
  }

  return (
    <div aria-label={`${project.title} project links`} className="flex flex-wrap gap-3">
      {actions.map((action) => {
        const className =
          action.kind === "case-study"
            ? "group inline-flex min-h-11 items-center gap-3 border border-signal bg-signal px-4 text-sm font-semibold text-graphite-page transition-colors hover:bg-ink-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-signal"
            : "group inline-flex min-h-11 items-center gap-2 border border-graphite-strong px-4 text-sm font-semibold text-ink-primary transition-colors hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-signal";
        const content = (
          <>
            <ArchiveActionIcon kind={action.kind} />
            <span>{action.label}</span>
            <MotionArrow direction={action.external ? "up-right" : "right"}>
              {action.external ? (
                <ArrowUpRight aria-hidden="true" size={15} />
              ) : (
                <ArrowRight aria-hidden="true" size={15} />
              )}
            </MotionArrow>
          </>
        );

        if (action.external) {
          return (
            <InteractiveAnchor
              aria-label={`${action.label} for ${project.title} (opens in a new tab)`}
              className={className}
              href={action.href}
              interactionLevel="subtle"
              key={action.kind}
              rel="noreferrer"
              target="_blank"
            >
              {content}
            </InteractiveAnchor>
          );
        }

        return (
          <InteractiveLink
            aria-label={`${action.label} for ${project.title}`}
            className={className}
            href={action.href}
            interactionLevel="subtle"
            key={action.kind}
          >
            {content}
          </InteractiveLink>
        );
      })}
    </div>
  );
}

function ResearchCover() {
  return (
    <div className="relative flex h-full min-h-[18rem] overflow-hidden bg-graphite-page p-5 tablet:min-h-[26rem] tablet:p-8">
      <div aria-hidden="true" className="absolute inset-0 opacity-70 kwf-field-depth" />
      <div aria-hidden="true" className="absolute inset-x-0 top-[42%] h-px bg-signal/35" />
      <div aria-hidden="true" className="absolute bottom-0 left-[33%] top-0 w-px bg-graphite-strong" />
      <div aria-hidden="true" className="absolute bottom-0 left-[66%] top-0 w-px bg-graphite-strong" />

      <div className="relative z-[1] flex w-full flex-col justify-between border border-graphite-strong p-5 tablet:p-7">
        <div className="flex items-center justify-between gap-5 border-b border-graphite-border pb-4 font-mono text-[0.64rem] font-medium uppercase text-ink-muted">
          <span>Robustness evaluation</span>
          <span className="text-signal">Research signal / 02</span>
        </div>

        <div className="py-10 tablet:py-14">
          <p className="font-mono text-[0.68rem] font-medium uppercase text-signal">
            Indonesian promotion detection
          </p>
          <p className="mt-4 max-w-[18ch] font-display text-3xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink-primary tablet:text-5xl">
            Multimodal robustness under perturbation.
          </p>
        </div>

        <div className="grid grid-cols-3 border-y border-graphite-strong">
          {[
            ["01", "Text", "E5-large"],
            ["02", "Image", "SigLIP 2"],
            ["03", "Multimodal", "Fusion"],
          ].map(([index, mode, model]) => (
            <div className="min-w-0 border-r border-graphite-strong p-3 last:border-r-0 tablet:p-5" key={mode}>
              <span className="font-mono text-[0.58rem] text-signal">{index}</span>
              <p className="mt-4 break-words text-[0.68rem] font-semibold leading-tight text-ink-primary tablet:text-base">{mode}</p>
              <p className="mt-1 break-words font-mono text-[0.54rem] uppercase leading-tight text-ink-muted tablet:text-[0.64rem]">
                {model}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-5 font-mono text-[0.58rem] font-medium uppercase text-ink-muted tablet:text-[0.64rem]">
          <span>Text perturbation</span>
          <span>Image perturbation</span>
          <span>Robustness comparison</span>
        </div>
      </div>
    </div>
  );
}

function ArchiveVisual({ project }: { project: ArchiveProject }) {
  if (project.image.kind === "research-cover") {
    return <ResearchCover />;
  }

  return (
    <div className="relative h-full min-h-[18rem] overflow-hidden bg-graphite-inset tablet:min-h-[26rem]">
      <Image
        alt={project.image.alt}
        className="p-2 tablet:p-4"
        fill
        sizes="(max-width: 767px) 88vw, (max-width: 1023px) calc(100vw - 6rem), (max-width: 1699px) 56vw, 860px"
        src={project.image.src}
        style={{
          objectFit: project.image.objectFit,
          objectPosition: project.image.objectPosition,
        }}
      />
    </div>
  );
}

export function ProjectArchiveCarousel() {
  const reducedMotion = usePrefersReducedMotion();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const slideOffsetsRef = useRef<number[]>([]);
  const frameRef = useRef<number | null>(null);
  const measureFrameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const cacheSlideOffsets = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const viewportOffset = viewport.offsetLeft;
    slideOffsetsRef.current = slideRefs.current.map((slide) =>
      slide ? slide.offsetLeft - viewportOffset : 0,
    );
  }, []);

  const selectProject = useCallback(
    (index: number) => {
      const normalizedIndex =
        (index + archiveProjects.length) % archiveProjects.length;
      const viewport = viewportRef.current;
      const slide = slideRefs.current[normalizedIndex];

      setActiveIndex(normalizedIndex);
      if (!viewport || !slide) {
        return;
      }

      viewport.scrollTo({
        behavior: reducedMotion ? "auto" : "smooth",
        left:
          slideOffsetsRef.current[normalizedIndex] ??
          slide.offsetLeft - viewport.offsetLeft,
      });
    },
    [reducedMotion],
  );

  const updateActiveProject = useCallback(() => {
    frameRef.current = null;
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const viewportLeft = viewport.scrollLeft;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    slideOffsetsRef.current.forEach((slideLeft, index) => {
      const distance = Math.abs(slideLeft - viewportLeft);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex((currentIndex) =>
      currentIndex === nearestIndex ? currentIndex : nearestIndex,
    );
  }, []);

  function handleScroll() {
    if (frameRef.current !== null) {
      return;
    }

    frameRef.current = window.requestAnimationFrame(updateActiveProject);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectProject(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      selectProject(activeIndex + 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectProject(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectProject(archiveProjects.length - 1);
    }
  }

  useEffect(() => {
    const viewport = viewportRef.current;

    function scheduleMeasurement() {
      if (measureFrameRef.current !== null) {
        return;
      }

      measureFrameRef.current = window.requestAnimationFrame(() => {
        measureFrameRef.current = null;
        cacheSlideOffsets();
      });
    }

    function handleVisibilityChange() {
      if (document.hidden && frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    }

    const resizeObserver =
      viewport && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleMeasurement)
        : null;

    if (viewport) {
      resizeObserver?.observe(viewport);
    }
    window.addEventListener("resize", scheduleMeasurement, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    scheduleMeasurement();

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      if (measureFrameRef.current !== null) {
        window.cancelAnimationFrame(measureFrameRef.current);
      }
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleMeasurement);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [cacheSlideOffsets]);

  return (
    <section
      aria-labelledby="project-archive-title"
      className="relative overflow-hidden border-b border-graphite-border bg-graphite-base py-16 tablet:py-20 desktop:py-24"
      id="project-archive"
    >
      <div aria-hidden="true" className="absolute inset-0 opacity-45 kwf-field-depth" />

      <div className="container-grid relative z-[1]">
        <header className="grid gap-6 border-b border-graphite-strong pb-8 tablet:grid-cols-[minmax(0,1fr)_minmax(280px,.7fr)] tablet:items-end tablet:pb-10">
          <div>
            <p className="technical-label text-ink-muted">{projectArchiveContent.label}</p>
            <h2
              className="mt-3 max-w-[18ch] font-display text-4xl font-semibold leading-[0.96] tracking-[-0.045em] text-ink-primary tablet:text-5xl desktop:text-6xl"
              id="project-archive-title"
            >
              {projectArchiveContent.title}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-ink-secondary tablet:justify-self-end tablet:text-right">
            {projectArchiveContent.summary}
          </p>
        </header>

        <div className="mt-8 flex items-center justify-between gap-5 tablet:mt-10">
          <p aria-live="polite" className="font-mono text-[0.68rem] font-medium uppercase text-ink-muted">
            <span className="text-signal">{archiveProjects[activeIndex].index}</span>
            <span aria-hidden="true"> / </span>
            {String(archiveProjects.length).padStart(2, "0")}
          </p>

          <div className="flex items-center gap-2">
            <button
              aria-label="Show previous archive project"
              className="inline-flex size-11 items-center justify-center border border-graphite-strong text-ink-primary transition-colors hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-signal"
              onClick={() => selectProject(activeIndex - 1)}
              type="button"
            >
              <ArrowLeft aria-hidden="true" size={17} />
            </button>
            <button
              aria-label="Show next archive project"
              className="inline-flex size-11 items-center justify-center border border-signal bg-signal text-graphite-page transition-colors hover:bg-ink-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-signal"
              onClick={() => selectProject(activeIndex + 1)}
              type="button"
            >
              <ArrowRight aria-hidden="true" size={17} />
            </button>
          </div>
        </div>

        <div
          aria-label="Additional projects"
          className={`${styles.viewport} mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal tablet:mt-6 tablet:gap-5`}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          ref={viewportRef}
          role="region"
          tabIndex={0}
        >
          {archiveProjects.map((project, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.article
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        opacity: isActive ? 1 : 0.68,
                        scale: isActive ? 1 : 0.985,
                      }
                }
                aria-label={`${project.index}: ${project.title}`}
                className={`${styles.slide} grid min-w-0 overflow-hidden border ${isActive ? "border-signal/70" : "border-graphite-strong"} bg-graphite-page laptop:min-h-[34rem] laptop:grid-cols-[minmax(17rem,.72fr)_minmax(0,1.35fr)]`}
                key={project.slug}
                ref={(element) => {
                  slideRefs.current[index] = element;
                }}
                transition={{ duration: reducedMotion ? 0 : motionDurations.content }}
              >
                <div className="order-1 min-w-0 border-b border-graphite-strong laptop:order-2 laptop:border-b-0 laptop:border-l">
                  <ArchiveVisual project={project} />
                </div>

                <div className="order-2 flex min-w-0 flex-col justify-between gap-8 p-6 tablet:p-8 laptop:order-1 laptop:p-10">
                  <div>
                    <div className="flex items-center gap-4 font-mono text-[0.66rem] font-medium uppercase">
                      <span className="text-signal">{project.index}</span>
                      <span aria-hidden="true" className="h-px w-8 bg-graphite-strong" />
                      <span className="text-ink-muted">{project.category}</span>
                    </div>
                    <h3 className="mt-6 max-w-[16ch] font-display text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink-primary tablet:text-5xl">
                      {project.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-base leading-7 text-ink-secondary">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <ul
                      aria-label={`${project.title} technologies`}
                      className="flex flex-wrap gap-x-4 gap-y-2 border-t border-graphite-border pt-5"
                    >
                      {project.technologies.map((technology) => (
                        <li
                          className="font-mono text-[0.64rem] font-medium uppercase text-ink-secondary"
                          key={technology}
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <ArchiveActions project={project} />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <nav aria-label="Select an archive project" className="mt-5 grid border-y border-graphite-strong tablet:grid-cols-2">
          {archiveProjects.map((project, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                aria-label={`Show ${project.title}`}
                aria-pressed={isActive}
                className={`group relative flex min-h-[5.25rem] items-center gap-5 border-b border-graphite-strong px-5 text-left last:border-b-0 tablet:border-b-0 tablet:border-r tablet:last:border-r-0 ${isActive ? "bg-signal/[0.06] text-ink-primary" : "text-ink-muted hover:text-ink-primary"}`}
                key={project.slug}
                onClick={() => selectProject(index)}
                type="button"
              >
                {isActive ? (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-signal"
                    layoutId="archive-active-rail"
                    transition={motionSprings.layout}
                  />
                ) : null}
                <span className="font-mono text-[0.68rem] text-signal">{project.index}</span>
                <span className="min-w-0 truncate text-sm font-semibold tablet:text-base">
                  {project.title}
                </span>
                <span className={`ml-auto h-px w-8 ${isActive ? "bg-signal" : "bg-graphite-strong group-hover:bg-signal"}`} />
              </button>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
