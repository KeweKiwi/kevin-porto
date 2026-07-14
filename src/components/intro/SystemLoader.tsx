"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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
  { command: "INITIALIZING PROFILE", confirmation: "IDENTITY LOCKED" },
  { command: "INDEXING CORE ASSETS", confirmation: "ASSET MAP READY" },
  { command: "COMPILING PROJECT SIGNALS", confirmation: "SIGNAL LOCKED" },
  { command: "OPENING CASEFILE", confirmation: "INTERFACE LIVE" },
];

const mobileStatuses: LoaderStatus[] = [
  { command: "PROFILE INIT", confirmation: "LOCKED" },
  { command: "CORE INDEX", confirmation: "READY" },
  { command: "PROJECT SIGNALS", confirmation: "LOCKED" },
  { command: "OPEN CASEFILE", confirmation: "LIVE" },
];

const progressCells = Array.from({ length: 24 }, (_, index) => index);
const decodeGlyphs = ["0", "1", "/", "\\", "_", "-", "+", ":", "."] as const;

const wireframeRows = [
  [[12, 28], [108, 48], [206, 18], [302, 52], [398, 24], [496, 58], [594, 20], [692, 48], [790, 16], [888, 56], [986, 24], [1084, 52], [1182, 20]],
  [[28, 94], [124, 76], [222, 112], [318, 80], [416, 118], [512, 72], [610, 108], [708, 82], [806, 120], [904, 74], [1002, 110], [1100, 78], [1170, 116]],
  [[8, 166], [102, 142], [200, 182], [298, 138], [396, 176], [494, 148], [592, 186], [690, 136], [788, 180], [886, 146], [984, 188], [1082, 140], [1190, 174]],
  [[30, 236], [128, 214], [226, 254], [324, 206], [422, 250], [520, 218], [618, 258], [716, 210], [814, 248], [912, 220], [1010, 260], [1108, 208], [1172, 246]],
  [[10, 306], [106, 282], [204, 324], [302, 276], [400, 316], [498, 288], [596, 330], [694, 280], [792, 320], [890, 290], [988, 334], [1086, 282], [1188, 318]],
  [[26, 374], [122, 352], [220, 392], [316, 344], [414, 386], [512, 358], [610, 398], [708, 348], [806, 390], [904, 360], [1002, 402], [1100, 350], [1170, 388]],
  [[8, 444], [104, 420], [202, 454], [300, 416], [398, 448], [496, 422], [594, 458], [692, 414], [790, 450], [888, 424], [986, 456], [1084, 418], [1190, 446]],
] as const;

const wireframeRowPath = wireframeRows
  .map((row) =>
    row
      .map((point, pointIndex) => `${pointIndex === 0 ? "M" : "L"} ${point[0]} ${point[1]}`)
      .join(" "),
  )
  .join(" ");

const wireframeDirectPath = wireframeRows
  .slice(0, -1)
  .flatMap((row, rowIndex) =>
    row.map((point, pointIndex) => {
      const nextPoint = wireframeRows[rowIndex + 1][pointIndex];
      return `M ${point[0]} ${point[1]} L ${nextPoint[0]} ${nextPoint[1]}`;
    }),
  )
  .join(" ");

const wireframeDiagonalPath = wireframeRows
  .slice(0, -1)
  .flatMap((row, rowIndex) =>
    row.slice(0, -1).map((point, pointIndex) => {
      const nextPoint = wireframeRows[rowIndex + 1][pointIndex + 1];
      return `M ${point[0]} ${point[1]} L ${nextPoint[0]} ${nextPoint[1]}`;
    }),
  )
  .join(" ");

const wireframeReversePath = wireframeRows
  .slice(0, -1)
  .flatMap((row, rowIndex) =>
    row.slice(0, -1).map((point, pointIndex) => {
      const upperPoint = row[pointIndex + 1];
      const lowerPoint = wireframeRows[rowIndex + 1][pointIndex];
      return `M ${upperPoint[0]} ${upperPoint[1]} L ${lowerPoint[0]} ${lowerPoint[1]}`;
    }),
  )
  .join(" ");

const wireframeGlyphs = [
  {
    id: "k",
    path: "M80 50H150V248L340 50H432L214 276L444 550H350L150 316V550H80Z",
  },
  {
    id: "w",
    path: "M430 50H506L558 410L596 250H664L702 410L754 50H830L750 550H678L630 354L582 550H510Z",
  },
  {
    id: "f",
    path: "M840 50H1130V122H920V252H1086V324H920V550H840Z",
  },
] as const;

type StatusMode = "desktop" | "mobile";

function prefersReducedMotion() {
  return window.matchMedia(prefersReducedMotionQuery).matches;
}

function TerminalStatusLine({
  index,
  mode,
  status,
  total,
}: {
  index: number;
  mode: StatusMode;
  status: LoaderStatus;
  total: number;
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
      <span className={styles.statusGate} aria-hidden="true">
        <span
          className={`${styles.statusGateEdge} ${styles.statusGateLeft}`}
          data-status-gate-left
        />
        <span
          className={`${styles.statusGateEdge} ${styles.statusGateRight}`}
          data-status-gate-right
        />
      </span>
      <span className={styles.statusPhase} data-status-phase>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className={styles.statusPhaseRail} />
        <span>{String(total).padStart(2, "0")}</span>
      </span>
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

function WireframeMonogram({ idSuffix }: { idSuffix: string }) {
  const clipId = `kwf-wireframe-${idSuffix}`;
  const sweepId = `kwf-wireframe-sweep-${idSuffix}`;

  return (
    <svg
      aria-hidden="true"
      className={styles.wireframeSvg}
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 1200 600"
    >
      <defs>
        <clipPath id={`${clipId}-all`}>
          {wireframeGlyphs.map((glyph) => (
            <path key={`all-${glyph.id}`} d={glyph.path} />
          ))}
        </clipPath>
        {wireframeGlyphs.map((glyph) => (
          <clipPath id={`${clipId}-${glyph.id}`} key={`clip-${glyph.id}`}>
            <path d={glyph.path} />
          </clipPath>
        ))}
        <linearGradient id={sweepId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#D7F75B" stopOpacity="0" />
          <stop offset="0.5" stopColor="#D7F75B" stopOpacity="0.7" />
          <stop offset="1" stopColor="#F3F0E8" stopOpacity="0" />
        </linearGradient>
      </defs>

      {wireframeGlyphs.map((glyph) => (
        <g className={styles.wireframeLetter} data-loader-wire-letter key={glyph.id}>
          <path
            className={styles.wireframeOutline}
            d={glyph.path}
            data-loader-wire-outline
            vectorEffect="non-scaling-stroke"
          />

          <g
            className={styles.wireframeMesh}
            clipPath={`url(#${clipId}-${glyph.id})`}
            data-loader-wire-mesh
            transform="translate(0 20) scale(1 1.18)"
          >
            <path className={styles.wireframeRowPath} d={wireframeRowPath} vectorEffect="non-scaling-stroke" />
            <path className={styles.wireframeDirectPath} d={wireframeDirectPath} vectorEffect="non-scaling-stroke" />
            <path className={styles.wireframeDiagonalPath} d={wireframeDiagonalPath} vectorEffect="non-scaling-stroke" />
            <path className={styles.wireframeReversePath} d={wireframeReversePath} vectorEffect="non-scaling-stroke" />

            {wireframeRows.flatMap((row, rowIndex) =>
              row.map((point, pointIndex) =>
                (rowIndex + pointIndex) % 4 === 0 ? (
                  <circle
                    key={`${glyph.id}-node-${rowIndex}-${pointIndex}`}
                    className={styles.wireframeNode}
                    cx={point[0]}
                    cy={point[1]}
                    r="2.1"
                  />
                ) : null,
              ),
            )}
          </g>
        </g>
      ))}

      <rect
        className={styles.wireframeSweep}
        clipPath={`url(#${clipId}-all)`}
        data-loader-wire-sweep
        fill={`url(#${sweepId})`}
        height="560"
        width="180"
        x="-190"
        y="20"
      />
    </svg>
  );
}

export function SystemLoader({
  onComplete,
  allowSkip = true,
  timeoutMs = 6900,
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
    let lastVisibleProgress = -1;

    function setProgress(value: number) {
      const clampedValue = Math.max(0, Math.min(100, value));
      const visibleValue = clampedValue >= 99.95 ? 100 : Math.floor(clampedValue);

      loaderRoot.style.setProperty(
        "--loader-progress",
        (clampedValue / 100).toFixed(4),
      );
      loaderRoot.style.setProperty(
        "--loader-progress-x",
        `${clampedValue.toFixed(3)}%`,
      );

      if (progressValueRef.current && visibleValue !== lastVisibleProgress) {
        progressValueRef.current.textContent = `${visibleValue}%`;
        lastVisibleProgress = visibleValue;
      }
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
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
        fallbackTimer = undefined;
      }
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

      const frame = loaderRoot.querySelector<HTMLElement>("[data-loader-frame]");
      const exitLine = loaderRoot.querySelector<HTMLElement>("[data-loader-exit-line]");
      const panelTop = loaderRoot.querySelector<HTMLElement>("[data-loader-panel='top']");
      const panelBottom = loaderRoot.querySelector<HTMLElement>("[data-loader-panel='bottom']");

      gsap
        .timeline({ onComplete: completeIntro })
        .to(
          frame,
          {
            clipPath: "inset(49.5% 0% 49.5% 0%)",
            opacity: 0,
            duration: 0.12,
            ease: "power2.in",
          },
          0,
        )
        .to(
          exitLine,
          {
            scaleX: 1,
            duration: 0.12,
            ease: "power2.out",
          },
          0,
        )
        .to(
          root,
          {
            "--loader-grid-opacity": 0,
            "--loader-scan-opacity": 0,
            duration: 0.14,
          },
          0,
        )
        .to(
          panelTop,
          {
            yPercent: -101,
            duration: 0.3,
            ease: "power4.inOut",
          },
          0.08,
        )
        .to(
          panelBottom,
          {
            yPercent: 101,
            duration: 0.3,
            ease: "power4.inOut",
          },
          0.08,
        )
        .to(
          exitLine,
          {
            autoAlpha: 0,
            duration: 0.12,
            ease: "power2.in",
          },
          0.2,
        )
        .set(root, { autoAlpha: 0 });
    }

    function handleSkip(event: KeyboardEvent) {
      if (allowSkip && event.key === "Escape") {
        finishQuickly();
      }
    }

    window.addEventListener("keydown", handleSkip);

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
      const wireLetters = gsap.utils.toArray<SVGElement>(
        "[data-loader-wire-letter]",
        root,
      );
      const wireOutlines = gsap.utils.toArray<SVGPathElement>(
        "[data-loader-wire-outline]",
        root,
      );
      const wireSweeps = gsap.utils.toArray<SVGRectElement>(
        "[data-loader-wire-sweep]",
        root,
      );
      const wireLetterOffsets = isMobile ? [-1.8, 0, 1.8] : [-2.4, 0, 2.4];
      const wireLetterRotations = isMobile
        ? [-0.24, 0.16, -0.18]
        : [-0.4, 0.25, -0.3];

      setProgress(0);
      setSystemStatus("SYSTEM STATUS");

      if (shouldReduceMotion) {
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
          status: 0.1,
          statusHold: 0.13,
          statusOut: 0.16,
          char: 0.034,
          charStagger: 0.01,
          decodeFlicker: 0.034,
          progressDuration: 4.12,
          finish: 0.2,
          ready: 0.2,
          exit: 0.48,
          handoff: 0.06,
        }
        : {
          wake: 0.24,
          status: 0.11,
          statusHold: 0.18,
          statusOut: 0.18,
          char: 0.036,
          charStagger: 0.011,
          decodeFlicker: 0.036,
          progressDuration: 4.42,
          finish: 0.26,
          ready: 0.22,
          exit: 0.58,
          handoff: 0.08,
        };

      root.querySelectorAll<HTMLElement>("[data-status-char]").forEach((char) => {
        char.textContent = char.dataset.statusValue ?? char.textContent;
      });

      gsap.set(root, {
        "--loader-grid-opacity": 0.56,
        "--loader-scan-opacity": 0.08,
        autoAlpha: 1,
      });
      gsap.set(statusLines, {
        autoAlpha: 0,
        clipPath: "inset(0% 44% 0% 44%)",
        scale: 0.985,
        y: isMobile ? 10 : 16,
      });
      gsap.set("[data-status-char]", {
        autoAlpha: 0,
        color: "rgba(215, 247, 91, 0.68)",
        yPercent: 38,
      });
      gsap.set("[data-status-prompt], [data-status-cursor]", { autoAlpha: 0 });
      gsap.set("[data-status-phase]", { autoAlpha: 0, y: 5 });
      gsap.set("[data-status-gate-left]", { autoAlpha: 0, xPercent: -34 });
      gsap.set("[data-status-gate-right]", { autoAlpha: 0, xPercent: 34 });
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
      gsap.set("[data-loader-sequence]", { autoAlpha: 0, y: 8 });
      gsap.set("[data-loader-cinema-frame]", {
        autoAlpha: 0,
        scale: 0.986,
        transformOrigin: "center center",
      });
      gsap.set("[data-loader-frame]", {
        clipPath: "inset(0% 0% 0% 0%)",
      });
      gsap.set("[data-loader-aperture-line]", {
        scaleX: 0,
        transformOrigin: "center center",
      });
      gsap.set("[data-loader-axis]", {
        autoAlpha: 0,
        scaleY: 0.18,
        transformOrigin: "center center",
      });
      gsap.set("[data-loader-horizon]", {
        autoAlpha: 0,
        scaleX: 0,
        transformOrigin: "center center",
      });
      gsap.set("[data-loader-horizon-node]", {
        autoAlpha: 0,
        scale: 0,
        transformOrigin: "center center",
      });
      gsap.set("[data-loader-monogram]", {
        autoAlpha: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 0.97,
        transformOrigin: "center center",
      });
      gsap.set(wireLetters, {
        autoAlpha: 0.08,
        rotation: (letterIndex) =>
          (wireLetterRotations[letterIndex] ?? 0) * 1.5,
        scale: 0.96,
        transformOrigin: "50% 50%",
        xPercent: (letterIndex) =>
          (wireLetterOffsets[letterIndex] ?? 0) * 1.55,
        yPercent: (letterIndex) =>
          (letterIndex === 1 ? -1 : 1) * (isMobile ? 1.4 : 1.8),
      });
      gsap.set(wireOutlines, {
        strokeDasharray: 1600,
        strokeDashoffset: 1600,
      });
      gsap.set("[data-loader-wire-mesh]", { autoAlpha: 0.08 });
      gsap.set(wireSweeps, { autoAlpha: 0, x: -190 });
      gsap.set("[data-loader-scan]", { scaleX: 0, transformOrigin: "left center" });
      gsap.set("[data-loader-exit-line]", { scaleX: 0, transformOrigin: "center center" });
      gsap.set("[data-loader-ready]", {
        autoAlpha: 0,
        scaleX: 0,
        transformOrigin: "right center",
      });
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
        )
        .to(
          "[data-loader-sequence]",
          {
            autoAlpha: 1,
            y: 0,
            duration: timing.wake * 1.35,
            ease: "power2.out",
          },
          "<+=0.06",
        )
        .to(
          "[data-loader-cinema-frame]",
          {
            autoAlpha: 1,
            scale: 1,
            duration: timing.wake * 1.7,
            ease: "power2.out",
          },
          "<",
        )
        .to(
          "[data-loader-aperture-line]",
          {
            scaleX: 1,
            duration: timing.wake * 1.6,
            stagger: 0.06,
            ease: "power3.inOut",
          },
          "<",
        )
        .to(
          "[data-loader-axis]",
          {
            autoAlpha: isMobile ? 0.2 : 0.3,
            scaleY: 1,
            duration: timing.wake * 1.8,
            ease: "power3.inOut",
          },
          "<",
        )
        .to(
          "[data-loader-horizon]",
          {
            autoAlpha: isMobile ? 0.34 : 0.58,
            scaleX: 1,
            duration: timing.wake * 1.9,
            ease: "power3.inOut",
          },
          "<",
        )
        .to(
          "[data-loader-horizon-node]",
          {
            autoAlpha: isMobile ? 0.44 : 0.8,
            scale: 1,
            duration: timing.wake,
            stagger: 0.05,
            ease: "back.out(2)",
          },
          "<+=0.08",
        )
        .to(
          "[data-loader-monogram]",
          {
            autoAlpha: isMobile ? 0.52 : 0.78,
            scale: 1,
            duration: timing.wake * 2.1,
            ease: "power3.out",
          },
          "<",
        )
        .to(
          wireLetters,
          {
            autoAlpha: 1,
            rotation: (letterIndex) =>
              wireLetterRotations[letterIndex] ?? 0,
            scale: 1,
            stagger: 0.055,
            duration: timing.wake * 2.15,
            xPercent: (letterIndex) =>
              wireLetterOffsets[letterIndex] ?? 0,
            yPercent: 0,
            ease: "power3.out",
          },
          "<",
        )
        .to(
          wireOutlines,
          {
            strokeDashoffset: 0,
            duration: timing.wake * 3.1,
            stagger: 0.06,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          "[data-loader-wire-mesh]",
          {
            autoAlpha: isMobile ? 0.56 : 0.92,
            duration: timing.wake * 2.2,
            stagger: 0.04,
            ease: "power2.out",
          },
          "<",
        )
        .to(
          wireSweeps,
          {
            autoAlpha: isMobile ? 0.32 : 0.56,
            duration: timing.wake * 2.4,
            x: 1210,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          wireSweeps,
          {
            autoAlpha: 0,
            duration: timing.wake * 0.35,
            ease: "power2.out",
          },
          ">-=0.06",
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
        const phase = line.querySelector<HTMLElement>("[data-status-phase]");
        const gateLeft = line.querySelector<HTMLElement>("[data-status-gate-left]");
        const gateRight = line.querySelector<HTMLElement>("[data-status-gate-right]");
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
            scale: 1,
            y: 0,
            duration: timing.status,
          })
          .to(
            "[data-loader-horizon]",
            {
              autoAlpha: isMobile ? 0.48 : 0.82,
              duration: 0.12,
              ease: "power2.out",
            },
            "<",
          )
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
            phase,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.12,
              ease: "power2.out",
            },
            "<",
          )
          .to(
            [gateLeft, gateRight],
            {
              autoAlpha: isMobile ? 0.46 : 0.66,
              xPercent: 0,
              duration: isMobile ? 0.2 : 0.26,
              ease: "power3.out",
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
            [phase, gateLeft, gateRight],
            {
              autoAlpha: 0,
              duration: timing.statusOut * 0.7,
              ease: "power2.in",
            },
            `+=${timing.statusHold}`,
          )
          .to(
            "[data-loader-horizon]",
            {
              autoAlpha: isMobile ? 0.3 : 0.52,
              duration: timing.statusOut,
              ease: "power2.in",
            },
            "<",
          )
          .to(
            line,
            {
              autoAlpha: 0,
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1.01,
              y: isMobile ? -8 : -14,
              duration: timing.statusOut,
              ease: "power2.in",
            },
            "<",
          );

        introTimeline.add(lineTimeline);
      });

      introTimeline
        .to(
          progressState,
          {
            value: 94,
            duration: timing.progressDuration,
            ease: "none",
            onUpdate: () => setProgress(progressState.value),
            onComplete: () => setProgress(94),
          },
          0.08,
        )
        .to(progressState, {
          value: 100,
          duration: timing.finish,
          ease: "power2.out",
          onUpdate: () => setProgress(progressState.value),
          onComplete: () => setProgress(100),
        })
        .call(() => {
          setSystemStatus("SYSTEM READY");
        })
        .to("[data-loader-ready]", {
          autoAlpha: 1,
          scaleX: 1,
          duration: timing.ready,
          ease: "power2.out",
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
          "[data-loader-sequence]",
          {
            opacity: 0.5,
            duration: timing.ready,
          },
          "<",
        )
        .to(
          "[data-loader-cinema-frame]",
          {
            opacity: 0.58,
            duration: timing.ready,
          },
          "<",
        )
        .to(
          "[data-loader-axis]",
          {
            autoAlpha: 0.46,
            scaleY: 0.34,
            duration: timing.ready,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          "[data-loader-horizon]",
          {
            autoAlpha: isMobile ? 0.56 : 0.92,
            duration: timing.ready,
            ease: "power2.out",
          },
          "<",
        )
        .to(
          "[data-loader-monogram]",
          {
            autoAlpha: isMobile ? 0.78 : 0.94,
            scale: 1.012,
            duration: timing.ready,
            ease: "power2.out",
          },
          "<",
        )
        .to(
          wireLetters,
          {
            rotation: 0,
            scale: 1,
            xPercent: 0,
            yPercent: 0,
            duration: timing.ready,
            ease: "power2.out",
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
        }, "+=0.02")
        .to(
          "[data-loader-exit-line]",
          {
            scaleX: 1,
            duration: timing.exit * 0.3,
            ease: "power3.inOut",
          },
          `+=${timing.handoff}`,
        )
        .to(
          "[data-loader-frame]",
          {
            clipPath: "inset(49.5% 0% 49.5% 0%)",
            opacity: 0.08,
            duration: timing.exit * 0.44,
            ease: "power3.in",
          },
          "<",
        )
        .to(
          "[data-loader-monogram]",
          {
            clipPath: "inset(49% 0% 49% 0%)",
            scale: 1.018,
            duration: timing.exit * 0.44,
            ease: "power3.in",
          },
          "<",
        )
        .to(
          "[data-loader-panel='top']",
          {
            yPercent: -101,
            duration: timing.exit,
            ease: "power4.inOut",
          },
          ">-=0.02",
        )
        .to(
          "[data-loader-panel='bottom']",
          {
            yPercent: 101,
            duration: timing.exit,
            ease: "power4.inOut",
          },
          "<",
        )
        .to(
          root,
          {
            "--loader-grid-opacity": 0,
            "--loader-scan-opacity": 0,
            duration: timing.exit * 0.5,
            ease: "power2.out",
          },
          "<",
        )
        .to(
          "[data-loader-exit-line]",
          {
            autoAlpha: 0,
            duration: timing.exit * 0.38,
            ease: "power2.in",
          },
          "<+=0.14",
        )
        .set(root, { autoAlpha: 0 });

      const runtimeBudgetMs = Math.max(1000, timeoutMs - 420);
      const timelineDurationMs = introTimeline.duration() * 1000;

      if (timelineDurationMs > runtimeBudgetMs) {
        introTimeline.timeScale(timelineDurationMs / runtimeBudgetMs);
      }

      fallbackTimer = window.setTimeout(() => {
        finishQuickly();
      }, timeoutMs);
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

        <div className={styles.sequencePlate} data-loader-sequence>
          <span>CASEFILE SEQUENCE</span>
          <span>KWF-07 / PROFILE INTERFACE</span>
        </div>

        <div className={styles.cinemaFrame} aria-hidden="true" data-loader-cinema-frame>
          <span className={`${styles.frameCorner} ${styles.frameCornerTopLeft}`} />
          <span className={`${styles.frameCorner} ${styles.frameCornerTopRight}`} />
          <span className={`${styles.frameCorner} ${styles.frameCornerBottomLeft}`} />
          <span className={`${styles.frameCorner} ${styles.frameCornerBottomRight}`} />
        </div>

        <div className={styles.aperture} aria-hidden="true">
          <span className={styles.apertureLine} data-loader-aperture-line />
          <span className={styles.apertureLine} data-loader-aperture-line />
        </div>

        <span className={styles.signalAxis} aria-hidden="true" data-loader-axis>
          <span className={styles.signalAxisCore} />
        </span>

        <span className={styles.signalHorizon} aria-hidden="true" data-loader-horizon>
          <span
            className={`${styles.signalHorizonNode} ${styles.signalHorizonNodeLeft}`}
            data-loader-horizon-node
          />
          <span
            className={`${styles.signalHorizonNode} ${styles.signalHorizonNodeCenter}`}
            data-loader-horizon-node
          />
          <span
            className={`${styles.signalHorizonNode} ${styles.signalHorizonNodeRight}`}
            data-loader-horizon-node
          />
        </span>

        <div
          className={styles.signalMonogram}
          aria-hidden="true"
          data-loader-monogram
        >
          <span className={styles.signalMonogramSlice}>
            <WireframeMonogram idSuffix="full" />
          </span>
        </div>

        <div className={styles.statusGrid}>
          <ul className={styles.desktopStatuses}>
            {desktopStatuses.map((status, index) => (
              <TerminalStatusLine
                key={status.command}
                index={index}
                mode="desktop"
                status={status}
                total={desktopStatuses.length}
              />
            ))}
          </ul>

          <ul className={styles.mobileStatuses}>
            {mobileStatuses.map((status, index) => (
              <TerminalStatusLine
                key={status.command}
                index={index}
                mode="mobile"
                status={status}
                total={mobileStatuses.length}
              />
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
                <span
                  key={cell}
                  className={styles.progressCell}
                  style={{ "--cell-index": cell } as CSSProperties}
                />
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
            <span className={styles.progressHead} />
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
