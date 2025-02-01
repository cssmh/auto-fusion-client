import { Navigate } from "react-router-dom";
import useIsAdmin from "../Hooks/useIsAdmin";
import useAuthContext from "../Hooks/useAuthContext";
import LoadingAnimation from "./LoadingAnimation";

const AdminRoute = ({ children }) => {
  const { isAdminPending, isAdmin } = useIsAdmin();
  const { currentUser, authLoading } = useAuthContext();

  if (isAdminPending || authLoading) return <LoadingAnimation />;
  if (currentUser && isAdmin) return children;
  return <Navigate to={"/"} replace />;
};

export default AdminRoute;
