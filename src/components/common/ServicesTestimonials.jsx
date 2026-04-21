import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import QuickBooksLogo from "../../assets/QuickBooksLogo.png";

const testimonials = [
  {
    quote:
      "You took an absolute eye sore of a driveway and turned it into something beautiful. Thank you for your honesty and hard work.",
    name: "Residential Client",
  },
  {
    quote:
      "We were amazed with what you did. The entire project came out better than expected and the process was smooth.",
    name: "Property Owner",
  },
  {
    quote:
      "Thanks for the magnificent job on our driveway. We could not believe the transformation.",
    name: "Homeowner",
  },
];

const ServicesTestimonials = () => {
  return (
    <>
      <section className="-mx-5 bg-[#0a0b0d] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="text-center text-3xl sm:text-4xl">Testimonials</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.quote} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm leading-7 text-white/80">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--dd-signal)]">
                  {testimonial.name}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="-mx-5 bg-[var(--dd-accent)] py-14 text-white">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="text-3xl sm:text-4xl">Commitment to Quality</h2>
          <p className="mt-4 text-base leading-8 text-white/90 sm:text-lg">
            At Dirt Dogs Excavating our goal is to satisfy customers the first time by delivering
            professional excavation and earth moving services at a fair price.
          </p>
        </div>
      </section>

      <section className="-mx-5 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="rounded-xl border border-black/8 bg-[var(--dd-soft)] p-8 sm:p-10">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--dd-muted)]">
                  Financing Partner
                </p>
                <h3 className="mt-2 text-3xl">Flexible Payment Options</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--dd-copy)] sm:text-base">
                  We partner with QuickBooks financing options to help clients move projects
                  forward confidently and on schedule.
                </p>
              </div>
              <img src={QuickBooksLogo} alt="QuickBooks logo" className="h-14 w-auto sm:h-16" />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <NavLink
                to="/financing"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--dd-ink)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-black"
              >
                View Financing
                <ArrowRight size={16} />
              </NavLink>
              <NavLink
                to="/quotes"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--dd-ink)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--dd-ink)] transition hover:bg-[var(--dd-ink)] hover:text-white"
              >
                Start A Quote
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesTestimonials;
