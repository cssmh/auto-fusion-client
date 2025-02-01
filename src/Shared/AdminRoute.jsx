import { Navigate } from "react-router-dom";
import useIsAdmin from "../Hooks/useIsAdmin";
import useAuthContext from "../Hooks/useAuthContext";
import LoadingAnimation from "./LoadingAnimation";

const AdminRoute = ({ children }) => {
  const { isAdminPending, isAdmin } = useIsAdmin();
  const { currentUser, authLoading } = useAuthContext();

  // waiting for logging user and admin check
  if (isAdminPending || authLoading)  return <LoadingAnimation />;

  // if user is admin send to dashboard
  if (currentUser && isAdmin) {
    return children;
  }

  // if user is not admin send to homepage
  return <Navigate to={"/"} replace />;
};

export default AdminRoute;
