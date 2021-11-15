import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onIdTokenChanged,
  signOut,
  updateProfile,
  FacebookAuthProvider,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import app from "./init";
import Cookies from "js-cookie";
import sha256 from "js-sha256";
import { fetcherSignIn, fetcherSignUp } from "../engines/fetcher";
import axios from "axios";

// axios.defaults.xsrfHeaderName = "x-csrftoken";
// axios.defaults.xsrfCookieName = "csrftoken";
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
  const [error, setError] = useState("");
  const [isSubmit, setSubmit] = useState(false);
  const router = useRouter();

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

  const classicSignUp = async (username, email, password, confirmPassword) => {
    const auth = getAuth();
    if (password != confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    setSubmit(true);
    const hashedPass = sha256(password);
    return createUserWithEmailAndPassword(auth, email, hashedPass)
      .then((userCredential) => {
        handleUser(userCredential.user);
        updateProfile(auth.currentUser, {
          displayName: `${username}`,
        })
          .then(async () => {
            const res = await fetcherSignUp(
              `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/post/register/user/`,
              username,
              email,
              hashedPass
            );
            localStorage.setItem("Authorization", res.data.token);
          })
          .catch(() => {
            handleUser(false);
            router.push("/");
          });
      })
      .catch((error) => {
        setSubmit(false);
        if (error.code == "auth/email-already-in-use") {
          setError("Email already in use.");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      });
  };

  const classicSignIn = async (email, password) => {
    const auth = getAuth();
    setSubmit(true);
    const hashedPass = sha256(password);
    return signInWithEmailAndPassword(auth, email, hashedPass)
      .then(async (userCredential) => {
        handleUser(userCredential.user);
        const res = await fetcherSignIn(
          `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/post/login/`,
          hashedPass
        );
        localStorage.setItem("Authorization", res.data.token);
      })
      .catch((error) => {
        setSubmit(false);
        if (error.code == "auth/wrong-password") {
          setError("Incorrect password.");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
        if (error.code == "auth/user-not-found") {
          setError("User not found, please sign-up.");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      });
  };

  const signInWithGoogle = async () => {
    const auth = getAuth();
    return signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (userCredential) => {
        handleUser(userCredential.user);
        const res = await fetcherSignUp(
          `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/post/register/user/`,
          user.name,
          "",
          ""
        );
        if (res == "Request failed with status code 401") {
          handleUser(false);
          router.push("/");
        } else {
          localStorage.setItem("Authorization", res.data.token);
        }
      })
      .catch((error) => {
        if (error.code == "auth/account-exists-with-different-credential") {
          setError("Account already existed in other platform.");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      });
  };

  const signInWithGithub = async () => {
    const auth = getAuth();
    return signInWithPopup(auth, new GithubAuthProvider())
      .then(async (userCredential) => {
        handleUser(userCredential.user);
        const res = await fetcherSignUp(
          `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/post/register/user/`,
          user.name,
          "",
          ""
        );
        if (res == "Request failed with status code 401") {
          handleUser(false);
          router.push("/");
        } else {
          localStorage.setItem("Authorization", res.data.token);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code == "auth/account-exists-with-different-credential") {
          setError("Account already existed in other platform.");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      });
  };

  const signInWithFacebook = async () => {
    const auth = getAuth();
    return signInWithPopup(auth, new FacebookAuthProvider())
      .then(async (userCredential) => {
        handleUser(userCredential.user);
        const res = await fetcherSignUp(
          `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/post/register/user/`,
          user.name,
          "",
          ""
        );
        if (res == "Request failed with status code 401") {
          handleUser(false);
          router.push("/");
        } else {
          localStorage.setItem("Authorization", res.data.token);
        }
      })
      .catch((error) => {
        if (error.code == "auth/account-exists-with-different-credential") {
          setError("Account already existed in other platform.");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      });
  };

  const signout = () => {
    const auth = getAuth();
    return signOut(auth).then(() => handleUser(false));
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onIdTokenChanged(auth, handleUser);
    return () => unsubscribe();
  }, []);
  useEffect(async () => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/get/csrf/`,
      {
        method: "GET",
      }
    );
    Cookies.set("csrftoken", data.headers["x-csrftoken"]);
  }, []);

  return {
    user,
    error,
    isSubmit,
    classicSignIn,
    classicSignUp,
    signout,
    signInWithFacebook,
    signInWithGoogle,
    signInWithGithub,
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
