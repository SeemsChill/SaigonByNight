import axios from "axios";

export default async function onRegisterVerifySubmit(code) {
  const res = await onRegisterVerifyFetching(code);

  return res;
}

async function onRegisterVerifyFetching(code) {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/get/verify/register/`, {
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
