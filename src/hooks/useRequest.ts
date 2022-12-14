import { useToast } from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useAxiosPrivate } from "./useAxiosPrivate";

export const useRequest = <TData>(
  method: "GET" | "POST" | "PATCH",
  url: string,
  postData?: object,
  onSuccess?: (data: TData) => void,
  onError?: (error: any) => void
) => {
  const privateAxiosInstance = useAxiosPrivate();

  const { setUser } = useAuth();
  const [data, setData] = useState<TData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const toast = useToast();

  let isMounted = useRef(true);
  const navigate = useNavigate();

  // turn it true again so that strict mode works
  const request = useMemo(
    () => async (values?: any) => {
      isMounted.current = true;
      const abortController = new AbortController();
      setLoading(true);
      try {
        console.log(`[${method}]: ${url}`);
        const res = await privateAxiosInstance({
          method: method,
          url: url,
          data: values || postData,
          signal: abortController.signal,
        });
        if (isMounted.current) {
          onSuccess && onSuccess(res.data);
          setData(res.data);
          setLoading(false);
        }
      } catch (error: any) {
        onError && onError(error);
        setLoading(false);
        if (error?.response?.status === 401) {
          // then user probably must log in again
          localStorage.removeItem("user");
          setUser(null);
          navigate("/login", { state: { from: location } });
        } else {
          toast({
            status: "error",
            title: "Error: " + error?.message,
            position: "top",
          });
        }
      }
    },
    [postData]
  );

  return { request, loading, data, error };
};
