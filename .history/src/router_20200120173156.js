import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

import Login from "./Login/login";
import Submit from "./submit/submit";
import LicenseList from './component/LicenseList'

const BasicRoute = () => {
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
        <Route path="/submit" component={Submit} routes={[{path:'/codeManage',component:{LicenseList}},{path:'/userMan',component:{LicenseList}},{path:'/codeManage',component:{LicenseList}},{path:'/codeManage',component:{LicenseList}}]}>

        </Route>
      </Switch>
    </Router>
  );
};

export default BasicRoute;
