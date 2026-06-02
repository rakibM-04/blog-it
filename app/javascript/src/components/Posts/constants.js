import * as yup from "yup";

export const FORM_DEFAULT_VALUES = {
  title: "",
  description: "",
  category: "",
};

export const FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("NEED IT"),
  description: yup.string().required(),
  categories: yup.array(),
});
