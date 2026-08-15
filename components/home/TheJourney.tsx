"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { photos } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    id: "origin",
    number: "01",
    title: "ORIGIN",
    description: "Sourced from high-altitude farms where slow maturation concentrates flavor. Every lot is traceable to the producers who cultivate it.",
    image: photos.beansSack,
  },
  {
    id: "process",
    number: "02",
    title: "PROCESS",
    description: "Washed, natural, or experimental. We select coffees where the processing method elevates the inherent character rather than masking it.",
    image: photos.beansTexture,
  },
  {
    id: "roast",
    number: "03",
    title: "ROAST",
    description: "Our approach maximizes sweetness and complexity. We don't roast to a color; we roast to an expression of the farm's terroir.",
    image: photos.portafilters,
  },
  {
    id: "extract",
    number: "04",
    title: "EXTRACT",
    description: "Precision is our baseline. Water chemistry, particle distribution, and temperature are calibrated to reveal the coffee's full potential.",
    image: photos.espressoPour,
  },
  {
    id: "ritual",
    number: "05",
    title: "RITUAL",
    description: "The final step is yours. Whether a quick morning espresso or a slow weekend pour-over, the ritual is where the journey finds meaning.",
    image: photos.coffeeInBed,
  },
];

export default function TheJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Horizontal scroll for desktop
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      
      if (isDesktop) {
        const sections = sectionsRef.current;
        const totalWidth = (sections.length - 1) * 100;
        
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => `+=${containerRef.current?.offsetWidth || 0 * sections.length}`,
          }
        });
      } else {
        // Vertical fade-ins for mobile
        sectionsRef.current.forEach((section, i) => {
          if (i === 0) return; // Skip first
          
          gsap.fromTo(
            section,
            { opacity: 0.2, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top center+=20%",
                end: "center center",
                scrub: 1,
              }
            }
          );
        });
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative overflow-hidden bg-ink text-cream lg:h-screen lg:flex lg:flex-nowrap"
      aria-label="The Journey from Origin to Cup"
    >
      <div className="absolute top-8 left-6 lg:left-10 z-10">
        <p className="label text-cream/70 mix-blend-difference">FROM ORIGIN TO CUP</p>
      </div>
      
      <div className="absolute top-8 right-6 lg:right-10 z-10">
        <div className="rounded-full border border-cream/20 bg-ink/50 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest text-cream/80">
          Concept
        </div>
      </div>

      {stages.map((stage, i) => (
        <article 
          key={stage.id}
          ref={(el) => { sectionsRef.current[i] = el; }}
          className="relative min-h-[80vh] w-full shrink-0 flex items-center lg:h-screen lg:w-screen py-24 lg:py-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={stage.image.src}
              alt={stage.image.alt}
              fill
              className="object-cover opacity-40 brightness-75 mix-blend-luminosity transition-all duration-1000"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent lg:bg-gradient-to-r lg:from-ink lg:via-ink/60 lg:to-transparent" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end px-6 lg:px-10 lg:justify-center">
            <div className="max-w-2xl">
              <span className="block text-[8rem] font-light leading-none tracking-tighter text-cream/10 lg:text-[14rem] -mb-4 lg:-mb-10 selection:bg-transparent">
                {stage.number}
              </span>
              <h2 className="text-4xl font-light tracking-editorial lg:text-7xl text-cream mb-6">
                {stage.title}
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-cream/80 lg:text-xl font-light">
                {stage.description}
              </p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
