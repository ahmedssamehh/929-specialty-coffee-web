import { Metadata } from "next";
import GiftCardFlow from "@/components/gift-cards/GiftCardFlow";

export const metadata: Metadata = {
  title: "Gift Cards | 929 Specialty Coffee",
  description: "Gift a 929 moment. Digital gift cards for specialty coffee.",
};

export default function GiftCardsPage() {
  return (
    <main className="min-h-screen bg-cream pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-16 text-center">
        <p className="inline-block rounded-full bg-sage-2/20 px-4 py-1.5 text-xs font-medium tracking-widest text-sage-3 uppercase mb-6">
          CONCEPT DEMONSTRATION
        </p>
        <h1 className="text-4xl lg:text-5xl text-ink font-light tracking-tight mb-6">
          Gift a 929 Moment
        </h1>
        <p className="text-graphite max-w-lg mx-auto">
          Share the quiet luxury of specialty coffee with someone special. Digital gift cards delivered instantly.
        </p>
      </div>
      <GiftCardFlow />
    </main>
  );
}
