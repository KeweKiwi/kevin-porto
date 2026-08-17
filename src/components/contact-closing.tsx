import { ArrowRight, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import { InteractiveAnchor, MotionArrow } from "@/components/interactive-link";
import { profile } from "@/data/profile";
import { contactContent } from "@/data/site-content";

export function ContactClosing() {
  const emailHref = profile.email ? `mailto:${profile.email}` : null;

  return (
    <section id="contact" className="contact-editorial overflow-hidden bg-graphite-base pt-20 tablet:pt-28 desktop:pt-32">
      <div className="container-grid">
        <p className="font-mono text-xs uppercase text-signal">Contact / Availability</p>

        <div className="mt-7 grid gap-12 border-y border-graphite-strong py-10 desktop:grid-cols-[minmax(0,1.25fr)_minmax(340px,.75fr)] desktop:items-end desktop:py-14">
          <h2 className="contact-editorial-title text-ink-primary">{contactContent.title}</h2>

          <div className="grid gap-7">
            <p className="max-w-lg text-base leading-7 text-ink-secondary tablet:text-lg tablet:leading-8">
              {contactContent.summary}
            </p>

            {emailHref || profile.resumeUrl ? (
              <div className="grid gap-3">
                {emailHref ? (
                  <InteractiveAnchor
                    aria-label="Email Kevin"
                    className="flex min-h-20 items-center justify-between bg-signal px-5 text-lg font-semibold tracking-[-0.01em] text-graphite-page hover:bg-ink-primary tablet:min-h-24 tablet:px-7 tablet:text-xl"
                    href={emailHref}
                  >
                    <span className="flex items-center gap-3">
                      <Mail aria-hidden="true" size={21} strokeWidth={1.7} />
                      {contactContent.emailAction}
                    </span>
                    <MotionArrow>
                      <ArrowRight size={22} />
                    </MotionArrow>
                  </InteractiveAnchor>
                ) : null}

                {profile.resumeUrl ? (
                  <InteractiveAnchor
                    aria-label="View Kevin's résumé (opens in a new tab)"
                    className="flex min-h-14 items-center justify-between border border-graphite-strong px-5 text-sm font-semibold text-ink-primary hover:border-signal hover:text-signal tablet:px-7"
                    href={profile.resumeUrl}
                    interactionLevel="subtle"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {contactContent.resumeAction}
                    <MotionArrow direction="up-right"><ExternalLink size={15} /></MotionArrow>
                  </InteractiveAnchor>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid border-b border-graphite-strong tablet:grid-cols-2 laptop:auto-cols-fr laptop:grid-flow-col laptop:grid-cols-none">
          <div className="border-b border-graphite-border py-5 tablet:border-r tablet:px-5 laptop:border-b-0">
            <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.065em] text-ink-muted">Based in</p>
            <p className="mt-2 text-sm text-ink-primary">Indonesia</p>
          </div>

          {profile.linkedinUrl ? (
            <InteractiveAnchor aria-label="Open Kevin's LinkedIn profile (opens in a new tab)" className="flex min-h-20 items-center justify-between border-b border-graphite-border py-5 text-sm text-ink-primary hover:text-signal tablet:px-5 laptop:border-b-0 laptop:border-r" href={profile.linkedinUrl} interactionLevel="subtle" rel="noreferrer" target="_blank">
              <span className="flex items-center gap-2"><Linkedin aria-hidden="true" size={15} />{contactContent.linkedinAction}</span>
              <MotionArrow direction="up-right"><ExternalLink size={14} /></MotionArrow>
            </InteractiveAnchor>
          ) : null}

          {profile.githubUrl ? (
            <InteractiveAnchor aria-label="Open Kevin's GitHub profile (opens in a new tab)" className="flex min-h-20 items-center justify-between border-b border-graphite-border py-5 text-sm font-semibold text-ink-primary hover:text-signal tablet:px-5 laptop:border-b-0 laptop:border-r" href={profile.githubUrl} interactionLevel="subtle" rel="noreferrer" target="_blank">
              <span className="flex items-center gap-2"><Github aria-hidden="true" size={15} />{contactContent.githubAction}</span>
              <MotionArrow direction="up-right"><ExternalLink size={14} /></MotionArrow>
            </InteractiveAnchor>
          ) : null}

          <InteractiveAnchor aria-label="Open Rizki Mobil live website (opens in a new tab)" className="flex min-h-20 items-center justify-between py-5 text-sm text-ink-primary hover:text-signal tablet:px-5" href="https://rizkimobil.com" interactionLevel="subtle" rel="noreferrer" target="_blank">
            {contactContent.liveWorkAction}
            <MotionArrow direction="up-right"><ExternalLink size={14} /></MotionArrow>
          </InteractiveAnchor>
        </div>
      </div>
    </section>
  );
}
