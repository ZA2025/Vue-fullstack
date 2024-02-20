// api.js
import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://vue-project-b2kl.onrender.com"
      : "http://localhost:8000",
});

export default api;
