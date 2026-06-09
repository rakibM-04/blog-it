import { Scaffold } from "commons";
import { useSignup } from "hooks/reactQuery/useAuthApi";
import { t } from "i18next";
import { Redirect } from "react-router-dom";
import routes from "routes";

import SignupForm from "./Forms/Signup";

const Signup = () => {
  const mutation = useSignup();

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
          <Redirect to={routes.home} />;
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
