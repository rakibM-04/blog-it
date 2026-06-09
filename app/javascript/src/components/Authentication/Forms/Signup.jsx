import { useFetchOrganizations } from "hooks/reactQuery/useOrganizationsApi";
import { t } from "i18next";
import { Typography } from "neetoui";
import { Select, Button, Input, Form as NeetoUIForm } from "neetoui/formik";
import { Link } from "react-router-dom";
import routes from "routes";

import {
  SIGNUP_FORM_DEFAULT_VALUES,
  SIGNUP_FORM_VALIDATION_SCHEMA,
} from "./constants";

const Signup = ({ handleSubmit }) => {
  const { data: { organizations } = {} } = useFetchOrganizations();

  return (
    <NeetoUIForm
      className="mt-24 flex h-full flex-col justify-start"
      formikProps={{
        onSubmit: handleSubmit,
        initialValues: SIGNUP_FORM_DEFAULT_VALUES,
        validationSchema: SIGNUP_FORM_VALIDATION_SCHEMA,
      }}
    >
      <div className="flex flex-col gap-4 rounded-md">
        <Input
          required
          label={t("users.form.signup.name")}
          name="name"
          type="name"
        />
        <Input
          required
          label={t("users.form.signup.email")}
          name="email"
          type="email"
        />
        <Select
          required
          label={t("users.form.signup.organization")}
          name="organization"
          optionRemapping={{ label: "name", value: "id" }}
          options={organizations}
        />
        <Input
          required
          label={t("users.form.signup.password")}
          name="password"
          type="password"
        />
        <Input
          required
          label={t("users.form.signup.passwordConfirmation")}
          name="passwordConfirmation"
          type="password"
        />
        <Link className="underline" to={routes.login}>
          <Typography>{t("users.form.signup.existingUser")}</Typography>
        </Link>
        <div className="mt-4 flex gap-2">
          <Button
            className="themed-button"
            label={t("users.form.signup.submit")}
            type="submit"
          />
          <Button
            label={t("users.form.signup.reset")}
            style="secondary"
            type="reset"
          />
        </div>
      </div>
    </NeetoUIForm>
  );
};

export default Signup;
