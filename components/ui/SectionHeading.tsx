import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p className="label reveal text-sage-3">{eyebrow}</p>
      <h2
        className="reveal mt-5 text-4xl font-light leading-[1.08] tracking-editorial text-ink md:text-5xl"
        data-reveal-delay="100"
      >
        {title}
      </h2>
      {description && (
        <p
          className="reveal mt-6 leading-relaxed text-graphite"
          data-reveal-delay="200"
        >
          {description}
        </p>
      )}
    </div>
  );
}
