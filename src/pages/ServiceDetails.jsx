import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Globe, Image, Trash2, Type, Video } from "lucide-react";
import Loader from "../components/common/items/Loader";
import { getImageUrl } from "../utils/getImageUrl";
import {
  fetchServiceById,
  updateService,
  deleteService,
} from "../features/servicesProvide/actions/servicesThunks";

const ensureHttpProtocol = (url) => {
  if (!url) {
    return "";
  }

  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

const inputClass =
  "w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200";

const fileClass =
  "w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-black file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-gray-400";

const ServiceDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const { selectedService, loading } = useSelector((state) => state.service);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      websiteUrl: "",
    },
  });

  const bannerFiles = watch("bannerFiles");
  const imageFile = watch("imageFile");
  const videoFile = watch("videoFile");

  useEffect(() => {
    if (!selectedService || selectedService._id !== id) {
      dispatch(fetchServiceById(id));
    }
  }, [dispatch, id, selectedService]);

  useEffect(() => {
    if (!selectedService) {
      return;
    }

    reset({
      title: selectedService.title || "",
      description: selectedService.description || "",
      websiteUrl: selectedService.websiteUrl || "",
    });
  }, [selectedService, reset]);

  const onUpdate = async (formValues) => {
    if (loading) {
      return;
    }

    try {
      const payload = {
        title: formValues.title,
        description: formValues.description,
        websiteUrl: ensureHttpProtocol(formValues.websiteUrl),
      };

      const banners = formValues.bannerFiles
        ? Array.from(formValues.bannerFiles).filter(Boolean)
        : [];
      if (banners.length) {
        payload.banners = banners;
      }

      if (formValues.imageFile?.[0]) {
        payload.image = formValues.imageFile[0];
      }

      if (formValues.videoFile?.[0]) {
        payload.video = formValues.videoFile[0];
      }

      await dispatch(updateService({ serviceDetailId: id, updateData: payload })).unwrap();
      toast.success("Service updated");
      navigate("/services");
    } catch (error) {
      toast.error(error || "Failed to update service");
    }
  };

  const onDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    if (loading) {
      return;
    }

    try {
      await dispatch(deleteService({ serviceDetailId: id })).unwrap();
      toast.success("Service deleted");
      navigate("/services");
    } catch (error) {
      toast.error(error || "Failed to delete service");
    }
  };

  if (!selectedService || selectedService._id !== id) {
    return <Loader />;
  }

  const gallery = selectedService.banners || [];
  const activeImage = gallery[selectedImage] || selectedService.image || "";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-2xl bg-black p-6 text-white shadow-xl">
          <h1 className="text-2xl font-black sm:text-3xl">{selectedService.title}</h1>
          <p className="mt-2 text-sm text-gray-300">
            View service details and manage admin updates from one screen.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/services")}
              className="rounded-xl border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Back to Services
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <img
              src={activeImage ? getImageUrl(activeImage) : "/placeholder.jpg"}
              alt={selectedService.title}
              className="h-80 w-full rounded-xl border border-gray-200 object-cover"
              onError={(event) => {
                event.currentTarget.src = "/placeholder.jpg";
              }}
            />

            {gallery.length > 1 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {gallery.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`h-14 w-14 overflow-hidden rounded-lg border-2 transition ${
                      selectedImage === index ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={getImageUrl(image)}
                      alt={`Preview ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-gray-900">Service Information</h2>
            <p className="mt-2 whitespace-pre-line text-sm text-gray-700">{selectedService.description}</p>
            {selectedService.websiteUrl ? (
              <a
                href={selectedService.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm font-semibold text-red-700 hover:text-red-600"
              >
                {selectedService.websiteUrl}
              </a>
            ) : null}
            {selectedService.video ? (
              <div className="mt-4">
                <video controls className="w-full rounded-xl border border-gray-200">
                  <source src={getImageUrl(selectedService.video)} type="video/mp4" />
                </video>
              </div>
            ) : null}
          </div>
        </div>

        {currentUser?.userType === "Admin" ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-gray-900">Admin Edit Module</h2>
            <p className="mt-1 text-sm text-gray-600">
              Update service content and replace media files. Leave file inputs empty to keep current files.
            </p>

            <form onSubmit={handleSubmit(onUpdate)} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Type size={16} className="text-gray-500" />
                  Title
                </label>
                <input
                  {...register("title", {
                    required: "Title is required",
                    minLength: { value: 3, message: "Title must be at least 3 characters" },
                  })}
                  className={inputClass}
                  type="text"
                  placeholder="Service title"
                />
                {errors.title ? <p className="mt-1 text-sm text-red-600">{errors.title.message}</p> : null}
              </div>

              <div>
                <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Type size={16} className="text-gray-500" />
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                    minLength: { value: 10, message: "Description must be at least 10 characters" },
                  })}
                  rows={6}
                  className={inputClass}
                  placeholder="Service description"
                />
                {errors.description ? (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Globe size={16} className="text-gray-500" />
                  Website URL
                </label>
                <input
                  {...register("websiteUrl", {
                    validate: (value) => {
                      if (!value) {
                        return true;
                      }
                      const normalized = ensureHttpProtocol(value);
                      try {
                        new URL(normalized);
                        return true;
                      } catch {
                        return "Please enter a valid URL";
                      }
                    },
                  })}
                  className={inputClass}
                  type="text"
                  placeholder="https://example.com"
                />
                {errors.websiteUrl ? (
                  <p className="mt-1 text-sm text-red-600">{errors.websiteUrl.message}</p>
                ) : null}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Image size={16} className="text-gray-500" />
                    Replace/Add Banners
                  </label>
                  <input
                    {...register("bannerFiles")}
                    type="file"
                    multiple
                    accept="image/*"
                    className={fileClass}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {bannerFiles?.length ? `${bannerFiles.length} file(s) selected` : "No files selected"}
                  </p>
                </div>

                <div>
                  <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Image size={16} className="text-gray-500" />
                    Replace Card Image
                  </label>
                  <input {...register("imageFile")} type="file" accept="image/*" className={fileClass} />
                  <p className="mt-1 text-xs text-gray-500">
                    {imageFile?.length ? imageFile[0].name : "No file selected"}
                  </p>
                </div>
              </div>

              <div>
                <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Video size={16} className="text-gray-500" />
                  Replace Video
                </label>
                <input {...register("videoFile")} type="file" accept="video/*" className={fileClass} />
                <p className="mt-1 text-xs text-gray-500">
                  {videoFile?.length ? videoFile[0].name : "No file selected"}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Update Service"}
                </button>
                <button
                  type="button"
                  onClick={onDelete}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Trash2 size={16} />
                  Delete Service
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ServiceDetails;
