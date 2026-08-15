"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { drinks } from "@/lib/data";
import { photos } from "@/lib/images";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Espresso", "Filter", "Signature", "Cold"] as const;
type Category = (typeof CATEGORIES)[number];

const categoryImages: Record<Category, any[]> = {
  Espresso: [photos.espressoPour, photos.blackCoffee],
  Filter: [photos.chemexPour, photos.portafilters],
  Cold: [photos.icedCoffee],
  Signature: [photos.cuppingCircle, photos.lattesPlants, photos.latteOnBeans],
};

export default function Collection() {
  const [activeTab, setActiveTab] = useState<Category>("Espresso");

  const filteredDrinks = drinks.filter(
    (drink) => drink.category === activeTab
  );

  return (
    <section aria-label="The Collection" className="py-24 bg-cream text-ink">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16 reveal">
          <SectionHeading eyebrow="Sample Menu" title="THE COLLECTION" align="center" />
        </div>

        <div className="flex justify-center mb-12 reveal" data-reveal-delay="100">
          <div className="flex space-x-6 border-b border-line pb-4 overflow-x-auto w-full md:w-auto justify-start md:justify-center px-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "label relative whitespace-nowrap transition-colors duration-300",
                  activeTab === cat ? "text-sage" : "text-graphite hover:text-ink"
                )}
              >
                {cat.toUpperCase()}
                {activeTab === cat && (
                  <span className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-sage" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredDrinks.map((drink, index) => {
            const images = categoryImages[activeTab];
            const image = images[index % images.length];

            return (
              <div
                key={drink.name}
                className="group reveal flex flex-col"
                data-reveal-delay={index * 100}
              >
                <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-cream-2">
                  <Image
                    src={image.src}
                    alt={drink.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-medium tracking-editorial">
                    {drink.name}
                  </h3>
                  <span className="text-sm font-medium">EGP {drink.price}</span>
                </div>
                {drink.notes && (
                  <p className="text-sm text-graphite mb-4 flex-grow">
                    {drink.notes}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center reveal" data-reveal-delay="200">
          <Link
            href="/menu"
            className="inline-flex items-center space-x-2 border-b border-ink pb-1 hover:text-sage hover:border-sage transition-colors duration-300"
          >
            <span className="label">VIEW FULL MENU</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
