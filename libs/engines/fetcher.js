import axios from "axios";

// axios.defaults.xsrfHeaderName = "x-csrftoken";
// axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.withCredentials = true;

const fetcherSignUp = async (url, name, email, password) => {
  const data = await axios
    .post(
      `${url}`,
      {
        username: `${name}`,
        email: `${email}`,
        password: `${password}`,
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
      return err.message;
    });

  return data;
};

const fetcherSignIn = async (url, password) => {
  const data = await axios.post(
    `${url}`,
    {
      password: `${password}`,
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

export { fetcherSignIn, fetcherSignUp };
