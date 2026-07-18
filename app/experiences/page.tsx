import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { experiences } from "@/lib/data";
import { photos, type Photo } from "@/lib/images";

/* One photo per workshop, in experiences[] order. */
const experiencePhotos: Photo[] = [
  photos.cuppingCircle, // Public Cupping
  photos.portafilters, // Espresso Intensive
  photos.chemexPour, // Manual Brewing Masterclass
  photos.teaCeremony, // Sensory & Flavor Lab
];

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Workshops, public cuppings and brewing masterclasses at 929 Specialty Coffee.",
};

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Experiences"
        title="Learn the craft from the bar."
        description="Everything we know, taught on the equipment we use. Small groups, real machines, honest tasting."
      />
      <section className="bg-cream py-20 md:py-28" aria-label="Workshops">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2">
            {experiences.map((e, i) => (
              <article
                key={e.name}
                className="reveal zoom-media group flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-cream transition-all duration-500 hover:-translate-y-1 hover:border-sage hover:shadow-[0_24px_60px_-30px_rgba(28,28,28,0.25)]"
                data-reveal-delay={i * 120}
              >
                <div className="relative aspect-[16/8]">
                  <Image
                    src={experiencePhotos[i % experiencePhotos.length].src}
                    alt={experiencePhotos[i % experiencePhotos.length].alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="zoom-target object-cover"
                  />
                </div>
                <div className="p-8 md:p-10">
                  <div className="flex items-start justify-between gap-6">
                    <h2 className="text-2xl font-light tracking-editorial text-ink">
                      {e.name}
                    </h2>
                    <p className="text-lg font-light text-sage-2">{e.price}</p>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-graphite">
                    {e.description}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-line pt-6 text-xs text-graphite">
                  <span className="flex items-center gap-2">
                    <Clock size={14} className="text-sage-2" aria-hidden />
                    {e.duration}
                  </span>
                  <span className="flex items-center gap-2">
                    <Users size={14} className="text-sage-2" aria-hidden />
                    {e.seats}
                  </span>
                  <Link
                    href="/contact"
                    className="label ml-auto text-ink transition-colors hover:text-sage-2"
                  >
                    Reserve →
                  </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
