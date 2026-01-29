import axios from "axios";

const api = axios.create({
  baseURL: "https://chemical-equipment-backend-xthm.onrender.com/api/",
  auth: {
    username: "fossee",
    password: "fossee123",
  },
});

export default api;
