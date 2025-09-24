import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: "http://localhost/annoncment_api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApiServices = {
  signUp: async (userData: {
    user_name: string;
    user_email: string;
    password: string;
  }) => {
    const response = await api.post("/user/insert_user.php", userData);
    return response.data;
  },

  login: async (credentials: any) => {
    const response = await api.post("/user/login.php", credentials);
    return response.data;
  },

  getAllAnnouncements: async () => {
    const response = await api.get("/announcement/get_all_announcements.php");
    return response.data;
  },

  getAnnaoncmentCategory: async () => {
    const response = await api.get("/category/get_all_categories.php");
    return response.data;
  },

  insertAnnouncement: async (announcement: any) => {
    const response = await api.post(
      "/announcement/insert_announcement.php",
      announcement
    );
    return response.data;
  },

  deleteAnnouncement: async (announcement_id: any) => {
    const response = await api.delete("/announcement/delete_announcement.php", {
      data: { announcement_id },
    });
    return response.data;
  },

  updateAnnouncement: async (announcement_id: any, announcement: any) => {
    const response = await api.put(
      "/announcement/update_announcement.php",
      {announcement_id: announcement_id, ...announcement}
    );
    return response.data;
  },
};
