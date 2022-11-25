import { IProfile, useAuth } from "../context/AuthProvider";
import { useAxiosPrivate } from "./useAxiosPrivate";

export const useProfile = () => {
  const { setUser } = useAuth();
  const privateAxiosInstance = useAxiosPrivate();

  const refreshProfile = async () => {
    try {
      const userRes = await privateAxiosInstance.get<IProfile>(
        "rent-store/profile/"
      );
      const profile = userRes.data;
      setUser((prev) => prev && { ...prev, profile: profile });
    } catch (err) {}
  };

  return { refreshProfile };
};
