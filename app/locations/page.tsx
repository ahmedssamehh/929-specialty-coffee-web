import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CityMap from "@/components/locations/CityMap";
import BranchCard from "@/components/locations/BranchCard";
import { branches } from "@/lib/data";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Find a 929 — four rooms across the city, from the downtown roastery to the corniche.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="Come sit for a while."
        description="Every branch is designed around the same idea: warm stone, soft light, and a bar you can watch working."
      />
      <section className="bg-cream py-20 md:py-28" aria-label="Map">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <CityMap />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {branches.map((b, i) => (
              <BranchCard key={b.name} branch={b} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
