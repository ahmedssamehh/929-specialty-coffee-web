import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import { articles } from "@/lib/data";
import { photos, type Photo } from "@/lib/images";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "The 929 Journal — essays on craft, origin travel, ritual and the spaces coffee is served in.",
};

/* One photo per article, matched to its subject. */
const articlePhotos: Photo[] = [
  photos.coffeeInBed, // The Case for Slower Mornings
  photos.espressoPour, // Reading a Crema
  photos.beansSack, // Guji, After the Rains
  photos.blackCoffee, // Water, the Invisible Ingredient
  photos.cafeIndustrial, // Designing Silence
  photos.latteOnBeans, // The Geometry of Latte Art
];

export default function JournalPage() {
  const [lead, ...rest] = articles;

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes from the slow bar."
        description="Essays on craft, travel and ritual — written by the people behind the counter."
      />
      <section className="bg-cream py-20 md:py-28" aria-label="Articles">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Lead story */}
          <article className="reveal zoom-media group grid overflow-hidden rounded-2xl border border-line md:grid-cols-2">
            <div className="relative aspect-[4/3] md:aspect-auto">
              <Image
                src={articlePhotos[0].src}
                alt={articlePhotos[0].alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="zoom-target object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-14">
              <p className="label text-sage-3">
                {lead.category} · {lead.date}
              </p>
              <h2 className="mt-5 text-3xl font-light leading-tight tracking-editorial text-ink md:text-4xl">
                {lead.title}
              </h2>
              <p className="mt-5 leading-relaxed text-graphite">{lead.excerpt}</p>
              <p className="label mt-8 text-ink transition-colors group-hover:text-sage-2">
                Read — {lead.minutes} min
              </p>
            </div>
          </article>

          {/* Grid */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => {
              const photo = articlePhotos[(i + 1) % articlePhotos.length];
              return (
                <article
                  key={a.slug}
                  className="reveal zoom-media group overflow-hidden rounded-2xl border border-line"
                  data-reveal-delay={i * 100}
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="zoom-target object-cover"
                    />
                  </div>
                  <div className="p-7">
                    <p className="label text-sage-3">
                      {a.category} · {a.date}
                    </p>
                    <h3 className="mt-4 text-xl font-light leading-snug tracking-editorial text-ink">
                      {a.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-graphite">
                      {a.excerpt}
                    </p>
                    <p className="label mt-6 text-ink transition-colors group-hover:text-sage-2">
                      Read — {a.minutes} min
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
