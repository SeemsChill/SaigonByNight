import axios from "axios";
import Cookies from "js-cookie";

export async function onRequestProductListSubmit(cookies) {
  const res = await onRequestProductListFetching(cookies);

  return res;
}

async function onRequestProductListFetching(cookies) {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/get/list/product/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.Authorization,
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
