import React from "react";
import { FaCcAmex, FaCcDiscover, FaCcMastercard, FaCcVisa } from "react-icons/fa";

const paymentCards = [
  {
    name: "MasterCard",
    icon: FaCcMastercard,
    cardClass: "from-sky-300 to-sky-500",
    iconClass: "text-[#ff9f1a]",
  },
  {
    name: "Visa",
    icon: FaCcVisa,
    cardClass: "from-gray-100 to-gray-300",
    iconClass: "text-[#1a3fb0]",
  },
  {
    name: "American Express",
    icon: FaCcAmex,
    cardClass: "from-sky-300 to-sky-500",
    iconClass: "text-[#0a66c2]",
  },
  {
    name: "Discover",
    icon: FaCcDiscover,
    cardClass: "from-gray-100 to-gray-300",
    iconClass: "text-[#f36b1c]",
  },
];

const Footer = () => {
  return (
    <footer className="bg-black text-white text-sm mt-16 flex flex-col items-center">
      <div className=" text-center w-[90vw] py-12 text-sm font-semibold uppercase tracking-wide">
        Veteran owned • Licensed & insured • Estimates are always free
      </div>
      <div className=" pt-8 pb-4 px-4 md:px-16">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: Contact Info & Links */}
          <div>
            <h3 className="text-lg font-bold mb-2 text-white">
              Dirt Dogs Excavating Grading & Land LLC
            </h3>
            <p className="text-gray-300">Elizabeth, Colorado</p>
            <p className="text-red-600 mt-2">(303) 435-4774</p>
            <p className="text-white mt-1">(303) 646-5438</p>
            <a
              href="mailto:garr@dirtdogsexcavating.com"
              className="text-red-600 block mt-2"
            >
              garr@dirtdogsexcavating.com
            </a>

            {/* Links */}
            <div className="flex flex-wrap gap-4 mt-4 text-red-500">
              {[
                "Home",
                "Financing",
                "About",
                "Services",
                "Barn & Building Pads",
                "Driveways",
                "Dust Control",
                "Earth Moving",
                "Erosion Matting",
                "Footing",
                "Finish Grade",
                "Foundations",
                "Horse Arenas",
                "Road Base",
                "Road Grading",
                "Trenching",
                "Gallery",
                "Giving Back",
                "Quotes",
                "Elizabeth, Colorado",
                "Parker, Colorado",
                "Franktown, Colorado",
                "HTML Sitemap",
                "XML Sitemap",
              ].map((link, i) => (
                <a
                  key={i}
                  href="#"
                  className="hover:underline w-1/2 md:w-1/3 lg:w-1/4"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Payment & Copyright */}
          <div className="text-center">
            <h4 className="text-gray-400 mb-6 text-xl">We accept Credit Cards</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {paymentCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.name}
                    className={`h-24 rounded-xl border border-white/15 bg-gradient-to-b ${card.cardClass} shadow-[0_10px_30px_-18px_rgba(255,255,255,0.45)] flex items-center justify-center`}
                    aria-label={card.name}
                  >
                    <Icon className={`text-5xl ${card.iconClass}`} />
                  </div>
                );
              })}
            </div>
            <hr className="border-gray-700 mb-6" />
            <p className="text-gray-400 text-sm sm:text-base">
              Copyright 2024 Dirt Dogs Excavating Grading & Land LLC
            </p>
            <p className="text-red-600 text-sm mt-3">
              Powered by{" "}
              <a href="#" className="text-white hover:underline">
                Cymax Media
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
