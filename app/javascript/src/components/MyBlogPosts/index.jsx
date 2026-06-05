import Scaffold from "commons/Scaffold/Scaffold";
import { MODES } from "components/constants";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import { t } from "i18next";
import { Spinner, Table, Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import { formatDate } from "utils/date";

import DraftOptions from "./DraftOptions";
import PublishedOptions from "./PublishedOptions";

const MyBlogPosts = () => {
  const { isLoading, data: { posts = [] } = {} } = useFetchPosts({
    personal: true,
  });

  if (isLoading) return <Spinner />;

  const columnData = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    { title: "Categories", dataIndex: "categories", key: "categories" },
    {
      title: "Last Published At",
      dataIndex: "lastPublishedAt",
      key: "lastPublishedAt",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "capitalize",
    },
    {
      key: "action",
      align: "right",
      render: (_, record) =>
        record.status === MODES.published ? (
          <PublishedOptions slug={record.slug} />
        ) : (
          <DraftOptions slug={record.slug} />
        ),
    },
  ];

  const rowData = posts.map(
    ({ title, slug, categories, published_at, status }) => ({
      id: slug,
      slug,
      title: (
        <Link
          className="underline"
          to={routes.posts.show.replace(":slug", slug)}
        >
          {title}
        </Link>
      ),
      categories: categories.join(",") || "No categories",
      lastPublishedAt: formatDate(published_at),
      status,
    })
  );

  return (
    <Scaffold title={t("posts.myBlogPosts")}>
      <Typography style="h3">{posts.length} articles</Typography>
      <Table scroll columnData={columnData} rowData={rowData} />
    </Scaffold>
  );
};

export default MyBlogPosts;
