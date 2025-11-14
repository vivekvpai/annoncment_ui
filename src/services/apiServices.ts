import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: "http://localhost/workshop_backend",
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApiServices = {
  getAllusers: async () => {
    const response = await api.get("/get_all_users.php");
    return response.data;
  },

  getUserById: async (user_id: string) => {
    const response = await api.get(`/get_user_details.php`, {
      params: {
        user_id: user_id,
      },
    });
    return response.data;
  },

  deleteUser: async (user_email: string) => {
    const response = await api.delete(`/delete_user.php`, {
      data: {
        user_email: user_email,
      },
    });
    return response.data;
  },

  updateUserPassword: async (user: any) => {
    const response = await api.put(`/update_user.php`, user);
    return response.data;
  },

  addUser: async (user: any) => {
    const response = await api.post(`/insert_user.php`, user);
    return response.data;
  },
};
