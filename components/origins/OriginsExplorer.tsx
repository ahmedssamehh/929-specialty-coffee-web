"use client";

import { useState } from "react";
import Image from "next/image";
import { Mountain, Leaf, FlaskConical, User } from "lucide-react";
import { origins } from "@/lib/data";
import { photos, type Photo } from "@/lib/images";
import { cn } from "@/lib/utils";

/* Stylized world-map positions (percent) per origin. */
const mapPos: Record<string, { x: number; y: number }> = {
  "ethiopia-guji": { x: 58, y: 55 },
  "colombia-huila": { x: 27, y: 52 },
  "panama-boquete": { x: 23, y: 47 },
  "kenya-nyeri": { x: 59, y: 61 },
  "brazil-cerrado": { x: 33, y: 62 },
  "yemen-haraz": { x: 61, y: 48 },
};

/* Rotating gallery pool — each origin shows three, offset by its index. */
const galleryPool: Photo[] = [
  photos.beansSack,
  photos.beansTexture,
  photos.chemexPour,
  photos.cupOnBeans,
  photos.portafilters,
  photos.latteOnBeans,
];

export default function OriginsExplorer() {
  const [active, setActive] = useState(0);
  const o = origins[active];

  return (
    <section className="bg-cream py-20 md:py-28" aria-label="Origins encyclopedia">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          {/* Country index */}
          <nav aria-label="Origins" className="reveal">
            <ul className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:divide-y lg:divide-line lg:border-y lg:border-line">
              {origins.map((org, i) => (
                <li key={org.slug} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={active === i}
                    className={cn(
                      "group flex w-full items-baseline justify-between gap-4 rounded-full border border-line px-5 py-3 text-left transition-all duration-300 lg:rounded-none lg:border-0 lg:px-1 lg:py-5",
                      active === i
                        ? "border-sage-2 bg-sage-2 text-cream lg:bg-transparent lg:text-sage-3"
                        : "text-graphite hover:text-ink"
                    )}
                  >
                    <span className="text-lg font-light tracking-editorial">
                      {org.country}
                    </span>
                    <span
                      className={cn(
                        "label hidden lg:inline",
                        active === i ? "text-sage-3" : "text-line group-hover:text-sage"
                      )}
                    >
                      0{i + 1}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Detail */}
          <div key={o.slug}>
            <div className="grid gap-8 xl:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="label text-sage-3">{o.region}</p>
                <h2 className="mt-4 text-4xl font-light tracking-editorial text-ink md:text-5xl">
                  {o.country}
                </h2>
                <p className="mt-6 max-w-xl leading-relaxed text-graphite">
                  {o.story}
                </p>

                <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                  {[
                    { icon: User, dt: "Producer", dd: o.producer },
                    { icon: FlaskConical, dt: "Processing", dd: o.processing },
                    { icon: Mountain, dt: "Altitude", dd: o.altitude },
                    { icon: Leaf, dt: "Varietals", dd: o.varietals },
                  ].map(({ icon: Icon, dt, dd }) => (
                    <div key={dt} className="bg-cream p-6">
                      <dt className="label flex items-center gap-2 text-sage-3">
                        <Icon size={13} aria-hidden /> {dt}
                      </dt>
                      <dd className="mt-3 text-sm leading-relaxed text-ink">
                        {dd}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex flex-wrap gap-3">
                  {o.notes.map((n) => (
                    <span
                      key={n}
                      className="rounded-full border border-sage px-4 py-2 text-xs text-sage-2"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                {/* Stylized origin map */}
                <div className="relative overflow-hidden rounded-2xl border border-line bg-cream-2">
                  <svg viewBox="0 0 400 260" className="w-full" role="img" aria-label={`Map position of ${o.country}`}>
                    <rect width="400" height="260" fill="#ece8e2" />
                    <g fill="#d8d4ce">
                      {/* abstract continents */}
                      <path d="M60 60 C110 40 140 70 120 110 C105 140 130 160 110 185 C90 205 60 190 55 160 C50 130 40 85 60 60 Z" />
                      <path d="M170 40 C230 25 300 40 330 70 C355 95 340 120 300 125 C265 130 250 160 270 190 C240 210 200 195 195 160 C190 130 150 60 170 40 Z" opacity="0.9" />
                      <path d="M230 140 C260 135 285 150 280 175 C275 200 245 210 230 195 C215 180 210 148 230 140 Z" />
                    </g>
                    <line x1="0" y1="130" x2="400" y2="130" stroke="#c9c3b8" strokeDasharray="3 6" />
                  </svg>
                  <span
                    className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cream bg-sage-2 shadow"
                    style={{
                      left: `${mapPos[o.slug].x}%`,
                      top: `${mapPos[o.slug].y}%`,
                    }}
                  >
                    <span className="absolute inset-0 -m-1.5 animate-ping rounded-full bg-sage/40" />
                  </span>
                </div>

                {/* Gallery */}
                <div className="grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((i) => {
                    const photo = galleryPool[(active + i) % galleryPool.length];
                    return (
                      <div
                        key={photo.src}
                        className="zoom-media relative aspect-[3/4] overflow-hidden rounded-xl border border-line"
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="15vw"
                          className="zoom-target object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
