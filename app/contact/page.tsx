import type { Metadata } from "next";
import { Instagram, Facebook, Twitter, Mail, MapPin } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to 929 Specialty Coffee — general, workshops, wholesale or press.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Say hello, slowly."
      />
      <section className="bg-cream py-20 md:py-28" aria-label="Contact form">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1.3fr_1fr] lg:px-10">
          <div className="reveal">
            <ContactForm />
          </div>

          <aside className="reveal space-y-10" data-reveal-delay="150">
            <div>
              <h2 className="label text-sage-3">Head office</h2>
              <p className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-graphite">
                <MapPin size={15} className="mt-0.5 shrink-0 text-sage-2" aria-hidden />
                929 Flagship — The Roastery
                <br />
                12 Foundry Lane, Downtown
              </p>
              <p className="mt-3 flex items-center gap-3 text-sm text-graphite">
                <Mail size={15} className="shrink-0 text-sage-2" aria-hidden />
                hello@929coffee.com
              </p>
            </div>

            <div>
              <h2 className="label text-sage-3">Social</h2>
              <div className="mt-4 flex items-center gap-5">
                <a href="https://instagram.com" aria-label="Instagram" className="text-graphite transition-colors hover:text-sage-2">
                  <Instagram size={18} />
                </a>
                <a href="https://facebook.com" aria-label="Facebook" className="text-graphite transition-colors hover:text-sage-2">
                  <Facebook size={18} />
                </a>
                <a href="https://twitter.com" aria-label="Twitter" className="text-graphite transition-colors hover:text-sage-2">
                  <Twitter size={18} />
                </a>
              </div>
            </div>

            {/* mini map */}
            <div className="overflow-hidden rounded-2xl border border-line">
              <svg viewBox="0 0 400 240" className="w-full" role="img" aria-label="Map to the flagship">
                <rect width="400" height="240" fill="#ece8e2" />
                <g stroke="#d8d4ce" strokeWidth="1.5" fill="none">
                  <path d="M0 70 C120 60 260 85 400 65" />
                  <path d="M0 150 C140 140 240 165 400 145" />
                  <path d="M90 0 C100 90 80 170 95 240" />
                  <path d="M240 0 C250 80 230 180 245 240" />
                </g>
                <circle cx="200" cy="110" r="7" fill="#6F8578" stroke="#f5f2ec" strokeWidth="2.5" />
              </svg>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
