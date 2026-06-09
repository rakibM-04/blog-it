// i18n should load before App initialization.
// eslint-disable-next-line import/order
import "./common/i18n";

import React from "react";

import { PageNotFound, PrivateRoute } from "commons";
import Login from "components/Authentication/Login";
import Signup from "components/Authentication/Signup";
import Dashboard from "components/Dashboard";
import MyBlogPosts from "components/MyBlogPosts";
import { CreatePost, EditPost, ShowPost } from "components/Posts";
import PostNotFound from "components/Posts/PostNotFound";
import * as R from "ramda";
import { Switch, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "reactquery";
import routes from "routes";
import queryClient from "utils/queryClient";
import { getFromLocalStorage } from "utils/storage";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !R.either(R.isNil, R.isEmpty)(authToken);

  return (
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer />
        <Switch>
          <PrivateRoute
            exact
            component={CreatePost}
            condition={isLoggedIn}
            path={routes.posts.create}
            redirectRoute={routes.login}
          />
          <PrivateRoute
            exact
            component={ShowPost}
            condition={isLoggedIn}
            path={routes.posts.show}
            redirectRoute={routes.login}
          />
          <PrivateRoute
            exact
            component={EditPost}
            condition={isLoggedIn}
            path={routes.posts.edit}
            redirectRoute={routes.login}
          />
          <PrivateRoute
            exact
            component={MyBlogPosts}
            condition={isLoggedIn}
            path={routes.posts.personal}
            redirectRoute={routes.login}
          />
          <PrivateRoute
            exact
            component={Dashboard}
            condition={isLoggedIn}
            path={routes.home}
            redirectRoute={routes.login}
          />
          <PrivateRoute
            exact
            component={Login}
            condition={!isLoggedIn}
            path={routes.login}
            redirectRoute={routes.home}
          />
          <PrivateRoute
            exact
            component={Signup}
            condition={!isLoggedIn}
            path={routes.signup}
            redirectRoute={routes.home}
          />
          <PrivateRoute
            component={PostNotFound}
            condition={isLoggedIn}
            path={routes.posts.notFound}
            redirectRoute={routes.login}
          />
          <PrivateRoute
            component={PageNotFound}
            condition={isLoggedIn}
            path={routes.all}
            redirectRoute={routes.login}
          />
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
    // </React.StrictMode>
  );
};

export default App;
