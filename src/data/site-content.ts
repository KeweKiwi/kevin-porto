import { profile } from "@/data/profile";

export const heroContent = {
  greeting: "Hello, I'm Kevin.",
  positioning: "I build native Apple experiences and production web systems.",
  summary:
    "I lead technical delivery across iOS projects and build operational web products for real clients.",
  primaryAction: "View Selected Work",
  secondaryAction: "GitHub",
} as const;

export const aboutContent = {
  sectionLabel: "About Kevin",
  titleLines: ["Engineering with", "ownership, from", "architecture to", "delivery."],
  paragraphs: [
    "I'm Kevin William Faith, an Information System for Business student and Apple Developer Academy learner focused on native Apple development and production web systems.",
    "My strongest work sits where implementation meets ownership: shaping architecture, integrating features, debugging difficult flows, and carrying software through delivery.",
  ],
  focusLabel: "Native Apple + Production Web",
  capabilities: [
    { label: "Build", proof: "Native features and production web systems." },
    { label: "Lead", proof: "Architecture, review, integration, and debugging." },
    { label: "Deliver", proof: "Deployment, handover, training, and maintenance." },
  ],
} as const;

export const selectedWorkContent = {
  label: "Selected work",
  summary:
    "Three projects across native Apple engineering, technical leadership, and independent production delivery.",
} as const;

export const skillsSectionContent = {
  label: "Technical skills",
  title: "Skills connected to implementation evidence.",
  summary:
    "Select a capability to see where it was applied, what Kevin owned, and which project demonstrates it.",
} as const;

export const workApproachContent = {
  label: "How I work",
  title: "Clear decisions from requirement to delivery.",
  summary:
    "A compact view of how Kevin turns ambiguity, integration work, and production responsibility into shipped outcomes.",
  rows: [
    {
      question: "When requirements are unclear",
      answer:
        "I translate the product goal into concrete user flows, technical boundaries, and an implementation plan before adding complexity.",
      evidence: "Rizki Mobil / Product delivery",
    },
    {
      question: "When features must work together",
      answer:
        "I align architecture, review code, integrate team-owned modules, and debug the system across feature boundaries.",
      evidence: "QuackFight + Squeaky / Tech Lead",
    },
    {
      question: "When software moves to production",
      answer:
        "I handle deployment, client training, handover, and maintenance so the system remains usable after launch.",
      evidence: "Rizki Mobil / Live production",
    },
  ],
} as const;

export const contactContent = {
  titleLines: ["Looking for an", "engineer who can", "own the work", "through delivery?"],
  summary:
    "I'm open to native Apple and software engineering opportunities where I can contribute hands-on, collaborate across disciplines, and take responsibility for shipping reliable work.",
  emailAction: "Email Kevin",
  githubPrimaryAction: "View GitHub profile",
  resumeAction: "View Resume",
  githubAction: "GitHub",
  linkedinAction: "LinkedIn",
  liveWorkAction: "View Rizki Mobil live",
} as const;
