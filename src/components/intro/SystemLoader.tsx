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

const desktopStatuses = [
  "INITIALIZING PROFILE",
  "LOADING CORE ASSETS",
  "COMPILING PROJECT SIGNALS",
  "VALIDATING INTERFACE",
];

const mobileStatuses = desktopStatuses;

const progressMilestones = [18, 46, 72, 91, 100] as const;
const progressCells = Array.from({ length: 24 }, (_, index) => index);

type StatusMode = "desktop" | "mobile";

function prefersReducedMotion() {
  return window.matchMedia(prefersReducedMotionQuery).matches;
}

function TerminalStatusLine({
  mode,
  status,
}: {
  mode: StatusMode;
  status: string;
}) {
  const lineProps =
    mode === "desktop"
      ? { "data-desktop-status": true }
      : { "data-mobile-status": true };
  const okProps =
    mode === "desktop"
      ? { "data-desktop-ok": true }
      : { "data-mobile-ok": true };

  return (
    <li className={styles.statusLine} {...lineProps}>
      <span className={styles.statusCommand}>
        <span className={styles.statusPrompt} data-status-prompt>
          &gt;
        </span>
        <span className={styles.statusText}>
          {status.split(" ").map((word, wordIndex) => (
            <span key={`${status}-${wordIndex}-${word}`} className={styles.statusWord}>
              {Array.from(word).map((char, charIndex) => (
                <span
                  key={`${status}-${wordIndex}-${charIndex}`}
                  className={styles.statusChar}
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
      <span className={styles.okMark} {...okProps}>
        OK
      </span>
    </li>
  );
}

export function SystemLoader({
  onComplete,
  allowSkip = true,
  timeoutMs = 6200,
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

    function setProgress(value: number) {
      if (progressValueRef.current) {
        progressValueRef.current.textContent = `${value}%`;
      }

      const activeCellCount = Math.round((value / 100) * progressCells.length);
      loaderRoot.querySelectorAll<HTMLElement>("[data-progress-cell]").forEach((cell, index) => {
        cell.dataset.active = index < activeCellCount ? "true" : "false";
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
      const okMarks = gsap.utils.toArray<HTMLElement>(
        isMobile ? "[data-mobile-ok]" : "[data-desktop-ok]",
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
          wake: 0.2,
          status: 0.05,
          statusHold: 0.16,
          statusOut: 0.16,
          char: 0.024,
          charStagger: 0.012,
          progress: 0.14,
          ready: 0.16,
          exit: 0.34,
        }
        : {
          wake: 0.28,
          status: 0.05,
          statusHold: 0.18,
          statusOut: 0.18,
          char: 0.026,
          charStagger: 0.011,
          progress: 0.16,
          ready: 0.2,
          exit: 0.5,
        };

      gsap.set(statusLines, {
        autoAlpha: 0,
        clipPath: "inset(0% 44% 0% 44%)",
        filter: "blur(4px)",
        scale: 0.985,
        y: isMobile ? 10 : 16,
      });
      gsap.set("[data-status-char]", { autoAlpha: 0, filter: "blur(3px)", yPercent: 38 });
      gsap.set("[data-status-prompt], [data-status-cursor]", { autoAlpha: 0 });
      gsap.set(okMarks, { autoAlpha: 0, y: 5 });
      gsap.set("[data-loader-metadata]", { autoAlpha: 0, y: -8 });
      gsap.set("[data-loader-scan]", { scaleX: 0, transformOrigin: "left center" });
      gsap.set("[data-loader-exit-line]", { scaleX: 0, transformOrigin: "center center" });

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
        const ok = okMarks[index];
        const milestone = progressMilestones[index] ?? 100;
        const prompt = line.querySelector<HTMLElement>("[data-status-prompt]");
        const cursor = line.querySelector<HTMLElement>("[data-status-cursor]");
        const chars = gsap.utils.toArray<HTMLElement>("[data-status-char]", line);

        introTimeline
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
            chars,
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              yPercent: 0,
              duration: timing.char,
              ease: "none",
              stagger: {
                each: timing.charStagger,
                from: "start",
              },
            },
            "<+=0.05",
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
            ok,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.08,
            },
            "<+=0.03",
          )
          .to(
            progressFillRef.current,
            {
              scaleX: milestone / 100,
              duration: timing.progress,
              ease: "power2.out",
              onStart: () => setProgress(milestone),
            },
            "<+=0.06",
          )
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
      });

      introTimeline
        .to(progressFillRef.current, {
          scaleX: 1,
          duration: timing.progress,
          ease: "power2.out",
          onStart: () => setProgress(100),
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
              <TerminalStatusLine key={status} mode="desktop" status={status} />
            ))}
          </ul>

          <ul className={styles.mobileStatuses}>
            {mobileStatuses.map((status) => (
              <TerminalStatusLine key={status} mode="mobile" status={status} />
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
