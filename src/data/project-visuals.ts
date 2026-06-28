export type ProjectVisual = {
  slug: string;
  index: string;
  shortStatus: string;
  statement: string;
  technicalSignal: string;
  proof: string;
  markers: string[];
};

export const projectVisuals: ProjectVisual[] = [
  {
    slug: "quackfight",
    index: "01",
    shortStatus: "Playable prototype / External TestFlight",
    statement:
      "A motion-and-voice artillery game where the iPhone becomes part of the controller.",
    technicalSignal: "Core Motion + AVFoundation + GameKit",
    proof:
      "Tilt aiming, voice power, local pass-and-play, and Game Center multiplayer integrated into one state-driven game flow.",
    markers: ["Tilt aim", "Voice power", "GameKit", "Tech Lead"],
  },
  {
    slug: "rizki-mobil",
    index: "02",
    shortStatus: "Live production system",
    statement:
      "A multi-branch used-car dealership platform built from requirements through deployment.",
    technicalSignal: "Laravel + Filament + MySQL",
    proof:
      "Public inventory discovery, admin operations, branch routing, image workflows, deployment, training, and maintenance.",
    markers: ["Live site", "Admin panel", "Inventory", "Client delivery"],
  },
  {
    slug: "squeaky",
    index: "03",
    shortStatus: "Functional prototype",
    statement:
      "A native finance prototype built around faster transaction entry and shared financial state.",
    technicalSignal: "SwiftData + App Intents + MVVM",
    proof:
      "Transaction CRUD, persistence, App Shortcuts, and cross-feature dashboard integration led through a team workflow.",
    markers: ["SwiftData", "Shortcuts", "CRUD", "Tech Lead"],
  },
];

export function getProjectVisual(slug: string) {
  return projectVisuals.find((project) => project.slug === slug);
}
