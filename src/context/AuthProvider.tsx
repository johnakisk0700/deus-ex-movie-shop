import { useToast } from "@chakra-ui/react";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axios";
import jwt_decode from "jwt-decode";

interface DecodedToken {
  exp: number;
  is_admin: boolean;
  jti: string;
  token_type: string;
  user_id: number;
}

export interface UserCredentials {
  username: string;
  password: string;
}

interface UserTokens {
  access: string;
  refresh: string;
}

export interface IProfile {
  email: string;
  first_name: string;
  last_name: string;
  wallet: number;
}

interface User {
  profile: IProfile;
  is_admin: boolean;
  tokens: UserTokens;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  login: (userCredentials: UserCredentials) => void;
  logout: () => void;
}

let AuthContext = createContext<AuthContextType>(null!);
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const initialCheck = useRef(true);
  // utility
  const toast = useToast();
  let navigate = useNavigate();
  let location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // read localStorage on init to check for saved user
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const parsedUser = savedUser && JSON.parse(savedUser);
    if (parsedUser) {
      setUser(parsedUser);
      const initialFrom = location.pathname || "/";
      console.log(initialFrom);
      navigate(initialFrom, { replace: true });
    }
    initialCheck.current = false;
  }, []);

  // sync localStorage with user changes after initial check
  // for stored one
  useMemo(() => {
    if (!initialCheck.current) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  let login = async (userCredentials: UserCredentials) => {
    setLoading(true);
    try {
      // The plan is to construct the user from multiple
      // sources. Login gives us the tokens, then we decode that and
      // get the role. After that, we request the user information (name, wallet etc)
      // and we combine them all on user state
      const tokensRes = await axiosInstance.post<UserTokens>(
        "auth/login/",
        userCredentials
      );

      const { is_admin }: DecodedToken = jwt_decode(tokensRes.data.access);

      const userRes = await axiosInstance.get<IProfile>("rent-store/profile/", {
        headers: { Authorization: `Bearer ${tokensRes.data.access}` },
      });

      // save user on state, localStorage is synced above
      const newUser = {
        profile: userRes.data,
        is_admin: is_admin,
        tokens: tokensRes.data,
      };
      setUser(newUser);
      // navigate back to where user came from
      navigate(from, { replace: true });
    } catch (err: any) {
      if (err.response.status === 401) {
        toast({
          title: "Invalid username or password.",
          status: "error",
          position: "top",
        });
      } else {
        toast({
          title: err.response.message,
          status: "error",
          position: "top",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  let logout = () => {
    setUser(null);
  };

  let value = useMemo(
    () => ({ user, setUser, loading, login, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
