import type { CSSProperties } from "react";

/**
 * Spread onto any element to opt it into the scroll-reveal system driven by
 * <RevealObserver />. `delay` staggers siblings without a wrapper component.
 *
 * Lives outside the "use client" module on purpose: server components need to
 * call it directly, which is impossible across a client boundary.
 */
export const revealProps = (delay = 0) =>
  ({
    "data-reveal": "pending",
    style: { "--reveal-delay": `${delay}ms` } as CSSProperties,
  }) as const;
