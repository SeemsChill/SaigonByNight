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

export async function onCreatingProduct(
  productName,
  productCategory,
  productDescription,
  productImage,
  productQuantity,
  productPrice
) {
  let formData = new FormData();
  formData.append("productName", productName);
  formData.append("productCategory", productCategory);
  formData.append("productImage", productImage, productImage.name);
  formData.append("productDescription", productDescription);
  formData.append("productQuantity", productQuantity);
  formData.append("productPrice", productPrice);

  const res = await axios
    .post(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/post/create/product/`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
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

export async function onUpdatingProduct(
  productName,
  productDescription,
  productQuantity,
  productPrice,
  uid
) {
  const res = await axios
    .post(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/post/update/product/`,
      {
        productUid: uid,
        productName: productName,
        productDescription: productDescription,
        productQuantity: productQuantity,
        productPrice: productPrice,
      },
      {
        headers: {
          "Content-Type": "application/json",
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

export async function onDeletingProduct(productUid) {
  const res = await axios
    .post(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/post/delete/product/`,
      {
        productUid: productUid,
      },
      {
        headers: {
          "Content-Type": "application/json",
          csrftoken: Cookies.get("csrftoken"),
          Authorization: Cookies.get("Authorization"),
        },
      }
    )
    .catch((err) => {
      return err.respone;
    });

  return res;
}

export async function onGettingAllBills(cookies) {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/get/all/client/bills/`, {
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

export async function onGettingAllBillsOwner(cookies) {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/get/all/owner/bills/`, {
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
