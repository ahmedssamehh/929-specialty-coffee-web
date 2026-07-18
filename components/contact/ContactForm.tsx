"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Please tell us your name"),
  email: z.string().email("Enter a valid email address"),
  topic: z.enum(["general", "workshops", "wholesale", "press"]),
  message: z.string().min(10, "A few more words would help"),
});

type FormValues = z.infer<typeof schema>;

const inputCls =
  "w-full rounded-xl border border-line bg-cream px-5 py-4 text-sm text-ink placeholder:text-graphite/50 transition-colors focus:border-sage-2 focus:outline-none";

export default function ContactForm() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { topic: "general" },
    mode: "onBlur",
  });

  if (done) {
    return (
      <div
        role="status"
        className="flex h-full flex-col items-start justify-center rounded-2xl border border-line p-10"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage text-cream">
          <Check size={22} />
        </span>
        <h2 className="mt-6 text-2xl font-light tracking-editorial text-ink">
          Message received.
        </h2>
        <p className="mt-3 text-sm text-graphite">
          We read everything, slowly and with coffee. Expect a reply within two
          working days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(async () => {
        await new Promise((r) => setTimeout(r, 600));
        setDone(true);
      })}
      noValidate
      className="space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="label text-graphite">
            Name <span aria-hidden className="text-sage-2">*</span>
          </label>
          <input
            id="c-name"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            {...register("name")}
            className={`mt-3 ${inputCls}`}
            placeholder="Your name"
          />
          {errors.name && (
            <p role="alert" className="mt-2 text-xs text-[#a4573f]">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="c-email" className="label text-graphite">
            Email <span aria-hidden className="text-sage-2">*</span>
          </label>
          <input
            id="c-email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            {...register("email")}
            className={`mt-3 ${inputCls}`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p role="alert" className="mt-2 text-xs text-[#a4573f]">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="c-topic" className="label text-graphite">
          Topic
        </label>
        <select id="c-topic" {...register("topic")} className={`mt-3 ${inputCls}`}>
          <option value="general">General</option>
          <option value="workshops">Workshops & cupping</option>
          <option value="wholesale">Wholesale & beans</option>
          <option value="press">Press</option>
        </select>
      </div>

      <div>
        <label htmlFor="c-message" className="label text-graphite">
          Message <span aria-hidden className="text-sage-2">*</span>
        </label>
        <textarea
          id="c-message"
          rows={5}
          aria-required="true"
          aria-invalid={!!errors.message}
          {...register("message")}
          className={`mt-3 resize-none ${inputCls}`}
          placeholder="How can we help?"
        />
        {errors.message && (
          <p role="alert" className="mt-2 text-xs text-[#a4573f]">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="label rounded-full bg-ink px-10 py-4 text-cream transition-colors duration-300 hover:bg-sage-2 disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
