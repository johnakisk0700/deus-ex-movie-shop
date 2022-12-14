import axios from "axios";
import { useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthProvider";

export const useAxiosPrivate = () => {
  const { user, setUser } = useAuth();

  const privateAxiosInstance = useMemo(
    () =>
      axios.create({
        baseURL: import.meta.env.VITE_PROXY_URL,
        withCredentials: true,
      }),
    []
  );

  const refreshAxiosInstance = useMemo(
    () =>
      axios.create({
        baseURL: import.meta.env.VITE_PROXY_URL,
        withCredentials: true,
      }),
    []
  );

  // Request interceptors
  useEffect(() => {
    // Mount the token on each authenticated request
    const reqInterceptor = privateAxiosInstance.interceptors.request.use(
      function (config) {
        const accessToken = user?.tokens.access;
        if (accessToken && !config?.headers?.Authorization) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
          };
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    const resInterceptor = privateAxiosInstance.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      async function (error) {
        // if 401 try to refresh the token
        const prevRequest = error.config;
        if (error?.response?.status === 401) {
          if (!user) {
            throw Error("Cannot refresh token without being logged in.");
          }

          // get the token
          console.log("Trying refresh...");
          const res = await refreshAxiosInstance.post(
            "auth/refresh/",
            {
              refresh: user.tokens.refresh,
            },
            { headers: { Authorization: `Bearer ${user.tokens.access}` } }
          );

          const newAccessToken = res.data.access;
          const newUser = {
            ...user,
            tokens: { ...user.tokens, access: newAccessToken },
          };

          // set user and new headers
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          setUser(newUser);
          return privateAxiosInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      privateAxiosInstance.interceptors.request.eject(reqInterceptor);
      privateAxiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [user]);

  return privateAxiosInstance;
};
