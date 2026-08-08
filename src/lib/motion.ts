export const motionTimings = {
  heroReveal: 0.8,
  sectionReveal: 0.65,
  projectTransition: 0.45,
  counterMobile: 0.9,
  counterDesktop: 1.2,
} as const;

export const motionDurations = {
  feedback: 0.18,
  content: 0.28,
  overlay: 0.36,
} as const;

export const motionEasings = {
  precise: [0.22, 1, 0.36, 1],
} as const;

export const motionSprings = {
  snappy: {
    type: "spring",
    stiffness: 480,
    damping: 34,
    mass: 0.55,
  },
  gentle: {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 0.75,
  },
  layout: {
    type: "spring",
    stiffness: 360,
    damping: 32,
    mass: 0.8,
  },
} as const;

// GSAP owns choreography on outer wrappers; Motion owns interaction on inner controls.
export const interactionScale = {
  button: 0.98,
  card: 0.985,
} as const;

export const prefersReducedMotionQuery = "(prefers-reduced-motion: reduce)";
