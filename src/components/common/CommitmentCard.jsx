import { AlertCircle, ArrowRight, Calendar, ExternalLink, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from "../common/items/Button";
import Loader from "../common/items/Loader";
import { mockServicesData } from '../../data/servicesData';


const CommitmentCard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API (currently using mock data)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Mock data - replace with actual API call
        // we use the static mock data from the data folder for now
        
        // Simulate API call delay
        setTimeout(() => {
          setProjects(mockServicesData);
          setLoading(false);
        }, 1200);
      } catch (err) {
        setError('Failed to load projects', err);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    // In real implementation, navigate to project detail page
    console.log(`Navigating to project ${projectId}`);
    alert(`Redirecting to project ${projectId} detail page`);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Residential': 'bg-blue-500',
      'Driveway': 'bg-green-500',
      'Recreation': 'bg-purple-500',
      'Commercial': 'bg-orange-500',
      'Foundation': 'bg-red-500',
      'Infrastructure': 'bg-indigo-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Date unavailable';
    }
  };

  if (loading) {
    return <Loader />

  }

  if (error) {
    return (
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-slate-600 text-lg mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}          >
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">


      {/* Projects Section */}
      <div className="max-w-7xl mx-auto py-12 sm:py-16 lg:py-10 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
            Our Recent <span className="text-red-600">Projects</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Explore our latest excavation and earthmoving projects across Colorado
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:scale-105"
              onClick={() => handleProjectClick(project.id)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400/e2e8f0/64748b?text=Project+Image';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Category Badge */}
                <div className={`absolute top-3 sm:top-4 left-3 sm:left-4 ${getCategoryColor(project.category)} text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg`}>
                  {project.category}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/20 transition-all duration-300 flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                {/* Meta Information */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 text-xs sm:text-sm text-slate-500 space-y-1 sm:space-y-0">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{formatDate(project.date)}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3 group-hover:text-red-600 transition-colors leading-tight line-clamp-2">
                  {project.title}
                </h3>

                <p className="text-slate-600 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Read More Section */}
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-100">
                  <span className="text-xs sm:text-sm text-slate-500">{project.readTime}</span>
                  <Button >
                    <span>Read More</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className=" text-center mt-8 sm:mt-12">
          <Button className='lg:ml-122'>
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommitmentCard;
