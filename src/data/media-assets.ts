export type MediaAsset = {
  alt: string;
  src: string | null;
};

export const portraitAsset: MediaAsset = {
  alt: "Portrait of Kevin William Faith",
  src: "/assets/profile/kevin-portrait.webp",
};

export const architectureAssets = [
  {
    alt: "Architectural louver detail from Kevin's portrait location",
    src: "/assets/profile/architecture-01.webp",
  },
  {
    alt: "Glass and structural detail from Kevin's portrait location",
    src: "/assets/profile/architecture-02.webp",
  },
] satisfies readonly MediaAsset[];

export const projectMediaAssets = {
  quackfight: {
    hero: { alt: "QuackFight gameplay", src: null },
    secondary: { alt: "QuackFight multiplayer session", src: null },
  },
  "rizki-mobil": {
    hero: { alt: "Rizki Mobil public inventory", src: null },
    secondary: { alt: "Rizki Mobil admin operations", src: null },
  },
  squeaky: {
    hero: { alt: "Squeaky dashboard", src: null },
    secondary: { alt: "Squeaky App Shortcut flow", src: null },
  },
} satisfies Record<string, Record<string, MediaAsset>>;
