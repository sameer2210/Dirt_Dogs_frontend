import React, { useState, useEffect } from 'react';
import { Heart, Users, Award, MapPin, Calendar, CheckCircle } from 'lucide-react';
import Loader from '../components/common/items/Loader';

const mockData = [
  {
    id: 1,
    title: "Elizabeth High School Baseball Field",
    description: "Donated excavation services for field preparation and drainage installation for the new baseball complex.",
    category: "Elizabeth High School",
    images: [
      "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&h=400&fit=crop"
    ],
    date: "2024-05-15",
    location: "Elizabeth, Colorado",
    impact: "Benefited 200+ student athletes"
  },
  {
    id: 2,
    title: "Behn Family Field",
    description: "Complete site preparation and grading services donated for the new athletic facility in Parker, Colorado.",
    category: "Ponderosa High School",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop"
    ],
    date: "2024-03-22",
    location: "Parker, Colorado",
    impact: "Supporting youth athletics"
  },
  {
    id: 3,
    title: "Daltons Moon Foundation",
    description: "Provided excavation and site preparation services to support this meaningful foundation's community projects.",
    category: "Foundation",
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop"
    ],
    date: "2024-07-10",
    location: "Elbert County, Colorado",
    impact: "Community development support"
  },
  {
    id: 4,
    title: "Kiowa Rodeo Grounds",
    description: "Donated earthwork and ground preparation services for the annual Kiowa Rodeo event facilities.",
    category: "Community Event",
    images: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=400&fit=crop"
    ],
    date: "2024-06-01",
    location: "Kiowa, Colorado",
    impact: "Annual community tradition"
  },
  {
    id: 5,
    title: "Little League Baseball Complex",
    description: "Complete field preparation and dugout excavation for the local Little League baseball organization.",
    category: "Little League",
    images: [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=400&fit=crop"
    ],
    date: "2024-04-18",
    location: "Elizabeth, Colorado",
    impact: "100+ young athletes served"
  }
];

const filters = [
  'All',
  'Elizabeth High School',
  'Ponderosa High School',
  'Foundation',
  'Community Event',
  'Little League'
];

const GivingBack = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    const fetchDonationData = async () => {
      try {
        // Simulating API call
        setTimeout(() => {
          setDonations(mockData);
          setFilteredDonations(mockData);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to load community support data', err);
        setLoading(false);
      }
    };
    fetchDonationData();
  }, []);

  useEffect(() => {
    if (selectedFilter === 'All') {
      setFilteredDonations(donations);
    } else {
      setFilteredDonations(donations.filter(donation => donation.category === selectedFilter));
    }
  }, [selectedFilter, donations]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#f3f5f8]">
        <div className="text-center text-[var(--dd-copy)]">
          <Heart className="mx-auto mb-4 h-12 w-12 text-red-400" />
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
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header Section */}
        <section className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--dd-muted)]">
            Community Support
          </p>
          <h1 className="mt-2 text-4xl text-[var(--dd-accent-deep)] sm:text-5xl">Giving Back</h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[var(--dd-copy)]">
            Dirt Dogs Excavating is proud to be actively involved in supporting our youth in the communities where we live and work such as Elizabeth, Colorado and Elbert County.
          </p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { icon: Users, value: "500+", label: "Youth Supported" },
            { icon: Award, value: "15+", label: "Projects Donated" },
            { icon: MapPin, value: "5+", label: "Communities Served" }
          ].map((stat, index) => (
            <div key={index} className="rounded-2xl border border-black/8 bg-white p-6 text-center shadow-[0_24px_45px_-36px_rgba(10,14,25,0.45)]">
              <stat.icon className="mx-auto mb-4 h-8 w-8 text-[var(--dd-accent)]" />
              <div className="mb-1 text-3xl font-bold text-[var(--dd-accent-deep)]">{stat.value}</div>
              <div className="text-sm uppercase tracking-[0.1em] text-[var(--dd-muted)]">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Filter Section */}
        <section className="flex flex-wrap items-center justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                selectedFilter === filter
                  ? 'border-[var(--dd-accent)] bg-[var(--dd-accent)] text-white'
                  : 'border-black/8 bg-white text-[var(--dd-copy)] hover:border-[var(--dd-accent)] hover:text-[var(--dd-accent)]'
              }`}
            >
              {filter}
            </button>
          ))}
        </section>

        {/* Projects Grid */}
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredDonations.map((donation) => (
            <article
              key={donation.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_24px_45px_-36px_rgba(10,14,25,0.45)] transition-all hover:shadow-[0_24px_45px_-24px_rgba(10,14,25,0.6)]"
            >
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={donation.images[0]}
                  alt={donation.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center justify-between text-xs text-[var(--dd-muted)]">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(donation.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {donation.location}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-[var(--dd-accent-deep)]">
                  {donation.title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-[var(--dd-copy)]">
                  {donation.description}
                </p>
                <div className="mt-auto border-t border-black/8 pt-4">
                  <div className="flex items-start gap-2 text-sm text-[var(--dd-accent)]">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span className="font-medium">Impact: {donation.impact}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {filteredDonations.length === 0 && (
          <div className="py-12 text-center text-[var(--dd-copy)]">
            <Heart className="mx-auto mb-4 h-12 w-12 text-[var(--dd-muted)]" />
            <p className="text-lg">No donations found for this category.</p>
          </div>
        )}

        {/* CTA Section */}
        <section className="mt-16 rounded-2xl border border-black/8 bg-white p-8 text-center shadow-[0_24px_45px_-36px_rgba(10,14,25,0.45)] sm:p-12">
          <Heart className="mx-auto mb-4 h-12 w-12 text-[var(--dd-accent)]" />
          <h2 className="mb-4 text-3xl font-semibold text-[var(--dd-accent-deep)]">
            Join Us in Making a Difference
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base text-[var(--dd-copy)]">
            Know of a community project that could use our support? We're always looking for ways to give back to our community.
          </p>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[var(--dd-accent)] px-8 py-4 font-semibold text-white transition hover:bg-[var(--dd-accent-deep)]">
            Contact Us About Community Support
          </button>
        </section>
      </div>
    </div>
  );
};

export default GivingBack;