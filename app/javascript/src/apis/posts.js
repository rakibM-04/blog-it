import axios from "axios";

const fetch = categories =>
  axios.get("/posts", {
    params: {
      categories,
    },
  });

const show = slug => axios.get(`/posts/${slug}`);

const create = ({ title, description, categoryIds: category_ids }) =>
  axios.post("/posts", {
    post: { user_id: 1, organization_id: 1, title, description, category_ids },
  });

const postsApi = { fetch, show, create };

export default postsApi;
