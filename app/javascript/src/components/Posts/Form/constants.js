import { t } from "i18next";
import * as yup from "yup";

export const FORM_DEFAULT_VALUES = {
  title: "",
  description: "",
  category: "",
};

export const FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required(t("posts.form.titleRequired")),
  description: yup.string().required(t("posts.form.descriptionRequired")),
  categories: yup.array(),
});

export const MODES = {
  publish: "published",
  draft: "drafted",
};
