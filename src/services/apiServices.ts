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
}