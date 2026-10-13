"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";

/**
 * Horizontal product rail — drag to pan on desktop, native momentum scroll on
 * touch, arrow keys and buttons for keyboard users. Scroll snapping keeps each
 * product centred so every card lands like its own launch slide.
 */
export function ProductShowcase() {
  const rail = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  const scrollTo = useCallback((i: number) => {
    const el = rail.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({
      left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  /* Track which card is centred */
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const centre = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let bestD = Infinity;
        Array.from(el.children).forEach((c, i) => {
          const card = c as HTMLElement;
          const d = Math.abs(card.offsetLeft + card.clientWidth / 2 - centre);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        });
        setIndex(best);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Pointer drag-to-pan (desktop only — touch already scrolls natively) */
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    const el = rail.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = rail.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };

  const endDrag = () => {
    drag.current.active = false;
  };

  /* Suppress the click that ends a drag, so panning never navigates */
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollTo(Math.min(index + 1, products.length - 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollTo(Math.max(index - 1, 0));
    }
  };

  return (
    <div className="relative">
      <div
        ref={rail}
        role="region"
        aria-label="Velorex products"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        onKeyDown={onKeyDown}
        className="rail px-6 pb-4 sm:px-8 lg:px-12"
        style={{ cursor: "grab" }}
      >
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-between px-6 sm:px-8 lg:px-12">
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose product">
          {products.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={p.name}
              onClick={() => scrollTo(i)}
              className="h-1.5 rounded-full transition-all duration-500 [transition-timing-function:var(--ease-swift)]"
              style={{
                width: i === index ? 32 : 8,
                background: i === index ? p.accent : "var(--color-edge)",
              }}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <RailButton
            label="Previous product"
            disabled={index === 0}
            onClick={() => scrollTo(index - 1)}
            dir="left"
          />
          <RailButton
            label="Next product"
            disabled={index === products.length - 1}
            onClick={() => scrollTo(index + 1)}
            dir="right"
          />
        </div>
      </div>
    </div>
  );
}

function RailButton({
  label,
  onClick,
  disabled,
  dir,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  dir: "left" | "right";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-edge)] bg-white/[0.03] text-ink-dim transition-all duration-300 hover:border-violet/50 hover:bg-white/[0.07] hover:text-ink disabled:pointer-events-none disabled:opacity-30"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path
          d={dir === "right" ? "M2 7h10M8 3l4 4-4 4" : "M12 7H2M6 3 2 7l4 4"}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
