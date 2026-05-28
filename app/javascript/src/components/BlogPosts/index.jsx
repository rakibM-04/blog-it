import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import postsApi from "apis/posts";
import Logger from "js-logger";

import Post from "./Post";

const BlogPosts = () => {
  const [postsData, setPostsData] = useState({ data: { posts: [] } });

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

  return (
    <div className="h-full p-8">
      <Typography className="mb-12 text-5xl">Blog Posts</Typography>
      <div className="flex flex-col gap-4">
        {posts.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
