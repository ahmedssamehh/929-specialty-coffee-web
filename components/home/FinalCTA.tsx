"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function FinalCTA() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section aria-label="Final CTA" className="py-32 bg-cream text-ink relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center reveal">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-editorial mb-6">
          THE NEXT CHAPTER<br />STARTS HERE.
        </h2>
        <p className="text-xl text-graphite mb-12 max-w-2xl mx-auto">
          An exploration of what 929 could become digitally.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/proposal"
            className="bg-ink text-cream px-8 py-4 rounded-sm hover:bg-sage transition-colors duration-300 label w-full sm:w-auto text-center"
          >
            EXPLORE THE CONCEPT
          </Link>
          <button
            onClick={scrollToTop}
            className="group flex items-center space-x-2 text-graphite hover:text-ink transition-colors duration-300 w-full sm:w-auto justify-center py-4 sm:py-0"
          >
            <span className="label">BACK TO BEGINNING</span>
            <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
      
      {/* Decorative sage elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-sage/20 rounded-bl-3xl ml-8 mb-8" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-sage/20 rounded-tr-3xl mr-8 mt-8" />
    </section>
  );
}
