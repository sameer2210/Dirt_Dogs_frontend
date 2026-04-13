import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/common/items/Button";
import {
  User,
  Mail,
  Lock,
  Upload,
  Save,
  LogOut,
  Trash2
} from "lucide-react";
import { updateUser, logoutUser } from "../../features/user/actions/userThunks";
import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);

  const profileImage =
    user?.profileImage ||
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset
  } = useForm({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      password: ""
    }
  });


  const handleUpdateUser = async (data) => {
    setIsLoading(true);
    try {
      const updatedUser = { ...user, ...data };
      await new Promise((r) => setTimeout(r, 2000));
      await dispatch(updateUser(user.id, updatedUser));
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await dispatch(logoutUser(user.id));
      await new Promise((res) => setTimeout(res, 2000)); // simulate API call
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to logout!");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    reset();
    toast.info("Changes discarded successfully!");
  };

  useEffect(() => {
    reset({
      username: user?.username || "",
      email: user?.email || "",
      password: ""
    });
  }, [user, reset]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
      toast.success("Profile picture uploaded!");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header Section */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gradient-to-r from-gray-600 to-teal-500 rounded-2xl p-8 text-center shadow-xl"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Account Settings
            </h1>
            <p className="text-indigo-100 mt-2 text-base sm:text-lg">
              Manage your profile and preferences
            </p>
          </motion.div>

          <div className="flex justify-between ">
            {/* Sidebar */}
            <div>
              <aside className="w-56 h-screen bg-stone-950 text-white p-4">
                <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
                <nav className="flex flex-col gap-2">
                  <NavLink to="/adminDashboard" className="hover:underline">Dashboard</NavLink>
                  <NavLink to="/serviceCreate" className="hover:underline">Create Service</NavLink>
                  {/* Add more links here */}
                </nav>
              </aside>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Account Information Card */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 sm:p-8"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <User className="w-6 h-6 text-indigo-600" />
                  Account Information
                </h2>
                <div className="space-y-4">

                  {/* Profile Picture */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profile Picture
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2  mt-2">
                        <label className="group relative flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded border-2 border-teal-600 hover:border-teal-700 transition-all duration-300 text-base tracking-wide uppercase overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed">
                          Upload New Picture
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <span className="absolute inset-0 bg-white text-black  transform translate-x-full group-hover:translate-x-0 transition-transform duration-600 ease-out"></span>
                          <span className="relative z-10 group-hover:text-teal-800 transition-colors duration-400"></span>
                        </label>


                      </div>
                    </div>
                  </motion.div>

                  {/* name */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...register("name", {
                          required: "name is required",
                          minLength: {
                            value: 3,
                            message: "name must be at least 3 characters"
                          }
                        })}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.username
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 hover:border-indigo-300"
                          }`}
                        type="text"
                        placeholder="Enter name"
                      />
                    </div>
                    {errors.username && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span className="w-4 h-4">⚠</span>
                        {errors.username.message}
                      </p>
                    )}
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        })}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.email
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 hover:border-indigo-300"
                          }`}
                        type="email"
                        placeholder="Enter email"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span className="w-4 h-4">⚠</span>
                        {errors.email.message}
                      </p>
                    )}
                  </motion.div>



                  {/* Password */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...register("password", {
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                          }
                        })}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.password
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 hover:border-indigo-300"
                          }`}
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span className="w-4 h-4">⚠</span>
                        {errors.password.message}
                      </p>
                    )}
                  </motion.div>





                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.3 }}
                    className="flex  pt-3"
                  >
                    <button
                      onClick={handleSubmit(handleUpdateUser)}
                      disabled={isLoading || !isDirty}
                      className="group relative flex items-center gap-2 rounded-tl-xl bg-gray-50  font-medium py-3 px-6 border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-800 text-base tracking-wide uppercase overflow-hidden disabled:opacity-90 disabled:cursor-not-allowed"
                    >
                      <Save className="w-5 text-teal-700 h-5 group-hover:scale-110 transition-transform duration-300" />
                      {isLoading ? "Saving..." : "Save Changes"}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-700"></span>
                      <span className="relative z-10 transform group-hover:-translate-y-0.5 transition-transform duration-600"></span>
                    </button>

                    <Button
                      onClick={() => resetForm(true)}
                      disabled={isLoading}
                      icon={Save}
                      iconColor="text-yellow-400"
                    > Discard Changes
                    </Button>

                  </motion.div>
                </div>

                {/* Danger Zone */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.3 }}
                  className="border-t border-gray-200 pt-6 mt-8"
                >
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <span className="text-red-500">⚠</span>
                    Danger Zone
                  </h3>
                  <div className="flex justify-evenly">

                    <Button
                      onClick={() => handleLogout(true)}
                      disabled={isLoading}
                      loadingText="Logging out..."
                      icon={LogOut}
                      iconColor="text-red-500"
                    >Logout
                    </Button>

                    <Button
                      onClick={() => setShowUpdateConfirm(true)}
                      disabled={isLoading}
                      icon={Trash2}
                      iconColor="text-red-600"
                    >Update Account
                    </Button>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Update Confirmation Modal */}
        <AnimatePresence>
          {showUpdateConfirm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Save className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Confirm Account Update
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 text-center text-sm">
                  Are you sure you want to update your account? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={handleUpdateUser}
                    disabled={isLoading}
                    loadingText="Updateing..."
                  >Update Account
                  </Button>

                  <Button
                    onClick={() => setShowUpdateConfirm(false)}
                    disabled={isLoading}
                  >Cancel
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default AdminDashboard;
