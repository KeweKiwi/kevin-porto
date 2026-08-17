"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Github, Globe2 } from "lucide-react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  archiveProjects,
  projectArchiveContent,
  type ArchiveProjectAction,
} from "@/data/project-archive";
import { cn } from "@/lib/cn";
import { motionSprings } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const swipeThreshold = 64;

const mediaVariants = {
  enter: (direction: number) => ({
    clipPath: direction > 0 ? "inset(0 0 0 14%)" : "inset(0 14% 0 0)",
    opacity: 0,
    x: direction * 56,
  }),
  center: {
    clipPath: "inset(0 0 0 0)",
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    clipPath: direction > 0 ? "inset(0 14% 0 0)" : "inset(0 0 0 14%)",
    opacity: 0,
    x: direction * -40,
  }),
};

function ProjectAction({ action }: { action: ArchiveProjectAction }) {
  const isPrimary = action.kind === "detail";
  const className = cn(
    "group inline-flex min-h-11 items-center gap-2 rounded-[4px] px-3.5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal",
    isPrimary
      ? "border border-signal bg-signal text-graphite-page hover:bg-ink-primary"
      : "border border-graphite-strong text-ink-primary hover:border-signal hover:text-signal",
  );
  const icon =
    action.kind === "source" ? (
      <Github aria-hidden="true" size={16} />
    ) : action.kind === "live" ? (
      <Globe2 aria-hidden="true" size={16} />
    ) : action.kind === "testflight" ? (
      <ExternalLink aria-hidden="true" size={16} />
    ) : null;
  const content = (
    <>
      {icon}
      <span className="whitespace-nowrap">{action.label}</span>
      {isPrimary ? (
        <ArrowUpRight
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          size={16}
        />
      ) : null}
    </>
  );

  if (action.isExternal) {
    return (
      <a className={className} href={action.href} rel="noreferrer" target="_blank">
        {content}
      </a>
    );
  }

  return (
    <Link className={className} href={action.href}>
      {content}
    </Link>
  );
}

export function ProjectArchiveCarousel() {
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const indexRailRef = useRef<HTMLDivElement | null>(null);
  const activeProject = archiveProjects[activeIndex];
  const total = archiveProjects.length;

  useEffect(() => {
    const rail = indexRailRef.current;
    const activeTab = rail?.querySelector<HTMLElement>(`[data-archive-index="${activeIndex}"]`);
    if (!rail || !activeTab) {
      return;
    }

    const centeredPosition = activeTab.offsetLeft - (rail.clientWidth - activeTab.offsetWidth) / 2;
    rail.scrollTo({
      behavior: reducedMotion ? "auto" : "smooth",
      left: Math.max(0, centeredPosition),
    });
  }, [activeIndex, reducedMotion]);

  function selectProject(index: number, nextDirection?: number) {
    const wrappedIndex = (index + total) % total;
    if (wrappedIndex === activeIndex) {
      return;
    }

    setDirection(nextDirection ?? (wrappedIndex > activeIndex ? 1 : -1));
    setActiveIndex(wrappedIndex);
  }

  function showPrevious() {
    selectProject(activeIndex - 1, -1);
  }

  function showNext() {
    selectProject(activeIndex + 1, 1);
  }

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (info.offset.x <= -swipeThreshold || info.velocity.x < -500) {
      showNext();
    } else if (info.offset.x >= swipeThreshold || info.velocity.x > 500) {
      showPrevious();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  }

  return (
    <section
      aria-labelledby="project-archive-title"
      className="project-archive-section relative overflow-hidden border-b border-graphite-border bg-graphite-base py-16 tablet:py-20 desktop:py-24"
      id="project-archive"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div aria-hidden="true" className="absolute inset-0 opacity-50 kwf-field-depth" />

      <div className="container-grid relative z-[1]">
        <header className="grid gap-6 border-b border-graphite-strong pb-8 tablet:grid-cols-[minmax(0,1fr)_minmax(280px,.7fr)] tablet:items-end tablet:pb-10">
          <div className="flex gap-4">
            <span className="pt-1 font-mono text-[0.68rem] font-medium text-signal">04</span>
            <div>
              <p className="technical-label text-ink-muted">{projectArchiveContent.label}</p>
              <h2
                className="mt-3 max-w-[18ch] font-display text-4xl font-semibold leading-[0.96] tracking-[-0.045em] text-ink-primary tablet:text-5xl desktop:text-6xl"
                id="project-archive-title"
              >
                {projectArchiveContent.title}
              </h2>
            </div>
          </div>
          <p className="max-w-xl text-base leading-7 text-ink-secondary tablet:justify-self-end tablet:text-right">
            {projectArchiveContent.summary}
          </p>
        </header>

        <div
          aria-labelledby={`project-archive-tab-${activeIndex}`}
          className="project-archive-stage relative grid border-b border-graphite-strong desktop:grid-cols-[minmax(300px,.72fr)_minmax(0,1.55fr)]"
          id="project-archive-panel"
          role="tabpanel"
        >
          <div className="relative z-[2] order-2 flex min-h-0 flex-col justify-between border-graphite-strong px-1 py-9 tablet:px-7 desktop:order-1 desktop:min-h-[42rem] desktop:border-r desktop:px-10 desktop:py-12">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={activeProject.name}
                animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1, y: 0 }}
                className="max-w-xl"
                exit={reducedMotion ? undefined : { clipPath: "inset(0 0 100% 0)", opacity: 0, y: -12 }}
                initial={reducedMotion ? false : { clipPath: "inset(100% 0 0 0)", opacity: 0, y: 12 }}
                transition={reducedMotion ? { duration: 0 } : motionSprings.gentle}
              >
                <div className="flex items-center gap-4 font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em]">
                  <span className="text-signal">{String(activeIndex + 1).padStart(2, "0")}</span>
                  <span aria-hidden="true" className="h-px w-8 bg-graphite-strong" />
                  <span className="text-ink-muted">{activeProject.platform}</span>
                </div>

                <h3 className="mt-7 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.045em] text-ink-primary tablet:text-6xl">
                  {activeProject.name}
                </h3>
                <p className="mt-5 font-mono text-[0.68rem] font-medium uppercase leading-5 tracking-[0.065em] text-signal">
                  {activeProject.signal}
                </p>
                <p className="mt-7 text-base leading-7 text-ink-secondary tablet:text-lg">
                  {activeProject.summary}
                </p>

                <dl className="mt-8 grid gap-px bg-graphite-border xs:grid-cols-2">
                  <div className="bg-graphite-base py-4 pr-4">
                    <dt className="technical-label text-ink-muted">Category</dt>
                    <dd className="mt-2 text-sm leading-6 text-ink-primary">{activeProject.category}</dd>
                  </div>
                  <div className="bg-graphite-base py-4 xs:pl-4">
                    <dt className="technical-label text-ink-muted">Status</dt>
                    <dd className="mt-2 text-sm leading-6 text-ink-primary">{activeProject.status}</dd>
                  </div>
                </dl>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10">
              <div aria-label={`${activeProject.name} links`} className="flex flex-wrap gap-2">
                {activeProject.actions.map((action) => (
                  <ProjectAction action={action} key={`${activeProject.name}-${action.kind}`} />
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className="project-archive-visual relative order-1 aspect-[16/10] min-h-0 cursor-grab overflow-hidden active:cursor-grabbing tablet:aspect-auto tablet:min-h-[34rem] desktop:order-2 desktop:min-h-[42rem]"
            drag={reducedMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
          >
            <div aria-hidden="true" className="absolute inset-0 kwf-grid opacity-35" />
            <div
              aria-label="Project navigation"
              className="absolute right-4 top-4 z-[6] flex items-center gap-2 tablet:right-7 tablet:top-7 desktop:right-10 desktop:top-10"
              onPointerDown={(event) => event.stopPropagation()}
              role="group"
            >
              <button
                aria-label="Previous project"
                className="grid h-11 w-11 place-items-center border border-graphite-strong bg-graphite-page/90 text-ink-primary backdrop-blur-sm transition-colors hover:border-signal hover:text-signal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-signal tablet:h-12 tablet:w-12"
                onClick={showPrevious}
                title="Previous project"
                type="button"
              >
                <ChevronLeft aria-hidden="true" size={19} />
              </button>
              <button
                aria-label="Next project"
                className="grid h-11 w-11 place-items-center border border-signal bg-signal text-graphite-page transition-colors hover:bg-ink-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ink-primary tablet:h-12 tablet:w-12"
                onClick={showNext}
                title="Next project"
                type="button"
              >
                <ChevronRight aria-hidden="true" size={19} />
              </button>
            </div>
            <AnimatePresence custom={direction} initial={false} mode="popLayout">
              <motion.div
                key={activeProject.image}
                animate="center"
                className="absolute inset-4 overflow-hidden border border-graphite-strong bg-graphite-page tablet:inset-7 desktop:inset-10"
                custom={direction}
                exit={reducedMotion ? undefined : "exit"}
                initial={reducedMotion ? false : "enter"}
                transition={reducedMotion ? { duration: 0 } : motionSprings.gentle}
                variants={mediaVariants}
              >
                <Image
                  alt={activeProject.imageAlt}
                  className={cn(activeProject.imageFit === "cover" ? "object-cover" : "object-contain")}
                  fill
                  sizes="(max-width: 1023px) 100vw, 66vw"
                  src={activeProject.image}
                />
                <div aria-hidden="true" className="project-archive-hologram-overlay absolute inset-0" />
                {!reducedMotion ? (
                  <motion.span
                    animate={{ top: "112%" }}
                    aria-hidden="true"
                    className="project-archive-hologram-scan absolute inset-x-0 z-[2]"
                    initial={{ top: "-20%" }}
                    transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : null}
                <div aria-hidden="true" className="project-archive-media-shade absolute inset-0" />
              </motion.div>
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-x-7 bottom-7 z-[3] hidden items-end justify-between tablet:flex desktop:inset-x-10 desktop:bottom-10">
              <span className="border-l border-signal bg-graphite-page/90 px-3 py-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-ink-primary">
                Archive record / {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.08em] text-ink-muted">
                Drag / swipe
              </span>
            </div>
          </motion.div>
        </div>

        <div
          aria-label="Project archive index"
          className="project-archive-index border-b border-graphite-strong"
          ref={indexRailRef}
          role="tablist"
        >
          {archiveProjects.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                aria-selected={isActive}
                aria-controls="project-archive-panel"
                className="project-archive-tab relative min-h-24 border-r border-t border-graphite-border px-4 py-5 text-left desktop:border-t-0 desktop:px-6"
                data-active={isActive}
                data-archive-index={index}
                id={`project-archive-tab-${index}`}
                key={project.name}
                onClick={() => selectProject(index)}
                role="tab"
                type="button"
              >
                {isActive ? (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-signal"
                    layoutId="project-archive-active-line"
                    transition={motionSprings.layout}
                  />
                ) : null}
                <span className="font-mono text-[0.68rem] font-medium text-signal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-3 block text-sm font-semibold text-ink-primary tablet:text-base">{project.name}</span>
                <span className="mt-1 block font-mono text-[0.62rem] uppercase tracking-[0.065em] text-ink-muted">
                  {project.platform}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 h-px overflow-hidden bg-graphite-border">
          <motion.span
            animate={{ scaleX: (activeIndex + 1) / total }}
            className="block h-full origin-left bg-signal"
            transition={reducedMotion ? { duration: 0 } : motionSprings.gentle}
          />
        </div>
        <p aria-live="polite" className="screen-reader-only">
          Showing project {activeIndex + 1} of {total}: {activeProject.name}
        </p>
      </div>
    </section>
  );
}
