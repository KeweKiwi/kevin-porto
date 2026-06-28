"use client";

import Link from "next/link";
import { ArrowRight, Network } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { skillGroups, type TechnicalSkill } from "@/data/skills";

const projectMeta = {
  QuackFight: { code: "QF", href: "/projects/quackfight" },
  "Rizki Mobil": { code: "RM", href: "/projects/rizki-mobil" },
  Squeaky: { code: "SQ", href: "/projects/squeaky" },
} as const;

export function TechnicalSkillsSystem() {
  const [activeGroupId, setActiveGroupId] = useState(skillGroups[0].id);
  const activeGroup = skillGroups.find((group) => group.id === activeGroupId) ?? skillGroups[0];
  const [activeSkillName, setActiveSkillName] = useState(activeGroup.skills[0].name);

  const activeSkill = useMemo<TechnicalSkill>(() => {
    return activeGroup.skills.find((skill) => skill.name === activeSkillName) ?? activeGroup.skills[0];
  }, [activeGroup, activeSkillName]);

  function selectGroup(groupId: typeof activeGroupId) {
    const nextGroup = skillGroups.find((group) => group.id === groupId) ?? skillGroups[0];
    setActiveGroupId(groupId);
    setActiveSkillName(nextGroup.skills[0].name);
  }

  return (
    <section id="skills" className="relative overflow-hidden border-b border-graphite-border py-20 tablet:py-28">
      <div className="absolute right-[12%] top-0 hidden h-full w-px bg-graphite-border desktop:block" />
      <div className="container-grid">
        <div className="mb-12 grid gap-6 desktop:grid-cols-12 desktop:items-end">
          <div className="desktop:col-span-7">
            <p className="technical-label mb-5 text-ink-muted">Technical skills</p>
            <h2 className="max-w-4xl text-4xl font-semibold leading-none text-ink-primary tablet:text-6xl desktop:text-7xl">
              Skills mapped to evidence, not scores.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-[1.55] text-ink-secondary desktop:col-span-4 desktop:col-start-9">
            Every item in this system points back to a selected project, role, or shipped workflow. No ratings, no inflated technology wall.
          </p>
        </div>

        <div className="grid gap-5 desktop:grid-cols-[320px_1fr]">
          <div className="grid gap-3 desktop:self-start">
            {skillGroups.map((group) => (
              <button
                key={group.id}
                className={cn(
                  "group rounded-[8px] border bg-graphite-base p-5 text-left transition",
                  activeGroup.id === group.id ? "border-signal/55" : "border-graphite-border hover:border-graphite-strong",
                )}
                onClick={() => selectGroup(group.id)}
                type="button"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="text-xl font-semibold leading-none text-ink-primary">{group.title}</span>
                  <span className={cn("h-px transition-all", activeGroup.id === group.id ? "w-12 bg-signal" : "w-7 bg-graphite-strong group-hover:w-12")} />
                </div>
                <p className="text-sm leading-6 text-ink-secondary">{group.summary}</p>
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-[10px] border border-graphite-strong bg-graphite-base">
            <div className="grid gap-px bg-graphite-strong desktop:grid-cols-[1fr_0.92fr]">
              <div className="bg-graphite-base p-5 tablet:p-7">
                <div className="mb-7 flex items-center justify-between gap-5">
                  <div>
                    <p className="technical-label mb-2 text-signal">{activeGroup.title}</p>
                    <p className="max-w-2xl text-sm leading-6 text-ink-secondary">{activeGroup.proof}</p>
                  </div>
                  <Network aria-hidden="true" className="hidden text-signal tablet:block" size={22} strokeWidth={1.5} />
                </div>

                <div className="grid gap-2 mobile:grid-cols-2 wide:grid-cols-3">
                  {activeGroup.skills.map((skill) => (
                    <button
                      key={skill.name}
                      className={cn(
                        "group min-h-[94px] rounded-[6px] border p-4 text-left transition",
                        activeSkill.name === skill.name
                          ? "border-signal/55 bg-graphite-page"
                          : "border-graphite-border hover:border-graphite-strong",
                      )}
                      onClick={() => setActiveSkillName(skill.name)}
                      onMouseEnter={() => setActiveSkillName(skill.name)}
                      type="button"
                    >
                      <span className="block text-base font-semibold leading-tight text-ink-primary">{skill.name}</span>
                      <span className="mt-3 flex flex-wrap gap-1.5">
                        {skill.projects.map((project) => (
                          <span
                            key={project}
                            className="rounded-[4px] border border-graphite-strong px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.08em] text-ink-muted"
                          >
                            {projectMeta[project].code}
                          </span>
                        ))}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <motion.aside
                key={`${activeGroup.id}-${activeSkill.name}`}
                animate={{ opacity: 1, x: 0 }}
                className="grid content-between bg-graphite-page p-5 tablet:p-7"
                initial={{ opacity: 0, x: 18 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div>
                  <p className="technical-label mb-4 text-ink-muted">Evidence trace</p>
                  <h3 className="text-4xl font-semibold leading-none text-ink-primary tablet:text-5xl">
                    {activeSkill.name}
                  </h3>
                  <p className="mt-6 text-base leading-[1.55] text-ink-secondary">{activeSkill.evidence}</p>

                  <div className="mt-8 grid gap-3">
                    <TraceRow label="Ownership" value={activeSkill.ownership} />
                    <TraceRow label="Applied in" value={activeSkill.projects.join(" / ")} />
                  </div>
                </div>

                <div className="mt-10">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-px flex-1 bg-graphite-strong" />
                    <span className="technical-label text-signal">Project links</span>
                  </div>
                  <div className="grid gap-2">
                    {activeSkill.projects.map((project) => (
                      <Link
                        key={project}
                        className="group flex items-center justify-between rounded-[4px] border border-graphite-strong px-4 py-3 text-sm font-medium text-ink-primary transition hover:border-signal hover:text-signal"
                        href={projectMeta[project].href}
                      >
                        {project}
                        <ArrowRight aria-hidden="true" className="transition group-hover:translate-x-1" size={16} />
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TraceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[112px_1fr] gap-4 border-t border-graphite-border pt-4">
      <span className="technical-label text-ink-muted">{label}</span>
      <span className="text-sm leading-6 text-ink-primary">{value}</span>
    </div>
  );
}
