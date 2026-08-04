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
  title: "Engineering with ownership, from architecture to delivery.",
  paragraphs: [
    "I'm Kevin William Faith, an Information System for Business student and Apple Developer Academy learner focused on native Apple development and production web systems.",
    "I enjoy taking ownership of implementation, integration, and delivery.",
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
  title: "Tools I use to build and ship.",
  summary:
    "A focused view of the tools behind my native Apple, full-stack web, and delivery work.",
} as const;

export const workApproachContent = {
  label: "How I work",
  rows: [
    {
      question: "When requirements are still unclear",
      answer:
        "I translate the product goal into concrete user flows, technical boundaries, and an implementation plan before adding complexity.",
      evidence: "Rizki Mobil / Product delivery",
    },
    {
      question: "When several features must work together",
      answer:
        "I align architecture, review code, integrate team-owned modules, and debug the system across feature boundaries.",
      evidence: "QuackFight + Squeaky / Tech Lead",
    },
    {
      question: "When software moves beyond the prototype",
      answer:
        "I handle deployment, client training, handover, and maintenance so the system remains usable after launch.",
      evidence: "Rizki Mobil / Live production",
    },
  ],
} as const;

export const contactContent = {
  title: "Have a product to build or a team I could contribute to?",
  summary:
    "I'm interested in native Apple and software engineering opportunities where I can contribute hands-on, collaborate across disciplines, and take responsibility for delivery.",
  emailAction: "Email Kevin",
  resumeAction: "View Resume",
  githubAction: "GitHub",
  linkedinAction: "LinkedIn",
  liveWorkAction: "View Rizki Mobil live",
} as const;
