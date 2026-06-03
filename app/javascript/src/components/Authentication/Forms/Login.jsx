import { t } from "i18next";
import { Typography } from "neetoui";
import { Button, Input, Form as NeetoUIForm } from "neetoui/formik";
import { Link } from "react-router-dom";
import routes from "routes";

import {
  LOGIN_FORM_DEFAULT_VALUES,
  LOGIN_FORM_VALIDATION_SCHEMA,
} from "./constants";

const Login = ({ handleSubmit }) => (
  <NeetoUIForm
    className="mb-32 flex h-full flex-col justify-center"
    formikProps={{
      onSubmit: handleSubmit,
      initialValues: LOGIN_FORM_DEFAULT_VALUES,
      validationSchema: LOGIN_FORM_VALIDATION_SCHEMA,
    }}
  >
    <div className="flex flex-col gap-4 rounded-md  p-8">
      <Input
        required
        label={t("users.form.login.email")}
        name="email"
        type="email"
      />
      <Input
        required
        label={t("users.form.login.password")}
        name="password"
        type="password"
      />
      <Link className="underline" to={routes.signup}>
        <Typography>{t("users.form.login.newUser")}</Typography>
      </Link>
      <div className="mt-4 flex gap-2">
        <Button
          className="themed-button"
          label={t("users.form.login.submit")}
          type="submit"
        />
        <Button
          label={t("users.form.login.reset")}
          style="secondary"
          type="reset"
        />
      </div>
    </div>
  </NeetoUIForm>
);

export default Login;
