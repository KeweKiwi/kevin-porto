export type AssetSlot = {
  label: string;
  recommendedSize: string;
  status: "missing" | "available";
};

export type Project = {
  slug: string;
  name: string;
  order: number;
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
  productSummary: string;
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
    platform: "iOS",
    category: "Turn-based artillery game",
    context: "Apple Developer Academy game challenge",
    period: "27 April 2026 - 27 May 2026",
    duration: "Approximately one month",
    status: "Completed playable prototype; External TestFlight; not released on the App Store",
    role: "Tech Lead",
    preview:
      "A casual competitive artillery game where tilt controls, voice-powered throw power, local pass-and-play, and Game Center multiplayer turn the iPhone into part of the controller.",
    evidenceSignal:
      "Unusual native interaction, multiplayer engineering, state-machine gameplay architecture, technical leadership, and external testing evidence.",
    primaryCta: {
      label: "View case study",
      href: "/projects/quackfight",
    },
    productSummary:
      "QuackFight was designed to feel interactive, immersive, humorous when played together, challenging, and different from ordinary touch controls.",
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
    platform: "Web",
    category: "Used-car dealership platform",
    context: "Individual freelance project for a real multi-branch dealership",
    period: "Not specified",
    duration: "Approximately six weeks",
    status: "Completed and live; ongoing maintenance agreement",
    role: "Independent full-stack developer",
    preview:
      "A live multi-branch dealership platform covering public inventory discovery, administration, operational reporting, deployment, training, and ongoing maintenance.",
    evidenceSignal:
      "Independent production delivery, Laravel and Filament system ownership, database design, client handover, and live operations.",
    primaryCta: {
      label: "View live website",
      href: "https://rizkimobil.com",
      isExternal: true,
    },
    productSummary:
      "The client moved from primarily displaying inventory through Instagram to a managed website with public browsing, WhatsApp conversion paths, and an administration workflow.",
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
      "Rizki Mobil is a live production website with client-managed inventory, multi-branch operations, an operational dashboard, real users, real inquiries, and an ongoing maintenance agreement. Usage numbers are confidential.",
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
    platform: "iOS",
    category: "Personal finance / habit-building app",
    context: "Apple Developer Academy - Help Yourself Challenge",
    period: "13 March 2026 - 14 April 2026",
    duration: "Approximately one month",
    status: "Completed functional prototype; not distributed on TestFlight; not released on the App Store",
    role: "Tech Lead",
    preview:
      "A native finance prototype combining transaction CRUD, SwiftData persistence, App Shortcuts, budgeting modules, financial summaries, and a behavior-linked virtual pet system.",
    evidenceSignal:
      "Native Apple ecosystem integration, App Intents, SwiftData, product thinking, Tech Lead workflow, and cross-feature data integration.",
    primaryCta: {
      label: "View case study",
      href: "/projects/squeaky",
    },
    productSummary:
      "Squeaky was designed to help young adults manage money in a faster, lighter, and less intimidating way.",
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
      "Squeaky reached a complete functional prototype that combined end-to-end transaction management, SwiftData persistence, App Shortcuts, budgeting, financial summaries, and a behavior-linked virtual pet system. Kevin led the technical workflow and personally built the transaction system, persistence layer, and App Intent flow. The app was demonstrated to peers and mentors and refined through feedback, but still required broader user testing, stronger accessibility, additional visual polish, and public distribution preparation.",
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
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
