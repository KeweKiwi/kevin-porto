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

const mobileStatuses = ["INITIALIZING", "LOADING ASSETS", "READY"];

const progressMilestones = [18, 46, 72, 91, 100] as const;
const progressCells = Array.from({ length: 24 }, (_, index) => index);

function prefersReducedMotion() {
  return window.matchMedia(prefersReducedMotionQuery).matches;
}

export function SystemLoader({
  onComplete,
  allowSkip = true,
  timeoutMs = 2500,
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
            wake: 0.14,
            status: 0.08,
            statusHold: 0.01,
            progress: 0.05,
            ready: 0.08,
            exit: 0.25,
          }
        : {
          wake: 0.22,
          status: 0.09,
          statusHold: 0.015,
          progress: 0.06,
          ready: 0.12,
          exit: 0.32,
        };

      gsap.set(statusLines, {
        autoAlpha: 0,
        clipPath: "inset(0% 0% 100% 0%)",
        y: isMobile ? 8 : 14,
      });
      gsap.set(okMarks, { autoAlpha: 0, x: -4 });
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

        introTimeline
          .to(line, {
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: timing.status,
          })
          .to(
            ok,
            {
              autoAlpha: 1,
              x: 0,
              duration: timing.status * 0.5,
            },
            "<+=0.03",
          )
          .to(
            line,
            {
              opacity: index === statusLines.length - 1 ? 1 : 0.44,
              duration: timing.status * 0.5,
            },
            `+=${timing.statusHold}`,
          )
          .to(
            progressFillRef.current,
            {
              scaleX: milestone / 100,
              duration: timing.progress,
              ease: "power2.out",
              onStart: () => setProgress(milestone),
            },
            "<",
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
              <li key={status} className={styles.statusLine} data-desktop-status>
                <span>{status}</span>
                <span className={styles.okMark} data-desktop-ok>
                  OK
                </span>
              </li>
            ))}
          </ul>

          <ul className={styles.mobileStatuses}>
            {mobileStatuses.map((status) => (
              <li key={status} className={styles.statusLine} data-mobile-status>
                <span>{status}</span>
                <span className={styles.okMark} data-mobile-ok>
                  OK
                </span>
              </li>
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
