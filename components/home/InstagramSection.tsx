import Image from "next/image";
import { Instagram } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { photos, type Photo } from "@/lib/images";

const tiles: { label: string; photo: Photo }[] = [
  { label: "Morning light, Flagship", photo: photos.cafeBulbs },
  { label: "Dialing in Guji", photo: photos.espressoPour },
  { label: "Fresh roast day", photo: photos.beansTexture },
  { label: "Regulars", photo: photos.cupsToast },
  { label: "The corniche at dusk", photo: photos.cafeSign },
  { label: "Slow Sunday", photo: photos.coffeeInBed },
];

export default function InstagramSection() {
  return (
    <section className="bg-cream py-28 md:py-36" aria-label="Instagram">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow="@ninetwonine.coffee" title="Life at 929." />
          <a
            href="https://instagram.com"
            className="label reveal inline-flex items-center gap-2 text-ink transition-colors hover:text-sage-2"
          >
            <Instagram size={15} /> Follow
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {tiles.map((t, i) => (
            <a
              key={t.label}
              href="https://instagram.com"
              aria-label={`Instagram post: ${t.label}`}
              className="reveal zoom-media group relative aspect-square overflow-hidden rounded-xl border border-line"
              data-reveal-delay={i * 90}
            >
              <Image
                src={t.photo.src}
                alt={t.photo.alt}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
                className="zoom-target object-cover"
              />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/60 via-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="text-xs text-cream">{t.label}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
