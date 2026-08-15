import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <section
      className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-6 text-center"
      aria-label="Page not found"
    >
      <Logo size="lg" />
      <p className="label mt-10 text-sage-3">404</p>
      <h1 className="mt-4 text-3xl font-light tracking-editorial text-ink md:text-5xl">
        This page doesn&apos;t exist yet.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-graphite">
        You may have followed an old link, or this section is part of a future
        phase. Either way, there&apos;s plenty to explore.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="label inline-flex items-center rounded-full bg-ink px-8 py-4 text-cream transition-colors duration-300 hover:bg-sage-2"
        >
          Back to 929
        </Link>
        <Link
          href="/proposal"
          className="label inline-flex items-center rounded-full border border-ink px-8 py-4 text-ink transition-all duration-300 hover:border-sage-2 hover:text-sage-2"
        >
          View the proposal
        </Link>
      </div>
    </section>
  );
}
