import axios from "axios";
import { API_URL_USERS, API_URL_SCHEDULING, API_URL_NOTIFICATIONS } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const createAPI = (baseURL: string) => {
  const instance = axios.create({ baseURL });

  instance.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    config.headers["Content-Type"] = "application/json";

    return config;
  });

  return instance;
};

export const apiUsers = createAPI(API_URL_USERS);
export const apiScheduling = createAPI(API_URL_SCHEDULING);
export const apiNotifications = createAPI(API_URL_NOTIFICATIONS);