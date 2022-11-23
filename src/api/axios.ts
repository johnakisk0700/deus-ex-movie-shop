import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5050",
});

export const privateAxiosInstance = axios.create({
  baseURL: "http://localhost:5050",
  withCredentials: true,
});
