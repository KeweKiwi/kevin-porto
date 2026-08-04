import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { MediaAsset } from "@/data/media-assets";

type MediaSlotProps = {
  asset: MediaAsset;
  children?: ReactNode;
  className?: string;
  imageClassName?: string;
  label?: string;
  priority?: boolean;
  sizes: string;
};

export function MediaSlot({
  asset,
  children,
  className,
  imageClassName,
  label,
  priority = false,
  sizes,
}: MediaSlotProps) {
  return (
    <div
      aria-label={asset.src ? undefined : asset.alt}
      className={cn("kinetic-media-slot relative overflow-hidden bg-graphite-base", className)}
      data-required-asset={asset.src ? undefined : asset.alt}
      role={asset.src ? undefined : "img"}
    >
      {asset.src ? (
        <Image
          alt={asset.alt}
          className={cn("object-cover", imageClassName)}
          fill
          priority={priority}
          sizes={sizes}
          src={asset.src}
        />
      ) : (
        <div aria-hidden="true" className="kinetic-media-empty absolute inset-0">
          <span className="kinetic-media-axis kinetic-media-axis-x" />
          <span className="kinetic-media-axis kinetic-media-axis-y" />
          <span className="kinetic-media-corner kinetic-media-corner-a" />
          <span className="kinetic-media-corner kinetic-media-corner-b" />
        </div>
      )}

      {label ? (
        <span className="absolute bottom-4 left-4 z-10 font-mono text-[0.58rem] uppercase text-ink-secondary">
          {label}
        </span>
      ) : null}
      {children}
    </div>
  );
}
