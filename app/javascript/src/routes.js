const routes = {
  home: "/",
  all: "*",
  posts: {
    create: "/posts/create",
    show: "/posts/show/:slug",
  },
  login: "/login",
  signup: "/signup",
};

export default routes;
