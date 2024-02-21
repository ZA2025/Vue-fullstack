// api.js
import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction
  ? "https://vue-project-b2kl.onrender.com"
  : "http://localhost:8000";

console.log(`Running in ${isProduction ? "production" : "development"} mode`);
console.log(`API base URL is ${baseURL}`);

const api = axios.create({
  baseURL: baseURL,
});

export default api;
