"use client";

import Link from "next/link";
import { Activity, ArrowRight, Braces, Cpu, Network, Radio } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import {
  skillGroups,
  type SkillGroup,
  type SkillProject,
  type TechnicalSkill,
} from "@/data/skills";

const projectMeta: Record<SkillProject, { code: string; href: string }> = {
  QuackFight: { code: "QF", href: "/projects/quackfight" },
  "Rizki Mobil": { code: "RM", href: "/projects/rizki-mobil" },
  Squeaky: { code: "SQ", href: "/projects/squeaky" },
};

const groupChrome: Record<
  SkillGroup["id"],
  {
    axis: string;
    label: string;
    protocol: string;
  }
> = {
  native: {
    axis: "IOS",
    label: "native interaction layer",
    protocol: "Motion / Persistence / Multiplayer",
  },
  web: {
    axis: "WEB",
    label: "production delivery layer",
    protocol: "Inventory / Admin / Deployment",
  },
  delivery: {
    axis: "OPS",
    label: "engineering ownership layer",
    protocol: "Review / Integration / Maintenance",
  },
};

export function TechnicalSkillsSystem() {
  const [activeGroupId, setActiveGroupId] = useState<SkillGroup["id"]>(skillGroups[0].id);
  const [activeSkillName, setActiveSkillName] = useState(skillGroups[0].skills[0].name);

  const activeGroup = useMemo(() => {
    return skillGroups.find((group) => group.id === activeGroupId) ?? skillGroups[0];
  }, [activeGroupId]);

  const activeSkill = useMemo<TechnicalSkill>(() => {
    return activeGroup.skills.find((skill) => skill.name === activeSkillName) ?? activeGroup.skills[0];
  }, [activeGroup, activeSkillName]);

  const activeSkillIndex = Math.max(
    0,
    activeGroup.skills.findIndex((skill) => skill.name === activeSkill.name),
  );

  const activeGroupProjects = useMemo(() => {
    return Array.from(new Set(activeGroup.skills.flatMap((skill) => skill.projects)));
  }, [activeGroup]);

  const directOwnershipCount = useMemo(() => {
    return activeGroup.skills.filter((skill) => skill.ownership === "Direct ownership").length;
  }, [activeGroup]);

  function selectGroup(groupId: SkillGroup["id"]) {
    const nextGroup = skillGroups.find((group) => group.id === groupId) ?? skillGroups[0];
    setActiveGroupId(groupId);
    setActiveSkillName(nextGroup.skills[0].name);
  }

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-b border-graphite-border bg-graphite-page py-20 tablet:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 opacity-40 kwf-field-depth" />
      <div aria-hidden="true" className="absolute left-[9%] top-0 hidden h-full w-px bg-graphite-border/70 desktop:block" />
      <div aria-hidden="true" className="absolute right-[12%] top-0 hidden h-full w-px bg-graphite-border/70 desktop:block" />
      <div aria-hidden="true" className="absolute left-0 top-[32%] h-px w-[36%] bg-signal/35" />
      <div aria-hidden="true" className="absolute bottom-[16%] right-0 h-px w-[42%] bg-ink-primary/12" />

      <div className="container-grid relative z-[1]">
        <div className="mb-12 grid gap-6 desktop:grid-cols-12 desktop:items-end">
          <div className="desktop:col-span-7">
            <p className="technical-label mb-5 text-ink-muted">Technical skills</p>
            <h2 className="max-w-4xl text-4xl font-semibold leading-none text-ink-primary tablet:text-6xl desktop:text-6xl wide:text-7xl">
              Project-backed skill signals.
            </h2>
          </div>

          <div className="desktop:col-span-4 desktop:col-start-9">
            <p className="max-w-xl text-base leading-[1.55] text-ink-secondary">
              Each stack item is tied to a project, role, or shipped workflow so the signal stays grounded in work Kevin has handled.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-px border border-graphite-border bg-graphite-border">
              <HeaderMetric label="Groups" value={String(skillGroups.length).padStart(2, "0")} />
              <HeaderMetric
                label="Skills"
                value={String(skillGroups.reduce((total, group) => total + group.skills.length, 0)).padStart(2, "0")}
              />
              <HeaderMetric label="Projects" value="03" />
            </div>
          </div>
        </div>

        <div className="technical-shell relative overflow-hidden border border-graphite-strong bg-graphite-page">
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,rgba(215,247,91,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(243,240,232,0.026)_1px,transparent_1px)] bg-[size:42px_42px]" />
          <div aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-signal/80 to-transparent" />
          <div aria-hidden="true" className="absolute left-0 top-0 h-12 w-12 border-l border-t border-signal/45" />
          <div aria-hidden="true" className="absolute bottom-0 right-0 h-12 w-12 border-b border-r border-ink-primary/45" />

          <div className="relative z-[1] grid gap-px bg-graphite-strong/75 desktop:grid-cols-[280px_minmax(0,1fr)_420px]">
            <aside className="bg-graphite-page/95 p-4 tablet:p-5">
              <div className="mb-5 flex items-center justify-between gap-4 border-b border-graphite-border pb-4">
                <div>
                  <p className="technical-label text-ink-muted">Signal axis</p>
                  <p className="mt-2 font-mono text-sm uppercase tracking-[0.08em] text-ink-primary">
                    {groupChrome[activeGroup.id].axis} / {String(activeSkillIndex + 1).padStart(2, "0")}
                  </p>
                </div>
                <Radio aria-hidden="true" className="text-signal" size={18} strokeWidth={1.6} />
              </div>

              <div className="grid gap-2">
                {skillGroups.map((group, index) => {
                  const isActive = activeGroup.id === group.id;
                  const chrome = groupChrome[group.id];

                  return (
                    <button
                      key={group.id}
                      aria-pressed={isActive}
                      className={cn(
                        "group relative overflow-hidden border p-4 text-left transition",
                        isActive
                          ? "border-signal/65 bg-signal/[0.045] text-ink-primary"
                          : "border-graphite-border bg-graphite-base/72 text-ink-secondary hover:border-graphite-strong hover:bg-graphite-base",
                      )}
                      onClick={() => selectGroup(group.id)}
                      type="button"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute left-0 top-0 h-full w-1 transition",
                          isActive ? "bg-signal" : "bg-graphite-strong group-hover:bg-ink-muted",
                        )}
                      />
                      <span className="mb-4 flex items-center justify-between gap-4 pl-2">
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-muted">
                          {String(index + 1).padStart(2, "0")} / {chrome.axis}
                        </span>
                        <span
                          className={cn(
                            "h-px transition-all",
                            isActive ? "w-12 bg-signal" : "w-6 bg-graphite-strong group-hover:w-10",
                          )}
                        />
                      </span>
                      <span className="block pl-2 text-xl font-semibold leading-none text-ink-primary">
                        {group.title}
                      </span>
                      <span className="mt-3 block pl-2 text-sm leading-6 text-ink-secondary">
                        {group.summary}
                      </span>
                      <span className="mt-5 flex items-center justify-between gap-3 pl-2 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-ink-muted">
                        <span>{group.skills.length} skills</span>
                        <span>{chrome.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="bg-graphite-base p-4 tablet:p-6 desktop:p-7">
              <div className="mb-6 grid gap-5 border-b border-graphite-border pb-6 laptop:grid-cols-[1fr_auto] laptop:items-start">
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="technical-label text-signal">{activeGroup.title}</span>
                    <span className="h-px w-10 bg-graphite-strong" />
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-muted">
                      {groupChrome[activeGroup.id].protocol}
                    </span>
                  </div>
                  <p className="max-w-3xl text-sm leading-6 text-ink-secondary">{activeGroup.proof}</p>
                </div>

                <div className="grid min-w-[220px] grid-cols-3 gap-px border border-graphite-border bg-graphite-border">
                  <SignalMetric icon={<Cpu size={15} />} label="Mapped" value={String(activeGroup.skills.length).padStart(2, "0")} />
                  <SignalMetric icon={<Activity size={15} />} label="Owned" value={String(directOwnershipCount).padStart(2, "0")} />
                  <SignalMetric icon={<Braces size={15} />} label="Refs" value={String(activeGroupProjects.length).padStart(2, "0")} />
                </div>
              </div>

              <div className="grid gap-3 mobile:grid-cols-2 wide:grid-cols-3">
                {activeGroup.skills.map((skill, index) => {
                  const isActive = activeSkill.name === skill.name;

                  return (
                    <button
                      key={skill.name}
                      aria-pressed={isActive}
                      className={cn(
                        "group relative min-h-[118px] overflow-hidden border p-4 text-left transition duration-200",
                        isActive
                          ? "border-signal/70 bg-graphite-page shadow-[0_0_0_1px_rgba(215,247,91,0.08),0_0_28px_rgba(215,247,91,0.055)]"
                          : "border-graphite-border bg-graphite-base/72 hover:border-graphite-strong hover:bg-graphite-page/80",
                      )}
                      onClick={() => setActiveSkillName(skill.name)}
                      onMouseEnter={() => setActiveSkillName(skill.name)}
                      type="button"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute left-0 top-0 h-px transition-all",
                          isActive ? "w-full bg-signal" : "w-10 bg-graphite-strong group-hover:w-20",
                        )}
                      />
                      <span className="flex items-start justify-between gap-3">
                        <span className="font-mono text-[0.58rem] uppercase tracking-[0.08em] text-ink-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "rounded-[3px] border px-2 py-1 font-mono text-[0.52rem] uppercase tracking-[0.08em]",
                            ownershipClassName(skill.ownership),
                          )}
                        >
                          {shortOwnership(skill.ownership)}
                        </span>
                      </span>
                      <span className="mt-5 block text-lg font-semibold leading-tight text-ink-primary">
                        {skill.name}
                      </span>
                      <span className="mt-4 flex flex-wrap gap-1.5">
                        {skill.projects.map((project) => (
                          <span
                            key={project}
                            className={cn(
                              "border px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.08em]",
                              isActive
                                ? "border-signal/55 text-signal"
                                : "border-graphite-strong text-ink-muted",
                            )}
                          >
                            {projectMeta[project].code}
                          </span>
                        ))}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <motion.aside
              key={`${activeGroup.id}-${activeSkill.name}`}
              animate={{ opacity: 1, x: 0 }}
              className="grid min-h-[520px] content-between bg-graphite-page p-5 tablet:p-7"
              initial={{ opacity: 0, x: 18 }}
              transition={{ duration: 0.26, ease: "easeOut" }}
            >
              <div>
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="technical-label text-ink-muted">Evidence trace</p>
                    <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-signal">
                      {groupChrome[activeGroup.id].axis}-{String(activeSkillIndex + 1).padStart(2, "0")} / active
                    </p>
                  </div>
                  <Network aria-hidden="true" className="text-signal" size={22} strokeWidth={1.5} />
                </div>

                <div className="relative border-y border-graphite-border py-7">
                  <span aria-hidden="true" className="absolute left-0 top-0 h-px w-20 bg-signal" />
                  <h3 className="text-4xl font-semibold leading-none text-ink-primary tablet:text-5xl">
                    {activeSkill.name}
                  </h3>
                  <p className="mt-5 text-base leading-[1.6] text-ink-secondary">{activeSkill.evidence}</p>
                </div>

                <div className="mt-6 grid gap-px bg-graphite-border">
                  <TraceRow label="Ownership" value={activeSkill.ownership} />
                  <TraceRow label="Applied in" value={activeSkill.projects.join(" / ")} />
                  <TraceRow label="Signal group" value={activeGroup.title} />
                </div>

                <div className="mt-7">
                  <p className="technical-label mb-4 text-ink-muted">Project route</p>
                  <div className="grid gap-2">
                    {activeSkill.projects.map((project) => (
                      <Link
                        key={project}
                        className="group flex items-center justify-between border border-graphite-strong bg-graphite-base/70 px-4 py-3 text-sm font-medium text-ink-primary transition hover:border-signal hover:text-signal"
                        href={projectMeta[project].href}
                      >
                        <span className="flex items-center gap-3">
                          <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-signal">
                            {projectMeta[project].code}
                          </span>
                          {project}
                        </span>
                        <ArrowRight aria-hidden="true" className="transition group-hover:translate-x-1" size={16} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="technical-label text-signal">Trace intensity</span>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-muted">
                    {String(activeSkill.projects.length).padStart(2, "0")} project ref
                  </span>
                </div>
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({ length: 8 }, (_, index) => (
                    <span
                      key={index}
                      className={cn(
                        "h-2 border border-graphite-strong",
                        index <= activeSkillIndex % 8 ? "bg-signal/80" : "bg-graphite-base",
                      )}
                    />
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeaderMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-graphite-page/80 p-3">
      <p className="font-mono text-[0.55rem] uppercase tracking-[0.08em] text-ink-muted">{label}</p>
      <p className="mt-2 font-mono text-lg font-semibold leading-none text-ink-primary">{value}</p>
    </div>
  );
}

function SignalMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="grid place-items-center bg-graphite-base p-3 text-center">
      <span className="text-signal">{icon}</span>
      <span className="mt-2 font-mono text-[0.52rem] uppercase tracking-[0.08em] text-ink-muted">{label}</span>
      <span className="mt-1 font-mono text-sm font-semibold text-ink-primary">{value}</span>
    </div>
  );
}

function TraceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 bg-graphite-page px-4 py-4 tablet:grid-cols-[112px_1fr] tablet:gap-4">
      <span className="technical-label text-ink-muted">{label}</span>
      <span className="text-sm leading-6 text-ink-primary">{value}</span>
    </div>
  );
}

function shortOwnership(ownership: TechnicalSkill["ownership"]) {
  switch (ownership) {
    case "Direct ownership":
      return "Own";
    case "Team leadership":
      return "Lead";
    case "Production delivery":
      return "Ship";
    case "Project implementation":
      return "Build";
  }
}

function ownershipClassName(ownership: TechnicalSkill["ownership"]) {
  switch (ownership) {
    case "Direct ownership":
      return "border-signal/60 bg-signal/[0.07] text-signal";
    case "Team leadership":
      return "border-ink-primary/30 bg-ink-primary/[0.04] text-ink-primary";
    case "Production delivery":
      return "border-signal/40 bg-signal/[0.045] text-signal";
    case "Project implementation":
      return "border-graphite-strong bg-graphite-base text-ink-muted";
  }
}
