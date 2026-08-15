"use client";

import { useState } from "react";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const AMOUNTS = [
  { id: "500", value: 500, label: "EGP 500" },
  { id: "1000", value: 1000, label: "EGP 1000" },
  { id: "2000", value: 2000, label: "EGP 2000" },
  { id: "custom", value: null, label: "CUSTOM" },
];

export default function GiftCardFlow() {
  const [selected, setSelected] = useState<string>("500");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const displayAmount = selected === "custom" 
    ? (customAmount ? `EGP ${customAmount}` : "EGP 0")
    : AMOUNTS.find(a => a.id === selected)?.label;

  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* Preview */}
        <div className="bg-ink p-1 rounded-2xl shadow-2xl relative overflow-hidden aspect-[1.58/1] flex flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-sage-3/30" />
          <div className="relative z-10 p-8 flex justify-between items-start">
            <Logo size="lg" className="text-cream [&_svg]:fill-cream" />
            <p className="text-cream/60 text-xs tracking-widest uppercase">Gift Card</p>
          </div>
          <div className="relative z-10 p-8 pt-0 flex justify-between items-end">
            <div>
              <p className="text-cream/50 text-xs mb-1">Value</p>
              <p className="text-cream text-2xl font-light">{displayAmount}</p>
            </div>
            <p className="text-cream/40 text-xs tracking-widest">NINE TWO NINE</p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-10">
          <div>
            <h3 className="label text-graphite mb-6">Select Amount</h3>
            <div className="grid grid-cols-2 gap-4">
              {AMOUNTS.map(amt => (
                <button
                  key={amt.id}
                  onClick={() => setSelected(amt.id)}
                  className={cn(
                    "py-4 px-6 border text-center transition-all",
                    selected === amt.id 
                      ? "border-ink bg-ink text-cream" 
                      : "border-line text-ink hover:border-graphite/50 bg-cream"
                  )}
                >
                  {amt.label}
                </button>
              ))}
            </div>
            
            {selected === "custom" && (
              <div className="mt-4">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-graphite">EGP</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full border border-line bg-transparent p-4 pl-14 text-ink outline-none transition-colors focus:border-ink"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="label text-graphite mb-6">Delivery Details</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Recipient Name" className="w-full border border-line bg-transparent p-4 text-ink outline-none focus:border-ink" />
              <input type="email" placeholder="Recipient Email" className="w-full border border-line bg-transparent p-4 text-ink outline-none focus:border-ink" />
              <textarea placeholder="Personal Message (Optional)" rows={3} className="w-full border border-line bg-transparent p-4 text-ink outline-none focus:border-ink resize-none" />
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full py-4 bg-ink text-cream transition-colors hover:bg-sage-2"
          >
            SEND AS GIFT
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-6 backdrop-blur-sm">
          <div className="w-full max-w-md bg-cream p-10 text-center relative shadow-2xl">
            <h3 className="text-2xl mb-4">Gift Card Concept</h3>
            <p className="text-graphite text-sm leading-relaxed mb-8">
              This is a concept demonstration. Gift card purchasing would be available in a future commerce integration.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-8 py-3 border border-ink text-ink text-sm transition-colors hover:bg-ink hover:text-cream"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
