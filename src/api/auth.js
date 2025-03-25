import { getAuth, signOut } from "firebase/auth";
import app from "../Shared/firebase.config";
import axiosSecure from ".";
const auth = getAuth(app);

export const userLogout = async () => {
  return await signOut(auth);
};

export const clearCookie = async () => {
  localStorage.removeItem("access-token");
};

export const setToken = async (email) => {
  const { data } = await axiosSecure.post("/jwt", { email });
  return data;
};
