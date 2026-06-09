import axios from "axios";

const fetch = ({ categories, title, status }) =>
  axios.get("/my_posts", {
    params: {
      categories,
      title,
      status,
    },
  });

const updateBulk = ({ slugs, status }) =>
  axios.patch("/my_posts/bulk", {
    slugs,
    patch: { status },
  });

const destroyBulk = slugs =>
  axios.delete("/my_posts/bulk", {
    params: { slugs },
  });

const myPostsApi = { fetch, updateBulk, destroyBulk };

export default myPostsApi;
