import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import OriginsExplorer from "@/components/origins/OriginsExplorer";

export const metadata: Metadata = {
  title: "Coffee Origins",
  description:
    "An interactive encyclopedia of the six origins behind 929 — producers, processing, altitude and flavor.",
};

export default function OriginsPage() {
  return (
    <>
      <PageHero
        eyebrow="Origins"
        title="Six farms. Six thousand kilometres of flavor."
        description="Everything we serve traces back to a person and a place. Explore the farms, processes and altitudes behind the cup."
      />
      <OriginsExplorer />
    </>
  );
}
