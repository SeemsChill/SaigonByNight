import axios from "axios";

// axios.defaults.xsrfHeaderName = "x-csrftoken";
// axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.withCredentials = true;

const fetcherCreateUser = async (url, name, email, password) => {
  const data = await axios.post(`${url}`, {
    username: `${name}`,
    email: `${email}`,
    password: `${password}`
  }, {
    headers: new Headers({
      "Content-Type": "application/json"
    }),
 credentials: "include"
  });

  return data;
}

export { fetcherCreateUser};
