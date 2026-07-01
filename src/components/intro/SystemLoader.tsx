"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  INTRO_COMPLETE_EVENT,
  INTRO_REVEAL_EVENT,
} from "@/lib/intro";
import { prefersReducedMotionQuery } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import styles from "./SystemLoader.module.css";

type SystemLoaderProps = {
  onComplete?: () => void;
  allowSkip?: boolean;
  timeoutMs?: number;
};

type LoaderStatus = {
  command: string;
  confirmation: string;
};

const desktopStatuses = [
  { command: "INITIALIZING PROFILE", confirmation: "PROFILE SYNCED" },
  { command: "LOADING CORE ASSETS", confirmation: "ASSETS MOUNTED" },
  { command: "COMPILING PROJECT SIGNALS", confirmation: "SIGNAL LOCKED" },
  { command: "VALIDATING INTERFACE", confirmation: "INTERFACE LIVE" },
];

const mobileStatuses: LoaderStatus[] = [
  { command: "PROFILE INIT", confirmation: "SYNCED" },
  { command: "CORE ASSETS", confirmation: "MOUNTED" },
  { command: "PROJECT SIGNALS", confirmation: "LOCKED" },
  { command: "INTERFACE CHECK", confirmation: "LIVE" },
];

const progressCells = Array.from({ length: 24 }, (_, index) => index);
const decodeGlyphs = ["0", "1", "/", "\\", "_", "-", "+", "*", "#", ":", "."] as const;

type StatusMode = "desktop" | "mobile";

function prefersReducedMotion() {
  return window.matchMedia(prefersReducedMotionQuery).matches;
}

function TerminalStatusLine({
  mode,
  status,
}: {
  mode: StatusMode;
  status: LoaderStatus;
}) {
  const lineProps =
    mode === "desktop"
      ? { "data-desktop-status": true }
      : { "data-mobile-status": true };
  const confirmationProps =
    mode === "desktop"
      ? { "data-desktop-confirmation": true }
      : { "data-mobile-confirmation": true };

  return (
    <li className={styles.statusLine} {...lineProps}>
      <span className={styles.statusBeam} data-status-beam />
      <span className={styles.statusCommand}>
        <span className={styles.statusSweep} data-status-sweep />
        <span className={styles.statusPrompt} data-status-prompt>
          &gt;
        </span>
        <span className={styles.statusText}>
          {status.command.split(" ").map((word, wordIndex) => (
            <span key={`${status.command}-${wordIndex}-${word}`} className={styles.statusWord}>
              {Array.from(word).map((char, charIndex) => (
                <span
                  key={`${status.command}-${wordIndex}-${charIndex}`}
                  className={styles.statusChar}
                  data-status-value={char}
                  data-status-char
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
          <span className={styles.statusCursor} data-status-cursor />
        </span>
      </span>
      <span className={styles.confirmationMark} {...confirmationProps}>
        {status.confirmation}
      </span>
    </li>
  );
}

export function SystemLoader({
  onComplete,
  allowSkip = true,
  timeoutMs = 6800,
}: SystemLoaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLSpanElement | null>(null);
  const progressValueRef = useRef<HTMLSpanElement | null>(null);
  const statusRef = useRef<HTMLSpanElement | null>(null);
  const completeRef = useRef(false);
  const revealRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const reducedMotion = usePrefersReducedMotion();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const loaderRoot = root;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.dataset.kwfIntroActive = "true";

    let timeline: gsap.core.Timeline | undefined;
    let context: gsap.Context | undefined;
    let fallbackTimer: number | undefined;
    const progressState = { value: 0 };

    function setProgress(value: number) {
      const clampedValue = Math.max(0, Math.min(100, value));
      const visibleValue = Math.round(clampedValue);

      if (progressValueRef.current) {
        progressValueRef.current.textContent = `${visibleValue}%`;
      }

      if (progressFillRef.current) {
        gsap.set(progressFillRef.current, { scaleX: clampedValue / 100 });
      }

      const cellProgress = (clampedValue / 100) * progressCells.length;
      loaderRoot.querySelectorAll<HTMLElement>("[data-progress-cell]").forEach((cell, index) => {
        const cellFill = Math.max(0, Math.min(1, cellProgress - index));

        cell.style.setProperty("--cell-fill", cellFill.toFixed(3));
        cell.dataset.active = cellFill > 0.015 ? "true" : "false";
      });
    }

    function setSystemStatus(value: string) {
      if (statusRef.current) {
        statusRef.current.textContent = value;
      }
    }

    function revealHero() {
      if (revealRef.current) {
        return;
      }

      revealRef.current = true;
      window.dispatchEvent(new CustomEvent(INTRO_REVEAL_EVENT));
    }

    function completeIntro() {
      if (completeRef.current) {
        return;
      }

      completeRef.current = true;
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      delete document.documentElement.dataset.kwfIntroActive;
      window.dispatchEvent(new CustomEvent(INTRO_COMPLETE_EVENT));
      onCompleteRef.current?.();
      setIsActive(false);
    }

    function finishQuickly() {
      timeline?.kill();
      revealHero();
      setProgress(100);
      setSystemStatus("SYSTEM READY");

      gsap.to(root, {
        autoAlpha: 0,
        duration: 0.18,
        ease: "power2.out",
        onComplete: completeIntro,
      });
    }

    function handleSkip(event: KeyboardEvent) {
      if (allowSkip && event.key === "Escape") {
        finishQuickly();
      }
    }

    window.addEventListener("keydown", handleSkip);

    fallbackTimer = window.setTimeout(() => {
      finishQuickly();
    }, timeoutMs);

    context = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const shouldReduceMotion = reducedMotion || prefersReducedMotion();
      const statusLines = gsap.utils.toArray<HTMLElement>(
        isMobile ? "[data-mobile-status]" : "[data-desktop-status]",
        root,
      );
      const confirmationMarks = gsap.utils.toArray<HTMLElement>(
        isMobile ? "[data-mobile-confirmation]" : "[data-desktop-confirmation]",
        root,
      );

      gsap.set(progressFillRef.current, { scaleX: 0, transformOrigin: "left center" });
      setProgress(0);
      setSystemStatus("SYSTEM STATUS");

      if (shouldReduceMotion) {
        gsap.set(progressFillRef.current, { scaleX: 1 });
        setProgress(100);
        setSystemStatus("SYSTEM READY");
        revealHero();

        timeline = gsap.timeline({
          onComplete: completeIntro,
        });

        timeline
          .to(root, { opacity: 1, duration: 0.08 })
          .to(root, { opacity: 0, duration: 0.2, ease: "power2.out" }, "+=0.08");

        return;
      }

      const timing = isMobile
        ? {
          wake: 0.18,
          status: 0.055,
          statusHold: 0.16,
          statusOut: 0.15,
          char: 0.034,
          charStagger: 0.01,
          decodeFlicker: 0.034,
          progressDuration: 4.35,
          ready: 0.16,
          exit: 0.34,
        }
        : {
          wake: 0.24,
          status: 0.065,
          statusHold: 0.2,
          statusOut: 0.18,
          char: 0.036,
          charStagger: 0.011,
          decodeFlicker: 0.036,
          progressDuration: 4.7,
          ready: 0.22,
          exit: 0.5,
        };

      root.querySelectorAll<HTMLElement>("[data-status-char]").forEach((char) => {
        char.textContent = char.dataset.statusValue ?? char.textContent;
      });

      gsap.set(statusLines, {
        autoAlpha: 0,
        clipPath: "inset(0% 44% 0% 44%)",
        filter: "blur(4px)",
        scale: 0.985,
        y: isMobile ? 10 : 16,
      });
      gsap.set("[data-status-char]", {
        autoAlpha: 0,
        color: "rgba(215, 247, 91, 0.68)",
        filter: "blur(3px)",
        textShadow: "0 0 18px rgba(215, 247, 91, 0.18)",
        yPercent: 38,
      });
      gsap.set("[data-status-prompt], [data-status-cursor]", { autoAlpha: 0 });
      gsap.set("[data-status-beam]", {
        autoAlpha: 0,
        scaleX: 0,
        xPercent: 0,
        transformOrigin: "center center",
      });
      gsap.set("[data-status-sweep]", {
        autoAlpha: 0,
        scaleX: 0.22,
        xPercent: -24,
        transformOrigin: "left center",
      });
      gsap.set(confirmationMarks, { autoAlpha: 0, y: 5 });
      gsap.set("[data-loader-metadata]", { autoAlpha: 0, y: -8 });
      gsap.set("[data-loader-scan]", { scaleX: 0, transformOrigin: "left center" });
      gsap.set("[data-loader-exit-line]", { scaleX: 0, transformOrigin: "center center" });
      progressState.value = 0;

      const introTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: completeIntro,
      });
      timeline = introTimeline;

      introTimeline
        .from("[data-loader-frame]", {
          autoAlpha: 0,
          duration: timing.wake,
        })
        .to(
          "[data-loader-metadata]",
          {
            autoAlpha: 1,
            y: 0,
            duration: timing.wake,
            stagger: 0.05,
          },
          "<",
        );

      if (!isMobile) {
        introTimeline
          .to(
            "[data-loader-scan]",
            {
              scaleX: 1,
              duration: timing.wake,
              ease: "power2.inOut",
            },
            "<+=0.04",
          )
          .to("[data-loader-scan]", {
            xPercent: 108,
            duration: 0.22,
            ease: "power2.in",
          });
      }

      statusLines.forEach((line, index) => {
        const confirmation = confirmationMarks[index];
        const prompt = line.querySelector<HTMLElement>("[data-status-prompt]");
        const cursor = line.querySelector<HTMLElement>("[data-status-cursor]");
        const beam = line.querySelector<HTMLElement>("[data-status-beam]");
        const sweep = line.querySelector<HTMLElement>("[data-status-sweep]");
        const chars = gsap.utils.toArray<HTMLElement>("[data-status-char]", line);
        const lineTimeline = gsap.timeline();
        const decodeTimeline = gsap.timeline();

        chars.forEach((char, charIndex) => {
          const finalChar = char.dataset.statusValue ?? char.textContent ?? "";
          const firstGlyph = decodeGlyphs[(charIndex + index * 3) % decodeGlyphs.length];
          const secondGlyph =
            decodeGlyphs[(charIndex * 2 + index * 5 + 4) % decodeGlyphs.length];
          const startAt = charIndex * timing.charStagger;

          decodeTimeline
            .call(
              () => {
                char.textContent = firstGlyph;
              },
              undefined,
              startAt,
            )
            .to(
              char,
              {
                autoAlpha: 0.72,
                color: "rgba(215, 247, 91, 0.78)",
                filter: "blur(2px)",
                textShadow: "0 0 18px rgba(215, 247, 91, 0.28)",
                yPercent: isMobile ? 26 : 34,
                duration: timing.decodeFlicker,
                ease: "none",
              },
              startAt,
            )
            .call(
              () => {
                char.textContent = secondGlyph;
              },
              undefined,
              startAt + timing.decodeFlicker * 0.52,
            )
            .call(
              () => {
                char.textContent = finalChar;
              },
              undefined,
              startAt + timing.decodeFlicker + timing.char * 0.32,
            )
            .to(
              char,
              {
                autoAlpha: 1,
                color: "rgba(243, 240, 232, 0.92)",
                filter: "blur(0px)",
                textShadow: "0 0 14px rgba(243, 240, 232, 0.06)",
                yPercent: 0,
                duration: timing.char,
                ease: "power2.out",
                onComplete: () => {
                  char.textContent = finalChar;
                },
              },
              startAt + timing.decodeFlicker,
            );
        });

        lineTimeline
          .to(line, {
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            filter: "blur(0px)",
            scale: 1,
            y: 0,
            duration: timing.status,
          })
          .to(
            prompt,
            {
              autoAlpha: 1,
              duration: 0.04,
              ease: "none",
            },
            "<",
          )
          .to(
            beam,
            {
              autoAlpha: 1,
              scaleX: 1,
              duration: 0.18,
              ease: "power2.out",
            },
            "<",
          )
          .to(
            sweep,
            {
              autoAlpha: 0.86,
              scaleX: 1,
              xPercent: 0,
              duration: isMobile ? 0.18 : 0.24,
              ease: "power2.out",
            },
            "<+=0.03",
          )
          .add(decodeTimeline, "<+=0.08")
          .to(
            sweep,
            {
              autoAlpha: 0,
              scaleX: 1.12,
              xPercent: 22,
              duration: isMobile ? 0.18 : 0.24,
              ease: "power2.in",
            },
            ">-=0.12",
          )
          .to(
            beam,
            {
              autoAlpha: 0.32,
              xPercent: isMobile ? 0 : 3,
              duration: 0.24,
              ease: "none",
            },
            "<",
          )
          .to(
            cursor,
            {
              autoAlpha: 1,
              duration: 0.04,
              ease: "none",
            },
            ">-=0.02",
          )
          .to(
            confirmation,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.08,
            },
            "<+=0.03",
          )
          .to(
            chars,
            {
              color: "#D7F75B",
              duration: 0.035,
              stagger: {
                each: 0.003,
                from: "random",
              },
              ease: "none",
            },
            "<+=0.03",
          )
          .to(chars, {
            color: "rgba(243, 240, 232, 0.9)",
            duration: 0.08,
            ease: "power1.out",
          })
          .to(
            line,
            {
              autoAlpha: 0,
              clipPath: "inset(0% 0% 0% 0%)",
              filter: "blur(4px)",
              scale: 1.01,
              y: isMobile ? -8 : -14,
              duration: timing.statusOut,
              ease: "power2.in",
            },
            `+=${timing.statusHold}`,
          );

        introTimeline.add(lineTimeline);
      });

      introTimeline
        .to(
          progressState,
          {
            value: 94,
            duration: timing.progressDuration,
            ease: "power1.inOut",
            onUpdate: () => setProgress(progressState.value),
            onComplete: () => setProgress(94),
          },
          0.08,
        )
        .to(progressState, {
          value: 100,
          duration: isMobile ? 0.24 : 0.32,
          ease: "power1.inOut",
          onUpdate: () => setProgress(progressState.value),
          onComplete: () => setProgress(100),
        })
        .call(() => {
          setSystemStatus("SYSTEM READY");
        })
        .to("[data-loader-ready]", {
          opacity: 1,
          duration: timing.ready,
        })
        .to(
          "[data-loader-metadata]",
          {
            opacity: 0.42,
            duration: timing.ready,
          },
          "<",
        )
        .to(
          progressFillRef.current,
          {
            backgroundColor: "#D7F75B",
            duration: timing.ready,
          },
          "<",
        )
        .add(() => {
          revealHero();
        }, "+=0.04");

      if (isMobile) {
        introTimeline
          .to("[data-loader-frame]", {
            autoAlpha: 0,
            y: -12,
            duration: timing.exit * 0.5,
            ease: "power2.in",
          })
          .to(
            root,
            {
              clipPath: "inset(0% 0% 100% 0%)",
              duration: timing.exit,
              ease: "power3.inOut",
            },
            "<",
          );
      } else {
        introTimeline
          .to("[data-loader-exit-line]", {
            scaleX: 1,
            duration: timing.exit * 0.36,
            ease: "power3.inOut",
          })
          .to(
            "[data-loader-frame]",
            {
              autoAlpha: 0,
              y: -10,
              duration: timing.exit * 0.45,
              ease: "power2.in",
            },
            "<",
          )
          .to(
            "[data-loader-panel='top']",
            {
              yPercent: -101,
              duration: timing.exit,
              ease: "power3.inOut",
            },
            "<+=0.08",
          )
          .to(
            "[data-loader-panel='bottom']",
            {
              yPercent: 101,
              duration: timing.exit,
              ease: "power3.inOut",
            },
            "<",
          )
          .to(
            "[data-loader-exit-line]",
            {
              autoAlpha: 0,
              duration: timing.exit * 0.35,
            },
            "<+=0.2",
          );
      }
    }, root);

    return () => {
      window.removeEventListener("keydown", handleSkip);

      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
      }

      context?.revert();

      if (!completeRef.current) {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        delete document.documentElement.dataset.kwfIntroActive;
      }
    };
  }, [allowSkip, reducedMotion, timeoutMs]);

  if (!isActive) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`${styles.loader} kwf-system-loader`}
    >
      <div className={styles.panelTop} data-loader-panel="top" />
      <div className={styles.panelBottom} data-loader-panel="bottom" />
      <span className={styles.exitLine} data-loader-exit-line />

      <div className={styles.frame} data-loader-frame>
        <div className={styles.topbar}>
          <div className={styles.identity} data-loader-metadata>
            <span className={styles.statusDot} />
            <span>KWF / SIGNAL INTERFACE</span>
          </div>

          <div className={styles.metadata} data-loader-metadata>
            <span>BUILD 01</span>
            <span>SESSION ACTIVE</span>
          </div>
        </div>

        <div className={styles.scanTrack}>
          <span className={styles.scanLine} data-loader-scan />
        </div>

        <div className={styles.statusGrid}>
          <ul className={styles.desktopStatuses}>
            {desktopStatuses.map((status) => (
              <TerminalStatusLine key={status.command} mode="desktop" status={status} />
            ))}
          </ul>

          <ul className={styles.mobileStatuses}>
            {mobileStatuses.map((status) => (
              <TerminalStatusLine key={status.command} mode="mobile" status={status} />
            ))}
          </ul>
        </div>

        <div className={styles.progressDock}>
          <div className={styles.progressMeta}>
            <span>SYSTEM BUILD</span>
            <span ref={progressValueRef} data-loader-progress-value>
              0%
            </span>
          </div>

          <div className={styles.terminalProgress}>
            <span className={styles.progressBracket}>[</span>
            <div className={styles.progressCells} data-progress-cells>
              {progressCells.map((cell) => (
                <span key={cell} className={styles.progressCell} data-progress-cell />
              ))}
            </div>
            <span className={styles.progressBracket}>]</span>
          </div>

          <div className={styles.progressRail} data-progress-rail>
            <span ref={progressFillRef} className={styles.progressFill} />
            <span className={styles.segment} />
            <span className={styles.segment} />
            <span className={styles.segment} />
            <span className={styles.segment} />
          </div>

          <div className={styles.systemStatus}>
            <span ref={statusRef} data-loader-system-status>
              SYSTEM STATUS
            </span>
            <span className={styles.readySignal} data-loader-ready />
          </div>
        </div>
      </div>
    </div>
  );
}
