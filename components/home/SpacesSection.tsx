import Link from "next/link";
import { branches } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import CityMap from "@/components/locations/CityMap";
import { ArrowUpRight } from "lucide-react";

export default function SpacesSection() {
  return (
    <section aria-label="The 929 Spaces" className="py-24 bg-cream text-ink">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex justify-between items-end mb-16 reveal">
          <div>
            <SectionHeading eyebrow="Concept Locations" title="THE 929 SPACES" />
            <p className="text-graphite mt-4 max-w-md">
              Distinct environments designed around the ritual of coffee.
            </p>
          </div>
          <Link
            href="/locations"
            className="hidden md:inline-flex items-center space-x-2 border-b border-ink pb-1 hover:text-sage hover:border-sage transition-colors duration-300"
          >
            <span className="label">VIEW ALL LOCATIONS</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mb-16 reveal" data-reveal-delay="100">
          <div className="bg-cream-2 p-4 border border-line rounded-sm relative">
            <div className="absolute top-8 left-8 z-10 bg-cream/80 backdrop-blur-sm px-3 py-1 rounded-sm border border-line">
              <span className="label text-sage">CONCEPT LOCATIONS</span>
            </div>
            <div className="h-[40vh] min-h-[300px]">
              <CityMap />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal" data-reveal-delay="200">
          {branches.map((branch, index) => (
            <div
              key={branch.name}
              className="group border border-line p-6 hover:border-sage transition-colors duration-300 bg-cream-2 flex flex-col h-full"
            >
              <div className="label text-sage-2 mb-2">CONCEPT LOCATION</div>
              <h3 className="text-xl font-medium tracking-editorial mb-1">
                {branch.name}
              </h3>
              <p className="text-sm text-graphite mb-6">{branch.district}</p>
              
              <div className="mt-auto">
                <div className="label text-ink mb-1">FOCUS</div>
                <p className="text-sm text-graphite">{branch.focus}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden reveal">
          <Link
            href="/locations"
            className="inline-flex items-center space-x-2 border-b border-ink pb-1 hover:text-sage hover:border-sage transition-colors duration-300"
          >
            <span className="label">VIEW ALL LOCATIONS</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
