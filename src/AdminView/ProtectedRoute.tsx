import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hoolks";
import { selectIsAdmin, selectIsAuth } from "../app/features/user/userSlice";

const ProtectedRoute = () => {
  const isAdmin = useAppSelector(selectIsAdmin);
  const isAuthenticated = useAppSelector(selectIsAuth);

  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
