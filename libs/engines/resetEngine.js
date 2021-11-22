import axios from "axios";
import sha256 from "js-sha256";
import Cookies from "js-cookie";

export async function onResetRequestSubmit(email, isChecked) {
  const res = await onResetRequestFetching(email, isChecked);

  return res;
}

async function onResetRequestFetching(email, isChecked) {
  const res = await axios
    .post(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/post/request/reset/`,
      {
        email: email,
        isChecked: isChecked,
        csrf: Cookies.get("csrftoken"),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });

  return res;
}

export async function onResetVerifySubmit(code) {
  const res = await onResetVerifyFetching(code);

  return res;
}

async function onResetVerifyFetching(code) {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/get/verify/reset/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: code,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });

  return res.data;
}

export async function onResetSubmit(code, password) {
  const hashed = sha256(password);

  const res = await onResetFetching(code, hashed);

  return res;
}

async function onResetFetching(code, password) {
  const res = await axios
    .post(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/post/submit/reset/`,
      {
        password: password,
        csrf: Cookies.get("csrftoken"),
      },
      {
        headers: {
          Authorization: `${code}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });

  return res;
}
