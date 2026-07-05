import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { CaseStudyMotion } from "@/components/case-study-motion";
import { Container } from "@/components/container";
import { ProjectGalleryCarousel } from "@/components/project-gallery-carousel";
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
      <section className="relative overflow-hidden border-b border-graphite-border bg-graphite-page pt-28 tablet:pt-36">
        <div aria-hidden="true" className="absolute inset-0 opacity-45 kwf-field-depth" />
        <div aria-hidden="true" className="absolute left-[8%] top-0 hidden h-full w-px bg-graphite-border desktop:block" />
        <div aria-hidden="true" className="absolute bottom-[24%] right-0 h-px w-[48%] bg-signal/35" />
        <div aria-hidden="true" className="absolute left-[14%] top-[28%] h-px w-[34%] bg-ink-primary/20" />

        <Container className="relative z-[1] grid gap-12 pb-16 desktop:grid-cols-[minmax(0,1fr)_480px] desktop:pb-24">
          <div>
            <Link
              className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.08em] text-ink-secondary transition hover:text-signal"
              href="/#work"
            >
              <ArrowLeft aria-hidden="true" size={15} />
              Work
            </Link>

            <div className="mt-14 tablet:mt-20">
              <p className="technical-label mb-5 text-signal">
                {visual.index} / {project.platform}
              </p>
              <h1 className="max-w-[11ch] text-[clamp(3.6rem,15vw,6.2rem)] font-bold leading-[0.84] text-ink-primary desktop:text-[clamp(6rem,8vw,8.4rem)]">
                {project.name}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-[1.55] text-ink-secondary tablet:text-xl">
                {visual.statement}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="inline-flex min-h-12 items-center gap-2 rounded-[4px] bg-signal px-4 py-3 text-sm font-medium text-graphite-page transition hover:-translate-y-0.5"
                href={project.repoUrl}
                rel="noreferrer"
                target="_blank"
              >
                <Github aria-hidden="true" size={17} />
                GitHub repo
              </a>
              {project.primaryCta.isExternal ? (
                <a
                  className="inline-flex min-h-12 items-center gap-2 rounded-[4px] border border-graphite-strong px-4 py-3 text-sm font-medium text-ink-primary transition hover:border-signal hover:text-signal"
                  href={project.primaryCta.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {project.primaryCta.label}
                  <ExternalLink aria-hidden="true" size={16} />
                </a>
              ) : null}
            </div>
          </div>

          <aside className="self-end overflow-hidden border border-graphite-strong bg-graphite-page/72 shadow-signal-sm backdrop-blur">
            <div className="border-b border-graphite-border p-5 tablet:p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="technical-label text-signal">Project overview</p>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-muted">
                  Key contributions
                </p>
              </div>
              <p className="mt-5 text-xl leading-[1.45] text-ink-primary">{project.caseSummary}</p>
            </div>

            <div className="divide-y divide-graphite-border">
              {project.caseHighlights.map((highlight, index) => (
                <CaseHighlightRow
                  key={highlight.label}
                  index={index + 1}
                  label={highlight.label}
                  value={highlight.value}
                />
              ))}
            </div>

            <dl className="grid gap-px bg-graphite-border tablet:grid-cols-3">
              <CaseMeta label="Context" value={project.context} />
              <CaseMeta label="Status" value={visual.shortStatus} />
              <CaseMeta label="Duration" value={project.duration} />
            </dl>
          </aside>
        </Container>

        <Container className="relative z-[1] hidden border-t border-graphite-border py-4 tablet:block">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {visual.markers.map((marker, index) => (
              <span
                key={marker}
                className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-muted"
              >
                <span className="text-signal">{String(index + 1).padStart(2, "0")}</span> {marker}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative z-[2] border-b border-graphite-border bg-graphite-page pb-12 pt-0 tablet:pb-16">
        <Container className="-mt-8 tablet:-mt-10">
          <ProjectGalleryCarousel project={project} visual={visual} />
        </Container>
      </section>

      <CaseStudyMotion>
        <section className="py-14 tablet:py-20">
          <Container className="grid gap-10 desktop:grid-cols-[minmax(0,1fr)_360px]">
            <div className="case-reveal">
              <p className="technical-label mb-5 text-ink-muted">Implementation focus</p>
              <h2 className="max-w-3xl text-4xl font-semibold leading-none text-ink-primary tablet:text-5xl">
                Technical focus.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-[1.6] text-ink-secondary">{visual.proof}</p>

              <ul className="grid gap-4">
                {project.caseFocus.map((item, index) => (
                  <li
                    key={item}
                    className="grid gap-4 border-t border-graphite-border pt-5 first:mt-8 tablet:grid-cols-[72px_1fr]"
                  >
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-signal">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="max-w-3xl text-xl leading-[1.45] text-ink-primary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="case-reveal border-t border-graphite-border pt-6 desktop:border-l desktop:border-t-0 desktop:pl-8 desktop:pt-0">
              <p className="technical-label text-signal">Technical frame</p>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-3">
                {project.technologies.slice(0, 6).map((technology) => (
                  <span
                    key={technology}
                    className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-ink-secondary"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <div className="mt-10 border-t border-graphite-border pt-6">
                <p className="technical-label mb-4 text-ink-muted">Status</p>
                <p className="text-lg leading-[1.5] text-ink-primary">{visual.shortStatus}</p>
              </div>
            </aside>
          </Container>
        </section>
      </CaseStudyMotion>

      <section className="border-t border-graphite-border py-10 tablet:py-12">
        <Container className="flex flex-col gap-5 tablet:flex-row tablet:items-center tablet:justify-between">
          <p className="technical-label text-ink-muted">Project links</p>

          <div className="flex flex-wrap gap-3">
            <a
              className="inline-flex min-h-12 items-center gap-2 rounded-[4px] bg-signal px-4 py-3 text-sm font-medium text-graphite-page transition hover:-translate-y-0.5"
              href={project.repoUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Github aria-hidden="true" size={17} />
              GitHub repo
            </a>

            <Link
              className="inline-flex min-h-12 items-center gap-2 rounded-[4px] border border-graphite-strong px-4 py-3 text-sm font-medium text-ink-primary transition hover:border-signal hover:text-signal"
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

function CaseMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 bg-graphite-page p-4">
      <dt className="technical-label text-ink-muted">{label}</dt>
      <dd className="text-sm leading-6 text-ink-primary">{value}</dd>
    </div>
  );
}

function CaseHighlightRow({
  index,
  label,
  value,
}: {
  index: number;
  label: string;
  value: string;
}) {
  return (
    <div className="grid gap-3 p-5 tablet:grid-cols-[48px_1fr] tablet:p-6">
      <div className="flex items-center gap-3 tablet:block">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-signal">
          {String(index).padStart(2, "0")}
        </span>
        <p className="technical-label text-ink-muted tablet:mt-5">{label}</p>
      </div>
      <p className="text-base leading-[1.55] text-ink-primary">{value}</p>
    </div>
  );
}
