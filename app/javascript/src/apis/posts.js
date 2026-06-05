import axios from "axios";

const fetch = ({ personal, categories }) =>
  axios.get(personal ? "/posts/?personal" : "/posts", {
    params: {
      categories,
    },
  });

const show = slug => axios.get(`/posts/${slug}`);

const create = ({ title, description, categoryIds, status }) =>
  axios.post("/posts", {
    post: { title, description, categoryIds, status },
  });

const update = ({ quiet, slug, title, description, categoryIds, status }) =>
  axios.put(quiet ? `/posts/${slug}?quiet` : `/posts/${slug}`, {
    post: { title, description, categoryIds, status },
  });

const destroy = ({ quiet, slug }) =>
  axios.delete(quiet ? `/posts/${slug}?quiet` : `/posts/${slug}`);

const postsApi = { fetch, show, create, update, destroy };

export default postsApi;
