"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * A single global IntersectionObserver that drives every scroll reveal on the
 * site. Sections stay server components and simply declare `data-reveal`
 * (see `revealProps` below) — no per-element client component, no animation
 * library, one observer for the whole page.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal="pending"]'),
    );

    if (reduce.matches) {
      targets.forEach((el) => el.setAttribute("data-reveal", "in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal", "in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}

// `revealProps` lives in @/lib/reveal — server components must be able to call
// it directly, which is not possible from inside this "use client" module.
