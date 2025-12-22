import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    const origin = location.state?.from?.pathname || "/";
    return <Navigate to={origin} replace />;
  }

  return children;
};

export default PublicRoute;
