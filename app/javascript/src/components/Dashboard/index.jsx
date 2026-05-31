import { useEffect, useState } from "react";

import postsApi from "apis/posts";
import Logger from "js-logger";
import { Typography, Button } from "neetoui";
import { useTranslation } from "react-i18next";

import { createPostEntries } from "./utils";

const BlogPosts = () => {
  const [postsData, setPostsData] = useState({ posts: [] });
  const { t } = useTranslation();

  const fetchPosts = async () => {
    try {
      const data = await postsApi.fetch();
      setPostsData(data);
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const { posts = [] } = postsData;

  return (
    <div className="flex h-full flex-col gap-8 overflow-hidden p-8">
      <div className="flex w-full justify-between">
        <Typography className="text-3xl">{t("blogPosts.title")}</Typography>
        <Button
          className="themed-button"
          label={t("blogPosts.addNewPost")}
          to="/posts/create"
        />
      </div>
      <div className="flex h-full flex-col gap-4 overflow-y-scroll">
        {createPostEntries(posts)}
      </div>
    </div>
  );
};

export default BlogPosts;
