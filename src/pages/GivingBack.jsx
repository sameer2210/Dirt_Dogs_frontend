import React, { useState, useEffect } from 'react';
import { Heart, Users, Award, MapPin, Calendar, Camera, Filter, ChevronDown } from 'lucide-react';

const GivingBack = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Available filters based on your data
  const filters = [
    'All',
    'Elizabeth High School Baseball Field',
    'Behn Family Field in Parker Colorado at Ponderosa High School',
    'Daltons Moon Foundation',
    'Kiowa Rodeo',
    'Little League Baseball'
  ];

  // Mock data - replace with your actual API call
  useEffect(() => {
    const fetchDonationData = async () => {
      try {
        // Replace with your actual API endpoint
        // const response = await fetch('/api/donations');
        // const data = await response.json();

        // Mock data for demonstration
        const mockData = [
          {
            id: 1,
            title: "Elizabeth High School Baseball Field",
            description: "Donated excavation services for field preparation and drainage installation for the new baseball complex.",
            category: "Elizabeth High School Baseball Field",
            images: [
              "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&h=400&fit=crop",
              "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop"
            ],
            date: "2024-05-15",
            location: "Elizabeth, Colorado",
            impact: "Benefited 200+ student athletes"
          },
          {
            id: 2,
            title: "Behn Family Field Ponderosa High School",
            description: "Complete site preparation and grading services donated for the new athletic facility in Parker, Colorado.",
            category: "Behn Family Field in Parker Colorado at Ponderosa High School",
            images: [
              "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop",
              "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=400&fit=crop"
            ],
            date: "2024-03-22",
            location: "Parker, Colorado",
            impact: "Supporting youth athletics"
          },
          {
            id: 3,
            title: "Daltons Moon Foundation",
            description: "Provided excavation and site preparation services to support this meaningful foundation's community projects.",
            category: "Daltons Moon Foundation",
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
            category: "Kiowa Rodeo",
            images: [
              "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=400&fit=crop",
              "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop"
            ],
            date: "2024-06-01",
            location: "Kiowa, Colorado",
            impact: "Annual community tradition"
          },
          {
            id: 5,
            title: "Little League Baseball Complex",
            description: "Complete field preparation and dugout excavation for the local Little League baseball organization.",
            category: "Little League Baseball",
            images: [
              "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=400&fit=crop",
              "https://images.unsplash.com/photo-1556266401-e8677de7e5c3?w=600&h=400&fit=crop"
            ],
            date: "2024-04-18",
            location: "Elizabeth, Colorado",
            impact: "100+ young athletes served"
          }
        ];

        setTimeout(() => {
          setDonations(mockData);
          setFilteredDonations(mockData);
          setLoading(false);
        }, 1200);

      } catch (err) {
        setError('Failed to load community support data', err);
        setLoading(false);
      }
    };

    fetchDonationData();
  }, []);

  // Filter function
  useEffect(() => {
    if (selectedFilter === 'All') {
      setFilteredDonations(donations);
    } else {
      setFilteredDonations(donations.filter(donation => donation.category === selectedFilter));
    }
  }, [selectedFilter, donations]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setShowFilters(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-white text-xl">Loading community support data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Heart className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-xl mb-4">⚠️ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 animate-pulse"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex justify-center mb-6">
              <Heart className="w-16 h-16 text-red-400 animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text hover:text-transparent animate-slide-up">
              Giving Back
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-orange-300 mb-6 animate-slide-up animation-delay-200">
              Proudly Giving Back to our Community!
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed animate-slide-up animation-delay-400">
              Dirt Dogs Excavating is proud to be actively involved in supporting our youth in the communities where we live and work such as Elizabeth, Colorado and Elbert County.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Users, value: "500+", label: "Youth Supported" },
              { icon: Award, value: "15+", label: "Projects Donated" },
              { icon: MapPin, value: "5+", label: "Communities Served" }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  <stat.icon className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-slate-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <h3 className="text-3xl font-bold text-white mb-4 md:mb-0 animate-slide-in">
            <span className="text-orange-400">Donated Services</span>
          </h3>

          <div className="relative animate-slide-in animation-delay-200">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gradient-to-r from-slate-700 to-slate-600 text-white px-6 py-3 rounded-xl border border-slate-500 hover:border-orange-500/50 transition-all duration-300 flex items-center space-x-2"
            >
              <Filter className="w-5 h-5" />
              <span>{selectedFilter}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {showFilters && (
              <div className="absolute top-full left-0 mt-2 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl z-10 min-w-full animate-slide-down">
                {filters.map((filter, index) => (
                  <button
                    key={filter}
                    onClick={() => handleFilterChange(filter)}
                    className={`block w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors first:rounded-t-xl last:rounded-b-xl ${selectedFilter === filter ? 'text-orange-400 bg-slate-700' : 'text-white'
                      }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Donations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredDonations.map((donation, index) => (
            <div
              key={donation.id}
              className="group bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl overflow-hidden border border-slate-600 hover:border-orange-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/10 animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image Gallery */}
              <div className="relative h-64 overflow-hidden">
                <div className="flex animate-slide-gallery">
                  {donation.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`${donation.title} ${imgIndex + 1}`}
                      className="w-full h-full object-cover flex-shrink-0 group-hover:scale-110 transition-transform duration-700"
                    />
                  ))}
                </div>
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-1">
                  <Camera className="w-4 h-4 text-white" />
                  <span className="text-white text-sm">{donation.images.length}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors leading-tight">
                    {donation.title}
                  </h4>
                  <div className="text-right text-sm text-slate-400 ml-4">
                    <div className="flex items-center space-x-1 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(donation.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{donation.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed mb-6">
                  {donation.description}
                </p>

                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-4 border border-orange-500/20">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-orange-400" />
                    <span className="text-orange-300 font-semibold">Impact:</span>
                    <span className="text-white">{donation.impact}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredDonations.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Heart className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <p className="text-xl text-slate-400">No donations found for the selected filter.</p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-center animate-pulse-slow">
          <Heart className="w-16 h-16 text-white mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-white mb-6">
            Join Us in Making a Difference
          </h3>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
            Know of a community project that could use our support? We're always looking for ways to give back to our community.
          </p>
          <button className="bg-white text-orange-600 font-bold py-4 px-8 rounded-xl hover:bg-slate-100 transition-all duration-300 hover:transform hover:scale-105">
            Contact Us About Community Support
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes slide-gallery {
          0%, 30% { transform: translateX(0); }
          35%, 65% { transform: translateX(-100%); }
          70%, 100% { transform: translateX(0); }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }

        .animate-slide-gallery {
          animation: slide-gallery 6s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
};

export default GivingBack;