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

const update = ({ slug, title, description, categoryIds }) =>
  axios.put(`/posts/${slug}`, {
    post: { title, description, categoryIds },
  });

const postsApi = { fetch, show, create, update };

export default postsApi;
