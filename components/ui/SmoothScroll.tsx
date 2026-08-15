"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Advanced Lenis tuning for heavy, buttery momentum
    const lenis = new Lenis({
      duration: 1.5, // Slower, heavier feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease out
      smoothWheel: true,
      wheelMultiplier: 0.9, // Slightly dampened wheel input for elegance
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Advanced Pointer-Event Throttling:
    // This dramatically boosts frame rates by preventing the browser 
    // from painting hover states during fast scrolling.
    let scrollTimeout: NodeJS.Timeout;
    lenis.on('scroll', () => {
      document.body.classList.add('is-scrolling');
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 150); // Remove class 150ms after scroll stops
    });

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      clearTimeout(scrollTimeout);
      document.body.classList.remove('is-scrolling');
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
