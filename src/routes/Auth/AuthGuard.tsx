import { useToast } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function AuthGuard({
  children,
  adminRoute,
}: {
  children: JSX.Element;
  adminRoute?: boolean;
}) {
  let { user, setUser } = useAuth();
  let location = useLocation();

  if (adminRoute && !user?.is_admin) {
    console.error("Naughty Boy Detected!");
    setUser(null);
    localStorage.removeItem("user");
    return <Navigate to="/login" />;
  }

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default AuthGuard;
