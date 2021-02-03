import React from "react";

import { Switch, Route } from "react-router-dom";

import Login from "./Components/Login/Login";
import Main from "./Components/Main/Main";
import Search from "./Components/Search/Search";

export default (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/Main" component={Main} />
    <Route path="/Search" component={Search} />
  </Switch>
);
