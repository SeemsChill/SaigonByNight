import axios from "axios";

export async function onFetchingProductDashboard(cookies) {
  let headers = {
    "Content-Type": "application/json",
  };

  if (cookies.Authorization) {
    headers.Authorization = cookies.Authorization;
  }

  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/get/all/product/`, {
      headers: headers,
    })
    .catch((err) => {
      return err.response;
    });

  return res.data;
}
