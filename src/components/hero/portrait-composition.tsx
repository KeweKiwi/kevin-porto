import type { RefObject } from "react";
import { MediaSlot } from "@/components/media-slot";
import { architectureAssets, portraitAsset } from "@/data/media-assets";
import { TechnicalMeasurements } from "@/components/hero/technical-measurements";

type PortraitCompositionProps = {
  insetOneRef: RefObject<HTMLDivElement | null>;
  insetTwoRef: RefObject<HTMLDivElement | null>;
  portraitRef: RefObject<HTMLDivElement | null>;
};

export function PortraitComposition({
  insetOneRef,
  insetTwoRef,
  portraitRef,
}: PortraitCompositionProps) {
  return (
    <div className="hero-portrait-composition" data-hero-portrait-composition>
      <div className="hero-portrait-frame" data-hero-portrait ref={portraitRef}>
        <MediaSlot
          asset={portraitAsset}
          className="h-full w-full"
          imageClassName="hero-portrait-image"
          priority
          sizes="(max-width: 767px) 92vw, (max-width: 1023px) 68vw, 46vw"
        />
      </div>

      <TechnicalMeasurements />

      <div className="hero-architecture-inset hero-architecture-inset-one" data-hero-inset ref={insetOneRef}>
        <MediaSlot
          asset={architectureAssets[0]}
          className="h-full w-full"
          imageClassName="hero-architecture-image"
          sizes="(max-width: 767px) 38vw, 22vw"
        />
        <span aria-hidden="true" className="hero-inset-crosshair hero-inset-crosshair-a" />
        <span aria-hidden="true" className="hero-inset-crosshair hero-inset-crosshair-b" />
      </div>

      <div className="hero-architecture-inset hero-architecture-inset-two" data-hero-inset ref={insetTwoRef}>
        <MediaSlot
          asset={architectureAssets[1]}
          className="h-full w-full"
          imageClassName="hero-architecture-image"
          sizes="18vw"
        />
        <span aria-hidden="true" className="hero-inset-crosshair hero-inset-crosshair-a" />
        <span aria-hidden="true" className="hero-inset-crosshair hero-inset-crosshair-b" />
      </div>
    </div>
  );
}
