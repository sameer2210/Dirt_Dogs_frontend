import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { loginUserAPI, getUserAPI, userUpdateAPI } from "../api/userAPI";

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const persistUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  if (user?.token) {
    localStorage.setItem("token", user.token);
  }
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI(credentials);
      const user = response?.data;

      if (!user || user.userType !== "Admin") {
        toast.error("Unauthorized: Not an admin");
        return rejectWithValue("Unauthorized");
      }

      persistUser(user);
      toast.success("Admin login successful");
      return user;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Login failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserAPI();
      const admins = Array.isArray(response?.data) ? response.data : [];
      const storedUser = getStoredUser();

      const matched =
        admins.find((admin) => admin?._id === storedUser?._id) ||
        admins.find((admin) => admin?.email === storedUser?.email) ||
        storedUser ||
        null;

      if (matched) {
        const merged = { ...matched, token: storedUser?.token || matched?.token };
        persistUser(merged);
        return merged;
      }

      return null;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to fetch admin";
      return rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userUpdateAPI(userData);
      const updatedAdmin = response?.data;
      const storedUser = getStoredUser();
      const mergedUser = { ...storedUser, ...updatedAdmin };

      persistUser(mergedUser);
      return mergedUser;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Update failed";
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      return true;
    } catch (error) {
      const message = error.message || "Something went wrong during logout";
      return rejectWithValue(message);
    }
  }
);
