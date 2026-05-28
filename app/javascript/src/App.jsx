import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import BlogPosts from "./components/BlogPosts";

const App = () => (
  <>
    <ToastContainer />
    <Router>
      <Switch>
        <Route exact component={BlogPosts} path="/" />
        <Route exact path="/tasks" render={() => <div>About</div>} />
      </Switch>
    </Router>
  </>
);

export default App;
