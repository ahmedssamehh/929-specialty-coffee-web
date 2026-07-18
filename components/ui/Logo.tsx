import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "lg";
}) {
  const isLg = size === "lg";
  return (
    <Link
      href="/"
      aria-label="929 Specialty Coffee — home"
      className={cn("inline-flex flex-col items-center leading-none", className)}
    >
      <span
        className={cn(
          "font-semibold tracking-editorial",
          isLg ? "text-7xl md:text-8xl" : "text-2xl"
        )}
      >
        <span className="text-ink">92</span>
        <span className="text-sage">9</span>
      </span>
      <span
        className={cn(
          "mt-1 font-light uppercase text-ink",
          isLg
            ? "text-sm tracking-[0.5em]"
            : "text-[0.5rem] tracking-[0.42em]"
        )}
      >
        Nine&nbsp;Two&nbsp;Nine
      </span>
      <span
        className={cn(
          "font-light uppercase text-graphite",
          isLg
            ? "mt-1 text-[0.65rem] tracking-[0.4em]"
            : "text-[0.4rem] tracking-[0.34em]"
        )}
      >
        Specialty&nbsp;Coffee
      </span>
    </Link>
  );
}
