"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ProjectMedia } from "@/components/project-media";
import { projects } from "@/data/projects";
import { projectVisuals } from "@/data/project-visuals";
import { selectedWorkContent } from "@/data/site-content";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SelectedWorkShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) {
        return;
      }

      const responsiveMotion = gsap.matchMedia();

      responsiveMotion.add("(max-width: 1279px)", () => {
        const mobileCards = gsap.utils.toArray<HTMLElement>(".project-mobile-card");

        mobileCards.forEach((card) => {
          const media = card.querySelector<HTMLElement>(".project-mobile-media");
          const copy = card.querySelector<HTMLElement>(".project-mobile-copy");

          gsap
            .timeline({
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            })
            .fromTo(
              card,
              { autoAlpha: 0, scale: 0.985, y: 48 },
              { autoAlpha: 1, duration: 0.68, ease: "power3.out", scale: 1, y: 0 },
            )
            .fromTo(
              media,
              { scale: 1.055, y: 18 },
              { duration: 0.78, ease: "power3.out", scale: 1, y: 0 },
              "<",
            )
            .fromTo(
              copy,
              { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, duration: 0.48, ease: "power3.out", y: 0 },
              "-=0.46",
            );
        });
      });

      responsiveMotion.add("(min-width: 1280px)", () => {
        if (!pinRef.current) {
          return;
        }

        const cards = gsap.utils.toArray<HTMLElement>(".project-reel-card");
        const indexLayers = gsap.utils.toArray<HTMLElement>(".work-stage-index-layer");
        const transitionScans = gsap.utils.toArray<HTMLElement>(".work-transition-scan");
        const stepCount = Math.max(projects.length - 1, 1);

        const cardState = (offset: number) => {
          if (offset === 0) {
            return {
              autoAlpha: 1,
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              xPercent: -50,
              yPercent: -50,
              z: 0,
              zIndex: 5,
            };
          }

          if (offset === -1) {
            return {
              autoAlpha: 0.16,
              rotateX: 1.2,
              rotateY: 8,
              scale: 0.76,
              xPercent: -114,
              yPercent: -50,
              z: -180,
              zIndex: 2,
            };
          }

          if (offset === 1) {
            return {
              autoAlpha: 0.3,
              rotateX: -1,
              rotateY: -8,
              scale: 0.76,
              xPercent: 16,
              yPercent: -50,
              z: -150,
              zIndex: 2,
            };
          }

          return {
            autoAlpha: 0,
            rotateX: offset < 0 ? 2 : -2,
            rotateY: offset < 0 ? 11 : -11,
            scale: 0.62,
            xPercent: offset < 0 ? -154 : 76,
            yPercent: -50,
            z: -260,
            zIndex: 1,
          };
        };

        gsap.set(".casefile-stage", { perspective: 1800 });
        gsap.set(cards, {
          force3D: true,
          transformOrigin: "center center",
          transformPerspective: 1800,
          transformStyle: "preserve-3d",
        });
        gsap.set(".work-stage-field", {
          scale: 1.04,
          transformOrigin: "center center",
        });
        gsap.set(".work-stage-reticle", {
          autoAlpha: 0.34,
          rotation: 0,
          scale: 0.92,
        });
        gsap.set(".work-progress-line", {
          scaleY: 0,
          transformOrigin: "top center",
        });
        gsap.set(".project-reel-frame-line", {
          scaleX: 0,
          transformOrigin: "left center",
        });
        gsap.set(".project-reel-frame-drop", {
          scaleY: 0,
          transformOrigin: "top center",
        });
        gsap.set(transitionScans, { autoAlpha: 0, xPercent: -170 });
        gsap.set(indexLayers, { autoAlpha: 0, y: 12 });
        gsap.set(indexLayers[0], { autoAlpha: 1, y: 0 });

        cards.forEach((card, index) => {
          const media = card.querySelector<HTMLElement>(".project-reel-media-inner");
          const copyItems = gsap.utils.toArray<HTMLElement>(
            ".project-reel-copy-item",
            card,
          );

          gsap.set(card, cardState(index));
          gsap.set(media, {
            force3D: true,
            scale: index === 0 ? 1 : 0.955,
            xPercent: index === 0 ? 0 : 7,
          });
          gsap.set(copyItems, {
            autoAlpha: index === 0 ? 1 : 0,
            y: index === 0 ? 0 : 22,
          });
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            id: "selected-work-showcase",
            anticipatePin: 1,
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * stepCount * 1.35}`,
            invalidateOnRefresh: true,
            pin: pinRef.current,
            scrub: 0.9,
            snap: {
              delay: 0.08,
              duration: { min: 0.18, max: 0.42 },
              ease: "power2.inOut",
              snapTo: 1 / stepCount,
            },
            onUpdate: (self) => {
              const nextIndex = Math.min(
                projects.length - 1,
                Math.round(self.progress * (projects.length - 1)),
              );

              if (activeIndexRef.current !== nextIndex) {
                activeIndexRef.current = nextIndex;
                setActiveIndex(nextIndex);
              }
            },
          },
        });

        timeline
          .to(
            ".work-progress-line",
            { duration: stepCount, ease: "none", scaleY: 1 },
            0,
          )
          .to(
            ".work-stage-field",
            {
              duration: stepCount,
              ease: "none",
              scale: 1.085,
              xPercent: -2.4,
              yPercent: 1.2,
            },
            0,
          )
          .to(
            ".work-stage-reticle",
            {
              autoAlpha: 0.52,
              duration: stepCount,
              ease: "none",
              rotation: 90,
              scale: 1.08,
            },
            0,
          )
          .to(
            ".project-reel-frame-line",
            { duration: 0.28, ease: "power3.out", scaleX: 1 },
            0,
          )
          .to(
            ".project-reel-frame-drop",
            { duration: 0.28, ease: "power3.out", scaleY: 1 },
            0.04,
          );

        projects.slice(1).forEach((_, stepIndex) => {
          const nextActiveIndex = stepIndex + 1;
          const outgoingCard = cards[nextActiveIndex - 1];
          const activeCard = cards[nextActiveIndex];
          const outgoingMedia = outgoingCard.querySelector<HTMLElement>(
            ".project-reel-media-inner",
          );
          const activeMedia = activeCard.querySelector<HTMLElement>(
            ".project-reel-media-inner",
          );
          const outgoingCopy = gsap.utils.toArray<HTMLElement>(
            ".project-reel-copy-item",
            outgoingCard,
          );
          const activeCopy = gsap.utils.toArray<HTMLElement>(
            ".project-reel-copy-item",
            activeCard,
          );
          const transitionScan = transitionScans[stepIndex];

          cards.forEach((card, cardIndex) => {
            timeline.to(
              card,
              {
                ...cardState(cardIndex - nextActiveIndex),
                duration: 0.9,
                ease: "power4.inOut",
              },
              stepIndex + 0.05,
            );
          });

          timeline
            .to(
              outgoingMedia,
              {
                duration: 0.42,
                ease: "power3.in",
                scale: 1.045,
                xPercent: -7,
              },
              stepIndex + 0.04,
            )
            .to(
              outgoingCopy,
              {
                autoAlpha: 0,
                duration: 0.24,
                ease: "power2.in",
                stagger: 0.016,
                y: -14,
              },
              stepIndex + 0.04,
            )
            .to(
              activeMedia,
              {
                duration: 0.62,
                ease: "power4.out",
                scale: 1,
                xPercent: 0,
              },
              stepIndex + 0.3,
            )
            .to(
              activeCopy,
              {
                autoAlpha: 1,
                duration: 0.42,
                ease: "power3.out",
                stagger: 0.04,
                y: 0,
              },
              stepIndex + 0.43,
            )
            .to(
              indexLayers[nextActiveIndex - 1],
              {
                autoAlpha: 0,
                duration: 0.2,
                ease: "power2.in",
                y: -12,
              },
              stepIndex + 0.24,
            )
            .to(
              indexLayers[nextActiveIndex],
              {
                autoAlpha: 1,
                duration: 0.3,
                ease: "power3.out",
                y: 0,
              },
              stepIndex + 0.42,
            )
            .fromTo(
              transitionScan,
              { autoAlpha: 0, xPercent: -170 },
              {
                autoAlpha: 0.82,
                duration: 0.66,
                ease: "power2.inOut",
                immediateRender: false,
                xPercent: 470,
              },
              stepIndex + 0.08,
            )
            .to(
              transitionScan,
              { autoAlpha: 0, duration: 0.14, ease: "power2.out" },
              stepIndex + 0.7,
            );
        });
      });

      return () => responsiveMotion.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  function selectProject(index: number) {
    if (reducedMotion || window.innerWidth < 1280) {
      activeIndexRef.current = index;
      setActiveIndex(index);
      return;
    }

    const trigger = ScrollTrigger.getById("selected-work-showcase");

    if (!trigger) {
      activeIndexRef.current = index;
      setActiveIndex(index);
      return;
    }

    const progress = projects.length <= 1 ? 0 : index / (projects.length - 1);

    window.scrollTo({
      top: trigger.start + (trigger.end - trigger.start) * progress,
      behavior: "smooth",
    });
  }

  return (
    <section ref={sectionRef} id="work" className="casefile-section relative border-b border-graphite-border bg-graphite-page">
      <div ref={pinRef} className="container-grid py-20 tablet:py-28 desktop:min-h-screen desktop:py-20">
        <div className="mb-12 grid gap-6 desktop:grid-cols-12 desktop:items-end">
          <div className="desktop:col-span-7">
            <p className="technical-label mb-5 text-ink-muted">{selectedWorkContent.label}</p>
            <h2 className="max-w-4xl text-4xl font-semibold leading-none text-ink-primary tablet:text-6xl desktop:text-7xl">
              {selectedWorkContent.title}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-[1.55] text-ink-secondary desktop:col-span-4 desktop:col-start-9">
            {selectedWorkContent.summary}
          </p>
        </div>

        <div className="hidden desktop:grid desktop:grid-cols-[96px_1fr] desktop:gap-8">
          <div className="relative grid content-start gap-3 pt-10">
            <span aria-hidden="true" className="absolute left-5 top-10 h-[6.25rem] w-px bg-graphite-border" />
            <span aria-hidden="true" className="work-progress-line absolute left-5 top-10 h-[6.25rem] w-px scale-y-0 bg-signal" />
            {projects.map((project, index) => (
              <button
                key={project.slug}
                aria-label={`Show ${project.name}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className="group relative z-[1] flex items-center gap-3 text-left"
                onClick={() => selectProject(index)}
                type="button"
              >
                <span
                  className={
                    activeIndex === index
                      ? "h-px w-10 bg-signal"
                      : "h-px w-6 bg-graphite-strong transition-all group-hover:w-10"
                  }
                />
                <span
                  className={
                    activeIndex === index
                      ? "technical-label text-signal"
                      : "technical-label text-ink-muted transition-colors group-hover:text-ink-secondary"
                  }
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>

          <div className="casefile-stage relative min-h-[640px] overflow-hidden border border-graphite-strong bg-graphite-base">
            <div
              aria-hidden="true"
              className="work-stage-field absolute -inset-[6%] bg-[radial-gradient(circle_at_50%_50%,rgba(215,247,91,0.10),transparent_28%),linear-gradient(90deg,rgba(215,247,91,0.08),transparent_28%,transparent_70%,rgba(243,240,232,0.05))]"
            />
            <span aria-hidden="true" className="work-stage-reticle pointer-events-none absolute inset-0 z-[1] m-auto h-56 w-56 rounded-full border border-signal/15" />
            <div
              aria-hidden="true"
              className="absolute right-[9%] top-3 z-20 flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-ink-muted"
            >
              <span>Casefile</span>
              <span className="relative block h-3 w-5 overflow-hidden text-signal">
                {projectVisuals.map((visual) => (
                  <span key={visual.slug} className="work-stage-index-layer absolute inset-0">
                    {visual.index}
                  </span>
                ))}
              </span>
              <span>/ {String(projects.length).padStart(2, "0")}</span>
            </div>
            {projects.slice(1).map((project) => (
              <span
                key={`scan-${project.slug}`}
                aria-hidden="true"
                className="work-transition-scan pointer-events-none absolute inset-y-0 left-0 z-30 w-[18%] bg-gradient-to-r from-transparent via-signal/25 to-transparent"
              />
            ))}
            <span
              aria-hidden="true"
              className="project-reel-frame-line pointer-events-none absolute left-[9%] top-8 z-20 h-px w-[82%] bg-signal/45"
            />
            <span
              aria-hidden="true"
              className="project-reel-frame-drop pointer-events-none absolute left-[9%] top-8 z-20 h-16 w-px bg-ink-primary/25"
            />
            <span
              aria-hidden="true"
              className="project-reel-frame-drop pointer-events-none absolute right-[9%] bottom-8 z-20 h-16 w-px origin-bottom bg-ink-primary/25"
            />
            {projects.map((project, index) => {
              const visual = projectVisuals[index];
              return (
                <article
                  key={project.slug}
                  aria-hidden={activeIndex !== index}
                  className={`project-reel-card absolute left-1/2 top-1/2 h-[80%] w-[84%] overflow-hidden border border-graphite-strong bg-graphite-page/96 shadow-signal-sm will-change-transform ${
                    reducedMotion
                      ? `-translate-x-1/2 -translate-y-1/2 ${
                          activeIndex !== index ? "invisible opacity-0" : ""
                        }`
                      : "opacity-0"
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(90deg,rgba(215,247,91,0.05),transparent_24%,transparent_72%,rgba(243,240,232,0.04))]"
                  />
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 z-10 w-px bg-signal/55" />
                  <div className="relative grid h-full grid-cols-[0.96fr_1fr] gap-6 p-6">
                    <div className="project-reel-media min-w-0 self-center will-change-transform">
                      <div className="project-reel-media-inner will-change-transform">
                        <ProjectMedia
                          project={project}
                          variant="hero"
                          className="min-h-[400px] w-full max-w-full rounded-[6px] shadow-none"
                        />
                      </div>
                    </div>
                    <div className="project-reel-copy flex min-w-0 flex-col justify-between py-3 will-change-transform">
                      <div>
                        <p className="project-reel-copy-item technical-label mb-5 text-signal">{visual.technicalSignal}</p>
                        <h3 className="project-reel-copy-item text-5xl font-semibold leading-none text-ink-primary wide:text-6xl">{project.name}</h3>
                        <p className="project-reel-copy-item mt-6 max-w-lg text-lg leading-[1.55] text-ink-secondary">{visual.statement}</p>
                      </div>
                      <div className="grid gap-5">
                        <div className="h-px bg-graphite-border" />
                        <div className="project-reel-copy-item grid grid-cols-2 gap-4 border-b border-graphite-border pb-5">
                          <Meta label="Role" value={project.role} />
                          <Meta label="Status" value={visual.shortStatus} />
                        </div>
                        <p className="project-reel-copy-item text-sm leading-6 text-ink-secondary">{visual.proof}</p>
                        <Link
                          className="project-reel-copy-item group inline-flex w-fit items-center gap-2 rounded-[4px] bg-signal px-4 py-3 text-sm font-medium text-graphite-page transition-transform hover:-translate-y-0.5 active:translate-y-0"
                          href={`/projects/${project.slug}`}
                          tabIndex={activeIndex === index ? 0 : -1}
                        >
                          View case study
                          <ArrowRight aria-hidden="true" className="transition group-hover:translate-x-1" size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5 desktop:hidden">
          {projects.map((project, index) => {
            const visual = projectVisuals[index];
            return (
              <article
                key={project.slug}
                className="project-mobile-card overflow-hidden rounded-[8px] border border-graphite-strong bg-graphite-base shadow-signal-sm"
              >
                <Link className="block p-4" href={`/projects/${project.slug}`}>
                  <div className="project-mobile-media overflow-hidden rounded-[7px]">
                    <ProjectMedia project={project} variant="compact" className="shadow-none" />
                  </div>
                  <div className="project-mobile-copy mt-6">
                    <p className="technical-label mb-3 text-signal">{visual.index} / {project.platform}</p>
                    <h3 className="text-4xl font-semibold leading-none text-ink-primary">{project.name}</h3>
                    <p className="mt-4 text-sm leading-6 text-ink-secondary">{visual.statement}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-graphite-border pt-4">
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-muted">
                        {project.role}
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-ink-primary">
                        Open
                        <ArrowRight aria-hidden="true" size={15} />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
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
