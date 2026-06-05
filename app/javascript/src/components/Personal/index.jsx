import Scaffold from "commons/Scaffold/Scaffold";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import { t } from "i18next";
import { Spinner, Table, Typography } from "neetoui";

import { COLUMN_DATA } from "./constants";
import { generateRowData } from "./utils";

const MyBlogPosts = () => {
  const { isLoading, data: { posts = [] } = {} } = useFetchPosts({
    personal: true,
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const rowData = generateRowData(posts);

  return (
    <Scaffold title={t("posts.myBlogPosts")}>
      <Typography style="h3">
        {t("posts.count", { count: posts.length })}
      </Typography>
      <Table scroll columnData={COLUMN_DATA} rowData={rowData} />
    </Scaffold>
  );
};

export default MyBlogPosts;
