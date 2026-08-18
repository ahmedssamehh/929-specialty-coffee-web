"use client";

import { useEffect, useRef } from "react";

/**
 * Minimal circular cursor that expands over interactive elements.
 * Desktop only — skipped entirely on touch devices.
 *
 * Positioned with `transform` (compositor-only) rather than `left`/`top`,
 * and the rAF loop parks itself once the cursor has caught up to the pointer
 * so an idle page costs nothing.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // No pointer to follow, and no reason to pay for the listeners.
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let raf = 0;
    let running = false;

    const draw = () => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const follow = () => {
      const dx = targetX - x;
      const dy = targetY - y;
      x += dx * 0.15;
      y += dy * 0.15;
      draw();

      // Within half a pixel of the target — stop burning frames until the
      // pointer moves again.
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        x = targetX;
        y = targetY;
        draw();
        running = false;
        return;
      }
      raf = requestAnimationFrame(follow);
    };

    const kick = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(follow);
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!cursor.classList.contains("visible")) {
        // Jump to the pointer on first sight instead of gliding in from 0,0.
        x = targetX;
        y = targetY;
        draw();
        cursor.classList.add("visible");
      }
      kick();
    };

    const onLeave = () => cursor.classList.remove("visible");

    const interactiveSelectors =
      "a, button, [role=button], input, textarea, select, .zoom-media, [data-cursor-expand]";

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest?.(interactiveSelectors)) {
        cursor.classList.add("expanded");
      }
    };

    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest?.(interactiveSelectors)) {
        cursor.classList.remove("expanded");
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}
