import { COLUMN_KEYS } from "constants";

import { t } from "i18next";
import { capitalize } from "neetocist";

import { renderActionsPerRow } from "./utils";

export const COLUMN_DATA = [
  {
    title: t("myBlogPosts.columnData.title"),
    dataIndex: "title",
    key: COLUMN_KEYS.title,
    ellipsis: false,
  },
  {
    title: t("myBlogPosts.columnData.categories"),
    dataIndex: "categories",
    key: COLUMN_KEYS.categories,
    ellipsis: false,
  },
  {
    title: t("myBlogPosts.columnData.lastPublishedAt"),
    dataIndex: "lastPublishedAt",
    key: COLUMN_KEYS.lastPublishedAt,
    ellipsis: false,
  },
  {
    title: t("myBlogPosts.columnData.status"),
    dataIndex: "status",
    key: COLUMN_KEYS.status,
    ellipsis: false,
    render: status => capitalize(status),
  },
];

export const COLUMN_ACTIONS = {
  key: "action",
  align: "right",
  render: renderActionsPerRow,
};
