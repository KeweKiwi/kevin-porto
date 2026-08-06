import { ArrowRight, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { contactContent } from "@/data/site-content";

export function ContactClosing() {
  const primaryHref = profile.email ? `mailto:${profile.email}` : profile.githubUrl;
  const primaryLabel = profile.email ? contactContent.emailAction : contactContent.githubPrimaryAction;
  const PrimaryIcon = profile.email ? Mail : Github;

  return (
    <section id="contact" className="contact-editorial overflow-hidden bg-graphite-base pt-20 tablet:pt-28 desktop:pt-32">
      <div className="container-grid">
        <p className="font-mono text-xs uppercase text-signal">Contact / Availability</p>

        <div className="mt-7 grid gap-12 border-y border-graphite-strong py-10 desktop:grid-cols-[minmax(0,1.25fr)_minmax(340px,.75fr)] desktop:items-end desktop:py-14">
          <h2 className="contact-editorial-title uppercase text-ink-primary">
            {contactContent.titleLines.map((line) => (
              <span key={line} className="block desktop:whitespace-nowrap">{line}</span>
            ))}
          </h2>

          <div className="grid gap-7">
            <p className="max-w-lg text-base leading-7 text-ink-secondary tablet:text-lg tablet:leading-8">
              {contactContent.summary}
            </p>

            <div className="flex items-center gap-3 font-mono text-[0.62rem] uppercase text-ink-primary">
              <span aria-hidden="true" className="h-2 w-2 bg-signal" />
              Open to iOS and software engineering opportunities
            </div>

            {primaryHref ? (
              <a
                className="group flex min-h-20 items-center justify-between bg-signal px-5 text-lg font-semibold uppercase text-graphite-page tablet:min-h-24 tablet:px-7 tablet:text-xl"
                href={primaryHref}
                rel={profile.email ? undefined : "noreferrer"}
                target={profile.email ? undefined : "_blank"}
              >
                <span className="flex items-center gap-3">
                  <PrimaryIcon aria-hidden="true" size={21} strokeWidth={1.7} />
                  {primaryLabel}
                </span>
                <ArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" size={22} />
              </a>
            ) : null}
          </div>
        </div>

        <div className="grid border-b border-graphite-strong tablet:grid-cols-2 laptop:grid-cols-4">
          <div className="border-b border-graphite-border py-5 tablet:border-r tablet:px-5 laptop:border-b-0">
            <p className="font-mono text-[0.58rem] uppercase text-ink-muted">Based in</p>
            <p className="mt-2 text-sm text-ink-primary">Indonesia</p>
          </div>

          {profile.resumeUrl ? (
            <a className="group flex min-h-20 items-center justify-between border-b border-graphite-border py-5 text-sm text-ink-primary hover:text-signal tablet:px-5 laptop:border-b-0 laptop:border-r" href={profile.resumeUrl} rel="noreferrer" target="_blank">
              {contactContent.resumeAction}
              <ExternalLink aria-hidden="true" size={14} />
            </a>
          ) : null}

          {profile.linkedinUrl ? (
            <a className="group flex min-h-20 items-center justify-between border-b border-graphite-border py-5 text-sm text-ink-primary hover:text-signal tablet:px-5 laptop:border-b-0 laptop:border-r" href={profile.linkedinUrl} rel="noreferrer" target="_blank">
              <span className="flex items-center gap-2"><Linkedin aria-hidden="true" size={15} />{contactContent.linkedinAction}</span>
              <ExternalLink aria-hidden="true" size={14} />
            </a>
          ) : null}

          <a className="group flex min-h-20 items-center justify-between py-5 text-sm text-ink-primary hover:text-signal tablet:px-5" href="https://rizkimobil.com" rel="noreferrer" target="_blank">
            {contactContent.liveWorkAction}
            <ExternalLink aria-hidden="true" className="transition-transform group-hover:translate-x-1" size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
