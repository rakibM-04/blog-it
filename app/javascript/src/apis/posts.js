import axios from "axios";

const fetch = categories =>
  axios.get("/posts", {
    params: {
      categories,
    },
  });

const show = slug => axios.get(`/posts/${slug}`);

const create = ({ title, description, categoryIds }) =>
  axios.post("/posts", {
    post: { title, description, categoryIds },
  });

const postsApi = { fetch, show, create };

export default postsApi;
