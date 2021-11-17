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
import {
  fetcherSignIn,
  fetcherSignUp,
  fetcherCredential3rdParty,
} from "../engines/fetcher";
import axios from "axios";

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
  const [isLoading, setLoading] = useState(true);
  const [afterFetchingCsrf, setFetchingCsrf] = useState(false);
  const [isFetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [isSubmit, setSubmit] = useState(false);
  const router = useRouter();

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      Cookies.set("sbn-session-id", user.token);

      setUser(user);
      setLoading(false);
      setFetching(false);

      return user;
    }
    Cookies.remove("sbn-session-id");
    localStorage.removeItem("Authorization");

    setUser(false);
    setLoading(false);
    setFetching(false);

    return false;
  };

  const classicSignUp = async (username, email, password, confirmPassword) => {
    setLoading(true);
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
        updateProfile(auth.currentUser, { displayName: `${username}` }).then(
          async () => {
            const res = await fetcherSignUp(
              auth.currentUser.uid,
              username,
              email,
              hashedPass
            );

            if (res.status == 401) {
              signout();

              setLoading(false);
              setSubmit(false);

              router.push("/");
            } else if (res.status == 400) {
              signout();

              setLoading(false);
              setSubmit(false);

              setError("Bad connection, please signup again.");
              setTimeout(() => {
                setError("");
              }, 3000);
            } else {
              localStorage.setItem("Authorization", res.data.message);

              setLoading(false);
              setSubmit(false);

              router.push("/");
            }
          }
        );
      })
      .catch((error) => {
        setSubmit(false);
        setLoading(false);
        if (error.code == "auth/email-already-in-use") {
          setError("Email already in use.");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      });
  };

  const classicSignIn = async (email, password) => {
    setLoading(true);
    setSubmit(true);

    const auth = getAuth();

    const hashedPass = sha256(password);
    return signInWithEmailAndPassword(auth, email, hashedPass)
      .then(async (userCredential) => {
        handleUser(userCredential.user);
        const res = await fetcherSignIn(hashedPass);

        if (res.status == 401) {
          signout();
          setLoading(false);
          setSubmit(false);

          router.push("/");
        } else {
          localStorage.setItem("Authorization", res.data.message);

          setLoading(false);
          setSubmit(false);

          router.push("/");
        }
      })
      .catch((error) => {
        setLoading(false);
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

  const credentialWithGoogle = async () => {
    setLoading(true);
    setSubmit(true);

    const auth = getAuth();

    return signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (userCredential) => {
        handleUser(userCredential.user);
        const res = await fetcherCredential3rdParty(auth.currentUser.uid);

        if (res.status == 401) {
          signout();
          setLoading(false);
          setSubmit(false);

          router.push("/");
        } else if (res.status == 400) {
          signout();

          setLoading(false);
          setSubmit(false);

          setError("Bad connection, please signup again.");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else {
          localStorage.setItem("Authorization", res.data.message);

          setLoading(false);
          setSubmit(false);

          router.push("/");
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.code == "auth/account-exists-with-different-credential") {
          setError("Account already existed in other platform.");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      });
  };

  const credentialWithGithub = async () => {
    setLoading(true);
    setSubmit(true);
    const auth = getAuth();
    return signInWithPopup(auth, new GithubAuthProvider())
      .then(async (userCredential) => {
        handleUser(userCredential.user);
        const res = await fetcherCredential3rdParty(auth.currentUser.uid);

        if (res.status == 401) {
          signout();
          setLoading(false);
          setSubmit(false);

          router.push("/");
        } else if (res.status == 400) {
          signout();

          setLoading(false);
          setSubmit(false);

          setError("Bad connection, please signup again.");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else {
          localStorage.setItem("Authorization", res.data.message);

          setLoading(false);
          setSubmit(false);

          router.push("/");
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.code == "auth/account-exists-with-different-credential") {
          setError("Account already existed in other platform.");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      });
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    const auth = getAuth();
    return signInWithPopUp(auth, new GithubAuthProvider());
  };

  const signUpWithFacebook = async () => {
    const auth = getAuth();
    return signInWithPopup(auth, new FacebookAuthProvider())
      .then(async (userCredential) => {
        handleUser(userCredential.user);
        router.push("/");
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
    function connectFirebase() {
      const auth = getAuth();
      onIdTokenChanged(auth, handleUser);
    }
    connectFirebase();
  }, []);

  useEffect(() => {
    async function fetchCsrf() {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/get/csrf/`,
        {
          "Content-Type": "application/json",
        }
      );
      Cookies.set("csrftoken", data.headers["x-csrftoken"], {
        secure: true,
        sameSite: "none",
      });
      setFetchingCsrf(true);
    }
    fetchCsrf();
  }, []);

  return {
    user,
    error,
    isFetching,
    isLoading,
    isSubmit,
    afterFetchingCsrf,
    classicSignIn,
    classicSignUp,
    credentialWithGoogle,
    credentialWithGithub,
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
