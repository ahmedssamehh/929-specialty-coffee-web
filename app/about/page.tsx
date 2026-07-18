import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { photos } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story, mission and vision of 929 Specialty Coffee — coffee practiced as a craft.",
};

const timeline = [
  {
    year: "2019",
    title: "A nine-square-metre counter",
    body: "929 opens as a single espresso bar with one grinder, one machine, and a promise: nothing served that we wouldn't drink twice.",
  },
  {
    year: "2020",
    title: "First direct-trade harvest",
    body: "We buy our first lot at origin in Huila, Colombia — and publish exactly what we paid for it.",
  },
  {
    year: "2022",
    title: "The Roastery",
    body: "A former foundry downtown becomes our flagship: roastery, slow bar, cupping room and a long oak table for strangers.",
  },
  {
    year: "2024",
    title: "Four rooms, one standard",
    body: "Corniche, Garden District and University Quarter open — each dialed daily to the same cup as the Flagship.",
  },
  {
    year: "2026",
    title: "The digital flagship",
    body: "929 online: the same calm, the same precision, one scroll away.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Named after a moment, not a place."
        description="9:29 in the morning — after the rush, before the noise. The minute a café belongs to whoever is sitting in it. We built a brand around that minute."
      />

      {/* photo band */}
      <section className="bg-cream pb-24 pt-4 md:pb-28" aria-label="The rooms of 929">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 md:grid-cols-4 lg:px-10">
          {[
            photos.cafeChalkboard,
            photos.espressoPour,
            photos.cafeBulbs,
            photos.cupsToast,
          ].map((p, i) => (
            <div
              key={p.src}
              className={`reveal zoom-media relative overflow-hidden rounded-2xl border border-line ${
                i % 2 ? "aspect-[3/4] md:mt-10" : "aspect-[3/4]"
              }`}
              data-reveal-delay={i * 110}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="zoom-target object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream-2 py-24 md:py-32" aria-label="Mission and vision">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 lg:px-10">
          <div className="reveal">
            <p className="label text-sage-3">Mission</p>
            <p className="mt-6 text-2xl font-light leading-snug tracking-editorial text-ink md:text-3xl">
              To serve coffee with the care of a craft workshop and the calm of
              a reading room — and to pay the people who grow it as partners,
              not suppliers.
            </p>
          </div>
          <div className="reveal" data-reveal-delay="150">
            <p className="label text-sage-3">Vision</p>
            <p className="mt-6 text-2xl font-light leading-snug tracking-editorial text-ink md:text-3xl">
              A room in every city where time slows to 9:29 — and a supply
              chain transparent enough to print on the cup.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32" aria-label="Timeline">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading eyebrow="Timeline" title="Seven years, five chapters." />
          <ol className="mt-16 border-l border-line">
            {timeline.map((t, i) => (
              <li
                key={t.year}
                className="reveal relative pb-14 pl-10 last:pb-0"
                data-reveal-delay={i * 100}
              >
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-sage" />
                <p className="label text-sage-3">{t.year}</p>
                <h3 className="mt-3 text-2xl font-light tracking-editorial text-ink">
                  {t.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-graphite">
                  {t.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
