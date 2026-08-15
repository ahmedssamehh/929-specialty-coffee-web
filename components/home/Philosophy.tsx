"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";

const pillars = [
  {
    key: "origin",
    title: "Origin",
    body: "Every cup begins as a seed, thousands of kilometres away. We buy from six farms we visit every year, and we publish what we pay.",
    icon: "01",
  },
  {
    key: "craft",
    title: "Craft",
    body: "Roasted in small batches. Measured to the tenth of a gram. Dialed in every hour. Craft is attention repeated until it disappears.",
    icon: "02",
  },
  {
    key: "ritual",
    title: "Ritual",
    body: "A pour-over takes four minutes. Those four minutes are the ritual — the pause between one thing and the next.",
    icon: "03",
  },
  {
    key: "space",
    title: "Space",
    body: "Warm stone, soft light, acoustic ceilings. Every 929 room is designed so a conversation never competes with a grinder.",
    icon: "04",
  },
];

export default function Philosophy() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="bg-cream-2 py-32 md:py-44" aria-label="The 929 Philosophy">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="label reveal text-sage-3">The 929 Philosophy</p>
          <h2
            className="reveal mt-6 text-4xl font-light leading-[1.08] tracking-editorial text-ink md:text-6xl lg:text-7xl"
            data-reveal-delay="100"
          >
            Coffee is not meant
            <br />
            to be rushed.
          </h2>
          <p
            className="reveal mx-auto mt-8 max-w-lg text-lg leading-relaxed text-graphite md:text-xl"
            data-reveal-delay="200"
          >
            It begins with the origin.
            <br />
            It continues with the craft.
            <br />
            It finds its meaning in the cup.
          </p>
        </div>

        <div className="mt-24 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <article
              key={p.key}
              className={`reveal group cursor-default bg-cream p-8 transition-all duration-700 md:p-10 ${
                active === p.key ? "bg-cream-2" : "hover:bg-cream-2"
              }`}
              data-reveal-delay={i * 120}
              onMouseEnter={() => setActive(p.key)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="label text-sage">{p.icon}</span>
              <h3 className="mt-6 text-2xl font-light tracking-editorial text-ink">
                {p.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-graphite">
                {p.body}
              </p>
              <span
                className={`mt-8 block h-px bg-sage transition-all duration-700 ${
                  active === p.key ? "w-16" : "w-8 group-hover:w-16"
                }`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
