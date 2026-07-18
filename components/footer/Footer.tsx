import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";
import Logo from "@/components/ui/Logo";

const columns = [
  {
    title: "Visit",
    links: [
      { label: "Locations", href: "/locations" },
      { label: "Menu", href: "/menu" },
      { label: "Experiences", href: "/experiences" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Coffee Origins", href: "/origins" },
      { label: "Journal", href: "/journal" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Subscription", href: "/#subscription" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-cream-2">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo size="lg" className="items-start" />
            <p className="mt-8 max-w-xs text-sm leading-relaxed text-graphite">
              Coffee as quiet luxury. Sourced with care, roasted with
              precision, served with calm.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="label text-sage-3">{col.title}</h3>
                <ul className="mt-6 space-y-4">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-graphite transition-colors duration-300 hover:text-ink"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-graphite">
            © {new Date().getFullYear()} Nine Two Nine Specialty Coffee. All
            rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="text-graphite transition-colors hover:text-sage-2"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="text-graphite transition-colors hover:text-sage-2"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="text-graphite transition-colors hover:text-sage-2"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
