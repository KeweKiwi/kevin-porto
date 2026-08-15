export type ArchiveProject = {
  name: string;
  platform: string;
  category: string;
  status: string;
  summary: string;
  signal: string;
  image: string;
  imageAlt: string;
  href: string;
  actionLabel: string;
  isExternal?: boolean;
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
    href: "/projects/quackfight",
    actionLabel: "View case study",
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
    href: "https://rizkimobil.com",
    actionLabel: "Open live website",
    isExternal: true,
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
    href: "/projects/squeaky",
    actionLabel: "View case study",
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
    href: "https://testflight.apple.com/join/ACVvsY9y",
    actionLabel: "Open TestFlight",
    isExternal: true,
  },
];
