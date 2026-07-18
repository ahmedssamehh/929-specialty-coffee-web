import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { drinks } from "@/lib/data";
import { photos, type Photo } from "@/lib/images";

const drinkPhotos: Photo[] = [
  photos.cuppingCircle, // The 929 Ritual — tasting set
  photos.lattesPlants, // Olive Blossom Latte
  photos.icedCoffee, // Smoked Cascara Fizz
];

export default function SignatureDrinks() {
  const signatures = drinks.filter((d) => d.category === "Signature");

  return (
    <section className="bg-cream py-28 md:py-36" aria-label="Signature drinks">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Signatures"
            title="Drinks you will not find elsewhere."
          />
          <Link
            href="/menu"
            className="label reveal inline-flex items-center gap-2 text-ink transition-colors hover:text-sage-2"
          >
            Full menu <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {signatures.map((d, i) => {
            const photo = drinkPhotos[i % drinkPhotos.length];
            return (
              <article
                key={d.name}
                className="reveal zoom-media group relative overflow-hidden rounded-2xl border border-line"
                data-reveal-delay={i * 130}
              >
                <div className="relative flex aspect-[4/5] flex-col justify-end p-8">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="zoom-target object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                  <div className="relative">
                    <span className="label text-cream/70">{d.category}</span>
                    <h3 className="mt-3 text-2xl font-light tracking-editorial text-cream">
                      {d.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/75">
                      {d.notes}
                    </p>
                    <p className="mt-6 text-sm tabular-nums text-cream/90">
                      {d.price}
                    </p>
                  </div>
                </div>
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
