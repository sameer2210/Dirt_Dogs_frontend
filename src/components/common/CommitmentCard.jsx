import { NavLink } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Removing Stones for Horse Arena Footing",
    location: "Parker, CO",
    description:
      "Deep footing prep, precise grading, and safe base work that helps preserve horse health and riding performance.",
    image:
      "https://images.unsplash.com/photo-1562771242-a02d9090c90d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Tamaracur Horse Riding Track Buildout",
    location: "Larkspur, CO",
    description:
      "A fully engineered track layout, delivered with exact elevations and drainage required for event-grade use.",
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "New Horse Arena Installation",
    location: "Longmont, CO",
    description:
      "Complete arena shaping and finish grade work with contractor-level precision and owner-focused communication.",
    image:
      "https://images.unsplash.com/photo-1464496894902-4a79e58116cf?q=80&w=1200&auto=format&fit=crop",
  },
];

const CommitmentCard = () => {
  return (
    <section className="-mx-5 bg-[#eff1f4] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--dd-muted)]">
              Featured Projects
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl">Proof Is in the Dirt</h2>
          </div>

          <NavLink
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--dd-accent)]"
          >
            View Gallery
            <ArrowRight size={16} />
          </NavLink>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-xl border border-black/8 bg-white shadow-[0_18px_45px_-30px_rgba(10,14,25,0.45)]"
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                  {project.location}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl leading-tight">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--dd-copy)]">{project.description}</p>
                <NavLink
                  to="/gallery"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--dd-accent)]"
                >
                  Continue Reading
                  <ExternalLink size={15} />
                </NavLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommitmentCard;
