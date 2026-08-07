"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { skillGroups, type SkillGroup, type SkillProject, type TechnicalSkill } from "@/data/skills";
import { skillsSectionContent } from "@/data/site-content";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const projectLinks: Record<SkillProject, string> = {
  QuackFight: "/projects/quackfight",
  "Rizki Mobil": "/projects/rizki-mobil",
  Squeaky: "/projects/squeaky",
};

const groupTitles: Record<SkillGroup["id"], string> = {
  native: "Native Apple",
  web: "Full-Stack Web",
  delivery: "Engineering & Delivery",
};

const groupShortTitles: Record<SkillGroup["id"], string> = {
  native: "Native",
  web: "Web",
  delivery: "Delivery",
};

const prioritySkillNames: Record<SkillGroup["id"], readonly string[]> = {
  native: ["Core Motion", "GameKit", "App Intents", "SwiftData"],
  web: ["Laravel", "Filament", "MySQL", "AJAX filtering"],
  delivery: ["State-machine architecture", "Technical leadership", "Feature integration", "Production deployment"],
};

function orderedSkills(group: SkillGroup) {
  const priorities = prioritySkillNames[group.id];
  return [...group.skills].sort((a, b) => {
    const aIndex = priorities.indexOf(a.name);
    const bIndex = priorities.indexOf(b.name);
    return (aIndex === -1 ? priorities.length : aIndex) - (bIndex === -1 ? priorities.length : bIndex);
  });
}

export function TechnicalSkillsSystem() {
  const initialGroup = skillGroups[0];
  const [activeGroupId, setActiveGroupId] = useState<SkillGroup["id"]>(initialGroup.id);
  const [activeSkill, setActiveSkill] = useState<TechnicalSkill>(orderedSkills(initialGroup)[0]);
  const [expandedGroups, setExpandedGroups] = useState<Set<SkillGroup["id"]>>(new Set());
  const reducedMotion = usePrefersReducedMotion();

  const activeGroup = skillGroups.find((group) => group.id === activeGroupId) ?? initialGroup;
  const skills = useMemo(() => orderedSkills(activeGroup), [activeGroup]);
  const expanded = expandedGroups.has(activeGroup.id);
  const visibleSkills = expanded ? skills : skills.slice(0, 4);

  function selectGroup(group: SkillGroup) {
    setActiveGroupId(group.id);
    setActiveSkill(orderedSkills(group)[0]);
  }

  function toggleGroup() {
    setExpandedGroups((current) => {
      const next = new Set(current);
      if (next.has(activeGroup.id)) {
        next.delete(activeGroup.id);
      } else {
        next.add(activeGroup.id);
      }
      return next;
    });
  }

  return (
    <section id="skills" className="relative overflow-hidden border-b border-graphite-strong bg-graphite-base py-20 tablet:py-28 desktop:py-32">
      <div aria-hidden="true" className="kwf-grid absolute inset-0 opacity-35" />

      <div className="container-grid relative">
        <header className="grid gap-6 border-b border-graphite-strong pb-9 laptop:grid-cols-[minmax(0,1.25fr)_minmax(280px,.75fr)] laptop:items-end">
          <div>
            <p className="font-mono text-xs uppercase text-signal">{skillsSectionContent.label}</p>
            <h2 className="mt-5 max-w-5xl text-balance font-display text-[clamp(2.75rem,7.5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink-primary tablet:text-[clamp(4rem,6vw,5.6rem)]">
              {skillsSectionContent.title}
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-ink-secondary laptop:justify-self-end">
            {skillsSectionContent.summary}
          </p>
        </header>

        <div className="grid border-b border-graphite-strong laptop:grid-cols-[15rem_minmax(0,1fr)_minmax(320px,.72fr)]">
          <nav aria-label="Skill categories" className="grid grid-cols-3 border-b border-graphite-strong laptop:grid-cols-1 laptop:border-b-0 laptop:border-r">
            {skillGroups.map((group, index) => {
              const active = group.id === activeGroup.id;
              return (
                <button
                  key={group.id}
                  aria-pressed={active}
                  className={cn(
                    "group grid min-h-20 grid-cols-1 content-center gap-2 border-r border-graphite-border px-3 text-left last:border-r-0 laptop:grid-cols-[2rem_1fr] laptop:items-center laptop:gap-3 laptop:border-b laptop:border-r-0 laptop:px-4 laptop:last:border-b-0",
                    active ? "bg-graphite-raised text-ink-primary" : "text-ink-muted hover:text-ink-primary",
                  )}
                  onClick={() => selectGroup(group)}
                  type="button"
                >
                  <span className="font-mono text-[0.68rem] text-signal">0{index + 1}</span>
                  <span className="text-xs font-semibold leading-5 laptop:text-sm">
                    <span className="laptop:hidden">{groupShortTitles[group.id]}</span>
                    <span className="hidden laptop:inline">{groupTitles[group.id]}</span>
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="min-w-0 border-b border-graphite-strong p-5 tablet:p-7 laptop:border-b-0 laptop:border-r">
            <div className="flex items-end justify-between gap-5 border-b border-graphite-strong pb-5">
              <div>
                <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-signal">{groupTitles[activeGroup.id]}</p>
                <p className="mt-2 max-w-xl text-base leading-7 text-ink-secondary">{activeGroup.summary}</p>
              </div>
              <span className="hidden font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-ink-muted tablet:block">Select a capability</span>
            </div>

            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={`${activeGroup.id}-${expanded ? "expanded" : "essential"}`}
                className="grid tablet:grid-cols-2"
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reducedMotion ? 0 : 0.24 }}
              >
                {visibleSkills.map((skill, index) => {
                  const selected = activeSkill.name === skill.name;
                  return (
                    <button
                      key={skill.name}
                      aria-pressed={selected}
                      className={cn(
                        "flex min-h-20 items-center justify-between gap-4 border-b border-graphite-border px-3 py-4 text-left tablet:odd:border-r",
                        selected ? "bg-signal text-graphite-page" : "text-ink-primary hover:bg-graphite-raised hover:text-signal focus-visible:bg-graphite-raised focus-visible:text-signal",
                      )}
                      onClick={() => setActiveSkill(skill)}
                      onFocus={() => setActiveSkill(skill)}
                      onMouseEnter={() => setActiveSkill(skill)}
                      type="button"
                    >
                      <span className="text-sm font-medium tablet:text-base">{skill.name}</span>
                      <span className={selected ? "font-mono text-[0.64rem] text-graphite-page/65" : "font-mono text-[0.64rem] text-ink-muted"}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {skills.length > 4 ? (
              <button
                aria-expanded={expanded}
                className="group mt-5 inline-flex min-h-11 items-center gap-4 text-sm font-semibold text-ink-primary hover:text-signal"
                onClick={toggleGroup}
                type="button"
              >
                {expanded ? "Show essentials" : `View ${skills.length - 4} more`}
                <ArrowRight aria-hidden="true" className={expanded ? "rotate-180 transition-transform" : "transition-transform group-hover:translate-x-1"} size={14} />
              </button>
            ) : null}
          </div>

          <div className="relative min-h-[23rem] overflow-hidden p-6 tablet:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkill.name}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-signal">Applied in</p>
                <h3 className="mt-5 font-display text-3xl font-semibold leading-none tracking-[-0.035em] text-ink-primary tablet:text-4xl">{activeSkill.name}</h3>
                <p className="mt-6 text-base leading-7 text-ink-secondary">{activeSkill.evidence}</p>

                <dl className="mt-8 border-y border-graphite-strong">
                  <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                    <dt className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-ink-muted">Ownership</dt>
                    <dd className="text-sm text-ink-primary">{activeSkill.ownership}</dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {activeSkill.projects.map((project) => (
                    <Link key={project} className="group inline-flex min-h-11 items-center gap-3 border-b border-signal text-sm text-ink-primary hover:text-signal" href={projectLinks[project]}>
                      {project}
                      <ArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" size={14} />
                    </Link>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
