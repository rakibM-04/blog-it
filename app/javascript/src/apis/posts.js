import axios from "axios";

const fetch = ({ categories, title, status }) =>
  axios.get("/posts", {
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
  upvote,
  downvote,
};

export default postsApi;
