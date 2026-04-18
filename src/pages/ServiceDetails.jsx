import { toast } from "react-toastify";
import { Image, FileText, Link2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getImageUrl } from "../utils/getImageUrl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/common/items/Button";
import Loader from "../components/common/items/Loader";
import { fetchServiceById, updateService, deleteService } from "../features/servicesProvide/actions/servicesThunks"; // Corrected path

// Input Field Component
const InputField = ({ label, icon: Icon, error, children, required }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
      {Icon && <Icon size={16} className="text-gray-500" />}
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && (
      <p className="text-sm text-red-500 flex items-center gap-1">
        <span className="w-1 h-1 bg-red-500 rounded-full" />
        {error.message}
      </p>
    )}
  </div>
);

const ServiceDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const { selectedService, loading } = useSelector((state) => state.service);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    defaultValues: selectedService ? {
      title: selectedService.title,
      description: selectedService.description,
      serviceName: selectedService.serviceName,
      footerContent: selectedService.footerContent,
      websiteUrl: selectedService.websiteUrl,
      banner: selectedService.banners?.[0] || "",
    } : {},
  });
  const watchedBanner = watch("banner");

  // Fetch service if not loaded
  useEffect(() => {
    if (!selectedService || selectedService._id !== id) {
      dispatch(fetchServiceById(id));
    }
  }, [dispatch, id, selectedService]);

  // Update form defaults when selectedService changes
  useEffect(() => {
    if (selectedService) {
      reset({
        title: selectedService.title,
        description: selectedService.description,
        serviceName: selectedService.serviceName,
        footerContent: selectedService.footerContent,
        websiteUrl: selectedService.websiteUrl,
        banner: selectedService.banners?.[0] || "",
      });
    }
  }, [selectedService, reset]);

  const UpdateHandler = async (data) => {
    if (loading) return;
    try {
      await dispatch(updateService({
        serviceDetailId: id,
        updateData: {
          title: data.title,
          description: data.description,
          serviceName: data.serviceName,
          footerContent: data.footerContent,
          websiteUrl: data.websiteUrl,
          banners: data.banner ? [data.banner] : selectedService.banners,
        },
      })).unwrap();
      toast.success("Service updated!");
      navigate("/services");
    } catch (error) {
      console.log("Error updating service:", error);
      toast.error("Failed to update service.");
    }
  };

  const DeleteHandler = async () => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    if (loading) return;
    try {
      await dispatch(deleteService({ serviceDetailId: id })).unwrap();
      toast.success("Service deleted!");
      navigate("/services");
    } catch (error) {
      console.log("Error deleting service:", error);
      toast.error("Failed to delete service.");
    }
  };

  if (!selectedService || selectedService._id !== id) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-full mx-auto">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow p-6 relative">
            {loading && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
              </div>
            )}
            {/* Service Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">{selectedService.title}</h1>
                <Button onClick={() => navigate("/services")} disabled={loading}>
                  Back
                </Button>
              </div>
              <p className="text-gray-600 mt-1">{selectedService.serviceName}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Service Images */}
              <div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <img
                    src={selectedService.banners?.[selectedImage] ? getImageUrl(selectedService.banners[selectedImage]) : "/placeholder.jpg"}
                    alt={selectedService.title}
                    className="w-full h-80 object-contain rounded"
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                  />
                </div>
                {selectedService.banners?.length > 1 && (
                  <div className="flex gap-2 mt-2">
                    {selectedService.banners.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-12 h-12 rounded border-2 ${selectedImage === index ? "border-blue-500" : "border-gray-200"}`}
                        disabled={loading}
                      >
                        <img src={image ? getImageUrl(image) : "/placeholder.jpg"} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Service Details */}
              <div className="space-y-4">
                <p className="text-gray-700 whitespace-pre-line">{selectedService.description}</p>
                {selectedService.footerContent && (
                  <div>
                    <p className="text-sm text-gray-600">Additional Information</p>
                    <p className="text-gray-700 whitespace-pre-line">{selectedService.footerContent}</p>
                  </div>
                )}
                {selectedService.websiteUrl && (
                  <div>
                    <p className="text-sm text-gray-600">Website</p>
                    <a
                      href={selectedService.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {selectedService.websiteUrl}
                    </a>
                  </div>
                )}
                {selectedService.video && (
                  <div>
                    <p className="text-sm text-gray-600">Video</p>
                    <video controls className="w-full">
                      <source src={selectedService.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            </div>

            {/* Admin Edit Section */}
            {currentUser?.userType === "Admin" && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Edit Service</h2>
                <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                  <form onSubmit={handleSubmit(UpdateHandler)} className="p-6 space-y-6">
                    {watchedBanner && (
                      <div className="flex justify-center">
                        <img
                          src={watchedBanner}
                          alt="Service preview"
                          className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                          onError={(e) => e.target.classList.add("hidden")}
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <InputField label="Banner Image URL" icon={Image} error={errors.banner}>
                          <input
                            {...register("banner", {
                              pattern: {
                                value: /^https?:\/\/.+/i,
                                message: "Please enter a valid image URL",
                              },
                            })}
                            placeholder="https://example.com/image.jpg"
                            type="url"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </InputField>

                        <InputField label="Service Name" icon={FileText} error={errors.serviceName} required>
                          <input
                            {...register("serviceName", {
                              required: "Service name is required",
                              minLength: { value: 3, message: "Service name must be at least 3 characters" },
                            })}
                            placeholder="Enter service name"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </InputField>

                        <InputField label="Service Title" icon={FileText} error={errors.title} required>
                          <input
                            {...register("title", {
                              required: "Service title is required",
                              minLength: { value: 3, message: "Title must be at least 3 characters" },
                            })}
                            placeholder="Enter service title"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </InputField>
                      </div>

                      <div className="space-y-4">
                        <InputField label="Footer Content" icon={FileText} error={errors.footerContent}>
                          <textarea
                            {...register("footerContent", {
                              minLength: { value: 10, message: "Footer content must be at least 10 characters" },
                            })}
                            placeholder="Enter footer content..."
                            rows={4}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                          />
                        </InputField>

                        <InputField label="Website URL" icon={Link2} error={errors.websiteUrl}>
                          <input
                            {...register("websiteUrl", {
                              validate: (value) => {
                                if (!value) {
                                  return true;
                                }
                                try {
                                  new URL(value);
                                  return true;
                                } catch {
                                  return "Please enter a valid URL";
                                }
                              },
                            })}
                            type="url"
                            placeholder="https://example.com"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </InputField>
                      </div>
                    </div>

                    <InputField label="Service Description" icon={FileText} error={errors.description} required>
                      <textarea
                        {...register("description", {
                          required: "Service description is required",
                          minLength: { value: 10, message: "Description must be at least 10 characters" },
                        })}
                        placeholder="Describe your service..."
                        rows={6}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                      />
                    </InputField>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                      <Button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Update Service"}
                      </Button>
                      <Button type="button" onClick={DeleteHandler} variant="danger" disabled={loading}>
                        Delete Service
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
};

export default ServiceDetails;
