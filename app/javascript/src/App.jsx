// i18n should load before App initialization.
// eslint-disable-next-line import/order
import "./common/i18n";

import React from "react";

import PageNotFound from "common/PageNotFound";
import Dashboard from "components/Dashboard";
import { CreatePost } from "components/Posts";
import { t } from "i18next";
import { Book, Edit, Flash } from "neetoicons";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "reactquery";
import routes from "routes";
import queryClient from "utils/queryClient";
import SidebarLink from "utils/SidebarLink";

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer />
        <div className="flex h-screen w-full">
          <div className="flex-0 flex flex-col justify-start gap-2 px-2 py-10">
            <div className="mb-4 rounded-md bg-black p-1 text-white">
              <Flash />
            </div>
            <SidebarLink
              icon={<Book />}
              name={t("blogPosts.title")}
              route={routes.home}
            />
            <SidebarLink
              icon={<Edit />}
              name={t("blogPosts.title")}
              route={routes.posts.create}
            />
          </div>
          <div className="flex-1">
            <Switch>
              <Route exact component={Dashboard} path={routes.home} />
              <Route exact component={CreatePost} path={routes.posts.create} />
              <Route component={PageNotFound} path={routes.all} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
