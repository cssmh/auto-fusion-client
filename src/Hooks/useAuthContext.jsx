import { useContext } from "react";
import { AuthContext } from "../Shared/AuthProvider";

const useAuthContext = () => {
  const info = useContext(AuthContext);
  return info;
};

export default useAuthContext;
