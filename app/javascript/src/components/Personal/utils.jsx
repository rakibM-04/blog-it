import { t } from "i18next";
import { Link } from "react-router-dom";
import routes from "routes";
import { formatDate } from "utils/date";

export const generateRowData = posts =>
  posts.map(({ title, slug, categories, published_at, status }) => ({
    id: slug,
    slug,
    title: (
      <Link className="underline" to={routes.posts.show.replace(":slug", slug)}>
        {title}
      </Link>
    ),
    categories: categories.join(",") || t("blogPosts.noCategories"),
    lastPublishedAt: formatDate(published_at),
    status,
  }));
