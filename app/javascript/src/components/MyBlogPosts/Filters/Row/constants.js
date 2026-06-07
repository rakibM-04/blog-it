import { STATUS } from "constants";

import { t } from "i18next";
import * as yup from "yup";

export const STATUS_OPTIONS = [
  {
    label: t("myBlogPosts.filters.status.both"),
    value: "",
  },
  {
    label: t("myBlogPosts.filters.status.published"),
    value: STATUS.published,
  },
  {
    label: t("myBlogPosts.filters.status.draft"),
    value: STATUS.draft,
  },
];

export const ROW_FILTER_VALIDATION_SCHEMA = yup.object({
  title: yup.string(),
  categories: yup.array(),
  status: yup.object().oneOf(STATUS_OPTIONS),
});
