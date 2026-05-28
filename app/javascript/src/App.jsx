// i18n should load before App initialization.
// eslint-disable-next-line import/order
import "./common/i18n";

import React from "react";

import { Flash, HourGlass } from "@bigbinary/neeto-icons";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import PageNotFound from "./common/PageNotFound";
import BlogPosts from "./components/BlogPosts";
import routes from "./routes";
import SidebarLink from "./utils/SidebarLink";

const App = () => (
  <React.StrictMode>
    <BrowserRouter>
      <div className="flex h-screen w-full">
        <div className="flex-0 flex flex-col justify-start gap-2 px-2 py-10">
          <div className="mb-4 rounded-md bg-black p-1 text-white">
            <Flash />
          </div>
          <SidebarLink
            icon={<HourGlass />}
            name="Blog Posts"
            route={routes.home}
          />
        </div>
        <div className="flex-1">
          <Switch>
            <Route exact component={BlogPosts} path={routes.home} />
            <Route component={PageNotFound} path="*" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

export default App;
