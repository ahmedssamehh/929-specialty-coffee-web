import Image from "next/image";
import Link from "next/link";
import { articles } from "@/lib/data";
import { photos } from "@/lib/images";
import SectionHeading from "@/components/ui/SectionHeading";

const articleImages = [
  photos.coffeeInBed,
  photos.espressoPour,
  photos.beansSack,
];

export default function JournalPreview() {
  const featured = articles[0];
  const secondary = articles.slice(1, 3);

  return (
    <section aria-label="The 929 Journal" className="py-24 bg-cream text-ink">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex justify-between items-end mb-16 reveal">
          <SectionHeading eyebrow="Journal" title="THE 929 JOURNAL" />
          <Link
            href="/journal"
            className="hidden md:inline-flex items-center space-x-2 border-b border-ink pb-1 hover:text-sage hover:border-sage transition-colors duration-300"
          >
            <span className="label">READ THE JOURNAL</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Article */}
          <div className="lg:col-span-8 reveal group cursor-pointer">
            <Link href="/journal">
              <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-cream-2">
                <Image
                  src={articleImages[0].src}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="label text-sage">{featured.category}</span>
                <span className="text-sm text-graphite">{featured.minutes} min read</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-medium tracking-editorial mb-4 group-hover:text-sage transition-colors duration-300">
                {featured.title}
              </h3>
              <p className="text-graphite max-w-2xl text-lg">
                {featured.excerpt}
              </p>
            </Link>
          </div>

          {/* Secondary Articles */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {secondary.map((article, index) => (
              <div key={article.title} className="reveal group cursor-pointer" data-reveal-delay={(index + 1) * 100}>
                <Link href="/journal">
                  <div className="relative aspect-video overflow-hidden mb-4 bg-cream-2">
                    <Image
                      src={articleImages[index + 1].src}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="label text-sage">{article.category}</span>
                    <span className="text-sm text-graphite">{article.minutes} min read</span>
                  </div>
                  <h3 className="text-xl font-medium tracking-editorial group-hover:text-sage transition-colors duration-300">
                    {article.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center md:hidden reveal">
          <Link
            href="/journal"
            className="inline-flex items-center space-x-2 border-b border-ink pb-1 hover:text-sage hover:border-sage transition-colors duration-300"
          >
            <span className="label">READ THE JOURNAL</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
