import axios from "axios";
import Cookies from "js-cookie";

export default async function onUpdateInfoSubmit(
  realName,
  phoneNumber,
  province,
  district,
  ward,
  detailAddress
) {
  const res = await onUpdateInfoFetching(
    realName,
    phoneNumber,
    province,
    district,
    ward,
    detailAddress
  );

  return res;
}

async function onUpdateInfoFetching(
  realName,
  phoneNumber,
  province,
  district,
  ward,
  detailAddress
) {
  const res = await axios
    .post(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/post/update/user/`,
      {
        realName: realName,
        phoneNumber: `+84${phoneNumber}`,
        province: province,
        district: district,
        ward: ward,
        detailAddress: detailAddress,
        csrf: Cookies.get("csrftoken"),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("Authorization"),
        },
      }
    )
    .catch((err) => {
      return err.response;
    });

  return res;
}
