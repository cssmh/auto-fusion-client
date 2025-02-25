import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useIsAdmin = () => {
  const { user, authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isPending: isAdminPending, data: isAdmin } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !authLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin/${user?.email}`);
      return res.data?.admin;
    },
  });

  return { isAdminPending, isAdmin };
};

export default useIsAdmin;
