"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Observes .reveal elements and fades them in as they enter the viewport.
 *
 * `will-change` is applied just before an element animates and dropped once
 * the transition ends — keeping it in the stylesheet would give every reveal
 * on the page a permanent compositor layer (60+ of them on the homepage),
 * which is a real memory cost on phones.
 */
export default function RevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!els.length) return;

    // With reduced motion the CSS already renders these in their final state;
    // skip the observer entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const settle = (el: HTMLElement) => {
      el.style.willChange = "auto";
      el.style.transitionDelay = "";
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);

          const delay = Number(el.dataset.revealDelay ?? 0);
          el.style.willChange = "opacity, transform, filter";
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-visible");

          el.addEventListener("transitionend", () => settle(el), { once: true });
          // Belt-and-braces: if the transition never fires (element hidden,
          // interrupted, etc.) the layer still gets released.
          window.setTimeout(() => settle(el), delay + 1400);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
