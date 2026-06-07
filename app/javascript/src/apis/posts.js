import axios from "axios";

const fetch = ({ personal, categories, title, status }) =>
  axios.get(personal ? "/posts/?personal" : "/posts", {
    params: {
      categories,
      title,
      status,
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

const updateAll = ({ slugs, status }) =>
  axios.patch("/posts/bulk_update", {
    slugs,
    patch: { status },
  });

const destroyAll = slugs =>
  axios.delete("/posts/bulk_destroy", {
    params: { slugs },
  });

const postsApi = {
  fetch,
  show,
  create,
  update,
  destroy,
  updateAll,
  destroyAll,
};

export default postsApi;
