import { Metadata } from "next";

export const metadata: Metadata = {
  title: "929 Club | 929 Specialty Coffee",
  description: "A private space for people who take coffee seriously.",
};

const benefits = [
  {
    title: "Early Access to New Lots",
    desc: "Taste our most exclusive micro-lots before they reach the public menu.",
  },
  {
    title: "Private Cuppings",
    desc: "Invitations to closed cupping sessions with our head roaster.",
  },
  {
    title: "Seasonal Drops",
    desc: "Curated coffee boxes delivered to your door every season.",
  },
  {
    title: "Member Events",
    desc: "Exclusive access to masterclasses and brewing workshops.",
  },
  {
    title: "Cupping Notes Library",
    desc: "Digital access to our complete archive of origin profiles and brew guides.",
  },
  {
    title: "Priority Reservations",
    desc: "Skip the wait for our most sought-after tasting experiences.",
  },
];

export default function ClubPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Dark Hero */}
      <section className="bg-ink pt-40 pb-20 md:pt-48 md:pb-24 text-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="label text-sage-2">929 Club</p>
          <h1 className="mt-6 max-w-3xl text-5xl font-light leading-[1.04] tracking-editorial md:text-7xl">
            A private space for people who take coffee seriously.
          </h1>
          <div className="mt-12 inline-block rounded-full border border-cream/20 bg-cream/5 px-4 py-1.5 text-xs tracking-widest uppercase">
            CONCEPT DEMONSTRATION
          </div>
        </div>
      </section>

      {/* Concept Disclaimer */}
      <section className="border-b border-line bg-sage-2/10 py-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <p className="text-xs text-graphite tracking-widest uppercase">
            This is a proposed membership concept
          </p>
        </div>
      </section>

      {/* Membership Concept */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-32">
        <div className="mb-20">
          <p className="label text-graphite mb-4">MEMBERSHIP</p>
          <h2 className="text-3xl md:text-4xl text-ink font-light">
            Founding Member Tier
          </h2>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <div key={i} className="border border-line p-8 bg-cream-2/50">
              <h3 className="text-xl text-ink mb-3">{b.title}</h3>
              <p className="text-graphite text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-line bg-cream-2 py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl text-ink font-light">How It Works</h2>
          </div>
          
          <div className="grid gap-12 md:grid-cols-3 relative before:absolute before:left-0 before:top-6 before:hidden before:h-[1px] before:w-full before:bg-line md:before:block">
            {[
              {
                step: "01",
                title: "Join",
                desc: "Apply for membership. We review applications to ensure our community shares our passion for coffee.",
              },
              {
                step: "02",
                title: "Collect",
                desc: "Receive your physical member card and access to the digital portal.",
              },
              {
                step: "03",
                title: "Experience",
                desc: "Unlock benefits instantly across all 929 Spaces and digital platforms.",
              },
            ].map((s) => (
              <div key={s.step} className="relative z-10 md:pt-12">
                <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-cream border border-line text-xs font-medium text-ink absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  {s.step}
                </div>
                <div className="text-center">
                  <span className="md:hidden block text-sage-2 label mb-4">{s.step}</span>
                  <h3 className="text-xl text-ink mb-4">{s.title}</h3>
                  <p className="text-graphite text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="mx-auto max-w-3xl px-6 lg:px-10 py-32 text-center">
        <p className="label text-graphite mb-6">COMING SOON</p>
        <h2 className="text-3xl md:text-5xl text-ink font-light mb-8">
          Join the waitlist.
        </h2>
        <p className="text-graphite mb-12">
          Leave your email to be notified when the 929 Club opens for applications.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" action="#">
          <input 
            type="email" 
            placeholder="Email address" 
            className="flex-1 border border-line bg-transparent px-6 py-4 outline-none focus:border-ink text-ink"
            required
          />
          <button 
            type="submit"
            className="bg-ink text-cream px-8 py-4 transition-colors hover:bg-sage-2 whitespace-nowrap"
          >
            NOTIFY ME
          </button>
        </form>
      </section>
    </main>
  );
}
