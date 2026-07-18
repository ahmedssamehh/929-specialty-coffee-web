"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene, { SCENE } from "./HeroScene";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-driven hero.
 *
 * The section is pinned and a single scrubbed timeline maps scroll progress
 * to the espresso extraction: drops → stream → liquid fill → crema →
 * ripples → steam → machine stops. The stream endpoint is computed from the
 * live liquid level so it always terminates exactly on the surface.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const q = gsap.utils.selector(section);
    const { spoutTipY, surfaceEmptyY, surfaceFullY, streamX, streamWidth } =
      SCENE;

    const liquid = q<SVGRectElement>("[data-el=liquid]")[0];
    const crema = q<SVGEllipseElement>("[data-el=crema]")[0];
    const stream = q<SVGRectElement>("[data-el=stream]")[0];
    const streamGlow = q<SVGRectElement>("[data-el=stream-glow]")[0];
    if (!liquid || !stream) return;

    const state = { level: 0, streamOn: 0 };

    /** Sync liquid rect, crema and stream endpoint to the current level. */
    const sync = () => {
      const surfaceY =
        surfaceEmptyY - state.level * (surfaceEmptyY - surfaceFullY);
      liquid.setAttribute("y", String(surfaceY));
      liquid.setAttribute("height", String(surfaceEmptyY + 40 - surfaceY));
      if (crema) crema.setAttribute("cy", String(surfaceY));
      // Stream terminates exactly on the liquid surface.
      const h = Math.max(0, (surfaceY - spoutTipY) * state.streamOn);
      stream.setAttribute("y", String(spoutTipY));
      stream.setAttribute("height", String(h));
      stream.setAttribute("x", String(streamX - streamWidth / 2));
      if (streamGlow) {
        streamGlow.setAttribute("y", String(spoutTipY));
        streamGlow.setAttribute("height", String(h));
      }
    };
    sync();

    const ctx = gsap.context(() => {
      gsap.set(q("[data-el=steam] path"), { opacity: 0 });
      gsap.set(q("[data-el=crema]"), { opacity: 0 });
      gsap.set(q("[data-el=ripple]"), { opacity: 0 });
      gsap.set(q("[data-el=drop]"), { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=260%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      // ——— 0–10%: first espresso drops ———
      q("[data-el=drop]").forEach((drop, i) => {
        tl.fromTo(
          drop,
          { opacity: 0, y: 0 },
          { opacity: 1, y: surfaceEmptyY - spoutTipY - 14, duration: 4 },
          2 + i * 2.2
        ).to(drop, { opacity: 0, duration: 1 }, 6 + i * 2.2);
      });

      // ——— 10–20%: stream forms, continuous extraction ———
      tl.to(state, { streamOn: 1, duration: 6, onUpdate: sync }, 10);

      // ——— 20–40%: extraction running, a first puddle gathers ———
      tl.to(state, { level: 0.07, duration: 20, onUpdate: sync }, 20);

      // ——— 40–80%: the cup fills ———
      tl.to(state, { level: 0.86, duration: 40, onUpdate: sync }, 40);

      // ——— 55–70%: crema develops, reflections richen ———
      tl.to(q("[data-el=crema]"), { opacity: 1, duration: 15 }, 55);
      tl.to(q("[data-el=reflection]"), { opacity: 0.5, duration: 15 }, 55);

      // ——— 78–90%: almost full, surface ripples ———
      q("[data-el=ripple]").forEach((r, i) => {
        tl.fromTo(
          r,
          { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" },
          { opacity: 0.45, scale: 1, duration: 4 },
          78 + i * 3
        ).to(r, { opacity: 0, scale: 1.25, duration: 4 }, 82 + i * 3);
      });

      // ——— 80–95%: top-up to full ———
      tl.to(state, { level: 1, duration: 15, onUpdate: sync }, 80);

      // ——— 90–100%: steam rises ———
      q("[data-el=steam] path").forEach((p, i) => {
        tl.to(p, { opacity: 0.7, duration: 6 }, 88 + i * 2);
        tl.fromTo(p, { y: 10 }, { y: -14, duration: 12 }, 88 + i * 2);
      });

      // ——— 95–100%: machine stops, headline drifts upward ———
      tl.to(state, { streamOn: 0, duration: 4, onUpdate: sync }, 95);
      tl.to(q("[data-el=machine-light]"), { opacity: 0.15, duration: 3 }, 95);
      if (copyRef.current) {
        tl.to(
          copyRef.current,
          { y: -70, opacity: 0, duration: 8, ease: "power1.in" },
          92
        );
      }
    }, section);

    // The deferred initial refresh can be missed (fonts/hydration timing),
    // leaving the trigger without a computed scroll range — nudge it.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="929 Specialty Coffee — introduction"
      className="relative flex min-h-dvh items-center overflow-hidden bg-cream"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-4 px-6 pt-24 pb-8 lg:grid-cols-2 lg:gap-6 lg:px-10 lg:pt-20">
        {/* Left — editorial copy */}
        <div ref={copyRef} className="relative z-10 max-w-xl">
          <p className="label reveal text-sage-3">
            Nine Two Nine — Specialty Coffee
          </p>
          <h1 className="reveal mt-4 text-4xl font-light leading-[1.05] tracking-editorial text-ink md:text-7xl lg:mt-6" data-reveal-delay="120">
            Precision in
            <br />
            every pour.
          </h1>
          <p className="reveal mt-5 max-w-md text-sm leading-relaxed text-graphite md:text-lg lg:mt-8" data-reveal-delay="240">
            Rare origins, exacting extraction, quiet rooms. 929 is coffee
            practiced as a craft — measured in grams, seconds and stillness.
          </p>
          <div className="reveal mt-6 flex flex-wrap items-center gap-4 lg:mt-10" data-reveal-delay="360">
            <Link
              href="/menu"
              className="label inline-flex items-center rounded-full bg-ink px-8 py-4 text-cream transition-colors duration-300 hover:bg-sage-2"
            >
              Explore the menu
            </Link>
            <Link
              href="/origins"
              className="label inline-flex items-center rounded-full border border-ink px-8 py-4 text-ink transition-all duration-300 hover:border-sage-2 hover:text-sage-2"
            >
              Our origins
            </Link>
          </div>
          <p className="reveal mt-14 hidden items-center gap-3 text-xs text-graphite lg:flex" data-reveal-delay="480">
            <span className="inline-block h-10 w-px animate-pulse bg-sage" />
            Scroll to extract
          </p>
        </div>

        {/* Right — the scene */}
        <div className="relative flex items-center justify-center">
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
