import axiosInstance from "../../../services/axiosInstance";

const buildAdminUpdateFormData = (payload = {}) => {
  const formData = new FormData();

  if (payload.adminId) {
    formData.append("adminId", payload.adminId);
  }

  if (payload.name?.trim()) {
    formData.append("name", payload.name.trim());
  }

  if (payload.password?.trim()) {
    formData.append("password", payload.password.trim());
  }

  if (payload.image instanceof File || payload.image instanceof Blob) {
    formData.append("image", payload.image);
  }

  return formData;
};

export const loginUserAPI = async (credentials) => {
  const res = await axiosInstance.post("/admin/adminLogin", credentials);
  return res.data;
};

export const getUserAPI = async () => {
  const res = await axiosInstance.get("/admin/getAdmin");
  return res.data;
};

export const userUpdateAPI = async (payload) => {
  const formData = buildAdminUpdateFormData(payload);
  const res = await axiosInstance.put("/admin/updateAdminProfile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const logoutUserAPI = async (credentials) => {
  const res = await axiosInstance.post("/admin/adminLogout", credentials);
  return res.data;
};
