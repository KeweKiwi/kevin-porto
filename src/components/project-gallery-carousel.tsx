"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { ProjectMedia } from "@/components/project-media";
import type { Project } from "@/data/projects";
import type { ProjectVisual } from "@/data/project-visuals";
import { cn } from "@/lib/cn";

type ProjectGalleryCarouselProps = {
  project: Project;
  visual: ProjectVisual;
};

type GallerySlide = {
  id: string;
  label: string;
  detail: string;
};

export function ProjectGalleryCarousel({ project, visual }: ProjectGalleryCarouselProps) {
  const slides = useMemo<GallerySlide[]>(() => {
    const mediaSlots = project.assetSlots
      .filter((slot) => slot.status === "available")
      .slice(0, 5)
      .map((slot, index) => ({
        id: `${project.slug}-${index}`,
        label: slot.label,
        detail: slot.recommendedSize,
      }));

    return [
      {
        id: `${project.slug}-overview`,
        label: "Case overview",
        detail: visual.proof,
      },
      ...mediaSlots,
    ];
  }, [project.assetSlots, project.slug, visual.proof]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex] ?? slides[0];
  const hasMultipleSlides = slides.length > 1;

  function showPreviousSlide() {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  }

  function showNextSlide() {
    setActiveIndex((current) => (current + 1) % slides.length);
  }

  return (
    <div className="overflow-hidden border border-graphite-strong bg-graphite-page">
      <div className="relative">
        <ProjectMedia
          project={project}
          variant="case"
          className="min-h-[420px] rounded-none border-0 shadow-none tablet:min-h-[560px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(215,247,91,0.14),transparent_34%),linear-gradient(180deg,rgba(8,9,9,0)_38%,rgba(8,9,9,0.82)_100%)]"
        />

        <div className="absolute left-4 top-4 border border-graphite-strong bg-graphite-page/86 px-3 py-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-ink-primary backdrop-blur tablet:left-5 tablet:top-5">
          {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>

        {hasMultipleSlides ? (
          <div className="absolute right-4 top-4 flex items-center gap-2 tablet:right-5 tablet:top-5">
            <button
              aria-label="Previous media"
              className="grid h-10 w-10 place-items-center border border-graphite-strong bg-graphite-page/86 text-ink-primary backdrop-blur transition hover:border-signal hover:text-signal"
              onClick={showPreviousSlide}
              type="button"
            >
              <ChevronLeft aria-hidden="true" size={18} />
            </button>
            <button
              aria-label="Next media"
              className="grid h-10 w-10 place-items-center border border-signal bg-signal text-graphite-page transition hover:-translate-y-0.5"
              onClick={showNextSlide}
              type="button"
            >
              <ChevronRight aria-hidden="true" size={18} />
            </button>
          </div>
        ) : null}

        <div className="border-t border-graphite-border bg-graphite-page p-4 tablet:absolute tablet:bottom-5 tablet:left-5 tablet:max-w-xl tablet:border tablet:border-graphite-strong tablet:bg-graphite-page/88 tablet:p-5 tablet:backdrop-blur">
          <p className="technical-label mb-3 text-signal">
            Project visualization
          </p>
          <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.035em] text-ink-primary tablet:text-3xl">
            {activeSlide.label}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-secondary">{activeSlide.detail}</p>
        </div>

        {hasMultipleSlides ? (
          <div className="absolute bottom-5 right-5 hidden items-center gap-2 tablet:flex">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={slide.id}
                  aria-label={`Open media ${index + 1}: ${slide.label}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "h-2.5 rounded-full border border-graphite-strong transition-all",
                    isActive ? "w-9 border-signal bg-signal" : "w-2.5 bg-graphite-page/80 hover:border-signal",
                  )}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
