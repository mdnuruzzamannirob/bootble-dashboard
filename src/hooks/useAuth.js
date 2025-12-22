import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/features/auth/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return {
    ...auth,
    isAuthenticated: !!auth.token,
    logout: () => dispatch(logout()),
  };
};
