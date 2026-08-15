export type AssetSlot = {
  label: string;
  recommendedSize: string;
  status: "missing" | "available";
};

export type ProjectCaseHighlight = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  name: string;
  order: number;
  featured: boolean;
  platform: string;
  category: string;
  context: string;
  period: string;
  duration: string;
  status: string;
  role: string;
  preview: string;
  evidenceSignal: string;
  primaryCta: {
    label: string;
    href: string;
    isExternal?: boolean;
  };
  repoUrl: string | null;
  productSummary: string;
  caseSummary: string;
  caseHighlights: ProjectCaseHighlight[];
  caseFocus: string[];
  team: string[];
  kevinOwned: string[];
  collaborative: string[];
  otherContributors?: string[];
  technologies: string[];
  architecture: string[];
  challenges: string[];
  testing: string[];
  outcome: string;
  limitations: string[];
  futureImprovements: string[];
  assetSlots: AssetSlot[];
};

export const projects: Project[] = [
  {
    slug: "quackfight",
    name: "QuackFight",
    order: 1,
    featured: true,
    platform: "iOS",
    category: "Turn-based artillery game",
    context: "Apple Developer Academy game challenge",
    period: "27 April 2026 - 27 May 2026",
    duration: "Approximately one month",
    status: "Completed playable prototype; External TestFlight; not released on the App Store",
    role: "Tech Lead",
    preview:
      "A turn-based iOS artillery prototype using Core Motion for aiming, AVFoundation for throw power, and GameKit for online multiplayer.",
    evidenceSignal:
      "Tech Lead ownership across sensor interactions, haptics, GameKit message routing, feature integration, and multiplayer state-flow debugging.",
    primaryCta: {
      label: "View case study",
      href: "/projects/quackfight",
    },
    repoUrl: "https://github.com/Quack-Fight/QuackFight",
    productSummary:
      "QuackFight explores how native iPhone sensors and system frameworks can make the device part of a multiplayer game controller.",
    caseSummary:
      "A turn-based iOS game that combines motion input, voice input, haptics, and local or Game Center multiplayer in one state-driven flow.",
    caseHighlights: [
      {
        label: "Role",
        value: "I led architecture decisions, code review, feature integration, and multiplayer debugging as Tech Lead.",
      },
      {
        label: "Direct contribution",
        value: "I built tilt aiming, voice-based throw power, haptics, local pass-and-play, and GameKit message routing.",
      },
      {
        label: "Outcome",
        value: "Our team delivered a playable External TestFlight build that approximately 100 exhibition visitors played at the booth.",
      },
    ],
    caseFocus: [
      "I modeled the turn lifecycle as explicit aim, power, throw-resolution, and handoff states to keep local and online play aligned.",
      "I separated low-latency aim and power updates from reliable locked-turn events in GameKit message routing.",
      "I integrated Core Motion, AVFoundation, and haptics into one interaction model while accounting for sensor sensitivity and background noise.",
    ],
    team: [
      "Justin - Project Manager",
      "Kevin - Tech Lead",
      "Theo - Designer",
      "Nathan - Developer",
      "Sharon - Developer",
    ],
    kevinOwned: [
      "Task allocation",
      "Architecture decisions with Justin",
      "Code review",
      "Branch merging",
      "Debugging support",
      "Feature integration",
      "Maintaining consistent offline and online gameplay flow",
      "Gyroscope / tilt-to-aim",
      "Voice-powered throw system",
      "Sound effects integration",
      "Haptic feedback",
      "Local multiplayer",
      "Part of the implementation and integration of online multiplayer",
      "Multiplayer packet routing",
      "Player-role assignment",
      "Online state-flow debugging",
    ],
    collaborative: [
      "Skill system",
      "In-game animation",
      "Game architecture",
      "Feature integration",
      "Gameplay debugging",
      "Multiplayer synchronization debugging",
    ],
    technologies: [
      "SpriteKit",
      "GameplayKit",
      "GameKit",
      "Core Motion",
      "AVFoundation",
      "UIKit haptics",
    ],
    architecture: [
      "AimState -> PowerState -> ThrowResolveState -> TurnHandoffState -> AimState",
      "PlayerEntity",
      "HealthComponent",
      "SkillComponent",
      "GameManager for player list, active player, next player, turn changes, and match reset",
      "Limited skill system with 2x damage, heal, and fixed-hit rocket",
      "GameKit online multiplayer using GKMatch, GKMatchmakerViewController, GKMatchDelegate, and encoded MultiplayerMessage",
      "Unreliable packets for live aim and live power",
      "Reliable packets for locked aim, locked power, skill activation, and rematch request",
    ],
    challenges: [
      "Gyroscope sensitivity",
      "Background noise affecting voice input",
      "Turn-state desynchronization",
      "Health-bar desynchronization",
      "Incomplete tutorial",
      "Limited compatibility testing",
      "Limited level variety",
      "Network reliability not yet ready for an App Store release",
    ],
    testing: [
      "Internal bug testing",
      "Usability testing",
      "Multiplayer testing",
      "Device testing",
      "Exhibited at a booth",
      "Approximately 100 exhibition visitors played the available build",
      "Feedback gathered through observation and direct comments",
    ],
    outcome:
      "QuackFight reached a complete playable prototype with local pass-and-play and Game Center multiplayer. Its core interaction model, motion-based aiming and voice-controlled throw power, was successfully implemented and demonstrated to approximately 100 exhibition visitors. The project still lacked a complete tutorial, broader compatibility testing, and the network reliability needed for an App Store-ready release.",
    limitations: [
      "Do not state that 100 users installed the TestFlight build",
      "Do not claim fully deterministic physics",
      "Do not invent the exact root cause or exact fix for synchronization issues",
      "Do not claim Kevin personally created every gameplay or visual feature",
    ],
    futureImprovements: [
      "Complete tutorial",
      "Broader compatibility testing",
      "Network reliability improvements",
      "More level variety",
    ],
    assetSlots: [
      { label: "QuackFight gameplay hero", recommendedSize: "1600x1000", status: "missing" },
      { label: "Sensor interaction capture", recommendedSize: "1200x900", status: "missing" },
      { label: "Two-device multiplayer evidence", recommendedSize: "1600x1000", status: "missing" },
      { label: "Skills gameplay screenshot", recommendedSize: "1200x900", status: "missing" },
      { label: "Exhibition evidence photo", recommendedSize: "1600x1000", status: "missing" },
    ],
  },
  {
    slug: "rizki-mobil",
    name: "Rizki Mobil",
    order: 2,
    featured: true,
    platform: "Web",
    category: "Used-car dealership platform",
    context: "Individual freelance project for a real multi-branch dealership",
    period: "Not specified",
    duration: "Approximately six weeks",
    status: "Completed and live; ongoing maintenance agreement",
    role: "Independent full-stack developer",
    preview:
      "An independently delivered Laravel platform for public inventory, dealership administration, branch workflows, and ongoing production maintenance.",
    evidenceSignal:
      "End-to-end ownership from requirements and relational database design through deployment, client training, and maintenance.",
    primaryCta: {
      label: "View live website",
      href: "https://rizkimobil.com",
      isExternal: true,
    },
    repoUrl: null,
    productSummary:
      "The platform gives the dealership a managed inventory system, public vehicle discovery, branch-specific contact paths, and an administration workflow.",
    caseSummary:
      "I independently took this live dealership platform from client requirements and database design through deployment, training, and maintenance.",
    caseHighlights: [
      {
        label: "Role",
        value: "I owned product definition, implementation, launch, and ongoing support as the independent full-stack developer.",
      },
      {
        label: "System",
        value: "I built public inventory discovery, vehicle details, image workflows, Filament administration, inquiries, and branch routing.",
      },
      {
        label: "Outcome",
        value: "I launched a live client-managed platform, trained stakeholders, and continue to support it under a maintenance agreement.",
      },
    ],
    caseFocus: [
      "I translated dealership operations into clear data models and workflows for vehicles, branches, inquiries, users, and media.",
      "I built conditional Eloquent queries with AJAX updates, pagination, and URL state so filtered inventory remains shareable.",
      "I designed Filament workflows for client-managed vehicle data and images, then completed deployment, training, and handover.",
    ],
    team: ["Kevin - Independent full-stack developer"],
    kevinOwned: [
      "Client discussion",
      "Requirement translation",
      "Feature definition",
      "UI direction",
      "Database design",
      "Frontend implementation",
      "Backend implementation",
      "Administration system",
      "Testing",
      "Deployment",
      "Training",
      "Maintenance",
      "Laravel backend",
      "Blade frontend",
      "Tailwind styling",
      "MySQL database",
      "Eloquent relationships",
      "Filament admin panel",
      "Authentication and authorization",
      "Vehicle CRUD",
      "Image management",
      "Inventory filtering",
      "Saved cars",
      "Inquiry system",
      "Multi-branch logic",
      "Operational dashboard",
      "Client handover",
    ],
    collaborative: [
      "Client review before launch",
      "Minor revisions based on client feedback",
      "Operational training with client stakeholders",
    ],
    technologies: [
      "Laravel 12",
      "Filament v4",
      "Tailwind CSS 4",
      "Blade",
      "Vite 7",
      "MySQL",
      "Axios",
      "PHP 8.2+",
      "Eloquent ORM",
      "PHPUnit",
      "Laravel Pint",
    ],
    architecture: [
      "Public buyer flow: Homepage -> Search or Featured Cars -> Inventory -> Filter and Sort -> Vehicle Details -> WhatsApp",
      "Conditional database queries for inventory filters",
      "AJAX filtering with dynamic vehicle-grid replacement",
      "AJAX pagination",
      "Debounce on selected numeric input",
      "Browser URL updated with pushState",
      "Bookmarkable and shareable filter state",
      "One users table with an is_admin boolean",
      "Guest, registered user, and admin access levels",
      "Centralized inquiry inbox visible through the admin panel",
      "Branch-specific WhatsApp routing with main dealership fallback",
    ],
    challenges: [
      "Translating a general dealership reference into concrete product structure and requirements",
      "Supporting multi-branch inventory workflows",
      "Designing image upload, crop, ordering, primary image, fallback, deletion, and replacement flows",
      "Keeping dashboard language accurate because it is derived from inventory data, not real-time analytics",
      "Avoiding overclaiming confidential usage numbers",
    ],
    testing: [
      "Manual public navigation testing",
      "Vehicle CRUD testing",
      "Image management testing",
      "Filtering and sorting testing",
      "Authentication and authorization testing",
      "Saved vehicles testing",
      "Inquiry submission testing",
      "Credit estimation testing",
      "Responsive layout testing",
      "Admin workflow testing",
      "Client reviewed the complete system before launch and requested only minor revisions",
    ],
    outcome:
      "Rizki Mobil is a live production website supporting client-managed inventory, multi-branch operations, inventory-derived dashboard views, inquiries, and ongoing maintenance. Usage numbers are confidential.",
    limitations: [
      "Do not display the source-code repository publicly",
      "Do not describe the dashboard as real-time analytics",
      "Do not describe estimated sold inventory value as audited revenue",
      "Do not call the credit simulator an accurate or official financing calculator",
      "Do not repeat fictional statistics or testimonials from the live website",
    ],
    futureImprovements: [
      "Performance optimization",
      "Automated testing",
      "Cloud image storage",
    ],
    assetSlots: [
      { label: "Rizki Mobil homepage screenshot", recommendedSize: "1600x1000", status: "missing" },
      { label: "Inventory filters screenshot", recommendedSize: "1600x1000", status: "missing" },
      { label: "Vehicle detail screenshot", recommendedSize: "1600x1000", status: "missing" },
      { label: "Credit estimator screenshot", recommendedSize: "1200x900", status: "missing" },
      { label: "Admin dashboard screenshot", recommendedSize: "1600x1000", status: "missing" },
      { label: "Image management screenshot", recommendedSize: "1600x1000", status: "missing" },
    ],
  },
  {
    slug: "squeaky",
    name: "Squeaky!",
    order: 3,
    featured: true,
    platform: "iOS",
    category: "Personal finance / habit-building app",
    context: "Apple Developer Academy - Help Yourself Challenge",
    period: "13 March 2026 - 14 April 2026",
    duration: "Approximately one month",
    status: "Completed functional prototype; not distributed on TestFlight; not released on the App Store",
    role: "Tech Lead",
    preview:
      "A native finance prototype where SwiftData-backed transactions and App Shortcuts feed shared budgeting and dashboard workflows.",
    evidenceSignal:
      "Tech Lead ownership across transaction CRUD, SwiftData persistence, App Intents, code review, and cross-feature data integration.",
    primaryCta: {
      label: "View case study",
      href: "/projects/squeaky",
    },
    repoUrl: "https://github.com/KeweKiwi/Squeaky",
    productSummary:
      "Squeaky explores a faster, less intimidating transaction-entry experience for young adults managing personal finances.",
    caseSummary:
      "A native finance prototype where transaction CRUD, SwiftData persistence, App Shortcuts, and team-owned features share one data foundation.",
    caseHighlights: [
      {
        label: "Role",
        value: "I led technical decisions, code review, feature integration, and the core transaction system as Tech Lead.",
      },
      {
        label: "Direct contribution",
        value: "I built transaction CRUD, SwiftData persistence, App Intents, App Shortcuts, and shared transaction-data integration.",
      },
      {
        label: "Outcome",
        value: "Our team delivered a functional prototype with the main transaction and shortcut flows working end to end in team and mentor demos.",
      },
    ],
    caseFocus: [
      "I modeled transaction data in SwiftData so budget, dashboard, recap, and related modules could use one source of truth.",
      "I implemented App Intents and App Shortcuts as a native entry point for creating transactions outside the main app flow.",
      "I defined integration boundaries and reviewed team-owned modules so independently built features worked in one prototype.",
    ],
    team: [
      "Gaby - Project Manager",
      "Kevin - Tech Lead",
      "Abel - Designer",
      "Farhan - Developer",
      "Elvern - Developer",
    ],
    kevinOwned: [
      "Task allocation",
      "Architecture",
      "Technology selection",
      "Code review",
      "Branch merging",
      "Debugging",
      "Helping developers",
      "Technical decisions",
      "Cross-feature integration",
      "Expense and income tracking",
      "Transaction list",
      "Create transaction",
      "Edit transaction",
      "Delete transaction",
      "SwiftData persistence",
      "App Intents",
      "App Shortcuts",
      "Transaction-data integration with the dashboard and related modules",
    ],
    collaborative: [
      "Dashboard integration",
      "Product direction",
      "Gamification concept",
      "Research synthesis",
      "UI iteration",
    ],
    otherContributors: [
      "Farhan implemented saving goals, expense category chart, and monthly budget",
      "Elvern implemented the pet system and daily challenges",
    ],
    technologies: ["SwiftUI", "UIKit", "SwiftData", "App Intents", "MVVM"],
    architecture: [
      "Data models: Category, Challenge, MonthlyBudget, Pet, SavingGoal, Transaction, UserStats",
      "Transaction flow: Choose income or expense -> Select category -> Enter amount -> Add description -> Choose date -> Save with SwiftData -> Update list and dashboard",
      "Full transaction CRUD",
      "App Shortcut flow: Invoke shortcut -> Choose income or expense -> Enter amount -> Select category -> Add description -> Choose date -> Save transaction",
      "Transaction data supports monthly budget, expense category chart, monthly recap, cortisol meter, saving goals, and dashboard",
      "Virtual pet responds to daily-challenge completion, avoiding overspending, and saving-goal progress",
      "Cortisol meter increases visually as budget usage approaches the monthly limit",
    ],
    challenges: [
      "Cross-feature data consistency",
      "Integration of independently developed modules",
      "Merge conflicts",
      "No TestFlight distribution",
      "No App Store release",
      "Limited target-user testing",
      "Accessibility not mature",
      "Additional app polish required",
      "Gamification not longitudinally validated",
    ],
    testing: [
      "Team member testing",
      "Other learner review",
      "Mentor review",
      "Complete feature demos",
      "Transaction-flow testing",
      "App Shortcut testing",
      "Dashboard and navigation review",
      "Internal demos and mentor reviews did not reveal major blockers in the main transaction flow",
    ],
    outcome:
      "Squeaky reached a functional prototype that combined transaction management, SwiftData persistence, App Shortcuts, budgeting, financial summaries, and a behavior-linked virtual pet system. My direct work covered the transaction system, persistence layer, App Intent flow, and technical integration review. We demonstrated the app to peers and mentors, with broader user testing, accessibility work, visual polish, and public distribution preparation still needed.",
    limitations: [
      "Do not claim that gamification was proven to improve long-term habits",
      "Do not invent a percentage improvement for App Shortcuts",
      "Do not attribute every dashboard or pet feature personally to Kevin",
      "Do not state that receipt scanning or AI receipt scanning has been implemented",
    ],
    futureImprovements: [
      "App polish and accessibility",
      "Receipt scanning to reduce manual input",
      "More varied and customizable pets",
    ],
    assetSlots: [
      { label: "Squeaky dashboard screenshot", recommendedSize: "1200x900", status: "missing" },
      { label: "Transaction flow recording or screenshots", recommendedSize: "1200x900", status: "missing" },
      { label: "App Shortcut screenshot", recommendedSize: "1200x900", status: "missing" },
      { label: "Saving goals screenshot", recommendedSize: "1200x900", status: "missing" },
      { label: "Pet progression screenshot", recommendedSize: "1200x900", status: "missing" },
      { label: "CBL or research artifact", recommendedSize: "1600x1000", status: "missing" },
    ],
  },
  {
    slug: "lekha",
    name: "Lekha",
    order: 4,
    featured: false,
    platform: "iPadOS",
    category: "Balinese-script learning prototype",
    context: "Team-based iPadOS learning project",
    period: "Not specified",
    duration: "Not specified",
    status: "Available through External TestFlight",
    role: "Development team member",
    preview:
      "An iPadOS learning prototype for practicing Level 1 Balinese script through guided handwriting exercises and short recall tests.",
    evidenceSignal:
      "A five-person team delivered a structured iPad learning flow combining progressive handwriting guidance, recall exercises, and External TestFlight distribution.",
    primaryCta: {
      label: "Open TestFlight",
      href: "https://testflight.apple.com/join/ACVvsY9y",
      isExternal: true,
    },
    repoUrl: null,
    productSummary:
      "Lekha helps students in Bali practice and recall Level 1 Wreastra Balinese script through a progressive roadmap built for iPad.",
    caseSummary:
      "A team-built iPadOS prototype that combines guided handwriting practice, unguided recall, and short assessment formats in one learning sequence.",
    caseHighlights: [
      {
        label: "Role",
        value: "I contributed as a development team member within a five-person product team.",
      },
      {
        label: "Learning flow",
        value: "The product moves from stroke guidance and dashed tracing to unguided writing, flash cards, and mistake-recognition exercises.",
      },
      {
        label: "Outcome",
        value: "The team delivered an iPadOS prototype that is available to external testers through TestFlight.",
      },
    ],
    caseFocus: [
      "The learning roadmap breaks Level 1 Wreastra practice into smaller character sets so students can build familiarity progressively.",
      "Writing practice reduces assistance across full-stroke guidance, dashed tracing, start-and-end markers, and unguided input.",
      "Mini tests reinforce recall through unguided writing, flash cards, and spot-the-mistake exercises.",
    ],
    team: [
      "Josanda - Team member",
      "Kevin - Team member",
      "Tiffany - Team member",
      "Joycelyn - Team member",
      "Rizal - Team member",
    ],
    kevinOwned: ["Development contribution within the team implementation"],
    collaborative: [
      "Progressive learning roadmap",
      "Guided handwriting practice",
      "Mini-test experience",
      "External TestFlight delivery",
    ],
    technologies: [
      "SwiftUI",
      "SwiftData",
      "PencilKit",
      "AVKit",
      "AVFoundation",
      "UIKit",
      "Swift Testing",
    ],
    architecture: [
      "Progressive roadmap -> Writing practice -> Mini test",
      "Writing support levels: full-stroke guide -> dashed line -> start-and-end markers -> no guide",
      "Assessment formats: unguided writing, flash cards, and spot the mistake",
    ],
    challenges: [
      "Helping students understand writing rules for Level 1 Wreastra characters",
      "Supporting memorization across an extensive character set",
      "Moving learners from guided tracing toward independent recall",
    ],
    testing: [
      "External TestFlight distribution",
      "Swift Testing included in the project technology stack",
    ],
    outcome:
      "Lekha reached an External TestFlight prototype with a progressive Level 1 Wreastra roadmap, multiple handwriting-assistance levels, and three short assessment formats.",
    limitations: [
      "Individual feature ownership is not publicly documented beyond team membership",
      "No public source-code repository was found",
      "Do not claim learning outcomes that were not measured",
    ],
    futureImprovements: [
      "Broader validation with target learners",
      "Accessibility review for handwriting and audio interactions",
      "Additional Balinese-script learning levels",
    ],
    assetSlots: [
      { label: "Lekha handwriting practice", recommendedSize: "1600x1000", status: "missing" },
      { label: "Lekha mini-test flow", recommendedSize: "1600x1000", status: "missing" },
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
