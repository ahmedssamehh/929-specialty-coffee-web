"use client";

import { useState } from "react";
import { branches, drinks } from "@/lib/data";
import { cn } from "@/lib/utils";

const STEPS = ["Location", "Coffee", "Customize", "Pickup", "Summary"];

export default function OrderFlow() {
  const [step, setStep] = useState(0);
  const [location, setLocation] = useState<string | null>(null);
  const [coffee, setCoffee] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("All");
  const [size, setSize] = useState<string>("Regular");
  const [time, setTime] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const categories = ["All", ...Array.from(new Set(drinks.map(d => d.category)))];
  const filteredDrinks = category === "All" ? drinks : drinks.filter(d => d.category === category);

  const currentDrink = drinks.find(d => d.name === coffee);

  const nextStep = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const handlePlaceOrder = () => setShowModal(true);

  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-10">
      {/* Steps Indicator */}
      <div className="mb-12 flex items-center justify-between relative before:absolute before:left-0 before:top-1/2 before:-z-10 before:h-[1px] before:w-full before:-translate-y-1/2 before:bg-line">
        {STEPS.map((s, i) => (
          <div key={s} className="flex min-w-0 flex-col items-center gap-2 bg-cream px-1 sm:px-2">
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors",
              i === step ? "bg-ink text-cream" : i < step ? "bg-sage-2 text-cream" : "bg-cream-2 text-graphite border border-line"
            )}>
              {i + 1}
            </div>
            <span className={cn(
              // Labels are dropped on the narrowest phones; the numbered circles
              // still convey progress and the heading names the current step.
              "hidden sm:block text-[0.65rem] tracking-widest uppercase whitespace-nowrap",
              i <= step ? "text-ink" : "text-graphite/60"
            )}>
              {s}
            </span>
          </div>
        ))}
      </div>

      <div className="min-h-[400px]">
        {/* Step 1: Location */}
        {step === 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {branches.map(b => (
              <button
                key={b.name}
                onClick={() => setLocation(b.name)}
                className={cn(
                  "p-6 text-left border transition-all",
                  location === b.name ? "border-ink bg-cream-2" : "border-line bg-transparent hover:border-graphite/30"
                )}
              >
                <h3 className="text-xl text-ink mb-1">{b.name}</h3>
                <p className="text-sm text-graphite">{b.district}</p>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Coffee */}
        {step === 1 && (
          <div>
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "px-4 py-2 text-sm whitespace-nowrap rounded-full transition-colors border",
                    category === cat ? "bg-ink text-cream border-ink" : "border-line text-graphite hover:border-graphite"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredDrinks.map(d => (
                <button
                  key={d.name}
                  onClick={() => setCoffee(d.name)}
                  className={cn(
                    "p-6 text-left border transition-all flex justify-between items-start",
                    coffee === d.name ? "border-ink bg-cream-2" : "border-line bg-transparent hover:border-graphite/30"
                  )}
                >
                  <div>
                    <h3 className="text-lg text-ink mb-1">{d.name}</h3>
                    <p className="text-xs text-graphite">{d.category}</p>
                  </div>
                  <span className="text-sm">EGP {d.price}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Customize */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h3 className="label text-graphite mb-4">Size</h3>
              <div className="flex gap-4">
                {["Small", "Regular", "Large"].map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSize(sz)}
                    className={cn(
                      "px-6 py-3 border text-sm transition-all",
                      size === sz ? "border-ink bg-ink text-cream" : "border-line text-ink hover:border-graphite"
                    )}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="label text-graphite mb-4">Extras (Demo)</h3>
              <div className="flex flex-wrap gap-4">
                {["Oat Milk", "Extra Shot", "Vanilla Syrup"].map(ext => (
                  <button key={ext} className="px-6 py-3 border border-line text-sm text-graphite hover:border-graphite">
                    + {ext}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Pickup */}
        {step === 3 && (
          <div className="grid gap-4 grid-cols-3">
            {["10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM", "11:00 AM", "11:15 AM"].map(t => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={cn(
                  "p-4 text-center border transition-all text-sm",
                  time === t ? "border-ink bg-cream-2" : "border-line hover:border-graphite/30"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {/* Step 5: Summary */}
        {step === 4 && (
          <div className="border border-line p-8 bg-cream-2/50 max-w-md mx-auto">
            <h3 className="text-2xl mb-8 border-b border-line pb-4">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between">
                <span className="text-graphite">Location</span>
                <span className="text-ink">{location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-graphite">Time</span>
                <span className="text-ink">{time || "ASAP"}</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-line/50">
                <div>
                  <span className="block text-ink">{coffee}</span>
                  <span className="text-xs text-graphite">Size: {size}</span>
                </div>
                <span className="text-ink">EGP {currentDrink?.price}</span>
              </div>
            </div>
            <div className="flex justify-between text-xl pt-4 border-t border-line">
              <span>Total</span>
              <span>EGP {currentDrink?.price}</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-12 flex justify-between pt-8 border-t border-line">
        <button
          onClick={prevStep}
          disabled={step === 0}
          className="px-6 py-3 text-sm text-graphite disabled:opacity-30 transition-opacity hover:text-ink"
        >
          Back
        </button>
        {step < STEPS.length - 1 ? (
          <button
            onClick={nextStep}
            disabled={
              (step === 0 && !location) ||
              (step === 1 && !coffee) ||
              (step === 3 && !time)
            }
            className="px-8 py-3 bg-ink text-cream text-sm disabled:opacity-50 transition-opacity hover:bg-sage-2"
          >
            Next Step
          </button>
        ) : (
          <button
            onClick={handlePlaceOrder}
            className="px-8 py-3 bg-ink text-cream text-sm transition-colors hover:bg-sage-2"
          >
            PLACE ORDER
          </button>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-6 backdrop-blur-sm">
          <div className="w-full max-w-md bg-cream p-10 text-center relative shadow-2xl">
            <h3 className="text-2xl mb-4">Order Received</h3>
            <p className="text-graphite text-sm leading-relaxed mb-8">
              This is a demo experience. In a production environment, this would connect to a real ordering system and payment gateway.
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                setStep(0);
                setLocation(null);
                setCoffee(null);
                setTime(null);
              }}
              className="px-8 py-3 border border-ink text-ink text-sm transition-colors hover:bg-ink hover:text-cream"
            >
              Start New Demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
