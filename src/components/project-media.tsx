import { MediaSlot } from "@/components/media-slot";
import { projectMediaAssets } from "@/data/media-assets";
import { getProjectVisual } from "@/data/project-visuals";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";

type ProjectMediaProps = {
  className?: string;
  priority?: boolean;
  project: Project;
  variant?: "hero" | "compact" | "case";
};

export function ProjectMedia({ className, priority = false, project, variant = "hero" }: ProjectMediaProps) {
  const assets = projectMediaAssets[project.slug as keyof typeof projectMediaAssets];
  const visual = getProjectVisual(project.slug);
  const sizes = variant === "compact" ? "(max-width: 1023px) 100vw, 46vw" : "(max-width: 1023px) 100vw, 62vw";

  return (
    <MediaSlot
      asset={assets.hero}
      className={cn(
        "project-media-frame",
        variant === "compact" ? "aspect-[4/3]" : "aspect-[16/10]",
        variant === "case" && "min-h-[360px]",
        className,
      )}
      priority={priority}
      sizes={sizes}
    >
      <div aria-hidden="true" className="absolute inset-0 z-[2]">
        <span className="project-media-word absolute left-5 top-1/2 -translate-y-1/2 uppercase text-ink-primary/10">
          {project.name}
        </span>
        <svg className="absolute inset-x-0 bottom-5 h-16 w-full text-signal" viewBox="0 0 800 64" preserveAspectRatio="none">
          <path
            d="M0 42 C55 42 60 30 105 38 S180 50 220 28 S295 46 340 36 S420 20 462 40 S535 50 574 22 S650 47 700 33 S760 40 800 28"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".72"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between gap-4 font-mono text-[0.58rem] uppercase text-ink-secondary">
        <span>{project.platform}</span>
        <span>{visual?.technicalSignal}</span>
      </div>
    </MediaSlot>
  );
}
