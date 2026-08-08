import type { RefObject } from "react";
import { InteractivePortrait } from "@/components/hero/interactive-portrait";

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
      <InteractivePortrait
        insetOneRef={insetOneRef}
        insetTwoRef={insetTwoRef}
        portraitRef={portraitRef}
      />
    </div>
  );
}
