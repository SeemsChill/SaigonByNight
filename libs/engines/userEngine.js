import axios from "axios";

export async function onFetchingUserProfile(cookies) {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/get/user/profile/`, {
      headers: {
        csrftoken: cookies.csrftoken,
        Authorization: cookies.Authorization,
      },
    })
    .catch((err) => {
      return err.response;
    });

  return res.data;
}
