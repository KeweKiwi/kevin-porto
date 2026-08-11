"use client";

import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import { HoloGlyph } from "@/components/hero/holo-glyph";
import { MediaSlot } from "@/components/media-slot";
import { TechnicalMeasurements } from "@/components/hero/technical-measurements";
import { portraitAsset, portraitDetailAssets } from "@/data/media-assets";
import { prefersReducedMotionQuery } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import styles from "./interactive-portrait.module.css";

type InteractivePortraitProps = {
  insetOneRef: RefObject<HTMLDivElement | null>;
  insetTwoRef: RefObject<HTMLDivElement | null>;
  portraitRef: RefObject<HTMLDivElement | null>;
};

type PortraitMotionValues = {
  glareX: number;
  glareY: number;
  insetOneX: number;
  insetOneY: number;
  insetTwoX: number;
  insetTwoY: number;
  intensity: number;
  portraitX: number;
  portraitY: number;
  rotateX: number;
  rotateY: number;
};

const finePointerQuery = "(hover: hover) and (pointer: fine)";
const motionValueKeys: Array<keyof PortraitMotionValues> = [
  "glareX",
  "glareY",
  "insetOneX",
  "insetOneY",
  "insetTwoX",
  "insetTwoY",
  "intensity",
  "portraitX",
  "portraitY",
  "rotateX",
  "rotateY",
];

function createNeutralValues(): PortraitMotionValues {
  return {
    glareX: 50,
    glareY: 50,
    insetOneX: 0,
    insetOneY: 0,
    insetTwoX: 0,
    insetTwoY: 0,
    intensity: 0,
    portraitX: 0,
    portraitY: 0,
    rotateX: 0,
    rotateY: 0,
  };
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function applyMotionValues(element: HTMLDivElement, values: PortraitMotionValues) {
  element.style.cssText = `
    --portrait-glare-x: ${values.glareX.toFixed(2)}%;
    --portrait-glare-y: ${values.glareY.toFixed(2)}%;
    --portrait-inset-one-x: ${values.insetOneX.toFixed(2)}px;
    --portrait-inset-one-y: ${values.insetOneY.toFixed(2)}px;
    --portrait-inset-two-x: ${values.insetTwoX.toFixed(2)}px;
    --portrait-inset-two-y: ${values.insetTwoY.toFixed(2)}px;
    --portrait-interaction: ${values.intensity.toFixed(3)};
    --portrait-inset-one-scale: ${(1 + values.intensity * 0.045).toFixed(4)};
    --portrait-inset-two-scale: ${(1 + values.intensity * 0.055).toFixed(4)};
    --portrait-parallax-x: ${values.portraitX.toFixed(2)}px;
    --portrait-parallax-y: ${values.portraitY.toFixed(2)}px;
    --portrait-rotate-x: ${values.rotateX.toFixed(2)}deg;
    --portrait-rotate-y: ${values.rotateY.toFixed(2)}deg;
    --portrait-scale: ${(1 + values.intensity * 0.018).toFixed(4)};
  `;
}

export function InteractivePortrait({
  insetOneRef,
  insetTwoRef,
  portraitRef,
}: InteractivePortraitProps) {
  const interactionRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!interactionRef.current) {
      return;
    }
    const interactionElement: HTMLDivElement = interactionRef.current;

    const pointerCapability = window.matchMedia(finePointerQuery);
    const reducedMotionCapability = window.matchMedia(prefersReducedMotionQuery);
    const current = createNeutralValues();
    const target = createNeutralValues();
    let animationFrame: number | null = null;
    let ambientInView = true;
    let interactionBounds: DOMRect | null = null;
    let lastFrameTime = 0;
    let enabled =
      pointerCapability.matches &&
      !reducedMotion &&
      !reducedMotionCapability.matches &&
      !document.hidden;

    function updateAmbientVisibility() {
      interactionElement.dataset.portraitVisible = String(ambientInView && !document.hidden);
    }

    function stopAnimation() {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
      lastFrameTime = 0;
      interactionElement.dataset.portraitMotion = "idle";
    }

    function resetImmediately() {
      Object.assign(target, createNeutralValues());
      Object.assign(current, target);
      applyMotionValues(interactionElement, current);
      stopAnimation();
    }

    function animate(frameTime: number) {
      const elapsed = lastFrameTime === 0 ? 16 : Math.min(frameTime - lastFrameTime, 48);
      const blend = 1 - Math.exp(-elapsed / 86);
      let largestDelta = 0;

      for (const key of motionValueKeys) {
        const delta = target[key] - current[key];
        current[key] += delta * blend;
        largestDelta = Math.max(largestDelta, Math.abs(delta));
      }

      applyMotionValues(interactionElement, current);
      lastFrameTime = frameTime;

      if (largestDelta <= 0.025) {
        Object.assign(current, target);
        applyMotionValues(interactionElement, current);
        stopAnimation();
        return;
      }

      animationFrame = window.requestAnimationFrame(animate);
    }

    function startAnimation() {
      if (!enabled || !ambientInView || document.hidden || animationFrame !== null) {
        return;
      }
      interactionElement.dataset.portraitMotion = "active";
      animationFrame = window.requestAnimationFrame(animate);
    }

    function updateTarget(event: PointerEvent) {
      if (!enabled) {
        return;
      }

      const bounds = interactionBounds ?? interactionElement.getBoundingClientRect();
      interactionBounds = bounds;
      if (bounds.width === 0 || bounds.height === 0) {
        return;
      }

      const normalizedX = clamp(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -1, 1);
      const normalizedY = clamp(((event.clientY - bounds.top) / bounds.height) * 2 - 1, -1, 1);

      target.rotateX = normalizedY * -3;
      target.rotateY = normalizedX * 4;
      target.portraitX = normalizedX * 5;
      target.portraitY = normalizedY * 4;
      target.insetOneX = normalizedX * 8;
      target.insetOneY = normalizedY * 6;
      target.insetTwoX = normalizedX * 7;
      target.insetTwoY = normalizedY * 9;
      target.glareX = (normalizedX + 1) * 50;
      target.glareY = (normalizedY + 1) * 50;
      target.intensity = 1;
      startAnimation();
    }

    function returnToNeutral() {
      interactionBounds = null;
      Object.assign(target, createNeutralValues());
      startAnimation();
    }

    function handlePointerEnter(event: PointerEvent) {
      interactionBounds = interactionElement.getBoundingClientRect();
      updateTarget(event);
    }

    function handleViewportChange() {
      interactionBounds = null;
      if (animationFrame !== null || current.intensity > 0.001) {
        resetImmediately();
      }
    }

    function updateCapability() {
      enabled =
        pointerCapability.matches &&
        !reducedMotion &&
        !reducedMotionCapability.matches &&
        ambientInView &&
        !document.hidden;
      if (!enabled) {
        resetImmediately();
      }
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        resetImmediately();
      }
      updateAmbientVisibility();
      updateCapability();
    }

    const visibilityObserver =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              ambientInView = entry.isIntersecting;
              updateAmbientVisibility();
              updateCapability();
            },
            { rootMargin: "80px 0px" },
          );

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            interactionBounds = null;
          });

    interactionElement.dataset.portraitMotion = "idle";
    interactionElement.dataset.portraitVisible = "false";
    applyMotionValues(interactionElement, current);
    if (visibilityObserver) {
      visibilityObserver.observe(interactionElement);
    } else {
      updateAmbientVisibility();
    }
    resizeObserver?.observe(interactionElement);
    interactionElement.addEventListener("pointerenter", handlePointerEnter, { passive: true });
    interactionElement.addEventListener("pointermove", updateTarget, { passive: true });
    interactionElement.addEventListener("pointerleave", returnToNeutral);
    window.addEventListener("scroll", handleViewportChange, { passive: true });
    pointerCapability.addEventListener("change", updateCapability);
    reducedMotionCapability.addEventListener("change", updateCapability);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      interactionElement.removeEventListener("pointerenter", handlePointerEnter);
      interactionElement.removeEventListener("pointermove", updateTarget);
      interactionElement.removeEventListener("pointerleave", returnToNeutral);
      window.removeEventListener("scroll", handleViewportChange);
      pointerCapability.removeEventListener("change", updateCapability);
      reducedMotionCapability.removeEventListener("change", updateCapability);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      visibilityObserver?.disconnect();
      resizeObserver?.disconnect();
      stopAnimation();
    };
  }, [reducedMotion]);

  return (
    <div
      ref={interactionRef}
      className={styles.interactionRoot}
      data-interactive-portrait
      data-portrait-motion="idle"
      data-portrait-visible="false"
    >
      <div className={styles.tiltSurface}>
        <div aria-hidden="true" className={styles.behindGlow} />

        <div
          ref={portraitRef}
          className={`hero-portrait-frame ${styles.portraitFrame}`}
          data-hero-portrait
        >
          <div className={styles.portraitDepth}>
            <MediaSlot
              asset={portraitAsset}
              className="h-full w-full"
              imageClassName="hero-portrait-image"
              priority
              sizes="(max-width: 767px) 92vw, (max-width: 1023px) 68vw, 46vw"
            />
          </div>
          <div
            aria-hidden="true"
            className={styles.glyphField}
            data-hero-tech-surface
          >
            <HoloGlyph
              className={`${styles.glyphTopLeft} ${styles.glyphMobileHidden}`}
              delay={-4}
              idleOpacity={0.15}
              variant="bracket"
            />
            <HoloGlyph
              className={styles.glyphTopRight}
              delay={-7}
              idleOpacity={0.22}
              variant="angle"
            />
            <HoloGlyph
              className={`${styles.glyphMidRight} ${styles.glyphMobileHidden}`}
              delay={-10}
              idleOpacity={0.09}
              variant="slash"
            />
            <HoloGlyph
              className={styles.glyphLowerLeft}
              delay={-2}
              idleOpacity={0.13}
              variant="terminal"
            />
            <HoloGlyph
              className={styles.glyphLowerRight}
              delay={-12}
              idleOpacity={0.075}
              variant="fragment"
            />
          </div>
          <span aria-hidden="true" className={styles.directionalGlare} />
        </div>

        <TechnicalMeasurements />

        <div
          ref={insetOneRef}
          className="hero-architecture-inset hero-architecture-inset-one"
          data-hero-inset
        >
          <div className={`${styles.insetDepth} ${styles.insetDepthOne}`}>
            <MediaSlot
              asset={portraitDetailAssets[0]}
              className="h-full w-full"
              imageClassName={`hero-architecture-image ${styles.insetImage} ${styles.insetChairImage}`}
              sizes="(max-width: 767px) 38vw, 22vw"
            />
          </div>
          <span aria-hidden="true" className={styles.insetSignal} />
          <span className="hero-inset-crosshair hero-inset-crosshair-a" />
          <span className="hero-inset-crosshair hero-inset-crosshair-b" />
        </div>

        <div
          ref={insetTwoRef}
          className="hero-architecture-inset hero-architecture-inset-two"
          data-hero-inset
        >
          <div className={`${styles.insetDepth} ${styles.insetDepthTwo}`}>
            <MediaSlot
              asset={portraitDetailAssets[1]}
              className="h-full w-full"
              imageClassName={`hero-architecture-image ${styles.insetImage} ${styles.insetPersonalImage}`}
              sizes="18vw"
            />
          </div>
          <span aria-hidden="true" className={styles.insetSignal} />
          <span className="hero-inset-crosshair hero-inset-crosshair-a" />
          <span className="hero-inset-crosshair hero-inset-crosshair-b" />
        </div>
      </div>
    </div>
  );
}
