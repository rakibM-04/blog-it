import * as yup from "yup";

export const FORM_INITIAL_VALUES = {
  categories: "",
};

export const FORM_VALIDATION_SCHEMA = yup.object().shape({
  categories: yup.array(),
});
