import axios from "axios";

const login = payload =>
  axios.post("/session", {
    login: payload,
  });

const logout = () => axios.delete("/session");

const signup = ({
  name,
  email,
  organization,
  password,
  passwordConfirmation: password_confirmation,
}) =>
  axios.post("/users", {
    user: {
      name,
      email,
      password,
      password_confirmation,
      organization,
    },
  });

const authApi = {
  login,
  logout,
  signup,
};

export default authApi;
