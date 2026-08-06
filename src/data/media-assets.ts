export type MediaAsset = {
  alt: string;
  src: string | null;
};

export const portraitAsset: MediaAsset = {
  alt: "Portrait of Kevin William Faith",
  src: "/assets/profile/kevin-portrait.webp",
};

export const aboutPortraitAsset: MediaAsset = {
  alt: "Kevin presenting the Squeaky finance prototype with his development team",
  src: "/assets/profile/kevin-candid.webp",
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
    hero: {
      alt: "QuackFight gameplay running on a development monitor",
      src: "/assets/projects/quackfight/gameplay.webp",
    },
    secondary: {
      alt: "QuackFight team development session at Apple Developer Academy",
      src: "/assets/projects/quackfight/team-session.webp",
    },
  },
  "rizki-mobil": {
    hero: {
      alt: "Rizki Mobil production website homepage",
      src: "/assets/projects/rizki-mobil/homepage.webp",
    },
    secondary: {
      alt: "Rizki Mobil vehicle inventory administration",
      src: "/assets/projects/rizki-mobil/inventory-admin.webp",
    },
    tertiary: {
      alt: "Rizki Mobil administration overview",
      src: "/assets/projects/rizki-mobil/admin-overview.webp",
    },
  },
  squeaky: {
    hero: {
      alt: "Squeaky finance prototype interface overview",
      src: "/assets/projects/squeaky/overview.webp",
    },
    secondary: {
      alt: "Squeaky transaction entry interface",
      src: "/assets/projects/squeaky/transaction-entry.webp",
    },
    tertiary: {
      alt: "Squeaky app icon",
      src: "/assets/projects/squeaky/icon.webp",
    },
  },
} satisfies Record<string, Record<string, MediaAsset>>;
