import { Metadata } from "next";
import OrderFlow from "@/components/order/OrderFlow";

export const metadata: Metadata = {
  title: "Order Ahead | 929 Specialty Coffee",
  description: "Order your favorite specialty coffee ahead of time.",
};

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-cream pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-12 text-center">
        <p className="inline-block rounded-full bg-sage-2/20 px-4 py-1.5 text-xs font-medium tracking-widest text-sage-3 uppercase mb-6">
          DEMO EXPERIENCE
        </p>
        <h1 className="text-4xl lg:text-5xl text-ink font-light tracking-tight">
          Order Ahead
        </h1>
      </div>
      <OrderFlow />
    </main>
  );
}
