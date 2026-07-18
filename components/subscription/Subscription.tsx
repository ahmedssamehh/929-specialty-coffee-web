"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  plan: z.enum(["monthly", "biweekly"]),
});

type FormValues = z.infer<typeof schema>;

const plans = [
  {
    id: "monthly" as const,
    name: "Monthly",
    price: "24 / month",
    perks: ["250 g of a rotating origin", "Roasted to order", "Brew guide included"],
  },
  {
    id: "biweekly" as const,
    name: "Every two weeks",
    price: "42 / month",
    perks: ["2 × 250 g, two origins", "Roaster's notes & cupping scores", "Free workshop seat yearly"],
  },
];

export default function Subscription() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { plan: "monthly" },
    mode: "onBlur",
  });

  const plan = watch("plan");

  const onSubmit = async (_values: FormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    setDone(true);
  };

  return (
    <section
      id="subscription"
      className="bg-ink py-28 text-cream md:py-36"
      aria-label="Coffee subscription"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <p className="label reveal text-sage">Subscription</p>
          <h2
            className="reveal mt-5 text-4xl font-light leading-[1.08] tracking-editorial md:text-5xl"
            data-reveal-delay="100"
          >
            The origins,
            <br />
            delivered quietly.
          </h2>
          <p
            className="reveal mt-6 max-w-md leading-relaxed text-cream/70"
            data-reveal-delay="200"
          >
            Freshly roasted lots from the season&apos;s best farms, shipped
            within 48 hours of roast. Pause or cancel any time.
          </p>
        </div>

        <div className="reveal" data-reveal-delay="250">
          {done ? (
            <div
              role="status"
              className="flex h-full flex-col items-start justify-center rounded-2xl border border-cream/15 p-10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage text-ink">
                <Check size={22} />
              </span>
              <h3 className="mt-6 text-2xl font-light tracking-editorial">
                Welcome to the list.
              </h3>
              <p className="mt-3 text-sm text-cream/70">
                We&apos;ll be in touch before the next roast day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                {plans.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setValue("plan", p.id)}
                    aria-pressed={plan === p.id}
                    className={cn(
                      "rounded-2xl border p-6 text-left transition-all duration-300",
                      plan === p.id
                        ? "border-sage bg-sage/10"
                        : "border-cream/15 hover:border-cream/40"
                    )}
                  >
                    <p className="label text-sage">{p.name}</p>
                    <p className="mt-3 text-xl font-light">{p.price}</p>
                    <ul className="mt-4 space-y-2 text-xs text-cream/70">
                      {p.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2">
                          <Check size={12} className="mt-0.5 shrink-0 text-sage" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <label htmlFor="sub-email" className="label text-cream/60">
                  Email
                </label>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="sub-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                    className="w-full rounded-full border border-cream/20 bg-transparent px-6 py-4 text-sm text-cream placeholder:text-cream/40 focus:border-sage focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="label shrink-0 rounded-full bg-sage px-8 py-4 text-ink transition-colors duration-300 hover:bg-sage-2 hover:text-cream disabled:opacity-60"
                  >
                    {isSubmitting ? "Joining…" : "Subscribe"}
                  </button>
                </div>
                {errors.email && (
                  <p role="alert" className="mt-3 text-xs text-[#d9a08a]">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
