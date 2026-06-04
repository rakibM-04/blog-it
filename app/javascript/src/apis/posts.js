import axios from "axios";

const fetch = categories =>
  axios.get("/posts", {
    params: {
      categories,
    },
  });

const show = slug => axios.get(`/posts/${slug}`);

const create = ({ title, description, categoryIds, status }) =>
  axios.post("/posts", {
    post: { title, description, categoryIds, status },
  });

const update = ({ slug, title, description, categoryIds, status }) =>
  axios.put(`/posts/${slug}`, {
    post: { title, description, categoryIds, status },
  });

const destroy = slug => axios.delete(`/posts/${slug}`);

const postsApi = { fetch, show, create, update, destroy };

export default postsApi;
