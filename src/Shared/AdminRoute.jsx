import { Navigate } from "react-router-dom";
import useIsAdmin from "../Hooks/useIsAdmin";
import useAuth from "../Hooks/useAuth";
import LoadingAnimation from "./LoadingAnimation";

const AdminRoute = ({ children }) => {
  const { isAdminPending, isAdmin } = useIsAdmin();
  const { user, authLoading } = useAuth();

  if (isAdminPending || authLoading) return <LoadingAnimation />;
  if (user && isAdmin) return children;
  return <Navigate to={"/"} replace />;
};

export default AdminRoute;
