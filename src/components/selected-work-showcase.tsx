"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  type MotionValue,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { ProjectMedia } from "@/components/project-media";
import { InteractiveLink, MotionArrow } from "@/components/interactive-link";
import { projects } from "@/data/projects";
import { projectVisuals } from "@/data/project-visuals";
import { selectedWorkContent } from "@/data/site-content";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { interactionScale, motionDurations, motionSprings } from "@/lib/motion";

const MotionLink = motion.create(Link);
const workTransitionWindows = [
  { start: 0.08, end: 0.42 },
  { start: 0.58, end: 0.92 },
] as const;

type WorkProject = (typeof projects)[number];
type WorkVisual = (typeof projectVisuals)[number];

const cardMotionRanges = [
  {
    input: [0, 0.08, 0.25, 1],
    topInset: [0, 0, 49.9, 49.9],
    bottomInset: [0, 0, 49.9, 49.9],
    contentOpacity: [1, 1, 0, 0],
    copyY: [0, 0, -12, -12],
    mediaScale: [1, 1, 0.975, 0.975],
    mediaY: [0, 0, -6, -6],
  },
  {
    input: [0, 0.25, 0.42, 0.58, 0.75, 1],
    topInset: [49.9, 49.9, 0, 0, 49.9, 49.9],
    bottomInset: [49.9, 49.9, 0, 0, 49.9, 49.9],
    contentOpacity: [0, 0, 1, 1, 0, 0],
    copyY: [12, 12, 0, 0, -12, -12],
    mediaScale: [1.025, 1.025, 1, 1, 0.975, 0.975],
    mediaY: [6, 6, 0, 0, -6, -6],
  },
  {
    input: [0, 0.75, 0.92, 1],
    topInset: [49.9, 49.9, 0, 0],
    bottomInset: [49.9, 49.9, 0, 0],
    contentOpacity: [0, 0, 1, 1],
    copyY: [12, 12, 0, 0],
    mediaScale: [1.025, 1.025, 1, 1],
    mediaY: [6, 6, 0, 0],
  },
];

function WorkSignalHandoff({
  index,
  progress,
  project,
}: {
  index: number;
  progress: MotionValue<number>;
  project: WorkProject;
}) {
  const transitionWindow = workTransitionWindows[index];
  const midpoint = (transitionWindow.start + transitionWindow.end) / 2;
  const phaseOpacity = useTransform(
    progress,
    [
      transitionWindow.start,
      transitionWindow.start + 0.035,
      transitionWindow.end - 0.045,
      transitionWindow.end,
    ],
    [0, 1, 1, 0],
  );
  const lineScale = useTransform(
    progress,
    [transitionWindow.start, midpoint, transitionWindow.end],
    [0.04, 1, 0.04],
  );
  const coreOpacity = useTransform(
    progress,
    [transitionWindow.start, midpoint - 0.065, midpoint + 0.065, transitionWindow.end],
    [0, 1, 1, 0],
  );
  const coreY = useTransform(
    progress,
    [transitionWindow.start, midpoint, transitionWindow.end],
    [8, 0, -8],
  );
  const coreScale = useTransform(
    progress,
    [transitionWindow.start, midpoint, transitionWindow.end],
    [0.98, 1, 0.98],
  );

  return (
    <motion.div
      className="work-shutter-phase"
      data-work-handoff={index}
      style={{ opacity: phaseOpacity }}
    >
      <motion.span className="work-shutter-line" style={{ scaleX: lineScale }} />
      <motion.div
        className="work-shutter-core"
        style={{ opacity: coreOpacity, scale: coreScale, y: coreY }}
      >
        <span className="work-shutter-index">{String(index + 2).padStart(2, "0")}</span>
        <span className="work-shutter-status">Signal handoff</span>
        <strong className="work-shutter-project">{project.name}</strong>
      </motion.div>
    </motion.div>
  );
}

function DesktopWorkCard({
  activeIndex,
  index,
  progress,
  project,
  reducedMotion,
  visual,
}: {
  activeIndex: number;
  index: number;
  progress: MotionValue<number>;
  project: WorkProject;
  reducedMotion: boolean;
  visual: WorkVisual;
}) {
  const motionRange = cardMotionRanges[index];
  const topInset = useTransform(progress, motionRange.input, motionRange.topInset);
  const bottomInset = useTransform(progress, motionRange.input, motionRange.bottomInset);
  const clipPath = useMotionTemplate`inset(${topInset}% 0 ${bottomInset}% 0)`;
  const contentOpacity = useTransform(progress, motionRange.input, motionRange.contentOpacity);
  const copyY = useTransform(progress, motionRange.input, motionRange.copyY);
  const mediaScale = useTransform(progress, motionRange.input, motionRange.mediaScale);
  const mediaY = useTransform(progress, motionRange.input, motionRange.mediaY);
  const isActive = activeIndex === index;

  return (
    <MotionLink
      aria-hidden={!isActive}
      aria-label={`View ${project.name} case study`}
      className="work-project-card absolute inset-x-0 bottom-20 top-0 grid grid-cols-[minmax(330px,.72fr)_minmax(0,1.5fr)]"
      data-work-card
      data-work-index={index}
      href={`/projects/${project.slug}`}
      style={
        reducedMotion
          ? {
              clipPath: isActive ? "inset(0% 0 0% 0)" : "inset(100% 0 0% 0)",
              opacity: isActive ? 1 : 0,
              pointerEvents: isActive ? "auto" : "none",
              visibility: isActive ? "visible" : "hidden",
            }
          : {
              clipPath,
              opacity: 1,
              pointerEvents: isActive ? "auto" : "none",
              visibility: "visible",
            }
      }
      tabIndex={isActive ? 0 : -1}
      transition={motionSprings.gentle}
      whileHover={reducedMotion ? undefined : { y: -2 }}
      whileTap={reducedMotion ? undefined : { scale: 0.995 }}
    >
      <motion.div
        className="work-copy-console flex min-w-0 flex-col justify-center border-r border-graphite-strong px-9 desktop:px-12"
        data-work-copy
        style={reducedMotion ? undefined : { opacity: contentOpacity, y: copyY }}
      >
        <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-signal">
          Project {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </p>
        <h3 className="mt-5 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink-primary desktop:text-6xl">
          {project.name}
        </h3>
        <p className="mt-6 max-w-md text-base leading-7 text-ink-secondary desktop:text-lg">
          {visual.statement}
        </p>

        <dl className="mt-8 grid grid-cols-2 border-y border-graphite-strong py-5">
          <div className="border-r border-graphite-border pr-4">
            <dt className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-ink-muted">Role</dt>
            <dd className="mt-2 text-sm leading-6 text-ink-primary">{project.role}</dd>
          </div>
          <div className="pl-4">
            <dt className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-ink-muted">Status</dt>
            <dd className="mt-2 text-sm leading-6 text-ink-primary">{visual.shortStatus}</dd>
          </div>
        </dl>

        <p className="mt-6 font-mono text-[0.68rem] font-medium uppercase leading-6 tracking-[0.065em] text-signal">
          {visual.markers.slice(0, 3).join(" / ")}
        </p>

        <span className="mt-8 inline-flex min-h-12 w-fit items-center gap-8 border-b border-signal text-sm font-medium text-ink-primary">
          View case study
          <ArrowRight aria-hidden="true" size={16} />
        </span>
      </motion.div>

      <motion.div
        className="work-media-shell min-w-0 p-5 desktop:p-7"
        data-work-project-media
        style={reducedMotion ? undefined : { opacity: contentOpacity, scale: mediaScale, y: mediaY }}
      >
        <ProjectMedia
          className="h-full min-h-full w-full"
          project={project}
          variant="hero"
        />
      </motion.div>
    </MotionLink>
  );
}

export function SelectedWorkShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 34,
    mass: 0.22,
    restDelta: 0.0005,
    stiffness: 320,
  });

  useMotionValueEvent(smoothProgress, "change", (progress) => {
    if (reducedMotion || window.innerWidth < 1024) {
      return;
    }

    const nextIndex = progress < 0.25 ? 0 : progress < 0.75 ? 1 : 2;
    if (nextIndex !== activeIndexRef.current) {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }
  });

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
      data-active-work={activeIndex}
      data-reduced-motion={reducedMotion}
    >
      <div className="kinetic-work-stage">
        <div aria-hidden="true" className="work-signal-field">
          <span className="work-signal-grid" />
          <span className="work-signal-trace work-signal-trace-a" />
          <span className="work-signal-trace work-signal-trace-b" />
          <span className="work-signal-trace work-signal-trace-c" />
        </div>

        <header className="work-signal-header container-grid relative z-10 flex min-h-20 items-center justify-between gap-8 border-b border-graphite-strong">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[0.68rem] text-signal">03</span>
            <div>
              <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-ink-muted">{selectedWorkContent.label}</p>
              <h2 className="mt-1 max-w-[30ch] font-display text-xl font-semibold leading-tight tracking-[-0.035em] text-ink-primary tablet:text-2xl">
                {selectedWorkContent.title}
              </h2>
            </div>
          </div>
          <p className="hidden max-w-xl text-right text-base leading-7 text-ink-secondary tablet:block">
            {selectedWorkContent.summary}
          </p>
        </header>

        <div className="kinetic-work-desktop-grid relative z-10 hidden laptop:block">
          <div aria-hidden="true" className="work-shutter-handoffs">
            {projects.slice(1).map((project, index) => (
              <WorkSignalHandoff
                key={project.slug}
                index={index}
                progress={smoothProgress}
                project={project}
              />
            ))}
          </div>

          {projects.map((project, index) => {
            const visual = projectVisuals[index];
            return (
              <DesktopWorkCard
                key={project.slug}
                activeIndex={activeIndex}
                index={index}
                progress={smoothProgress}
                project={project}
                reducedMotion={reducedMotion}
                visual={visual}
              />
            );
          })}

          <nav aria-label="Featured projects" className="work-signal-nav absolute inset-x-0 bottom-0 z-20 grid h-20 grid-cols-3 border-t border-graphite-strong bg-graphite-page">
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left bg-signal"
              style={{ scaleX: reducedMotion ? activeIndex / Math.max(projects.length - 1, 1) : smoothProgress }}
            />
            {projects.map((project, index) => (
              <button
                key={project.slug}
                aria-label={`Show ${project.name}`}
                aria-pressed={activeIndex === index}
                className={activeIndex === index ? "work-signal-tab group flex min-h-11 items-center justify-between border-r border-graphite-strong px-7 text-left text-ink-primary last:border-r-0" : "work-signal-tab group flex min-h-11 items-center justify-between border-r border-graphite-strong px-7 text-left text-ink-muted last:border-r-0 hover:text-ink-primary"}
                data-active={activeIndex === index}
                onClick={() => selectProject(index)}
                type="button"
              >
                <motion.span
                  animate={{ opacity: activeIndex === index ? 1 : 0.62, x: activeIndex === index ? 2 : 0 }}
                  className="font-mono text-[0.68rem] text-signal"
                  transition={motionSprings.snappy}
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.span>
                <span className="text-sm font-semibold">{project.name}</span>
                <span className="relative h-px w-8 bg-graphite-strong group-hover:bg-signal">
                  {activeIndex === index ? (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 bg-signal"
                      layoutId="selected-work-active-indicator"
                      transition={motionSprings.layout}
                    />
                  ) : null}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="relative z-10 grid laptop:hidden">
          {projects.map((project, index) => {
            const visual = projectVisuals[index];
            return (
              <motion.article
                key={project.slug}
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                transition={{
                  opacity: { duration: reducedMotion ? 0 : motionDurations.content },
                  y: reducedMotion ? { duration: 0 } : motionSprings.gentle,
                }}
                viewport={{ amount: 0.18, once: true }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              >
                <InteractiveLink
                  className="group block touch-manipulation border-b border-graphite-strong py-10"
                  href={`/projects/${project.slug}`}
                >
                  <div className="container-grid">
                    <motion.div
                      transition={motionSprings.gentle}
                      whileTap={reducedMotion ? undefined : { scale: interactionScale.card }}
                    >
                      <ProjectMedia className="w-full" project={project} variant="compact" />
                    </motion.div>
                    <div className="pt-6">
                      <p className="font-mono text-xs text-signal">
                        {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                      </p>
                      <div className="mt-3 flex items-end justify-between gap-5">
                        <h3 className="font-display text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink-primary tablet:text-6xl">{project.name}</h3>
                        <MotionArrow><ArrowRight className="text-signal" size={22} /></MotionArrow>
                      </div>
                      <p className="mt-4 max-w-xl text-base leading-7 text-ink-secondary">{visual.statement}</p>
                      <div className="mt-6 grid gap-3 border-t border-graphite-border pt-4 font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-ink-muted xs:grid-cols-2">
                        <span>{project.role}</span>
                        <span className="xs:text-right">{visual.shortStatus}</span>
                      </div>
                    </div>
                  </div>
                </InteractiveLink>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
