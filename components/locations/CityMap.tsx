"use client";

import { useState } from "react";
import { branches } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Stylized city map with interactive branch pins. */
export default function CityMap() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid items-stretch gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="reveal relative overflow-hidden rounded-2xl border border-line bg-cream-2">
        {/* abstract street grid */}
        <svg
          viewBox="0 0 800 520"
          className="h-full w-full"
          role="img"
          aria-label="Stylized map of 929 locations"
        >
          <rect width="800" height="520" fill="#ece8e2" />
          <g stroke="#d8d4ce" strokeWidth="1.5" fill="none">
            <path d="M0 120 C200 100 420 150 800 110" />
            <path d="M0 240 C260 220 480 270 800 235" />
            <path d="M0 370 C240 350 520 400 800 355" />
            <path d="M120 0 C140 180 100 360 130 520" />
            <path d="M300 0 C320 200 280 380 310 520" />
            <path d="M520 0 C540 160 500 340 530 520" />
            <path d="M680 0 C700 200 660 400 690 520" />
          </g>
          {/* river */}
          <path
            d="M560 0 C600 140 520 300 620 520"
            fill="none"
            stroke="#8FA79A"
            strokeOpacity="0.25"
            strokeWidth="26"
            strokeLinecap="round"
          />
          {/* park */}
          <ellipse cx="210" cy="300" rx="70" ry="46" fill="#8FA79A" opacity="0.14" />
        </svg>

        {branches.map((b, i) => (
          <button
            key={b.name}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            aria-label={`Show ${b.name}`}
            className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ left: `${b.mapX}%`, top: `${b.mapY}%` }}
          >
            <span
              className={cn(
                "relative block h-4 w-4 rounded-full border-2 transition-all duration-300",
                active === i
                  ? "scale-125 border-sage-2 bg-sage-2"
                  : "border-sage bg-cream hover:bg-sage"
              )}
            >
              {active === i && (
                <span className="absolute inset-0 -m-2 animate-ping rounded-full bg-sage/30" />
              )}
            </span>
          </button>
        ))}
      </div>

      <div className="reveal flex flex-col justify-between rounded-2xl border border-line bg-cream p-8 md:p-10" data-reveal-delay="150">
        <div>
          <p className="label text-sage-3">{branches[active].district}</p>
          <h3 className="mt-4 text-2xl font-light tracking-editorial text-ink">
            {branches[active].name}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-graphite">
            {branches[active].focus}
          </p>
          <dl className="mt-8 space-y-2 text-sm text-graphite">
            <dd>{branches[active].address}</dd>
            <dd>{branches[active].hours}</dd>
            <dd>{branches[active].phone}</dd>
          </dl>
        </div>
        <div className="mt-10 flex gap-2" role="group" aria-label="Branches">
          {branches.map((b, i) => (
            <button
              key={b.name}
              type="button"
              onClick={() => setActive(i)}
              aria-label={b.name}
              aria-pressed={active === i}
              className="flex h-11 items-center"
            >
              <span
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  active === i ? "w-10 bg-sage-2" : "w-5 bg-line hover:bg-sage"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
