export type MediaAsset = {
  alt: string;
  src: string | null;
};

export type ProjectGalleryAsset = MediaAsset & {
  detail: string;
  label: string;
};

export const portraitAsset: MediaAsset = {
  alt: "Portrait of Kevin William Faith",
  src: "/assets/profile/kevin-photo.jpg",
};

export const portraitDetailAssets = [
  {
    alt: "Ornate chair detail from Kevin's portrait",
    src: "/assets/profile/kevin-photo.jpg",
  },
  {
    alt: "Shoe, denim, and floor detail from Kevin's portrait",
    src: "/assets/profile/kevin-photo.jpg",
  },
] satisfies readonly MediaAsset[];

export const aboutPortraitAsset: MediaAsset = {
  alt: "Kevin and his team at Apple Developer Academy presenting QuackFight",
  src: "/assets/profile/fotbar.jpeg",
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
    onePager: {
      alt: "QuackFight project one-pager showing gameplay, motion aiming, voice input, technology stack, and team credits",
      src: "/assets/projects/quackfight/one-pager.jpg",
    },
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
      alt: "Rizki Mobil public storefront featuring a Toyota Innova and inventory search",
      src: "/assets/projects/rizki-mobil/rizkimobil1.webp",
    },
    secondary: {
      alt: "Rizki Mobil searchable public vehicle inventory",
      src: "/assets/projects/rizki-mobil/rizkimobil2.webp",
    },
    tertiary: {
      alt: "Rizki Mobil inventory-derived operational dashboard",
      src: "/assets/projects/rizki-mobil/rizkimobil3.webp",
    },
  },
  squeaky: {
    onePager: {
      alt: "Squeaky finance prototype one-pager showing the overview, pet progression, transaction entry, and transaction history interfaces",
      src: "/assets/projects/squeaky/one-pager.png",
    },
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
  lekha: {
    onePager: {
      alt: "Lekha iPadOS learning prototype one-pager showing Balinese-script handwriting practice and mini tests",
      src: "/assets/projects/lekha/one-pager.png",
    },
    hero: {
      alt: "Lekha iPadOS learning prototype one-pager",
      src: "/assets/projects/lekha/one-pager.png",
    },
    secondary: {
      alt: "Lekha guided handwriting and recall-test interfaces",
      src: "/assets/projects/lekha/one-pager.png",
    },
  },
} satisfies Record<string, Record<string, MediaAsset>>;

export const projectGalleryAssets = {
  quackfight: [
    {
      alt: "QuackFight project one-pager showing gameplay, motion aiming, voice input, technology stack, and team credits",
      detail: "A supporting system overview documenting the prototype interactions, implementation stack, and team context.",
      label: "System overview",
      src: "/assets/projects/quackfight/one-pager.jpg",
    },
  ],
  "rizki-mobil": [
    {
      alt: "Rizki Mobil public storefront featuring a Toyota Innova and inventory search",
      detail: "The production homepage connects featured inventory with direct search and vehicle-detail paths.",
      label: "Public storefront",
      src: "/assets/projects/rizki-mobil/rizkimobil1.webp",
    },
    {
      alt: "Rizki Mobil searchable public vehicle inventory",
      detail: "Conditional filtering and AJAX updates let buyers narrow inventory without losing a shareable URL state.",
      label: "Inventory discovery",
      src: "/assets/projects/rizki-mobil/rizkimobil2.webp",
    },
    {
      alt: "Rizki Mobil inventory-derived operational dashboard",
      detail: "Inventory-derived operational views help the client review active stock, price bands, and recorded sales without calling it real-time analytics.",
      label: "Client operations",
      src: "/assets/projects/rizki-mobil/rizkimobil3.webp",
    },
    {
      alt: "Rizki Mobil administration view for stock pricing and sales records",
      detail: "The administration workflow gives the client direct control over vehicle records, listing status, and stock prioritization.",
      label: "Stock management",
      src: "/assets/projects/rizki-mobil/rizkimobil4.webp",
    },
  ],
  squeaky: [
    {
      alt: "Squeaky finance prototype one-pager showing the overview, pet progression, transaction entry, and transaction history interfaces",
      detail: "A supporting product overview showing how the transaction system connects with the broader team-built prototype.",
      label: "Product system",
      src: "/assets/projects/squeaky/one-pager.png",
    },
  ],
  lekha: [
    {
      alt: "Lekha iPadOS learning prototype one-pager showing Balinese-script handwriting practice and mini tests",
      detail: "The current product overview documents progression from guided handwriting practice to short recall exercises.",
      label: "Learning flow overview",
      src: "/assets/projects/lekha/one-pager.png",
    },
  ],
} satisfies Partial<Record<string, readonly ProjectGalleryAsset[]>>;
