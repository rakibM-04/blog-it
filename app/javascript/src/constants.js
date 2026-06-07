import { t } from "i18next";

export const TABLE_FILTER_STORE = "table-filter-store";

export const TABLE_FILTER_FORM_INITIAL_VALUES = {
  categories: [],
  title: "",
  status: {
    label: t("myBlogPosts.filters.status.both"),
    value: "",
  },
};
