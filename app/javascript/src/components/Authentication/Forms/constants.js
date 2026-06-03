import { t } from "i18next";
import * as yup from "yup";

const MIN_PASSWORD_LENGTH = 6;
const MAX_NAME_LENGTH = 255;
const VALID_EMAIL_REGEX = /^(?:[\w+-].?)+@[a-z\d-]+(?:\.[a-z]+)*\.[a-z]+$/i;

export const LOGIN_FORM_DEFAULT_VALUES = {
  email: "",
  password: "",
};

export const SIGNUP_FORM_DEFAULT_VALUES = {
  name: "",
  email: "",
  organization: "",
  password: "",
  passwordConfirmation: "",
};

export const LOGIN_FORM_VALIDATION_SCHEMA = yup.object({
  email: yup
    .string()
    .required(t("users.form.login.emailRequired"))
    .matches(VALID_EMAIL_REGEX, t("users.form.login.invalidEmailFormat")),
  password: yup
    .string()
    .required(t("users.form.login.passwordRequired"))
    .min(
      MIN_PASSWORD_LENGTH,
      t("users.form.login.passwordMinLength", { size: MIN_PASSWORD_LENGTH })
    ),
});

export const SIGNUP_FORM_VALIDATION_SCHEMA = yup.object({
  name: yup
    .string()
    .required(t("users.form.signup.nameRequired"))
    .max(
      MAX_NAME_LENGTH,
      t("users.form.login.nameMaxLength", { size: MAX_NAME_LENGTH })
    ),
  email: yup
    .string()
    .required(t("users.form.signup.emailRequired"))
    .matches(VALID_EMAIL_REGEX, "users.form.login.invalidEmailFormat"),
  organization: yup
    .object({
      id: yup.number(),
      name: yup.string(),
    })
    .required(t("users.form.signup.organizationRequired")),
  password: yup
    .string()
    .required(t("users.form.signup.passwordRequired"))
    .min(
      MIN_PASSWORD_LENGTH,
      t("users.form.login.passwordMinLength", { size: MIN_PASSWORD_LENGTH })
    ),
  passwordConfirmation: yup
    .string()
    .required(t("users.form.signup.passwordConfirmationRequired"))
    .oneOf(
      [yup.ref("password"), null],
      t("users.form.signup.passwordConfirmationMismatch")
    ),
});
