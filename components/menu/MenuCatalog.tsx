"use client";

import { useState } from "react";
import { drinks, type Drink } from "@/lib/data";
import { cn } from "@/lib/utils";

const filters = ["All", "Espresso", "Filter", "Cold", "Signature"] as const;

export default function MenuCatalog() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const shown: Drink[] =
    filter === "All" ? drinks : drinks.filter((d) => d.category === filter);

  return (
    <section className="bg-cream py-20 md:py-28" aria-label="Menu catalog">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          role="tablist"
          aria-label="Filter menu"
          className="flex flex-wrap gap-3"
        >
          {filters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "label rounded-full border px-6 py-3 transition-all duration-300",
                filter === f
                  ? "border-ink bg-ink text-cream"
                  : "border-line text-graphite hover:border-sage-2 hover:text-ink"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="mt-14 divide-y divide-line border-y border-line">
          {shown.map((d) => (
            <li
              key={d.name}
              className="group grid gap-2 py-8 transition-colors duration-300 hover:bg-cream-2 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8 sm:px-4"
            >
              <div>
                <div className="flex flex-wrap items-baseline gap-4">
                  <h3 className="text-xl font-light tracking-editorial text-ink">
                    {d.name}
                  </h3>
                  <span className="label text-sage-3">{d.category}</span>
                </div>
                <p className="mt-2 text-sm text-graphite">{d.notes}</p>
              </div>
              <p className="text-lg font-light tabular-nums text-ink">{d.price}</p>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs text-graphite">
          All espresso is served as our seasonal blend or the single origin of
          the week. Oat, almond and whole milk at no extra charge.
        </p>
      </div>
    </section>
  );
}
