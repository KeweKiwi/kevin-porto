import { ArrowRight, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { contactContent } from "@/data/site-content";

export function ContactClosing() {
  const primaryHref = profile.email ? `mailto:${profile.email}` : profile.githubUrl;
  const primaryLabel = profile.email ? contactContent.emailAction : contactContent.githubAction;
  const PrimaryIcon = profile.email ? Mail : Github;

  return (
    <section id="contact" className="contact-editorial overflow-hidden bg-graphite-page pt-20 tablet:pt-28 desktop:pt-32">
      <div className="container-grid">
        <div className="grid gap-10 desktop:grid-cols-[minmax(0,1.2fr)_minmax(320px,.8fr)] desktop:items-end">
          <h2 className="contact-editorial-title uppercase text-ink-primary">{contactContent.title}</h2>

          <div className="grid gap-7">
            <p className="max-w-lg text-base leading-7 text-ink-secondary tablet:text-lg tablet:leading-8">
              {contactContent.summary}
            </p>

            {primaryHref ? (
              <a
                className="group flex min-h-20 items-center justify-between bg-signal px-5 text-xl font-semibold uppercase text-graphite-page tablet:min-h-24 tablet:px-7 tablet:text-2xl"
                href={primaryHref}
                rel={profile.email ? undefined : "noreferrer"}
                target={profile.email ? undefined : "_blank"}
              >
                <span className="flex items-center gap-3">
                  <PrimaryIcon aria-hidden="true" size={22} strokeWidth={1.7} />
                  {primaryLabel}
                </span>
                <ArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" size={24} />
              </a>
            ) : null}

            <div className="flex flex-wrap gap-x-7 gap-y-3">
              {profile.linkedinUrl ? (
                <a className="inline-flex min-h-11 items-center gap-2 border-b border-signal text-sm text-ink-primary hover:text-signal" href={profile.linkedinUrl} rel="noreferrer" target="_blank">
                  <Linkedin aria-hidden="true" size={15} />
                  {contactContent.linkedinAction}
                </a>
              ) : null}
              {profile.resumeUrl ? (
                <a className="inline-flex min-h-11 items-center gap-2 border-b border-signal text-sm text-ink-primary hover:text-signal" href={profile.resumeUrl} rel="noreferrer" target="_blank">
                  {contactContent.resumeAction}
                  <ExternalLink aria-hidden="true" size={14} />
                </a>
              ) : null}
              <a className="inline-flex min-h-11 items-center gap-2 border-b border-signal text-sm text-ink-primary hover:text-signal" href="https://rizkimobil.com" rel="noreferrer" target="_blank">
                {contactContent.liveWorkAction}
                <ExternalLink aria-hidden="true" size={14} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
