import SectionHeading from "@/components/ui/SectionHeading";

const values = [
  {
    n: "01",
    title: "Craftsmanship",
    body: "Every bar is run like an atelier — grams, seconds and temperatures logged, tasted, corrected. Nothing leaves the counter unconsidered.",
  },
  {
    n: "02",
    title: "Calm",
    body: "Rooms tuned for quiet. Soft light, warm stone, acoustic ceilings. A cup of coffee should lower your pulse, not raise it.",
  },
  {
    n: "03",
    title: "Precision",
    body: "We roast in small batches, measure water chemistry from zero, and re-dial every espresso hour. Precision is how care becomes taste.",
  },
  {
    n: "04",
    title: "Provenance",
    body: "Six origins, bought directly, visited yearly. We publish what we pay because respect for farmers is part of the flavor.",
  },
];

export default function BrandValues() {
  return (
    <section className="bg-cream py-28 md:py-36" aria-label="Brand values">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="The 929 Standard"
          title="Quiet luxury, measured in millilitres."
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <article
              key={v.n}
              className="reveal group bg-cream p-8 transition-colors duration-500 hover:bg-cream-2 md:p-10"
              data-reveal-delay={i * 120}
            >
              <span className="label text-sage-3">{v.n}</span>
              <h3 className="mt-6 text-2xl font-light tracking-editorial text-ink">
                {v.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-graphite">
                {v.body}
              </p>
              <span className="mt-8 block h-px w-8 bg-sage transition-all duration-500 group-hover:w-16" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
