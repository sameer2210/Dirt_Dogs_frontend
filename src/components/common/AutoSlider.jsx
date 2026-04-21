import { NavLink } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1649807479468-40011b31ee09?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605475723788-08c82657b6af?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1670014773310-387f8a70a4af?q=80&w=1170&auto=format&fit=crop",
];

const serviceAreas = ["Elizabeth", "Franktown", "Parker", "Castle Rock"];

const AutoSlider = () => {
  return (
    <section className="-mx-5 relative overflow-hidden bg-[var(--dd-ink)] text-white">
      <div className="pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full bg-[var(--dd-accent)]/30 blur-[110px]" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-white/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-12 sm:pt-14 lg:pb-20">
        <p className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
          Dirt Dogs Grading &amp; Land LLC
        </p>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.08fr,0.92fr]">
          <div>
            <h1 className="text-4xl leading-[1.04] sm:text-5xl lg:text-7xl">
              Precision Earthwork.
              <span className="block text-[var(--dd-accent)]">Modern Execution.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/75 sm:text-lg">
              Professional excavation and grading for commercial and residential projects. From
              foundations and road grading to custom horse arenas, every detail is built for
              strength, function, and long-term value.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="tel:303-435-4774"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-2 text-sm text-white transition hover:bg-white/15"
              >
                <Phone size={16} />
                303-435-4774
              </a>
              <a
                href="mailto:Garr@DirtDogsExcavating.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-2 text-sm text-white transition hover:bg-white/15"
              >
                <Mail size={16} />
                Garr@DirtDogsExcavating.com
              </a>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-2 text-sm text-white/90">
                <MapPin size={16} />
                Elizabeth, CO
              </span>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <NavLink
                to="/quotes"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--dd-accent)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[var(--dd-accent-deep)]"
              >
                Request Quote
                <ArrowRight size={16} />
              </NavLink>
              <NavLink
                to="/services"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white hover:text-[var(--dd-ink)]"
              >
                Browse Services
              </NavLink>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-5 -top-5 h-24 w-24 border border-white/30" />
            <div className="grid gap-4 sm:grid-cols-2">
              <figure className="group relative sm:col-span-2">
                <img
                  src={heroImages[0]}
                  alt="Excavation machinery on site"
                  className="dd-float h-64 w-full rounded-xl object-cover shadow-2xl sm:h-80"
                />
                <figcaption className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/90">
                  Heavy Equipment Operations
                </figcaption>
              </figure>
              <img
                src={heroImages[1]}
                alt="Land grading equipment"
                className="h-36 w-full rounded-xl object-cover shadow-xl sm:h-40"
              />
              <img
                src={heroImages[2]}
                alt="Excavation site and terrain"
                className="h-36 w-full rounded-xl object-cover shadow-xl sm:h-40"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-white/20 bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.1em] text-white/85"
                >
                  {area}
                </span>
              ))}
              <span className="rounded-full border border-white/20 bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.1em] text-white/85">
                + Surrounding Areas
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutoSlider;
