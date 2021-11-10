import React, { useState, useEffect, useContext, createContext } from "react";
import auth from "./init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onIdTokenChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import Cookies from "js-cookie";
import sha256 from "js-sha256";
import { fetcherSignUp, fetcherSignIn } from "../engines/fetcher";
import axios from "axios";
import useSWR from "swr";

axios.defaults.xsrfHeaderName = "x-csrftoken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState("");
  const auth = getAuth();

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      setUser(user);
      Cookies.set("sbn-session-id", user.token);
      return user;
   }
    Cookies.remove("sbn-session-id");
    localStorage.removeItem("Authorization");
    setUser(false);
    return false;
  };

  const classicSignUp = async (username, email, password) => {
    const hashedPass = sha256(password);
    return createUserWithEmailAndPassword(auth, email, hashedPass).then(
      (userCredential) => {
        handleUser(userCredential.user);
        updateProfile(auth.currentUser, {
          displayName: `${username}`,
        }).then(async () => {
          const res = await fetcherSignUp("http://localhost:8000/api/post/register/user/", username, email, hashedPass); 
          localStorage.setItem("Authorization", res.data.token);
          setSuccess(res.data.success);
          setTimeout(() => {
            setSuccess("");
          }, 3000);
        }).catch((error) => console.log(error));
      }
    );
  };
  
  const signIn = async (email, password) => {
    const hashedPass = sha256(password);
    return signInWithEmailAndPassword(auth, email, hashedPass).then(async (userCredential) => {
      handleUser(userCredential.user);
      const res = await fetcherSignIn("http://localhost:8000/api/post/login/", hashedPass);
      localStorage.setItem("Authorization", res.data.token);
      setSuccess(res.data.success);
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    }).catch((error) => console.log(error));
  };

  const signout = () => {
    return signOut(auth).then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, handleUser);
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    axios.get("http://localhost:8000/api/get/csrf/", {
    method: "GET",
    credentials: "include",
    });
  }, []);

  return {
    user,
    success,
    classicSignUp,
    signIn,
    signout,
  };
}

const formatUser = async (user) => {
  const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token,
  };
};

export { AuthProvider, useAuth };
