import React, { useEffect, useState } from "react";

import { Button } from "@bigbinary/neetoui";
import postsApi from "apis/posts";
import Logger from "js-logger";

const BlogPosts = () => {
  const [postsData, setPostsData] = useState({});

  const fetchPosts = async () => {
    try {
      const data = await postsApi.fetch();
      setPostsData(data);
      Logger.log(data);
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const { data: { posts } = {} } = postsData;
  Logger.log(posts);

  return <Button label="Hello" />;
};

export default BlogPosts;
