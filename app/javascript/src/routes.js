const routes = {
  home: "/",
  all: "*",
  posts: {
    create: "/posts/create",
    show: "/posts/show/:slug",
    edit: "/posts/edit/:slug",
    personal: "/posts/personal",
    notFound: "/posts/notFound",
  },
  login: "/login",
  signup: "/signup",
};

export default routes;
