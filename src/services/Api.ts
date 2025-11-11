import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: `${API_URL}`,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("authToken");

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  config.headers.set("Content-Type", "application/json");

  return config;
});

export default api;