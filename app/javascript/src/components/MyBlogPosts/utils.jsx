import { STATUS } from "constants";

import { t } from "i18next";
import { isNotEmpty } from "neetocist";
import { Tag } from "neetoui";
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

export const createCategoryTags = ({ categories = [], onClose }) =>
  categories.map(category => (
    <Tag
      className="bg-black text-white"
      key={category}
      label={category}
      size="small"
      style="secondary"
      type="solid"
      onClose={() => onClose(category)}
    />
  ));

export const resolveCountMessage = ({ totalCount, title, filteredCount }) => {
  if (isNotEmpty(title)) {
    return t("myBlogPosts.titleCount", { count: filteredCount, title });
  }

  if (filteredCount < totalCount) {
    return t("myBlogPosts.selectedCount", {
      total: totalCount,
      count: filteredCount,
    });
  }

  return t("myBlogPosts.articleCount", { count: totalCount });
};
