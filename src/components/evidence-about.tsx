import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";

const proofRows = [
  {
    question: "What problems does Kevin like solving?",
    answer:
      "Ambiguous product requirements that need to become working software: sensor-driven gameplay, dealership operations, and native finance flows.",
    evidence: "QuackFight / Rizki Mobil / Squeaky",
  },
  {
    question: "What distinguishes the work?",
    answer:
      "Kevin is not only implementing isolated screens. The strongest work connects architecture, interaction, data flow, testing, and handover.",
    evidence: "Tech Lead roles and live client delivery",
  },
  {
    question: "How does Kevin work?",
    answer:
      "He translates requirements, allocates tasks, reviews code, integrates features, debugs across modules, and keeps product constraints visible.",
    evidence: "Team projects plus independent production deployment",
  },
];

export function EvidenceAbout() {
  return (
    <section id="about" className="relative border-b border-graphite-border py-20 tablet:py-28">
      <div className="container-grid grid gap-10 desktop:grid-cols-12">
        <div className="desktop:col-span-5">
          <p className="technical-label mb-5 text-ink-muted">About Kevin</p>
          <h2 className="max-w-3xl text-4xl font-semibold leading-none text-ink-primary tablet:text-6xl">
            Clear thinking, then working systems.
          </h2>
          <p className="mt-7 max-w-xl text-base leading-[1.55] text-ink-secondary tablet:text-lg">
            {profile.shortName} works best where product ambiguity has to become a system people can use. The pattern across the portfolio is practical ownership: understand the problem, build the flow, integrate the details, and keep claims grounded in evidence.
          </p>
          <Link
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink-primary transition hover:text-signal"
            href="#contact"
          >
            Continue to contact
            <ArrowRight aria-hidden="true" className="transition group-hover:translate-x-1" size={16} />
          </Link>
        </div>

        <div className="desktop:col-span-6 desktop:col-start-7">
          <div className="grid gap-px overflow-hidden rounded-[10px] border border-graphite-strong bg-graphite-strong">
            {proofRows.map((row, index) => (
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
