import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Globe, Image, Type, Video } from "lucide-react";
import AdminShell from "../../components/admin/AdminShell";
import { createService } from "../../features/servicesProvide/actions/servicesThunks";

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

const ServiceCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.service);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const banners = watch("banners");
  const image = watch("image");
  const video = watch("video");

  const onSubmit = async (formValues) => {
    setIsSubmitting(true);

    try {
      const payload = {
        title: formValues.title,
        description: formValues.description,
        websiteUrl: ensureHttpProtocol(formValues.websiteUrl),
        banners: formValues.banners ? Array.from(formValues.banners).filter(Boolean) : [],
        image: formValues.image?.[0] || null,
        video: formValues.video?.[0] || null,
      };

      await dispatch(createService(payload)).unwrap();
      toast.success("Service created successfully");
      reset();
      navigate("/services");
    } catch (error) {
      toast.error(error || "Failed to create service");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminShell
      title="Create Service"
      subtitle="Add a new service module with media, details, and website link."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-gray-900">Basic Details</h2>
          <p className="mt-1 text-sm text-gray-600">Service text content shown on your services pages.</p>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Type size={16} className="text-gray-500" />
                Title
              </label>
              <input
                {...register("title", {
                  required: "Service title is required",
                  minLength: { value: 3, message: "Title must be at least 3 characters" },
                })}
                type="text"
                placeholder="Enter service title"
                className={inputClass}
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
                  required: "Service description is required",
                  minLength: { value: 10, message: "Description must be at least 10 characters" },
                })}
                rows={6}
                placeholder="Write service description"
                className={inputClass}
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

                    const withProtocol = ensureHttpProtocol(value);
                    try {
                      new URL(withProtocol);
                      return true;
                    } catch {
                      return "Please enter a valid website URL";
                    }
                  },
                })}
                type="text"
                placeholder="https://example.com"
                className={inputClass}
              />
              {errors.websiteUrl ? (
                <p className="mt-1 text-sm text-red-600">{errors.websiteUrl.message}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-gray-900">Media Uploads</h2>
          <p className="mt-1 text-sm text-gray-600">Upload banners, a card image, and optional video.</p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Image size={16} className="text-gray-500" />
                Banner Images
              </label>
              <input {...register("banners")} type="file" multiple accept="image/*" className={fileClass} />
              <p className="mt-1 text-xs text-gray-500">
                {banners?.length ? `${banners.length} file(s) selected` : "No files selected"}
              </p>
            </div>

            <div>
              <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Image size={16} className="text-gray-500" />
                Card Image
              </label>
              <input {...register("image")} type="file" accept="image/*" className={fileClass} />
              <p className="mt-1 text-xs text-gray-500">
                {image?.length ? image[0].name : "No file selected"}
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Video size={16} className="text-gray-500" />
                Service Video
              </label>
              <input {...register("video")} type="file" accept="video/*" className={fileClass} />
              <p className="mt-1 text-xs text-gray-500">
                {video?.length ? video[0].name : "No file selected"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading || isSubmitting ? "Creating..." : "Create Service"}
            </button>
            <button
              type="button"
              onClick={() => reset()}
              disabled={loading || isSubmitting}
              className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Reset Form
            </button>
          </div>
        </div>
      </form>
    </AdminShell>
  );
};

export default ServiceCreate;
