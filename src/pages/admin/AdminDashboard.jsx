import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Camera, Lock, LogOut, Mail, Save, User } from "lucide-react";
import AdminShell from "../../components/admin/AdminShell";
import { updateUser, logoutUser } from "../../features/user/actions/userThunks";
import { getImageUrl } from "../../utils/getImageUrl";

const fieldClass =
  "w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    reset({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      password: "",
    });
    setImagePreview(currentUser?.image ? getImageUrl(currentUser.image) : "");
    setImageFile(null);
  }, [currentUser, reset]);

  const fallbackProfileImage =
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=256&h=256&q=80";
  const profileImage = imagePreview || fallbackProfileImage;

  const hasChanges = isDirty || Boolean(imageFile);

  const joinedDate = useMemo(() => {
    if (!currentUser?.createdAt) {
      return "N/A";
    }

    return new Date(currentUser.createdAt).toLocaleDateString();
  }, [currentUser]);

  const onSubmit = async (formValues) => {
    if (!currentUser?._id) {
      toast.error("Admin session not found. Please login again.");
      navigate("/login");
      return;
    }

    const payload = {
      adminId: currentUser._id,
      name: formValues.name?.trim(),
    };

    if (formValues.password?.trim()) {
      payload.password = formValues.password.trim();
    }

    if (imageFile) {
      payload.image = imageFile;
    }

    try {
      await dispatch(updateUser(payload)).unwrap();
      toast.success("Admin profile updated successfully");
      reset({
        name: payload.name || currentUser?.name || "",
        email: currentUser?.email || "",
        password: "",
      });
      setImageFile(null);
    } catch (error) {
      toast.error(error || "Failed to update admin profile");
    }
  };

  const onLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error || "Failed to logout");
    }
  };

  const onReset = () => {
    reset({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      password: "",
    });
    setImageFile(null);
    setImagePreview(currentUser?.image ? getImageUrl(currentUser.image) : "");
  };

  return (
    <AdminShell
      title="Admin Dashboard"
      subtitle="Manage account settings and keep your admin profile up to date."
      actions={
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
        >
          <LogOut size={16} />
          Logout
        </button>
      }
    >
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-gray-900">Account Summary</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-gray-500">Role</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">{currentUser?.userType || "Admin"}</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-gray-500">Email</p>
            <p className="mt-1 truncate text-sm font-semibold text-gray-900">{currentUser?.email || "N/A"}</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-gray-500">Joined</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">{joinedDate}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-gray-900">Profile Settings</h2>
        <p className="mt-1 text-sm text-gray-600">Change your name, password, and profile image.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center">
            <img
              src={profileImage}
              alt="Admin profile"
              className="h-16 w-16 rounded-full border border-gray-200 object-cover"
              onError={(event) => {
                if (event.currentTarget.dataset.fallbackApplied === "true") {
                  event.currentTarget.onerror = null;
                  return;
                }
                event.currentTarget.dataset.fallbackApplied = "true";
                event.currentTarget.src = "/placeholder.jpg";
              }}
            />
            <label
              htmlFor="admin-profile-image"
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 transition hover:border-gray-400"
            >
              <Camera size={16} />
              Upload Picture
              <input
                id="admin-profile-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) {
                    return;
                  }
                  setImageFile(file);
                  setImagePreview(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>

          <div>
            <label htmlFor="admin-name" className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <User size={16} className="text-gray-500" />
              Name
            </label>
            <input
              id="admin-name"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" },
              })}
              type="text"
              placeholder="Enter admin name"
              autoComplete="name"
              className={fieldClass}
            />
            {errors.name ? <p className="mt-1 text-sm text-red-600">{errors.name.message}</p> : null}
          </div>

          <div>
            <label htmlFor="admin-email" className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Mail size={16} className="text-gray-500" />
              Email
            </label>
            <input
              id="admin-email"
              {...register("email")}
              type="email"
              autoComplete="email"
              disabled
              className={`${fieldClass} cursor-not-allowed bg-gray-100 text-gray-500`}
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700"
            >
              <Lock size={16} className="text-gray-500" />
              New Password
            </label>
            <input
              id="admin-password"
              {...register("password", {
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              type="password"
              placeholder="Leave empty to keep current password"
              autoComplete="current-password"
              className={fieldClass}
            />
            {errors.password ? (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={loading || !hasChanges}
              className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onReset}
              disabled={loading}
              className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
};

export default AdminDashboard;
