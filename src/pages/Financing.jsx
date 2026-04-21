import React, { useState, useEffect } from 'react';
import { ChevronRight, Shield, Clock, DollarSign, CheckCircle, Phone, Mail } from 'lucide-react';
import Loader from '../components/common/items/Loader';

const Financing = () => {
  const [financingOptions, setFinancingOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulated API call
  useEffect(() => {
    const fetchFinancingData = async () => {
      try {
        const mockData = [
          {
            id: 1,
            title: "0% Interest Financing",
            description: "Get your excavation project started with no interest for the first 12 months. Perfect for residential and commercial projects.",
            icon: "💰"
          },
          {
            id: 2,
            title: "Quick Approval Program",
            description: "Fast-track approval process with decisions in 24 hours. Minimal paperwork required for qualified applicants.",
            icon: "⚡"
          },
          {
            id: 3,
            title: "Equipment Lease Options",
            description: "Lease our premium excavating equipment with flexible terms. Includes maintenance and operator training.",
            icon: "🚜"
          },
          {
            id: 4,
            title: "Project-Based Financing",
            description: "Tailored financing solutions for large-scale excavation projects. Competitive rates and flexible payment schedules.",
            icon: "🏗️"
          }
        ];

        setTimeout(() => {
          setFinancingOptions(mockData);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to load financing options', err);
        setLoading(false);
      }
    };

    fetchFinancingData();
  }, []);

  const benefits = [
    "Flexible payment terms",
    "Competitive interest rates",
    "Quick approval process",
    "No hidden fees",
    "Professional support",
    "Tailored for your project"
  ];

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#f3f5f8]">
        <div className="text-center text-[var(--dd-copy)]">
          <DollarSign className="mx-auto mb-4 h-12 w-12 text-red-400" />
          <p className="mb-4 text-xl">⚠️ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-[var(--dd-accent)] px-6 py-3 text-white transition-colors hover:bg-[var(--dd-accent-deep)]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dirt-home -mx-5 bg-[#f3f5f8] px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl space-y-16">
        
        {/* Header Section */}
        <section className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--dd-muted)]">
            Flexible Options
          </p>
          <h1 className="mt-2 text-4xl text-[var(--dd-accent-deep)] sm:text-5xl">Financing Solutions</h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[var(--dd-copy)]">
            Power your excavation projects with flexible financing options designed for contractors, businesses, and homeowners alike.
          </p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { icon: DollarSign, value: "$2M+", label: "Financed Projects" },
            { icon: Clock, value: "24hr", label: "Quick Approval" },
            { icon: Shield, value: "100%", label: "Secure Process" }
          ].map((stat, index) => (
            <div key={index} className="rounded-2xl border border-black/8 bg-white p-8 text-center shadow-[0_24px_45px_-36px_rgba(10,14,25,0.45)]">
              <stat.icon className="mx-auto mb-4 h-10 w-10 text-[var(--dd-accent)]" />
              <div className="mb-2 text-3xl font-bold text-[var(--dd-accent-deep)]">{stat.value}</div>
              <div className="text-sm font-medium uppercase tracking-[0.1em] text-[var(--dd-muted)]">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Financing Options */}
        <section>
          <div className="mb-10 text-center">
             <h2 className="text-3xl text-[var(--dd-accent-deep)]">Choose Your Financing Plan</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {financingOptions.map((option) => (
              <div
                key={option.id}
                className="group flex flex-col rounded-2xl border border-black/8 bg-white p-8 shadow-[0_24px_45px_-36px_rgba(10,14,25,0.45)] transition-shadow hover:shadow-[0_24px_45px_-24px_rgba(10,14,25,0.6)]"
              >
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#f3f5f8] text-3xl transition-transform group-hover:scale-110">
                    {option.icon}
                  </div>
                  <div>
                    <h3 className="mb-3 text-2xl font-bold text-[var(--dd-accent-deep)]">
                      {option.title}
                    </h3>
                    <p className="text-base leading-relaxed text-[var(--dd-copy)]">
                      {option.description}
                    </p>
                  </div>
                </div>
                
                <div className="mt-auto pt-4">
                  <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--dd-accent)] bg-white px-6 py-3 font-semibold text-[var(--dd-accent)] transition hover:bg-[var(--dd-accent)] hover:text-white">
                    <span>Learn More</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="rounded-2xl border border-black/8 bg-white p-10 shadow-[0_24px_45px_-36px_rgba(10,14,25,0.45)] sm:p-14">
          <h3 className="mb-10 text-center text-3xl text-[var(--dd-accent-deep)]">
            Why Choose Our Financing?
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 shrink-0 text-[var(--dd-accent)]" />
                <span className="text-lg font-medium text-[var(--dd-copy)]">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-2xl border border-black/8 bg-[var(--dd-soft)] p-10 text-center shadow-[0_24px_45px_-36px_rgba(10,14,25,0.45)] sm:p-16">
          <h3 className="mb-4 text-3xl font-bold text-[var(--dd-accent-deep)]">
            Ready to Get Started?
          </h3>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-[var(--dd-copy)]">
            Contact our financing specialists today for a personalized quote and quick approval.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--dd-accent)] px-8 py-4 font-semibold text-white transition hover:bg-[var(--dd-accent-deep)] sm:w-auto">
              <Phone className="h-5 w-5" />
              <span>Call Now</span>
            </button>
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-8 py-4 font-semibold text-[var(--dd-accent-deep)] transition hover:bg-gray-50 sm:w-auto">
              <Mail className="h-5 w-5" />
              <span>Get Quote Online</span>
            </button>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default Financing;