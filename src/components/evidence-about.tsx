import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { workApproachContent } from "@/data/site-content";

export function EvidenceAbout() {
  return (
    <section id="capabilities" className="relative border-b border-graphite-border py-20 tablet:py-28">
      <div className="container-grid grid gap-10 desktop:grid-cols-12">
        <div className="desktop:col-span-5">
          <p className="technical-label mb-5 text-ink-muted">{workApproachContent.label}</p>
          <h2 className="max-w-3xl text-4xl font-semibold leading-none text-ink-primary tablet:text-6xl">
            {workApproachContent.title}
          </h2>
          <p className="mt-7 max-w-xl text-base leading-[1.55] text-ink-secondary tablet:text-lg">
            {workApproachContent.summary}
          </p>
          <Link
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink-primary transition hover:text-signal"
            href="#contact"
          >
            {workApproachContent.action}
            <ArrowRight aria-hidden="true" className="transition group-hover:translate-x-1" size={16} />
          </Link>
        </div>

        <div className="desktop:col-span-6 desktop:col-start-7">
          <div className="grid gap-px overflow-hidden rounded-[10px] border border-graphite-strong bg-graphite-strong">
            {workApproachContent.rows.map((row, index) => (
              <article key={row.question} className="bg-graphite-base p-5 tablet:p-6">
                <div className="mb-6 flex items-center justify-between gap-5">
                  <p className="technical-label text-signal">{String(index + 1).padStart(2, "0")}</p>
                  <p className="technical-label text-ink-muted">{row.evidence}</p>
                </div>
                <h3 className="text-2xl font-semibold leading-tight text-ink-primary">{row.question}</h3>
                <p className="mt-4 text-sm leading-6 text-ink-secondary">{row.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
