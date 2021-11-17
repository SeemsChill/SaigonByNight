import axios from "axios";
import Cookies from "js-cookie";

const fetcherSignUp = async (name, email, password) => {
  const data = await axios
    .post(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/post/register/user/`,
      {
        username: `${name}`,
        email: `${email}`,
        password: `${password}`,
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
        password: `${password}`,
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

const fetcherCredential3rdParty = async () => {
  const data = await axios
    .post(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/post/login/credential/`,
      {
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

const fetcherForgot = async (url, email) => {
  const data = await axios
    .post(
      `${url}`,
      {
        email: `${email}`,
        csrf: `${Cookies.get("csrftoken")}`,
      },
      {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        credentials: "include",
      }
    )
    .then()
    .catch((error) => {
      return error.response;
    });
  return data.status;
};

const fetcherVerification = async (url, code) => {
  console.log(Cookies.get("csrftoken"));
  const data = await axios
    .post(
      `${url}`,
      {
        code: code,
      },
      {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        credentials: "include",
      }
    )
    .then()
    .catch((error) => {
      return error.response;
    });

  return data.data;
};

export {
  fetcherCredential3rdParty,
  fetcherForgot,
  fetcherSignIn,
  fetcherSignUp,
  fetcherVerification,
};
