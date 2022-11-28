import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function AuthGuard({
  children,
  adminRoute,
}: {
  children: JSX.Element;
  adminRoute?: boolean;
}) {
  let { user, logout } = useAuth();
  let location = useLocation();

  if (adminRoute && user && !user?.is_admin) {
    return <Navigate to="/" replace />;
  }

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return children;
}

export default AuthGuard;
