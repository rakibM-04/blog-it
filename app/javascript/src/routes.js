const routes = {
  home: "/",
  all: "*",
  posts: {
    create: "/posts/create",
    show: "/posts/show/:slug",
    edit: "/posts/edit/:slug",
    personal: "/posts/personal",
  },
  login: "/login",
  signup: "/signup",
};

export default routes;
