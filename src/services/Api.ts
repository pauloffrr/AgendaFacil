import { API_URL_NOTIFICATIONS, API_URL_SCHEDULING, API_URL_USERS } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const createAPI = (baseURL: string) => {
  const instance = axios.create({ baseURL });

  instance.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  });

  return instance;
};

export const apiUsers = createAPI(API_URL_USERS);
export const apiScheduling = createAPI(API_URL_SCHEDULING);
export const apiNotifications = createAPI(API_URL_NOTIFICATIONS);
