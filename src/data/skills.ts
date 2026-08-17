export type SkillProject = "Kevin Portfolio" | "QuackFight" | "Rizki Mobil" | "Squeaky";

export type TechnicalSkill = {
  name: string;
  projects: SkillProject[];
  evidence: string;
  ownership: "Direct ownership" | "Team leadership" | "Production delivery" | "Project implementation";
};

export type SkillGroup = {
  id: "native" | "web" | "delivery";
  title: string;
  summary: string;
  proof: string;
  skills: TechnicalSkill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "native",
    title: "iOS and Apple Platform Engineering",
    summary: "Native product work spanning interaction, persistence, system integrations, and multiplayer game systems.",
    proof: "QuackFight and Squeaky show my hands-on Apple framework experience, technical leadership, and cross-feature integration.",
    skills: [
      {
        name: "SwiftUI",
        projects: ["Squeaky"],
        evidence: "I used SwiftUI to build the native finance interface and transaction workflows in Squeaky.",
        ownership: "Project implementation",
      },
      {
        name: "UIKit",
        projects: ["QuackFight", "Squeaky"],
        evidence: "I used UIKit for native platform integration, including haptic feedback and supporting interaction surfaces.",
        ownership: "Project implementation",
      },
      {
        name: "SwiftData",
        projects: ["Squeaky"],
        evidence: "I built SwiftData persistence for transaction creation, editing, deletion, and shared dashboard data in Squeaky.",
        ownership: "Direct ownership",
      },
      {
        name: "App Intents",
        projects: ["Squeaky"],
        evidence: "I built an App Shortcut flow that reduced the navigation required to record transactions in Squeaky.",
        ownership: "Direct ownership",
      },
      {
        name: "SpriteKit",
        projects: ["QuackFight"],
        evidence: "I worked with SpriteKit to deliver the turn-based artillery gameplay prototype in QuackFight.",
        ownership: "Project implementation",
      },
      {
        name: "GameplayKit",
        projects: ["QuackFight"],
        evidence: "I used GameplayKit to support QuackFight's state-driven gameplay architecture.",
        ownership: "Project implementation",
      },
      {
        name: "GameKit",
        projects: ["QuackFight"],
        evidence: "I contributed to Game Center multiplayer integration, including message routing, player-role assignment, and online state debugging.",
        ownership: "Direct ownership",
      },
      {
        name: "Core Motion",
        projects: ["QuackFight"],
        evidence: "I used Core Motion to turn device tilt into the aiming input for QuackFight.",
        ownership: "Direct ownership",
      },
      {
        name: "AVFoundation",
        projects: ["QuackFight"],
        evidence: "I used AVFoundation to turn voice input into throw power for QuackFight.",
        ownership: "Direct ownership",
      },
      {
        name: "Haptics",
        projects: ["QuackFight"],
        evidence: "I integrated haptic feedback into QuackFight's gameplay experience.",
        ownership: "Direct ownership",
      },
    ],
  },
  {
    id: "web",
    title: "Full-Stack Web Development",
    summary: "Production delivery across requirements, data modeling, public interfaces, admin workflows, deployment, and maintenance.",
    proof: "Rizki Mobil demonstrates my end-to-end ownership of a live platform for real multi-branch dealership operations.",
    skills: [
      {
        name: "Laravel",
        projects: ["Rizki Mobil"],
        evidence: "I used Laravel to build Rizki Mobil's inventory, authentication, filtering, branch logic, and operational workflows.",
        ownership: "Production delivery",
      },
      {
        name: "PHP",
        projects: ["Rizki Mobil"],
        evidence: "I used PHP across Rizki Mobil's Laravel application and production workflows.",
        ownership: "Production delivery",
      },
      {
        name: "Blade",
        projects: ["Rizki Mobil"],
        evidence: "I used Blade to build the public dealership pages and inventory browsing views.",
        ownership: "Production delivery",
      },
      {
        name: "Next.js",
        projects: ["Kevin Portfolio"],
        evidence: "I built this portfolio with the Next.js App Router, static project routes, metadata, and optimized media delivery.",
        ownership: "Direct ownership",
      },
      {
        name: "React",
        projects: ["Kevin Portfolio"],
        evidence: "I used React to build the portfolio's reusable project, skills, navigation, and evidence interfaces.",
        ownership: "Direct ownership",
      },
      {
        name: "TypeScript",
        projects: ["Kevin Portfolio"],
        evidence: "I used TypeScript to model project, media, skill, and navigation data across this portfolio.",
        ownership: "Direct ownership",
      },
      {
        name: "Tailwind CSS",
        projects: ["Rizki Mobil", "Kevin Portfolio"],
        evidence: "I used Tailwind CSS for responsive production interfaces in Rizki Mobil and this portfolio's design system.",
        ownership: "Direct ownership",
      },
      {
        name: "JavaScript",
        projects: ["Rizki Mobil"],
        evidence: "I used JavaScript for dynamic filtering and request flows in the inventory experience.",
        ownership: "Production delivery",
      },
      {
        name: "MySQL",
        projects: ["Rizki Mobil"],
        evidence: "I designed the MySQL data model for inventory, branches, inquiries, and administration.",
        ownership: "Direct ownership",
      },
      {
        name: "Filament",
        projects: ["Rizki Mobil"],
        evidence: "I built the Filament administration system for vehicle CRUD and operational workflows.",
        ownership: "Production delivery",
      },
      {
        name: "AJAX filtering",
        projects: ["Rizki Mobil"],
        evidence: "I built dynamic inventory filters with bookmarkable URL state and AJAX updates.",
        ownership: "Production delivery",
      },
      {
        name: "Authentication and authorization",
        projects: ["Rizki Mobil"],
        evidence: "I implemented guest, registered-user, and administrator access levels for the live system.",
        ownership: "Production delivery",
      },
      {
        name: "Responsive web development",
        projects: ["Rizki Mobil"],
        evidence: "I tested the public website and operational workflows across responsive layouts.",
        ownership: "Production delivery",
      },
    ],
  },
  {
    id: "delivery",
    title: "Technical Leadership and Delivery",
    summary: "Architecture, review, integration, debugging, deployment, handover, and maintenance across team and client work.",
    proof: "I led technical workflows on two iOS projects and independently delivered a live client platform from requirements through maintenance.",
    skills: [
      {
        name: "MVVM",
        projects: ["Squeaky"],
        evidence: "I used MVVM to structure the native finance prototype and its shared data flows.",
        ownership: "Team leadership",
      },
      {
        name: "State-machine architecture",
        projects: ["QuackFight"],
        evidence: "I helped organize aim, power, throw resolution, and turn handoff as a state-driven gameplay flow.",
        ownership: "Team leadership",
      },
      {
        name: "Relational database design",
        projects: ["Rizki Mobil"],
        evidence: "I designed the relational database for inventory, branches, inquiries, and admin operations.",
        ownership: "Direct ownership",
      },
      {
        name: "Git and feature-branch workflows",
        projects: ["QuackFight", "Squeaky"],
        evidence: "I handled branch merging and feature integration across both team projects.",
        ownership: "Team leadership",
      },
      {
        name: "Code review",
        projects: ["QuackFight", "Squeaky"],
        evidence: "I reviewed code and supported teammates as Tech Lead on QuackFight and Squeaky.",
        ownership: "Team leadership",
      },
      {
        name: "Feature integration",
        projects: ["QuackFight", "Squeaky"],
        evidence: "I connected independently built features into coherent gameplay and finance flows.",
        ownership: "Team leadership",
      },
      {
        name: "Debugging",
        projects: ["QuackFight", "Squeaky"],
        evidence: "I supported online state flow, multiplayer synchronization, merge, and app-flow debugging.",
        ownership: "Team leadership",
      },
      {
        name: "Technical leadership",
        projects: ["QuackFight", "Squeaky"],
        evidence: "I served as Tech Lead on two Apple Developer Academy projects.",
        ownership: "Team leadership",
      },
      {
        name: "Production deployment",
        projects: ["Rizki Mobil"],
        evidence: "I deployed the live Rizki Mobil platform and completed its production handover.",
        ownership: "Production delivery",
      },
      {
        name: "Client training",
        projects: ["Rizki Mobil"],
        evidence: "I trained client stakeholders to manage inventory and operational workflows.",
        ownership: "Production delivery",
      },
      {
        name: "Production maintenance",
        projects: ["Rizki Mobil"],
        evidence: "I continue to maintain Rizki Mobil under an ongoing support agreement.",
        ownership: "Production delivery",
      },
    ],
  },
];

export const evidenceCounters = [
  {
    value: 1,
    label: "Live production platform",
    detail: "Rizki Mobil — deployed and client-managed",
  },
  {
    value: 3,
    label: "Selected projects",
    detail: "live web, native game, finance prototype",
  },
  {
    value: 2,
    label: "Tech Lead projects",
    detail: "QuackFight and Squeaky",
  },
  {
    value: 100,
    prefix: "~",
    label: "QuackFight exhibition visitors",
    detail: "Played the booth build",
  },
] as const;
