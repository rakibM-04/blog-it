const routes = {
  home: "/app",
  all: "*",
  posts: {
    create: "/app/posts/create",
    show: "/app/posts/show/:slug",
  },
};

export default routes;
