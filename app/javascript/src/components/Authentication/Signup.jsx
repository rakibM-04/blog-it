import { Scaffold } from "commons";
import { useSignup } from "hooks/reactQuery/useAuthApi";
import { t } from "i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";

import SignupForm from "./Forms/Signup";

const Signup = () => {
  const mutation = useSignup();
  const history = useHistory();

  const handleSubmit = async ({
    name,
    email,
    password,
    passwordConfirmation,
    organization,
  }) => {
    mutation.mutate(
      {
        name,
        email,
        password,
        passwordConfirmation,
        organizationId: organization.id,
      },
      {
        onSuccess: () => {
          history.replace(routes.login);
        },
      }
    );
  };

  return (
    <Scaffold showSidebar={false} title={t("users.form.signup.title")}>
      <SignupForm handleSubmit={handleSubmit} />
    </Scaffold>
  );
};

export default Signup;
