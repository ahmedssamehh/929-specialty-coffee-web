import Image from "next/image";
import Link from "next/link";
import { experiences } from "@/lib/data";
import { photos } from "@/lib/images";
import SectionHeading from "@/components/ui/SectionHeading";

const experiencePhotos = [
  photos.cuppingCircle,
  photos.portafilters,
  photos.chemexPour,
  photos.teaCeremony,
];

export default function ExperiencesPreview() {
  const displayExperiences = experiences.slice(0, 4);

  return (
    <section aria-label="Learn the Craft" className="py-24 bg-cream-2 text-ink overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 reveal">
          <div>
            <span className="label text-sage mb-4 block">PROPOSED EXPERIENCE</span>
            <SectionHeading eyebrow="Experiences" title="LEARN THE CRAFT" />
          </div>
          <Link
            href="/experiences"
            className="mt-6 md:mt-0 inline-flex items-center space-x-2 border-b border-ink pb-1 hover:text-sage hover:border-sage transition-colors duration-300"
          >
            <span className="label">EXPLORE EXPERIENCES</span>
          </Link>
        </div>

        {/* Mobile horizontal scroll, Desktop grid */}
        <div className="-mx-4 md:mx-0 px-4 md:px-0">
          <div className="flex md:grid md:grid-cols-2 gap-6 overflow-x-auto snap-x snap-mandatory md:overflow-visible pb-8 md:pb-0 hide-scrollbar">
            {displayExperiences.map((exp, index) => (
              <Link
                key={exp.name}
                href="/experiences"
                className="group snap-center shrink-0 w-[85vw] md:w-auto relative aspect-[4/3] overflow-hidden reveal"
                data-reveal-delay={index * 100}
              >
                <Image
                  src={experiencePhotos[index % experiencePhotos.length].src}
                  alt={exp.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/30 transition-opacity duration-300 group-hover:bg-ink/20" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-cream">
                  <span className="label text-cream/80 mb-2">{exp.duration}</span>
                  <h3 className="text-2xl font-medium tracking-editorial mb-2">
                    {exp.name}
                  </h3>
                  <div className="w-0 h-[1px] bg-cream transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-full" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
