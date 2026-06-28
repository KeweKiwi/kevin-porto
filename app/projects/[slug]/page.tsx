import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { CaseStudyMotion } from "@/components/case-study-motion";
import { Container } from "@/components/container";
import { ProjectMedia } from "@/components/project-media";
import { getProjectVisual } from "@/data/project-visuals";
import { projects, getProject } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project not found — Kevin William Faith",
    };
  }

  return {
    title: `${project.name} — Kevin William Faith`,
    description: project.preview,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const visual = getProjectVisual(project.slug);
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  if (!visual) {
    notFound();
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-graphite-border pt-28 tablet:pt-36">
        <Container className="grid gap-10 pb-16 desktop:grid-cols-12 desktop:pb-24">
          <div className="desktop:col-span-2">
            <Link
              className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.08em] text-ink-secondary transition hover:text-signal"
              href="/#work"
            >
              <ArrowLeft aria-hidden="true" size={15} />
              Work
            </Link>
          </div>
          <div className="desktop:col-span-6">
            <p className="technical-label mb-5 text-signal">{visual.index} / {project.platform}</p>
            <h1 className="text-[clamp(3.5rem,15vw,5.25rem)] font-bold leading-[0.9] text-ink-primary desktop:text-[clamp(5rem,7vw,6.8rem)]">
              {project.name}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-[1.55] text-ink-secondary tablet:text-xl">
              {visual.statement}
            </p>
          </div>
          <aside className="grid gap-5 border-t border-graphite-border pt-6 desktop:col-span-3 desktop:col-start-10 desktop:border-t-0 desktop:pt-0">
            <Meta label="Role" value={project.role} />
            <Meta label="Context" value={project.context} />
            <Meta label="Period" value={project.period} />
            <Meta label="Status" value={visual.shortStatus} />
          </aside>
        </Container>
      </section>

      <section className="border-b border-graphite-border py-12 tablet:py-20">
        <Container>
          <ProjectMedia project={project} variant="case" />
        </Container>
      </section>

      <CaseStudyMotion>
        <section className="border-b border-graphite-border py-16 tablet:py-24">
          <Container className="grid gap-10 desktop:grid-cols-12">
            <div className="case-reveal desktop:col-span-4">
              <p className="technical-label mb-5 text-ink-muted">Product frame</p>
              <h2 className="text-4xl font-semibold leading-none text-ink-primary tablet:text-5xl">
                What the project had to prove
              </h2>
            </div>
            <div className="case-reveal grid gap-8 desktop:col-span-7 desktop:col-start-6">
              <p className="text-xl leading-[1.5] text-ink-primary">{project.productSummary}</p>
              <div className="grid gap-4 tablet:grid-cols-2">
                <SignalPanel label="Technical signal" value={visual.technicalSignal} />
                <SignalPanel label="Outcome" value={project.outcome} />
              </div>
            </div>
          </Container>
        </section>

        <SplitSection
          title="Kevin-owned work"
          lead="The portfolio separates Kevin's direct implementation and leadership responsibilities from shared team work."
          items={project.kevinOwned}
        />

        <SplitSection
          title="Shared work"
          lead="These contributions were collaborative and should not be framed as solo ownership."
          items={project.collaborative}
        />

        {project.otherContributors ? (
          <SplitSection
            title="Other-member work"
            lead="These items add project context without attributing the implementation to Kevin."
            items={project.otherContributors}
          />
        ) : null}

        <section className="border-b border-graphite-border py-16 tablet:py-24">
          <Container className="grid gap-10 desktop:grid-cols-12">
            <div className="case-reveal desktop:col-span-4">
              <p className="technical-label mb-5 text-ink-muted">System view</p>
              <h2 className="text-4xl font-semibold leading-none text-ink-primary tablet:text-5xl">
                Architecture and flow
              </h2>
            </div>
            <div className="case-reveal desktop:col-span-7 desktop:col-start-6">
              <FlowDiagram items={project.architecture.slice(0, 8)} />
              <div className="mt-8 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-[4px] border border-graphite-strong px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-secondary"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <SplitSection
          title="Challenges and limits"
          lead="Known constraints are part of the case study because they explain technical judgment without overclaiming."
          items={[...project.challenges, ...project.limitations]}
        />

        <SplitSection
          title="Testing and iteration"
          lead="Testing notes stay factual and avoid inventing usage metrics."
          items={project.testing}
        />

        <SplitSection
          title="Next improvements"
          lead="These are future directions, not features already shipped."
          items={project.futureImprovements}
        />
      </CaseStudyMotion>

      <section className="py-16 tablet:py-24">
        <Container className="flex flex-col gap-6 tablet:flex-row tablet:items-center tablet:justify-between">
          <div>
            <p className="technical-label mb-3 text-ink-muted">Next project</p>
            <h2 className="text-3xl font-semibold text-ink-primary tablet:text-5xl">{nextProject.name}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.primaryCta.isExternal ? (
              <a
                className="inline-flex items-center gap-2 rounded-[4px] bg-signal px-4 py-3 text-sm font-medium text-graphite-page"
                href={project.primaryCta.href}
                rel="noreferrer"
                target="_blank"
              >
                {project.primaryCta.label}
                <ExternalLink aria-hidden="true" size={16} />
              </a>
            ) : null}
            <Link
              className="inline-flex items-center gap-2 rounded-[4px] border border-graphite-strong px-4 py-3 text-sm font-medium text-ink-primary transition hover:border-signal hover:text-signal"
              href={`/projects/${nextProject.slug}`}
            >
              Open {nextProject.name}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="technical-label mb-2 text-ink-muted">{label}</p>
      <p className="text-sm leading-6 text-ink-primary">{value}</p>
    </div>
  );
}

function SignalPanel({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[8px] border border-graphite-strong bg-graphite-base p-5">
      <p className="technical-label mb-3 text-signal">{label}</p>
      <p className="text-sm leading-6 text-ink-secondary">{value}</p>
    </div>
  );
}

function SplitSection({ title, lead, items }: { title: string; lead: string; items: string[] }) {
  return (
    <section className="border-b border-graphite-border py-16 tablet:py-24">
      <Container className="grid gap-10 desktop:grid-cols-12">
        <div className="case-reveal desktop:col-span-4">
          <p className="technical-label mb-5 text-ink-muted">{title}</p>
          <p className="max-w-sm text-base leading-[1.55] text-ink-secondary">{lead}</p>
        </div>
        <ul className="case-reveal grid gap-3 desktop:col-span-7 desktop:col-start-6">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-[6px] border border-graphite-border bg-graphite-base px-4 py-4 text-sm leading-6 text-ink-primary tablet:text-base"
            >
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function FlowDiagram({ items }: { items: string[] }) {
  return (
    <div className="rounded-[10px] border border-graphite-strong bg-graphite-base p-4">
      <div className="grid gap-3">
        {items.map((item, index) => (
          <div key={item} className="grid grid-cols-[44px_1fr] items-center gap-4">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-signal">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="rounded-[6px] border border-graphite-border bg-graphite-page px-4 py-3 text-sm leading-6 text-ink-secondary">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
