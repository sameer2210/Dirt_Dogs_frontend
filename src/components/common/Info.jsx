import { Award, CheckCircle, Star, Users } from "lucide-react";

const stats = [
  { icon: Award, label: "Years Serving Colorado", value: "15+" },
  { icon: Users, label: "Satisfied Clients", value: "500+" },
  { icon: CheckCircle, label: "Projects Completed", value: "1000+" },
  { icon: Star, label: "Client Rating", value: "4.9/5" },
];

const Info = () => {
  return (
    <section className="-mx-5 bg-white py-14 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.95fr,1.05fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--dd-muted)]">
            About Our Work
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Built on Craft, Communication, and Clean Results</h2>
          <p className="mt-5 text-[15px] leading-7 text-[var(--dd-copy)] sm:text-base">
            We are committed to excellence in every project. Whether you need earth moving,
            foundation excavation, road grading, trenching, or arena prep, our team delivers with
            professionalism and attention to detail from start to finish.
          </p>
          <p className="mt-4 text-[15px] leading-7 text-[var(--dd-copy)] sm:text-base">
            Client trust matters. We focus on clear timelines, practical solutions, and quality
            outcomes that hold up long after the equipment leaves the site.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-lg border border-black/8 bg-[var(--dd-soft)] p-5">
                <Icon size={18} className="text-[var(--dd-accent)]" />
                <p className="mt-3 text-2xl">{stat.value}</p>
                <p className="mt-1 text-sm text-[var(--dd-muted)]">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Info;
