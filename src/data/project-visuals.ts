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
    index: "01",
    shortStatus: "Playable prototype / External TestFlight",
    statement:
      "A turn-based iOS artillery prototype where motion, voice, haptics, and multiplayer make the iPhone part of the controller.",
    technicalSignal: "Core Motion + AVFoundation + GameKit",
    proof:
      "As Tech Lead, Kevin owned tilt aiming, voice-based throw power, haptics, GameKit message routing, and multiplayer state-flow debugging.",
    markers: ["Core Motion", "AVFoundation", "GameKit", "Tech Lead"],
  },
  {
    slug: "rizki-mobil",
    index: "02",
    shortStatus: "Live production system",
    statement:
      "A live multi-branch dealership platform independently delivered from requirements and database design through deployment.",
    technicalSignal: "Laravel + Filament + MySQL",
    proof:
      "Kevin owned the public inventory experience, Filament administration, branch workflows, deployment, client training, and ongoing maintenance.",
    markers: ["Laravel", "Filament", "MySQL", "Live production"],
  },
  {
    slug: "squeaky",
    index: "03",
    shortStatus: "Functional prototype",
    statement:
      "A native finance prototype built around reliable transaction data and faster entry through App Shortcuts.",
    technicalSignal: "SwiftData + App Intents + MVVM",
    proof:
      "As Tech Lead, Kevin owned transaction CRUD, SwiftData persistence, App Intents, and integration of transaction data across team-owned features.",
    markers: ["SwiftData", "App Intents", "MVVM", "Tech Lead"],
  },
];

export function getProjectVisual(slug: string) {
  return projectVisuals.find((project) => project.slug === slug);
}
