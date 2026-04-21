import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Mail, Menu, Phone, User, X } from "lucide-react";
import logo from "../../assets/logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Gallery", path: "/gallery" },
  { name: "Quotes", path: "/quotes" },
  { name: "Financing", path: "/financing" },
  { name: "Giving Back", path: "/giving-back" },
];

const serviceLinks = [
  { name: "Horse Arenas", path: "/services/horse-arenas" },
  { name: "Horse Arena Footing", path: "/services/horse-arena-footing" },
  { name: "Barn & Building Pads", path: "/services/barn-building-pads" },
  { name: "Laser Leveling", path: "/services/laser-leveling" },
  { name: "Driveways", path: "/services/driveways" },
  { name: "Finish Grade", path: "/services/finish-grade" },
  { name: "Foundations", path: "/services/foundations" },
  { name: "Road Base", path: "/services/road-base" },
  { name: "Road Grading", path: "/services/road-grading" },
  { name: "Trenching", path: "/services/trenching" },
  { name: "Earth Moving", path: "/services/earth-moving" },
  { name: "Erosion Matting", path: "/services/erosion-matting" },
  { name: "Dust Control", path: "/services/dust-control" },
];

const navLinkClass = ({ isActive }) =>
  `text-sm font-semibold uppercase tracking-[0.08em] transition ${
    isActive ? "text-[var(--dd-accent)]" : "text-slate-100 hover:text-[var(--dd-signal)]"
  }`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090d14]/95 backdrop-blur-xl">
      <div className="hidden border-b border-white/10 bg-[#121a29] md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-4 py-2 text-xs text-slate-300">
          <a href="tel:303-435-4774" className="inline-flex items-center gap-2 hover:text-white">
            <Phone size={12} />
            (303) 435-4774
          </a>
          <span className="text-slate-500">(303) 646-5438</span>
          <a
            href="mailto:garr@dirtdogsexcavating.com"
            className="inline-flex items-center gap-2 hover:text-white"
          >
            <Mail size={12} />
            garr@dirtdogsexcavating.com
          </a>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Dirt Dogs Logo" className="h-10 w-10 rounded-full border border-white/20" />
          <div>
            <p className="text-sm font-semibold text-white">Dirt Dogs</p>
            <p className="text-xs text-slate-400">Excavating</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.slice(0, 2).map((link) => (
            <NavLink key={link.name} to={link.path} className={navLinkClass}>
              {link.name}
            </NavLink>
          ))}

          <div className="group relative">
            <NavLink to="/services" className={navLinkClass}>
              <span className="inline-flex items-center gap-1">
                Services
                <ChevronDown size={14} className="transition group-hover:rotate-180" />
              </span>
            </NavLink>

            <div className="invisible absolute left-0 top-full mt-3 w-72 rounded-lg border border-white/10 bg-[#111927] p-2 opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100">
              <NavLink
                to="/services"
                className="block rounded-md px-3 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10"
              >
                All Services
              </NavLink>
              {serviceLinks.map((service) => (
                <NavLink
                  key={service.name}
                  to={service.path}
                  className="block rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  {service.name}
                </NavLink>
              ))}
            </div>
          </div>

          {navLinks.slice(2).map((link) => (
            <NavLink key={link.name} to={link.path} className={navLinkClass}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-full border border-white/20 p-2 text-slate-200 transition hover:bg-white/10 hover:text-white"
          >
            <User size={16} />
          </Link>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-md border border-white/20 p-2 text-slate-200 transition hover:bg-white/10 lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#0e1522] px-4 py-4 lg:hidden">
          <nav className="space-y-2">
            {navLinks.slice(0, 2).map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-[0.08em] ${
                    isActive ? "bg-white/10 text-[var(--dd-accent)]" : "text-slate-100 hover:bg-white/10"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <button
              onClick={() => setServicesOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-slate-100 hover:bg-white/10"
            >
              Services
              <ChevronDown size={15} className={`transition ${servicesOpen ? "rotate-180" : ""}`} />
            </button>

            {servicesOpen && (
              <div className="space-y-1 rounded-md border border-white/10 bg-white/5 p-2">
                <NavLink
                  to="/services"
                  onClick={closeMobileMenu}
                  className="block rounded px-2 py-1.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  All Services
                </NavLink>
                {serviceLinks.map((service) => (
                  <NavLink
                    key={service.name}
                    to={service.path}
                    onClick={closeMobileMenu}
                    className="block rounded px-2 py-1.5 text-sm text-slate-200 hover:bg-white/10 hover:text-white"
                  >
                    {service.name}
                  </NavLink>
                ))}
              </div>
            )}

            {navLinks.slice(2).map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-[0.08em] ${
                    isActive ? "bg-white/10 text-[var(--dd-accent)]" : "text-slate-100 hover:bg-white/10"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
