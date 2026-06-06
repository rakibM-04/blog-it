import { t } from "i18next";
import { capitalize } from "neetocist";

import { renderActionsPerRow } from "./utils";

export const COLUMN_DATA = [
  {
    title: t("columnData.title"),
    dataIndex: "title",
    key: "title",
  },
  {
    title: t("columnData.categories"),
    dataIndex: "categories",
    key: "categories",
  },
  {
    title: t("columnData.lastPublishedAt"),
    dataIndex: "lastPublishedAt",
    key: "lastPublishedAt",
  },
  {
    title: t("columnData.status"),
    dataIndex: "status",
    key: "status",
    render: status => capitalize(status),
  },
  {
    key: "action",
    align: "right",
    render: renderActionsPerRow,
  },
];
