import { STATUS } from "components/Posts/constants";
import { t } from "i18next";
import { Link } from "react-router-dom";
import routes from "routes";
import { formatDate } from "utils/date";

import DraftOptions from "./DraftOptions";
import PublishedOptions from "./PublishedOptions";

export const generateRowData = posts =>
  posts.map(({ title, slug, categories, published_at, status }) => ({
    id: slug,
    slug,
    title: (
      <Link className="underline" to={routes.posts.show.replace(":slug", slug)}>
        {title}
      </Link>
    ),
    categories: categories.join(",") || t("dashboard.noCategories"),
    lastPublishedAt: formatDate(published_at),
    status,
  }));

export const renderActionsPerRow = (_, record) => (
  <div className="mx-auto w-0">
    {record.status === STATUS.published ? (
      <PublishedOptions slug={record.slug} />
    ) : (
      <DraftOptions slug={record.slug} />
    )}
  </div>
);
