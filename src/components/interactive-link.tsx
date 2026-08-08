"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ComponentProps } from "react";
import { interactionScale, motionSprings } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const MotionLink = motion.create(Link);

const interactionVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1, y: -2 },
  tap: { scale: interactionScale.button, y: 0 },
};

const subtleInteractionVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1, y: -1 },
  tap: { scale: 0.99, y: 0 },
};

type InteractionLevel = "medium" | "subtle";

type InteractiveLinkProps = ComponentProps<typeof MotionLink> & {
  interactionLevel?: InteractionLevel;
};

type InteractiveAnchorProps = ComponentProps<typeof motion.a> & {
  interactionLevel?: InteractionLevel;
};

export function InteractiveLink({
  interactionLevel = "medium",
  ...props
}: InteractiveLinkProps) {
  const reducedMotion = usePrefersReducedMotion();
  const variants = interactionLevel === "subtle" ? subtleInteractionVariants : interactionVariants;

  return (
    <MotionLink
      {...props}
      animate="rest"
      initial="rest"
      transition={motionSprings.snappy}
      variants={variants}
      whileHover={reducedMotion ? undefined : "hover"}
      whileTap={reducedMotion ? undefined : "tap"}
    />
  );
}

export function InteractiveAnchor({
  interactionLevel = "medium",
  ...props
}: InteractiveAnchorProps) {
  const reducedMotion = usePrefersReducedMotion();
  const variants = interactionLevel === "subtle" ? subtleInteractionVariants : interactionVariants;

  return (
    <motion.a
      {...props}
      animate="rest"
      initial="rest"
      transition={motionSprings.snappy}
      variants={variants}
      whileHover={reducedMotion ? undefined : "hover"}
      whileTap={reducedMotion ? undefined : "tap"}
    />
  );
}

export function MotionArrow({
  children,
  direction = "right",
}: {
  children: React.ReactNode;
  direction?: "left" | "right" | "up-right";
}) {
  return (
    <motion.span
      aria-hidden="true"
      className="inline-flex shrink-0"
      custom={direction}
      variants={{
        rest: { x: 0, y: 0 },
        hover: (arrowDirection: "left" | "right" | "up-right") => ({
          x: arrowDirection === "left" ? -4 : 4,
          y: arrowDirection === "up-right" ? -3 : 0,
        }),
        tap: (arrowDirection: "left" | "right" | "up-right") => ({
          x: arrowDirection === "left" ? -1 : 1,
          y: 0,
        }),
      }}
    >
      {children}
    </motion.span>
  );
}
