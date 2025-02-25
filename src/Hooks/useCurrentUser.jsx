import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useCurrentUser = () => {
  // hooks
  const axiosPublic = useAxiosPublic();
  const { user, authLoading } = useAuth();
  const userEmail = user?.email;

  const {
    isPending: dbCurrentUserPending,
    data: dbCurrentUser,
    refetch: dbCurrentUserRefetch,
  } = useQuery({
    queryKey: ["current-user", userEmail],
    enabled: !authLoading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/currentUser?email=${userEmail}`);
      return res.data;
    },
  });

  return { dbCurrentUserPending, dbCurrentUser, dbCurrentUserRefetch };
};

export default useCurrentUser;
