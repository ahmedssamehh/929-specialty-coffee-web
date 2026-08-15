import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Proposal | 929 Specialty Coffee",
  description: "A proposal for the next chapter of 929 Specialty Coffee.",
};

const capabilities = [
  {
    num: "01",
    title: "IMMERSIVE HERO",
    description: "Scroll-driven espresso extraction designed as the signature interaction.",
  },
  {
    num: "02",
    title: "COFFEE STORYTELLING",
    description: "A digital journey from origin to final cup.",
  },
  {
    num: "03",
    title: "ORIGIN EXPLORER",
    description: "Interactive coffee discovery.",
  },
  {
    num: "04",
    title: "THE 929 SPACES",
    description: "A premium location experience.",
  },
  {
    num: "05",
    title: "THE 929 BARISTA",
    description: "An interactive specialty coffee game.",
  },
  {
    num: "06",
    title: "BUILD YOUR PERFECT CUP",
    description: "Personalized coffee discovery.",
  },
  {
    num: "07",
    title: "929 CLUB",
    description: "A future loyalty ecosystem.",
  },
  {
    num: "08",
    title: "DIGITAL COMMERCE",
    description: "Ordering and gifting concepts.",
  },
];

const phases = [
  {
    num: "PHASE 01",
    title: "DIGITAL FOUNDATION",
    desc: "Real 929 assets, Real content, Brand integration, SEO",
  },
  {
    num: "PHASE 02",
    title: "DIGITAL EXPERIENCE",
    desc: "Real locations, Real menu, Real origins, Real journal",
  },
  {
    num: "PHASE 03",
    title: "COMMERCE",
    desc: "Online ordering, Reservations, Gift cards, Payments",
  },
  {
    num: "PHASE 04",
    title: "929 CLUB",
    desc: "Loyalty, Membership, Rewards, Personalization",
  },
  {
    num: "PHASE 05",
    title: "GROWTH",
    desc: "Analytics, CRM, Campaign pages, Digital activations",
  },
];

export default function ProposalPage() {
  return (
    <main className="min-h-screen bg-cream pb-32 pt-32 lg:pt-40">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
        <div className="mb-12 flex justify-center reveal">
          <Logo size="lg" />
        </div>
        <p className="label mb-6 text-sage-2 tracking-widest uppercase reveal" data-reveal-delay="100">
          DIGITAL EXPERIENCE CONCEPT
        </p>
        <h1 className="text-4xl lg:text-6xl text-ink font-light tracking-tight leading-[1.1] mb-8 reveal" data-reveal-delay="200">
          A proposal for the next chapter of 929 Specialty Coffee.
        </h1>
      </section>

      {/* The Idea */}
      <section className="mx-auto max-w-3xl px-6 lg:px-10 mt-32 text-center">
        <p className="label mb-6 text-graphite tracking-widest uppercase reveal">
          THE IDEA
        </p>
        <h2 className="text-3xl lg:text-5xl text-ink font-light leading-snug reveal" data-reveal-delay="100">
          "What if 929's digital presence felt as intentional as the coffee itself?"
        </h2>
      </section>

      {/* What I Built */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 mt-40">
        <div className="text-center mb-20 reveal">
          <p className="label text-graphite tracking-widest uppercase">
            WHAT I BUILT
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap, i) => (
            <div key={cap.num} className="border border-line p-8 bg-cream-2/50 transition-colors hover:bg-cream-2 reveal" data-reveal-delay={i * 100}>
              <span className="block text-sage-2 label mb-4">{cap.num}</span>
              <h3 className="text-xl text-ink mb-3">{cap.title}</h3>
              <p className="text-graphite text-sm leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What Comes Next */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 mt-40">
        <div className="text-center mb-20 reveal">
          <p className="label text-graphite tracking-widest uppercase">
            WHAT COMES NEXT
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {phases.map((phase, i) => (
            <div key={phase.num} className="bg-ink p-8 text-cream reveal" data-reveal-delay={i * 100}>
              <span className="block text-sage-2 text-xs tracking-widest mb-4">
                {phase.num}
              </span>
              <h3 className="text-lg mb-3">{phase.title}</h3>
              <p className="text-cream/70 text-sm leading-relaxed">
                {phase.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="mx-auto max-w-3xl px-6 lg:px-10 mt-40 text-center border-t border-line pt-20 reveal">
        <div className="mb-8 flex justify-center opacity-50">
          <Logo />
        </div>
        <p className="label mb-4 text-sage-2 tracking-widest uppercase">
          DIGITAL EXPERIENCE CONCEPT · 2026
        </p>
        <p className="text-sm text-graphite/60 max-w-md mx-auto">
          This website is a speculative digital experience concept. It does not represent an official 929 product or service.
        </p>
      </section>
    </main>
  );
}
