import { NavLink } from "react-router-dom";
import { ArrowRight, DollarSign, Globe2, Handshake, Image as ImageIcon } from "lucide-react";

const highlightItems = [
  {
    title: "Services",
    subtitle: "Excavation, grading, trenching, earth moving, foundations and more.",
    to: "/services",
    cta: "Explore",
    icon: Globe2,
    tone: "bg-[#4a0305]",
  },
  {
    title: "Gallery",
    subtitle: "See before-and-after transformations from our recent Colorado projects.",
    to: "/gallery",
    cta: "View Work",
    icon: ImageIcon,
    tone: "bg-[#7f0508]",
  },
  {
    title: "Giving Back",
    subtitle: "Local roots, local support, and a real commitment to our community.",
    to: "/giving-back",
    cta: "Read Story",
    icon: Handshake,
    tone: "bg-[#b3070b]",
  },
  {
    title: "Quotes",
    subtitle: "Get a clear estimate with direct communication from start to finish.",
    to: "/quotes",
    cta: "Request Now",
    icon: DollarSign,
    tone: "bg-[#db1a1e]",
  },
];

const HomeHighlights = () => {
  return (
    <section className="-mx-5 bg-[#eceef1] py-10 sm:py-14">
      <div className="mx-auto grid max-w-7xl gap-4 px-5 md:grid-cols-2 xl:grid-cols-4">
        {highlightItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.title}
              to={item.to}
              className={`${item.tone} group flex min-h-52 flex-col justify-between rounded-lg p-6 text-white transition duration-300 hover:-translate-y-1`}
            >
              <div>
                <Icon size={30} className="text-white/90" />
                <h3 className="mt-5 text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm text-white/75">{item.subtitle}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/90">
                {item.cta}
                <ArrowRight size={14} className="transition group-hover:translate-x-1" />
              </span>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default HomeHighlights;
