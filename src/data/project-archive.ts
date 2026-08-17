export type ArchiveProjectImage = {
  alt: string;
  kind: "image";
  objectFit: "contain" | "cover";
  objectPosition: string;
  src: string;
};

export type ArchiveProjectResearchCover = {
  kind: "research-cover";
};

export type ArchiveProject = {
  caseStudyUrl: string | null;
  category: string;
  description: string;
  image: ArchiveProjectImage | ArchiveProjectResearchCover;
  index: string;
  liveUrl: string | null;
  slug: string;
  sourceUrl: string | null;
  technologies: string[];
  testFlightUrl: string | null;
  title: string;
};

export const projectArchiveContent = {
  label: "Project archive",
  title: "More work to explore.",
  summary: "Additional product, research, and experimental work beyond featured case studies.",
} as const;

export const archiveProjects: ArchiveProject[] = [
  {
    caseStudyUrl: "/projects/lekha",
    category: "iPadOS / Learning Product",
    description:
      "A Balinese-script learning prototype that moves students from guided handwriting practice toward independent recall.",
    image: {
      alt: "Lekha iPadOS learning product one-pager showing the Balinese-script learning flow",
      kind: "image",
      objectFit: "contain",
      objectPosition: "center",
      src: "/assets/projects/lekha/one-pager.png",
    },
    index: "01",
    liveUrl: null,
    slug: "lekha",
    sourceUrl: null,
    technologies: ["SwiftUI", "PencilKit", "Product Flow"],
    testFlightUrl: "https://testflight.apple.com/join/ACVvsY9y",
    title: "Lekha",
  },
  {
    caseStudyUrl: null,
    category: "AI / Research",
    description:
      "Evaluating text-only, image-only, and multimodal models for Indonesian online gambling promotion detection under text and image perturbations.",
    image: {
      kind: "research-cover",
    },
    index: "02",
    liveUrl: null,
    slug: "multimodal-robustness-research",
    sourceUrl: null,
    technologies: [
      "PyTorch",
      "E5-large",
      "SigLIP 2",
      "Multimodal Learning",
      "Robustness Evaluation",
    ],
    testFlightUrl: null,
    title: "Multimodal Robustness Research",
  },
];
