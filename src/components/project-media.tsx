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
  const isSqueaky = project.slug === "squeaky";
  const isRizkiMobil = project.slug === "rizki-mobil";
  const onePager = "onePager" in assets ? assets.onePager : null;
  const primaryAsset = onePager ?? assets.hero;
  const hasOnePager = Boolean(onePager);
  const tertiary = "tertiary" in assets ? assets.tertiary : null;
  const showSupportingMedia = !hasOnePager && !isRizkiMobil;

  return (
    <div
      className={cn(
        "project-media-frame relative overflow-hidden bg-graphite-base",
        variant === "compact" ? "aspect-[4/3]" : "aspect-[16/10]",
        variant === "case" && "min-h-[360px]",
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 kwf-grid opacity-30" />

      <MediaSlot
        asset={primaryAsset}
        className={cn(
          isRizkiMobil
            ? "project-media-primary left-3 right-3 top-1/2 aspect-[1.88] -translate-y-1/2 border border-graphite-strong bg-black tablet:left-5 tablet:right-5"
            : hasOnePager
              ? "project-media-primary inset-3 border border-graphite-strong bg-black tablet:inset-5"
            : "project-media-primary inset-4 border border-graphite-strong tablet:inset-6",
          isSqueaky && !hasOnePager && "bg-[#697188]",
        )}
        imageClassName={isRizkiMobil ? "rizki-storefront-crop" : hasOnePager || isSqueaky ? "object-contain" : "object-cover object-center"}
        priority={priority}
        sizes={sizes}
      />

      <div aria-hidden="true" className="project-media-vignette absolute inset-0 z-[2]" />

      {!hasOnePager ? (
        <div className="absolute left-4 top-4 z-10 flex min-h-9 items-center border border-graphite-strong bg-graphite-page/90 px-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-ink-primary tablet:left-6 tablet:top-6">
          {project.platform} / {visual?.technicalSignal}
        </div>
      ) : null}

      {showSupportingMedia ? (
        <MediaSlot
          asset={assets.secondary}
          className={cn(
            "project-media-inset z-[4] border border-ink-primary/45 shadow-[0_18px_50px_rgba(0,0,0,.42)]",
            project.slug === "quackfight" && "bottom-4 right-4 aspect-[4/3] w-[35%] tablet:bottom-7 tablet:right-7",
            project.slug === "rizki-mobil" && "bottom-4 right-4 aspect-[16/10] w-[38%] tablet:bottom-7 tablet:right-7",
            project.slug === "squeaky" && "bottom-4 right-5 aspect-[3/5] w-[22%] tablet:bottom-7 tablet:right-8",
          )}
          imageClassName="object-cover"
          sizes="(max-width: 1023px) 38vw, 24vw"
        />
      ) : null}

      {tertiary && showSupportingMedia ? (
        <MediaSlot
          asset={tertiary}
          className={cn(
            "project-media-inset z-[5] border border-ink-primary/45 shadow-[0_16px_45px_rgba(0,0,0,.38)]",
            project.slug === "rizki-mobil" && "right-[8%] top-[15%] aspect-[16/10] w-[27%]",
            project.slug === "squeaky" && "right-[26%] top-[14%] aspect-square w-[12%]",
          )}
          imageClassName="object-cover"
          sizes="18vw"
        />
      ) : null}

      {!hasOnePager ? (
        <div className="absolute bottom-4 left-4 z-10 border-l border-signal bg-graphite-page/90 px-3 py-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-ink-primary tablet:bottom-6 tablet:left-6">
          Production evidence / {project.name}
        </div>
      ) : null}
    </div>
  );
}
