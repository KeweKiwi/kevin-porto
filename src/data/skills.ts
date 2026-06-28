export type SkillProject = "QuackFight" | "Rizki Mobil" | "Squeaky";

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
    title: "Native Apple Development",
    summary: "Apple-platform prototypes with native interaction, persistence, shortcuts, and game systems.",
    proof: "QuackFight and Squeaky connect Kevin's Apple-platform work to shipped prototype flows, technical leadership, and cross-feature integration.",
    skills: [
      {
        name: "SwiftUI",
        projects: ["Squeaky"],
        evidence: "Used for the native finance prototype interface and transaction workflows.",
        ownership: "Project implementation",
      },
      {
        name: "UIKit",
        projects: ["QuackFight", "Squeaky"],
        evidence: "Used in native iOS work, including haptics and platform integration surfaces.",
        ownership: "Project implementation",
      },
      {
        name: "SwiftData",
        projects: ["Squeaky"],
        evidence: "Kevin built persistence for transaction creation, editing, deletion, and shared dashboard data.",
        ownership: "Direct ownership",
      },
      {
        name: "App Intents",
        projects: ["Squeaky"],
        evidence: "Kevin implemented App Shortcuts for faster transaction entry into the finance prototype.",
        ownership: "Direct ownership",
      },
      {
        name: "SpriteKit",
        projects: ["QuackFight"],
        evidence: "Used for the turn-based artillery gameplay prototype.",
        ownership: "Project implementation",
      },
      {
        name: "GameplayKit",
        projects: ["QuackFight"],
        evidence: "Supported game architecture and state-driven gameplay flow.",
        ownership: "Project implementation",
      },
      {
        name: "GameKit",
        projects: ["QuackFight"],
        evidence: "Used for Game Center multiplayer with match state, packet routing, and online debugging.",
        ownership: "Direct ownership",
      },
      {
        name: "Core Motion",
        projects: ["QuackFight"],
        evidence: "Kevin owned tilt-to-aim interaction for motion-based gameplay.",
        ownership: "Direct ownership",
      },
      {
        name: "AVFoundation",
        projects: ["QuackFight"],
        evidence: "Kevin owned voice-powered throw power and audio-related interaction work.",
        ownership: "Direct ownership",
      },
      {
        name: "Haptics",
        projects: ["QuackFight"],
        evidence: "Kevin integrated haptic feedback into the gameplay experience.",
        ownership: "Direct ownership",
      },
    ],
  },
  {
    id: "web",
    title: "Web and Full-Stack Development",
    summary: "Production web delivery from requirements through public inventory, admin workflows, deployment, and maintenance.",
    proof: "Rizki Mobil is the strongest proof point: a live client platform Kevin delivered independently for real dealership operations.",
    skills: [
      {
        name: "Laravel",
        projects: ["Rizki Mobil"],
        evidence: "Kevin built the backend for public inventory, admin workflows, inquiries, and branch logic.",
        ownership: "Production delivery",
      },
      {
        name: "PHP",
        projects: ["Rizki Mobil"],
        evidence: "Used across the Laravel application and production system implementation.",
        ownership: "Production delivery",
      },
      {
        name: "Blade",
        projects: ["Rizki Mobil"],
        evidence: "Used for public-facing dealership pages and inventory browsing views.",
        ownership: "Production delivery",
      },
      {
        name: "Tailwind CSS",
        projects: ["Rizki Mobil"],
        evidence: "Used for responsive styling across the production dealership website.",
        ownership: "Production delivery",
      },
      {
        name: "JavaScript",
        projects: ["Rizki Mobil"],
        evidence: "Used for dynamic filtering and request flows in the inventory experience.",
        ownership: "Production delivery",
      },
      {
        name: "MySQL",
        projects: ["Rizki Mobil"],
        evidence: "Kevin designed relational data structures for inventory, branches, inquiries, and admin operations.",
        ownership: "Direct ownership",
      },
      {
        name: "Filament",
        projects: ["Rizki Mobil"],
        evidence: "Kevin built the administration system for vehicle CRUD and operational workflows.",
        ownership: "Production delivery",
      },
      {
        name: "AJAX filtering",
        projects: ["Rizki Mobil"],
        evidence: "Inventory filters update dynamically with bookmarkable URL state.",
        ownership: "Production delivery",
      },
      {
        name: "Authentication and authorization",
        projects: ["Rizki Mobil"],
        evidence: "Guest, registered user, and admin access levels are part of the live system.",
        ownership: "Production delivery",
      },
      {
        name: "Responsive web development",
        projects: ["Rizki Mobil"],
        evidence: "The public website and admin-adjacent flows were tested across responsive layouts.",
        ownership: "Production delivery",
      },
    ],
  },
  {
    id: "delivery",
    title: "Engineering and Delivery",
    summary: "Architecture, code review, integration, debugging, deployment, training, and maintenance across team and client work.",
    proof: "Kevin's strongest differentiator is ownership: he has led technical workflows and independently delivered a live client platform.",
    skills: [
      {
        name: "MVVM",
        projects: ["Squeaky"],
        evidence: "Used in the native finance prototype architecture.",
        ownership: "Team leadership",
      },
      {
        name: "State-machine architecture",
        projects: ["QuackFight"],
        evidence: "Aim, power, throw resolution, and turn handoff were organized as a state-driven gameplay flow.",
        ownership: "Team leadership",
      },
      {
        name: "Relational database design",
        projects: ["Rizki Mobil"],
        evidence: "Kevin designed the database for inventory, branches, inquiries, and admin operations.",
        ownership: "Direct ownership",
      },
      {
        name: "Git and feature-branch workflows",
        projects: ["QuackFight", "Squeaky"],
        evidence: "Kevin handled branch merging and feature integration in team projects.",
        ownership: "Team leadership",
      },
      {
        name: "Code review",
        projects: ["QuackFight", "Squeaky"],
        evidence: "Kevin reviewed code and supported teammates as Tech Lead.",
        ownership: "Team leadership",
      },
      {
        name: "Feature integration",
        projects: ["QuackFight", "Squeaky"],
        evidence: "Kevin connected independently built features into coherent gameplay and finance flows.",
        ownership: "Team leadership",
      },
      {
        name: "Debugging",
        projects: ["QuackFight", "Squeaky"],
        evidence: "Kevin supported online state-flow, multiplayer synchronization, merge, and app-flow debugging.",
        ownership: "Team leadership",
      },
      {
        name: "Technical leadership",
        projects: ["QuackFight", "Squeaky"],
        evidence: "Kevin served as Tech Lead on two Apple Developer Academy projects.",
        ownership: "Team leadership",
      },
      {
        name: "Production deployment",
        projects: ["Rizki Mobil"],
        evidence: "Kevin deployed the live dealership platform.",
        ownership: "Production delivery",
      },
      {
        name: "Client training",
        projects: ["Rizki Mobil"],
        evidence: "Kevin trained client stakeholders during handover.",
        ownership: "Production delivery",
      },
      {
        name: "Production maintenance",
        projects: ["Rizki Mobil"],
        evidence: "Rizki Mobil has an ongoing maintenance agreement.",
        ownership: "Production delivery",
      },
    ],
  },
];

export const evidenceCounters = [
  {
    value: 3,
    label: "Selected projects",
    detail: "game, finance app, dealership platform",
  },
  {
    value: 2,
    label: "Tech Lead projects",
    detail: "QuackFight and Squeaky",
  },
  {
    value: 1,
    label: "Live client platform",
    detail: "Rizki Mobil production system",
  },
  {
    value: 100,
    prefix: "~",
    label: "Exhibition players",
    detail: "QuackFight booth build",
  },
] as const;
