import { Link, NavLink } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Wrench } from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    to: "/adminDashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Create Service",
    to: "/serviceCreate",
    icon: PlusCircle,
  },
  {
    label: "View Services",
    to: "/services",
    icon: Wrench,
  },
];

const linkBaseClass =
  "flex items-center gap-2 rounded-xl border border-transparent px-4 py-3 text-sm font-semibold transition-all";

const AdminShell = ({ title, subtitle, children, actions }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-100 px-4 py-8 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-2xl bg-black p-6 text-white shadow-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-red-300">Admin Module</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-black sm:text-3xl">{title}</h1>
              {subtitle ? <p className="mt-1 text-sm text-gray-300">{subtitle}</p> : null}
            </div>
            {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3 px-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Navigation
              </p>
            </div>
            <nav className="space-y-2">
              {navItems.map(({ label, to, icon: Icon }) => (
                <NavLink
                  key={label}
                  to={to}
                  className={({ isActive }) =>
                    `${linkBaseClass} ${
                      isActive
                        ? "border-red-200 bg-red-50 text-red-700"
                        : "text-gray-700 hover:border-gray-200 hover:bg-gray-50"
                    }`
                  }
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="mt-6 rounded-xl bg-gray-50 p-3">
              <p className="text-sm font-semibold text-gray-800">Need public preview?</p>
              <Link
                to="/"
                className="mt-2 inline-flex text-sm font-semibold text-red-700 hover:text-red-600"
              >
                Open Website
              </Link>
            </div>
          </aside>

          <section className="space-y-6">{children}</section>
        </div>
      </div>
    </div>
  );
};

export default AdminShell;
