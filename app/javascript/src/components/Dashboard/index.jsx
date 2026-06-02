import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import { Typography, Button, Spinner } from "neetoui";
import { useTranslation } from "react-i18next";
import routes from "routes";

import { createPostEntries } from "./utils";

const BlogPosts = () => {
  const { data: { posts } = {}, isLoading } = useFetchPosts();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-8 overflow-hidden p-8">
      <div className="flex w-full justify-between">
        <Typography className="text-3xl">{t("blogPosts.title")}</Typography>
        <Button
          className="themed-button"
          label={t("blogPosts.addNewPost")}
          to={routes.posts.create}
        />
      </div>
      <div className="flex h-full flex-col gap-4 overflow-y-scroll">
        {createPostEntries(posts)}
      </div>
    </div>
  );
};

export default BlogPosts;
