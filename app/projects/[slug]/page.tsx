import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { CaseStudyMotion } from "@/components/case-study-motion";
import { Container } from "@/components/container";
import { InteractiveAnchor, InteractiveLink, MotionArrow } from "@/components/interactive-link";
import { ProjectGalleryCarousel } from "@/components/project-gallery-carousel";
import { getProjectVisual } from "@/data/project-visuals";
import { projects, getProject, projectNavigationProjects } from "@/data/projects";

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
  const currentIndex = projectNavigationProjects.findIndex((item) => item.slug === project.slug);
  const nextProject = projectNavigationProjects[(currentIndex + 1) % projectNavigationProjects.length];
  const caseMeta = [
    { label: "Context", value: project.context },
    { label: "Status", value: visual?.shortStatus ?? "" },
    project.duration ? { label: "Duration", value: project.duration } : null,
    project.repoState === "private" ? { label: "Repository", value: "Private client source" } : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item?.value));

  if (!visual) {
    notFound();
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-graphite-border bg-graphite-page pt-20 tablet:pt-24">
        <div aria-hidden="true" className="absolute inset-0 opacity-45 kwf-field-depth" />
        <div aria-hidden="true" className="absolute left-[8%] top-0 hidden h-full w-px bg-graphite-border desktop:block" />
        <div aria-hidden="true" className="absolute bottom-[24%] right-0 h-px w-[48%] bg-signal/35" />
        <div aria-hidden="true" className="absolute left-[14%] top-[28%] h-px w-[34%] bg-ink-primary/20" />

        <Container className="relative z-[1] grid gap-8 pb-10 desktop:grid-cols-[minmax(0,1fr)_480px] desktop:pb-0">
          <div>
            <InteractiveLink
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-secondary transition hover:text-signal"
              href="/#work"
              interactionLevel="subtle"
            >
              <MotionArrow direction="left"><ArrowLeft size={15} /></MotionArrow>
              Selected work
            </InteractiveLink>

            <div className="mt-8 tablet:mt-10">
              <p className="technical-label mb-4 text-signal">
                {visual.index} / {project.platform}
              </p>
              <h1 className="max-w-[11ch] font-display text-[clamp(3.6rem,15vw,6.2rem)] font-bold leading-[0.9] tracking-[-0.055em] text-ink-primary desktop:text-[clamp(6rem,8vw,8.4rem)]">
                {project.name}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-[1.5] text-ink-secondary tablet:text-xl">
                {visual.statement}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <ProjectSourceAction project={project} />
              {project.primaryCta.isExternal ? (
                <InteractiveAnchor
                  className={project.repoUrl
                    ? "inline-flex min-h-12 items-center gap-2 rounded-[4px] border border-graphite-strong px-4 py-3 text-sm font-medium text-ink-primary transition hover:border-signal hover:text-signal"
                    : "inline-flex min-h-12 items-center gap-2 rounded-[4px] bg-signal px-4 py-3 text-sm font-medium text-graphite-page hover:bg-ink-primary"}
                  href={project.primaryCta.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {project.primaryCta.label}
                  <MotionArrow direction="up-right"><ExternalLink size={16} /></MotionArrow>
                </InteractiveAnchor>
              ) : null}
            </div>
          </div>

          <aside className="self-end overflow-hidden border border-graphite-strong bg-graphite-page/72 shadow-signal-sm backdrop-blur">
            <div className="border-b border-graphite-border p-4 tablet:p-5">
              <div className="grid gap-2 tablet:grid-cols-[auto_1fr] tablet:items-center">
                <p className="technical-label text-signal">Project summary</p>
                <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-ink-muted tablet:text-right">
                  Ownership and outcome
                </p>
              </div>
              <p className="mt-3 text-base leading-[1.5] text-ink-primary tablet:text-[1.05rem]">{project.caseSummary}</p>
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

            <dl className="grid gap-px bg-graphite-border tablet:grid-cols-2 desktop:grid-cols-4">
              {caseMeta.map((item, index) => (
                <CaseMeta
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  wide={caseMeta.length % 2 === 1 && index === caseMeta.length - 1}
                />
              ))}
            </dl>
          </aside>
        </Container>

      </section>

      <section className="relative z-[2] border-b border-graphite-border bg-graphite-page pb-12 pt-0 tablet:pb-16">
        <Container className="-mt-4 tablet:-mt-6 desktop:mt-0">
          <ProjectGalleryCarousel project={project} visual={visual} />
        </Container>
      </section>

      <CaseStudyMotion>
        <section className="py-14 tablet:py-20">
          <Container className="grid gap-10 desktop:grid-cols-[minmax(0,1fr)_360px]">
            <div className="case-reveal">
              <p className="technical-label mb-5 text-ink-muted">{project.decisionSection.label}</p>
              <h2 className="max-w-3xl text-balance font-display text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-ink-primary tablet:text-5xl">
                {project.decisionSection.title}
              </h2>

              <ul className="grid gap-4">
                {project.caseFocus.map((item, index) => (
                  <li
                    key={item}
                    className="grid gap-4 border-t border-graphite-border pt-5 first:mt-8 tablet:grid-cols-[72px_1fr]"
                  >
                    <span className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-signal">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="max-w-3xl text-xl leading-[1.45] text-ink-primary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="case-reveal border-t border-graphite-border pt-6 desktop:border-l desktop:border-t-0 desktop:pl-8 desktop:pt-0">
              <p className="technical-label text-signal">Core stack</p>
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

      <section className="border-t border-graphite-border py-10 tablet:py-14">
        <Container className="grid gap-8 desktop:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] desktop:items-end">
          <div>
            <p className="technical-label text-ink-muted">Project links</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <ProjectSourceAction project={project} />

              {project.primaryCta.isExternal ? (
                <InteractiveAnchor
                  className={project.repoUrl
                    ? "inline-flex min-h-12 items-center gap-2 rounded-[4px] border border-graphite-strong px-4 py-3 text-sm font-medium text-ink-primary transition hover:border-signal hover:text-signal"
                    : "inline-flex min-h-12 items-center gap-2 rounded-[4px] bg-signal px-4 py-3 text-sm font-medium text-graphite-page hover:bg-ink-primary"}
                  href={project.primaryCta.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {project.primaryCta.label}
                  <MotionArrow direction="up-right"><ExternalLink size={16} /></MotionArrow>
                </InteractiveAnchor>
              ) : null}
            </div>
          </div>

          <div>
            <p className="technical-label text-signal">Next project</p>
            <InteractiveLink
              className="group mt-4 flex min-h-24 items-center justify-between gap-6 border-y border-graphite-strong py-5 text-ink-primary transition hover:border-signal"
              href={`/projects/${nextProject.slug}`}
            >
              <span>
                <span className="block font-display text-3xl font-semibold tracking-[-0.035em] tablet:text-4xl">
                  {nextProject.name}
                </span>
                <span className="mt-2 block text-sm text-ink-secondary">{nextProject.category}</span>
              </span>
              <MotionArrow><ArrowRight className="text-signal" size={22} /></MotionArrow>
            </InteractiveLink>
          </div>
        </Container>
      </section>
    </>
  );
}

function CaseMeta({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "grid gap-1.5 bg-graphite-page p-3.5 tablet:col-span-2 desktop:col-span-1 desktop:p-3" : "grid gap-1.5 bg-graphite-page p-3.5 desktop:p-3"}>
      <dt className="technical-label text-ink-muted">{label}</dt>
      <dd className="text-sm leading-6 text-ink-primary desktop:text-xs desktop:leading-5">{value}</dd>
    </div>
  );
}

function ProjectSourceAction({ project }: { project: (typeof projects)[number] }) {
  if (project.repoUrl) {
    return (
      <InteractiveAnchor
        className="inline-flex min-h-12 items-center gap-2 rounded-[4px] bg-signal px-4 py-3 text-sm font-medium text-graphite-page hover:bg-ink-primary"
        href={project.repoUrl}
        rel="noreferrer"
        target="_blank"
      >
        <Github aria-hidden="true" size={17} />
        View source on GitHub
      </InteractiveAnchor>
    );
  }

  return null;
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
    <div className="grid gap-2.5 p-4 tablet:p-5">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-signal">
          {String(index).padStart(2, "0")}
        </span>
        <span aria-hidden="true" className="h-px w-8 bg-graphite-strong" />
        <p className="technical-label text-ink-muted">{label}</p>
      </div>
      <p className="max-w-[48ch] text-[0.95rem] leading-[1.5] text-ink-primary">{value}</p>
    </div>
  );
}
