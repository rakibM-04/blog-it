import axios from "axios";

const login = payload =>
  axios.post("/session", {
    login: payload,
  });

const logout = () => axios.delete("/session");

const signup = ({
  name,
  email,
  organizationId,
  password,
  passwordConfirmation,
}) =>
  axios.post("/users", {
    user: {
      name,
      email,
      password,
      passwordConfirmation,
      organizationId,
    },
  });

const authApi = {
  login,
  logout,
  signup,
};

export default authApi;
