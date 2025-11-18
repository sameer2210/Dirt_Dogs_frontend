import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Calendar, ExternalLink, AlertCircle } from 'lucide-react';
import Button from "../common/items/Button"
import Loader from "../common/items/Loader"
import BrandName from "../common/items/BrnadName";


const CommitmentCard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API (currently using mock data)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Mock data - replace with actual API call
        const mockData = [
          {
            id: 1,
            title: "New Garage Pad for home out by Strasburg CO.",
            description: "Dirt Dogs Excavating recently finished excavation work on a new, detached garage pad for a home out by Strasburg CO. The homeowner has a modular home and wanted a detached garage to store his vehicles. Dirt Dogs Excavating spent a day leveling and preparing the area and excavating...",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
            location: "Strasburg, CO",
            date: "2024-07-15",
            category: "Residential",
            readTime: "3 min read"
          },
          {
            id: 2,
            title: "New driveway Loop for a home in Elizabeth, CO",
            description: "Dirt Dogs Excavating recently installed a road base driveway loop for a house in Elizabeth to make better access for delivery vehicles. This loop also provides additional parking for guests. The delivery trucks can more easily drive up to the home...",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
            location: "Elizabeth, CO",
            date: "2024-06-28",
            category: "Driveway",
            readTime: "4 min read"
          },
          {
            id: 3,
            title: "Pickleball Court Pad Excavation – Littleton, Colorado",
            description: "Dirt Dogs Excavating helped a homeowner in Littleton install a Pickleball court in their back yard. For this job, we cleared out trees, shrubs, and sod, replaced most of the...",
            image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&h=400&fit=crop",
            location: "Littleton, CO",
            date: "2024-06-12",
            category: "Recreation",
            readTime: "5 min read"
          },
          {
            id: 4,
            title: "Commercial Site Preparation - Parker Business District",
            description: "Complete site preparation and grading for a new commercial development in Parker's growing business district. The project included utility trenching and drainage systems...",
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
            location: "Parker, CO",
            date: "2024-05-22",
            category: "Commercial",
            readTime: "6 min read"
          },
          {
            id: 5,
            title: "Basement Foundation Excavation - Castle Rock",
            description: "Precision basement excavation for a custom home in Castle Rock. The challenging terrain required careful planning and specialized equipment to ensure proper drainage...",
            image: "https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=600&h=400&fit=crop",
            location: "Castle Rock, CO",
            date: "2024-05-10",
            category: "Foundation",
            readTime: "4 min read"
          },
          {
            id: 6,
            title: "Ranch Road Construction - Elbert County",
            description: "Built a new access road for a working ranch in Elbert County. The project included proper grading, culvert installation, and gravel surfacing for all-weather access...",
            image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=400&fit=crop",
            location: "Elbert County, CO",
            date: "2024-04-18",
            category: "Infrastructure",
            readTime: "7 min read"
          }
        ];

        // Simulate API call delay
        setTimeout(() => {
          setProjects(mockData);
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
      <BrandName />

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
          {projects.map((project, index) => (
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






//-------------------------------------------------------------------dynamic------------------------


// import React, { useState, useEffect } from 'react';
// import { ArrowRight, MapPin, Calendar, ExternalLink, AlertCircle } from 'lucide-react';
// import axios from 'axios';
// import Button from '../common/items/Button';
// import Loader from '../common/items/Loader';
// import BrandName from '../common/items/BrnadName';

// const CommitmentCard = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);

//   // Create axios instance with your API configuration
//   const axiosInstance = axios.create({
//     baseURL: 'https://dirty-dog-api.onrender.com/api',
//     withCredentials: true,
//     timeout: 15000, // 15 seconds timeout for slower API
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   // Add response interceptor for error handling
//   axiosInstance.interceptors.response.use(
//     response => response,
//     error => {
//       console.error('API Error:', error);
//       return Promise.reject(error);
//     }
//   );

//   // Fetch projects from your API
//   const fetchProjects = async (pageNum = 1, append = false) => {
//     try {
//       // Adjust the endpoint based on your actual API structure
//       const response = await axiosInstance.get('/projects', {
//         params: {
//           page: pageNum,
//           limit: 6,
//           sort: '-createdAt', // or whatever sorting field your API uses
//         },
//       });

//       console.log('API Response:', response.data);

//       // Handle different possible response structures
//       let projectsList = [];
//       let paginationInfo = {};

//       if (response.data.data) {
//         // If response has data wrapper
//         projectsList = response.data.data;
//         paginationInfo = response.data.pagination || response.data.meta || {};
//       } else if (Array.isArray(response.data)) {
//         // If response is direct array
//         projectsList = response.data;
//       } else if (response.data.projects) {
//         // If response has projects key
//         projectsList = response.data.projects;
//         paginationInfo = response.data.pagination || {};
//       } else {
//         projectsList = [];
//       }

//       if (append) {
//         setProjects(prev => [...prev, ...projectsList]);
//       } else {
//         setProjects(projectsList);
//       }

//       // Handle pagination - adjust based on your API response structure
//       setHasMore(
//         paginationInfo.hasNextPage ||
//           paginationInfo.hasMore ||
//           (paginationInfo.currentPage &&
//             paginationInfo.totalPages &&
//             paginationInfo.currentPage < paginationInfo.totalPages) ||
//           projectsList.length >= 6 // Fallback: if we got full page, there might be more
//       );

//       setPage(pageNum);
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching projects:', err);

//       // Handle different error scenarios
//       let errorMessage = 'Failed to load projects. Please try again.';

//       if (err.code === 'ECONNABORTED') {
//         errorMessage = 'Request timeout. The server is taking too long to respond.';
//       } else if (err.response?.status === 404) {
//         errorMessage = 'Projects endpoint not found. Please check the API.';
//       } else if (err.response?.status === 500) {
//         errorMessage = 'Server error. Please try again later.';
//       } else if (err.response?.status === 403) {
//         errorMessage = 'Access denied. Please check your permissions.';
//       } else if (!navigator.onLine) {
//         errorMessage = 'No internet connection. Please check your network.';
//       } else if (err.response?.data?.message) {
//         errorMessage = err.response.data.message;
//       }

//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   };

//   // Initial load
//   useEffect(() => {
//     fetchProjects(1);
//   }, []);

//   // Handle project click
//   const handleProjectClick = async project => {
//     try {
//       console.log('Project clicked:', project);

//       // If you have a project detail endpoint
//       // const response = await axiosInstance.get(`/projects/${project.id || project._id}`);

//       // For now, just show project info
//       alert(
//         `Project: ${project.title}\nLocation: ${project.location}\nCategory: ${project.category}`
//       );
//     } catch (err) {
//       console.error('Error handling project click:', err);
//       alert('Unable to load project details. Please try again.');
//     }
//   };

//   // Load more projects
//   const handleLoadMore = async () => {
//     if (hasMore && !loadingMore) {
//       setLoadingMore(true);
//       await fetchProjects(page + 1, true);
//     }
//   };

//   // Retry failed request
//   const handleRetry = () => {
//     setLoading(true);
//     setError(null);
//     setPage(1);
//     setHasMore(true);
//     fetchProjects(1);
//   };

//   const getCategoryColor = category => {
//     const colors = {
//       Residential: 'bg-blue-500',
//       Driveway: 'bg-green-500',
//       Recreation: 'bg-purple-500',
//       Commercial: 'bg-orange-500',
//       Foundation: 'bg-red-500',
//       Infrastructure: 'bg-indigo-500',
//     };
//     return colors[category] || 'bg-gray-500';
//   };

//   const formatDate = dateString => {
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//       });
//     } catch {
//       return 'Date unavailable';
//     }
//   };

//   // Handle image loading errors
//   const handleImageError = (e, projectTitle) => {
//     e.target.src = `https://via.placeholder.com/600x400/e2e8f0/64748b?text=${encodeURIComponent(
//       projectTitle || 'Project Image'
//     )}`;
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   if (error && projects.length === 0) {
//     return (
//       <section className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto p-6">
//           <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//           <h3 className="text-lg font-semibold text-slate-800 mb-2">Unable to Load Projects</h3>
//           <p className="text-slate-600 text-base mb-6">{error}</p>
//           <Button onClick={handleRetry} className="w-full">
//             Try Again
//           </Button>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
//       <BrandName />

//       {/* Projects Section */}
//       <div className="max-w-7xl mx-auto py-12 sm:py-16 lg:py-10 px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
//             Our Recent <span className="text-red-600">Projects</span>
//           </h2>
//           <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
//             Explore our latest excavation and earthmoving projects across Colorado
//           </p>
//         </div>

//         {/* Error message for partial failures */}
//         {error && projects.length > 0 && (
//           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
//             <div className="flex items-center">
//               <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
//               <p className="text-yellow-800 text-sm">{error}</p>
//             </div>
//           </div>
//         )}

//         {/* Projects Grid */}
//         {projects.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
//             {projects.map((project, index) => (
//               <div
//                 key={project.id || project._id || index}
//                 className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:scale-105"
//                 onClick={() => handleProjectClick(project)}
//               >
//                 {/* Image Container */}
//                 <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64">
//                   <img
//                     src={
//                       project.image ||
//                       project.imageUrl ||
//                       project.images?.[0] ||
//                       project.thumbnail ||
//                       `https://via.placeholder.com/600x400/e2e8f0/64748b?text=${encodeURIComponent(
//                         project.title || 'Project'
//                       )}`
//                     }
//                     alt={project.title || 'Project Image'}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     onError={e => handleImageError(e, project.title)}
//                     loading="lazy"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

//                   {/* Category Badge */}
//                   <div
//                     className={`absolute top-3 sm:top-4 left-3 sm:left-4 ${getCategoryColor(
//                       project.category
//                     )} text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg`}
//                   >
//                     {project.category || 'Project'}
//                   </div>

//                   {/* Hover Overlay */}
//                   <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/20 transition-all duration-300 flex items-center justify-center">
//                     <ExternalLink className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" />
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-4 sm:p-6">
//                   {/* Meta Information */}
//                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 text-xs sm:text-sm text-slate-500 space-y-1 sm:space-y-0">
//                     <div className="flex items-center space-x-1">
//                       <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
//                       <span className="truncate">{project.location || 'Location N/A'}</span>
//                     </div>
//                     <div className="flex items-center space-x-1">
//                       <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
//                       <span>
//                         {formatDate(project.date || project.createdAt || project.updatedAt)}
//                       </span>
//                     </div>
//                   </div>

//                   <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3 group-hover:text-red-600 transition-colors leading-tight line-clamp-2">
//                     {project.title || project.name || 'Untitled Project'}
//                   </h3>

//                   <p className="text-slate-600 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed line-clamp-3">
//                     {project.description ||
//                       project.summary ||
//                       project.excerpt ||
//                       'No description available'}
//                   </p>

//                   {/* Read More Section */}
//                   <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-100">
//                     <span className="text-xs sm:text-sm text-slate-500">
//                       {project.readTime || project.estimatedReadTime || '3 min read'}
//                     </span>
//                     <Button>
//                       <span>Read More</span>
//                       <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <div className="max-w-md mx-auto">
//               <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <ExternalLink className="w-8 h-8 text-slate-400" />
//               </div>
//               <h3 className="text-lg font-semibold text-slate-800 mb-2">No Projects Found</h3>
//               <p className="text-slate-600">There are currently no projects to display.</p>
//             </div>
//           </div>
//         )}

//         {/* Load More Button */}
//         {projects.length > 0 && hasMore && (
//           <div className="text-center mt-8 sm:mt-12">
//             <Button onClick={handleLoadMore} disabled={loadingMore} className="lg:ml-122">
//               {loadingMore ? 'Loading...' : 'Load More Projects'}
//             </Button>
//           </div>
//         )}

//         {/* View All Button - when no more items to load */}
//         {projects.length > 0 && !hasMore && (
//           <div className="text-center mt-8 sm:mt-12">
//             <Button className="lg:ml-122">View All Projects</Button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default CommitmentCard;