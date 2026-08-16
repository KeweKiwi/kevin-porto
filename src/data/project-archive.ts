export type ArchiveProjectAction = {
  label: string;
  href?: string;
  kind: "detail" | "source" | "live" | "testflight";
  isExternal?: boolean;
  disabledReason?: string;
};

export type ArchiveProject = {
  name: string;
  platform: string;
  category: string;
  status: string;
  summary: string;
  signal: string;
  image: string;
  imageAlt: string;
  actions: ArchiveProjectAction[];
  imageFit?: "contain" | "cover";
};

export const projectArchiveContent = {
  label: "Project archive",
  title: "All projects, one focused index.",
  summary:
    "Browse the complete project record by platform, delivery status, and implementation focus.",
} as const;

export const archiveProjects: ArchiveProject[] = [
  {
    name: "QuackFight",
    platform: "iOS",
    category: "Native interaction game",
    status: "External TestFlight",
    summary:
      "A turn-based artillery prototype that combines motion aiming, voice input, haptics, and GameKit multiplayer.",
    signal: "Core Motion / AVFoundation / GameKit",
    image: "/assets/projects/quackfight/one-pager.jpg",
    imageAlt: "QuackFight project one-pager",
    actions: [
      {
        label: "Case study",
        href: "/projects/quackfight",
        kind: "detail",
      },
      {
        label: "GitHub source",
        href: "https://github.com/Quack-Fight/QuackFight",
        kind: "source",
        isExternal: true,
      },
    ],
  },
  {
    name: "Rizki Mobil",
    platform: "Web",
    category: "Production dealership platform",
    status: "Live production",
    summary:
      "A multi-branch dealership platform delivered independently from requirements and database design through deployment.",
    signal: "Laravel / Filament / MySQL",
    image: "/assets/projects/rizki-mobil/homepage.webp",
    imageAlt: "Rizki Mobil production website homepage",
    actions: [
      {
        label: "Case study",
        href: "/projects/rizki-mobil",
        kind: "detail",
      },
      {
        label: "Private source",
        kind: "source",
        disabledReason: "This client repository is private.",
      },
      {
        label: "Live website",
        href: "https://rizkimobil.com",
        kind: "live",
        isExternal: true,
      },
    ],
    imageFit: "cover",
  },
  {
    name: "Squeaky!",
    platform: "iOS",
    category: "Personal finance prototype",
    status: "Functional prototype",
    summary:
      "A finance prototype centered on reliable transaction persistence, faster entry, and App Shortcuts.",
    signal: "SwiftData / App Intents / MVVM",
    image: "/assets/projects/squeaky/one-pager.png",
    imageAlt: "Squeaky finance prototype one-pager",
    actions: [
      {
        label: "Case study",
        href: "/projects/squeaky",
        kind: "detail",
      },
      {
        label: "GitHub source",
        href: "https://github.com/KeweKiwi/Squeaky",
        kind: "source",
        isExternal: true,
      },
    ],
  },
  {
    name: "Lekha",
    platform: "iPadOS",
    category: "Balinese script learning prototype",
    status: "External TestFlight",
    summary:
      "An iPad learning prototype for practicing Level 1 Balinese script through guided handwriting exercises and mini tests.",
    signal: "SwiftUI / SwiftData / PencilKit",
    image: "/assets/projects/lekha/one-pager.png",
    imageAlt: "Lekha Balinese script learning project one-pager",
    actions: [
      {
        label: "Case study",
        href: "/projects/lekha",
        kind: "detail",
      },
      {
        label: "Source unavailable",
        kind: "source",
        disabledReason: "No public repository URL is available for this project.",
      },
      {
        label: "TestFlight",
        href: "https://testflight.apple.com/join/ACVvsY9y",
        kind: "testflight",
        isExternal: true,
      },
    ],
  },
];
