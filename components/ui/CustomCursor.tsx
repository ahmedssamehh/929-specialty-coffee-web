"use client";

import { useEffect, useRef } from "react";

/**
 * Minimal circular cursor that expands over interactive elements.
 * Desktop only — automatically hidden on touch devices via CSS.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Skip on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!cursor.classList.contains("visible")) {
        cursor.classList.add("visible");
      }
    };

    const onLeave = () => {
      cursor.classList.remove("visible");
    };

    const interactiveSelectors =
      "a, button, [role=button], input, textarea, select, .zoom-media, [data-cursor-expand]";

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelectors)) {
        cursor.classList.add("expanded");
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelectors)) {
        cursor.classList.remove("expanded");
      }
    };

    // Smooth follow using requestAnimationFrame
    let raf: number;
    const follow = () => {
      x += (targetX - x) * 0.15;
      y += (targetY - y) * 0.15;
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);

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
