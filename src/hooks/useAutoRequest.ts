import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useAxiosPrivate } from "./useAxiosPrivate";

export const useAutoRequest = <TData>(
  method: "GET" | "POST" | "PATCH",
  url: string,
  postData?: object
) => {
  const privateAxiosInstance = useAxiosPrivate();

  const { setUser } = useAuth();

  const [data, setData] = useState<TData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  let isMounted = useRef(true);

  const [refetchSwitch, setRefetchSwitch] = useState<boolean>(false);
  const refetch = () => {
    setRefetchSwitch((prev) => !prev);
  };

  useEffect(() => {
    // turn it true again so that strict mode works
    isMounted.current = true;
    const abortController = new AbortController();

    const request = async () => {
      setLoading(true);
      try {
        console.log(`[${method}]: ${url}`);
        const res = await privateAxiosInstance({
          method: method,
          url: url,
          data: postData,
          signal: abortController.signal,
        });
        if (isMounted.current) {
          setData(res.data);
          setLoading(false);
        }
      } catch (error: any) {
        if (error?.response?.status === 401) {
          // double 401 means that refresh token expired as well
          localStorage.removeItem("user");
          setUser(null);
          navigate("/login", { state: { from: location } });
          setLoading(false);
        }
      }
    };
    request();

    return () => {
      abortController.abort();
      isMounted.current = false;
    };
  }, [postData, url, refetchSwitch]);

  return { data, loading, error, refetch };
};
