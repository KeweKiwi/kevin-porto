"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { profile } from "@/data/profile";

const capabilities = [
  {
    label: "Native Apple",
    proof: "QuackFight and Squeaky show native interaction, persistence, shortcuts, and Apple-platform product decisions.",
    projects: "QuackFight / Squeaky",
    markers: ["SpriteKit", "GameKit", "Core Motion", "SwiftData", "App Intents"],
  },
  {
    label: "Production Web",
    proof: "Rizki Mobil shows an independently delivered Laravel system for real multi-branch dealership operations.",
    projects: "Rizki Mobil",
    markers: ["Laravel", "Filament", "MySQL", "Deployment", "Maintenance"],
  },
  {
    label: "Delivery Ownership",
    proof: "Kevin has led technical workflow, integrated team features, reviewed code, and delivered a live client platform.",
    projects: "All selected work",
    markers: ["Architecture", "Review", "Integration", "Training", "Handover"],
  },
];

export function CapabilityMatrix() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = capabilities[activeIndex];

  return (
    <section id="signal" className="relative border-b border-graphite-border py-20 tablet:py-28">
      <div className="container-grid grid gap-10 desktop:grid-cols-12">
        <div className="desktop:col-span-5">
          <p className="technical-label mb-5 text-ink-muted">Personal signal</p>
          <h2 className="max-w-3xl text-4xl font-semibold leading-none text-ink-primary tablet:text-6xl">
            Product problems first. Technical systems next.
          </h2>
          <p className="mt-7 max-w-xl text-base leading-[1.55] text-ink-secondary tablet:text-lg">
            {profile.shortName} works best where product ambiguity has to become a working system: a multiplayer game prototype, a live dealership platform, or a native finance workflow that connects data across features.
          </p>

          <div className="mt-10 overflow-hidden rounded-[10px] border border-graphite-strong bg-graphite-base p-5">
            <p className="technical-label mb-5 text-signal">Current signal</p>
            <div className="grid gap-4">
              <InfoRow label="Focus" value="Native Apple projects and production web systems" />
              <InfoRow label="Education" value={profile.education} />
              <InfoRow label="Program" value={profile.academy} />
              <InfoRow label="Principle" value={profile.principle} />
            </div>
          </div>
        </div>

        <div className="desktop:col-span-6 desktop:col-start-7">
          <div className="grid gap-3">
            {capabilities.map((capability, index) => (
              <button
                key={capability.label}
                className="group grid gap-4 rounded-[8px] border border-graphite-border bg-graphite-base p-5 text-left transition hover:border-graphite-strong"
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                type="button"
              >
                <div className="flex items-center justify-between gap-5">
                  <span className="text-2xl font-semibold leading-none text-ink-primary">{capability.label}</span>
                  <span className={activeIndex === index ? "h-px w-16 bg-signal" : "h-px w-8 bg-graphite-strong transition-all group-hover:w-16"} />
                </div>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-muted">
                  {capability.projects}
                </span>
              </button>
            ))}
          </div>

          <motion.div
            key={active.label}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 overflow-hidden rounded-[10px] border border-graphite-strong bg-graphite-page p-6"
            initial={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
          >
            <p className="technical-label mb-4 text-signal">Proof path</p>
            <p className="text-lg leading-[1.5] text-ink-primary">{active.proof}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {active.markers.map((marker) => (
                <span
                  key={marker}
                  className="rounded-[4px] border border-graphite-strong px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-ink-secondary"
                >
                  {marker}
                </span>
              ))}
            </div>
          </motion.div>

          <Link
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink-primary transition hover:text-signal"
            href="#work"
          >
            Trace the project evidence
            <ArrowRight aria-hidden="true" className="transition group-hover:translate-x-1" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-graphite-border pt-4">
      <span className="technical-label text-ink-muted">{label}</span>
      <span className="text-sm leading-6 text-ink-primary">{value}</span>
    </div>
  );
}
