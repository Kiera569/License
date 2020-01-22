import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Login from "./Login/login";
import Submit from "./submit/submit";
const Route = () => {
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/Submit" component={Submit} />
    </Switch>
  </HashRouter>;
};

export default Route;
