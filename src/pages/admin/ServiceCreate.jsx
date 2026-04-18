import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

const ServiceCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.service);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      websiteUrl: "",
    },
  });

  const onSubmit = async (formValues) => {
    setIsSubmitting(true);

    try {
      const payload = {
        title: formValues.title,
        description: formValues.description,
        websiteUrl: ensureHttpProtocol(formValues.websiteUrl),
        banners: formValues.banners
          ? Array.from(formValues.banners).filter(Boolean)
          : [],
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900">Create Service</h1>
        <p className="text-sm text-gray-600 mt-1">
          Add a new service card and details for your website.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              {...register("title", {
                required: "Service title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              })}
              type="text"
              placeholder="Enter service title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Service description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
              rows={5}
              placeholder="Write service description"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
            />
            {errors.websiteUrl && (
              <p className="text-sm text-red-600 mt-1">
                {errors.websiteUrl.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Banner Images
            </label>
            <input
              {...register("banners")}
              type="file"
              multiple
              accept="image/*"
              className="w-full text-sm text-gray-600 border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Image
            </label>
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              className="w-full text-sm text-gray-600 border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video
            </label>
            <input
              {...register("video")}
              type="file"
              accept="video/*"
              className="w-full text-sm text-gray-600 border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="px-5 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading || isSubmitting ? "Creating..." : "Create Service"}
            </button>
            <button
              type="button"
              onClick={() => reset()}
              disabled={loading || isSubmitting}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceCreate;
