import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CityMap from "@/components/locations/CityMap";

export default function LocationsSection() {
  return (
    <section className="bg-cream-2 py-28 md:py-36" aria-label="Locations">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Locations"
            title="Four rooms, one standard."
            description="From the roastery downtown to the corniche at midnight — every 929 is dialed to the same cup."
          />
          <Link
            href="/locations"
            className="label reveal inline-flex items-center gap-2 text-ink transition-colors hover:text-sage-2"
          >
            All locations <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="mt-16">
          <CityMap />
        </div>
      </div>
    </section>
  );
}
