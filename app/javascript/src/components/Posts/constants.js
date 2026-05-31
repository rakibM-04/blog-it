import * as yup from "yup";

export const FORM_DEFAULT_VALUES = {
  title: "",
  description: "",
};

export const FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
});
