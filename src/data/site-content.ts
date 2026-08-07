import { profile } from "@/data/profile";

export const heroContent = {
  greeting: "Hello, I'm Kevin.",
  positioning: "I build native Apple experiences and production web systems.",
  summary:
    "I lead technical delivery across iOS projects and build operational web products for real clients.",
  primaryAction: "View selected work",
  secondaryAction: "GitHub",
} as const;

export const aboutContent = {
  sectionLabel: "About Kevin",
  titleSegments: ["Engineering", "with ownership,", "from architecture", "to delivery."],
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
  title: "Three projects showing how I build, lead, and deliver.",
  summary:
    "Native Apple engineering, technical leadership, and independent production delivery.",
} as const;

export const skillsSectionContent = {
  label: "Technical skills",
  title: "Tools I use to build and ship.",
  summary:
    "Select a capability to see where I applied it, what I owned, and which project demonstrates it.",
} as const;

export const workApproachContent = {
  label: "How I work",
  title: "Turning unclear requirements into shipped software.",
  summary: "How I move from ambiguity to implementation, integration, and delivery.",
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
      question: "When software moves into production",
      answer:
        "I handle deployment, client training, handover, and maintenance so the system remains usable after launch.",
      evidence: "Rizki Mobil / Live production",
    },
  ],
} as const;

export const contactContent = {
  title: "Have a product to build or a team I could contribute to?",
  summary:
    "I'm open to native Apple and software engineering opportunities where I can contribute hands-on, collaborate across disciplines, and take responsibility for delivery.",
  emailAction: "Email Kevin",
  resumeAction: "View resume",
  githubAction: "GitHub",
  linkedinAction: "LinkedIn",
  liveWorkAction: "View Rizki Mobil live",
} as const;
