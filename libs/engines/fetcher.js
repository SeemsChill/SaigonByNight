import axios from "axios";
import Cookies from "js-cookie";

const fetcherSignUp = async (url, name, email, password) => {
  const data = await axios
    .post(
      `${url}`,
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
      return err.message;
    });

  return data;
};

const fetcherSignIn = async (url, password) => {
  const data = await axios.post(
    `${url}`,
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
  );
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

export { fetcherForgot, fetcherSignIn, fetcherSignUp, fetcherVerification };
