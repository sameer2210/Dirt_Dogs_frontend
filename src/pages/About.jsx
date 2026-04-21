import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone, Quote } from "lucide-react";
import Loader from "../components/common/items/Loader";
import { fetchAboutContent } from "../features/user/actions/aboutThunks";
import { getImageUrl } from "../utils/getImageUrl";

const fallbackOwnerImage =
  "https://images.unsplash.com/photo-1621905252472-943afaa20e59?q=80&w=1200&auto=format&fit=crop";

const fallbackAbout = {
  companyHistory: {
    title: "Company History",
    description:
      "Dirt Dogs Excavating Grading and Land is a family owned and operated business founded in 2005 by Garr Hughes. After being in the construction industry in several different areas for 28 years, Garr decided to focus on the work he personally enjoys. It is Garr's direction and standards that have brought the company to where it is today.",
  },
  commitmentToQuality: {
    title: "Commitment to Quality",
    description:
      "Dirt Dogs Excavating can help with trenching, foundations, horse arenas, driveways and grading services of all types. Every project is approached with clear communication, honest timelines, and professional craftsmanship.",
  },
  ownerInfo: {
    name: "Garr Hughes",
    address: "Elizabeth, Colorado",
    phone: "(303) 435-4774",
    fax: "(303) 646-5438",
    email: "garr@dirtdogsexcavating.com",
    image: fallbackOwnerImage,
  },
  customerTestimonials: [
    {
      _id: "t1",
      name: "Jan G.",
      message: "Thank you, I was amazed at what you did. It looks GREAT!",
    },
    {
      _id: "t2",
      name: "Anonymous",
      message: "Thank you Garr, it looks great! We are really happy with it!",
    },
    {
      _id: "t3",
      name: "Kelly B.",
      message:
        "I wanted to thank you for the magnificent job on our driveway. You turned an absolute eye sore into something beautiful and we highly recommend your company.",
    },
  ],
  loyaldogsImage: [],
  serviceAreas: ["Elizabeth", "Parker", "Franktown", "Castle Rock", "Larkspur", "Longmont"],
};

const safeImageUrl = (value, fallback = fallbackOwnerImage) => {
  if (!value) return fallback;
  if (typeof value === "string" && (value.startsWith("http://") || value.startsWith("https://"))) {
    return value;
  }
  return getImageUrl(value);
};

const About = () => {
  const dispatch = useDispatch();
  const { about, loading } = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(fetchAboutContent());
  }, [dispatch]);

  const content = useMemo(() => {
    const apiAbout = about || {};

    const ownerInfo = {
      ...fallbackAbout.ownerInfo,
      ...(apiAbout.ownerInfo || {}),
      image: safeImageUrl(apiAbout?.ownerInfo?.image, fallbackAbout.ownerInfo.image),
    };

    const companyHistory = {
      ...fallbackAbout.companyHistory,
      ...(apiAbout.companyHistory || {}),
    };

    const commitmentToQuality = {
      ...fallbackAbout.commitmentToQuality,
      ...(apiAbout.commitmentToQuality || {}),
    };

    const customerTestimonials =
      Array.isArray(apiAbout.customerTestimonials) && apiAbout.customerTestimonials.length > 0
        ? apiAbout.customerTestimonials
        : fallbackAbout.customerTestimonials;

    const serviceAreas =
      Array.isArray(apiAbout.serviceAreas) && apiAbout.serviceAreas.length > 0
        ? apiAbout.serviceAreas
        : fallbackAbout.serviceAreas;

    return {
      ownerInfo,
      companyHistory,
      commitmentToQuality,
      customerTestimonials,
      serviceAreas,
    };
  }, [about]);

  if (loading && !about) return <Loader />;

  return (
    <div className="dirt-home -mx-5 bg-[#f3f5f8] px-5 py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.42fr,0.58fr]">
        <aside className="rounded-2xl border border-black/8 bg-white p-4 shadow-[0_24px_45px_-36px_rgba(10,14,25,0.45)] sm:p-5">
          <img
            src={content.ownerInfo.image}
            alt={content.ownerInfo.name}
            className="h-auto w-full rounded-xl object-cover"
            onError={(e) => {
              e.currentTarget.src = fallbackOwnerImage;
            }}
          />

          <div className="px-2 pb-2 pt-6 text-center">
            <h2 className="text-3xl">{content.ownerInfo.name}</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.14em] text-[var(--dd-muted)]">
              Dirt Dogs Excavating
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-[var(--dd-copy)]">
              <MapPin size={16} className="text-[var(--dd-accent)]" />
              {content.ownerInfo.address}
            </p>

            <div className="mt-6 space-y-2 text-left">
              <p className="inline-flex items-center gap-2 text-[var(--dd-copy)]">
                <Phone size={16} className="text-[var(--dd-accent)]" />
                {content.ownerInfo.phone}
              </p>
              <p className="inline-flex items-center gap-2 text-[var(--dd-copy)]">
                <Phone size={16} className="text-[var(--dd-accent)]" />
                {content.ownerInfo.fax}
              </p>
              <a
                href={`mailto:${content.ownerInfo.email}`}
                className="inline-flex items-center gap-2 text-[var(--dd-accent)] hover:underline"
              >
                <Mail size={16} />
                {content.ownerInfo.email}
              </a>
            </div>
          </div>
        </aside>

        <main className="rounded-2xl border border-black/8 bg-white p-6 shadow-[0_24px_45px_-36px_rgba(10,14,25,0.45)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--dd-muted)]">
            About Dirt Dogs
          </p>
          <h1 className="mt-2 text-4xl text-[var(--dd-accent-deep)] sm:text-5xl">About Dirt Dogs Excavating</h1>

          <section className="mt-8">
            <h2 className="text-3xl">{content.companyHistory.title}</h2>
            <p className="mt-4 text-base leading-8 text-[var(--dd-copy)]">{content.companyHistory.description}</p>
            <p className="mt-4 text-base leading-8 text-[var(--dd-copy)]">{content.commitmentToQuality.description}</p>
            <NavLink
              to="/services"
              className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-[var(--dd-accent)] transition hover:text-[var(--dd-accent-deep)]"
            >
              Learn More About Our Earth Moving Services
              <ArrowRight size={16} />
            </NavLink>
          </section>

          <section className="mt-10">
            <h2 className="text-3xl">Customer Testimonials</h2>
            <div className="mt-6 space-y-4">
              {content.customerTestimonials.map((testimonial, index) => (
                <article
                  key={testimonial._id || `${testimonial.name}-${index}`}
                  className="rounded-xl border border-black/8 bg-[var(--dd-soft)] p-5"
                >
                  <Quote size={16} className="text-[var(--dd-accent)]" />
                  <p className="mt-2 text-lg italic leading-8 text-[var(--dd-copy)]">
                    "{testimonial.message}"
                  </p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--dd-muted)]">
                    {testimonial.name || "Client"}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl">{content.commitmentToQuality.title}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {content.serviceAreas.map((area, index) => (
                <span
                  key={`${area}-${index}`}
                  className="rounded-full border border-black/8 bg-white px-3 py-1 text-sm font-medium text-[var(--dd-copy)]"
                >
                  {area}
                </span>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default About;
