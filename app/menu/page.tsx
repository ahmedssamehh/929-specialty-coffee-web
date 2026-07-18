import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import MenuCatalog from "@/components/menu/MenuCatalog";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The 929 menu — espresso, filter, cold and signature drinks, composed like an editorial catalog.",
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Menu"
        title="A short list, done properly."
        description="We would rather perfect ten drinks than serve forty. Every recipe is re-tasted daily and retired the day it stops earning its place."
      />
      <MenuCatalog />
    </>
  );
}
