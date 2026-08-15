"use client";

import { useState } from "react";
import Image from "next/image";
import { photos } from "@/lib/images";
import SectionHeading from "@/components/ui/SectionHeading";

const rituals = [
  {
    id: "espresso",
    title: "ESPRESSO",
    desc: "The 25-second ceremony. Grind, tamp, extract. Nothing wasted.",
    image: photos.espressoPour,
    bars: { body: 90, sweetness: 60, acidity: 50 },
  },
  {
    id: "filter",
    title: "FILTER",
    desc: "Four minutes. A kettle, a filter, patience. The long way is the right way.",
    image: photos.chemexPour,
    bars: { body: 40, sweetness: 80, acidity: 85 },
  },
  {
    id: "tasting",
    title: "TASTING",
    desc: "Eight cups in a circle. Slurp, score, discuss. How professionals taste.",
    image: photos.cuppingCircle,
    bars: { body: 50, sweetness: 50, acidity: 70 },
  },
  {
    id: "slow",
    title: "SLOW MORNING",
    desc: "9:29 AM. A marble board, linen napkins, sunlight. The moment the café belongs to you.",
    image: photos.coffeeInBed,
    bars: { body: 70, sweetness: 90, acidity: 40 },
  },
];

export default function TheRitual() {
  const [activeId, setActiveId] = useState(rituals[0].id);
  const activeRitual = rituals.find(r => r.id === activeId) || rituals[0];

  return (
    <section className="relative bg-cream py-32 lg:py-0 lg:min-h-screen flex items-center" aria-label="Choose Your Ritual">
      {/* Background Image with crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden hidden lg:block">
        {rituals.map((ritual) => (
          <div 
            key={ritual.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeId === ritual.id ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-cream/90 z-10 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/80 to-transparent z-10" />
            <Image
              src={ritual.image.src}
              alt={ritual.image.alt}
              fill
              className="object-cover object-right grayscale mix-blend-multiply opacity-50"
              sizes="50vw"
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Selection */}
        <div>
          <p className="label text-sage-3 mb-6">THE 929 RITUAL</p>
          <h2 className="text-4xl lg:text-6xl font-light tracking-editorial text-ink mb-16">
            CHOOSE YOUR RITUAL
          </h2>
          
          <div className="flex flex-col gap-6">
            {rituals.map((ritual, idx) => (
              <button
                key={ritual.id}
                onMouseEnter={() => setActiveId(ritual.id)}
                onClick={() => setActiveId(ritual.id)}
                className={`group flex items-center gap-6 text-left transition-all duration-500 ${activeId === ritual.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
              >
                <span className="text-sm font-light tracking-widest w-6">0{idx + 1}</span>
                <span className="text-2xl lg:text-4xl font-light tracking-editorial">{ritual.title}</span>
                <span className={`h-px bg-ink transition-all duration-700 ${activeId === ritual.id ? 'w-16' : 'w-0'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="bg-cream-2/80 backdrop-blur-sm p-10 lg:p-16 border border-line min-h-[400px] flex flex-col justify-center transition-all duration-500">
          <div key={activeId} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h3 className="text-3xl font-light tracking-editorial text-ink mb-6">{activeRitual.title}</h3>
            <p className="text-lg text-graphite mb-12 leading-relaxed min-h-[80px]">
              {activeRitual.desc}
            </p>
            
            <div className="space-y-6 mb-12">
                {Object.entries(activeRitual.bars).map(([key, val]) => (
                  <div key={key}>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs uppercase tracking-widest text-graphite">{key}</span>
                    </div>
                    <div className="h-1 w-full bg-line overflow-hidden">
                      <div className="h-full bg-sage-2 transition-all duration-1000 ease-out" style={{ width: `${val}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:hidden relative h-48 w-full mt-8 overflow-hidden rounded-lg">
                 <Image
                    src={activeRitual.image.src}
                    alt={activeRitual.image.alt}
                    fill
                    className="object-cover grayscale"
                  />
              </div>
          </div>
        </div>

      </div>
    </section>
  );
}
