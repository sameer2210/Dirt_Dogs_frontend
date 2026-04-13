

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "../utils/getImageUrl";
import { Link } from "react-router-dom";
import { fetchServices } from "../features/servicesProvide";
import Loader from "../components/common/items/Loader";
import { mockServicesData } from "../data/servicesData";

// ServiceCard Component
const ServiceCard = ({ title, image, id }) => (
  <div className="w-full sm:w-1/2 md:w-1/3 p-4">
    <Link
      to={`/services/${id}`}
      className="block bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <img
        src={image ? getImageUrl(image) : "/placeholder.jpg"} // Use local fallback image
        alt={title}
        className="w-full h-48 object-cover rounded-t"
      // onError={(e) => (e.target.src = "/placeholder.jpg")} // Optional: Keep for additional safety
      />
      <div className="p-4 text-center bg-gray-100 rounded-b">
        <h3 className="text-red-600 text-lg font-bold">{title}</h3>
      </div>
    </Link>
  </div>
);

// Services Page
const Services = () => {
  const dispatch = useDispatch();
  const { items: services = [], loading, error } = useSelector(
    (state) => state.service
  );

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  if (loading) {
    return <Loader />
  }

  // Temporary fallback to static data if backend is empty or errors
  const displayServices = services.length > 0 ? services : mockServicesData;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-red-600 font-bold text-center mb-4">
        Services - We can help!
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Listed below is only a partial list of excavation and earth moving
        services we provide. If you don’t see the specific earth moving service
        you are looking for, contact us anyway.
      </p>

      <div className="flex flex-wrap -m-4">
        {displayServices.map((service) => (
          <ServiceCard
            key={service._id}
            title={service.title}
            image={service.banners ? service.banners[0] : service.image} // Handle both static data formatting and backend formatting
            id={service._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;