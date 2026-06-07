import { STATUS } from "constants";

import { t } from "i18next";
import { Link } from "react-router-dom";
import routes from "routes";
import { formatDate } from "utils/date";

import DraftOptions from "./Actions/Draft";
import PublishedOptions from "./Actions/Published";

export const generateRowData = posts =>
  posts.map(({ title, slug, categories, published_at, status }) => ({
    id: slug,
    slug,
    title: (
      <Link className="font-bold" to={routes.posts.show.replace(":slug", slug)}>
        {title}
      </Link>
    ),
    categories: categories.join(",") || t("dashboard.noCategories"),
    lastPublishedAt: formatDate(published_at),
    status,
  }));

export const renderActionsPerRow = (_, record) =>
  record.status === STATUS.published ? (
    <PublishedOptions slug={record.slug} />
  ) : (
    <DraftOptions slug={record.slug} />
  );
