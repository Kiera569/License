import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

import Login from "./Login/login";
import Submit from "./submit/submit";
import LicenseList from "./component/LicenseList";

const routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route
          path="/"
          render={() =>
            sessionStorage.getItem("isLogin") ? (
              <Submit />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route path="/login" component={Login}></Route>
        <Route path="/submit" component={Submit}>
          <Route path="/userManage" component={LicenseList} />
          <Route path="/projectManage" component={LicenseList} />
        </Route>
        {/* <Route
          path="/submit"
          component={Submit}
          routes={[
            { path: "/userManage", component: { LicenseList } },
            { path: "/projectManage", component: { LicenseList } }
          ]}
        ></Route> */}
      </Switch>
    </Router>
  );
};

export default routes;
