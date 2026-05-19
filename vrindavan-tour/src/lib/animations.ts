import type { Variants, Transition } from "framer-motion";

// ─── Shared transition presets ────────────────────────────────────────────────
export const SPRING: Transition = { type: "spring", stiffness: 300, damping: 28 };
export const EASE_OUT: Transition = { duration: 0.55, ease: "easeOut" };
export const EASE_IN_OUT: Transition = { duration: 0.45, ease: "easeInOut" };

// ─── Scroll-reveal variants ───────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: EASE_OUT },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: EASE_OUT },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: EASE_OUT },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: EASE_OUT },
};

// ─── Stagger containers ───────────────────────────────────────────────────────
export function staggerContainer(staggerChildren = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren, delayChildren },
    },
  };
}

// ─── Card hover ───────────────────────────────────────────────────────────────
export const cardHover = {
  rest: { y: 0, boxShadow: "0 4px 16px rgba(212,175,55,0.08)" },
  hover: { y: -6, boxShadow: "0 20px 50px rgba(212,175,55,0.18)" },
};

// ─── Viewport settings ────────────────────────────────────────────────────────
export const VIEWPORT_ONCE = { once: true, margin: "-50px" } as const;
export const VIEWPORT_REPEAT = { once: false, margin: "-50px" } as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────
/** Returns a staggered delay for children rendered in a list */
export function staggerDelay(index: number, base = 0, step = 0.08): number {
  return base + index * step;
}
