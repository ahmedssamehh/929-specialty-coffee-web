export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-line bg-cream pt-40 pb-20 md:pt-48 md:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="label reveal text-sage-3">{eyebrow}</p>
        <h1
          className="reveal mt-6 max-w-3xl text-5xl font-light leading-[1.04] tracking-editorial text-ink md:text-7xl"
          data-reveal-delay="120"
        >
          {title}
        </h1>
        {description && (
          <p
            className="reveal mt-8 max-w-xl leading-relaxed text-graphite"
            data-reveal-delay="240"
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
