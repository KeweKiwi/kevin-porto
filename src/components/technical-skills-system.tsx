"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { skillGroups, type SkillGroup, type SkillProject, type TechnicalSkill } from "@/data/skills";
import { skillsSectionContent } from "@/data/site-content";
import { cn } from "@/lib/cn";

const projectMeta: Record<SkillProject, { code: string; href: string }> = {
  QuackFight: { code: "QF", href: "/projects/quackfight" },
  "Rizki Mobil": { code: "RM", href: "/projects/rizki-mobil" },
  Squeaky: { code: "SQ", href: "/projects/squeaky" },
};

const groupTitles: Record<SkillGroup["id"], string> = {
  native: "Native Apple",
  web: "Full-Stack Web",
  delivery: "Engineering & Delivery",
};

export function TechnicalSkillsSystem() {
  const [activeSkill, setActiveSkill] = useState<TechnicalSkill>(skillGroups[0].skills[0]);
  const [expandedGroups, setExpandedGroups] = useState<Set<SkillGroup["id"]>>(new Set());

  const activeProjects = useMemo(() => activeSkill.projects.map((project) => ({ project, ...projectMeta[project] })), [activeSkill]);

  function toggleGroup(groupId: SkillGroup["id"]) {
    setExpandedGroups((current) => {
      const next = new Set(current);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  }

  return (
    <section id="skills" className="relative border-b border-graphite-strong bg-graphite-page py-20 tablet:py-28 desktop:py-32">
      <div className="container-grid">
        <header className="grid gap-6 border-b border-graphite-strong pb-9 laptop:grid-cols-[minmax(0,1.25fr)_minmax(280px,.75fr)] laptop:items-end">
          <div>
            <p className="font-mono text-xs uppercase text-signal">{skillsSectionContent.label}</p>
            <h2 className="mt-5 max-w-5xl text-5xl font-semibold uppercase leading-[0.95] text-ink-primary tablet:text-6xl desktop:text-7xl">
              {skillsSectionContent.title}
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-ink-secondary laptop:justify-self-end">
            {skillsSectionContent.summary}
          </p>
        </header>

        <div className="grid tablet:grid-cols-3">
          {skillGroups.map((group, groupIndex) => {
            const expanded = expandedGroups.has(group.id);
            const visibleSkills = expanded ? group.skills : group.skills.slice(0, 4);

            return (
              <article
                key={group.id}
                className={cn(
                  "border-b border-graphite-strong py-8 tablet:px-6 tablet:py-10",
                  groupIndex < skillGroups.length - 1 && "tablet:border-r",
                )}
              >
                <div className="flex items-center gap-3 text-signal">
                  <span className="font-mono text-xs">{String(groupIndex + 1).padStart(2, "0")}</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-graphite-strong" />
                </div>
                <h3 className="mt-5 text-xl font-semibold uppercase text-ink-primary desktop:text-2xl">
                  {groupTitles[group.id]}
                </h3>

                <div className="mt-7 border-t border-graphite-border">
                  <AnimatePresence initial={false}>
                    {visibleSkills.map((skill) => {
                      const selected = activeSkill.name === skill.name;
                      return (
                        <motion.button
                          key={skill.name}
                          animate={{ opacity: 1, y: 0 }}
                          aria-pressed={selected}
                          className={cn(
                            "flex min-h-12 w-full items-center justify-between gap-4 border-b border-graphite-border py-3 text-left text-sm transition-colors tablet:text-base",
                            selected ? "text-signal" : "text-ink-primary hover:text-signal",
                          )}
                          exit={{ opacity: 0, y: -5 }}
                          initial={{ opacity: 0, y: 6 }}
                          onClick={() => setActiveSkill(skill)}
                          transition={{ duration: 0.2 }}
                          type="button"
                        >
                          <span>{skill.name}</span>
                          <span className="font-mono text-[0.52rem] uppercase text-ink-muted">
                            {skill.projects.map((project) => projectMeta[project].code).join(" / ")}
                          </span>
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                </div>

                <button
                  aria-expanded={expanded}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 font-mono text-[0.6rem] uppercase text-ink-muted transition-colors hover:text-signal"
                  onClick={() => toggleGroup(group.id)}
                  type="button"
                >
                  {expanded ? <Minus aria-hidden="true" size={14} /> : <Plus aria-hidden="true" size={14} />}
                  {expanded ? "Show essentials" : `${group.skills.length - 4} more tools`}
                </button>
              </article>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSkill.name}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-8 border-b border-graphite-strong py-8 tablet:grid-cols-[minmax(0,1.25fr)_minmax(260px,.75fr)] tablet:items-end"
            exit={{ opacity: 0, y: -10 }}
            initial={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <p className="font-mono text-[0.62rem] uppercase text-signal">How I use {activeSkill.name}</p>
              <p className="mt-3 max-w-3xl text-base leading-7 text-ink-secondary tablet:text-lg">
                {activeSkill.evidence}
              </p>
              <p className="mt-3 font-mono text-[0.58rem] uppercase text-ink-muted">{activeSkill.ownership}</p>
            </div>
            <div className="flex flex-wrap gap-3 tablet:justify-end">
              {activeProjects.map(({ code, href, project }) => (
                <Link key={project} className="group inline-flex min-h-11 items-center gap-4 border-b border-signal px-1 text-sm text-ink-primary hover:text-signal" href={href}>
                  <span className="font-mono text-[0.58rem] text-signal">{code}</span>
                  {project}
                  <ArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" size={14} />
                </Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
