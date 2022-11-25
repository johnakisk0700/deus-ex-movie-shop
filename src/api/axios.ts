import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.PROXY_URL,
});

export const privateAxiosInstance = axios.create({
  baseURL: import.meta.env.PROXY_URL,
  withCredentials: true,
});
