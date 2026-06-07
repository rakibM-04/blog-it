import { t } from "i18next";
import * as yup from "yup";

export const FORM_INITIAL_VALUES = {
  title: "",
  description: "",
  categories: [],
};

export const FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required(t("posts.form.titleRequired")),
  description: yup.string().required(t("posts.form.descriptionRequired")),
  categories: yup.array(),
});
