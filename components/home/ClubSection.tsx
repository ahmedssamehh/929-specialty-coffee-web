"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const benefits = [
  "EARLY ACCESS",
  "PRIVATE CUPPINGS",
  "SEASONAL DROPS",
  "MEMBER EVENTS"
];

export default function ClubSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section aria-label="929 Club" className="py-24 bg-ink text-cream relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          <div className="flex flex-col items-center text-center reveal">
            <SectionHeading eyebrow="Premium Loyalty" title="929 CLUB" align="center" />
            <p className="text-cream/70 max-w-md mt-6 text-lg">
              A private space for people who take coffee seriously.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 w-full max-w-4xl mt-16 mb-16">
              {benefits.map((benefit, i) => (
                <div key={benefit} className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 rounded-full border border-sage/30 flex items-center justify-center mb-4 text-sage transition-colors duration-300 group-hover:bg-sage group-hover:text-ink">
                    <span className="text-xs">{(i + 1).toString().padStart(2, '0')}</span>
                  </div>
                  <span className="label text-cream/90">{benefit}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-cream text-ink px-8 py-4 rounded-sm hover:bg-sage hover:text-cream transition-colors duration-300 label"
            >
              JOIN THE CLUB
            </button>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vw] w-[70vw] max-h-[520px] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage/10 blur-[70px]" />
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-cream text-ink p-8 md:p-12 max-w-lg w-full rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-graphite hover:text-ink transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="label text-sage mb-4">CONCEPT NOTICE</div>
            <h3 className="text-2xl font-medium tracking-editorial mb-4">Future Ecosystem</h3>
            <p className="text-graphite mb-8 leading-relaxed">
              929 Club is envisioned as part of a future digital ecosystem. This concept demonstrates the membership experience that could be built for 929.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full border border-ink py-3 hover:bg-ink hover:text-cream transition-colors duration-300 label"
            >
              UNDERSTOOD
            </button>
          </div>
        </div>
      )}
    </>
  );
}
