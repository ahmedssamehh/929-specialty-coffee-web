"use client";

import { useState } from "react";
import Link from "next/link";
import { origins } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

// Rough approximate coordinates for map placement
const originCoordinates: Record<string, { x: string; y: string }> = {
  Ethiopia: { x: "55%", y: "48%" },
  Colombia: { x: "28%", y: "52%" },
  Brazil: { x: "32%", y: "65%" },
  Panama: { x: "25%", y: "48%" },
  Kenya: { x: "56%", y: "52%" },
  Yemen: { x: "58%", y: "42%" },
};

export default function OriginExplorerPreview() {
  const [selectedOrigin, setSelectedOrigin] = useState(origins[0]);

  return (
    <section aria-label="Origin Explorer" className="py-24 bg-cream-2 text-ink">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          <div className="w-full md:w-1/2 flex flex-col items-start reveal">
            <span className="label text-sage mb-4 block">CONCEPT DATA</span>
            <SectionHeading eyebrow="Coffee Origins" title="ORIGIN, TASTED." />
            <p className="text-graphite mb-8 mt-4">
              Explore the stories and distinct profiles of the regions that shape our menu.
            </p>

            <div className="w-full bg-cream p-8 rounded-sm">
              <h3 className="text-2xl font-medium tracking-editorial mb-2">
                {selectedOrigin.country}
              </h3>
              <div className="label text-sage-2 mb-6">{selectedOrigin.region}</div>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-6">
                <div>
                  <div className="label text-graphite mb-1">ALTITUDE</div>
                  <div className="text-sm">{selectedOrigin.altitude}</div>
                </div>
                <div>
                  <div className="label text-graphite mb-1">PROCESS</div>
                  <div className="text-sm">{selectedOrigin.processing}</div>
                </div>
              </div>

              <div>
                <div className="label text-graphite mb-2">TASTING NOTES</div>
                <div className="flex flex-wrap gap-2">
                  {selectedOrigin.notes.map((note) => (
                    <span key={note} className="text-xs border border-line px-2 py-1 rounded-sm">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/origins"
                className="inline-flex items-center space-x-2 border-b border-ink pb-1 hover:text-sage hover:border-sage transition-colors duration-300"
              >
                <span className="label">EXPLORE ALL ORIGINS</span>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative aspect-video bg-cream rounded-sm border border-line p-4 reveal" data-reveal-delay="200">
            {/* Abstract simplified map outline */}
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-20" preserveAspectRatio="none">
              <path d="M 20 40 Q 30 20 40 40 T 60 30 T 80 50 Q 70 70 50 60 T 20 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <path d="M 10 30 Q 20 50 30 70 T 40 80 Q 25 80 15 60 T 10 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>

            {origins.map((origin) => {
              const coords = originCoordinates[origin.country] || { x: "50%", y: "50%" };
              const isSelected = selectedOrigin.country === origin.country;

              return (
                <button
                  key={origin.country}
                  onClick={() => setSelectedOrigin(origin)}
                  className={cn(
                    "absolute w-4 h-4 -ml-2 -mt-2 rounded-full transition-all duration-300 flex items-center justify-center",
                    isSelected ? "z-10" : "z-0 hover:scale-110"
                  )}
                  style={{ left: coords.x, top: coords.y }}
                  aria-label={`Select ${origin.country}`}
                >
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full",
                      isSelected ? "bg-sage animate-ping opacity-20" : "hidden"
                    )}
                  />
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors duration-300",
                      isSelected ? "bg-sage scale-150" : "bg-graphite"
                    )}
                  />
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
