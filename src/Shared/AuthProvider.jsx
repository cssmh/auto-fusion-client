import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "./firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const auth = getAuth(app);
export const AuthContext = createContext("");
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // email-password sign up function
  const createNewUser = (email, password) => {
    setAuthLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Email-password sign up profile info update
  const updateProfileInfo = (currentUsersInfo, username, photo) => {
    updateProfile(currentUsersInfo, {
      displayName: username,
      photoURL: photo,
    })
      .then(() => {
        //
      })
      .catch(() => {
        //
      });
  };

  // email-password log in function
  const accessExistingUser = (email, password) => {
    setAuthLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //Google sign up function
  const createNewUserByGoogle = () => {
    setAuthLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //Sign out
  const signOutUser = () => {
    setAuthLoading(true);
    return signOut(auth);
  };

  //keep trace on logged in user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      // if user is available, send the user email to backend
      if (user) {
        const userInfo = { email: user?.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          const token = res.data?.token;
          if (token) {
            localStorage.setItem("access-token", token);
            setAuthLoading(false);
          }
        });
      }
      // if user is not available remove the access token
      else {
        localStorage.removeItem("access-token");
        setAuthLoading(false);
      }
    });
    return () => {
      unSubscribe();
    };
  }, [axiosPublic]);

  // send the info to context
  const authInfo = {
    createNewUser,
    createNewUserByGoogle,
    signOutUser,
    currentUser,
    accessExistingUser,
    updateProfileInfo,
    authLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
