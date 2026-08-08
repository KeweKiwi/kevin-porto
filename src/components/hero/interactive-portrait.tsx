"use client";

import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import { MediaSlot } from "@/components/media-slot";
import { TechnicalMeasurements } from "@/components/hero/technical-measurements";
import { architectureAssets, portraitAsset } from "@/data/media-assets";
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
  element.style.setProperty("--portrait-glare-x", `${values.glareX}%`);
  element.style.setProperty("--portrait-glare-y", `${values.glareY}%`);
  element.style.setProperty("--portrait-inset-one-x", `${values.insetOneX}px`);
  element.style.setProperty("--portrait-inset-one-y", `${values.insetOneY}px`);
  element.style.setProperty("--portrait-inset-two-x", `${values.insetTwoX}px`);
  element.style.setProperty("--portrait-inset-two-y", `${values.insetTwoY}px`);
  element.style.setProperty("--portrait-interaction", values.intensity.toFixed(3));
  element.style.setProperty("--portrait-inset-one-scale", `${1 + values.intensity * 0.045}`);
  element.style.setProperty("--portrait-inset-two-scale", `${1 + values.intensity * 0.055}`);
  element.style.setProperty("--portrait-parallax-x", `${values.portraitX}px`);
  element.style.setProperty("--portrait-parallax-y", `${values.portraitY}px`);
  element.style.setProperty("--portrait-rotate-x", `${values.rotateX}deg`);
  element.style.setProperty("--portrait-rotate-y", `${values.rotateY}deg`);
  element.style.setProperty("--portrait-scale", `${1 + values.intensity * 0.018}`);
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
    let lastFrameTime = 0;
    let enabled = pointerCapability.matches && !reducedMotion && !reducedMotionCapability.matches;

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

      for (const key of Object.keys(current) as Array<keyof PortraitMotionValues>) {
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
      if (!enabled || document.hidden || animationFrame !== null) {
        return;
      }
      interactionElement.dataset.portraitMotion = "active";
      animationFrame = window.requestAnimationFrame(animate);
    }

    function updateTarget(event: PointerEvent) {
      if (!enabled) {
        return;
      }

      const bounds = interactionElement.getBoundingClientRect();
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
      Object.assign(target, createNeutralValues());
      startAnimation();
    }

    function updateCapability() {
      enabled = pointerCapability.matches && !reducedMotion && !reducedMotionCapability.matches;
      if (!enabled) {
        resetImmediately();
      }
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        resetImmediately();
      }
    }

    interactionElement.dataset.portraitMotion = "idle";
    applyMotionValues(interactionElement, current);
    interactionElement.addEventListener("pointerenter", updateTarget, { passive: true });
    interactionElement.addEventListener("pointermove", updateTarget, { passive: true });
    interactionElement.addEventListener("pointerleave", returnToNeutral);
    pointerCapability.addEventListener("change", updateCapability);
    reducedMotionCapability.addEventListener("change", updateCapability);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      interactionElement.removeEventListener("pointerenter", updateTarget);
      interactionElement.removeEventListener("pointermove", updateTarget);
      interactionElement.removeEventListener("pointerleave", returnToNeutral);
      pointerCapability.removeEventListener("change", updateCapability);
      reducedMotionCapability.removeEventListener("change", updateCapability);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopAnimation();
    };
  }, [reducedMotion]);

  return (
    <div
      ref={interactionRef}
      className={styles.interactionRoot}
      data-interactive-portrait
      data-portrait-motion="idle"
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
          <span
            aria-hidden="true"
            className={styles.techPatternBase}
            data-hero-tech-surface
          />
          <span aria-hidden="true" className={styles.techPatternReactive} />
          <span aria-hidden="true" className={styles.digitalGrain} />
          <span aria-hidden="true" className={styles.techShimmer} />
          <span aria-hidden="true" className={styles.directionalGlare} />
          <span aria-hidden="true" className={styles.signalHighlight} />
        </div>

        <TechnicalMeasurements />

        <div
          ref={insetOneRef}
          className="hero-architecture-inset hero-architecture-inset-one"
          data-hero-inset
        >
          <div className={`${styles.insetDepth} ${styles.insetDepthOne}`}>
            <MediaSlot
              asset={architectureAssets[0]}
              className="h-full w-full"
              imageClassName="hero-architecture-image"
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
              asset={architectureAssets[1]}
              className="h-full w-full"
              imageClassName="hero-architecture-image"
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
