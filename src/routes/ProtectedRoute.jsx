import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useGetMeQuery } from "../store/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../store/features/auth/authSlice";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    data: userData,
    isLoading,
    isError,
  } = useGetMeQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData?.data || userData));
    }
  }, [userData, dispatch]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#EBEBFF]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || isError) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
