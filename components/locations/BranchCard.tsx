import Image from "next/image";
import { Clock, MapPin, Phone } from "lucide-react";
import type { Branch } from "@/lib/data";
import { photos, type Photo } from "@/lib/images";

/* Interior photo per branch, in branches[] order. */
const branchPhotos: Photo[] = [
  photos.cafeChalkboard, // Flagship — The Roastery
  photos.cafeBulbs, // Corniche
  photos.greenhouseTable, // Garden District
  photos.cafeIndustrial, // University Quarter
];

export default function BranchCard({
  branch,
  index = 0,
}: {
  branch: Branch;
  index?: number;
}) {
  const photo = branchPhotos[index % branchPhotos.length];
  return (
    <article
      className="reveal zoom-media group overflow-hidden rounded-2xl border border-line bg-cream transition-all duration-500 hover:-translate-y-1 hover:border-sage hover:shadow-[0_24px_60px_-30px_rgba(28,28,28,0.25)]"
      data-reveal-delay={index * 120}
    >
      <div className="relative aspect-[16/10]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="zoom-target object-cover"
        />
      </div>
      <div className="p-8">
        <p className="label text-sage-3">{branch.district}</p>
        <h3 className="mt-4 text-xl font-light tracking-editorial text-ink">
          {branch.name}
        </h3>
        <p className="mt-3 text-sm text-graphite">{branch.focus}</p>
        <dl className="mt-8 space-y-3 border-t border-line pt-6 text-sm text-graphite">
          <div className="flex items-center gap-3">
            <dt className="sr-only">Address</dt>
            <MapPin size={15} className="shrink-0 text-sage-2" aria-hidden />
            <dd>{branch.address}</dd>
          </div>
          <div className="flex items-center gap-3">
            <dt className="sr-only">Hours</dt>
            <Clock size={15} className="shrink-0 text-sage-2" aria-hidden />
            <dd>{branch.hours}</dd>
          </div>
          <div className="flex items-center gap-3">
            <dt className="sr-only">Phone</dt>
            <Phone size={15} className="shrink-0 text-sage-2" aria-hidden />
            <dd>{branch.phone}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
