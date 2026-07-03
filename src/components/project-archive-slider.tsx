"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ProjectMedia } from "@/components/project-media";
import { projects } from "@/data/projects";
import {
  getProjectVisual,
  projectArchiveContent,
  type ProjectVisual,
} from "@/data/project-visuals";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

gsap.registerPlugin(useGSAP);

const archiveItems = projects.map((project, index) => {
  const sequence = String(index + 1).padStart(2, "0");
  const visual: ProjectVisual =
    getProjectVisual(project.slug) ?? {
      slug: project.slug,
      index: sequence,
      shortStatus: project.status,
      statement: project.preview,
      technicalSignal: project.technologies.slice(0, 3).join(" + "),
      proof: project.evidenceSignal,
      markers: project.technologies.slice(0, 4),
    };

  return {
    project,
    visual,
    sequence,
  };
});

export function ProjectArchiveSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const directionRef = useRef(1);
  const reducedMotion = usePrefersReducedMotion();
  const activeItem = archiveItems[activeIndex] ?? archiveItems[0];
  const totalProjects = archiveItems.length;

  useGSAP(
    () => {
      if (reducedMotion || !panelRef.current) {
        return;
      }

      const direction = directionRef.current;

      gsap.fromTo(
        ".archive-media",
        { autoAlpha: 0.76, xPercent: direction * -3, scale: 0.985 },
        { autoAlpha: 1, xPercent: 0, scale: 1, duration: 0.72, ease: "power3.out" },
      );

      gsap.fromTo(
        ".archive-animate",
        { autoAlpha: 0, x: direction * 22, y: 14 },
        { autoAlpha: 1, x: 0, y: 0, duration: 0.58, ease: "power3.out", stagger: 0.045 },
      );

      gsap.fromTo(
        ".archive-scan-line",
        {
          scaleX: 0,
          transformOrigin: direction > 0 ? "left center" : "right center",
        },
        { scaleX: 1, duration: 0.68, ease: "power2.out" },
      );
    },
    { dependencies: [activeIndex, reducedMotion], revertOnUpdate: true, scope: panelRef },
  );

  if (!activeItem) {
    return null;
  }

  function selectProject(nextIndex: number) {
    if (nextIndex === activeIndex) {
      return;
    }

    directionRef.current = nextIndex > activeIndex ? 1 : -1;
    setActiveIndex(nextIndex);
  }

  function showPreviousProject() {
    directionRef.current = -1;
    setActiveIndex((currentIndex) => (currentIndex - 1 + totalProjects) % totalProjects);
  }

  function showNextProject() {
    directionRef.current = 1;
    setActiveIndex((currentIndex) => (currentIndex + 1) % totalProjects);
  }

  const progress = `${((activeIndex + 1) / totalProjects) * 100}%`;

  return (
    <section
      aria-labelledby="project-archive-title"
      className="project-archive-section relative border-b border-graphite-border bg-graphite-page py-20 tablet:py-24"
    >
      <div className="container-grid">
        <div className="mb-10 grid gap-6 desktop:grid-cols-12 desktop:items-end">
          <div className="desktop:col-span-7">
            <p className="technical-label mb-5 text-ink-muted">{projectArchiveContent.label}</p>
            <h2
              id="project-archive-title"
              className="max-w-4xl scroll-mt-28 text-4xl font-semibold leading-none text-ink-primary tablet:text-6xl"
            >
              {projectArchiveContent.title}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-[1.55] text-ink-secondary desktop:col-span-4 desktop:col-start-9">
            {projectArchiveContent.summary}
          </p>
        </div>

        <div
          ref={panelRef}
          className="project-archive-shell relative overflow-hidden border border-graphite-strong bg-graphite-base"
        >
          <div className="archive-scan-line absolute left-0 top-0 z-10 h-px w-full bg-gradient-to-r from-transparent via-signal to-transparent" />

          <div className="relative z-[1] border-b border-graphite-border px-4 py-4 tablet:px-6">
            <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
              <div>
                <p className="technical-label text-ink-muted">{projectArchiveContent.recordLabel}</p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="h-2 w-2 bg-signal" />
                  <span className="font-mono text-sm uppercase tracking-[0.08em] text-ink-primary">
                    {String(totalProjects).padStart(2, "0")} {projectArchiveContent.recordNoun}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 tablet:justify-end">
                <span className="font-mono text-sm uppercase tracking-[0.08em] text-ink-secondary">
                  {activeItem.sequence} / {String(totalProjects).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    aria-label={projectArchiveContent.previousLabel}
                    className="grid h-10 w-10 place-items-center border border-graphite-strong text-ink-primary transition hover:border-signal hover:text-signal disabled:pointer-events-none disabled:opacity-40"
                    data-project-archive-prev
                    disabled={totalProjects < 2}
                    onClick={showPreviousProject}
                    type="button"
                  >
                    <ChevronLeft aria-hidden="true" size={18} />
                  </button>
                  <button
                    aria-label={projectArchiveContent.nextLabel}
                    className="grid h-10 w-10 place-items-center border border-graphite-strong bg-signal text-graphite-page transition hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-40"
                    data-project-archive-next
                    disabled={totalProjects < 2}
                    onClick={showNextProject}
                    type="button"
                  >
                    <ChevronRight aria-hidden="true" size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 h-px overflow-hidden bg-graphite-strong">
              <div
                className="project-archive-progress h-full bg-signal"
                style={{ width: progress }}
              />
            </div>
          </div>

          <div className="relative z-[1] grid gap-px bg-graphite-strong desktop:grid-cols-[0.9fr_1.1fr]">
            <div className="archive-media bg-graphite-page p-4 tablet:p-6 desktop:p-7">
              <ProjectMedia
                project={activeItem.project}
                variant="compact"
                className="min-h-[300px] rounded-[6px] shadow-none tablet:min-h-[360px] desktop:min-h-[430px]"
              />
            </div>

            <article className="grid content-between bg-graphite-base p-5 tablet:p-7 desktop:p-8">
              <div>
                <p className="archive-animate technical-label mb-5 text-signal">
                  {activeItem.visual.technicalSignal}
                </p>
                <h3 className="archive-animate text-4xl font-semibold leading-none text-ink-primary tablet:text-5xl desktop:text-6xl">
                  {activeItem.project.name}
                </h3>
                <p className="archive-animate mt-6 max-w-2xl text-base leading-[1.6] text-ink-secondary tablet:text-lg">
                  {activeItem.visual.statement}
                </p>

                <div className="archive-animate mt-8 grid gap-px bg-graphite-border tablet:grid-cols-2">
                  <ArchiveMeta label={projectArchiveContent.metaLabels.platform} value={activeItem.project.platform} />
                  <ArchiveMeta label={projectArchiveContent.metaLabels.role} value={activeItem.project.role} />
                  <ArchiveMeta label={projectArchiveContent.metaLabels.status} value={activeItem.visual.shortStatus} />
                  <ArchiveMeta label={projectArchiveContent.metaLabels.duration} value={activeItem.project.duration} />
                </div>

                <div className="archive-animate mt-8 grid gap-3">
                  <p className="technical-label text-ink-muted">{projectArchiveContent.evidenceLabel}</p>
                  <p className="max-w-2xl text-sm leading-6 text-ink-secondary">{activeItem.visual.proof}</p>
                </div>
              </div>

              <div className="archive-animate mt-10">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px flex-1 bg-graphite-strong" />
                  <span className="technical-label text-ink-muted">{projectArchiveContent.markerLabel}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeItem.visual.markers.map((marker) => (
                    <span
                      key={marker}
                      className="border border-graphite-strong px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-secondary"
                    >
                      {marker}
                    </span>
                  ))}
                </div>

                <Link
                  className="mt-7 inline-flex items-center gap-2 rounded-[4px] border border-signal/60 bg-signal px-4 py-3 text-sm font-medium text-graphite-page transition hover:-translate-y-0.5 active:translate-y-0"
                  href={`/projects/${activeItem.project.slug}`}
                >
                  {projectArchiveContent.openLabel}
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </div>
            </article>
          </div>

          <div className="relative z-[1] border-t border-graphite-border p-4 tablet:p-5">
            <p className="technical-label mb-4 text-ink-muted">{projectArchiveContent.sequenceLabel}</p>
            <div className="grid gap-2 desktop:grid-cols-3">
              {archiveItems.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={item.project.slug}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "project-archive-marker group grid min-h-[88px] grid-cols-[44px_1fr] gap-4 border p-4 text-left transition",
                      isActive
                        ? "border-signal/65 bg-graphite-page text-ink-primary"
                        : "border-graphite-border bg-graphite-base text-ink-secondary hover:border-graphite-strong hover:text-ink-primary",
                    )}
                    onClick={() => selectProject(index)}
                    type="button"
                  >
                    <span
                      className={cn(
                        "grid h-10 w-10 place-items-center border font-mono text-[0.62rem] uppercase tracking-[0.08em]",
                        isActive ? "border-signal text-signal" : "border-graphite-strong text-ink-muted",
                      )}
                    >
                      {item.sequence}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-base font-semibold leading-tight">{item.project.name}</span>
                      <span className="mt-2 block truncate font-mono text-[0.58rem] uppercase tracking-[0.08em] text-ink-muted">
                        {item.project.platform} / {item.visual.shortStatus}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchiveMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-graphite-base p-4">
      <p className="technical-label mb-2 text-ink-muted">{label}</p>
      <p className="text-sm leading-6 text-ink-primary">{value}</p>
    </div>
  );
}
