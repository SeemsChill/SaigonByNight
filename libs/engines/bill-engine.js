import axios from "axios";
import Cookies from "js-cookie";

export async function onFetchingDelivery(bill_uid) {
  const res = await axios
    .post(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/get/action/bill/`,
      {
        bill_uid: bill_uid,
      },
      {
        headers: {
          csrftoken: Cookies.get("csrftoken"),
          Authorization: Cookies.get("Authorization"),
        },
      }
    )
    .catch((err) => {
      return err.response;
    });

  return res;
}
