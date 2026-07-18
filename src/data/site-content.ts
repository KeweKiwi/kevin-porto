import { profile } from "@/data/profile";

export const heroContent = {
  meta: [
    { label: "Based in", value: "Indonesia" },
    { label: "Program", value: profile.academy },
    { label: "Focus", value: "iOS + Full-Stack Web" },
  ],
  coordinates: [
    { label: "GameKit / multiplayer", strength: 72 },
    { label: "SwiftData / persistence", strength: 80 },
    { label: "Laravel / production", strength: 90 },
    { label: "Delivery / end-to-end", strength: 100 },
  ],
  positioning: "iOS Developer. Full-Stack Web Developer.",
  summary: profile.intro,
  primaryAction: "View Selected Work",
  contactAction: "Contact Kevin",
} as const;

export const aboutContent = {
  frameLabel: "Engineering profile",
  frameSummary: "iOS and full-stack web developer focused on clear implementation and reliable delivery.",
  sectionLabel: "01 / Profile",
  title: "Hands-on engineering from architecture to delivery.",
  paragraphs: [
    "I build native iOS experiences and production web systems, with a focus on turning product requirements into maintainable software.",
    "In team projects, I lead architecture, review, integration, and debugging while owning key features. Independently, I take web products from client requirements and database design through deployment, training, and maintenance.",
  ],
  focusLabel: "iOS Engineering + Full-Stack Web",
  capabilities: [
    { label: "iOS Engineering", proof: "GameKit, Core Motion, SwiftData, and App Intents" },
    { label: "Production Web", proof: "Live Laravel system for a multi-branch dealership" },
    { label: "Technical Leadership", proof: "Tech Lead on QuackFight and Squeaky" },
    { label: "End-to-End Delivery", proof: "Requirements, deployment, training, and maintenance" },
  ],
  workingRange: [
    { label: "Build", detail: "Native features and full-stack systems" },
    { label: "Lead", detail: "Architecture, review, and integration" },
    { label: "Deliver", detail: "Deployment, handover, and maintenance" },
  ],
} as const;

export const selectedWorkContent = {
  label: "Selected work",
  title: "From native engineering leadership to production delivery.",
  summary:
    "Two iOS team projects and one independently delivered web platform show Kevin's role, technical decisions, and delivery scope in different environments.",
} as const;

export const skillsSectionContent = {
  label: "Technical skills",
  title: "Skills connected to implementation evidence.",
  summary:
    "Every skill is mapped to the project where it was used, Kevin's level of ownership, and the concrete work behind it.",
  groupLabel: "Skill group",
  evidenceLabel: "Project evidence",
  ownershipLabel: "Ownership",
  appliedLabel: "Applied in",
  categoryLabel: "Category",
  relatedProjectsLabel: "Related projects",
  coverageLabel: "Project coverage",
} as const;

export const workApproachContent = {
  label: "How I work",
  title: "Clear decisions, accountable execution.",
  summary:
    "My strongest work sits between product understanding and implementation: defining the flow, making technical tradeoffs visible, integrating the details, and following through on delivery.",
  action: "Discuss an opportunity",
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
  label: "Contact",
  title: "Let's discuss the next engineering challenge.",
  summary:
    "I'm interested in iOS and software engineering roles where I can contribute hands-on, collaborate across disciplines, and take responsibility for delivery.",
  emailAction: "Email Kevin",
  resumeAction: "View Resume",
  githubAction: "View GitHub Profile",
  nativeCaseAction: "Review GameKit Case Study",
  liveWorkAction: "View Live Web Platform",
} as const;
