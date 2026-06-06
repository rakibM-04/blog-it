import Scaffold from "commons/Scaffold/Scaffold";
import { useLogin } from "hooks/reactQuery/useAuthApi";
import { t } from "i18next";
import routes from "routes";
import { setToLocalStorage } from "utils/storage";

import LoginForm from "./Forms/Login";

const Login = () => {
  const mutation = useLogin();
  const handleSubmit = async ({ email, password }) => {
    mutation.mutate(
      { email, password },
      {
        onSuccess: data => {
          setToLocalStorage({
            authToken: data.authentication_token,
            email: email.toLowerCase(),
            userId: data.id,
            userName: data.name,
          });
          window.location.href = routes.home;
        },
      }
    );
  };

  return (
    <Scaffold showSidebar={false} title={t("users.form.login.title")}>
      <LoginForm handleSubmit={handleSubmit} />
    </Scaffold>
  );
};

export default Login;
