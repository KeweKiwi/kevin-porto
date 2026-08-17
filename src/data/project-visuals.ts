export type ProjectVisual = {
  slug: string;
  index: string;
  shortStatus: string;
  statement: string;
  technicalSignal: string;
  proof: string;
  markers: string[];
};

export const projectArchiveContent = {
  label: "Project index",
  title: "Compare role, scope, and technical decisions.",
  summary:
    "A concise comparison of each project's platform, contribution, delivery status, and implementation evidence.",
  recordLabel: "Portfolio index",
  recordNoun: "projects",
  sequenceLabel: "Project sequence",
  evidenceLabel: "Implementation evidence",
  markerLabel: "Key technologies",
  openLabel: "View project details",
  previousLabel: "Previous project",
  nextLabel: "Next project",
  metaLabels: {
    platform: "Platform",
    role: "Role",
    status: "Status",
    duration: "Duration",
  },
} as const;

export const projectVisuals: ProjectVisual[] = [
  {
    slug: "quackfight",
    index: "02",
    shortStatus: "Playable prototype / External TestFlight",
    statement:
      "A turn-based iOS artillery game where device tilt controls aiming and voice input controls throw power.",
    technicalSignal: "Core Motion + AVFoundation + GameKit",
    proof: "Gameplay and development evidence from the playable prototype and Academy team session.",
    markers: ["Core Motion", "AVFoundation", "GameKit", "Tech Lead"],
  },
  {
    slug: "rizki-mobil",
    index: "01",
    shortStatus: "Live production system",
    statement:
      "A live multi-branch dealership platform independently delivered from requirements and database design through deployment.",
    technicalSignal: "Laravel + Filament + MySQL",
    proof: "Production evidence spanning the public storefront, inventory discovery, and client operations.",
    markers: ["Laravel", "Filament", "MySQL", "Live production"],
  },
  {
    slug: "squeaky",
    index: "03",
    shortStatus: "Functional prototype",
    statement:
      "A native finance prototype built around reliable transaction data and faster entry through App Shortcuts.",
    technicalSignal: "SwiftData + App Intents + MVVM",
    proof: "Prototype evidence covering the finance overview, transaction entry, and the broader product system.",
    markers: ["SwiftData", "App Intents", "MVVM", "Tech Lead"],
  },
  {
    slug: "lekha",
    index: "04",
    shortStatus: "External TestFlight",
    statement:
      "An iPadOS learning prototype that turns Level 1 Balinese-script practice into a guided handwriting roadmap and short recall tests.",
    technicalSignal: "SwiftUI + SwiftData + PencilKit",
    proof: "A product overview documenting guided handwriting, reduced assistance, and recall exercises.",
    markers: ["SwiftUI", "SwiftData", "PencilKit", "iPadOS"],
  },
];

export function getProjectVisual(slug: string) {
  return projectVisuals.find((project) => project.slug === slug);
}
