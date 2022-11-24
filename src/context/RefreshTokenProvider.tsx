import axios, { AxiosInstance } from "axios";
import { createContext, useContext, useEffect, useMemo } from "react";
import { useAuth } from "./AuthProvider";

/**
 * This basically provides the whole application
 * with an instance of axios that intercepts
 * requests and handles token mounting and refreshing
 */

let RefreshContext = createContext<AxiosInstance>(null!);
const useRefresh = () => useContext(RefreshContext);

function RefreshTokenProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useAuth();

  const privateAxiosInstance = useMemo(
    () =>
      axios.create({
        baseURL: "http://localhost:5050",
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
        let prevRequest = error.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          if (!user) {
            throw Error("Cannot refresh token without being logged in.");
          }
          // get the token
          console.log("Trying refresh...");
          const res = await privateAxiosInstance.post("auth/refresh/", {
            refresh: user.tokens.refresh,
          });
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

  let value = useMemo(() => privateAxiosInstance, []);

  return (
    <RefreshContext.Provider value={value}>{children}</RefreshContext.Provider>
  );
}

export { RefreshTokenProvider, useRefresh };
