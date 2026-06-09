import axios from "axios";

const fetch = ({ categories, title, status }) =>
  axios.get("/posts", {
    params: {
      categories,
      title,
      status,
    },
  });

const fetchPersonal = ({ categories, title, status }) =>
  axios.get("/posts/personal", {
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

const upvote = slug => axios.patch(`/posts/${slug}/vote`, { vote: 1 });
const downvote = slug => axios.patch(`/posts/${slug}/vote`, { vote: -1 });

const generatePdf = slug => axios.post(`/posts/${slug}/attachment`, {});

const download = slug =>
  axios.get(`/posts/${slug}/attachment/download`, { responseType: "blob" });

const postsApi = {
  generatePdf,
  download,
  fetch,
  show,
  create,
  update,
  destroy,
  updateAll,
  destroyAll,
  upvote,
  downvote,
  fetchPersonal,
};

export default postsApi;
