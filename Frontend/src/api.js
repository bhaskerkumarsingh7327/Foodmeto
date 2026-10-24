import axios from "axios";
import { auth } from "./firebase";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  timeout: 60000, // Render free plan so jata hai, pehli request slow hoti hai
});

// Har request bhejne se pehle Firebase token header me laga do
API.interceptors.request.use(async (config) => {
  await auth.authStateReady(); // Firebase ka login restore hone tak ruko (refresh ke baad zaroori)
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken(); // expire ho gaya ho to khud naya le leta hai
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});