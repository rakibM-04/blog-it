// i18n should load before App initialization.
// eslint-disable-next-line import/order
import "./common/i18n";

import React from "react";

import PageNotFound from "commons/PageNotFound";
import PrivateRoute from "commons/PrivateRoute";
import Login from "components/Authentication/Login";
import Signup from "components/Authentication/Signup";
import Dashboard from "components/Dashboard";
import { CreatePost, EditPost, ShowPost } from "components/Posts";
import * as R from "ramda";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "reactquery";
import routes from "routes";
import queryClient from "utils/queryClient";
import { getFromLocalStorage } from "utils/storage";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !R.either(R.isNil, R.isEmpty)(authToken);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ToastContainer />
          <Switch>
            <Route exact component={CreatePost} path={routes.posts.create} />
            <Route exact component={ShowPost} path={routes.posts.show} />
            <Route exact component={EditPost} path={routes.posts.edit} />
            <Route component={Login} path={routes.login} />
            <Route component={Signup} path={routes.signup} />
            <PrivateRoute
              exact
              component={Dashboard}
              condition={isLoggedIn}
              path={routes.home}
              redirectRoute={routes.login}
            />
            <Route component={PageNotFound} path={routes.all} />
          </Switch>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
