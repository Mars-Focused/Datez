import React from "react";
import "./App.css";
import { Route, HashRouter, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import Main from "./Components/Main/Main";
// import Companions from "./Components/Main/Companions";
import Search from "./Components/Search/Search";

function App() {
  return (
    <HashRouter>
      {/* <div>Hello World</div> */}
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/Main" component={Main} />
        <Route path="/Search" component={Search} />
      </Switch>
    </HashRouter>
  );
}

export default App;
