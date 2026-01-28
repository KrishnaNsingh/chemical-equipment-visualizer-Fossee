import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  auth: {
    username: "fossee",
    password: "fossee123",
  },
});

export default api;
