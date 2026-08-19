"use client";

import { useEffect, useRef } from "react";

const primarySkills = [
  "Swift",
  "SwiftUI",
  "GameKit",
  "Core Motion",
  "App Intents",
  "SwiftData",
  "Laravel",
  "Filament",
  "MySQL",
  "GSAP",
] as const;

const deliverySkills = [
  "Native Apple",
  "Multiplayer Engineering",
  "Technical Leadership",
  "Full-Stack Delivery",
  "Client Delivery",
  "Production Deployment",
  "Product Integration",
] as const;

export function SkillSignalMarquee() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    const marqueeRoot = root;

    let isIntersecting = true;

    function syncPlayback() {
      marqueeRoot.dataset.marqueeRunning = String(isIntersecting && !document.hidden);
    }

    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              isIntersecting = entry.isIntersecting;
              syncPlayback();
            },
            { rootMargin: "120px 0px" },
          );

    observer?.observe(marqueeRoot);
    document.addEventListener("visibilitychange", syncPlayback);
    syncPlayback();

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="Technical focus areas"
      className="skill-marquee-shell relative overflow-hidden border-b border-graphite-border bg-graphite-page"
      data-hero-marquee
      data-marquee-running="false"
    >
      <div aria-hidden="true" className="skill-marquee-edge" />
      <MarqueeRow items={primarySkills} />
      <MarqueeRow items={deliverySkills} direction="right" />
    </section>
  );
}

function MarqueeRow({
  direction = "left",
  items,
}: {
  direction?: "left" | "right";
  items: readonly string[];
}) {
  return (
    <div className="skill-marquee-row">
      <div className="skill-marquee-track" data-direction={direction}>
        <SkillGroup items={items} />
        <SkillGroup ariaHidden items={items} />
      </div>
    </div>
  );
}

function SkillGroup({ ariaHidden, items }: { ariaHidden?: boolean; items: readonly string[] }) {
  return (
    <div aria-hidden={ariaHidden} className="skill-marquee-group">
      {items.map((item) => (
        <span key={item} className="skill-marquee-item">
          {item}
        </span>
      ))}
    </div>
  );
}
