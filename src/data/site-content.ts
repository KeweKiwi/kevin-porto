import { profile } from "@/data/profile";

export const heroContent = {
  greeting: "Hello, I'm Kevin.",
  positioning: "I build production web systems and native Apple products.",
  summary:
    "I take ownership across native product engineering and full-stack delivery, from system integration to production support.",
  primaryAction: "View selected work",
  secondaryAction: "GitHub",
} as const;

export const aboutContent = {
  sectionLabel: "About Kevin",
  titleSegments: ["Engineering", "with ownership,", "from implementation", "to delivery."],
  paragraphs: [
    "I'm Kevin William Faith, a student in Information System for Business at Ciputra University and an Apple Developer Academy learner. I enjoy working on products where I can stay close to both the technical decisions and the people using the result.",
    "My strongest work sits where implementation meets ownership: making technical decisions, integrating features, debugging difficult flows, and carrying software through delivery.",
  ],
  focusLabel: "Production Web + Native Apple",
  capabilities: [
    { label: "Build", proof: "Product features and production web systems." },
    { label: "Integrate", proof: "Technical decisions, review, integration, and debugging." },
    { label: "Deliver", proof: "Deployment, handover, training, and maintenance." },
  ],
} as const;

export const selectedWorkContent = {
  label: "Selected work",
  title: "Production ownership, technical leadership, and systems integration.",
  summary: "Three projects spanning live client delivery, technical leadership, and native product engineering.",
} as const;

export const skillsSectionContent = {
  label: "Technical skills",
  title: "Tools I use to build and ship.",
  summary: "A practical view of the tools and engineering patterns behind my work.",
} as const;

export const workApproachContent = {
  label: "How I work",
  title: "Turning unclear requirements into shipped software.",
  rows: [
    {
      label: "Clarify",
      question: "When requirements are unclear",
      answer:
        "I translate the product goal into concrete user flows, technical boundaries, and an implementation plan before adding complexity.",
      evidence: "Rizki Mobil / Product delivery",
    },
    {
      label: "Integrate",
      question: "When features must work together",
      answer:
        "I align technical boundaries, review code, integrate team-owned modules, and debug the system across feature boundaries.",
      evidence: "QuackFight + Squeaky / Tech Lead",
    },
    {
      label: "Ship",
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
    "My work spans full-stack systems, native Apple products, and hands-on technical delivery.",
  emailAction: "Email Kevin",
  resumeAction: "View Résumé",
  githubAction: "GitHub",
  linkedinAction: "LinkedIn",
  liveWorkAction: "Rizki Mobil live",
} as const;
