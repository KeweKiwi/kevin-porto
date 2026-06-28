import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";

export function ContactClosing() {
  const hasEmail = Boolean(profile.email);
  const hasResume = Boolean(profile.resumeUrl);

  return (
    <section id="contact" className="relative overflow-hidden py-20 tablet:py-28 desktop:py-36">
      <div className="absolute left-[12%] top-0 hidden h-full w-px bg-graphite-border desktop:block" />
      <div className="container-grid grid gap-10 desktop:grid-cols-12">
        <div className="desktop:col-span-8">
          <p className="technical-label mb-5 text-ink-muted">Next step</p>
          <h2 className="max-w-5xl text-5xl font-semibold leading-[0.95] text-ink-primary tablet:text-7xl desktop:text-8xl">
            Start with the work. The engineering story is in the case studies.
          </h2>
        </div>
        <div className="grid gap-5 desktop:col-span-4 desktop:self-end">
          <p className="text-base leading-[1.55] text-ink-secondary">
            {profile.shortName} is positioned for roles that value native Apple craft, production web delivery, and technical ownership.
          </p>
          <div className="flex flex-col gap-3">
            {hasEmail && profile.email ? (
              <a
                className="group inline-flex items-center justify-between rounded-[4px] bg-signal px-4 py-3 text-sm font-medium text-graphite-page"
                href={`mailto:${profile.email}`}
              >
                Email Kevin
                <ArrowRight aria-hidden="true" className="transition group-hover:translate-x-1" size={16} />
              </a>
            ) : null}
            {hasResume && profile.resumeUrl ? (
              <a
                className="inline-flex items-center justify-between rounded-[4px] border border-graphite-strong px-4 py-3 text-sm font-medium text-ink-primary transition hover:border-signal hover:text-signal"
                href={profile.resumeUrl}
              >
                View resume
                <ExternalLink aria-hidden="true" size={16} />
              </a>
            ) : null}
            <Link
              className="inline-flex items-center justify-between rounded-[4px] border border-graphite-strong px-4 py-3 text-sm font-medium text-ink-primary transition hover:border-signal hover:text-signal"
              href="/projects/quackfight"
            >
              Open flagship case study
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <a
              className="inline-flex items-center justify-between rounded-[4px] border border-graphite-strong px-4 py-3 text-sm font-medium text-ink-primary transition hover:border-signal hover:text-signal"
              href="https://rizkimobil.com"
              rel="noreferrer"
              target="_blank"
            >
              View live web system
              <ExternalLink aria-hidden="true" size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
