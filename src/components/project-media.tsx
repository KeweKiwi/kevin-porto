import { cn } from "@/lib/cn";
import type { Project } from "@/data/projects";

type ProjectMediaProps = {
  project: Project;
  variant?: "hero" | "compact" | "case";
  className?: string;
};

export function ProjectMedia({ project, variant = "hero", className }: ProjectMediaProps) {
  const label = `${project.name} visual system`;

  return (
    <div
      aria-label={label}
      className={cn(
        "relative overflow-hidden rounded-[10px] border border-graphite-strong bg-graphite-base shadow-signal-sm",
        variant === "compact" ? "aspect-[4/3]" : "aspect-[16/10]",
        variant === "case" && "min-h-[360px]",
        className,
      )}
      role="img"
    >
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,rgba(243,240,232,.26)_1px,transparent_1px),linear-gradient(to_bottom,rgba(243,240,232,.18)_1px,transparent_1px)] [background-size:48px_48px]" />
      {project.slug === "quackfight" ? <QuackFightVisual /> : null}
      {project.slug === "rizki-mobil" ? <RizkiMobilVisual /> : null}
      {project.slug === "squeaky" ? <SqueakyVisual /> : null}
      <div className="absolute left-4 top-4 rounded-[4px] border border-graphite-strong bg-graphite-page/85 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-secondary">
        {project.platform} / {project.role}
      </div>
    </div>
  );
}

function QuackFightVisual() {
  return (
    <>
      <div className="absolute left-[10%] top-[14%] h-[70%] w-[42%] rounded-[28px] border border-graphite-strong bg-graphite-raised p-4">
        <div className="relative h-full overflow-hidden rounded-[18px] border border-graphite-border bg-graphite-page">
          <div className="absolute inset-x-8 top-1/2 h-px bg-signal/55" />
          <div className="absolute left-1/2 top-8 h-[calc(100%-4rem)] w-px bg-signal/30" />
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/45" />
          <div className="absolute left-[24%] top-[58%] h-9 w-14 rounded-full border border-ink-secondary/40" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end gap-1">
            {[20, 36, 54, 40, 70, 48, 62, 30, 44, 22].map((height, index) => (
              <span key={index} className="w-full rounded-full bg-signal/55" style={{ height }} />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute right-[11%] top-[22%] h-[56%] w-[32%] rounded-[22px] border border-graphite-strong bg-graphite-inset p-3">
        <div className="h-full rounded-[14px] border border-graphite-border bg-graphite-page p-4">
          <div className="mb-5 flex items-center justify-between">
        <span className="h-2 w-2 rounded-full bg-signal/80" />
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.08em] text-ink-muted">GK Match</span>
          </div>
          <div className="space-y-3">
            {["AimState", "PowerState", "ThrowResolve", "TurnHandoff"].map((state, index) => (
              <div key={state} className="flex items-center gap-3">
                <span className={cn("h-2 w-2 rounded-full", index < 2 ? "bg-signal/75" : "bg-graphite-strong")} />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-secondary">{state}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 right-5 flex gap-2 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-ink-muted">
        <span>Core Motion</span>
        <span>/</span>
        <span>AVFoundation</span>
      </div>
    </>
  );
}

function RizkiMobilVisual() {
  return (
    <>
      <div className="absolute left-[8%] top-[14%] h-[62%] w-[58%] rounded-[10px] border border-graphite-strong bg-graphite-raised">
        <div className="flex h-8 items-center gap-2 border-b border-graphite-border px-4">
          <span className="h-2 w-2 rounded-full bg-ink-muted" />
          <span className="h-2 w-2 rounded-full bg-ink-muted/60" />
          <span className="h-2 w-2 rounded-full bg-signal/80" />
          <span className="ml-auto font-mono text-[0.58rem] uppercase tracking-[0.08em] text-ink-muted">Inventory</span>
        </div>
        <div className="grid h-[calc(100%-2rem)] grid-cols-[.8fr_1.2fr] gap-4 p-4">
          <div className="space-y-2">
            {["Branch", "Brand", "Price", "Mileage", "Sort"].map((item) => (
              <div key={item} className="rounded-[4px] border border-graphite-border px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-ink-muted">
                {item}
              </div>
            ))}
          </div>
          <div className="grid gap-2">
            {[0, 1, 2].map((item) => (
              <div key={item} className="grid grid-cols-[72px_1fr] gap-3 rounded-[6px] border border-graphite-border p-2">
                <div className="rounded-[4px] bg-graphite-inset" />
                <div className="space-y-2 py-1">
                  <div className="h-2 w-3/4 bg-ink-secondary/45" />
                  <div className="h-2 w-1/2 bg-ink-muted/35" />
                  <div className="h-2 w-2/3 bg-signal/55" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-[10%] right-[8%] h-[48%] w-[34%] rounded-[10px] border border-graphite-strong bg-graphite-page p-4 shadow-signal">
        <div className="mb-5 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-signal">Admin ops</div>
        <div className="grid grid-cols-2 gap-3">
          {["CRUD", "Images", "Branches", "Inquiries"].map((item) => (
            <div key={item} className="rounded-[5px] border border-graphite-border p-3">
              <div className="mb-3 h-8 rounded-[3px] bg-graphite-inset" />
              <div className="font-mono text-[0.56rem] uppercase tracking-[0.08em] text-ink-secondary">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function SqueakyVisual() {
  return (
    <>
      <div className="absolute left-[12%] top-[10%] h-[78%] w-[34%] rounded-[30px] border border-graphite-strong bg-graphite-raised p-3">
        <div className="h-full rounded-[22px] border border-graphite-border bg-graphite-page p-4">
          <div className="mb-5 flex items-center justify-between">
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.08em] text-ink-muted">Budget</span>
            <span className="h-2 w-2 rounded-full bg-signal" />
          </div>
        <div className="mb-5 h-20 rounded-[8px] border border-graphite-border bg-graphite-inset p-3">
            <div className="h-2 w-2/3 bg-ink-secondary/45" />
            <div className="mt-8 h-2 w-full rounded-full bg-graphite-strong">
              <div className="h-full w-2/3 rounded-full bg-signal" />
            </div>
          </div>
          <div className="space-y-2">
            {["Income", "Expense", "Shortcut"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-[6px] border border-graphite-border px-3 py-2">
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.08em] text-ink-secondary">{item}</span>
                <span className="h-2 w-8 rounded-full bg-signal/60" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute right-[10%] top-[18%] h-[58%] w-[42%] rounded-[10px] border border-graphite-strong bg-graphite-page p-5">
        <div className="mb-4 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-signal">Shared data</div>
        <div className="grid grid-cols-2 gap-3">
          {["Transaction", "Budget", "Pet state", "Recap"].map((item) => (
            <div key={item} className="rounded-[6px] border border-graphite-border p-3">
              <div className="mb-4 h-10 rounded-full border border-signal/30" />
              <div className="font-mono text-[0.55rem] uppercase tracking-[0.08em] text-ink-secondary">{item}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-5 right-5 rounded-[4px] border border-graphite-strong bg-graphite-page px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-ink-secondary">
        App Intents flow
      </div>
    </>
  );
}
