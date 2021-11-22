import axios from "axios";
import Cookies from "js-cookie";

const fetcherSignUp = async (uid, name, email, password) => {
  const data = await axios
    .post(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/post/register/user/`,
      {
        uid: uid,
        username: name,
        email: email,
        password: password,
        csrf: `${Cookies.get("csrftoken")}`,
        sbnSessionId: `${Cookies.get("sbn-session-id")}`,
      },
      {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    )
    .then()
    .catch((err) => {
      return err.response;
    });

  return data;
};

const fetcherSignIn = async (password) => {
  const data = await axios
    .post(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/post/login/`,
      {
        password: password,
        csrf: `${Cookies.get("csrftoken")}`,
        sbnSessionId: `${Cookies.get("sbn-session-id")}`,
      },
      {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        credentials: "include",
      }
    )
    .then()
    .catch((err) => {
      return err.response;
    });
  return data;
};

const fetcherCredential3rdParty = async (uid) => {
  const data = await axios
    .post(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/post/login/credential/`,
      {
        uid: uid,
        csrf: `${Cookies.get("csrftoken")}`,
        sbnSessionId: `${Cookies.get("sbn-session-id")}`,
      },
      {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        credentials: "include",
      }
    )
    .then()
    .catch((err) => {
      return err.response;
    });
  return data;
};

const fetcherResetVerification = async (code) => {
  const data = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/get/reset/verification/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${code}`,
      },
    })
    .then()
    .catch((error) => {
      return error.response;
    });
  return data.data;
};

export {
  fetcherCredential3rdParty,
  fetcherSignIn,
  fetcherSignUp,
  fetcherResetVerification,
};
