

import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, User, Phone, Mail, FileText } from "lucide-react";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.mobile-menu-container')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    {
      name: "Services",
      path: "/services",
      dropdown: true,
    },
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-gray-200/50 shadow-lg transition-all duration-500 ease-in-out ${isScrolled ? 'py-2' : 'py-0'
        }`}
    >
      {/* Contact Info Bar - Hidden when scrolled */}
      <div
        className={`bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 transition-all duration-500 ease-in-out overflow-hidden ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-16 opacity-100'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 lg:gap-6 py-2 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-1 sm:gap-2 hover:text-red-600 transition-colors duration-200">
              <Phone size={12} className="text-red-500 sm:w-4 sm:h-4" />
              <span className="font-medium">(303) 435-4774</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 hover:text-red-600 transition-colors duration-200">
              <FileText size={12} className="text-red-500 sm:w-4 sm:h-4" />
              <span className="font-medium">(303) 646-5438</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 hover:text-red-600 transition-colors duration-200 max-w-full">
              <Mail size={12} className="text-red-500 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="font-medium truncate">garr@dirtdogsexcavating.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                {/* Replace with your actual logo */}
                <img src={logo} className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center" alt="Dirt Dogs Logo" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800">Dirt Dogs</h1>
                <p className="text-xs sm:text-sm text-gray-600">Excavating</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name} className="relative group">
                  <NavLink
                    to={link.path}
                    className="flex items-center gap-1 px-3 py-2 font-mono font-bold text-black hover:text-red-600 rounded-lg transition-all duration-200 relative group"
                  >
                    {link.name}
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                  </NavLink>

                  {/* Desktop Dropdown Menu - Fixed positioning */}
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="py-3 max-h-96 overflow-y-auto">
                      {serviceLinks.map((service, index) => (
                        <NavLink
                          key={service.name}
                          to={service.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 border-l-3 border-transparent hover:border-red-500"
                          onClick={() => setMenuOpen(false)}
                          style={{ animationDelay: `${index * 30}ms` }}
                        >
                          {service.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 text-lg font-bold font-mono text-gray-950 hover:text-red-600 rounded-lg transition-all duration-200 relative group ${isActive ? 'text-red-600' : ''
                    }`
                  }
                >
                  {link.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </NavLink>
              )
            )}
          </nav>

          {/* Profile Icon and Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Profile Icon */}
            <Link
              to="/login"
              className="relative group p-2 bg-gray-100 hover:bg-red-50 rounded-full transition-all duration-300 hover:shadow-lg"
            >
              <User
                size={18}
                className="text-gray-600 group-hover:text-red-600 transition-colors duration-200 sm:w-5 sm:h-5"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-all duration-200 z-50"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Fixed overlay positioning */}
      <div
        className={`lg:hidden fixed inset-x-0 top-full bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out mobile-menu-container z-40 ${menuOpen
          ? 'max-h-screen opacity-100 visible'
          : 'max-h-0 opacity-0 invisible overflow-hidden'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1 max-h-96 overflow-y-auto">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.name} className="space-y-1">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-900 bg-gray-50 rounded-lg flex items-center justify-between"
                >
                  {link.name}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''
                      }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Mobile Services Dropdown */}
                <div
                  className={`pl-4 space-y-1 transition-all duration-300 overflow-hidden ${servicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  {serviceLinks.map((service) => (
                    <NavLink
                      key={service.name}
                      to={service.path}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      onClick={() => {
                        setMenuOpen(false);
                        setServicesOpen(false);
                      }}
                    >
                      {service.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `block px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive
                    ? "text-red-600 bg-red-50 border-l-4 border-red-500"
                    : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            )
          )}
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;